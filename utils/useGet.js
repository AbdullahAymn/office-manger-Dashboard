import Cookies from "js-cookie";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default async function useGet(li) {
  const [data, setData] = useState([]);
  const token = Cookies.get("token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}\n`);
  useEffect(() => {
    fetch(`https://backend2.dasta.store/api/auth/${li}`, {
      method: "GET",
      headers: myHeaders,
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => setData(data));
      }
    });
  }, []);

  return data;
}
