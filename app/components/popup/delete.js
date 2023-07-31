"use client";
import { isArabic } from "@/utils/langStore";
import React, { useContext } from "react";

export default function Delete(props) {
  const isArabicprop = useContext(isArabic).arabic;
  return (
    <div className=" h-screen w-full flex items-center justify-center">
      <div className=" font-sans rounded-md bg-white w-96 mx-auto getin">
        <div className=" p-4 text-xl bg-red-600 rounded-t-md text-white text-center">
          <h1>
            {isArabicprop ? "حذف" : "Delete"} {props.branch}
          </h1>
        </div>
        <div className=" text-center py-4 px-10">
          <h1>
            {isArabicprop
              ? "هل تريد حذف هذا العنصر؟"
              : " Are you sure you want to Delete this element?"}
          </h1>
        </div>
        <div className=" flex items-center justify-center text-center">
          <button className=" bg-red-600 py-1 mx-4 px-8 text-white rounded-full mb-4 outline-none border-none ">
            {isArabicprop ? "حذف" : "Delete"}
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
