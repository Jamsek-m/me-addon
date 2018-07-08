/* exported NumbersUtil */
/**
 * Class for number manipulation
 * @memberOf Utils
 */
class NumbersUtil {

    /**
     * Pads number with '0' to represent date format
     * @param {number} number Number to be padded.
     * @return {string}
     */
    static padNumberWithZero(number) {
        if (number < 10) {
            return `0${number}`;
        }
        return `${number}`;
    }

}
