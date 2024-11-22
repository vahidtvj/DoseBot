import { drizzle } from "drizzle-orm/expo-sqlite"
import { openDatabaseSync } from "expo-sqlite/next"
import * as schema from "../schema"

export const expoDb = openDatabaseSync("db", { enableChangeListener: true })
// once per connection
expoDb.execAsync("PRAGMA foreign_keys = ON;")

export const db = drizzle(expoDb, { schema })
