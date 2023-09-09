"use client";
import { isArabic } from "@/utils/langStore";
import Cookies from "js-cookie";
import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function PopUpCopm(props) {
  const isArabicprop = useContext(isArabic).arabic;

  const element = props.element || {};

  const [name, setName] = useState(element.name);
  const [nameEn, setNameEn] = useState(element.name_en);
  const [from, setFrom] = useState(element.fromday);
  const [to, setTo] = useState(element.today);
  const [load, setLoad] = useState(false);

  const token = Cookies.get("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}\n`);

  const formdata = new FormData();
  formdata.append("name", name);
  formdata.append("name_en", nameEn);
  formdata.append("fromday", from);
  formdata.append("today", to);

  //
  // Add
  //

  const addHandller = () => {
    setLoad(true);
    if (from > to) {
      toast.error(
        setLoad(false)`${isArabicprop ? "خطأ في التاريخ" : "wrong With Dates"}`
      );
    } else {
      fetch(`https://backend2.dasta.store/api/auth/basicInfoAddoficiallHoliday`, {
        method: "POST",
        headers: myHeaders,
        body: formdata,
      }).then((res) => {
        if (res.status === 200) {
          props.refresh();
        }
      });
    }
  };

  //
  // Edit
  // 

  const editHandller = () => {
    setLoad(true);
    if (from > to) {
      toast.error(
        setLoad(false)`${isArabicprop ? "خطأ في التاريخ" : "wrong With Dates"}`
      );
    } else {
      fetch(`https://backend2.dasta.store/api/auth/basicInfoUpdateoficiallHoliday/${element.id}`, {
        method: "POST",
        headers: myHeaders,
        body: formdata,
      }).then((res) => {
        if (res.status === 200) {
          props.refresh();
        }
      });
    }
  };
  return (
    <div className=" h-screen w-full flex items-center justify-center">
      <ToastContainer position="bottom-center" theme="colored" />
      <div className=" font-sans rounded-md bg-white w-full  md:w-3/4 getin">
        <div className=" p-4 text-xl bg-sky-400 rounded-t-md text-white text-center">
          <h1>
            {props.edit
              ? `${isArabicprop ? "تعديل" : "Edit"} ${
                  isArabicprop ? name : nameEn
                }`
              : `${isArabicprop ? "اضافة" : "Add"}`}
          </h1>
        </div>
        <div className=" mx-auto w-full mb-4">
          <div className=" w-full p-2 grid grid-cols-3 md:grid-cols-6">
            <div className=" w-full p-2 col-span-3">
              <h4>{isArabicprop ? "الأسم العربي" : "Name in Arabic"}</h4>
              <input
                className=" w-full outline-none border-1 p-1"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
              ></input>
            </div>
            <div className=" w-full p-2 col-span-3">
              <h4>{isArabicprop ? "الأسم الانجليزي" : "Name in English"}</h4>
              <input
                className=" w-full outline-none border-1 p-1"
                value={nameEn}
                onChange={(e) => setNameEn(e.target.value)}
                type="text"
              ></input>
            </div>
            <div className=" w-full p-2 col-span-3">
              <h4>{isArabicprop ? "من " : "From"}</h4>
              <input
                className=" w-full outline-none border-1 p-1"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                type="date"
              ></input>
            </div>
            <div className=" w-full p-2 col-span-3">
              <h4>{isArabicprop ? "إلى " : "To"}</h4>
              <input
                className=" w-full outline-none border-1 p-1"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                type="date"
              ></input>
            </div>
          </div>
        </div>
        <div className=" flex items-center justify-center text-center">
          {props.edit ? (
            <button
              onClick={editHandller}
              disabled={!name || !nameEn || !from || !to || load}
              className=" disabled:opacity-50 bg-sky-400 py-1 mx-4 px-8 text-white rounded-full mb-4 outline-none border-none "
            >
              {load ? "loading...." : `${isArabicprop ? "تعديل" : "Edit"}`}
            </button>
          ) : (
            <button
              disabled={!name || !nameEn || !from || !to || load}
              onClick={addHandller}
              className=" disabled:opacity-50 bg-sky-400 py-1 mx-4 px-8 text-white rounded-full mb-4 outline-none border-none "
            >
              {load ? "loading...." : `${isArabicprop ? "إضافة" : "Add"}`}
            </button>
          )}
          <button
            onClick={props.close}
            className=" disabled:opacity-50 bg-gray-300 py-1 mx-4 px-8 text-black rounded-full mb-4"
          >
            {isArabicprop ? "إلغاء" : "Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
}
