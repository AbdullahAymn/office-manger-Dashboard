"use client";
import Loader from "@/app/components/Loader";
import { isArabic } from "@/utils/langStore";
import { Switch } from "@mui/material";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import Popup from "reactjs-popup";

export default function generalSettings() {
  const isArabicprop = useContext(isArabic).arabic;
  const numOfShifts = useContext(isArabic).numOfShifts;
  const re = useContext(isArabic).refresh;
  const setre = useContext(isArabic).setRefresh;
  const [loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState(false);

  //
  //GetData
  //

  const [settingsData, setSettingssData] = useState([
    {
      // repeatFinger : 0,
      // before_shift: 0,
      // after_shift: 0,
      // abcentAfterLate: "yes",
      // abcentAfterEarlyLeave: "no",
      // id_compan: 4,
      // num_shift: 4,
    },
  ]);
  const token = Cookies.get("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}\n`);
  useEffect(() => {
    setLoader(true);
    fetch(`https://backend2.dasta.store/api/auth/basicInfoFetchtosetting`, {
      method: "GET",
      headers: myHeaders,
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setSettingssData(data);
          setNeglectTime(data[0].repeatFinger);
          setShifts(data[0].num_shift);
          setExtraTime(data[0].before_shift);
          setExtraTimeAf(data[0].after_shift);
          setDelay(data[0].abcentAfterLate == "yes");
          setEarlyLeave(data[0].abcentAfterEarlyLeave == "yes");
        });
        setLoader(false);
      }
    });
  }, [refresh]);

  //
  //
  //Values
  //
  //
  const setNumOfShifts = useContext(isArabic).setNumOfShifts;
  const [neglectTime, setNeglectTime] = useState();
  const [shifts, setShifts] = useState();
  const [extraTime, setExtraTime] = useState();
  const [extraTimeAf, setExtraTimeAf] = useState();
  const [delay, setDelay] = useState();
  const [earlyLeave, setEarlyLeave] = useState();
  const [fisrtLast, setFirstLast] = useState(false);

  //save

  const formdata = new FormData();
  formdata.append("repeatFinger", neglectTime);
  formdata.append("before_shift", extraTime);
  formdata.append("after_shift", extraTimeAf);
  formdata.append("abcentAfterLate", delay ? "yes" : "no");
  formdata.append("abcentAfterEarlyLeave", earlyLeave ? "yes" : "no");
  formdata.append("num_shift", shifts);

  const [loading, setLoading] = useState(false);
  const saveHadeller = () => {
    setLoading(true);
    setLoader(true);
    // console.log(settingsData[0].id)
    // if (!token) {
    //    router.push("/");
    // }
    fetch(
      `https://backend2.dasta.store/api/auth/basicInfoUpdatesetting/${settingsData[0].id}`,
      {
        method: "POST",
        headers: myHeaders,
        body: formdata,
      }
    ).then((res) => {
      if (res.status === 200) {
        setLoading(false);
        setLoader(false);
        setRefresh(!refresh);
      }
      setre(!re);
    });
  };

  return (
    <div className=" bg-white shadow-md font-sans border-1 rounded-md md:w-4/5 mx-auto my-12 p-4">
      <Popup open={loader}>
        <Loader />
      </Popup>
      <h1 className=" text-2xl text-center mb-8">
        {isArabicprop ? "الإعدادات العامة" : "General Settings"}
      </h1>
      <div className=" w-full grid grid-cols-2 md:grid-cols-4 ">
        <div className="col-span-2 p-3">
          <h4 className=" md:text-lg">
            {isArabicprop
              ? "وقت إهمال تكرار البصمة من الموظف بالدقائق:"
              : "Time To Neglect Repeat Finger Print:"}
          </h4>
        </div>
        <div className="col-span-2 w-full p-3 flex items-center justify-center">
          <input
            onFocus={(e) => e.target.select()}
            onChange={(e) => {
              e.target.value === ""
                ? setNeglectTime(0)
                : setNeglectTime(e.target.value);
            }}
            className="p-2 outline-none border w-1/3 text-center rounded-md"
            type="number"
            min={1}
            value={neglectTime}
          ></input>
        </div>
        <div className="col-span-2 p-3">
          <h4 className=" md:text-lg">
            {isArabicprop
              ? "عدد الورديات التي تظهر في التقرير:"
              : "Number Of Seqance Which Will Show:"}
          </h4>
        </div>
        <div className="col-span-2 w-full p-3 flex items-center justify-center">
          <input
            onFocus={(e) => e.target.select()}
            onChange={(e) => {
              e.target.value === ""
                ? setShifts(1)
                : `${
                    e.target.value > 4
                      ? setShifts(4)
                      : setShifts(e.target.value)
                  }`;
              e.target.value === ""
                ? setNumOfShifts(1)
                : `${
                    e.target.value > 4
                      ? setNumOfShifts(4)
                      : setNumOfShifts(e.target.value)
                  }`;
            }}
            className="p-2 outline-none border w-1/3 text-center rounded-md"
            type="number"
            min={1}
            max={4}
            value={shifts}
          ></input>
        </div>
        <div className="col-span-2 p-3">
          <h4 className=" md:text-lg">
            {isArabicprop
              ? "يحتسب الإضافي قبل الدوام بالدقائق:"
              : "Extra Time Before Shift:"}
          </h4>
        </div>
        <div className="col-span-2 w-full p-3 flex items-center justify-center">
          <input
            onFocus={(e) => e.target.select()}
            onChange={(e) => {
              e.target.value === ""
                ? setExtraTime(0)
                : setExtraTime(e.target.value);
            }}
            className="p-2 outline-none border w-1/3 text-center rounded-md"
            type="number"
            min={1}
            value={extraTime}
          ></input>
        </div>
        <div className="col-span-2 p-3">
          <h4 className=" md:text-lg">
            {isArabicprop
              ? "يحتسب الإضافي بعد الدوام بالدقائق:"
              : "Extra Time After Shift:"}
          </h4>
        </div>
        <div className="col-span-2 w-full p-3 flex items-center justify-center">
          <input
            onFocus={(e) => e.target.select()}
            onChange={(e) => {
              e.target.value === ""
                ? setExtraTimeAf(0)
                : setExtraTimeAf(e.target.value);
            }}
            className="p-2 outline-none border w-1/3 text-center rounded-md"
            type="number"
            min={1}
            value={extraTimeAf}
          ></input>
        </div>
        <div className="col-span-2 p-3">
          <h4 className=" md:text-lg">
            {isArabicprop
              ? "تم احتساب اليوم غياب بعد تأخير:"
              : "Is Time Absence After Delay:"}
          </h4>
        </div>
        <div className="col-span-2 w-full p-3 flex items-center justify-center">
          <Switch
            checked={delay}
            onChange={(e) => setDelay(e.target.checked)}
          />
        </div>
        <div className="col-span-2 p-3">
          <h4 className=" md:text-lg">
            {isArabicprop
              ? "يتم احتساب اليوم غياب بعد انصراف مبكر:"
              : "Is Time Absence After Early Leave:"}
          </h4>
        </div>
        <div className="col-span-2 w-full p-3 flex items-center justify-center">
          <Switch
            checked={earlyLeave}
            onChange={(e) => setEarlyLeave(e.target.checked)}
          />
        </div>
        {/* <div className="col-span-2 p-3">
          <h4 className=" md:text-lg">
            {isArabicprop
              ? "احتساب أول حركة دخول و آخر حركة انصراف:"
              : "Is First Move Attend And Last Move Leave:"}
          </h4>
        </div>
        <div className="col-span-2 w-full p-3 flex items-center justify-center">
          <Switch
            checked={fisrtLast}
            onChange={(e) => setFirstLast(e.target.checked)}
          />
        </div> */}
        {/* <div className="col-span-2 p-3">
          <h4 className=" md:text-lg">
            {isArabicprop
              ? "إعدادات السحب التلقائي:"
              : "Auto transaction settings:"}
          </h4>
        </div>
        <div className="col-span-2 w-full p-3 flex items-center justify-center">
          <Link href="/main/generalSettings/autoTransaction">
            <p className=" text-blue-600 underline">
              {isArabicprop ? "تغيير البيانات" : "change info"}
            </p>
          </Link>
        </div> */}
      </div>
      <div className=" w-full flex items-center justify-center">
        <button
          disabled={loading}
          onClick={saveHadeller}
          className=" disabled:opacity-60 text-white py-1 px-12 rounded-full text-lg bg-sky-400 text-center mx-auto my-6"
        >
          {loading ? "loading..." : `${isArabicprop ? "حفظ" : "Save"}`}
        </button>
      </div>
    </div>
  );
}
