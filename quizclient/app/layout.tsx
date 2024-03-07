import Providers from "@/components/layout/providers";
import { Toaster } from "@/components/ui/toaster";
import "@uploadthing/react/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import  {ReactQueryClientProvider}  from "@/components/reactquery/ReactQueryClientProvider";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Shadcn",
  description: "Basic dashboard with Next.js and Shadcn",
};


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  return (
    <ReactQueryClientProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} overflow-hidden`}>
          <Providers session={session}>
            <Toaster />
            {children}
          </Providers>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
