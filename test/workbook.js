import {Workbook} from '../src/parsing/workbook.js';
import {expect} from 'chai';
import fs from 'fs';

describe('Workbook parsing', () => {

    let file = fs.readFileSync('example/example-with-data.xlsx');
    let wb = new Workbook(file);

    it('should build a Workbook instance from a binary file', () => {
        expect(wb).to.be.an.instanceOf(Workbook);
    });

    it('should return a list of Sheets', () => {
        expect(wb.sheets()).to.be.an.instanceOf(Array);
    });

    it('should save the current Workbook into a file', () => {

    });

});