"use client"
import React, { useState } from "react";

export default function (props) {

  const [drobBasic , setDropBasic] = useState(true)
  const [drobProcedure , setProcedure] = useState(true)
  const [drobReports , setReports] = useState(true)
  const [drobUsers , setUsers] = useState(true)
  
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
              <h3 className="font-sans text-center">{` ${
                props.isArabicprop ? "البيانات الأساسية" : "Basic info"
              }`}</h3>
            )}
            <i
              className={`fa-sharp fa-solid ${
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
            className="p-2 w-full text-lg hover:cursor-pointer text-white/70 flex justify-between items-center"
          >
            {!props.smallSideBar && (
              <h3 className="font-sans">{` ${
                props.isArabicprop ? " الإجراءات" : "Procedure"
              }`}</h3>
            )}
            <i
              className={`fa-sharp fa-solid ${
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
            className="p-2 w-full text-lg hover:cursor-pointer text-white/70 flex justify-between items-center"
          >
            {!props.smallSideBar && (
              <h3 className="font-sans">{` ${
                props.isArabicprop ? " التقارير" : "Reports"
              }`}</h3>
            )}
            <i
              className={`fa-sharp fa-solid ${
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
              <h3 className="font-sans">{` ${
                props.isArabicprop ? " الإعدادات" : "Users"
              }`}</h3>
            )}
            <i
              className={`fa-sharp fa-solid ${
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
