import XLSX from 'xlsx';
import {Sheet} from './sheet';

export class Workbook {

    constructor(sheets = {}) {
        if(sheets instanceof Array) {
            this.sheets = {};
            for(let sheet of sheets) {
                sheets[sheet.name] = sheet;
            }
        } else {
            this.sheets = sheets;
        }
    }

    static fromFile(file) {
        let workbook = XLSX.read(file, {type: 'binary'});
        let sheets = {};

        for (let name of workbook.SheetNames) {
            sheets[name] = new Sheet(workbook.Sheets[name], name);
        }

        return new Workbook(sheets);
    }

    sheet(name) {
        return this.sheets[name];
    }

    sheetNames() {
        return Object.keys(this.sheets);
    }

    toBlob() {
        let workbook = {
            SheetNames: this.sheetNames(),
            Sheets: {}
        };

        for (let name of workbook.SheetNames) {
            workbook.Sheets[name] = this.sheets[name].toXLSXSheet();
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

    *[Symbol.iterator]() {
        for (let name of this.sheetNames()) {
            yield this.sheets[name];
        }
    }

}