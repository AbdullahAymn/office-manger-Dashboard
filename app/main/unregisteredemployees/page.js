"use client";
import { isArabic } from "@/utils/langStore";
import React, { useContext, useState } from "react";
import { tempUserData } from "./tempData";
import NameAndSearch from "@/app/components/NameAndSearch";
import Popup from "reactjs-popup";
import AddAndEdit from "@/app/components/popup/AddAndEdit";
import Delete from "@/app/components/popup/delete";

export default function UnregisteredEmployees() {
  const isArabicprop = useContext(isArabic).arabic;
  //
  // get Data
  //
  const [userData, setUserData] = useState(tempUserData);
  const [slice, setSlice] = useState([]);

  const get = (slice) => {
    setSlice(slice);
  };

  const searched = (searchRes) => {
    setUserData(searchRes);
  };

  const restSearch = () => {
    setUserData(tempUserData);
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

  const openEditHandeller = (e) => {
    setOpenEdit(!openEdit);
    setEditedItemName(e.nameAr);
    setEditedItemNameEn(e.nameEn);
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
    <tr key={e.name} className="grid grid-cols-9 p-2">
      <td className=" col-span-2 md:col-span-1 text-start">{e.id}</td>
      <td className=" col-span-5 md:col-span-7 text-start">
        {isArabicprop ? e.nameAr : e.nameEn}
      </td>
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
      {/* Top sec */}
      {/*  */}
      <div>
        {/* Add popUp */}
        <Popup open={openAdd}>
          <AddAndEdit close={toggelOpenAdd} />
        </Popup>
        {/* Body */}
        <NameAndSearch
          searchRes={searched}
          reset={restSearch}
          getSlice={get}
          addFun={toggelOpenAdd}
          data={userData}
          dataForSearch={tempUserData}
          subName={isArabicprop ? "موظفون " : "Unregistered "}
          name={isArabicprop ? "موظفون " : "Unregistered "}
          ti={isArabicprop ? "الموظف" : "Employee"}
        />
      </div>
      {/*  */}
      {/*  */}
      {/* Tabel */}
      {/*  */}
      {/*  */}
      <div className=" w-full font-sans my-4">
        <table className=" min-w-full">
          {/*  */}
          {/* popUps */}
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

          {/* tabelBody */}
          <thead>
            <tr className=" grid grid-cols-9 bg-white p-2 border text-black/70">
              <th className=" col-span-2 md:col-span-1 text-start">
                {isArabicprop ? "الكود" : "Code"}
              </th>
              <th className=" col-span-5 md:col-span-7 text-start">
                {isArabicprop ? "الموظف" : "Employee"}
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
  );
}
