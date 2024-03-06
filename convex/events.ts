import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { userQuery } from "./users";
import { Id } from "./_generated/dataModel";

export const createEvent = mutation({
  args: {
    userId: v.string(),
    title: v.string(),
    imageUrl: v.string(),
    description: v.string(),
    location: v.string(),
    categoryId: v.id("category"),
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

    const userDbId = await userQuery(ctx, args.userId);
    const newEvent = await ctx.db.insert("events", {
      title: args.title,
      description: args.description,
      imageUrl: args.imageUrl,
      endDateTime: args.endDateTime,
      startDateTime: args.startDateTime,
      location: args.location,
      categoryId: args.categoryId,
      organizerId: userDbId?._id as Id<"users">,
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
    let eventWithOrganizerAndCategory;
    const event = await ctx.db.get(args.id);
    if (!event) {
      throw new Error("Event does not exist!!");
    }
    const organizer = await ctx.db.get(event.organizerId);
    const category = await ctx.db.get(event.categoryId);
    eventWithOrganizerAndCategory = {
      ...event,
      category: { ...category! ,},
      organizer: { ...organizer! },
    };

    return eventWithOrganizerAndCategory;
  },
});
