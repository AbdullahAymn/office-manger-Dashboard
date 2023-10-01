"use client";
import { isArabic } from "@/utils/langStore";
import React, { useContext } from "react";

export default function DaysMoves(props) {
  const arabicProp = useContext(isArabic).arabic;

  let data = props.dataall || [];

  const show = data.map((e, index) => (
    <tr key={index} className=" p-2">
      <td className=" p-2 text-center">{e.codeEmp}</td>
      <td className=" p-2 text-center">{e.nameEmp}</td>
      <td className=" p-2 text-center">{e.timestamp}</td>

    </tr>
  ))
  return (
    <div className=" w-full bg-white shadow-lg">
      <div className="p-4 flex items-center text-xl border-b">
        <h1 className=" text-blue-300">
          <i class="fa-solid fa-globe"></i>{" "}
          {arabicProp ? "حركات يوم" : "Day Transactions"} {" , "}
        </h1>
        <h1>
          {props.day} {props.date}{" "}
        </h1>
      </div>
      <div className=" p-8 ">
        {/* {arabicProp ? " لا توجد حركات يوم" : "No Transactions Today"} */}

        <table className=" min-w-full p-2 border ">
          <thead>
            <tr className=" p-2 bg-white border text-black/70">
              <th className=" p-2">{arabicProp ? "الكود" : "code"}</th>
              <th className=" p-2">{arabicProp ? "الاسم" : "name"}</th>
              <th className=" p-2">{arabicProp ? "الحركة" : "transtion"}</th>
            </tr>
          </thead>
          <tbody>
            <tr></tr>
            {show}</tbody>
        </table>
      </div>
    </div>
  );
}
