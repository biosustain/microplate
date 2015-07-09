import {Sheet} from '../src/parsing/sheet.js';
import {expect} from 'chai';

describe('Sheet parsing', () => {

    let rep = {
        'A01': 'id',
        'A02': 'name',
        'B01': '1',
        'B02': 'item'
    };

    let data = [
        ['id', 'name'],
        ['1', 'item']
    ];

    let sheet = new Sheet(data, 'mySheet');

    it('should build a Sheet representation from an row object array', () => {
        expect(Sheet.from(data)).to.be.deep.equal(rep);
    });

    it('should build a Sheet instance from an row object array', () => {
        expect(sheet).to.be.an.instanceOf(Sheet);
    });

    it('should return a correct value from a position', () => {
        expect(sheet.get('A01')).to.exist;
        expect(sheet.get('A01')).to.be.equal('id');
        expect(sheet.get('C01')).to.not.exist;
    });

    it('should set a value from a position', () => {
        let sheet2 = new Sheet(data, 'mySheet');
        sheet2.set('A01', 'ID');

        expect(sheet2.get('A01')).to.exist;
        expect(sheet2.get('A01')).to.be.equal('ID');
    });

    it('should correct clear a position', () => {
        let sheet2 = new Sheet(data, 'mySheet');
        sheet2.clear('A01');

        expect(sheet2.get('A01')).to.not.exist;
        expect(sheet2.get('A01')).to.be.null;
    });

});