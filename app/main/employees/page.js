"use client";
import React, { useContext, useEffect, useState } from "react";
import TopSec from "./components/TopSec";
import { isArabic } from "@/utils/langStore";
import Popup from "reactjs-popup";
import Delete from "@/app/components/popup/delete";
import Link from "next/link";
import Loader from "@/app/components/Loader";
import Cookies from "js-cookie";

export default function Employees() {
  //
  const isArabicprop = useContext(isArabic).arabic;
  const [loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState(false);

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

  //
  //Get Data
  //
  const [employeesData, setEmployeesData] = useState([]);
  const [jobsDataforserch, setJobsDatasforserch] = useState([]);
  const token = Cookies.get("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}\n`);
  useEffect(() => {
    setLoader(true);
    // if (!token) {
    //   window.location.reload();
    // }
    fetch(`https://backend2.dasta.store/api/auth/basicInfoFetchemployee`, {
      method: "GET",
      headers: myHeaders,
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setEmployeesData(data);
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
    setEmployeesData(searchRes);
  };

  const restSearch = () => {
    setEmployeesData(jobsDataforserch);
  };

  //
  //
  //Maping
  //
  //
  const tabelData = slice.map((e) => (
    <tr key={e.id} className="grid grid-cols-11 p-2">
      <td className=" col-span-2 text-start">{e.code}</td>
      <td className=" col-span-2 text-start">
        {isArabicprop ? e.name_ar : e.name_en}
      </td>
      <td className=" col-span-2 text-start">{e.id_branch}</td>
      <td className=" col-span-2 text-start">{e.id_shift}</td>
      <td className=" col-span-2 text-start">
        {e.activition === "true" ? (
          <h1 className=" font-bold text-white rounded-md text-center px-1 pb-1 w-10 bg-green-600">
            {isArabicprop ? " نعم" : "Yes "}
          </h1>
        ) : (
          <h1 className=" font-bold text-white rounded-md text-center px-1 pb-1 w-10 bg-red-600">
            {isArabicprop ? "لا " : "No "}
          </h1>
        )}
      </td>
      <td className=" col-span-1 text-center text-black/70">
        <i
          onClick={() => openDeleteHandeller(e)}
          className="fa-solid fa-trash mx-1 hover:cursor-pointer hover:text-red-600"
        ></i>
        <Link href={`/main/employees/${e.id}`}>
          <i className="fa-solid fa-pen-to-square mx-1 hover:cursor-pointer hover:text-sky-600"></i>
        </Link>
      </td>
    </tr>
  ));

  return (
    <div className=" overflow-x-hidden">
      <Popup open={loader}>
        <Loader />
      </Popup>
      {/*  */}
      {/*  */}
      {/* Top Section */}
      {/*  */}
      {/*  */}

      <TopSec
        getSlice={getSlice}
        searchRes={searched}
        reset={restSearch}
        data={employeesData}
        dataForSearch={jobsDataforserch}
        name={isArabicprop ? "الموظفون" : "Employees"}
        subName={isArabicprop ? "الموظفون" : "Employees"}
        ti={isArabicprop ? "المشروع" : "Project"}
      />

      {/*  */}
      {/*  */}
      {/* Tabel */}
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
            element={deleteditem}
            link="basicInfoDeleteemployee"
          />
        </Popup>
        {/*  */}
        {/* tabelBody */}
        {/*  */}

        <div className=" w-full text-sm overflow-x-scroll md:overflow-x-hidden md:text-base font-sans my-4">
          <table className=" min-w-full w-150 md:w-full">
            <thead>
              <tr className=" grid grid-cols-11 bg-white p-2 border text-black/70">
                <th className=" col-span-2 text-start">
                  {isArabicprop ? "الكود" : " Code"}
                </th>
                <th className=" col-span-2 text-start">
                  {isArabicprop ? "الإسم" : " Name"}
                </th>
                <th className=" col-span-2 text-start">
                  {isArabicprop ? "الفرع" : " Branch"}
                </th>
                <th className=" col-span-2 text-start">
                  {isArabicprop ? "الدوام" : "Shift "}
                </th>
                <th className=" col-span-2 text-start">
                  {isArabicprop ? "نشط" : " Active"}
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
