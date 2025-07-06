import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const { token, newPassword } = formData;

    // Validate inputs
    if (!token || !newPassword) {
      return NextResponse.json(
        { error: "Token and new password are required" },
        { status: 400 },
      );
    }

    // Call your backend API for password update
    const response = await fetch(
      `${process.env.BACKEND_URL}/auth/update-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "verify",
          token,
          newPassword,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Backend error:", data);
      return NextResponse.json(
        { error: "Password update failed", details: data.message },
        { status: response.status },
      );
    }

    if (!data.success) {
      return NextResponse.json(
        {
          error: data.error || "Password update failed",
          details: data.details,
        },
        { status: 400 },
      );
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Password updated successfully",
      user: data.user,
    });
  } catch (error: any) {
    console.error("Password update error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}
