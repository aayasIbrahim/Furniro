import { NextResponse } from "next/server";
import User from "@/models/User";
import dbConnect from "@/lib/db";

export async function GET() {
  try {
    await dbConnect();
    const users = await User.find();
    return NextResponse.json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
