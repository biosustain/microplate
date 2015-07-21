import XLSX from 'xlsx';
import {Sheet} from './sheet';

// reads in multiple sheets
// can be serialized
export class Workbook {

    constructor(file, filename = 'xlsx'){
        let workbook = XLSX.read(file, {type: 'binary'});
        this.sheets = {};

        for(let name of workbook.SheetNames) {
            this.sheets[name] = new Sheet(workbook.Sheets[name], name);
        }
    }

    sheetNames() {
        return Object.keys(this.sheets);
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