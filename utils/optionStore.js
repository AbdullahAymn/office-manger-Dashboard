"use client";
import React, { createContext, useState } from "react";

export const options = createContext();

export default function OptionStore({ children }) {
  const [branch, setBranch] = useState(["branch 1", "branch 2"]);
  const [mangement, setMangement] = useState(["mangement 1", "mangement 2"]);
  const [department, setDeapartmet] = useState([
    "department 1",
    "department 2",
  ]);
  const [job, setJob] = useState(["job 1", "job 2"]);
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
