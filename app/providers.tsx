"use client";

import { QueryClient, QueryClientProvider } from "react-query";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false, // default: true
        },
      },
    })
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
