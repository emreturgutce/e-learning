import { UserType } from 'src/modules/user/schema/user.schema';

declare module 'express-session' {
  export interface Session {
    context: {
      id: string;
      email: string;
      type: UserType;
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
