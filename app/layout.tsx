import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HAPPY BIRTHDAY ♡ | A Cinematic Celebration",
  description: "An interactive, cinematic digital birthday universe.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Caveat:wght@400;500;600;700&family=Cinzel:wght@400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-[#05050A] text-[#FFF7ED] font-sans antialiased selection:bg-purple-500/30 selection:text-pink-200 overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
