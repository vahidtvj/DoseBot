const en = {
	appName: "DoseBot",
	app: {
		about: "برنامه متن‌باز برای مدیریت دارو و سلامت",
		build: "نسخه",
		version: "ویرایش",
		sourceCode: "کد سورس",
		license: "لایسنس",
	},
	medicine: {
		skip: "رد کردن",
		confirm: "تایید",
		pill: "{{count}} قرص",
		pills: "قرص",
		remaining: "{{count}} باقی‌مانده",
		daily: "روزانه",
		dailyDose: "{{count}} بار روزانه",
		everyXday: "هر x روز",
		interval: "بازه",
		daysAffix: "روز",
		everyXdayDose: "هر {{count}} روز",
		weekly: "هفتگی",
		type: "نوع",
		addDose: "افزودن دوز",
	},
	medType: {
		pill: "قرص",
		injection: "آمپول",
		iv: "سرم",
		drop: "قطره",
		suppository: "شیاف",
		inhaler: "اینهالر",
		syrup: "شربت",
		spray: "اسپری",
		patch: "برچسب",
		generic: "سایر",
	},
	medicineName: "نام دارو",
	intakeAdvice: "نحوه مصرف",
	count: "تعداد",
	threshold: "آستانه",
	inventory: "موجودی",
	priority: "اولویت",
	schedules: "دوز‌ها",
	placeholder: {
		medicineName: "استامینوفن",
	},
	date: {
		Sun: "یک‌شنبه",
		Mon: "دوشنبه",
		Tue: "سه‌شنبه",
		Wed: "چهار‌شنبه",
		Thu: "پنج‌شنبه",
		Fri: "جمعه",
		Sat: "شنبه",
	},
	join: "، ",
	add: "افزودن",
	save: "ذخیره",
	start: "شروع",
	end: "پابان",
	startDate: "تاریخ شروع",
	endDate: "تاریخ پایان",
	time: "زمان",
	amount: "مقدار",
	tomorrow: "فردا",
	yesterday: "دیروز",
	inventoryLow: "موجودی کم",
	navigation: {
		settings: "تنظیمات",
		permissions: "دسترسی‌ها",
		rate: "به ما امتیاز دهید",
		about: "درباره",
		medDetails: "جزئیات دارو",
		scheduleDetails: "جزئیات دوز‌ها",
		history: "تاریخچه",
		overview: "دوز‌ها",
		medications: "دارو‌ها",
		newMed: "داروی جدید",
		newSchedule: "دوز جدید",
		travelCalculator: "ماشین حساب سفر",
	},
	settings: {
		theme: "تم",
		themes: {
			system: "سیستم",
			light: "روشن",
			dark: "تیره",
		},
		materialYou: "Material You",
		language: "زبان",
		languages: {
			system: "سیستم",
			en: "English",
			fa: "فارسی",
		},
		timeFormat: "فرمت ساعت",
		timeFormats: {
			hour24: "24 ساعته",
			hour12: "12 ساعته",
		},
		notifications: "اعلان‌ها",
		calendar: "نوع تاریخ",
		calendars: {
			persian: "شمسی",
			georgian: "میلادی",
		},
		invAlertTime: "زمان هشدار موحودی",
		showNextDose: "نمایش دوز بعدی",
	},
	permissions: {
		welcome: "به DoseBot خوش آمدید",
		notification: "اعلان",
		notificationSub: "اجازه اعلان برای هشدار های دارویی لازم است.",
		alertSettings: "تنظیمات اعلان",
		channel: {
			med: "دارو",
			inv: "موجودی",
		},
		exactAlarm: "زنگ هشدار دقیق",
		exactAlarmSub: "این اجازه برای داشتن اعلان‌های دقیق و به موقع لازم است.",
		batteryOpt: "بهینه‌ساز باتری",
		batteryOptSub:
			"تنظیمات پیش‌فرض بهینه‌ساز باتری ممکن است مانع از اجرای فرآیند پس‌زمینه شود. فرآیند پس‌زمینه، اعلان‌های دارو را هر روز برنامه‌ریزی می‌کند و بدون این، سیستم هشدار ممکن است به درستی کار نکند.",
		autostart: "اجرای خودکار",
		autostartSub:
			"پس از راه‌اندازی مجدد، فرآیند پس‌زمینه متوقف می‌شود و نیاز به راه‌اندازی دستی دارد. فعال‌سازی این گزینه اطمینان می‌دهد که DoseBot همیشه بتواند اجرا شود.",
		go: "بزن بریم",
	},
	select: "انتخاب",
	cancel: "انصراف",
	ok: "تایید",
	today: "امروز",
	numDays: "{{count}} روز",
	duration: "مدت زمان",
	selectAll: "انتخاب همه",
	calculate: "محاسبه",
	reset: "بازنشانی",
	nextDose: "دوز بعدی",
	noMeds:
		"به نظر می‌رسه هنوز دارویی اضافه نکردید! برای شروع، روی دکمه '+' بزنید.",
	noMedsDoseScreen:
		"هنوز دوزی ثبت نشده! به تب داروها برید و داروهاتون رو اضافه کنید تا شروع کنید.",
	noDoses: "کار امروز تموم شد! دیگه دوزی باقی نمونده.",
	grant: "اجازه دادن",
	calendar: "تقویم",
	summary: "خلاصه",
	allMeds: "تمام داروها",
	filter: "فیلتر",
	medHistory: {
		lastMonth: "ماه گذشته",
		last6Month: "۶ ماه گذشته",
		all: "از زمان شروع",
	},
} as const

export default en
