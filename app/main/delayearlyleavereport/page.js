"use client";
import Reports from "@/app/components/reports/Reports";
import { isArabic } from "@/utils/langStore";
import React from "react";
import { useContext } from "react";

export default function DelayEarlyLeaveReport() {
    const isArabicprop = useContext(isArabic).arabic;
    return (
      <div className=" font-sans">
        <div>
          <Reports
            label={
              isArabicprop ? 'التاخير والانصراف المبكر' : "Delay and Early Leave"
            }
          />
        </div>
      </div>
    );
}