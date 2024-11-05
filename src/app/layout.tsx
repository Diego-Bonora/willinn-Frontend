import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import AuthProvider from "@/auth/components/AuthProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Willinn",
  description: "Prueba tecnica | Willinn frontend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en" className={`${poppins.variable}`}>
        <body>{children}</body>
      </html>
    </AuthProvider>
  );
}
