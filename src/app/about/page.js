import React from "react";
import UpsideAboutUs from "@/components/UpsideAboutUs";
import ServicesAboutUs from "@/components/ServicesAboutUs";
import OurTeam from "@/components/OurTeam";



const page = () => {
  return (
    <>
      <div>
        <UpsideAboutUs />
      </div>
      <div>
        <ServicesAboutUs />
      </div>
      <div>
        <OurTeam/>
      </div>
    </>
  )
}
export default page;
