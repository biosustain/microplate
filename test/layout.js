import {PlateLayout, Workbook} from '../src/index.js';
import {expect} from 'chai';
import fs from 'fs';

describe('Layouts', () => {
    const file = fs.readFileSync('./test/data/layout.xlsx');
    const wb = Workbook.fromFile(file);

    it('should parse a sheet into a list of plate layouts', function () {
        let sheet = wb.sheet('valid-simple-1');

        let layouts = PlateLayout.parse(sheet);

        expect(layouts.length).to.equal(3);

        expect(layouts[0].name).to.equal('foo');
        expect(layouts[0].rows).to.equal(2);
        expect(layouts[0].columns).to.equal(3);
        expect(layouts[0].contents).to.deep.equal({
            "A01": {"default": "item-123"},
            "A02": {"default": "item-124"},
            "A03": {"default": "item-125"},
            "B01": {"default": "item-123"},
            "B02": {"default": "item-124"},
            "B03": {"default": undefined}
        });

        expect(layouts[1].name).to.equal('bar');
        expect(layouts[1].rows).to.equal(1);
        expect(layouts[1].columns).to.equal(1);
        expect(layouts[1].contents).to.deep.equal({
            "A01": {"default": "item"}
        });

        expect(layouts[2].name).to.equal('positions');
        expect(layouts[2].rows).to.equal(8);
        expect(layouts[2].columns).to.equal(12);
        //expect(layouts[2].contents).to.deep.equal({
        //    "A01": {"default": "A1"}
        //});
    });

    it('should parse a tabular sheet into a list of plate layouts', function () {
        let sheet = wb.sheet('valid-simple-2');
        let layouts = PlateLayout.parse(sheet);

        expect(layouts.length).to.equal(2);

        expect(layouts[0].name).to.equal('foo');
        expect(layouts[0].rows).to.be.null;
        expect(layouts[0].columns).to.null;
        expect(layouts[0].contents).to.deep.equal({
            A1: {"name": "item-123", "score": 5},
            A2: {"name": "item-124", "score": 3},
            A3: {"name": "item-125", "score": 7},
            B1: {"name": "item-123", "score": 1},
            B2: {"name": "item-124", "score": 2},
            B3: {"score": 0}
        });

        expect(layouts[1].name).to.equal('bar');
        expect(layouts[1].rows).to.be.null;
        expect(layouts[1].columns).to.null;
        expect(layouts[1].contents).to.deep.equal({
            H12: {"name": "item-1", "score": 1000}
        });
    });

    it('should fail to parse an invalid sheet', function () {
        let sheet = wb.sheet('invalid-1');
        expect(() => PlateLayout.parse(sheet)).to.throw('Missing required header in table: "plate".');
    });

    it('should compute the right size', function () {
        expect(new PlateLayout({}, {rows: 8, columns: 12}).size).to.equal(96);
        expect(new PlateLayout({}).size).to.be.undefined;
    });


    it('should return a list of used positions', function () {
        expect(new PlateLayout({
            A2: {default: 'foo'},
            B3: {default: 'foo'},
            A12: {default: 'foo'},
            A1: {default: 'foo'}
        }).positions()).to.deep.equal(['A1', 'A2', 'A12', 'B3']);
    });

    it('should be possible to initialize a layout from an array', function () {
        expect(new PlateLayout([
            ['A1', {id: 1}],
            ['A2', {id: 2}]
        ]).contents).to.deep.equal({
            "A1": {"id": 1},
            "A2": {"id": 2}
        });
    });

    it('should be possible to extract a entries from a layout', function () {
        expect(new PlateLayout({
            A1: {id: 1},
            A2: {id: 2}
        }).entries()).to.deep.equal([
            ['A1', {id: 1}],
            ['A2', {id: 2}]
        ]);
    });

    it('should validate a layout', async function (done) {
        try {
            let layout = await new PlateLayout({
                A01: {id: 1, name: 'foo'},
                A02: {id: 2, name: 'bar'},
                A03: {id: 3, name: 'bats'}
            }).validate({id: (id) => Promise.resolve(`obj(${id})`)});

            expect(layout.contents).to.deep.equal({
                "A01": {id: "obj(1)", name: "foo"},
                "A02": {id: "obj(2)", name: "bar"},
                "A03": {id: "obj(3)", name: "bats"}
            });

            try {
                await new PlateLayout({
                    A01: {id: 1, name: 'foo'},
                    A02: {id: 2, name: 'bar'},
                    A03: {id: 3, name: 'bats'}
                }).validate({id: (id) => Promise.reject(`${id} does not exist!`)});

                expect(true).to.be.false; // this should be unreachable
            } catch (e) {
                expect(e).to.deep.equal({
                    "A01": "1 does not exist!",
                    "A02": "2 does not exist!",
                    "A03": "3 does not exist!"
                });
            }

            done();
        } catch (e) {
            done(e)
        }
    });

    it('should validate a layout in parallel', async function (done) {
        try {
            let layout = await new PlateLayout({
                A01: {id: 1, name: 'foo'},
                A02: {id: 2, name: 'bar'}
            }).validate({id: (id) => Promise.resolve(`obj(${id})`)}, true);

            expect(layout.contents).to.deep.equal({
                A01: {id: "obj(1)", name: "foo"},
                A02: {id: "obj(2)", name: "bar"}
            });

            try {
                await new PlateLayout({
                    A01: {id: 1, name: 'foo'},
                    A02: {id: 2, name: 'bar'},
                    A03: {id: 3, name: 'bats'}
                }).validate({id: (id) => Promise.reject(`${id} does not exist!`)}, true);

                expect(true).to.be.false; // this should be unreachable
            } catch (e) {
                expect(e).to.deep.equal({
                    "A01": "1 does not exist!",
                    "A02": "2 does not exist!",
                    "A03": "3 does not exist!"
                });
            }

            done();
        } catch (e) {
            done(e)
        }
    });
});