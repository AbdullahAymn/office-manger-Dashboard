import Cookies from "js-cookie";
import React from "react";
import { ToastContainer, toast } from "react-toastify";

export default async function usePost(li, bod, fun) {
  const token = Cookies.get("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}\n`);
  await fetch(`https://backend2.dasta.store/api/auth/${li}`, {
    method: "POST",
    headers: myHeaders,
    body: bod || {},
  }).then((res) => {
    if (res.status === 200) {
      fun();
    } else {
      toast.warning(`${"Something is wrong"}`);
    }
  });

  return (
    <div>
      <ToastContainer position="top-center" theme="colored" />
    </div>
  );
}
