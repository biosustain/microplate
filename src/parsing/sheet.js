import XLSX from 'xlsx';

// a sheet is a representation of one layout not yet parsed
export class Sheet {

    constructor(data, name = null) {
        this.roa  = data;
        this.name = name;
    }

    saveAs(filename, filetype = 'csv') {

    }

    get(position) {}
    set(position, value) {}
    clear(position) {}

    static from(data, name = null){
        if('!ref' in data){
            data = XLSX.utils.sheet_to_json(data);
        }
        return new Sheet(data, name);
    }
}