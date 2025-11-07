-- AlterTable
CREATE SEQUENCE history_id_seq;
ALTER TABLE "history" ALTER COLUMN "id" SET DEFAULT nextval('history_id_seq'),
ADD CONSTRAINT "history_pkey" PRIMARY KEY ("id");
ALTER SEQUENCE history_id_seq OWNED BY "history"."id";
