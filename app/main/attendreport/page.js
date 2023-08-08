"use client";
import Reports from "@/app/components/reports/Reports";
import { isArabic } from "@/utils/langStore";
import React from "react";
import { useContext } from "react";

export default function DetailedAttendance() {
  const isArabicprop = useContext(isArabic).arabic;

  //
  //Label
  //

  return (
    <div className=" font-sans">
      <div>
        <Reports
          label={
            isArabicprop
              ? "تقرير حضور و انصراف التفصيلي"
              : "Detailed Attendance Report"
          }
        />
      </div>
    </div>
  );
}
