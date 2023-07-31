"use client";
import React, { useContext, useState } from "react";
import TopSec from "./components/TopSec";
import { isArabic } from "@/utils/langStore";
import { tempEmployeesData } from "./tempData";
import Popup from "reactjs-popup";
import Delete from "@/app/components/popup/delete";
import Link from "next/link";

export default function Employees() {
  //
  const isArabicprop = useContext(isArabic).arabic;

  //delete

  const [openDelet, setOpenDelete] = useState(false);
  const [deleteditemName, setdeletedItemName] = useState("");

  const openDeleteHandeller = (e) => {
    setdeletedItemName(e.name);
    setOpenDelete(!openDelet);
  };

  const closeDeleteHandeller = () => {
    setOpenDelete(!openDelet);
  };

  //
  //Get Data
  //
  const [employeesData, setEmployeesData] = useState(tempEmployeesData);
  const [slice, setSlice] = useState([]);
  const getSlice = (slice) => {
    setSlice(slice);
  };

  const searched = (searchRes) => {
    setEmployeesData(searchRes);
  };

  const restSearch = () => {
    setEmployeesData(tempEmployeesData);
  };

  //
  //
  //Maping
  //
  //
  const tabelData = slice.map((e) => (
    <tr key={e.id} className="grid grid-cols-11 p-2">
      <td className=" col-span-2 text-start">{e.id}</td>
      <td className=" col-span-2 text-start">{isArabicprop ? e.nameAr : e.nameEn}</td>
      <td className=" col-span-2 text-start">{e.branch}</td>
      <td className=" col-span-2 text-start">{e.shift}</td>
      <td className=" col-span-2 text-start">
        {e.active ? (
          <h1 className=" font-bold text-white rounded-md text-center px-1 pb-1 w-10 bg-green-600">
            {isArabicprop ? " نعم" : "Yes "}
          </h1>
        ) : (
          <h1 className=" font-bold text-white rounded-md text-center px-1 pb-1 w-10 bg-red-600">
            {isArabicprop ? "لا " : "No "}
          </h1>
        )}
      </td>
      <td className=" col-span-1 text-center text-black/70">
        <i
          onClick={() => openDeleteHandeller(e)}
          className="fa-solid fa-trash mx-1 hover:cursor-pointer hover:text-red-600"
        ></i>
        <Link href={`/main/employees/${e.id}`}>
          <i className="fa-solid fa-pen-to-square mx-1 hover:cursor-pointer hover:text-sky-600"></i>
        </Link>
      </td>
    </tr>
  ));

  return (
    <div className=" overflow-x-hidden">
      {/*  */}
      {/*  */}
      {/* Top Section */}
      {/*  */}
      {/*  */}

      <TopSec
        getSlice={getSlice}
        searchRes={searched}
        reset={restSearch}
        data={employeesData}
        dataForSearch={tempEmployeesData}
        name={isArabicprop ? "الموظفون" : "Employees"}
        subName={isArabicprop ? "الموظفون" : "Employees"}
        ti={isArabicprop ? "المشروع" : "Project"}
      />

      {/*  */}
      {/*  */}
      {/* Tabel */}
      {/*  */}
      {/*  */}
      <div>
        {/*  */}
        {/* PopUps */}
        {/*  */}

        {/* delete */}
        <Popup open={openDelet}>
          <Delete close={closeDeleteHandeller} branch={deleteditemName} />
        </Popup>
        {/*  */}
        {/* tabelBody */}
        {/*  */}

        <div className=" w-full text-sm overflow-x-scroll md:overflow-x-hidden md:text-base font-sans my-4">
          <table className=" min-w-full w-150 md:w-full">
            <thead>
              <tr className=" grid grid-cols-11 bg-white p-2 border text-black/70">
                <th className=" col-span-2 text-start">
                  {isArabicprop ? "الكود" : " Code"}
                </th>
                <th className=" col-span-2 text-start">
                  {isArabicprop ? "الإسم" : " Name"}
                </th>
                <th className=" col-span-2 text-start">
                  {isArabicprop ? "الفرع" : " Branch"}
                </th>
                <th className=" col-span-2 text-start">
                  {isArabicprop ? "الدوام" : "Shift "}
                </th>
                <th className=" col-span-2 text-start">
                  {isArabicprop ? "نشط" : " Active"}
                </th>
                <th className=" col-span-1 text-center">
                  {isArabicprop ? "العمليات" : " Actions"}
                </th>
              </tr>
            </thead>
            <tbody>{tabelData}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
