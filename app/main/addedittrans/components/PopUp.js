"use client";
import { isArabic } from "@/utils/langStore";
import { options } from "@/utils/optionStore";
import useOptions from "@/utils/useOptions";
import Cookies from "js-cookie";
import React, { useContext, useEffect } from "react";
import { useState } from "react";

export default function PopUp(props) {
  const isArabicprop = useContext(isArabic).arabic;
  const [loading, setloading] = useState(false);
  const refrshopt = useContext(options).refresh;
  const setrefrshopt = useContext(options).setRefresh;
  useEffect(() => {
    setrefrshopt(!refrshopt);
  }, []);
  const branchesOptions = useOptions(useContext(options).branch);
  const workOptions = useOptions(useContext(options).workingTime);

  const employeeElement = props.employee || {};

  const [employee, setEmployee] = useState(employeeElement.name);
  const [code, setCode] = useState(employeeElement.code);
  const [date, setDate] = useState(employeeElement.date);
  const [timein, setTimeIn] = useState(employeeElement.start_attedance);
  const [timeOut, setTimeOut] = useState(employeeElement.end_leave);
  const [branch, setBranch] = useState(employeeElement.branch);
  const [shift, setShift] = useState(employeeElement.worktime);
  const [work, setwork] = useState(employeeElement.shift);
  // const [branchOut, setBranchOut] = useState("");
  // const [password, setPassword] = useState("");

  //Geting Empoyees

  const [employess, setEmployeess] = useState([]);
  const token = Cookies.get("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}\n`);

  useEffect(() => {
    if (!token) {
      window.location.reload();
    }
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

  //
  //
  //Add
  //
  //

  const formdata = new FormData();
  formdata.append("name", employee);
  formdata.append("code", code);
  formdata.append("branch", branch);
  formdata.append("shift", work);
  formdata.append("start_attedance", timein);
  formdata.append("end_leave", timeOut);
  formdata.append("date", date);
  formdata.append("worktime", shift);

  const addhadeller = () => {
    setloading(true);
    fetch(`https://backend2.dasta.store/api/auth/addhandle`, {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    }).then((res) => {
      if (res.status === 200) {
        props.refresh();
      }
    });
  };

  const editHandeller = () => {
    setloading(true);
    fetch(`https://backend2.dasta.store/api/auth/updatehandle/${employeeElement.id}`, {
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
    <div className=" h-screen w-full flex items-center justify-center">
      <div className=" font-sans rounded-md bg-white w-full  md:w-3/4 getin">
        <div className=" p-4 text-xl bg-sky-400 rounded-t-md text-white text-center">
          <h1>{isArabicprop ? "إضافة وتعديل الحركات" : "Add & Edit Trans"}</h1>
        </div>
        <div className=" grid grid-cols-6 md:grid-cols-12 overflow-auto max-h-96 items-center mb-4">
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
          <div className=" w-full col-span-6 p-2">
            <h4>{isArabicprop ? "الفرع" : "Branch"}</h4>
            <select
              className=" w-full bg-white outline-none p-2 border rounded"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
            >
              <option selected hidden>
                Choose one
              </option>
              {branchesOptions}
            </select>
          </div>
          <div className=" col-span-6 w-full p-2">
            <h4>{isArabicprop ? "التاريخ" : "Date"}</h4>
            <input
              className=" w-full outline-none border-1 p-2"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            ></input>
          </div>
          <div className=" col-span-6 w-full p-2">
            <h4>{isArabicprop ? "وقت الحضور" : "Time In"}</h4>
            <input
              className=" w-full outline-none border-1 p-2"
              value={timein}
              onChange={(e) => setTimeIn(e.target.value)}
              type="time"
            ></input>
          </div>
          <div className=" col-span-6 w-full p-2">
            <h4>{isArabicprop ? "وقت الإنصراف" : "Time Out"}</h4>
            <input
              className=" w-full outline-none border-1 p-2"
              value={timeOut}
              onChange={(e) => setTimeOut(e.target.value)}
              type="time"
            ></input>
          </div>
          <div className=" w-full col-span-6 p-2">
            <h4>{isArabicprop ? "الدوام" : "work time"}</h4>
            <select
              id="demo-simple-select"
              className=" w-full bg-white outline-none p-3 rounded border"
              value={work}
              onChange={(e) => setwork(e.target.value)}
            >
              <option hidden selected disabled>
                Choose one
              </option>
              <option value=""> </option>
              {workOptions}
            </select>
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
              <option value=""> </option>
              <option value="الورديه الاولي">الورديه الاولي</option>
              <option value="الورديه الثانيه">الورديه الثانيه</option>
              <option value="الورديه الثالثه">الورديه الثالثه</option>
              <option value="الورديه الرابعه">الورديه الرابعه</option>
            </select>
          </div>

          {/* <div className=" w-full col-span-6 md:col-span-12 p-2">
            <div className=" md:w-1/2 w-full mx-auto">
              <h4>{isArabicprop ? "كلمة سر المسؤول" : "Password"}</h4>
              <input
                type="password"
                className=" w-full bg-white outline-none p-2 border rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div> */}
        </div>
        <div className=" flex items-center justify-center text-center">
          {props.edit ? (
            <button
              onClick={editHandeller}
              disabled={
                loading ||
                !employee ||
                !code ||
                !branch ||
                !date ||
                !timein ||
                !timeOut ||
                !shift ||
                !work
              }
              className=" disabled:opacity-50 bg-sky-400 py-1 mx-4 px-8 text-white rounded-full mb-4 outline-none border-none "
            >
              {loading ? "loading..." : `${isArabicprop ? "تعديل" : "Edit"}`}
            </button>
          ) : (
            <button
              disabled={
                loading ||
                !employee ||
                !code ||
                !branch ||
                !date ||
                !timein ||
                !timeOut ||
                !shift ||
                !work
              }
              onClick={addhadeller}
              className=" disabled:opacity-50 bg-sky-400 py-1 mx-4 px-8 text-white rounded-full mb-4 outline-none border-none "
            >
              {loading ? "loading..." : `${isArabicprop ? "إضافة" : "Add"}`}
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
