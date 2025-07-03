"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Calendar,
  Clock,
  Video,
  Phone,
  MapPin,
  Check,
  X,
  Plus,
  Filter,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  role: "au_pair" | "host_family" | "admin";
  name: string;
}

interface Booking {
  id: string;
  title: string;
  type: "video_call" | "phone_call" | "in_person" | "interview";
  date: Date;
  duration: number; // in minutes
  status: "pending" | "confirmed" | "completed" | "cancelled";
  participant: {
    name: string;
    avatar: string;
    role: string;
  };
  notes?: string;
  location?: string;
  meetingLink?: string;
}

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function BookingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [view, setView] = useState<"calendar" | "list">("calendar");
  const [filter, setFilter] = useState<
    "all" | "pending" | "confirmed" | "completed"
  >("all");
  const router = useRouter();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      router.push("/auth/login");
      return;
    }

    // Mock bookings data
    const mockBookings: Booking[] = [
      {
        id: "1",
        title: "Initial Interview",
        type: "video_call",
        date: new Date(2025, 1, 15, 14, 0), // Feb 15, 2025, 2:00 PM
        duration: 60,
        status: "confirmed",
        participant: {
          name: "Maria Rodriguez",
          avatar:
            "https://images.pexels.com/photos/2714626/pexels-photo-2714626.jpeg",
          role: "Au Pair",
        },
        notes: "Get to know each other and discuss expectations",
        meetingLink: "https://meet.google.com/abc-defg-hij",
      },
      {
        id: "2",
        title: "Family Meet & Greet",
        type: "video_call",
        date: new Date(2025, 1, 18, 16, 30), // Feb 18, 2025, 4:30 PM
        duration: 45,
        status: "pending",
        participant: {
          name: "The Johnson Family",
          avatar:
            "https://images.pexels.com/photos/755049/pexels-photo-755049.jpeg",
          role: "Host Family",
        },
        notes: "Meet the children and discuss daily routines",
      },
      {
        id: "3",
        title: "Contract Discussion",
        type: "phone_call",
        date: new Date(2025, 1, 20, 10, 0), // Feb 20, 2025, 10:00 AM
        duration: 30,
        status: "confirmed",
        participant: {
          name: "Anna Mueller",
          avatar:
            "https://images.pexels.com/photos/15817434/pexels-photo-15817434.jpeg",
          role: "Au Pair",
        },
        notes: "Review contract terms and conditions",
      },
      {
        id: "4",
        title: "Coffee Meet-up",
        type: "in_person",
        date: new Date(2025, 1, 12, 15, 0), // Feb 12, 2025, 3:00 PM
        duration: 90,
        status: "completed",
        participant: {
          name: "Sophie Laurent",
          avatar:
            "https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg",
          role: "Au Pair",
        },
        location: "Central Park Café, NYC",
        notes: "Casual meeting to get to know each other",
      },
    ];

    setBookings(mockBookings);
  }, [router]);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const getBookingsForDate = (date: Date) => {
    return bookings.filter(
      (booking) => booking.date.toDateString() === date.toDateString(),
    );
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1),
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "confirmed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "completed":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video_call":
        return <Video className="w-4 h-4" />;
      case "phone_call":
        return <Phone className="w-4 h-4" />;
      case "in_person":
        return <MapPin className="w-4 h-4" />;
      default:
        return <Calendar className="w-4 h-4" />;
    }
  };

  const filteredBookings = bookings.filter(
    (booking) => filter === "all" || booking.status === filter,
  );

  const upcomingBookings = bookings
    .filter(
      (booking) => booking.date > new Date() && booking.status !== "cancelled",
    )
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, 3);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Bookings
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">
                Manage your meetings and interviews
              </p>
            </div>
            <div className="flex space-x-3">
              <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                <Button
                  variant={view === "calendar" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setView("calendar")}
                >
                  Calendar
                </Button>
                <Button
                  variant={view === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setView("list")}
                >
                  List
                </Button>
              </div>
              <Button className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary-600 hover:to-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                New Booking
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Upcoming
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {
                      bookings.filter(
                        (b) => b.date > new Date() && b.status !== "cancelled",
                      ).length
                    }
                  </p>
                </div>
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Pending
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {bookings.filter((b) => b.status === "pending").length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Confirmed
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {bookings.filter((b) => b.status === "confirmed").length}
                  </p>
                </div>
                <Check className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Completed
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {bookings.filter((b) => b.status === "completed").length}
                  </p>
                </div>
                <Check className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {view === "calendar" ? (
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">
                      {MONTHS[currentDate.getMonth()]}{" "}
                      {currentDate.getFullYear()}
                    </CardTitle>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handlePrevMonth}
                      >
                        &lt;
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleNextMonth}
                      >
                        &gt;
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-7 gap-1 mb-4">
                    {DAYS.map((day) => (
                      <div
                        key={day}
                        className="p-2 text-center text-sm font-medium text-gray-500"
                      >
                        {day}
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {getDaysInMonth(currentDate).map((date, index) => {
                      if (!date) {
                        return <div key={index} className="p-2 h-24"></div>;
                      }

                      const dayBookings = getBookingsForDate(date);
                      const isToday =
                        date.toDateString() === new Date().toDateString();
                      const isSelected =
                        selectedDate?.toDateString() === date.toDateString();

                      return (
                        <div
                          key={index}
                          onClick={() => handleDateClick(date)}
                          className={`p-2 h-24 border rounded-lg cursor-pointer transition-colors ${
                            isSelected
                              ? "bg-primary text-white"
                              : isToday
                                ? "bg-primary-50 dark:bg-primary-950 border-primary"
                                : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
                          }`}
                        >
                          <div
                            className={`text-sm font-medium mb-1 ${isSelected ? "text-white" : ""}`}
                          >
                            {date.getDate()}
                          </div>
                          <div className="space-y-1">
                            {dayBookings.slice(0, 2).map((booking) => (
                              <div
                                key={booking.id}
                                className={`text-xs px-1 py-0.5 rounded truncate ${
                                  isSelected
                                    ? "bg-white/20 text-white"
                                    : getStatusColor(booking.status)
                                }`}
                              >
                                {booking.title}
                              </div>
                            ))}
                            {dayBookings.length > 2 && (
                              <div
                                className={`text-xs ${isSelected ? "text-white" : "text-gray-500"}`}
                              >
                                +{dayBookings.length - 2} more
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>All Bookings</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Filter className="w-4 h-4 text-gray-500" />
                      <select
                        value={filter}
                        onChange={(e) => setFilter(e.target.value as any)}
                        className="border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 text-sm bg-white dark:bg-gray-800"
                      >
                        <option value="all">All</option>
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Image
                              src={booking.participant.avatar}
                              alt={booking.participant.name}
                              width={40}
                              height={40}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                {booking.title}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                with {booking.participant.name}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}
                            >
                              {booking.status}
                            </span>
                            <div className="text-right">
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {booking.date.toLocaleDateString()}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                {booking.date.toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                          <div className="flex items-center space-x-1">
                            {getTypeIcon(booking.type)}
                            <span>{booking.type.replace("_", " ")}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{booking.duration} min</span>
                          </div>
                        </div>
                        {booking.notes && (
                          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            {booking.notes}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Bookings */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Meetings</CardTitle>
                <CardDescription>
                  Your next scheduled appointments
                </CardDescription>
              </CardHeader>
              <CardContent>
                {upcomingBookings.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingBookings.map((booking) => (
                      <div
                        key={booking.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-3"
                      >
                        <div className="flex items-center space-x-3">
                          <Image
                            src={booking.participant.avatar}
                            alt={booking.participant.name}
                            width={32}
                            height={32}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                              {booking.title}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                              {booking.participant.name}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center justify-between text-xs text-gray-600 dark:text-gray-300">
                          <span>{booking.date.toLocaleDateString()}</span>
                          <span>
                            {booking.date.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center space-x-2">
                          {getTypeIcon(booking.type)}
                          <span className="text-xs text-gray-600 dark:text-gray-300">
                            {booking.type.replace("_", " ")}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-300 text-center py-4">
                    No upcoming meetings
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Video className="w-4 h-4 mr-2" />
                    Schedule Video Call
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Phone className="w-4 h-4 mr-2" />
                    Schedule Phone Call
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MapPin className="w-4 h-4 mr-2" />
                    Schedule Meeting
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Calendar className="w-4 h-4 mr-2" />
                    View Availability
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Selected Date Details */}
            {selectedDate && (
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">
                    {selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {getBookingsForDate(selectedDate).length > 0 ? (
                    <div className="space-y-3">
                      {getBookingsForDate(selectedDate).map((booking) => (
                        <div
                          key={booking.id}
                          className="border border-gray-200 dark:border-gray-700 rounded-lg p-3"
                        >
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {booking.title}
                            </h4>
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(booking.status)}`}
                            >
                              {booking.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                            {booking.date.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}{" "}
                            • {booking.duration} min
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            with {booking.participant.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-300 text-center py-4">
                      No bookings for this date
                    </p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
