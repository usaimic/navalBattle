/*
  Warnings:

  - You are about to drop the column `isPrivate` on the `lobby` table. All the data in the column will be lost.
  - Added the required column `is_private` to the `lobby` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_ready1` to the `lobby` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_ready2` to the `lobby` table without a default value. This is not possible if the table is not empty.
  - Added the required column `turn` to the `lobby` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lobby" DROP COLUMN "isPrivate",
ADD COLUMN     "is_private" BOOLEAN NOT NULL,
ADD COLUMN     "is_ready1" BOOLEAN NOT NULL,
ADD COLUMN     "is_ready2" BOOLEAN NOT NULL,
ADD COLUMN     "turn" INTEGER NOT NULL;
