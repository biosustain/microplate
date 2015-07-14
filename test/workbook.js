import {Workbook} from '../src/parsing/workbook.js';
import {expect} from 'chai';
import fs from 'fs';

describe('Workbook parsing', () => {

    let file = fs.readFileSync('example/example-with-data.xlsx');
    let wb = new Workbook(file);

    it('should build a Workbook instance from a binary file', () => {
        expect(wb).to.be.an.instanceOf(Workbook);
    });

    it('should return a list of Sheet names', () => {
        expect(wb.sheetNames()).to.exist;
        expect(wb.sheetNames()).to.be.an.instanceOf(Array);
    });

    it('should return a Sheet by its name', () => {
        expect(wb.sheet('Sheet1')).to.exist;
        expect(wb.sheet('Sheet2')).to.not.exist;
    });

    it('should save the current Workbook into a file', () => {
        expect(false).to.be.true;
    });

});