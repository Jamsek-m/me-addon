/* exported DateObject */
/**
 * Object that represents date.
 * @memberOf Utils
 */
class DateObject {

    /** To construct new instances use <tt>fromDate</tt>, <tt>fromParams</tt> or <tt>fromString</tt> instead. */
    constructor () {
        this.day = 0;
        this.month = 0;
        this.year = 0;
        this.hour = 0;
        this.minute = 0;
        this.seconds = 0;
        this.date = null;
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
        newValue.date = date;
        return newValue;
    }

    /**
     * Builds <tt>DateObject</tt> from string.
     * @param {string} str String to be parsed. String must be in format 04-Jul-1318, 12:18:24
     * @returns {DateObject}
     */
    static fromString (str) {
        const monthUtil = new MonthUtil();
        const day = parseInt(str.substring(0, 2));
        const month = parseInt(monthUtil.intFromString(str.substring(3, 6)));
        const year = parseInt(str.substring(7, 11));
        const hour = parseInt(str.substring(13, 15));
        const minute = parseInt(str.substring(16, 18));
        const seconds = parseInt(str.substring(19, 21));
        return DateObject.fromParams(day, month, year, hour, minute, seconds);
    }

    /**
     * Builds <tt>DateObject</tt> from params.
     * @param {number} day
     * @param {number} month
     * @param {number} year
     * @param {number} hour
     * @param {number} minute
     * @param {number} seconds
     * @returns {DateObject}
     */
    static fromParams(day, month, year, hour, minute, seconds) {
        const newValue = new DateObject();
        newValue.day = day;
        newValue.month = month;
        newValue.year = year;
        newValue.hour = hour;
        newValue.minute = minute;
        newValue.seconds = seconds;
        newValue.date = new Date(year, month, day, hour, minute, seconds, 0);
        return newValue;
    }

    /**
     * Converts <tt>DateObject</tt> to string to be displayed in format 04-Jul-1318, 12:18:24
     * @return {string}
     */
    toString () {
        const day = NumbersUtil.padNumberWithZero(this.day);
        const monthUtil = new MonthUtil();
        const month = monthUtil.stringFromInt(this.month);
        const year = this.year > 1400 ? this.year - 700 : this.year;
        const hour = NumbersUtil.padNumberWithZero(this.hour);
        const minute = NumbersUtil.padNumberWithZero(this.minute);
        const seconds = NumbersUtil.padNumberWithZero(this.seconds);

        return `${day}-${month}-${year}, ${hour}:${minute}:${seconds}`;
    }

    /**
     * Converts <tt>DateObject</tt> to string to be displayed in format 12:18:24
     * @return {string}
     */
    timeToString() {
        const hour = NumbersUtil.padNumberWithZero(this.hour);
        const minute = NumbersUtil.padNumberWithZero(this.minute);
        const seconds = NumbersUtil.padNumberWithZero(this.seconds);
        return `${hour}:${minute}:${seconds}`;
    }

    /**
     * Converts <tt>DateObject</tt> to Javascript Date object
     * @return {Date}
     */
    toDate() {
        return this.date;
    }

    /**
     * Adds offset to date
     * @param {number} offset
     */
    appendOffset(offset) {
        this.date.setHours(this.date.getHours() + offset);
        this._updateValuesFromDate();
    }

    /**
     * Adds time to date
     * @param {object} time Object with time parameters
     * @param {number} time.hours Hours
     * @param {number} time.minutes Minutes
     * @param {number} time.seconds Seconds
     */
    appendTime(time) {
        this.date.setHours(this.date.getHours() + time.hours);
        this.date.setMinutes(this.date.getMinutes() + time.minutes);
        this.date.setSeconds(this.date.getSeconds() + time.seconds);
        this._updateValuesFromDate();
    }

    /**
     * Updates parameters from date field.
     * @private
     */
    _updateValuesFromDate() {
        this.day = this.date.getDate();
        this.month = this.date.getMonth();
        this.year = this.date.getFullYear();
        this.hour = this.date.getHours();
        this.minute = this.date.getMinutes();
        this.seconds = this.date.getSeconds();
    }

}

/**
 * Util for months
 * @memberOf Utils
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
