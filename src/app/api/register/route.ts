import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = (await req.json()) as {
      fullName: string;
      email: string;
      password: string;
    };

    // check required fields
    if (!body.fullName || !body.email || !body.password) {
      return new Response(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400 }
      );
    }

    // check if user exists
    const exists = await User.findOne({ email: body.email });
    if (exists) {
      return new Response(JSON.stringify({ message: "User already exists" }), {
        status: 400,
      });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(body.password, 10);

    // new user always gets "user" role by default
    const user = new User({
      fullName: body.fullName,
      email: body.email,
      password: hashedPassword,
      role: "user", //  Default role
    });

    await user.save();

    return new Response(
      JSON.stringify({ message: "User created successfully" }),
      { status: 201 }
    );
  } catch (err) {
    console.error("Error creating user:", err);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
