import { isArabic } from "@/utils/langStore";
import { CircularProgress } from "@mui/material";
import React from "react";
import { useContext } from "react";

export default function () {
    const isArabicProp = useContext(isArabic).arabic
  return (
    <div className={` w-15000  ${isArabicProp? "mr":"ml"} h-screen flex items-center justify-center bg-gray-400/50`}>
      <CircularProgress />
    </div>
  );
}
