
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { users, posts } from './schema'
import * as schema  from './schema'

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error('DATABASE_URL is not defined');
}

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client, { schema });

const allUsers = await db.select().from(users);
const allPosts = await db.select().from(posts);
        