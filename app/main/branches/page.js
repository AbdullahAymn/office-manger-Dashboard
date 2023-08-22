"use client";
import { isArabic } from "@/utils/langStore";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { branchData } from "./tempData";
import Delete from "../../components/popup/delete";
import NameAndSearch from "@/app/components/NameAndSearch";
import Popup from "reactjs-popup";
import Edit from "./popups/edit";
import AddPopUp from "@/app/main/branches/popups/AddPoupUp";

export default function branches() {
  const isArabicprop = useContext(isArabic).arabic;
  //
  //
  // top section
  //
  //
  const [openAdd, setOpenAdd] = useState(false);

  const toggleAdd = () => {
    setOpenAdd(!openAdd);
  };

  //
  //search
  //

  const [getData, setGetData] = useState(branchData);
  const [slice, setSlice] = useState([]);

  const get = (slice) => {
    setSlice(slice);
  };

  const searched = (searchRes) => {
    setGetData(searchRes);
  };

  const restSearch = () => {
    setGetData(branchData);
  };

  //
  //Table
  //

  const [openDelte, setOpenDelete] = useState(false);
  const closeDelete = () => {
    setOpenDelete(!openDelte);
  };

  const [deltedBranch, setDeletedBranch] = useState();

  const deleteFun = (branch) => {
    setDeletedBranch(branch.name);
    setOpenDelete(!openDelte);
  };

  const [editedbranch, setEditedBranch] = useState();
  const [editedbranchEn, setEditedBranchEn] = useState();
  const [editedbranchManger, setEditedBranchManger] = useState();
  const [openEdit, setOpenEdit] = useState(false);
  const closeEdit = () => {
    setOpenEdit(!openEdit);
  };

  const editFun = (branch) => {
    setEditedBranch(branch.nameAr);
    setEditedBranchEn(branch.nameEn);
    setEditedBranchManger(branch.manger);
    setOpenEdit(!openEdit);
  };

  const branchesData = slice.map((e) => (
    <tr key={e.id} className="grid grid-cols-7 p-2">
      <td className=" col-span-3 text-start text-sky-800">
        <Link href={`/main/branches/${e.id}`}>
          {isArabicprop ? `${e.nameAr}` : `${e.nameEn}`}
        </Link>{" "}
      </td>
      <td className=" col-span-3 text-start">{e.manger}</td>
      {/* <td className=" col-span-1 text-center">{e.employee}</td>
      <td className=" col-span-1 text-center">{e.mangements}</td> */}
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
    <div className=" w-full overflow-x-hidden">
      <NameAndSearch
        searchRes={searched}
        reset={restSearch}
        addFun={toggleAdd}
        getSlice={get}
        data={getData}
        dataForSearch={branchData}
        subName={isArabicprop ? "الفروع" : "Branches"}
        name={isArabicprop ? "الفروع" : "Branches"}
        ti={isArabicprop ? "الفرع" : "Branch"}
      />

      {/*  */}
      {/*  */}
      {/* Table */}
      {/*  */}
      {/*  */}
      <div className=" w-full overflow-x-scroll md:overflow-x-hidden font-sans my-4">
        <table className=" text-sm md:text-base min-w-full w-150 md:max-w-full overflow-x-scroll">
          <Popup open={openDelte} closeOnDocumentClick>
            <Delete close={closeDelete} branch={deltedBranch} />
          </Popup>
          <Popup open={openEdit}>
            <Edit
              branch={editedbranch}
              branchEn={editedbranchEn}
              manger={editedbranchManger}
              close={closeEdit}
            />
          </Popup>
          <thead>
            <tr className=" grid grid-cols-7 bg-white p-2 border text-black/70">
              <th className=" col-span-3 text-start">
                {isArabicprop ? "الفرع" : " Branch"}
              </th>
              <th className=" col-span-3 text-start">
                {isArabicprop ? "المدير" : " Manger"}
              </th>
              {/* <th className=" col-span-1 ">
                {isArabicprop ? "الموظفون" : " Employees"}
              </th>
              <th className=" col-span-1 ">
                {isArabicprop ? "الإدارات" : " Mangements"}
              </th> */}
              <th className=" col-span-1 ">
                {isArabicprop ? "العمليات" : " Actions"}
              </th>
            </tr>
          </thead>
          <tbody>{branchesData}</tbody>
        </table>
      </div>
      <Popup open={openAdd}>
        <AddPopUp close={toggleAdd} />
      </Popup>
    </div>
  );
}
