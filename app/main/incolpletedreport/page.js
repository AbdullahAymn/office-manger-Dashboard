"use client";
import Reports from "@/app/components/reports/Reports";
import { isArabic } from "@/utils/langStore";
import React from "react";
import { useContext } from "react";

export default function IncompletedTransReport() {
  const isArabicprop = useContext(isArabic).arabic;
  return (
    <div className=" font-sans">
      <div>
        <Reports
          label={isArabicprop ? 'الحركات الغير مكتملة' : "Incompleted Trans"}
        />
      </div>
    </div>
  );
}
