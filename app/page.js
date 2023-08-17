"use client";
import { isArabic } from "@/utils/langStore";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Loader from "./components/Loader";
import Popup from "reactjs-popup";
import Cookies from "js-cookie";

export default function Home() {
  const isArabicProp = useContext(isArabic).arabic;
  const setAra = useContext(isArabic).setArabic;
  useEffect(() => {
    const Cookival = Cookies.get("arabic");
    let preValue = Cookival === "false" ? false : true;
    setAra(preValue);
  }, []);
  const [isCompanyNameTrue, setIsCompanyNameTrue] = useState(false);

  //loader
  const [loader, setLoader] = useState(false);

  //
  //
  // companyName
  //
  //
  const [companyName, setCompanyName] = useState("");

  const companyNameHandeller = (e) => {
    e.preventDefault();
    setIsCompanyNameTrue(true);
  };

  //
  // log in
  //
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const logInHandeller = (e) => {
    e.preventDefault();
    setLoader(true);
  };

  return (
    <body
      className={` font-sans bg-gray-100 ${isArabicProp ? "bortl" : "boltr"}  `}
    >
      <div className=" w-full p-8 min-h-screen bg-gray-300/50">
        <div className=" w-fit border-white border-1 rounded-xl">
          <div
            onClick={() => {
              setAra(!isArabicProp);
              Cookies.set("arabic", !isArabicProp);
            }}
            className=" flex items-center p-4 hover:cursor-pointer h-full hover:bg-black/20 "
          >
            <img
              className=" h-3 w-5 mx-1 md:h-5 md:w-8 md:mx-2"
              src={` ${isArabicProp ? "/usa.jpg" : "/Ar.jpg"}`}
              alt="usa flag"
            />
            <p className=" text-sm md:text-base">{` ${
              isArabicProp ? "English" : "العربية"
            }`}</p>
          </div>
        </div>
        <div className=" p-3 md:p-12 flex items-top justify-center bg-white rounded-2xl shadow-xl w-full md:w-3/5 my-16 mx-auto">
          <div className=" p-8 w-full font-sans md:w-1/2">
            {!isCompanyNameTrue ? (
              <>
                <div className=" w-full text-center">
                  <h1 className=" text-2xl">
                    {isArabicProp
                      ? "اكتب اسم شركتك"
                      : "Write your company name"}
                  </h1>
                  <form className="" onSubmit={companyNameHandeller}>
                    <div>
                      <input
                        required
                        placeholder={
                          isArabicProp
                            ? "اكتب اسم شركتك"
                            : "Write your company name"
                        }
                        type="text"
                        className=" mt-20 w-full border rounded-lg p-2 outline-none "
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                      <button
                        type="submit"
                        className=" text-lg cursor-pointer rounded-lg text-white bg-blue-700 mt-14 w-full p-2"
                      >
                        {isArabicProp ? "متابعة" : "Continue"}
                      </button>
                    </div>
                  </form>
                </div>
              </>
            ) : (
              <>
                <div className=" w-full text-center">
                  <h1 className=" text-2xl">
                    {isArabicProp ? "تسجيل الدخول" : "Login"}
                  </h1>
                  <form className="" onSubmit={logInHandeller}>
                    <div>
                      <input
                        required
                        placeholder={
                          isArabicProp
                            ? "أسم المستخدم"
                            : "Write your company name"
                        }
                        type="text"
                        className=" mt-12 w-full border rounded-lg p-2 outline-none "
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                      <input
                        placeholder={
                          isArabicProp
                            ? "كلمة المرور"
                            : "Write your company name"
                        }
                        required
                        type="password"
                        className=" mt-2 w-full border rounded-lg p-2 outline-none "
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="submit"
                        className=" text-lg cursor-pointer rounded-lg text-white bg-blue-700 mt-14 w-full p-2"
                      >
                        {isArabicProp ? "تسجيل دخول" : "Log in"}
                      </button>
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>
          <hr className=" h-64  hidden md:flex  bg-black border" />
          <div className={`hidden w-1/2 md:flex p-8 `}>
            <img src="/p.jpg" className=" w-full" alt="image for login" />
          </div>
        </div>
      </div>
      <Popup open={loader}>
        <Loader />
      </Popup>
    </body>
  );
}
