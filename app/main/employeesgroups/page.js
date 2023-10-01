"use client";
import NameAndSearch from "@/app/components/NameAndSearch";
import AddAndEdit from "@/app/components/popup/AddAndEdit";
import { isArabic } from "@/utils/langStore";
import React, { useContext, useEffect, useState } from "react";
import Popup from "reactjs-popup";
import Delete from "@/app/components/popup/delete";
import Loader from "@/app/components/Loader";
import Cookies from "js-cookie";

export default function page() {
  const isArabicprop = useContext(isArabic).arabic;
  const [loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState(false);
  //
  //
  // get Data
  //
  //

  const [groupsData, setGroupsData] = useState([]);
  const [jobsDataforserch, setJobsDatasforserch] = useState([]);
  const token = Cookies.get("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}\n`);
  useEffect(() => {
    setLoader(true);
    if (!token) {
      window.location.reload();
    }
    fetch(`https://backend2.dasta.store/api/auth/basicInfoFetchgroubEmployee`, {
      method: "GET",
      headers: myHeaders,
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setGroupsData(data);
          setJobsDatasforserch(data);
        });
        setLoader(false);
      }
    });
  }, [refresh]);
  const [slice, setSlice] = useState([]);

  const getSlice = (slice) => {
    setSlice(slice);
  };

  const searched = (searchRes) => {
    setGroupsData(searchRes);
  };

  const restSearch = () => {
    setGroupsData(jobsDataforserch);
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
  const toggelOpenAddresfresh = () => {
    setOpenAdd(!openAdd);
    setRefresh(!refresh);
  };

  //delete

  const [openDelet, setOpenDelete] = useState(false);
  const [deleteditemName, setdeletedItemName] = useState("");

  const openDeleteHandeller = (e) => {
    setdeletedItemName(e);
    setOpenDelete(!openDelet);
  };

  const closeDeleteHandeller = () => {
    setOpenDelete(!openDelet);
  };
  const closrefresh = () => {
    setOpenDelete(!openDelet);
    setRefresh(!refresh);
  };

  //edit
  const [openEdit, setOpenEdit] = useState(false);
  const [editedItem, setEditedItem] = useState("");
 

  const openEditHandeller = (e) => {
    setOpenEdit(!openEdit);
    setEditedItem(e);
  };

  const closeEditHandeller = () => {
    setOpenEdit(!openEdit);
  };

  const closeEditRefresh = () => {
    setOpenEdit(!openEdit);
    setRefresh(!refresh);
  };
  //
  //
  //Maping
  //
  //
  const tabelData = slice.map((e) => (
    <tr key={e.id} className="grid grid-cols-9 p-2">
      <td className=" col-span-7 md:col-span-8 text-start">
        {isArabicprop ? e.name : e.name_en}
      </td>
      {/* <td className=" col-span-3 md:col-span-2 text-start">
        {isArabicprop ? "الموظفون" : " Employees"}
      </td> */}
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
      <Popup open={loader}>
        <Loader />
      </Popup>
      {/*  */}
      {/*  */}
      {/* The top section */}
      {/*  */}
      {/*  */}
      <div>
        {/* Add PopUp */}
        <Popup open={openAdd}>
          <AddAndEdit
            link={"basicInfoAddgroubEmployee"}
            refresh={toggelOpenAddresfresh}
            close={toggelOpenAdd}
          />
        </Popup>

        {/* the Body */}
        <NameAndSearch
          getSlice={getSlice}
          searchRes={searched}
          reset={restSearch}
          addFun={toggelOpenAdd}
          data={groupsData}
          dataForSearch={jobsDataforserch}
          name={isArabicprop ? "المجموعات " : " Groups"}
          subName={isArabicprop ? "المجموعات " : " Groups"}
          ti={isArabicprop ? "المجموعة" : "group"}
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
          <Delete
            link={"basicInfoDeletegroubEmployee"}
            close={closeDeleteHandeller}
            refresh={closrefresh}
            element={deleteditemName}
          />
        </Popup>

        {/* edit */}

        <Popup open={openEdit}>
          <AddAndEdit
            link="basicInfoUpdategroubEmployee"
            edit={true}
            element={editedItem}
            close={closeEditHandeller}
            refresh={closeEditRefresh}
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
                  {isArabicprop ? "المجموعة" : " Group"}
                </th>
                {/* <th className=" col-span-3 md:col-span-2 text-start">
                  {isArabicprop ? "الموظفون" : " Employees"}
                </th> */}
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
