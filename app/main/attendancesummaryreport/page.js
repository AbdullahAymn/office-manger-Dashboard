"use client";
import Reports from "@/app/components/reports/Reports";
import { isArabic } from "@/utils/langStore";
import React from "react";
import { useContext } from "react";

export default function AttendanceSummaryReport() {
  const isArabicprop = useContext(isArabic).arabic;
  return (
    <div className=" font-sans">
      <div>
        <Reports
          label={isArabicprop ? "ملخص الحضور الكلي" : "Attendance Summary"}
        />
      </div>
    </div>
  );
}
