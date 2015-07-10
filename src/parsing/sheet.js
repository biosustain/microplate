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

    static from(data, name = null){
        if('!ref' in data){
            data = JSONto2dArray(XLSX.utils.sheet_to_json(data));
        }
        return new Sheet(data, name);
    }
}

function JSONto2dArray(json) {
    var keys = Object.keys(json[0]);
    var twoDArray = [];

    twoDArray.push(keys);
    json.forEach((row) => {
        var rowArray = Object.keys(row).map((key) => row[key]);
        twoDArray.push(rowArray);
    })

    return twoDArray;
}