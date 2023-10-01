"use client";
import { isArabic } from "@/utils/langStore";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Cookies from "js-cookie";

export default function PopUp(props) {
  const isArabicprop = useContext(isArabic).arabic;
  const [loading, setloading] = useState(false);
  //
  //get
  //

  const employeeElement = props.employee || {};

  const [employee, setEmployee] = useState(employeeElement.nameEmployee);
  const [date, setDate] = useState(employeeElement.date);
  const [type, setType] = useState(employeeElement.comment);
  const [code, setCode] = useState(employeeElement.codeEmployee);
  const [shift, setShift] = useState(employeeElement.shift);

  //
  //
  //Search
  //
  //

  const [employess, setEmployeess] = useState([]);
  const token = Cookies.get("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}\n`);

  useEffect(() => {
    fetch(`https://backend2.dasta.store/api/auth/basicInfoFetchemployee`, {
      method: "GET",
      headers: myHeaders,
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setEmployeess(data);
        });
      }
    });
  }, []);

  const employeeHandeller = (e) => {
    setEmployee(e.target.value);
    let val = e.target.value;
    let searched = employess;
    searched = searched.filter((el) => el.name_ar === val);
    if (searched.length > 0) {
      setCode(searched[0].code);
    } else {
      setCode();
    }
  };
  const codeHandeller = (e) => {
    setCode(e.target.value);
    let val = e.target.value;
    let searched = employess;
    searched = searched.filter((el) => el.code == val);
    if (searched.length > 0) {
      setEmployee(searched[0].name_ar);
    } else {
      setEmployee("");
    }
  };

  const selecteItems = employess.map((e, index) => (
    <option key={index} value={e.name_ar}>
      {e.name_ar}
    </option>
  ));

  //
  // Add
  //

  const formdata = new FormData();
  formdata.append("nameEmployee", employee);
  formdata.append("comment", type);
  formdata.append("date", date);
  formdata.append("shift", shift);
  formdata.append("codeEmployee", code);

  const addHandeller = () => {
    if (!token) {
      window.location.reload();
    }
    setloading(true);
    fetch(`https://backend2.dasta.store/api/auth/addPermision`, {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    }).then((res) => {
      if (res.status === 200) {
        props.refresh();
      }
    });
  };


  //edit
  const editHandeller = () => {
    if (!token) {
      window.location.reload();
    }
    setloading(true);
    fetch(`https://backend2.dasta.store/api/auth/updatePermision/${employeeElement.id}`, {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    }).then((res) => {
      if (res.status === 200) {
        props.refresh();
      }
    });
}


  return (
    <div className=" h-screen w-full  overflow-auto md:pb-0 md:overflow-hidden flex items-center justify-center">
      <div className=" font-sans mb-12 md:mb-0 rounded-md bg-white w-full  md:w-3/4 getin">
        <div className=" p-4 text-xl bg-sky-400 rounded-t-md text-white text-center">
          <h1>
            {props.edit
              ? `${isArabicprop ? "تعديل" : "Edit"}`
              : `${isArabicprop ? "اضافة" : "Add"}`}
          </h1>
        </div>
        <div className=" grid grid-cols-6 md:h-auto md:overflow-y-hidden md:grid-cols-12 items-center mb-2">
          <div className=" w-full col-span-6 p-2">
            <h4>{isArabicprop ? "الموظف" : "Employee"}</h4>
            <select
              title="choose"
              className=" w-full bg-white outline-none p-3 rounded border "
              value={employee}
              onChange={employeeHandeller}
            >
              <option hidden selected disabled>
                Choose one
              </option>
              <option></option>
              {selecteItems}
            </select>
          </div>
          <div className=" col-span-6 w-full p-2">
            <h4>{isArabicprop ? "الكود" : "Code"}</h4>
            <input
              className=" w-full outline-none rounded border p-3"
              value={code}
              onChange={codeHandeller}
              type="number"
            ></input>
          </div>
        </div>
        <div className=" grid grid-cols-6 md:grid-cols-12 items-start mb-2">
          <div className=" w-full col-span-6 p-2">
            <h4>{isArabicprop ? "نوع الاذن" : "Permission Type"}</h4>
            <select
              id="demo-simple-select"
              className=" w-full bg-white outline-none p-3 rounded border"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option hidden selected disabled>
                Choose one
              </option>
              <option value="حضور متاخر">حضور متاخر</option>
              <option value="انصراف مبكر">انصراف مبكر</option>
            </select>
            <div>
              {/* {type === "Temporary" && (
                <div className=" md:flex items-center justify-center">
                  <div className=" mx-1 md:mx-4">
                    <h6>{isArabicprop ? "وقت الحضور" : "Time in"}</h6>
                    <input
                      value={temotimeIn}
                      onChange={(e) => setTemoIn(e.target.value)}
                      className=" w-full border outline-none p-3"
                      type="time"
                    ></input>
                  </div>
                  <div className=" mx-1 md:mx-4">
                    <h6>{isArabicprop ? "وقت الإنصراف" : "Time out"}</h6>
                    <input
                      value={temotimeOut}
                      onChange={(e) => setTemoOut(e.target.value)}
                      className=" w-full border outline-none p-3"
                      type="time"
                    ></input>
                  </div>
                </div>
              )}
              {type === "Late" && (
                <div className=" flex items-center justify-center">
                  <div className=" mx-1 md:mx-4">
                    <h6>{isArabicprop ? "وقت الحضور" : "Time in"}</h6>
                    <input
                      value={lateTime}
                      onChange={(e) => setLateTime(e.target.value)}
                      className=" w-full border outline-none p-3"
                      type="time"
                    ></input>
                  </div>
                </div>
              )}
              {type === "Early" && (
                <div className=" flex items-center justify-center">
                  <div className=" mx-1 md:mx-4">
                    <h6>{isArabicprop ? "وقت الإنصراف" : "Time Out"}</h6>
                    <input
                      value={earlyTime}
                      onChange={(e) => setEarlyTime(e.target.value)}
                      className=" w-full border outline-none p-3"
                      type="time"
                    ></input>
                  </div>
                </div>
              )} */}
            </div>
          </div>
          <div className=" w-full col-span-6 p-2">
            <h4>{isArabicprop ? "الوردية" : "Shift"}</h4>
            <select
              id="demo-simple-select"
              className=" w-full bg-white outline-none p-3 rounded border"
              value={shift}
              onChange={(e) => setShift(e.target.value)}
            >
              <option hidden selected disabled>
                Choose one
              </option>
              <option value="الورديه الاولي">الورديه الاولي</option>
              <option value="الورديه الثانيه">الورديه الثانيه</option>
              <option value="الورديه الثالثه">الورديه الثالثه</option>
              <option value="الورديه الرابعه">الورديه الرابعه</option>
            </select>
          </div>
          <div className=" col-span-6 w-full p-2">
            <h4>{isArabicprop ? "التاريخ" : "Date"}</h4>
            <input
              className=" w-full outline-none rounded border p-3"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="Date"
            ></input>
          </div>
        </div>
        <div className=" flex items-center justify-center text-center">
          {props.edit ? (
            <button
              onClick={editHandeller}
              disabled={
                !employee || !date || !shift || !type || !code || loading
              }
              className=" disabled:opacity-50 bg-sky-400 py-1 mx-4 px-8 text-white rounded-full mb-4 outline-none border-none "
            >
              {loading ? "loading ...." : `${isArabicprop ? "تعديل" : "Edit"}`}
            </button>
          ) : (
            <button
              onClick={addHandeller}
              disabled={
                !employee || !date || !shift || !type || !code || loading
              }
              className=" disabled:opacity-50 bg-sky-400 py-1 mx-4 px-8 text-white rounded-full mb-4 outline-none border-none "
            >
              {loading ? "loading ...." : `${isArabicprop ? "إضافة" : "Add"}`}
            </button>
          )}
          <button
            onClick={props.close}
            className=" bg-gray-300 py-1 mx-4 px-8 text-black rounded-full mb-4"
          >
            {isArabicprop ? "إلغاء" : "Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
}
