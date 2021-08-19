import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV}` });

export const { PORT, NODE_ENV, GLOBAL_PREFIX, MONGO_URI } = process.env;
