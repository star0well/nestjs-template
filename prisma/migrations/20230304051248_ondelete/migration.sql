-- DropForeignKey
ALTER TABLE `useronrole` DROP FOREIGN KEY `UserOnRole_roleId_fkey`;

-- DropForeignKey
ALTER TABLE `useronrole` DROP FOREIGN KEY `UserOnRole_userId_fkey`;

-- AddForeignKey
ALTER TABLE `UserOnRole` ADD CONSTRAINT `UserOnRole_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserOnRole` ADD CONSTRAINT `UserOnRole_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
