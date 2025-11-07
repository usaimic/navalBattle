-- DropForeignKey
ALTER TABLE "public"."action" DROP CONSTRAINT "action_ship_id_fkey";

-- AlterTable
ALTER TABLE "action" ALTER COLUMN "ship_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "action" ADD CONSTRAINT "action_ship_id_fkey" FOREIGN KEY ("ship_id") REFERENCES "shipChild"("id") ON DELETE SET NULL ON UPDATE CASCADE;
