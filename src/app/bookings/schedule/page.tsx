"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/authStore";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Video,
  Phone,
  MapPin,
  User,
  Save,
} from "lucide-react";
import Link from "next/link";

interface ScheduleData {
  matchId: string;
  matchName: string;
  date: string;
  time: string;
  duration: string;
  type: "video" | "phone" | "in_person";
  location: string;
  notes: string;
}

export default function ScheduleMeetingPage() {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [matches, setMatches] = useState<any[]>([]);

  const [scheduleData, setScheduleData] = useState<ScheduleData>({
    matchId: "",
    matchName: "",
    date: "",
    time: "",
    duration: "30",
    type: "video",
    location: "",
    notes: "",
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    if (user) {
      fetchMatches();
    }
  }, [isAuthenticated, isLoading, user, router]);

  const fetchMatches = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      if (!token) return;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/matches`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.ok) {
        const data = await response.json();
        setMatches(data.matches || []);
      }
    } catch (error) {
      console.error("Failed to fetch matches:", error);
      // Use mock data for demo
      setMatches([
        { id: "1", name: "The Johnson Family", location: "New York, USA" },
        { id: "2", name: "Maria Rodriguez", location: "Madrid, Spain" },
        { id: "3", name: "The Smith Family", location: "London, UK" },
      ]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      const token = localStorage.getItem("auth-token");
      if (!token) throw new Error("No auth token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...scheduleData,
            scheduledAt: `${scheduleData.date}T${scheduleData.time}`,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to schedule meeting");
      }

      setSuccess(true);
      setTimeout(() => {
        router.push("/bookings");
      }, 2000);
    } catch (error) {
      console.error("Failed to schedule meeting:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof ScheduleData, value: string) => {
    setScheduleData((prev) => ({ ...prev, [field]: value }));
  };

  const handleMatchSelect = (match: any) => {
    setScheduleData((prev) => ({
      ...prev,
      matchId: match.id,
      matchName: match.name,
    }));
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const meetingTypes = [
    {
      value: "video",
      label: "Video Call",
      icon: Video,
      description: "Online video meeting",
    },
    {
      value: "phone",
      label: "Phone Call",
      icon: Phone,
      description: "Traditional phone call",
    },
    {
      value: "in_person",
      label: "In Person",
      icon: MapPin,
      description: "Meet in person",
    },
  ];

  const durations = [
    { value: "15", label: "15 minutes" },
    { value: "30", label: "30 minutes" },
    { value: "45", label: "45 minutes" },
    { value: "60", label: "1 hour" },
    { value: "90", label: "1.5 hours" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/bookings">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Bookings
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Schedule Meeting
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                Book a meeting with your match
              </p>
            </div>
          </div>
        </div>

        {success && (
          <Card className="mb-6 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2 text-green-800 dark:text-green-200">
                <Calendar className="w-5 h-5" />
                <span className="font-medium">
                  Meeting scheduled successfully!
                </span>
              </div>
              <p className="text-sm text-green-600 dark:text-green-300 mt-1">
                Redirecting to your bookings...
              </p>
            </CardContent>
          </Card>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Select Match */}
          <Card>
            <CardHeader>
              <CardTitle>Select Match</CardTitle>
              <CardDescription>
                Choose who you'd like to meet with
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {matches.map((match) => (
                  <div
                    key={match.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      scheduleData.matchId === match.id
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                    onClick={() => handleMatchSelect(match)}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {match.name}
                        </p>
                        <p className="text-sm text-gray-500">
                          {match.location}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {scheduleData.matchId && (
                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    Selected: <strong>{scheduleData.matchName}</strong>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Meeting Details */}
          <Card>
            <CardHeader>
              <CardTitle>Meeting Details</CardTitle>
              <CardDescription>
                When and how would you like to meet?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Date and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    type="date"
                    value={scheduleData.date}
                    onChange={(e) => handleInputChange("date", e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="time">Time *</Label>
                  <Input
                    id="time"
                    type="time"
                    value={scheduleData.time}
                    onChange={(e) => handleInputChange("time", e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Duration */}
              <div>
                <Label htmlFor="duration">Duration</Label>
                <select
                  id="duration"
                  value={scheduleData.duration}
                  onChange={(e) =>
                    handleInputChange("duration", e.target.value)
                  }
                  className="w-full mt-1 p-2 border border-input rounded-md bg-background"
                >
                  {durations.map((duration) => (
                    <option key={duration.value} value={duration.value}>
                      {duration.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Meeting Type */}
              <div>
                <Label>Meeting Type *</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-2">
                  {meetingTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <div
                        key={type.value}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          scheduleData.type === type.value
                            ? "border-primary bg-primary/5"
                            : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                        }`}
                        onClick={() => handleInputChange("type", type.value)}
                      >
                        <div className="text-center">
                          <Icon
                            className={`w-6 h-6 mx-auto mb-2 ${
                              scheduleData.type === type.value
                                ? "text-primary"
                                : "text-gray-500"
                            }`}
                          />
                          <p className="font-medium text-sm">{type.label}</p>
                          <p className="text-xs text-gray-500">
                            {type.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Location (if in-person) */}
              {scheduleData.type === "in_person" && (
                <div>
                  <Label htmlFor="location">Meeting Location *</Label>
                  <Input
                    id="location"
                    value={scheduleData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                    placeholder="Enter the meeting location"
                    required
                  />
                </div>
              )}

              {/* Notes */}
              <div>
                <Label htmlFor="notes">Notes (Optional)</Label>
                <textarea
                  id="notes"
                  value={scheduleData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Add any additional notes for the meeting..."
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <div className="flex justify-end space-x-4">
            <Button type="button" variant="outline" asChild>
              <Link href="/bookings">Cancel</Link>
            </Button>
            <Button
              type="submit"
              disabled={
                loading ||
                !scheduleData.matchId ||
                !scheduleData.date ||
                !scheduleData.time
              }
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Scheduling...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Schedule Meeting
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
