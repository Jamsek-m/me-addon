/* exported BlacklistService */
/**
 * Service that provides information in blacklisted pages
 * @memberOf Services
 */
class BlacklistService {

    /**
     * Returns <tt>true</tt> if page is blacklisted.
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
