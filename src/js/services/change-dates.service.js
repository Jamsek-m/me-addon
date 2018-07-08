/* exported ChangeDatesService*/
/**
 * Service for changing and displaying all dates
 * @memberOf Services
 */
class ChangeDatesService {

    /**
     * Changes and displays all dates on page.
     */
    static display () {
        if (!BlacklistService.pageIsBlacklisted()) {
            ChangeDatesService.changeAllTableData();
            ChangeDatesService.changeDateWhenReadingMessages();
        }
    }

    /**
     * Changes all dates in 'td' tag
     */
    static changeAllTableData () {
        const tdElements = ChangeDatesService._selectAllTableDataElements();
        tdElements.forEach(ChangeDatesService._calculateAndReplaceAllDates);
    }

    /**
     * Changes displayed date when reading messages
     */
    static changeDateWhenReadingMessages () {
        const dateFieldOnReadMessagePage = document.querySelector(ChangeDatesService._QUERY_FLOATING_DATE);
        if (dateFieldOnReadMessagePage) {
            ChangeDatesService._calculateAndReplaceAllDates(dateFieldOnReadMessagePage);
        }
    }

    /**
     * @param {HTMLElement} element
     * @private
     */
    static _calculateAndReplaceAllDates (element) {
        const tekst = new StringUtil(element.innerText).cleanupString();
        if (tekst.containsPattern(DATE_PATTERN)) {
            const foundValue = tekst.extractPattern(DATE_PATTERN);
            if (foundValue) {
                // extract date from found string
                const extractedDate = DateObject.fromString(foundValue);

                // save extracted date for later
                const oldDate = extractedDate.toDate();

                // fix offset
                extractedDate.appendOffset(OFFSET_GMT_2);

                // replace fixed date in the string that contained it
                tekst.replacePattern(DATE_PATTERN, extractedDate.toString());

                // save for later
                StoreChangedDataService.storeData(element, oldDate, extractedDate);

                // display
                element.innerText = tekst.getString();

            } else {
                // There was field with date, but it was not extracted - something went wrong
                element.classList.add(CSS_CLASS_NOT_FOUND);
            }
        }

    }

    /**
     * @return {HTMLTableDataCellElement[]}
     * @private
     */
    static _selectAllTableDataElements () {
        return Array.from(document.querySelectorAll(ChangeDatesService._QUERY_TD_ELEMS));
    }

    /**
     * @return {string}
     * @private
     */
    static get _QUERY_TD_ELEMS () {
        return "#content td";
    }

    static get _QUERY_FLOATING_DATE () {
        return "#content div[style='float:right']";
    }

}
