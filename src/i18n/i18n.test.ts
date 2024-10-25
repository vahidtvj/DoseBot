import { resources } from "./resources"

function fail(reason = "fail was called in a test.") {
	throw new Error(reason)
}

function stripPlurals(input: string) {
	return input.replace(/_(one|two|few|many|other|zero)$/g, "")
}

function checkKeys(
	data: Record<string, unknown>,
	compareTo: Record<string, unknown>,
	path: string[],
) {
	const keys = Object.keys(compareTo)
	const keysData = Object.keys(data)

	for (const key of keys) {
		// if it is an obj recursively check keys
		if (compareTo[key] && typeof compareTo[key] === "object") {
			if (!keysData.includes(key))
				fail(`key "${key}" does not exist in "${path.join(".")}"`)

			const k = key as keyof typeof data
			if (!data[k] || typeof data[k] !== "object")
				fail(
					`key "${key}" is of type object but differs in "${path.join(".")}"`,
				)

			if (
				!checkKeys(
					data[k] as Record<string, unknown>,
					compareTo[key] as Record<string, unknown>,
					[...path, key],
				)
			)
				fail("Unknown Error")
			continue
		}

		// check if data has the same keys ( different languages have different plural rules so key in language A can appear as key_many or key_one in another which is still valid)
		if (keysData.includes(key)) continue
		const strippedKey = stripPlurals(key)
		if (keysData.some((x) => stripPlurals(x) === strippedKey)) continue
		fail(`key "${strippedKey}" does not exist in "${path.join(".")}"`)
	}
	return true
}

test("Check i18n translation files", () => {
	const { en, ...rest } = resources
	for (const lang of Object.keys(rest)) {
		const data = rest[lang as keyof typeof rest]
		expect(checkKeys(data, en, [lang])).toBe(true)
	}
})
