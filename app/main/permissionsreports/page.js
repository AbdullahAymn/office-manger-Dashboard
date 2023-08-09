"use client";
import Label from "@/app/components/reports/Label";
import { isArabic } from "@/utils/langStore";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import Search from "./components/Search";

export default function VacationsReports() {
  const isArabicprop = useContext(isArabic).arabic;
  //
  //Label
  //

  const [showSearch, setShowSearch] = useState(true);
  const showSearchHandeller = (val) => {
    setShowSearch(val);
  };
  return (
    <div className=" font-sans">
      <div>
        <Label
          setsearch={showSearchHandeller}
          label={isArabicprop ? 'اذونات الموظفين' : "Permissions"}
        />
      </div>
      {showSearch && <div><Search /></div>}
    </div>
  );
}
