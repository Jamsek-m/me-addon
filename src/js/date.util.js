/**
 * Pads number to represent date format
 * @param {number} number Number to be padded.
 * @returns {string}
 */
const padNumberWithZero = (number) => {
    if (number < 10) {
        return `0${number}`;
    }
    return number;
};

/**
 * Testni namespace
 * @namespace MyNamespace
 */

/**
 * Object that represents date.
 * @memberOf MyNamespace
 */
class DateObject {

    /** To construct new instances use <tt>fromDate()</tt> or <tt>fromString()</tt> instead. */
    constructor () {
        this.day = 0;
        this.month = 0;
        this.year = 0;
        this.hour = 0;
        this.minute = 0;
        this.seconds = 0;
    }

    /**
     * Builds <tt>DateObject</tt> from Date object.
     * @param {Date} date Date to be parsed.
     * @returns {DateObject}
     */
    static fromDate (date) {
        const newValue = new DateObject();
        newValue.day = date.getDate();
        newValue.month = date.getMonth();
        newValue.year = date.getFullYear();
        newValue.hour = date.getHours();
        newValue.minute = date.getMinutes();
        newValue.seconds = date.getSeconds();
        return newValue;
    }

    /**
     * Builds <tt>DateObject</tt> from string.
     * @param {string} str String to be parsed. String must be in format 04-Jul-1318, 12:18:24
     * @returns {DateObject}
     */
    static fromString (str) {

    }

    /**
     * Converts <tt>DateObject</tt> to string to be displayed in format 04-Jul-1318, 12:18:24
     * @return {string}
     */
    toString () {
        const day = padNumberWithZero(this.day);
        const monthUtil = new MonthUtil();
        const month = monthUtil.stringFromInt(this.month);
        const year = this.year > 1400 ? this.year - 700 : this.year;
        const hour = padNumberWithZero(this.hour);
        const minute = padNumberWithZero(this.minute);
        const seconds = padNumberWithZero(this.seconds);

        return `${day}-${month}-${year}, ${hour}:${minute}:${seconds}`;
    }

}

/**
 * Util for months
 * @memberOf MyNamespace
 */
class MonthUtil {

    constructor () {
        this._monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    }

    /**
     * Returns short string representation of given month.
     * @param {number} index
     * @return {string}
     */
    stringFromInt (index) {
        return this._monthShortNames[index];
    }

    /**
     * Returns month index of a given short string representation.
     * @param {string} str
     * @return {number}
     */
    intFromString (str) {
        return this._monthShortNames.indexOf(str);
    }

}
