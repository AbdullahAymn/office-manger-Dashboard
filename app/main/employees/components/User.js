"use client";
import Loader from "@/app/components/Loader";
import { isArabic } from "@/utils/langStore";
import { options } from "@/utils/optionStore";
import useOptions from "@/utils/useOptions";
import { Checkbox, SwipeableDrawer, Switch } from "@mui/material";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Popup from "reactjs-popup";

export default function User(props) {
  const isArabicprop = useContext(isArabic).arabic;
  const [loader, setLoader] = useState(false);
  const router = useRouter()

  const refrshopt = useContext(options).refresh;
  const setrefrshopt = useContext(options).setRefresh;
  useEffect(() => {
    setrefrshopt(!refrshopt)
  },[])
  const branchesOptions = useOptions(useContext(options).branch);
  const mangementOptions = useOptions(useContext(options).mangement);
  const departmentOptions = useOptions(useContext(options).department);
  const jobOptions = useOptions(useContext(options).job);
  const groupOptions = useOptions(useContext(options).group);
  const workingTimeOptions = useOptions(useContext(options).workingTime);
  const projectOptions = useOptions(useContext(options).project);
  const natOptions = useOptions(useContext(options).nat);
  const taskOptions = useOptions(useContext(options).task);
 

  //
  //
  //
  const [code, setCode] = useState("");
  const [active, setActive] = useState();
  const [nameInArabic, setNameInArabic] = useState("");
  const [nameInEnglish, setNameInEnglish] = useState("");
  const [branch, setBranch] = useState("");
  const [mangement, setMangment] = useState("");
  const [department, setDepartment] = useState("");
  const [shift, setshift] = useState("");
  const [job, setJob] = useState("");
  const [group, setGroup] = useState("");
  const [Id, setID] = useState("");
  const [email, setEmail] = useState("");
  const [natinality, setNationality] = useState("");
  const [task, setTask] = useState("");
  const [project, setProject] = useState("");
  const [phone, setPhone] = useState("");

  //
  // Settings
  //
  const [settings, setSettings] = useState();
  const [overTime, setOverTime] = useState();
  const [beforeShift, setBeforeShift] = useState(false);
  const [afterShift, setAfterShift] = useState(false);
  const [vacations, setVacations] = useState();
  const [checkOut, setCheckOut] = useState();

  //
  //
  const token = Cookies.get("token");
  const myHeaders1 = new Headers();
  myHeaders1.append("Authorization", `Bearer ${token}\n`);

  {
    props.edit &&
      useEffect(() => {
        setLoader(!loader);
        if (!token) {
          window.location.reload();
        }
        fetch(`https://backend2.dasta.store/api/auth/basicInfoFetchemployee`, {
          method: "GET",
          headers: myHeaders1,
        }).then((res) => {
          if (res.status === 200) {
            res.json().then((data) => {
              let element = data.filter((e) => e.id === +props.id)[0];
              setCode(element.code);
              setActive(element.activition === "true");
              setNameInArabic(element.name_ar);
              setNameInEnglish(element.name_en);
              setBranch(element.id_branch);
              setMangment(element.id_administation);
              setDepartment(element.id_depatment);
              setshift(element.id_shift);
              setJob(element.id_job);
              setGroup(element.goubs);
              setID(element.id_card);
              setEmail(element.email);
              setNationality(element.id_nationalitie);
              setTask(element.id_task);
              setProject(element.id_poject);
              setPhone(element.phone_numbe);
              setBeforeShift(element.extra_before == 'yes')
              setAfterShift(element.extra_after == 'yes')

              
            });
            setLoader(false);

            
          }
        });
      }, []);
  }

  

  //
  //Actions
  //

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  const formdata = new FormData();
  formdata.append("name_ar", nameInArabic || "");
  formdata.append("name_en", nameInEnglish || " ");
  formdata.append("email", email || "");
  formdata.append("activition", `${active ? "true" : "false"}` || "false");
  formdata.append("goubs", group || "");
  formdata.append("id_poject", project || "");
  formdata.append("id_task", task || "");
  formdata.append("id_nationalitie", natinality || "");
  formdata.append("id_job", job || "");
  formdata.append("id_shift", shift || "");
  formdata.append("id_administation", mangement || "");
  formdata.append("id_depatment", department || "");
  formdata.append("id_branch", branch || "");
  formdata.append("phone_numbe", phone || "");
  formdata.append("id_card", Id);
  formdata.append("code", code);
  formdata.append("extra_before", beforeShift ? 'yes' : 'no' );
  formdata.append("extra_after", afterShift ? 'yes' : 'no' );

  const addHandeller = (e) => {
    e.preventDefault();
    setLoader(!loader);
    fetch("https://backend2.dasta.store/api/auth/basicInfoAddemployee", {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    }).then((res) => {
      if (res.status === 200) {
        router.push("/main/employees");
      } else {
        setLoader(false);
        toast.error(
          `${
            isArabicprop
              ? "هناك حقول مطلوبة خطأ"
              : "Some required elements are Wrong"
          }`
        );
      }
    });
  };
  const editHandeller = (e) => {
    e.preventDefault();
    setLoader(!loader);
    fetch(
      `https://backend2.dasta.store/api/auth/basicInfoUpdateemployee/${props.id}`,
      {
        method: "POST",
        headers: myHeaders,
        body: formdata,
        redirect: "follow",
      }
    ).then((res) => {
      if (res.status === 200) {
        router.push("/main/employees");
      } else {
        setLoader(false);
        toast.error(
          `${
            isArabicprop
              ? "هناك حقول مطلوبة خطأ"
              : "Some required elements are Wrong"
          }`
        );
      }
    });
  };
  return (
    <div className=" w-full  md:w-8/12 mx-auto rounded-lg bg-white mt-12">
      {/*  */}
      {/* Top Label */}
      {/*  */}
      <ToastContainer position="bottom-center" theme="colored" />
      <Popup open={loader}>
        <Loader />
      </Popup>
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
              <h4>
                {isArabicprop ? "الاسم الانجليزي" : "Name in English"}{" "}
                <span className=" text-red-700">*</span>{" "}
              </h4>
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
                <option selected hidden>
                  Choose one
                </option>
                {branchesOptions}
              </select>
            </div>
            <div className=" my-2 mx-4 col-span-12 md:col-span-6">
              <h4>{isArabicprop ? "الإدارة" : "Mangement"}</h4>
              <select
                value={mangement}
                onChange={(e) => setMangment(e.target.value)}
                className=" rounded-md p-2 border outline-none w-full"
              >
                <option selected hidden>
                  Choose one
                </option>
                {mangementOptions}
              </select>
            </div>
            <div className=" my-2 mx-4 col-span-12 md:col-span-6">
              <h4>{isArabicprop ? "القسم" : " Department"}</h4>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className=" rounded-md p-2 border outline-none w-full"
              >
                <option selected hidden>
                  Choose one
                </option>
                {departmentOptions}
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
                <option selected hidden>
                  Choose one
                </option>
                {workingTimeOptions}
              </select>
            </div>
            <div className=" my-2 mx-4 col-span-12 md:col-span-6">
              <h4>{isArabicprop ? "الوظيفة" : " Job "}</h4>
              <select
                value={job}
                onChange={(e) => setJob(e.target.value)}
                className=" rounded-md p-2 border outline-none w-full"
              >
                <option selected hidden>
                  Choose one
                </option>
                {jobOptions}
              </select>
            </div>
            <div className=" my-2 mx-4 col-span-12 md:col-span-6">
              <h4>{isArabicprop ? "المجموعة" : " Group "}</h4>
              <select
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                className=" rounded-md p-2 border outline-none w-full"
              >
                <option selected hidden>
                  Choose one
                </option>
                {groupOptions}
              </select>
            </div>
            <div className=" my-2 mx-4 col-span-12 md:col-span-6">
              <h4>
                {isArabicprop ? "رقم الهوية" : "National ID"}{" "}
                <span className=" text-red-700">*</span>{" "}
              </h4>
              <input
                onChange={(e) => setID(e.target.value)}
                value={Id}
                className=" w-full p-2 border rounded-md outline-none"
                type="text"
                placeholder={isArabicprop ? "رقم الهوية" : "National ID"}
              ></input>
            </div>
            <div className=" my-2 mx-4 col-span-12 md:col-span-6">
              <h4>
                {isArabicprop ? "الإيميل " : "E-mail"}{" "}
                <span className=" text-red-700">*</span>{" "}
              </h4>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className=" w-full p-2 border rounded-md outline-none"
                type="text"
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
                <option selected hidden>
                  Choose one
                </option>
                {natOptions}
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
                <option selected hidden>
                  Choose one
                </option>
                {taskOptions}
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
                <option selected hidden>
                  Choose one
                </option>
                {projectOptions}
              </select>
            </div>
            <div className=" my-2 mx-4 col-span-12 md:col-span-6">
              <h4>
                {isArabicprop ? " رقم التليفون" : "Phone"}{" "}
                <span className=" text-red-700">*</span>{" "}
              </h4>
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
              {/* <Checkbox
                onChange={(e) => setSettings(e.target.checked)}
                checked={settings}
              /> */}
              <label>{isArabicprop ? "الإعدادات" : "settings"}</label>
            </div>
            <div
              className={` grid grid-cols-2 md:grid-cols-4  `}
            >
              {/* <div className=" col-span-2">
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
              </div> */}
              <div className=" col-span-2">
                <Checkbox
                  onChange={(e) => setBeforeShift(e.target.checked)}
                  // disabled={!settings}
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
                  // disabled={!settings}
                  checked={afterShift}
                />
                <label>
                  {isArabicprop
                    ? "حساب الوقت الإضافي بعد الدوام"
                    : "Consider extra hours after shift"}
                </label>
              </div>
              {/* <div className=" col-span-2">
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
              </div> */}
            </div>
          </div>
          <div className=" my-4 py-8 mx-4 font-sans flex items-center justify-center">
            <Link href="/main/employees">
              <button className=" text-lg rounded-full py-1 px-12 mx-2 md:mx-14 text-black bg-gray-200">
                {isArabicprop ? "الغاء" : "Cancel"}
              </button>
            </Link>
            {props.edit ? (
              <button
                onClick={editHandeller}
                className=" text-lg rounded-full py-1 px-12 mx-2 md:mx-14 text-white bg-sky-600"
              >
                {isArabicprop ? "تعديل" : "Edit"}
              </button>
            ) : (
              <button
                onClick={addHandeller}
                className=" text-lg rounded-full py-1 px-12 mx-2 md:mx-14 text-white bg-sky-600"
              >
                {isArabicprop ? "إضافة" : "Add"}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
