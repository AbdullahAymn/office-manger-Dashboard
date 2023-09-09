"use client";
import { isArabic } from "@/utils/langStore";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

export default function TopSec(props) {
  const isArabicprop = useContext(isArabic).arabic;
  const [showsearch, setShowSearch] = useState(true);
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

  const [name, setName] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const searchHandeller = (e) => {
    e.preventDefault();
    let searched = props.dataForSearch;
    if (name) {
      if (isArabicprop) {
        searched = searched.filter((e) => e.name.includes(name.trim()));
      } else {
        searched = searched.filter((e) => e.name_en.includes(name.trim()));
      }

      
    }
    if (from) {
      searched = searched.filter((e) => e.fromday.includes(from));
    }
    if (to) {
      searched = searched.filter((e) => e.today.includes(to));
    }

    props.searchRes(searched);
  };

  const resetHandeller = () => {
    setName("");
    setFrom("");
    setTo("");
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
          <button
            onClick={props.addFun}
            className=" col-span-6  bg-sky-400 text-white py-1 px-10 rounded-full md:mx-2 text-md"
          >
            {isArabicprop ? "إضافة" : " Add"}{" "}
            <span className=" font-bold"> + </span>
          </button>
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
            <div className=" relative">
              <i
                onClick={resetHandeller}
                className={`fa-solid fa-rotate-right hover:cursor-pointer absolute top-0 ${
                  isArabic ? "left-0" : "right-0"
                } `}
              ></i>
              <div className=" w-full grid grid-cols-2 md:grid-cols-6 pt-6 pb-10 ">
                <div className=" mx-12 col-span-2">
                  <h4>{props.ti}</h4>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className=" text-md w-full p-1 border-1 rounded outline-none "
                    type="text"
                    placeholder={props.ti}
                  ></input>
                </div>
                <div className=" mx-12 col-span-2">
                  <h4>{isArabicprop ? "من" : "from"}</h4>
                  <input
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className=" text-md w-full p-1 border-1 rounded outline-none "
                    type="date"
                  ></input>
                </div>
                <div className=" mx-12 col-span-2">
                  <h4>{isArabicprop ? "الى" : "to"}</h4>
                  <input
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className=" text-md w-full p-1 border-1 rounded outline-none "
                    type="date"
                  ></input>
                </div>
              </div>
              <button
                type="submit"
                className={`bg-sky-400 text-white py-1 disabled:opacity-60 px-6 md:px-14 rounded-full mx-8 text-md mt-8 absolute bottom-0 ${
                  isArabic ? "left-0" : "right-0"
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
              "pagination flex items-center space-x-1 md:space-x-2 justify-between "
            }
            subContainerClassName={"pages pagination mx-2 "}
            activeClassName={"active text-sky-400 underline"}
          />
        </div>
      </div>
    </div>
  );
}
