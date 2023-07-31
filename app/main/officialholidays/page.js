"use client";
import { isArabic } from "@/utils/langStore";
import React, { useContext, useState } from "react";
import TopSec from "./components/TopSec";
import { holidaysTempData } from "./tempData";
import Popup from "reactjs-popup";
import Delete from "@/app/components/popup/delete";
import PopUpCopm from "./components/PopUp";

export default function page() {
  const isArabicprop = useContext(isArabic).arabic;
  //
  // get Data
  //
  const [holidaysData, setHolidaysData] = useState(holidaysTempData);
  const [slice, setSlice] = useState([]);

  const get = (slice) => {
    setSlice(slice);
  };

  const searched = (searchRes) => {
    setHolidaysData(searchRes);
  };

  const restSearch = () => {
    setHolidaysData(holidaysTempData);
  };

  //
  //
  //popUps
  //
  //

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

  //edit
  const [openEdit, setOpenEdit] = useState(false);
  const [editedItemName, setEditedItemName] = useState("");
  const [editedItemNameEn, setEditedItemNameEn] = useState("");
  const [editedItemFrom, setEditedItemFrom] = useState("");
  const [editedItemTo, setEditedItemTo] = useState("");

  const openEditHandeller = (e) => {
    setOpenEdit(!openEdit);
    setEditedItemName(e.nameAr);
    setEditedItemNameEn(e.nameEn);
    setEditedItemFrom(e.from);
    setEditedItemTo(e.to);
  };

  const closeEditHandeller = () => {
    setOpenEdit(!openEdit);
  };

  //Add

  const [openAdd, setOpenAdd] = useState(false);

  const toggelOpenAdd = () => {
    setOpenAdd(!openAdd);
  };

  //
  //
  //maping
  //
  //

  const tabelData = slice.map((e) => (
    <tr key={e.name} className="grid grid-cols-12 p-2">
      <td className=" col-span-3 text-start">{ isArabicprop ?e.nameAr : e.nameEn}</td>
      <td className=" col-span-2 md:col-span-3 text-start">{e.from}</td>
      <td className=" col-span-2 md:col-span-3 text-start">{e.to}</td>
      <td className=" col-span-2 md:col-span-1 text-center">{e.num}</td>
      <td className=" col-span-2 md:col-span-1 text-center">
        {e.status ? (
          <div className=" text-center">
            <h4 className=" mx-auto w-fit px-2 text-center text-white  bg-green-800 rounded-md">
              {isArabicprop ? "حالية" : "Active"}
            </h4>
          </div>
        ) : (
          <div className=" text-center">
            <h4 className=" mx-auto w-fit px-2 text-center text-white  bg-red-600 rounded-md">
              {isArabicprop ? "أنتهت" : "Ends"}
            </h4>
          </div>
        )}
      </td>
      <td className=" col-span-1 text-center text-black/70">
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
    <div className=" font-sans overflow-x-hidden">
      {/*  */}
      {/* Top sec */}
      {/*  */}
      <div>
        <Popup open={openAdd}>
          <PopUpCopm close={toggelOpenAdd} />
        </Popup>
        <TopSec
          searchRes={searched}
          reset={restSearch}
          getSlice={get}
          addFun={toggelOpenAdd}
          data={holidaysData}
          dataForSearch={holidaysTempData}
          subName={isArabicprop ? "العطلات " : " Holidays"}
          name={isArabicprop ? "العطلات " : " Holidays"}
          ti={isArabicprop ? "العطلة" : "Holiday"}
        />
      </div>
      {/*  */}
      {/*  */}
      {/* Tabel */}
      {/*  */}
      {/*  */}
      <div className=" w-full overflow-x-scroll md:overflow-x-hidden font-sans my-4">
        <table className=" min-w-full text-sm md:text-base w-150 md:w-full font-sans">
          {/*  */}
          {/* popUps */}
          {/*  */}

          {/* delete */}
          <Popup open={openDelet}>
            <Delete close={closeDeleteHandeller} branch={deleteditemName} />
          </Popup>

          {/* Edit */}
          <Popup open={openEdit}>
            <PopUpCopm
              name={editedItemName}
              nameEn={editedItemNameEn}
              from={editedItemFrom}
              to={editedItemTo}
              edit={true}
              close={closeEditHandeller}
            />
          </Popup>

          {/* tabelBody */}
          <thead>
            <tr className=" grid grid-cols-12 bg-white p-2 border text-black/70">
              <th className=" col-span-3 text-start">
                {isArabicprop ? "العطلة" : "Holiday"}
              </th>
              <th className=" col-span-2 md:col-span-3 text-start">
                {isArabicprop ? "من" : "From"}
              </th>
              <th className=" col-span-2 md:col-span-3 text-start">
                {isArabicprop ? "إلى" : "to"}
              </th>
              <th className=" col-span-2 md:col-span-1 text-center">
                {isArabicprop ? "المدة" : "Duration"}
              </th>
              <th className=" col-span-2 md:col-span-1 text-center">
                {isArabicprop ? "الحالة" : "status"}
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
  );
}
