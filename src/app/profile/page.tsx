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
  Save,
  Upload,
  User,
  MapPin,
  Languages,
  FileText,
  Camera,
  Plus,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ProfileData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  country: string;
  city: string;
  bio: string;
  languages: string[];
  experience: string;
  hobbies: string;
  education: string;
  availability: string;
  photos: string[];
}

export default function ProfilePage() {
  const { user, isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("personal");
  const [newLanguage, setNewLanguage] = useState("");

  const [profileData, setProfileData] = useState<ProfileData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    country: "",
    city: "",
    bio: "",
    languages: [],
    experience: "",
    hobbies: "",
    education: "",
    availability: "",
    photos: [],
  });

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/auth/login");
      return;
    }

    if (user) {
      // Pre-fill with existing user data
      setProfileData((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        // Add other existing fields if available
      }));
      fetchProfileData();
    }
  }, [isAuthenticated, isLoading, user, router]);

  const fetchProfileData = async () => {
    try {
      const token = localStorage.getItem("auth-token");
      if (!token) return;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/profile`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.ok) {
        const data = await response.json();
        setProfileData((prev) => ({ ...prev, ...data.profile }));
      }
    } catch (error) {
      console.error("Failed to fetch profile data:", error);
    }
  };

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  const addLanguage = () => {
    if (
      newLanguage.trim() &&
      !profileData.languages.includes(newLanguage.trim())
    ) {
      setProfileData((prev) => ({
        ...prev,
        languages: [...prev.languages, newLanguage.trim()],
      }));
      setNewLanguage("");
    }
  };

  const removeLanguage = (language: string) => {
    setProfileData((prev) => ({
      ...prev,
      languages: prev.languages.filter((lang) => lang !== language),
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    setSaveSuccess(false);

    try {
      const token = localStorage.getItem("auth-token");
      if (!token) throw new Error("No auth token");

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/profile`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profileData),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to save profile");
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to save profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateCompletion = () => {
    const fields = [
      profileData.firstName,
      profileData.lastName,
      profileData.phone,
      profileData.dateOfBirth,
      profileData.country,
      profileData.city,
      profileData.bio,
      profileData.experience,
      profileData.hobbies,
      profileData.education,
      profileData.availability,
    ];

    const completed = fields.filter(
      (field) => field && field.length > 0,
    ).length;
    const languagesComplete = profileData.languages.length > 0 ? 1 : 0;
    const photosComplete = profileData.photos.length > 0 ? 1 : 0;

    return Math.round(
      ((completed + languagesComplete + photosComplete) / (fields.length + 2)) *
        100,
    );
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "preferences", label: "Preferences", icon: Languages },
    { id: "media", label: "Photos", icon: Camera },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Edit Profile
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                  Complete your profile to get better matches
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-primary">
                {calculateCompletion()}%
              </div>
              <div className="text-sm text-gray-500">Complete</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary to-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${calculateCompletion()}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 border-b">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-t-lg transition-colors ${
                  activeTab === tab.id
                    ? "bg-white dark:bg-gray-800 border-b-2 border-primary text-primary"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === "personal" && (
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>
                    Your personal details and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={profileData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        disabled
                        className="bg-gray-100 dark:bg-gray-800"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={profileData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth</Label>
                      <Input
                        id="dateOfBirth"
                        type="date"
                        value={profileData.dateOfBirth}
                        onChange={(e) =>
                          handleInputChange("dateOfBirth", e.target.value)
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country *</Label>
                      <Input
                        id="country"
                        value={profileData.country}
                        onChange={(e) =>
                          handleInputChange("country", e.target.value)
                        }
                        placeholder="Enter your country"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={profileData.city}
                        onChange={(e) =>
                          handleInputChange("city", e.target.value)
                        }
                        placeholder="Enter your city"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>About You</CardTitle>
                  <CardDescription>
                    Tell potential matches about yourself
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="bio">Bio *</Label>
                    <textarea
                      id="bio"
                      value={profileData.bio}
                      onChange={(e) => handleInputChange("bio", e.target.value)}
                      placeholder="Tell us about yourself, your interests, and what you're looking for..."
                      className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      rows={5}
                    />
                  </div>

                  <div>
                    <Label htmlFor="experience">Experience</Label>
                    <textarea
                      id="experience"
                      value={profileData.experience}
                      onChange={(e) =>
                        handleInputChange("experience", e.target.value)
                      }
                      placeholder="Describe your relevant experience..."
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="hobbies">Hobbies & Interests</Label>
                      <Input
                        id="hobbies"
                        value={profileData.hobbies}
                        onChange={(e) =>
                          handleInputChange("hobbies", e.target.value)
                        }
                        placeholder="e.g., Reading, Sports, Music"
                      />
                    </div>
                    <div>
                      <Label htmlFor="education">Education</Label>
                      <Input
                        id="education"
                        value={profileData.education}
                        onChange={(e) =>
                          handleInputChange("education", e.target.value)
                        }
                        placeholder="Your education background"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "preferences" && (
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Languages</CardTitle>
                  <CardDescription>
                    Languages you speak or are learning
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex gap-2">
                      <Input
                        value={newLanguage}
                        onChange={(e) => setNewLanguage(e.target.value)}
                        placeholder="Add a language"
                        onKeyPress={(e) => e.key === "Enter" && addLanguage()}
                      />
                      <Button onClick={addLanguage} size="sm">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {profileData.languages.map((language, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                        >
                          <span>{language}</span>
                          <button
                            onClick={() => removeLanguage(language)}
                            className="hover:bg-primary/20 rounded-full p-1"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Availability</CardTitle>
                  <CardDescription>When are you available?</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label htmlFor="availability">Availability Details</Label>
                    <textarea
                      id="availability"
                      value={profileData.availability}
                      onChange={(e) =>
                        handleInputChange("availability", e.target.value)
                      }
                      placeholder="Describe your availability, preferred start date, duration, etc."
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "media" && (
            <Card>
              <CardHeader>
                <CardTitle>Photos</CardTitle>
                <CardDescription>
                  Add photos to help families get to know you better
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                    <Camera className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <div className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Upload photos
                    </div>
                    <div className="text-sm text-gray-500 mb-4">
                      Drag and drop files here, or click to browse
                    </div>
                    <Button variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Choose Files
                    </Button>
                  </div>

                  {profileData.photos.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {profileData.photos.map((photo, index) => (
                        <div key={index} className="relative group">
                          <Image
                            src={photo}
                            alt={`Profile photo ${index + 1}`}
                            width={200}
                            height={200}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => {
                                setProfileData((prev) => ({
                                  ...prev,
                                  photos: prev.photos.filter(
                                    (_, i) => i !== index,
                                  ),
                                }));
                              }}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Save Button */}
        <div className="sticky bottom-0 bg-white dark:bg-gray-900 border-t py-4 mt-8">
          <div className="flex justify-end space-x-4">
            <Button variant="outline" asChild>
              <Link href="/dashboard">Cancel</Link>
            </Button>
            <Button onClick={handleSave} disabled={loading}>
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Profile
                </>
              )}
            </Button>
          </div>

          {saveSuccess && (
            <div className="mt-2 text-right text-sm text-green-600 dark:text-green-400">
              ✓ Profile saved successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
