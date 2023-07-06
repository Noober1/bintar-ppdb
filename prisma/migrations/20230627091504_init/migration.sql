-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `fullname` VARCHAR(191) NOT NULL,
    `grantedAccess` JSON NOT NULL,

    UNIQUE INDEX `User_id_key`(`id`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Student` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `registrationNumber` VARCHAR(191) NULL,
    `firstName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NULL,
    `nickName` VARCHAR(191) NULL,
    `isRegistered` BOOLEAN NULL DEFAULT false,
    `fileNISN` BOOLEAN NULL DEFAULT false,
    `fileKIPKPS` BOOLEAN NULL DEFAULT false,
    `fileKTP` BOOLEAN NULL DEFAULT false,
    `fileIjazah` BOOLEAN NULL DEFAULT false,
    `fileSKHUN` BOOLEAN NULL DEFAULT false,
    `fileSTK` BOOLEAN NULL DEFAULT false,
    `fileAkta` BOOLEAN NULL DEFAULT false,
    `fileKK` BOOLEAN NULL DEFAULT false,
    `fileRaport` BOOLEAN NULL DEFAULT false,
    `filePhoto23` BOOLEAN NULL DEFAULT false,
    `filePhoto34` BOOLEAN NULL DEFAULT false,
    `fileMCU` BOOLEAN NULL DEFAULT false,
    `fileSKB` BOOLEAN NULL DEFAULT false,
    `relapsingIllness` VARCHAR(191) NULL,
    `seriousIllness` VARCHAR(191) NULL,
    `isSmoker` BOOLEAN NULL DEFAULT false,
    `isPierced` BOOLEAN NULL DEFAULT false,
    `isDrug` BOOLEAN NULL DEFAULT false,
    `isIlliterate` BOOLEAN NULL DEFAULT false,
    `haveSkipLesson` BOOLEAN NULL DEFAULT true,
    `haveTruancy` BOOLEAN NULL DEFAULT true,
    `haveDrunked` BOOLEAN NULL DEFAULT false,
    `haveFought` BOOLEAN NULL DEFAULT true,
    `haveJoinedCriminalGang` BOOLEAN NULL DEFAULT false,
    `haveWatchedPorn` BOOLEAN NULL DEFAULT false,
    `haveADate` BOOLEAN NULL DEFAULT false,
    `haveTattoo` BOOLEAN NULL DEFAULT false,
    `historyEdited` BOOLEAN NULL DEFAULT false,
    `primaryUniformSize` ENUM('S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL', 'XXXXXL', 'XXXXXXL') NULL DEFAULT 'L',
    `secondaryUniformSize` ENUM('S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL', 'XXXXXL', 'XXXXXXL') NULL DEFAULT 'L',
    `gymUniformSize` ENUM('S', 'M', 'L', 'XL', 'XXL', 'XXXL', 'XXXXL', 'XXXXXL', 'XXXXXXL') NULL DEFAULT 'L',
    `shoeSize` INTEGER NULL,
    `measureEdited` BOOLEAN NULL DEFAULT false,
    `bioEdited` BOOLEAN NULL DEFAULT false,
    `NISNNumber` VARCHAR(191) NULL,
    `KIPKPSNumber` VARCHAR(191) NULL,
    `examNumber` VARCHAR(191) NULL,
    `ijazahNumber` VARCHAR(191) NULL,
    `SKHUNNumber` VARCHAR(191) NULL,
    `phoneNumber` VARCHAR(191) NULL,
    `parentPhoneNumber` VARCHAR(191) NULL,
    `gender` ENUM('MALE', 'FEMALE') NULL DEFAULT 'MALE',
    `birthplace` VARCHAR(191) NULL,
    `birthdate` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `religion` ENUM('ISLAM', 'KRISTEN', 'KATHOLIK', 'HINDU', 'BUDHA', 'KONGHUCHU', 'LAINNYA') NULL DEFAULT 'ISLAM',
    `nationality` VARCHAR(191) NULL,
    `birthPosition` INTEGER NULL,
    `siblingCount` INTEGER NULL,
    `bloodRelatedSiblingCount` INTEGER NULL,
    `stepSiblingCount` INTEGER NULL,
    `fosterSiblingCount` INTEGER NULL,
    `familyStatus` ENUM('YATIM', 'PIATU', 'YATIM_PIATU', 'KANDUNG', 'ANGKAT', 'ADOPSI', 'LAINNYA') NULL DEFAULT 'KANDUNG',
    `motherLanguage` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `postalCode` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `livingWith` VARCHAR(191) NULL,
    `schoolDistance` INTEGER NULL,
    `height` INTEGER NULL,
    `weight` INTEGER NULL,
    `bloodType` ENUM('A', 'B', 'AB', 'O') NULL,
    `bloodRhesus` ENUM('PLUS', 'MINUS', 'UNKNOWN') NULL,
    `schoolGraduateYear` INTEGER NULL,
    `fatherFullname` VARCHAR(191) NULL,
    `motherFullname` VARCHAR(191) NULL,
    `fatherBirthdate` DATETIME(3) NULL,
    `motherBirthdate` DATETIME(3) NULL,
    `fatherNationality` VARCHAR(191) NULL,
    `motherNationality` VARCHAR(191) NULL,
    `fatherLastEducation` ENUM('SD', 'MI', 'SMP', 'MTS', 'SMA', 'SMK', 'MA', 'D3', 'S1', 'S2', 'S3') NULL,
    `motherLastEducation` ENUM('SD', 'MI', 'SMP', 'MTS', 'SMA', 'SMK', 'MA', 'D3', 'S1', 'S2', 'S3') NULL,
    `fatherJob` VARCHAR(191) NULL,
    `motherJob` VARCHAR(191) NULL,
    `fatherIncome` INTEGER NULL,
    `motherIncome` INTEGER NULL,
    `fatherAddress` VARCHAR(191) NULL,
    `motherAddress` VARCHAR(191) NULL,
    `gainInformationFrom` ENUM('BROCHURE', 'TEACHER', 'PRESENTATION', 'RADIO', 'BANNER', 'OTHER') NULL DEFAULT 'PRESENTATION',
    `extracurricular` VARCHAR(191) NULL,
    `configId` INTEGER NULL,
    `schoolId` INTEGER NULL,
    `majorId` INTEGER NULL,

    UNIQUE INDEX `Student_id_key`(`id`),
    UNIQUE INDEX `Student_registrationNumber_key`(`registrationNumber`),
    UNIQUE INDEX `Student_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Config` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `year` INTEGER NOT NULL,
    `registrationFormat` VARCHAR(191) NOT NULL DEFAULT 'PSB-_Y_-_I_-_N_',
    `isActive` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `Config_id_key`(`id`),
    UNIQUE INDEX `Config_year_key`(`year`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `School` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `NPSN` INTEGER NOT NULL,
    `type` ENUM('SD', 'MI', 'SMP', 'MTS', 'SMA', 'SMK', 'MA', 'D3', 'S1', 'S2', 'S3') NOT NULL DEFAULT 'SMP',
    `name` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `School_id_key`(`id`),
    UNIQUE INDEX `School_NPSN_key`(`NPSN`),
    UNIQUE INDEX `School_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Major` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `initial` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Major_id_key`(`id`),
    UNIQUE INDEX `Major_initial_key`(`initial`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Administration` (
    `id` VARCHAR(191) NOT NULL,
    `dateCreated` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `description` VARCHAR(191) NOT NULL,
    `payer` VARCHAR(191) NOT NULL,
    `nominal` INTEGER NOT NULL,
    `studentId` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Administration_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_configId_fkey` FOREIGN KEY (`configId`) REFERENCES `Config`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_schoolId_fkey` FOREIGN KEY (`schoolId`) REFERENCES `School`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Student` ADD CONSTRAINT `Student_majorId_fkey` FOREIGN KEY (`majorId`) REFERENCES `Major`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Administration` ADD CONSTRAINT `Administration_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Administration` ADD CONSTRAINT `Administration_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
