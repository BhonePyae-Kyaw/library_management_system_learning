import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QStashClient, resend } from "@upstash/qstash";
import config from "@/lib/config";

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.qstash_url,
  token: config.env.qstash_token,
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
      from: "Bhone <contact@bhonepyaekyaw.me>",
      to: [email],
      subject,
      html: message,
    },
  });
};
