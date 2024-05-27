import { MMKV } from "react-native-mmkv"
import superjson from "superjson"
import type {
	PersistStorage,
	StateStorage,
	StorageValue,
} from "zustand/middleware"
// import { initializeMMKVFlipper } from 'react-native-mmkv-flipper-plugin'

export const storage = new MMKV()

// if (__DEV__) {
//   initializeMMKVFlipper({ default: storage })
// }
// export const storage = new MMKV({
//   id: `user-${userId}-storage`,
//   path: `${USER_DIRECTORY}/storage`,
//   encryptionKey: 'hunter2'
// })

export const zustandStorage: StateStorage = {
	setItem: (name, value) => {
		return storage.set(name, value)
	},
	getItem: (name) => {
		const value = storage.getString(name)
		return value ?? null
	},
	removeItem: (name) => {
		return storage.delete(name)
	},
}

export function createSuperJSONStorage<S>(
	getStorage: () => StateStorage,
): PersistStorage<S> | undefined {
	let storage: StateStorage | undefined

	storage = getStorage()

	const persistStorage: PersistStorage<S> = {
		getItem: (name) => {
			const parse = (str: string | null) => {
				if (str === null) {
					return null
				}
				return superjson.parse(str) as StorageValue<S>
			}
			const str = (storage as StateStorage).getItem(name) ?? null
			if (str instanceof Promise) {
				return str.then(parse)
			}
			return parse(str)
		},
		setItem: (name, newValue) =>
			(storage as StateStorage).setItem(name, superjson.stringify(newValue)),
		removeItem: (name) => (storage as StateStorage).removeItem(name),
	}

	return persistStorage
}
