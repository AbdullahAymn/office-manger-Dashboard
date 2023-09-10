"use client";
import { isArabic } from "@/utils/langStore";
import React, { useContext, useEffect, useState } from "react";
import NameAndSearch from "@/app/components/NameAndSearch";
import Popup from "reactjs-popup";
import Delete from "@/app/components/popup/delete";
import PopUpCom from "./components/PopUp";
import Loader from "@/app/components/Loader";
import Cookies from "js-cookie";
import Link from "next/link";

export default function WorkingTime() {
  const isArabicprop = useContext(isArabic).arabic;
  const [loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState(false);
  //
  //
  // get Data
  //
  //

  const [workingData, setWorkingData] = useState([]);
  const [jobsDataforserch, setJobsDatasforserch] = useState([]);
  const token = Cookies.get("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}\n`);

  useEffect(() => {
    setLoader(true);
    fetch(`https://backend2.dasta.store/api/auth/basicInfoFetchshift`, {
      method: "GET",
      headers: myHeaders,
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setWorkingData(data);
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
    setWorkingData(searchRes);
  };

  const restSearch = () => {
    setWorkingData(jobsDataforserch);
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
  const [deleteditem, setdeletedItem] = useState("");

  const openDeleteHandeller = (e) => {
    setdeletedItem(e);
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
    <tr key={e.id} className="grid grid-cols-7 p-2">
      <td className=" col-span-3 text-start text-sky-800">
        <Link href={`/main/workingtime/${e.id}`}>{isArabicprop ? e.name : e.name_en}</Link>
      </td>

      <td className=" col-span-3 text-start">{e.next_day}</td>
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
          <PopUpCom refresh={toggelOpenAddresfresh} close={toggelOpenAdd} />
        </Popup>

        {/* the Body */}
        <NameAndSearch
          getSlice={getSlice}
          searchRes={searched}
          reset={restSearch}
          addFun={toggelOpenAdd}
          data={workingData}
          dataForSearch={jobsDataforserch}
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
          <Delete
            refresh={closrefresh}
            close={closeDeleteHandeller}
            link={"basicInfoDeleteshift"}
            element={deleteditem}
          />
        </Popup>

        {/* edit */}

        <Popup open={openEdit}>
          <PopUpCom
            edit={true}
            element={editedItem}
            close={closeEditHandeller}
            refresh={closeEditRefresh}
          />
        </Popup>

        {/*  */}
        {/* tabelBody */}
        {/*  */}
        <div className=" w-full font-sans my-4 overflow-x-scroll md:overflow-x-hidden">
          <table className=" text-sm md:text-base min-w-full w-150 md:w-full">
            <thead>
              <tr className=" grid grid-cols-7 bg-white p-2 border text-black/70">
                <th className=" col-span-3 text-start">
                  {isArabicprop ? "الإسم" : " Name"}
                </th>
                <th className=" col-span-3 text-start">
                  {isArabicprop ? "وقت إنتهاء اليوم" : " Day End Time"}
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
