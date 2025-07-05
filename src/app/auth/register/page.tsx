"use client";

import { useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Heart,
  Users,
  Home,
  ArrowLeft,
  Check,
  Eye,
  EyeOff,
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";

function RegisterForm() {
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState<
    "host_family" | "au_pair" | null
  >(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    phone: "",
    dateOfBirth: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const role = searchParams.get("role");
    if (role === "host" || role === "aupair") {
      setSelectedRole(role === "host" ? "host_family" : "au_pair");
      setStep(2);
    }
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 2) {
      if (!formData.email) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email))
        newErrors.email = "Email is invalid";

      if (!formData.password) newErrors.password = "Password is required";
      else if (formData.password.length < 8)
        newErrors.password = "Password must be at least 8 characters";

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    if (currentStep === 3) {
      if (!formData.firstName) newErrors.firstName = "First name is required";
      if (!formData.lastName) newErrors.lastName = "Last name is required";
      if (!formData.country) newErrors.country = "Country is required";
      if (!formData.city) newErrors.city = "City is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleRegister = async () => {
    if (!validateStep(step)) return;

    setLoading(true);
    try {
      const userData = {
        ...formData,
        role: selectedRole,
      };

      const response = await authAPI.register(userData);

      // Store user data and redirect to onboarding
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);

      // Emit custom event for auth state change
      window.dispatchEvent(new CustomEvent("authStateChanged"));

      router.push("/onboarding");
      router.refresh(); // Force refresh to update navigation state
    } catch (error: any) {
      console.error("Registration failed:", error);
      setErrors({
        general:
          error.response?.data?.message ||
          "Registration failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = [
    {
      id: "host_family",
      title: "Host Family",
      description:
        "Welcome an au pair into your home for childcare and cultural exchange",
      icon: Home,
      features: [
        "Find experienced au pairs",
        "Flexible childcare",
        "Cultural enrichment",
        "Trusted verification",
      ],
    },
    {
      id: "au_pair",
      title: "Au Pair",
      description:
        "Live with a host family abroad and experience a new culture",
      icon: Users,
      features: [
        "Live with local families",
        "Learn new languages",
        "Travel experience",
        "Career development",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50 dark:from-primary-950 dark:via-background dark:to-blue-950 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4 mb-4">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                    step >= num
                      ? "bg-primary border-primary text-white"
                      : "border-gray-300 text-gray-300"
                  }`}
                >
                  {step > num ? <Check className="w-5 h-5" /> : num}
                </div>
                {num < 3 && (
                  <div
                    className={`w-16 h-0.5 mx-2 ${
                      step > num ? "bg-primary" : "bg-gray-300"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Step {step} of 3
            </p>
          </div>
        </div>

        {/* Step 1: Role Selection */}
        {step === 1 && (
          <Card className="shadow-2xl border-0">
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold">
                Join Au Pair Connect
              </CardTitle>
              <CardDescription className="text-lg">
                Choose your role to get started with your cultural exchange
                journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                {roleOptions.map((role) => {
                  const Icon = role.icon;
                  return (
                    <Card
                      key={role.id}
                      className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                        selectedRole === role.id
                          ? "ring-2 ring-primary bg-primary-50 dark:bg-primary-950"
                          : "hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                      onClick={() =>
                        setSelectedRole(role.id as "host_family" | "au_pair")
                      }
                    >
                      <CardHeader className="text-center">
                        <div
                          className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                            selectedRole === role.id
                              ? "bg-primary text-white"
                              : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300"
                          }`}
                        >
                          <Icon className="w-8 h-8" />
                        </div>
                        <CardTitle className="text-xl">{role.title}</CardTitle>
                        <CardDescription className="text-base">
                          {role.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-2">
                          {role.features.map((feature, index) => (
                            <li
                              key={index}
                              className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                            >
                              <Check className="w-4 h-4 text-green-500 mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              <div className="mt-8 flex justify-center">
                <Button
                  onClick={handleNext}
                  disabled={!selectedRole}
                  size="lg"
                  className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary-600 hover:to-blue-700 px-8 py-3 rounded-2xl text-lg font-semibold"
                >
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Account Details */}
        {step === 2 && (
          <Card className="shadow-2xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">
                Create Your Account
              </CardTitle>
              <CardDescription>Set up your login credentials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {errors.general && (
                <div className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-300 text-center">
                  {errors.general}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={errors.password ? "border-red-500" : ""}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className={errors.confirmPassword ? "border-red-500" : ""}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-between">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="flex items-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary-600 hover:to-blue-700"
                >
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Personal Information */}
        {step === 3 && (
          <Card className="shadow-2xl border-0">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold">
                Personal Information
              </CardTitle>
              <CardDescription>Tell us a bit about yourself</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={errors.firstName ? "border-red-500" : ""}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={errors.lastName ? "border-red-500" : ""}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    placeholder="Enter your country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className={errors.country ? "border-red-500" : ""}
                  />
                  {errors.country && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.country}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="Enter your city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={errors.city ? "border-red-500" : ""}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone">Phone Number (Optional)</Label>
                  <Input
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <Label htmlFor="dateOfBirth">Date of Birth (Optional)</Label>
                  <Input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="flex justify-between">
                <Button
                  onClick={handleBack}
                  variant="outline"
                  className="flex items-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button
                  onClick={handleRegister}
                  disabled={loading}
                  className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary-600 hover:to-blue-700"
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-primary hover:underline font-medium"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-blue-50 dark:from-primary-950 dark:via-background dark:to-blue-950 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Loading...
            </p>
          </div>
        </div>
      }
    >
      <RegisterForm />
    </Suspense>
  );
}
