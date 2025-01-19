"use client";
import React from "react";
import AuthForm from "@/components/AuthForm";
import { signUpSchema } from "@/lib/validations";
import { signUpWithCredentials } from "@/lib/actions/auth";

const Sign_Up = () => {
  console.log(signUpWithCredentials);
  return (
    <AuthForm
      type="SIGN_UP"
      schema={signUpSchema}
      defaultValues={{
        email: "",
        password: "",
        fullName: "",
        universityId: 0,
        universityCard: "",
      }}
      onSubmit={signUpWithCredentials}
    />
  );
};

export default Sign_Up;
