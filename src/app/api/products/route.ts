import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Product from "@/models/Product";
export const dynamic = "force-dynamic";

// =====================
// GET (Search + Category + Price + Pagination + Min/Max Price)
// =====================
export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const pageParam = searchParams.get("page");
    const limitParam = searchParams.get("limit");
    const search = searchParams.get("search")?.trim() || "";
    const category = searchParams.get("category")?.trim() || "";
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    const page = Math.max(parseInt(pageParam || "1", 10), 1);
    const limit = Math.min(Math.max(parseInt(limitParam || "10", 10), 1), 100);
    const skip = (page - 1) * limit;

    // 🔹 Build filters
   
    const filters: any = {};  // eslint-disable-line @typescript-eslint/no-explicit-any

    if (search) {
      filters.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (category) filters.category = category;

    if (minPrice !== null && minPrice !== undefined)
      filters.price = { ...filters.price, $gte: Number(minPrice) };
    if (maxPrice !== null && maxPrice !== undefined)
      filters.price = { ...filters.price, $lte: Number(maxPrice) };

    // 🔹 Aggregation for min/max price
    const priceStatsAgg = await Product.aggregate([
      { $match: filters },
      {
        $group: {
          _id: null,
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
    ]);

    const minPriceInDB = priceStatsAgg[0]?.minPrice || 0;
    const maxPriceInDB = priceStatsAgg[0]?.maxPrice || 0;

    // 🔹 Fetch paginated products + total count
    const [products, total] = await Promise.all([
      Product.find(filters).skip(skip).limit(limit).lean(),
      Product.countDocuments(filters),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      products,
      pagination: { total, page, limit, totalPages },
      minPriceInDB,
      maxPriceInDB,
    });
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
  try {
    await connectDB();
    const body = await req.json();
    const created = await Product.create(body);
    return NextResponse.json(created, { status: 201 });
  } catch (err) {
    console.error("❌ Error creating product:", err);
    return NextResponse.json(
      { success: false, error: (err as Error).message || "Server error" },
      { status: 500 }
    );
  }
}
