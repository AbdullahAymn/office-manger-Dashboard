"use client";
import { isArabic } from "@/utils/langStore";
import React, { useContext, useState } from "react";

export default function CompanyInfo() {
  const isArabicprop = useContext(isArabic).arabic;
  const [nameAr, setNameAr] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [activityAr, setActivityAr] = useState("");
  const [activityEn, setActivityEn] = useState("");
  const [addressAr, setAddressAr] = useState("");
  const [addressEn, setAddressEn] = useState("");
  const [phone, setPhone] = useState("");
  const [fax, setFax] = useState("");
  const [website, setWebsite] = useState("");
  const [mail, setMail] = useState("");

  const saveHandeller = () => {};
  return (
    <div className=" bg-white shadow-md font-sans border-1 rounded-md md:w-4/5 mx-auto my-12 p-4">
      <h1 className=" text-2xl text-center mb-8">
        {isArabicprop ? "بيانات الشركة" : "CompanyInfo"}
      </h1>
      <div className=" w-full grid grid-cols-6 md:grid-cols-12">
        <div className=" col-span-6 p-3">
          <h4>{isArabicprop ? "اسم الشركة العربي" : "Arabic Company Name"}</h4>
          <input
            type="text"
            className=" w-full p-2 outline-none border "
            value={nameAr}
            onChange={(e) => setNameAr(e.target.value)}
          />
        </div>
        <div className=" col-span-6 p-3">
          <h4>
            {isArabicprop ? "اسم الشركة الإنجليزي" : "English Company Name"}
          </h4>
          <input
            type="text"
            className=" w-full p-2 outline-none border "
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
          />
        </div>
        <div className=" col-span-6 p-3">
          <h4>{isArabicprop ? "النشاط بالعربي" : "Activity in Arabic"}</h4>
          <input
            type="text"
            className=" w-full p-2 outline-none border "
            value={activityAr}
            onChange={(e) => setActivityAr(e.target.value)}
          />
        </div>
        <div className=" col-span-6 p-3">
          <h4>{isArabicprop ? "النشاط الإنجليزي" : "Activity in English"}</h4>
          <input
            type="text"
            className=" w-full p-2 outline-none border "
            value={activityEn}
            onChange={(e) => setActivityEn(e.target.value)}
          />
        </div>
        <div className=" col-span-6 p-3">
          <h4>{isArabicprop ? "العنوان العربي" : "Address in Arabic"}</h4>
          <input
            type="text"
            className=" w-full p-2 outline-none border "
            value={addressAr}
            onChange={(e) => setAddressAr(e.target.value)}
          />
        </div>
        <div className=" col-span-6 p-3">
          <h4>{isArabicprop ? "العنوان انجليزي" : "Address in English"}</h4>
          <input
            type="text"
            className=" w-full p-2 outline-none border "
            value={addressEn}
            onChange={(e) => setAddressEn(e.target.value)}
          />
        </div>
        <div className=" col-span-6 p-3">
          <h4>{isArabicprop ? "الهاتف" : "Phone"}</h4>
          <input
            type="text"
            className=" w-full p-2 outline-none border "
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className=" col-span-6 p-3">
          <h4>{isArabicprop ? "الفاكس" : "Fax"}</h4>
          <input
            type="text"
            className=" w-full p-2 outline-none border "
            value={fax}
            onChange={(e) => setFax(e.target.value)}
          />
        </div>
        <div className=" col-span-6 p-3">
          <h4>{isArabicprop ? "الموقع الاكتروني" : "Website"}</h4>
          <input
            type="text"
            className=" w-full p-2 outline-none border "
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <div className=" col-span-6 p-3">
          <h4>{isArabicprop ? "البريد الاكتروني" : "Email"}</h4>
          <input
            type="text"
            className=" w-full p-2 outline-none border "
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
        </div>
      </div>
      <div className=" w-full text-center my-4">
        <button
          className=" text-center text-white bg-sky-400 rounded-full text-lg py-1 w-fit px-12 mx-auto "
          onClick={saveHandeller}
        >
          {isArabicprop ? "حفظ" : "Save"}
        </button>
      </div>
    </div>
  );
}
