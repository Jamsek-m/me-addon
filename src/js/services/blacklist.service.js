/* exported BlacklistService */
/**
 * Service that provides information on blacklisted pages
 * @memberOf Services
 */
class BlacklistService {

    /**
     * Returns <tt>true</tt> if page is blacklisted, <tt>false</tt> otherwise.
     * @return {boolean}
     */
    static pageIsBlacklisted() {
        const url = window.location.href;
        const matches = BLACKLISTED_URLS.filter(item => {
            return url.includes(item);
        });
        return matches.length > 0;
    }

}
