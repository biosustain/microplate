'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _xlsx = require('xlsx');

var _xlsx2 = _interopRequireDefault(_xlsx);

var _sheet = require('./sheet');

var _utilsJs = require('./utils.js');

/**
 * Like Layout, but for tables that are not plate layouts.
 */

var Table = (function () {

    /**
     *
     * @param array<object> contents
     * @param headers if these are not given, they are inferred from the first row.
     */

    function Table() {
        var contents = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
        var headers = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

        _classCallCheck(this, Table);

        if (headers === null && contents.length != 0) {
            headers = Object.keys(contents[0]);
        }

        this.headers = headers;
        this.rows = contents;
    }

    _createClass(Table, [{
        key: 'validate',
        value: function validate(validators) {
            var parallel = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

            var validatedRows, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, row;

            return regeneratorRuntime.async(function validate$(context$2$0) {
                var _this = this;

                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        validatedRows = undefined;

                        if (!parallel) {
                            context$2$0.next = 7;
                            break;
                        }

                        context$2$0.next = 4;
                        return regeneratorRuntime.awrap(Promise.all((function () {
                            var _Promise$all = [];
                            var _iteratorNormalCompletion = true;
                            var _didIteratorError = false;
                            var _iteratorError = undefined;

                            try {
                                for (var _iterator = _this.rows[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                    var row = _step.value;

                                    _Promise$all.push((0, _utilsJs.validateRecord)(row, validators));
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

                            return _Promise$all;
                        })()));

                    case 4:
                        validatedRows = context$2$0.sent;
                        context$2$0.next = 37;
                        break;

                    case 7:
                        validatedRows = [];
                        _iteratorNormalCompletion2 = true;
                        _didIteratorError2 = false;
                        _iteratorError2 = undefined;
                        context$2$0.prev = 11;
                        _iterator2 = rows[Symbol.iterator]();

                    case 13:
                        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                            context$2$0.next = 23;
                            break;
                        }

                        row = _step2.value;
                        context$2$0.t0 = validatedRows;
                        context$2$0.next = 18;
                        return regeneratorRuntime.awrap((0, _utilsJs.validateRecord)(row, validators, validatedRows));

                    case 18:
                        context$2$0.t1 = context$2$0.sent;
                        context$2$0.t0.push.call(context$2$0.t0, context$2$0.t1);

                    case 20:
                        _iteratorNormalCompletion2 = true;
                        context$2$0.next = 13;
                        break;

                    case 23:
                        context$2$0.next = 29;
                        break;

                    case 25:
                        context$2$0.prev = 25;
                        context$2$0.t2 = context$2$0['catch'](11);
                        _didIteratorError2 = true;
                        _iteratorError2 = context$2$0.t2;

                    case 29:
                        context$2$0.prev = 29;
                        context$2$0.prev = 30;

                        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                            _iterator2['return']();
                        }

                    case 32:
                        context$2$0.prev = 32;

                        if (!_didIteratorError2) {
                            context$2$0.next = 35;
                            break;
                        }

                        throw _iteratorError2;

                    case 35:
                        return context$2$0.finish(32);

                    case 36:
                        return context$2$0.finish(29);

                    case 37:
                        return context$2$0.abrupt('return', new Table(validatedRows, this.headers));

                    case 38:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[11, 25, 29, 37], [30,, 32, 36]]);
        }
    }, {
        key: 'toSheet',
        value: function toSheet() {
            var _this2 = this;

            var content = [this.headers].concat((function () {
                var _concat = [];
                var _iteratorNormalCompletion3 = true;
                var _didIteratorError3 = false;
                var _iteratorError3 = undefined;

                try {
                    var _loop = function () {
                        var row = _step3.value;

                        _concat.push((function () {
                            var _concat$push = [];
                            var _iteratorNormalCompletion4 = true;
                            var _didIteratorError4 = false;
                            var _iteratorError4 = undefined;

                            try {
                                for (var _iterator4 = _this2.headers[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                    var header = _step4.value;

                                    _concat$push.push(row[header]);
                                }
                            } catch (err) {
                                _didIteratorError4 = true;
                                _iteratorError4 = err;
                            } finally {
                                try {
                                    if (!_iteratorNormalCompletion4 && _iterator4['return']) {
                                        _iterator4['return']();
                                    }
                                } finally {
                                    if (_didIteratorError4) {
                                        throw _iteratorError4;
                                    }
                                }
                            }

                            return _concat$push;
                        })());
                    };

                    for (var _iterator3 = _this2.rows[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                        _loop();
                    }
                } catch (err) {
                    _didIteratorError3 = true;
                    _iteratorError3 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion3 && _iterator3['return']) {
                            _iterator3['return']();
                        }
                    } finally {
                        if (_didIteratorError3) {
                            throw _iteratorError3;
                        }
                    }
                }

                return _concat;
            })());
            var sheet = new _sheet.Sheet(content);
            return sheet;
        }
    }, {
        key: Symbol.iterator,
        value: regeneratorRuntime.mark(function value() {
            return regeneratorRuntime.wrap(function value$(context$2$0) {
                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        return context$2$0.delegateYield(this.rows, 't0', 1);

                    case 1:
                    case 'end':
                        return context$2$0.stop();
                }
            }, value, this);
        })
    }], [{
        key: 'parse',
        value: function parse(sheet) {
            var _ref = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            var _ref$required = _ref.required;
            var required = _ref$required === undefined ? [] : _ref$required;
            var _ref$aliases = _ref.aliases;
            var aliases = _ref$aliases === undefined ? {} : _ref$aliases;
            var _ref$converters = _ref.converters;
            var converters = _ref$converters === undefined ? {} : _ref$converters;

            // TODO make validator, required names lower case.

            var invertedAliases = {};
            var _iteratorNormalCompletion5 = true;
            var _didIteratorError5 = false;
            var _iteratorError5 = undefined;

            try {
                for (var _iterator5 = Object.keys(aliases)[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                    var _name = _step5.value;

                    _name = _name.toLowerCase();
                    var _iteratorNormalCompletion8 = true;
                    var _didIteratorError8 = false;
                    var _iteratorError8 = undefined;

                    try {
                        for (var _iterator8 = aliases[_name][Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                            var alias = _step8.value;

                            invertedAliases[alias.toLowerCase()] = _name;
                        }
                    } catch (err) {
                        _didIteratorError8 = true;
                        _iteratorError8 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion8 && _iterator8['return']) {
                                _iterator8['return']();
                            }
                        } finally {
                            if (_didIteratorError8) {
                                throw _iteratorError8;
                            }
                        }
                    }
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

            var headers = [];
            for (var c = 0; c < sheet.columns; c++) {
                var _name2 = sheet.get(0, c);

                if (!_name2) {
                    break;
                }

                if (_name2 in invertedAliases) {
                    _name2 = invertedAliases[_name2];
                }

                headers.push(_name2);
            }

            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = required[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var _name3 = _step6.value;

                    if (!headers.includes(_name3)) {
                        throw 'Missing required header in table: "' + _name3 + '".';
                    }
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

            var rows = [];
            for (var r = 1; r < sheet.rows; r++) {
                var row = {};
                for (var c = 0; c < headers.length; c++) {
                    var header = headers[c];
                    var value = sheet.get(r, c);

                    if (value === undefined) {
                        continue;
                    }

                    row[header] = (0, _utilsJs.convert)(value, converters[header]);
                }

                var _iteratorNormalCompletion7 = true;
                var _didIteratorError7 = false;
                var _iteratorError7 = undefined;

                try {
                    for (var _iterator7 = required[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                        var _name4 = _step7.value;

                        if (!(_name4 in row)) {
                            throw 'Missing required field "' + _name4 + '" in row #' + (r + 1) + '".';
                        }
                    }
                } catch (err) {
                    _didIteratorError7 = true;
                    _iteratorError7 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion7 && _iterator7['return']) {
                            _iterator7['return']();
                        }
                    } finally {
                        if (_didIteratorError7) {
                            throw _iteratorError7;
                        }
                    }
                }

                rows.push(row);
            }

            return new Table(rows, headers);
        }
    }]);

    return Table;
})();

exports.Table = Table;