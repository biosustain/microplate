import {Table, Workbook} from '../src/index.js';
import {expect} from 'chai';
import fs from 'fs';

describe('Table', function () {
    const file = fs.readFileSync('./test/data/table-simple.xlsx');
    const wb = Workbook.fromFile(file);

    it('should parse and validate sheet', async function (done) {
        try {
            let sheet = wb.sheet('valid-simple-1');
            let table = await Table.parse(sheet).validate({});

            expect(table.headers).to.have.members(['id', 'name']);
            expect(table.rows).to.deep.equal([
                {id: 1, name: 'foo'},
                {id: 2, name: 'bar'},
                {id: '3', name: 'baz'}
            ]);

            done();
        } catch (e) {
            done(e)
        }
    });

    it('should be iterable', function () {
        let table = new Table([
            {id: 1},
            {id: 2},
            {id: 3}
        ]);

        expect(Array.from(table)).to.deep.equal([
            {id: 1},
            {id: 2},
            {id: 3}
        ]);
    });

    it('should infer headers from the first row if given', function () {
        let table = new Table([
            {id: 1, name: 'foo'}
        ]);

        expect(table.headers).to.have.members(['id', 'name']);
    });

    it('should convert back into a sheet', function () {
        let sheet = new Table([
            {id: 1, name: 'foo'},
            {id: 2, name: 'bar'}
        ]).toSheet();

        expect(sheet.rows).to.equal(3);
        expect(sheet.columns).to.equal(2);
        expect(sheet.contents).to.deep.equal({
            "A1": {"t": "s", "v": "id"},
            "B1": {"t": "s", "v": "name"},
            "A2": {"t": "n", "v": 1},
            "B2": {"t": "s", "v": "foo"},
            "A3": {"t": "n", "v": 2},
            "B3": {"t": "s", "v": "bar"}
        });
    });
});