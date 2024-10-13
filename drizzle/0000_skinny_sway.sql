CREATE TABLE `dosing` (
	`id` integer PRIMARY KEY NOT NULL,
	`schedule_id` integer,
	`time` integer NOT NULL,
	`amount` integer NOT NULL,
	FOREIGN KEY (`schedule_id`) REFERENCES `schedule`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `medicine` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`inventory_enabled` integer NOT NULL,
	`inventory_count` integer NOT NULL,
	`inventory_notifyOn` integer NOT NULL,
	`type` text NOT NULL,
	`paused` integer NOT NULL,
	`note` text,
	`removed` integer DEFAULT false
);
--> statement-breakpoint
CREATE TABLE `schedule` (
	`id` integer PRIMARY KEY NOT NULL,
	`medicine_id` integer,
	`type` text NOT NULL,
	`startDate` integer NOT NULL,
	`endDate` integer,
	`days` text,
	`interval` integer,
	FOREIGN KEY (`medicine_id`) REFERENCES `medicine`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `dose` (
	`id` integer PRIMARY KEY NOT NULL,
	`medicine_id` integer,
	`time` integer NOT NULL,
	`amount` integer NOT NULL,
	`status` text NOT NULL,
	FOREIGN KEY (`medicine_id`) REFERENCES `medicine`(`id`) ON UPDATE no action ON DELETE no action
);
