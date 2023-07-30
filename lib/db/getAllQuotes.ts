import { db } from '@/db';
import { quotes } from '@/db/schema';

export const getAllQuotes = async () => {
	return db.select().from(quotes);
};
