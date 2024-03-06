import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    userName: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    photo: v.string(),
  }).index("by_clerk_id", ["clerkId"]),

  category: defineTable({
    name: v.string(),
  }),

  events: defineTable({
    title: v.string(),
    description: v.string(),
    location: v.string(),
    isFree: v.boolean(),
    imageUrl: v.string(),
    startDateTime: v.any(),
    endDateTime: v.any(),
    price: v.string(),
    url: v.string(),
    categoryId: v.id("category"),
    organizerId: v.id("users"),
  }),

  // TODO:check for data types of id
  order: defineTable({
    stripeId: v.string(),
    totalAmount: v.string(),
    eventId: v.id("events"),
    buyer: v.id("users"),
  }),
});
