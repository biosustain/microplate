import XLSX from 'xlsx';
import {Sheet} from './sheet';

// reads in multiple sheets
// can be serialized
export class Workbook {

    constructor(file, filename = 'xlsx'){
        var workbook = XLSX.read(file, {type: 'binary'});
        this.sheets = workbook.SheetNames.map((sheetName) => Sheet.from(workbook.Sheets[sheetName], sheetName));
        this.names = workbook.SheetNames;
    }

    sheetNames() {
        return this.names;
    }

    sheet(name) {
        let index = this.names.findIndex((_name) => name == _name);
        return this.sheets[index];
    }

    saveAs(filename, filetype = 'csv') {

    }
}