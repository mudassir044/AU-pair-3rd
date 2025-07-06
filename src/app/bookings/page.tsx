"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import {
  Calendar,
  Clock,
  MapPin,
  User,
  Phone,
  Mail,
  CheckCircle,
  AlertCircle,
  Loader2,
  Plus,
  Filter,
} from "lucide-react";

interface Booking {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  duration: number;
  location: string;
  type: "interview" | "meeting" | "call" | "visit";
  status: "pending" | "confirmed" | "cancelled" | "completed";
  participantName: string;
  participantEmail: string;
  participantPhone?: string;
  createdAt: string;
}

export default function BookingsPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuthStore();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/auth/login");
    } else if (isAuthenticated && user) {
      fetchBookings();
    }
  }, [authLoading, isAuthenticated, user, router]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("auth-token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }

      const data = await response.json();
      setBookings(data.bookings || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      setError("Unable to load bookings. Please try again.");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const createBooking = async (bookingData: Partial<Booking>) => {
    try {
      const token = localStorage.getItem("auth-token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bookingData),
        },
      );

      if (response.ok) {
        setShowCreateForm(false);
        fetchBookings();
      }
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  const updateBookingStatus = async (bookingId: string, status: string) => {
    try {
      const token = localStorage.getItem("auth-token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${bookingId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }),
        },
      );

      if (response.ok) {
        fetchBookings();
      }
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "cancelled":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "completed":
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString([], {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredBookings =
    filterStatus === "all"
      ? bookings
      : bookings.filter((booking) => booking.status === filterStatus);

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-gray-600 dark:text-gray-300">
            Loading bookings...
          </p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Bookings
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Manage your interviews and meetings
            </p>
          </div>
          <Button
            onClick={() => setShowCreateForm(true)}
            className="mt-4 sm:mt-0 flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            New Booking
          </Button>
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Filter:
            </span>
          </div>
          {["all", "pending", "confirmed", "completed", "cancelled"].map(
            (status) => (
              <Button
                key={status}
                variant={filterStatus === status ? "default" : "outline"}
                size="sm"
                onClick={() => setFilterStatus(status)}
                className="capitalize"
              >
                {status}
              </Button>
            ),
          )}
        </div>

        {error ? (
          <Card className="text-center p-8">
            <CardContent>
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={fetchBookings}>Try Again</Button>
            </CardContent>
          </Card>
        ) : filteredBookings.length === 0 ? (
          <Card className="text-center p-8">
            <CardContent>
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No bookings found
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {filterStatus === "all"
                  ? "You don't have any bookings yet. Create your first booking to get started."
                  : `No ${filterStatus} bookings found.`}
              </p>
              {filterStatus === "all" && (
                <Button onClick={() => setShowCreateForm(true)}>
                  Create First Booking
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {filteredBookings.map((booking) => (
              <Card
                key={booking.id}
                className="shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{booking.title}</CardTitle>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">
                        {booking.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(booking.status)}
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}
                      >
                        {booking.status.charAt(0).toUpperCase() +
                          booking.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{formatDate(booking.date)}</span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>
                          {formatTime(booking.time)} ({booking.duration}{" "}
                          minutes)
                        </span>
                      </div>
                      {booking.location && (
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <MapPin className="w-4 h-4 mr-2" />
                          <span>{booking.location}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <User className="w-4 h-4 mr-2" />
                        <span>{booking.participantName}</span>
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-300">
                        <Mail className="w-4 h-4 mr-2" />
                        <span>{booking.participantEmail}</span>
                      </div>
                      {booking.participantPhone && (
                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                          <Phone className="w-4 h-4 mr-2" />
                          <span>{booking.participantPhone}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {booking.status === "pending" && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() =>
                          updateBookingStatus(booking.id, "confirmed")
                        }
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Confirm
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          updateBookingStatus(booking.id, "cancelled")
                        }
                        className="text-red-600 border-red-200 hover:bg-red-50"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}

                  {booking.status === "confirmed" && (
                    <Button
                      size="sm"
                      onClick={() =>
                        updateBookingStatus(booking.id, "completed")
                      }
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      Mark as Completed
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Create Booking Modal/Form would go here */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Create New Booking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Booking creation form would be implemented here, connecting to
                  your backend API.
                </p>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setShowCreateForm(false)}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                  <Button onClick={() => setShowCreateForm(false)}>
                    Create Booking
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
