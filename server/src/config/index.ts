import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV}` });

export const {
  PORT,
  NODE_ENV,
  MONGO_URI,
  SESSION_SECRET,
  REDIS_HOST,
  REDIS_PASSWORD,
  REDIS_PORT,
  FRONTEND_URL,
} = process.env;
