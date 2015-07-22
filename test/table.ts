/// <reference path="../typings/tsd.d.ts" />
import {Table} from '../src/parsing/table';
import {Workbook} from '../src/parsing/workbook';
import {expect} from 'chai';
import {readFileSync} from 'fs';

describe('Table', () => {

    const file = readFileSync('example/example-with-simple-data.xlsx');
    const wb   = new Workbook(file);
    let sheet  = wb.sheets[wb.sheetNames()[0]];

    it('should parse a sheet', () => {
        Table.parse(sheet);
    });

});