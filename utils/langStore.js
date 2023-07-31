"use client";
import Cookies from "js-cookie";
import React, { createContext, useState } from "react";


export const isArabic = createContext();

export default function LangStore({ children }) {
  
  const [arabic, setArabic] = useState( true );
  return (
    <isArabic.Provider value={{ arabic, setArabic }}>
      {children}
    </isArabic.Provider>
  );
}


