import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import { AuthProvider } from "./context/AuthContext";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vignan Annapurna Management System",
  description: "Order food from your Vignan Annapurna online",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark:bg-gray-900">
      <body suppressHydrationWarning className={`${inter.className} dark:bg-gray-900 dark:text-white`}>
        <AuthProvider>
          <Providers>
            <div className="min-h-screen bg-background text-foreground dark:bg-gray-900 dark:text-white transition-colors duration-300">
              {<Navbar />}
              <main className="container mx-auto px-4 py-6 min-h-[80vh] dark:bg-gray-900">{children}</main>
              <div className="bottom-0">{<Footer />}</div>
            </div>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
