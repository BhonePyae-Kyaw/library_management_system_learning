import { users } from "@/database/schema";
import { serve } from "@upstash/workflow/nextjs";
import { eq } from "drizzle-orm";
import { db } from "@/database/drizzle";
import { sendEmail } from "@/lib/workflow";

type InitialData = {
  email: string;
  fullName: string;
};

const oneDay = 60 * 60 * 24 * 1000;
const oneMonth = oneDay * 30;
const threeDays = oneDay * 3;

type UserState = "non-active" | "active";

const getUserByEmail = async (email: string) => {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  return user[0];
};

const getUserState = async (email: string): Promise<UserState> => {
  const user = await getUserByEmail(email);

  if (!user) {
    return "non-active";
  }

  const lastLogin = new Date(user.lastActivityDate!);
  const now = new Date();
  const timeDiff = now.getTime() - lastLogin.getTime();

  if (timeDiff > threeDays && timeDiff < oneMonth) {
    return "non-active";
  }

  if (timeDiff > oneMonth) {
    return "non-active";
  }

  return "active";
};

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload;

  await context.run("new-signup", async () => {
    await sendEmail({
      email,
      subject: "Welcome to our platform",
      message: `Hello ${fullName}, welcome to our platform`,
    });
  });

  await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3);

  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email);
    });

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        await sendEmail({
          email,
          subject: "We miss you",
          message: `Hello ${fullName}, we miss you. Please come back to our platform`,
        });
      });
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        await sendEmail({
          email,
          subject: "Welcome back to our Platform",
          message: `Hello ${fullName}, we are happy to see you active in our platform`,
        });
      });
    }

    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30);
  }
});
