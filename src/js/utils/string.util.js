/* exported StringUtil */
/**
 * Class for string manipulation
 * @memberOf Utils
 */
class StringUtil {

    /**
     * @param {string} str String to be worked on.
     */
    constructor(str) {
        this.string = str;
    }

    /**
     * Trims string and removes all newlines and tabulators.
     * @return {StringUtil}
     */
    cleanupString() {
        const newLinePattern = new RegExp(NEWLINE_PATTERN);
        this.string = this.string.trim().replace(newLinePattern, "").replace("\t", "");
        return this;
    }

    /**
     * Tests whether given pattern is present in string.
     * @param {string} pat Regular expression to be tested
     * @return {boolean}
     */
    containsPattern(pat) {
        const pattern = new RegExp(pat);
        if (pattern.test(this.string)) {
            return true;
        }
        const possibleMatches = pattern.exec(this.string);
        return (possibleMatches && possibleMatches.length > 0);
    }

    /**
     * Extracts pattern from string.
     * @param {string} pat Regular expression to be tested
     * @return {string}
     */
    extractPattern(pat) {
        const pattern = new RegExp(pat);
        if (pattern.test(this.string)) {
            pattern.exec(this.string);
            return pattern.exec(this.string)[0];
        }
        const possibleMatches = pattern.exec(this.string);
        if (possibleMatches && possibleMatches.length > 0) {
            return possibleMatches[0];
        }
        return null;
    }

    /**
     * Replaces pattern in string with given value.
     * @param {string} pat
     * @param {string} newValue
     */
    replacePattern(pat, newValue) {
        this.string = this.string.replace(pat, newValue);
    }

    /**
     * Returns string that was worked on.
     * @return {string}
     */
    getString() {
        return this.string;
    }

}
