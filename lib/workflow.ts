import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QStashClient, resend } from "@upstash/qstash";

import config from "./config";

export const workflow = new WorkflowClient({
  baseUrl: config.env.upstash_url,
  token: config.env.upstash_token,

});

const qstashClient = new QStashClient({
  token: config.env.qstash_token,
});

export const sendEmail = async ({
  email,
  subject,
  message,
}: {
  email: string;
  subject: string;
  message: string;
}) => {
  await qstashClient.publishJSON({
    api: {
      name: "email",
      provider: resend({ token: config.env.resend_token }),
    },
    body: {
      from: "Bhone Pyae Kyaw <contact@bhonepyaekyaw.me>",
      to: [email],
      subject,
      html: message,
    },
  });
};
