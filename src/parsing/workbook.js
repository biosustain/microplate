import XLSX from 'xlsx';
import {Sheet} from './sheet';

// reads in multiple sheets
// can be serialized
export class Workbook {

    constructor(file, filename = 'xlsx'){
        var workbook = XLSX.read(file, {type: 'binary'});
        this.workbook = {};

        workbook.SheetNames.forEach(function (sheetName) {
            var sheet = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            if (sheet.length > 0) {
                this.workbook[sheetName] = new Sheet(sheet, sheetName);
            }
        }.bind(this))
    }

    get sheets() {

    }

    saveAs(filename, filetype = 'csv') {

    }
}