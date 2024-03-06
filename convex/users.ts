import { v } from "convex/values";
import { QueryCtx, internalMutation } from "./_generated/server";


export const createUser = internalMutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    userName: v.string(),
    photo: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("users", {
      email: args.email,
      clerkId: args.clerkId,
      firstName: args.firstName,
      lastName: args.lastName,
      photo: args.photo,
      userName: args.userName,
    });
  },
});

export const deleteUser = internalMutation({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await userQuery(ctx, args.clerkId);
    console.log(user?._id);

    if (!user) {
      console.warn("can't delete user, user does not exist");
    } else {
      await ctx.db.delete(user?._id);
    }
  },
});

export const updateUser = internalMutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    userName: v.string(),
    photo: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await userQuery(ctx, args.clerkId);
    if (!user) {
      console.warn("user does not exists");
    } else {
      await ctx.db.patch(user._id, {
        email: args.email,
        firstName: args.email,
        lastName: args.lastName,
        userName: args.userName,
        photo: args.photo,
      });
    }
  },
});

// helper functions
export async function userQuery(ctx: QueryCtx, clerkUserId: string) {
  return await ctx.db
    .query("users")
    .withIndex("by_clerk_id", (q) => q.eq("clerkId", clerkUserId))
    .unique();
}
