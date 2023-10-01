"use client";
import Paginate from "@/app/components/Paginate";
import { isArabic } from "@/utils/langStore";
import { MenuItem, Select } from "@mui/material";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import Popup from "reactjs-popup";
import Delete from "@/app/components/popup/delete";
import PopUp from "./components/PopUp";
import useOptions from "@/utils/useOptions";
import { options } from "@/utils/optionStore";
import Loader from "@/app/components/Loader";
import Cookies from "js-cookie";

export default function AddVacation() {
  const isArabicprop = useContext(isArabic).arabic;
  const [loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const refrshopt = useContext(options).refresh;
  const setrefrshopt = useContext(options).setRefresh;
  useEffect(() => {
    setrefrshopt(!refrshopt);
  }, []);

  const [showsearch, setShowSearch] = useState(true);

  //getData
  const [showData, setShowData] = useState([]);
  const [jobsDataforserch, setJobsDatasforserch] = useState([]);
  const token = Cookies.get("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}\n`);
  useEffect(() => {
    if (!token) {
      window.location.reload();
    }
    setLoader(true);
    fetch(`https://backend2.dasta.store/api/auth/fetchAllholiday`, {
      method: "GET",
      headers: myHeaders,
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setShowData(data);
          setJobsDatasforserch(data);
        });
        setLoader(false);
      }
    });
  }, [refresh]);

  //
  //
  //search
  //
  //
  const [types, setTypes] = useState([]);
  useEffect(() => {
    fetch(`https://backend2.dasta.store/api/auth/basicInfoFetchsortholiday`, {
      method: "GET",
      headers: myHeaders,
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setTypes(data);
        });
      }
    });
  }, []);

  const typeOptions = types.map((e, index) => (
    <option key={index} value={e.name}>
      {e.name}
    </option>
  ));

  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const resetHandeller = () => {
    setCode("");
    setName("");
    setType("");
    setFrom("");
    setTo("");

    setShowData(jobsDataforserch);
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
    if (type) {
      searched = searched.filter((e) => e.sortOfHoliday === type);
    }
    if (from) {
      searched = searched.filter((e) => e.fromDay === from);
    }
    if (to) {
      searched = searched.filter((e) => e.toDay === to);
    }

    setShowData(searched);
  };

  // Paginate
  const [slice, setSlice] = useState([]);
  const getSlice = (slice) => {
    setSlice(slice);
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

  const toggleDelet = () => {
    setOpenDelete(!openDelet);
  };
  const closrefresh = () => {
    setOpenDelete(!openDelet);
    setRefresh(!refresh);
  };

  //Add

  const [openAdd, setOpenAdd] = useState(false);
  const toggelAdd = () => {
    setOpenAdd(!openAdd);
  };
  const toggelOpenAddresfresh = () => {
    setOpenAdd(!openAdd);
    setRefresh(!refresh);
  };
  //Edit

  const [openEdit, setOpenEdit] = useState(false);
  const [employee, setEmployee] = useState({});

  const openEditHandeller = (e) => {
    setEmployee(e);
    setOpenEdit(!openEdit);
  };

  const closeEdit = () => {
    setOpenEdit(!openEdit);
  };

  const closeEditRefresh = () => {
    setOpenEdit(!openEdit);
    setRefresh(!refresh);
  };

  //
  //Maping
  //

  const tabelData = slice.map((e, index) => (
    <tr key={index} className=" grid-cols-12 bg-white p-2 border text-black/70">
      <td className=" p-2 col-span-1  text-start">{e.codeEmployee}</td>
      <td className=" col-span-2  text-start">{e.nameEmployee}</td>
      <td className=" col-span-1  text-start">{e.sortOfHoliday}</td>
      <td className=" col-span-1  text-center">{e.fromDay}</td>
      <td className=" col-span-1  text-center">{e.toDay}</td>
      <td className=" col-span-2  text-start">{e.comment}</td>
      <td className=" p-2 col-span-1  text-center flex items-center justify-center">
        {" "}
        <i
          onClick={() => openDeleteHandeller(e)}
          className="fa-solid fa-trash mx-1 md:mx-2 hover:cursor-pointer hover:text-red-600"
        ></i>
        <i
          onClick={() => openEditHandeller(e)}
          className="fa-solid fa-pen-to-square mx-1 md:mx-2 hover:cursor-pointer hover:text-sky-600"
        ></i>
      </td>
    </tr>
  ));
  return (
    <div>
      <div className=" font-sans overflow-x-hidden">
        <Popup open={loader}>
          <Loader />
        </Popup>
        {/*  */}
        {/* Top section */}
        {/*  */}
        <div className=" md:p-4 w-full font-sans flex items-center justify-between">
          <div>
            <h1 className=" text-xl mb-3 md:text-3xl">
              {isArabicprop ? "إضافة اجازة" : "Vacation"}
            </h1>
            <h1 className=" font-light flex">
              <Link href="/main">
                <h1 className=" font-normal hover:underline">
                  {isArabicprop ? "الرئيسية" : "Main"}
                </h1>
              </Link>{" "}
              / {isArabicprop ? "إضافة اجازة" : "Vacation"}
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
              onClick={toggelAdd}
              className=" col-span-6  bg-sky-400 text-white py-1 px-12 rounded-full md:mx-2 text-md"
            >
              {isArabicprop ? "إضافة" : "Add"}{" "}
            </button>
            <Popup open={openAdd}>
              <PopUp close={toggelAdd} refresh={toggelOpenAddresfresh} />
            </Popup>
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
                <div className=" py-4 grid grid-cols-3 pb-12 md:pb-0 md:grid-cols-12">
                  <div className=" w-full col-span-3 px-4">
                    <h4>{isArabicprop ? "كود الموظف" : "Employee Code"}</h4>
                    <input
                      className=" p-2 border w-full outline-none "
                      type="text"
                      placeholder={
                        isArabicprop ? "كود الموظف" : "Employee Code"
                      }
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                  </div>
                  <div className=" w-full col-span-3 px-4">
                    <h4>{isArabicprop ? "إسم الموظف" : "Employee Name"}</h4>
                    <input
                      className=" p-2 border w-full outline-none "
                      type="text"
                      placeholder={
                        isArabicprop ? "إسم الموظف" : "Employee Name"
                      }
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className=" w-full col-span-3 px-4">
                    <h4>{isArabicprop ? "نوع الأجازة" : "Vacation Type"}</h4>
                    <select
                      id="demo-simple-select"
                      className=" w-full p-2 border outline-none"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option selected hidden>
                        Choose one
                      </option>
                      {typeOptions}
                    </select>
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
          <Paginate data={showData} getSlice={getSlice} />
        </div>

        {/*  */}
        {/* Table */}
        {/*  */}
        <div className=" w-full font-sans my-4 overflow-x-scroll md:overflow-x-hidden">
          <Popup open={openDelet}>
            <Delete
              link={"deleteholiday"}
              element={deleteditem}
              close={toggleDelet}
              refresh={closrefresh}
            />
          </Popup>
          <Popup open={openEdit}>
            <PopUp
              edit={true}
              employee={employee}
              refresh={closeEditRefresh}
              close={closeEdit}
            />
          </Popup>
          <table className=" table-auto min-w-full w-200 md:w-full text-sm ">
            {/* tabelBody */}
            <thead>
              <tr className=" grid-cols-12 bg-white p-2 border text-black/70">
                <th className=" p-2 col-span-1  text-start">
                  {isArabicprop ? "الكود" : "Code"}
                </th>
                <th className=" col-span-2  text-start">
                  {isArabicprop ? "الإسم" : "Name"}
                </th>
                <th className=" col-span-1  text-start">
                  {isArabicprop ? "نوع الاجازة" : "Vacation Type"}
                </th>
                <th className=" col-span-1  text-cenetr">
                  {isArabicprop ? "من" : " From"}
                </th>
                <th className=" col-span-1 text-cenetr">
                  {isArabicprop ? "إالى" : "To"}
                </th>
                <th className=" col-span-2 text-start">
                  {isArabicprop ? "ملاحظات" : "Notes"}
                </th>
                <th className=" col-span-1 text-cenetr">
                  {isArabicprop ? "العمليات" : "Actions"}
                </th>
              </tr>
            </thead>

            <tbody className=" text-sm"> {tabelData} </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
