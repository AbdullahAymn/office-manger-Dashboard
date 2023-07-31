"use client";
import NameAndSearch from "@/app/components/NameAndSearch";
import AddAndEdit from "@/app/components/popup/AddAndEdit";
import Delete from "@/app/components/popup/delete";
import { isArabic } from "@/utils/langStore";
import React, { useContext, useState } from "react";
import Popup from "reactjs-popup";
import { tempNatData } from "./tempdata";

export default function page() {
  const isArabicprop = useContext(isArabic).arabic;
  //
  //
  // get Data
  //
  //

  const [natinaltyData, setnatinaltyData] = useState(tempNatData);
  const [slice, setSlice] = useState([]);

  const getSlice = (slice) => {
    setSlice(slice);
  };

  const searched = (searchRes) => {
    setnatinaltyData(searchRes);
  };

  const restSearch = () => {
    setnatinaltyData(tempNatData);
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

  const openEditHandeller = (e) => {
    setOpenEdit(!openEdit);
    setEditedItemName(e.nameAr);
    setEditedItemNameEn(e.nameEn);
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
      <td className=" col-span-7 md:col-span-8 text-start">{isArabicprop?e.nameAr : e.nameEn}</td>
      <td className=" col-span-2 md:col-span-1 text-center text-black/70">
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
    <div>
      {/*  */}
      {/*  */}
      {/* The top section */}
      {/*  */}
      {/*  */}
      <div>
        {/* Add PopUp */}
        <Popup open={openAdd}>
          <AddAndEdit close={toggelOpenAdd} />
        </Popup>

        {/* the Body */}
        <NameAndSearch
          getSlice={getSlice}
          searchRes={searched}
          reset={restSearch}
          addFun={toggelOpenAdd}
          data={natinaltyData}
          dataForSearch={tempNatData}
          name={isArabicprop ? "الجنسيات" : "Nationalities"}
          subName={isArabicprop ? "الجنسيات" : "Nationalities"}
          ti={isArabicprop ? "الجنسية" : "Nationality"}
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
          <AddAndEdit
            edit={true}
            name={editedItemName}
            nameEn={editedItemNameEn}
            close={closeEditHandeller}
          />
        </Popup>

        {/*  */}
        {/* tabelBody */}
        {/*  */}
        <div className=" w-full text-sm md:text-base font-sans my-4">
          <table className=" min-w-full">
            <thead>
              <tr className=" grid grid-cols-9 bg-white p-2 border text-black/70">
                <th className=" col-span-7 md:col-span-8 text-start">
                  {isArabicprop ? "الجنسية" : "Nationality"}
                </th>
                <th className=" col-span-2 md:col-span-1 text-center">
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
