"use client";
import { isArabic } from "@/utils/langStore";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Loader from "./Loader";
import Popup from "reactjs-popup";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function LogIn() {
  const router = useRouter();

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

  const companyNameHandeller = async (e) => {
    e.preventDefault();
    setLoader(true);

    const formdata = new FormData();
    formdata.append("name", companyName);

    const name = await fetch(
      "https://backend2.dasta.store/api/auth/loginCompan",
      {
        method: "POST",
        body: formdata,
      }
    ).then((res) => {
      if (res.status === 200) {
        setIsCompanyNameTrue(true);
        setLoader(false);
      } else if (res.status === 201) {
        setLoader(false);
        toast.error(
          `${isArabicProp ? "اسم الشركة خطأ" : "wrong Company Name"}`
        );
      } else {
        setLoader(false);
        toast.warning(
          `${isArabicProp ? "هناك مشكلة بالشبكة" : "Something is wrong"}`
        );
      }
    });
  };

  //
  // log in
  //
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const logInHandeller = async (e) => {
    e.preventDefault();
    setLoader(true);
    const formdata = new FormData();
    formdata.append("email", userName);
    formdata.append("password", password);
    const name = await fetch(
      `https://backend2.dasta.store/api/auth/login/${companyName}`,
      {
        method: "POST",
        body: formdata,
      }
    ).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          Cookies.set("token", data.access_token, { expires: 1 / 24 });
          Cookies.set("name", userName, { expires: 1 / 24 });
          // setLoader(false);
          router.push("/main");
        });
      } else if (res.status === 422 || res.status === 201) {
        setLoader(false);
        toast.error(
          `${
            isArabicProp
              ? "اسم المستخدم أو كلمة السر خطأ"
              : "username or password is wrong"
          }`
        );
      } else {
        setLoader(false);
        toast.warning(
          `${isArabicProp ? "هناك مشكلة بالشبكة" : "Something is wrong"}`
        );
      }
    });
  };

  return (
    <body
      className={` font-sans bg-gray-100 ${isArabicProp ? "bortl" : "boltr"}  `}
    >
      <ToastContainer position="top-center" theme="colored" />
      <div className=" w-full p-8 min-h-screen bg-gray-300/50">
        <div className=" w-fit border-white border-1 rounded-xl">
          <div
            onClick={() => {
              setAra(!isArabicProp);
              Cookies.set("arabic", !isArabicProp);
            }}
            className=" flex rounded-xl items-center p-4 hover:cursor-pointer h-full hover:bg-black/20 "
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
                            : "User Name"
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
                            : "Password"
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
