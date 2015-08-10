import {Workbook} from '../src/index.js';
import {expect} from 'chai';
import fs from 'fs';

describe('Workbook', () => {

    let file = fs.readFileSync('example/example-with-data.xlsx');
    let wb = Workbook.fromFile(file);

    it('should build a Workbook instance from a binary file', () => {
        expect(wb).to.be.an.instanceOf(Workbook);
    });

    it('should return a list of Sheet names', () => {
        expect(wb.sheetNames()).to.be.an.instanceOf(Array);
        expect(wb.sheetNames()).to.have.members(['Sheet1']);
    });

    it('should return a Sheet by its name', () => {
        expect(wb.sheet('Sheet1')).to.exist;
        expect(wb.sheet('Sheet2')).to.not.exist;
    });

    it('should be iterable', () => {
        let sheets = Array.from(wb);
        expect(sheets).to.be.an.instanceOf(Array);
        expect(sheets).to.have.members([wb.sheet('Sheet1')]);
    });

    // TODO test Blob creation (not part of Node.js)
    //it('should be possible to save a workbook', () => {
    //    expect(wb.toBlob()).to.be.an.instanceOf(Blob);
    //});

});