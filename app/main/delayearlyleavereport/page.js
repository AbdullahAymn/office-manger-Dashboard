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
import { elements } from "chart.js";

export default function DelayEarlyLeaveReport() {
  const isArabicprop = useContext(isArabic).arabic;
  const [loader, setLoader] = useState(false);
  const refrshopt = useContext(options).refresh;
  const setrefrshopt = useContext(options).setRefresh;
  useEffect(() => {
    setrefrshopt(!refrshopt);
  }, []);

  const workingTimeOptions = useOptions(useContext(options).workingTime);

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
  const [shift, setShift] = useState("");
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
    await fetch("https://backend2.dasta.store/api/auth/earlyleaveAndLate", {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    }).then((res) => {
      if (res.status === 200) {
        // let dataa = JSON.stringify(res);
        // console.log(res.json())
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

  // console.log(dataToMap);

  const resetHandeller = () => {
    setName("");
    setCode("");
    setShift("");
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

    let searched = e;
    if (name) {
      searched = searched.filter((e) => e.name.includes(name.trim()));
    }
    if (code) {
      searched = searched.filter((e) => e.code == code);
    }
    if (shift) {
      searched = searched.filter((e) => e.shift == shift);
    }

    let show = searched.map((el) => {
      let in1 = "";
      let out1 = "";
      let in2 = "";
      let out2 = "";
      let in3 = "";
      let out3 = "";
      let in4 = "";
      let out4 = "";

      let absent = "";

      if (el.Late.length) {
        el.Late.map((element) => {
          if (element.shift == "الورديه الاولي") {
            in1 = element.day.substr(10, 6)
          }
          if (element.shift == "الورديه الثانيه") {
            in2 = element.day.substr(10, 6)
          }
          if (element.shift == "الورديه الثالثه") {
            in3 = element.day.substr(10, 6)
          }
          if (element.shift ==  "الورديه الرابعه") {
            in4 = element.day.substr(10, 6)
          }
        })
        
      }
      if (el.EarlyLeave.length) {
        el.EarlyLeave.map((element) => {
          if (element.shift == "الورديه الاولي") {
            out1 = element.day.substr(10, 6)
          }
          if (element.shift == "الورديه الثانيه") {
            out2 = element.day.substr(10, 6)
          }
          if (element.shift == "الورديه الثالثه") {
            out3 = element.day.substr(10, 6)
          }
          if (element.shift ==  "الورديه الرابعه") {
            out4 = element.day.substr(10, 6)
          }
        })
        
      }

      if (el.abcent.length) {
        el.abcent.map((element) => {
          absent = element.comment
        })
      }
      
      return (
        <tr className=" grid-cols-11 border">
          <td className=" col-span-1 text-center p-2">{el.code}</td>
          <td className=" col-span-3 text-center p-2">{el.name}</td>
          <td className=" col-span-3 text-center p-2">{el.shift}</td>
          <td className=" col-span-2 text-center p-2">{el.data}</td>
          <td className=" col-span-2 text-center  p-2">{in1}</td>
          <td className=" col-span-2 text-center  p-2">{out1}</td>
          <td className=" col-span-2 text-center  p-2">{in2}</td>
          <td className=" col-span-2 text-center  p-2">{out2}</td>
          <td className=" col-span-2 text-center  p-2">{in3}</td>
          <td className=" col-span-2 text-center  p-2">{out3}</td>
          <td className=" col-span-2 text-center  p-2">{in4}</td>
          <td className=" col-span-2 text-center  p-2">{out4}</td>
          <td className=" col-span-2 text-center  p-2">{absent}</td>
        </tr>
      );
    });

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
              <th colspan={13} className=" col-span-11">
                {isArabicprop
                  ? `الفترة من ${from} الي ${to}`
                  : `From ${from} to ${to}`}
              </th>
            </tr>
            <tr className="bg-white grid-cols-11 border text-black/70">
              <th className=" col-span-1 p-2">
                {isArabicprop ? "الكود" : "Code"}
              </th>
              <th className=" col-span-3 p-2">
                {isArabicprop ? "الأسم" : "Name"}
              </th>
              <th className=" col-span-3 p-2">
                {isArabicprop ? "الدوام" : "Shift"}
              </th>
              <th className=" col-span-2 p-2">
                {isArabicprop ? "التاريخ" : "Date"}
              </th>
              <th colSpan={2} className=" col-span-2  p-2">
                {isArabicprop ? "الوردية الاولي" : "Shift one"}
              </th>
              <th colSpan={2} className=" col-span-2  p-2">
                {isArabicprop ? "الوردية الثانية" : "Shift two"}
              </th>
              <th colSpan={2} className=" col-span-2  p-2">
                {isArabicprop ? "الوردية الثالثة" : "Shift three"}
              </th>
              <th colSpan={2} className=" col-span-2  p-2">
                {isArabicprop ? "الوردية الرابعة" : "Shift four"}
              </th>
              <th className=" col-span-2  p-2">
                {isArabicprop ? "الغياب" : "Abence"}
              </th>
            </tr>
            <tr className="  border text-black/70">
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th className=" p-2">{isArabicprop ? "حضور" : "In"}</th>
              <th>{isArabicprop ? "إنصراف" : "Out"}</th>
              <th>{isArabicprop ? "حضور" : "In"}</th>
              <th>{isArabicprop ? "إنصراف" : "Out"}</th>
              <th>{isArabicprop ? "حضور" : "In"}</th>
              <th>{isArabicprop ? "إنصراف" : "Out"}</th>
              <th>{isArabicprop ? "حضور" : "In"}</th>
              <th>{isArabicprop ? "إنصراف" : "Out"}</th>
              <th></th>
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
  //
  // Exporting
  //

  const printDocument = () => {
    const doc = new jsPDF();
    doc.setFont("Amiri-Regular");
    doc.text(90, 10, isArabicprop ? "تقرير التاخير والانصراف المبكر" : "Delay and Early Leave Report");
    dataToMap.map((e, index) => {
      let num = index;
      autoTable(doc, {
        pageBreak: "auto",
        styles: { font: "Amiri-Regular", halign: "right", fontSize: "6" },
        html: `#mytabe${num}`,
      });
    });

    doc.save("تقرير التاخير والانصراف المبكر.pdf");
  };

  //Excel

  const headers = [
    { label: `الكود`, key: "code" },
    { label: "الاسم", key: "name" },
    { label: "الدوام", key: "shift" },
    { label: "التاريخ", key: "date" },
    { label: "حضور الوردية 1", key: "in1" },
    { label: "انصراف الورية 1", key: "out1" },
    { label: "حضور الوردية 2", key: "in2" },
    { label: "انصراف الورية 2", key: "out2" },
    { label: "حضور الوردية 3", key: "in3" },
    { label: "انصراف الورية 3", key: "out3" },
    { label: "حضور الوردية 3", key: "in4" },
    { label: "انصراف الورية 3", key: "out4" },
    { label: "الغياب", key: "abs" },
  ];
  let cvsData = [];

  const cvsDatas = dataToMap.map((e, index) => {
    e.map((e) => {

      let in1 = "";
      let out1 = "";
      let in2 = "";
      let out2 = "";
      let in3 = "";
      let out3 = "";
      let in4 = "";
      let out4 = "";

      let absent = "";

      if (e.Late.length) {
        e.Late.map((element) => {
          if (element.shift == "الورديه الاولي") {
            in1 = element.day.substr(10, 6)
          }
          if (element.shift == "الورديه الثانيه") {
            in2 = element.day.substr(10, 6)
          }
          if (element.shift == "الورديه الثالثه") {
            in3 = element.day.substr(10, 6)
          }
          if (element.shift ==  "الورديه الرابعه") {
            in4 = element.day.substr(10, 6)
          }
        })
        
      }
      if (e.EarlyLeave.length) {
        e.EarlyLeave.map((element) => {
          if (element.shift == "الورديه الاولي") {
            out1 = element.day.substr(10, 6)
          }
          if (element.shift == "الورديه الثانيه") {
            out2 = element.day.substr(10, 6)
          }
          if (element.shift == "الورديه الثالثه") {
            out3 = element.day.substr(10, 6)
          }
          if (element.shift ==  "الورديه الرابعه") {
            out4 = element.day.substr(10, 6)
          }
        })
        
      }

      if (e.abcent.length) {
        e.abcent.map((element) => {
          absent = element.comment
        })
      }

      cvsData.push({
        code: e.code,
        name: e.name,
        shift: e.shift,
        date: e.data,
        in1: in1,
        out1: out1,
        in2: in2,
        out2: out2,
        in3: in3,
        out3: out3,
        in4: in4,
        out4: out4,
        abs: absent,
      });
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
          fileName="تقارير الحضور والانصراف بالفروع"
          pdf={printDocument}
          setsearch={showSearchHandeller}
          label={
            isArabicprop ? "التاخير والانصراف المبكر" : "Delay and Early Leave"
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
                  <h4>{isArabicprop ? "الدوام" : " Working Time"}</h4>
                  <select
                    value={shift}
                    required
                    onChange={(e) => setShift(e.target.value)}
                    className=" rounded-md p-2 border outline-none w-full"
                  >
                    <option selected hidden>
                      Choose one
                    </option>
                    {workingTimeOptions}
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
      <div>{dataShow}</div>
    </div>
  );
}
