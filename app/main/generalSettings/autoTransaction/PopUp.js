"use client";
import { isArabic } from "@/utils/langStore";
import { options } from "@/utils/optionStore";
import useOptions from "@/utils/useOptions";
import React from "react";
import { useState } from "react";
import { useContext } from "react";

export default function PopUp(props) {
  const isArabicprop = useContext(isArabic).arabic;
  const branchesOptions = useOptions(useContext(options).branch);

  const element = props.element || {};

  const [branch, setBranch] = useState(element.branch);
  const [time, setTime] = useState(element.time);

 
  return (
    <div className=" h-screen w-full flex items-center justify-center">
      <div className=" font-sans rounded-md bg-white w-full  md:w-3/4 getin">
        <div className=" p-4 text-xl bg-sky-400 rounded-t-md text-white text-center">
          <h1>
            {isArabicprop
              ? `${props.edit ? "تعديل" : "إضافة"}`
              : `${props.edit ? "Edit" : "Add"}`}
          </h1>
        </div>

        <div className=" grid grid-cols-6 md:grid-cols-12 overflow-auto max-h-96 items-center mb-4">
          <div className=" w-full col-span-6 p-2">
            <h4>
              {isArabicprop ? "الفرع" : "Branch"}{" "}
              <span className="text-red-600">*</span>
            </h4>
            <select
              required
              className=" w-full bg-white outline-none p-2 border rounded"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            >
              <option selected hidden>
                Choose one
              </option>
              {branchesOptions}
            </select>
          </div>
          <div className=" w-full col-span-6 p-2">
            <h4>
              {isArabicprop ? "الوقت" : "Transfer Time"}{" "}
              <span className="text-red-600">*</span>
            </h4>
            <input
              type="time"
              className=" w-full text-center bg-white outline-none p-2 border rounded"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </div>
        </div>

        <div className=" flex items-center justify-center text-center">
          <button className=" bg-sky-400 py-1 mx-4 px-8 text-white rounded-full mb-4 outline-none border-none ">
            {`${
              props.edit
                ? `${isArabicprop ? "تعديل" : "Edit"}`
                : `${isArabicprop ? "إضافة" : "Add"}`
            }`}
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
