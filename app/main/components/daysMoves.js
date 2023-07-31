"use client";
import { isArabic } from "@/utils/langStore";
import React, { useContext } from "react";

export default function DaysMoves(props) {
  const arabicProp = useContext(isArabic).arabic;
  return (
    <div className=" w-full bg-white shadow-lg">
      <div className="p-4 flex items-center text-xl border-b">
        <h1 className=" text-blue-300">
          <i class="fa-solid fa-globe"></i>{" "}
          {arabicProp ? "حركات يوم" : "Day Transactions"} {" , "}
        </h1>
        <h1>
          {props.day} {props.date}{" "}
        </h1>
      </div>
      <div className=" p-8 text-3xl">
        {arabicProp ? " لا توجد حركات يوم" : "No Transactions Today"}
      </div>
    </div>
  );
}
