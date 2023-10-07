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

export default function DetailedAttendance() {
  const isArabicprop = useContext(isArabic).arabic;
  const numOfShifts = useContext(isArabic).numOfShifts;
  const re = useContext(isArabic).refresh;
  const setre = useContext(isArabic).setRefresh;

  useEffect(() => {
    setre(!re);
  }, []);
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
    // if (!token) {
    //    router.push("/");
    // }
    myHeaders.append("Authorization", `Bearer ${token}\n`);
    const formdata = new FormData();
    formdata.append("FromDay", from);
    formdata.append("ToDay", to);
    if (!token) {
      router.push("/");
    }
    await fetch(
      "https://backend2.dasta.store/api/auth/finallyReportdetailsDay",
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
        let in1 = "";
        let out1 = "";
        let in2 = "";
        let out2 = "";
        let in3 = "";
        let out3 = "";
        let in4 = "";
        let out4 = "";
        let abence = isArabicprop ? "لا" : "No";

        if (el.Attedance.length > 0) {
          el.Attedance.map((element) => {
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
        if (el.leave.length > 0) {
          el.leave.map((element) => {
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
        if (el.abcent.length > 0) {
          abence = isArabicprop ? "غائب" : "Yes";
        }

        return (
          <tr key={indx}>
            <th className=" p-2">{el.code}</th>
            <th className=" p-2">{isArabicprop ? el.name : el.name_en}</th>
            <th className=" p-2">{el.branch}</th>
            <th className=" p-2">{in1}</th>
            <th className=" p-2">{out1}</th>
            {numOfShifts > 1 && <th className=" p-2">{in2}</th>}
            {numOfShifts > 1 && <th className=" p-2">{out2}</th>}
            {numOfShifts > 2 && <th className=" p-2">{in3}</th>}
            {numOfShifts > 2 && <th className=" p-2">{out3}</th>}
            {numOfShifts > 3 && <th className=" p-2">{in4}</th>}
            {numOfShifts > 3 && <th className=" p-2">{out4}</th>}

            <th className=" p-2">{el.totalLate}</th>
            <th className=" p-2">{el.totalExtraWork}</th>
            <th className=" p-2">{abence}</th>
          </tr>
        );
      });

      return showws;
    });

    let n1;

    if (numOfShifts == 1) {
      n1 = 8;
    }
    if (numOfShifts == 2) {
      n1 = 10;
    }
    if (numOfShifts == 3) {
      n1 = 12;
    }
    if (numOfShifts == 4) {
      n1 = 14;
    }

    return (
      <table
        key={index}
        id={`mytabe${num}`}
        className=" my-3 min-w-full table-auto text-sm  w-200 md:w-full font-sans"
      >
        <thead>
          <tr></tr>
          <tr className="  w-full bg-[#8c929450] m-1 text-black/70 border">
            <th colspan={n1} className=" text-center">
              {isArabicprop
                ? `من ${element.from} الي ${element.to}`
                : `from ${element.from} to ${element.to}`}
            </th>
          </tr>
          <tr className=" bg-white p-2 border text-black/70">
            <th className=" p-2">{isArabicprop ? "الكود" : "Code"}</th>
            <th className=" p-2">{isArabicprop ? "الأسم" : "name"}</th>
            <th className=" p-2">{isArabicprop ? "الفرع" : "branch"}</th>
            <th colspan="2" className=" p-2">
              {isArabicprop ? "الوردية 1" : "shift 1"}
            </th>
            {numOfShifts > 1 && (
              <th colspan="2" className=" p-2">
                {isArabicprop ? "الوردية 2" : "shift 2"}
              </th>
            )}
            {numOfShifts > 2 && (
              <th colspan="2" className=" p-2">
                {isArabicprop ? "الوردية 3" : "shift 3"}
              </th>
            )}
            {numOfShifts > 3 && (
              <th colspan="2" className=" p-2">
                {isArabicprop ? "الوردية 4" : "shift 4"}
              </th>
            )}
            <th className=" p-2">{isArabicprop ? "التأخير" : "delay"}</th>
            <th className=" p-2">{isArabicprop ? "الإضافي" : "over time"}</th>
            <th className=" p-2">{isArabicprop ? "الغياب" : "Absence"}</th>
          </tr>
          <tr className="bg-white p-2 border text-black/70">
            <th className=" p-2"></th>
            <th className=" p-2"></th>
            <th className=" p-2"></th>
            <th className=" p-2">{isArabicprop ? "حضور" : "in"}</th>
            <th className=" p-2">{isArabicprop ? "انصراف" : "out"}</th>
            {numOfShifts > 1 && (
              <th className=" p-2">{isArabicprop ? "حضور" : "in"}</th>
            )}
            {numOfShifts > 1 && (
              <th className=" p-2">{isArabicprop ? "انصراف" : "out"}</th>
            )}
            {numOfShifts > 2 && (
              <th className=" p-2">{isArabicprop ? "حضور" : "in"}</th>
            )}
            {numOfShifts > 2 && (
              <th className=" p-2">{isArabicprop ? "انصراف" : "out"}</th>
            )}
            {numOfShifts > 3 && (
              <th className=" p-2">{isArabicprop ? "حضور" : "in"}</th>
            )}
            {numOfShifts > 3 && (
              <th className=" p-2">{isArabicprop ? "انصراف" : "out"}</th>
            )}

            <th className=" p-2"></th>
            <th className=" p-2"></th>
            <th className=" p-2"></th>
          </tr>
        </thead>
        <tbody>{showdata}</tbody>
      </table>
    );
  });

  // -------------------------------------------------------------------

  //
  //Exporting
  //

  //pdf

  function printDocument() {
    const doc = new jsPDF();
    doc.setFont("Amiri-Regular");
    doc.text(
      90,
      10,
      isArabicprop
        ? "تقرير حضور و انصراف التفصيلي"
        : "Detailed Attendance  Report"
    );
    dataToMap.map((e, index) => {
      let num = index;
      autoTable(doc, {
        pageBreak: "auto",
        styles: { font: "Amiri-Regular", halign: "right", fontSize: "6" },
        html: `#mytabe${num}`,
      });
    });

    doc.save("تقرير حضور و انصراف التفصيلي.pdf");
  }

  //Excel

  const headers = [
    { label: " ", key: "code" },
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
    { label: " ", key: "late" },
    { label: " ", key: "over" },
    { label: " ", key: "abence" },
  ];
  let cvsData = [];

  const cvsDatas = dataToMap.map((e, index) => {
    cvsData.push({
      code: "",
      name: "",
      branch: "",
      in1: "",
      out1: isArabicprop ? `من ` : "from",
      in2: element.from,
      out2: isArabicprop ? `الي ` : "to",
      in3: element.to,
      out3: "",
      in4: "",
      out4: "",
      late: "",
      over: "",
      abence: "",
    });

    cvsData.push({
      code: isArabicprop ? `الكود` : "Code",
      name: isArabicprop ? `الاسم` : "Name",
      branch: isArabicprop ? `الفرع` : "Branch",
      in1: isArabicprop ? `حضور الوردية 1` : "In Shift 1",
      out1: isArabicprop ? `انصراف الوردية 1` : "Out Shift 1",
      in2: isArabicprop ? `حضور الوردية 2` : "In Shift 2",
      out2: isArabicprop ? `انصراف الوردية 2` : "Out Shift 2",
      in3: isArabicprop ? `حضور الوردية 3` : "In Shift 3",
      out3: isArabicprop ? `انصراف الوردية 3` : "Out Shift 3",
      in4: isArabicprop ? `حضور الوردية 4` : "In Shift 4",
      out4: isArabicprop ? `انصراف الوردية 4` : "Out Shift 4",
      late: isArabicprop ? "التاخير" : "Delay",
      over: isArabicprop ? "الاضافي" : "Over time",
      abence: isArabicprop ? "الغياب" : "Absence",
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
        let in1 = "";
        let out1 = "";
        let in2 = "";
        let out2 = "";
        let in3 = "";
        let out3 = "";
        let in4 = "";
        let out4 = "";
        let abence = isArabicprop ? "لا" : "No";

        if (el.Attedance.length > 0) {
          el.Attedance.map((element) => {
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
        if (el.leave.length > 0) {
          el.leave.map((element) => {
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
        if (el.abcent.length > 0) {
          abence = isArabicprop ? "غائب" : "Yes";
        }
        let delay = el.totalLate;
        let overtime = el.totalExtraWork;
        cvsData.push({
          code: el.code,
          name: el.name,
          branch: el.branch,
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
          fileName="تقارير حضور و انصراف التفصيلي"
          pdf={printDocument}
          setsearch={showSearchHandeller}
          label={
            isArabicprop ? "حضور و انصراف التفصيلي" : "Detailed Attendance"
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

      <div>{show}</div>
    </div>
  );
}
