/*
  Warnings:

  - Added the required column `sort` to the `menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `menu` ADD COLUMN `sort` INTEGER NOT NULL,
    ADD COLUMN `type` INTEGER NOT NULL;
