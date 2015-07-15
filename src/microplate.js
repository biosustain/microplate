


/**
 * Created by lyschoening on 07/07/15.
 */


/**
 *
 *
 * Possible converters are:
 *  - string
 *  - number
 *  - string[], number[] etc.
 *
 * Each validator must be a function returning a value or a promise. If
 * an error is thrown, it is used as an error message. As a sheet is parsed,
 * the result is read into a layout. This layout is passed to the validation function
 * to e.g. detect duplicates.
 *
 * @param sheet
 * @param required
 * @param converters
 */
async function parse(sheet, {
    required=[],
    converters={},
    validators={},
    parallel=false
    } = {}) {


    // 1. determine if list or grid layout (maybe this can be enforced when parsing)
    // 2. do conversion. in list layout there is only one converter possible, called 'default'.
    // 3. do validation.

    // return either the layout or errors, or a combination TBD

}
