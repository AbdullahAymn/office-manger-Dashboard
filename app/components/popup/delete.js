"use client";
import { isArabic } from "@/utils/langStore";
import Cookies from "js-cookie";
import React, { useContext } from "react";
import { useState } from "react";

export default function Delete(props) {
  const isArabicprop = useContext(isArabic).arabic;
  const [loading, setloading] = useState(false);
  const element = props.element || {};
  const token = Cookies.get("token");

  const deleteHandeller = async () => {
    setloading(true);
    let myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    await fetch(
      `https://backend2.dasta.store/api/auth/${props.link}/${element.id}`,
      {
        method: "DELETE",
        headers: myHeaders,
      }
    ).then((res) => {
      if (res.status === 200) {
        props.refresh();
      }
    });
  };

  return (
    <div className=" h-screen w-full flex items-center justify-center">
      <div className=" font-sans rounded-md bg-white w-96 mx-auto getin">
        <div className=" p-4 text-xl bg-red-600 rounded-t-md text-white text-center">
          <h1>
            {isArabicprop ? "حذف" : "Delete"}{" "}
            {isArabicprop ? element.name : element.name_en}
          </h1>
        </div>
        <div className=" text-center py-4 px-10">
          <h1>
            {isArabicprop
              ? "هل تريد حذف هذا العنصر؟"
              : " Are you sure you want to Delete this element?"}
          </h1>
        </div>
        <div className=" flex items-center justify-center text-center">
          <button
            onClick={deleteHandeller}
            disabled={loading}
            className=" disabled:opacity-60 bg-red-600 py-1 mx-4 px-8 text-white rounded-full mb-4 outline-none border-none "
          >
            {loading ? "Loading..." : `${isArabicprop ? "حذف" : "Delete"}`}
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
