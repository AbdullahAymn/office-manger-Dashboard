"use client";
import { isArabic } from "@/utils/langStore";
import React, { useContext, useState } from "react";
import { tempWorkingData } from "./tempData";
import NameAndSearch from "@/app/components/NameAndSearch";
import AddAndEdit from "@/app/components/popup/AddAndEdit";
import Popup from "reactjs-popup";
import Delete from "@/app/components/popup/delete";
import PopUpCom from "./components/PopUp";

export default function WorkingTime() {
  const isArabicprop = useContext(isArabic).arabic;
  //
  //
  // get Data
  //
  //

  const [workingData, setWorkingData] = useState(tempWorkingData);
  const [slice, setSlice] = useState([]);

  const getSlice = (slice) => {
    setSlice(slice);
  };

  const searched = (searchRes) => {
    setWorkingData(searchRes);
  };

  const restSearch = () => {
    setWorkingData(tempWorkingData);
  };

  //
  //
  //PopUp
  //
  //

  //Add
  const [openAdd, setOpenAdd] = useState(false);
  const toggelOpenAdd = () => {
    setOpenAdd(!openAdd);
  };

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
  const [editedItemOpenShift, setEditedItemOpenShift] = useState();

  const openEditHandeller = (e) => {
    setOpenEdit(!openEdit);
    setEditedItemName(e.nameAr);
    setEditedItemNameEn(e.nameEn);
    setEditedItemOpenShift(e.open);
  };

  const closeEditHandeller = () => {
    setOpenEdit(!openEdit);
  };

  //
  //
  //Maping
  //
  //
  const tabelData = slice.map((e) => (
    <tr key={e.id} className="grid grid-cols-9 p-2">
      <td className=" col-span-2 text-start">
        {isArabicprop ? e.nameAr : e.nameEn}
      </td>
      <td className=" col-span-2 text-center">{e.hours}</td>
      <td className=" col-span-2 text-center">{e.endTime}</td>
      <td className=" col-span-2 text-center">
        {e.open ? (
          <h1 className=" font-bold text- mx-auto text-white rounded-md text-center px-1 pb-1 w-10 bg-green-600">
            {isArabicprop ? " نعم" : "Yes "}
          </h1>
        ) : (
          <h1 className=" font-bold text-white mx-auto rounded-md text-center px-1 pb-1 w-10 bg-red-600">
            {isArabicprop ? "لا " : "No "}
          </h1>
        )}
      </td>
      <td className=" col-span-1 text-center text-black/70">
        <i
          onClick={() => openDeleteHandeller(e)}
          className="fa-solid fa-trash mx-1 md:mx-4 hover:cursor-pointer hover:text-red-600"
        ></i>
        <i
          onClick={() => openEditHandeller(e)}
          className="fa-solid fa-pen-to-square mx-1 md:mx-4 hover:cursor-pointer hover:text-sky-600"
        ></i>
      </td>
    </tr>
  ));
  return (
    <div className="overflow-x-hidden">
      {/*  */}
      {/*  */}
      {/* The top section */}
      {/*  */}
      {/*  */}
      <div>
        {/* Add PopUp */}
        <Popup open={openAdd}>
          <PopUpCom close={toggelOpenAdd} />
        </Popup>

        {/* the Body */}
        <NameAndSearch
          getSlice={getSlice}
          searchRes={searched}
          reset={restSearch}
          addFun={toggelOpenAdd}
          data={workingData}
          dataForSearch={tempWorkingData}
          name={isArabicprop ? "أوقات العمل" : "Shifts"}
          subName={isArabicprop ? "أوقات العمل" : "Shifts"}
          ti={isArabicprop ? "الوقت" : "Working time"}
        />
      </div>
      {/*  */}
      {/*  */}
      {/* The Tabel */}
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

        {/* edit */}

        <Popup open={openEdit}>
          <PopUpCom
            edit={true}
            name={editedItemName}
            nameEn={editedItemNameEn}
            openShift={editedItemOpenShift}
            close={closeEditHandeller}
          />
        </Popup>

        {/*  */}
        {/* tabelBody */}
        {/*  */}
        <div className=" w-full font-sans my-4 overflow-x-scroll md:overflow-x-hidden">
          <table className=" text-sm md:text-base min-w-full w-150 md:w-full">
            <thead>
              <tr className=" grid grid-cols-9 bg-white p-2 border text-black/70">
                <th className=" col-span-2 text-start">
                  {isArabicprop ? "الإسم" : " Name"}
                </th>
                <th className=" col-span-2 text-center">
                  {isArabicprop ? "إجمالي الساعات " : " Total hours"}
                </th>
                <th className=" col-span-2 text-center">
                  {isArabicprop ? "وقت إنتهاء اليوم" : " Day End Time"}
                </th>
                <th className=" col-span-2 text-center">
                  {isArabicprop ? "دوام مفتوح" : " Open Working Time"}
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
