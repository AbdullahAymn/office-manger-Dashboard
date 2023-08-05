"use client";
import Label from "@/app/components/reports/Label";
import { isArabic } from "@/utils/langStore";
import React, { useContext, useState } from "react";

export default function WorkingTimeReports() {
  const isArabicprop = useContext(isArabic).arabic;

  //show serach

  const [showSearch, setShowSearch] = useState(true);

  const showSearchHandeller = (val) => {
    setShowSearch(val);
  };

  //
  //
  //search
  //
  //
  const [name, setName] = useState();
  const [type, setType] = useState();
  const searchHandeller = (e) => {
    e.preventDefault();
  };

  const resetHandeller = () => {
    setName("");
    setType("");
  };
  return (
    <div className=" font-sans">
      <div>
        <Label
          setsearch={showSearchHandeller}
          label={isArabicprop ? "أوقات العمل" : "Working Time"}
        />
      </div>
      {showSearch && (
        <div className=" relative w-full mt-4 p-2 border rounded-md">
          <i
            onClick={resetHandeller}
            className={`fa-solid fa-rotate-right hover:cursor-pointer absolute top-2 ${
              isArabicprop ? " left-2" : " right-2"
            }`}
          ></i>
          <form onSubmit={searchHandeller}>
            <div className=" w-full p-2 pb-10 md:pb-0 grid grid-cols-3 md:grid-cols-12">
              <div className=" col-span-3 md:mx-4">
                <h4>{isArabicprop ? "الاسم :" : "Name :"}</h4>
                <input
                  className=" w-full p-2 border outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder={isArabicprop ? "الإسم" : "Name"}
                />
              </div>
              <div className=" col-span-3 md:mx-4">
                <h4>{isArabicprop ? "النوع :" : "Type :"}</h4>
                <select
                  className=" w-full p-2 border outline-none"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option selected hidden>
                    Choose one
                  </option>
                  <option value='normal'>{isArabicprop ? "عادي" : "Normal"}</option>
                  <option value='open'>{isArabicprop ? "مفتوح" : "Open"}</option>
                  <option value='all'>{isArabicprop ? "الكل" : "All"}</option>
                </select>
              </div>
            </div>
            <button
              className={`hover:cursor-pointer absolute bottom-2 bg-sky-400 text-white px-12 py-1 rounded-full ${
                isArabicprop ? " left-2" : " right-2"
              }`}
            >
              {isArabicprop ? "بحث" : "Search"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
