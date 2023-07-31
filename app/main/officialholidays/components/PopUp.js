"use client";
import { isArabic } from "@/utils/langStore";
import React, { useContext } from "react";

export default function PopUpCopm(props) {
  const isArabicprop = useContext(isArabic).arabic;
  return (
    <div className=" h-screen w-full flex items-center justify-center">
      <div className=" font-sans rounded-md bg-white w-full  md:w-3/4 getin">
        <div className=" p-4 text-xl bg-sky-400 rounded-t-md text-white text-center">
          <h1>
            {props.edit
              ? `${isArabicprop ? "تعديل" : "Edit"} ${
                  isArabicprop ? props.name : props.nameEn
                }`
              : `${isArabicprop ? "اضافة" : "Add"}`}
          </h1>
        </div>
        <div className=" mx-auto w-full mb-4">
          <div className=" w-full p-2 grid grid-cols-3 md:grid-cols-6">
            <div className=" w-full p-2 col-span-3">
              <h4>{isArabicprop ? "الأسم العربي" : "Name in Arabic"}</h4>
              <input
                className=" w-full outline-none border-1 p-1"
                value={props.name}
                type="text"
              ></input>
            </div>
            <div className=" w-full p-2 col-span-3">
              <h4>{isArabicprop ? "الأسم الانجليزي" : "Name in English"}</h4>
              <input
                className=" w-full outline-none border-1 p-1"
                value={props.nameEn}
                type="text"
              ></input>
            </div>
            <div className=" w-full p-2 col-span-3">
              <h4>{isArabicprop ? "من " : "From"}</h4>
              <input
                className=" w-full outline-none border-1 p-1"
                value={props.from}
                type="date"
              ></input>
            </div>
            <div className=" w-full p-2 col-span-3">
              <h4>{isArabicprop ? "إلى " : "To"}</h4>
              <input
                className=" w-full outline-none border-1 p-1"
                value={props.to}
                type="date"
              ></input>
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
