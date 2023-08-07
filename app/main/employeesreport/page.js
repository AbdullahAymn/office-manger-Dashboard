"use client";
import Label from "@/app/components/reports/Label";
import { isArabic } from "@/utils/langStore";
import { options } from "@/utils/optionStore";
import useOptions from "@/utils/useOptions";
import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import { employeesReportTempData } from "./tempdata";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { fonty } from "@/utils/Amiri-Regular-normal (1)";

export default function EmployeesReport() {
  const isArabicprop = useContext(isArabic).arabic;

  //setSearch

  const branchesOptions = useOptions(useContext(options).branch);
  const mangementOptions = useOptions(useContext(options).mangement);
  const departmentOptions = useOptions(useContext(options).department);
  const jobOptions = useOptions(useContext(options).job);
  const groupOptions = useOptions(useContext(options).group);
  const workingTimeOptions = useOptions(useContext(options).workingTime);

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
    let searched = employeesReportTempData;

    if (code) {
      searched = searched.filter((e) => e.id == code.trim());
    }
    if (name) {
      searched = searched.filter((e) => e.name.includes(name.trim()));
    }
    if (branch) {
      searched = searched.filter((e) => e.branch === branch);
    }
    if (mangement) {
      searched = searched.filter((e) => e.mangement === mangement);
    }
    if (department) {
      searched = searched.filter((e) => e.department === department);
    }
    if (job) {
      searched = searched.filter((e) => e.job === job);
    }
    if (group) {
      searched = searched.filter((e) => e.groub === group);
    }
    if (workingTime) {
      searched = searched.filter((e) => e.shift === workingTime);
    }

    setDataForMap(searched);
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

  //
  //
  //Maping
  //
  //

  const [dataForMap, setDataForMap] = useState([]);

  const showTabel = dataForMap.map((e, index) => (
    <tr key={index} className="grid grid-cols-12 p-2 font-light text-black/70 ">
      <th className=" col-span-1 text-start">{e.id}</th>
      <th className=" col-span-2 text-start">{e.name}</th>
      <th className=" col-span-2 text-start">{e.branch}</th>
      <th className=" col-span-1 text-start">{e.mangement}</th>
      <th className={` col-span-2 text-start `}>{e.department}</th>
      <th className=" col-span-2 text-start">{e.job}</th>
      <th className=" col-span-1 text-start">{e.groub}</th>
      <th className=" col-span-1 text-start">{e.shift}</th>
    </tr>
  ));

  // const headers = [
  //   { label: "الكود", key: "code" },
  //   { label: "الاسم", key: "name" },
  //   { label: "الفرع", key: "branch" },
  //   { label: "الادارة", key: "mangement" },
  //   { label: "القسم", key: "department" },
  //   { label: "الوظيفة", key: "job" },
  //   { label: "المجموعة", key: "groub" },
  //   { label: "الدوام", key: "shift" },
  // ];

  //
  function printDocument() {
    const doc = new jsPDF();
    doc.setFont("Amiri-Regular");
    doc.text(90, 10, "تقرير الموظفين");
    autoTable(doc, {
      pageBreak: "auto",
      styles: { font: "Amiri-Regular", halign: "right", fontSize: "8" },
      html: "#mytabel",
    });

    doc.save("تقرير الموظفين.pdf");
  }

  return (
    <div className=" font-sans">
      <div>
        <Label
          pdf={printDocument}
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

      {/*  */}
      {/*  */}
      {/* Tabel */}
      {/*  */}
      {/*  */}
      <div className=" w-full my-12 overflow-auto">
        <table
          id="mytabel"
          className=" min-w-full text-sm  w-200 md:w-full font-sans"
        >
          <thead>
            <tr className=" grid grid-cols-12 md:text-base bg-gray-200 p-2 border text-black/70">
              <th className=" col-span-1 text-start">
                {isArabicprop ? "الكود" : "Code"}
              </th>
              <th className=" col-span-2 text-start">
                {isArabicprop ? "اسم الموظف" : "Name"}
              </th>
              <th className=" col-span-2 text-start">
                {isArabicprop ? "الفرع" : "Banch"}
              </th>
              <th className=" col-span-1 text-start">
                {isArabicprop ? "الإدارة" : "Mangement"}
              </th>
              <th
                className={` col-span-2  ${
                  isArabicprop ? "text-start" : "text-center"
                }`}
              >
                {isArabicprop ? "القسم" : "Department"}
              </th>
              <th className=" col-span-2 text-start">
                {isArabicprop ? "الوظيفة" : "Job"}
              </th>
              <th className=" col-span-1 text-start">
                {isArabicprop ? "المجموعة" : "Group"}
              </th>
              <th className=" col-span-1 text-start">
                {isArabicprop ? "الدوام" : "Shift"}
              </th>
            </tr>
          </thead>
          <tbody>{showTabel}</tbody>
        </table>
      </div>

      {/* <div className=" hidden">
        <div id="divToPrint" className=" w-1200px">
          <div className=" mx-auto my-20 p-12 border rounded-xl text-center ">
            <h1 className=" font-bold text-3xl">
              {isArabicprop ? "تقرير الموظفين" : "Employees Report"}
            </h1>
          </div>
          <table className=" min-w-full text-sm w-full font-sans">
            <thead>
              <tr className=" grid grid-cols-12 md:text-base bg-gray-200 p-2 border text-black/70">
                <th className=" col-span-1 text-start">
                  {isArabicprop ? "الكود" : "Code"}
                </th>
                <th className=" col-span-2 text-start">
                  {isArabicprop ? "اسم الموظف" : "Name"}
                </th>
                <th className=" col-span-2 text-start">
                  {isArabicprop ? "الفرع" : "Banch"}
                </th>
                <th className=" col-span-1 text-start">
                  {isArabicprop ? "الإدارة" : "Mangement"}
                </th>
                <th
                  className={` col-span-2  ${
                    isArabicprop ? "text-start" : "text-center"
                  }`}
                >
                  {isArabicprop ? "القسم" : "Department"}
                </th>
                <th className=" col-span-2 text-start">
                  {isArabicprop ? "الوظيفة" : "Job"}
                </th>
                <th className=" col-span-1 text-start">
                  {isArabicprop ? "المجموعة" : "Group"}
                </th>
                <th className=" col-span-1 text-start">
                  {isArabicprop ? "الدوام" : "Shift"}
                </th>
              </tr>
            </thead>
            <tbody>{showTabel}</tbody>
          </table>
        </div>
      </div> */}
    </div>
  );
}
