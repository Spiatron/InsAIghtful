import React from "react";
import style from "@/styles/galleryPage.module.css";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import GalleryPage from "@/components/GalleryPage";

const Page = async () => {
  const session = await getAuthSession();

  if (!session?.user) {
    return redirect("/about");
  }

  return (
    <div className={style.galleryPage}>
      <div>
        <GalleryPage userId={session.user.id} />
      </div>
    </div>
  );
};

export default Page;
