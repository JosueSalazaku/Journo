import { drizzle} from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import { users } from './schema'
import { eq } from 'drizzle-orm';

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined');
}

const client = postgres(connectionString, { prepare: false })
export const db = drizzle(client);

const allUsers = await db.select().from(users);
const userById = await db.select().from(users).where(eq(users.id, ''));
        