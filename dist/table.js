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

            var contents, errors, ready, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _loop, _iterator, _step, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _step2$value, index, content;

            return regeneratorRuntime.async(function validate$(context$2$0) {
                var _this = this;

                while (1) switch (context$2$0.prev = context$2$0.next) {
                    case 0:
                        contents = {};
                        errors = {};

                        if (!parallel) {
                            context$2$0.next = 28;
                            break;
                        }

                        ready = Promise.resolve(null);
                        _iteratorNormalCompletion = true;
                        _didIteratorError = false;
                        _iteratorError = undefined;
                        context$2$0.prev = 7;

                        _loop = function () {
                            var _step$value = _slicedToArray(_step.value, 2);

                            var index = _step$value[0];
                            var content = _step$value[1];

                            ready = ready.then(function () {
                                return (0, _utilsJs.validateRecord)(content, validators).then(function (value) {
                                    contents[index] = value;
                                }, function (error) {
                                    errors[index] = error;
                                });
                            });
                            console.log(index, content);
                        };

                        for (_iterator = this.rows.entries()[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            _loop();
                        }

                        context$2$0.next = 16;
                        break;

                    case 12:
                        context$2$0.prev = 12;
                        context$2$0.t0 = context$2$0['catch'](7);
                        _didIteratorError = true;
                        _iteratorError = context$2$0.t0;

                    case 16:
                        context$2$0.prev = 16;
                        context$2$0.prev = 17;

                        if (!_iteratorNormalCompletion && _iterator['return']) {
                            _iterator['return']();
                        }

                    case 19:
                        context$2$0.prev = 19;

                        if (!_didIteratorError) {
                            context$2$0.next = 22;
                            break;
                        }

                        throw _iteratorError;

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
                        _iteratorNormalCompletion2 = true;
                        _didIteratorError2 = false;
                        _iteratorError2 = undefined;
                        context$2$0.prev = 31;
                        _iterator2 = this.rows.entries()[Symbol.iterator]();

                    case 33:
                        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                            context$2$0.next = 49;
                            break;
                        }

                        _step2$value = _slicedToArray(_step2.value, 2);
                        index = _step2$value[0];
                        content = _step2$value[1];
                        context$2$0.prev = 37;
                        context$2$0.next = 40;
                        return regeneratorRuntime.awrap((0, _utilsJs.validateRecord)(content, validators));

                    case 40:
                        contents[index] = context$2$0.sent;
                        context$2$0.next = 46;
                        break;

                    case 43:
                        context$2$0.prev = 43;
                        context$2$0.t1 = context$2$0['catch'](37);

                        errors[index] = context$2$0.t1;

                    case 46:
                        _iteratorNormalCompletion2 = true;
                        context$2$0.next = 33;
                        break;

                    case 49:
                        context$2$0.next = 55;
                        break;

                    case 51:
                        context$2$0.prev = 51;
                        context$2$0.t2 = context$2$0['catch'](31);
                        _didIteratorError2 = true;
                        _iteratorError2 = context$2$0.t2;

                    case 55:
                        context$2$0.prev = 55;
                        context$2$0.prev = 56;

                        if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                            _iterator2['return']();
                        }

                    case 58:
                        context$2$0.prev = 58;

                        if (!_didIteratorError2) {
                            context$2$0.next = 61;
                            break;
                        }

                        throw _iteratorError2;

                    case 61:
                        return context$2$0.finish(58);

                    case 62:
                        return context$2$0.finish(55);

                    case 63:
                        if (!(Object.keys(errors).length == 0)) {
                            context$2$0.next = 67;
                            break;
                        }

                        return context$2$0.abrupt('return', new Table((function () {
                            var _ref = [];
                            var _iteratorNormalCompletion3 = true;
                            var _didIteratorError3 = false;
                            var _iteratorError3 = undefined;

                            try {
                                for (var _iterator3 = _this.rows.keys()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                    var index = _step3.value;

                                    _ref.push(contents[index]);
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

                            return _ref;
                        })(), this.headers));

                    case 67:
                        throw errors;

                    case 68:
                    case 'end':
                        return context$2$0.stop();
                }
            }, null, this, [[7, 12, 16, 24], [17,, 19, 23], [31, 51, 55, 63], [37, 43], [56,, 58, 62]]);
        }
    }, {
        key: 'toSheet',
        value: function toSheet() {
            var _this2 = this;

            var content = [this.headers].concat((function () {
                var _concat = [];
                var _iteratorNormalCompletion4 = true;
                var _didIteratorError4 = false;
                var _iteratorError4 = undefined;

                try {
                    var _loop2 = function () {
                        var row = _step4.value;

                        _concat.push((function () {
                            var _concat$push = [];
                            var _iteratorNormalCompletion5 = true;
                            var _didIteratorError5 = false;
                            var _iteratorError5 = undefined;

                            try {
                                for (var _iterator5 = _this2.headers[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
                                    var header = _step5.value;

                                    _concat$push.push(row[header]);
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

                            return _concat$push;
                        })());
                    };

                    for (var _iterator4 = _this2.rows[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                        _loop2();
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
            var _ref2 = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            var _ref2$required = _ref2.required;
            var required = _ref2$required === undefined ? [] : _ref2$required;
            var _ref2$aliases = _ref2.aliases;
            var aliases = _ref2$aliases === undefined ? {} : _ref2$aliases;
            var _ref2$converters = _ref2.converters;
            var converters = _ref2$converters === undefined ? {} : _ref2$converters;

            var invertedAliases = {};
            var _iteratorNormalCompletion6 = true;
            var _didIteratorError6 = false;
            var _iteratorError6 = undefined;

            try {
                for (var _iterator6 = Object.keys(aliases)[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
                    var _name = _step6.value;

                    // default alias: lower case -> original case.
                    invertedAliases[_name.toLowerCase()] = _name;
                    var _iteratorNormalCompletion10 = true;
                    var _didIteratorError10 = false;
                    var _iteratorError10 = undefined;

                    try {
                        for (var _iterator10 = aliases[_name][Symbol.iterator](), _step10; !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done); _iteratorNormalCompletion10 = true) {
                            var alias = _step10.value;

                            invertedAliases[alias.toLowerCase()] = _name;
                        }
                    } catch (err) {
                        _didIteratorError10 = true;
                        _iteratorError10 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion10 && _iterator10['return']) {
                                _iterator10['return']();
                            }
                        } finally {
                            if (_didIteratorError10) {
                                throw _iteratorError10;
                            }
                        }
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

            var _iteratorNormalCompletion7 = true;
            var _didIteratorError7 = false;
            var _iteratorError7 = undefined;

            try {
                for (var _iterator7 = required[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
                    var _name2 = _step7.value;

                    invertedAliases[_name2.toLowerCase()] = _name2;
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

            var headers = [];
            for (var c = 0; c < sheet.columns; c++) {
                var _name3 = sheet.get(0, c);

                if (!_name3) {
                    break;
                }

                _name3 = _name3.toLowerCase();
                if (_name3 in invertedAliases) {
                    _name3 = invertedAliases[_name3];
                }

                headers.push(_name3);
            }

            var _iteratorNormalCompletion8 = true;
            var _didIteratorError8 = false;
            var _iteratorError8 = undefined;

            try {
                for (var _iterator8 = required[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
                    var _name4 = _step8.value;

                    if (!headers.includes(_name4)) {
                        throw 'Missing required header in table: "' + _name4 + '".';
                    }
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

                var _iteratorNormalCompletion9 = true;
                var _didIteratorError9 = false;
                var _iteratorError9 = undefined;

                try {
                    for (var _iterator9 = required[Symbol.iterator](), _step9; !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done); _iteratorNormalCompletion9 = true) {
                        var _name5 = _step9.value;

                        if (!(_name5 in row)) {
                            throw 'Missing required field "' + _name5 + '" in row #' + (r + 1) + '".';
                        }
                    }
                } catch (err) {
                    _didIteratorError9 = true;
                    _iteratorError9 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion9 && _iterator9['return']) {
                            _iterator9['return']();
                        }
                    } finally {
                        if (_didIteratorError9) {
                            throw _iteratorError9;
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