/*
  Warnings:

  - You are about to drop the column `desc` on the `SetDB` table. All the data in the column will be lost.
  - You are about to drop the column `format_data` on the `SetDB` table. All the data in the column will be lost.
  - You are about to drop the column `owner` on the `SetDB` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `SetDB` table. All the data in the column will be lost.
  - Added the required column `data` to the `SetDB` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SetDB" DROP COLUMN "desc",
DROP COLUMN "format_data",
DROP COLUMN "owner",
DROP COLUMN "title",
ADD COLUMN     "data" JSONB NOT NULL;
