import {Sheet, XLSXSheet, numberToLetter} from '../src/parsing/sheet.js';
import {Workbook} from '../src/parsing/workbook.js';
import {expect} from 'chai';
import XLSX from 'xlsx';
import fs from 'fs';

describe('Sheet parsing', () => {

    const file = fs.readFileSync('example/example-with-simple-data.xlsx');
    const wb   = XLSX.read(file, {type: 'binary'});
    const data = [
        ['id', 'name'],
        ['1', 'item']
    ];

    let sheet  = new Sheet(data, 'mySheet');

    it('should build a Sheet instance from an row object array', () => {
        expect(new Sheet(data, 'mySheet')).to.be.an.instanceOf(Sheet);
    });

    it('should build a Sheet instance from an row object array or a .xlsx sheet', () => {
        expect(sheet).to.be.an.instanceOf(Sheet);
    });

    it('should store a 2d-array representation', () => {
        expect(sheet.contents).to.be.deep.equal(data);
    })

    it('should return a correct value from a position', () => {
        expect(sheet.get([0, 0])).to.exist;
        expect(sheet.get([0, 0])).to.be.equal('id');
        // TODO add error tests
        // expect(sheet.get([2, 0])).to.throw(RangeError);
        // expect(sheet.get([2, 0])).to.not.throw(RangeError);
    });

    it('should set a value from a position', () => {
        let sheet2 = new Sheet(data, 'mySheet');
        sheet2.set([12, 34], 'ID');

        expect(sheet2.get([12, 34])).to.exist;
        expect(sheet2.get([12, 34])).to.be.equal('ID');
    });

    it('should correctly clear a position', () => {
        let sheet2 = new Sheet(data, 'mySheet');
        sheet2.clear([0, 0]);

        expect(sheet2.get([0, 0])).to.not.exist;
        expect(sheet2.get([0, 0])).to.be.null;
    });

    it('should save the current Sheet into a file', () => {
        expect(false).to.be.true;
    });

});

describe('XLSXSheet parsing', () => {

    const file = fs.readFileSync('example/example-with-simple-data.xlsx');
    const wb   = new Workbook(file);
    let sheet  = wb.sheet(wb.sheetNames()[0]);

    it('should build a Sheet instance from an row object array or a .xlsx sheet', () => {
        expect(sheet).to.be.an.instanceOf(Sheet);
        expect(sheet).to.be.an.instanceOf(XLSXSheet);
    });

    it('should return a correct value from a position', () => {
        expect(sheet.get([0, 0])).to.exist;
        expect(sheet.get([0, 0])).to.be.equal('id');
        // TODO add error tests
        // expect(sheet.get([2, 0])).to.throw(RangeError);
        // expect(sheet.get([2, 0])).to.not.throw(RangeError);
    });

    it('should set a value from a position', () => {
        let sheet2 = wb.sheet(wb.sheetNames()[0]);
        sheet2.set([0, 0], 'ID');

        expect(sheet2.get([0, 0])).to.exist;
        expect(sheet2.get([0, 0])).to.be.equal('ID');
    });

    it('should correctly clear a position', () => {
        let sheet2 = wb.sheet(wb.sheetNames()[0]);
        sheet2.clear([0, 0]);

        expect(sheet2.get([0, 0])).to.not.exist;
        expect(sheet2.get([0, 0])).to.be.null;
    });

    it('should save the current Sheet into a file', () => {
        expect(false).to.be.true;
    });

});