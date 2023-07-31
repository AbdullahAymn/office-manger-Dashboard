"use client";
import "./globals.css";
import "../utils/all.min.css";
import { Inter } from "next/font/google";
import LangStore, { isArabic } from "../utils/langStore";
import { useContext } from "react";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Easy Soft",
//   // description: "office manger",
//   // icons: {
//   //   icon: '/ed.jpg',
//   // },
// };

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <title>Easy Soft</title>
        <meta name="description" content="" />
        <link rel="icon" href="/logo.ico" />
      </head>
      <LangStore deferLoading={true}>{children}</LangStore>
    </html>
  );
}
