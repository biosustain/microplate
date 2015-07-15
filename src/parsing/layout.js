import XLSX from 'xlsx';

class Layout {

    constructor(contents, rows = null, columns = null) {
        this.contents = contents;
        this.rows = rows;
        this.columns = columns;
    }

    /**
     *
     * @param {[number, number]|string} position
     * @param {string} key
     */
    get([row, column]) {
        if(this.rows > row && this.columns > column){
            return this.contents[position];
        }
        throw new RangeError('Position out of bounds');
    }

    set(position, value) {
        this.contents[position] = value;
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

    fromXSLXSheet(sheet) {
        var sheetRange = XLSX.utils.decode_range(sheet['!ref']);
        return new Layout(sheet, sheetRange.s.r, sheetRange.e.r);
    }
}