"use client";
import Paginate from "@/app/components/Paginate";
import Delete from "@/app/components/popup/delete";
import { isArabic } from "@/utils/langStore";
import { options } from "@/utils/optionStore";
import useOptions from "@/utils/useOptions";
import Link from "next/link";
import React, { useContext } from "react";
import { useState } from "react";
import Popup from "reactjs-popup";
import PopUp from "./PopUp";

export default function AutoTransaction() {
  const isArabicprop = useContext(isArabic).arabic;
  const branchesOptions = useOptions(useContext(options).branch);

  const tempData = [
    {
      id: 1,
      branch: "branch 1",
      time: "12:00",
    },
    {
      id: 2,
      branch: "branch 2",
      time: "13:30"
    },
  ];

  //
  //
  //Search
  //
  //
  const [slice, setSlice] = useState([]);
  const [getData, setGetData] = useState(tempData);
  const getSlice = (slice) => {
    setSlice(slice);
  };

  const [showsearch, setShowSearch] = useState(true);
  const [branch, setBranch] = useState("");

  const searchHandeller = (e) => {
    e.preventDefault();
    let searched = tempData;
    if (branch) {
      searched = searched.filter((e) => e.branch === branch);
    }
    setGetData(searched);
  };

  const resetHandeller = () => {
    setBranch("");
    setGetData(tempData);
  };
  //
  //
  //PopUp
  //
  //

  const [openDelet, setOpenDelete] = useState(false);
  const [deleteditemName, setdeletedItemName] = useState("");
  //Edit
  const [openEdit, setOpenEdit] = useState(false);
  const [editElement, setEditElement] = useState({});

  const openEditHandeller = (e) => {
    setEditElement(e);
    setOpenEdit(!openEdit);
  };

  const closeEditHandeller = () => {
    setOpenEdit(!openEdit);
  };

  //add
  const [openAdd, setOpenAdd] = useState(false);
  const toggleOpenAdd = () => {
    setOpenAdd(!openAdd);
  };

  const openDeleteHandeller = (e) => {
    setdeletedItemName(e.name);
    setOpenDelete(!openDelet);
  };

  const closeDeleteHandeller = () => {
    setOpenDelete(!openDelet);
  };

  //
  //Maping
  //

  const tabelData = slice.map((e, index) => (
    <tr key={index} className=" grid grid-cols-9">
      <td className=" text-start col-span-5 md:col-span-4  p-2">{e.branch}</td>
      <td className=" text-start col-span-2 md:col-span-4 p-2">{e.time}</td>
      <td className=" text-center col-span-2 md:col-span-1 p-2 text-black/70">
        <i
          onClick={() => openDeleteHandeller(e)}
          className="fa-solid fa-trash mx-1 hover:cursor-pointer hover:text-red-600"
        ></i>

        <i
          onClick={() => openEditHandeller(e)}
          className="fa-solid fa-pen-to-square mx-1 hover:cursor-pointer hover:text-sky-600"
        ></i>
      </td>
    </tr>
  ));
  return (
    <div className="w-full">
      {/*  */}
      {/*  */}
      {/* Label */}
      {/*  */}
      {/*  */}
      <div className=" md:p-4 w-full font-sans grid grid-cols-6 md:grid-cols-12 items-center ">
        <div className=" col-span-6">
          <h1 className=" text-xl md:mb-3 md:text-3xl">{`${
            isArabicprop
              ? `اعدادات السحب التلقائي`
              : `Auto transaction settings`
          }`}</h1>
          <h1 className=" font-light flex">
            <Link href="/main">
              <h1 className=" font-normal hover:underline">
                {isArabicprop ? "الرئيسية" : "Main"}
              </h1>
            </Link>{" "}
            /{" "}
            <Link href="/main/generalSettings">
              <h1 className=" font-normal hover:underline">{` ${
                isArabicprop ? "الإعدادات العامة" : `General settings`
              }`}</h1>
            </Link>
            /{" "}
            {` ${
              isArabicprop
                ? `اعدادات السحب التلقائي`
                : `Auto transaction settings`
            }`}
          </h1>
        </div>
        <div className="flex col-span-6 justify-end mt-3 md:mt-0">
          <button
            className=" bg-gray-200  py-1 px-3 md:px-6 rounded-full mx-2 text-md"
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
            onClick={toggleOpenAdd}
            className="  bg-sky-400 text-white py-1 px-6 md:px-10 rounded-full md:mx-2 text-md"
          >
            {isArabicprop ? "إضافة" : "Add"}{" "}
          </button>
          <Popup open={openAdd}>
            <PopUp close={toggleOpenAdd} />
          </Popup>
        </div>
      </div>
      {showsearch && (
        <div className=" my-6 relative w-full p-2 border rounded-md">
          <i
            onClick={resetHandeller}
            className={`fa-solid fa-rotate-right hover:cursor-pointer absolute top-2 ${
              isArabicprop ? " left-2" : " right-2"
            }`}
          ></i>
          <form onSubmit={searchHandeller}>
            <div className="md:mx-4 pb-10 md:pb-0">
              <h4>{isArabicprop ? "الفرع" : "Branch"}</h4>
              <select
                className=" p-2 w-full md:w-1/4  border outline-none"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              >
                <option selected hidden>
                  Choose one
                </option>
                {branchesOptions}
              </select>
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
      <div className=" w-full">
        <Paginate data={getData} getSlice={getSlice} />
      </div>
      <div className=" w-full text-sm overflow-auto md:text-base font-sans my-4">
        <Popup open={openDelet}>
          <Delete close={closeDeleteHandeller} branch={deleteditemName} />
        </Popup>
        <Popup open={openEdit}>
          <PopUp edit={true} element={editElement} close={closeEditHandeller} />
        </Popup>
        <table className=" table-auto min-w-full  md:w-fit">
          <thead>
            <tr className="bg-white grid grid-cols-9 border text-black/70">
              <th className=" text-start col-span-5 md:col-span-4 p-2">
                {isArabicprop ? "إسم الفرع" : "Branch"}
              </th>
              <th className=" text-start col-span-2 md:col-span-4 p-2">
                {isArabicprop ? "الوقت" : "	Transfer Time"}
              </th>

              <th className=" text-center col-span-2 md:col-span-1 p-2">
                {isArabicprop ? "العمليات" : " Actions"}
              </th>
            </tr>
          </thead>
          <tbody>{tabelData}</tbody>
        </table>
      </div>
    </div>
  );
}
