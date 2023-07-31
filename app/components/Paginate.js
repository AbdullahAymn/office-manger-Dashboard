"use client";
import { isArabic } from "@/utils/langStore";
import React, { useContext, useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

export default function Paginate(props) {
  const isArabicprop = useContext(isArabic).arabic;
  //
  //
  //Num of Rows
  //
  //

  const [rows, setRow] = useState(10);
  const [offset, setOffSet] = useState(0);

  const slice = props.data.slice(offset, offset + +rows);
  useEffect(() => {
    props.getSlice(slice);
  }, [props.data, offset, rows]);

  const numper = Math.ceil(props.data.length / rows);

  const handelClick = (e) => {
    setOffSet(e.selected * rows);
  };
  return (
    <div>
      <div className=" font-sans w-full flex items-center justify-between">
        <div>
          <h4 className=" py-2">{isArabicprop ? "الصفوف" : "Rows"}</h4>
          <input
            onFocus={(e) => e.target.select()}
            onChange={(e) => {
              e.target.value === "" ? setRow(1) : setRow(e.target.value);
            }}
            className="p-2 outline-none border rounded-md w-52"
            type="number"
            min={1}
            max={50}
            // value={rows}
            value={rows}
          ></input>
        </div>
        <div className=" px-2 text-sm md:px-8 md:text-base ">
          <ReactPaginate
            previousLabel={"<<"}
            nextLabel={">>"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={numper}
            marginPagesDisplayed={1}
            pageRangeDisplayed={1}
            onPageChange={handelClick}
            containerClassName={
              "pagination flex items-center space-x-1 md:space-x-2 justify-between "
            }
            subContainerClassName={"pages pagination mx-2 "}
            activeClassName={"active text-sky-400 underline"}
          />
        </div>
      </div>
    </div>
  );
}
