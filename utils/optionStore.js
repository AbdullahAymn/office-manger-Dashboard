"use client";
import React, { createContext, useState } from "react";

export const options = createContext();

export default function OptionStore({ children }) {
  const [branch, setBranch] = useState(["branch 1", "branch 2" , 'branch 3' ,'branch 4']);
  const [mangement, setMangement] = useState(["Mangement 1", "Mangement 2","Mangement 3","Mangement 4"]);
  const [department, setDeapartmet] = useState([
    "Department 1",
    "Department 2",
    "Department 3",
    "Department 4",
  ]);
  const [job, setJob] = useState(["job 1", "job 2","job 3", "job 4"]);
  const [group, setGroup] = useState(["group 1", "group 2"]);
  const [workingTime, setWorkingTime] = useState([
    "workingTime 1",
    "workingTime 2",
  ]);
  return (
    <options.Provider
      value={{ branch, mangement, department, job, group, workingTime }}
    >
      {children}
    </options.Provider>
  );
}
