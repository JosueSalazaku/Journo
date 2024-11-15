DROP TABLE "comments";--> statement-breakpoint
DROP TABLE "followers";--> statement-breakpoint
DROP TABLE "likes";--> statement-breakpoint
DROP TABLE "media";--> statement-breakpoint
DROP TABLE "postTags";--> statement-breakpoint
DROP TABLE "tags";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_username_unique";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_clerk_id_unique";--> statement-breakpoint
ALTER TABLE "posts" DROP CONSTRAINT "posts_user_id_users_clerk_id_fk";
--> statement-breakpoint
DROP INDEX IF EXISTS "title_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "user_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "clerk_id_unique";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "firstName";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "username";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "clerk_id";