"use client";
import Loader from "@/app/components/Loader";
import Delete from "@/app/components/popup/delete";
import { isArabic } from "@/utils/langStore";
import { Switch } from "@mui/material";
import Cookies from "js-cookie";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import { useState } from "react";
import { useContext } from "react";
import Popup from "reactjs-popup";

export default function Id() {
  const isArabicprop = useContext(isArabic).arabic;
  const [loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const id = useParams().id;

  const [days, setDays] = useState([
    {
      name: "السبت",
      nameEn: "Saturday",
    },
    {
      name: "الأحد",
      nameEn: "Sunday",
    },
    {
      name: "الإثنين",
      nameEn: "Monday",
    },
    {
      name: "الثلاث",
      nameEn: "Tuesday",
    },
    {
      name: "الأربع",
      nameEn: "Wednesday",
    },
    {
      name: "الخميس",
      nameEn: "Thursday",
    },
    {
      name: "الجمعة",
      nameEn: "Friday",
    },
    {
      name: "",
      nameEn: "",
    },
  ]);

  //
  // Fetching
  //

  const [showDays, setShowDays] = useState([]);
  const token = Cookies.get("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}\n`);
  useEffect(() => {
    setLoader(true);
    fetch(
      `https://backend2.dasta.store/api/auth/basicInfoFetchchangeDay/${id}`,
      {
        method: "GET",
        headers: myHeaders,
      }
    ).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setShowDays(data);
        });
        setLoader(false);
      }
    });
  }, [refresh]);

  //
  // Add Day
  //

  const [add, setAdd] = useState(false);
  const [hours, setHours] = useState("");
  const [work, setWork] = useState(true);

  const formdata = new FormData();
  formdata.append("total_hours_in_one_day", work ? hours :'');
  formdata.append("name_en", days[showDays.length].nameEn);
  formdata.append("name", days[showDays.length].name);
  formdata.append("id_shift_chnge", id);
  formdata.append("type", work ? "عمل" : "عطلة");

  const addHandeller = () => {
    setLoader(true);
    fetch(`https://backend2.dasta.store/api/auth/basicInfoAddchangeDay`, {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    }).then((res) => {
      if (res.status === 200) {
        setLoader(false);
        setAdd(false);
        setRefresh(!refresh);
      }
    });
  };

  //
  //
  // Maping
  //
  //

  const tabelData = showDays.map((e, index) => (
    <tr key={index}>
      <td className=" text-start p-2">{isArabicprop ? e.name : e.name_en}</td>
      <td className=" text-start p-2">{e.total_hours_in_one_day}</td>
      <td className=" text-start p-2">{e.type}</td>
      <td className=" text-end p-2">
        <i
          onClick={() => openDeleteHandeller(e)}
          className="fa-solid fa-trash mx-1 md:mx-4 hover:cursor-pointer hover:text-red-600"
        ></i>
      </td>
    </tr>
  ));

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
  return (
    <div className=" font-sans">
      <Popup open={loader}>
        <Loader />
      </Popup>
      <div className=" flex items-center justify-between p-4">
        <h1 className="  text-xl mb-3 md:text-3xl">
          {isArabicprop ? "أيام الاسبوع" : "Days"}
        </h1>
        <button
          disabled={showDays.length == 7}
          onClick={() => setAdd(!add)}
          className=" disabled:opacity-50 bg-sky-400 text-white py-1 px-10 rounded-full md:mx-2 text-md"
        >
          {isArabicprop ? "أضافة يوم" : "Add Day"}
        </button>
      </div>
      {add && (
        <div className=" text-center md:flex items-center justify-between p-3 rounded-lg border-1  font-sans">
          <div className=" flex items-center justify-center md:justify-start ">
            <h1>{isArabicprop ? "اليوم :" : "Day :"}</h1>
            <h1 className=" mx-2 font-bold">
              {isArabicprop
                ? days[showDays.length].name
                : days[showDays.length].nameEn}
            </h1>
          </div>
          <div className=" flex items-center justify-center md:justify-start ">
            <h1>{isArabicprop ? "عمل :" : "Work :"}</h1>
            <Switch
              checked={work}
              onChange={(e) => setWork(e.target.checked)}
            />
          </div>
          <div className=" flex items-center justify-center md:justify-start ">
            <h1>{isArabicprop ? "عدد ساعات العمل :" : "Total Hours :"}</h1>
            <input
              disabled={!work}
              type="number"
              className=" outline-none p-2 border mx-3"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
            />
          </div>
          <div className=" flex items-center justify-center md:justify-start ">
            <button
              onClick={addHandeller}
              className=" disabled:opacity-50 bg-sky-400 text-white py-1 px-10 rounded-full md:mx-2 text-md"
            >
              {isArabicprop ? "أضافة" : "Add"}
            </button>
          </div>
        </div>
      )}

      <div>
        <Popup open={openDelet}>
          <Delete
            refresh={closrefresh}
            close={closeDeleteHandeller}
            link={"basicInfoDeletechangeDay"}
            element={deleteditem}
          />
        </Popup>
        <table className=" my-8 table-auto text-sm md:text-base min-w-full md:w-full">
          <thead>
            <tr className=" bg-white p-2 border text-black/70">
              <th className=" text-start p-2">
                {isArabicprop ? "اليوم" : " Day"}
              </th>
              <th className=" text-start p-2">
                {isArabicprop ? "اجمالي الساعات" : "Total Hours"}
              </th>
              <th className=" text-start p-2">
                {isArabicprop ? "الحالة" : "Status"}
              </th>
              <th className=" text-end p-2">
                {isArabicprop ? "حذف" : "Delete"}
              </th>
            </tr>
          </thead>
          <tbody>{tabelData}</tbody>
        </table>
      </div>
    </div>
  );
}
