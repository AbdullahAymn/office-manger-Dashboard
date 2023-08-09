"use client";
import Reports from "@/app/components/reports/Reports";
import { isArabic } from "@/utils/langStore";
import React from "react";
import { useContext } from "react";

export default function OverTimeReprt() {
    const isArabicprop = useContext(isArabic).arabic;
    return (
      <div className=" font-sans">
        <div>
          <Reports
            label={
              isArabicprop ? 'الإضافي' : "Overtime"
            }
          />
        </div>
      </div>
    );
}
