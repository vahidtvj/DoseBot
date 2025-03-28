const zod = {
	errors: {
		invalid_type: "Expected {{expected}} but got {{received}} instead",
		invalid_type_received_undefined: "Required",
		invalid_type_received_null: "Required",
		invalid_literal: "Value does not match expected literal: {{expected}}",
		unrecognized_keys: "Unrecognized key(s): {{- keys}}",
		invalid_union: "Invalid input, does not match any expected type",
		invalid_union_discriminator:
			"Invalid discriminator value. Choose from {{- options}}",
		invalid_enum_value:
			"Invalid choice. Expected one of {{- options}}, but got '{{received}}'",
		invalid_arguments: "Invalid function arguments",
		invalid_return_type: "Invalid function return type",
		invalid_date: "Invalid date",
		custom: "Invalid input",
		invalid_intersection_types: "Intersection results could not be merged",
		not_multiple_of: "Must be a multiple of {{multipleOf}}",
		not_finite: "Must be finite",
		invalid_string: {
			email: "Invalid {{validation}}",
			url: "Invalid {{validation}}",
			uuid: "Invalid {{validation}}",
			cuid: "Invalid {{validation}}",
			regex: "Invalid",
			datetime: "Invalid {{validation}}",
			startsWith: 'Invalid input: must start with "{{startsWith}}"',
			endsWith: 'Invalid input: must end with "{{endsWith}}"',
		},
		too_small: {
			array: {
				exact: "Must contain exactly {{minimum}} element(s)",
				inclusive: "Must contain at least {{minimum}} element(s)",
				not_inclusive: "Must contain more than {{minimum}} element(s)",
			},
			string: {
				exact: "Must contain exactly {{minimum}} character(s)",
				inclusive: "Must contain at least {{minimum}} character(s)",
				not_inclusive: "Must contain over {{minimum}} character(s)",
			},
			number: {
				exact: "Must be exactly {{minimum}}",
				inclusive: "Must be greater than or equal to {{minimum}}",
				not_inclusive: "Must be greater than {{minimum}}",
			},
			set: {
				exact: "Invalid input",
				inclusive: "Invalid input",
				not_inclusive: "Invalid input",
			},
			date: {
				exact: "Must be exactly {{- minimum, datetime}}",
				inclusive: "Must be greater than or equal to {{- minimum, datetime}}",
				not_inclusive: "Must be greater than {{- minimum, datetime}}",
			},
		},
		too_big: {
			array: {
				exact: "Must contain exactly {{maximum}} element(s)",
				inclusive: "Must contain at most {{maximum}} element(s)",
				not_inclusive: "Must must contain less than {{maximum}} element(s)",
			},
			string: {
				exact: "Must contain exactly {{maximum}} character(s)",
				inclusive: "Must contain at most {{maximum}} character(s)",
				not_inclusive: "Must contain under {{maximum}} character(s)",
			},
			number: {
				exact: "Must be exactly {{maximum}}",
				inclusive: "Must be less than or equal to {{maximum}}",
				not_inclusive: "Must be less than {{maximum}}",
			},
			set: {
				exact: "Invalid input",
				inclusive: "Invalid input",
				not_inclusive: "Invalid input",
			},
			date: {
				exact: "Must be exactly {{- maximum, datetime}}",
				inclusive: "Must be smaller than or equal to {{- maximum, datetime}}",
				not_inclusive: "Must be smaller than {{- maximum, datetime}}",
			},
		},
	},
	validations: {
		email: "email",
		url: "url",
		uuid: "uuid",
		cuid: "cuid",
		regex: "regex",
		datetime: "datetime",
	},
	types: {
		function: "function",
		number: "number",
		string: "string",
		nan: "nan",
		integer: "integer",
		float: "float",
		boolean: "boolean",
		date: "date",
		bigint: "bigint",
		undefined: "undefined",
		symbol: "symbol",
		null: "null",
		array: "array",
		object: "object",
		unknown: "unknown",
		promise: "promise",
		void: "void",
		never: "never",
		map: "map",
		set: "set",
	},
} as const

const custom = {
	no_decimal: "Value must be a whole number",
} as const
export { zod, custom }
