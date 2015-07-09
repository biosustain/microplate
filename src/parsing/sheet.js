import XLSX from 'xlsx';

// a sheet is a representation of one layout not yet parsed
export class Sheet {

    constructor(data, name = null) {
        this.roa  = data;
        this.name = name;
    }

    saveAs(filename, filetype = 'csv') {

    }

    get(position) {
        if(this.roa.length > position[0] && this.roa[position[0]].length > position[1]){
            return this.roa[position[0]][position[1]];
        }
        throw new RangeError('Position out of bounds');
    }

    set(position, value) {
        if(this.roa.length > position[0] && this.roa[position[0]].length > position[1]){
            return this.roa[position[0]][position[1]] = value;
        }
        throw new RangeError('Position out of bounds');
        
    }

    clear(position) {
        if(this.roa.length > position[0] && this.roa[position[0]].length > position[1]){
            return this.roa[position[0]][position[1]] = null;
        }
        throw new RangeError('Position out of bounds');
    }

    static from(data, name = null){
        if('!ref' in data){
            data = XLSX.utils.sheet_to_json(data);
        }
        return new Sheet(data, name);
    }
}