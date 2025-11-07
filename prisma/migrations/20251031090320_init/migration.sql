-- DropForeignKey
ALTER TABLE "public"."shipChild" DROP CONSTRAINT "shipChild_parent_id_fkey";

-- AddForeignKey
ALTER TABLE "shipChild" ADD CONSTRAINT "shipChild_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "shipParent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
