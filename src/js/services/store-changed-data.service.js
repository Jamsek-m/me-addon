/* exported StoreChangedDataService */
/**
 * Service for storing changed dates into elements data
 * @memberOf Services
 */
class StoreChangedDataService {

    /**
     * Stores old and new time into HTML element's data.
     * @param {HTMLElement} element
     * @param {Date} oldTime
     * @param {Date} newTime
     */
    static storeData(element, oldTime, newTime) {
        element.classList.add(CSS_CLASS_FIND_ALL);
        element.setAttribute(StoreChangedDataService._OLD_TIME, oldTime);
        element.setAttribute(StoreChangedDataService._NEW_TIME, newTime);
    }

    /**
     * @return {string}
     * @private
     */
    static get _OLD_TIME() {
        return `${ELEM_ATTR_PREFIX}-old-time`;
    }

    /**
     * @return {string}
     * @private
     */
    static get _NEW_TIME() {
        return `${ELEM_ATTR_PREFIX}-new-time`;
    }

}
