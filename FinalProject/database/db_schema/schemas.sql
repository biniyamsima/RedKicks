/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE IF NOT EXISTS `redkicks`;
USE `redkicks`;

/* Coaches Table */;
CREATE TABLE IF NOT EXISTS `coaches` (
    `coachId` int not null AUTO_INCREMENT,
    `name` varchar(50) not null,
    `teamId` int,
    `wins` int default 0,
    `losses` int default 0,
    `ties` int default 0,
    `username` varchar(50) not null unique,
    `salt` varchar(100) not null,
    `password` varchar(255) not null,
    `avatar` varchar(255) not null,
    PRIMARY KEY `pk_cid` (`coachId`),
    FOREIGN KEY `fk_tid` (`teamId`) REFERENCES `teams`
);

/* Initial Data */;
DELETE FROM `coaches`;
INSERT INTO `coaches` VALUES
    (1, 'Jose Mourinio', 3, 68, 53, 34, 'JMourinio','48c8947f69c054a5caa934674ce8881d02bb18fb59d5a63eeaddff735b0e9', '83d9bdb5e20f3571b087db9aabf190a296741c3e864d7742f35658cfccc1b79c4599aad25084aa9a28c649a50c92244227b3e53e197621301d619d1ea01873c4', '../img/JoseMourinho.png'),
    (2, 'Alex Ferguson', 2, 117, 89, 100, 'AFerguson', '48c8947f69c054a5caa934674ce8881d02bb18fb59d5a63eeaddff735b0e9', '83d9bdb5e20f3571b087db9aabf190a296741c3e864d7742f35658cfccc1b79c4599aad25084aa9a28c649a50c92244227b3e53e197621301d619d1ea01873c4', '../img/Alex_Ferguson.jpg'),
    (3, 'Arsen Wennger', 1, 98, 55, 68, 'AWennger', '48c8947f69c054a5caa934674ce8881d02bb18fb59d5a63eeaddff735b0e9', '83d9bdb5e20f3571b087db9aabf190a296741c3e864d7742f35658cfccc1b79c4599aad25084aa9a28c649a50c92244227b3e53e197621301d619d1ea01873c4', '../img/ArseneWenger.jpg'),
    (4, 'Admin Wong', null, 0, 0, 0, 'admin', '48c8947f69c054a5caa934674ce8881d02bb18fb59d5a63eeaddff735b0e9', '83d9bdb5e20f3571b087db9aabf190a296741c3e864d7742f35658cfccc1b79c4599aad25084aa9a28c649a50c92244227b3e53e197621301d619d1ea01873c4', 'https://i.imgur.com/Nr3LqzZ.png');

/* Teams Table */;
CREATE TABLE IF NOT EXISTS `teams` (
    `teamId` int not null AUTO_INCREMENT,
    `name` varchar(50) not null,
    `origin` varchar(100) not null,
    `logo` varchar(250) not null,
    `wins` int default 0,
    `losses` int default 0,
    `ties` int default 0,
    PRIMARY KEY `pk_tid` (`teamId`)
);
/* Initial Data */;
DELETE FROM `teams`;
INSERT INTO `teams` VALUES
    (1, 'Red Terrors', 'Raleigh, North Carolina', '../img/redterrors.webp', 44, 3, 91),
    (2, 'FC Barcelona', 'Barcelona, Spain', '../img/barcelona.png', 492, 123, 10),
    (3, 'Dragon Team', 'Beijing, China', '../img/dragon.png', 700, 341, 59);

/* Injuries Table */;
CREATE TABLE IF NOT EXISTS `injuries` (
    `injuryId` int not null AUTO_INCREMENT,
    `playerId` int not null,
    `teamId` int,
    `injuryDesc` varchar(50),
    `recoveryTime` int, 
    PRIMARY KEY `pk_iid` (`injuryId`),
    FOREIGN KEY `fk_player` (`playerId`) REFERENCES `players`,
    FOREIGN KEY `fk_team` (`teamId`) REFERENCES `teams`
);
/* Initial Data*/;
DELETE FROM `injuries`;
INSERT INTO `injuries` VALUES
    (1, 2, 1, 'Calf Sprain', 2),
    (2, 8, 2, 'Broken Arm', 8),
    (3, 9, 2, 'Pulled Hamstring', 5);

