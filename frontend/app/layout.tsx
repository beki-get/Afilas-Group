import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Afilas Group",
  description:
    "Afilas Group - Healthcare, Diagnostics, and Manufacturing",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* Reusable Navbar */}
        

        {/* Page Content */}
        {children}
      </body>
    </html>
  );
}