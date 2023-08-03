/*
  Warnings:

  - Added the required column `registrationDateClose` to the `Config` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `config` ADD COLUMN `registrationDateClose` DATETIME(3) NOT NULL,
    ADD COLUMN `registrationDateOpen` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `student` ADD COLUMN `additionalEdited` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `advanceEdited` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `basicEdited` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `numberEdited` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `parentEdited` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `Annoucement` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `content` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
