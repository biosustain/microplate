// TODO validate in parallel within a record
/**
 * Applies a set of validators to
 * @param record an object with raw data in key, value format.
 * @param {object<function>} validators key, validator map of validation functions
 * @param vargs optional additional arguments to pass to each validator function
 * @returns {{}}
 */
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});
exports.validateRecord = validateRecord;
exports.convert = convert;
exports.pad = pad;

function validateRecord(record, validators) {
    var output,
        _iteratorNormalCompletion,
        _didIteratorError,
        _iteratorError,
        _len,
        vargs,
        _key,
        _iterator,
        _step,
        _name,
        value,
        args$1$0 = arguments;

    return regeneratorRuntime.async(function validateRecord$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                output = {};
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                context$1$0.prev = 4;

                for (_len = args$1$0.length, vargs = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                    vargs[_key - 2] = args$1$0[_key];
                }

                _iterator = Object.keys(record)[Symbol.iterator]();

            case 7:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                    context$1$0.next = 18;
                    break;
                }

                _name = _step.value;
                value = record[_name];

                if (!(_name in validators)) {
                    context$1$0.next = 14;
                    break;
                }

                context$1$0.next = 13;
                return regeneratorRuntime.awrap(validators[_name].apply(validators, [value].concat(vargs)));

            case 13:
                value = context$1$0.sent;

            case 14:

                output[_name] = value;

            case 15:
                _iteratorNormalCompletion = true;
                context$1$0.next = 7;
                break;

            case 18:
                context$1$0.next = 24;
                break;

            case 20:
                context$1$0.prev = 20;
                context$1$0.t0 = context$1$0['catch'](4);
                _didIteratorError = true;
                _iteratorError = context$1$0.t0;

            case 24:
                context$1$0.prev = 24;
                context$1$0.prev = 25;

                if (!_iteratorNormalCompletion && _iterator['return']) {
                    _iterator['return']();
                }

            case 27:
                context$1$0.prev = 27;

                if (!_didIteratorError) {
                    context$1$0.next = 30;
                    break;
                }

                throw _iteratorError;

            case 30:
                return context$1$0.finish(27);

            case 31:
                return context$1$0.finish(24);

            case 32:
                return context$1$0.abrupt('return', output);

            case 33:
            case 'end':
                return context$1$0.stop();
        }
    }, null, this, [[4, 20, 24, 32], [25,, 27, 31]]);
}

function convert(value) {
    var converter = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

    switch (converter) {
        case 'number':
            return Number(value);
        case 'string[]':
            return value.split(',').map(function (s) {
                return s.trim();
            });
        case 'number[]':
            return value.split(',').map(Number);
        case 'string':
            return value.toString();
        case 'string(position)':
            var position = value.toString();
            if (!position.match(/[A-Z]\d+/)) {
                throw 'Invalid position: "' + position + '"';
            }
            return position;
        default:
            return value;
    }
}

function pad(number) {
    var digits = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];

    number = parseInt(number);
    var N = Math.pow(10, digits);
    if (number < N) {
        return String(N + number).slice(1);
    } else {
        return String(number);
    }
}