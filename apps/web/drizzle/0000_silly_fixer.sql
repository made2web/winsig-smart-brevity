CREATE TABLE "accounts" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"access_token_expires_at" date,
	"refresh_token_expires_at" date,
	"scope" text,
	"id_token" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"token" text NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL,
	CONSTRAINT "sessions_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user_logs" (
	"id" text PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"data" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"userId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"type" varchar(1),
	"is_cc" boolean DEFAULT false,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"nif" integer,
	"address" text,
	"address2" text,
	"postal_code" text,
	"postal_code_desc" text,
	"district" text,
	"phone" text,
	"fax" text,
	"mobile" text,
	"sale_conditions" text,
	"visits" integer,
	"seller" text,
	"financial" text,
	"plafond" text,
	"is_parent" boolean DEFAULT false,
	"parent_client" text,
	"seller_desc" text,
	"seller_email" text,
	"purchases" text,
	"delivery_type" text,
	"mandatory_ref" boolean DEFAULT false,
	"shipping_method" text,
	"image" text,
	"price_type" integer,
	"shipping" numeric(10, 0) DEFAULT '5',
	"rgpd" boolean DEFAULT false,
	"rgpd_date" text,
	"mkt" boolean DEFAULT false,
	"mkt_events" boolean DEFAULT false,
	"mkt_services" boolean DEFAULT false,
	"mkt_campaigns" boolean DEFAULT false,
	"mkt_newsletter" boolean DEFAULT false,
	"mkt_surveys" boolean DEFAULT false,
	"active" boolean DEFAULT true,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp
);
--> statement-breakpoint
CREATE TABLE "verifications" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp NOT NULL
);
--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_logs" ADD CONSTRAINT "user_logs_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "provider_providerAccountId_idx" ON "accounts" USING btree ("provider_id","account_id");--> statement-breakpoint
CREATE INDEX "user_id_idx" ON "sessions" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "token_idx" ON "sessions" USING btree ("token");--> statement-breakpoint
CREATE INDEX "expires_at_idx" ON "sessions" USING btree ("expiresAt");--> statement-breakpoint
CREATE INDEX "email_idx" ON "users" USING btree ("email");--> statement-breakpoint
CREATE INDEX "identifier_idx" ON "verifications" USING btree ("identifier");--> statement-breakpoint
CREATE INDEX "verifications_expires_at_idx" ON "verifications" USING btree ("expiresAt");