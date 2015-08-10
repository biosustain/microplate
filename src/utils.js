// TODO validate in parallel within a record
/**
 * Applies a set of validators to
 * @param record an object with raw data in key, value format.
 * @param {object<function>} validators key, validator map of validation functions
 * @param vargs optional additional arguments to pass to each validator function
 * @returns {{}}
 */
export async function validateRecord(record, validators, ...vargs) {
    let output = {};

    for (let name of Object.keys(record)) {
        let value = record[name];

        if (name in validators) {
            value = await validators[name](value, ...vargs);
        }

        output[name] = value;
    }

    return output;
}

export function convert(value, converter = null) {
    switch (converter) {
        case 'number':
            return Number(value);
        case 'string[]':
            return value.split(',').map((s) => s.trim());
        case 'number[]':
            return value.split(',').map(Number);
        case 'string':
            return value.toString();
        case 'string(position)':
            let position = value.toString();
            if (!position.match(/[A-Z]\d+/)) {
                throw `Invalid position: "${position}"`;
            }
            return position;
        default:
            return value
    }
}

export function pad(number, digits = 2) {
    number = parseInt(number);
    var N = Math.pow(10, digits);
    if (number < N) {
        return String(N + number).slice(1);
    } else {
        return String(number);
    }
}
