import { v } from "convex/values";
import { internalQuery, mutation, query } from "./_generated/server";

export const createCategory = mutation({
  args: {
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const categoryId = await ctx.db.insert("category", {
      name: args.name,
    });
    const category = await ctx.db.get(categoryId);
    return category;
  },
});

export const getAllCategories = query({
  handler: async (ctx) => {
    const categories = await ctx.db.query("category").collect();
    return categories;
  },
});
