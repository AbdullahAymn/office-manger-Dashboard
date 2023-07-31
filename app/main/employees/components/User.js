"use client";
import { isArabic } from "@/utils/langStore";
import { Checkbox, SwipeableDrawer, Switch } from "@mui/material";
import Link from "next/link";
import React, { useContext, useState } from "react";

export default function User(props) {
  const isArabicprop = useContext(isArabic).arabic;
  const [code, setCode] = useState(props.code);
  const [active, setActive] = useState(props.active);
  const [nameInArabic, setNameInArabic] = useState(props.nameInArabic);
  const [nameInEnglish, setNameInEnglish] = useState(props.nameInEglish);
  const [branch, setBranch] = useState(props.branch);
  const [mangement, setMangment] = useState(props.mangement);
  const [department, setDepartment] = useState(props.department);
  const [shift, setshift] = useState(props.shift);
  const [job, setJob] = useState(props.job);
  const [group, setGroup] = useState(props.group);
  const [Id, setID] = useState(props.id);
  const [email, setEmail] = useState(props.email);
  const [natinality, setNationality] = useState(props.natinality);
  const [task, setTask] = useState(props.task);
  const [project, setProject] = useState(props.project);
  const [phone, setPhone] = useState(props.phone);
  //
  // Settings
  //
  const [settings, setSettings] = useState(props.settings);
  const [overTime, setOverTime] = useState();
  const [beforeShift, setBeforeShift] = useState();
  const [afterShift, setAfterShift] = useState();
  const [vacations, setVacations] = useState();
  const [checkOut, setCheckOut] = useState();
  return (
    <div className=" w-full  md:w-8/12 mx-auto rounded-lg bg-white mt-12">
      {/*  */}
      {/* Top Label */}
      {/*  */}
      <div className=" bg-sky-600 p-4 text-2xl text-white text-center font-sans rounded-t-lg">
        {props.edit
          ? `${isArabicprop ? "تعديل موظف" : "Edit Employee"}`
          : `${isArabicprop ? "إضافة موظف" : "Add Employee"}`}
      </div>
      {/*  */}
      {/* Form */}
      {/*  */}
      <div className=" font-sans">
        <form>
          <div className=" w-full p-4 grid grid-cols-12">
            <div className=" my-2 mx-4 col-span-12 md:col-span-6">
              <h4>
                {isArabicprop ? "الكود" : "Code"}{" "}
                <span className=" text-red-700">*</span>
              </h4>
              <input
                onChange={(e) => setCode(e.target.value)}
                value={code}
                required
                className=" w-full p-2 border rounded-md outline-none"
                type="text"
                placeholder={`${isArabicprop ? "الكود" : "Code"}`}
              ></input>
            </div>
            <div className=" my-2 mx-4 col-span-12 md:col-span-6">
              <h4 className=" mx-4">
                {isArabicprop ? "نشط" : "Active"}{" "}
                <span className=" text-red-700">*</span>
              </h4>
              <Switch
                onChange={(e) => setActive(e.target.checked)}
                checked={active}
              />
            </div>
            <div className=" mx-4 my-2 col-span-12 md:col-span-6">
              <h4>
                {isArabicprop ? "الاسم بالعربي" : "Name in Arabic"}{" "}
                <span className=" text-red-700">*</span>
              </h4>
              <input
                onChange={(e) => setNameInArabic(e.target.value)}
                value={nameInArabic}
                className=" w-full p-2 border rounded-md outline-none"
                type="text"
                required
                placeholder={isArabicprop ? "الاسم بالعربي" : "Name in Arabic"}
              ></input>
            </div>
            <div className=" my-2 mx-4 col-span-12 md:col-span-6">
              <h4>{isArabicprop ? "الاسم الانجليزي" : "Name in English"} </h4>
              <input
                onChange={(e) => setNameInEnglish(e.target.value)}
                value={nameInEnglish}
                className=" w-full p-2 border rounded-md outline-none"
                type="text"
                placeholder={
                  isArabicprop ? "الاسم الانجليزي" : "Name in English"
                }
              ></input>
            </div>
            <div className=" my-2 mx-4 col-span-12 md:col-span-6">
              <h4>
                {isArabicprop ? "الفرع" : "Branch"}{" "}
                <span className=" text-red-700">*</span>{" "}
              </h4>
              <select
                value={branch}
                required
                onChange={(e) => setBranch(e.target.value)}
                className=" p-2 rounded-md border outline-none w-full"
              >
                <option>choose</option>
                <option>branch 1</option>
                <option>branch 2</option>
                <option>branch 3</option>
                <option>branch 4</option>
              </select>
            </div>
            <div className=" my-2 mx-4 col-span-12 md:col-span-6">
              <h4>{isArabicprop ? "الإدارة" : "Mangement"}</h4>
              <select
                value={mangement}
                onChange={(e) => setMangment(e.target.value)}
                className=" rounded-md p-2 border outline-none w-full"
              >
                <option>choose</option>
                <option> Management 1</option>
                <option> Management 2</option>
                <option> Management 3</option>
                <option> Management 4</option>
              </select>
            </div>
            <div className=" my-2 mx-4 col-span-12 md:col-span-6">
              <h4>{isArabicprop ? "القسم" : " Department"}</h4>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className=" rounded-md p-2 border outline-none w-full"
              >
                <option>choose</option>
                <option>Department 1</option>
                <option>Department 2</option>
                <option>Department 3</option>
                <option>Department 4</option>
              </select>
            </div>
            <div className=" my-2 mx-4 col-span-12 md:col-span-6">
              <h4>
                {isArabicprop ? "الدوام" : " Working Time"}{" "}
                <span className=" text-red-700">*</span>{" "}
              </h4>
              <select
                value={shift}
                required
                onChange={(e) => setshift(e.target.value)}
                className=" rounded-md p-2 border outline-none w-full"
              >
                <option>choose</option>
                <option>Shift 1</option>
                <option>Shift 2</option>
                <option>Shift 3</option>
                <option>Shift 4</option>
              </select>
            </div>
            <div className=" my-2 mx-4 col-span-12 md:col-span-6">
              <h4>{isArabicprop ? "الوظيفة" : " Job "}</h4>
              <select
                value={job}
                onChange={(e) => setJob(e.target.value)}
                className=" rounded-md p-2 border outline-none w-full"
              >
                <option>choose</option>
                <option>job 1</option>
                <option>job 2</option>
                <option>job 3</option>
                <option>job 4</option>
              </select>
            </div>
            <div className=" my-2 mx-4 col-span-12 md:col-span-6">
              <h4>{isArabicprop ? "المجموعة" : " Group "}</h4>
              <select
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                className=" rounded-md p-2 border outline-none w-full"
              >
                <option>choose</option>
                <option>group 1</option>
                <option>group 2</option>
                <option>group 3</option>
                <option>group 4</option>
              </select>
            </div>
            <div className=" my-2 mx-4 col-span-12 md:col-span-6">
              <h4>{isArabicprop ? "رقم الهوية" : "National ID"} </h4>
              <input
                onChange={(e) => setID(e.target.value)}
                value={Id}
                className=" w-full p-2 border rounded-md outline-none"
                type="text"
                placeholder={isArabicprop ? "رقم الهوية" : "National ID"}
              ></input>
            </div>
            <div className=" my-2 mx-4 col-span-12 md:col-span-6">
              <h4>{isArabicprop ? "الإيميل " : "E-mail"} </h4>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className=" w-full p-2 border rounded-md outline-none"
                type="email"
                placeholder={isArabicprop ? "الإيميل " : "E-mail"}
              ></input>
            </div>
            <div className=" my-2 mx-4 col-span-12 md:col-span-6">
              <h4>{isArabicprop ? "الجنسية" : "Nationality"}</h4>
              <select
                value={natinality}
                required
                onChange={(e) => setNationality(e.target.value)}
                className=" p-2 rounded-md border outline-none w-full"
              >
                <option>choose</option>
                <option>natinality 1</option>
                <option>natinality 2</option>
                <option>natinality 3</option>
                <option>natinality 4</option>
              </select>
            </div>
            <div className=" my-2 mx-4 col-span-12 md:col-span-6">
              <h4>{isArabicprop ? "المهمة" : "Task"}</h4>
              <select
                value={task}
                required
                onChange={(e) => setTask(e.target.value)}
                className=" p-2 rounded-md border outline-none w-full"
              >
                <option>choose</option>
                <option>task 1</option>
                <option>task 2</option>
                <option>task 3</option>
                <option>task 4</option>
              </select>
            </div>
            <div className=" my-2 mx-4 col-span-12 md:col-span-6">
              <h4>{isArabicprop ? "المشروع" : "Project"}</h4>
              <select
                value={project}
                required
                onChange={(e) => setProject(e.target.value)}
                className=" p-2 rounded-md border outline-none w-full"
              >
                <option>choose</option>
                <option>project 1</option>
                <option>project 2</option>
                <option>project 3</option>
                <option>project 4</option>
              </select>
            </div>
            <div className=" my-2 mx-4 col-span-12 md:col-span-6">
              <h4>{isArabicprop ? " رقم التليفون" : "Phone"} </h4>
              <input
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                className=" w-full p-2 border rounded-md outline-none"
                type="text"
                placeholder={isArabicprop ? " رقم التليفون" : "Phone"}
              ></input>
            </div>
          </div>
          {/*  */}
          {/* Settings */}
          {/*  */}
          <div className=" py-4 px-4 border rounded-md mx-8 font-sans">
            <div>
              <Checkbox
                onChange={(e) => setSettings(e.target.checked)}
                checked={settings}
              />
              <label>{isArabicprop ? "الإعدادات" : "settings"}</label>
            </div>
            <div
              className={` grid grid-cols-2 md:grid-cols-4 ${
                !settings && " opacity-40"
              } `}
            >
              <div className=" col-span-2">
                <Checkbox
                  onChange={(e) => setOverTime(e.target.checked)}
                  disabled={!settings}
                  checked={overTime}
                />
                <label>
                  {isArabicprop
                    ? "خصم التأخير من الوقت الإضافي"
                    : "Subtract Delay time from Overtime"}
                </label>
              </div>
              <div className=" col-span-2">
                <Checkbox
                  onChange={(e) => setBeforeShift(e.target.checked)}
                  disabled={!settings}
                  checked={beforeShift}
                />
                <label>
                  {isArabicprop
                    ? " حساب الوقت الإضافي قبل الدوام"
                    : "Consider extra hours before shift"}
                </label>
              </div>
              <div className=" col-span-2">
                <Checkbox
                  onChange={(e) => setAfterShift(e.target.checked)}
                  disabled={!settings}
                  checked={afterShift}
                />
                <label>
                  {isArabicprop
                    ? "حساب الوقت الإضافي بعد الدوام"
                    : "Consider extra hours after shift"}
                </label>
              </div>
              <div className=" col-span-2">
                <Checkbox
                  onChange={(e) => setVacations(e.target.checked)}
                  disabled={!settings}
                  checked={vacations}
                />
                <label>
                  {isArabicprop
                    ? "إضافة ساعات العمل أيام الأجازات"
                    : "Add working hours on vacations"}
                </label>
              </div>
              <div className=" col-span-2">
                <Checkbox
                  onChange={(e) => setCheckOut(e.target.checked)}
                  disabled={!settings}
                  checked={checkOut}
                />
                <label>{isArabicprop ? "تسجيل خروج بدون بصمة" : ""}</label>
              </div>
            </div>
          </div>
          <div className=" my-4 py-8 mx-4 font-sans flex items-center justify-center">
            <Link href="/main/employees">
              <button className=" text-lg rounded-full py-1 px-12 mx-2 md:mx-14 text-black bg-gray-200">
                {isArabicprop ? "الغاء" : "Cancel"}
              </button>
            </Link>
            <button className=" text-lg rounded-full py-1 px-12 mx-2 md:mx-14 text-white bg-sky-600">
              {props.edit
                ? `${isArabicprop ? "تعديل" : "Edit"}`
                : `${isArabicprop ? "إضافة" : "Add"}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
