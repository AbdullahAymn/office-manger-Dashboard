"use client";
import { isArabic } from "@/utils/langStore";
import Cookies from "js-cookie";
import React, { useContext } from "react";
import { useState } from "react";

export default function AddPopUp(props) {
  const isArabicprop = useContext(isArabic).arabic;
  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [manger, setManger] = useState("");
  const [loading, setloading] = useState(false);

  const myHeaders = new Headers();
  const token = Cookies.get("token");
  myHeaders.append("Authorization", `Bearer ${token}`);
  const formdata = new FormData();
  formdata.append("name_en", nameEn);
  formdata.append("name", nameAr);
  { props.id && formdata.append("administration_id", props.administration_id) }
  { props.depart && formdata.append("department_id_adminstration", props.department_id_adminstration) }
  { props.depart && formdata.append("department_id_branch", props.department_id_branch) }
  formdata.append("name_manger", manger);

  const addHandeller = () => {
    setloading(true);
    fetch(
      `https://backend2.dasta.store/api/auth/${props.link}`,
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
      <div className=" font-sans rounded-md bg-white w-full md:w-3/4 getin">
        <div className=" p-4 text-xl bg-sky-400 rounded-t-md text-white text-center">
          <h1>{isArabicprop ? "إضافة " : "Add "}</h1>
        </div>
        <div className=" grid grid-cols-6 justify-center md:grid-cols-12 items-center mb-4">
          <div className=" w-full p-2 col-span-6">
            <h4>{isArabicprop ? "الأسم العربي" : "Name in Arabic"}</h4>
            <input
              value={nameAr}
              onChange={(e) => setNameAr(e.target.value)}
              className=" w-full outline-none border-1 p-1"
              type="text"
            ></input>
          </div>
          <div className=" w-full p-2 col-span-6">
            <h4>{isArabicprop ? "الأسم الانجليزي" : "Name in English"}</h4>
            <input
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
              className=" w-full outline-none border-1 p-1"
              type="text"
            ></input>
          </div>
          <div className="col-span-6 md:col-span-12">
            <div className=" w-full md:w-1/2 p-2 mx-auto">
              <h4>{isArabicprop ? "المدير " : "Manger"}</h4>
              <input
                value={manger}
                onChange={(e) => setManger(e.target.value)}
                className=" w-full outline-none border-1 p-1"
                type="text"
              ></input>
            </div>
          </div>
        </div>
        <div className=" flex items-center justify-center text-center">
          <button
            disabled={!nameAr || !nameEn}
            onClick={addHandeller}
            className=" disabled:opacity-30 bg-sky-400 py-1 mx-4 px-8 text-white rounded-full mb-4 outline-none border-none "
          >
            {loading ? "Loading..." : `${isArabicprop ? "أضافة" : "Add"}`}
          </button>
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
