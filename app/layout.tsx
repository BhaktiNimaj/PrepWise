import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const MonaSans = Mona_Sans({
    variable: "--font-mona-sans",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Prep_Wise",
    description: "An AI powered platform for preparing for mock interviews",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
        <body className={`${MonaSans.className} antialiased pattern`}>
        {children}
        <Toaster position="top-right" />
        </body>
        </html>
    );
}
