declare module 'express-session' {
  export interface Session {
    context: {
      id: string;
      email: string;
      type: string;
      firstname: string;
      lastname: string;
    };
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_URI: string;
      PORT: string;
      NODE_ENV: string;
      SESSION_SECRET: string;
      REDIS_HOST: string;
      REDIS_PASSWORD: string;
      REDIS_PORT: string;
      FRONTEND_URL: string;
      AWS_ACCESS_KEY_ID: string;
      AWS_S3_BUCKET: string;
      AWS_SECRET_ACCESS_KEY: string;
      AWS_S3_REGION: string;
    }
  }
}

interface CookieOptions {
  sameSite: boolean | 'none' | 'strict' | 'lax' | undefined;
  secure: boolean;
  httpOnly: boolean;
  signed: boolean;
}

export {};
