import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
export const dynamic = "force-dynamic";
type Params = {
  params: { id: string };
};

// ✅ GET one Product
export async function GET(req: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const product = await Product.findById(params.id);
    if (!product)
      return NextResponse.json({ error: "Product not found" }, { status: 404 });

    return NextResponse.json(product);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// ✅ PUT update product
export async function PUT(req: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const data = await req.json();

    const updated = await Product.findByIdAndUpdate(params.id, data, {
      new: true,
      runValidators: true,
    });

    if (!updated)
      return NextResponse.json({ error: "Product not found" }, { status: 404 });

    return NextResponse.json(updated);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// ✅ DELETE Product
export async function DELETE(req: NextRequest, { params }: Params) {
  try {
    await connectDB();
    const deleted = await Product.findByIdAndDelete(params.id);

    if (!deleted)
      return NextResponse.json({ error: "Product not found" }, { status: 404 });

    return NextResponse.json({ success: true, id: params.id });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
