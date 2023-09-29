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
    await fetch("https://backend2.dasta.store/api/auth/FinalReportHoliday", {
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

  let searr = dataToMap;

  if (name) {
    searr = searr.filter((e) => e.data.nameEmployee.includes(name.trim()));
  }
  if (code) {
    searr = searr.filter((e) => e.data.codeEmployee == code);
  }

  const dataShow = searr.map((e, index) => {
    let num = index;
    let searched = e.data;
    // const day = new Date(from);
    // day.setDate(day.getDate() + index);
    // let date = day.toLocaleDateString("en-CA");

    return (
      <>
        <tr className=" grid-cols-11 border">
          <td className=" col-span-1 text-start p-2">
            {searched.codeEmployee}
          </td>
          <td className=" col-span-3 text-start p-2">
            {searched.nameEmployee}
          </td>
          <td className=" col-span-3 text-start p-2">{searched.fromDay}</td>
          <td className=" col-span-2 text-start p-2">{searched.toDay}</td>
          <td className=" col-span-2 text-start p-2">
            {searched.sortOfHoliday}
          </td>
          <td className=" col-span-2 text-start p-2">{searched.comment}</td>
        </tr>
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
    doc.text(90, 10, isArabicprop ? "تقرير الأجازات" : "Vacations Report");
    // dataToMap.map((e, index) => {
    //   let num = index;

    // });
    autoTable(doc, {
      pageBreak: "auto",
      styles: { font: "Amiri-Regular", halign: "right", fontSize: "6" },
      html: `#mytabe`,
    });

    doc.save("تقرير الأجازات.pdf");
  };

  //Excel
  const headers = [
    { label: `الكود`, key: "code" },
    { label: "الاسم", key: "name" },
    { label: "من", key: "from" },
    { label: "الي", key: "to" },
    { label: "نوع الاجازة", key: "type" },
    { label: "ملاحظات", key: "notes" },
  ];
  let cvsData = [];

  const cvsDatas = dataToMap.map((e, index) => {
    cvsData.push({
      code: e.data.codeEmployee,
      name: e.data.nameEmployee,
      from: e.data.fromDay,
      to: e.data.toDay,
      type: e.data.sortOfHoliday,
      notes: e.data.comment,
    });
  });

  return (
    <div className=" font-sans">
      <Popup open={loader}>
        <Loader />
      </Popup>
      <ToastContainer position="bottom-center" theme="colored" />
      <div>
        <Label
          headers={headers}
          data={cvsData}
          fileName="تقارير الاجازات "
          pdf={printDocument}
          setsearch={showSearchHandeller}
          label={isArabicprop ? "الأجازات" : "Vacations"}
        />
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

      <div>
        <table
          id={`mytabe`}
          className=" my-3 min-w-full table-auto text-sm  w-200 md:w-full font-sans"
        >
          <thead>
            {/* <tr></tr>
          <tr className="  w-full bg-[#393d3f50] m-1 text-black/70 border">
            <th colSpan={6} className=" text-black/70">
              {date}
            </th>
          </tr> */}
            <tr className="bg-white  grid-cols-11 border text-black/70">
              <th className=" col-span-1 text-start p-2">
                {isArabicprop ? "الكود" : "Code"}
              </th>
              <th className=" col-span-3 text-start p-2">
                {isArabicprop ? "الأسم" : "name"}
              </th>
              <th className=" col-span-3 text-start p-2">
                {isArabicprop ? "من" : "From"}
              </th>
              <th className=" col-span-2 text-start p-2">
                {isArabicprop ? "الي" : "To"}
              </th>
              <th className=" col-span-2 text-start p-2">
                {isArabicprop ? "نوع الاجازة" : "Type of Vacation"}
              </th>
              <th className=" col-span-2 text-start p-2">
                {isArabicprop ? "ملاحظات" : "Notes"}
              </th>
            </tr>
          </thead>
          <tbody>{dataShow}</tbody>
        </table>
      </div>
    </div>
  );
}
