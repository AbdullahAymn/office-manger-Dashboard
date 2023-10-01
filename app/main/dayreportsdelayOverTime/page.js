"use client";
import Loader from "@/app/components/Loader";
import Label from "@/app/components/reports/Label";
import { isArabic } from "@/utils/langStore";
import { options } from "@/utils/optionStore";
import useOptions from "@/utils/useOptions";
import Cookies from "js-cookie";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { fonty } from "@/utils/Amiri-Regular-normal (1)";
import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Popup from "reactjs-popup";

export default function DayReports() {
  const isArabicprop = useContext(isArabic).arabic;
  const [loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState(false);

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
    myHeaders.append("Authorization", `Bearer ${token}\n`);
    const formdata = new FormData();
    formdata.append("FromDay", from);
    formdata.append("ToDay", to);
    // if (!token) {
    //   window.location.reload();
    // }
    await fetch(
      "https://backend2.dasta.store/api/auth/finallyReportgetstatusDay",
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
          setDataToMap(data.days);
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

  const dataShow = dataToMap.map((e, index) => {
    let searched = element.data[index];
    let num = index;

    const day = new Date(from);
    day.setDate(day.getDate() + index);

    let date = day.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    if (name) {
      searched = searched.filter((e) => e.name.includes(name.trim()));
    }
    if (branch) {
      searched = searched.filter((e) => e.branch === branch);
    }

    let show = searched.map((e) => {
      //   let in1 = "";
      //   let out1 = "";
      //   let in2 = "";
      //   let out2 = "";
      //   let in3 = "";
      //   let out3 = "";
      //   let in4 = "";
      //   let out4 = "";
      let abence = isArabicprop ? "لا" : "No";

      //   if (e.Attedance.length > 0) {
      //     e.Attedance.map((element) => {
      //       if (element.shift === "الورديه الاولي") {
      //         in1 = element.day.substr(11, 5);
      //       }
      //       if (element.shift === "الورديه الثانيه") {
      //         in2 = element.day.substr(11, 5);
      //       }
      //       if (element.shift === "الورديه الثالثه") {
      //         in3 = element.day.substr(11, 5);
      //       }
      //       if (element.shift === "الورديه الرابعه") {
      //         in4 = element.day.substr(11, 5);
      //       }
      //     });
      //   }
      //   if (e.leave.length > 0) {
      //     e.leave.map((element) => {
      //       if (element.shift === "الورديه الاولي") {
      //         out1 = element.day.substr(11, 5);
      //       }
      //       if (element.shift === "الورديه الثانيه") {
      //         out2 = element.day.substr(11, 5);
      //       }
      //       if (element.shift === "الورديه الثالثه") {
      //         out3 = element.day.substr(11, 5);
      //       }
      //       if (element.shift === "الورديه الرابعه") {
      //         out4 = element.day.substr(11, 5);
      //       }
      //     });
      //   }

      if (e.abcent.length > 0) {
        abence = isArabicprop ? "غائب" : "Yes";
      }

      let delay1 = "";
      let overtime1 = "";
      let delay2 = "";
      let overtime2 = "";
      let delay3 = "";
      let overtime3 = "";
      let delay4 = "";
      let overtime4 = "";

      if (e.late.length > 0) {
        e.late.map((element) => {
          if (element.shift === "الورديه الاولي") {
            delay1 = element.day.substr(11, 5);
          }
          if (element.shift === "الورديه الثانيه") {
            delay2 = element.day.substr(11, 5);
          }
          if (element.shift === "الورديه الثالثه") {
            delay3 = element.day.substr(11, 5);
          }
          if (element.shift === "الورديه الرابعه") {
            delay4 = element.day.substr(11, 5);
          }
        });
      }
      if (e.ExtraWork.length > 0) {
        e.ExtraWork.map((element) => {
          if (element.shift === "الورديه الاولي") {
            overtime1 = element.day.substr(11, 5);
          }
          if (element.shift === "الورديه الثانيه") {
            overtime2 = element.day.substr(11, 5);
          }
          if (element.shift === "الورديه الثالثه") {
            overtime3 = element.day.substr(11, 5);
          }
          if (element.shift === "الورديه الرابعه") {
            overtime4 = element.day.substr(11, 5);
          }
        });
      }

      return (
        <tr>
          <th className=" p-2">{e.name}</th>
          <th className=" p-2">{e.branch}</th>
          <th className=" p-2">{delay1}</th>
          <th className=" p-2">{overtime1}</th>
          <th className=" p-2">{delay2}</th>
          <th className=" p-2">{overtime2}</th>
          <th className=" p-2">{delay3}</th>
          <th className=" p-2">{overtime3}</th>
          <th className=" p-2">{delay4}</th>
          <th className=" p-2">{overtime4}</th>

          {/* <th className=" p-2">{e.totalLate}</th>
          <th className=" p-2">{e.totalExtraWork}</th> */}
          <th className=" p-2">{abence}</th>
        </tr>
      );
    });

    return (
      <>
        <table
          id={`mytabe${num}`}
          className=" my-3 min-w-full table-auto text-sm  w-200 md:w-full font-sans"
        >
          <thead>
            <tr></tr>
            <tr className="  w-full bg-[#8c929450] m-1 text-black/70 border">
              <th colspan="3" className=" p-1">
                {isArabicprop ? `اليوم : ${e}` : ` Day : ${e}`}
              </th>
              <th colspan="4" className=" p-1">
                {date}
              </th>
              <th colspan="6">
                {" "}
                {isArabicprop
                  ? `الفترة من ${element.from} الي ${element.to}`
                  : `From ${element.from} to ${element.to}`}
              </th>
            </tr>
            <tr className="bg-white p-2 border text-black/70">
              <th className=" p-2">{isArabicprop ? "الأسم" : "name"}</th>
              <th className=" p-2">{isArabicprop ? "الفرع" : "branch"}</th>
              <th colspan="2" className=" p-2">
                {isArabicprop ? "الوردية 1" : "shift 1"}
              </th>
              <th colspan="2" className=" p-2">
                {isArabicprop ? "الوردية 2" : "shift 2"}
              </th>
              <th colspan="2" className=" p-2">
                {isArabicprop ? "الوردية 3" : "shift 3"}
              </th>
              <th colspan="2" className=" p-2">
                {isArabicprop ? "الوردية 4" : "shift 4"}
              </th>
              {/* <th className=" p-2">{isArabicprop ? "التأخير" : "delay"}</th>
              <th className=" p-2">{isArabicprop ? "الإضافي" : "over time"}</th> */}
              <th className=" p-2">{isArabicprop ? "الغياب" : "Absence"}</th>
            </tr>
            <tr className="bg-white p-2 border text-black/70">
              <th className=" p-2"></th>
              <th className=" p-2"></th>
              <th className=" p-2">{isArabicprop ? "تأخير" : "Delay"}</th>
              <th className=" p-2">{isArabicprop ? "اضافي" : "over time"}</th>
              <th className=" p-2">{isArabicprop ? "تأخير" : "Delay"}</th>
              <th className=" p-2">{isArabicprop ? "اضافي" : "over time"}</th>
              <th className=" p-2">{isArabicprop ? "تأخير" : "Delay"}</th>
              <th className=" p-2">{isArabicprop ? "اضافي" : "over time"}</th>
              <th className=" p-2">{isArabicprop ? "تأخير" : "Delay"}</th>
              <th className=" p-2">{isArabicprop ? "اضافي" : "over time"}</th>

              {/* <th className=" p-2"></th>
              <th className=" p-2"></th> */}
              <th className=" p-2"></th>
            </tr>
          </thead>
          <tbody>{show}</tbody>
        </table>
        <hr className="h-1 bg-black" />
      </>
    );
  });

  // -------------------------------------------------------------------
  //
  // exporting
  //

  //Pdf

  function printDocument() {
    const doc = new jsPDF();
    doc.setFont("Amiri-Regular");
    doc.text(90, 10, isArabicprop ? "تقرير حالة اليوم" : "Day Status Report");
    dataToMap.map((e, index) => {
      let num = index;
      autoTable(doc, {
        pageBreak: "auto",
        styles: { font: "Amiri-Regular", halign: "right", fontSize: "6" },
        html: `#mytabe${num}`,
      });
    });

    doc.save("تقرير حالة اليوم.pdf");
  }

  // Excel

  const headers = [
    { label: " ", key: "name" },
    { label: " ", key: "branch" },
    { label: " ", key: "in1" },
    { label: " ", key: "out1" },
    { label: " ", key: "in2" },
    { label: " ", key: "out2" },
    { label: " ", key: "in3" },
    { label: " ", key: "out3" },
    { label: " ", key: "in4" },
    { label: " ", key: "out4" },
    // { label: " ", key: "late" },
    // { label: " ", key: "over" },
    { label: " ", key: "abence" },
  ];

  let cvsData = [];

  const cvsDatas = dataToMap.map((e, index) => {
    const el = element;

    const day = new Date(from);
    day.setDate(day.getDate() + index);

    let date = day.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    cvsData.push({
      name: isArabicprop ? `اليوم ` : "day",
      branch: e,
      in1: "",
      out1: isArabicprop ? `من ` : "from",
      in2: el.from,
      out2: isArabicprop ? `الي ` : "to",
      in3: el.to,
      out3: "",
      in4: isArabicprop ? `التاريخ ` : "date",
      out4: date,
    //   late: "",
    //   over: "",
      abence: "",
    });
    cvsData.push({
      name: isArabicprop ? `الاسم` : "Name",
      branch: isArabicprop ? `الفرع` : "Branch",
      in1: isArabicprop ? `تأخير الوردية 1` : "Delay Shift 1",
      out1: isArabicprop ? `اضافي الوردية 1` : "over time Shift 1",
      in2: isArabicprop ? `تأخير الوردية 2` : "Delay Shift 2",
      out2: isArabicprop ? `اضافي الوردية 2` : "over time Shift 2",
      in3: isArabicprop ? `تأخير الوردية 3` : "Delay Shift 3",
      out3: isArabicprop ? `اضافي الوردية 3` : "over time Shift 3",
      in4: isArabicprop ? `تأخير الوردية 4` : "Delay Shift 4",
      out4: isArabicprop ? `اضافي الوردية 4` : "over time Shift 4",
    //   late: isArabicprop ? "التاخير" : "Delay",
    //   over: isArabicprop ? "الاضافي" : "Over time",
      abence: isArabicprop ? "الغياب" : "Absence",
    });

    el.data[index].map((e) => {
      let in1 = "";
      let out1 = "";
      let in2 = "";
      let out2 = "";
      let in3 = "";
      let out3 = "";
      let in4 = "";
      let out4 = "";
      let abence = isArabicprop ? "لا" : "No";

      if (e.late.length > 0) {
        e.late.map((element) => {
          if (element.shift === "الورديه الاولي") {
            in1 = element.day.substr(11, 5);
          }
          if (element.shift === "الورديه الثانيه") {
            in2 = element.day.substr(11, 5);
          }
          if (element.shift === "الورديه الثالثه") {
            in3 = element.day.substr(11, 5);
          }
          if (element.shift === "الورديه الرابعه") {
            in4 = element.day.substr(11, 5);
          }
        });
      }
      if (e.ExtraWork.length > 0) {
        e.ExtraWork.map((element) => {
          if (element.shift === "الورديه الاولي") {
            out1 = element.day.substr(11, 5);
          }
          if (element.shift === "الورديه الثانيه") {
            out2 = element.day.substr(11, 5);
          }
          if (element.shift === "الورديه الثالثه") {
            out3 = element.day.substr(11, 5);
          }
          if (element.shift === "الورديه الرابعه") {
            out4 = element.day.substr(11, 5);
          }
        });
      }

      if (e.abcent.length > 0) {
        abence = isArabicprop ? "غائب" : "Yes";
      }

      let delay = e.totalLate;
      let overtime = e.totalExtraWork;
      // if (e.late.length > 0) {
      //   delay = e.late[0].late;
      // }
      // if (e.ExtraWork.length > 0) {
      //   overtime = e.ExtraWork[0].exreaWork;
      // }
      cvsData.push({
        name: e.name,
        branch: e.branch,
        in1: in1,
        out1: out1,
        in2: in2,
        out2: out2,
        in3: in3,
        out3: out3,
        in4: in4,
        out4: out4,
        late: delay,
        over: overtime,
        // late: e.totalLate,
        // over: e.totalExtraWork,
        abence: abence,
      });
    });

    cvsData.push({
      name: "",
      branch: "",
      in1: "",
      out1: "",
      in2: "",
      out2: "",
      in3: "",
      out3: "",
      in4: "",
      out4: "",
    //   late: "",
    //   over: "",
      abence: "",
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
          fileName="تقارير حالة اليوم"
          pdf={printDocument}
          setsearch={showSearchHandeller}
          label={
            isArabicprop
              ? " حالة اليوم (تاخير و اضافي)"
              : "Day Status (Delay and Over Time)"
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

      {/* ************************************************************* */}
      {/*  */}
      {/* Tabels */}
      {/*  */}
      <div>{dataShow}</div>
    </div>
  );
}
