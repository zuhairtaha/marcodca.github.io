SET NAMES utf8mb4;

CREATE DATABASE `playlist_db`;

USE `playlist_db`;

CREATE TABLE `genre`(
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`id`)
)Engine=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci; 

CREATE TABLE `artist`(
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `bio` TEXT(600),
    PRIMARY KEY(`id`)
)Engine=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci; 

CREATE TABLE `album`(
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `release_date` DATE,
    `cover_img_url` VARCHAR(255) NULL,
    `artist_id` INT (10 )UNSIGNED NOT NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `FK_artist_id` FOREIGN KEY (`artist_id`)
		REFERENCES `artist` (`id`)
        ON DELETE CASCADE
)Engine=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `song`(
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `duration_sec` INT(4),
    `genre_id` INT(10) UNSIGNED NOT NULL,
    `album_id` INT(10) UNSIGNED NOT NULL,
    PRIMARY KEY(`id`),
    FOREIGN KEY(`genre_id`)
		REFERENCES `genre` (`id`),
	CONSTRAINT `FK_album_id` FOREIGN KEY(`album_id`)
		REFERENCES `album` (`id`)
		ON DELETE CASCADE    
) Engine=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `artist_song`(
	`song_id` INT(10) UNSIGNED NOT NULL, 
    `artist_id` INT(10) UNSIGNED NOT NULL,
    PRIMARY KEY (`song_id`, `artist_id`),
    CONSTRAINT `FK_artist_song_song` FOREIGN KEY (`song_id`)
		REFERENCES `song`(`id`)
        ON DELETE CASCADE,
	CONSTRAINT `FK_artist_song_artist` FOREIGN KEY (`artist_id`)
		REFERENCES `artist`(`id`)
        ON DELETE CASCADE
) Engine=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `user`(
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `picture` BINARY,
    PRIMARY KEY (`id`)
) Engine=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `playlist`(
	`id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `creation_date` DATETIME NOT NULL,
    `user_id` INT(10) UNSIGNED NOT NULL,
    PRIMARY KEY(`id`),
    CONSTRAINT `FK_user_id` FOREIGN KEY(`user_id`)
		REFERENCES `user`(`id`)
        ON DELETE CASCADE
) Engine=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `playlist_song`(
	`song_id` INT(10) UNSIGNED NOT NULL,
    `playlist_id` INT(10) UNSIGNED NOT NULL,
    PRIMARY KEY(`song_id`, `playlist_id`),
    CONSTRAINT `FK_playlist_song_id_song` FOREIGN KEY (`song_id`)
		REFERENCES `song`(`id`)
        ON DELETE CASCADE,
	CONSTRAINT `FK_playlist_song_id_playlist` FOREIGN KEY (`playlist_id`)
		REFERENCES `playlist`(`id`)
        ON DELETE CASCADE
)Engine=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

