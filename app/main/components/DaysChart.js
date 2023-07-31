"use client";
import { isArabic } from "@/utils/langStore";
import React, { useContext } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

export default function DaysChart() {
  const arabicProp = useContext(isArabic).arabic;

  const labels = ["1", "2", "3", "4", "5", "6" , "7" ,"8" ,"9" ,"10"];

  const data = {
    labels: labels,
    datasets: [
      {
        label: arabicProp ? " غياب" : "  Abcent ",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [16 , 16 , 16 , 15 ,16 , 16 , 16 ,16 , 16 , 16 ],
      },{
        label: arabicProp ? " تأخير" : "  Late ",
        backgroundColor: "blue",
        borderColor: "blue",
        data: [0, 0 ,0,0,2,0, 0 ,0,0,0],
      },{
        label: arabicProp ? " انصراف مبكر" : "  early leave ",
        backgroundColor: "green",
        borderColor: "green",
        data: [0, 0 ,1,0,0,0, 0 ,1,0,0],
      },
    ],
  };
  return (
    <div className=" w-full bg-white shadow-lg">
      <div className="p-4 text-xl border-b">
        <h1>{arabicProp ? " حركات آخر 10 أيام" : "Last 10 days "}</h1>
      </div>
      <div className=" p-8">
        <Line data={data} />
      </div>
    </div>
  );
}
