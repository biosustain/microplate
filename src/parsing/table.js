import XLSX from 'xlsx';

/**
 * Like Layout, but for tables that are not plate layouts.
 */
export class Table {

    constructor(contents, rows = null, columns = null){
      this.contents = contents;
      this.rows = rows;
      this.columns = columns;
    }

    static async parse(sheet, {
        required   = [],
        aliases    = {},
        converters = {},
        validators = {},
        parallel   = false
        } = {}) {

        var row = 0;
        var column = 0;
        var table;

        while(row != sheet.getRows()){
            while(column != getColumns()){
                table[XLSX.utils.encode_cell({r: row, c: column})] = sheet.get([row, column]);
                column++;
            }
            row++;
        }

        return table;

    }

    appendRow(contents) {


    }

    toSheet() {

    }
}