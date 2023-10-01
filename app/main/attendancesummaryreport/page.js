"use client";
import Loader from "@/app/components/Loader";
import { isArabic } from "@/utils/langStore";
import React, { useState } from "react";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Popup from "reactjs-popup";
import Label from "@/app/components/reports/Label";
import Cookies from "js-cookie";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { fonty } from "@/utils/Amiri-Regular-normal (1)";
import { useEffect } from "react";
import useOptions from "@/utils/useOptions";
import { options } from "@/utils/optionStore";

export default function AttendanceSummaryReport() {
  const isArabicprop = useContext(isArabic).arabic;
  const [loader, setLoader] = useState(false);
  const refrshopt = useContext(options).refresh;
  const setrefrshopt = useContext(options).setRefresh;
  useEffect(() => {
    setrefrshopt(!refrshopt);
  }, []);

  const branchesOptions = useOptions(useContext(options).branch);

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
  const [branch, setBranch] = useState("");
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
    if (!token) {
      window.location.reload();
    }
    await fetch("https://backend2.dasta.store/api/auth/totalReportAtted", {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    }).then((res) => {
      if (res.status === 200) {
        // let dataa = JSON.stringify(res);
        // console.log(res.json())
        res.json().then((data) => {
          setDataToMap([data]);
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

  // console.log(dataToMap);

  const resetHandeller = () => {
    setName("");
    setBranch("");
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

    const da =  e.map(el => {
      let searched = el;
    if (name) {
      searched = searched.filter((e) => e.name.includes(name.trim()));
    }
    if (branch) {
      searched = searched.filter((e) => e.branch == branch);
    }

    let show = searched.map((el) => {
      return (
        <tr className=" grid-cols-11 border">
          <td className=" col-span-3 p-2">{el.name}</td>
          <td className=" col-span-2 p-2">{el.branch}</td>
          <td className=" col-span-3 p-2">{el.day}</td>
          <td className=" col-span-2 p-2">{el.status}</td>
          
        </tr>
      );
    });
    return show
    }
    )

    // const froom = from
    const day = new Date(from);
    day.setDate(day.getDate() + index);
    return (
      <>
        <table
          id={`mytabe${num}`}
          className=" my-3 min-w-full table-auto text-sm  w-200 md:w-full font-sans"
        >
          <thead>
            <tr></tr>

            <tr className=" grid-cols-11  w-full bg-[#8c929450] m-1 text-black/70 border">
              <th colspan={4} className=" col-span-11">
                {isArabicprop
                  ? `الفترة من ${from} الي ${to}`
                  : `From ${from} to ${to}`}
              </th>
            </tr>
            <tr className="bg-white grid-cols-11 border text-black/70">
              <th className=" col-span-3 text-start p-2">
                {isArabicprop ? "الأسم" : "Name"}
              </th>
              <th className=" col-span-2 text-start p-2">
                {isArabicprop ? "الفرع" : "Branch"}
              </th>
              <th className=" col-span-2 text-start p-2">
                {isArabicprop ? "التاريخ" : "Date"}
              </th>
              <th className=" col-span-2 text-start p-2">
                {isArabicprop ? "الحالة" : "Status"}
              </th>
            </tr>
          </thead>
          <tbody>{da}</tbody>
        </table>
        <hr className="h-1 bg-black" />
      </>
    );
  });


  // const dataShow = dataToMap.map((e, index) => {
    

  //   return('11')
  // })


  // -------------------------------------------------------------------
  //
  //
  // Exporting
  //

  const printDocument = () => {
    const doc = new jsPDF();
    doc.setFont("Amiri-Regular");
    doc.text(
      90,
      10,
      isArabicprop ? 'تقرير ملخص تقرير الحضور' : "Attendance Summary Report Report"
    );
    dataToMap.map((e, index) => {
      let num = index;
      autoTable(doc, {
        pageBreak: "auto",
        styles: { font: "Amiri-Regular", halign: "right", fontSize: "6" },
        html: `#mytabe${num}`,
      });
    });

    doc.save("تقرير ملخص تقرير الحضور.pdf");
  };

  // Excel
  const headers = [
    { label: "الاسم", key: "name" },
    { label: "الفرع", key: "branch" },
    { label: "التاريخ", key: "date" },
    { label: "الحالة", key: "status" },
  ];
  let cvsData = [];

  const cvsDatas = dataToMap.map((e, index) => {
    e.map((el) => {
      el.map((elem) => {
        cvsData.push({
          name: elem.name,
          branch: elem.branch,
          date: elem.day,
          status: elem.status,
          
        });
      });
    })
    
  });
  return (
    <div className=" font-sans">
      <Popup open={loader}>
        <Loader />
      </Popup>
      <ToastContainer position="bottom-center" theme="colored" />
      <div>
        <div>
          <Label
            headers={headers}
            data={cvsData}
            fileName="ملخص تقرير الحضور"
            pdf={printDocument}
            setsearch={showSearchHandeller}
            label={
              isArabicprop ? "ملخص تقرير الحضور" : "Attendance Summary Report"
            }
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
                    <h4>{isArabicprop ? "الفرع" : "Branch"} </h4>
                    <select
                      value={branch}
                      required
                      onChange={(e) => setBranch(e.target.value)}
                      className=" p-2 rounded-md border outline-none w-full"
                    >
                      <option selected hidden>
                        Choose one
                      </option>
                      {branchesOptions}
                    </select>
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
      </div>
      <div>{dataShow}</div>
    </div>
  );
}
