"use client";
import { isArabic } from "@/utils/langStore";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import Delete from "../../components/popup/delete";
import NameAndSearch from "@/app/components/NameAndSearch";
import Popup from "reactjs-popup";
import Edit from "./popups/edit";
import AddPopUp from "@/app/main/branches/popups/AddPoupUp";
import Loader from "@/app/components/Loader";
import Cookies from "js-cookie";

export default function branches() {
  const isArabicprop = useContext(isArabic).arabic;
  const [loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState(false);
  //
  //
  // top section
  //
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
  //search
  //

  const [getData, setGetData] = useState([]);
  const [jobsDataforserch, setJobsDatasforserch] = useState([]);
  const token = Cookies.get("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}\n`);
  useEffect(() => {
    setLoader(true);
    fetch(
      `https://backend2.dasta.store/api/auth/basicInfoFetchBranchBelongTo`,
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

  //
  //Table
  //

  const [openDelte, setOpenDelete] = useState(false);
  const closeDelete = () => {
    setOpenDelete(!openDelte);
  };
  const closrefresh = () => {
    setOpenDelete(!openDelte);
    setRefresh(!refresh);
  };

  const [delteditem, setDeleteditem] = useState();

  const deleteFun = (branch) => {
    setDeleteditem(branch);
    setOpenDelete(!openDelte);
  };

  const [editedbranch, setEditedBranch] = useState();
  const [openEdit, setOpenEdit] = useState(false);
  const closeEdit = () => {
    setOpenEdit(!openEdit);
  };
  const closeEditRefresh = () => {
    setOpenEdit(!openEdit);
    setRefresh(!refresh);
  };

  const editFun = (branch) => {
    setEditedBranch(branch);
    setOpenEdit(!openEdit);
  };

  const branchesData = slice.map((e) => (
    <tr key={e.id} className="grid grid-cols-7 p-2">
      <td className=" col-span-3 text-start text-sky-800">
        <Link href={`/main/branches/${e.id}`}>
          {isArabicprop ? `${e.name}` : `${e.name_en}`}
        </Link>{" "}
      </td>
      <td className=" col-span-3 text-start">{e.name_manger}</td>
      {/* <td className=" col-span-1 text-center">{e.employee}</td>
      <td className=" col-span-1 text-center">{e.mangements}</td> */}
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
    <div className=" w-full overflow-x-hidden">
      <Popup open={loader}>
        <Loader />
      </Popup>
      <NameAndSearch
        searchRes={searched}
        reset={restSearch}
        addFun={toggleAdd}
        getSlice={get}
        data={getData}
        dataForSearch={jobsDataforserch}
        subName={isArabicprop ? "الفروع" : "Branches"}
        name={isArabicprop ? "الفروع" : "Branches"}
        ti={isArabicprop ? "الفرع" : "Branch"}
      />

      {/*  */}
      {/*  */}
      {/* Table */}
      {/*  */}
      {/*  */}
      <div className=" w-full overflow-x-scroll md:overflow-x-hidden font-sans my-4">
        <table className=" text-sm md:text-base min-w-full w-150 md:max-w-full overflow-x-scroll">
          <Popup open={openDelte} closeOnDocumentClick>
            <Delete
              link={"basicInfoDeleteBranch"}
              close={closeDelete}
              refresh={closrefresh}
              element={delteditem}
            />
          </Popup>
          <Popup open={openEdit}>
            <Edit
              link="basicInfoUpdateBranch"
              element={editedbranch}
              refresh={closeEditRefresh}
              close={closeEdit}
            />
          </Popup>
          <thead>
            <tr className=" grid grid-cols-7 bg-white p-2 border text-black/70">
              <th className=" col-span-3 text-start">
                {isArabicprop ? "الفرع" : " Branch"}
              </th>
              <th className=" col-span-3 text-start">
                {isArabicprop ? "المدير" : " Manger"}
              </th>
              {/* <th className=" col-span-1 ">
                {isArabicprop ? "الموظفون" : " Employees"}
              </th>
              <th className=" col-span-1 ">
                {isArabicprop ? "الإدارات" : " Mangements"}
              </th> */}
              <th className=" col-span-1 ">
                {isArabicprop ? "العمليات" : " Actions"}
              </th>
            </tr>
          </thead>
          <tbody>{branchesData}</tbody>
        </table>
      </div>
      <Popup open={openAdd}>
        <AddPopUp
          link="basicInfoAddBranch"
          refresh={toggelOpenAddresfresh}
          close={toggleAdd}
        />
      </Popup>
    </div>
  );
}
