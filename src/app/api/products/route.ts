import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
export const dynamic = "force-dynamic"; // disable caching

// =====================
// GET (with pagination)
// =====================

export async function GET(req: Request) {
  try {
    await connectDB();
    // 2️⃣ URL থেকে query parameters বের করি
    const { searchParams } = new URL(req.url);
    const pageParam = searchParams.get("page");
    const limitParam = searchParams.get("limit");

    let products, pagination = null;

    if (pageParam && limitParam) {
      // 3️⃣ Pagination parameters safely parse
      const page = Math.max(parseInt(pageParam, 10) || 1, 1); // কমপক্ষে 1
      const limit = Math.min(Math.max(parseInt(limitParam, 10) || 10, 1), 100); // 1 থেকে 100
      const skip = (page - 1) * limit;

      // 4️⃣ Products এবং total count একই সাথে fetch
      const [list, total] = await Promise.all([
        Product.find({}).skip(skip).limit(limit).lean(),
        Product.countDocuments(),
      ]);

      products = list;
      pagination = {
        total,                 // total products
        page,                  // current page
        limit,                 // items per page
        totalPages: Math.ceil(total / limit), // মোট page সংখ্যা
      };
    } else {
      // 5️⃣ Pagination না থাকলে সব product return
      products = await Product.find({}).lean();
    }

    // 6️⃣ Response return
    return NextResponse.json({ success: true, products, pagination });

  } catch (err) {
    // 7️⃣ Error handling
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