/* Players Table */;
CREATE TABLE IF NOT EXISTS `players` (
    `playerId` int not null AUTO_INCREMENT,
    `name` varchar(50) not null,
    `position` varchar(20) not null,
    `number` int not null,
    `goalsInSeason` int default 0,
    `goals` int default 0,
    `clearances` int default 0,
    `tackles` int default 0,
    `blocks` int default 0,
    `redCards` int default 0,
    `yellowCards` int default 0,
    `avatar` varchar(255) not null,
    `injuryId` int,
    PRIMARY KEY `pk_pid` (`playerId`),
    FOREIGN KEY `fk_injury` (`injuryId`) REFERENCES `injuries`
);
/* Initial Data */;
DELETE FROM `players`;
INSERT INTO `players` VALUES
    (1, 'Lionel Messi', 'Forward', 10, 10, 44, 3, 91, 5, 0, 0, 'https://i.imgur.com/ezW2O2X.jpeg', null),
    (2, 'Kylian Mbappe', 'Forward', 13, 15, 34, 3, 91, 5, 0, 0, 'https://i.imgur.com/ezW2O2X.jpeg', 1),
    (3, 'Lucas Hatsios', 'Goalkeeper', 19, 10, 44, 3, 91, 5, 0, 0, 'https://i.imgur.com/ezW2O2X.jpeg', null),
    (4, 'Brendan Peeples', 'Mid-fielder', 12, 10, 44, 3, 91, 5, 0, 0, 'https://i.imgur.com/ezW2O2X.jpeg', null),
    (5, 'Cam Murray', 'Defender', 11, 10, 44, 3, 91, 5, 0, 0, 'https://i.imgur.com/ezW2O2X.jpeg', null),
    (6, 'Christian Zaragoza', 'Defender', 18, 10, 44, 3, 91, 5, 0, 0, 'https://i.imgur.com/ezW2O2X.jpeg', null),
    (7, 'Declan Brose', 'Mid-fielder', 20, 10, 44, 3, 91, 5, 0, 0, 'https://i.imgur.com/ezW2O2X.jpeg', null),
    (8, 'Drew Loveface', 'Mid-fielder', 24, 10, 44, 3, 91, 5, 0, 0, 'https://i.imgur.com/ezW2O2X.jpeg', 2),
    (9, 'Calem Tommy', 'Mid-fielder', 30, 10, 44, 3, 91, 5, 0, 0, 'https://i.imgur.com/ezW2O2X.jpeg', 3),
    (10, 'Junior Nare', 'Forward', 40, 10, 44, 3, 91, 5, 0, 0, 'https://i.imgur.com/ezW2O2X.jpeg', null),
    (11, 'Windham Ellis', 'Goalkeeper', 31, 10, 44, 3, 91, 5, 0, 0, 'https://i.imgur.com/ezW2O2X.jpeg', null),
    (12, 'Erling Haaland', 'Striker', 42, 10, 44, 3, 91, 5, 0, 0, 'https://i.imgur.com/ezW2O2X.jpeg', null),
    (13, 'Christian Ronaldo', 'Forward', 34, 10, 44, 3, 91, 5, 0, 0, 'https://i.imgur.com/ezW2O2X.jpeg', null),
    (14, 'Kendall Edwards', 'Defender', 36, 10, 44, 3, 91, 5, 0, 0, 'https://i.imgur.com/ezW2O2X.jpeg', null),
    (15, 'Jarvis Cleal', 'Defender', 99, 10, 44, 3, 91, 5, 0, 0, 'https://i.imgur.com/ezW2O2X.jpeg', null);

/* Upcoming games schedule. */;
CREATE TABLE IF NOT EXISTS `schedule` (
    `sid` int not null AUTO_INCREMENT,
    `homeTeamId` int not null,
    `awayTeamId` int not null,
    `time` datetime not null,
    `location` varchar(100) not null,
    PRIMARY KEY `pk_sid` (`sid`),
    FOREIGN KEY `fk_home` (`homeTeamId`) REFERENCES `teams` (`teamId`),
    FOREIGN KEY `fk_away` (`awayTeamId`) REFERENCES `teams` (`teamId`)
);
/* Initial Data*/;
DELETE FROM `schedule`;
INSERT INTO `schedule` VALUES
    (1, 1, 2, '2022-11-08 19:00:00','Raleigh, North Carolina'),
    (2, 3, 2, '2022-11-15 18:00:00', 'Beijing, China'),
    (3, 2, 3, '2022-12-12 11:00:00', 'Barcelona, Spain');


/* List of injuries on a team. This is a join table. */;
CREATE TABLE IF NOT EXISTS `team_injuries` (
    `teamId` int not null,
    `injuryId` int not null,
    PRIMARY KEY `pk_ti` (`teamId`, `injuryId`),
    FOREIGN KEY `fk_teamIdInj` (`teamId`) REFERENCES `teams`,
    FOREIGN KEY `fk_injuryIdInj` (`injuryId`) REFERENCES `injuries`
);
/* Initial Data */;
DELETE FROM `team_injuries`;
INSERT INTO `team_injuries` VALUES
    (1, 2),
    (2, 8),
    (2, 9);

/* Join table of players on a team. */;
CREATE TABLE IF NOT EXISTS `team_players` (
    `teamId` int not null,
    `playerId` int not null,
    PRIMARY KEY `pk_tp` (`teamId`, `playerId`),
    FOREIGN KEY `fk_tpTeam` (`teamId`) REFERENCES `teams`,
    FOREIGN KEY `fk_tpPlayer` (`playerId`) REFERENCES `players`
);
/* Initial Data */;
DELETE FROM `team_players`;
INSERT INTO `team_players` VALUES
    (1, 1), (1, 2), (1, 3), (1, 4), (1, 5),
    (2, 6), (2, 7), (2, 8), (2, 9), (2, 10),
    (3, 11), (3, 12), (3, 13), (3, 14), (3, 15);