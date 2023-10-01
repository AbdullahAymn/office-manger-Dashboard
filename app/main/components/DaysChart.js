"use client";
import { isArabic } from "@/utils/langStore";
import React, { useContext } from "react";
import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

export default function DaysChart(props) {
  const arabicProp = useContext(isArabic).arabic;

  let allData = props.dataall || []

  //  console .log(allData)

  const labels = [];
  const abs = [];
  const late = [];
  const extra = [];

  allData.map((e, index) => {
    labels.push(e.day)
    abs.push(e.rangeOfAbcent)
    late.push(e.rangeOfLate)
    extra.push(e.rangeOfEarly)
  })

  const data = {
    labels: labels,
    datasets: [
      {
        label: arabicProp ? " غياب" : "  Abcent ",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: abs,
      },{
        label: arabicProp ? " تأخير" : "  Late ",
        backgroundColor: "blue",
        borderColor: "blue",
        data: late,
      },{
        label: arabicProp ? " انصراف مبكر" : "  early leave ",
        backgroundColor: "green",
        borderColor: "green",
        data: extra,
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
