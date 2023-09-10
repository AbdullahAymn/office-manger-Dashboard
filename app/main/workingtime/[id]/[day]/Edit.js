"use client";
import { isArabic } from "@/utils/langStore";
import Cookies from "js-cookie";
import React from "react";
import { useContext } from "react";
import { useState } from "react";

export default function Edit(props) {
  const isArabicprop = useContext(isArabic).arabic;
  const [loading, setloading] = useState(false);

  const [editedItem, setEditedItem] = useState(props.element);

  const [attStartEdit, setAttStartEdit] = useState(editedItem.start_attendance);
  const [attEdit, setAttEdit] = useState(editedItem.attendance);
  const [attEndEdit, setAttEndEdit] = useState(editedItem.end_attendance);
  const [leaveStartEdit, SetLeaveStartEdit] = useState(editedItem.start_leave);
  const [leaveEdit, SetLeaveEdit] = useState(editedItem.leaveTime);
  const [leaveEndEdit, SetLeaveEndEdit] = useState(editedItem.end_leave);
  const [earlyLeaveEdit, SetEarlyLeaveEdit] = useState(editedItem.early_leave);

  const token = Cookies.get("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);
  const formdata = new FormData();
  formdata.append("start_attendance", attStartEdit);
  formdata.append("attendance", attEdit);
  formdata.append("end_attendance", attEndEdit);
  formdata.append("start_leave", leaveStartEdit);
  formdata.append("leaveTime", leaveEdit);
  formdata.append("end_leave", leaveEndEdit);
  formdata.append("early_leave", earlyLeaveEdit);
  const editHandeller = () => {
    setloading(true);
    fetch(`https://backend2.dasta.store/api/auth/basicInfoUpdateworkTime/${editedItem.id}`, {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    }).then((res) => {
      if (res.status === 200) {
        props.refresh();
      }
    });
  };

  return (
    <div className=" h-screen w-full flex items-center justify-center">
      <div className=" font-sans rounded-md bg-white w-full  md:w-3/4 getin">
        <div className=" p-4 text-xl bg-sky-600 rounded-t-md text-white text-center">
          <h1>
            {isArabicprop ? "تعديل" : "Edit"}{" "}
            {isArabicprop ? editedItem.name : editedItem.name_en}
          </h1>
        </div>
        <div className=" text-center grid grid-cols-3 md:grid-cols-12 items-center justify-between p-3 rounded-lg  font-sans">
          <div className=" my-2 col-span-3 flex items-center justify-center  ">
            <h1>{isArabicprop ? "الوردية :" : "Shift :"}</h1>
            <h1 className=" mx-2 font-bold">
              {isArabicprop ? editedItem.name : editedItem.name_en}
            </h1>
          </div>
          <div className=" my-2 col-span-3  ">
            <h1>{isArabicprop ? "بداية الحضور" : "Attendance begins"}</h1>
            <input
              value={attStartEdit}
              onChange={(e) => setAttStartEdit(e.target.value)}
              className="p-1 my-1  bg-white border mx-2"
              type="time"
            />
          </div>
          <div className=" my-2 col-span-3  ">
            <h1>{isArabicprop ? "الحضور" : "Attendance"}</h1>
            <input
              value={attEdit}
              onChange={(e) => setAttEdit(e.target.value)}
              className="p-1 my-1 bg-white border mx-2"
              type="time"
            />
          </div>
          <div className=" col-span-3 my-2 ">
            <h1>{isArabicprop ? "نهاية الحضور" : "Attendance End"}</h1>
            <input
              value={attEndEdit}
              onChange={(e) => setAttEndEdit(e.target.value)}
              className="p-1 my-1 bg-white border mx-2"
              type="time"
            />
          </div>
          <div className=" col-span-3 my-2">
            <h1>{isArabicprop ? "بداية الإنصراف" : "Leaveing begins"}</h1>
            <input
              value={leaveStartEdit}
              onChange={(e) => SetLeaveStartEdit(e.target.value)}
              className="p-1 my-1 bg-white border mx-2"
              type="time"
            />
          </div>
          <div className=" col-span-3 my-2 ">
            <h1>{isArabicprop ? " الإنصراف" : "Leaveing"}</h1>
            <input
              value={leaveEdit}
              onChange={(e) => SetLeaveEdit(e.target.value)}
              className="p-1 my-1 bg-white border mx-2"
              type="time"
            />
          </div>
          <div className=" col-span-3 my-2 ">
            <h1>{isArabicprop ? "نهاية الإنصراف" : "Leaveing End"}</h1>
            <input
              value={leaveEndEdit}
              onChange={(e) => SetLeaveEndEdit(e.target.value)}
              className="p-1 my-1 bg-white border mx-2"
              type="time"
            />
          </div>
          <div className=" col-span-3 my-2 ">
            <h1>{isArabicprop ? "الإنصراف المبكر" : "Early Leaveing"}</h1>
            <input
              value={earlyLeaveEdit}
              onChange={(e) => SetEarlyLeaveEdit(e.target.value)}
              className="p-1 my-1 bg-white border mx-2"
              type="time"
            />
          </div>

          <div className=" flex items-center justify-center md:justify-start "></div>
        </div>

        <div className=" flex items-center justify-center text-center">
          <button
            onClick={editHandeller}
            disabled={
              !attEdit ||
              !attEndEdit ||
              !attStartEdit ||
              !leaveEdit ||
              !leaveStartEdit ||
              !leaveEndEdit ||
              !earlyLeaveEdit ||
              loading
            }
            className=" disabled:opacity-60 bg-sky-600 py-1 mx-4 px-8 text-white rounded-full mb-4 outline-none border-none "
          >
            {loading ? "Loading..." : `${isArabicprop ? "تعديل" : "Edit"}`}
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
