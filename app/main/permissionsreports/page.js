"use client";
import Loader from "@/app/components/Loader";
import { isArabic } from "@/utils/langStore";
import React, { useState } from "react";
import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Popup from "reactjs-popup";
import Label from "@/app/components/reports/Label";
import Cookies from "js-cookie";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { fonty } from "@/utils/Amiri-Regular-normal (1)";

export default function VacationsReports() {
  const isArabicprop = useContext(isArabic).arabic;
  const [loader, setLoader] = useState(false);
  // -------------------------------------------------------------------
  //
  //Label
  //
  const [showSearch, setShowSearch] = useState(true);
  const showSearchHandeller = (val) => {
    setShowSearch(val);
  };
  // -------------------------------------------------------------------
  //
  // vars
  //

  const date = new Date();
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [from, setFrom] = useState(date.toLocaleDateString("en-CA"));
  const [to, setTo] = useState(date.toLocaleDateString("en-CA"));

  // -------------------------------------------------------------------

  //
  // Search
  //
  const [dataToMap, setDataToMap] = useState([]);
  const searchHandeller = async (e) => {
    e.preventDefault();
    setLoader(true);
    const myHeaders = new Headers();
    const token = Cookies.get("token");
    myHeaders.append("Authorization", `Bearer ${token}\n`);
    const formdata = new FormData();
    formdata.append("FromDay", from);
    formdata.append("ToDay", to);
    // if (!token) {
    //   window.location.reload();
    // }
    await fetch("https://backend2.dasta.store/api/auth/FinalReportPermision", {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setDataToMap(data);
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
    setName("");
    setCode("");
    setFrom(date.toLocaleDateString("en-CA"));
    setTo(date.toLocaleDateString("en-CA"));

    setDataToMap([]);
  };

  // -------------------------------------------------------------------
  //
  //
  //Maping
  //
  //

  const dataShow = dataToMap.map((e, index) => {
    let num = index;
    let searched = e.data;
    const day = new Date(from);
    day.setDate(day.getDate() + index);
    let date = day.toLocaleDateString("en-CA");

    if (name) {
      searched = searched.filter((e) => e.nameEmployee.includes(name.trim()));
    }
    if (code) {
      searched = searched.filter((e) => e.codeEmployee == code);
    }

    let show = searched.map((e) => (
      <tr className=" grid-cols-11 border">
        <td className=" col-span-1 text-start p-2">{e.codeEmployee}</td>
        <td className=" col-span-3 text-start p-2">{e.nameEmployee}</td>
        <td className=" col-span-3 text-start p-2">{e.shift}</td>
        <td className=" col-span-2 text-start p-2">{e.date}</td>
        <td className=" col-span-2 text-start p-2">{e.comment}</td>
      </tr>
    ));

    return (
      <>
        <table
          id={`mytabe${num}`}
          className=" my-3 min-w-full table-auto text-sm  w-200 md:w-full font-sans"
        >
          <thead>
            <tr></tr>
            <tr className="  w-full bg-[#393d3f50] m-1 text-black/70 border">
              <th colSpan={5} className=" text-black/70">
                {date}
              </th>
            </tr>
            <tr className="bg-white  grid-cols-11 border text-black/70">
              <th className=" col-span-1 text-start p-2">
                {isArabicprop ? "الكود" : "Code"}
              </th>
              <th className=" col-span-3 text-start p-2">
                {isArabicprop ? "الأسم" : "name"}
              </th>
              <th className=" col-span-3 text-start p-2">
                {isArabicprop ? "الوردية" : "Shift"}
              </th>
              <th className=" col-span-2 text-start p-2">
                {isArabicprop ? "التاريخ" : "Date"}
              </th>
              <th className=" col-span-2 text-start p-2">
                {isArabicprop ? "ملاحظات" : "Notes"}
              </th>
            </tr>
          </thead>
          <tbody>{show}</tbody>
        </table>
        <hr className="h-[1px] bg-black/50" />
      </>
    );
  });

  // -------------------------------------------------------------------
  //
  // exporting
  //

  //pdf

  const printDocument = () => {
    const doc = new jsPDF();
    doc.setFont("Amiri-Regular");
    doc.text(90, 10, isArabicprop ? "تقرير الاذونات" : "Permissions Report");
    dataToMap.map((e, index) => {
      let num = index;
      autoTable(doc, {
        pageBreak: "auto",
        styles: { font: "Amiri-Regular", halign: "right", fontSize: "6" },
        html: `#mytabe${num}`,
      });
    });

    doc.save("تقرير الاذونات.pdf");
  };

  //Excel
  const headers = [
    { label: `الكود`, key: "code" },
    { label: "الاسم", key: "name" },
    { label: "الوردية", key: "shift" },
    { label: "التاريخ", key: "date" },
    { label: "ملاحظات", key: "notes" },
  ];
  let cvsData = [];

  const cvsDatas = dataToMap.map((e, index) => {
    e.data.map((e) => {
      cvsData.push({
        code: e.codeEmployee,
        name: e.nameEmployee,
        shift: e.shift,
        date: e.date,
        notes: e.comment,
      });
    });
  });

  return (
    <div className=" font-sans">
      <div>
        <Popup open={loader}>
          <Loader />
        </Popup>
        <ToastContainer position="bottom-center" theme="colored" />
        <div>
          <Label
            headers={headers}
            data={cvsData}
            fileName="تقارير الاذونات "
            pdf={printDocument}
            setsearch={showSearchHandeller}
            label={isArabicprop ? "الاذونات" : "Permissions"}
          />
        </div>
      </div>
      {showSearch && (
        <div className=" mb-12">
          <div className=" relative w-full p-2 border rounded-md">
            <i
              onClick={resetHandeller}
              className={`fa-solid fa-rotate-right hover:cursor-pointer absolute top-2 ${
                isArabicprop ? " left-2" : " right-2"
              }`}
            ></i>
            <form onSubmit={searchHandeller}>
              <div className=" w-full p-2 pb-10 grid grid-cols-3 md:grid-cols-12">
                <div className=" col-span-3 md:mx-4">
                  <h4>{isArabicprop ? "الكود" : "Code"}</h4>
                  <input
                    className=" w-full p-2 border outline-none"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    type="number"
                    placeholder={isArabicprop ? "الكود" : "Code"}
                  />
                </div>
                <div className=" col-span-3 md:mx-4">
                  <h4>{isArabicprop ? "اسم الموظف:" : "Name :"}</h4>
                  <input
                    className=" w-full p-2 border outline-none"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder={isArabicprop ? "اسم الموظف" : "Name"}
                  />
                </div>
                <div className=" col-span-3 md:mx-4">
                  <h4>{isArabicprop ? "من :" : "From :"}</h4>
                  <input
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    type="date"
                    className=" w-full p-2 border outline-none"
                  />
                </div>
                <div className=" col-span-3 md:mx-4">
                  <h4>{isArabicprop ? "إلى :" : "To :"}</h4>
                  <input
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    type="date"
                    className=" w-full p-2 border outline-none"
                  />
                </div>
              </div>
              <button
                className={`hover:cursor-pointer absolute bottom-2 bg-sky-400 text-white px-12 py-1 rounded-full ${
                  isArabicprop ? " left-2" : " right-2"
                }`}
              >
                {isArabicprop ? "بحث" : "Search"}
              </button>
            </form>
          </div>
        </div>
      )}
      <div>{dataShow}</div>
    </div>
  );
}
