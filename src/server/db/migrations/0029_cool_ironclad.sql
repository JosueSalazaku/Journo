ALTER TABLE "posts" ALTER COLUMN "user_id" SET DATA TYPE uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "posts" DROP COLUMN IF EXISTS "picture_url";--> statement-breakpoint
ALTER TABLE "posts" DROP COLUMN IF EXISTS "image_url";