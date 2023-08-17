"use client";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { isArabic } from "../../utils/langStore";
import Cookies from "js-cookie";
import { Basic } from "./utils/Basic";
import { ProcedureMainData } from "./utils/Procedure";
import { ReportsMainData } from "./utils/Reports";
import { usersMainData } from "./utils/Users";
import SideBar from "../components/SideBar";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  //
  //
  // NavBar
  //
  //
  const isArabicprop = useContext(isArabic).arabic;
  const setAra = useContext(isArabic).setArabic;
  useEffect(() => {
    const Cookival = Cookies.get("arabic");
    let preValue = Cookival === "false" ? false : true;
    setAra(preValue);
  }, []);

  const userName = "demo";

  const [drop, setDrop] = useState(false);

  const [smallSideBar, setSmallSideBar] = useState(false);

  //
  //
  //SideBar
  //
  //

  const [show, setShow] = useState(false);

  const li = usePathname();

  //BasicInfo

  const [drobBasic, setDropBasic] = useState(true);

  const basicData = Basic.map((e) => (
    <div onClick={()=> setShow(false)} key={e.icon} className="w-full block">
      <Link href={e.link}>
        <div
          className={`" w-full flex items-center p-2   ${
            li === e.link ? "text-gray-100" : "text-gray-100/50 hover:text-gray-100"
          } "`}
        >
          <i
            className={`mx-2 ${e.icon} ${
              smallSideBar && "text-xl text-center mx-auto"
            }`}
          />
          {!smallSideBar && (
            <h4 className="text-lg font-sans">{` ${
              isArabicprop ? e.arabic : e.english
            }`}</h4>
          )}
        </div>
      </Link>
    </div>
  ));

  //Procedure

  const [drobProcedure, setProcedure] = useState(true);

  const ProcedureData = ProcedureMainData.map((e) => (
    <div onClick={()=> setShow(false)} key={e.icon} className="w-full block">
      <Link href={e.link}>
        <div
          className={`" w-full flex items-center p-2 " ${
            li === e.link ? "text-gray-100" : "text-gray-100/50 hover:text-gray-100"
          }`}
        >
          <i
            className={`mx-2 ${e.icon} ${
              smallSideBar && "text-xl text-center mx-auto"
            }`}
          />
          {!smallSideBar && (
            <h4 className="text-lg font-sans">{` ${
              isArabicprop ? e.arabic : e.english
            }`}</h4>
          )}
        </div>
      </Link>
    </div>
  ));

  //Reports

  const [drobReports, setReports] = useState(true);

  const ReportsData = ReportsMainData.map((e) => (
    <div onClick={()=> setShow(false)} key={e.icon} className="w-full block">
      <Link href={e.link}>
        <div
          className={`" w-full flex items-center p-2 " ${
            li === e.link ? "text-gray-100" : "text-gray-100/50 hover:text-gray-100"
          }`}
        >
          <i
            className={`mx-2 ${e.icon} ${
              smallSideBar && "text-xl text-center mx-auto"
            }`}
          />
          {!smallSideBar && (
            <h4 className="text-lg font-sans">{` ${
              isArabicprop ? e.arabic : e.english
            }`}</h4>
          )}
        </div>
      </Link>
    </div>
  ));

  //Users
  const [drobUsers, setUsers] = useState(true);

  const UsersData = usersMainData.map((e) => (
    <div onClick={()=> setShow(false)} key={e.icon} className="w-full block">
      <Link href={e.link}>
        <div
          className={`" w-full flex items-center p-2 " ${
            li === e.link ? "text-gray-100" : "text-gray-100/50 hover:text-gray-100"
          }`}
        >
          <i
            className={`mx-2 ${e.icon} ${
              smallSideBar && "text-xl text-center mx-auto"
            }`}
          />
          {!smallSideBar && (
            <h4 className="text-lg font-sans">{` ${
              isArabicprop ? e.arabic : e.english
            }`}</h4>
          )}
        </div>
      </Link>
    </div>
  ));

  return (
    <html>
      <body
        className={`${inter.className} font-sans bg-gray-100 ${
          isArabicprop ? "bortl" : "boltr"
        }  `}
      >
        {/*  */}
        {/*  */}
        {/*  Navbar of all site */}
        {/*  */}
        {/*  */}

        <div className=" fixed top-0 w-full z-10 bg-slate-600 flex flex-row justify-between shadow-md shadow-slate-500">
          <div className=" hidden lg:flex">
            <div className=" p-3 text-white text-2xl  flex items-center content-center space-x-8">
              <div className="mx-16">
                <Link href="/main">
                  {/* <p>Logo</p> */}
                  <img alt="logo" className=" h-10 w-20" src="/logo.png" />
                </Link>
              </div>
              <i
                onClick={() => setSmallSideBar(!smallSideBar)}
                className="fa-solid fa-bars-staggered mx-10 hover:cursor-pointer"
              ></i>
              <h1>EASY SOFT</h1>
            </div>
          </div>
          <div className=" flex text-white p-3 text-2xl lg:hidden">
            <i
              onClick={() => setShow(!show)}
              className="fa-solid fa-bars text-xl mx-2 py-2"
            ></i>
            <Link href="/main">
              {/* <p>Logo</p> */}
              <img alt="logo" className=" h-10 w-20 mx-4" src="/logo.png" />
            </Link>
          </div>

          <div className=" hidden md:flex">
            <div className=" px-8  h-full text-white flex">
              <div
                onClick={() => {
                  setAra(!isArabicprop);
                  Cookies.set("arabic", !isArabicprop);
                }}
                className=" flex items-center p-4 hover:cursor-pointer h-full hover:bg-black/20 "
              >
                <img
                  className=" h-3 w-5 mx-1 md:h-5 md:w-8 md:mx-2"
                  src={` ${isArabicprop ? "/usa.jpg" : "/Ar.jpg"}`}
                  alt="usa flag"
                />
                <p className=" text-sm md:text-base">{` ${
                  isArabicprop ? "English" : "العربية"
                }`}</p>
              </div>
              <i className=" fa-solid fa-bell text-2xl p-4 hover:cursor-pointer h-full hover:bg-black/20"></i>
              <i className=" fa-solid fa-envelope text-2xl p-4 hover:cursor-pointer h-full hover:bg-black/20"></i>

              <div
                onClick={() => setDrop(!drop)}
                className="flex items-center p-3 hover:cursor-pointer h-full hover:bg-black/20"
              >
                <img
                  className="h-8 w-8 mx-2 rounded-full"
                  src="/user.png"
                  alt="user image"
                />
                <p className=" text-sm md:text-lg md:mx-2">{userName}</p>
                <i className=" md:mx-2 fa-solid fa-caret-down"></i>
              </div>
            </div>
          </div>
          <div className=" flex md:hidden">
            <div className=" px-2 text-sm  h-full text-white flex">
              <div
                onClick={() => {
                  setAra(!isArabicprop);
                  Cookies.set("arabic", !isArabicprop);
                }}
                className=" flex  items-center p-2 hover:cursor-pointer h-full hover:bg-black/20 "
              >
                <img
                  className="h-4 w-7 mx-1"
                  src={` ${isArabicprop ? "/usa.jpg" : "/Ar.jpg"}`}
                  alt="usa flag"
                />
                <p className=" text-sm">{` ${isArabicprop ? "English" : "العربية"}`}</p>
              </div>

              <div
                onClick={() => setDrop(!drop)}
                className="flex items-center hover:cursor-pointer h-full hover:bg-black/20"
              >
                <p className="text-lg mx-1">{userName}</p>
                <i className=" fa-solid fa-caret-down"></i>
              </div>
            </div>
          </div>
          <div
            className={` ${!drop && "hidden"} text-blue-400 absolute ${
              isArabicprop ? "left-10" : "right-10"
            } mt-16 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none up`}
          >
            {/* <p className="p-2 font-sans text-center text-lg hover:cursor-pointer hover:bg-blue-200/25">{` ${
              isArabicprop ? "تغيير كلمة السر " : "change password"
            }`}</p> */}
            <p className="p-2 font-sans text-center text-lg hover:cursor-pointer hover:bg-blue-200/25">
              {` ${isArabicprop ? "تسجيل خروج   " : "log out"}`}{" "}
            </p>
          </div>
        </div>

        {/*  */}
        {/*  */}
        {/* the body of site */}
        {/*  */}
        {/*  */}

        <div className=" transition-all duration-75 ease-in-out w-full h-screen top-0 pt-14 z-0 fixed  flex">
          {/*  */}
          {/*  */}
          {/* SideBar */}
          {/*  */}
          {/*  */}
          <div
            className={`flex lg:hidden h-full overflow-y-scroll bg-slate-800 px-8 z-0 pt-16 fixed top-0 ${
              show
                ? ` ${isArabicprop ? "siarac" : "sienac"}`
                : ` ${isArabicprop ? "siar" : "sien"}`
            }  `}
          >
            <SideBar
              isArabicprop={isArabicprop}
              smallSideBar={smallSideBar}
              drobBasic={drobBasic}
              basicData={basicData}
              drobProcedure={drobProcedure}
              ProcedureData={ProcedureData}
              drobReports={drobReports}
              ReportsData={ReportsData}
              drobUsers={drobUsers}
              UsersData={UsersData}
            />
          </div>
          <div
            className={`
          hidden lg:flex
           transition-all duration-500 ease-in-out   
            ${
              smallSideBar ? "lg:w-20" : "lg:w-3/12"
            }  bg-slate-800 h-full overflow-y-scroll p-4`}
          >
            <SideBar
              isArabicprop={isArabicprop}
              smallSideBar={smallSideBar}
              drobBasic={drobBasic}
              basicData={basicData}
              drobProcedure={drobProcedure}
              ProcedureData={ProcedureData}
              drobReports={drobReports}
              ReportsData={ReportsData}
              drobUsers={drobUsers}
              UsersData={UsersData}
            />
          </div>

          {/*  */}
          {/*  */}
          {/* Body */}
          {/*  */}
          {/*  */}
          <div
            className={` col-span-12 transition-all duration-500 ease-in-out w-full
            } px-3 pt-3 pb-20 w-full h-full overflow-y-scroll  scroll-y`}
          >
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
