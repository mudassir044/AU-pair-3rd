"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/lib/utils";
import {
  MessageCircle,
  Users,
  Calendar,
  User as LucideUser,
  Star,
  MapPin,
  Languages,
} from "lucide-react";
import {
  Heart,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { User } from '@/store/authStore';

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const [stats, setStats] = useState({
    newMatches: 0,
    unreadMessages: 0,
    upcomingMeetings: 0,
  });

  const [recentMatches, setRecentMatches] = useState([]);
  const [profileCompletion, setProfileCompletion] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchDashboardData();
    }

    // Update time every minute
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, [isAuthenticated, user, router]);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      if (!token) return;

      const [statsResponse, matchesResponse, profileResponse] = await Promise.all([
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard/stats`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/matches/recent`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profile/completion`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats(statsData);
      }

      if (matchesResponse.ok) {
        const matchesData = await matchesResponse.json();
        setRecentMatches(matchesData.matches || []);
      }

      if (profileResponse.ok) {
        const profileData = await profileResponse.json();
        setProfileCompletion(profileData.completion || 0);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    }
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const mockStats = {
    newMatches: 12,
    unreadMessages: 3,
    upcomingMeetings: 2,
    profileCompletion: profileCompletion || 85,
  };

  const mockMatches = [
    {
      id: 1,
      name: user?.role === "au_pair" ? "The Johnson Family" : "Maria Rodriguez",
      location: user?.role === "au_pair" ? "New York, USA" : "Madrid, Spain",
      match: 95,
      image: "https://images.pexels.com/photos/755049/pexels-photo-755049.jpeg",
      status: "new",
      rating: 4.9,
      languages: ["English", "Spanish"],
    },
    {
      id: 2,
      name: user?.role === "au_pair" ? "The Smith Family" : "Anna Mueller",
      location: user?.role === "au_pair" ? "London, UK" : "Berlin, Germany",
      match: 88,
      image:
        "https://images.pexels.com/photos/2714626/pexels-photo-2714626.jpeg",
      status: "contacted",
      rating: 4.8,
      languages: ["English", "German"],
    },
    {
      id: 3,
      name: user?.role === "au_pair" ? "The Brown Family" : "Sophie Laurent",
      location: user?.role === "au_pair" ? "Paris, France" : "Lyon, France",
      match: 92,
      image:
        "https://images.pexels.com/photos/15817434/pexels-photo-15817434.jpeg",
      status: "interested",
      rating: 4.7,
      languages: ["French", "English"],
    },
  ];

  const recentActivity = [
    {
      type: "match",
      message: "New match found: The Johnson Family",
      time: "2 hours ago",
      icon: Heart,
    },
    {
      type: "message",
      message: "Message from Maria Rodriguez",
      time: "4 hours ago",
      icon: MessageCircle,
    },
    {
      type: "booking",
      message: "Video call scheduled for tomorrow",
      time: "1 day ago",
      icon: Calendar,
    },
    {
      type: "document",
      message: "Background check completed",
      time: "2 days ago",
      icon: CheckCircle,
    },
  ];

  const upcomingTasks = [
    {
      task: "Complete profile verification",
      priority: "high",
      dueDate: "Today",
    },
    {
      task: "Upload additional photos",
      priority: "medium",
      dueDate: "This week",
    },
    {
      task: "Schedule video call with Maria",
      priority: "high",
      dueDate: "Tomorrow",
    },
    { task: "Review safety guidelines", priority: "low", dueDate: "Next week" },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    useEffect(() => {
      router.push("/auth/login");
    }, [router]);

    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {getGreeting()}, {user.firstName || user.name}! 👋
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">
                Here's what's happening with your{" "}
                {user.role === "au_pair" ? "au pair" : "host family"} journey.
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">
                {currentTime.toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                {currentTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>

        {/* Profile Completion Banner */}
        {mockStats.profileCompletion < 100 && (
          <Card className="mb-8 bg-gradient-to-r from-primary-50 to-blue-50 dark:from-primary-950 dark:to-blue-950 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      Complete your profile
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Your profile is {mockStats.profileCompletion}% complete.
                      Finish it to get better matches!
                    </p>
                  </div>
                </div>
                <Button asChild>
                  <Link href="/profile">Complete Profile</Link>
                </Button>
              </div>
              <div className="mt-4">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary to-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${mockStats.profileCompletion}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Matches</CardTitle>
              <Heart className="h-5 w-5 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">
                {mockStats.newMatches}
              </div>
              <p className="text-xs text-muted-foreground flex items-center mt-1">
                <TrendingUp className="w-3 h-3 mr-1" />
                +2 from last week
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages</CardTitle>
              <MessageCircle className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {mockStats.unreadMessages}
              </div>
              <p className="text-xs text-muted-foreground">
                Unread conversations
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Meetings</CardTitle>
              <Calendar className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {mockStats.upcomingMeetings}
              </div>
              <p className="text-xs text-muted-foreground">This week</p>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profile</CardTitle>
              <FileText className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">
                {mockStats.profileCompletion}%
              </div>
              <p className="text-xs text-muted-foreground">Completion rate</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Matches */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span>Top Matches</span>
                </CardTitle>
                <CardDescription>
                  {user.role === "au_pair" ? "Host families" : "Au pairs"} that
                  match your preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockMatches.map((match) => (
                    <div
                      key={match.id}
                      className="flex items-center space-x-4 p-4 rounded-lg border hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <Image
                        src={match.image}
                        alt={match.name}
                        width={60}
                        height={60}
                        className="w-15 h-15 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {match.name}
                          </p>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              match.status === "new"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : match.status === "contacted"
                                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                            }`}
                          >
                            {match.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">
                          {match.location}
                        </p>
                        <div className="flex items-center space-x-4 mt-1">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                            <span className="text-sm">{match.rating}</span>
                          </div>
                          <div className="flex space-x-1">
                            {match.languages.map((lang, index) => (
                              <span
                                key={index}
                                className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded"
                              >
                                {lang}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-green-600">
                          {match.match}%
                        </p>
                        <p className="text-xs text-gray-500">match</p>
                        <Button size="sm" className="mt-2">
                          View Profile
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Button asChild className="w-full">
                    <Link href="/matches">View All Matches</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Recent Activity */}
          <div className="space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>
                  Common tasks to manage your profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full justify-start hover:bg-primary hover:text-white transition-colors"
                  >
                    <Link href="/messages">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Check Messages ({mockStats.unreadMessages})
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full justify-start hover:bg-primary hover:text-white transition-colors"
                  >
                    <Link href="/bookings">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Meeting
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full justify-start hover:bg-primary hover:text-white transition-colors"
                  >
                    <Link href="/documents">
                      <FileText className="mr-2 h-4 w-4" />
                      Upload Documents
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full justify-start hover:bg-primary hover:text-white transition-colors"
                  >
                    <Link href="/profile">
                      <Users className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Latest updates and notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => {
                    const Icon = activity.icon;
                    return (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <Icon className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {activity.message}
                          </p>
                          <p className="text-xs text-gray-500 flex items-center mt-1">
                            <Clock className="w-3 h-3 mr-1" />
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Upcoming Tasks</CardTitle>
                <CardDescription>Things you need to complete</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingTasks.map((task, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg border"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium">{task.task}</p>
                        <p className="text-xs text-gray-500">{task.dueDate}</p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          task.priority === "high"
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            : task.priority === "medium"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}