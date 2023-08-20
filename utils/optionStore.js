"use client";
import Cookies from "js-cookie";
import React, { createContext, useEffect, useState } from "react";

export const options = createContext();

export default function OptionStore({ children }) {
  const [branch, setBranch] = useState([
    { name: "branch 1" },
    { name: "branch 2" },
    { name: "branch 3" },
    { name: "branch 4" },
  ]);
  const [mangement, setMangement] = useState([
    { name: "Mangement 1" },
    { name: "Mangement 2" },
  ]);
  const [department, setDeapartmet] = useState([{ name: "Department 1" }]);
  const [job, setJob] = useState([]);
  const [project, setProject] = useState([]);
  const [nat, setNat] = useState([]);
  const [task, setTask] = useState([]);
  const [group, setGroup] = useState([{ name: "groub 1" }]);
  const [workingTime, setWorkingTime] = useState([
    { name: "shift 1" },
    { name: "shift 2" },
  ]);
  useEffect(() => {
    const token = Cookies.get("token");
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}\n`);
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
  }, []);
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
        task
      }}
    >
      {children}
    </options.Provider>
  );
}
