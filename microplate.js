
if(typeof require !== 'undefined') {
    var XLSX = require('xlsx');
    var _ = require('underscore');
}

function decodePosition(position) {
    var row = positionOrRow.charCodeAt(0) - 64;
    var column = parseInt(positionOrRow.substr(1));
}

export class Layout {

    /**
     *
     * @param contents array of contents, in left-right top-bottom order; each can be an object, dictionary or array.
     * @param meta dictionary of meta information
     */
    constructor(contents, meta = null) {
        this.contents = contents;
        this.meta = meta;
    }

    /**
     *
     * @param positionOrRow coordinate in the format 'A01' .. or numeric coordinate in left-right top-bottom order.
     *  Alternatively may contain a row number if a column number is also provided.
     * @param column
     */
    get(positionOrRow, column) {
        var row;
        if(typeof positionOrRow == 'string') {
            row = positionOrRow.charCodeAt(0) - 64;
            column = parseInt(positionOrRow.substr(1));
        } else {
            row = positionOrRow;
        }

        return this.contents[row - 1][column - 1];
    }

    set(position, value) {
        var row = position.charCodeAt(0) - 64;
        var column = parseInt(position.substr(1));
        return this.contents[row - 1][column - 1] = value;
    }

    get rows() {
        return types[this.meta.type].rows;
    }

    get columns() {
        return types[this.meta.type].columns;
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
        var json = _.clone(this.meta);
        var contents = json.contents = {};

        this.contents.forEach((row, r) => {
            row.forEach((well, c) => {
                if(well) {
                    contents[`${String.fromCharCode(65 + r)}${c + 1}`] = well;
                }
            });
        });

        return json;
    }
}

export var types = {
    '6-well': {rows: 2, columns: 3},
    '96-deep': {rows: 8, columns: 12},
    '96-flat': {rows: 8, columns: 12},
    '96-pcr': {rows: 8, columns: 12}
};

function cellValue(sheet, c) {
    var cell = sheet[XLSX.utils.encode_cell(c)];
    if(typeof cell != 'undefined') {
        return cell.v;
    }

    return null;
}

export var converters = {

    'default': {
        fromSheet(sheet, defaultRowName = null) {
            var sheetRange = XLSX.utils.decode_range(sheet['!ref']);
            var cell, meta = {};
            var layouts = [];

            for (var R = sheetRange.s.r; R <= sheetRange.e.r; ++R) {
                cell = cellValue(sheet, {c: 0, r: R});

                if(cell && _.contains(['TYPE', 'BARCODE', 'MEDIUM', 'ROWS', 'NOTE', 'PREFIX'], cell)) {
                    meta[cell.toLowerCase()] = cellValue(sheet, {c: 1, r: R});
                }

                if(cell == 'A') {
                    var type = types[meta.type], contents = [];

                    if(!meta.type) {
                        throw new Error('Required container TYPE missing');
                    } else if(!type) {
                        throw new Error(`Invalid container TYPE: ${meta.type}`);
                    }

                    var rowNames, numWellRows;
                    if(meta.rows) {
                        rowNames = meta.rows = [for (r of meta.rows.split(/[;,]/)) r.trim()];
                        numWellRows = rowNames.length;
                    } else {
                        for(var i = R; i < sheetRange.e.r; ++i) {
                            if(cellValue(sheet, {c: 0, r: i}) == 'B') {
                                numWellRows = i - R;
                                break;
                            }
                        }

                        if(!numWellRows) {
                            throw new Error('Could not determine number of rows per well; missing label for second row');
                        }

                        if(defaultRowName) {
                            rowNames = _.range(numWellRows);
                            meta.rows = rowNames[0] = defaultRowName;
                        }
                    }

                    if(rowNames) {
                        for(var r = 0; r < type.rows; ++r) {
                            var row = [];

                            for (var c = 0; c < type.columns; ++c) {
                                var well = {}, empty = true;

                                if(meta.medium) {
                                    well.medium = meta.medium;
                                }

                                rowNames.forEach((name, i) => {
                                    well[name] = cellValue(sheet, {c: 1 + c, r: R + r * numWellRows + i});
                                    if(well[name]) {
                                        empty = false;
                                    }
                                });

                                if(empty) {
                                    row.push(null)
                                } else {
                                    row.push(well);
                                }
                            }

                            contents.push(row);
                        }
                    } else {
                        for(var r = 0; r < type.rows; ++r) {
                            var row = [];
                            for (var c = 0; c < type.columns; ++c) {
                                row.push(cellValue(sheet, {c: 1 + c, r: R + r}));
                            }
                            contents.push(row);
                        }
                    }

                    layouts.push(new Layout(contents, _.clone(meta)));
                    meta = {};
                }
            }

            return layouts;
        },

        toSheet(layouts) {

        }
    }
};

export function fromFile(file, converter = 'default', defaultRowName = 'content') {
    var {fromSheet} = converters[converter];
    var workbook = XLSX.read(file, {type: 'binary'});
    var layouts = {};

    workbook.SheetNames.forEach((sheetName) => {
        layouts[sheetName] = fromSheet(workbook.Sheets[sheetName], defaultRowName)
    });

    return layouts;
}
