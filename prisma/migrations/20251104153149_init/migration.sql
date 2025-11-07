/*
  Warnings:

  - Made the column `ship_id` on table `action` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."action" DROP CONSTRAINT "action_ship_id_fkey";

-- AlterTable
ALTER TABLE "action" ALTER COLUMN "ship_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "action" ADD CONSTRAINT "action_ship_id_fkey" FOREIGN KEY ("ship_id") REFERENCES "shipChild"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
