"use client";
import Employees from "@/app/components/Employees";
import { isArabic } from "@/utils/langStore";
import Link from "next/link";
import React, { useContext, useState } from "react";
import Popup from "reactjs-popup";
import { tempEmployeesData } from "./tempData";

export default function CancelTransfer() {
  const isArabicprop = useContext(isArabic).arabic;
  const [showsearch, setShowSearch] = useState(true);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
//   const [selected, setSelected] = useState([]);
  const [numberOfUnTransfered, setNumberOfUnTransfered] = useState(0);
  const [openEmployees, setOpenEmployees] = useState(false);

  const resetHandeller = () => {
    setSelectedEmployyes([]);
    setFrom("");
    setTo("");
  };

  const openEmploye = () => {
    setOpenEmployees(!openEmployees);
  };
  const closeEmploye = () => {
    setOpenEmployees(!openEmployees);
  };

  const data = tempEmployeesData;

  const [selectedEmployees, setSelectedEmployyes] = useState([]);

  const getSelectedData = (dataFromEmployees) => {
    setSelectedEmployyes(dataFromEmployees);
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
              {isArabicprop ? "إلغاء ترحيل" : "Transfer"}
            </h1>
            <h1 className=" font-light flex">
              <Link href="/main">
                <h1 className=" font-normal hover:underline">
                  {isArabicprop ? "الرئيسية" : "Main"}
                </h1>
              </Link>{" "}
              / {isArabicprop ? "الغاء الترحيل" : "Cancel Transfer"}
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
            <button
              // onClick={toggelAdd}
              className=" col-span-6  bg-red-600 text-white py-1 px-4 rounded-full md:mx-2 text-md"
            >
              {isArabicprop ? "إلغاء ترحيل الحركات" : "Cancel Transfer Transactions"}{" "}
            </button>
          </div>
          <Popup open={openEmployees}>
            <Employees
              close={closeEmploye}
              data={data}
              add={getSelectedData}
              selected={selectedEmployees}
            />
          </Popup>
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
              <div className=" w-full grid grid-cols-1 md:grid-cols-3">
                <div className=" col-span-1 mx-4">
                  <h4>{isArabicprop ? "من" : "From"}</h4>
                  <input
                    type="date"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className=" w-full p-2 border bg-white"
                  />
                </div>
                <div className=" col-span-1 mx-4">
                  <h4>{isArabicprop ? "إلى" : "To"}</h4>
                  <input
                    type="date"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className=" w-full p-2 border bg-white"
                  />
                </div>
                <div className=" w-full  col-span-1 mx-4 flex items-end ">
                  <button
                    onClick={openEmploye}
                    className=" bg-sky-400 text-white px-10 py-1 mt-2 md:mt-0 rounded-full outline-none  "
                  >
                    {isArabicprop ? "الموظفون" : "ُEmployees"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
