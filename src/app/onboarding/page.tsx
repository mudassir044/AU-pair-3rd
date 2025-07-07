"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  role: "au_pair" | "host_family";
  name: string;
}

export default function OnboardingPage() {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check auth storage used by useAuthStore
    const authData = localStorage.getItem("auth-storage");
    if (authData) {
      try {
        const parsedData = JSON.parse(authData);
        if (parsedData.state?.user && parsedData.state?.isAuthenticated) {
          setUser(parsedData.state.user);
        } else {
          router.push("/auth/login");
        }
      } catch (error) {
        console.error("Error parsing auth data:", error);
        router.push("/auth/login");
      }
    } else {
      router.push("/auth/login");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Mock API call - in real app, use axios to save profile
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push("/dashboard");
    } catch (error) {
      console.error("Profile update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              Complete Your Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {user.role === "au_pair" ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={formData.name || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Enter your age"
                      value={formData.age || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, age: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="languages">
                      Languages (comma separated)
                    </Label>
                    <Input
                      id="languages"
                      placeholder="e.g., English, Spanish, French"
                      value={formData.languages || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, languages: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="Tell us about yourself..."
                      value={formData.bio || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, bio: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="preferredCountries">
                      Preferred Countries
                    </Label>
                    <Input
                      id="preferredCountries"
                      placeholder="e.g., USA, Canada, UK"
                      value={formData.preferredCountries || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          preferredCountries: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="familyName">Family Name</Label>
                    <Input
                      id="familyName"
                      placeholder="Enter your family name"
                      value={formData.familyName || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, familyName: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="childrenInfo">Children Information</Label>
                    <textarea
                      id="childrenInfo"
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="Ages and brief description of your children..."
                      value={formData.childrenInfo || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          childrenInfo: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="City, Country"
                      value={formData.location || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="languages">Languages Spoken at Home</Label>
                    <Input
                      id="languages"
                      placeholder="e.g., English, Spanish"
                      value={formData.languages || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, languages: e.target.value })
                      }
                      required
                    />
                  </div>
                </>
              )}

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Saving Profile..." : "Complete Profile"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
