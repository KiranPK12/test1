"use client";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { AuthLoading, Authenticated, ConvexReactClient } from "convex/react";
import { Loading } from "@/components/shared/Loading";
interface ConvexClientProviderProps {
  children: React.ReactNode;
}

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL as string
);

export const ConvexClientProvider = ({
  children,
}: ConvexClientProviderProps) => {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <AuthLoading>
          <Loading />
        </AuthLoading>
        <Authenticated>{children}</Authenticated>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};
