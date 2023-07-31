"use client";
import NameAndSearch from "@/app/components/NameAndSearch";
import React, { useContext, useState } from "react";
import { tempProjectsData } from "./tempdata";
import { isArabic } from "@/utils/langStore";
import Popup from "reactjs-popup";
import Delete from "@/app/components/popup/delete";
import AddAndEdit from "@/app/components/popup/AddAndEdit";

export default function Projects() {
  const isArabicprop = useContext(isArabic).arabic;
  //
  //
  // get Data
  //
  //

  const [projectsData, setProjectsData] = useState(tempProjectsData);
  const [slice, setSlice] = useState([]);

  const getSlice = (slice) => {
    setSlice(slice);
  };

  const searched = (searchRes) => {
    setProjectsData(searchRes);
  };

  const restSearch = () => {
    setProjectsData(tempProjectsData);
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
      <td className=" col-span-7 md:col-span-8 text-start">{isArabicprop ? e.nameAr : e.nameEn}</td>
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
          data={projectsData}
          dataForSearch={tempProjectsData}
          name={isArabicprop ? "المشاريع" : "Projects"}
          subName={isArabicprop ? "المشاريع" : "Projects"}
          ti={isArabicprop ? "المشروع" : "Project"}
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
                  {isArabicprop ? "المشروع" : " Project"}
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
