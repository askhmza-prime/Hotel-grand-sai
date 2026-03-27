import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hotel Grand Sai — Luxury Stays in Moradabad",
  description:
    "Experience premium hospitality at Hotel Grand Sai, Moradabad. Luxury rooms, grand banquet halls, wedding venues, and fine dining at Lazeer Restaurant.",
  keywords: "Hotel Grand Sai, Moradabad hotel, luxury hotel Moradabad, banquet hall Moradabad, wedding venue UP",
  openGraph: {
    title: "Hotel Grand Sai — Moradabad",
    description: "Luxury Stays • Banquets • Weddings • Fine Dining",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect for faster image loads */}
        <link rel="preconnect" href="https://picsum.photos" />
      </head>
      <body className="bg-cream text-charcoal antialiased">
        {children}
      </body>
    </html>
  );
}
