import { sql } from 'drizzle-orm';
import {pgTableCreator, timestamp, varchar, uuid, uniqueIndex, text } from 'drizzle-orm/pg-core';

const createTable = pgTableCreator((name) => `${name}`);

export const users = createTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 255 }).notNull(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  pictureUrl: text('picture_url').notNull(),
}, (table) => ({
  emailIndex: uniqueIndex('emailIndex').on(table.email),
}));

export const posts = createTable('posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  userId: uuid('user_id').notNull().references(() => users.id),
  content: text('content').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).default(sql`CURRENT_TIMESTAMP`).notNull(),
})