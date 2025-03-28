const en = {
	appName: "DoseBot",
	app: {
		about: "An open-source medication & healthcare tracker",
		build: "Build",
		version: "Version",
		sourceCode: "Source Code",
		license: "License",
	},
	medicine: {
		skip: "Skip",
		confirm: "Confirm",
		pills: "pills",
		pill_one: "{{count}} pill",
		pill_other: "{{count}} pills",
		remaining: "{{count}} left",
		daily: "Daily",
		dailyDose: "{{count}} times daily",
		everyXday: "Every X Day",
		interval: "Interval",
		daysAffix: "days",
		everyXdayDose: "Every {{count}} days",
		weekly: "Weekly",
		type: "Type",
		addDose: "Add Dose",
	},
	medType: {
		pill: "Pill",
		injection: "Injection",
		iv: "IV",
		drop: "Drop",
		suppository: "Suppository",
		inhaler: "Inhaler",
		syrup: "Syrup",
		spray: "Spray",
		patch: "Patch",
		generic: "Other",
	},
	medicineName: "Medicine Name",
	intakeAdvice: "Intake Advice",
	count: "Count",
	threshold: "Threshold",
	inventory: "Inventory",
	priority: "Priority",
	schedules: "Schedules",
	placeholder: {
		medicineName: "Acetaminophen",
	},
	date: {
		Sun: "Sun",
		Mon: "Mon",
		Tue: "Tue",
		Wed: "Wed",
		Thu: "Thu",
		Fri: "Fri",
		Sat: "Sat",
	},
	join: ", ",
	add: "Add",
	save: "Save",
	start: "Start",
	end: "End",
	startDate: "Start Date",
	endDate: "End Date",
	time: "Time",
	amount: "Amount",
	tomorrow: "Tomorrow",
	yesterday: "Yesterday",
	inventoryLow: "Inventory Low",
	navigation: {
		settings: "Settings",
		permissions: "Permissions",
		rate: "Rate Us",
		about: "About",
		medDetails: "Medicine Details",
		scheduleDetails: "Schedule Details",
		history: "History",
		overview: "Overview",
		medications: "Medications",
		newMed: "New Medication",
		newSchedule: "New Schedule",
		travelCalculator: "Travel Calculator",
	},

	settings: {
		theme: "Theme",
		themes: {
			system: "System",
			light: "Light",
			dark: "Dark",
		},
		materialYou: "Material You",
		language: "Language",
		languages: {
			system: "System",
			en: "English",
			fa: "فارسی",
		},
		timeFormat: "Time Format",
		timeFormats: {
			hour24: "24-hour",
			hour12: "12-hour",
		},
		notifications: "Notifications",
		calendar: "Calendar",
		calendars: {
			persian: "Persian",
			georgian: "Georgian",
		},
		invAlertTime: "Inventory Alert Time",
		showNextDose: "Show next dose",
	},
	permissions: {
		welcome: "Welcome to DoseBot",
		notification: "Notification",
		notificationSub:
			"DoseBot requires notification permission for medication alerts.",
		alertSettings: "Alert Settings",
		channel: {
			med: "Medication",
			inv: "Inventory",
		},
		exactAlarm: "Exact Alarm",
		exactAlarmSub: "This is required to have accurate, on-time notifications.",
		batteryOpt: "Battery Optimization",
		batteryOptSub:
			"The default battery optimization settings might prevent DoseBot's background process from running. The background process schedules dose notifications every day, and without this, the alert system might misbehave.",
		autostart: "Autostart",
		autostartSub:
			"After a reboot, the background process stops and requires manually launching DoseBot. Enabling this will ensure DoseBot can always run, even after a reboot.",
		go: "Let's go",
	},
	select: "Select",
	cancel: "Cancel",
	ok: "OK",
	today: "Today",
	numDays_one: "{{count}} day",
	numDays_other: "{{count}} days",
	duration: "Duration",
	selectAll: "Select All",
	calculate: "Calculate",
	reset: "Reset",
	nextDose: "Next Dose",
	noMeds:
		"Looks like you haven't added any medications yet! Tap the '+' button to get started.",
	noMedsDoseScreen:
		"No doses yet! Switch to the Medications tab and add your medications to get started.",
	noDoses: "All done for today! No more doses left.",
	grant: "Grant",
	calendar: "Calendar",
	summary: "Summary",
	allMeds: "All Medications",
	filter: "Filter",
	medHistory: {
		lastMonth: "Past Month",
		last6Month: "Past 6 Month",
		all: "All Time",
	},
} as const

export default en
