


/**
 * Created by lyschoening on 07/07/15.
 */


// layout is a parsed layout
class Grid {

    constructor(rows=null, columns=null) {

    }

    /**
     *
     * @param {[number, number]|string} position
     * @param {string} key
     */
    get(position, key = null) {

    }

    set(position, contents) {

    }

    update(position, contents) {

    }

    clear(position) {

    }

    values(key = null) {

    }

    toSheet(keys = null) {

    }

    /**
     * Returns a list of layouts.
     *
     * @param sheet
     * @param required
     * @param converters
     * @param validators
     * @param parallel
     */
    static async parse(sheet, {
        required=[],
        converters={},
        validators={},
        parallel=false
        } = {}) {


    }

    size() {
        return this.rows * this.columns;
    }
}

/**
 * Like Layout, but for tables that are not plate layouts.
 */
class Table {

    static async parse(sheet, {
        required=[],
        converters={},
        validators={},
        parallel=false
        } = {}) {


    }

    append(contents) {

    }

    toSheet() {

    }
}


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


async function createType(Type, properties) {
    var instances = await Type.getList({where: properties}, {cache: false});

    if (instances.length != 0) {
        throw `${Type.name} already exists: ${properties}`
    }

    return new Type(properties)
}

async function findType(Type, properties) {
    var instances = await Type.getList({where: properties}, {cache: false});

    if (instances.length != 1) {
        throw `${Type.name} does not exist: ${properties}`
    }

    return instances[0];
}

function validateType(Type, key) {
    return (key) => findType(Type, {key: value})
}
