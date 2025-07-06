"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Heart,
  X,
  Star,
  MapPin,
  Users,
  Calendar,
  MessageCircle,
  Filter,
  Search,
  Loader2,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

interface Match {
  id: string;
  name: string;
  age: number;
  location: string;
  images: string[];
  bio: string;
  languages: string[];
  rating: number;
  experience: string;
  interests: string[];
  availability: string;
  verified: boolean;
  profilePhoto?: string;
}

export default function MatchesPage() {
  const { user, isAuthenticated, isLoading: authLoading } = useAuthStore();
  const [matches, setMatches] = useState<Match[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/auth/login");
    } else if (isAuthenticated && user) {
      fetchMatches();
    }
  }, [authLoading, isAuthenticated, user, router]);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("auth-token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/matches`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error("Failed to fetch matches");
      }

      const data = await response.json();
      setMatches(data.matches || []);
    } catch (error) {
      console.error("Error fetching matches:", error);
      setError("Unable to load matches. Please try again.");
      setMatches([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (matchId: string, action: "like" | "pass") => {
    try {
      const token = localStorage.getItem("auth-token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/matches/${matchId}/${action}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (response.ok) {
        // Move to next match
        if (currentIndex < matches.length - 1) {
          setCurrentIndex(currentIndex + 1);
        } else {
          // Fetch more matches or show completion message
          fetchMatches();
          setCurrentIndex(0);
        }
      }
    } catch (error) {
      console.error("Error handling match action:", error);
    }
  };

  const handleMessage = async (matchId: string) => {
    try {
      const token = localStorage.getItem("auth-token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/conversations`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ matchId }),
        },
      );

      if (response.ok) {
        const data = await response.json();
        router.push(`/messages?conversation=${data.conversationId}`);
      }
    } catch (error) {
      console.error("Error starting conversation:", error);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-gray-600 dark:text-gray-300">Loading matches...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const currentMatch = matches[currentIndex];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Discover Matches
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Find your perfect{" "}
            {user.role === "au_pair" ? "host family" : "au pair"} match
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search matches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>

        {error ? (
          <Card className="text-center p-8">
            <CardContent>
              <p className="text-red-600 mb-4">{error}</p>
              <Button onClick={fetchMatches}>Try Again</Button>
            </CardContent>
          </Card>
        ) : matches.length === 0 ? (
          <Card className="text-center p-8">
            <CardContent>
              <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No matches found
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                We&apos;re still looking for your perfect match. Check back
                soon!
              </p>
              <Button onClick={fetchMatches}>Refresh Matches</Button>
            </CardContent>
          </Card>
        ) : currentMatch ? (
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-xl">
              <CardHeader className="p-0">
                <div className="relative h-80 rounded-t-lg overflow-hidden">
                  <Image
                    src={
                      currentMatch.profilePhoto ||
                      currentMatch.images[0] ||
                      "/placeholder-avatar.jpg"
                    }
                    alt={currentMatch.name}
                    fill
                    className="object-cover"
                  />
                  {currentMatch.verified && (
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                      Verified
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <CardTitle className="text-2xl">
                      {currentMatch.name}
                    </CardTitle>
                    <p className="text-gray-600 dark:text-gray-300 flex items-center mt-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {currentMatch.location}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="font-medium">{currentMatch.rating}</span>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {currentMatch.bio}
                </p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      Languages
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {currentMatch.languages.map((lang, index) => (
                        <span
                          key={index}
                          className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      Experience
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {currentMatch.experience}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    Interests
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {currentMatch.interests.map((interest, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-6">
                  <Calendar className="w-4 h-4 mr-1" />
                  {currentMatch.availability}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => handleAction(currentMatch.id, "pass")}
                    className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <X className="w-5 h-5 mr-2" />
                    Pass
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => handleMessage(currentMatch.id)}
                    className="flex-1"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Message
                  </Button>
                  <Button
                    size="lg"
                    onClick={() => handleAction(currentMatch.id, "like")}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    Like
                  </Button>
                </div>

                <div className="mt-4 text-center text-sm text-gray-500">
                  {currentIndex + 1} of {matches.length} matches
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="text-center p-8">
            <CardContent>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                That&apos;s all for now!
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                You&apos;ve seen all available matches. Check back later for new
                matches.
              </p>
              <Button onClick={fetchMatches}>Refresh Matches</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
