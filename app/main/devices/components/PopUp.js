"use client";
import { isArabic } from "@/utils/langStore";
import { options } from "@/utils/optionStore";
import useOptions from "@/utils/useOptions";
import React, { useContext } from "react";
import { useState } from "react";

export default function PopUp(props) {
  const isArabicprop = useContext(isArabic).arabic;
  const branchesOptions = useOptions(useContext(options).branch);

  const element = props.element || {};

  const [nameAr, setNameAr] = useState(element.nameAr);
  const [nameEn, setNameEn] = useState(element.nameEn);
  const [branch, setBranch] = useState(element.branch);
  const [serial, setSerial] = useState(element.serial);
  const [type, setType] = useState(element.type);

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
              {isArabicprop ? "الإسم العربي" : "Name in Arabic"}{" "}
              <span className="text-red-600">*</span>
            </h4>
            <input
              type="text"
              required
              className=" w-full bg-white outline-none p-2 border rounded"
              value={nameAr}
              onChange={(e) => setNameAr(e.target.value)}
            />
          </div>
          <div className=" w-full col-span-6 p-2">
            <h4>{isArabicprop ? "الإسم الانجليزي" : "Name in English"}</h4>
            <input
              type="text"
              className=" w-full bg-white outline-none p-2 border rounded"
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
            />
          </div>

          <div className=" w-full col-span-6 p-2">
            <h4>
              {isArabicprop ? "الفرع" : "Branch"}
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
              {isArabicprop ? "الرقم التسلسلي" : "Serial Number"}{" "}
              <span className="text-red-600">*</span>
            </h4>
            <input
              type="text"
              required
              className=" w-full bg-white outline-none p-2 border rounded"
              value={serial}
              onChange={(e) => setSerial(e.target.value)}
            />
          </div>
          <div className=" w-full col-span-6 md:col-span-12 p-2">
            <div className=" md:w-1/2 w-full mx-auto">
              <h4>
                {isArabicprop ? "نوع الجهاز" : "Device Type"}
                <span className="text-red-600">*</span>
              </h4>
              <select
                required
                className=" w-full bg-white outline-none p-2 border rounded"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option selected hidden>
                  Choose one
                </option>
                <option value="ZKTeco">ZKTeco</option>
              </select>
            </div>
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
