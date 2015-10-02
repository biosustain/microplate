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
        errors,
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
                errors = {};
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                context$1$0.prev = 5;

                for (_len = args$1$0.length, vargs = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                    vargs[_key - 2] = args$1$0[_key];
                }

                _iterator = Object.keys(record)[Symbol.iterator]();

            case 8:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                    context$1$0.next = 25;
                    break;
                }

                _name = _step.value;
                value = record[_name];

                if (!(_name in validators)) {
                    context$1$0.next = 21;
                    break;
                }

                context$1$0.prev = 12;
                context$1$0.next = 15;
                return regeneratorRuntime.awrap(validators[_name].apply(validators, [value].concat(vargs)));

            case 15:
                value = context$1$0.sent;
                context$1$0.next = 21;
                break;

            case 18:
                context$1$0.prev = 18;
                context$1$0.t0 = context$1$0['catch'](12);

                errors[_name] = context$1$0.t0;

            case 21:

                output[_name] = value;

            case 22:
                _iteratorNormalCompletion = true;
                context$1$0.next = 8;
                break;

            case 25:
                context$1$0.next = 31;
                break;

            case 27:
                context$1$0.prev = 27;
                context$1$0.t1 = context$1$0['catch'](5);
                _didIteratorError = true;
                _iteratorError = context$1$0.t1;

            case 31:
                context$1$0.prev = 31;
                context$1$0.prev = 32;

                if (!_iteratorNormalCompletion && _iterator['return']) {
                    _iterator['return']();
                }

            case 34:
                context$1$0.prev = 34;

                if (!_didIteratorError) {
                    context$1$0.next = 37;
                    break;
                }

                throw _iteratorError;

            case 37:
                return context$1$0.finish(34);

            case 38:
                return context$1$0.finish(31);

            case 39:
                if (!Object.keys(errors).length) {
                    context$1$0.next = 41;
                    break;
                }

                throw errors;

            case 41:
                return context$1$0.abrupt('return', output);

            case 42:
            case 'end':
                return context$1$0.stop();
        }
    }, null, this, [[5, 27, 31, 39], [12, 18], [32,, 34, 38]]);
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