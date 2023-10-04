"use client";
import Loader from "@/app/components/Loader";
import { isArabic } from "@/utils/langStore";
import Cookies from "js-cookie";
import { useParams } from "next/navigation";
import React, { useContext, useState } from "react";
import { useEffect } from "react";
import Popup from "reactjs-popup";
import Delete from "./Delete";
import Edit from "./Edit";

export default function Page() {
  const isArabicprop = useContext(isArabic).arabic;
  const [loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const id = useParams().id;
  const day = useParams().day;

  console.log(day)

  const [shifts, setShifts] = useState([
    {
      name: "الورديه الاولي",
      nameEn: "first shift",
    },
    {
      name: "الورديه الثانيه",
      nameEn: "second shift",
    },
    {
      name: "الورديه الثالثه",
      nameEn: "3rd shift",
    },
    {
      name: "الورديه الرابعه",
      nameEn: "4th shift",
    },
    {
      name: " ",
      nameEn: " ",
    },
  ]);

  //
  // Fetching
  //

  const [showShifts, setShowShifts] = useState([]);
  const token = Cookies.get("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}\n`);

  useEffect(() => {
    setLoader(true);
    fetch(
      `https://backend2.dasta.store/api/auth/basicInfoFetchworkTime/${day}/${id}`,
      {
        method: "GET",
        headers: myHeaders,
      }
    ).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setShowShifts(data);
        });
        setLoader(false);
      }
    });
  }, [refresh]);

  //
  //
  // Maping
  //
  //

  const tabelData = showShifts.map((e, index) => (
    <tr key={index}>
      <td className=" text-center p-2">{isArabicprop ? e.name : e.name_en}</td>
      <td className=" text-center p-2">{e.total_hours_in_one_shift}</td>
      <td className=" text-center  p-2">{e.start_attendance}</td>
      <td className=" text-center p-2">{e.attendance}</td>
      <td className=" text-center p-2">{e.end_attendance}</td>
      <td className=" text-center  p-2">{e.start_leave}</td>
      <td className=" text-center p-2">{e.leaveTime}</td>
      <td className=" text-center  p-2">{e.end_leave}</td>
      <td className=" text-center  p-2">{e.early_leave}</td>
      <td className=" text-center  p-2  text-black/70">
        <i
          onClick={() => openDeleteHandeller(e)}
          className="fa-solid fa-trash mx-1 md:mx-4 hover:cursor-pointer hover:text-red-600"
        ></i>
        <i
          onClick={() => openEditHandeller(e)}
          className="fa-solid fa-pen-to-square mx-1 md:mx-4 hover:cursor-pointer hover:text-sky-600"
        ></i>
      </td>
    </tr>
  ));

  //
  // Add
  //

  const [add, setAdd] = useState(false);

  const [attStart, setAttStart] = useState("");
  const [att, setAtt] = useState("");
  const [attEnd, setAttEnd] = useState("");
  const [leaveStart, SetLeaveStart] = useState("");
  const [leave, SetLeave] = useState("");
  const [leaveEnd, SetLeaveEnd] = useState("");
  const [earlyLeave, SetEarlyLeave] = useState("");

  const reset = () => {
    setAttStart("");
    setAtt("");
    setAttEnd("");
    SetLeaveStart("");
    SetLeave("");
    SetLeaveEnd("");
    SetEarlyLeave("");
  };

  const formdata = new FormData();
  formdata.append("id_shift_day", day);
  formdata.append("id_shift", id);
  formdata.append("name", shifts[showShifts.length].name);
  formdata.append("name_en", shifts[showShifts.length].nameEn);
  formdata.append("type", "act");
  formdata.append("start_attendance", attStart);
  formdata.append("attendance", att);
  formdata.append("end_attendance", attEnd);
  formdata.append("start_leave", leaveStart);
  formdata.append("leaveTime", leave);
  formdata.append("end_leave", leaveEnd);
  formdata.append("early_leave", earlyLeave);

  const addHandeller = () => {
    setLoader(true);
    fetch(`https://backend2.dasta.store/api/auth/basicInfoAddworkTime`, {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    }).then((res) => {
      if (res.status === 200) {
        setLoader(false);
        setAdd(false);
        setRefresh(!refresh);
        reset();
      }
    });
  };

  //
  // Delete
  //

  const [openDelet, setOpenDelete] = useState(false);
  const [deleteditem, setdeletedItem] = useState({});

  const openDeleteHandeller = (element) => {
    setOpenDelete(true);
    setdeletedItem(element);
  };

  const closeDeleteHandeller = () => {
    setOpenDelete(!openDelet);
  };
  const closrefresh = () => {
    setOpenDelete(!openDelet);
    setRefresh(!refresh);
  };

  //
  // Edit
  //

  const [edit, setEdit] = useState(false);

  const [editedItem, setEditedItem] = useState({});

  const openEditHandeller = (e) => {
    setEditedItem(e);
    setEdit(true);
  };

  const closeEditHandeller = () => {
    setEdit(!edit);
  };
  const closeEditRefresh = () => {
    setEdit(!edit);
    setRefresh(!refresh);
  };
  return (
    <div className=" font-sans">
      <Popup open={loader}>
        <Loader />
      </Popup>
      <div className=" flex items-center justify-between p-4">
        <h1 className="  text-xl mb-3 md:text-3xl">
          {isArabicprop ? "الورديات" : "Shifts"}
        </h1>
        <button
          disabled={showShifts.length == 4}
          onClick={() => setAdd(!add)}
          className=" disabled:opacity-50 bg-sky-400 text-white py-1 px-10 rounded-full md:mx-2 text-md"
        >
          {isArabicprop ? "أضافة وردية" : "Add Shift"}
        </button>
      </div>
      {add && (
        <div className=" relative text-center grid grid-cols-3 md:grid-cols-12 items-center justify-between p-3 rounded-lg border-1  font-sans">
          <i
            onClick={reset}
            className="fa-solid fa-rotate-right absolute top-3 left-3 hover:cursor-pointer"
          ></i>
          <div className=" my-2 col-span-3 flex items-center justify-center  ">
            <h1>{isArabicprop ? "الوردية :" : "Shift :"}</h1>
            <h1 className=" mx-2 font-bold">
              {isArabicprop
                ? shifts[showShifts.length].name
                : shifts[showShifts.length].nameEn}
            </h1>
          </div>
          <div className=" my-2 col-span-3  ">
            <h1>{isArabicprop ? "بداية الحضور" : "Attendance begins"}</h1>
            <input
              value={attStart}
              onChange={(e) => setAttStart(e.target.value)}
              className="p-1 my-1  bg-white border mx-2"
              type="time"
            />
          </div>
          <div className=" my-2 col-span-3  ">
            <h1>{isArabicprop ? "الحضور" : "Attendance"}</h1>
            <input
              value={att}
              onChange={(e) => setAtt(e.target.value)}
              className="p-1 my-1 bg-white border mx-2"
              type="time"
            />
          </div>
          <div className=" col-span-3 my-2 ">
            <h1>{isArabicprop ? "نهاية الحضور" : "Attendance End"}</h1>
            <input
              value={attEnd}
              onChange={(e) => setAttEnd(e.target.value)}
              className="p-1 my-1 bg-white border mx-2"
              type="time"
            />
          </div>
          <div className=" col-span-3 my-2">
            <h1>{isArabicprop ? "بداية الإنصراف" : "Leaveing begins"}</h1>
            <input
              value={leaveStart}
              onChange={(e) => SetLeaveStart(e.target.value)}
              className="p-1 my-1 bg-white border mx-2"
              type="time"
            />
          </div>
          <div className=" col-span-3 my-2 ">
            <h1>{isArabicprop ? " الإنصراف" : "Leaveing"}</h1>
            <input
              value={leave}
              onChange={(e) => SetLeave(e.target.value)}
              className="p-1 my-1 bg-white border mx-2"
              type="time"
            />
          </div>
          <div className=" col-span-3 my-2 ">
            <h1>{isArabicprop ? "نهاية الإنصراف" : "Leaveing End"}</h1>
            <input
              value={leaveEnd}
              onChange={(e) => SetLeaveEnd(e.target.value)}
              className="p-1 my-1 bg-white border mx-2"
              type="time"
            />
          </div>
          <div className=" col-span-3 my-2 ">
            <h1>{isArabicprop ? "الإنصراف المبكر" : "Early Leaveing"}</h1>
            <input
              value={earlyLeave}
              onChange={(e) => SetEarlyLeave(e.target.value)}
              className="p-1 my-1 bg-white border mx-2"
              type="time"
            />
          </div>

          <div className=" flex items-center justify-center md:justify-start ">
            <button
              onClick={addHandeller}
              disabled={
                !att ||
                !attEnd ||
                !attStart ||
                !leave ||
                !leaveStart ||
                !leaveEnd ||
                !earlyLeave
              }
              className=" disabled:opacity-50 bg-sky-400 text-white py-1 px-10 rounded-full md:mx-2 text-md"
            >
              {isArabicprop ? "أضافة" : "Add"}
            </button>
          </div>
        </div>
      )}

      <div>
        <Popup open={openDelet}>
          <Delete
            day={day}
            refresh={closrefresh}
            close={closeDeleteHandeller}
            element={deleteditem}
          />
        </Popup>
        <Popup open={edit}>
          <Edit
            dd={day}
            element={editedItem}
            refresh={closeEditRefresh}
            close={closeEditHandeller}
          />
        </Popup>
        <table className=" my-8 table-auto text-sm md:text-base min-w-full md:w-full">
          <thead>
            <tr className=" bg-white p-2 border text-black/70">
              <th className=" p-2">{isArabicprop ? "الوردية" : "Shift"}</th>
              <th className=" p-2">
                {isArabicprop ? "اجمالي الساعات" : "Total Hours"}
              </th>
              <th className=" p-2">
                {isArabicprop ? "بداية الحضور" : "Attendance begins"}
              </th>
              <th className=" p-2">{isArabicprop ? "الحضور" : "Attendance"}</th>
              <th className=" p-2">
                {isArabicprop ? "نهاية الحضور" : "Attendance end"}
              </th>
              <th className=" p-2">
                {isArabicprop ? "بداية الإنصراف" : "Leaveing begins"}
              </th>
              <th className=" p-2">{isArabicprop ? "الإنصراف" : "Leaveing"}</th>
              <th className=" p-2">
                {isArabicprop ? "نهاية الإنصراف" : "Leaveing end"}
              </th>
              <th className=" p-2">
                {isArabicprop ? "إنصراف مبكر" : "Early Leaveing"}
              </th>
              <th className=" p-2">{isArabicprop ? "العمليات" : "Actions"}</th>
            </tr>
          </thead>
          <tbody>{tabelData}</tbody>
        </table>
      </div>
    </div>
  );
}
