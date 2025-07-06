import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const { email, redirectTo } = formData;

    // Validate inputs
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Call your backend API for password reset
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/password-reset`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "request",
          email,
          redirectTo,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Backend error:", data);
      return NextResponse.json(
        { error: "Password reset request failed", details: data.message },
        { status: response.status },
      );
    }

    if (!data.success) {
      return NextResponse.json(
        {
          error: data.error || "Password reset request failed",
          details: data.details,
        },
        { status: 400 },
      );
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Password reset email sent successfully",
    });
  } catch (error: any) {
    console.error("Password reset request error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 },
    );
  }
}
