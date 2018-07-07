// globals
let offset = 0;

// constants
const DATE_PATTERN = /(\d{2}-[A-Z][a-z]{2}-\d{4}, \d{2}:\d{2}:\d{2})/g;
const NEWLINE_PATTERN = /\r?\n|\r/g;
const ENABLE_EXTENSION_ID = "enable_extension";

// util functions
const addCSSToPage = () => {
	
	const stili = `
		.mjamsek-ext-not-found {
			font-weight: bold;
			color: yellow;
		}
		.mjamsek-ext-test {
			font-weight: bold;
			color: green;
		}
	`;

	const linkElem = document.createElement("STYLE");
	linkElem.innerHTML = stili;

	const head = document.getElementsByTagName("HEAD")[0];
	head.appendChild(linkElem);
}
const addToggleCheckboxToPage = () => {
	const check = `<input type="checkbox" id="${ENABLE_EXTENSION_ID}" checked="checked"/>`;
	const menuh = document.querySelector("#menuh .right");
	menuh.innerHTML += ` - ${check} ext?`;

	const checkboxElem = document.getElementById(ENABLE_EXTENSION_ID);
	checkboxElem.addEventListener("click", enableOrDisableTimeDisplay);
}
const _padNumberWithZero = (val) => {
	if (val < 10) {
		return "0" + val;
	}
	return val;
}
const _getMonthShortName = (month) => {
	const month_names_short = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	return month_names_short[month];
}
const _getMonthIndexFromShortName = (month) => {
	const month_names_short = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	return month_names_short.indexOf(month);
}
const dateToString = (datum) => {
	// returns format 04-Jul-1318, 12:18:24
	const dan = _padNumberWithZero(datum.getDate());
	const mesec = _getMonthShortName(datum.getMonth());
	const leto = datum.getFullYear();
	const ura = _padNumberWithZero(datum.getHours());
	const minuta = _padNumberWithZero(datum.getMinutes());
	const sekunde = _padNumberWithZero(datum.getSeconds());
	return `${dan}-${mesec}-${leto}, ${ura}:${minuta}:${sekunde}`;
}
const stringToDate = (str) => {
	// 04-Jul-1318, 17:18:22
	const dan = parseInt(str.substring(0, 2));
	const mesec = parseInt(_getMonthIndexFromShortName(str.substring(3, 6)));
	const leto = parseInt(str.substring(7, 11));
	const ura = parseInt(str.substring(13, 15));
	const minuta = parseInt(str.substring(16, 18));
	const sekunda = parseInt(str.substring(19, 21));

	return new Date(leto, mesec, dan, ura, minuta, sekunda, 0);
}
const cleanupString = (str) => {
	const newLinePattern = new RegExp(NEWLINE_PATTERN);
	return str.trim().replace(newLinePattern, "").replace("\t", "");
}
const patternIsContainedInString = (pat, str) => {
	const pattern = new RegExp(pat);
	if (pattern.test(str)) {
		return true;
	}
	const possibleMatches = pattern.exec(str);
	if (possibleMatches && possibleMatches.length > 0) {
		return true;
	}
	return false;
}
const getPatternFromString = (pat, str) => {
	const pattern = new RegExp(pat);
	if (pattern.test(str)) {
		pattern.exec(str);
		return pattern.exec(str)[0];
	}
	const possibleMatches = pattern.exec(str);
	if (possibleMatches && possibleMatches.length > 0) {
		return possibleMatches[0];
	}
	return null;
}
const storeTimeIntoElement = (elem, oldTime, newTime) => {
	elem.classList.add("mjamsek-find-all");
	elem.setAttribute("data-ext-old-time", oldTime);
	elem.setAttribute("data-ext-new-time", newTime);
}

// private functions
const setOffset = () => {
	const trenutniDatum = new Date().getHours();
	const gameDatum = stringToDate(document.getElementById("jclock").innerText).getHours();
	return trenutniDatum - gameDatum;
}

const fixDateToReflectOffset = (datum) => {
	datum.setHours(datum.getHours() + offset);
	return datum;
}

const selectAllTableDataElements = () => {
	return Array.from(document.querySelectorAll("#content td"));
}

const calculateAndFixNewDate = (item) => {
	const tekst = cleanupString(item.innerText);
	if (patternIsContainedInString(DATE_PATTERN, tekst)) {
		const foundValue = getPatternFromString(DATE_PATTERN, tekst);
		if (foundValue) {
			// nasel pattern in ga bo popravil
			const extractedDate = stringToDate(foundValue);
			const fixedDate = fixDateToReflectOffset(extractedDate);
			const fixedTekst = tekst.replace(DATE_PATTERN, dateToString(fixedDate));
			storeTimeIntoElement(item, extractedDate, fixedDate);
			item.innerText = fixedTekst;
		} else {
			// There was field with date, but it was not extracted - something went wrong
			item.classList.add("mjamsek-ext-not-found");
		}
	}
}

const recognizeAllDates = (tdElements) => {
	tdElements.forEach(calculateAndFixNewDate);
	// when reading messages fix displayed date
	const dateFieldOnReadMessagePage = document.querySelector("#content div[style='float:right']");
	if (dateFieldOnReadMessagePage) {
		calculateAndFixNewDate(dateFieldOnReadMessagePage);
	}
}
const calculateEndOfAction = (remainingTime) => {
	const time = remainingTime.split(":").map(item => {
		return parseInt(item);
	});

	const currentDate = new Date();
	currentDate.setHours(currentDate.getHours() + time[0]);
	currentDate.setMinutes(currentDate.getMinutes() + time[1]);
	currentDate.setSeconds(currentDate.getSeconds() + time[2]);
	return `${currentDate.getHours()}:${currentDate.getMinutes()}:${currentDate.getSeconds()}`;
}

// logic functions
const changeMainTimeDisplay = () => {
	const DIV = document.getElementById("jclock");
	
	const oldValue = stringToDate(DIV.innerText);
	const newValue = new Date();

	storeTimeIntoElement(DIV, oldValue, newValue);
	
	DIV.innerText = dateToString(newValue);
}

const changeAllTableDataElements = () => {
	recognizeAllDates(selectAllTableDataElements());
}

const displayEndOfActionTime = () => {
	const actionDescriptionDiv = document.getElementById("actiondescription");

	const countdownTimer = document.querySelector("#defaultCountdown span");
	const endOfActionTime = calculateEndOfAction(countdownTimer.innerText);

	const displayText = actionDescriptionDiv.innerText + ` (ends: ${endOfActionTime})`;

	actionDescriptionDiv.innerText = displayText;
}

const enableOrDisableTimeDisplay = () => {
	const isChecked = document.getElementById(ENABLE_EXTENSION_ID).checked;
	/* if (isChecked) {
		console.log("enabled!");
	} else {
		console.log("disabled!");
	} */
	console.log("Not yet implemented!");
}

// entry point
offset = setOffset();
addCSSToPage();
// addToggleCheckboxToPage();
changeMainTimeDisplay();
changeAllTableDataElements();
displayEndOfActionTime();
