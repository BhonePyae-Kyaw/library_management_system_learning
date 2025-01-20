"use client";
import AuthForm from "@/components/AuthForm";
import { signInWithCredentials2 } from "@/lib/actions/auth";
import { signInSchema } from "@/lib/validations";
import React from "react";

const Sign_In = () => {
  return (
    <AuthForm
      type="SIGN_IN"
      schema={signInSchema}
      defaultValues={{
        email: "",
        password: "",
      }}
      onSubmit={signInWithCredentials2}
    />
  );
};
export default Sign_In;
