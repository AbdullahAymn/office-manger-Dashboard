"use client";
import { useParams } from "next/navigation";
import React from "react";
import User from "../components/User";
import { tempEmployeesData } from "../tempData";

export default function page() {
    const id = useParams().id;
    const item = tempEmployeesData.find((e) => e.id === +id)
    return <div>
        <User
            edit={true}
            code={item.id}
            active={item.active}
            nameInArabic={item.nameAr}
            nameInEglish={item.nameEn}
            branch={item.branch}
            mangement={item.mangement}
            department={item.department}
            shift={item.shift}
        />
    </div>;
}
