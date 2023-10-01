"use client";
import { isArabic } from "@/utils/langStore";
import React, { useContext, useEffect, useState } from "react";
import TopSec from "./components/TopSec";
import Popup from "reactjs-popup";
import Delete from "@/app/components/popup/delete";
import PopUpCopm from "./components/PopUp";
import Loader from "@/app/components/Loader";
import Cookies from "js-cookie";

export default function page() {
  const isArabicprop = useContext(isArabic).arabic;
  const [loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState(false);
  //
  // get Data
  //
  const [holidaysData, setHolidaysData] = useState([]);
  const [jobsDataforserch, setJobsDatasforserch] = useState([]);
  const token = Cookies.get("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}\n`);
  useEffect(() => {
    setLoader(true);
    if (!token) {
      window.location.reload();
    }
    fetch(
      `https://backend2.dasta.store/api/auth/basicInfoFetchoficiallHoliday`,
      {
        method: "GET",
        headers: myHeaders,
      }
    ).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setHolidaysData(data);
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
    setHolidaysData(searchRes);
  };

  const restSearch = () => {
    setHolidaysData(jobsDataforserch);
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

  const tabelData = slice.map((e) => {
    const from = new Date(e.fromday);
    const to = new Date(e.today);
    const toDay = new Date();

    let statue;

    if (from > toDay) {
      statue = 1;
    } else if (toDay > from) {
      if (to > toDay) {
        statue = 2;
      } else if (
        toDay.toLocaleDateString("en-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }) ==
        to.toLocaleDateString("en-GB", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
      ) {
        statue = 2;
      } else if (toDay > to) {
        statue = 3;
      }
    } else if (
      toDay.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }) ==
      from.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    ) {
      statue = 2;
    }

    return (
      <tr key={e.name} className="grid grid-cols-12 p-2">
        <td className=" col-span-3 text-start">
          {isArabicprop ? e.name : e.name_en}
        </td>
        <td className=" col-span-3 md:col-span-3 text-start">{e.fromday}</td>
        <td className=" col-span-3 md:col-span-3 text-start">{e.today}</td>
        <td className=" col-span-2 md:col-span-2 text-center">
          {statue === 1 && (
            <div className=" text-center">
              <h4 className=" mx-auto w-fit px-2 text-center text-white  bg-orange-300 rounded-md">
                {isArabicprop ? "قادمة" : "Comming"}
              </h4>
            </div>
          )}
          {statue === 2 && (
            <div className=" text-center">
              <h4 className=" mx-auto w-fit px-2 text-center text-white  bg-green-600 rounded-md">
                {isArabicprop ? "حالية" : "Active"}
              </h4>
            </div>
          )}
          {statue === 3 && (
            <div className=" text-center">
              <h4 className=" mx-auto w-fit px-2 text-center text-white  bg-red-600 rounded-md">
                {isArabicprop ? "أنتهت" : "Ends"}
              </h4>
            </div>
          )}
        </td>
        <td className=" col-span-1 text-center text-black/70">
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
    );
  });
  return (
    <div className=" font-sans overflow-x-hidden">
      <Popup open={loader}>
        <Loader />
      </Popup>
      {/*  */}
      {/* Top sec */}
      {/*  */}
      <div>
        <Popup open={openAdd}>
          <PopUpCopm refresh={toggelOpenAddresfresh} close={toggelOpenAdd} />
        </Popup>
        <TopSec
          searchRes={searched}
          reset={restSearch}
          getSlice={get}
          addFun={toggelOpenAdd}
          data={holidaysData}
          dataForSearch={jobsDataforserch}
          subName={isArabicprop ? "العطلات " : " Holidays"}
          name={isArabicprop ? "العطلات " : " Holidays"}
          ti={isArabicprop ? "العطلة" : "Holiday"}
        />
      </div>
      {/*  */}
      {/*  */}
      {/* Tabel */}
      {/*  */}
      {/*  */}
      <div className=" w-full overflow-x-scroll md:overflow-x-hidden font-sans my-4">
        <table className=" min-w-full text-sm md:text-base w-150 md:w-full font-sans">
          {/*  */}
          {/* popUps */}
          {/*  */}

          {/* delete */}
          <Popup open={openDelet}>
            <Delete
              refresh={closrefresh}
              close={closeDeleteHandeller}
              link={"basicInfoDeleteoficiallHoliday"}
              element={deleteditem}
            />
          </Popup>

          {/* Edit */}
          <Popup open={openEdit}>
            <PopUpCopm
              element={editedItem}
              edit={true}
              refresh={closeEditRefresh}
              close={closeEditHandeller}
            />
          </Popup>

          {/* tabelBody */}
          <thead>
            <tr className=" grid grid-cols-12 bg-white p-2 border text-black/70">
              <th className=" col-span-3 text-start">
                {isArabicprop ? "العطلة" : "Holiday"}
              </th>
              <th className=" col-span-3 md:col-span-3 text-start">
                {isArabicprop ? "من" : "From"}
              </th>
              <th className=" col-span-3 md:col-span-3 text-start">
                {isArabicprop ? "إلى" : "to"}
              </th>
              <th className=" col-span-2 md:col-span-2 text-center">
                {isArabicprop ? "الحالة" : "status"}
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
  );
}
