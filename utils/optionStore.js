"use client";
import Cookies from "js-cookie";
import React, { createContext, useEffect, useState } from "react";

export const options = createContext();

export default function OptionStore({ children }) {
  const [refresh, setRefresh] = useState(true);

  const [branch, setBranch] = useState([]);
  const [mangement, setMangement] = useState([]);
  const [department, setDeapartmet] = useState([]);
  const [job, setJob] = useState([]);
  const [project, setProject] = useState([]);
  const [nat, setNat] = useState([]);
  const [task, setTask] = useState([]);
  const [group, setGroup] = useState([]);
  const [workingTime, setWorkingTime] = useState([]);
  useEffect(() => {
    const token = Cookies.get("token");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}\n`);
    fetch(
      `https://backend2.dasta.store/api/auth/basicInfoFetchBranchBelongTo`,
      {
        method: "GET",
        headers: myHeaders,
      }
    ).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setBranch(data);
        });
      }
    });
    fetch(
      `https://backend2.dasta.store/api/auth/basicInfoFetchBranchadministationBelongTocom`,
      {
        method: "GET",
        headers: myHeaders,
      }
    ).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setMangement(data);
        });
      }
    });
    fetch(
      `https://backend2.dasta.store/api/auth/basicInfoFetchBranchdepatmentBelongTocom`,
      {
        method: "GET",
        headers: myHeaders,
      }
    ).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setDeapartmet(data);
        });
      }
    });
    fetch(`https://backend2.dasta.store/api/auth/basicInfoFetchjob`, {
      method: "GET",
      headers: myHeaders,
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setJob(data);
        });
      }
    });
    fetch(`https://backend2.dasta.store/api/auth/basicInfoFetchpoject`, {
      method: "GET",
      headers: myHeaders,
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setProject(data);
        });
      }
    });
    fetch(`https://backend2.dasta.store/api/auth/getAllShiftController`, {
      method: "GET",
      headers: myHeaders,
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setWorkingTime(data);
        });
      }
    });
    fetch(`https://backend2.dasta.store/api/auth/basicInfoFetchnationalite`, {
      method: "GET",
      headers: myHeaders,
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setNat(data);
        });
      }
    });
    fetch(`https://backend2.dasta.store/api/auth/basicInfoFetchtask`, {
      method: "GET",
      headers: myHeaders,
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setTask(data);
        });
      }
    });
    fetch(`https://backend2.dasta.store/api/auth/basicInfoFetchgroubEmployee`, {
      method: "GET",
      headers: myHeaders,
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          setGroup(data);
        });
      }
    });
  }, [refresh]);

  return (
    <options.Provider
      value={{
        branch,
        mangement,
        department,
        job,
        group,
        workingTime,
        project,
        nat,
        task,
        refresh,
        setRefresh,
      }}
    >
      {children}
    </options.Provider>
  );
}
