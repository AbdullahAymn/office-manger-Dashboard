import React from "react";
import { useContext } from "react";
import { isArabic } from "./langStore";

export default function useOptions(arr) {
  const isArabicprop = useContext(isArabic).arabic;
  const options = arr.map((e, index) => (
    <option key={index} value={e.namw}>
      {isArabicprop ?e.name: e.name_en}
    </option>
  ));
  return <>{options}</>;
}
