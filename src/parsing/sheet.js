import XLSX from 'xlsx';

// a sheet is a representation of one layout not yet parsed
export class Sheet {

    constructor(data, name = null) {
        this.rep  = data;
        this.name = name;
    }

    saveAs(filename, filetype = 'csv') {

    }

    get([row, column]) {
        if(this.rep.length > row && this.rep[row].length > column){
            return this.rep[row][column];
        }
        throw new RangeError('Position out of bounds');
    }

    set([row, column], value) {
        if(this.rep.length > row && this.rep[row].length > column){
            return this.rep[row][column] = value;
        }
        throw new RangeError('Position out of bounds');
        
    }

    clear([row, column]) {
        if(this.rep.length > row && this.rep[row].length > column){
            return this.rep[row][column] = null;
        }
        throw new RangeError('Position out of bounds');
    }
}

export class XLSXSheet extends Sheet{
    constructor(data, name = null){
        super(data, name);
        this.maxRow    = data["!ref"].split(':')[1][0];
        this.maxColumn = data["!ref"].split(':')[1][1];
    }

    saveAs(filename, filetype = 'csv'){

    }

    get([row, column]){
        var lrow = numberToLetter(row);
        column = column + 1;

        if(this.maxRow >= lrow && this.maxColumn >= column){
            return this.rep[`${lrow}${column}`].v;
        }
        throw new RangeError('Position out of bounds');
    }

    set([row, column], value){
        var lrow = numberToLetter(row);
        column = column + 1;

        if(this.maxRow >= lrow && this.maxColumn >= column){
            return this.rep[`${lrow}${column}`].v = value;
        }
        throw new RangeError('Position out of bounds');
    }

    clear([row, column]){
        var lrow = numberToLetter(row);
        column = column + 1;
        
        if(this.maxRow >= lrow && this.maxColumn >= column){
            return this.rep[`${lrow}${column}`].v = null;
        }
        throw new RangeError('Position out of bounds');
    }
}

export function numberToLetter(number) {
    return `${String.fromCharCode(number + 65)}`;
}
