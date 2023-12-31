"use client";
import { isArabic } from "@/utils/langStore";
import Cookies from "js-cookie";
import React, { useContext } from "react";
import { useState } from "react";

export default function AddAndEdit(props) {
  const isArabicprop = useContext(isArabic).arabic;
  const token = Cookies.get("token");
  const element = props.element || {};

  const [nameAr, setnameAr] = useState(element.name);
  const [nameEn, setnameEn] = useState(element.name_en);
  const [loading, setloading] = useState(false);

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  const formdata = new FormData();
  formdata.append("name_en", nameEn);
  formdata.append("name", nameAr);

  //
  //
  // Edit
  //
  //

  const editHandeller = () => {
    setloading(true);
    fetch(`https://backend2.dasta.store/api/auth/${props.link}/${element.id}`, {
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
  //
  // Add
  //
  //

  const addHandeller = () => {
    setloading(true);
    fetch(`https://backend2.dasta.store/api/auth/${props.link}`, {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    }).then((res) => {
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
        <div className=" grid grid-cols-6 md:grid-cols-12 items-center mb-4">
          <div className=" w-full col-span-6 p-2">
            <h4>{isArabicprop ? "الأسم العربي" : "Name in Arabic"}</h4>
            <input
              className=" w-full outline-none border-1 p-1"
              value={nameAr}
              onChange={(e) => setnameAr(e.target.value)}
              type="text"
            ></input>
          </div>
          <div className=" col-span-6 w-full p-2">
            <h4>{isArabicprop ? "الأسم الانجليزي" : "Name in English"}</h4>
            <input
              className=" w-full outline-none border-1 p-1"
              value={nameEn}
              onChange={(e) => setnameEn(e.target.value)}
              type="text"
            ></input>
          </div>
        </div>
        <div className=" flex items-center justify-center text-center">
          {props.edit ? (
            <button
              onClick={editHandeller}
              disabled={loading || !nameAr || !nameEn}
              className=" disabled:opacity-40 bg-sky-400 py-1 mx-4 px-8 text-white rounded-full mb-4 outline-none border-none "
            >
              {loading ? "Loading..." : `${isArabicprop ? "تعديل" : "Edit"}`}
            </button>
          ) : (
            <button
              onClick={addHandeller}
              disabled={loading || !nameAr || !nameEn}
              className=" disabled:opacity-40 bg-sky-400 py-1 mx-4 px-8 text-white rounded-full mb-4 outline-none border-none "
            >
              {loading ? "Loading..." : `${isArabicprop ? "إضافة" : "Add"}`}
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
