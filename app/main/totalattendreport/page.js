"use client";
import Loader from "@/app/components/Loader";
import Reports from "@/app/components/reports/Reports";
import { isArabic } from "@/utils/langStore";
import { options } from "@/utils/optionStore";
import useOptions from "@/utils/useOptions";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { fonty } from "@/utils/Amiri-Regular-normal (1)";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useContext } from "react";
import Popup from "reactjs-popup";
import Label from "@/app/components/reports/Label";
import { data } from "autoprefixer";

export default function TotalAttend() {
  const isArabicprop = useContext(isArabic).arabic;
  const [loader, setLoader] = useState(false);
  // -------------------------------------------------------------------
  //
  //options
  //
  const refrshopt = useContext(options).refresh;
  const setrefrshopt = useContext(options).setRefresh;
  useEffect(() => {
    setrefrshopt(!refrshopt);
  }, []);

  const branchesOptions = useOptions(useContext(options).branch);

  // -------------------------------------------------------------------
  //
  //Defining vars
  //
  const date = new Date();
  const [name, setName] = useState("");
  const [branch, setBranch] = useState("");
  const [from, setFrom] = useState(date.toLocaleDateString("en-CA"));
  const [to, setTo] = useState(date.toLocaleDateString("en-CA"));

  // -------------------------------------------------------------------

  //
  //Functions of Search
  //

  const [element, setElement] = useState({});
  const [dataToMap, setDataToMap] = useState([]);
  const searchHandeller = async (e) => {
    e.preventDefault();
    setLoader(true);
    const myHeaders = new Headers();
    const token = Cookies.get("token");
    if (!token) {
      window.location.reload();
    }
    myHeaders.append("Authorization", `Bearer ${token}\n`);
    const formdata = new FormData();
    formdata.append("FromDay", from);
    formdata.append("ToDay", to);
    await fetch(
      "https://backend2.dasta.store/api/auth/finallyReporttotaldetailsDay",
      {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      }
    ).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setElement(data);
          setDataToMap([data.data]);
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

  const show = dataToMap.map((e, index) => {
    let num = index;

    let searched = e;

    if (name) {
      searched = searched.filter((el) => el[0].name.includes(name.trim()));
    }
    if (branch) {
      searched = searched.filter((el) => el[0].branch === branch);
    }

    const showdata = searched.map((ele) => {
      const showws = ele.map((el, indx) => {
        return (
          <tr key={indx}>
            <th className=" p-2">{el.code}</th>
            <th className=" p-2">{isArabicprop ? el.name : el.name_en}</th>
            <th className=" p-2">{el.branch}</th>
            <th className=" p-2">{el.totalLate}</th>
            <th className=" p-2">{el.totalExtraWork}</th>
            <th className=" p-2">{el.totalHours}</th>
            <th className=" p-2">{el.abcent}</th>
          </tr>
        );
      });

      return showws;
    });

    return (
      <table
        key={index}
        id={`mytabe${num}`}
        className=" my-3 min-w-full table-auto text-sm  w-200 md:w-full font-sans"
      >
        <thead>
          <tr></tr>
          <tr className="  w-full bg-[#8c929450] m-1 text-black/70 border">
            <th colspan="7" className=" text-center">
              {isArabicprop
                ? `من ${element.from} الي ${element.to}`
                : `from ${element.from} to ${element.to}`}
            </th>
          </tr>
          <tr>
            <th className=" p-2">{isArabicprop ? "الكود" : "Code"}</th>
            <th className=" p-2">{isArabicprop ? "الأسم" : "name"}</th>
            <th className=" p-2">{isArabicprop ? "الفرع" : "branch"}</th>
            <th className=" p-2">
              {isArabicprop ? "اجمالي التاخير" : "Total delay"}
            </th>
            <th className=" p-2">
              {isArabicprop ? "اجمالي الاضافي" : "Total over time"}
            </th>
            <th className=" p-2">
              {isArabicprop ? "اجمالي الساعات" : "Total Hours"}
            </th>
            <th className=" p-2">{isArabicprop ? "الغياب" : "Absence"}</th>
          </tr>
        </thead>
        <tbody>
          <tr></tr>
          {showdata}
        </tbody>
      </table>
    );
  });

  // -------------------------------------------------------------------

  //
  // Exporting
  //

  //pdf
  function printDocument() {
    const doc = new jsPDF();
    doc.setFont("Amiri-Regular");
    doc.text(
      90,
      10,
      isArabicprop ? "تقرير حضور و انصراف الاجمالي" : "total Attendance  Report"
    );
    dataToMap.map((e, index) => {
      let num = index;
      autoTable(doc, {
        pageBreak: "auto",
        styles: { font: "Amiri-Regular", halign: "right", fontSize: "6" },
        html: `#mytabe${num}`,
      });
    });

    doc.save("تقرير حضور و انصراف الاجمالي.pdf");
  }

  //Excel

  const headers = [
    { label: " ", key: "code" },
    { label: " ", key: "name" },
    { label: " ", key: "branch" },
    { label: " ", key: "late" },
    { label: " ", key: "over" },
    { label: " ", key: "hours" },
    { label: " ", key: "abs" },
  ];
  let cvsData = [];

  const cvsDatas = dataToMap.map((e, index) => {
    cvsData.push({
      code: "",
      name: isArabicprop ? `من ` : "from",
      branch: element.from,
      late: isArabicprop ? `الي ` : "to",
      over: element.to,
      hours: "",
      abs: "",
    });

    cvsData.push({
      code: isArabicprop ? `الكود` : "Code",
      name: isArabicprop ? `الاسم` : "Name",
      branch: isArabicprop ? `الفرع` : "Branch",
      late: isArabicprop ? `اجمالي التاخير` : "Total Delay",
      over: isArabicprop ? `اجمالي الاضافي` : "Total over time",
      hours: isArabicprop ? `اجمالي الساعات` : "Total Hours",
      abs: isArabicprop ? `الغياب` : "Absence",
    });

    let searched = e;
    if (name) {
      searched = searched.filter((el) => el[0].name.includes(name.trim()));
    }
    if (branch) {
      searched = searched.filter((el) => el[0].branch === branch);
    }
    const showdata = searched.map((ele) => {
      const showws = ele.map((el, indx) => {
        let delay = el.totalLate;
        let overtime = el.totalExtraWork;
        cvsData.push({
          code: el.code,
          name: el.name,
          branch: el.branch,
          late: el.totalLate,
          over: el.totalExtraWork,
          hours: el.totalHours,
          abs: el.abcent,
        });
      });

      return showws;
    });
  });

  // -------------------------------------------------------------------
  //
  //Label
  //
  const [showSearch, setShowSearch] = useState(true);
  const showSearchHandeller = (val) => {
    setShowSearch(val);
  };

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
          fileName="تقارير حضور و انصراف الإجمالي"
          pdf={printDocument}
          setsearch={showSearchHandeller}
          label={isArabicprop ? "حضور و انصراف الإجمالي" : "Total Attendance"}
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
                  <h4>{isArabicprop ? "الفرع :" : "Branch :"}</h4>
                  <select
                    className=" w-full p-2 border outline-none"
                    value={branch}
                    onChange={(e) => setBranch(e.target.value)}
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

      <div>{show}</div>
    </div>
  );
}
