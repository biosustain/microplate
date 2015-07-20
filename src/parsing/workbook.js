import XLSX from 'xlsx';
import {XLSXSheet} from './sheet';

// reads in multiple sheets
// can be serialized
export class Workbook {

    constructor(file, filename = 'xlsx'){
        var workbook = XLSX.read(file, {type: 'binary'});
        this.sheets = workbook.SheetNames.map((sheetName) => new XLSXSheet(workbook.Sheets[sheetName], sheetName));
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

    toBlob() {
        var workbook = {
            SheetNames: this.names, //Object.keys(this.sheets),
            Sheets: {}
        };

        //Object.keys(this.sheets).forEach((name) => {
        for(let name of this.names) {
            workbook.Sheets[name] = this.sheets[name].toXLSXObject();
        }

        let s = XLSX.write(workbook, {
            bookType: 'xlsx',
            bookSST: false,
            type: 'binary'
        });

        let buffer = new ArrayBuffer(s.length);
        let view = new Uint8Array(buffer);
        for (let i = 0; i != s.length; ++i) {
            view[i] = s.charCodeAt(i) & 0xFF;
        }

        return new Blob([buffer], {type: "application/octet-stream"});
    }
}