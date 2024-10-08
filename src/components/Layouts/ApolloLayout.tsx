"use client";

import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { ReactNode } from "react";

const httpLink = createHttpLink({
  uri: `https://${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_REF}.supabase.co/graphql/v1`,
});

const authLink = setContext((_, { headers }) => {
  // Ensure headers is always a plain object
  let safeHeaders = {};

  // If headers is an instance of Headers or Map, convert to plain object
  if (headers instanceof Headers) {
    safeHeaders = Object.fromEntries(headers.entries());
  } else if (headers && typeof headers === "object") {
    safeHeaders = { ...headers };
  }
  const token =
    localStorage.getItem("token") || process.env.NEXT_PUBLIC_SUPABASE_API_KEY;
  // return the headers to the context so httpLink can read them
  return {
    headers: Object({
      ...safeHeaders,
      apikey: token,
      authorization: token ? `Bearer ${token}` : "",
    }),
  };
});

const client = new ApolloClient({
  // Replace with your GraphQL API URL
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function ApolloLayout({ children }: { children: ReactNode }) {
  console.log("[ApolloLayout] client");
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
