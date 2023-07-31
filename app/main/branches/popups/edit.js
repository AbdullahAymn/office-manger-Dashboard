"use client";
import { isArabic } from "@/utils/langStore";
import React, { useContext } from "react";

export default function Edit(props) {
  const isArabicprop = useContext(isArabic).arabic;

  return (
    <div className=" h-screen w-full flex items-center justify-center">
      <div className=" font-sans rounded-md bg-white w-full md:w-3/4 getin">
        <div className=" p-4 text-xl bg-sky-400 rounded-t-md text-white text-center">
          <h1>
            {isArabicprop ? "تعديل" : "Edit"} {isArabicprop ? props.branch : props.branchEn}
          </h1>
        </div>
        <div className=" grid grid-cols-6 md:grid-cols-12 items-center mb-4">
          <div className=" col-span-6 w-full p-2">
            <h4>{isArabicprop ? "الأسم العربي" : "Name in arabic"}</h4>
            <input
              className=" w-full outline-none border-1 p-1"
              value={props.branch}
              type="text"
            ></input>
          </div>
          <div className=" col-span-6 w-full p-2">
            <h4>{isArabicprop ? "الأسم الانجليزي" : "Name in English"}</h4>
            <input
              className=" w-full outline-none border-1 p-1"
              value={props.branchEn}
              type="text"
            ></input>
          </div>
          <div className=" col-span-6 md:col-span-12 w-full ">
            <div className="w-full md:w-1/2 mx-auto p-2">
              <h4>{isArabicprop ? "المدير " : "Manger"}</h4>
              <input
                className=" w-full outline-none border-1 p-1"
                value={props.manger}
                type="text"
              ></input>
            </div>
          </div>
        </div>
        <div className=" flex items-center justify-center text-center">
          <button className=" bg-sky-400 py-1 mx-4 px-8 text-white rounded-full mb-4 outline-none border-none ">
            {isArabicprop ? "تعديل" : "Edit"}
          </button>
          <button
            onClick={props.close}
            className=" bg-gray-300 py-1 mx-4 px-8 text-black rounded-full mb-4"
          >
            {isArabicprop ? "إلغاء" : "Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
}
