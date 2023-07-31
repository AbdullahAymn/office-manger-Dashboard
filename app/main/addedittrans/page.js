"use client";
import Paginate from "@/app/components/Paginate";
import { isArabic } from "@/utils/langStore";
import { MenuItem, Select } from "@mui/material";
import Link from "next/link";
import React, { useContext, useState } from "react";
import Popup from "reactjs-popup";
import Delete from "@/app/components/popup/delete";

export default function AddEditTrans() {
  const isArabicprop = useContext(isArabic).arabic;
  const [showsearch, setShowSearch] = useState(true);

  const [transData, setTransData] = useState([]);

  //
  //
  //search
  //
  //
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [branches, setbranches] = useState("");
  const [management, setManagement] = useState("");
  const [department, setDepartment] = useState("");
  const [shift, setShift] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const resetHandeller = () => {
    setCode("");
    setName("");
    setbranches("");
    setManagement("");
    setDepartment("");
    setShift("");
    setFrom("");
    setTo("");

    setShowData(transData);
  };

  const [showData, setShowData] = useState(transData);

  const searchHandeller = (e) => {
    e.preventDefault();
    let searched = transData;
    if (code) {
      searched = searched.filter((e) => e.code == code.trim());
    }
    if (name) {
      searched = searched.filter((e) => e.name.includes(name.trim()));
    }
    if (branches) {
      searched = searched.filter((e) => e.branch === branches);
    }
    if (management) {
      searched = searched.filter((e) => e.management === management);
    }
    if (department) {
      searched = searched.filter((e) => e.department === department);
    }
    if (shift) {
      searched = searched.filter((e) => e.workingTime === shift);
    }
    if (from) {
      searched = searched.filter((e) => e.from === from);
    }
    if (to) {
      searched = searched.filter((e) => e.to === to);
    }

    setShowData(searched);
  };

  // Paginate
  const [slice, setSlice] = useState([]);
  const getSlice = (slice) => {
    setSlice(slice);
  };

  //
  //
  //PopUp
  //
  //

  //Add

  const [openAdd, setOpenAdd] = useState(false);
  const toggelAdd = () => {
    setOpenAdd(!openAdd);
  };

  return (
    <div>
      <div className=" font-sans overflow-x-hidden">
        {/*  */}
        {/* Top section */}
        {/*  */}
        <div className=" md:p-4 w-full font-sans flex items-center justify-between">
          <div>
            <h1 className=" text-xl mb-3 md:text-3xl">
              {isArabicprop ? "إضافة وتعديل" : "Add & Edit"}
            </h1>
            <h1 className=" font-light flex">
              <Link href="/main">
                <h1 className=" font-normal hover:underline">
                  {isArabicprop ? "الرئيسية" : "Main"}
                </h1>
              </Link>{" "}
              / {isArabicprop ? "إضافة وتعديل" : "Add & Edit"}
            </h1>
          </div>
          <div className=" p-1 md:p-2 grid grid-cols-6 md:flex ">
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
            <button
              onClick={toggelAdd}
              className=" col-span-6  bg-sky-400 text-white py-1 px-12 rounded-full md:mx-2 text-md"
            >
              {isArabicprop ? "إضافة" : "Add"}{" "}
            </button>
            <Popup open={openAdd}>{/* <PopUp close={toggelAdd} /> */}</Popup>
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
              <form onSubmit={searchHandeller}>
                <div className=" py-4 grid grid-cols-3 pb-12 md:grid-cols-12">
                  <div className=" w-full col-span-3 px-4">
                    <h4>{isArabicprop ? "كود الموظف" : "Employee Code"}</h4>
                    <input
                      className=" p-4 border w-full outline-none "
                      type="text"
                      placeholder={
                        isArabicprop ? "كود الموظف" : "Employee Code"
                      }
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </div>
                  <div className=" w-full col-span-3 px-4">
                    <h4>{isArabicprop ? "إسم الموظف" : "Employee Name"}</h4>
                    <input
                      className=" p-4 border w-full outline-none "
                      type="text"
                      placeholder={
                        isArabicprop ? "إسم الموظف" : "Employee Name"
                      }
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
                    <h4>{isArabicprop ? "الدوام" : "Shift"}</h4>
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
                    <h4>{isArabicprop ? "من" : "From"}</h4>
                    <input
                      className=" p-4 border outline-none w-full "
                      type="date"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                    />
                  </div>
                  <div className=" w-full col-span-3 px-4">
                    <h4>{isArabicprop ? "إلى" : "To"}</h4>
                    <input
                      className=" p-4 border outline-none w-full "
                      type="date"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  className={` bg-sky-400 text-white mx-4 text-lg py-1 px-12 rounded-full hover:cursor-pointer absolute bottom-0 ${
                    isArabicprop ? "left-0" : "right-0"
                  }`}
                >
                  {isArabicprop ? "بحث" : "Search"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/*  */}
        {/* Paginate */}
        {/*  */}

        <div className=" w-full">
          <Paginate data={showData} getSlice={getSlice} />
        </div>

        {/*  */}
        {/* Table */}
        {/*  */}
        <div className=" w-full font-sans my-4 overflow-x-scroll md:overflow-x-hidden">
          {/* <Popup open={openDelet}>
            <Delete close={toggleDelet} />
          </Popup>
          <Popup open={openEdit}>
            <PopUp edit={true} employee={employee} close={closeEdit} />
          </Popup> */}
          <table className=" min-w-full w-200 md:w-full text-sm ">
            {/* tabelBody */}
            <thead>
              <tr className=" grid grid-cols-10 bg-white p-2 border text-black/70">
                <th className=" col-span-1  text-start">
                  {isArabicprop ? "الكود" : "Code"}
                </th>
                <th className=" col-span-2  text-start">
                  {isArabicprop ? "الإسم" : "Name"}
                </th>
                <th className=" col-span-2  text-start">
                  {isArabicprop ? "التاريخ" : "Date"}
                </th>
                <th className=" col-span-2  text-start">
                  {isArabicprop ? "وقت الحضور" : "Time In"}
                </th>
                <th className=" col-span-2  text-cenetr">
                  {isArabicprop ? "وقت الإنصراف" : "Time Out"}
                </th>
                <th className=" col-span-1 text-cenetr">
                  {isArabicprop ? "العمليات" : "Actions"}
                </th>
              </tr>
            </thead>

            {/* <tbody className=" text-sm"> {tabelData} </tbody> */}
          </table>
        </div>
      </div>
    </div>
  );
}
