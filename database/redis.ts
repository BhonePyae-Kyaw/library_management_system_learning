import { Redis } from "@upstash/redis";
import config from "../lib/config";

const redis = new Redis({
  url: config.env.upstash_url,
  token: config.env.upstash_token,
});

export default redis;
