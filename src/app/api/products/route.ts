import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
export const dynamic = "force-dynamic"; // disable caching


// =====================
// GET (with Search + Pagination)
// =====================

export async function GET(req: Request) {
  try {
    await connectDB();

    // 🔹 Query parameters
    const { searchParams } = new URL(req.url);
    const pageParam = searchParams.get("page");
    const limitParam = searchParams.get("limit");
    const search = searchParams.get("search") || "";

    let products, pagination = null;

    // 🔹 Search filter (name or description)
    const searchFilter = search
      ? {
          $or: [
            { name: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
          ],
        }
      : {};

    // 🔹 Pagination
    if (pageParam && limitParam) {
      const page = Math.max(parseInt(pageParam, 10) || 1, 1);
      const limit = Math.min(Math.max(parseInt(limitParam, 10) || 10, 1), 100);
      const skip = (page - 1) * limit;

      // 🔹 Fetch products + total count (with search filter)
      const [list, total] = await Promise.all([
        Product.find(searchFilter).skip(skip).limit(limit).lean(),
        Product.countDocuments(searchFilter),
      ]);

      products = list;
      pagination = {
        total, // total products
        page, // current page
        limit, // items per page
        totalPages: Math.ceil(total / limit),
      };
    } else {
      // 🔹 Homepage / no pagination
      products = await Product.find(searchFilter).limit(8).lean();
    }

    // ✅ Return response
    return NextResponse.json({ success: true, products, pagination });
  } catch (err) {
    console.error("❌ Error fetching products:", err);
    return NextResponse.json(
      { success: false, error: (err as Error).message || "Server error" },
      { status: 500 }
    );
  }
}


// =====================
// POST new Product
// =====================
export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  const created = await Product.create(body);
  return NextResponse.json(created, { status: 201 });
}
