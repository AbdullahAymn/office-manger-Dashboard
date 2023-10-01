"use client"
import React, { useState } from "react";

export default function (props) {

  const [drobBasic , setDropBasic] = useState(false)
  const [drobProcedure , setProcedure] = useState(false)
  const [drobReports , setReports] = useState(false)
  const [drobUsers , setUsers] = useState(false)
  
  return (
    <div className="  w-full">
      <div className="  w-full">
        {/* Basic */}
        <div className=" flex-none w-full text-center">
          <div
            onClick={() => setDropBasic(!drobBasic)}
            className="p-2 w-full text-lg hover:cursor-pointer text-white/70 flex justify-between items-center"
          >
            {!props.smallSideBar && (
              <h3 className="font-sans text-lg font-bold text-sky-400 text-center">{` ${
                props.isArabicprop ? "البيانات الأساسية" : "Basic info"
              }`}</h3>
            )}
            <i
              className={`fa-sharp fa-solid text-lg font-bold text-sky-300 ${
                props.smallSideBar && "text-center mx-auto"
              } fa-caret-down  ${
                drobBasic && `rotate-${props.isArabicprop ? "900" : "270"} `
              }  `}
            ></i>
          </div>
          {drobBasic && props.basicData}
        </div>

        {/* Procedure */}
        <div className=" flex-none w-full">
          <div
            onClick={() => setProcedure(!drobProcedure)}
            className="p-2 w-full text-lg  font-bold text-sky-400 hover:cursor-pointer text-white/70 flex justify-between items-center"
          >
            {!props.smallSideBar && (
              <h3 className="font-sans text-lg font-bold text-sky-400">{` ${
                props.isArabicprop ? " الإجراءات" : "Procedure"
              }`}</h3>
            )}
            <i
              className={`fa-sharp fa-solid text-lg font-bold text-sky-400 ${
                props.smallSideBar && "text-center mx-auto"
              } fa-caret-down ${
                drobProcedure && `rotate-${props.isArabicprop ? "900" : "270"}`
              }  `}
            ></i>
          </div>
          {drobProcedure && props.ProcedureData}
        </div>

        {/* Reports */}
        <div className=" flex-none w-full">
          <div
            onClick={() => setReports(!drobReports)}
            className="p-2 w-full text-lg font-bold text-sky-400 hover:cursor-pointer text-white/70 flex justify-between items-center"
          >
            {!props.smallSideBar && (
              <h3 className="font-sans text-lg font-bold text-sky-400">{` ${
                props.isArabicprop ? " التقارير" : "Reports"
              }`}</h3>
            )}
            <i
              className={`fa-sharp fa-solid text-lg font-bold text-sky-400 ${
                props.smallSideBar && "text-center mx-auto"
              } fa-caret-down ${
                drobReports && `rotate-${props.isArabicprop ? "900" : "270"}`
              }  `}
            ></i>
          </div>
          {drobReports && props.ReportsData}
        </div>
        {/* Users */}
        <div className=" flex-none w-full">
          <div
            onClick={() => setUsers(!drobUsers)}
            className="p-2 w-full text-lg hover:cursor-pointer text-white/70 flex justify-between items-center"
          >
            {!props.smallSideBar && (
              <h3 className="font-sans text-lg font-bold text-sky-400">{` ${
                props.isArabicprop ? " الإعدادات" : "Users"
              }`}</h3>
            )}
            <i
              className={`fa-sharp fa-solid text-lg font-bold text-sky-400 ${
                props.smallSideBar && "text-center mx-auto"
              } fa-caret-down ${
                drobUsers && `rotate-${props.isArabicprop ? "900" : "270"}`
              }  `}
            ></i>
          </div>
          {drobUsers && props.UsersData}
        </div>
      </div>
    </div>
  );
}
