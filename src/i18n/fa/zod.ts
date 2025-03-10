const zod = {
	errors: {
		invalid_type: "نوع مورد انتظار {{expected}}, نوع دریافت شده {{received}}",
		invalid_type_received_undefined: "الزامی",
		invalid_type_received_null: "الزامی",
		invalid_literal: "مقدار دقیق نامعتبر, مورد انتظار {{expected}}",
		unrecognized_keys: "کلید(ها) شناسایی نشده در آبجکت: {{- keys}}",
		invalid_union: "ورودی با هیچ نوع موردانتظار مطابقت ندارد",
		invalid_union_discriminator:
			"مقدار جدا کننده نامعتبر, مورد انتظار {{- options}}",
		invalid_enum_value:
			"مقدار نامعتبر, مورد انتظار {{- options}}, دریافت شده '{{received}}'",
		invalid_arguments: "مقدار ورودی تابع نامعتبر است",
		invalid_return_type: "نوع خروجی تابع نامعتبر است",
		invalid_date: "تاریخ نامعتبر",
		custom: "ورودی نامعتبر",
		invalid_intersection_types: "امکان اشتراک گیری نیست",
		not_multiple_of: "عدد موردنظر باید مضرب {{multipleOf}} باشد",
		not_finite: "عدد باید متناهی باشد",
		invalid_string: {
			email: "{{validation}} نامعتبر",
			url: "{{validation}} نامعتبر",
			uuid: "{{validation}} نامعتبر",
			cuid: "{{validation}} نامعتبر",
			regex: "نامعتبر",
			datetime: "{{validation}} نامعتبر",
			startsWith: 'باید با "{{startsWith}}" شروع شود',
			endsWith: 'باید با "{{endsWith}}" به اتمام برسد',
		},
		too_small: {
			array: {
				exact: "باید دقیقا {{minimum}} عضو داشته باشد",
				inclusive: "باید حداقل {{minimum}} عضو داشته باشد",
				not_inclusive: "باید بیش از  {{minimum}} عضو داشته باشد",
			},
			string: {
				exact: "باید دقیقا {{minimum}} حرفی باشد",
				inclusive: "باید حداقل {{minimum}} حرفی باشد",
				not_inclusive: "باید بیش از {minimum}} حرف باشد",
			},
			number: {
				exact: "باید دقیقا برابر با {{minimum}} باشد",
				inclusive: "باید بزرگتر یا مساوی {{minimum}} باشد",
				not_inclusive: "باید بزرگتر از {{minimum}} باشد",
			},
			set: {
				exact: "ورودی نامعتبر",
				inclusive: "ورودی نامعتبر",
				not_inclusive: "ورودی نامعتبر",
			},
			date: {
				exact: "باید دقیقا {{- minimum, datetime}} باشد",
				inclusive: "باید بزرگتر یا برابر {{- minimum, datetime}} باشد",
				not_inclusive: "باید بیشتر از {{- minimum, datetime}} باشد",
			},
		},
		too_big: {
			array: {
				exact: "باید دقیقا {{maximum}} عضو باشد",
				inclusive: "باید حداکثر {{maximum}} عضو داشته باشد",
				not_inclusive: "باید کمتر از {{maximum}} عضو داشته باشد",
			},
			string: {
				exact: "باید دقیقا دارای {{maximum}} حرف باشد",
				inclusive: "حداکثر باید دارای  {{maximum}} حرف داشته‌ باشد",
				not_inclusive: "باید کمتر از {{maximum}} حرف باشد",
			},
			number: {
				exact: "باید دقیقا {{maximum}} باشد",
				inclusive: "باید کمتر یا مساوی {{maximum}} باشد",
				not_inclusive: "باید کمتر از {{maximum}} باشد",
			},
			set: {
				exact: "ورودی نامعتبر",
				inclusive: "ورودی نامعتبر",
				not_inclusive: "ورودی نامعتبر",
			},
			date: {
				exact: "باید دقیقا {{- maximum, datetime}} باشد",
				inclusive: "باید کوچکتر یا برابر {{- maximum, datetime}} باشد",
				not_inclusive: "باید کوچتر از {{- maximum, datetime}} باشد",
			},
		},
	},
	validations: {
		email: "ایمیل",
		url: "آدرس اینترنتی",
		uuid: "uuid",
		cuid: "cuid",
		regex: "عبارت منظم",
		datetime: "تاریخ و زمان",
	},
	types: {
		function: "تابع",
		number: "عدد",
		string: "رشته",
		nan: "غیرعدد",
		integer: "عدد صحیح",
		float: "عدد اعشار",
		boolean: "بولی",
		date: "تاریخ",
		bigint: "عددبزرگ",
		undefined: "تعریف‌نشده",
		symbol: "نماد",
		null: "خالی",
		array: "آرایه",
		object: "شی",
		unknown: "ناشناخته",
		promise: "پرامیس",
		void: "تهی",
		never: "هرگز",
		map: "دیکشنری",
		set: "مجموعه",
	},
} as const

const custom = {
	no_decimal: "باید یک عدد صحیح باشد",
} as const
export { zod, custom }
