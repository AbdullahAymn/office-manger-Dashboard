"use client";
import Loader from "@/app/components/Loader";
import Paginate from "@/app/components/Paginate";
import { isArabic } from "@/utils/langStore";
import { options } from "@/utils/optionStore";
import useOptions from "@/utils/useOptions";
import { InputLabel, MenuItem, Select } from "@mui/material";
import Cookies from "js-cookie";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Popup from "reactjs-popup";

export default function DisplayTransactions() {
  const isArabicprop = useContext(isArabic).arabic;
  const [loader, setLoader] = useState(false);
  const [showsearch, setShowSearch] = useState(true);
  const refrshopt = useContext(options).refresh;
  const setrefrshopt = useContext(options).setRefresh;
  useEffect(() => {
    setrefrshopt(!refrshopt);
  }, []);
  const branchesOptions = useOptions(useContext(options).branch);
  const mangementOptions = useOptions(useContext(options).mangement);
  const departmentOptions = useOptions(useContext(options).department);
  const jobOptions = useOptions(useContext(options).job);
  const groupOptions = useOptions(useContext(options).group);
  const workingTimeOptions = useOptions(useContext(options).workingTime);

  // -------------------------------------------------------------------

  //
  //
  //search
  //
  const date = new Date();
  //
  const [code, setCode] = useState("");
  const [from, setFrom] = useState(date.toLocaleDateString("en-CA"));
  const [to, setTo] = useState(date.toLocaleDateString("en-CA"));
  const [name, setName] = useState("");
  // const [branches, setbranches] = useState("");
  // const [management, setManagement] = useState("");
  // const [department, setDepartment] = useState("");
  // const [job, setJob] = useState("");
  // const [group, setGroup] = useState("");
  // const [shift, setShift] = useState("");

  const [dataToMap, setDataToMap] = useState([]);

  const searchHandeller = async () => {
    setLoader(true);
    const myHeaders = new Headers();
    const token = Cookies.get("token");
    myHeaders.append("Authorization", `Bearer ${token}\n`);
    const formdata = new FormData();
    formdata.append("FromDay", from);
    formdata.append("ToDay", to);
    await fetch("https://backend2.dasta.store/api/auth/showTrnstion", {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setDataToMap(data.data);
          // console.log(data.days)
          setLoader(false);
        });
      } else if (res.status === 300) {
        setLoader(false);
        toast.warning(
          `${
            isArabicprop
              ? "هناك مشكلة في التاريخ"
              : "There is a problem with dates"
          }`
        );
      } else {
        setLoader(false);
        toast.error(`${isArabicprop ? "هناك مشكلة" : "Something is wrong"}`);
      }
    });
  };

  const resetHandeller = () => {
    setCode("");
    setFrom(date.toLocaleDateString("en-CA"));
    setTo(date.toLocaleDateString("en-CA"));
    setName("");

    setDataToMap([]);
  };
  // -------------------------------------------------------------------
  //
  // Maping
  //

  const show = dataToMap.map((element, index) => {
    const day = new Date(from);
    day.setDate(day.getDate() + index);
    let date = day.toLocaleDateString("en-CA");

    //Data
    let searched = element;
    if (name) {
      searched = searched.filter((e) => e.name.includes(name.trim()));
    }
    if (code) {
      searched = searched.filter((e) => e.CodeEmplyee == code);
    }

    let show = searched.map((e, index) => {

      let timein = ''
      let timeout = ''
      let late = ''
      let overtime = ''
      let early = ''

      if (e.tleave.length > 0) {
        timeout = e.tleave[0].day.substr(11, 5);
        
      }
      if (e.tealyleave.length > 0) {
        early = e.tealyleave[0].day.substr(11, 5);
        
      }
      if (e.late.length > 0) {
        late = e.late[0].day.substr(11, 5);
        
      }
      if (e.extrawork.length > 0) {
        overtime = e.extrawork[0].day.substr(11, 5);
        
      }
      if (e.Attedance.length > 0) {
        timein = e.Attedance[0].day.substr(11, 5);
        
      }
      return (
        <tr key={index} className="p-2 border text-black/70">
          <td className=" p-2 text-center  ">{e.CodeEmplyee}</td>
          <td className=" p-2  text-center">{e.name}</td>
          <td className=" p-2  text-center">{timein}</td>
          <td className=" p-2  text-center">{timeout}</td>
          <td className=" p-2  text-center">{late}</td>
          <td className=" p-2  text-center">{early}</td>
          <td className=" p-2  text-center">{overtime}</td>
        </tr>
      );
    });
    return (
      <>
        <table
          key={index}
          className=" my-2 table-auto min-w-full w-200 md:w-full text-sm md:text-base "
        >
          {/* tabelBody */}
          <thead>
            <tr className="  w-full bg-[#8c929450] m-1 text-black/70 border"></tr>
            <tr>
              <th colSpan={7} className=" text-black/70">
                {date}
              </th>
            </tr>
            <tr className="  grid-cols-12 bg-white p-2 border text-black/70">
              <th className=" p-2  ">{isArabicprop ? "الكود" : "Code"}</th>
              <th className=" p-2  ">{isArabicprop ? "الإسم" : "Name"}</th>
              <th className=" p-2  ">
                {isArabicprop ? "وقت الحضور" : "Time In"}
              </th>
              <th className=" p-2">
                {isArabicprop ? "وقت الإنصراف" : "Time Out"}
              </th>
              <th className=" p-2">{isArabicprop ? "تأخير" : "Delay"}</th>
              <th className=" p-2t">
                {isArabicprop ? "إنصراف مبكر" : "Early leave"}
              </th>
              <th className="p-2">{isArabicprop ? "إضافي" : "Over Time"}</th>
            </tr>
          </thead>

          <tbody>{show}</tbody>
        </table>
        <hr className="h-[2px] bg-black" />
      </>
    );
  });
  return (
    <div className=" font-sans overflow-x-hidden">
      <Popup open={loader}>
        <Loader />
      </Popup>
      <ToastContainer position="bottom-center" theme="colored" />
      {/* 
  // -------------------------------------------------------------------
       */}
      {/*  */}
      {/* Top section */}
      {/*  */}
      <div className=" md:p-4 w-full font-sans flex items-center justify-between">
        <div>
          <h1 className=" text-xl mb-3 md:text-3xl">
            {isArabicprop ? "الحركات" : "Transactions"}
          </h1>
          <h1 className=" font-light flex">
            <Link href="/main">
              <h1 className=" font-normal hover:underline">
                {isArabicprop ? "الرئيسية" : "Main"}
              </h1>
            </Link>{" "}
            / {isArabicprop ? "الحركات" : "Transactions"}
          </h1>
        </div>
        <div className=" p-2 grid grid-cols-6 md:flex ">
          <button
            className=" bg-gray-200 col-span-6  py-1 px-6 rounded-full md:mx-2 text-md"
            onClick={() => setShowSearch(!showsearch)}
          >
            {showsearch
              ? `${isArabicprop ? "إخفاء البحث" : "Hide search"}`
              : `${isArabicprop ? "إظهار البحث" : "Show search"}`}{" "}
            <i
              className={`fa-solid fa-caret-down  ${
                showsearch && " rotate-180"
              }`}
            ></i>
          </button>
          <button
            onClick={searchHandeller}
            className=" col-span-6  bg-sky-400 text-white py-1 px-12 rounded-full md:mx-2 text-md"
          >
            {isArabicprop ? "بحث" : "Search"}{" "}
          </button>
        </div>
      </div>
      {/* 
  // -------------------------------------------------------------------
       */}
      {/*  */}
      {/*  */}
      {/* Search Section */}
      {/*  */}
      {/*  */}

      {showsearch && (
        <div className=" p-3  rounded-lg border-1  font-sans">
          <div className=" w-full relative">
            <i
              onClick={resetHandeller}
              className={`fa-solid fa-rotate-right hover:cursor-pointer absolute top-0 ${
                isArabicprop ? "left-0" : "right-0"
              }`}
            ></i>

            {/* the form */}
            <form>
              <div className=" py-4 grid grid-cols-3 md:grid-cols-12">
                <div className=" w-full col-span-3 px-4">
                  <h4>{isArabicprop ? "كود الموظف" : "Employee Code"}</h4>
                  <input
                    className=" p-2 border w-full outline-none "
                    type="text"
                    placeholder={isArabicprop ? "كود الموظف" : "Employee Code"}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
                <div className=" w-full col-span-3 px-4">
                  <h4>{isArabicprop ? "إسم الموظف" : "Employee Name"}</h4>
                  <input
                    className=" p-2 border w-full outline-none "
                    type="text"
                    placeholder={isArabicprop ? "إسم الموظف" : "Employee Name"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className=" w-full col-span-3 px-4">
                  <h4>{isArabicprop ? "من" : "From"}</h4>
                  <input
                    className=" p-2 border outline-none w-full "
                    type="date"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                  />
                </div>
                <div className=" w-full col-span-3 px-4">
                  <h4>{isArabicprop ? "الي" : "To"}</h4>
                  <input
                    className=" p-2 border outline-none w-full "
                    type="date"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 
  // -------------------------------------------------------------------
       */}
      {/*  */}
      {/* Table */}
      {/*  */}
      <div className=" w-full font-sans my-4 overflow-x-scroll md:overflow-x-hidden">
        {show}
      </div>
    </div>
  );
}
