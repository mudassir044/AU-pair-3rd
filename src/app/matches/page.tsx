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
  const [user, setUser] = useState<User | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (userData && token) {
      setUser(JSON.parse(userData));
      fetchMatches();
    } else {
      router.push("/auth/login");
    }
  }, [router]);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      // const response = await profileAPI.getMatches();
      // setMatches(response.data || []);
      //Mock matches data
      const mockMatches: Match[] = [
        {
          id: 1,
          name:
            user?.role === "au_pair" ? "The Johnson Family" : "Maria Rodriguez",
          age: user?.role === "au_pair" ? 35 : 22,
          location:
            user?.role === "au_pair" ? "New York, USA" : "Madrid, Spain",
          images: [
            "https://images.pexels.com/photos/755049/pexels-photo-755049.jpeg",
            "https://images.pexels.com/photos/7579306/pexels-photo-7579306.jpeg",
          ],
          bio:
            user?.role === "au_pair"
              ? "Loving family with 2 children (ages 5 and 8). Looking for a caring au pair to help with childcare and become part of our family."
              : "Experienced au pair with 3 years of childcare experience. Love outdoor activities, teaching languages, and creating fun learning experiences.",
          languages: ["English", "Spanish"],
          rating: 4.9,
          experience:
            user?.role === "au_pair" ? "3 years hosting" : "3 years childcare",
          interests: ["Sports", "Cooking", "Travel", "Music"],
          availability: "Available from March 2025",
          verified: true,
        },
        {
          id: 2,
          name: user?.role === "au_pair" ? "The Smith Family" : "Anna Mueller",
          age: user?.role === "au_pair" ? 32 : 24,
          location: user?.role === "au_pair" ? "London, UK" : "Berlin, Germany",
          images: [
            "https://images.pexels.com/photos/2714626/pexels-photo-2714626.jpeg",
            "https://images.pexels.com/photos/8828605/pexels-photo-8828605.jpeg",
          ],
          bio:
            user?.role === "au_pair"
              ? "Active family seeking an au pair who loves outdoor activities. We have 1 toddler and enjoy weekend adventures."
              : "Creative and energetic au pair who loves arts, crafts, and outdoor adventures. Great with toddlers and school-age children.",
          languages: ["English", "German"],
          rating: 4.8,
          experience:
            user?.role === "au_pair" ? "2 years hosting" : "2 years childcare",
          interests: ["Art", "Hiking", "Photography", "Languages"],
          availability: "Available from April 2025",
          verified: true,
        },
        {
          id: 3,
          name:
            user?.role === "au_pair" ? "The Brown Family" : "Sophie Laurent",
          age: user?.role === "au_pair" ? 29 : 23,
          location: user?.role === "au_pair" ? "Paris, France" : "Lyon, France",
          images: [
            "https://images.pexels.com/photos/15817434/pexels-photo-15817434.jpeg",
            "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg",
          ],
          bio:
            user?.role === "au_pair"
              ? "Multicultural family looking for an au pair to help with our 3 children and share cultural experiences."
              : "Passionate about education and child development. Fluent in French and English, love teaching and learning new cultures.",
          languages: ["French", "English", "Italian"],
          rating: 4.7,
          experience:
            user?.role === "au_pair" ? "4 years hosting" : "1 year childcare",
          interests: ["Education", "Culture", "Books", "Swimming"],
          availability: "Available from May 2025",
          verified: true,
        },
      ];
      setMatches(mockMatches);
      //
    } catch (error) {
      console.error("Error fetching matches:", error);
      // setError("Failed to load matches. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = (matchId: number) => {
    console.log("Liked:", matchId);
    nextMatch();
    // Here you would call API to record the like
  };

  const handlePass = (matchId: number) => {
    console.log("Passed:", matchId);
    nextMatch();
    // Here you would call API to record the pass
  };

  const nextMatch = () => {
    if (currentIndex < matches.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Show "no more matches" state
      setCurrentIndex(matches.length);
    }
  };

  const handleMessage = (matchId: number) => {
    router.push(`/messages?new=${matchId}`);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const currentMatch = matches[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50 dark:from-primary-950 dark:via-background dark:to-blue-950">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Discover{" "}
                {user.role === "au_pair" ? "Host Families" : "Au Pairs"}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">
                Find your perfect cultural exchange match
              </p>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>
        </div>

        {currentIndex >= matches.length ? (
          // No more matches state
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-8">
              <Heart className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              No More Matches
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-center mb-8 max-w-md">
              You've seen all available matches. Check back later for new
              profiles or adjust your preferences.
            </p>
            <div className="flex space-x-4">
              <Button onClick={() => setCurrentIndex(0)}>Review Matches</Button>
              <Button variant="outline" onClick={() => router.push("/profile")}>
                Update Preferences
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Match Card */}
            <div className="lg:col-span-2">
              <Card className="shadow-2xl border-0 overflow-hidden">
                <div className="relative">
                  <Image
                    src={currentMatch.images[0]}
                    alt={currentMatch.name}
                    width={800}
                    height={400}
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute top-4 right-4 flex space-x-2">
                    {currentMatch.verified && (
                      <div className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        Verified
                      </div>
                    )}
                    <div className="bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                      <Star className="w-4 h-4 mr-1 text-yellow-400 fill-current" />
                      {currentMatch.rating}
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                    <h2 className="text-3xl font-bold mb-2">
                      {currentMatch.name}
                    </h2>
                    <div className="flex items-center space-x-4 text-sm">
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {currentMatch.age} years old
                      </span>
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {currentMatch.location}
                      </span>
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-2">About</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {currentMatch.bio}
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-2">Languages</h3>
                      <div className="flex flex-wrap gap-2">
                        {currentMatch.languages.map((language, index) => (
                          <span
                            key={index}
                            className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                          >
                            {language}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-2">Interests</h3>
                      <div className="flex flex-wrap gap-2">
                        {currentMatch.interests.map((interest, index) => (
                          <span
                            key={index}
                            className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                          >
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          Experience
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {currentMatch.experience}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">
                          Availability
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {currentMatch.availability}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-6 mt-8">
                <Button
                  onClick={() => handlePass(currentMatch.id)}
                  variant="outline"
                  size="lg"
                  className="w-16 h-16 rounded-full border-2 border-red-300 hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-950"
                >
                  <X className="w-8 h-8 text-red-500" />
                </Button>
                <Button
                  onClick={() => handleMessage(currentMatch.id)}
                  variant="outline"
                  size="lg"
                  className="w-16 h-16 rounded-full border-2 border-blue-300 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950"
                >
                  <MessageCircle className="w-8 h-8 text-blue-500" />
                </Button>
                <Button
                  onClick={() => handleLike(currentMatch.id)}
                  size="lg"
                  className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 shadow-lg"
                >
                  <Heart className="w-8 h-8 text-white" />
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Match Progress */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Matches viewed</span>
                        <span>
                          {currentIndex + 1} of {matches.length}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-primary to-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{
                            width: `${((currentIndex + 1) / matches.length) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Tips */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">
                    Tips for Better Matches
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-1.5"></div>
                      <p>
                        Complete your profile to get better match suggestions
                      </p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-1.5"></div>
                      <p>Upload multiple photos to showcase your personality</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-1.5"></div>
                      <p>Be specific about your preferences and expectations</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-1.5"></div>
                      <p>Send personalized messages when you match</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Likes */}
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                        <Heart className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">New match!</p>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Message received</p>
                        <p className="text-xs text-gray-500">5 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Profile viewed</p>
                        <p className="text-xs text-gray-500">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
