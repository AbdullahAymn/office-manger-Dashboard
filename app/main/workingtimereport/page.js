"use client";
import Loader from "@/app/components/Loader";
import Label from "@/app/components/reports/Label";
import { isArabic } from "@/utils/langStore";
import { data } from "autoprefixer";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { fonty } from "@/utils/Amiri-Regular-normal (1)";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import Popup from "reactjs-popup";

export default function WorkingTimeReports() {
  const isArabicprop = useContext(isArabic).arabic;
  const [loader, setLoader] = useState(false);

  //show serach

  const [showSearch, setShowSearch] = useState(true);

  const showSearchHandeller = (val) => {
    setShowSearch(val);
  };

  // -------------------------------------------------------------------

  //
  //
  //Get Data
  //
  //

  const myHeaders = new Headers();
  const token = Cookies.get("token");
  myHeaders.append("Authorization", `Bearer ${token}\n`);
  const [dataToMap, setDataToMap] = useState([[], []]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);

  useEffect(() => {
    setLoader(true);
    fetch("https://backend2.dasta.store/api/auth/finallyReportgetTimeWork", {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setDataToMap(data);
          setData1(data[0]);
          setData2(data[1]);
          // console.log(data.days)
          setLoader(false);
        });
      }
    });
  }, []);

  // console.log(dataToMap);
  // -------------------------------------------------------------------

  //
  //Maping
  //

  // search

  const [name, setName] = useState();
  const [type, setType] = useState();
  const searchHandeller = (e) => {
    e.preventDefault();

    if (name) {
      let searched1 = dataToMap[0];
      let searched2 = dataToMap[1];
      searched1 = searched1.filter((e) => e.shift.name.includes(name.trim()));
      searched2 = searched2.filter((e) => e.shift.name.includes(name.trim()));

      setData1(searched1);
      setData2(searched2);
      // searched1.map(e => {
      //   console.log(e.shift.name.includes(name.trim()))
      // })
    }
  };

  // -------------------------------------------------------------------
  //

  const normalShow = data1.map((el, inx) => {
    let num = inx;

    const rows = el.data.map((elemen, index) => {
      let day = isArabicprop ? elemen.day.name : elemen.day.name_en;
      let in1 = "";
      let out1 = "";
      let in2 = "";
      let out2 = "";
      let in3 = "";
      let out3 = "";
      let in4 = "";
      let out4 = "";

      // console.log(elemen);

      elemen.work.map((element) => {
        if (element.name == "الورديه الاولي") {
          in1 = element.attendance;
          out1 = element.leaveTime;
        }
        if (element.name == "الورديه الثانيه") {
          in2 = element.attendance;
          out2 = element.leaveTime;
        }
        if (element.name == "الورديه الثالثه") {
          in3 = element.attendance;
          out3 = element.leaveTime;
        }
        if (element.name == "الورديه الرابعه") {
          in4 = element.attendance;
          out4 = element.leaveTime;
        }
      });

      return (
        <tr key={index} className=" p-2">
          <td className=" p-2 text-center">{day}</td>
          <td className=" p-2 text-center">{in1}</td>
          <td className=" p-2 text-center">{out1}</td>
          <td className=" p-2 text-center">{in2}</td>
          <td className=" p-2 text-center">{out2}</td>
          <td className=" p-2 text-center">{in3}</td>
          <td className=" p-2 text-center">{out3}</td>
          <td className=" p-2 text-center">{in4}</td>
          <td className=" p-2 text-center">{out4}</td>
        </tr>
      );
    });

    return (
      <>
        <table
          id={`mytabe0${num}`}
          key={inx}
          className="  my-3 min-w-full table-auto text-sm  w-200 md:w-full font-sans"
        >
          <thead>
            <tr></tr>
            <tr className="  w-full bg-[#393d3f50] m-1 text-black/70 border">
              <th colSpan={6}>{el.shift.name}</th>
              <th colSpan={5}>{el.shift.type_shift}</th>
            </tr>
            <tr>
              <th className=" p-2">{isArabicprop ? "اليوم" : "Day"} </th>
              <th colSpan={2} className=" p-2">
                {isArabicprop ? "الوردية الاولي" : "Shift one"}{" "}
              </th>
              <th colSpan={2} className=" p-2">
                {isArabicprop ? "الوردية الثانية" : "Shift Two"}{" "}
              </th>
              <th colSpan={2} className=" p-2">
                {isArabicprop ? "الوردية الثالثة" : "Shift Three"}{" "}
              </th>
              <th colSpan={2} className=" p-2">
                {isArabicprop ? "الوردية الرابعة" : "Shift Four"}{" "}
              </th>
            </tr>
            <tr>
              <th></th>
              <th className=" p-2">{isArabicprop ? "حضور" : "In"}</th>
              <th className=" p-2">{isArabicprop ? "إنصراف" : "Out"}</th>
              <th className=" p-2">{isArabicprop ? "حضور" : "In"}</th>
              <th className=" p-2">{isArabicprop ? "إنصراف" : "Out"}</th>
              <th className=" p-2">{isArabicprop ? "حضور" : "In"}</th>
              <th className=" p-2">{isArabicprop ? "إنصراف" : "Out"}</th>
              <th className=" p-2">{isArabicprop ? "حضور" : "In"}</th>
              <th className=" p-2">{isArabicprop ? "إنصراف" : "Out"}</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </table>
        <hr className=" bg-black/50 h-[1px]" />
      </>
    );
  });
  const openShow = data2.map((el, inx) => {
    let num = inx;

    const rows = el.data.map((elemen, index) => {
      // console.log(elemen);
      // let day = "";
      let day = isArabicprop ? elemen.name : elemen.name_en;
      let type = elemen.type;

      return (
        <tr key={index} className=" p-2">
          <td className=" p-2 text-center">{day}</td>
          <td className=" p-2 text-center">{type}</td>
        </tr>
      );
    });

    return (
      <>
        <table
          id={`mytabe1${num}`}
          key={inx}
          className="  my-3 min-w-full table-auto text-sm  w-200 md:w-full font-sans"
        >
          <thead>
            <tr></tr>
            <tr className="  w-full bg-[#393d3f50] m-1 text-black/70 border">
              <th>{el.shift.name}</th>
              <th>{el.shift.type_shift}</th>
            </tr>
            <tr>
              <th className=" p-2">{isArabicprop ? "اليوم" : "Day"} </th>
              <th className=" p-2">{isArabicprop ? "الحالة" : "Status"} </th>
            </tr>
          </thead>
          <tbody>
            <tr></tr>
            {rows}
          </tbody>
        </table>
        <hr className=" bg-black/50 h-[1px]" />
      </>
    );
  });
  // -------------------------------------------------------------------

  //
  //
  //search
  //
  //

  const resetHandeller = () => {
    setName("");
    setType("");

    setData1(dataToMap[0]);
    setData2(dataToMap[1]);
  };

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
      isArabicprop ? "تقرير أوقات العمل" : "Working Time Report"
    );
    dataToMap.map((e, index) => {
      let num = index;
      e.map((el, inx) => {
        let x = inx;
        autoTable(doc, {
          pageBreak: "auto",
          styles: { font: "Amiri-Regular", halign: "right", fontSize: "6" },
          html: `#mytabe${num}${x}`,
        });
      });
    });

    doc.save("تقرير أوقات العمل.pdf");
  }

  //
  //Excel
  const headers = [
    { label: " ", key: "day" },
    { label: " ", key: "statu" },
    { label: " ", key: "in1" },
    { label: " ", key: "out1" },
    { label: " ", key: "in2" },
    { label: " ", key: "out2" },
    { label: " ", key: "in3" },
    { label: " ", key: "out3" },
    { label: " ", key: "in4" },
    { label: " ", key: "out4" },
  ];

  let cvsData = [];

  dataToMap[0].map((e) => {
    cvsData.push({
      day: isArabicprop ? "الدوام" : "shift",
      statu: isArabicprop ? e.shift.name : e.shift.name_en,
      in1: "",
      out1: "",
      in2: isArabicprop ? "النوع" : "type",
      out2: e.shift.type_shift,
      in3: "",
      out3: "",
      in4: "",
      out4: "",
    });
    cvsData.push({
      day: "اليوم",
      statu: "الحالة",
      in1: "حضور الوردية 1",
      out1: "انصراف الوردية 1",
      in2: "حضور الوردية 2",
      out2: "انصراف الوردية 2",
      in3: "حضور الوردية 3",
      out3: "انصراف الوردية 3",
      in4: "حضور الوردية 4",
      out4: "انصراف الوردية 4",
    });

    e.data.map((ele) => {
      let in1 = "";
      let out1 = "";
      let in2 = "";
      let out2 = "";
      let in3 = "";
      let out3 = "";
      let in4 = "";
      let out4 = "";

      ele.work.map((el) => {
        if (el.name == "الورديه الاولي") {
          in1 = el.attendance;
          out1 = el.leaveTime;
        }
        if (el.name == "الورديه الثانيه") {
          in2 = el.attendance;
          out2 = el.leaveTime;
        }
        if (el.name == "الورديه الثالثه") {
          in3 = el.attendance;
          out3 = el.leaveTime;
        }
        if (el.name == "الورديه الرابعه") {
          in4 = el.attendance;
          out4 = el.leaveTime;
        }
      });

      cvsData.push({
        day: isArabicprop ? ele.day.name : ele.day.name_en,
        statu: ele.day.type,
        in1: in1,
        out1: out1,
        in2: in2,
        out2: out2,
        in3: in3,
        out3: out3,
        in4: in4,
        out4: out4,
      });
    });

    cvsData.push({
      day: "",
      statu: "",
      in1: "",
      out1: "",
      in2: "",
      out2: "",
      in3: "",
      out3: "",
      in4: "",
      out4: "",
    });
  });

  dataToMap[1].map((e) => {
    cvsData.push({
      day: isArabicprop ? "الدوام" : "shift",
      statu: isArabicprop ? e.shift.name : e.shift.name_en,
      in1: "",
      out1: "",
      in2: isArabicprop ? "النوع" : "type",
      out2: e.shift.type_shift,
      in3: "",
      out3: "",
      in4: "",
      out4: "",
    });
    cvsData.push({
      day: "اليوم",
      statu: "الحالة",
      in1: "",
      out1: "",
      in2: "",
      out2: "",
      in3: "",
      out3: "",
      in4: "",
      out4: "",
    });

    e.data.map((ele) => {
      cvsData.push({
        day: isArabicprop ? ele.name : ele.name_en,
        statu: ele.type,
        in1: "",
        out1: "",
        in2: "",
        out2: "",
        in3: "",
        out3: "",
        in4: "",
        out4: "",
      });
    });

    cvsData.push({
      day: "",
      statu: "",
      in1: "",
      out1: "",
      in2: "",
      out2: "",
      in3: "",
      out3: "",
      in4: "",
      out4: "",
    });
  });

  const cvs = dataToMap.map((e, index) => {
    e.map((el, indx) => {
      cvsData.push({
        name: el.shift.name,
        type: el.shift.type_shift,
      });
    });
  });

  return (
    <div className=" font-sans">
      <Popup open={loader}>
        <Loader />
      </Popup>
      <div>
        <Label
          headers={headers}
          data={cvsData}
          fileName="تقارير  أوقات العمل"
          pdf={printDocument}
          setsearch={showSearchHandeller}
          label={isArabicprop ? "أوقات العمل" : "Working Time"}
        />
      </div>
      {showSearch && (
        <div className=" relative w-full mt-4 p-2 border rounded-md">
          <i
            onClick={resetHandeller}
            className={`fa-solid fa-rotate-right hover:cursor-pointer absolute top-2 ${
              isArabicprop ? " left-2" : " right-2"
            }`}
          ></i>
          <form onSubmit={searchHandeller}>
            <div className=" w-full p-2 pb-10 md:pb-0 grid grid-cols-3 md:grid-cols-12">
              <div className=" col-span-3 md:mx-4">
                <h4>{isArabicprop ? "الاسم :" : "Name :"}</h4>
                <input
                  className=" w-full p-2 border outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder={isArabicprop ? "الإسم" : "Name"}
                />
              </div>
              <div className=" col-span-3 md:mx-4">
                <h4>{isArabicprop ? "النوع :" : "Type :"}</h4>
                <select
                  className=" w-full p-2 border outline-none"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option selected hidden>
                    Choose one
                  </option>
                  <option value="العادي">
                    {isArabicprop ? "عادي" : "Normal"}
                  </option>
                  <option value="المفتوح">
                    {isArabicprop ? "مفتوح" : "Open"}
                  </option>
                </select>
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
      )}

      {type !== "المفتوح" && <div>{normalShow}</div>}
      {type !== "العادي" && <div>{openShow}</div>}
    </div>
  );
}
