declare type BooleanKeys<T> = {
	[k in keyof T]: T[k] extends boolean ? k : never
}[keyof T]

declare type WithOptional<T, K extends keyof T> = Omit<T, K> &
	Partial<Pick<T, K>>

declare type Equal<A, B> = A extends B ? (B extends A ? true : false) : false
