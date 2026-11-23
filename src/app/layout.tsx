import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KOV INTERIOR | Luxury Studio Enterprise OS",
  description: "Luxury Interior Design Studio & Architectural Platform • Prahlad Nagar, Ahmedabad",
  icons: {
    icon: "/assets/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,300..900;1,6..12,300..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body className="antialiased bg-[#0D0F13] text-[#F3F4F6] font-sans selection:bg-[#C9A46C] selection:text-black">
        {children}
      </body>
    </html>
  );
}
