"use client";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import LogIn from "./components/Login";

export default function Home() {
  const token = Cookies.get("token") || false;
  const router = useRouter();

  const goDash = () => {
    router.push("/main");
  };

  if (token) {
    goDash();
    return;
  }

  return <LogIn />;
}
