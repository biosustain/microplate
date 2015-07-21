import {Table} from '../src/parsing/table.js';
import {Workbook} from '../src/parsing/workbook.js';
import {expect} from 'chai';
import fs from 'fs';

describe('Table', () => {

    const file = fs.readFileSync('example/example-with-simple-data.xlsx');
    const wb   = new Workbook(file);
    let sheet  = wb.sheets[wb.sheetNames()[0]];

    it('should parse a sheet', () => {
        Table.parse(sheet);
    });

});