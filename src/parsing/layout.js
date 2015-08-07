import XLSX from 'xlsx';


function dimensions(sheet, row) {
    let rows = 1, columns = 1;
    for (let offset = 2; offset < sheet.rows; offset++) {
        let rowLabel = sheet.get(row + offset, 0);
        if (rowLabel.length != 1 || rowLabel.charCodeAt(0) - 65 != offset - 1) {
            break;
        }
        rows = offset;
    }

    for (let offset = 2; offset < sheet.columns; offset++) {
        if (Number(sheet.get(row, offset)) != offset - 1) {
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

class PlateLayout {

    constructor(contents, {name = null, rows = null, columns = null}) {
        this.contents = contents;
        this.name = name;
        this.rows = rows;
        this.columns = columns;
    }

    /**
     *
     * @param {[number, number]|string} position
     * @param {string} key
     */
    get([row, column]) {
        if (this.rows > row && this.columns > column) {
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
        return PlateLayout.toSheet([this], keys)
    }

    /**
     *
     * @param layouts
     * @param keys
     */
    static toSheet(layouts, keys = null) {

    }


    async validate(validators, parallel = true) {

        // TODO separate validation step.

        // returns a listing of all validation errors by position.
        //
        // this.validation...


        if(parallel) {

        } else {
            let contents = {};
            let errors = {};
            for(let [position, content] of this.entries()) {
                try {
                    contents[position] = await validateRecord(content);
                } catch (e) {
                    errors[position] = e;
                }
            }

            if(Object.keys(errors).length == 0) {
                return new PlateLayout(contents, this);
            } else {
                throw errors;
            }
        }
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
        aliases={},
        converters={},
        validators={},
        parallel=true
        } = {}) {


        // Determine if layout is grid or list-style:
        // - list-style layout starts with a header row.
        // - grid-style layout starts with an empty line or plate name, followed by A,B,C..
        if (!sheet.get(0, 0) || sheet.get(1, 0) == 'A') {
            let layouts = [];

            for (let r = 0; r <= sheet.rows; r++) {
                // TODO also check that platename is not null?
                if (sheet.get(row + 1, 0) != 'A' || Number(sheet.get(row, 1)) != 1) {
                    continue;
                }

                let name = sheet.get(r, 0);
                let [rows, columns] = dimensions(sheet, r);
                let contents = {};

                for (let row = 1; row <= rows; row++) {
                    for (let column = 1; column <= columns; column++) {
                        contents[PlateLayout.encodePosition(row, column)] = sheet.get(r + row, column);
                    }
                }


                layouts.push(new PlateLayout(contents, {name, rows, columns}));
            }


            for(let layout of layouts) {

                await Promise.all([for(position of Object.keys(contents))
                    [position, validateRecord(contents[position])]]);

             //   for(let [position, content] of )

            }

            return layouts;

        } else {
            let contents = {};
            let table = await Table.parse(sheet, {
                required: required.concat(['plate', 'position']),
                converters: Object.assign(converters, {plate: 'string', position: 'string'}),
                validators: Object.assign(validators, {position: validatePosition}),
                aliases: Object.assign({
                    'plate name': 'plate',
                    'plate id': 'plate',
                    'plate barcode': 'plate',
                    'well': 'position'
                }, aliases),
                parallel
            });

            for (let row of table) {
                if (!(row.plate in contents)) {
                    contents[row.plate] = {}
                }

                contents[row.plate][row.position] = row;
                delete row.plate;
                delete row.position;
            }

            return [for(name of Object.keys(contents)) new PlateLayout(contents[name], {name})];
        }
    }

    positions() {
        return Object.keys(this.contents).sort(comparePositions);
    }

    entries() {
        return [for (position of this.positions()) this.contents[position]];
    }

    get size() {
        if(this.rows != null && this.columns != null) {
            return this.rows * this.columns;
        }
    }

    static encodePosition(rowNumber, columnNumber, zeroBased = false) {
        return `${String.fromCharCode(64 + rowNumber + zeroBased)}${pad(columnNumber + zeroBased)}`;
    }

    static decodePosition(position, zeroBased = false) {
        return [position.charCodeAt(0) - 64 - zeroBased, parseInt(position.substr(1)) - zeroBased];
    }
}

