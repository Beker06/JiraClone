import type { Metadata } from "next";
import {Inter} from "next/font/google";
import {cn} from "@/lib/utils";

import "./globals.css";
import { QueryProvider } from "@/components/query-provider";

const inter = Inter({subsets: ["latin"]})

export const metadata: Metadata = {
  title: "Beker Jira",
  description: "A Jira Clone by Beker",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(inter.className, "antialiased min-h-screen")}
      >
        <QueryProvider>
          {children}  
        </QueryProvider>
      </body>
    </html>
  );
}
