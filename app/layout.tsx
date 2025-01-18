import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import { AuthProvider } from "./context/AuthContext";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "College Canteen Management System",
  description: "Order food from your college canteen online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={inter.className}>
        <AuthProvider>
          <Providers>
            <div className="min-h-screen bg-background">
              {<Navbar />}
              <main className="container mx-auto px-4 py-6 min-h-[80vh]">{children}</main>
              <div className="bottom-0">{<Footer />}</div>
            </div>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
