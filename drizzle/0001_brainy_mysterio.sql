CREATE TABLE `lobbies` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`admin` varchar(255) NOT NULL,
	`players` json DEFAULT ('null'),
	CONSTRAINT `lobbies_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `players` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`username` varchar(255) NOT NULL,
	`imageUrl` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	CONSTRAINT `players_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
DROP TABLE `authors`;--> statement-breakpoint
DROP TABLE `categories`;--> statement-breakpoint
DROP TABLE `quotes`;--> statement-breakpoint
ALTER TABLE `lobbies` ADD CONSTRAINT `lobbies_admin_players_id_fk` FOREIGN KEY (`admin`) REFERENCES `players`(`id`) ON DELETE no action ON UPDATE no action;