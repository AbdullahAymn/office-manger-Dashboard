"use client";
import React, { useContext, useState } from "react";
import { useParams } from "next/navigation";
import NameAndSearch from "@/app/components/NameAndSearch";
import { isArabic } from "@/utils/langStore";
import Delete from "../../../../components/popup/delete";
import Popup from "reactjs-popup";
import Edit from "../../popups/edit";
import AddPopUp from "../../popups/AddPoupUp";
import Loader from "@/app/components/Loader";
import Cookies from "js-cookie";
import { useEffect } from "react";

export default function page() {
  const isArabicprop = useContext(isArabic).arabic;
  const [loader, setLoader] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const id = useParams().id;
  const name = useParams().name;
  const [mangeData, setMangeData] = useState([
    { name: "", name_en: "", id: +id },
  ]);
  const token = Cookies.get("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}\n`);
  useEffect(() => {
    fetch(
      `https://backend2.dasta.store/api/auth/basicInfofetchbelongToBranchadministation/${name}`,
      {
        method: "GET",
        headers: myHeaders,
      }
    ).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setMangeData(data);
        });
      }
    });
  }, []);
  const TopName = isArabicprop
    ? mangeData.filter((e) => e.id === +id)[0].name
    : mangeData.filter((e) => e.id === +id)[0].name_en;

  //
  //Add
  //

  const [openAdd, setOpenAdd] = useState(false);

  const toggleAdd = () => {
    setOpenAdd(!openAdd);
  };
  const toggelOpenAddresfresh = () => {
    setOpenAdd(!openAdd);
    setRefresh(!refresh);
  };

  //
  //
  // Tabel
  //
  //

  //delete
  const [deleted, setDeleted] = useState();
  const [openDelete, setOpenDelete] = useState(false);

  const deleteFun = (e) => {
    setDeleted(e);
    setOpenDelete(!openDelete);
  };
  const closeDelete = () => {
    setOpenDelete(!openDelete);
  };
  const closrefresh = () => {
    setOpenDelete(!openDelete);
    setRefresh(!refresh);
  };

  //edit

  const [edit, setEdit] = useState();
  const [openEdit, setOpenEdit] = useState(false);

  const editFun = (e) => {
    setEdit(e);
    setOpenEdit(!openEdit);
  };
  const closeEditRefresh = () => {
    setOpenEdit(!openEdit);
    setRefresh(!refresh);
  };

  const closeEdit = () => {
    setOpenEdit(!openEdit);
  };

  //search

  const [getData, setGetData] = useState([]);
  const [jobsDataforserch, setJobsDatasforserch] = useState([]);
  useEffect(() => {
    setLoader(true);
    fetch(
      `https://backend2.dasta.store/api/auth/basicInfofetchbelongToadminidepatment/${id}`,
      {
        method: "GET",
        headers: myHeaders,
      }
    ).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setGetData(data);
          setJobsDatasforserch(data);
        });
        setLoader(false);
      }
    });
  }, [refresh]);
  const [slice, setSlice] = useState([]);

  const get = (slice) => {
    setSlice(slice);
  };
  const searched = (searchRes) => {
    setGetData(searchRes);
  };
  const restSearch = () => {
    setGetData(jobsDataforserch);
  };

  //maping

  const mangesData = slice.map((e) => (
    <tr key={e.id} className="grid grid-cols-7 p-2">
      <td className=" col-span-3 text-start ">
        {isArabicprop ? e.name : e.name_en}
      </td>
      <td className=" col-span-3 text-start">{e.name_manger}</td>
      {/* <td className=" col-span-1 text-center">{e.employees}</td>
      <td className=" col-span-1 text-center">{e.sections}</td> */}
      <td className=" col-span-1 text-center text-black/70">
        <i
          onClick={() => deleteFun(e)}
          className="fa-solid fa-trash mx-1 md:mx-4 hover:cursor-pointer hover:text-red-600"
        ></i>
        <i
          onClick={() => editFun(e)}
          className="fa-solid fa-pen-to-square mx-1 md:mx-4 hover:cursor-pointer hover:text-sky-600"
        ></i>
      </td>
    </tr>
  ));

  return (
    <div className=" overflow-x-hidden">
      <Popup open={loader}>
        <Loader />
      </Popup>
      <NameAndSearch
        searchRes={searched}
        reset={restSearch}
        getSlice={get}
        addFun={toggleAdd}
        dataForSearch={jobsDataforserch}
        data={getData}
        name={`${
          isArabicprop
            ? `الأقسام في (${TopName})`
            : `Departments in (${TopName})`
        }`}
        ti={isArabicprop ? "الإدارة" : "Mangement"}
        subName={`${isArabicprop ? "الفروع" : "Branches"} / ${TopName}`}
      />
      <Popup open={openAdd}>
        <AddPopUp
          depart={true}
          department_id_adminstration={id}
          department_id_branch={name}
          link="basicInfoAddBranchdepatment"
          close={toggleAdd}
          refresh={toggelOpenAddresfresh}
        />
      </Popup>

      {/*  */}
      {/*  */}
      {/* Tabel */}
      {/*  */}
      {/*  */}

      <div className=" w-full font-sans my-4 overflow-x-scroll md:overflow-x-hidden">
        <table className=" min-w-full w-150 text-sm md:text-base md:w-full">
          <Popup open={openDelete}>
            <Delete
              link={"basicInfoDeleteBranchdepatment"}
              element={deleted}
              close={closeDelete}
              refresh={closrefresh}
            />
          </Popup>
          <Popup open={openEdit}>
            <Edit
              link="basicInfoUpdateBranchdepatment"
              element={edit}
              close={closeEdit}
              refresh={closeEditRefresh}
            />
          </Popup>
          <thead>
            <tr className=" grid grid-cols-7 bg-white p-2 border text-black/70">
              <th className=" col-span-3 text-start">
                {isArabicprop ? "الإدارة" : "Mangement"}
              </th>
              <th className=" col-span-3 text-start">
                {isArabicprop ? "المدير" : " Manger"}
              </th>
              {/* <th className=" col-span-1 ">
                {isArabicprop ? "الموظفون" : " Employees"}
              </th>
              <th className=" col-span-1 ">
                {isArabicprop ? "الافسام" : " sections"}
              </th> */}
              <th className=" col-span-1 ">
                {isArabicprop ? "العمليات" : " Actions"}
              </th>
            </tr>
          </thead>
          <tbody>{mangesData}</tbody>
        </table>
      </div>
    </div>
  );
}
