/*
  Warnings:

  - Added the required column `match` to the `history` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "history" ADD COLUMN     "match" INTEGER NOT NULL;
