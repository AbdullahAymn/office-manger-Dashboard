"use client";

import { isArabic } from "@/utils/langStore";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import Label from "./Label";
import Search from "./Search";

export default function Reports(props) {
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
          label={props.label}
        />
      </div>

      <div className=" mb-12">{showSearch && <Search />}</div>
    </div>
  );
}
