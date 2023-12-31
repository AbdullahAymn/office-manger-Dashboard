"use client";
import { isArabic } from "@/utils/langStore";
import React, { useContext } from "react";

export default function Popupcom(props) {
  const arabicProp = useContext(isArabic).arabic;

  //
  // Note The name of 5th row not always late
  //

  const showRows = props.data.map((e) => (
    <tr className="border-b">
      <td className="p-2 text-center">{e.codeEmployee}</td>
      <td className="p-2 text-center">{e.nameEmployee}</td>
      {/* <td className="p-2 text-center">{e.branch}</td> */}

      {props.name && <td className="p-2 text-center">{e.shift}</td>}
      {props.name && <td className="p-2 text-center">{e.lates}</td>}
      <td className="p-2 text-center">{e.date}</td>
      {props.abs && <td className="p-2 text-center">{e.comment}</td>}
    </tr>
  ));
  return (
    <div className=" h-screen w-full flex items-center justify-center overflow-x-hidden">
      <div className=" max-h-screen overflow-y-scrol w-82 getin">
        <div className=" m-auto rounded-lg bg-white  pb-4">
          <div className=" bg-blue-400 rounded-t-lg w-full p-3 text-xl text-white">
            <h1 className=" text-center">
              {" "}
              {arabicProp ? props.head.arabic : props.head.english}
            </h1>
          </div>
          <div className=" overflow-x-scroll text-sm md:text-base md:overflow-x-hidden">
            <table className="min-w-full w-200 md:w-full h-3">
              <thead className="border-b">
                <tr>
                  <th className="p-2 text-center">
                    {arabicProp ? " الكود" : " Code"}
                  </th>
                  <th className="p-2 text-center">
                    {arabicProp ? " الإسم" : " Name"}
                  </th>
                  {/* <th className="p-2 text-center">
                    {arabicProp ? " الفرع" : " Branch"}
                  </th> */}

                  {props.name && (
                    <th className="p-2 text-center">
                      {arabicProp ? " الدوام" : " Shift"}
                    </th>
                  )}
                  {props.name && (
                    <th className="p-2 text-center">
                      {arabicProp ? props.name.arabic : props.name.english}
                    </th>
                  )}

                  <th className="p-2 text-center">
                    {arabicProp ? " التاريخ" : " Date"}
                  </th>
                  {props.abs && (
                    <th className="p-2 text-center">
                      {arabicProp ? "ملاحظات" : "Notes"}
                    </th>
                  )}
                </tr>
              </thead>

              <tbody className="  overflow-y-scroll">{showRows}</tbody>
            </table>
          </div>

          <div className=" text-center mt-12">
            <button
              onClick={props.clickFun}
              className="py-2 text-lg hover:cursor-pointer text-black font-thin px-10 outline-none mx-auto rounded-full bg-slate-300"
            >
              {arabicProp ? " إلغاء" : "Cancel"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
