import XLSX from 'xlsx';

// a sheet is a representation of one layout not yet parsed
export class Sheet {

    constructor(data, name = null) {
        this.roa  = data;
        this.name = name;
    }

    saveAs(filename, filetype = 'csv') {

    }

    get([row, column]) {
        if(this.roa.length > row && this.roa[row].length > column){
            return this.roa[row][column];
        }
        throw new RangeError('Position out of bounds');
    }

    set([row, column], value) {
        if(this.roa.length > row && this.roa[row].length > column){
            return this.roa[row][column] = value;
        }
        throw new RangeError('Position out of bounds');
        
    }

    clear([row, column]) {
        if(this.roa.length > row && this.roa[row].length > column){
            return this.roa[row][column] = null;
        }
        throw new RangeError('Position out of bounds');
    }
}

export class XLSXSheet extends Sheet{
    constructor(data, name = null){
        this.xlsx = data;
        this.name = name;
    }

    saveAs(filename, filetype = 'csv'){

    }

    get([row, column], value){

    }

    set([row, column]){

    }

    clear([row, column]){
        
    }
}