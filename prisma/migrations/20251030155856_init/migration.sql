/*
  Warnings:

  - Added the required column `hittedChild` to the `shipParent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "shipParent" ADD COLUMN     "hittedChild" INTEGER NOT NULL;
