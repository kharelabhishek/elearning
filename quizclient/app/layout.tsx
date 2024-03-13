import Providers from "@/components/layout/providers";
import { Toaster } from "@/components/ui/sonner";
import "@uploadthing/react/styles.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { ReactQueryClientProvider } from "@/components/reactquery/ReactQueryClientProvider";
import NextTopLoader from 'nextjs-toploader';
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Learning",
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
            <NextTopLoader color="red"
              initialPosition={0.08}
              crawlSpeed={200}
              height={3}
              crawl={true}
              showSpinner={false}
              easing="ease"
              speed={200}
              shadow="0 0 10px #2299DD,0 0 5px #2299DD" />
            {children}
            <Toaster />
          </Providers>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
