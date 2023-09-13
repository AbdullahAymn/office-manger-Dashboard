"use client";
import { isArabic } from "@/utils/langStore";
import { MenuItem, Select } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { vacationTempData } from "../tempdata";
import Cookies from "js-cookie";

export default function PopUp(props) {
  const isArabicprop = useContext(isArabic).arabic;
  const [loading, setloading] = useState(false);
  //
  //get
  //

  const employeeElement = props.employee || {};

  const [employee, setEmployee] = useState(employeeElement.nameEmployee);
  const [code, setCode] = useState(employeeElement.codeEmployee);
  const [type, setType] = useState(employeeElement.sortOfHoliday);
  const [from, setFrom] = useState(employeeElement.fromDay);
  const [to, setTo] = useState(employeeElement.toDay);
  const [notes, setNotes] = useState(employeeElement.comment);

  //getting emmplyee
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
  const selecteItems = employess.map((e, index) => (
    <option key={index} value={e.name_ar}>
      {e.name_ar}
    </option>
  ));

  //
  //change
  //

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

  //
  //Getting types
  //

  const [types, setTypes] = useState([]);
  useEffect(() => {
    fetch(`https://backend2.dasta.store/api/auth/basicInfoFetchsortholiday`, {
      method: "GET",
      headers: myHeaders,
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setTypes(data);
        });
      }
    });
  }, []);

  const typeOptions = types.map((e, index) => (
    <option key={index} value={e.name}>
      {e.name}
    </option>
  ));

  //
  //Add
  //

  const formdata = new FormData();
  formdata.append("nameEmployee", employee);
  formdata.append("comment", notes);
  formdata.append("sortOfHoliday", type);
  formdata.append("fromDay", from);
  formdata.append("toDay", to);
  formdata.append("codeEmployee", code);

  const addHandeller = () => {
    setloading(true);
    fetch(`https://backend2.dasta.store/api/auth/Addholiday`, {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    }).then((res) => {
      if (res.status === 200) {
        props.refresh();
      }
    });
  };

  //
  //Edit
  //

  const editHandeller = () => {
    setloading(true);
    fetch(`https://backend2.dasta.store/api/auth/updateholiday/${employeeElement.id}`, {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    }).then((res) => {
      if (res.status === 200) {
        props.refresh();
      }
    });
}
  ///
  ////////
  return (
    <div className=" h-screen w-full md:overflow-hidden flex items-center justify-center">
      <div className=" font-sans rounded-md bg-white w-full  md:w-3/4 getin">
        <div className=" p-4 text-xl bg-sky-400 rounded-t-md text-white text-center">
          <h1>
            {props.edit
              ? `${isArabicprop ? "تعديل" : "Edit"}`
              : `${isArabicprop ? "اضافة" : "Add"}`}
          </h1>
        </div>
        <div className=" grid grid-cols-6 md:grid-cols-12 items-center mb-2">
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

          <div className=" col-span-6 w-full p-2">
            <h4>{isArabicprop ? "من" : "From"}</h4>
            <input
              className=" w-full bg-white outline-none p-3 rounded border"
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <div className=" col-span-6 w-full p-2">
            <h4>{isArabicprop ? "الى" : "To"}</h4>
            <input
              className=" w-full bg-white outline-none p-3 rounded border"
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
          <div className=" col-span-6 w-full p-2">
            <h4>{isArabicprop ? "نوع الاجازة" : "Vacation Type"}</h4>
            <select
              className=" w-full bg-white outline-none p-3 rounded border "
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option hidden selected disabled>
                Choose one
              </option>
              {typeOptions}
            </select>
          </div>
          <div className=" col-span-6 w-full p-2">
            <h4>{isArabicprop ? "ملاحظات" : "Notes"}</h4>
            <input
              className=" w-full bg-white outline-none p-3 rounded border"
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        </div>
        <div className=" flex items-center justify-center text-center">
          {props.edit ? (
            <button
              onClick={editHandeller}
              disabled={
                !employee || !from || !to || !type || !code || !notes || loading
              }
              className=" disabled:opacity-50 bg-sky-400 py-1 mx-4 px-8 text-white rounded-full mb-4 outline-none border-none "
            >
              {loading ? "loading ...." : `${isArabicprop ? "تعديل" : "Edit"}`}
            </button>
          ) : (
            <button
              onClick={addHandeller}
              disabled={
                !employee || !from || !to || !type || !code || !notes || loading
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
