import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  imageUrl: string;
  badge?: string;
  category: "chair" | "table" | "sofa" | "storage"; 
  isFeatured: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductSchema: Schema<IProduct> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    oldPrice: {
      type: Number,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    badge: {
      type: String,
    },
    category: {
      type: String,
      required: true,
      enum: ["chair", "table", "sofa", "storage"], // 👈 restrict allowed values
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Product =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
