import AdminPanel from "@/components/Admin/AdminPanel";
import Admin from "@/components/Admin/Admin";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import React from "react";
import style from "@/styles/admin.module.css";

const page = async () => {
    const session = await getAuthSession();
    if (session?.user.role === "user") {
      return redirect("/");
    }
    return (
<div className={style.admin}>
<Admin/>
<AdminPanel session={session}/>
</div>
        );
    };
    export default page;
    