/* exported DATE_PATTERN */
/** Regex pattern for date extraction
 * @memberOf Env
 */
const DATE_PATTERN = /(\d{2}-[A-Z][a-z]{2}-\d{4}, \d{2}:\d{2}:\d{2})/g;
/* exported NEWLINE_PATTERN */
/** Regex pattern for newline extraction
 * @memberOf Env
 */
const NEWLINE_PATTERN = /\r?\n|\r/g;
/* exported ENABLE_EXTENSION_ID */
/** Checkbox ID
 * @memberOf Env
 */
const ENABLE_EXTENSION_ID = "enable_extension";
/* exported OFFSET_GMT_2 */
/** Offset for GMT+2 timezone
 * @memberOf Env
 */
const OFFSET_GMT_2 = 2;

/* exported ELEM_ATTR_PREFIX */
/** Prefix for custom attributes for HTML elements
 * @memberOf Env
 */
const ELEM_ATTR_PREFIX = "data-metimedisplay";

/* ---------- Styles -----------*/

/* exported CSS_CLASS_NOT_FOUND */
/** Date found but not parsed
 * @memberOf Env
 */
const CSS_CLASS_NOT_FOUND = "metimedisplay-not-found";
/* exported CSS_CLASS_FIND_ALL */
/** Date found but not parsed
 * @memberOf Env
 */
const CSS_CLASS_FIND_ALL = "metimedisplay-find-all";
