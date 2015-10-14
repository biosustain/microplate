import XLSX from 'xlsx';
import {Table} from './table.js';
import {pad, validateRecord} from './utils.js';

function dimensions(sheet, row) {
    let rows = 1, columns = 1;
    for (let offset = 1; offset < sheet.rows; offset++) {
        let label = sheet.get(row + offset, 0);
        if (!label || label.length != 1 || label.charCodeAt(0) - 65 != offset - 1) {
            break;
        }
        rows = offset;
    }

    for (let offset = 1; offset < sheet.columns; offset++) {
        if (Number(sheet.get(row, offset)) != offset) {
            break;
        }
        columns = offset;
    }

    return [rows, columns]
}

function validatePosition(string) {
    if (!string.match(/[A-Z]\d+/)) {
        throw `Invalid position: "${string}"`
    }
    return string;
}

function comparePositions(a, b) {
    if(a.charCodeAt(0) == b.charCodeAt(0)) {
        return a.substr(1) - b.substr(1);
    }

    return a.charCodeAt(0) - b.charCodeAt(0);
}

function* range(begin, end, interval = 1) {
    for (let i = begin; i < end; i += interval) {
        yield i;
    }
}

export class PlateLayout {

    /**
     *
     * @param {Array|Object} contents
     * @param name
     * @param rows
     * @param columns
     */
    constructor(contents, {name = null, rows = null, columns = null} = {}) {
        if(contents instanceof Array) {
            this.contents = {};
            for(let [position, content] of contents) {
                this.contents[position] = content;
            }
        } else {
            this.contents = contents;
        }
        this.name = name;
        this.rows = rows;
        this.columns = columns;
        // TODO calculate rows and columns if not given.
    }

    get(row, column) {
        return this.contents[PlateLayout.encodePosition(row, column)];
    }

    pluck(row, column, header = 'default') {
        let contents = this.contents[PlateLayout.encodePosition(row, column)];
        if(contents) {
            return contents[header]
        }
    }

    positions(zeroBased = false) {
        return Object.keys(this.contents)
            .sort(comparePositions);
    }

    *rowNumbers() {
        return Array.from(range(1, this.rows + 1))
    }

    *columnNumbers() {
        return Array.from(range(1, this.columns + 1))
    }

    entries() {
        return [for (position of this.positions()) [position, this.contents[position]]];
    }

    get size() {
        if(this.rows != null && this.columns != null) {
            return this.rows * this.columns;
        }
    }

    toSheet(headers = null) {
        return PlateLayout.toSheet([this], headers)
    }

    /**
     *
     * @param layouts
     * @param keys
     */
    static toSheet(layouts, headers = null, format = 'list') {

    }

    async validate(validators, parallel = false) {
        let contents = {};
        let errors = {};

        if(parallel) {
            let ready = Promise.resolve(null);

            for(let [position, content] of this.entries()) {
                ready = ready.then(() =>
                    validateRecord(content, validators).then(
                        (value) => { contents[position] = value },
                        (error) => { errors[position] = error })
                );
                console.log(position, content)
            }

            await ready;
        } else {
            for(let [position, content] of this.entries()) {
                try {
                    contents[position] = await validateRecord(content, validators);
                } catch (e) {
                    errors[position] = e;
                }
            }

        }

        if(Object.keys(errors).length == 0) {
            return new PlateLayout(contents, this);
        } else {
            throw errors;
        }
    }

    /**
     * Returns a list of layouts.
     *
     * @param sheet
     * @param required
     * @param converters
     */
    static parse(sheet, {default: defaultKey = 'default', required = [], aliases = {}, converters = {}} = {}) {
        // Determine if layout is grid or list-style:
        // - list-style layout starts with a header row.
        // - grid-style layout starts with an empty line or plate name, followed by A,B,C..
        if (!sheet.get(0, 0) || sheet.get(1, 0) == 'A') {
            let layouts = [];

            for (let r = 0; r <= sheet.rows; r++) {
                // TODO also check that platename is not null?
                if (sheet.get(r + 1, 0) != 'A' || Number(sheet.get(r, 1)) != 1) {
                    continue;
                }

                let name = sheet.get(r, 0);
                let [rows, columns] = dimensions(sheet, r);
                let contents = {};

                for (let row = 1; row <= rows; row++) {
                    for (let column = 1; column <= columns; column++) {
                        contents[PlateLayout.encodePosition(row, column)] = {[defaultKey]: sheet.get(r + row, column)};
                    }
                }

                layouts.push(new PlateLayout(contents, {name, rows, columns}));
                r += rows;
            }

            return layouts;
        } else {
            let contents = {};
            let table = Table.parse(sheet, {
                required: required.concat(['plate', 'position']),
                converters: Object.assign(converters, {plate: 'string', position: 'string(position)'}),
                aliases: Object.assign({
                    'plate': ['plate', 'plate id', 'plate barcode'],
                    'position': ['well']
                }, aliases)
            });

            for (let row of table) {
                if (!(row.plate in contents)) {
                    contents[row.plate] = {};
                }

                contents[row.plate][row.position] = row;
                delete row.plate;
                delete row.position;
            }

            return [for(name of Object.keys(contents)) new PlateLayout(contents[name], {name})];
        }
    }


    static encodePosition(rowNumber, columnNumber, zeroBased = false) {
        return `${String.fromCharCode(64 + rowNumber + zeroBased)}${pad(columnNumber + zeroBased)}`;
    }

    static decodePosition(position, zeroBased = false) {
        return [position.charCodeAt(0) - 64 - zeroBased, parseInt(position.substr(1)) - zeroBased];
    }
}

