import React from "react";
import UpsideAboutUs from "@/components/UpsideAboutUs";
import ServicesAboutUs from "@/components/ServicesAboutUs";
import OurTeamAboutUs from "@/components/OurTeamAboutUs";

const page = () => {
  return (
    <>
      <div>
        <UpsideAboutUs />
      </div>
      <span>
        <ServicesAboutUs />
      </span>
      <div>
        <OurTeamAboutUs />
      </div>
    </>
  );
};
export default page;
