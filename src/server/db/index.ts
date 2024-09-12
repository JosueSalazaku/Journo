import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { users } from './schema';

const sql = neon(process.env.DRIZZLE_DATABASE_URL!);
export const db = drizzle(sql);

const result = await db.select().from(users);
