import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "@/providers/ConvexClientProvider";
// import { ClerkProvider } from "@clerk/nextjs";
// import ConvexClientProvider from "@/providers/ConvexClientProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "BookMyEvent",
  description: "BookMyEvent is a platform management app ",
  icons: {
    icon: "/assets/images/Asset1.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.variable}>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
