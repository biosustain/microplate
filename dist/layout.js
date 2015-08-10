'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _xlsx = require('xlsx');

var _xlsx2 = _interopRequireDefault(_xlsx);

var _tableJs = require('./table.js');

var _utilsJs = require('./utils.js');

function dimensions(sheet, row) {
    var rows = 1,
        columns = 1;
    for (var offset = 1; offset < sheet.rows; offset++) {
        var label = sheet.get(row + offset, 0);
        if (!label || label.length != 1 || label.charCodeAt(0) - 65 != offset - 1) {
            break;
        }
        rows = offset;
    }

    for (var offset = 1; offset < sheet.columns; offset++) {
        if (Number(sheet.get(row, offset)) != offset) {
            break;
        }
        columns = offset;
    }

    return [rows, columns];
}

function validatePosition(string) {
    if (!string.match(/[A-Z]\d+/)) {
        throw 'Invalid position: "' + string + '"';
    }
    return string;
}

function comparePositions(a, b) {
    if (a.charCodeAt(0) == b.charCodeAt(0)) {
        return a.substr(1) - b.substr(1);
    }

    return a.charCodeAt(0) - b.charCodeAt(0);
}

var PlateLayout = (function () {

    /**
     *
     * @param {Array|Object} contents
     * @param name
     * @param rows
     * @param columns
     */

    function PlateLayout(contents) {
        var _ref3 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        var _ref3$name = _ref3.name;
        var name = _ref3$name === undefined ? null : _ref3$name;
        var _ref3$rows = _ref3.rows;
        var rows = _ref3$rows === undefined ? null : _ref3$rows;
        var _ref3$columns = _ref3.columns;
        var columns = _ref3$columns === undefined ? null : _ref3$columns;

        _classCallCheck(this, PlateLayout);

        if (contents instanceof Array) {
            this.contents = {};
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = contents[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var _step$value = _slicedToArray(_step.value, 2);

                    var position = _step$value[0];
                    var content = _step$value[1];

                    this.contents[position] = content;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator['return']) {
                        _iterator['return']();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        } else {
            this.contents = contents;
        }
        this.name = name;
        this.rows = rows;
        this.columns = columns;
        // TODO calculate rows and columns if not given.
    }

    _createClass(PlateLayout, [{
        key: 'get',
        value: function get(row, column) {
            return this.contents[encodePosition(row, column)];
        }
    }, {
        key: 'pluck',
        value: function pluck(row, column) {
            var header = arguments.length <= 2 || arguments[2] === undefined ? 'default' : arguments[2];

            var contents = this.contents[encodePosition(row, column)];
            if (contents) {
                return contents[header];
            }
        }
    }, {
        key: 'positions',
        value: function positions() {
            var zeroBased = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

            return Object.keys(this.contents).sort(comparePositions);
        }
    }, {
        key: 'entries',
        value: function entries() {
            var _this = this;

            return (function () {
                var _ref = [];
                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = _this.positions()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var position = _step2.value;

                        _ref.push([position, _this.contents[position]]);
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                            _iterator2['return']();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }

                return _ref;
            })();
        }
    }, {
        key: 'toSheet',
        value: function toSheet() {
            var headers = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

            return PlateLayout.toSheet([this], headers);
        }

        /**
         *
         * @param layouts
         * @param keys
         */
    }, {
        key: 'validate',
        value: function validate(validators) {
            var parallel = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            var contents, errors, ready, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _loop, _iterator3, _step3, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, _step4$value, position, content;

            return regeneratorRuntime.async(function validate$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        contents = {};
                        errors = {};

                        if (!parallel) {
                            context$2$0.next = 28;
                            break;
                        }

                        ready = Promise.resolve(null);
                        _iteratorNormalCompletion3 = true;
                        _didIteratorError3 = false;
                        _iteratorError3 = undefined;
                        context$2$0.prev = 7;

                        _loop = function () {
                            var _step3$value = _slicedToArray(_step3.value, 2);

                            var position = _step3$value[0];
                            var content = _step3$value[1];

                            ready = ready.then(function () {
                                return (0, _utilsJs.validateRecord)(content, validators).then(function (value) {
                                    contents[position] = value;
                                }, function (error) {
                                    errors[position] = error;
                                });
                            });
                            console.log(position, content);
                        };

                        for (_iterator3 = this.entries()[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            _loop();
                        }

                        context$2$0.next = 16;
                        break;

                    case 12:
                        context$2$0.prev = 12;
                        context$2$0.t0 = context$2$0['catch'](7);
                        _didIteratorError3 = true;
                        _iteratorError3 = context$2$0.t0;

                    case 16:
                        context$2$0.prev = 16;
                        context$2$0.prev = 17;

                        if (!_iteratorNormalCompletion3 && _iterator3['return']) {
                            _iterator3['return']();
                        }

                    case 19:
                        context$2$0.prev = 19;

                        if (!_didIteratorError3) {
                            context$2$0.next = 22;
                            break;
                        }

                        throw _iteratorError3;

                    case 22:
                        return context$2$0.finish(19);

                    case 23:
                        return context$2$0.finish(16);

                    case 24:
                        context$2$0.next = 26;
                        return regeneratorRuntime.awrap(ready);

                    case 26:
                        context$2$0.next = 63;
                        break;

                    case 28:
                        _iteratorNormalCompletion4 = true;
                        _didIteratorError4 = false;
                        _iteratorError4 = undefined;
                        context$2$0.prev = 31;
                        _iterator4 = this.entries()[Symbol.iterator]();

                    case 33:
                        if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                            context$2$0.next = 49;
                            break;
                        }

                        _step4$value = _slicedToArray(_step4.value, 2);
                        position = _step4$value[0];
                        content = _step4$value[1];
                        context$2$0.prev = 37;
                        context$2$0.next = 40;
                        return regeneratorRuntime.awrap((0, _utilsJs.validateRecord)(content, validators));

                    case 40:
                        contents[position] = context$2$0.sent;
                        context$2$0.next = 46;
                        break;

                    case 43:
                        context$2$0.prev = 43;
                        context$2$0.t1 = context$2$0['catch'](37);

                        errors[position] = context$2$0.t1;

                    case 46:
                        _iteratorNormalCompletion4 = true;
                        context$2$0.next = 33;
                        break;

                    case 49:
                        context$2$0.next = 55;
                        break;

                    case 51:
                        context$2$0.prev = 51;
                        context$2$0.t2 = context$2$0['catch'](31);
                        _didIteratorError4 = true;
                        _iteratorError4 = context$2$0.t2;

                    case 55:
                        context$2$0.prev = 55;
                        context$2$0.prev = 56;

                        if (!_iteratorNormalCompletion4 && _iterator4['return']) {
                            _iterator4['return']();
                        }

                    case 58:
                        context$2$0.prev = 58;

                        if (!_didIteratorError4) {
                            context$2$0.next = 61;
                            break;
                        }

                        throw _iteratorError4;

                    case 61:
                        return context$2$0.finish(58);

                    case 62:
                        return context$2$0.finish(55);

                    case 63:
                        if (!(Object.keys(errors).length == 0)) {
                            context$2$0.next = 67;
                            break;
                        }

                        return context$2$0.abrupt('return', new PlateLayout(contents, this));

                    case 67:
                        throw errors;

                    case 68:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[7, 12, 16, 24], [17,, 19, 23], [31, 51, 55, 63], [37, 43], [56,, 58, 62]]);
        }

        /**
         * Returns a list of layouts.
         *
         * @param sheet
         * @param required
         * @param converters
         */
    }, {
        key: 'size',
        get: function get() {
            if (this.rows != null && this.columns != null) {
                return this.rows * this.columns;
            }
        }
    }], [{
        key: 'toSheet',
        value: function toSheet(layouts) {
            var headers = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
            var format = arguments.length <= 2 || arguments[2] === undefined ? 'list' : arguments[2];
        }
    }, {
        key: 'parse',
        value: function parse(sheet) {
            var _ref4 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            var _ref4$required = _ref4.required;
            var required = _ref4$required === undefined ? [] : _ref4$required;
            var _ref4$aliases = _ref4.aliases;
            var aliases = _ref4$aliases === undefined ? {} : _ref4$aliases;
            var _ref4$converters = _ref4.converters;
            var converters = _ref4$converters === undefined ? {} : _ref4$converters;

            // Determine if layout is grid or list-style:
            // - list-style layout starts with a header row.
            // - grid-style layout starts with an empty line or plate name, followed by A,B,C..
            if (!sheet.get(0, 0) || sheet.get(1, 0) == 'A') {
                var layouts = [];

                for (var r = 0; r <= sheet.rows; r++) {
                    // TODO also check that platename is not null?
                    if (sheet.get(r + 1, 0) != 'A' || Number(sheet.get(r, 1)) != 1) {
                        continue;
                    }

                    var _name = sheet.get(r, 0);

                    var _dimensions = dimensions(sheet, r);

                    var _dimensions2 = _slicedToArray(_dimensions, 2);

                    var rows = _dimensions2[0];
                    var columns = _dimensions2[1];

                    var contents = {};

                    for (var row = 1; row <= rows; row++) {
                        for (var column = 1; column <= columns; column++) {
                            contents[PlateLayout.encodePosition(row, column)] = { 'default': sheet.get(r + row, column) };
                        }
                    }

                    layouts.push(new PlateLayout(contents, { name: _name, rows: rows, columns: columns }));
                    r += rows;
                }

                return layouts;
            } else {
                var _iteratorNormalCompletion5;

                var _didIteratorError5;

                var _iteratorError5;

                var _iterator5, _step5;

                var _ret2 = (function () {
                    var contents = {};
                    var table = _tableJs.Table.parse(sheet, {
                        required: required.concat(['plate', 'position']),
                        converters: Object.assign(converters, { plate: 'string', position: 'string(position)' }),
                        aliases: Object.assign({
                            'plate name': 'plate',
                            'plate id': 'plate',
                            'plate barcode': 'plate',
                            'well': 'position'
                        }, aliases)
                    });

                    _iteratorNormalCompletion5 = true;
                    _didIteratorError5 = false;
                    _iteratorError5 = undefined;

                    try {
                        for (_iterator5 = table[Symbol.iterator](); !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                            var row = _step5.value;

                            if (!(row.plate in contents)) {
                                contents[row.plate] = {};
                            }

                            contents[row.plate][row.position] = row;
                            delete row.plate;
                            delete row.position;
                        }
                    } catch (err) {
                        _didIteratorError5 = true;
                        _iteratorError5 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion5 && _iterator5['return']) {
                                _iterator5['return']();
                            }
                        } finally {
                            if (_didIteratorError5) {
                                throw _iteratorError5;
                            }
                        }
                    }

                    return {
                        v: (function () {
                            var _ref2 = [];
                            var _iteratorNormalCompletion6 = true;
                            var _didIteratorError6 = false;
                            var _iteratorError6 = undefined;

                            try {
                                for (var _iterator6 = Object.keys(contents)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                                    var _name2 = _step6.value;

                                    _ref2.push(new PlateLayout(contents[_name2], { name: _name2 }));
                                }
                            } catch (err) {
                                _didIteratorError6 = true;
                                _iteratorError6 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion6 && _iterator6['return']) {
                                        _iterator6['return']();
                                    }
                                } finally {
                                    if (_didIteratorError6) {
                                        throw _iteratorError6;
                                    }
                                }
                            }

                            return _ref2;
                        })()
                    };
                })();

                if (typeof _ret2 === 'object') return _ret2.v;
            }
        }
    }, {
        key: 'encodePosition',
        value: function encodePosition(rowNumber, columnNumber) {
            var zeroBased = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

            return '' + String.fromCharCode(64 + rowNumber + zeroBased) + (0, _utilsJs.pad)(columnNumber + zeroBased);
        }
    }, {
        key: 'decodePosition',
        value: function decodePosition(position) {
            var zeroBased = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

            return [position.charCodeAt(0) - 64 - zeroBased, parseInt(position.substr(1)) - zeroBased];
        }
    }]);

    return PlateLayout;
})();

exports.PlateLayout = PlateLayout;