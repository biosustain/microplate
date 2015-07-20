import XLSX from 'xlsx';

// a sheet is a representation of one layout not yet parsed
export class Sheet {

    constructor(data, name = null) {
        this.contents  = data;
        this.name = name;
    }

    saveAs(filename, filetype = 'csv') {

    }

    get([row, column]) {
        if(this.contents.length > row && this.contents[row].length > column){
            return this.contents[row][column];
        }
        throw new RangeError('Position out of bounds');
    }

    set([row, column], value) {
        if(this.contents.length > row && this.contents[row].length > column){
            return this.contents[row][column] = value;
        }
        throw new RangeError('Position out of bounds');
        
    }

    clear([row, column]) {
        if(this.contents.length > row && this.contents[row].length > column){
            return this.contents[row][column] = null;
        }
        throw new RangeError('Position out of bounds');
    }

    toXLSXObject() {
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
}

export class XLSXSheet extends Sheet{
    constructor(data, name = null){
        super(data, name);

        this.sheetRange = {
            start: data['!ref'].split(':')[0],
            end  : data['!ref'].split(':')[1]
        };
    }

    saveAs(filename, filetype = 'csv'){

    }

    getRows(){
        return this.sheetRange.start;
    }

    getColumns(){
        return this.sheetRange.end;
    }

    get([row, column]){
        var position = XLSX.utils.encode_cell({r: row, c: column});

        if(this.sheetRange.end >= position){
            if(!!this.contents[position]){
                return this.contents[position].v;
            }
            return null;
        }
        throw new RangeError('Position out of bounds');
    }

    set([row, column], value){
        var position = XLSX.utils.encode_cell({r: row, c: column});

        // update position
        if(this.sheetRange.end < position){
            this.sheetRange.end = position;
        }

        if(this.sheetRange.start > position){
            this.sheetRange.start = position;
        }

        this.contents[position].t = typeof value == 'number' ? 'n' : 's';

        if(this.contents[position].t == 'n'){
            this.contents[position].v = value;
            this.contents[position].w = value.toString();
        }
        else {
            this.contents[position].v = value;
            this.contents[position].h = value;
            this.contents[position].w = value;
            this.contents[position].r = `<t>${value}</t>`;
        }

    }

    clear([row, column]){
        var position = XLSX.utils.encode_cell({r: row, c: column});
        delete this.contents[position];
    }
}
