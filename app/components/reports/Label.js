"use client";
import { isArabic } from "@/utils/langStore";
import { Button, Menu, MenuItem } from "@mui/material";
import Link from "next/link";
import React from "react";
import { useContext } from "react";
import { useState } from "react";

export default function Label(props) {
  const isArabicprop = useContext(isArabic).arabic;
  const [showsearch, setShowSearch] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //
  //
  //set Show Search
  //
  //

  const showsearchHandeller = async () => {
    await setShowSearch(!showsearch);

    props.setsearch(!showsearch);
  };
  return (
    <div className=" w-full">
      <div className=" md:p-4 w-full font-sans grid grid-cols-6 md:grid-cols-12 items-center ">
        <div className=" col-span-6">
          <h1 className=" text-xl md:mb-3 md:text-3xl">{`${
            isArabicprop ? `تقرير ${props.label}` : `${props.label} Report`
          }`}</h1>
          <h1 className=" font-light flex">
            <Link href="/main">
              <h1 className=" font-normal hover:underline">
                {isArabicprop ? "الرئيسية" : "Main"}
              </h1>
            </Link>{" "}
            /{" "}
            {`${
              isArabicprop ? `تقرير ${props.label}` : `${props.label} Report`
            }`}
          </h1>
        </div>
        <div className="flex col-span-6 justify-end mt-3 md:mt-0">
          <button
            className=" bg-gray-200  py-1 px-3 md:px-6 rounded-full mx-2 text-md"
            onClick={showsearchHandeller}
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
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
            className="  bg-sky-400 text-white py-1 px-6 md:px-10 rounded-full md:mx-2 text-md"
          >
            {isArabicprop ? "تصدير" : "Export"}{" "}
            <i className="fa-solid fa-caret-down "></i>
          </button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>
              <h1 onClick={props.pdf} className=" px-10">PDF</h1>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <h1 className=" px-10">Exel</h1>
            </MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
}
