import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { internal } from "./_generated/api";

const handleClerkWebhook = httpAction(async (ctx, request) => {
  const payloadString = await request.text();
  const headerPayload = request.headers;
  try {
    const event = await ctx.runAction(internal.clerk.fullfill, {
      payload: payloadString,
      headers: {
        "svix-id": headerPayload.get("svix-id")!,
        "svix-timestamp": headerPayload.get("svix-timestamp")!,
        "svix-signature": headerPayload.get("svix-signature")!,
      },
    });
    switch (event.type) {
      case "user.created": {
        await ctx.runMutation(internal.users.createUser, {
          email: event.data.email_addresses[0]?.email_address,
          firstName: event.data.first_name,
          lastName: event.data.last_name,
          photo: event.data.image_url,
          userName: event.data.username!,
          clerkId: event.data.id,
        });
        break;
      }

      case "user.updated": {
        await ctx.runMutation(internal.users.updateUser, {
          email: event.data.email_addresses[0]?.email_address,
          firstName: event.data.first_name,
          lastName: event.data.last_name,
          photo: event.data.image_url,
          userName: event.data.username!,
          clerkId: event.data.id,
        });
        break;
      }

      case "user.deleted": {
        // TODO: check and clear if thre are any event by the user
        await ctx.runMutation(internal.users.deleteUser, {
          clerkId: event.data.id!,
        });
        break;
      }
    }
    return new Response(null, { status: 200 });
  } catch (error) {
    return new Response("Webhook error", {
      status: 400,
    });
  }
});

const http = httpRouter();
http.route({
  path: "/clerk",
  method: "POST",
  handler: handleClerkWebhook,
});

export default http;
