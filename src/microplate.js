


/**
 * Created by lyschoening on 07/07/15.
 */


// reads in multiple sheets
// can be serialized
class Workbook {


    get sheets() {

    }

    saveAs(filename, filetype = 'csv') {

    }
}

// a sheet is a representation of one layout not yet parsed
class Sheet {

    constructor(name = null) {

    }

    saveAs(filename, filetype = 'csv') {

    }

    get(position) {}
    set(position, value) {}
    clear(position) {}
}

class XSLXSheet extends Sheet {

    constructor(sheet, name = null) {
        super();
    }

    /**
     *
     * @param {{row: number, column; number}|string} position
     * @return {string|number|null}
     */
    get(position) {

    }
}


// layout is a parsed layout
class Layout {

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






//
//if(typeof require !== 'undefined') {
//    var XLSX = require('xlsx');
//    var _ = require('underscore');
//    var $traceurRuntime = require('traceur-runtime');
//}
//var PLATE_NAME_HEADER = 'Plate Name';
//var POSITION_HEADER = 'Position';
//var HEADER_ALIASES = {
//    'strain id': 'strain',
//    'strain name': 'strain',
//    'medium id': 'medium',
//    'medium name': 'medium'
//};
//
//function pad(number, digits = 2) {
//    number = parseInt(number);
//    var N = Math.pow(10, digits);
//    if (number < N) {
//        return ('' + (N + number)).slice(1);
//    } else {
//        return '' + number;
//    }
//}
//
//function values(object) {
//    return [for (key of Object.keys(object)) object[key]];
//}
//
//export class Plate {
//    constructor(name, {headers=['default'], rows=8, columns=12} = {}) {
//        this.name = name;
//        this.headers = headers;
//        this.numRows = rows;
//        this.numColumns = columns;
//        this.contents = {};
//    }
//
//    rowNames() {
//        var names = [];
//        for (var i = 0; i < this.numRows; i++) {
//            names.push(String.fromCharCode(65 + i));
//        }
//        return names;
//    }
//
//    columnNames(padded = true) {
//        var names = [];
//        for (var i = 1; i <= this.numColumns; i++) {
//            names.push(padded ? pad(i) : i);
//        }
//        return names;
//    }
//
//    get(position, header=null) {
//        var content = this.contents[position] || {};
//        return header ? content[header] : content;
//    }
//
//    set(position, value, header = null) {
//        if (header == null) {
//            if (this.headers.length == 1) {
//                var defaultHeader = this.headers[0];
//                this.contents[position] = {[defaultHeader]: value};
//            } else {
//                this.contents[position] = value;
//            }
//        } else if (this.contents[position] === undefined) {
//            this.contents[position] = {[header]: value}
//        } else {
//            this.contents[position][header] = value;
//        }
//    }
//
//    toArray({headers=[], forceColumnLayout=false, includeHeaders=true} = {}) {
//
//        if (headers.length == 0) {
//            headers.push(...this.headers);
//        }
//
//        // Column Layout
//        if (headers.length != 1 || forceColumnLayout) {
//            let columnHeaders = [PLATE_NAME_HEADER, POSITION_HEADER, ...headers];
//            let output = includeHeaders ? [columnHeaders] : [];
//
//            // TODO support rows first, columns first
//            this.rowNames().forEach((rowName) => {
//                this.columnNames().forEach((columnName) => {
//                    var position = `${rowName}${columnName}`;
//                    var content = this.get(position);
//                    var values = headers.map((header) => content[header]);
//
//                    // Only include rows that are not entirely null or undefined
//                    if (!values.every((v) => v == null)) {
//                        output.push([this.name, position, ...values]); // PlateName, Position, V1, V2, V3, ..
//                    }
//                });
//            });
//
//            return output;
//
//            // Map Layout
//        } else {
//            let header = headers[0];
//            let columnHeaders = [this.name, ...this.columnNames()]; // PlateName, 1, 2, 3 ..
//            let output = [columnHeaders];
//
//            this.rowNames().forEach((rowName) => {
//                var outputRow = [rowName];
//
//                this.columnNames().forEach((columnName) => {
//                    outputRow.push(this.get(`${rowName}${columnName}`)[header]);
//                });
//
//                output.push(outputRow);
//            });
//
//            return output;
//        }
//    }
//}
//
//Plate.toArray = function (plates, {headers=[], forceColumnLayout=false} = {}) {
//    return plates.map((plate, index) => {
//        return plate.toArray({headers, forceColumnLayout, includeHeaders: index == 0});
//    }).reduce((a, b) => a.concat(b))
//};
//
//Plate.toPosition = function (rowNumber, columnNumber, zeroBased = false) {
//    return `${String.fromCharCode(64 + rowNumber + zeroBased)}${pad(columnNumber + zeroBased)}`;
//};
//
//Plate.toRowColumnPair = function (position, zeroBased = false) {
//    return [position.charCodeAt(0) - 64 - zeroBased, parseInt(position.substr(1)) - zeroBased];
//};
//
//function parse(cell, {startRow=0, endRow=0, defaultHeader='default'} = {}) {
//    // first, detect format -- map or column layout:
//    // column layout must have some headers on the first line
//    // map layout must have a name, followed by sequential letters A..B.. on some rows
//    var cellValue;
//
//    if (cell(startRow, 0) == null || cell(startRow + 1, 0) == 'A') {
//        // Assume map layout.
//        var plates = [];
//
//        // FIXME hardcoded plate dimensions
//        for (let r = startRow; r <= endRow; r++) {
//            let plateName = cell(r, 0);
//
//            if (plateName != null && cell(r + 1, 0) == 'A') {
//                let plate = new Plate(plateName, {headers: [defaultHeader]});
//
//                for (let row = 1; row <= 8; row++) {
//                    if (cell(r + row, 0) != String.fromCharCode(64 + row)) {
//                        // TODO raise error: Expected 'letter' at 'row', column 0 in 'plateName' definition
//                    }
//
//                    for (let column = 1; column <= 12; column++) {
//                        plate.set(Plate.toPosition(row, column), cell(r + row, column));
//                    }
//                }
//
//                plates.push(plate);
//                r += 8;
//            }
//        }
//
//        return plates;
//    } else {
//        // Assume list layout. Try parsing headers.
//
//        var normalizePosition = (position) => Plate.toPosition(...Plate.toRowColumnPair(position));
//        var headers = [];
//        for (var c = 0; ; c++) {
//            if ((cellValue = cell(startRow, c)) != null) {
//                headers.push(HEADER_ALIASES[cellValue.toLowerCase()] || cellValue);
//            } else {
//                break;
//            }
//        }
//
//        var platesByName = {};
//
//        for (let r = startRow + 1; r <= endRow; r++) {
//            // FIXME hardcoded plate & position header positions;
//            // TODO validate position & raise useful errors
//            let plateName = cell(r, 0);
//            let position = normalizePosition(cell(r, 1));
//
//            if (plateName == null || position == null) {
//                continue;
//            }
//
//            let plate = platesByName[plateName] || (platesByName[plateName] = new Plate(plateName, {headers}));
//
//
//            headers.slice(2).forEach((header, index) => {
//                plate.set(position, cell(r, index + 2), header);
//            });
//        }
//
//        return values(platesByName);
//    }
//}
//
//function fromArray(array, options={}) {
//    return parse((row, column) => array[row][column], {
//        defaultHeader: options.defaultHeader,
//        startRow: 0,
//        endRow: array.length - 1
//    });
//}
//
//function fromXSLXSheet(sheet, options={}) {
//    var sheetRange = XLSX.utils.decode_range(sheet['!ref']);
//
//    var cellGetter = (row, column) => {
//        var cell = sheet[XLSX.utils.encode_cell({r: row, c: column})];
//        if (cell !== undefined) {
//            return cell.v;
//        }
//        return null;
//    };
//
//    return parse(cellGetter, {
//        defaultHeader: options.defaultHeader,
//        startRow: sheetRange.s.r,
//        endRow: sheetRange.e.r
//    })
//}
//
//export var PlateParser = {
//    fromArray: fromArray,
//    fromXSLXSheet: fromXSLXSheet
//};
