"use client";
import LoginDone from "@/components/LoginDone";
import LoginPage from "@/components/LoginPage";
import { useState } from "react";

export default function Home() {
  const [submit, setSubmit] = useState(false);

  const SubmitButton = () => {
    setSubmit(true);
  };

  return (
    <>
    {!submit ? <LoginPage SubmitButton={SubmitButton} /> : <LoginDone />}
    </>
  );
}
