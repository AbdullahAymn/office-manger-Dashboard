"use client";
import Cookies from "js-cookie";
import React, { createContext, useState } from "react";
import { useEffect } from "react";

export const isArabic = createContext();

export default function LangStore({ children }) {
  const [arabic, setArabic] = useState(true);
  const [numOfShifts, setNumOfShifts] = useState(4);
  const [refresh, setRefresh] = useState(true);

  useEffect((e) => {
    const token = Cookies.get("token");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}\n`);
    fetch(`https://backend2.dasta.store/api/auth/basicInfoFetchtosetting`, {
      method: "GET",
      headers: myHeaders,
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          if (!!data[0].num_shift) {
            if (data[0].num_shift > 4) {
              setNumOfShifts(4);
            } else if (data[0].num_shift < 1) {
              setNumOfShifts(1);
            } else {
              setNumOfShifts(data[0].num_shift);
              
            }
          }
        });
      }
    });
  }, [refresh]);

  


  return (
    <isArabic.Provider
      value={{ arabic, setArabic, numOfShifts, setNumOfShifts , refresh, setRefresh }}
    >
      {children}
    </isArabic.Provider>
  );
}
