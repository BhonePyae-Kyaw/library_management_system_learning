const config = {
  env: {
    apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
    imagekit: {
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
      privateKey: process.env.PRIVATE_IMAGEKIT_KEY!,
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
    },
    database_url: process.env.NEXT_PUBLIC_DATABASE_URL!,
    upstash_url: process.env.NEXT_PUBLIC_UPSTASH_REDIS_URL!,
    upstash_token: process.env.NEXT_PUBLIC_UPSTASH_TOKEN!,
  },
};

export default config;
