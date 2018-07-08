/* exported MainTimeDisplayService */
/**
 * Service for displaying main server time
 * @memberOf Services
 */
class MainTimeDisplayService {

    /**
     * Sets main clock to used offset.
     */
    static display() {
        const mainClock = document.getElementById(MainTimeDisplayService._MAIN_CLOCK_ID);
        const time =  DateObject.fromString(mainClock.innerText);

        const oldValue = time.toDate();

        time.appendOffset(getDefaultTimezone());
        mainClock.innerText = time.toString();

        StoreChangedDataService.storeData(mainClock, oldValue, time.toDate());
    }

    /**
     * @return {string}
     * @private
     */
    static get _MAIN_CLOCK_ID() {
        return "jclock";
    }

}
