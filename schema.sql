drop database if exists `instagramData`;
create database if not exists `instagramData`;
use `instagramData`;


drop table if exists `IGUser`;
CREATE TABLE IF NOT EXISTS `IGUser` (
    `pk` BIGINT,
    `username` VARCHAR(64) CHARACTER SET utf8,
    `fullName` VARCHAR(128) CHARACTER SET utf8,
    `isPrivate` VARCHAR(5) CHARACTER SET utf8,
    `profilePicUrl` TEXT CHARACTER SET utf8,
    `profilePicId` VARCHAR(29) CHARACTER SET utf8,
    `isVerified` VARCHAR(5) CHARACTER SET utf8,
    `hasAnonymousProfilePicture` VARCHAR(5) CHARACTER SET utf8,
    `mediaCount` INT,
    `geoMediaCount` INT,
    `followerCount` INT,
    `followingCount` INT,
    `followingTagCount` INT,
    `biography` TEXT CHARACTER SET utf8,
    `externalUrl` INT,
    `totalIgtvVideos` INT,
    `totalArEffects` INT,
    `reelAutoArchive` VARCHAR(2) CHARACTER SET utf8,
    `usertagsCount` INT,
    `isFavorite` VARCHAR(5) CHARACTER SET utf8,
    `isInterestAccount` VARCHAR(5) CHARACTER SET utf8,
    `hasChaining` VARCHAR(4) CHARACTER SET utf8,
    `hdProfilePicVersions` JSON,
    `hdProfilePicUrlInfo` JSON,
    -- `hdProfilePicUrlInfo_url` VARCHAR(186) CHARACTER SET utf8,
    -- `hdProfilePicUrlInfo_width` INT,
    -- `hdProfilePicUrlInfo_height` INT,
    `mutualFollowersCount` INT,
    `profileContext` VARCHAR(20) CHARACTER SET utf8,
    `profileContextLinksWithUserIds` JSON,
    `profileContextMutualFollowIds` JSON,
    `hasHighlightReels` VARCHAR(4) CHARACTER SET utf8,
    `canBeReportedAsFraud` VARCHAR(5) CHARACTER SET utf8,
    `isBusiness` VARCHAR(5) CHARACTER SET utf8,
    `isCallToActionEnabled` BOOLEAN DEFAULT null,
    `accountType` INT,
    `includeDirectBlacklistStatus` VARCHAR(4) CHARACTER SET utf8,
    `isPotentialBusiness` VARCHAR(5) CHARACTER SET utf8,
    `isBestie` VARCHAR(5) CHARACTER SET utf8,
    `hasUnseenBestiesMedia` VARCHAR(5) CHARACTER SET utf8,
    `showAccountTransparencyDetails` VARCHAR(5) CHARACTER SET utf8,
    `autoExpandChaining` VARCHAR(5) CHARACTER SET utf8,
    `highlightReshareDisabled` VARCHAR(5) CHARACTER SET utf8,
    `picture` VARCHAR(195) CHARACTER SET utf8,
    `id` BIGINT
);

drop table if exists `IGFollowers`;
CREATE TABLE IF NOT EXISTS `IGFollowers` (
    `origin` BIGINT,
    `pk` BIGINT,
    `username` VARCHAR(64) CHARACTER SET utf8,
    `fullName` VARCHAR(128) CHARACTER SET utf8,
    `isPrivate` BOOLEAN,
    `profilePicUrl` TEXT CHARACTER SET utf8,
    `profilePicId` VARCHAR(40) CHARACTER SET utf8,
    `isVerified` BOOLEAN,
    `hasAnonymousProfilePicture` BOOLEAN,
    `reelAutoArchive` VARCHAR(32) CHARACTER SET utf8,
    `picture`  TEXT CHARACTER SET utf8,
    `id` BIGINT
);


drop table if exists `IGFollowing`;
CREATE TABLE IF NOT EXISTS `IGFollowing` (
    `pk` BIGINT,
    `username` VARCHAR(64) CHARACTER SET utf8,
    `fullName` VARCHAR(128) CHARACTER SET utf8,
    `isPrivate` BOOLEAN,
    `profilePicUrl` TEXT CHARACTER SET utf8,
    `profilePicId` VARCHAR(40) CHARACTER SET utf8,
    `isVerified` BOOLEAN,
    `hasAnonymousProfilePicture` BOOLEAN,
    `reelAutoArchive` VARCHAR(32) CHARACTER SET utf8,
    `latestReelMedia` BIGINT,
    `isFavorite` BOOLEAN,
    `picture` TEXT CHARACTER SET utf8,
    `id` BIGINT
);