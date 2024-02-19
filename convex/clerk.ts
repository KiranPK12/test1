import type { WebhookEvent } from "@clerk/clerk-sdk-node";
import { Webhook } from "svix";
import { internalAction } from "./_generated/server";
import { v } from "convex/values";

export const fullfill = internalAction({
  args: { headers: v.any(), payload: v.any() },
  handler: async (ctx, args) => {
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
    const payload = wh.verify(args.payload, args.headers) as WebhookEvent;
    return payload;
  },
});
