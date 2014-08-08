/**
 * Created by lyschoening on 08/08/2014.
 */


var exports = {};

export class Layout {

    /**
     *
     * @param contents array of contents, in left-right top-bottom order; each can be an object, dictionary or array.
     * @param meta dictionary of meta information
     */
    constructor(contents, meta = null) {

    }

    /**
     *
     * @param positionOrRow coordinate in the format 'A01' .. or numeric coordinate in left-right top-bottom order.
     *  Alternatively may contain a row number if a column number is also provided.
     * @param column
     */
    get(positionOrRow, column) {

    }

    /**
     *
     * @param fileName suggested file name for saving
     * @param format one of 'xslx' and 'csv'
     * @param converter converter to use for formatting the file; default: 'default'
     */
    saveAs(fileName, format = 'xslx', converter = 'default') {

    }

    toJSON() {

    }
}

export var types = {
    '6-well': {rows: 2, cols: 3},
    '96-deep': {rows: 8, cols: 12},
    '96-flat': {rows: 8, cols: 12},
    '96-pcr': {rows: 8, cols: 12}
};

export var converters = {
    'default': {
        fromSheet(sheet, defaultRowName = null) {

        },

        toSheet(layouts) {

        }
    }
};

export function fromFile(file, converter = 'default') {

}
