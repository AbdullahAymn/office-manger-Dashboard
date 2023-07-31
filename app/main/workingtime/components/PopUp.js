"use client";
import { isArabic } from "@/utils/langStore";
import { Switch } from "@mui/material";

import React, { useContext, useState } from "react";

export default function PopUpCom(props) {
  const isArabicprop = useContext(isArabic).arabic;
  const [openShift, setOpenShift] = useState(props.openShift);
  const [nextDayShift, setNextDayShift] = useState(props.nextDayShift);

  return (
    <div className=" h-screen w-full flex items-center justify-center">
      <div className=" font-sans rounded-md bg-white w-full  md:w-3/4 getin">
        <div className=" p-4 text-xl bg-sky-400 rounded-t-md text-white text-center">
          <h1>
            {props.edit
              ? `${isArabicprop ? "تعديل" : "Edit"} ${ isArabicprop ?props.name : props.nameEn}`
              : `${isArabicprop ? "اضافة" : "Add"}`}
          </h1>
        </div>
        <div className=" mb-4">
          <div className=" w-full p-2 grid grid-cols-6 md:grid-cols-12">
            <div className=" col-span-6 mx-4">
              <h4>{isArabicprop ? "الأسم العربي" : "Name in Arabic"}</h4>
              <input
                className=" w-full outline-none border-1 p-1"
                value={props.name}
                type="text"
              ></input>
            </div>
            <div className=" col-span-6 mx-4">
              <h4>{isArabicprop ? "الأسم الانجليزي" : "Name in English"}</h4>
              <input
                className=" w-full outline-none border-1 p-1"
                value={props.nameEn}
                type="text"
              ></input>
            </div>
          </div>
          <div className=" mb-4 p-2 w-full text-sm flex items-start justify-center">
            <div className=" w-full">
              <h1>{isArabicprop ? "دوام مفتوح " : "Open Shift"} :</h1>
              <Switch
                checked={openShift}
                onChange={(e) => setOpenShift(e.target.checked)}
              />
            </div>
            <div className=" w-full">
              <h1>
                {isArabicprop
                  ? "الدوام ينتهي اليوم التالي"
                  : "Shift Ends Next Day"}{" "}
                :
              </h1>

              <Switch
                checked={nextDayShift}
                onChange={(e) => setNextDayShift(e.target.checked)}
              />
              {nextDayShift && (
                <div className=" flex items-center justify-center">
                  <h1>
                    {isArabicprop ? " وقت إنتهاء اليوم " : "Day End Time"} :
                  </h1>
                  <input
                    value={props.nextDayTime}
                    className=" outline-none p-2 border rounded-md"
                    type="time"
                  ></input>
                </div>
              )}
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
