var should = require('should');
var fs = require('fs');
var $traceurRuntime = require('traceur-runtime');


describe('Microplate.js', function () {
    var Microplate = require('./../dist/Microplate.js');

    it('should load', function () {
        Microplate.should.be.ok;
    });

    it('should come with all the default types', function () {
        Microplate.types.should.have.properties({
            '6-well': { rows: 2, columns: 3 },
            '96-deep': { rows: 8, columns: 12 },
            '96-flat': { rows: 8, columns: 12 },
            '96-pcr': { rows: 8, columns: 12 }
        });
    });

    it('should read convert an empty sheet', function () {
        var file = fs.readFileSync('./example/example.xlsx');
        var layouts = Microplate.fromFile(file)['Sheet1'];
        layouts.should.be.of.length(2);

        layouts[0].meta.should.have.properties({
            type: '96-deep',
            barcode: null,
            medium: 'sample-medium'
        });

        layouts[1].meta.should.have.properties({
            type: '96-deep',
            barcode: null,
            note: 'A sample note',
            prefix: null,
            rows: [ 'strain', 'medium' ]
        });
    });

    it('should read convert a sheet with data', function () {
        var file = fs.readFileSync('./example/example-with-data.xlsx');
        var layouts = Microplate.fromFile(file)['Sheet1'];
        layouts.should.be.of.length(2);

        layouts[0].get('E10').should.have.properties({
            content: 'E10'
        });

        layouts[1].get('A12').should.have.properties({
            strain: 'strain-A12',
            medium: 'medium-A12'
        });

        layouts[1].get('H12').should.have.properties({
            strain: null,
            medium: 'H12 (medium)'
        });

        layouts[1].toJSON().should.have.properties({
            type: '96-deep',
            barcode: null,
            note: 'A sample note',
            prefix: null,
            rows: [ 'strain', 'medium' ],
            contents:
            {
                A1: { strain: 'strain-A1', medium: 'medium-A1' },
                A2: { strain: 'strain-A2', medium: 'medium-A2' },
                A3: { strain: 'strain-A3', medium: 'medium-A3' },
                A4: { strain: 'strain-A4', medium: 'medium-A4' },
                A5: { strain: 'strain-A5', medium: 'medium-A5' },
                A6: { strain: 'strain-A6', medium: 'medium-A6' },
                A7: { strain: 'strain-A7', medium: 'medium-A7' },
                A8: { strain: 'strain-A8', medium: 'medium-A8' },
                A9: { strain: 'strain-A9', medium: 'medium-A9' },
                A10: { strain: 'strain-A10', medium: 'medium-A10' },
                A11: { strain: 'strain-A11', medium: 'medium-A11' },
                A12: { strain: 'strain-A12', medium: 'medium-A12' },
                E5: { strain: 'E5 (strain)', medium: null },
                H12: { strain: null, medium: 'H12 (medium)' }
            }
        });
    });

});