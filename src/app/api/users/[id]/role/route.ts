import { NextResponse } from "next/server";
import User from "@/models/User";
import dbConnect from "@/lib/db"; // adjust path if needed

interface Params {
  id: string;
}

export async function PUT(
  req: Request,
  { params }: { params: Params }
) {
  await dbConnect();

  // Parse JSON from the request
  const body = await req.json();
  const role: "user" | "admin" = body.role;

  // Update user
  const user = await User.findByIdAndUpdate(params.id, { role }, { new: true });

  return NextResponse.json({ success: true, data: user });
}
