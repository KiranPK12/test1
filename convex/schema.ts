import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    userName: v.string(),
    firstName: v.string(),
    LastName: v.string(),
    photo: v.string(),
  }).searchIndex("clerk_id", {
    searchField: "clerkId",
  }),
});
