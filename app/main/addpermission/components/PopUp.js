"use client";
import { isArabic } from "@/utils/langStore";
import { MenuItem, Select } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { permissionTempData } from "../tempData";

export default function PopUp(props) {
  const isArabicprop = useContext(isArabic).arabic;
  //
  //get
  //

    const employeeElement = props.employee || {}

  const [employee, setEmployee] = useState(employeeElement.name);
  const [date, setDate] = useState(employeeElement.date);
  const [type, setType] = useState(employeeElement.typeVal);
  const [notes, setNotes] = useState(employeeElement.notes);
  const [temotimeIn, setTemoIn] = useState(employeeElement.temotimeIn);
  const [temotimeOut, setTemoOut] = useState(employeeElement.temotimeOut);
  const [lateTime, setLateTime] = useState(employeeElement.lateTime);
  const [earlyTime, setEarlyTime] = useState(employeeElement.earlyTime);

  //
  //
  //Search
  //
  //

  const [showData, setShowData] = useState([]);

  useEffect(() => {
    if (employee && date) {
      let searched = permissionTempData.filter((e) => e.name === employee);

      setShowData(searched);
    }
  }, [employee, date]);

  //maping

  const data = showData.map((e) => (
    <tr key={e.code} className=" grid grid-cols-3">
      <td className=" p-2 col-span-1 text-center">{e.shift}</td>
      <td className=" p-2 col-span-1 text-center">{e.in}</td>
      <td className=" p-2 col-span-1 text-center">{e.out}</td>
    </tr>
  ));

  const selecteItems = permissionTempData.map((e) => (
    <option key={e.code} value={e.name}>
      {e.name}
    </option>
  ));
  return (
    <div className=" h-screen w-full  overflow-auto md:pb-0 md:overflow-hidden flex items-center justify-center">
      <div className=" font-sans mb-12 md:mb-0 rounded-md bg-white w-full  md:w-3/4 getin">
        <div className=" p-4 text-xl bg-sky-400 rounded-t-md text-white text-center">
          <h1>
            {props.edit
              ? `${isArabicprop ? "تعديل" : "Edit"}`
              : `${isArabicprop ? "اضافة" : "Add"}`}
          </h1>
        </div>
        <div className=" grid grid-cols-6 md:h-auto md:overflow-y-hidden md:grid-cols-12 items-center mb-2">
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
            <h4>{isArabicprop ? "التاريخ" : "Date"}</h4>
            <input
              className=" w-full outline-none rounded border p-3"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="Date"
            ></input>
          </div>
        </div>
        <div className=" w-full p-2 mb-4">
          <table className=" min-w-full">
            <thead className=" border shadow-md bg-gray-100">
              <tr className=" grid grid-cols-3">
                <th className=" p-2 col-span-1">
                  {isArabicprop ? "الوردية" : "Shift"}
                </th>
                <th className=" p-2 col-span-1">
                  {isArabicprop ? "وقت الحضور" : "Time In"}
                </th>
                <th className=" p-2 col-span-1">
                  {isArabicprop ? "وقت الانصراف" : "Time Out"}
                </th>
              </tr>
            </thead>
            <tbody>{data}</tbody>
          </table>
        </div>
        <div className=" grid grid-cols-6 md:grid-cols-12 items-start mb-2">
          <div className=" w-full col-span-6 p-2">
            <h4>{isArabicprop ? "نوع الاذن" : "Permission Type"}</h4>
            <select
              id="demo-simple-select"
              className=" w-full bg-white outline-none p-3 rounded border"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option hidden selected disabled>
                Choose one
              </option>
              <option value="Temporary">
                {isArabicprop ? "مؤقت" : "Temporary"}
              </option>
              <option value="Late">
                {isArabicprop ? "حضور متاخر" : "Late Attendance"}
              </option>
              <option value="Early">
                {isArabicprop ? "انصراف مبكر" : "Early Leave"}
              </option>
              <option value="AllDay">
                {isArabicprop ? "يوم كامل" : "All Day"}
              </option>
            </select>
            <div>
              {type === "Temporary" && (
                <div className=" md:flex items-center justify-center">
                  <div className=" mx-1 md:mx-4">
                    <h6>{isArabicprop ? "وقت الحضور" : "Time in"}</h6>
                    <input
                      value={temotimeIn}
                      onChange={(e) => setTemoIn(e.target.value)}
                      className=" w-full border outline-none p-3"
                      type="time"
                    ></input>
                  </div>
                  <div className=" mx-1 md:mx-4">
                    <h6>{isArabicprop ? "وقت الإنصراف" : "Time out"}</h6>
                    <input
                      value={temotimeOut}
                      onChange={(e) => setTemoOut(e.target.value)}
                      className=" w-full border outline-none p-3"
                      type="time"
                    ></input>
                  </div>
                </div>
              )}
              {type === "Late" && (
                <div className=" flex items-center justify-center">
                  <div className=" mx-1 md:mx-4">
                    <h6>{isArabicprop ? "وقت الحضور" : "Time in"}</h6>
                    <input
                      value={lateTime}
                      onChange={(e) => setLateTime(e.target.value)}
                      className=" w-full border outline-none p-3"
                      type="time"
                    ></input>
                  </div>
                </div>
              )}
              {type === "Early" && (
                <div className=" flex items-center justify-center">
                  <div className=" mx-1 md:mx-4">
                    <h6>{isArabicprop ? "وقت الإنصراف" : "Time Out"}</h6>
                    <input
                      value={earlyTime}
                      onChange={(e) => setEarlyTime(e.target.value)}
                      className=" w-full border outline-none p-3"
                      type="time"
                    ></input>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className=" col-span-6 w-full p-2">
            <h4>{isArabicprop ? "ملاحظات" : "Notes"}</h4>
            <input
              className=" w-full outline-none rounded border p-3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              type="text"
            ></input>
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
