"use client";
import NameAndSearch from "@/app/components/NameAndSearch";
import React, { useContext, useEffect, useState } from "react";
import { isArabic } from "@/utils/langStore";
import Delete from "@/app/components/popup/delete";
import Popup from "reactjs-popup";
import AddAndEdit from "@/app/components/popup/AddAndEdit";
import Cookies from "js-cookie";
import Loader from "@/app/components/Loader";

export default function jobs() {
  const isArabicprop = useContext(isArabic).arabic;
  const [loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState(false);
  //
  // get Data
  //

  const [jobsData, setJobsData] = useState([]);
  const [jobsDataforserch, setJobsDatasforserch] = useState([]);
  const token = Cookies.get("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}\n`);
  useEffect(() => {
    setLoader(true);
    if (!token) {
      window.location.reload();
    }
    fetch(`https://backend2.dasta.store/api/auth/basicInfoFetchjob`, {
      method: "GET",
      headers: myHeaders,
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setJobsData(data);
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
    setJobsData(searchRes);
  };

  const restSearch = () => {
    setJobsData(jobsDataforserch);
  };

  //
  //
  //popUps
  //
  //

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

  // trying to fix

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
            link={"basicInfoAddjob"}
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
          data={jobsData}
          dataForSearch={jobsDataforserch}
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
            <Delete
              refresh={closrefresh}
              close={closeDeleteHandeller}
              link={"basicInfoDeletejob"}
              element={deleteditem}
            />
          </Popup>

          {/* edit */}

          <Popup open={openEdit}>
            <AddAndEdit
              link="basicInfoUpdatejob"
              edit={true}
              element={editedItem}
              refresh={closeEditRefresh}
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
