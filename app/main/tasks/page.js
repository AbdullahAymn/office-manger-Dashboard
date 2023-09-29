"use client";

import React, { useContext, useState } from "react";
import { isArabic } from "@/utils/langStore";
import Popup from "reactjs-popup";
import Delete from "@/app/components/popup/delete";

import Loader from "@/app/components/Loader";
import Cookies from "js-cookie";
import { useEffect } from "react";
import PopUp from "./components/PopUp";
import { Link } from "@mui/material";
import Paginate from "@/app/components/Paginate";

export default function Tasks() {
  const isArabicprop = useContext(isArabic).arabic;
  const [loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState(false);
  //
  //
  // get Data
  //
  //

  const [tasksData, setTasksData] = useState([]);
  const [jobsDataforserch, setJobsDatasforserch] = useState([]);
  const token = Cookies.get("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}\n`);
  useEffect(() => {
    setLoader(true);
    fetch(`https://backend2.dasta.store/api/auth/basicInfoFetchtask`, {
      method: "GET",
      headers: myHeaders,
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setTasksData(data);
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

  // const searched = (searchRes) => {
  //   setTasksData(searchRes);
  // };

  // const restSearch = () => {
  //   setTasksData(jobsDataforserch);
  // };

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
  const tabelData = slice.map((e, index) => (
    <tr key={index} className="grid grid-cols-12 p-2">
      <td className=" col-span-1 md:col-span-1 text-start">{e.codeEmployee}</td>
      <td className=" col-span-3 md:col-span-3 text-start">{e.nameEmployee}</td>
      <td className=" col-span-2 md:col-span-2 text-start">{e.fromday}</td>
      <td className=" col-span-2 md:col-span-2 text-start">{e.today}</td>
      <td className=" col-span-3 md:col-span-3 text-start">{e.comment}</td>
      <td className=" col-span-2 md:col-span-1 text-center text-black/70">
        <i
          onClick={() => openDeleteHandeller(e)}
          className="fa-solid fa-trash mx-1 hover:cursor-pointer hover:text-red-600"
        ></i>
        <i
          onClick={() => openEditHandeller(e)}
          className="fa-solid fa-pen-to-square mx-1 md:mx-4 hover:cursor-pointer hover:text-sky-600"
        ></i>
      </td>
    </tr>
  ));

  const [showsearch, setShowSearch] = useState(true);

  //search

  const [code, setCode] = useState("");
  const [name, setName] = useState("");

  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const resetHandeller = () => {
    setCode("");
    setName("");

    setFrom("");
    setTo("");

    setTasksData(jobsDataforserch);
  };

  const searchHandeller = (e) => {
    e.preventDefault();
    let searched = jobsDataforserch;
    if (code) {
      searched = searched.filter((e) => e.codeEmployee == code.trim());
    }
    if (name) {
      searched = searched.filter((e) => e.nameEmployee.includes(name.trim()));
    }
    if (from) {
      searched = searched.filter((e) => e.fromday === from);
    }
    if (to) {
      searched = searched.filter((e) => e.today === to);
    }

    setTasksData(searched);
  };

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
          {/* <AddAndEdit
            link={"basicInfoAddtask"}
            refresh={toggelOpenAddresfresh}
            close={toggelOpenAdd}
          /> */}
          <PopUp refresh={toggelOpenAddresfresh} close={toggelOpenAdd} />
        </Popup>

        {/* the Body */}
        {/* <NameAndSearch
          getSlice={getSlice}
          searchRes={searched}
          reset={restSearch}
          addFun={toggelOpenAdd}
          data={tasksData}
          dataForSearch={jobsDataforserch}
          name={isArabicprop ? "المهام" : "Tasks"}
          subName={isArabicprop ? "المهام" : "Tasks"}
          ti={isArabicprop ? "المهمة" : "Task"}
        /> */}

        {/* Top sec */}
        <div className=" font-sans overflow-x-hidden">
          <div className=" md:p-4 w-full font-sans flex items-center justify-between">
            <div>
              <h1 className=" text-xl mb-3 md:text-3xl">
                {isArabicprop ? "المهام" : "Tasks"}
              </h1>
              <h1 className=" font-light flex">
                <Link href="/main">
                  <h1 className=" font-normal text-black hover:underline">
                    {isArabicprop ? "الرئيسية" : "Main"}
                  </h1>
                </Link>{" "}
                / {isArabicprop ? "المهام" : "Tasks"}
              </h1>
            </div>
            <div className=" p-2 grid grid-cols-6 md:flex ">
              <button
                className=" bg-gray-200 col-span-6  py-1 px-6 rounded-full md:mx-2 text-md"
                onClick={() => setShowSearch(!showsearch)}
              >
                {showsearch
                  ? `${isArabicprop ? "إخفاء البحث" : "Hide search"}`
                  : `${isArabicprop ? "إظهار البحث" : "Show search"}`}{" "}
                <i
                  className={`fa-solid fa-caret-down  ${
                    showsearch && " rotate-180"
                  }`}
                ></i>
              </button>
              <button
                onClick={toggelOpenAdd}
                className=" col-span-6  bg-sky-400 text-white py-1 px-12 rounded-full md:mx-2 text-md"
              >
                {isArabicprop ? "إضافة" : "Add"}{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      {/*  */}
      {/* Search Section */}
      {/*  */}
      {/*  */}

      {showsearch && (
        <div className=" p-3  rounded-lg border-1  font-sans">
          <div className=" w-full relative">
            <i
              onClick={resetHandeller}
              className={`fa-solid fa-rotate-right hover:cursor-pointer absolute top-0 ${
                isArabicprop ? "left-0" : "right-0"
              }`}
            ></i>

            {/* the form */}
            <form onSubmit={searchHandeller}>
              <div className=" py-4 grid grid-cols-3 pb-12 md:grid-cols-12">
                <div className=" w-full col-span-3 px-4">
                  <h4>{isArabicprop ? "كود الموظف" : "Employee Code"}</h4>
                  <input
                    className=" p-2 border w-full outline-none "
                    type="text"
                    placeholder={isArabicprop ? "كود الموظف" : "Employee Code"}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
                <div className=" w-full col-span-3 px-4">
                  <h4>{isArabicprop ? "إسم الموظف" : "Employee Name"}</h4>
                  <input
                    className=" p-2 border w-full outline-none "
                    type="text"
                    placeholder={isArabicprop ? "إسم الموظف" : "Employee Name"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className=" w-full col-span-3 px-4">
                  <h4>{isArabicprop ? "من" : "From"}</h4>
                  <input
                    className=" p-2 border outline-none w-full "
                    type="date"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                  />
                </div>
                <div className=" w-full col-span-3 px-4">
                  <h4>{isArabicprop ? "إلى" : "To"}</h4>
                  <input
                    className=" p-2 border outline-none w-full "
                    type="date"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                  />
                </div>
              </div>
              <button
                className={` bg-sky-400 text-white mx-4 text-lg py-1 px-12 rounded-full hover:cursor-pointer absolute bottom-0 ${
                  isArabicprop ? "left-0" : "right-0"
                }`}
              >
                {isArabicprop ? "بحث" : "Search"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/*  */}
      {/* Paginate */}
      {/*  */}

      <div className=" w-full">
        <Paginate data={tasksData} getSlice={getSlice} />
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
            close={closeDeleteHandeller}
            refresh={closrefresh}
            link={"basicInfoDeletetask"}
            element={deleteditem}
          />
        </Popup>

        {/* edit */}

        <Popup open={openEdit}>
          {/* <AddAndEdit
            link="basicInfoUpdatetask"
            edit={true}
            element={editedItem}
            close={closeEditHandeller}
            refresh={closeEditRefresh}
          /> */}

          <PopUp
            edit={true}
            employee={editedItem}
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
              <tr className=" grid grid-cols-12 bg-white p-2 border text-black/70">
                <th className=" col-span-1 md:col-span-1 text-start">
                  {isArabicprop ? "الكود" : "code"}
                </th>
                <th className=" col-span-3 md:col-span-3 text-start">
                  {isArabicprop ? "الموظف" : "employee"}
                </th>
                <th className=" col-span-2 md:col-span-2 text-start">
                  {isArabicprop ? "من" : "from"}
                </th>
                <th className=" col-span-2 md:col-span-2 text-start">
                  {isArabicprop ? "الي" : "to"}
                </th>
                <th className=" col-span-3 md:col-span-3 text-start">
                  {isArabicprop ? "ملاحظات" : "comment"}
                </th>
                <th className=" col-span-1 md:col-span-1 text-center">
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
