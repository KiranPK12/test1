import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { userQuery } from "./users";

export const createEvent = mutation({
  args: {
    userId: v.string(),
    title: v.string(),
    imageUrl: v.string(),
    description: v.string(),
    location: v.string(),
    categoryId: v.string(),
    price: v.string(),
    url: v.string(),
    isFree: v.boolean(),
    startDateTime: v.any(),
    endDateTime: v.any(),
  },
  handler: async (ctx, args) => {
    const organizer = await userQuery(ctx, args.userId);
    if (!organizer) {
      throw new Error("Organizer not found");
    }
    const newEvent = await ctx.db.insert("events", {
      title: args.title,
      description: args.description,
      imageUrl: args.imageUrl,
      endDateTime: args.endDateTime,
      startDateTime: args.startDateTime,
      location: args.location,
      categoryId: args.categoryId,
      organizerId: args.userId,
      isFree: args.isFree,
      price: args.price,
      url: args.url,
    });
    return newEvent;
  },
});

export const getEventById = query({
  args: { id: v.id("events") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});
