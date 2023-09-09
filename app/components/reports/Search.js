"use client";
import { isArabic } from "@/utils/langStore";
import { options } from "@/utils/optionStore";
import useOptions from "@/utils/useOptions";
import React, { useContext, useState } from "react";

export default function Search() {
  const isArabicprop = useContext(isArabic).arabic;
  

  //
  //Defiing Options
  //
  const branchesOptions = useOptions(useContext(options).branch);
  const mangementOptions = useOptions(useContext(options).mangement);
  const departmentOptions = useOptions(useContext(options).department);
  const jobOptions = useOptions(useContext(options).job);
  const groupOptions = useOptions(useContext(options).group);
  const workingTimeOptions = useOptions(useContext(options).workingTime);

  //
  //Defining vars
  //
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [mangement, setMangement] = useState("");
  const [department, setDeapartmet] = useState("");
  const [job, setJob] = useState("");
  const [group, setGroup] = useState("");
  const [workingTime, setWorkingTime] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  //
  //Functions of Search
  //

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
    setFrom("");
    setTo("");
  };
  return (
    <div className=" relative w-full p-2 border rounded-md">
      <i
        onClick={resetHandeller}
        className={`fa-solid fa-rotate-right hover:cursor-pointer absolute top-2 ${
          isArabicprop ? " left-2" : " right-2"
        }`}
      ></i>
      <form onSubmit={searchHandeller}>
        <div className=" w-full p-2 pb-10 md:pb-0 grid grid-cols-3 md:grid-cols-12">
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
              {branchesOptions}
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
              {mangementOptions}
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
              {departmentOptions}
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
              {jobOptions}
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
              {groupOptions}
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
              {workingTimeOptions}
            </select>
          </div>
          <div className=" col-span-3 md:mx-4">
            <h4>{isArabicprop ? "من :" : "From :"}</h4>
            <input
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              type="date"
              className=" w-full p-2 border outline-none"
            />
          </div>
          <div className=" col-span-3 md:mx-4">
            <h4>{isArabicprop ? "إلى :" : "To :"}</h4>
            <input
              value={to}
              onChange={(e) => setTo(e.target.value)}
              type="date"
              className=" w-full p-2 border outline-none"
            />
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
  );
}
