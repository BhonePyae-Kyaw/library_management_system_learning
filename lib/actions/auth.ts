"use server";
import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";
import { headers } from "next/headers";
import ratelimit from "@/ratelimit";
import { redirect } from "next/navigation";
import { workflowClient } from "../workflow";
import config from "../config";

export const signInWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = params;

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) return redirect("/too-fast");

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result.error) {
      return { success: false, error: result.error };
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: "Sign in error." };
  }
};

export const signInWithCredentials2 = async (
  params: Pick<AuthCredentials, "email" | "password">
) => {
  console.log("Sign in with credentials 2");
  console.log(params);
  const { email, password } = params;

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) return redirect("/too-fast");

  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return { success: false, error: result.error };
    }

    return { success: true };
  } catch (error) {
    console.log(error, "Signin error");
    return { success: false, error: "Signin error" };
  }
};

export const signUpWithCredentials = async (params: AuthCredentials) => {
  const { email, password, fullName, universityId, universityCard } = params;

  const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) return redirect("/too-fast");

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser.length > 0) {
    return {
      success: false,
      error: "User already exists.",
    };
  }

  const hashedPassword = await hash(password, 10);

  try {
    await db.insert(users).values({
      email,
      password: hashedPassword,
      fullName,
      universityId,
      universityCard,
    });

    await workflowClient.trigger({
      url: `${config.env.prodApiEndpoint}/api/workflow/onboarding`,
      body: {
        email,
        fullName,
      },
    });

    console.log("Triggering here");

    await signInWithCredentials2({ email, password });

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: "Sign up error.",
    };
  }
};
