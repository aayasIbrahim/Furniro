import { NextResponse } from "next/server";
import Contact from "@/models/Contact";
import connectDB from "@/lib/db"; // তোমার MongoDB connection helper

export async function POST(req: Request) {
  try {
    await connectDB(); // 🧠 MongoDB connection ensure করো

    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 💾 ডেটা MongoDB তে save করো
    const newContact = await Contact.create({ name, email, subject, message });

    return NextResponse.json({
      success: true,
      message: "Message saved successfully!",
      data: newContact,
    });
  } catch (error) {
    console.error("❌ Contact API error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


export async function GET() {
  try {
    await connectDB();
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: contacts });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch contacts" },
      { status: 500 }
    );
  }
}