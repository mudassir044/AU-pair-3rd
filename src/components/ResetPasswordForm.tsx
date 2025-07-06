"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function ResetPasswordForm() {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Extract token from URL on component mount
  useEffect(() => {
    // Get the token from the URL hash or query parameters
    const hash = window.location.hash;
    const searchParams = new URLSearchParams(window.location.search);

    let accessToken = "";

    // Check hash first (Supabase default)
    if (hash && hash.includes("access_token=")) {
      const hashParams = new URLSearchParams(hash.substring(1));
      accessToken = hashParams.get("access_token") || "";
    }
    // Then check query parameters
    else if (searchParams.has("token")) {
      accessToken = searchParams.get("token") || "";
    }

    if (accessToken) {
      setToken(accessToken);
    } else {
      setError(
        "No reset token found in URL. Please request a new password reset link.",
      );
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await fetch("/api/auth/update-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || data.details || "Failed to reset password",
        );
      }

      setMessage("Password reset successful! Redirecting to login...");

      // Clear form
      setNewPassword("");
      setConfirmPassword("");

      // Redirect to login after a short delay
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (error: any) {
      console.error("Password reset error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Reset Your Password
        </CardTitle>
        <CardDescription className="text-center">
          Enter your new password below
        </CardDescription>
      </CardHeader>
      <CardContent>
        {message && (
          <div className="mb-4 p-3 rounded-md bg-green-50 border border-green-200 text-green-800 text-sm">
            {message}
          </div>
        )}
        {error && (
          <div className="mb-4 p-3 rounded-md bg-red-50 border border-red-200 text-red-800 text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={8}
              placeholder="Enter new password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={8}
              placeholder="Confirm new password"
            />
          </div>
          <Button type="submit" disabled={loading || !token} className="w-full">
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
        <div className="mt-6 text-center">
          <Link
            href="/auth/login"
            className="text-sm text-blue-600 hover:text-blue-500 font-medium"
          >
            Back to Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
