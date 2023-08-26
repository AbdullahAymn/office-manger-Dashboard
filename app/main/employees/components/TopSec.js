"use client";
import React, { useContext, useEffect, useState } from "react";
import { isArabic } from "@/utils/langStore";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import useOptions from "@/utils/useOptions";
import { options } from "@/utils/optionStore";

export default function (props) {
  const isArabicprop = useContext(isArabic).arabic;
  const [showsearch, setShowSearch] = useState(true);

  const refrshopt = useContext(options).refresh;
  const setrefrshopt = useContext(options).setRefresh;
  useEffect(() => {
    setrefrshopt(!refrshopt);
  }, []);
  const branchesOptions = useOptions(useContext(options).branch);
  const mangementOptions = useOptions(useContext(options).mangement);
  const departmentOptions = useOptions(useContext(options).department);
  const workingTimeOptions = useOptions(useContext(options).workingTime);

  //
  //
  //Num of Rows
  //
  //

  const [rows, setRow] = useState(10);
  const [offset, setOffSet] = useState(0);

  const slice = props.data.slice(offset, offset + +rows);
  useEffect(() => {
    props.getSlice(slice);
  }, [props.data, offset, rows]);

  const numper = Math.ceil(props.data.length / rows);

  const handelClick = (e) => {
    setOffSet(e.selected * rows);
  };

  //
  //
  //Search
  //
  //

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("choose");
  const [mangement, setMangment] = useState("choose");
  const [departMent, setDepartment] = useState("choose");
  const [shift, setshift] = useState("choose");

  const searchHandeller = (e) => {
    e.preventDefault();
    let searched = props.dataForSearch;
    if (code) {
      searched = searched.filter((e) => e.code === +code);
    }
    if (name) {
      if (isArabicprop) {
        searched = searched.filter((e) => e.name_ar.includes(name.trim()));
      } else {
        searched = searched.filter((e) => e.name_en.includes(name.trim()));
      }
    }
    if (branch !== "choose") {
      searched = searched.filter((e) => e.id_branch === branch);
    }
    if (mangement !== "choose") {
      searched = searched.filter((e) => e.id_administation === mangement);
    }
    if (departMent !== "choose") {
      searched = searched.filter((e) => e.id_depatment === departMent);
    }
    if (shift !== "choose") {
      searched = searched.filter((e) => e.id_shift === shift);
    }

    props.searchRes(searched);
  };

  const resetHandeller = () => {
    setName("");
    setCode("");
    setBranch("choose");
    setMangment("choose");
    setshift("choose");
    setDepartment("choose");
    props.reset();
  };

  return (
    <div>
      {/*  */}
      {/* Top section */}
      {/*  */}
      <div className=" md:p-4 w-full font-sans flex items-center justify-between">
        <div>
          <h1 className=" text-xl mb-3 md:text-3xl">{props.name}</h1>
          <h1 className=" font-light flex">
            <Link href="/main">
              <h1 className=" font-normal hover:underline">
                {isArabicprop ? "الرئيسية" : "Main"}
              </h1>
            </Link>{" "}
            / {props.subName}
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
          <div className=" col-span-6">
            <Link href="/main/employees/add">
              <button className=" w-full  bg-sky-400 text-white py-1 px-10 rounded-full md:mx-2 text-md">
                {isArabicprop ? "إضافة" : " Add"}{" "}
                <span className=" font-bold"> + </span>
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/*  */}
      {/*  */}
      {/* Search Section */}
      {/*  */}
      {/*  */}

      {showsearch && (
        <div className=" p-3 rounded-lg border-1  font-sans">
          <form onSubmit={searchHandeller}>
            <div className=" w-full pt-4 relative">
              <i
                onClick={resetHandeller}
                className={`fa-solid fa-rotate-right hover:cursor-pointer absolute top-0 ${
                  isArabicprop ? " left-0" : " right-0"
                }`}
              ></i>
              <div className=" w-full grid grid-cols-12">
                <div className=" my-1 col-span-12 md:col-span-3 mx-6">
                  <h4>{isArabicprop ? "الكود" : " Code"}</h4>
                  <input
                    onChange={(e) => setCode(e.target.value)}
                    value={code}
                    placeholder={isArabicprop ? "الكود" : " Code"}
                    className=" p-2 border outline-none w-full"
                    type="number"
                    min={0}
                  ></input>
                </div>
                <div className=" my-1 col-span-12 md:col-span-3 mx-6">
                  <h4>{isArabicprop ? "الإسم" : " Name"}</h4>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    placeholder={isArabicprop ? "الإسم" : " Name"}
                    className=" p-2 border outline-none w-full"
                    type="text"
                  ></input>
                </div>
                <div className=" my-1 col-span-12 md:col-span-3 mx-6">
                  <h4>{isArabicprop ? "الفرع" : " Branch"}</h4>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
                    className=" p-2 border outline-none w-full"
                  >
                    <option selected hidden>
                      Choose one
                    </option>
                    {branchesOptions}
                  </select>
                </div>
                <div className=" my-1 col-span-12 md:col-span-3 mx-6">
                  <h4>{isArabicprop ? "الإدارة" : " Management"}</h4>
                  <select
                    value={mangement}
                    onChange={(e) => setMangment(e.target.value)}
                    className=" p-2 border outline-none w-full"
                  >
                    <option selected hidden>
                      Choose one
                    </option>
                    {mangementOptions}
                  </select>
                </div>
                <div className=" my-1 col-span-12 md:col-span-3 mx-6">
                  <h4>{isArabicprop ? "القسم" : " Department"}</h4>
                  <select
                    value={departMent}
                    onChange={(e) => setDepartment(e.target.value)}
                    className=" p-2 border outline-none w-full"
                  >
                    <option selected hidden>
                      Choose one
                    </option>
                    {departmentOptions}
                  </select>
                </div>
                <div className=" my-1 col-span-12 mb-10 md:mb-0 md:col-span-3 mx-6">
                  <h4>{isArabicprop ? "الدوام" : " Working Time"}</h4>
                  <select
                    value={shift}
                    onChange={(e) => setshift(e.target.value)}
                    className=" p-2 border outline-none w-full"
                  >
                    <option selected hidden>
                      Choose one
                    </option>
                    {workingTimeOptions}
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className={` bg-sky-400 text-white py-1  disabled:opacity-60 px-6 md:px-14 rounded-full mx-8 text-lg absolute bottom-0 ${
                  isArabicprop ? " left-2" : " right-2"
                }`}
              >
                {isArabicprop ? "بحث" : " Search"}{" "}
              </button>
            </div>
          </form>
        </div>
      )}
      <div className=" font-sans w-full flex items-center justify-between">
        <div>
          <h4 className=" py-2">{isArabicprop ? "الصفوف" : "Rows"}</h4>
          <input
            onFocus={(e) => e.target.select()}
            onChange={(e) => {
              e.target.value === "" ? setRow(1) : setRow(e.target.value);
            }}
            className="p-2 outline-none border rounded-md w-52"
            type="number"
            min={1}
            max={50}
            value={rows}
          ></input>
        </div>
        <div className=" px-2 text-sm md:px-8 md:text-base ">
          <ReactPaginate
            previousLabel={"<<"}
            nextLabel={">>"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={numper}
            marginPagesDisplayed={1}
            pageRangeDisplayed={1}
            onPageChange={handelClick}
            containerClassName={
              "pagination flex items-center space-x-1 md:space-x-2  justify-between "
            }
            subContainerClassName={"pages pagination mx-2 "}
            activeClassName={"active text-sky-400 underline"}
          />
        </div>
      </div>
    </div>
  );
}
