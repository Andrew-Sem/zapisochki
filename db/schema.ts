import { InferModel } from 'drizzle-orm';
import { mysqlTable, varchar, serial, json } from 'drizzle-orm/mysql-core';

export const players = mysqlTable('players', {
	id: serial('id').primaryKey(),
	username: varchar('username', { length: 255 }).notNull(),
	imageUrl: varchar('imageUrl', { length: 255 }).notNull(),
	email: varchar('email', { length: 255 }).notNull(),
});

type Player = InferModel<typeof players>;

export const lobbies = mysqlTable('lobbies', {
	id: serial('id').primaryKey(),
	admin: varchar('admin', { length: 255 }).notNull(),
	players: json('players').$type<Player[] | null>().default(null),
});
