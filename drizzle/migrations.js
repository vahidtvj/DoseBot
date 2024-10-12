// This file is required for Expo/React Native SQLite migrations - https://orm.drizzle.team/quick-sqlite/expo

import m0000 from "./0000_lowly_alice.sql"
import m0001 from "./0001_fast_wendigo.sql"
import m0002 from "./0002_amused_ghost_rider.sql"
import journal from "./meta/_journal.json"

export default {
	journal,
	migrations: {
		m0000,
		m0001,
		m0002,
	},
}
