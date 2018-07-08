/* exported EndOfActionService */
/**
 * Service for calculating and displaying when action will end.
 * @memberOf Services
 */
class EndOfActionService {

    /**
     * Displays end of action next to action timer
     */
    static display () {
        const actionElement = document.getElementById(EndOfActionService._ACTION_DESC_DIV_ID);
        const countdownTimer = document.querySelector(EndOfActionService._COUNTDOWN_TIMER_SELECTOR);

        const endOfActionTime = EndOfActionService._calculateEndOfAction(countdownTimer.innerText);

        const textNode = document.createTextNode(` (ends: ${endOfActionTime})`);
        actionElement.appendChild(textNode);
    }

    /**
     * Calculates time when action will end and returns it in string
     * @param {string} remainingTime
     * @return {string}
     * @private
     */
    static _calculateEndOfAction (remainingTime) {
        remainingTime = remainingTime.split(":").map(item => {
            return parseInt(item);
        });

        const currentDate = DateObject.fromDate(new Date());
        currentDate.appendTime({hours: remainingTime[0], minutes: remainingTime[1], seconds: remainingTime[2]});
        return currentDate.timeToString();
    }

    /**
     * @return {string}
     * @private
     */
    static get _ACTION_DESC_DIV_ID () {
        return "actiondescription";
    }

    /**
     * @return {string}
     * @private
     */
    static get _COUNTDOWN_TIMER_SELECTOR () {
        return "#defaultCountdown span";
    }

}
