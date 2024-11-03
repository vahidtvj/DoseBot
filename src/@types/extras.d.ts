declare type BooleanKeys<T> = {
	[k in keyof T]: T[k] extends boolean ? k : never
}[keyof T]

declare type WithOptional<T, K extends keyof T> = Omit<T, K> &
	Partial<Pick<T, K>>

declare type WithRequired<T, K extends keyof T> = Partial<T> &
	Required<Pick<T, K>>

declare type Equal<A, B> = A extends B ? (B extends A ? true : false) : false

declare type PathKeys<T> = T extends object
	? {
			[K in keyof T]-?: K extends string
				? T[K] extends object
					? `${K}` | `${K}.${PathKeys<T[K]>}`
					: `${K}`
				: never
		}[keyof T]
	: never

declare type BooleanPathKeys<T> = {
	[K in keyof T]-?: T[K] extends boolean | undefined // Check if the property is boolean or undefined
		? `${K}` // Include the key if it's boolean or boolean | undefined
		: T[K] extends object // If it's an object, recurse into it
			? `${K}` extends `${infer _}` // Ensure we're capturing paths that can recurse but do not resolve to objects
				? `${K}.${BooleanPathKeys<T[K]>}` // Recurse and concatenate the keys
				: never
			: never // Exclude anything else
}[keyof T]
