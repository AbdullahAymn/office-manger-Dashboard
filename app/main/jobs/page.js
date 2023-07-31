"use client";
import NameAndSearch from "@/app/components/NameAndSearch";
import React, { useContext, useState } from "react";
import { tempJopsData } from "./TempData";
import { isArabic } from "@/utils/langStore";
import Delete from "@/app/components/popup/delete";
import Popup from "reactjs-popup";
import AddAndEdit from "@/app/components/popup/AddAndEdit";

export default function jobs() {
  const isArabicprop = useContext(isArabic).arabic;
  //
  // get Data
  //
  const [jobsData, setJobsData] = useState(tempJopsData);
  const [slice, setSlice] = useState([]);

  const get = (slice) => {
    setSlice(slice);
  };

  const searched = (searchRes) => {
    setJobsData(searchRes);
  };

  const restSearch = () => {
    setJobsData(tempJopsData);
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
      <td className=" col-span-7 md:col-span-8 text-start">{ isArabicprop ? e.nameAr : e.nameEn}</td>
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
          data={jobsData}
          dataForSearch={tempJopsData}
          subName={isArabicprop ? "الوظائف" : "Jobs"}
          name={isArabicprop ? "الوظائف" : "Jobs"}
          ti={isArabicprop ? "الوظيفة" : "Job"}
        />
      </div>

      {/*  */}
      {/*  */}
      {/* Tabel */}
      {/*  */}
      {/*  */}
      <div className=" w-full font-sans my-4">
        <table className=" min-w-full text-sm md:text-base">
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
              <th className=" col-span-7 md:col-span-8 text-start">
                {isArabicprop ? "الوظيفة" : " Job"}
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
