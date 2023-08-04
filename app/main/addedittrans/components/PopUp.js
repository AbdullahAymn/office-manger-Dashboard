"use client";
import { isArabic } from "@/utils/langStore";
import { options } from "@/utils/optionStore";
import useOptions from "@/utils/useOptions";
import React, { useContext } from "react";
import { useState } from "react";

export default function PopUp(props) {
  const isArabicprop = useContext(isArabic).arabic;
  const branchesOptions = useOptions(useContext(options).branch);

  const [employee, setEmployee] = useState("");
  const [date, setDate] = useState("");
  const [timein, setTimeIn] = useState("");
  const [timeOut, setTimeOut] = useState("");
  const [branchIn, setBranchIn] = useState("");
  const [branchOut, setBranchOut] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className=" h-screen w-full flex items-center justify-center">
      <div className=" font-sans rounded-md bg-white w-full  md:w-3/4 getin">
        <div className=" p-4 text-xl bg-sky-400 rounded-t-md text-white text-center">
          <h1>{isArabicprop ? "إضافة وتعديل الحركات" : "Add & Edit Trans"}</h1>
        </div>
        <div className=" grid grid-cols-6 md:grid-cols-12 overflow-auto max-h-96 items-center mb-4">
          <div className=" w-full col-span-6 p-2">
            <h4>{isArabicprop ? "الموظف" : "Employee"}</h4>
            <select
              className=" w-full bg-white outline-none p-2 border rounded"
              value={employee}
              onChange={(e) => setEmployee(e.target.value)}
            >
              <option selected hidden>
                Choose one
              </option>
              <option value="Employee 1">Employee 1</option>
              <option value="Employee 2">Employee 2</option>
              <option value="Employee 3">Employee 3</option>
            </select>
          </div>
          <div className=" col-span-6 w-full p-2">
            <h4>{isArabicprop ? "التاريخ" : "Date"}</h4>
            <input
              className=" w-full outline-none border-1 p-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            ></input>
          </div>
          <div className=" col-span-6 w-full p-2">
            <h4>{isArabicprop ? "وقت الحضور" : "Time In"}</h4>
            <input
              className=" w-full outline-none border-1 p-2"
              value={timein}
              onChange={(e) => setTimeIn(e.target.value)}
              type="time"
            ></input>
          </div>
          <div className=" col-span-6 w-full p-2">
            <h4>{isArabicprop ? "وقت الإنصراف" : "Time Out"}</h4>
            <input
              className=" w-full outline-none border-1 p-2"
              value={timeOut}
              onChange={(e) => setTimeOut(e.target.value)}
              type="time"
            ></input>
          </div>
          <div className=" w-full col-span-6 p-2">
            <h4>{isArabicprop ? "فرع الحضور" : "attendance branch"}</h4>
            <select
              className=" w-full bg-white outline-none p-2 border rounded"
              value={branchIn}
              onChange={(e) => setBranchIn(e.target.value)}
            >
              <option selected hidden>
                Choose one
              </option>
              {branchesOptions}
            </select>
          </div>
          <div className=" w-full col-span-6 p-2">
            <h4>{isArabicprop ? "فرع الإنصراف" : "branch out"}</h4>
            <select
              className=" w-full bg-white outline-none p-2 border rounded"
              value={branchOut}
              onChange={(e) => setBranchOut(e.target.value)}
            >
              <option selected hidden>
                Choose one
              </option>
              {branchesOptions}
            </select>
          </div>
          <div className=" w-full col-span-6 md:col-span-12 p-2">
            <div className=" md:w-1/2 w-full mx-auto">
              <h4>{isArabicprop ? "كلمة سر المسؤول" : "Password"}</h4>
              <input
                type="password"
                className=" w-full bg-white outline-none p-2 border rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
