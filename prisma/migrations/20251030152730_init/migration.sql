-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" VARCHAR(50) NOT NULL,
    "name" VARCHAR(30),
    "surname" VARCHAR(30),
    "email" TEXT NOT NULL,
    "password" VARCHAR(50) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lobby" (
    "id" SERIAL NOT NULL,
    "user1_id" INTEGER,
    "user2_id" INTEGER,
    "play_time" TIMESTAMP(3),
    "winner_id" INTEGER,
    "isPrivate" BOOLEAN NOT NULL,

    CONSTRAINT "lobby_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shipChild" (
    "id" SERIAL NOT NULL,
    "parent_id" INTEGER NOT NULL,
    "status" VARCHAR(20) NOT NULL,

    CONSTRAINT "shipChild_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shipParent" (
    "id" SERIAL NOT NULL,
    "dimension" INTEGER NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "player_id" INTEGER NOT NULL,
    "lobby_id" INTEGER NOT NULL,

    CONSTRAINT "shipParent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "action" (
    "id" SERIAL NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "x" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "ship_id" INTEGER,
    "lobby_id" INTEGER NOT NULL,
    "player_id" INTEGER NOT NULL,

    CONSTRAINT "action_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "lobby" ADD CONSTRAINT "lobby_user1_id_fkey" FOREIGN KEY ("user1_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lobby" ADD CONSTRAINT "lobby_user2_id_fkey" FOREIGN KEY ("user2_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipChild" ADD CONSTRAINT "shipChild_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "shipParent"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipParent" ADD CONSTRAINT "shipParent_lobby_id_fkey" FOREIGN KEY ("lobby_id") REFERENCES "lobby"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shipParent" ADD CONSTRAINT "shipParent_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "action" ADD CONSTRAINT "action_lobby_id_fkey" FOREIGN KEY ("lobby_id") REFERENCES "lobby"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "action" ADD CONSTRAINT "action_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "action" ADD CONSTRAINT "action_ship_id_fkey" FOREIGN KEY ("ship_id") REFERENCES "shipChild"("id") ON DELETE SET NULL ON UPDATE CASCADE;
