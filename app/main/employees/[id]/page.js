"use client";
import { useParams } from "next/navigation";
import React from "react";
import User from "../components/User";


export default function page() {
  const id = useParams().id;
  return (
    <div>
      
      <User edit={true} id={id} />
    </div>
  );
}
