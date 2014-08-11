"use strict";
Object.defineProperties(exports, {
  Layout: {get: function() {
      return Layout;
    }},
  types: {get: function() {
      return types;
    }},
  converters: {get: function() {
      return converters;
    }},
  fromFile: {get: function() {
      return fromFile;
    }},
  __esModule: {value: true}
});
var __moduleName = "../Microplate";
if (typeof require !== 'undefined') {
  var XLSX = require('xlsx');
  var _ = require('underscore');
}
function decodePosition(position) {
  var row = positionOrRow.charCodeAt(0) - 64;
  var column = parseInt(positionOrRow.substr(1));
}
var Layout = function Layout(contents) {
  var meta = arguments[1] !== (void 0) ? arguments[1] : null;
  this.contents = contents;
  this.meta = meta;
};
($traceurRuntime.createClass)(Layout, {
  get: function(positionOrRow, column) {
    var row;
    if (typeof positionOrRow == 'string') {
      row = positionOrRow.charCodeAt(0) - 64;
      column = parseInt(positionOrRow.substr(1));
    } else {
      row = positionOrRow;
    }
    return this.contents[row - 1][column - 1];
  },
  set: function(position, value) {
    var row = position.charCodeAt(0) - 64;
    var column = parseInt(position.substr(1));
    return this.contents[row - 1][column - 1] = value;
  },
  get rows() {
    return types[this.meta.type].rows;
  },
  get columns() {
    return types[this.meta.type].columns;
  },
  saveAs: function(fileName) {
    var format = arguments[1] !== (void 0) ? arguments[1] : 'xslx';
    var converter = arguments[2] !== (void 0) ? arguments[2] : 'default';
  },
  toJSON: function() {
    var json = _.clone(this.meta);
    var contents = json.contents = {};
    this.contents.forEach((function(row, r) {
      row.forEach((function(well, c) {
        if (well) {
          contents[("" + String.fromCharCode(65 + r) + (c + 1))] = well;
        }
      }));
    }));
    return json;
  }
}, {});
var types = {
  '6-well': {
    rows: 2,
    columns: 3
  },
  '96-deep': {
    rows: 8,
    columns: 12
  },
  '96-flat': {
    rows: 8,
    columns: 12
  },
  '96-pcr': {
    rows: 8,
    columns: 12
  },
  '384-deep': {
    rows: 16,
    columns: 24
  },
  '384-semi-deep': {
    rows: 16,
    columns: 24
  },
  '384-flat': {
    rows: 16,
    columns: 24
  },
  'omnitray': {
    rows: 1,
    columns: 1
  }
};
function cellValue(sheet, c) {
  var cell = sheet[XLSX.utils.encode_cell(c)];
  if (typeof cell != 'undefined') {
    return cell.v;
  }
  return null;
}
var converters = {'default': {
    fromSheet: function(sheet) {
      var defaultRowName = arguments[1] !== (void 0) ? arguments[1] : null;
      var sheetRange = XLSX.utils.decode_range(sheet['!ref']);
      var cell,
          meta = {};
      var layouts = [];
      for (var R = sheetRange.s.r; R <= sheetRange.e.r; ++R) {
        cell = cellValue(sheet, {
          c: 0,
          r: R
        });
        if (cell && _.contains(['TYPE', 'BARCODE', 'MEDIUM', 'ROWS', 'NOTE', 'PREFIX'], cell)) {
          meta[cell.toLowerCase()] = cellValue(sheet, {
            c: 1,
            r: R
          });
        }
        if (cell == 'A') {
          var type = types[meta.type],
              contents = [];
          if (!meta.type) {
            throw new Error('Required container TYPE missing');
          } else if (!type) {
            throw new Error(("Invalid container TYPE: " + meta.type));
          }
          var rowNames,
              numWellRows;
          if (meta.rows) {
            rowNames = meta.rows = (function() {
              var $__1 = 0,
                  $__2 = [];
              for (var $__3 = meta.rows.split(/[;,]/)[Symbol.iterator](),
                  $__4; !($__4 = $__3.next()).done; ) {
                var r = $__4.value;
                $__2[$__1++] = r.trim();
              }
              return $__2;
            }());
            numWellRows = rowNames.length;
          } else {
            for (var i = R; i < sheetRange.e.r; ++i) {
              if (cellValue(sheet, {
                c: 0,
                r: i
              }) == 'B') {
                numWellRows = i - R;
                break;
              }
            }
            if (!numWellRows) {
              throw new Error('Could not determine number of rows per well; missing label for second row');
            }
            if (defaultRowName) {
              rowNames = _.range(numWellRows);
              meta.rows = rowNames[0] = defaultRowName;
            }
          }
          if (rowNames) {
            for (var r = 0; r < type.rows; ++r) {
              var row = [];
              for (var c = 0; c < type.columns; ++c) {
                var well = {},
                    empty = true;
                if (meta.medium) {
                  well.medium = meta.medium;
                }
                rowNames.forEach((function(name, i) {
                  well[name] = cellValue(sheet, {
                    c: 1 + c,
                    r: R + r * numWellRows + i
                  });
                  if (well[name]) {
                    empty = false;
                  }
                }));
                if (empty) {
                  row.push(null);
                } else {
                  row.push(well);
                }
              }
              contents.push(row);
            }
          } else {
            for (var r = 0; r < type.rows; ++r) {
              var row = [];
              for (var c = 0; c < type.columns; ++c) {
                row.push(cellValue(sheet, {
                  c: 1 + c,
                  r: R + r
                }));
              }
              contents.push(row);
            }
          }
          layouts.push(new Layout(contents, _.clone(meta)));
          meta = {};
        }
      }
      return layouts;
    },
    toSheet: function(layouts) {}
  }};
function fromFile(file) {
  var converter = arguments[1] !== (void 0) ? arguments[1] : 'default';
  var defaultRowName = arguments[2] !== (void 0) ? arguments[2] : 'content';
  var fromSheet = $traceurRuntime.assertObject(converters[converter]).fromSheet;
  var workbook = XLSX.read(file, {type: 'binary'});
  var layouts = {};
  workbook.SheetNames.forEach((function(sheetName) {
    layouts[sheetName] = fromSheet(workbook.Sheets[sheetName], defaultRowName);
  }));
  return layouts;
}
