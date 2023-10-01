"use client";
import Loader from "@/app/components/Loader";
import Paginate from "@/app/components/Paginate";
import { isArabic } from "@/utils/langStore";
import { options } from "@/utils/optionStore";
import useOptions from "@/utils/useOptions";
import { InputLabel, MenuItem, Select } from "@mui/material";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import Popup from "reactjs-popup";

export default function GetBranchTransactions() {
  const isArabicprop = useContext(isArabic).arabic;
  const [showsearch, setShowSearch] = useState(true);
  const [loader, setLoader] = useState(false);

  const refrshopt = useContext(options).refresh;
  const setrefrshopt = useContext(options).setRefresh;
  useEffect(() => {
    setrefrshopt(!refrshopt);
  }, []);
  const branchesOptions = useOptions(useContext(options).branch);

  //
  //
  //search
  //
  //
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [branch, setBranch] = useState("");

  // console.log(branch);

  const resetHandeller = () => {
    setFrom("");
    setTo("");
    setBranch("");
  };

  // Paginate
  const [slice, setSlice] = useState([]);
  const [getData, setGetData] = useState([]);
  const getSlice = (slice) => {
    setSlice(slice);
  };

  return (
    <div className=" font-sans">
      <Popup open={loader}>
        <Loader />
      </Popup>
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
          <button
            // onClick={props.addFun}
            className=" col-span-6  bg-green-400 text-white py-1 px-3 rounded-full md:mx-2 text-md"
          >
            {isArabicprop ? "سحب حركات الفروع" : "Get Transactions"}{" "}
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
              <div className=" py-4 grid grid-cols-4 md:grid-cols-12">
                <div className=" w-full col-span-4 px-4">
                  <h4>{isArabicprop ? "من" : "From"}</h4>
                  <input
                    className=" p-2 border w-full outline-none "
                    type="date"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                  />
                </div>
                <div className=" w-full col-span-4 px-4">
                  <h4>{isArabicprop ? "الى" : "To"}</h4>
                  <input
                    className=" p-2 border outline-none w-full "
                    type="date"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                  />
                </div>
                <div className=" w-full col-span-4 px-4">
                  <h4>{isArabicprop ? "الفروع" : "Branches"}</h4>
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
              </div>
            </form>
          </div>
        </div>
      )}

      {/*  */}
      {/* Paginate */}
      {/*  */}

      <div className=" w-full">
        <Paginate data={getData} getSlice={getSlice} />
      </div>

      {/*  */}
      {/* Table */}
      {/*  */}
      <div className=" w-full font-sans my-4">
        <table className=" min-w-full text-sm md:text-base">
          {/* tabelBody */}
          <thead>
            <tr className=" grid grid-cols-9 bg-white p-2 border text-black/70">
              <th className=" col-span-9 text-start">
                {isArabicprop ? "الحركات" : "Transactions"}
              </th>
            </tr>
          </thead>
          {/* <tbody>{tabelData}</tbody> */}
        </table>
      </div>
    </div>
  );
}
