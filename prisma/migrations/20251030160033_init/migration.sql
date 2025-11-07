/*
  Warnings:

  - You are about to drop the column `hittedChild` on the `shipParent` table. All the data in the column will be lost.
  - Added the required column `hitted_child` to the `shipParent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "shipParent" DROP COLUMN "hittedChild",
ADD COLUMN     "hitted_child" INTEGER NOT NULL;
