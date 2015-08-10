"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.createType = createType;
exports.findType = findType;
exports.validateType = validateType;

function createType(Type, properties) {
    var instances;
    return _regeneratorRuntime.async(function createType$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.next = 2;
                return _regeneratorRuntime.awrap(Type.getList({ where: properties }, { cache: false }));

            case 2:
                instances = context$1$0.sent;

                if (!(instances.length != 0)) {
                    context$1$0.next = 5;
                    break;
                }

                throw Type.name + " already exists: " + properties;

            case 5:
                return context$1$0.abrupt("return", new Type(properties));

            case 6:
            case "end":
                return context$1$0.stop();
        }
    }, null, this);
}

function findType(Type, properties) {
    var instances;
    return _regeneratorRuntime.async(function findType$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                context$1$0.next = 2;
                return _regeneratorRuntime.awrap(Type.getList({ where: properties }, { cache: false }));

            case 2:
                instances = context$1$0.sent;

                if (!(instances.length != 1)) {
                    context$1$0.next = 5;
                    break;
                }

                throw Type.name + " does not exist: " + properties;

            case 5:
                return context$1$0.abrupt("return", instances[0]);

            case 6:
            case "end":
                return context$1$0.stop();
        }
    }, null, this);
}

function validateType(Type, key) {
    return function (key) {
        return findType(Type, { key: value });
    };
}