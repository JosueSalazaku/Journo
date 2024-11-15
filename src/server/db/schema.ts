import { sql } from 'drizzle-orm';
import {pgTableCreator, timestamp, varchar, uuid, uniqueIndex, text } from 'drizzle-orm/pg-core';

const createTable = pgTableCreator((name) => `${name}`);

export const users = createTable('users', {
  id: uuid('id').primaryKey().notNull(),
  name: varchar('name', { length: 255 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  picture: text('picture'), // Optional, fetched from provider
  role: varchar('role', { length: 50 }).default('user').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
}, (table) => ({
  emailIndex: uniqueIndex('emailIndex').on(table.email),
}));

export const posts = createTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  userId: uuid('user_id').notNull().references(() => users.id), // Proper reference syntax
  content: text('content').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
});
