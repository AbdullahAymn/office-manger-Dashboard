"use client";
import Paginate from "@/app/components/Paginate";
import { isArabic } from "@/utils/langStore";
import { InputLabel, MenuItem, Select } from "@mui/material";
import Link from "next/link";
import React, { useContext, useState } from "react";

export default function DisplayTransactions () {
  const isArabicprop = useContext(isArabic).arabic;
  const [showsearch, setShowSearch] = useState(true);

  //
  //
  //search
  //
  //
  const [code, setCode] = useState("");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [branches, setbranches] = useState("");
  const [management, setManagement] = useState("");
  const [department, setDepartment] = useState("");
  const [job, setJob] = useState("");
  const [group, setGroup] = useState("");
  const [shift, setShift] = useState("");

  const resetHandeller = () => {
    setCode("");
    setDate("");
    setName("");
    setbranches("");
    setManagement("");
    setDepartment("");
    setJob("");
    setGroup("");
    setShift("");
  };

  return (
    <div className=" font-sans overflow-x-hidden">
      {/*  */}
      {/* Top section */}
      {/*  */}
      <div className=" md:p-4 w-full font-sans flex items-center justify-between">
        <div>
          <h1 className=" text-xl mb-3 md:text-3xl">
            {isArabicprop ? "الحركات" : "Transactions"}
          </h1>
          <h1 className=" font-light flex">
            <Link href="/main">
              <h1 className=" font-normal hover:underline">
                {isArabicprop ? "الرئيسية" : "Main"}
              </h1>
            </Link>{" "}
            / {isArabicprop ? "الحركات" : "Transactions"}
          </h1>
        </div>
        <div className=" p-2 grid grid-cols-6 md:flex ">
          <button
            className=" bg-gray-200 col-span-6  py-1 px-6 rounded-full md:mx-2 text-md"
            onClick={() => setShowSearch(!showsearch)}
          >
            {showsearch
              ? `${isArabicprop ? "إخفاء البحث" : "Hide search"}`
              : `${isArabicprop ? "إظهار البحث" : "Show search"}`}{" "}
            <i
              className={`fa-solid fa-caret-down  ${
                showsearch && " rotate-180"
              }`}
            ></i>
          </button>
          <button className=" col-span-6  bg-sky-400 text-white py-1 px-12 rounded-full md:mx-2 text-md">
            {isArabicprop ? "بحث" : "Search"}{" "}
          </button>
        </div>
      </div>
      {/*  */}
      {/*  */}
      {/* Search Section */}
      {/*  */}
      {/*  */}

      {showsearch && (
        <div className=" p-3  rounded-lg border-1  font-sans">
          <div className=" w-full relative">
            <i
              onClick={resetHandeller}
              className={`fa-solid fa-rotate-right hover:cursor-pointer absolute top-0 ${
                isArabicprop ? "left-0" : "right-0"
              }`}
            ></i>

            {/* the form */}
            <form>
              <div className=" py-4 grid grid-cols-3 md:grid-cols-12">
                <div className=" w-full col-span-3 px-4">
                  <h4>{isArabicprop ? "كود الموظف" : "Employee Code"}</h4>
                  <input
                    className=" p-4 border w-full outline-none "
                    type="text"
                    placeholder={isArabicprop ? "كود الموظف" : "Employee Code"}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
                <div className=" w-full col-span-3 px-4">
                  <h4>{isArabicprop ? "إسم الموظف" : "Employee Name"}</h4>
                  <input
                    className=" p-4 border w-full outline-none "
                    type="text"
                    placeholder={isArabicprop ? "إسم الموظف" : "Employee Name"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className=" w-full col-span-3 px-4">
                  <h4>{isArabicprop ? "الفرع" : "Branch"}</h4>
                  <Select
                    id="demo-simple-select"
                    className=" w-full bg-white "
                    value={branches}
                    onChange={(e) => setbranches(e.target.value)}
                  >
                    <MenuItem value="branch 1">branch 1</MenuItem>
                    <MenuItem value="branch 2">branch 2</MenuItem>
                    <MenuItem value="branch 3">branch 3</MenuItem>
                    <MenuItem value="branch 4">branch 4</MenuItem>
                  </Select>
                </div>
                <div className=" w-full col-span-3 px-4">
                  <h4>{isArabicprop ? "الإدارة" : "Management"}</h4>
                  <Select
                    id="demo-simple-select"
                    className=" w-full bg-white "
                    value={management}
                    onChange={(e) => setManagement(e.target.value)}
                  >
                    <MenuItem value="Management 1">Management 1</MenuItem>
                    <MenuItem value="Management 2">Management 2</MenuItem>
                    <MenuItem value="Management 3">Management 3</MenuItem>
                    <MenuItem value="Management 4">Management 4</MenuItem>
                  </Select>
                </div>
                <div className=" w-full col-span-3 px-4">
                  <h4>{isArabicprop ? "القسم" : "Department"}</h4>
                  <Select
                    id="demo-simple-select"
                    className=" w-full bg-white "
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                  >
                    <MenuItem value="Department 1">Department 1</MenuItem>
                    <MenuItem value="Department 2">Department 2</MenuItem>
                    <MenuItem value="Department 3">Department 3</MenuItem>
                    <MenuItem value="Department 4">Department 4</MenuItem>
                  </Select>
                </div>
                <div className=" w-full col-span-3 px-4">
                  <h4>{isArabicprop ? "الوظيفة" : "Job"}</h4>
                  <Select
                    id="demo-simple-select"
                    className=" w-full bg-white "
                    value={job}
                    onChange={(e) => setJob(e.target.value)}
                  >
                    <MenuItem value="Job 1">Job 1</MenuItem>
                    <MenuItem value="Job 2">Job 2</MenuItem>
                    <MenuItem value="Job 3">Job 3</MenuItem>
                    <MenuItem value="Job 4">Job 4</MenuItem>
                  </Select>
                </div>
                <div className=" w-full col-span-3 px-4">
                  <h4>{isArabicprop ? "المجموعة" : "Group"}</h4>
                  <Select
                    id="demo-simple-select"
                    className=" w-full bg-white "
                    value={group}
                    onChange={(e) => setGroup(e.target.value)}
                  >
                    <MenuItem value="Group 1">Group 1</MenuItem>
                    <MenuItem value="Group 2">Group 2</MenuItem>
                    <MenuItem value="Group 3">Group 3</MenuItem>
                    <MenuItem value="Group 4">Group 4</MenuItem>
                  </Select>
                </div>
                <div className=" w-full col-span-3 px-4">
                  <h4>{isArabicprop ? "وقت العمل" : "Shift"}</h4>
                  <Select
                    id="demo-simple-select"
                    className=" w-full bg-white "
                    value={shift}
                    onChange={(e) => setShift(e.target.value)}
                  >
                    <MenuItem value="Shift 1">Shift 1</MenuItem>
                    <MenuItem value="Shift 2">Shift 2</MenuItem>
                    <MenuItem value="Shift 3">Shift 3</MenuItem>
                    <MenuItem value="Shift 4">Shift 4</MenuItem>
                  </Select>
                </div>
                <div className=" w-full col-span-3 px-4">
                  <h4>{isArabicprop ? "التاريخ" : "Date"}</h4>
                  <input
                    className=" p-4 border outline-none w-full "
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/*  */}
      {/* Table */}
      {/*  */}
      <div className=" w-full font-sans my-4 overflow-x-scroll md:overflow-x-hidden">
        <table className=" min-w-full w-200 md:w-full text-sm md:text-base ">
          {/* tabelBody */}
          <thead>
            <tr className=" grid grid-cols-12 bg-white p-2 border text-black/70">
              <th className=" col-span-1  text-start">
                {isArabicprop ? "الكود" : "Code"}
              </th>
              <th className=" col-span-2  text-start">
                {isArabicprop ? "الإسم" : "Name"}
              </th>
              <th className=" col-span-2  text-start">
                {isArabicprop ? "الفرع" : "Branch"}
              </th>
              <th className=" col-span-1  text-start">
                {isArabicprop ? "الدوام" : "Shift"}
              </th>
              <th className=" col-span-2  text-start">
                {isArabicprop ? "وقت الحضور" : "Time In"}
              </th>
              <th className=" col-span-2  text-start">
                {isArabicprop ? "وقت الإنصراف" : "Time Out"}
              </th>
              <th className=" col-span-1  text-start">
                {isArabicprop ? "معدل يدوياً" : " Edited"}
              </th>
              <th className=" col-span-1 text-start">
                {isArabicprop ? "مرّحل" : "Transferred"}
              </th>
            </tr>
          </thead>

          <tbody className=" text-sm">{/* {tabelData} */}</tbody>
        </table>
      </div>
    </div>
  );
}
