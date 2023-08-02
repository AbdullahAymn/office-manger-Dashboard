"use client";
import Label from "@/app/components/reports/Label";
import { isArabic } from "@/utils/langStore";
import React from "react";
import { useState } from "react";
import { useContext } from "react";

export default function EmployeesReport() {
  const isArabicprop = useContext(isArabic).arabic;

  //setSearch

  const [showSearch, setShowSearch] = useState(true);

  const showSearchHandeller = (val) => {
    setShowSearch(val);
  };

  //
  //Search
  //

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [mangement, setMangement] = useState("");
  const [department, setDeapartmet] = useState("");
  const [job, setJob] = useState("");
  const [group, setGroup] = useState("");
  const [workingTime, setWorkingTime] = useState("");

  const searchHandeller = (e) => {
    e.preventDefault();
  };

  const resetHandeller = () => {
    setCode("");
    setName("");
    setBranch("");
    setMangement("");
    setDeapartmet("");
    setJob("");
    setGroup("");
    setWorkingTime("");
  };
  return (
    <div className=" font-sans">
      <div>
        <Label
          setsearch={showSearchHandeller}
          label={isArabicprop ? "الموظفين" : "Employees"}
        />
      </div>
      {showSearch && (
        <div className=" relative w-full p-2 border rounded-md">
          <i
            onClick={resetHandeller}
            className={`fa-solid fa-rotate-right hover:cursor-pointer absolute top-2 ${
              isArabicprop ? " left-2" : " right-2"
            }`}
          ></i>
          <form onSubmit={searchHandeller}>
            <div className=" w-full p-2 pb-10 grid grid-cols-3 md:grid-cols-12">
              <div className=" col-span-3 md:mx-4">
                <h4>{isArabicprop ? "كود الموظف:" : "Code :"}</h4>
                <input
                  className=" w-full p-2 border outline-none"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  type="text"
                  placeholder={isArabicprop ? "كود الموظف" : "Code"}
                />
              </div>
              <div className=" col-span-3 md:mx-4">
                <h4>{isArabicprop ? "اسم الموظف:" : "Name :"}</h4>
                <input
                  className=" w-full p-2 border outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder={isArabicprop ? "اسم الموظف" : "Name"}
                />
              </div>
              <div className=" col-span-3 md:mx-4">
                <h4>{isArabicprop ? "الفرع :" : "Branch :"}</h4>
                <select
                  className=" w-full p-2 border outline-none"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                >
                  <option selected hidden>
                    Choose one
                  </option>
                  <option value="branch 1">Branch 1</option>
                  <option value="branch 2">Branch 2</option>
                </select>
              </div>
              <div className=" col-span-3 md:mx-4">
                <h4>{isArabicprop ? "الإدارة :" : "Mangement :"}</h4>
                <select
                  className=" w-full p-2 border outline-none"
                  value={mangement}
                  onChange={(e) => setMangement(e.target.value)}
                >
                  <option selected hidden>
                    Choose one
                  </option>
                  <option value="Mangement 1">Mangement 1</option>
                  <option value="Mangement 2">Mangement 2</option>
                </select>
              </div>
              <div className=" col-span-3 md:mx-4">
                <h4>{isArabicprop ? "القسم :" : "Department :"}</h4>
                <select
                  className=" w-full p-2 border outline-none"
                  value={department}
                  onChange={(e) => setDeapartmet(e.target.value)}
                >
                  <option selected hidden>
                    Choose one
                  </option>
                  <option value="Department 1">Department 1</option>
                  <option value="Department 2">Department 2</option>
                </select>
              </div>
              <div className=" col-span-3 md:mx-4">
                <h4>{isArabicprop ? "الوظيفة :" : "Job :"}</h4>
                <select
                  className=" w-full p-2 border outline-none"
                  value={job}
                  onChange={(e) => setJob(e.target.value)}
                >
                  <option selected hidden>
                    Choose one
                  </option>
                  <option value="Job 1">Job 1</option>
                  <option value="Job 2">Job 2</option>
                </select>
              </div>
              <div className=" col-span-3 md:mx-4">
                <h4>{isArabicprop ? "المجموعة :" : "Group :"}</h4>
                <select
                  className=" w-full p-2 border outline-none"
                  value={group}
                  onChange={(e) => setGroup(e.target.value)}
                >
                  <option selected hidden>
                    Choose one
                  </option>
                  <option value="Group 1">Group 1</option>
                  <option value="Group 2">Group 2</option>
                </select>
              </div>
              <div className=" col-span-3 md:mx-4">
                <h4>{isArabicprop ? "الدوام :" : "Working Time :"}</h4>
                <select
                  className=" w-full p-2 border outline-none"
                  value={workingTime}
                  onChange={(e) => setWorkingTime(e.target.value)}
                >
                  <option selected hidden>
                    Choose one
                  </option>
                  <option value="Working Time 1">Working Time 1</option>
                  <option value="Working Time 2">Working Time 2</option>
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
