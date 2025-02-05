CREATE TABLE "articles" (
	"id" text PRIMARY KEY NOT NULL,
	"problema" text NOT NULL,
	"url" text NOT NULL,
	"conteudo" text NOT NULL,
	"url_content" text NOT NULL,
	"createdAt" timestamp NOT NULL,
	"updatedAt" timestamp
);
