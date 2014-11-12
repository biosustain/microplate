#!/usr/bin/env node

var {PlateParser, Plate} = require('./microplate.js');
var fs = require('fs');
var _ = require('underscore');

function omap(object, callback, thisArg) {
    var O = {};
    _.pairs(object).forEach((kv) => {
        var [k, v] = callback.call(thisArg, ...kv);
        O[k] = v;
    });
    return O;
}


var file = fs.readFileSync(process.argv[2]);
var workbook = XLSX.read(file, {type: 'binary'});

var plates = [];

workbook.sheetNames.forEach((sheetName) => {
    var plate = PlateParser.fromXSLXSheet(workbook.Sheets[sheetName]);
    plates.push(plate);
});


console.log(JSON.stringify(Plate.toArray(...plates), null, 2));
