"use client";
import React, { useContext, useEffect, useState } from "react";
import { isArabic } from "@/utils/langStore";
import Link from "next/link";
import ReactPaginate from "react-paginate";

export default function (props) {
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

  const [search, setSearch] = useState("");

  const searchHandeller = (e) => {
    e.preventDefault();
    let searched = [];
    if (isArabicprop) {
      searched = props.dataForSearch.filter(
        //(e) => e.name.trim() === search.trim()
        (e) => e.name.includes(search.trim())
      );
    } else {
      searched = props.dataForSearch.filter(
        //(e) => e.name.trim() === search.trim()
        (e) => e.name_en.includes(search.trim())
      );
    }

    props.searchRes(searched);
  };

  const resetHandeller = () => {
    setSearch("");
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
          <div className=" flex items-center justify-between px-2 mb-4">
            <h4 className=" text-lg">{props.ti}</h4>
            <i
              onClick={resetHandeller}
              className="fa-solid fa-rotate-right hover:cursor-pointer"
            ></i>
          </div>
          <form onSubmit={searchHandeller}>
            <div className=" w-full flex items-center justify-between ">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className=" text-md p-1 border-1 rounded outline-none "
                type="text"
                placeholder={props.ti}
              ></input>

              <button
                disabled={!search}
                type="submit"
                className=" bg-sky-400 text-white md:py-1 disabled:opacity-60 px-5  md:px-14 rounded-full mx-2 md:mx-8 text-md"
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
