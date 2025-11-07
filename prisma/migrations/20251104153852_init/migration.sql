/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `action` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "action_id_key" ON "action"("id");
