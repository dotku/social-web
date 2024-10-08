import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AppNavbar from "@/components/AppNavbar";
import { NextUIProvider, Spinner } from "@nextui-org/react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import ApolloLayout from "@/components/Layouts/ApolloLayout";
import { Analytics } from "@vercel/analytics/react";

const client = new ApolloClient({
  uri: `https://${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_REF}.supabase.co/graphql/v1`,
  cache: new InMemoryCache(),
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Social Web",
  description: "yet, another social network",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextUIProvider>
          <ApolloLayout>
            <AppNavbar />
            <div className="max-w-7xl mx-auto px-3">{children}</div>
          </ApolloLayout>
        </NextUIProvider>
        <Analytics />
      </body>
    </html>
  );
}
