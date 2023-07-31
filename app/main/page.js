"use client";
import { isArabic } from "@/utils/langStore";
import React, { useContext, useState } from "react";
import Popup from "reactjs-popup";

import Popupcom from "./components/popup";
import { absentData, late } from "./TempData";
import DaysMoves from "./components/daysMoves";
import DaysChart from "./components/DaysChart";

export default function page() {
  const arabicProp = useContext(isArabic).arabic;

  const date = new Date();
  const week = [
    { arabic: "الأحد", english: "sunday" },
    { arabic: "الإثنين", english: "monday" },
    { arabic: "الثلاثاء", english: "tuesday" },
    { arabic: "الأربعاء", english: "wednesday" },
    { arabic: "الخميس", english: "thursday" },
    { arabic: "الجمعة", english: "friday" },
    { arabic: "السبت", english: "saturday" },
  ];

  const nameOfDay = arabicProp
    ? week[date.getDay()].arabic
    : week[date.getDay()].english;

  const dateOfDay = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  //
  //Short Summry
  //

  const numOfLate = 2;
  const numOfAbsent = 3;
  const numOfAttend = 16;
  const numOfMonthLate = 20;

  const lateFun = () => {setOpenLate(!openLate)};
  const absentFun = () => {setOpenabsent(!openabsent)};
  const attendFun = () => {setOpenattend(!openattend)};
  const monthLateFun = () => {setOpenmonthLate(!openmonthLate)};

  //
  //popup
  //
  const [openLate, setOpenLate] = useState(false);
  const [openabsent, setOpenabsent] = useState(false);
  const [openattend, setOpenattend] = useState(false);
  const [openmonthLate, setOpenmonthLate] = useState(false);

  return (
    //
    // main line
    //
    <div className=" font-sans w-full ">
      <div className="w-full">
        <div className=" p-3 w-full flex items-center justify-start">
          <h1 className=" text-lg font-light mx-5 text-gray-700">
            {arabicProp ? "مرحباً" : "welcome"}
          </h1>
          <i class="fa-sharp fa-regular fa-circle text-xs font-light text-gray-700"></i>
          <h1 className=" text-lg font-light mx-1 text-gray-700">
            {arabicProp ? "مدير النظام" : "Administrator"}
          </h1>
        </div>
        <hr />
      </div>

      {/*  */}
      {/* Report summry  */}
      {/*  */}

      <div className=" w-full">
        <h1 className=" text-2xl text-gray-700 p-5">
          {nameOfDay} {dateOfDay}
        </h1>
        <div className=" w-full  grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 ">
          {/* Late */}
          <div className=" m-2 pt-6 px-0 pb-0 rounded-md col-span-3 flex flex-col justify-between  labg">
            <div className=" flex items-center justify-between">
              <div className=" px-4 py-4 text-white">
                <h1 className=" text-3xl">{numOfLate}</h1>
                <h1 className="  text-xl">
                  {arabicProp ? "التأخير" : "Today Late"}
                </h1>
              </div>
              <div className=" overflow-hidden">
                <i className="fa-solid fa-comments   text-white/20 text-7xl "></i>
              </div>
            </div>
            <div
              onClick={lateFun}
              className=" bottom-0 bg-white/20 rounded-b-md text-sm text-white/70 py-2 px-4 hover:underline hover:cursor-pointer"
            >
              المزيد
            </div>
          </div>
          {/* Absent */}
          <div className=" m-2 pt-6 px-0 pb-0 rounded-md col-span-3 flex flex-col justify-between  abbg">
            <div className=" flex items-center justify-between">
              <div className=" px-4 py-4 text-white">
                <h1 className=" text-3xl">{numOfAbsent}</h1>
                <h1 className="  text-xl">
                  {arabicProp ? "الغياب" : "Month Absent"}
                </h1>
              </div>
              <div className=" overflow-hidden text-white/20 text-7xl">
                <i class="fa-solid fa-chart-simple"></i>
              </div>
            </div>
            <div
              onClick={absentFun}
              className=" bg-red-400 rounded-b-md text-sm text-white/70 py-2 px-4 hover:underline hover:cursor-pointer"
            >
              المزيد
            </div>
          </div>
          {/* Attend */}
          <div className=" m-2 pt-6 px-0 pb-0 rounded-md col-span-3 flex flex-col justify-between  atbg">
            <div className=" flex items-center justify-between">
              <div className=" px-4 py-4 text-white">
                <h1 className=" text-3xl">{numOfAttend}</h1>
                <h1 className="  text-xl">
                  {arabicProp ? "الحضور" : "Attendance Percentage"}
                </h1>
              </div>
              <div className=" overflow-hidden text-white/20 text-7xl ">
                <i class="fa-solid fa-video"></i>
              </div>
            </div>
            <div
              onClick={attendFun}
              className=" bg-white/30 rounded-b-md text-sm text-white/70 py-2 px-4 hover:underline hover:cursor-pointer"
            >
              المزيد
            </div>
          </div>
          {/* MonthLate */}
          <div className=" m-2 pt-6 px-0 pb-0 rounded-md col-span-3 flex flex-col justify-between  mlbg">
            <div className=" flex items-center justify-between">
              <div className=" px-4 py-4 text-white">
                <h1 className=" text-3xl">{numOfMonthLate}</h1>
                <h1 className="  text-xl">
                  {arabicProp ? "الأجازات" : "Month Late"}
                </h1>
              </div>
              <div className=" overflow-hidden text-white/20 text-7xl">
                <i class="fa-solid fa-earth-americas"></i>
              </div>
            </div>
            <div
              onClick={monthLateFun}
              className=" bg-white/10 rounded-b-md text-sm text-white/70 py-2 px-4 hover:underline hover:cursor-pointer"
            >
              المزيد
            </div>
          </div>
        </div>
        {/* late */}
        <Popup className=" p-0" open={openLate} closeOnDocumentClick>
          <Popupcom
            data={late}
            head={{ arabic: "عرض التأخير", english: "Display Late" }}
            name={{ arabic: "مدة التأخير", english: "Late time" }}
            clickFun ={lateFun}
          />
        </Popup>
        {/* Absent */}
        <Popup className=" p-0" open={openabsent} closeOnDocumentClick>
          <Popupcom
            data={absentData}
            head={{ arabic: "عرض الغياب", english: "Display Abcence" }}
            clickFun ={absentFun}
          />
        </Popup>
        {/* Attend */}
        <Popup className=" p-0" open={openattend} closeOnDocumentClick>
          <Popupcom
            data={late}
            head={{ arabic: "عرض الحضور ", english: "Display Abcence" }}
            clickFun ={attendFun}
          />
        </Popup>
        {/* MonthLate */}
        <Popup className=" p-0" open={openmonthLate} closeOnDocumentClick>
          <Popupcom
            data={late}
            head={{ arabic: "عرض الأجازات", english: "Month Late" }}
            
            clickFun ={monthLateFun}
          />
        </Popup>
      </div>
      {/*  */}
      {/* The Body  */}
      {/*  */}
      <div className=" py-14 grid grid-cols-6 lg:grid-cols-12">
        <div className=" col-span-6  m-4" ><DaysMoves day={nameOfDay} date={dateOfDay} /></div>
        <div className=" col-span-6  m-4"><DaysChart /></div>
        
        
      </div>
    </div>
  );
}
