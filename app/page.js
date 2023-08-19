"use client";
import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import LogIn from "./components/Login";

export default function Home() {
  const token = Cookies.get("token") || false;
  const router = useRouter();

  if (token) {
    router.push("/main");
    return;
  } 
  return <LogIn />
}
