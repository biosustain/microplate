import XLSX from 'xlsx';

const encode_cell = XLSX.utils.encode_cell;

// a sheet is a representation of one layout not yet parsed
export class Sheet {
    constructor(source = [], name = null) {
        this.name = name;

        if('!ref' in source) {
            this.contents = source;
            this.range = XLSX.utils.decode_range(source['!ref']);
        } else {
            this.contents = {};
            this.range = {s: {c: 0, r: 0}, e: {r: 0, c: 0}};

            for(let row = 0; row < source.length; row++) {
                let columns = source[row].length;

                for(let column = 0; column < columns; column++) {
                    this.set([row, column], source[row][column]);
                }
            }
        }
    }

    get columns() {
        return this.range.e.r + 1;
    }

    get rows() {
        return this.range.e.r + 1;
    }

    get([row, column]) {
        let cell = this.contents[encode_cell({r: row, c: column})];
        if (cell !== undefined) {
            return cell.v;
        }
    }

    set([row, column], value) {
        let cell;

        if (typeof value == 'number') {
            cell = {v: value, t: 'n'}
        } else {
            cell = {v: value.toString(), t: 's'}
        }

        this.contents[encode_cell({c: column, r: row})] = cell;

        if(column > this.range.e.c) {
            this.range.e.c = column ;
        }

        if(row > this.range.e.r) {
            this.range.e.r = row;
        }

        return value;
    }

    clear([row, column]) {
        delete this.contents[encode_cell({r: row, c: column})];
    }

    toXLSXObject() {
        // TODO
        //var cell;
        //
        //if (value === null) {
        //    return;
        //}
        //
        //if (typeof value == 'number') {
        //    cell = {v: value, t: 'n'}
        //} else {
        //    cell = {v: value.toString(), t: 's'}
        //}
        //
        //var range = this.range;
        //var reference = XLSX.utils.encode_cell({c: column, r: row});
        //
        //if (range.s.r > row) range.s.r = row;
        //if (range.s.c > column) range.s.c = column;
        //if (range.e.r < row) range.e.r = row;
        //if (range.e.c < column) range.e.c = column;
        //
        //this.contents[reference] = cell;
        //this.contents['!ref'] = XLSX.utils.encode_range(range);
    }

    saveAs(filename, filetype = 'csv') {

    }
}
