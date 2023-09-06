"use client";
import { isArabic } from "@/utils/langStore";
import { options } from "@/utils/optionStore";
import useOptions from "@/utils/useOptions";
import Cookies from "js-cookie";
import React, { useContext } from "react";
import { useState } from "react";

export default function PopUp(props) {
  const isArabicprop = useContext(isArabic).arabic;
  const branchesOptions = useOptions(useContext(options).branch);

  const element = props.element || {};

  const [nameAr, setNameAr] = useState(element.name);
  const [nameEn, setNameEn] = useState(element.name_en);
  const [branch, setBranch] = useState(element.name_branch);
  const [serial, setSerial] = useState(element.serialNumber);
  const [type, setType] = useState(element.sort_device);
  const [loading, setLoading] = useState(false);

  const token = Cookies.get("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  const formdata = new FormData();
  formdata.append("name", nameAr);
  formdata.append("name_en", nameEn);
  formdata.append("sort_device", type);
  formdata.append("serialNumber", serial);
  formdata.append("name_branch", branch);

  //
  //Adding
  //

  const addHandeller = () => {
    setLoading(true);
    fetch(`https://backend2.dasta.store/api/auth/addDevices`, {
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
  //Edit
  //

  const editHandeller = () => {
    setLoading(true);
    fetch(`https://backend2.dasta.store/api/auth/updateDevices/${element.id}`, {
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
            {isArabicprop
              ? `${props.edit ? "تعديل" : "إضافة"}`
              : `${props.edit ? "Edit" : "Add"}`}
          </h1>
        </div>
        <div className=" grid grid-cols-6 md:grid-cols-12 overflow-auto max-h-96 items-center mb-4">
          <div className=" w-full col-span-6 p-2">
            <h4>
              {isArabicprop ? "الإسم العربي" : "Name in Arabic"}{" "}
              <span className="text-red-600">*</span>
            </h4>
            <input
              type="text"
              required
              className=" w-full bg-white outline-none p-2 border rounded"
              value={nameAr}
              onChange={(e) => setNameAr(e.target.value)}
            />
          </div>
          <div className=" w-full col-span-6 p-2">
            <h4>
              {isArabicprop ? "الإسم الانجليزي" : "Name in English"}{" "}
              <span className="text-red-600">*</span>
            </h4>
            <input
              type="text"
              className=" w-full bg-white outline-none p-2 border rounded"
              value={nameEn}
              onChange={(e) => setNameEn(e.target.value)}
            />
          </div>

          <div className=" w-full col-span-6 p-2">
            <h4>
              {isArabicprop ? "الفرع" : "Branch"}
              <span className="text-red-600">*</span>
            </h4>
            <select
              required
              className=" w-full bg-white outline-none p-2 border rounded"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            >
              <option selected hidden>
                Choose one
              </option>
              {branchesOptions}
            </select>
          </div>
          <div className=" w-full col-span-6 p-2">
            <h4>
              {isArabicprop ? "الرقم التسلسلي" : "Serial Number"}{" "}
              <span className="text-red-600">*</span>
            </h4>
            <input
              type="text"
              required
              className=" w-full bg-white outline-none p-2 border rounded"
              value={serial}
              onChange={(e) => setSerial(e.target.value)}
            />
          </div>
          <div className=" w-full col-span-6 md:col-span-12 p-2">
            <div className=" md:w-1/2 w-full mx-auto">
              <h4>
                {isArabicprop ? "نوع الجهاز" : "Device Type"}
                <span className="text-red-600">*</span>
              </h4>
              <select
                required
                className=" w-full bg-white outline-none p-2 border rounded"
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
        </div>
        <div className=" flex items-center justify-center text-center">
          {props.edit ? (
            <button
              onClick={editHandeller}
              disabled={
                !nameAr || !nameEn || !branch || !serial || !type || loading
              }
              className=" disabled:opacity-50 bg-sky-400 py-1 mx-4 px-8 text-white rounded-full mb-4 outline-none border-none "
            >
              {loading ? "loading ....." : `${isArabicprop ? "تعديل" : "Edit"}`}
            </button>
          ) : (
            <button
              onClick={addHandeller}
              disabled={
                !nameAr || !nameEn || !branch || !serial || !type || loading
              }
              className=" disabled:opacity-50 bg-sky-400 py-1 mx-4 px-8 text-white rounded-full mb-4 outline-none border-none "
            >
              {loading ? "loading ....." : `${isArabicprop ? "إضافة" : "Add"}`}
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
