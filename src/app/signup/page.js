"use client";
import SignUpDone from "@/components/SignUpDone";
import SignUpForm from "@/components/SignUpForm";
import { useState } from "react";

export default function Home() {
  const [submit, setSubmit] = useState(false);

  const SubmitButton = () => {
    setSubmit(true);
  };

  return (
    <>
    {!submit ? <SignUpForm SubmitButton={SubmitButton} /> : <SignUpDone />}
    </>
  );
}
