import XLSX from 'xlsx';

// a sheet is a representation of one layout not yet parsed
export class Sheet {

    constructor(data, name = null) {
        this.sheet = Sheet.from(data);
        this.name = name;
    }

    saveAs(filename, filetype = 'csv') {

    }

    get(position) {}
    set(position, value) {}
    clear(position) {}

    static from(data){}
}