"use client";
import { isArabic } from "@/utils/langStore";
import { MenuItem, Select, Switch } from "@mui/material";
import React from "react";
import { useState } from "react";
import { useContext } from "react";
import Paginate from "./Paginate";
import useOptions from "@/utils/useOptions";
import { options } from "@/utils/optionStore";

export default function (props) {
  const isArabicprop = useContext(isArabic).arabic;
  const branchesOptions = useOptions(useContext(options).branch);
  const mangementOptions = useOptions(useContext(options).mangement);
  const departmentOptions = useOptions(useContext(options).department);
  const workingTimeOptions = useOptions(useContext(options).workingTime);

  //
  //
  //Search
  //
  //
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [branches, setbranches] = useState("");
  const [management, setManagement] = useState("");
  const [department, setDepartment] = useState("");
  const [shift, setShift] = useState("");

  const [employeesData, setEmployeesData] = useState(props.data);
  const searchHadller = () => {
    let searched = props.data;
    if (code) {
      searched = searched.filter((e) => e.code == code.trim());
    }
    if (name) {
      searched = searched.filter((e) => e.name.includes(name.trim()));
    }
    if (branches) {
      searched = searched.filter((e) => e.branch === branches);
    }
    if (management) {
      searched = searched.filter((e) => e.management === management);
    }
    if (department) {
      searched = searched.filter((e) => e.department === department);
    }
    if (shift) {
      searched = searched.filter((e) => e.workingTime === shift);
    }
    setEmployeesData(searched);
  };

  const resetHandeller = () => {
    setCode("");
    setName("");
    setbranches("");
    setManagement("");
    setDepartment("");
    setShift("");
    setEmployeesData(props.data);
  };

  const [slice, setSlice] = useState([]);
  const getSlice = (slice) => {
    setSlice(slice);
  };

  //
  //
  //maping
  //
  //

  const [selectedEmloyee, setSelectedEmployee] = useState(props.selected);

  const addEmployee = (code, value) => {
    if (!value) {
      let deleted = selectedEmloyee.filter((e) => e !== code);
      setSelectedEmployee(deleted);
    } else {
      let added = selectedEmloyee;
      added = added.concat([code]);
      setSelectedEmployee(added);
    }
  };
  console.log("selectedEmloyee");

  const addHandeller = () => {
    props.add(selectedEmloyee);
    props.close();
  };

  const dataForTable = slice.map((e, index) => (
    <tr key={index} className="  p-1 border text-black/70">
      <td className=" p-3 text-start">
        {" "}
        <Switch
          checked={selectedEmloyee.includes(e.code)}
          onChange={(item) => addEmployee(e.code, item.target.checked)}
        />{" "}
      </td>
      <td className=" p-3 text-start">{e.code}</td>
      <td className=" p-3 text-start">{e.name}</td>
    </tr>
  ));

  return (
    <div className=" h-screen w-full flex items-center justify-center pb-20 overflow-auto ">
      <div className=" font-sans rounded-md bg-white w-full  getin">
        <div className=" p-4 text-xl bg-sky-400 rounded-t-md text-white text-center">
          <h1>{isArabic ? "بحث" : "Search"}</h1>
        </div>

        <div className=" w-full overflow-auto max-h-96 p-2">
          <div className=" relative p-2 rounded-md border">
            <i
              onClick={resetHandeller}
              className={`fa-solid fa-rotate-right hover:cursor-pointer absolute top-1 ${
                isArabicprop ? "left-1" : "right-1"
              }`}
            ></i>
            <form>
              <div className=" py-4 grid grid-cols-3 pb-12 md:pb-0 md:grid-cols-12">
                <div className=" w-full col-span-3 px-4">
                  <h4>{isArabicprop ? "كود الموظف" : "Employee Code"}</h4>
                  <input
                    className=" p-2 border w-full outline-none "
                    type="text"
                    placeholder={isArabicprop ? "كود الموظف" : "Employee Code"}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                </div>
                <div className=" w-full col-span-3 px-4">
                  <h4>{isArabicprop ? "إسم الموظف" : "Employee Name"}</h4>
                  <input
                    className=" p-2 border w-full outline-none "
                    type="text"
                    placeholder={isArabicprop ? "إسم الموظف" : "Employee Name"}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className=" w-full col-span-3 px-4">
                  <h4>{isArabicprop ? "الفرع" : "Branch"}</h4>
                  <select
                    className=" w-full p-2 border outline-none"
                    value={branches}
                    onChange={(e) => setbranches(e.target.value)}
                  >
                    <option selected hidden>
                      Choose one
                    </option>
                    {branchesOptions}
                  </select>
                </div>
                <div className=" w-full col-span-3 px-4">
                  <h4>{isArabicprop ? "الادارة" : "Management"}</h4>
                  <select
                    className=" w-full p-2 border outline-none"
                    value={management}
                    onChange={(e) => setManagement(e.target.value)}
                  >
                    <option selected hidden>
                      Choose one
                    </option>
                    {mangementOptions}
                  </select>
                </div>
                <div className=" w-full col-span-3 px-4">
                  <h4>{isArabicprop ? "القسم" : "Department"}</h4>
                  <select
                    className=" w-full p-2 border outline-none"
                    value={department}
                    onChange={(e) => setDeapartmet(e.target.value)}
                  >
                    <option selected hidden>
                      Choose one
                    </option>
                    {departmentOptions}
                  </select>
                </div>
                <div className=" w-full col-span-3 px-4">
                  <h4>{isArabicprop ? "الدوام" : "Shift"}</h4>
                  <select
                    className=" w-full p-2 border outline-none"
                    value={shift}
                    onChange={(e) => setShift(e.target.value)}
                  >
                    <option selected hidden>
                      Choose one
                    </option>
                    {workingTimeOptions}
                  </select>
                </div>
              </div>
            </form>
            <button
              onClick={searchHadller}
              className={` bg-sky-400 text-white mx-4 text-lg py-1 px-12 rounded-full hover:cursor-pointer absolute bottom-2 ${
                isArabicprop ? "left-0" : "right-0"
              }`}
            >
              {isArabicprop ? "بحث" : "Search"}
            </button>
          </div>
          <div className=" w-full">
            <Paginate data={employeesData} getSlice={getSlice} />
          </div>

          <div className=" w-full font-sans my-4">
            <table className=" min-w-full w-full text-sm ">
              <thead>
                <tr className=" bg-gray-100 p-3 border text-black/70">
                  <th className=" p-3 text-start"></th>
                  <th className=" p-3 text-start">
                    {isArabicprop ? "الكود" : "Code"}
                  </th>
                  <th className=" p-3  text-start">
                    {isArabicprop ? "الاسم" : "Name"}
                  </th>
                </tr>
              </thead>
              <tbody>{dataForTable}</tbody>
            </table>
          </div>
        </div>

        <div className=" flex items-center justify-center my-3 text-center">
          <button
            onClick={addHandeller}
            className=" bg-sky-400 py-1 mx-4 px-8 text-white rounded-full mb-4 outline-none border-none "
          >
            {isArabicprop ? "إضافة " : "Add "}
          </button>
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
