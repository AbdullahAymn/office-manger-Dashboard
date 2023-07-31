"use client";
import React, { useContext, useState } from "react";
import { useParams } from "next/navigation";
import NameAndSearch from "@/app/components/NameAndSearch";
import { branchData, mangeData } from "../tempData";
import { isArabic } from "@/utils/langStore";
import Delete from "../../../components/popup/delete";
import Popup from "reactjs-popup";
import Edit from "../popups/edit";
import AddPopUp from "../popups/AddPoupUp";

export default function page() {
  const isArabicprop = useContext(isArabic).arabic;
  const id = useParams().name;
  const TopName = isArabicprop
    ? branchData.filter((e) => e.id === +id)[0].nameAr
    : branchData.filter((e) => e.id === +id)[0].nameEn;

  //
  //Add
  //

  const [openAdd, setOpenAdd] = useState(false);

  const toggleAdd = () => {
    setOpenAdd(!openAdd);
  };

  //
  //
  // Tabel
  //
  //

  //delete
  const [deleted, setDeleted] = useState();
  const [openDelete, setOpenDelete] = useState(false);

  const deleteFun = (e) => {
    setDeleted(e.name);
    setOpenDelete(!openDelete);
  };
  const closeDelete = () => {
    setOpenDelete(!openDelete);
  };

  //edit

  const [edit, setEdit] = useState();
  const [editEn, setEditEn] = useState();
  const [editManger, setEditManger] = useState();
  const [openEdit, setOpenEdit] = useState(false);

  const editFun = (e) => {
    setEdit(e.nameAr);
    setEditEn(e.nameEn);
    setEditManger(e.manger);
    setOpenEdit(!openEdit);
  };

  const closeEdit = () => {
    setOpenEdit(!openEdit);
  };

  //search

  const [getData, setGetData] = useState(mangeData);
  const [slice, setSlice] = useState([]);

  const get = (slice) => {
    setSlice(slice);
  };
  const searched = (searchRes) => {
    setGetData(searchRes);
  };
  const restSearch = () => {
    setGetData(mangeData);
  };

  //maping

  const mangesData = slice.map((e) => (
    <tr key={e.id} className="grid grid-cols-9 p-2">
      <td className=" col-span-3 text-start ">
        {isArabicprop ? e.nameAr : e.nameEn}
      </td>
      <td className=" col-span-3 text-start">{e.manger}</td>
      <td className=" col-span-1 text-center">{e.employees}</td>
      <td className=" col-span-1 text-center">{e.sections}</td>
      <td className=" col-span-1 text-center text-black/70">
        <i
          onClick={() => deleteFun(e)}
          className="fa-solid fa-trash mx-1 md:mx-4 hover:cursor-pointer hover:text-red-600"
        ></i>
        <i
          onClick={() => editFun(e)}
          className="fa-solid fa-pen-to-square mx-1 md:mx-4 hover:cursor-pointer hover:text-sky-600"
        ></i>
      </td>
    </tr>
  ));

  return (
    <div className=" overflow-x-hidden">
      <NameAndSearch
        searchRes={searched}
        reset={restSearch}
        getSlice={get}
        addFun={toggleAdd}
        dataForSearch={mangeData}
        data={getData}
        name={TopName}
        ti={isArabicprop ? "الإدارة" : "Mangement"}
        subName={`${isArabicprop ? "الفروع" : "Branches"} / ${TopName}`}
      />
      <Popup open={openAdd}>
        <AddPopUp close={toggleAdd} />
      </Popup>

      {/*  */}
      {/*  */}
      {/* Tabel */}
      {/*  */}
      {/*  */}

      <div className=" w-full font-sans my-4 overflow-x-scroll md:overflow-x-hidden">
        <table className=" min-w-full w-150 text-sm md:text-md md:w-full">
          <Popup open={openDelete}>
            <Delete branch={deleted} close={closeDelete} />
          </Popup>
          <Popup open={openEdit}>
            <Edit
              branch={edit}
              branchEn={editEn}
              manger={editManger}
              close={closeEdit}
            />
          </Popup>
          <thead>
            <tr className=" grid grid-cols-9 bg-white p-2 border text-black/70">
              <th className=" col-span-3 text-start">
                {isArabicprop ? "الإدارة" : "Mangement"}
              </th>
              <th className=" col-span-3 text-start">
                {isArabicprop ? "المدير" : " Manger"}
              </th>
              <th className=" col-span-1 ">
                {isArabicprop ? "الموظفون" : " Employees"}
              </th>
              <th className=" col-span-1 ">
                {isArabicprop ? "الافسام" : " sections"}
              </th>
              <th className=" col-span-1 ">
                {isArabicprop ? "العمليات" : " Actions"}
              </th>
            </tr>
          </thead>
          <tbody>{mangesData}</tbody>
        </table>
      </div>
    </div>
  );
}
