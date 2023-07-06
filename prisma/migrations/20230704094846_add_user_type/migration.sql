-- DropIndex
DROP INDEX `Administration_id_key` ON `administration`;

-- DropIndex
DROP INDEX `Config_id_key` ON `config`;

-- DropIndex
DROP INDEX `Major_id_key` ON `major`;

-- DropIndex
DROP INDEX `School_id_key` ON `school`;

-- DropIndex
DROP INDEX `Student_id_key` ON `student`;

-- DropIndex
DROP INDEX `User_id_key` ON `user`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `type` ENUM('ADMINISTRATOR', 'USER') NULL DEFAULT 'USER';
