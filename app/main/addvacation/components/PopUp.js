"use client";
import { isArabic } from "@/utils/langStore";
import { MenuItem, Select } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { vacationTempData } from "../tempdata";

export default function PopUp(props) {
  const isArabicprop = useContext(isArabic).arabic;
  //
  //get
  //

  const employeeElement = props.employee || {};

  const [employee, setEmployee] = useState(employeeElement.name);
  const [type, setType] = useState(employeeElement.type);
  const [from, setFrom] = useState(employeeElement.from);
  const [to, setTo] = useState(employeeElement.to);
  const [notes, setNotes] = useState(employeeElement.notes);

  //maping
  const selecteItems = vacationTempData.map((e) => (
    <option key={e.code} value={e.name}>
      {e.name}
    </option>
  ));
  return (
    <div className=" h-screen w-full md:overflow-hidden flex items-center justify-center">
      <div className=" font-sans rounded-md bg-white w-full  md:w-3/4 getin">
        <div className=" p-4 text-xl bg-sky-400 rounded-t-md text-white text-center">
          <h1>
            {props.edit
              ? `${isArabicprop ? "تعديل" : "Edit"}`
              : `${isArabicprop ? "اضافة" : "Add"}`}
          </h1>
        </div>
        <div className=" grid grid-cols-6 md:grid-cols-12 items-center mb-2">
          <div className=" w-full col-span-6 p-2">
            <h4>{isArabicprop ? "الموظف" : "Employee"}</h4>
            <select
              title="choose"
              className=" w-full bg-white outline-none p-3 rounded border "
              value={employee}
              onChange={(e) => setEmployee(e.target.value)}
            >
              <option hidden selected disabled>
                Choose one
              </option>
              {selecteItems}
            </select>
          </div>
          <div className=" col-span-6 w-full p-2">
            <h4>{isArabicprop ? "نوع الاجازة" : "Vacation Type"}</h4>
            <select
              className=" w-full bg-white outline-none p-3 rounded border "
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option hidden selected disabled>
                Choose one
              </option>
              <option value="مرضية">مرضية</option>
              <option value="سنوية">سنوية</option>
            </select>
          </div>
          <div className=" col-span-6 w-full p-2">
            <h4>{isArabicprop ? "من" : "From"}</h4>
            <input
              className=" w-full bg-white outline-none p-3 rounded border"
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <div className=" col-span-6 w-full p-2">
            <h4>{isArabicprop ? "الى" : "To"}</h4>
            <input
              className=" w-full bg-white outline-none p-3 rounded border"
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
          <div className=" col-span-6 md:col-span-12 w-full p-2">
            <h4>{isArabicprop ? "ملاحظات" : "Notes"}</h4>
            <input
              className=" w-full bg-white outline-none p-3 rounded border"
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
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
