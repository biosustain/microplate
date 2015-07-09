import {Sheet} from '../src/parsing/sheet.js';
import {expect} from 'chai';
import XLSX from 'xlsx';
import fs from 'fs';

describe('Sheet parsing', () => {

    const file = fs.readFileSync('example/example-with-data.xlsx');
    const wb   = XLSX.read(file, {type: 'binary'});
    const data = [
        ['id', 'name'],
        ['1', 'item']
    ];

    let sheet  = new Sheet(data, 'mySheet');
    let sheet1 = new Sheet(wb.Sheets[wb.SheetNames[0]], 'mySheet');

    it('should build a Sheet instance from an row object array', () => {
        expect(Sheet.from(data, 'mySheet')).to.be.an.instanceOf(Sheet);
    });

    it('should build a Sheet instance from an row object array or a .xlsx sheet', () => {
        expect(sheet).to.be.an.instanceOf(Sheet);
        expect(sheet1).to.be.an.instanceOf(Sheet);
    });

    it('should store a 2d-array representation', () => {
        expect(sheet.roa).to.be.deep.equal(data);
        expect(sheet1.roa).to.be.deep.equal(data);
    })

    it('should return a correct value from a position', () => {
        expect(sheet.get('1:1')).to.exist;
        expect(sheet.get('1:1')).to.be.equal('id');
        expect(sheet.get('3:1')).to.not.exist;
    });

    it('should set a value from a position', () => {
        let sheet2 = Sheet.from(data, 'mySheet');
        sheet2.set('1:1', 'ID');

        expect(sheet2.get('1:1')).to.exist;
        expect(sheet2.get('1:1')).to.be.equal('ID');
    });

    it('should correct clear a position', () => {
        let sheet2 = Sheet.from(data, 'mySheet');
        sheet2.clear('1:1');

        expect(sheet2.get('1:1')).to.not.exist;
        expect(sheet2.get('1:1')).to.be.null;
    });

});