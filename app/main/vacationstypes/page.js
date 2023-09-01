"use client";
import NameAndSearch from "@/app/components/NameAndSearch";
import AddAndEdit from "@/app/components/popup/AddAndEdit";
import { isArabic } from "@/utils/langStore";
import React, { useContext, useEffect, useState } from "react";
import Popup from "reactjs-popup";
import Delete from "@/app/components/popup/delete";
import Cookies from "js-cookie";
import Loader from "@/app/components/Loader";

export default function page() {
  const isArabicprop = useContext(isArabic).arabic;
  const [loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState(false);
  //
  // get Data
  //
  const [vacationsData, setVacationsData] = useState([]);
  const [jobsDataforserch, setJobsDatasforserch] = useState([]);
  const token = Cookies.get("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}\n`);
  useEffect(() => {
    setLoader(true);
    fetch(`https://backend2.dasta.store/api/auth/basicInfoFetchsortholiday`, {
      method: "GET",
      headers: myHeaders,
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setVacationsData(data);
          setJobsDatasforserch(data);
        });
        setLoader(false);
      }
    });
  }, [refresh]);
  const [slice, setSlice] = useState([]);

  const get = (slice) => {
    setSlice(slice);
  };

  const searched = (searchRes) => {
    setVacationsData(searchRes);
  };

  const restSearch = () => {
    setVacationsData(jobsDataforserch);
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

  //Add

  const [openAdd, setOpenAdd] = useState(false);

  const toggelOpenAdd = () => {
    setOpenAdd(!openAdd);
  };

  const toggelOpenAddresfresh = () => {
    setOpenAdd(!openAdd);
    setRefresh(!refresh);
  };

  //
  //
  //maping
  //
  //

  const tabelData = slice.map((e) => (
    <tr key={e.id} className="grid grid-cols-9 p-2">
      <td className=" col-span-7 md:col-span-8 text-start">
        {isArabicprop ? e.name : e.name_en}
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
      <Popup open={loader}>
        <Loader />
      </Popup>
      {/*  */}
      {/* Top sec */}
      {/*  */}
      <div>
        {/* Add popUp */}
        <Popup open={openAdd}>
          <AddAndEdit
            link={"basicInfoAddsortholiday"}
            refresh={toggelOpenAddresfresh}
            close={toggelOpenAdd}
          />
        </Popup>
        {/* Body */}
        <NameAndSearch
          searchRes={searched}
          reset={restSearch}
          getSlice={get}
          addFun={toggelOpenAdd}
          data={vacationsData}
          dataForSearch={jobsDataforserch}
          subName={isArabicprop ? "  الأجازات" : "Vacations "}
          name={isArabicprop ? " الأجازات" : "Vacations "}
          ti={isArabicprop ? "الأجازة " : "Vacation"}
        />
      </div>
      {/*  */}
      {/*  */}
      {/* Tabel */}
      {/*  */}
      {/*  */}
      <div className=" w-full text-sm md:text-base font-sans my-4">
        <table className=" min-w-full">
          {/*  */}
          {/* popUps */}
          {/*  */}

          {/* delete */}
          <Popup open={openDelet}>
            <Delete
              link={"basicInfoDeletesortholiday"}
              refresh={closrefresh}
              close={closeDeleteHandeller}
              element={deleteditemName}
            />
          </Popup>

          {/* edit */}

          <Popup open={openEdit}>
            <AddAndEdit
              link="basicInfoUpdatesortholiday"
              edit={true}
              element={editedItem}
              close={closeEditHandeller}
              refresh={closeEditRefresh}
            />
          </Popup>

          {/* tabelBody */}
          <thead>
            <tr className=" grid grid-cols-9 bg-white p-2 border text-black/70">
              <th className=" col-span-7 md:col-span-8 text-start">
                {isArabicprop ? "الأجازة" : "Vacation"}
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
