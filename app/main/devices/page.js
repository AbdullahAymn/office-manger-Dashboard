"use client";
import Paginate from "@/app/components/Paginate";
import Delete from "@/app/components/popup/delete";
import { isArabic } from "@/utils/langStore";
import { options } from "@/utils/optionStore";
import useOptions from "@/utils/useOptions";
import Link from "next/link";
import React from "react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import Popup from "reactjs-popup";
import PopUp from "./components/PopUp";
import Loader from "@/app/components/Loader";
import Cookies from "js-cookie";

export default function Devices() {
  const isArabicprop = useContext(isArabic).arabic;
  const [loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const refrshopt = useContext(options).refresh;
  const setrefrshopt = useContext(options).setRefresh;
  useEffect(() => {
    setrefrshopt(!refrshopt);
  }, []);

  const branchesOptions = useOptions(useContext(options).branch);

  const [getData, setGetData] = useState([]);
  const [jobsDataforserch, setJobsDatasforserch] = useState([]);
  const token = Cookies.get("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}\n`);
  useEffect(() => {
    setLoader(true);
    // if (!token) {
    //   window.location.reload();
    // }
    fetch(`https://backend2.dasta.store/api/auth/fetchDevices`, {
      method: "GET",
      headers: myHeaders,
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setGetData(data);
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

  //
  //
  //Search
  //
  //
  const [showsearch, setShowSearch] = useState(true);

  const [branch, setBranch] = useState("");
  const [name, setName] = useState("");
  const [serial, setSerial] = useState("");
  const [type, setType] = useState("");

  const searchHandeller = (e) => {
    e.preventDefault();
    let searched = jobsDataforserch;
    if (branch) {
      searched = searched.filter((e) => e.name_branch === branch);
    }
    if (name) {
      if (isArabicprop) {
        searched = searched.filter((e) => e.name.includes(name.trim()));
      } else {
        searched = searched.filter((e) => e.name_en.includes(name.trim()));
      }
    }
    if (serial) {
      searched = searched.filter((e) => e.serialNumber.includes(serial.trim()));
    }
    if (type) {
      searched = searched.filter((e) => e.sort_device === type);
    }

    setGetData(searched);
  };

  const resetHandeller = () => {
    setBranch("");
    setName("");
    setSerial("");
    setType("");

    setGetData(jobsDataforserch);
  };

  //
  //
  //PopUp
  //
  //

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

  //Edit
  const [openEdit, setOpenEdit] = useState(false);
  const [editElement, setEditElement] = useState({});

  const openEditHandeller = (e) => {
    setEditElement(e);
    setOpenEdit(!openEdit);
  };

  const closeEditHandeller = () => {
    setOpenEdit(!openEdit);
  };

  const closeEditRefresh = () => {
    setOpenEdit(!openEdit);
    setRefresh(!refresh);
  };

  //add
  const [openAdd, setOpenAdd] = useState(false);
  const toggleOpenAdd = () => {
    setOpenAdd(!openAdd);
  };
  const toggelOpenAddresfresh = () => {
    setOpenAdd(!openAdd);
    setRefresh(!refresh);
  };

  //
  //
  // Maping
  //
  //

  const tabelData = slice.map((e, index) => (
    <tr key={index}>
      <td className=" text-start p-2">{e.id}</td>
      <td className=" text-start p-2">{e.serialNumber}</td>
      <td className=" text-start p-2">{isArabicprop ? e.name : e.name_en}</td>
      <td className=" text-start p-2">{e.name_branch}</td>
      {/* <td className=" text-start p-2">{e.status}</td> */}
      <td className=" text-start p-2">{e.sort_device}</td>
      <td className=" text-center p-2 text-black/70">
        <i
          onClick={() => openDeleteHandeller(e)}
          className="fa-solid fa-trash mx-1 hover:cursor-pointer hover:text-red-600"
        ></i>

        <i
          onClick={() => openEditHandeller(e)}
          className="fa-solid fa-pen-to-square mx-1 hover:cursor-pointer hover:text-sky-600"
        ></i>
      </td>
    </tr>
  ));
  return (
    <div className=" w-full">
      <Popup open={loader}>
        <Loader />
      </Popup>
      {/*  */}
      {/*  */}
      {/* Label */}
      {/*  */}
      {/*  */}
      <div className=" md:p-4 w-full font-sans grid grid-cols-6 md:grid-cols-12 items-center ">
        <div className=" col-span-6">
          <h1 className=" text-xl md:mb-3 md:text-3xl">{`${
            isArabicprop ? `الأجهزة` : `Devices`
          }`}</h1>
          <h1 className=" font-light flex">
            <Link href="/main">
              <h1 className=" font-normal hover:underline">
                {isArabicprop ? "الرئيسية" : "Main"}
              </h1>
            </Link>{" "}
            / {`${isArabicprop ? `الأجهزة` : `Devices`}`}
          </h1>
        </div>
        <div className="flex col-span-6 justify-end mt-3 md:mt-0">
          <button
            className=" bg-gray-200  py-1 px-3 md:px-6 rounded-full mx-2 text-md"
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
            onClick={toggleOpenAdd}
            className="  bg-sky-400 text-white py-1 px-6 md:px-10 rounded-full md:mx-2 text-md"
          >
            {isArabicprop ? "إضافة" : "Add"}{" "}
          </button>
          <Popup open={openAdd}>
            <PopUp refresh={toggelOpenAddresfresh} close={toggleOpenAdd} />
          </Popup>
        </div>
      </div>

      {/* */}
      {/*  */}
      {/* Search */}
      {/*  */}
      {/*  */}
      {showsearch && (
        <div className=" relative w-full p-2 border rounded-md">
          <i
            onClick={resetHandeller}
            className={`fa-solid fa-rotate-right hover:cursor-pointer absolute top-2 ${
              isArabicprop ? " left-2" : " right-2"
            }`}
          ></i>
          <form onSubmit={searchHandeller}>
            <div className=" w-full p-2 pb-10  grid grid-cols-3 md:grid-cols-12">
              <div className=" col-span-3 md:mx-4">
                <h4>{isArabicprop ? "الفرع" : "Branch"}</h4>
                <select
                  className=" w-full p-2 border outline-none"
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                >
                  <option selected hidden>
                    Choose one
                  </option>
                  {branchesOptions}
                </select>
              </div>
              <div className=" col-span-3 md:mx-4">
                <h4>{isArabicprop ? "إسم الجهاز" : "Device Name"}</h4>
                <input
                  className=" w-full p-2 border outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder={isArabicprop ? "إسم الجهاز" : "Device Name"}
                />
              </div>
              <div className=" col-span-3 md:mx-4">
                <h4>{isArabicprop ? "الرقم التسلسلي" : "Device Serial"}</h4>
                <input
                  className=" w-full p-2 border outline-none"
                  value={serial}
                  onChange={(e) => setSerial(e.target.value)}
                  type="text"
                  placeholder={
                    isArabicprop ? "الرقم التسلسلي" : "Device Serial"
                  }
                />
              </div>
              <div className=" col-span-3 md:mx-4">
                <h4>{isArabicprop ? "نوع الجهاز" : "Device type"}</h4>
                <select
                  className=" w-full p-2 border outline-none"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option selected hidden>
                    Choose one
                  </option>
                  <option value="ZKTeco">ZKTeco</option>
                </select>
              </div>
            </div>
            <button
              className={`hover:cursor-pointer absolute bottom-2 bg-sky-400 text-white px-12 py-1 rounded-full ${
                isArabicprop ? " left-2" : " right-2"
              }`}
            >
              {isArabicprop ? "بحث" : "Search"}
            </button>
          </form>
        </div>
      )}

      <div className=" w-full">
        <Paginate data={getData} getSlice={getSlice} />
      </div>

      {/*  */}
      {/*  */}
      {/* Tabel */}
      {/*  */}
      {/*  */}
      <div className=" w-full text-sm overflow-auto md:text-base font-sans my-4">
        <Popup open={openDelet}>
          <Delete
            link={"deleteDevices"}
            close={closeDeleteHandeller}
            refresh={closrefresh}
            element={deleteditem}
          />
        </Popup>
        <Popup open={openEdit}>
          <PopUp
            edit={true}
            refresh={closeEditRefresh}
            element={editElement}
            close={closeEditHandeller}
          />
        </Popup>
        <table className=" table-auto min-w-full w-200 md:w-fit">
          <thead>
            <tr className="bg-white p-2 border text-black/70">
              <th className=" text-start p-2">
                {isArabicprop ? "رقم الجهاز" : "Device ID"}
              </th>
              <th className=" text-start p-2">
                {isArabicprop ? "الرقم التسلسلي" : "Device Serial"}
              </th>
              <th className=" text-start p-2">
                {isArabicprop ? "إسم الجهاز" : " Device Name"}
              </th>
              <th className=" text-start p-2">
                {isArabicprop ? "الفرع" : "Branch"}
              </th>
              {/* <th className=" text-start p-2">
                {isArabicprop ? "حالة الجهاز" : "Device Status"}
              </th> */}
              <th className=" text-start p-2">
                {isArabicprop ? "نوع الجهاز" : "Device Type"}
              </th>
              <th className=" text-center p-2">
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
