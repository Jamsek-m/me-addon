/* ---------- Regex Patterns -----------*/

/* exported DATE_PATTERN */
/** Regex pattern for date extraction
 * @memberOf Env
 * @type {string}
 */
const DATE_PATTERN = /(\d{2}-[A-Z][a-z]{2}-\d{4}, \d{2}:\d{2}:\d{2})/g;

/* exported NEWLINE_PATTERN */
/** Regex pattern for newline extraction
 * @memberOf Env
 * @type {string}
 */
const NEWLINE_PATTERN = /\r?\n|\r/g;

/* ---------- Logic constants -----------*/

/* exported OFFSET_GMT_2 */
/** Offset for GMT+2 timezone
 * @memberOf Env
 * @type {number}
 */
const OFFSET_GMT_2 = 2;

/* ---------- DOM constants -----------*/

/* exported ENABLE_EXTENSION_ID */
/** Checkbox ID for enabling extension
 * @memberOf Env
 * @type {string}
 */
const ENABLE_EXTENSION_ID = "enable_extension";

/* exported ELEM_ATTR_PREFIX */
/** Prefix for custom attributes for HTML elements
 * @memberOf Env
 * @type {string}
 */
const ELEM_ATTR_PREFIX = "data-metimedisplay";

/* ---------- Styles -----------*/

/* exported CSS_CLASS_NOT_FOUND */
/** CSS class denoting date found but not parsed
 * @memberOf Env
 * @type {string}
 */
const CSS_CLASS_NOT_FOUND = "metimedisplay-not-found";

/* exported CSS_CLASS_FIND_ALL */
/** CSS class denoting HTML element was changed by extension
 * @memberOf Env
 * @type {string}
 */
const CSS_CLASS_FIND_ALL = "metimedisplay-find-all";
