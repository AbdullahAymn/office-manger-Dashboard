"use client";
import { isArabic } from "@/utils/langStore";
import { Switch } from "@mui/material";
import Cookies from "js-cookie";

import React, { useContext, useState } from "react";

export default function PopUpCom(props) {
  const isArabicprop = useContext(isArabic).arabic;
  const [load, setLoader] = useState(false);
  // const [openShift, setOpenShift] = useState(props.openShift);

  const element = props.element || {
    name: null,
    name_en: null,
    next_day: null,
  };

  // console.log(!!element.next_day)

  const [name, setName] = useState(element.name);
  const [nameEn, setNameEn] = useState(element.name_en);
  const [end, setEnd] = useState(element.next_day);
  const [nextDayShift, setNextDayShift] = useState(!!element.next_day);

  const myHeaders = new Headers();
  const token = Cookies.get("token");
  myHeaders.append("Authorization", `Bearer ${token}`);
  const formdata = new FormData();
  formdata.append("name", name);
  formdata.append("name_en", nameEn);
  formdata.append("open_shift", "no");
  {nextDayShift && formdata.append("next_day", end);}
  formdata.append("type_shift", "العادي");

  const addHandeller = () => {
    setLoader(true);
    fetch(`https://backend2.dasta.store/api/auth/basicInfoAddshift`, {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    }).then((res) => {
      if (res.status === 200) {
        props.refresh();
      }
    });
  };

  //
  // Edit
  //

  const editHandeller = () => {
    setLoader(true);
    fetch(
      `https://backend2.dasta.store/api/auth/basicInfoUpdateshift/${element.id}`,
      {
        method: "POST",
        headers: myHeaders,
        body: formdata,
      }
    ).then((res) => {
      if (res.status === 200) {
        props.refresh();
      }
    });
  };

  return (
    <div className=" h-screen w-full flex items-center justify-center">
      <div className=" font-sans rounded-md bg-white w-full  md:w-3/4 getin">
        <div className=" p-4 text-xl bg-sky-400 rounded-t-md text-white text-center">
          <h1>
            {props.edit
              ? `${isArabicprop ? "تعديل" : "Edit"} ${
                  isArabicprop ? element.name : element.name_en
                }`
              : `${isArabicprop ? "اضافة" : "Add"}`}
          </h1>
        </div>
        <div className=" mb-4">
          <div className=" w-full p-2 grid grid-cols-6 md:grid-cols-12">
            <div className=" col-span-6 mx-4">
              <h4>{isArabicprop ? "الأسم العربي" : "Name in Arabic"}</h4>
              <input
                className=" w-full outline-none border-1 p-1"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
              ></input>
            </div>
            <div className=" col-span-6 mx-4">
              <h4>{isArabicprop ? "الأسم الانجليزي" : "Name in English"}</h4>
              <input
                className=" w-full outline-none border-1 p-1"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                type="text"
              ></input>
            </div>
          </div>
          {/* <div className=" mb-4 p-2 w-full text-sm flex items-start justify-center">
            <div className=" w-full">
              <h1>{isArabicprop ? "دوام مفتوح " : "Open Shift"} :</h1>
              <Switch
                checked={openShift}
                onChange={(e) => setOpenShift(e.target.checked)}
              />
            </div> */}
          <div className=" mb-4 p-8 w-full text-sm flex items-start justify-center">
            <div className=" w-fit">
              <h1>
                {isArabicprop
                  ? "الدوام ينتهي اليوم التالي"
                  : "Shift Ends Next Day"}{" "}
                :
              </h1>

              <Switch
                checked={nextDayShift}
                onChange={(e) => setNextDayShift(e.target.checked)}
              />
              {nextDayShift && (
                <div className=" flex items-center justify-center">
                  <h1>
                    {isArabicprop ? " وقت إنتهاء اليوم " : "Day End Time"} :
                  </h1>
                  <input
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                    className=" outline-none p-2 border rounded-md"
                    type="time"
                  ></input>
                </div>
              )}
            </div>
          </div>
          {/* </div> */}
          {/* <div className=" flex items-center justify-center col-span-6 mx-4 ">
            <h4>{isArabicprop ? "وقت إنتهاء اليوم" : "Day End Time"}</h4>
            <input
              className=" outline-none mx-4 border-1 p-1"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              type="time"
            ></input>
          </div> */}
        </div>
        <div className=" flex items-center justify-center text-center">
          {props.edit ? (
            <button
              disabled={load || !name || !nameEn}
              onClick={editHandeller}
              className=" disabled:opacity-50 bg-sky-400 py-1 mx-4 px-8 text-white rounded-full mb-4 outline-none border-none "
            >
              {load ? "loading....." : `${isArabicprop ? "تعديل" : "Edit"}`}
            </button>
          ) : (
            <button
              disabled={load || !name || !nameEn}
              onClick={addHandeller}
              className=" disabled:opacity-50 bg-sky-400 py-1 mx-4 px-8 text-white rounded-full mb-4 outline-none border-none "
            >
              {load ? "loading....." : `${isArabicprop ? "إضافة" : "Add"}`}
            </button>
          )}

          <button
            onClick={props.close}
            className=" bg-gray-300 py-1 mx-4 px-8 text-black rounded-full mb-4"
          >
            {isArabicprop ? "إلغاء" : "Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
}
