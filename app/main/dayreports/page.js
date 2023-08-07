"use client";

import Reports from "@/app/components/reports/Reports";
import { isArabic } from "@/utils/langStore";
import React from "react";
import { useState } from "react";
import { useContext } from "react";

export default function DayReports() {
  const isArabicprop = useContext(isArabic).arabic;

  //
  //Label
  //

  return (
    <div className=" font-sans">
      <div><Reports label={isArabicprop ? "حالة اليوم" : "Day Status"} /></div>
    </div>
  );
}
