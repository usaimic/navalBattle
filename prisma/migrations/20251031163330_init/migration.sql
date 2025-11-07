-- CreateTable
CREATE TABLE "history" (
    "id" INTEGER NOT NULL,
    "win" INTEGER NOT NULL,
    "lose" INTEGER NOT NULL,
    "played" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "history_userId_key" ON "history"("userId");

-- AddForeignKey
ALTER TABLE "history" ADD CONSTRAINT "history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
