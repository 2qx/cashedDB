(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var db_1 = __webpack_require__(1);
Object.defineProperty(exports, "CashedDB", { enumerable: true, get: function () { return db_1.default; } });
Object.defineProperty(exports, "Block", { enumerable: true, get: function () { return db_1.Block; } });
Object.defineProperty(exports, "ConfirmedTransaction", { enumerable: true, get: function () { return db_1.ConfirmedTransaction; } });
Object.defineProperty(exports, "MempoolTransaction", { enumerable: true, get: function () { return db_1.MempoolTransaction; } });
Object.defineProperty(exports, "Address", { enumerable: true, get: function () { return db_1.Address; } });
var service_1 = __webpack_require__(3);
Object.defineProperty(exports, "CashedService", { enumerable: true, get: function () { return service_1.CashedService; } });


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.Node = exports.Block = exports.MempoolTransaction = exports.ConfirmedTransaction = exports.BaseTransaction = exports.Address = void 0;
const dexie_1 = __importDefault(__webpack_require__(2));
/*
*    The general layout is
*
*    Address
*      Confirmed<Transaction>
*        BlockHash
*      Unconfirmed<Transaction>
*        BlockHash
*
*    Block
*
*    Node
*/
class CashedDB extends dexie_1.default {
    constructor(args) {
        super("cashedDB", args);
        var db = this;
        //
        // Define tables and indexes
        //
        db.version(1).stores({
            block: 'height, &hash, previousBlock',
            txn: '&hash, blockHeight, blockHash',
            mempool: '&hash, blockHeight, blockHash',
            address: '&address',
            node: '&url'
        });
        // Let's physically map Address class to address table.
        // This will make it possible to call loadAddresses()
        // directly on retrieved database objects.
        db.address.mapToClass(Address);
        db.block.mapToClass(Block);
        db.txn.mapToClass(ConfirmedTransaction);
        db.mempool.mapToClass(MempoolTransaction);
    }
}
exports.default = CashedDB;
/* This is a 'physical' class that is mapped to
    * the address table. We can have methods on it that
    * we could call on retrieved database objects.
    */
class Address {
    constructor(address) {
        this.address = address;
        this.balance = 0;
        this.txn = [];
        this.mempool = [];
        // Define navigation properties.
        // Making them non-enumerable will prevent them from being handled by indexedDB
        // when doing put() or add().
        Object.defineProperties(this, {
            txn: { value: [], enumerable: false, writable: true },
            mempool: { value: [], enumerable: false, writable: true }
        });
    }
    loadNavigationProperties() {
        return __awaiter(this, void 0, void 0, function* () {
            [this.txn, this.mempool] = yield Promise.all([
                exports.db.txn.where('inputsList.[].address').equals(this.address).or('outputsList.[].address').equals(this.address).toArray(),
                exports.db.mempool.where('inputsList.[].address').equals(this.address).or('outputsList.[].address').equals(this.address).toArray()
            ]);
        });
    }
    save() {
        return exports.db.transaction('rw', exports.db.address, exports.db.txn, exports.db.mempool, () => __awaiter(this, void 0, void 0, function* () {
            // Add or update our selves. If add, record this.id.
            yield exports.db.address.put(this);
            // Save all navigation properties (arrays of confirmed and mempool)
            // Some may be new and some may be updates of existing objects.
            // put() will handle both cases.
            // (record the result keys from the put() operations into emailIds and phoneIds
            //  so that we can find local deletes)
            let [confirmedHashes, mempooldHashes] = yield Promise.all([
                Promise.all(this.txn.map(tx => exports.db.txn.put(tx))),
                Promise.all(this.mempool.map(tx => exports.db.mempool.put(tx)))
            ]);
        }));
    }
}
exports.Address = Address;
/* Just for code completion and compilation - defines
 * the interface of objects stored in the transaction tables.
 */
class BaseTransaction {
    constructor(hash, version, timestamp, size, inputsList, outputsList, lockTime, computedHash) {
        this.hash = hash;
        this.version = version;
        this.timestamp = timestamp;
        this.size = size;
        this.inputsList = inputsList;
        this.outputsList = outputsList;
        this.lockTime = lockTime;
    }
}
exports.BaseTransaction = BaseTransaction;
class ConfirmedTransaction extends BaseTransaction {
    constructor(hash, blockHeight, blockHash, version, timestamp, size, inputsList, outputsList, lockTime, computedHash) {
        super(hash, version, timestamp, size, inputsList, outputsList, lockTime);
        this.blockHeight = blockHeight;
        this.blockHash = blockHash;
    }
}
exports.ConfirmedTransaction = ConfirmedTransaction;
class MempoolTransaction {
    constructor(transaction, addedTime, addedHeight, fee, feePerKb, startingPriority) {
        this.transaction = transaction;
        this.addedTime = addedTime;
        this.addedHeight = addedHeight;
        this.fee = fee;
        this.feePerKb = feePerKb;
        this.startingPriority = startingPriority;
    }
}
exports.MempoolTransaction = MempoolTransaction;
;
;
/* Just for code completion and compilation - defines
    * the interface of objects stored in the block table.
    */
class Block {
    constructor(height, hash, version, previousBlock, merkleRoot, timestamp, bits, nonce) {
        this.height = height;
        this.hash = hash;
        this.version = version;
        this.previousBlock = previousBlock;
        this.merkleRoot = merkleRoot;
        this.timestamp = timestamp;
        this.bits = bits;
        this.nonce = nonce;
    }
}
exports.Block = Block;
;
class Node {
    constructor(url, bitcoinNet, bestHeight, bestBlockHash, difficulty, medianTime, txIndex, addrIndex) {
        this.url = url;
        this.bitcoinNet = bitcoinNet;
        this.bestHeight = bestHeight;
        this.bestBlockHash = bestBlockHash;
        this.difficulty = difficulty;
        this.medianTime = medianTime;
        this.txIndex = txIndex;
        this.addrIndex = addrIndex;
    }
}
exports.Node = Node;
exports.db = new CashedDB();


/***/ }),
/* 2 */
/***/ (function(__webpack_module__, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * Dexie.js - a minimalistic wrapper for IndexedDB
 * ===============================================
 *
 * By David Fahlander, david.fahlander@gmail.com
 *
 * Version 3.0.1, Thu May 07 2020
 *
 * http://dexie.org
 *
 * Apache License Version 2.0, January 2004, http://www.apache.org/licenses/
 */
 
var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};










function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

var keys = Object.keys;
var isArray = Array.isArray;
var _global = typeof self !== 'undefined' ? self :
    typeof window !== 'undefined' ? window :
        global;
if (typeof Promise !== 'undefined' && !_global.Promise) {
    _global.Promise = Promise;
}
function extend(obj, extension) {
    if (typeof extension !== 'object')
        return obj;
    keys(extension).forEach(function (key) {
        obj[key] = extension[key];
    });
    return obj;
}
var getProto = Object.getPrototypeOf;
var _hasOwn = {}.hasOwnProperty;
function hasOwn(obj, prop) {
    return _hasOwn.call(obj, prop);
}
function props(proto, extension) {
    if (typeof extension === 'function')
        extension = extension(getProto(proto));
    keys(extension).forEach(function (key) {
        setProp(proto, key, extension[key]);
    });
}
var defineProperty = Object.defineProperty;
function setProp(obj, prop, functionOrGetSet, options) {
    defineProperty(obj, prop, extend(functionOrGetSet && hasOwn(functionOrGetSet, "get") && typeof functionOrGetSet.get === 'function' ?
        { get: functionOrGetSet.get, set: functionOrGetSet.set, configurable: true } :
        { value: functionOrGetSet, configurable: true, writable: true }, options));
}
function derive(Child) {
    return {
        from: function (Parent) {
            Child.prototype = Object.create(Parent.prototype);
            setProp(Child.prototype, "constructor", Child);
            return {
                extend: props.bind(null, Child.prototype)
            };
        }
    };
}
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
function getPropertyDescriptor(obj, prop) {
    var pd = getOwnPropertyDescriptor(obj, prop);
    var proto;
    return pd || (proto = getProto(obj)) && getPropertyDescriptor(proto, prop);
}
var _slice = [].slice;
function slice(args, start, end) {
    return _slice.call(args, start, end);
}
function override(origFunc, overridedFactory) {
    return overridedFactory(origFunc);
}
function assert(b) {
    if (!b)
        throw new Error("Assertion Failed");
}
function asap(fn) {
    if (_global.setImmediate)
        setImmediate(fn);
    else
        setTimeout(fn, 0);
}

function arrayToObject(array, extractor) {
    return array.reduce(function (result, item, i) {
        var nameAndValue = extractor(item, i);
        if (nameAndValue)
            result[nameAndValue[0]] = nameAndValue[1];
        return result;
    }, {});
}

function tryCatch(fn, onerror, args) {
    try {
        fn.apply(null, args);
    }
    catch (ex) {
        onerror && onerror(ex);
    }
}
function getByKeyPath(obj, keyPath) {
    if (hasOwn(obj, keyPath))
        return obj[keyPath];
    if (!keyPath)
        return obj;
    if (typeof keyPath !== 'string') {
        var rv = [];
        for (var i = 0, l = keyPath.length; i < l; ++i) {
            var val = getByKeyPath(obj, keyPath[i]);
            rv.push(val);
        }
        return rv;
    }
    var period = keyPath.indexOf('.');
    if (period !== -1) {
        var innerObj = obj[keyPath.substr(0, period)];
        return innerObj === undefined ? undefined : getByKeyPath(innerObj, keyPath.substr(period + 1));
    }
    return undefined;
}
function setByKeyPath(obj, keyPath, value) {
    if (!obj || keyPath === undefined)
        return;
    if ('isFrozen' in Object && Object.isFrozen(obj))
        return;
    if (typeof keyPath !== 'string' && 'length' in keyPath) {
        assert(typeof value !== 'string' && 'length' in value);
        for (var i = 0, l = keyPath.length; i < l; ++i) {
            setByKeyPath(obj, keyPath[i], value[i]);
        }
    }
    else {
        var period = keyPath.indexOf('.');
        if (period !== -1) {
            var currentKeyPath = keyPath.substr(0, period);
            var remainingKeyPath = keyPath.substr(period + 1);
            if (remainingKeyPath === "")
                if (value === undefined) {
                    if (isArray(obj) && !isNaN(parseInt(currentKeyPath)))
                        obj.splice(currentKeyPath, 1);
                    else
                        delete obj[currentKeyPath];
                }
                else
                    obj[currentKeyPath] = value;
            else {
                var innerObj = obj[currentKeyPath];
                if (!innerObj)
                    innerObj = (obj[currentKeyPath] = {});
                setByKeyPath(innerObj, remainingKeyPath, value);
            }
        }
        else {
            if (value === undefined) {
                if (isArray(obj) && !isNaN(parseInt(keyPath)))
                    obj.splice(keyPath, 1);
                else
                    delete obj[keyPath];
            }
            else
                obj[keyPath] = value;
        }
    }
}
function delByKeyPath(obj, keyPath) {
    if (typeof keyPath === 'string')
        setByKeyPath(obj, keyPath, undefined);
    else if ('length' in keyPath)
        [].map.call(keyPath, function (kp) {
            setByKeyPath(obj, kp, undefined);
        });
}
function shallowClone(obj) {
    var rv = {};
    for (var m in obj) {
        if (hasOwn(obj, m))
            rv[m] = obj[m];
    }
    return rv;
}
var concat = [].concat;
function flatten(a) {
    return concat.apply([], a);
}
var intrinsicTypeNames = "Boolean,String,Date,RegExp,Blob,File,FileList,ArrayBuffer,DataView,Uint8ClampedArray,ImageData,Map,Set"
    .split(',').concat(flatten([8, 16, 32, 64].map(function (num) { return ["Int", "Uint", "Float"].map(function (t) { return t + num + "Array"; }); }))).filter(function (t) { return _global[t]; });
var intrinsicTypes = intrinsicTypeNames.map(function (t) { return _global[t]; });
var intrinsicTypeNameSet = arrayToObject(intrinsicTypeNames, function (x) { return [x, true]; });
function deepClone(any) {
    if (!any || typeof any !== 'object')
        return any;
    var rv;
    if (isArray(any)) {
        rv = [];
        for (var i = 0, l = any.length; i < l; ++i) {
            rv.push(deepClone(any[i]));
        }
    }
    else if (intrinsicTypes.indexOf(any.constructor) >= 0) {
        rv = any;
    }
    else {
        rv = any.constructor ? Object.create(any.constructor.prototype) : {};
        for (var prop in any) {
            if (hasOwn(any, prop)) {
                rv[prop] = deepClone(any[prop]);
            }
        }
    }
    return rv;
}
var toString = {}.toString;
function toStringTag(o) {
    return toString.call(o).slice(8, -1);
}
var getValueOf = function (val, type) {
    return type === "Array" ? '' + val.map(function (v) { return getValueOf(v, toStringTag(v)); }) :
        type === "ArrayBuffer" ? '' + new Uint8Array(val) :
            type === "Date" ? val.getTime() :
                ArrayBuffer.isView(val) ? '' + new Uint8Array(val.buffer) :
                    val;
};
function getObjectDiff(a, b, rv, prfx) {
    rv = rv || {};
    prfx = prfx || '';
    keys(a).forEach(function (prop) {
        if (!hasOwn(b, prop))
            rv[prfx + prop] = undefined;
        else {
            var ap = a[prop], bp = b[prop];
            if (typeof ap === 'object' && typeof bp === 'object' && ap && bp) {
                var apTypeName = toStringTag(ap);
                var bpTypeName = toStringTag(bp);
                if (apTypeName === bpTypeName) {
                    if (intrinsicTypeNameSet[apTypeName]) {
                        if (getValueOf(ap, apTypeName) !== getValueOf(bp, bpTypeName)) {
                            rv[prfx + prop] = b[prop];
                        }
                    }
                    else {
                        getObjectDiff(ap, bp, rv, prfx + prop + ".");
                    }
                }
                else {
                    rv[prfx + prop] = b[prop];
                }
            }
            else if (ap !== bp)
                rv[prfx + prop] = b[prop];
        }
    });
    keys(b).forEach(function (prop) {
        if (!hasOwn(a, prop)) {
            rv[prfx + prop] = b[prop];
        }
    });
    return rv;
}
var iteratorSymbol = typeof Symbol !== 'undefined' && Symbol.iterator;
var getIteratorOf = iteratorSymbol ? function (x) {
    var i;
    return x != null && (i = x[iteratorSymbol]) && i.apply(x);
} : function () { return null; };
var NO_CHAR_ARRAY = {};
function getArrayOf(arrayLike) {
    var i, a, x, it;
    if (arguments.length === 1) {
        if (isArray(arrayLike))
            return arrayLike.slice();
        if (this === NO_CHAR_ARRAY && typeof arrayLike === 'string')
            return [arrayLike];
        if ((it = getIteratorOf(arrayLike))) {
            a = [];
            while (x = it.next(), !x.done)
                a.push(x.value);
            return a;
        }
        if (arrayLike == null)
            return [arrayLike];
        i = arrayLike.length;
        if (typeof i === 'number') {
            a = new Array(i);
            while (i--)
                a[i] = arrayLike[i];
            return a;
        }
        return [arrayLike];
    }
    i = arguments.length;
    a = new Array(i);
    while (i--)
        a[i] = arguments[i];
    return a;
}
var isAsyncFunction = typeof Symbol !== 'undefined'
    ? function (fn) { return fn[Symbol.toStringTag] === 'AsyncFunction'; }
    : function () { return false; };

var debug = typeof location !== 'undefined' &&
    /^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);
function setDebug(value, filter) {
    debug = value;
    libraryFilter = filter;
}
var libraryFilter = function () { return true; };
var NEEDS_THROW_FOR_STACK = !new Error("").stack;
function getErrorWithStack() {
    if (NEEDS_THROW_FOR_STACK)
        try {
            throw new Error();
        }
        catch (e) {
            return e;
        }
    return new Error();
}
function prettyStack(exception, numIgnoredFrames) {
    var stack = exception.stack;
    if (!stack)
        return "";
    numIgnoredFrames = (numIgnoredFrames || 0);
    if (stack.indexOf(exception.name) === 0)
        numIgnoredFrames += (exception.name + exception.message).split('\n').length;
    return stack.split('\n')
        .slice(numIgnoredFrames)
        .filter(libraryFilter)
        .map(function (frame) { return "\n" + frame; })
        .join('');
}

var dexieErrorNames = [
    'Modify',
    'Bulk',
    'OpenFailed',
    'VersionChange',
    'Schema',
    'Upgrade',
    'InvalidTable',
    'MissingAPI',
    'NoSuchDatabase',
    'InvalidArgument',
    'SubTransaction',
    'Unsupported',
    'Internal',
    'DatabaseClosed',
    'PrematureCommit',
    'ForeignAwait'
];
var idbDomErrorNames = [
    'Unknown',
    'Constraint',
    'Data',
    'TransactionInactive',
    'ReadOnly',
    'Version',
    'NotFound',
    'InvalidState',
    'InvalidAccess',
    'Abort',
    'Timeout',
    'QuotaExceeded',
    'Syntax',
    'DataClone'
];
var errorList = dexieErrorNames.concat(idbDomErrorNames);
var defaultTexts = {
    VersionChanged: "Database version changed by other database connection",
    DatabaseClosed: "Database has been closed",
    Abort: "Transaction aborted",
    TransactionInactive: "Transaction has already completed or failed"
};
function DexieError(name, msg) {
    this._e = getErrorWithStack();
    this.name = name;
    this.message = msg;
}
derive(DexieError).from(Error).extend({
    stack: {
        get: function () {
            return this._stack ||
                (this._stack = this.name + ": " + this.message + prettyStack(this._e, 2));
        }
    },
    toString: function () { return this.name + ": " + this.message; }
});
function getMultiErrorMessage(msg, failures) {
    return msg + ". Errors: " + Object.keys(failures)
        .map(function (key) { return failures[key].toString(); })
        .filter(function (v, i, s) { return s.indexOf(v) === i; })
        .join('\n');
}
function ModifyError(msg, failures, successCount, failedKeys) {
    this._e = getErrorWithStack();
    this.failures = failures;
    this.failedKeys = failedKeys;
    this.successCount = successCount;
    this.message = getMultiErrorMessage(msg, failures);
}
derive(ModifyError).from(DexieError);
function BulkError(msg, failures) {
    this._e = getErrorWithStack();
    this.name = "BulkError";
    this.failures = failures;
    this.message = getMultiErrorMessage(msg, failures);
}
derive(BulkError).from(DexieError);
var errnames = errorList.reduce(function (obj, name) { return (obj[name] = name + "Error", obj); }, {});
var BaseException = DexieError;
var exceptions = errorList.reduce(function (obj, name) {
    var fullName = name + "Error";
    function DexieError(msgOrInner, inner) {
        this._e = getErrorWithStack();
        this.name = fullName;
        if (!msgOrInner) {
            this.message = defaultTexts[name] || fullName;
            this.inner = null;
        }
        else if (typeof msgOrInner === 'string') {
            this.message = "" + msgOrInner + (!inner ? '' : '\n ' + inner);
            this.inner = inner || null;
        }
        else if (typeof msgOrInner === 'object') {
            this.message = msgOrInner.name + " " + msgOrInner.message;
            this.inner = msgOrInner;
        }
    }
    derive(DexieError).from(BaseException);
    obj[name] = DexieError;
    return obj;
}, {});
exceptions.Syntax = SyntaxError;
exceptions.Type = TypeError;
exceptions.Range = RangeError;
var exceptionMap = idbDomErrorNames.reduce(function (obj, name) {
    obj[name + "Error"] = exceptions[name];
    return obj;
}, {});
function mapError(domError, message) {
    if (!domError || domError instanceof DexieError || domError instanceof TypeError || domError instanceof SyntaxError || !domError.name || !exceptionMap[domError.name])
        return domError;
    var rv = new exceptionMap[domError.name](message || domError.message, domError);
    if ("stack" in domError) {
        setProp(rv, "stack", { get: function () {
                return this.inner.stack;
            } });
    }
    return rv;
}
var fullNameExceptions = errorList.reduce(function (obj, name) {
    if (["Syntax", "Type", "Range"].indexOf(name) === -1)
        obj[name + "Error"] = exceptions[name];
    return obj;
}, {});
fullNameExceptions.ModifyError = ModifyError;
fullNameExceptions.DexieError = DexieError;
fullNameExceptions.BulkError = BulkError;

function nop() { }
function mirror(val) { return val; }
function pureFunctionChain(f1, f2) {
    if (f1 == null || f1 === mirror)
        return f2;
    return function (val) {
        return f2(f1(val));
    };
}
function callBoth(on1, on2) {
    return function () {
        on1.apply(this, arguments);
        on2.apply(this, arguments);
    };
}
function hookCreatingChain(f1, f2) {
    if (f1 === nop)
        return f2;
    return function () {
        var res = f1.apply(this, arguments);
        if (res !== undefined)
            arguments[0] = res;
        var onsuccess = this.onsuccess,
        onerror = this.onerror;
        this.onsuccess = null;
        this.onerror = null;
        var res2 = f2.apply(this, arguments);
        if (onsuccess)
            this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
        if (onerror)
            this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
        return res2 !== undefined ? res2 : res;
    };
}
function hookDeletingChain(f1, f2) {
    if (f1 === nop)
        return f2;
    return function () {
        f1.apply(this, arguments);
        var onsuccess = this.onsuccess,
        onerror = this.onerror;
        this.onsuccess = this.onerror = null;
        f2.apply(this, arguments);
        if (onsuccess)
            this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
        if (onerror)
            this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
    };
}
function hookUpdatingChain(f1, f2) {
    if (f1 === nop)
        return f2;
    return function (modifications) {
        var res = f1.apply(this, arguments);
        extend(modifications, res);
        var onsuccess = this.onsuccess,
        onerror = this.onerror;
        this.onsuccess = null;
        this.onerror = null;
        var res2 = f2.apply(this, arguments);
        if (onsuccess)
            this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
        if (onerror)
            this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
        return res === undefined ?
            (res2 === undefined ? undefined : res2) :
            (extend(res, res2));
    };
}
function reverseStoppableEventChain(f1, f2) {
    if (f1 === nop)
        return f2;
    return function () {
        if (f2.apply(this, arguments) === false)
            return false;
        return f1.apply(this, arguments);
    };
}

function promisableChain(f1, f2) {
    if (f1 === nop)
        return f2;
    return function () {
        var res = f1.apply(this, arguments);
        if (res && typeof res.then === 'function') {
            var thiz = this, i = arguments.length, args = new Array(i);
            while (i--)
                args[i] = arguments[i];
            return res.then(function () {
                return f2.apply(thiz, args);
            });
        }
        return f2.apply(this, arguments);
    };
}

var INTERNAL = {};
var LONG_STACKS_CLIP_LIMIT = 100;
var MAX_LONG_STACKS = 20;
var ZONE_ECHO_LIMIT = 100;
var _a = typeof Promise === 'undefined' ?
    [] :
    (function () {
        var globalP = Promise.resolve();
        if (typeof crypto === 'undefined' || !crypto.subtle)
            return [globalP, globalP.__proto__, globalP];
        var nativeP = crypto.subtle.digest("SHA-512", new Uint8Array([0]));
        return [
            nativeP,
            nativeP.__proto__,
            globalP
        ];
    })();
var resolvedNativePromise = _a[0];
var nativePromiseProto = _a[1];
var resolvedGlobalPromise = _a[2];
var nativePromiseThen = nativePromiseProto && nativePromiseProto.then;
var NativePromise = resolvedNativePromise && resolvedNativePromise.constructor;
var patchGlobalPromise = !!resolvedGlobalPromise;
var stack_being_generated = false;
var schedulePhysicalTick = resolvedGlobalPromise ?
    function () { resolvedGlobalPromise.then(physicalTick); }
    :
        _global.setImmediate ?
            setImmediate.bind(null, physicalTick) :
            _global.MutationObserver ?
                function () {
                    var hiddenDiv = document.createElement("div");
                    (new MutationObserver(function () {
                        physicalTick();
                        hiddenDiv = null;
                    })).observe(hiddenDiv, { attributes: true });
                    hiddenDiv.setAttribute('i', '1');
                } :
                function () { setTimeout(physicalTick, 0); };
var asap$1 = function (callback, args) {
    microtickQueue.push([callback, args]);
    if (needsNewPhysicalTick) {
        schedulePhysicalTick();
        needsNewPhysicalTick = false;
    }
};
var isOutsideMicroTick = true;
var needsNewPhysicalTick = true;
var unhandledErrors = [];
var rejectingErrors = [];
var currentFulfiller = null;
var rejectionMapper = mirror;
var globalPSD = {
    id: 'global',
    global: true,
    ref: 0,
    unhandleds: [],
    onunhandled: globalError,
    pgp: false,
    env: {},
    finalize: function () {
        this.unhandleds.forEach(function (uh) {
            try {
                globalError(uh[0], uh[1]);
            }
            catch (e) { }
        });
    }
};
var PSD = globalPSD;
var microtickQueue = [];
var numScheduledCalls = 0;
var tickFinalizers = [];
function DexiePromise(fn) {
    if (typeof this !== 'object')
        throw new TypeError('Promises must be constructed via new');
    this._listeners = [];
    this.onuncatched = nop;
    this._lib = false;
    var psd = (this._PSD = PSD);
    if (debug) {
        this._stackHolder = getErrorWithStack();
        this._prev = null;
        this._numPrev = 0;
    }
    if (typeof fn !== 'function') {
        if (fn !== INTERNAL)
            throw new TypeError('Not a function');
        this._state = arguments[1];
        this._value = arguments[2];
        if (this._state === false)
            handleRejection(this, this._value);
        return;
    }
    this._state = null;
    this._value = null;
    ++psd.ref;
    executePromiseTask(this, fn);
}
var thenProp = {
    get: function () {
        var psd = PSD, microTaskId = totalEchoes;
        function then(onFulfilled, onRejected) {
            var _this = this;
            var possibleAwait = !psd.global && (psd !== PSD || microTaskId !== totalEchoes);
            if (possibleAwait)
                decrementExpectedAwaits();
            var rv = new DexiePromise(function (resolve, reject) {
                propagateToListener(_this, new Listener(nativeAwaitCompatibleWrap(onFulfilled, psd, possibleAwait), nativeAwaitCompatibleWrap(onRejected, psd, possibleAwait), resolve, reject, psd));
            });
            debug && linkToPreviousPromise(rv, this);
            return rv;
        }
        then.prototype = INTERNAL;
        return then;
    },
    set: function (value) {
        setProp(this, 'then', value && value.prototype === INTERNAL ?
            thenProp :
            {
                get: function () {
                    return value;
                },
                set: thenProp.set
            });
    }
};
props(DexiePromise.prototype, {
    then: thenProp,
    _then: function (onFulfilled, onRejected) {
        propagateToListener(this, new Listener(null, null, onFulfilled, onRejected, PSD));
    },
    catch: function (onRejected) {
        if (arguments.length === 1)
            return this.then(null, onRejected);
        var type = arguments[0], handler = arguments[1];
        return typeof type === 'function' ? this.then(null, function (err) {
            return err instanceof type ? handler(err) : PromiseReject(err);
        })
            : this.then(null, function (err) {
                return err && err.name === type ? handler(err) : PromiseReject(err);
            });
    },
    finally: function (onFinally) {
        return this.then(function (value) {
            onFinally();
            return value;
        }, function (err) {
            onFinally();
            return PromiseReject(err);
        });
    },
    stack: {
        get: function () {
            if (this._stack)
                return this._stack;
            try {
                stack_being_generated = true;
                var stacks = getStack(this, [], MAX_LONG_STACKS);
                var stack = stacks.join("\nFrom previous: ");
                if (this._state !== null)
                    this._stack = stack;
                return stack;
            }
            finally {
                stack_being_generated = false;
            }
        }
    },
    timeout: function (ms, msg) {
        var _this = this;
        return ms < Infinity ?
            new DexiePromise(function (resolve, reject) {
                var handle = setTimeout(function () { return reject(new exceptions.Timeout(msg)); }, ms);
                _this.then(resolve, reject).finally(clearTimeout.bind(null, handle));
            }) : this;
    }
});
if (typeof Symbol !== 'undefined' && Symbol.toStringTag)
    setProp(DexiePromise.prototype, Symbol.toStringTag, 'Dexie.Promise');
globalPSD.env = snapShot();
function Listener(onFulfilled, onRejected, resolve, reject, zone) {
    this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
    this.onRejected = typeof onRejected === 'function' ? onRejected : null;
    this.resolve = resolve;
    this.reject = reject;
    this.psd = zone;
}
props(DexiePromise, {
    all: function () {
        var values = getArrayOf.apply(null, arguments)
            .map(onPossibleParallellAsync);
        return new DexiePromise(function (resolve, reject) {
            if (values.length === 0)
                resolve([]);
            var remaining = values.length;
            values.forEach(function (a, i) { return DexiePromise.resolve(a).then(function (x) {
                values[i] = x;
                if (!--remaining)
                    resolve(values);
            }, reject); });
        });
    },
    resolve: function (value) {
        if (value instanceof DexiePromise)
            return value;
        if (value && typeof value.then === 'function')
            return new DexiePromise(function (resolve, reject) {
                value.then(resolve, reject);
            });
        var rv = new DexiePromise(INTERNAL, true, value);
        linkToPreviousPromise(rv, currentFulfiller);
        return rv;
    },
    reject: PromiseReject,
    race: function () {
        var values = getArrayOf.apply(null, arguments).map(onPossibleParallellAsync);
        return new DexiePromise(function (resolve, reject) {
            values.map(function (value) { return DexiePromise.resolve(value).then(resolve, reject); });
        });
    },
    PSD: {
        get: function () { return PSD; },
        set: function (value) { return PSD = value; }
    },
    newPSD: newScope,
    usePSD: usePSD,
    scheduler: {
        get: function () { return asap$1; },
        set: function (value) { asap$1 = value; }
    },
    rejectionMapper: {
        get: function () { return rejectionMapper; },
        set: function (value) { rejectionMapper = value; }
    },
    follow: function (fn, zoneProps) {
        return new DexiePromise(function (resolve, reject) {
            return newScope(function (resolve, reject) {
                var psd = PSD;
                psd.unhandleds = [];
                psd.onunhandled = reject;
                psd.finalize = callBoth(function () {
                    var _this = this;
                    run_at_end_of_this_or_next_physical_tick(function () {
                        _this.unhandleds.length === 0 ? resolve() : reject(_this.unhandleds[0]);
                    });
                }, psd.finalize);
                fn();
            }, zoneProps, resolve, reject);
        });
    }
});
if (NativePromise) {
    if (NativePromise.allSettled)
        setProp(DexiePromise, "allSettled", function () {
            var possiblePromises = getArrayOf.apply(null, arguments).map(onPossibleParallellAsync);
            return new DexiePromise(function (resolve) {
                if (possiblePromises.length === 0)
                    resolve([]);
                var remaining = possiblePromises.length;
                var results = new Array(remaining);
                possiblePromises.forEach(function (p, i) { return DexiePromise.resolve(p).then(function (value) { return results[i] = { status: "fulfilled", value: value }; }, function (reason) { return results[i] = { status: "rejected", reason: reason }; })
                    .then(function () { return --remaining || resolve(results); }); });
            });
        });
    if (NativePromise.any && typeof AggregateError !== 'undefined')
        setProp(DexiePromise, "any", function () {
            var possiblePromises = getArrayOf.apply(null, arguments).map(onPossibleParallellAsync);
            return new DexiePromise(function (resolve, reject) {
                if (possiblePromises.length === 0)
                    reject(new AggregateError([]));
                var remaining = possiblePromises.length;
                var failures = new Array(remaining);
                possiblePromises.forEach(function (p, i) { return DexiePromise.resolve(p).then(function (value) { return resolve(value); }, function (failure) {
                    failures[i] = failure;
                    if (!--remaining)
                        reject(new AggregateError(failures));
                }); });
            });
        });
}
function executePromiseTask(promise, fn) {
    try {
        fn(function (value) {
            if (promise._state !== null)
                return;
            if (value === promise)
                throw new TypeError('A promise cannot be resolved with itself.');
            var shouldExecuteTick = promise._lib && beginMicroTickScope();
            if (value && typeof value.then === 'function') {
                executePromiseTask(promise, function (resolve, reject) {
                    value instanceof DexiePromise ?
                        value._then(resolve, reject) :
                        value.then(resolve, reject);
                });
            }
            else {
                promise._state = true;
                promise._value = value;
                propagateAllListeners(promise);
            }
            if (shouldExecuteTick)
                endMicroTickScope();
        }, handleRejection.bind(null, promise));
    }
    catch (ex) {
        handleRejection(promise, ex);
    }
}
function handleRejection(promise, reason) {
    rejectingErrors.push(reason);
    if (promise._state !== null)
        return;
    var shouldExecuteTick = promise._lib && beginMicroTickScope();
    reason = rejectionMapper(reason);
    promise._state = false;
    promise._value = reason;
    debug && reason !== null && typeof reason === 'object' && !reason._promise && tryCatch(function () {
        var origProp = getPropertyDescriptor(reason, "stack");
        reason._promise = promise;
        setProp(reason, "stack", {
            get: function () {
                return stack_being_generated ?
                    origProp && (origProp.get ?
                        origProp.get.apply(reason) :
                        origProp.value) :
                    promise.stack;
            }
        });
    });
    addPossiblyUnhandledError(promise);
    propagateAllListeners(promise);
    if (shouldExecuteTick)
        endMicroTickScope();
}
function propagateAllListeners(promise) {
    var listeners = promise._listeners;
    promise._listeners = [];
    for (var i = 0, len = listeners.length; i < len; ++i) {
        propagateToListener(promise, listeners[i]);
    }
    var psd = promise._PSD;
    --psd.ref || psd.finalize();
    if (numScheduledCalls === 0) {
        ++numScheduledCalls;
        asap$1(function () {
            if (--numScheduledCalls === 0)
                finalizePhysicalTick();
        }, []);
    }
}
function propagateToListener(promise, listener) {
    if (promise._state === null) {
        promise._listeners.push(listener);
        return;
    }
    var cb = promise._state ? listener.onFulfilled : listener.onRejected;
    if (cb === null) {
        return (promise._state ? listener.resolve : listener.reject)(promise._value);
    }
    ++listener.psd.ref;
    ++numScheduledCalls;
    asap$1(callListener, [cb, promise, listener]);
}
function callListener(cb, promise, listener) {
    try {
        currentFulfiller = promise;
        var ret, value = promise._value;
        if (promise._state) {
            ret = cb(value);
        }
        else {
            if (rejectingErrors.length)
                rejectingErrors = [];
            ret = cb(value);
            if (rejectingErrors.indexOf(value) === -1)
                markErrorAsHandled(promise);
        }
        listener.resolve(ret);
    }
    catch (e) {
        listener.reject(e);
    }
    finally {
        currentFulfiller = null;
        if (--numScheduledCalls === 0)
            finalizePhysicalTick();
        --listener.psd.ref || listener.psd.finalize();
    }
}
function getStack(promise, stacks, limit) {
    if (stacks.length === limit)
        return stacks;
    var stack = "";
    if (promise._state === false) {
        var failure = promise._value, errorName, message;
        if (failure != null) {
            errorName = failure.name || "Error";
            message = failure.message || failure;
            stack = prettyStack(failure, 0);
        }
        else {
            errorName = failure;
            message = "";
        }
        stacks.push(errorName + (message ? ": " + message : "") + stack);
    }
    if (debug) {
        stack = prettyStack(promise._stackHolder, 2);
        if (stack && stacks.indexOf(stack) === -1)
            stacks.push(stack);
        if (promise._prev)
            getStack(promise._prev, stacks, limit);
    }
    return stacks;
}
function linkToPreviousPromise(promise, prev) {
    var numPrev = prev ? prev._numPrev + 1 : 0;
    if (numPrev < LONG_STACKS_CLIP_LIMIT) {
        promise._prev = prev;
        promise._numPrev = numPrev;
    }
}
function physicalTick() {
    beginMicroTickScope() && endMicroTickScope();
}
function beginMicroTickScope() {
    var wasRootExec = isOutsideMicroTick;
    isOutsideMicroTick = false;
    needsNewPhysicalTick = false;
    return wasRootExec;
}
function endMicroTickScope() {
    var callbacks, i, l;
    do {
        while (microtickQueue.length > 0) {
            callbacks = microtickQueue;
            microtickQueue = [];
            l = callbacks.length;
            for (i = 0; i < l; ++i) {
                var item = callbacks[i];
                item[0].apply(null, item[1]);
            }
        }
    } while (microtickQueue.length > 0);
    isOutsideMicroTick = true;
    needsNewPhysicalTick = true;
}
function finalizePhysicalTick() {
    var unhandledErrs = unhandledErrors;
    unhandledErrors = [];
    unhandledErrs.forEach(function (p) {
        p._PSD.onunhandled.call(null, p._value, p);
    });
    var finalizers = tickFinalizers.slice(0);
    var i = finalizers.length;
    while (i)
        finalizers[--i]();
}
function run_at_end_of_this_or_next_physical_tick(fn) {
    function finalizer() {
        fn();
        tickFinalizers.splice(tickFinalizers.indexOf(finalizer), 1);
    }
    tickFinalizers.push(finalizer);
    ++numScheduledCalls;
    asap$1(function () {
        if (--numScheduledCalls === 0)
            finalizePhysicalTick();
    }, []);
}
function addPossiblyUnhandledError(promise) {
    if (!unhandledErrors.some(function (p) { return p._value === promise._value; }))
        unhandledErrors.push(promise);
}
function markErrorAsHandled(promise) {
    var i = unhandledErrors.length;
    while (i)
        if (unhandledErrors[--i]._value === promise._value) {
            unhandledErrors.splice(i, 1);
            return;
        }
}
function PromiseReject(reason) {
    return new DexiePromise(INTERNAL, false, reason);
}
function wrap(fn, errorCatcher) {
    var psd = PSD;
    return function () {
        var wasRootExec = beginMicroTickScope(), outerScope = PSD;
        try {
            switchToZone(psd, true);
            return fn.apply(this, arguments);
        }
        catch (e) {
            errorCatcher && errorCatcher(e);
        }
        finally {
            switchToZone(outerScope, false);
            if (wasRootExec)
                endMicroTickScope();
        }
    };
}
var task = { awaits: 0, echoes: 0, id: 0 };
var taskCounter = 0;
var zoneStack = [];
var zoneEchoes = 0;
var totalEchoes = 0;
var zone_id_counter = 0;
function newScope(fn, props$$1, a1, a2) {
    var parent = PSD, psd = Object.create(parent);
    psd.parent = parent;
    psd.ref = 0;
    psd.global = false;
    psd.id = ++zone_id_counter;
    var globalEnv = globalPSD.env;
    psd.env = patchGlobalPromise ? {
        Promise: DexiePromise,
        PromiseProp: { value: DexiePromise, configurable: true, writable: true },
        all: DexiePromise.all,
        race: DexiePromise.race,
        allSettled: DexiePromise.allSettled,
        any: DexiePromise.any,
        resolve: DexiePromise.resolve,
        reject: DexiePromise.reject,
        nthen: getPatchedPromiseThen(globalEnv.nthen, psd),
        gthen: getPatchedPromiseThen(globalEnv.gthen, psd)
    } : {};
    if (props$$1)
        extend(psd, props$$1);
    ++parent.ref;
    psd.finalize = function () {
        --this.parent.ref || this.parent.finalize();
    };
    var rv = usePSD(psd, fn, a1, a2);
    if (psd.ref === 0)
        psd.finalize();
    return rv;
}
function incrementExpectedAwaits() {
    if (!task.id)
        task.id = ++taskCounter;
    ++task.awaits;
    task.echoes += ZONE_ECHO_LIMIT;
    return task.id;
}
function decrementExpectedAwaits(sourceTaskId) {
    if (!task.awaits || (sourceTaskId && sourceTaskId !== task.id))
        return;
    if (--task.awaits === 0)
        task.id = 0;
    task.echoes = task.awaits * ZONE_ECHO_LIMIT;
}
if (('' + nativePromiseThen).indexOf('[native code]') === -1) {
    incrementExpectedAwaits = decrementExpectedAwaits = nop;
}
function onPossibleParallellAsync(possiblePromise) {
    if (task.echoes && possiblePromise && possiblePromise.constructor === NativePromise) {
        incrementExpectedAwaits();
        return possiblePromise.then(function (x) {
            decrementExpectedAwaits();
            return x;
        }, function (e) {
            decrementExpectedAwaits();
            return rejection(e);
        });
    }
    return possiblePromise;
}
function zoneEnterEcho(targetZone) {
    ++totalEchoes;
    if (!task.echoes || --task.echoes === 0) {
        task.echoes = task.id = 0;
    }
    zoneStack.push(PSD);
    switchToZone(targetZone, true);
}
function zoneLeaveEcho() {
    var zone = zoneStack[zoneStack.length - 1];
    zoneStack.pop();
    switchToZone(zone, false);
}
function switchToZone(targetZone, bEnteringZone) {
    var currentZone = PSD;
    if (bEnteringZone ? task.echoes && (!zoneEchoes++ || targetZone !== PSD) : zoneEchoes && (!--zoneEchoes || targetZone !== PSD)) {
        enqueueNativeMicroTask(bEnteringZone ? zoneEnterEcho.bind(null, targetZone) : zoneLeaveEcho);
    }
    if (targetZone === PSD)
        return;
    PSD = targetZone;
    if (currentZone === globalPSD)
        globalPSD.env = snapShot();
    if (patchGlobalPromise) {
        var GlobalPromise_1 = globalPSD.env.Promise;
        var targetEnv = targetZone.env;
        nativePromiseProto.then = targetEnv.nthen;
        GlobalPromise_1.prototype.then = targetEnv.gthen;
        if (currentZone.global || targetZone.global) {
            Object.defineProperty(_global, 'Promise', targetEnv.PromiseProp);
            GlobalPromise_1.all = targetEnv.all;
            GlobalPromise_1.race = targetEnv.race;
            GlobalPromise_1.resolve = targetEnv.resolve;
            GlobalPromise_1.reject = targetEnv.reject;
            if (targetEnv.allSettled)
                GlobalPromise_1.allSettled = targetEnv.allSettled;
            if (targetEnv.any)
                GlobalPromise_1.any = targetEnv.any;
        }
    }
}
function snapShot() {
    var GlobalPromise = _global.Promise;
    return patchGlobalPromise ? {
        Promise: GlobalPromise,
        PromiseProp: Object.getOwnPropertyDescriptor(_global, "Promise"),
        all: GlobalPromise.all,
        race: GlobalPromise.race,
        allSettled: GlobalPromise.allSettled,
        any: GlobalPromise.any,
        resolve: GlobalPromise.resolve,
        reject: GlobalPromise.reject,
        nthen: nativePromiseProto.then,
        gthen: GlobalPromise.prototype.then
    } : {};
}
function usePSD(psd, fn, a1, a2, a3) {
    var outerScope = PSD;
    try {
        switchToZone(psd, true);
        return fn(a1, a2, a3);
    }
    finally {
        switchToZone(outerScope, false);
    }
}
function enqueueNativeMicroTask(job) {
    nativePromiseThen.call(resolvedNativePromise, job);
}
function nativeAwaitCompatibleWrap(fn, zone, possibleAwait) {
    return typeof fn !== 'function' ? fn : function () {
        var outerZone = PSD;
        if (possibleAwait)
            incrementExpectedAwaits();
        switchToZone(zone, true);
        try {
            return fn.apply(this, arguments);
        }
        finally {
            switchToZone(outerZone, false);
        }
    };
}
function getPatchedPromiseThen(origThen, zone) {
    return function (onResolved, onRejected) {
        return origThen.call(this, nativeAwaitCompatibleWrap(onResolved, zone, false), nativeAwaitCompatibleWrap(onRejected, zone, false));
    };
}
var UNHANDLEDREJECTION = "unhandledrejection";
function globalError(err, promise) {
    var rv;
    try {
        rv = promise.onuncatched(err);
    }
    catch (e) { }
    if (rv !== false)
        try {
            var event, eventData = { promise: promise, reason: err };
            if (_global.document && document.createEvent) {
                event = document.createEvent('Event');
                event.initEvent(UNHANDLEDREJECTION, true, true);
                extend(event, eventData);
            }
            else if (_global.CustomEvent) {
                event = new CustomEvent(UNHANDLEDREJECTION, { detail: eventData });
                extend(event, eventData);
            }
            if (event && _global.dispatchEvent) {
                dispatchEvent(event);
                if (!_global.PromiseRejectionEvent && _global.onunhandledrejection)
                    try {
                        _global.onunhandledrejection(event);
                    }
                    catch (_) { }
            }
            if (debug && event && !event.defaultPrevented) {
                console.warn("Unhandled rejection: " + (err.stack || err));
            }
        }
        catch (e) { }
}
var rejection = DexiePromise.reject;

function tempTransaction(db, mode, storeNames, fn) {
    if (!db._state.openComplete && (!PSD.letThrough)) {
        if (!db._state.isBeingOpened) {
            if (!db._options.autoOpen)
                return rejection(new exceptions.DatabaseClosed());
            db.open().catch(nop);
        }
        return db._state.dbReadyPromise.then(function () { return tempTransaction(db, mode, storeNames, fn); });
    }
    else {
        var trans = db._createTransaction(mode, storeNames, db._dbSchema);
        try {
            trans.create();
        }
        catch (ex) {
            return rejection(ex);
        }
        return trans._promise(mode, function (resolve, reject) {
            return newScope(function () {
                PSD.trans = trans;
                return fn(resolve, reject, trans);
            });
        }).then(function (result) {
            return trans._completion.then(function () { return result; });
        });
    }
}

var DEXIE_VERSION = '3.0.1';
var maxString = String.fromCharCode(65535);
var minKey = -Infinity;
var INVALID_KEY_ARGUMENT = "Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.";
var STRING_EXPECTED = "String expected.";
var connections = [];
var isIEOrEdge = typeof navigator !== 'undefined' && /(MSIE|Trident|Edge)/.test(navigator.userAgent);
var hasIEDeleteObjectStoreBug = isIEOrEdge;
var hangsOnDeleteLargeKeyRange = isIEOrEdge;
var dexieStackFrameFilter = function (frame) { return !/(dexie\.js|dexie\.min\.js)/.test(frame); };
var DBNAMES_DB = '__dbnames';
var READONLY = 'readonly';
var READWRITE = 'readwrite';

function combine(filter1, filter2) {
    return filter1 ?
        filter2 ?
            function () { return filter1.apply(this, arguments) && filter2.apply(this, arguments); } :
            filter1 :
        filter2;
}

var AnyRange = {
    type: 3          ,
    lower: -Infinity,
    lowerOpen: false,
    upper: [[]],
    upperOpen: false
};

var Table =               (function () {
    function Table() {
    }
    Table.prototype._trans = function (mode, fn, writeLocked) {
        var trans = this._tx || PSD.trans;
        var tableName = this.name;
        function checkTableInTransaction(resolve, reject, trans) {
            if (!trans.schema[tableName])
                throw new exceptions.NotFound("Table " + tableName + " not part of transaction");
            return fn(trans.idbtrans, trans);
        }
        var wasRootExec = beginMicroTickScope();
        try {
            return trans && trans.db === this.db ?
                trans === PSD.trans ?
                    trans._promise(mode, checkTableInTransaction, writeLocked) :
                    newScope(function () { return trans._promise(mode, checkTableInTransaction, writeLocked); }, { trans: trans, transless: PSD.transless || PSD }) :
                tempTransaction(this.db, mode, [this.name], checkTableInTransaction);
        }
        finally {
            if (wasRootExec)
                endMicroTickScope();
        }
    };
    Table.prototype.get = function (keyOrCrit, cb) {
        var _this = this;
        if (keyOrCrit && keyOrCrit.constructor === Object)
            return this.where(keyOrCrit).first(cb);
        return this._trans('readonly', function (trans) {
            return _this.core.get({ trans: trans, key: keyOrCrit })
                .then(function (res) { return _this.hook.reading.fire(res); });
        }).then(cb);
    };
    Table.prototype.where = function (indexOrCrit) {
        if (typeof indexOrCrit === 'string')
            return new this.db.WhereClause(this, indexOrCrit);
        if (isArray(indexOrCrit))
            return new this.db.WhereClause(this, "[" + indexOrCrit.join('+') + "]");
        var keyPaths = keys(indexOrCrit);
        if (keyPaths.length === 1)
            return this
                .where(keyPaths[0])
                .equals(indexOrCrit[keyPaths[0]]);
        var compoundIndex = this.schema.indexes.concat(this.schema.primKey).filter(function (ix) {
            return ix.compound &&
                keyPaths.every(function (keyPath) { return ix.keyPath.indexOf(keyPath) >= 0; }) &&
                ix.keyPath.every(function (keyPath) { return keyPaths.indexOf(keyPath) >= 0; });
        })[0];
        if (compoundIndex && this.db._maxKey !== maxString)
            return this
                .where(compoundIndex.name)
                .equals(compoundIndex.keyPath.map(function (kp) { return indexOrCrit[kp]; }));
        if (!compoundIndex && debug)
            console.warn("The query " + JSON.stringify(indexOrCrit) + " on " + this.name + " would benefit of a " +
                ("compound index [" + keyPaths.join('+') + "]"));
        var idxByName = this.schema.idxByName;
        var idb = this.db._deps.indexedDB;
        function equals(a, b) {
            try {
                return idb.cmp(a, b) === 0;
            }
            catch (e) {
                return false;
            }
        }
        var _a = keyPaths.reduce(function (_a, keyPath) {
            var prevIndex = _a[0], prevFilterFn = _a[1];
            var index = idxByName[keyPath];
            var value = indexOrCrit[keyPath];
            return [
                prevIndex || index,
                prevIndex || !index ?
                    combine(prevFilterFn, index && index.multi ?
                        function (x) {
                            var prop = getByKeyPath(x, keyPath);
                            return isArray(prop) && prop.some(function (item) { return equals(value, item); });
                        } : function (x) { return equals(value, getByKeyPath(x, keyPath)); })
                    : prevFilterFn
            ];
        }, [null, null]), idx = _a[0], filterFunction = _a[1];
        return idx ?
            this.where(idx.name).equals(indexOrCrit[idx.keyPath])
                .filter(filterFunction) :
            compoundIndex ?
                this.filter(filterFunction) :
                this.where(keyPaths).equals('');
    };
    Table.prototype.filter = function (filterFunction) {
        return this.toCollection().and(filterFunction);
    };
    Table.prototype.count = function (thenShortcut) {
        return this.toCollection().count(thenShortcut);
    };
    Table.prototype.offset = function (offset) {
        return this.toCollection().offset(offset);
    };
    Table.prototype.limit = function (numRows) {
        return this.toCollection().limit(numRows);
    };
    Table.prototype.each = function (callback) {
        return this.toCollection().each(callback);
    };
    Table.prototype.toArray = function (thenShortcut) {
        return this.toCollection().toArray(thenShortcut);
    };
    Table.prototype.toCollection = function () {
        return new this.db.Collection(new this.db.WhereClause(this));
    };
    Table.prototype.orderBy = function (index) {
        return new this.db.Collection(new this.db.WhereClause(this, isArray(index) ?
            "[" + index.join('+') + "]" :
            index));
    };
    Table.prototype.reverse = function () {
        return this.toCollection().reverse();
    };
    Table.prototype.mapToClass = function (constructor) {
        this.schema.mappedClass = constructor;
        var readHook = function (obj) {
            if (!obj)
                return obj;
            var res = Object.create(constructor.prototype);
            for (var m in obj)
                if (hasOwn(obj, m))
                    try {
                        res[m] = obj[m];
                    }
                    catch (_) { }
            return res;
        };
        if (this.schema.readHook) {
            this.hook.reading.unsubscribe(this.schema.readHook);
        }
        this.schema.readHook = readHook;
        this.hook("reading", readHook);
        return constructor;
    };
    Table.prototype.defineClass = function () {
        function Class(content) {
            extend(this, content);
        }
        
        return this.mapToClass(Class);
    };
    Table.prototype.add = function (obj, key) {
        var _this = this;
        return this._trans('readwrite', function (trans) {
            return _this.core.mutate({ trans: trans, type: 'add', keys: key != null ? [key] : null, values: [obj] });
        }).then(function (res) { return res.numFailures ? DexiePromise.reject(res.failures[0]) : res.lastResult; })
            .then(function (lastResult) {
            if (!_this.core.schema.primaryKey.outbound) {
                try {
                    setByKeyPath(obj, _this.core.schema.primaryKey.keyPath, lastResult);
                }
                catch (_) { }
                
            }
            return lastResult;
        });
    };
    Table.prototype.update = function (keyOrObject, modifications) {
        if (typeof modifications !== 'object' || isArray(modifications))
            throw new exceptions.InvalidArgument("Modifications must be an object.");
        if (typeof keyOrObject === 'object' && !isArray(keyOrObject)) {
            keys(modifications).forEach(function (keyPath) {
                setByKeyPath(keyOrObject, keyPath, modifications[keyPath]);
            });
            var key = getByKeyPath(keyOrObject, this.schema.primKey.keyPath);
            if (key === undefined)
                return rejection(new exceptions.InvalidArgument("Given object does not contain its primary key"));
            return this.where(":id").equals(key).modify(modifications);
        }
        else {
            return this.where(":id").equals(keyOrObject).modify(modifications);
        }
    };
    Table.prototype.put = function (obj, key) {
        var _this = this;
        return this._trans('readwrite', function (trans) { return _this.core.mutate({ trans: trans, type: 'put', values: [obj], keys: key != null ? [key] : null }); })
            .then(function (res) { return res.numFailures ? DexiePromise.reject(res.failures[0]) : res.lastResult; })
            .then(function (lastResult) {
            if (!_this.core.schema.primaryKey.outbound) {
                try {
                    setByKeyPath(obj, _this.core.schema.primaryKey.keyPath, lastResult);
                }
                catch (_) { }
                
            }
            return lastResult;
        });
    };
    Table.prototype.delete = function (key) {
        var _this = this;
        return this._trans('readwrite', function (trans) { return _this.core.mutate({ trans: trans, type: 'delete', keys: [key] }); })
            .then(function (res) { return res.numFailures ? DexiePromise.reject(res.failures[0]) : undefined; });
    };
    Table.prototype.clear = function () {
        var _this = this;
        return this._trans('readwrite', function (trans) { return _this.core.mutate({ trans: trans, type: 'deleteRange', range: AnyRange }); })
            .then(function (res) { return res.numFailures ? DexiePromise.reject(res.failures[0]) : undefined; });
    };
    Table.prototype.bulkGet = function (keys$$1) {
        var _this = this;
        return this._trans('readonly', function (trans) {
            return _this.core.getMany({
                keys: keys$$1,
                trans: trans
            });
        });
    };
    Table.prototype.bulkAdd = function (objects, keysOrOptions, options) {
        var _this = this;
        var keys$$1 = Array.isArray(keysOrOptions) ? keysOrOptions : undefined;
        options = options || (keys$$1 ? undefined : keysOrOptions);
        var wantResults = options ? options.allKeys : undefined;
        return this._trans('readwrite', function (trans) {
            var outbound = _this.core.schema.primaryKey.outbound;
            if (!outbound && keys$$1)
                throw new exceptions.InvalidArgument("bulkAdd(): keys argument invalid on tables with inbound keys");
            if (keys$$1 && keys$$1.length !== objects.length)
                throw new exceptions.InvalidArgument("Arguments objects and keys must have the same length");
            var numObjects = objects.length;
            return _this.core.mutate({ trans: trans, type: 'add', keys: keys$$1, values: objects, wantResults: wantResults })
                .then(function (_a) {
                var numFailures = _a.numFailures, results = _a.results, lastResult = _a.lastResult, failures = _a.failures;
                var result = wantResults ? results : lastResult;
                if (numFailures === 0)
                    return result;
                throw new BulkError(_this.name + ".bulkAdd(): " + numFailures + " of " + numObjects + " operations failed", Object.keys(failures).map(function (pos) { return failures[pos]; }));
            });
        });
    };
    Table.prototype.bulkPut = function (objects, keysOrOptions, options) {
        var _this = this;
        var keys$$1 = Array.isArray(keysOrOptions) ? keysOrOptions : undefined;
        options = options || (keys$$1 ? undefined : keysOrOptions);
        var wantResults = options ? options.allKeys : undefined;
        return this._trans('readwrite', function (trans) {
            var outbound = _this.core.schema.primaryKey.outbound;
            if (!outbound && keys$$1)
                throw new exceptions.InvalidArgument("bulkPut(): keys argument invalid on tables with inbound keys");
            if (keys$$1 && keys$$1.length !== objects.length)
                throw new exceptions.InvalidArgument("Arguments objects and keys must have the same length");
            var numObjects = objects.length;
            return _this.core.mutate({ trans: trans, type: 'put', keys: keys$$1, values: objects, wantResults: wantResults })
                .then(function (_a) {
                var numFailures = _a.numFailures, results = _a.results, lastResult = _a.lastResult, failures = _a.failures;
                var result = wantResults ? results : lastResult;
                if (numFailures === 0)
                    return result;
                throw new BulkError(_this.name + ".bulkPut(): " + numFailures + " of " + numObjects + " operations failed", Object.keys(failures).map(function (pos) { return failures[pos]; }));
            });
        });
    };
    Table.prototype.bulkDelete = function (keys$$1) {
        var _this = this;
        var numKeys = keys$$1.length;
        return this._trans('readwrite', function (trans) {
            return _this.core.mutate({ trans: trans, type: 'delete', keys: keys$$1 });
        }).then(function (_a) {
            var numFailures = _a.numFailures, lastResult = _a.lastResult, failures = _a.failures;
            if (numFailures === 0)
                return lastResult;
            throw new BulkError(_this.name + ".bulkDelete(): " + numFailures + " of " + numKeys + " operations failed", failures);
        });
    };
    return Table;
}());

function Events(ctx) {
    var evs = {};
    var rv = function (eventName, subscriber) {
        if (subscriber) {
            var i = arguments.length, args = new Array(i - 1);
            while (--i)
                args[i - 1] = arguments[i];
            evs[eventName].subscribe.apply(null, args);
            return ctx;
        }
        else if (typeof (eventName) === 'string') {
            return evs[eventName];
        }
    };
    rv.addEventType = add;
    for (var i = 1, l = arguments.length; i < l; ++i) {
        add(arguments[i]);
    }
    return rv;
    function add(eventName, chainFunction, defaultFunction) {
        if (typeof eventName === 'object')
            return addConfiguredEvents(eventName);
        if (!chainFunction)
            chainFunction = reverseStoppableEventChain;
        if (!defaultFunction)
            defaultFunction = nop;
        var context = {
            subscribers: [],
            fire: defaultFunction,
            subscribe: function (cb) {
                if (context.subscribers.indexOf(cb) === -1) {
                    context.subscribers.push(cb);
                    context.fire = chainFunction(context.fire, cb);
                }
            },
            unsubscribe: function (cb) {
                context.subscribers = context.subscribers.filter(function (fn) { return fn !== cb; });
                context.fire = context.subscribers.reduce(chainFunction, defaultFunction);
            }
        };
        evs[eventName] = rv[eventName] = context;
        return context;
    }
    function addConfiguredEvents(cfg) {
        keys(cfg).forEach(function (eventName) {
            var args = cfg[eventName];
            if (isArray(args)) {
                add(eventName, cfg[eventName][0], cfg[eventName][1]);
            }
            else if (args === 'asap') {
                var context = add(eventName, mirror, function fire() {
                    var i = arguments.length, args = new Array(i);
                    while (i--)
                        args[i] = arguments[i];
                    context.subscribers.forEach(function (fn) {
                        asap(function fireEvent() {
                            fn.apply(null, args);
                        });
                    });
                });
            }
            else
                throw new exceptions.InvalidArgument("Invalid event config");
        });
    }
}

function makeClassConstructor(prototype, constructor) {
    derive(constructor).from({ prototype: prototype });
    return constructor;
}

function createTableConstructor(db) {
    return makeClassConstructor(Table.prototype, function Table$$1(name, tableSchema, trans) {
        this.db = db;
        this._tx = trans;
        this.name = name;
        this.schema = tableSchema;
        this.hook = db._allTables[name] ? db._allTables[name].hook : Events(null, {
            "creating": [hookCreatingChain, nop],
            "reading": [pureFunctionChain, mirror],
            "updating": [hookUpdatingChain, nop],
            "deleting": [hookDeletingChain, nop]
        });
    });
}

function isPlainKeyRange(ctx, ignoreLimitFilter) {
    return !(ctx.filter || ctx.algorithm || ctx.or) &&
        (ignoreLimitFilter ? ctx.justLimit : !ctx.replayFilter);
}
function addFilter(ctx, fn) {
    ctx.filter = combine(ctx.filter, fn);
}
function addReplayFilter(ctx, factory, isLimitFilter) {
    var curr = ctx.replayFilter;
    ctx.replayFilter = curr ? function () { return combine(curr(), factory()); } : factory;
    ctx.justLimit = isLimitFilter && !curr;
}
function addMatchFilter(ctx, fn) {
    ctx.isMatch = combine(ctx.isMatch, fn);
}
function getIndexOrStore(ctx, coreSchema) {
    if (ctx.isPrimKey)
        return coreSchema.primaryKey;
    var index = coreSchema.getIndexByKeyPath(ctx.index);
    if (!index)
        throw new exceptions.Schema("KeyPath " + ctx.index + " on object store " + coreSchema.name + " is not indexed");
    return index;
}
function openCursor(ctx, coreTable, trans) {
    var index = getIndexOrStore(ctx, coreTable.schema);
    return coreTable.openCursor({
        trans: trans,
        values: !ctx.keysOnly,
        reverse: ctx.dir === 'prev',
        unique: !!ctx.unique,
        query: {
            index: index,
            range: ctx.range
        }
    });
}
function iter(ctx, fn, coreTrans, coreTable) {
    var filter = ctx.replayFilter ? combine(ctx.filter, ctx.replayFilter()) : ctx.filter;
    if (!ctx.or) {
        return iterate(openCursor(ctx, coreTable, coreTrans), combine(ctx.algorithm, filter), fn, !ctx.keysOnly && ctx.valueMapper);
    }
    else {
        var set_1 = {};
        var union = function (item, cursor, advance) {
            if (!filter || filter(cursor, advance, function (result) { return cursor.stop(result); }, function (err) { return cursor.fail(err); })) {
                var primaryKey = cursor.primaryKey;
                var key = '' + primaryKey;
                if (key === '[object ArrayBuffer]')
                    key = '' + new Uint8Array(primaryKey);
                if (!hasOwn(set_1, key)) {
                    set_1[key] = true;
                    fn(item, cursor, advance);
                }
            }
        };
        return Promise.all([
            ctx.or._iterate(union, coreTrans),
            iterate(openCursor(ctx, coreTable, coreTrans), ctx.algorithm, union, !ctx.keysOnly && ctx.valueMapper)
        ]);
    }
}
function iterate(cursorPromise, filter, fn, valueMapper) {
    var mappedFn = valueMapper ? function (x, c, a) { return fn(valueMapper(x), c, a); } : fn;
    var wrappedFn = wrap(mappedFn);
    return cursorPromise.then(function (cursor) {
        if (cursor) {
            return cursor.start(function () {
                var c = function () { return cursor.continue(); };
                if (!filter || filter(cursor, function (advancer) { return c = advancer; }, function (val) { cursor.stop(val); c = nop; }, function (e) { cursor.fail(e); c = nop; }))
                    wrappedFn(cursor.value, cursor, function (advancer) { return c = advancer; });
                c();
            });
        }
    });
}

var Collection =               (function () {
    function Collection() {
    }
    Collection.prototype._read = function (fn, cb) {
        var ctx = this._ctx;
        return ctx.error ?
            ctx.table._trans(null, rejection.bind(null, ctx.error)) :
            ctx.table._trans('readonly', fn).then(cb);
    };
    Collection.prototype._write = function (fn) {
        var ctx = this._ctx;
        return ctx.error ?
            ctx.table._trans(null, rejection.bind(null, ctx.error)) :
            ctx.table._trans('readwrite', fn, "locked");
    };
    Collection.prototype._addAlgorithm = function (fn) {
        var ctx = this._ctx;
        ctx.algorithm = combine(ctx.algorithm, fn);
    };
    Collection.prototype._iterate = function (fn, coreTrans) {
        return iter(this._ctx, fn, coreTrans, this._ctx.table.core);
    };
    Collection.prototype.clone = function (props$$1) {
        var rv = Object.create(this.constructor.prototype), ctx = Object.create(this._ctx);
        if (props$$1)
            extend(ctx, props$$1);
        rv._ctx = ctx;
        return rv;
    };
    Collection.prototype.raw = function () {
        this._ctx.valueMapper = null;
        return this;
    };
    Collection.prototype.each = function (fn) {
        var ctx = this._ctx;
        return this._read(function (trans) { return iter(ctx, fn, trans, ctx.table.core); });
    };
    Collection.prototype.count = function (cb) {
        var _this = this;
        return this._read(function (trans) {
            var ctx = _this._ctx;
            var coreTable = ctx.table.core;
            if (isPlainKeyRange(ctx, true)) {
                return coreTable.count({
                    trans: trans,
                    query: {
                        index: getIndexOrStore(ctx, coreTable.schema),
                        range: ctx.range
                    }
                }).then(function (count) { return Math.min(count, ctx.limit); });
            }
            else {
                var count = 0;
                return iter(ctx, function () { ++count; return false; }, trans, coreTable)
                    .then(function () { return count; });
            }
        }).then(cb);
    };
    Collection.prototype.sortBy = function (keyPath, cb) {
        var parts = keyPath.split('.').reverse(), lastPart = parts[0], lastIndex = parts.length - 1;
        function getval(obj, i) {
            if (i)
                return getval(obj[parts[i]], i - 1);
            return obj[lastPart];
        }
        var order = this._ctx.dir === "next" ? 1 : -1;
        function sorter(a, b) {
            var aVal = getval(a, lastIndex), bVal = getval(b, lastIndex);
            return aVal < bVal ? -order : aVal > bVal ? order : 0;
        }
        return this.toArray(function (a) {
            return a.sort(sorter);
        }).then(cb);
    };
    Collection.prototype.toArray = function (cb) {
        var _this = this;
        return this._read(function (trans) {
            var ctx = _this._ctx;
            if (ctx.dir === 'next' && isPlainKeyRange(ctx, true) && ctx.limit > 0) {
                var valueMapper_1 = ctx.valueMapper;
                var index = getIndexOrStore(ctx, ctx.table.core.schema);
                return ctx.table.core.query({
                    trans: trans,
                    limit: ctx.limit,
                    values: true,
                    query: {
                        index: index,
                        range: ctx.range
                    }
                }).then(function (_a) {
                    var result = _a.result;
                    return valueMapper_1 ? result.map(valueMapper_1) : result;
                });
            }
            else {
                var a_1 = [];
                return iter(ctx, function (item) { return a_1.push(item); }, trans, ctx.table.core).then(function () { return a_1; });
            }
        }, cb);
    };
    Collection.prototype.offset = function (offset) {
        var ctx = this._ctx;
        if (offset <= 0)
            return this;
        ctx.offset += offset;
        if (isPlainKeyRange(ctx)) {
            addReplayFilter(ctx, function () {
                var offsetLeft = offset;
                return function (cursor, advance) {
                    if (offsetLeft === 0)
                        return true;
                    if (offsetLeft === 1) {
                        --offsetLeft;
                        return false;
                    }
                    advance(function () {
                        cursor.advance(offsetLeft);
                        offsetLeft = 0;
                    });
                    return false;
                };
            });
        }
        else {
            addReplayFilter(ctx, function () {
                var offsetLeft = offset;
                return function () { return (--offsetLeft < 0); };
            });
        }
        return this;
    };
    Collection.prototype.limit = function (numRows) {
        this._ctx.limit = Math.min(this._ctx.limit, numRows);
        addReplayFilter(this._ctx, function () {
            var rowsLeft = numRows;
            return function (cursor, advance, resolve) {
                if (--rowsLeft <= 0)
                    advance(resolve);
                return rowsLeft >= 0;
            };
        }, true);
        return this;
    };
    Collection.prototype.until = function (filterFunction, bIncludeStopEntry) {
        addFilter(this._ctx, function (cursor, advance, resolve) {
            if (filterFunction(cursor.value)) {
                advance(resolve);
                return bIncludeStopEntry;
            }
            else {
                return true;
            }
        });
        return this;
    };
    Collection.prototype.first = function (cb) {
        return this.limit(1).toArray(function (a) { return a[0]; }).then(cb);
    };
    Collection.prototype.last = function (cb) {
        return this.reverse().first(cb);
    };
    Collection.prototype.filter = function (filterFunction) {
        addFilter(this._ctx, function (cursor) {
            return filterFunction(cursor.value);
        });
        addMatchFilter(this._ctx, filterFunction);
        return this;
    };
    Collection.prototype.and = function (filter) {
        return this.filter(filter);
    };
    Collection.prototype.or = function (indexName) {
        return new this.db.WhereClause(this._ctx.table, indexName, this);
    };
    Collection.prototype.reverse = function () {
        this._ctx.dir = (this._ctx.dir === "prev" ? "next" : "prev");
        if (this._ondirectionchange)
            this._ondirectionchange(this._ctx.dir);
        return this;
    };
    Collection.prototype.desc = function () {
        return this.reverse();
    };
    Collection.prototype.eachKey = function (cb) {
        var ctx = this._ctx;
        ctx.keysOnly = !ctx.isMatch;
        return this.each(function (val, cursor) { cb(cursor.key, cursor); });
    };
    Collection.prototype.eachUniqueKey = function (cb) {
        this._ctx.unique = "unique";
        return this.eachKey(cb);
    };
    Collection.prototype.eachPrimaryKey = function (cb) {
        var ctx = this._ctx;
        ctx.keysOnly = !ctx.isMatch;
        return this.each(function (val, cursor) { cb(cursor.primaryKey, cursor); });
    };
    Collection.prototype.keys = function (cb) {
        var ctx = this._ctx;
        ctx.keysOnly = !ctx.isMatch;
        var a = [];
        return this.each(function (item, cursor) {
            a.push(cursor.key);
        }).then(function () {
            return a;
        }).then(cb);
    };
    Collection.prototype.primaryKeys = function (cb) {
        var ctx = this._ctx;
        if (ctx.dir === 'next' && isPlainKeyRange(ctx, true) && ctx.limit > 0) {
            return this._read(function (trans) {
                var index = getIndexOrStore(ctx, ctx.table.core.schema);
                return ctx.table.core.query({
                    trans: trans,
                    values: false,
                    limit: ctx.limit,
                    query: {
                        index: index,
                        range: ctx.range
                    }
                });
            }).then(function (_a) {
                var result = _a.result;
                return result;
            }).then(cb);
        }
        ctx.keysOnly = !ctx.isMatch;
        var a = [];
        return this.each(function (item, cursor) {
            a.push(cursor.primaryKey);
        }).then(function () {
            return a;
        }).then(cb);
    };
    Collection.prototype.uniqueKeys = function (cb) {
        this._ctx.unique = "unique";
        return this.keys(cb);
    };
    Collection.prototype.firstKey = function (cb) {
        return this.limit(1).keys(function (a) { return a[0]; }).then(cb);
    };
    Collection.prototype.lastKey = function (cb) {
        return this.reverse().firstKey(cb);
    };
    Collection.prototype.distinct = function () {
        var ctx = this._ctx, idx = ctx.index && ctx.table.schema.idxByName[ctx.index];
        if (!idx || !idx.multi)
            return this;
        var set = {};
        addFilter(this._ctx, function (cursor) {
            var strKey = cursor.primaryKey.toString();
            var found = hasOwn(set, strKey);
            set[strKey] = true;
            return !found;
        });
        return this;
    };
    Collection.prototype.modify = function (changes) {
        var _this = this;
        var ctx = this._ctx;
        return this._write(function (trans) {
            var modifyer;
            if (typeof changes === 'function') {
                modifyer = changes;
            }
            else {
                var keyPaths = keys(changes);
                var numKeys = keyPaths.length;
                modifyer = function (item) {
                    var anythingModified = false;
                    for (var i = 0; i < numKeys; ++i) {
                        var keyPath = keyPaths[i], val = changes[keyPath];
                        if (getByKeyPath(item, keyPath) !== val) {
                            setByKeyPath(item, keyPath, val);
                            anythingModified = true;
                        }
                    }
                    return anythingModified;
                };
            }
            var coreTable = ctx.table.core;
            var _a = coreTable.schema.primaryKey, outbound = _a.outbound, extractKey = _a.extractKey;
            var limit = 'testmode' in Dexie ? 1 : 2000;
            var cmp = _this.db.core.cmp;
            var totalFailures = [];
            var successCount = 0;
            var failedKeys = [];
            var applyMutateResult = function (expectedCount, res) {
                var failures = res.failures, numFailures = res.numFailures;
                successCount += expectedCount - numFailures;
                for (var _i = 0, _a = keys(failures); _i < _a.length; _i++) {
                    var pos = _a[_i];
                    totalFailures.push(failures[pos]);
                }
            };
            return _this.clone().primaryKeys().then(function (keys$$1) {
                var nextChunk = function (offset) {
                    var count = Math.min(limit, keys$$1.length - offset);
                    return coreTable.getMany({ trans: trans, keys: keys$$1.slice(offset, offset + count) }).then(function (values) {
                        var addValues = [];
                        var putValues = [];
                        var putKeys = outbound ? [] : null;
                        var deleteKeys = [];
                        for (var i = 0; i < count; ++i) {
                            var origValue = values[i];
                            var ctx_1 = {
                                value: deepClone(origValue),
                                primKey: keys$$1[offset + i]
                            };
                            if (modifyer.call(ctx_1, ctx_1.value, ctx_1) !== false) {
                                if (ctx_1.value == null) {
                                    deleteKeys.push(keys$$1[offset + i]);
                                }
                                else if (!outbound && cmp(extractKey(origValue), extractKey(ctx_1.value)) !== 0) {
                                    deleteKeys.push(keys$$1[offset + i]);
                                    addValues.push(ctx_1.value);
                                }
                                else {
                                    putValues.push(ctx_1.value);
                                    if (outbound)
                                        putKeys.push(keys$$1[offset + i]);
                                }
                            }
                        }
                        return Promise.resolve(addValues.length > 0 &&
                            coreTable.mutate({ trans: trans, type: 'add', values: addValues })
                                .then(function (res) {
                                for (var pos in res.failures) {
                                    deleteKeys.splice(parseInt(pos), 1);
                                }
                                applyMutateResult(addValues.length, res);
                            })).then(function (res) { return putValues.length > 0 &&
                            coreTable.mutate({ trans: trans, type: 'put', keys: putKeys, values: putValues })
                                .then(function (res) { return applyMutateResult(putValues.length, res); }); }).then(function () { return deleteKeys.length > 0 &&
                            coreTable.mutate({ trans: trans, type: 'delete', keys: deleteKeys })
                                .then(function (res) { return applyMutateResult(deleteKeys.length, res); }); }).then(function () {
                            return keys$$1.length > offset + count && nextChunk(offset + limit);
                        });
                    });
                };
                return nextChunk(0).then(function () {
                    if (totalFailures.length > 0)
                        throw new ModifyError("Error modifying one or more objects", totalFailures, successCount, failedKeys);
                    return keys$$1.length;
                });
            });
        });
    };
    Collection.prototype.delete = function () {
        var ctx = this._ctx, range = ctx.range;
        if (isPlainKeyRange(ctx) &&
            ((ctx.isPrimKey && !hangsOnDeleteLargeKeyRange) || range.type === 3          ))
         {
            return this._write(function (trans) {
                var primaryKey = ctx.table.core.schema.primaryKey;
                var coreRange = range;
                return ctx.table.core.count({ trans: trans, query: { index: primaryKey, range: coreRange } }).then(function (count) {
                    return ctx.table.core.mutate({ trans: trans, type: 'deleteRange', range: coreRange })
                        .then(function (_a) {
                        var failures = _a.failures, lastResult = _a.lastResult, results = _a.results, numFailures = _a.numFailures;
                        if (numFailures)
                            throw new ModifyError("Could not delete some values", Object.keys(failures).map(function (pos) { return failures[pos]; }), count - numFailures);
                        return count - numFailures;
                    });
                });
            });
        }
        return this.modify(function (value, ctx) { return ctx.value = null; });
    };
    return Collection;
}());

function createCollectionConstructor(db) {
    return makeClassConstructor(Collection.prototype, function Collection$$1(whereClause, keyRangeGenerator) {
        this.db = db;
        var keyRange = AnyRange, error = null;
        if (keyRangeGenerator)
            try {
                keyRange = keyRangeGenerator();
            }
            catch (ex) {
                error = ex;
            }
        var whereCtx = whereClause._ctx;
        var table = whereCtx.table;
        var readingHook = table.hook.reading.fire;
        this._ctx = {
            table: table,
            index: whereCtx.index,
            isPrimKey: (!whereCtx.index || (table.schema.primKey.keyPath && whereCtx.index === table.schema.primKey.name)),
            range: keyRange,
            keysOnly: false,
            dir: "next",
            unique: "",
            algorithm: null,
            filter: null,
            replayFilter: null,
            justLimit: true,
            isMatch: null,
            offset: 0,
            limit: Infinity,
            error: error,
            or: whereCtx.or,
            valueMapper: readingHook !== mirror ? readingHook : null
        };
    });
}

function simpleCompare(a, b) {
    return a < b ? -1 : a === b ? 0 : 1;
}
function simpleCompareReverse(a, b) {
    return a > b ? -1 : a === b ? 0 : 1;
}

function fail(collectionOrWhereClause, err, T) {
    var collection = collectionOrWhereClause instanceof WhereClause ?
        new collectionOrWhereClause.Collection(collectionOrWhereClause) :
        collectionOrWhereClause;
    collection._ctx.error = T ? new T(err) : new TypeError(err);
    return collection;
}
function emptyCollection(whereClause) {
    return new whereClause.Collection(whereClause, function () { return rangeEqual(""); }).limit(0);
}
function upperFactory(dir) {
    return dir === "next" ?
        function (s) { return s.toUpperCase(); } :
        function (s) { return s.toLowerCase(); };
}
function lowerFactory(dir) {
    return dir === "next" ?
        function (s) { return s.toLowerCase(); } :
        function (s) { return s.toUpperCase(); };
}
function nextCasing(key, lowerKey, upperNeedle, lowerNeedle, cmp, dir) {
    var length = Math.min(key.length, lowerNeedle.length);
    var llp = -1;
    for (var i = 0; i < length; ++i) {
        var lwrKeyChar = lowerKey[i];
        if (lwrKeyChar !== lowerNeedle[i]) {
            if (cmp(key[i], upperNeedle[i]) < 0)
                return key.substr(0, i) + upperNeedle[i] + upperNeedle.substr(i + 1);
            if (cmp(key[i], lowerNeedle[i]) < 0)
                return key.substr(0, i) + lowerNeedle[i] + upperNeedle.substr(i + 1);
            if (llp >= 0)
                return key.substr(0, llp) + lowerKey[llp] + upperNeedle.substr(llp + 1);
            return null;
        }
        if (cmp(key[i], lwrKeyChar) < 0)
            llp = i;
    }
    if (length < lowerNeedle.length && dir === "next")
        return key + upperNeedle.substr(key.length);
    if (length < key.length && dir === "prev")
        return key.substr(0, upperNeedle.length);
    return (llp < 0 ? null : key.substr(0, llp) + lowerNeedle[llp] + upperNeedle.substr(llp + 1));
}
function addIgnoreCaseAlgorithm(whereClause, match, needles, suffix) {
    var upper, lower, compare, upperNeedles, lowerNeedles, direction, nextKeySuffix, needlesLen = needles.length;
    if (!needles.every(function (s) { return typeof s === 'string'; })) {
        return fail(whereClause, STRING_EXPECTED);
    }
    function initDirection(dir) {
        upper = upperFactory(dir);
        lower = lowerFactory(dir);
        compare = (dir === "next" ? simpleCompare : simpleCompareReverse);
        var needleBounds = needles.map(function (needle) {
            return { lower: lower(needle), upper: upper(needle) };
        }).sort(function (a, b) {
            return compare(a.lower, b.lower);
        });
        upperNeedles = needleBounds.map(function (nb) { return nb.upper; });
        lowerNeedles = needleBounds.map(function (nb) { return nb.lower; });
        direction = dir;
        nextKeySuffix = (dir === "next" ? "" : suffix);
    }
    initDirection("next");
    var c = new whereClause.Collection(whereClause, function () { return createRange(upperNeedles[0], lowerNeedles[needlesLen - 1] + suffix); });
    c._ondirectionchange = function (direction) {
        initDirection(direction);
    };
    var firstPossibleNeedle = 0;
    c._addAlgorithm(function (cursor, advance, resolve) {
        var key = cursor.key;
        if (typeof key !== 'string')
            return false;
        var lowerKey = lower(key);
        if (match(lowerKey, lowerNeedles, firstPossibleNeedle)) {
            return true;
        }
        else {
            var lowestPossibleCasing = null;
            for (var i = firstPossibleNeedle; i < needlesLen; ++i) {
                var casing = nextCasing(key, lowerKey, upperNeedles[i], lowerNeedles[i], compare, direction);
                if (casing === null && lowestPossibleCasing === null)
                    firstPossibleNeedle = i + 1;
                else if (lowestPossibleCasing === null || compare(lowestPossibleCasing, casing) > 0) {
                    lowestPossibleCasing = casing;
                }
            }
            if (lowestPossibleCasing !== null) {
                advance(function () { cursor.continue(lowestPossibleCasing + nextKeySuffix); });
            }
            else {
                advance(resolve);
            }
            return false;
        }
    });
    return c;
}
function createRange(lower, upper, lowerOpen, upperOpen) {
    return {
        type: 2            ,
        lower: lower,
        upper: upper,
        lowerOpen: lowerOpen,
        upperOpen: upperOpen
    };
}
function rangeEqual(value) {
    return {
        type: 1            ,
        lower: value,
        upper: value
    };
}

var WhereClause =               (function () {
    function WhereClause() {
    }
    Object.defineProperty(WhereClause.prototype, "Collection", {
        get: function () {
            return this._ctx.table.db.Collection;
        },
        enumerable: true,
        configurable: true
    });
    WhereClause.prototype.between = function (lower, upper, includeLower, includeUpper) {
        includeLower = includeLower !== false;
        includeUpper = includeUpper === true;
        try {
            if ((this._cmp(lower, upper) > 0) ||
                (this._cmp(lower, upper) === 0 && (includeLower || includeUpper) && !(includeLower && includeUpper)))
                return emptyCollection(this);
            return new this.Collection(this, function () { return createRange(lower, upper, !includeLower, !includeUpper); });
        }
        catch (e) {
            return fail(this, INVALID_KEY_ARGUMENT);
        }
    };
    WhereClause.prototype.equals = function (value) {
        return new this.Collection(this, function () { return rangeEqual(value); });
    };
    WhereClause.prototype.above = function (value) {
        if (value == null)
            return fail(this, INVALID_KEY_ARGUMENT);
        return new this.Collection(this, function () { return createRange(value, undefined, true); });
    };
    WhereClause.prototype.aboveOrEqual = function (value) {
        if (value == null)
            return fail(this, INVALID_KEY_ARGUMENT);
        return new this.Collection(this, function () { return createRange(value, undefined, false); });
    };
    WhereClause.prototype.below = function (value) {
        if (value == null)
            return fail(this, INVALID_KEY_ARGUMENT);
        return new this.Collection(this, function () { return createRange(undefined, value, false, true); });
    };
    WhereClause.prototype.belowOrEqual = function (value) {
        if (value == null)
            return fail(this, INVALID_KEY_ARGUMENT);
        return new this.Collection(this, function () { return createRange(undefined, value); });
    };
    WhereClause.prototype.startsWith = function (str) {
        if (typeof str !== 'string')
            return fail(this, STRING_EXPECTED);
        return this.between(str, str + maxString, true, true);
    };
    WhereClause.prototype.startsWithIgnoreCase = function (str) {
        if (str === "")
            return this.startsWith(str);
        return addIgnoreCaseAlgorithm(this, function (x, a) { return x.indexOf(a[0]) === 0; }, [str], maxString);
    };
    WhereClause.prototype.equalsIgnoreCase = function (str) {
        return addIgnoreCaseAlgorithm(this, function (x, a) { return x === a[0]; }, [str], "");
    };
    WhereClause.prototype.anyOfIgnoreCase = function () {
        var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
        if (set.length === 0)
            return emptyCollection(this);
        return addIgnoreCaseAlgorithm(this, function (x, a) { return a.indexOf(x) !== -1; }, set, "");
    };
    WhereClause.prototype.startsWithAnyOfIgnoreCase = function () {
        var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
        if (set.length === 0)
            return emptyCollection(this);
        return addIgnoreCaseAlgorithm(this, function (x, a) { return a.some(function (n) { return x.indexOf(n) === 0; }); }, set, maxString);
    };
    WhereClause.prototype.anyOf = function () {
        var _this = this;
        var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
        var compare = this._cmp;
        try {
            set.sort(compare);
        }
        catch (e) {
            return fail(this, INVALID_KEY_ARGUMENT);
        }
        if (set.length === 0)
            return emptyCollection(this);
        var c = new this.Collection(this, function () { return createRange(set[0], set[set.length - 1]); });
        c._ondirectionchange = function (direction) {
            compare = (direction === "next" ?
                _this._ascending :
                _this._descending);
            set.sort(compare);
        };
        var i = 0;
        c._addAlgorithm(function (cursor, advance, resolve) {
            var key = cursor.key;
            while (compare(key, set[i]) > 0) {
                ++i;
                if (i === set.length) {
                    advance(resolve);
                    return false;
                }
            }
            if (compare(key, set[i]) === 0) {
                return true;
            }
            else {
                advance(function () { cursor.continue(set[i]); });
                return false;
            }
        });
        return c;
    };
    WhereClause.prototype.notEqual = function (value) {
        return this.inAnyRange([[minKey, value], [value, this.db._maxKey]], { includeLowers: false, includeUppers: false });
    };
    WhereClause.prototype.noneOf = function () {
        var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
        if (set.length === 0)
            return new this.Collection(this);
        try {
            set.sort(this._ascending);
        }
        catch (e) {
            return fail(this, INVALID_KEY_ARGUMENT);
        }
        var ranges = set.reduce(function (res, val) { return res ?
            res.concat([[res[res.length - 1][1], val]]) :
            [[minKey, val]]; }, null);
        ranges.push([set[set.length - 1], this.db._maxKey]);
        return this.inAnyRange(ranges, { includeLowers: false, includeUppers: false });
    };
    WhereClause.prototype.inAnyRange = function (ranges, options) {
        var _this = this;
        var cmp = this._cmp, ascending = this._ascending, descending = this._descending, min = this._min, max = this._max;
        if (ranges.length === 0)
            return emptyCollection(this);
        if (!ranges.every(function (range) {
            return range[0] !== undefined &&
                range[1] !== undefined &&
                ascending(range[0], range[1]) <= 0;
        })) {
            return fail(this, "First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower", exceptions.InvalidArgument);
        }
        var includeLowers = !options || options.includeLowers !== false;
        var includeUppers = options && options.includeUppers === true;
        function addRange(ranges, newRange) {
            var i = 0, l = ranges.length;
            for (; i < l; ++i) {
                var range = ranges[i];
                if (cmp(newRange[0], range[1]) < 0 && cmp(newRange[1], range[0]) > 0) {
                    range[0] = min(range[0], newRange[0]);
                    range[1] = max(range[1], newRange[1]);
                    break;
                }
            }
            if (i === l)
                ranges.push(newRange);
            return ranges;
        }
        var sortDirection = ascending;
        function rangeSorter(a, b) { return sortDirection(a[0], b[0]); }
        var set;
        try {
            set = ranges.reduce(addRange, []);
            set.sort(rangeSorter);
        }
        catch (ex) {
            return fail(this, INVALID_KEY_ARGUMENT);
        }
        var rangePos = 0;
        var keyIsBeyondCurrentEntry = includeUppers ?
            function (key) { return ascending(key, set[rangePos][1]) > 0; } :
            function (key) { return ascending(key, set[rangePos][1]) >= 0; };
        var keyIsBeforeCurrentEntry = includeLowers ?
            function (key) { return descending(key, set[rangePos][0]) > 0; } :
            function (key) { return descending(key, set[rangePos][0]) >= 0; };
        function keyWithinCurrentRange(key) {
            return !keyIsBeyondCurrentEntry(key) && !keyIsBeforeCurrentEntry(key);
        }
        var checkKey = keyIsBeyondCurrentEntry;
        var c = new this.Collection(this, function () { return createRange(set[0][0], set[set.length - 1][1], !includeLowers, !includeUppers); });
        c._ondirectionchange = function (direction) {
            if (direction === "next") {
                checkKey = keyIsBeyondCurrentEntry;
                sortDirection = ascending;
            }
            else {
                checkKey = keyIsBeforeCurrentEntry;
                sortDirection = descending;
            }
            set.sort(rangeSorter);
        };
        c._addAlgorithm(function (cursor, advance, resolve) {
            var key = cursor.key;
            while (checkKey(key)) {
                ++rangePos;
                if (rangePos === set.length) {
                    advance(resolve);
                    return false;
                }
            }
            if (keyWithinCurrentRange(key)) {
                return true;
            }
            else if (_this._cmp(key, set[rangePos][1]) === 0 || _this._cmp(key, set[rangePos][0]) === 0) {
                return false;
            }
            else {
                advance(function () {
                    if (sortDirection === ascending)
                        cursor.continue(set[rangePos][0]);
                    else
                        cursor.continue(set[rangePos][1]);
                });
                return false;
            }
        });
        return c;
    };
    WhereClause.prototype.startsWithAnyOf = function () {
        var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
        if (!set.every(function (s) { return typeof s === 'string'; })) {
            return fail(this, "startsWithAnyOf() only works with strings");
        }
        if (set.length === 0)
            return emptyCollection(this);
        return this.inAnyRange(set.map(function (str) { return [str, str + maxString]; }));
    };
    return WhereClause;
}());

function createWhereClauseConstructor(db) {
    return makeClassConstructor(WhereClause.prototype, function WhereClause$$1(table, index, orCollection) {
        this.db = db;
        this._ctx = {
            table: table,
            index: index === ":id" ? null : index,
            or: orCollection
        };
        var indexedDB = db._deps.indexedDB;
        if (!indexedDB)
            throw new exceptions.MissingAPI("indexedDB API missing");
        this._cmp = this._ascending = indexedDB.cmp.bind(indexedDB);
        this._descending = function (a, b) { return indexedDB.cmp(b, a); };
        this._max = function (a, b) { return indexedDB.cmp(a, b) > 0 ? a : b; };
        this._min = function (a, b) { return indexedDB.cmp(a, b) < 0 ? a : b; };
        this._IDBKeyRange = db._deps.IDBKeyRange;
    });
}

function safariMultiStoreFix(storeNames) {
    return storeNames.length === 1 ? storeNames[0] : storeNames;
}

function getMaxKey(IdbKeyRange) {
    try {
        IdbKeyRange.only([[]]);
        return [[]];
    }
    catch (e) {
        return maxString;
    }
}

function eventRejectHandler(reject) {
    return wrap(function (event) {
        preventDefault(event);
        reject(event.target.error);
        return false;
    });
}



function preventDefault(event) {
    if (event.stopPropagation)
        event.stopPropagation();
    if (event.preventDefault)
        event.preventDefault();
}

var Transaction =               (function () {
    function Transaction() {
    }
    Transaction.prototype._lock = function () {
        assert(!PSD.global);
        ++this._reculock;
        if (this._reculock === 1 && !PSD.global)
            PSD.lockOwnerFor = this;
        return this;
    };
    Transaction.prototype._unlock = function () {
        assert(!PSD.global);
        if (--this._reculock === 0) {
            if (!PSD.global)
                PSD.lockOwnerFor = null;
            while (this._blockedFuncs.length > 0 && !this._locked()) {
                var fnAndPSD = this._blockedFuncs.shift();
                try {
                    usePSD(fnAndPSD[1], fnAndPSD[0]);
                }
                catch (e) { }
            }
        }
        return this;
    };
    Transaction.prototype._locked = function () {
        return this._reculock && PSD.lockOwnerFor !== this;
    };
    Transaction.prototype.create = function (idbtrans) {
        var _this = this;
        if (!this.mode)
            return this;
        var idbdb = this.db.idbdb;
        var dbOpenError = this.db._state.dbOpenError;
        assert(!this.idbtrans);
        if (!idbtrans && !idbdb) {
            switch (dbOpenError && dbOpenError.name) {
                case "DatabaseClosedError":
                    throw new exceptions.DatabaseClosed(dbOpenError);
                case "MissingAPIError":
                    throw new exceptions.MissingAPI(dbOpenError.message, dbOpenError);
                default:
                    throw new exceptions.OpenFailed(dbOpenError);
            }
        }
        if (!this.active)
            throw new exceptions.TransactionInactive();
        assert(this._completion._state === null);
        idbtrans = this.idbtrans = idbtrans || idbdb.transaction(safariMultiStoreFix(this.storeNames), this.mode);
        idbtrans.onerror = wrap(function (ev) {
            preventDefault(ev);
            _this._reject(idbtrans.error);
        });
        idbtrans.onabort = wrap(function (ev) {
            preventDefault(ev);
            _this.active && _this._reject(new exceptions.Abort(idbtrans.error));
            _this.active = false;
            _this.on("abort").fire(ev);
        });
        idbtrans.oncomplete = wrap(function () {
            _this.active = false;
            _this._resolve();
        });
        return this;
    };
    Transaction.prototype._promise = function (mode, fn, bWriteLock) {
        var _this = this;
        if (mode === 'readwrite' && this.mode !== 'readwrite')
            return rejection(new exceptions.ReadOnly("Transaction is readonly"));
        if (!this.active)
            return rejection(new exceptions.TransactionInactive());
        if (this._locked()) {
            return new DexiePromise(function (resolve, reject) {
                _this._blockedFuncs.push([function () {
                        _this._promise(mode, fn, bWriteLock).then(resolve, reject);
                    }, PSD]);
            });
        }
        else if (bWriteLock) {
            return newScope(function () {
                var p = new DexiePromise(function (resolve, reject) {
                    _this._lock();
                    var rv = fn(resolve, reject, _this);
                    if (rv && rv.then)
                        rv.then(resolve, reject);
                });
                p.finally(function () { return _this._unlock(); });
                p._lib = true;
                return p;
            });
        }
        else {
            var p = new DexiePromise(function (resolve, reject) {
                var rv = fn(resolve, reject, _this);
                if (rv && rv.then)
                    rv.then(resolve, reject);
            });
            p._lib = true;
            return p;
        }
    };
    Transaction.prototype._root = function () {
        return this.parent ? this.parent._root() : this;
    };
    Transaction.prototype.waitFor = function (promiseLike) {
        var root = this._root();
        var promise = DexiePromise.resolve(promiseLike);
        if (root._waitingFor) {
            root._waitingFor = root._waitingFor.then(function () { return promise; });
        }
        else {
            root._waitingFor = promise;
            root._waitingQueue = [];
            var store = root.idbtrans.objectStore(root.storeNames[0]);
            (function spin() {
                ++root._spinCount;
                while (root._waitingQueue.length)
                    (root._waitingQueue.shift())();
                if (root._waitingFor)
                    store.get(-Infinity).onsuccess = spin;
            }());
        }
        var currentWaitPromise = root._waitingFor;
        return new DexiePromise(function (resolve, reject) {
            promise.then(function (res) { return root._waitingQueue.push(wrap(resolve.bind(null, res))); }, function (err) { return root._waitingQueue.push(wrap(reject.bind(null, err))); }).finally(function () {
                if (root._waitingFor === currentWaitPromise) {
                    root._waitingFor = null;
                }
            });
        });
    };
    Transaction.prototype.abort = function () {
        this.active && this._reject(new exceptions.Abort());
        this.active = false;
    };
    Transaction.prototype.table = function (tableName) {
        var memoizedTables = (this._memoizedTables || (this._memoizedTables = {}));
        if (hasOwn(memoizedTables, tableName))
            return memoizedTables[tableName];
        var tableSchema = this.schema[tableName];
        if (!tableSchema) {
            throw new exceptions.NotFound("Table " + tableName + " not part of transaction");
        }
        var transactionBoundTable = new this.db.Table(tableName, tableSchema, this);
        transactionBoundTable.core = this.db.core.table(tableName);
        memoizedTables[tableName] = transactionBoundTable;
        return transactionBoundTable;
    };
    return Transaction;
}());

function createTransactionConstructor(db) {
    return makeClassConstructor(Transaction.prototype, function Transaction$$1(mode, storeNames, dbschema, parent) {
        var _this = this;
        this.db = db;
        this.mode = mode;
        this.storeNames = storeNames;
        this.schema = dbschema;
        this.idbtrans = null;
        this.on = Events(this, "complete", "error", "abort");
        this.parent = parent || null;
        this.active = true;
        this._reculock = 0;
        this._blockedFuncs = [];
        this._resolve = null;
        this._reject = null;
        this._waitingFor = null;
        this._waitingQueue = null;
        this._spinCount = 0;
        this._completion = new DexiePromise(function (resolve, reject) {
            _this._resolve = resolve;
            _this._reject = reject;
        });
        this._completion.then(function () {
            _this.active = false;
            _this.on.complete.fire();
        }, function (e) {
            var wasActive = _this.active;
            _this.active = false;
            _this.on.error.fire(e);
            _this.parent ?
                _this.parent._reject(e) :
                wasActive && _this.idbtrans && _this.idbtrans.abort();
            return rejection(e);
        });
    });
}

function createIndexSpec(name, keyPath, unique, multi, auto, compound, isPrimKey) {
    return {
        name: name,
        keyPath: keyPath,
        unique: unique,
        multi: multi,
        auto: auto,
        compound: compound,
        src: (unique && !isPrimKey ? '&' : '') + (multi ? '*' : '') + (auto ? "++" : "") + nameFromKeyPath(keyPath)
    };
}
function nameFromKeyPath(keyPath) {
    return typeof keyPath === 'string' ?
        keyPath :
        keyPath ? ('[' + [].join.call(keyPath, '+') + ']') : "";
}

function createTableSchema(name, primKey, indexes) {
    return {
        name: name,
        primKey: primKey,
        indexes: indexes,
        mappedClass: null,
        idxByName: arrayToObject(indexes, function (index) { return [index.name, index]; })
    };
}

function getKeyExtractor(keyPath) {
    if (keyPath == null) {
        return function () { return undefined; };
    }
    else if (typeof keyPath === 'string') {
        return getSinglePathKeyExtractor(keyPath);
    }
    else {
        return function (obj) { return getByKeyPath(obj, keyPath); };
    }
}
function getSinglePathKeyExtractor(keyPath) {
    var split = keyPath.split('.');
    if (split.length === 1) {
        return function (obj) { return obj[keyPath]; };
    }
    else {
        return function (obj) { return getByKeyPath(obj, keyPath); };
    }
}

function getEffectiveKeys(primaryKey, req) {
    if (req.type === 'delete')
        return req.keys;
    return req.keys || req.values.map(primaryKey.extractKey);
}
function getExistingValues(table, req, effectiveKeys) {
    return req.type === 'add' ? Promise.resolve(new Array(req.values.length)) :
        table.getMany({ trans: req.trans, keys: effectiveKeys });
}

function arrayify(arrayLike) {
    return [].slice.call(arrayLike);
}

var _id_counter = 0;
function getKeyPathAlias(keyPath) {
    return keyPath == null ?
        ":id" :
        typeof keyPath === 'string' ?
            keyPath :
            "[" + keyPath.join('+') + "]";
}
function createDBCore(db, indexedDB, IdbKeyRange, tmpTrans) {
    var cmp = indexedDB.cmp.bind(indexedDB);
    function extractSchema(db, trans) {
        var tables = arrayify(db.objectStoreNames);
        return {
            schema: {
                name: db.name,
                tables: tables.map(function (table) { return trans.objectStore(table); }).map(function (store) {
                    var keyPath = store.keyPath, autoIncrement = store.autoIncrement;
                    var compound = isArray(keyPath);
                    var outbound = keyPath == null;
                    var indexByKeyPath = {};
                    var result = {
                        name: store.name,
                        primaryKey: {
                            name: null,
                            isPrimaryKey: true,
                            outbound: outbound,
                            compound: compound,
                            keyPath: keyPath,
                            autoIncrement: autoIncrement,
                            unique: true,
                            extractKey: getKeyExtractor(keyPath)
                        },
                        indexes: arrayify(store.indexNames).map(function (indexName) { return store.index(indexName); })
                            .map(function (index) {
                            var name = index.name, unique = index.unique, multiEntry = index.multiEntry, keyPath = index.keyPath;
                            var compound = isArray(keyPath);
                            var result = {
                                name: name,
                                compound: compound,
                                keyPath: keyPath,
                                unique: unique,
                                multiEntry: multiEntry,
                                extractKey: getKeyExtractor(keyPath)
                            };
                            indexByKeyPath[getKeyPathAlias(keyPath)] = result;
                            return result;
                        }),
                        getIndexByKeyPath: function (keyPath) { return indexByKeyPath[getKeyPathAlias(keyPath)]; }
                    };
                    indexByKeyPath[":id"] = result.primaryKey;
                    if (keyPath != null) {
                        indexByKeyPath[getKeyPathAlias(keyPath)] = result.primaryKey;
                    }
                    return result;
                })
            },
            hasGetAll: tables.length > 0 && ('getAll' in trans.objectStore(tables[0])) &&
                !(typeof navigator !== 'undefined' && /Safari/.test(navigator.userAgent) &&
                    !/(Chrome\/|Edge\/)/.test(navigator.userAgent) &&
                    [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604)
        };
    }
    function makeIDBKeyRange(range) {
        if (range.type === 3          )
            return null;
        if (range.type === 4            )
            throw new Error("Cannot convert never type to IDBKeyRange");
        var lower = range.lower, upper = range.upper, lowerOpen = range.lowerOpen, upperOpen = range.upperOpen;
        var idbRange = lower === undefined ?
            upper === undefined ?
                null :
                IdbKeyRange.upperBound(upper, !!upperOpen) :
            upper === undefined ?
                IdbKeyRange.lowerBound(lower, !!lowerOpen) :
                IdbKeyRange.bound(lower, upper, !!lowerOpen, !!upperOpen);
        return idbRange;
    }
    function createDbCoreTable(tableSchema) {
        var tableName = tableSchema.name;
        function mutate(_a) {
            var trans = _a.trans, type = _a.type, keys$$1 = _a.keys, values = _a.values, range = _a.range, wantResults = _a.wantResults;
            return new Promise(function (resolve, reject) {
                resolve = wrap(resolve);
                var store = trans.objectStore(tableName);
                var outbound = store.keyPath == null;
                var isAddOrPut = type === "put" || type === "add";
                if (!isAddOrPut && type !== 'delete' && type !== 'deleteRange')
                    throw new Error("Invalid operation type: " + type);
                var length = (keys$$1 || values || { length: 1 }).length;
                if (keys$$1 && values && keys$$1.length !== values.length) {
                    throw new Error("Given keys array must have same length as given values array.");
                }
                if (length === 0)
                    return resolve({ numFailures: 0, failures: {}, results: [], lastResult: undefined });
                var results = wantResults && __spreadArrays((keys$$1 ?
                    keys$$1 :
                    getEffectiveKeys(tableSchema.primaryKey, { type: type, keys: keys$$1, values: values })));
                var req;
                var failures = [];
                var numFailures = 0;
                var errorHandler = function (event) {
                    ++numFailures;
                    preventDefault(event);
                    if (results)
                        results[event.target._reqno] = undefined;
                    failures[event.target._reqno] = event.target.error;
                };
                var setResult = function (_a) {
                    var target = _a.target;
                    results[target._reqno] = target.result;
                };
                if (type === 'deleteRange') {
                    if (range.type === 4            )
                        return resolve({ numFailures: numFailures, failures: failures, results: results, lastResult: undefined });
                    if (range.type === 3          )
                        req = store.clear();
                    else
                        req = store.delete(makeIDBKeyRange(range));
                }
                else {
                    var _a = isAddOrPut ?
                        outbound ?
                            [values, keys$$1] :
                            [values, null] :
                        [keys$$1, null], args1 = _a[0], args2 = _a[1];
                    if (isAddOrPut) {
                        for (var i = 0; i < length; ++i) {
                            req = (args2 && args2[i] !== undefined ?
                                store[type](args1[i], args2[i]) :
                                store[type](args1[i]));
                            req._reqno = i;
                            if (results && results[i] === undefined) {
                                req.onsuccess = setResult;
                            }
                            req.onerror = errorHandler;
                        }
                    }
                    else {
                        for (var i = 0; i < length; ++i) {
                            req = store[type](args1[i]);
                            req._reqno = i;
                            req.onerror = errorHandler;
                        }
                    }
                }
                var done = function (event) {
                    var lastResult = event.target.result;
                    if (results)
                        results[length - 1] = lastResult;
                    resolve({
                        numFailures: numFailures,
                        failures: failures,
                        results: results,
                        lastResult: lastResult
                    });
                };
                req.onerror = function (event) {
                    errorHandler(event);
                    done(event);
                };
                req.onsuccess = done;
            });
        }
        function openCursor(_a) {
            var trans = _a.trans, values = _a.values, query = _a.query, reverse = _a.reverse, unique = _a.unique;
            return new Promise(function (resolve, reject) {
                resolve = wrap(resolve);
                var index = query.index, range = query.range;
                var store = trans.objectStore(tableName);
                var source = index.isPrimaryKey ?
                    store :
                    store.index(index.name);
                var direction = reverse ?
                    unique ?
                        "prevunique" :
                        "prev" :
                    unique ?
                        "nextunique" :
                        "next";
                var req = values || !('openKeyCursor' in source) ?
                    source.openCursor(makeIDBKeyRange(range), direction) :
                    source.openKeyCursor(makeIDBKeyRange(range), direction);
                req.onerror = eventRejectHandler(reject);
                req.onsuccess = wrap(function (ev) {
                    var cursor = req.result;
                    if (!cursor) {
                        resolve(null);
                        return;
                    }
                    cursor.___id = ++_id_counter;
                    cursor.done = false;
                    var _cursorContinue = cursor.continue.bind(cursor);
                    var _cursorContinuePrimaryKey = cursor.continuePrimaryKey;
                    if (_cursorContinuePrimaryKey)
                        _cursorContinuePrimaryKey = _cursorContinuePrimaryKey.bind(cursor);
                    var _cursorAdvance = cursor.advance.bind(cursor);
                    var doThrowCursorIsNotStarted = function () { throw new Error("Cursor not started"); };
                    var doThrowCursorIsStopped = function () { throw new Error("Cursor not stopped"); };
                    cursor.trans = trans;
                    cursor.stop = cursor.continue = cursor.continuePrimaryKey = cursor.advance = doThrowCursorIsNotStarted;
                    cursor.fail = wrap(reject);
                    cursor.next = function () {
                        var _this = this;
                        var gotOne = 1;
                        return this.start(function () { return gotOne-- ? _this.continue() : _this.stop(); }).then(function () { return _this; });
                    };
                    cursor.start = function (callback) {
                        var iterationPromise = new Promise(function (resolveIteration, rejectIteration) {
                            resolveIteration = wrap(resolveIteration);
                            req.onerror = eventRejectHandler(rejectIteration);
                            cursor.fail = rejectIteration;
                            cursor.stop = function (value) {
                                cursor.stop = cursor.continue = cursor.continuePrimaryKey = cursor.advance = doThrowCursorIsStopped;
                                resolveIteration(value);
                            };
                        });
                        var guardedCallback = function () {
                            if (req.result) {
                                try {
                                    callback();
                                }
                                catch (err) {
                                    cursor.fail(err);
                                }
                            }
                            else {
                                cursor.done = true;
                                cursor.start = function () { throw new Error("Cursor behind last entry"); };
                                cursor.stop();
                            }
                        };
                        req.onsuccess = wrap(function (ev) {
                            req.onsuccess = guardedCallback;
                            guardedCallback();
                        });
                        cursor.continue = _cursorContinue;
                        cursor.continuePrimaryKey = _cursorContinuePrimaryKey;
                        cursor.advance = _cursorAdvance;
                        guardedCallback();
                        return iterationPromise;
                    };
                    resolve(cursor);
                }, reject);
            });
        }
        function query(hasGetAll) {
            return function (request) {
                return new Promise(function (resolve, reject) {
                    resolve = wrap(resolve);
                    var trans = request.trans, values = request.values, limit = request.limit, query = request.query;
                    var nonInfinitLimit = limit === Infinity ? undefined : limit;
                    var index = query.index, range = query.range;
                    var store = trans.objectStore(tableName);
                    var source = index.isPrimaryKey ? store : store.index(index.name);
                    var idbKeyRange = makeIDBKeyRange(range);
                    if (limit === 0)
                        return resolve({ result: [] });
                    if (hasGetAll) {
                        var req = values ?
                            source.getAll(idbKeyRange, nonInfinitLimit) :
                            source.getAllKeys(idbKeyRange, nonInfinitLimit);
                        req.onsuccess = function (event) { return resolve({ result: event.target.result }); };
                        req.onerror = eventRejectHandler(reject);
                    }
                    else {
                        var count_1 = 0;
                        var req_1 = values || !('openKeyCursor' in source) ?
                            source.openCursor(idbKeyRange) :
                            source.openKeyCursor(idbKeyRange);
                        var result_1 = [];
                        req_1.onsuccess = function (event) {
                            var cursor = req_1.result;
                            if (!cursor)
                                return resolve({ result: result_1 });
                            result_1.push(values ? cursor.value : cursor.primaryKey);
                            if (++count_1 === limit)
                                return resolve({ result: result_1 });
                            cursor.continue();
                        };
                        req_1.onerror = eventRejectHandler(reject);
                    }
                });
            };
        }
        return {
            name: tableName,
            schema: tableSchema,
            mutate: mutate,
            getMany: function (_a) {
                var trans = _a.trans, keys$$1 = _a.keys;
                return new Promise(function (resolve, reject) {
                    resolve = wrap(resolve);
                    var store = trans.objectStore(tableName);
                    var length = keys$$1.length;
                    var result = new Array(length);
                    var keyCount = 0;
                    var callbackCount = 0;
                    var valueCount = 0;
                    var req;
                    var successHandler = function (event) {
                        var req = event.target;
                        if ((result[req._pos] = req.result) != null)
                            ++valueCount;
                        if (++callbackCount === keyCount)
                            resolve(result);
                    };
                    var errorHandler = eventRejectHandler(reject);
                    for (var i = 0; i < length; ++i) {
                        var key = keys$$1[i];
                        if (key != null) {
                            req = store.get(keys$$1[i]);
                            req._pos = i;
                            req.onsuccess = successHandler;
                            req.onerror = errorHandler;
                            ++keyCount;
                        }
                    }
                    if (keyCount === 0)
                        resolve(result);
                });
            },
            get: function (_a) {
                var trans = _a.trans, key = _a.key;
                return new Promise(function (resolve, reject) {
                    resolve = wrap(resolve);
                    var store = trans.objectStore(tableName);
                    var req = store.get(key);
                    req.onsuccess = function (event) { return resolve(event.target.result); };
                    req.onerror = eventRejectHandler(reject);
                });
            },
            query: query(hasGetAll),
            openCursor: openCursor,
            count: function (_a) {
                var query = _a.query, trans = _a.trans;
                var index = query.index, range = query.range;
                return new Promise(function (resolve, reject) {
                    var store = trans.objectStore(tableName);
                    var source = index.isPrimaryKey ? store : store.index(index.name);
                    var idbKeyRange = makeIDBKeyRange(range);
                    var req = idbKeyRange ? source.count(idbKeyRange) : source.count();
                    req.onsuccess = wrap(function (ev) { return resolve(ev.target.result); });
                    req.onerror = eventRejectHandler(reject);
                });
            }
        };
    }
    var _a = extractSchema(db, tmpTrans), schema = _a.schema, hasGetAll = _a.hasGetAll;
    var tables = schema.tables.map(function (tableSchema) { return createDbCoreTable(tableSchema); });
    var tableMap = {};
    tables.forEach(function (table) { return tableMap[table.name] = table; });
    return {
        stack: "dbcore",
        transaction: db.transaction.bind(db),
        table: function (name) {
            var result = tableMap[name];
            if (!result)
                throw new Error("Table '" + name + "' not found");
            return tableMap[name];
        },
        cmp: cmp,
        MIN_KEY: -Infinity,
        MAX_KEY: getMaxKey(IdbKeyRange),
        schema: schema
    };
}

function createMiddlewareStack(stackImpl, middlewares) {
    return middlewares.reduce(function (down, _a) {
        var create = _a.create;
        return (__assign(__assign({}, down), create(down)));
    }, stackImpl);
}
function createMiddlewareStacks(middlewares, idbdb, _a, tmpTrans) {
    var IDBKeyRange = _a.IDBKeyRange, indexedDB = _a.indexedDB;
    var dbcore = createMiddlewareStack(createDBCore(idbdb, indexedDB, IDBKeyRange, tmpTrans), middlewares.dbcore);
    return {
        dbcore: dbcore
    };
}
function generateMiddlewareStacks(db, tmpTrans) {
    var idbdb = tmpTrans.db;
    var stacks = createMiddlewareStacks(db._middlewares, idbdb, db._deps, tmpTrans);
    db.core = stacks.dbcore;
    db.tables.forEach(function (table) {
        var tableName = table.name;
        if (db.core.schema.tables.some(function (tbl) { return tbl.name === tableName; })) {
            table.core = db.core.table(tableName);
            if (db[tableName] instanceof db.Table) {
                db[tableName].core = table.core;
            }
        }
    });
}

function setApiOnPlace(db, objs, tableNames, dbschema) {
    tableNames.forEach(function (tableName) {
        var schema = dbschema[tableName];
        objs.forEach(function (obj) {
            if (!(tableName in obj)) {
                if (obj === db.Transaction.prototype || obj instanceof db.Transaction) {
                    setProp(obj, tableName, {
                        get: function () { return this.table(tableName); },
                        set: function (value) {
                            defineProperty(this, tableName, { value: value, writable: true, configurable: true, enumerable: true });
                        }
                    });
                }
                else {
                    obj[tableName] = new db.Table(tableName, schema);
                }
            }
        });
    });
}
function removeTablesApi(db, objs) {
    objs.forEach(function (obj) {
        for (var key in obj) {
            if (obj[key] instanceof db.Table)
                delete obj[key];
        }
    });
}
function lowerVersionFirst(a, b) {
    return a._cfg.version - b._cfg.version;
}
function runUpgraders(db, oldVersion, idbUpgradeTrans, reject) {
    var globalSchema = db._dbSchema;
    var trans = db._createTransaction('readwrite', db._storeNames, globalSchema);
    trans.create(idbUpgradeTrans);
    trans._completion.catch(reject);
    var rejectTransaction = trans._reject.bind(trans);
    var transless = PSD.transless || PSD;
    newScope(function () {
        PSD.trans = trans;
        PSD.transless = transless;
        if (oldVersion === 0) {
            keys(globalSchema).forEach(function (tableName) {
                createTable(idbUpgradeTrans, tableName, globalSchema[tableName].primKey, globalSchema[tableName].indexes);
            });
            generateMiddlewareStacks(db, idbUpgradeTrans);
            DexiePromise.follow(function () { return db.on.populate.fire(trans); }).catch(rejectTransaction);
        }
        else
            updateTablesAndIndexes(db, oldVersion, trans, idbUpgradeTrans).catch(rejectTransaction);
    });
}
function updateTablesAndIndexes(db, oldVersion, trans, idbUpgradeTrans) {
    var queue = [];
    var versions = db._versions;
    var globalSchema = db._dbSchema = buildGlobalSchema(db, db.idbdb, idbUpgradeTrans);
    var anyContentUpgraderHasRun = false;
    var versToRun = versions.filter(function (v) { return v._cfg.version >= oldVersion; });
    versToRun.forEach(function (version) {
        queue.push(function () {
            var oldSchema = globalSchema;
            var newSchema = version._cfg.dbschema;
            adjustToExistingIndexNames(db, oldSchema, idbUpgradeTrans);
            adjustToExistingIndexNames(db, newSchema, idbUpgradeTrans);
            globalSchema = db._dbSchema = newSchema;
            var diff = getSchemaDiff(oldSchema, newSchema);
            diff.add.forEach(function (tuple) {
                createTable(idbUpgradeTrans, tuple[0], tuple[1].primKey, tuple[1].indexes);
            });
            diff.change.forEach(function (change) {
                if (change.recreate) {
                    throw new exceptions.Upgrade("Not yet support for changing primary key");
                }
                else {
                    var store_1 = idbUpgradeTrans.objectStore(change.name);
                    change.add.forEach(function (idx) { return addIndex(store_1, idx); });
                    change.change.forEach(function (idx) {
                        store_1.deleteIndex(idx.name);
                        addIndex(store_1, idx);
                    });
                    change.del.forEach(function (idxName) { return store_1.deleteIndex(idxName); });
                }
            });
            var contentUpgrade = version._cfg.contentUpgrade;
            if (contentUpgrade && version._cfg.version > oldVersion) {
                generateMiddlewareStacks(db, idbUpgradeTrans);
                anyContentUpgraderHasRun = true;
                var upgradeSchema_1 = shallowClone(newSchema);
                diff.del.forEach(function (table) {
                    upgradeSchema_1[table] = oldSchema[table];
                });
                removeTablesApi(db, [db.Transaction.prototype]);
                setApiOnPlace(db, [db.Transaction.prototype], keys(upgradeSchema_1), upgradeSchema_1);
                trans.schema = upgradeSchema_1;
                var contentUpgradeIsAsync_1 = isAsyncFunction(contentUpgrade);
                if (contentUpgradeIsAsync_1) {
                    incrementExpectedAwaits();
                }
                var returnValue_1;
                var promiseFollowed = DexiePromise.follow(function () {
                    returnValue_1 = contentUpgrade(trans);
                    if (returnValue_1) {
                        if (contentUpgradeIsAsync_1) {
                            var decrementor = decrementExpectedAwaits.bind(null, null);
                            returnValue_1.then(decrementor, decrementor);
                        }
                    }
                });
                return (returnValue_1 && typeof returnValue_1.then === 'function' ?
                    DexiePromise.resolve(returnValue_1) : promiseFollowed.then(function () { return returnValue_1; }));
            }
        });
        queue.push(function (idbtrans) {
            if (!anyContentUpgraderHasRun || !hasIEDeleteObjectStoreBug) {
                var newSchema = version._cfg.dbschema;
                deleteRemovedTables(newSchema, idbtrans);
            }
            removeTablesApi(db, [db.Transaction.prototype]);
            setApiOnPlace(db, [db.Transaction.prototype], db._storeNames, db._dbSchema);
            trans.schema = db._dbSchema;
        });
    });
    function runQueue() {
        return queue.length ? DexiePromise.resolve(queue.shift()(trans.idbtrans)).then(runQueue) :
            DexiePromise.resolve();
    }
    return runQueue().then(function () {
        createMissingTables(globalSchema, idbUpgradeTrans);
    });
}
function getSchemaDiff(oldSchema, newSchema) {
    var diff = {
        del: [],
        add: [],
        change: []
    };
    var table;
    for (table in oldSchema) {
        if (!newSchema[table])
            diff.del.push(table);
    }
    for (table in newSchema) {
        var oldDef = oldSchema[table], newDef = newSchema[table];
        if (!oldDef) {
            diff.add.push([table, newDef]);
        }
        else {
            var change = {
                name: table,
                def: newDef,
                recreate: false,
                del: [],
                add: [],
                change: []
            };
            if (oldDef.primKey.src !== newDef.primKey.src &&
                !isIEOrEdge
            ) {
                change.recreate = true;
                diff.change.push(change);
            }
            else {
                var oldIndexes = oldDef.idxByName;
                var newIndexes = newDef.idxByName;
                var idxName = void 0;
                for (idxName in oldIndexes) {
                    if (!newIndexes[idxName])
                        change.del.push(idxName);
                }
                for (idxName in newIndexes) {
                    var oldIdx = oldIndexes[idxName], newIdx = newIndexes[idxName];
                    if (!oldIdx)
                        change.add.push(newIdx);
                    else if (oldIdx.src !== newIdx.src)
                        change.change.push(newIdx);
                }
                if (change.del.length > 0 || change.add.length > 0 || change.change.length > 0) {
                    diff.change.push(change);
                }
            }
        }
    }
    return diff;
}
function createTable(idbtrans, tableName, primKey, indexes) {
    var store = idbtrans.db.createObjectStore(tableName, primKey.keyPath ?
        { keyPath: primKey.keyPath, autoIncrement: primKey.auto } :
        { autoIncrement: primKey.auto });
    indexes.forEach(function (idx) { return addIndex(store, idx); });
    return store;
}
function createMissingTables(newSchema, idbtrans) {
    keys(newSchema).forEach(function (tableName) {
        if (!idbtrans.db.objectStoreNames.contains(tableName)) {
            createTable(idbtrans, tableName, newSchema[tableName].primKey, newSchema[tableName].indexes);
        }
    });
}
function deleteRemovedTables(newSchema, idbtrans) {
    for (var i = 0; i < idbtrans.db.objectStoreNames.length; ++i) {
        var storeName = idbtrans.db.objectStoreNames[i];
        if (newSchema[storeName] == null) {
            idbtrans.db.deleteObjectStore(storeName);
        }
    }
}
function addIndex(store, idx) {
    store.createIndex(idx.name, idx.keyPath, { unique: idx.unique, multiEntry: idx.multi });
}
function buildGlobalSchema(db, idbdb, tmpTrans) {
    var globalSchema = {};
    var dbStoreNames = slice(idbdb.objectStoreNames, 0);
    dbStoreNames.forEach(function (storeName) {
        var store = tmpTrans.objectStore(storeName);
        var keyPath = store.keyPath;
        var primKey = createIndexSpec(nameFromKeyPath(keyPath), keyPath || "", false, false, !!store.autoIncrement, keyPath && typeof keyPath !== "string", true);
        var indexes = [];
        for (var j = 0; j < store.indexNames.length; ++j) {
            var idbindex = store.index(store.indexNames[j]);
            keyPath = idbindex.keyPath;
            var index = createIndexSpec(idbindex.name, keyPath, !!idbindex.unique, !!idbindex.multiEntry, false, keyPath && typeof keyPath !== "string", false);
            indexes.push(index);
        }
        globalSchema[storeName] = createTableSchema(storeName, primKey, indexes);
    });
    return globalSchema;
}
function readGlobalSchema(db, idbdb, tmpTrans) {
    db.verno = idbdb.version / 10;
    var globalSchema = db._dbSchema = buildGlobalSchema(db, idbdb, tmpTrans);
    db._storeNames = slice(idbdb.objectStoreNames, 0);
    setApiOnPlace(db, [db._allTables], keys(globalSchema), globalSchema);
}
function adjustToExistingIndexNames(db, schema, idbtrans) {
    var storeNames = idbtrans.db.objectStoreNames;
    for (var i = 0; i < storeNames.length; ++i) {
        var storeName = storeNames[i];
        var store = idbtrans.objectStore(storeName);
        db._hasGetAll = 'getAll' in store;
        for (var j = 0; j < store.indexNames.length; ++j) {
            var indexName = store.indexNames[j];
            var keyPath = store.index(indexName).keyPath;
            var dexieName = typeof keyPath === 'string' ? keyPath : "[" + slice(keyPath).join('+') + "]";
            if (schema[storeName]) {
                var indexSpec = schema[storeName].idxByName[dexieName];
                if (indexSpec) {
                    indexSpec.name = indexName;
                    delete schema[storeName].idxByName[dexieName];
                    schema[storeName].idxByName[indexName] = indexSpec;
                }
            }
        }
    }
    if (typeof navigator !== 'undefined' && /Safari/.test(navigator.userAgent) &&
        !/(Chrome\/|Edge\/)/.test(navigator.userAgent) &&
        _global.WorkerGlobalScope && _global instanceof _global.WorkerGlobalScope &&
        [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604) {
        db._hasGetAll = false;
    }
}
function parseIndexSyntax(primKeyAndIndexes) {
    return primKeyAndIndexes.split(',').map(function (index, indexNum) {
        index = index.trim();
        var name = index.replace(/([&*]|\+\+)/g, "");
        var keyPath = /^\[/.test(name) ? name.match(/^\[(.*)\]$/)[1].split('+') : name;
        return createIndexSpec(name, keyPath || null, /\&/.test(index), /\*/.test(index), /\+\+/.test(index), isArray(keyPath), indexNum === 0);
    });
}

var Version =               (function () {
    function Version() {
    }
    Version.prototype._parseStoresSpec = function (stores, outSchema) {
        keys(stores).forEach(function (tableName) {
            if (stores[tableName] !== null) {
                var indexes = parseIndexSyntax(stores[tableName]);
                var primKey = indexes.shift();
                if (primKey.multi)
                    throw new exceptions.Schema("Primary key cannot be multi-valued");
                indexes.forEach(function (idx) {
                    if (idx.auto)
                        throw new exceptions.Schema("Only primary key can be marked as autoIncrement (++)");
                    if (!idx.keyPath)
                        throw new exceptions.Schema("Index must have a name and cannot be an empty string");
                });
                outSchema[tableName] = createTableSchema(tableName, primKey, indexes);
            }
        });
    };
    Version.prototype.stores = function (stores) {
        var db = this.db;
        this._cfg.storesSource = this._cfg.storesSource ?
            extend(this._cfg.storesSource, stores) :
            stores;
        var versions = db._versions;
        var storesSpec = {};
        var dbschema = {};
        versions.forEach(function (version) {
            extend(storesSpec, version._cfg.storesSource);
            dbschema = (version._cfg.dbschema = {});
            version._parseStoresSpec(storesSpec, dbschema);
        });
        db._dbSchema = dbschema;
        removeTablesApi(db, [db._allTables, db, db.Transaction.prototype]);
        setApiOnPlace(db, [db._allTables, db, db.Transaction.prototype, this._cfg.tables], keys(dbschema), dbschema);
        db._storeNames = keys(dbschema);
        return this;
    };
    Version.prototype.upgrade = function (upgradeFunction) {
        this._cfg.contentUpgrade = upgradeFunction;
        return this;
    };
    return Version;
}());

function createVersionConstructor(db) {
    return makeClassConstructor(Version.prototype, function Version$$1(versionNumber) {
        this.db = db;
        this._cfg = {
            version: versionNumber,
            storesSource: null,
            dbschema: {},
            tables: {},
            contentUpgrade: null
        };
    });
}

var databaseEnumerator;
function DatabaseEnumerator(indexedDB) {
    var hasDatabasesNative = indexedDB && typeof indexedDB.databases === 'function';
    var dbNamesTable;
    if (!hasDatabasesNative) {
        var db = new Dexie(DBNAMES_DB, { addons: [] });
        db.version(1).stores({ dbnames: 'name' });
        dbNamesTable = db.table('dbnames');
    }
    return {
        getDatabaseNames: function () {
            return hasDatabasesNative
                ?
                    DexiePromise.resolve(indexedDB.databases()).then(function (infos) { return infos
                        .map(function (info) { return info.name; })
                        .filter(function (name) { return name !== DBNAMES_DB; }); })
                :
                    dbNamesTable.toCollection().primaryKeys();
        },
        add: function (name) {
            return !hasDatabasesNative && name !== DBNAMES_DB && dbNamesTable.put({ name: name }).catch(nop);
        },
        remove: function (name) {
            return !hasDatabasesNative && name !== DBNAMES_DB && dbNamesTable.delete(name).catch(nop);
        }
    };
}
function initDatabaseEnumerator(indexedDB) {
    try {
        databaseEnumerator = DatabaseEnumerator(indexedDB);
    }
    catch (e) { }
}

function vip(fn) {
    return newScope(function () {
        PSD.letThrough = true;
        return fn();
    });
}

function dexieOpen(db) {
    var state = db._state;
    var indexedDB = db._deps.indexedDB;
    if (state.isBeingOpened || db.idbdb)
        return state.dbReadyPromise.then(function () { return state.dbOpenError ?
            rejection(state.dbOpenError) :
            db; });
    debug && (state.openCanceller._stackHolder = getErrorWithStack());
    state.isBeingOpened = true;
    state.dbOpenError = null;
    state.openComplete = false;
    var resolveDbReady = state.dbReadyResolve,
    upgradeTransaction = null;
    return DexiePromise.race([state.openCanceller, new DexiePromise(function (resolve, reject) {
            if (!indexedDB)
                throw new exceptions.MissingAPI("indexedDB API not found. If using IE10+, make sure to run your code on a server URL " +
                    "(not locally). If using old Safari versions, make sure to include indexedDB polyfill.");
            var dbName = db.name;
            var req = state.autoSchema ?
                indexedDB.open(dbName) :
                indexedDB.open(dbName, Math.round(db.verno * 10));
            if (!req)
                throw new exceptions.MissingAPI("IndexedDB API not available");
            req.onerror = eventRejectHandler(reject);
            req.onblocked = wrap(db._fireOnBlocked);
            req.onupgradeneeded = wrap(function (e) {
                upgradeTransaction = req.transaction;
                if (state.autoSchema && !db._options.allowEmptyDB) {
                    req.onerror = preventDefault;
                    upgradeTransaction.abort();
                    req.result.close();
                    var delreq = indexedDB.deleteDatabase(dbName);
                    delreq.onsuccess = delreq.onerror = wrap(function () {
                        reject(new exceptions.NoSuchDatabase("Database " + dbName + " doesnt exist"));
                    });
                }
                else {
                    upgradeTransaction.onerror = eventRejectHandler(reject);
                    var oldVer = e.oldVersion > Math.pow(2, 62) ? 0 : e.oldVersion;
                    db.idbdb = req.result;
                    runUpgraders(db, oldVer / 10, upgradeTransaction, reject);
                }
            }, reject);
            req.onsuccess = wrap(function () {
                upgradeTransaction = null;
                var idbdb = db.idbdb = req.result;
                var objectStoreNames = slice(idbdb.objectStoreNames);
                if (objectStoreNames.length > 0)
                    try {
                        var tmpTrans = idbdb.transaction(safariMultiStoreFix(objectStoreNames), 'readonly');
                        if (state.autoSchema)
                            readGlobalSchema(db, idbdb, tmpTrans);
                        else
                            adjustToExistingIndexNames(db, db._dbSchema, tmpTrans);
                        generateMiddlewareStacks(db, tmpTrans);
                    }
                    catch (e) {
                    }
                connections.push(db);
                idbdb.onversionchange = wrap(function (ev) {
                    state.vcFired = true;
                    db.on("versionchange").fire(ev);
                });
                databaseEnumerator.add(dbName);
                resolve();
            }, reject);
        })]).then(function () {
        state.onReadyBeingFired = [];
        return DexiePromise.resolve(vip(db.on.ready.fire)).then(function fireRemainders() {
            if (state.onReadyBeingFired.length > 0) {
                var remainders = state.onReadyBeingFired.reduce(promisableChain, nop);
                state.onReadyBeingFired = [];
                return DexiePromise.resolve(vip(remainders)).then(fireRemainders);
            }
        });
    }).finally(function () {
        state.onReadyBeingFired = null;
    }).then(function () {
        state.isBeingOpened = false;
        return db;
    }).catch(function (err) {
        try {
            upgradeTransaction && upgradeTransaction.abort();
        }
        catch (e) { }
        state.isBeingOpened = false;
        db.close();
        state.dbOpenError = err;
        return rejection(state.dbOpenError);
    }).finally(function () {
        state.openComplete = true;
        resolveDbReady();
    });
}

function awaitIterator(iterator) {
    var callNext = function (result) { return iterator.next(result); }, doThrow = function (error) { return iterator.throw(error); }, onSuccess = step(callNext), onError = step(doThrow);
    function step(getNext) {
        return function (val) {
            var next = getNext(val), value = next.value;
            return next.done ? value :
                (!value || typeof value.then !== 'function' ?
                    isArray(value) ? Promise.all(value).then(onSuccess, onError) : onSuccess(value) :
                    value.then(onSuccess, onError));
        };
    }
    return step(callNext)();
}

function extractTransactionArgs(mode, _tableArgs_, scopeFunc) {
    var i = arguments.length;
    if (i < 2)
        throw new exceptions.InvalidArgument("Too few arguments");
    var args = new Array(i - 1);
    while (--i)
        args[i - 1] = arguments[i];
    scopeFunc = args.pop();
    var tables = flatten(args);
    return [mode, tables, scopeFunc];
}
function enterTransactionScope(db, mode, storeNames, parentTransaction, scopeFunc) {
    return DexiePromise.resolve().then(function () {
        var transless = PSD.transless || PSD;
        var trans = db._createTransaction(mode, storeNames, db._dbSchema, parentTransaction);
        var zoneProps = {
            trans: trans,
            transless: transless
        };
        if (parentTransaction) {
            trans.idbtrans = parentTransaction.idbtrans;
        }
        else {
            trans.create();
        }
        var scopeFuncIsAsync = isAsyncFunction(scopeFunc);
        if (scopeFuncIsAsync) {
            incrementExpectedAwaits();
        }
        var returnValue;
        var promiseFollowed = DexiePromise.follow(function () {
            returnValue = scopeFunc.call(trans, trans);
            if (returnValue) {
                if (scopeFuncIsAsync) {
                    var decrementor = decrementExpectedAwaits.bind(null, null);
                    returnValue.then(decrementor, decrementor);
                }
                else if (typeof returnValue.next === 'function' && typeof returnValue.throw === 'function') {
                    returnValue = awaitIterator(returnValue);
                }
            }
        }, zoneProps);
        return (returnValue && typeof returnValue.then === 'function' ?
            DexiePromise.resolve(returnValue).then(function (x) { return trans.active ?
                x
                : rejection(new exceptions.PrematureCommit("Transaction committed too early. See http://bit.ly/2kdckMn")); })
            : promiseFollowed.then(function () { return returnValue; })).then(function (x) {
            if (parentTransaction)
                trans._resolve();
            return trans._completion.then(function () { return x; });
        }).catch(function (e) {
            trans._reject(e);
            return rejection(e);
        });
    });
}

function pad(a, value, count) {
    var result = isArray(a) ? a.slice() : [a];
    for (var i = 0; i < count; ++i)
        result.push(value);
    return result;
}
function createVirtualIndexMiddleware(down) {
    return __assign(__assign({}, down), { table: function (tableName) {
            var table = down.table(tableName);
            var schema = table.schema;
            var indexLookup = {};
            var allVirtualIndexes = [];
            function addVirtualIndexes(keyPath, keyTail, lowLevelIndex) {
                var keyPathAlias = getKeyPathAlias(keyPath);
                var indexList = (indexLookup[keyPathAlias] = indexLookup[keyPathAlias] || []);
                var keyLength = keyPath == null ? 0 : typeof keyPath === 'string' ? 1 : keyPath.length;
                var isVirtual = keyTail > 0;
                var virtualIndex = __assign(__assign({}, lowLevelIndex), { isVirtual: isVirtual, isPrimaryKey: !isVirtual && lowLevelIndex.isPrimaryKey, keyTail: keyTail,
                    keyLength: keyLength, extractKey: getKeyExtractor(keyPath), unique: !isVirtual && lowLevelIndex.unique });
                indexList.push(virtualIndex);
                if (!virtualIndex.isPrimaryKey) {
                    allVirtualIndexes.push(virtualIndex);
                }
                if (keyLength > 1) {
                    var virtualKeyPath = keyLength === 2 ?
                        keyPath[0] :
                        keyPath.slice(0, keyLength - 1);
                    addVirtualIndexes(virtualKeyPath, keyTail + 1, lowLevelIndex);
                }
                indexList.sort(function (a, b) { return a.keyTail - b.keyTail; });
                return virtualIndex;
            }
            var primaryKey = addVirtualIndexes(schema.primaryKey.keyPath, 0, schema.primaryKey);
            indexLookup[":id"] = [primaryKey];
            for (var _i = 0, _a = schema.indexes; _i < _a.length; _i++) {
                var index = _a[_i];
                addVirtualIndexes(index.keyPath, 0, index);
            }
            function findBestIndex(keyPath) {
                var result = indexLookup[getKeyPathAlias(keyPath)];
                return result && result[0];
            }
            function translateRange(range, keyTail) {
                return {
                    type: range.type === 1             ?
                        2             :
                        range.type,
                    lower: pad(range.lower, range.lowerOpen ? down.MAX_KEY : down.MIN_KEY, keyTail),
                    lowerOpen: true,
                    upper: pad(range.upper, range.upperOpen ? down.MIN_KEY : down.MAX_KEY, keyTail),
                    upperOpen: true
                };
            }
            function translateRequest(req) {
                var index = req.query.index;
                return index.isVirtual ? __assign(__assign({}, req), { query: {
                        index: index,
                        range: translateRange(req.query.range, index.keyTail)
                    } }) : req;
            }
            var result = __assign(__assign({}, table), { schema: __assign(__assign({}, schema), { primaryKey: primaryKey, indexes: allVirtualIndexes, getIndexByKeyPath: findBestIndex }), count: function (req) {
                    return table.count(translateRequest(req));
                },
                query: function (req) {
                    return table.query(translateRequest(req));
                },
                openCursor: function (req) {
                    var _a = req.query.index, keyTail = _a.keyTail, isVirtual = _a.isVirtual, keyLength = _a.keyLength;
                    if (!isVirtual)
                        return table.openCursor(req);
                    function createVirtualCursor(cursor) {
                        function _continue(key) {
                            key != null ?
                                cursor.continue(pad(key, req.reverse ? down.MAX_KEY : down.MIN_KEY, keyTail)) :
                                req.unique ?
                                    cursor.continue(pad(cursor.key, req.reverse ? down.MIN_KEY : down.MAX_KEY, keyTail)) :
                                    cursor.continue();
                        }
                        var virtualCursor = Object.create(cursor, {
                            continue: { value: _continue },
                            continuePrimaryKey: {
                                value: function (key, primaryKey) {
                                    cursor.continuePrimaryKey(pad(key, down.MAX_KEY, keyTail), primaryKey);
                                }
                            },
                            key: {
                                get: function () {
                                    var key = cursor.key;
                                    return keyLength === 1 ?
                                        key[0] :
                                        key.slice(0, keyLength);
                                }
                            },
                            value: {
                                get: function () {
                                    return cursor.value;
                                }
                            }
                        });
                        return virtualCursor;
                    }
                    return table.openCursor(translateRequest(req))
                        .then(function (cursor) { return cursor && createVirtualCursor(cursor); });
                } });
            return result;
        } });
}
var virtualIndexMiddleware = {
    stack: "dbcore",
    name: "VirtualIndexMiddleware",
    level: 1,
    create: createVirtualIndexMiddleware
};

var hooksMiddleware = {
    stack: "dbcore",
    name: "HooksMiddleware",
    level: 2,
    create: function (downCore) { return (__assign(__assign({}, downCore), { table: function (tableName) {
            var downTable = downCore.table(tableName);
            var primaryKey = downTable.schema.primaryKey;
            var tableMiddleware = __assign(__assign({}, downTable), { mutate: function (req) {
                    var dxTrans = PSD.trans;
                    var _a = dxTrans.table(tableName).hook, deleting = _a.deleting, creating = _a.creating, updating = _a.updating;
                    switch (req.type) {
                        case 'add':
                            if (creating.fire === nop)
                                break;
                            return dxTrans._promise('readwrite', function () { return addPutOrDelete(req); }, true);
                        case 'put':
                            if (creating.fire === nop && updating.fire === nop)
                                break;
                            return dxTrans._promise('readwrite', function () { return addPutOrDelete(req); }, true);
                        case 'delete':
                            if (deleting.fire === nop)
                                break;
                            return dxTrans._promise('readwrite', function () { return addPutOrDelete(req); }, true);
                        case 'deleteRange':
                            if (deleting.fire === nop)
                                break;
                            return dxTrans._promise('readwrite', function () { return deleteRange(req); }, true);
                    }
                    return downTable.mutate(req);
                    function addPutOrDelete(req) {
                        var dxTrans = PSD.trans;
                        var keys$$1 = req.keys || getEffectiveKeys(primaryKey, req);
                        if (!keys$$1)
                            throw new Error("Keys missing");
                        req = req.type === 'add' || req.type === 'put' ? __assign(__assign({}, req), { keys: keys$$1, wantResults: true }) :
                         __assign({}, req);
                        if (req.type !== 'delete')
                            req.values = __spreadArrays(req.values);
                        if (req.keys)
                            req.keys = __spreadArrays(req.keys);
                        return getExistingValues(downTable, req, keys$$1).then(function (existingValues) {
                            var contexts = keys$$1.map(function (key, i) {
                                var existingValue = existingValues[i];
                                var ctx = { onerror: null, onsuccess: null };
                                if (req.type === 'delete') {
                                    deleting.fire.call(ctx, key, existingValue, dxTrans);
                                }
                                else if (req.type === 'add' || existingValue === undefined) {
                                    var generatedPrimaryKey = creating.fire.call(ctx, key, req.values[i], dxTrans);
                                    if (key == null && generatedPrimaryKey != null) {
                                        key = generatedPrimaryKey;
                                        req.keys[i] = key;
                                        if (!primaryKey.outbound) {
                                            setByKeyPath(req.values[i], primaryKey.keyPath, key);
                                        }
                                    }
                                }
                                else {
                                    var objectDiff = getObjectDiff(existingValue, req.values[i]);
                                    var additionalChanges_1 = updating.fire.call(ctx, objectDiff, key, existingValue, dxTrans);
                                    if (additionalChanges_1) {
                                        var requestedValue_1 = req.values[i];
                                        Object.keys(additionalChanges_1).forEach(function (keyPath) {
                                            setByKeyPath(requestedValue_1, keyPath, additionalChanges_1[keyPath]);
                                        });
                                    }
                                }
                                return ctx;
                            });
                            return downTable.mutate(req).then(function (_a) {
                                var failures = _a.failures, results = _a.results, numFailures = _a.numFailures, lastResult = _a.lastResult;
                                for (var i = 0; i < keys$$1.length; ++i) {
                                    var primKey = results ? results[i] : keys$$1[i];
                                    var ctx = contexts[i];
                                    if (primKey == null) {
                                        ctx.onerror && ctx.onerror(failures[i]);
                                    }
                                    else {
                                        ctx.onsuccess && ctx.onsuccess(req.type === 'put' && existingValues[i] ?
                                            req.values[i] :
                                            primKey
                                        );
                                    }
                                }
                                return { failures: failures, results: results, numFailures: numFailures, lastResult: lastResult };
                            }).catch(function (error) {
                                contexts.forEach(function (ctx) { return ctx.onerror && ctx.onerror(error); });
                                return Promise.reject(error);
                            });
                        });
                    }
                    function deleteRange(req) {
                        return deleteNextChunk(req.trans, req.range, 10000);
                    }
                    function deleteNextChunk(trans, range, limit) {
                        return downTable.query({ trans: trans, values: false, query: { index: primaryKey, range: range }, limit: limit })
                            .then(function (_a) {
                            var result = _a.result;
                            return addPutOrDelete({ type: 'delete', keys: result, trans: trans }).then(function (res) {
                                if (res.numFailures > 0)
                                    return Promise.reject(res.failures[0]);
                                if (result.length < limit) {
                                    return { failures: [], numFailures: 0, lastResult: undefined };
                                }
                                else {
                                    return deleteNextChunk(trans, __assign(__assign({}, range), { lower: result[result.length - 1], lowerOpen: true }), limit);
                                }
                            });
                        });
                    }
                } });
            return tableMiddleware;
        } })); }
};

var Dexie =               (function () {
    function Dexie(name, options) {
        var _this = this;
        this._middlewares = {};
        this.verno = 0;
        var deps = Dexie.dependencies;
        this._options = options = __assign({
            addons: Dexie.addons, autoOpen: true,
            indexedDB: deps.indexedDB, IDBKeyRange: deps.IDBKeyRange }, options);
        this._deps = {
            indexedDB: options.indexedDB,
            IDBKeyRange: options.IDBKeyRange
        };
        var addons = options.addons;
        this._dbSchema = {};
        this._versions = [];
        this._storeNames = [];
        this._allTables = {};
        this.idbdb = null;
        var state = {
            dbOpenError: null,
            isBeingOpened: false,
            onReadyBeingFired: null,
            openComplete: false,
            dbReadyResolve: nop,
            dbReadyPromise: null,
            cancelOpen: nop,
            openCanceller: null,
            autoSchema: true
        };
        state.dbReadyPromise = new DexiePromise(function (resolve) {
            state.dbReadyResolve = resolve;
        });
        state.openCanceller = new DexiePromise(function (_, reject) {
            state.cancelOpen = reject;
        });
        this._state = state;
        this.name = name;
        this.on = Events(this, "populate", "blocked", "versionchange", { ready: [promisableChain, nop] });
        this.on.ready.subscribe = override(this.on.ready.subscribe, function (subscribe) {
            return function (subscriber, bSticky) {
                Dexie.vip(function () {
                    var state = _this._state;
                    if (state.openComplete) {
                        if (!state.dbOpenError)
                            DexiePromise.resolve().then(subscriber);
                        if (bSticky)
                            subscribe(subscriber);
                    }
                    else if (state.onReadyBeingFired) {
                        state.onReadyBeingFired.push(subscriber);
                        if (bSticky)
                            subscribe(subscriber);
                    }
                    else {
                        subscribe(subscriber);
                        var db_1 = _this;
                        if (!bSticky)
                            subscribe(function unsubscribe() {
                                db_1.on.ready.unsubscribe(subscriber);
                                db_1.on.ready.unsubscribe(unsubscribe);
                            });
                    }
                });
            };
        });
        this.Collection = createCollectionConstructor(this);
        this.Table = createTableConstructor(this);
        this.Transaction = createTransactionConstructor(this);
        this.Version = createVersionConstructor(this);
        this.WhereClause = createWhereClauseConstructor(this);
        this.on("versionchange", function (ev) {
            if (ev.newVersion > 0)
                console.warn("Another connection wants to upgrade database '" + _this.name + "'. Closing db now to resume the upgrade.");
            else
                console.warn("Another connection wants to delete database '" + _this.name + "'. Closing db now to resume the delete request.");
            _this.close();
        });
        this.on("blocked", function (ev) {
            if (!ev.newVersion || ev.newVersion < ev.oldVersion)
                console.warn("Dexie.delete('" + _this.name + "') was blocked");
            else
                console.warn("Upgrade '" + _this.name + "' blocked by other connection holding version " + ev.oldVersion / 10);
        });
        this._maxKey = getMaxKey(options.IDBKeyRange);
        this._createTransaction = function (mode, storeNames, dbschema, parentTransaction) { return new _this.Transaction(mode, storeNames, dbschema, parentTransaction); };
        this._fireOnBlocked = function (ev) {
            _this.on("blocked").fire(ev);
            connections
                .filter(function (c) { return c.name === _this.name && c !== _this && !c._state.vcFired; })
                .map(function (c) { return c.on("versionchange").fire(ev); });
        };
        this.use(virtualIndexMiddleware);
        this.use(hooksMiddleware);
        addons.forEach(function (addon) { return addon(_this); });
    }
    Dexie.prototype.version = function (versionNumber) {
        if (isNaN(versionNumber) || versionNumber < 0.1)
            throw new exceptions.Type("Given version is not a positive number");
        versionNumber = Math.round(versionNumber * 10) / 10;
        if (this.idbdb || this._state.isBeingOpened)
            throw new exceptions.Schema("Cannot add version when database is open");
        this.verno = Math.max(this.verno, versionNumber);
        var versions = this._versions;
        var versionInstance = versions.filter(function (v) { return v._cfg.version === versionNumber; })[0];
        if (versionInstance)
            return versionInstance;
        versionInstance = new this.Version(versionNumber);
        versions.push(versionInstance);
        versions.sort(lowerVersionFirst);
        versionInstance.stores({});
        this._state.autoSchema = false;
        return versionInstance;
    };
    Dexie.prototype._whenReady = function (fn) {
        var _this = this;
        return this._state.openComplete || PSD.letThrough ? fn() : new DexiePromise(function (resolve, reject) {
            if (!_this._state.isBeingOpened) {
                if (!_this._options.autoOpen) {
                    reject(new exceptions.DatabaseClosed());
                    return;
                }
                _this.open().catch(nop);
            }
            _this._state.dbReadyPromise.then(resolve, reject);
        }).then(fn);
    };
    Dexie.prototype.use = function (_a) {
        var stack = _a.stack, create = _a.create, level = _a.level, name = _a.name;
        if (name)
            this.unuse({ stack: stack, name: name });
        var middlewares = this._middlewares[stack] || (this._middlewares[stack] = []);
        middlewares.push({ stack: stack, create: create, level: level == null ? 10 : level, name: name });
        middlewares.sort(function (a, b) { return a.level - b.level; });
        return this;
    };
    Dexie.prototype.unuse = function (_a) {
        var stack = _a.stack, name = _a.name, create = _a.create;
        if (stack && this._middlewares[stack]) {
            this._middlewares[stack] = this._middlewares[stack].filter(function (mw) {
                return create ? mw.create !== create :
                    name ? mw.name !== name :
                        false;
            });
        }
        return this;
    };
    Dexie.prototype.open = function () {
        return dexieOpen(this);
    };
    Dexie.prototype.close = function () {
        var idx = connections.indexOf(this), state = this._state;
        if (idx >= 0)
            connections.splice(idx, 1);
        if (this.idbdb) {
            try {
                this.idbdb.close();
            }
            catch (e) { }
            this.idbdb = null;
        }
        this._options.autoOpen = false;
        state.dbOpenError = new exceptions.DatabaseClosed();
        if (state.isBeingOpened)
            state.cancelOpen(state.dbOpenError);
        state.dbReadyPromise = new DexiePromise(function (resolve) {
            state.dbReadyResolve = resolve;
        });
        state.openCanceller = new DexiePromise(function (_, reject) {
            state.cancelOpen = reject;
        });
    };
    Dexie.prototype.delete = function () {
        var _this = this;
        var hasArguments = arguments.length > 0;
        var state = this._state;
        return new DexiePromise(function (resolve, reject) {
            var doDelete = function () {
                _this.close();
                var req = _this._deps.indexedDB.deleteDatabase(_this.name);
                req.onsuccess = wrap(function () {
                    databaseEnumerator.remove(_this.name);
                    resolve();
                });
                req.onerror = eventRejectHandler(reject);
                req.onblocked = _this._fireOnBlocked;
            };
            if (hasArguments)
                throw new exceptions.InvalidArgument("Arguments not allowed in db.delete()");
            if (state.isBeingOpened) {
                state.dbReadyPromise.then(doDelete);
            }
            else {
                doDelete();
            }
        });
    };
    Dexie.prototype.backendDB = function () {
        return this.idbdb;
    };
    Dexie.prototype.isOpen = function () {
        return this.idbdb !== null;
    };
    Dexie.prototype.hasBeenClosed = function () {
        var dbOpenError = this._state.dbOpenError;
        return dbOpenError && (dbOpenError.name === 'DatabaseClosed');
    };
    Dexie.prototype.hasFailed = function () {
        return this._state.dbOpenError !== null;
    };
    Dexie.prototype.dynamicallyOpened = function () {
        return this._state.autoSchema;
    };
    Object.defineProperty(Dexie.prototype, "tables", {
        get: function () {
            var _this = this;
            return keys(this._allTables).map(function (name) { return _this._allTables[name]; });
        },
        enumerable: true,
        configurable: true
    });
    Dexie.prototype.transaction = function () {
        var args = extractTransactionArgs.apply(this, arguments);
        return this._transaction.apply(this, args);
    };
    Dexie.prototype._transaction = function (mode, tables, scopeFunc) {
        var _this = this;
        var parentTransaction = PSD.trans;
        if (!parentTransaction || parentTransaction.db !== this || mode.indexOf('!') !== -1)
            parentTransaction = null;
        var onlyIfCompatible = mode.indexOf('?') !== -1;
        mode = mode.replace('!', '').replace('?', '');
        var idbMode, storeNames;
        try {
            storeNames = tables.map(function (table) {
                var storeName = table instanceof _this.Table ? table.name : table;
                if (typeof storeName !== 'string')
                    throw new TypeError("Invalid table argument to Dexie.transaction(). Only Table or String are allowed");
                return storeName;
            });
            if (mode == "r" || mode === READONLY)
                idbMode = READONLY;
            else if (mode == "rw" || mode == READWRITE)
                idbMode = READWRITE;
            else
                throw new exceptions.InvalidArgument("Invalid transaction mode: " + mode);
            if (parentTransaction) {
                if (parentTransaction.mode === READONLY && idbMode === READWRITE) {
                    if (onlyIfCompatible) {
                        parentTransaction = null;
                    }
                    else
                        throw new exceptions.SubTransaction("Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY");
                }
                if (parentTransaction) {
                    storeNames.forEach(function (storeName) {
                        if (parentTransaction && parentTransaction.storeNames.indexOf(storeName) === -1) {
                            if (onlyIfCompatible) {
                                parentTransaction = null;
                            }
                            else
                                throw new exceptions.SubTransaction("Table " + storeName +
                                    " not included in parent transaction.");
                        }
                    });
                }
                if (onlyIfCompatible && parentTransaction && !parentTransaction.active) {
                    parentTransaction = null;
                }
            }
        }
        catch (e) {
            return parentTransaction ?
                parentTransaction._promise(null, function (_, reject) { reject(e); }) :
                rejection(e);
        }
        var enterTransaction = enterTransactionScope.bind(null, this, idbMode, storeNames, parentTransaction, scopeFunc);
        return (parentTransaction ?
            parentTransaction._promise(idbMode, enterTransaction, "lock") :
            PSD.trans ?
                usePSD(PSD.transless, function () { return _this._whenReady(enterTransaction); }) :
                this._whenReady(enterTransaction));
    };
    Dexie.prototype.table = function (tableName) {
        if (!hasOwn(this._allTables, tableName)) {
            throw new exceptions.InvalidTable("Table " + tableName + " does not exist");
        }
        return this._allTables[tableName];
    };
    return Dexie;
}());

var Dexie$1 = Dexie;
props(Dexie$1, __assign(__assign({}, fullNameExceptions), {
    delete: function (databaseName) {
        var db = new Dexie$1(databaseName);
        return db.delete();
    },
    exists: function (name) {
        return new Dexie$1(name, { addons: [] }).open().then(function (db) {
            db.close();
            return true;
        }).catch('NoSuchDatabaseError', function () { return false; });
    },
    getDatabaseNames: function (cb) {
        return databaseEnumerator ?
            databaseEnumerator.getDatabaseNames().then(cb) :
            DexiePromise.resolve([]);
    },
    defineClass: function () {
        function Class(content) {
            extend(this, content);
        }
        return Class;
    },
    ignoreTransaction: function (scopeFunc) {
        return PSD.trans ?
            usePSD(PSD.transless, scopeFunc) :
            scopeFunc();
    },
    vip: vip, async: function (generatorFn) {
        return function () {
            try {
                var rv = awaitIterator(generatorFn.apply(this, arguments));
                if (!rv || typeof rv.then !== 'function')
                    return DexiePromise.resolve(rv);
                return rv;
            }
            catch (e) {
                return rejection(e);
            }
        };
    }, spawn: function (generatorFn, args, thiz) {
        try {
            var rv = awaitIterator(generatorFn.apply(thiz, args || []));
            if (!rv || typeof rv.then !== 'function')
                return DexiePromise.resolve(rv);
            return rv;
        }
        catch (e) {
            return rejection(e);
        }
    },
    currentTransaction: {
        get: function () { return PSD.trans || null; }
    }, waitFor: function (promiseOrFunction, optionalTimeout) {
        var promise = DexiePromise.resolve(typeof promiseOrFunction === 'function' ?
            Dexie$1.ignoreTransaction(promiseOrFunction) :
            promiseOrFunction)
            .timeout(optionalTimeout || 60000);
        return PSD.trans ?
            PSD.trans.waitFor(promise) :
            promise;
    },
    Promise: DexiePromise,
    debug: {
        get: function () { return debug; },
        set: function (value) {
            setDebug(value, value === 'dexie' ? function () { return true; } : dexieStackFrameFilter);
        }
    },
    derive: derive, extend: extend, props: props, override: override,
    Events: Events,
    getByKeyPath: getByKeyPath, setByKeyPath: setByKeyPath, delByKeyPath: delByKeyPath, shallowClone: shallowClone, deepClone: deepClone, getObjectDiff: getObjectDiff, asap: asap,
    minKey: minKey,
    addons: [],
    connections: connections,
    errnames: errnames,
    dependencies: (function () {
        try {
            return {
                indexedDB: _global.indexedDB || _global.mozIndexedDB || _global.webkitIndexedDB || _global.msIndexedDB,
                IDBKeyRange: _global.IDBKeyRange || _global.webkitIDBKeyRange
            };
        }
        catch (e) {
            return { indexedDB: null, IDBKeyRange: null };
        }
    })(),
    semVer: DEXIE_VERSION, version: DEXIE_VERSION.split('.')
        .map(function (n) { return parseInt(n); })
        .reduce(function (p, c, i) { return p + (c / Math.pow(10, i * 2)); }),
    default: Dexie$1,
    Dexie: Dexie$1 }));
Dexie$1.maxKey = getMaxKey(Dexie$1.dependencies.IDBKeyRange);

initDatabaseEnumerator(Dexie.dependencies.indexedDB);
DexiePromise.rejectionMapper = mapError;
setDebug(debug, dexieStackFrameFilter);

/* harmony default export */ __webpack_exports__["default"] = (Dexie);
//# sourceMappingURL=dexie.mjs.map


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CashedService = void 0;
const config_1 = __webpack_require__(4);
//import * as bchrpcModule from "grpc-bchrpc-browser"
const bchrpc = __importStar(__webpack_require__(5));
class CashedService {
    constructor({ db, client }) {
        this.client = client;
        this.db = db;
    }
    // initially populates a database
    bootstrap() {
        return __awaiter(this, void 0, void 0, function* () {
            let blockInfoPromises = config_1.checkpoints.map((p) => {
                return this.client.getBlockInfo({ hash: bchrpc.hexToU8(p.hashHex).reverse() });
            });
            return Promise.all(blockInfoPromises).then((blockInfos) => {
                let blocks = blockInfos.map(i => i.getInfo().toObject());
                return blocks;
            }).then((blocks) => {
                return this.bulkPutBlocksAsTransaction(blocks);
            });
        });
    }
    // bulkPut an array of blocks and return the current local tip in the same transaction
    bulkPutBlocksAsTransaction(blocks) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.transaction("rw", this.db.block, () => {
                console.log("Putting " + blocks.length + " blocks in db in bulk");
                return this.db.block.bulkPut(blocks);
            }).then((n) => {
                return this.db.block.orderBy('height').reverse().first();
            }).then((block) => {
                if (block) {
                    return Promise.resolve(block.height);
                }
                else {
                    throw new Error("no block returned during bootstrap");
                }
            });
        });
    }
    // syncs a database, 
    sync() {
        return __awaiter(this, void 0, void 0, function* () {
            let bestBlockHeight = (yield this.client.getBlockchainInfo({})).getBestHeight();
            console.log("current network height: " + bestBlockHeight);
            let currentTip = (yield this.getTip());
            let blockHeaderWatchdogLimit = 765; // 2038-01
            for (var watchdog = 0; bestBlockHeight > currentTip && watchdog < blockHeaderWatchdogLimit; watchdog++) {
                const locatorHashes = yield this.getLocatorHashes(currentTip);
                const res = yield this.client.getHeaders({ blockLocatorHashes: locatorHashes });
                let blocks = (res.getHeadersList()).map(x => x.toObject());
                currentTip = (yield this.bulkPutBlocksAsTransaction(blocks));
                console.log("  new chaintip " + currentTip);
            }
            return (currentTip == bestBlockHeight);
        });
    }
    subscribe() {
        return __awaiter(this, void 0, void 0, function* () {
            this.subscribeBlocks();
        });
    }
    reorg() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    update() {
    }
    /*
    *    Get a sparse list of block heights, starting from the currently known local tip,
    *    getting sparser back to genisis block.
    */
    getLocatorHeights(localTip) {
        let step = 1;
        let bucket = 10;
        let cursor = localTip;
        let heightLocators = [];
        if (cursor > 0) {
            for (var watchdog = 0; cursor > 0 && watchdog < 20; watchdog++) {
                heightLocators.push.apply(heightLocators, [...Array(bucket).keys()].map(x => cursor - x * step));
                cursor -= step * bucket;
                step *= 10;
            }
            // remove heights prior to the highest checkpoint
            let lastCheckpointHeight = config_1.checkpoints[config_1.checkpoints.length - 1].height;
            heightLocators = heightLocators.filter(h => h > lastCheckpointHeight);
            Array.from(config_1.checkpoints).reverse().map(c => {
                heightLocators.push(c.height);
            });
            return heightLocators;
        }
        // if there was no block tip locally, just return an empty list.
        return [];
    }
    unsubscribeBlocks() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Canceling block subscription... ");
            yield this.blockStream.cancel();
            console.log("block subscription canceled");
        });
    }
    subscribeBlocks() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Subscribing to unconfirmed transactions... ");
            this.blockStream = yield this.client.subscribeBlocks({
                includeSerializedBlock: false,
                includeTxnData: false,
                includeTxnHashes: false
            });
            this.blockStream.on('data', function (blockNotification) {
                console.log(blockNotification.getType());
                console.log(blockNotification.getBlockCase());
                const bInfo = blockNotification.getBlockInfo();
                console.log(bInfo === null || bInfo === void 0 ? void 0 : bInfo.getVersion());
                console.log(bInfo === null || bInfo === void 0 ? void 0 : bInfo.getPreviousBlock_asB64());
                console.log(bInfo === null || bInfo === void 0 ? void 0 : bInfo.getMerkleRoot_asB64());
                console.log(bInfo === null || bInfo === void 0 ? void 0 : bInfo.getTimestamp());
                console.log(bInfo === null || bInfo === void 0 ? void 0 : bInfo.getBits());
                console.log(bInfo === null || bInfo === void 0 ? void 0 : bInfo.getNonce());
            });
            this.blockStream.on('status', function (status) {
                console.log(status);
            });
            this.blockStream.on('error', (err) => {
                console.log('Error code: ' + err.code + ' "' + err.message + '"');
            });
            this.blockStream.on('end', function () {
                console.log('stream end signal received');
            });
        });
    }
    getLocatorHashes(localTip) {
        let locatorHeights = this.getLocatorHeights(localTip);
        // There block database was empty, so an pre-genesis block hash is passed
        if (locatorHeights.length == 0) {
            return Promise.resolve(["AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="]);
        }
        // Only one block height was returned (1) so we return a promise to it as a list
        else if (locatorHeights.length == 1) {
            return this.getHashFromHeight(locatorHeights[0]).then((locatorHash) => {
                return Promise.resolve([locatorHash]);
            });
        }
        else {
            // This is the expected case where heights were built.
            let locatorHashPromises = (locatorHeights.map(h => (this.getHashFromHeight(h))));
            return Promise.all(locatorHashPromises);
        }
    }
    getHashFromHeight(height) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.db.block.get({ 'height': height }).then((block) => {
                if (block) {
                    return block.hash;
                }
                else {
                    throw new Error("attempted to get a block height not stored locally");
                }
            });
        });
    }
    getTip() {
        return this.db.block.orderBy('height').reverse().first().then((block) => {
            return block ? block.height : Promise.resolve(0);
        });
    }
}
exports.CashedService = CashedService;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.checkpoints = void 0;
exports.checkpoints = [
    { height: 1, hashHex: "00000000839a8e6886ab5951d76f411475428afc90947ee320161bbf18eb6048" },
    { height: 11111, hashHex: "0000000069e244f73d78e8fd29ba2fd2ed618bd6fa2ee92559f542fdb26e7c1d" },
    { height: 33333, hashHex: "000000002dd5588a74784eaa7ab0507a18ad16a236e7b1ce69f00d7ddfb5d0a6" },
    { height: 74000, hashHex: "0000000000573993a3c9e41ce34471c079dcf5f52a0e824a81e7f953b8661a20" },
    { height: 105000, hashHex: "00000000000291ce28027faea320c8d2b054b2e0fe44a773f3eefb151d6bdc97" },
    { height: 134444, hashHex: "00000000000005b12ffd4cd315cd34ffd4a594f430ac814c91184a0d42d2b0fe" },
    { height: 168000, hashHex: "000000000000099e61ea72015e79632f216fe6cb33d7899acb35b75c8303b763" },
    { height: 193000, hashHex: "000000000000059f452a5f7340de6682a977387c17010ff6e6c3bd83ca8b1317" },
    { height: 210000, hashHex: "000000000000048b95347e83192f69cf0366076336c639f9b7228e9ba171342e" },
    { height: 216116, hashHex: "00000000000001b4f4b433e81ee46494af945cf96014816a4e2370f11b23df4e" },
    { height: 225430, hashHex: "00000000000001c108384350f74090433e7fcf79a606b8e797f065b130575932" },
    { height: 250000, hashHex: "000000000000003887df1f29024b06fc2200b55f8af8f35453d7be294df2d214" },
    { height: 267300, hashHex: "000000000000000a83fbd660e918f218bf37edd92b748ad940483c7c116179ac" },
    { height: 279000, hashHex: "0000000000000001ae8c72a0b0c301f67e3afca10e819efa9041e458e9bd7e40" },
    { height: 300255, hashHex: "0000000000000000162804527c6e9b9f0563a280525f9d08c12041def0a0f3b2" },
    { height: 319400, hashHex: "000000000000000021c6052e9becade189495d1c539aa37c58917305fd15f13b" },
    { height: 343185, hashHex: "0000000000000000072b8bf361d01a6ba7d445dd024203fafc78768ed4368554" },
    { height: 352940, hashHex: "000000000000000010755df42dba556bb72be6a32f3ce0b6941ce4430152c9ff" },
    { height: 382320, hashHex: "00000000000000000a8dc6ed5b133d0eb2fd6af56203e4159789b092defd8ab2" },
    { height: 400000, hashHex: "000000000000000004ec466ce4732fe6f1ed1cddc2ed4b328fff5224276e3f6f" },
    { height: 430000, hashHex: "000000000000000001868b2bb3a285f3cc6b33ea234eb70facf4dcdf22186b87" },
    { height: 470000, hashHex: "0000000000000000006c539c722e280a0769abd510af0073430159d71e6d7589" },
    { height: 510000, hashHex: "00000000000000000367922b6457e21d591ef86b360d78a598b14c2f1f6b0e04" },
    { height: 552979, hashHex: "0000000000000000015648768ac1b788a83187d706f858919fcc5c096b76fbf2" },
    { height: 556767, hashHex: "0000000000000000004626ff6e3b936941d341c5932ece4357eeccac44e6d56c" },
    { height: 582680, hashHex: "000000000000000001b4b8e36aec7d4f9671a47872cb9a74dc16ca398c7dcc18" },
    { height: 609136, hashHex: "000000000000000000b48bb207faac5ac655c313e41ac909322eaa694f5bc5b1" },
    { height: 635259, hashHex: "00000000000000000033dfef1fc2d6a5d5520b078c55193a9bf498c5b27530f7" }
];


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(__webpack_require__(6), exports);
__exportStar(__webpack_require__(13), exports);
var client_1 = __webpack_require__(15);
Object.defineProperty(exports, "GrpcClient", { enumerable: true, get: function () { return client_1.default; } });
__exportStar(__webpack_require__(16), exports);
__exportStar(__webpack_require__(17), exports);


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

// source: bchrpc.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = __webpack_require__(7);
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.pb.Block', null, global);
goog.exportSymbol('proto.pb.Block.TransactionData', null, global);
goog.exportSymbol('proto.pb.Block.TransactionData.TxidsOrTxsCase', null, global);
goog.exportSymbol('proto.pb.BlockInfo', null, global);
goog.exportSymbol('proto.pb.BlockNotification', null, global);
goog.exportSymbol('proto.pb.BlockNotification.BlockCase', null, global);
goog.exportSymbol('proto.pb.BlockNotification.Type', null, global);
goog.exportSymbol('proto.pb.GetAddressTransactionsRequest', null, global);
goog.exportSymbol('proto.pb.GetAddressTransactionsRequest.StartBlockCase', null, global);
goog.exportSymbol('proto.pb.GetAddressTransactionsResponse', null, global);
goog.exportSymbol('proto.pb.GetAddressUnspentOutputsRequest', null, global);
goog.exportSymbol('proto.pb.GetAddressUnspentOutputsResponse', null, global);
goog.exportSymbol('proto.pb.GetBlockFilterRequest', null, global);
goog.exportSymbol('proto.pb.GetBlockFilterRequest.HashOrHeightCase', null, global);
goog.exportSymbol('proto.pb.GetBlockFilterResponse', null, global);
goog.exportSymbol('proto.pb.GetBlockInfoRequest', null, global);
goog.exportSymbol('proto.pb.GetBlockInfoRequest.HashOrHeightCase', null, global);
goog.exportSymbol('proto.pb.GetBlockInfoResponse', null, global);
goog.exportSymbol('proto.pb.GetBlockRequest', null, global);
goog.exportSymbol('proto.pb.GetBlockRequest.HashOrHeightCase', null, global);
goog.exportSymbol('proto.pb.GetBlockResponse', null, global);
goog.exportSymbol('proto.pb.GetBlockchainInfoRequest', null, global);
goog.exportSymbol('proto.pb.GetBlockchainInfoResponse', null, global);
goog.exportSymbol('proto.pb.GetBlockchainInfoResponse.BitcoinNet', null, global);
goog.exportSymbol('proto.pb.GetHeadersRequest', null, global);
goog.exportSymbol('proto.pb.GetHeadersResponse', null, global);
goog.exportSymbol('proto.pb.GetMempoolInfoRequest', null, global);
goog.exportSymbol('proto.pb.GetMempoolInfoResponse', null, global);
goog.exportSymbol('proto.pb.GetMempoolRequest', null, global);
goog.exportSymbol('proto.pb.GetMempoolResponse', null, global);
goog.exportSymbol('proto.pb.GetMempoolResponse.TransactionData', null, global);
goog.exportSymbol('proto.pb.GetMempoolResponse.TransactionData.TxidsOrTxsCase', null, global);
goog.exportSymbol('proto.pb.GetMerkleProofRequest', null, global);
goog.exportSymbol('proto.pb.GetMerkleProofResponse', null, global);
goog.exportSymbol('proto.pb.GetRawAddressTransactionsRequest', null, global);
goog.exportSymbol('proto.pb.GetRawAddressTransactionsRequest.StartBlockCase', null, global);
goog.exportSymbol('proto.pb.GetRawAddressTransactionsResponse', null, global);
goog.exportSymbol('proto.pb.GetRawBlockRequest', null, global);
goog.exportSymbol('proto.pb.GetRawBlockRequest.HashOrHeightCase', null, global);
goog.exportSymbol('proto.pb.GetRawBlockResponse', null, global);
goog.exportSymbol('proto.pb.GetRawTransactionRequest', null, global);
goog.exportSymbol('proto.pb.GetRawTransactionResponse', null, global);
goog.exportSymbol('proto.pb.GetTransactionRequest', null, global);
goog.exportSymbol('proto.pb.GetTransactionResponse', null, global);
goog.exportSymbol('proto.pb.GetUnspentOutputRequest', null, global);
goog.exportSymbol('proto.pb.GetUnspentOutputResponse', null, global);
goog.exportSymbol('proto.pb.MempoolTransaction', null, global);
goog.exportSymbol('proto.pb.SubmitTransactionRequest', null, global);
goog.exportSymbol('proto.pb.SubmitTransactionResponse', null, global);
goog.exportSymbol('proto.pb.SubscribeBlocksRequest', null, global);
goog.exportSymbol('proto.pb.SubscribeTransactionsRequest', null, global);
goog.exportSymbol('proto.pb.Transaction', null, global);
goog.exportSymbol('proto.pb.Transaction.Input', null, global);
goog.exportSymbol('proto.pb.Transaction.Input.Outpoint', null, global);
goog.exportSymbol('proto.pb.Transaction.Output', null, global);
goog.exportSymbol('proto.pb.TransactionFilter', null, global);
goog.exportSymbol('proto.pb.TransactionNotification', null, global);
goog.exportSymbol('proto.pb.TransactionNotification.TransactionCase', null, global);
goog.exportSymbol('proto.pb.TransactionNotification.Type', null, global);
goog.exportSymbol('proto.pb.UnspentOutput', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.GetMempoolInfoRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.pb.GetMempoolInfoRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.GetMempoolInfoRequest.displayName = 'proto.pb.GetMempoolInfoRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.GetMempoolInfoResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.pb.GetMempoolInfoResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.GetMempoolInfoResponse.displayName = 'proto.pb.GetMempoolInfoResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.GetMempoolRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.pb.GetMempoolRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.GetMempoolRequest.displayName = 'proto.pb.GetMempoolRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.GetMempoolResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.pb.GetMempoolResponse.repeatedFields_, null);
};
goog.inherits(proto.pb.GetMempoolResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.GetMempoolResponse.displayName = 'proto.pb.GetMempoolResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.GetMempoolResponse.TransactionData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.pb.GetMempoolResponse.TransactionData.oneofGroups_);
};
goog.inherits(proto.pb.GetMempoolResponse.TransactionData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.GetMempoolResponse.TransactionData.displayName = 'proto.pb.GetMempoolResponse.TransactionData';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.GetBlockchainInfoRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.pb.GetBlockchainInfoRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.GetBlockchainInfoRequest.displayName = 'proto.pb.GetBlockchainInfoRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.GetBlockchainInfoResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.pb.GetBlockchainInfoResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.GetBlockchainInfoResponse.displayName = 'proto.pb.GetBlockchainInfoResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.GetBlockInfoRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.pb.GetBlockInfoRequest.oneofGroups_);
};
goog.inherits(proto.pb.GetBlockInfoRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.GetBlockInfoRequest.displayName = 'proto.pb.GetBlockInfoRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.GetBlockInfoResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.pb.GetBlockInfoResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.GetBlockInfoResponse.displayName = 'proto.pb.GetBlockInfoResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.GetBlockRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.pb.GetBlockRequest.oneofGroups_);
};
goog.inherits(proto.pb.GetBlockRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.GetBlockRequest.displayName = 'proto.pb.GetBlockRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.GetBlockResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.pb.GetBlockResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.GetBlockResponse.displayName = 'proto.pb.GetBlockResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.GetRawBlockRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.pb.GetRawBlockRequest.oneofGroups_);
};
goog.inherits(proto.pb.GetRawBlockRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.GetRawBlockRequest.displayName = 'proto.pb.GetRawBlockRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.GetRawBlockResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.pb.GetRawBlockResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.GetRawBlockResponse.displayName = 'proto.pb.GetRawBlockResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.GetBlockFilterRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.pb.GetBlockFilterRequest.oneofGroups_);
};
goog.inherits(proto.pb.GetBlockFilterRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.GetBlockFilterRequest.displayName = 'proto.pb.GetBlockFilterRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.GetBlockFilterResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.pb.GetBlockFilterResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.GetBlockFilterResponse.displayName = 'proto.pb.GetBlockFilterResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.GetHeadersRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.pb.GetHeadersRequest.repeatedFields_, null);
};
goog.inherits(proto.pb.GetHeadersRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.GetHeadersRequest.displayName = 'proto.pb.GetHeadersRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.GetHeadersResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.pb.GetHeadersResponse.repeatedFields_, null);
};
goog.inherits(proto.pb.GetHeadersResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.GetHeadersResponse.displayName = 'proto.pb.GetHeadersResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.GetTransactionRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.pb.GetTransactionRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.GetTransactionRequest.displayName = 'proto.pb.GetTransactionRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.GetTransactionResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.pb.GetTransactionResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.GetTransactionResponse.displayName = 'proto.pb.GetTransactionResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.GetRawTransactionRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.pb.GetRawTransactionRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.GetRawTransactionRequest.displayName = 'proto.pb.GetRawTransactionRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.GetRawTransactionResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.pb.GetRawTransactionResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.GetRawTransactionResponse.displayName = 'proto.pb.GetRawTransactionResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.GetAddressTransactionsRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.pb.GetAddressTransactionsRequest.oneofGroups_);
};
goog.inherits(proto.pb.GetAddressTransactionsRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.GetAddressTransactionsRequest.displayName = 'proto.pb.GetAddressTransactionsRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.GetAddressTransactionsResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.pb.GetAddressTransactionsResponse.repeatedFields_, null);
};
goog.inherits(proto.pb.GetAddressTransactionsResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.GetAddressTransactionsResponse.displayName = 'proto.pb.GetAddressTransactionsResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.GetRawAddressTransactionsRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.pb.GetRawAddressTransactionsRequest.oneofGroups_);
};
goog.inherits(proto.pb.GetRawAddressTransactionsRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.GetRawAddressTransactionsRequest.displayName = 'proto.pb.GetRawAddressTransactionsRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.GetRawAddressTransactionsResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.pb.GetRawAddressTransactionsResponse.repeatedFields_, null);
};
goog.inherits(proto.pb.GetRawAddressTransactionsResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.GetRawAddressTransactionsResponse.displayName = 'proto.pb.GetRawAddressTransactionsResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.GetAddressUnspentOutputsRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.pb.GetAddressUnspentOutputsRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.GetAddressUnspentOutputsRequest.displayName = 'proto.pb.GetAddressUnspentOutputsRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.GetAddressUnspentOutputsResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.pb.GetAddressUnspentOutputsResponse.repeatedFields_, null);
};
goog.inherits(proto.pb.GetAddressUnspentOutputsResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.GetAddressUnspentOutputsResponse.displayName = 'proto.pb.GetAddressUnspentOutputsResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.GetUnspentOutputRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.pb.GetUnspentOutputRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.GetUnspentOutputRequest.displayName = 'proto.pb.GetUnspentOutputRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.GetUnspentOutputResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.pb.GetUnspentOutputResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.GetUnspentOutputResponse.displayName = 'proto.pb.GetUnspentOutputResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.GetMerkleProofRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.pb.GetMerkleProofRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.GetMerkleProofRequest.displayName = 'proto.pb.GetMerkleProofRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.GetMerkleProofResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.pb.GetMerkleProofResponse.repeatedFields_, null);
};
goog.inherits(proto.pb.GetMerkleProofResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.GetMerkleProofResponse.displayName = 'proto.pb.GetMerkleProofResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.SubmitTransactionRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.pb.SubmitTransactionRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.SubmitTransactionRequest.displayName = 'proto.pb.SubmitTransactionRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.SubmitTransactionResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.pb.SubmitTransactionResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.SubmitTransactionResponse.displayName = 'proto.pb.SubmitTransactionResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.SubscribeTransactionsRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.pb.SubscribeTransactionsRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.SubscribeTransactionsRequest.displayName = 'proto.pb.SubscribeTransactionsRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.SubscribeBlocksRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.pb.SubscribeBlocksRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.SubscribeBlocksRequest.displayName = 'proto.pb.SubscribeBlocksRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.BlockNotification = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.pb.BlockNotification.oneofGroups_);
};
goog.inherits(proto.pb.BlockNotification, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.BlockNotification.displayName = 'proto.pb.BlockNotification';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.TransactionNotification = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.pb.TransactionNotification.oneofGroups_);
};
goog.inherits(proto.pb.TransactionNotification, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.TransactionNotification.displayName = 'proto.pb.TransactionNotification';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.BlockInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.pb.BlockInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.BlockInfo.displayName = 'proto.pb.BlockInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.Block = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.pb.Block.repeatedFields_, null);
};
goog.inherits(proto.pb.Block, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.Block.displayName = 'proto.pb.Block';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.Block.TransactionData = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.pb.Block.TransactionData.oneofGroups_);
};
goog.inherits(proto.pb.Block.TransactionData, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.Block.TransactionData.displayName = 'proto.pb.Block.TransactionData';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.Transaction = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.pb.Transaction.repeatedFields_, null);
};
goog.inherits(proto.pb.Transaction, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.Transaction.displayName = 'proto.pb.Transaction';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.Transaction.Input = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.pb.Transaction.Input, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.Transaction.Input.displayName = 'proto.pb.Transaction.Input';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.Transaction.Input.Outpoint = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.pb.Transaction.Input.Outpoint, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.Transaction.Input.Outpoint.displayName = 'proto.pb.Transaction.Input.Outpoint';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.Transaction.Output = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.pb.Transaction.Output, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.Transaction.Output.displayName = 'proto.pb.Transaction.Output';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.MempoolTransaction = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.pb.MempoolTransaction, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.MempoolTransaction.displayName = 'proto.pb.MempoolTransaction';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.UnspentOutput = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.pb.UnspentOutput, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.UnspentOutput.displayName = 'proto.pb.UnspentOutput';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.pb.TransactionFilter = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.pb.TransactionFilter.repeatedFields_, null);
};
goog.inherits(proto.pb.TransactionFilter, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.pb.TransactionFilter.displayName = 'proto.pb.TransactionFilter';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.GetMempoolInfoRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.GetMempoolInfoRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.GetMempoolInfoRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetMempoolInfoRequest.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.GetMempoolInfoRequest}
 */
proto.pb.GetMempoolInfoRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.GetMempoolInfoRequest;
  return proto.pb.GetMempoolInfoRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.GetMempoolInfoRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.GetMempoolInfoRequest}
 */
proto.pb.GetMempoolInfoRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.GetMempoolInfoRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.GetMempoolInfoRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.GetMempoolInfoRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetMempoolInfoRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.GetMempoolInfoResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.GetMempoolInfoResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.GetMempoolInfoResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetMempoolInfoResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    size: jspb.Message.getFieldWithDefault(msg, 1, 0),
    bytes: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.GetMempoolInfoResponse}
 */
proto.pb.GetMempoolInfoResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.GetMempoolInfoResponse;
  return proto.pb.GetMempoolInfoResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.GetMempoolInfoResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.GetMempoolInfoResponse}
 */
proto.pb.GetMempoolInfoResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setSize(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setBytes(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.GetMempoolInfoResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.GetMempoolInfoResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.GetMempoolInfoResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetMempoolInfoResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSize();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = message.getBytes();
  if (f !== 0) {
    writer.writeUint32(
      2,
      f
    );
  }
};


/**
 * optional uint32 size = 1;
 * @return {number}
 */
proto.pb.GetMempoolInfoResponse.prototype.getSize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.pb.GetMempoolInfoResponse} returns this
 */
proto.pb.GetMempoolInfoResponse.prototype.setSize = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional uint32 bytes = 2;
 * @return {number}
 */
proto.pb.GetMempoolInfoResponse.prototype.getBytes = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.pb.GetMempoolInfoResponse} returns this
 */
proto.pb.GetMempoolInfoResponse.prototype.setBytes = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.GetMempoolRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.GetMempoolRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.GetMempoolRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetMempoolRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    fullTransactions: jspb.Message.getBooleanFieldWithDefault(msg, 1, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.GetMempoolRequest}
 */
proto.pb.GetMempoolRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.GetMempoolRequest;
  return proto.pb.GetMempoolRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.GetMempoolRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.GetMempoolRequest}
 */
proto.pb.GetMempoolRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setFullTransactions(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.GetMempoolRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.GetMempoolRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.GetMempoolRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetMempoolRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFullTransactions();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
};


/**
 * optional bool full_transactions = 1;
 * @return {boolean}
 */
proto.pb.GetMempoolRequest.prototype.getFullTransactions = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.pb.GetMempoolRequest} returns this
 */
proto.pb.GetMempoolRequest.prototype.setFullTransactions = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.pb.GetMempoolResponse.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.GetMempoolResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.GetMempoolResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.GetMempoolResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetMempoolResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    transactionDataList: jspb.Message.toObjectList(msg.getTransactionDataList(),
    proto.pb.GetMempoolResponse.TransactionData.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.GetMempoolResponse}
 */
proto.pb.GetMempoolResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.GetMempoolResponse;
  return proto.pb.GetMempoolResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.GetMempoolResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.GetMempoolResponse}
 */
proto.pb.GetMempoolResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.pb.GetMempoolResponse.TransactionData;
      reader.readMessage(value,proto.pb.GetMempoolResponse.TransactionData.deserializeBinaryFromReader);
      msg.addTransactionData(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.GetMempoolResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.GetMempoolResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.GetMempoolResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetMempoolResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTransactionDataList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.pb.GetMempoolResponse.TransactionData.serializeBinaryToWriter
    );
  }
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.pb.GetMempoolResponse.TransactionData.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.pb.GetMempoolResponse.TransactionData.TxidsOrTxsCase = {
  TXIDS_OR_TXS_NOT_SET: 0,
  TRANSACTION_HASH: 1,
  TRANSACTION: 2
};

/**
 * @return {proto.pb.GetMempoolResponse.TransactionData.TxidsOrTxsCase}
 */
proto.pb.GetMempoolResponse.TransactionData.prototype.getTxidsOrTxsCase = function() {
  return /** @type {proto.pb.GetMempoolResponse.TransactionData.TxidsOrTxsCase} */(jspb.Message.computeOneofCase(this, proto.pb.GetMempoolResponse.TransactionData.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.GetMempoolResponse.TransactionData.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.GetMempoolResponse.TransactionData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.GetMempoolResponse.TransactionData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetMempoolResponse.TransactionData.toObject = function(includeInstance, msg) {
  var f, obj = {
    transactionHash: msg.getTransactionHash_asB64(),
    transaction: (f = msg.getTransaction()) && proto.pb.Transaction.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.GetMempoolResponse.TransactionData}
 */
proto.pb.GetMempoolResponse.TransactionData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.GetMempoolResponse.TransactionData;
  return proto.pb.GetMempoolResponse.TransactionData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.GetMempoolResponse.TransactionData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.GetMempoolResponse.TransactionData}
 */
proto.pb.GetMempoolResponse.TransactionData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setTransactionHash(value);
      break;
    case 2:
      var value = new proto.pb.Transaction;
      reader.readMessage(value,proto.pb.Transaction.deserializeBinaryFromReader);
      msg.setTransaction(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.GetMempoolResponse.TransactionData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.GetMempoolResponse.TransactionData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.GetMempoolResponse.TransactionData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetMempoolResponse.TransactionData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {!(string|Uint8Array)} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getTransaction();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.pb.Transaction.serializeBinaryToWriter
    );
  }
};


/**
 * optional bytes transaction_hash = 1;
 * @return {!(string|Uint8Array)}
 */
proto.pb.GetMempoolResponse.TransactionData.prototype.getTransactionHash = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes transaction_hash = 1;
 * This is a type-conversion wrapper around `getTransactionHash()`
 * @return {string}
 */
proto.pb.GetMempoolResponse.TransactionData.prototype.getTransactionHash_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getTransactionHash()));
};


/**
 * optional bytes transaction_hash = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getTransactionHash()`
 * @return {!Uint8Array}
 */
proto.pb.GetMempoolResponse.TransactionData.prototype.getTransactionHash_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getTransactionHash()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.pb.GetMempoolResponse.TransactionData} returns this
 */
proto.pb.GetMempoolResponse.TransactionData.prototype.setTransactionHash = function(value) {
  return jspb.Message.setOneofField(this, 1, proto.pb.GetMempoolResponse.TransactionData.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.pb.GetMempoolResponse.TransactionData} returns this
 */
proto.pb.GetMempoolResponse.TransactionData.prototype.clearTransactionHash = function() {
  return jspb.Message.setOneofField(this, 1, proto.pb.GetMempoolResponse.TransactionData.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.pb.GetMempoolResponse.TransactionData.prototype.hasTransactionHash = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Transaction transaction = 2;
 * @return {?proto.pb.Transaction}
 */
proto.pb.GetMempoolResponse.TransactionData.prototype.getTransaction = function() {
  return /** @type{?proto.pb.Transaction} */ (
    jspb.Message.getWrapperField(this, proto.pb.Transaction, 2));
};


/**
 * @param {?proto.pb.Transaction|undefined} value
 * @return {!proto.pb.GetMempoolResponse.TransactionData} returns this
*/
proto.pb.GetMempoolResponse.TransactionData.prototype.setTransaction = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.pb.GetMempoolResponse.TransactionData.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.pb.GetMempoolResponse.TransactionData} returns this
 */
proto.pb.GetMempoolResponse.TransactionData.prototype.clearTransaction = function() {
  return this.setTransaction(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.pb.GetMempoolResponse.TransactionData.prototype.hasTransaction = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * repeated TransactionData transaction_data = 1;
 * @return {!Array<!proto.pb.GetMempoolResponse.TransactionData>}
 */
proto.pb.GetMempoolResponse.prototype.getTransactionDataList = function() {
  return /** @type{!Array<!proto.pb.GetMempoolResponse.TransactionData>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.pb.GetMempoolResponse.TransactionData, 1));
};


/**
 * @param {!Array<!proto.pb.GetMempoolResponse.TransactionData>} value
 * @return {!proto.pb.GetMempoolResponse} returns this
*/
proto.pb.GetMempoolResponse.prototype.setTransactionDataList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.pb.GetMempoolResponse.TransactionData=} opt_value
 * @param {number=} opt_index
 * @return {!proto.pb.GetMempoolResponse.TransactionData}
 */
proto.pb.GetMempoolResponse.prototype.addTransactionData = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.pb.GetMempoolResponse.TransactionData, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.pb.GetMempoolResponse} returns this
 */
proto.pb.GetMempoolResponse.prototype.clearTransactionDataList = function() {
  return this.setTransactionDataList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.GetBlockchainInfoRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.GetBlockchainInfoRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.GetBlockchainInfoRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetBlockchainInfoRequest.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.GetBlockchainInfoRequest}
 */
proto.pb.GetBlockchainInfoRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.GetBlockchainInfoRequest;
  return proto.pb.GetBlockchainInfoRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.GetBlockchainInfoRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.GetBlockchainInfoRequest}
 */
proto.pb.GetBlockchainInfoRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.GetBlockchainInfoRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.GetBlockchainInfoRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.GetBlockchainInfoRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetBlockchainInfoRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.GetBlockchainInfoResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.GetBlockchainInfoResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.GetBlockchainInfoResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetBlockchainInfoResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    bitcoinNet: jspb.Message.getFieldWithDefault(msg, 1, 0),
    bestHeight: jspb.Message.getFieldWithDefault(msg, 2, 0),
    bestBlockHash: msg.getBestBlockHash_asB64(),
    difficulty: jspb.Message.getFloatingPointFieldWithDefault(msg, 4, 0.0),
    medianTime: jspb.Message.getFieldWithDefault(msg, 5, 0),
    txIndex: jspb.Message.getBooleanFieldWithDefault(msg, 6, false),
    addrIndex: jspb.Message.getBooleanFieldWithDefault(msg, 7, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.GetBlockchainInfoResponse}
 */
proto.pb.GetBlockchainInfoResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.GetBlockchainInfoResponse;
  return proto.pb.GetBlockchainInfoResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.GetBlockchainInfoResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.GetBlockchainInfoResponse}
 */
proto.pb.GetBlockchainInfoResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.pb.GetBlockchainInfoResponse.BitcoinNet} */ (reader.readEnum());
      msg.setBitcoinNet(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setBestHeight(value);
      break;
    case 3:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setBestBlockHash(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setDifficulty(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setMedianTime(value);
      break;
    case 6:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setTxIndex(value);
      break;
    case 7:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setAddrIndex(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.GetBlockchainInfoResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.GetBlockchainInfoResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.GetBlockchainInfoResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetBlockchainInfoResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getBitcoinNet();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getBestHeight();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getBestBlockHash_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      3,
      f
    );
  }
  f = message.getDifficulty();
  if (f !== 0.0) {
    writer.writeDouble(
      4,
      f
    );
  }
  f = message.getMedianTime();
  if (f !== 0) {
    writer.writeInt64(
      5,
      f
    );
  }
  f = message.getTxIndex();
  if (f) {
    writer.writeBool(
      6,
      f
    );
  }
  f = message.getAddrIndex();
  if (f) {
    writer.writeBool(
      7,
      f
    );
  }
};


/**
 * @enum {number}
 */
proto.pb.GetBlockchainInfoResponse.BitcoinNet = {
  MAINNET: 0,
  REGTEST: 1,
  TESTNET3: 2,
  SIMNET: 3
};

/**
 * optional BitcoinNet bitcoin_net = 1;
 * @return {!proto.pb.GetBlockchainInfoResponse.BitcoinNet}
 */
proto.pb.GetBlockchainInfoResponse.prototype.getBitcoinNet = function() {
  return /** @type {!proto.pb.GetBlockchainInfoResponse.BitcoinNet} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.pb.GetBlockchainInfoResponse.BitcoinNet} value
 * @return {!proto.pb.GetBlockchainInfoResponse} returns this
 */
proto.pb.GetBlockchainInfoResponse.prototype.setBitcoinNet = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional int32 best_height = 2;
 * @return {number}
 */
proto.pb.GetBlockchainInfoResponse.prototype.getBestHeight = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.pb.GetBlockchainInfoResponse} returns this
 */
proto.pb.GetBlockchainInfoResponse.prototype.setBestHeight = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional bytes best_block_hash = 3;
 * @return {!(string|Uint8Array)}
 */
proto.pb.GetBlockchainInfoResponse.prototype.getBestBlockHash = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * optional bytes best_block_hash = 3;
 * This is a type-conversion wrapper around `getBestBlockHash()`
 * @return {string}
 */
proto.pb.GetBlockchainInfoResponse.prototype.getBestBlockHash_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getBestBlockHash()));
};


/**
 * optional bytes best_block_hash = 3;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getBestBlockHash()`
 * @return {!Uint8Array}
 */
proto.pb.GetBlockchainInfoResponse.prototype.getBestBlockHash_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getBestBlockHash()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.pb.GetBlockchainInfoResponse} returns this
 */
proto.pb.GetBlockchainInfoResponse.prototype.setBestBlockHash = function(value) {
  return jspb.Message.setProto3BytesField(this, 3, value);
};


/**
 * optional double difficulty = 4;
 * @return {number}
 */
proto.pb.GetBlockchainInfoResponse.prototype.getDifficulty = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 4, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.pb.GetBlockchainInfoResponse} returns this
 */
proto.pb.GetBlockchainInfoResponse.prototype.setDifficulty = function(value) {
  return jspb.Message.setProto3FloatField(this, 4, value);
};


/**
 * optional int64 median_time = 5;
 * @return {number}
 */
proto.pb.GetBlockchainInfoResponse.prototype.getMedianTime = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.pb.GetBlockchainInfoResponse} returns this
 */
proto.pb.GetBlockchainInfoResponse.prototype.setMedianTime = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional bool tx_index = 6;
 * @return {boolean}
 */
proto.pb.GetBlockchainInfoResponse.prototype.getTxIndex = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 6, false));
};


/**
 * @param {boolean} value
 * @return {!proto.pb.GetBlockchainInfoResponse} returns this
 */
proto.pb.GetBlockchainInfoResponse.prototype.setTxIndex = function(value) {
  return jspb.Message.setProto3BooleanField(this, 6, value);
};


/**
 * optional bool addr_index = 7;
 * @return {boolean}
 */
proto.pb.GetBlockchainInfoResponse.prototype.getAddrIndex = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 7, false));
};


/**
 * @param {boolean} value
 * @return {!proto.pb.GetBlockchainInfoResponse} returns this
 */
proto.pb.GetBlockchainInfoResponse.prototype.setAddrIndex = function(value) {
  return jspb.Message.setProto3BooleanField(this, 7, value);
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.pb.GetBlockInfoRequest.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.pb.GetBlockInfoRequest.HashOrHeightCase = {
  HASH_OR_HEIGHT_NOT_SET: 0,
  HASH: 1,
  HEIGHT: 2
};

/**
 * @return {proto.pb.GetBlockInfoRequest.HashOrHeightCase}
 */
proto.pb.GetBlockInfoRequest.prototype.getHashOrHeightCase = function() {
  return /** @type {proto.pb.GetBlockInfoRequest.HashOrHeightCase} */(jspb.Message.computeOneofCase(this, proto.pb.GetBlockInfoRequest.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.GetBlockInfoRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.GetBlockInfoRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.GetBlockInfoRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetBlockInfoRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    hash: msg.getHash_asB64(),
    height: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.GetBlockInfoRequest}
 */
proto.pb.GetBlockInfoRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.GetBlockInfoRequest;
  return proto.pb.GetBlockInfoRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.GetBlockInfoRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.GetBlockInfoRequest}
 */
proto.pb.GetBlockInfoRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setHash(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setHeight(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.GetBlockInfoRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.GetBlockInfoRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.GetBlockInfoRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetBlockInfoRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {!(string|Uint8Array)} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeInt32(
      2,
      f
    );
  }
};


/**
 * optional bytes hash = 1;
 * @return {!(string|Uint8Array)}
 */
proto.pb.GetBlockInfoRequest.prototype.getHash = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes hash = 1;
 * This is a type-conversion wrapper around `getHash()`
 * @return {string}
 */
proto.pb.GetBlockInfoRequest.prototype.getHash_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getHash()));
};


/**
 * optional bytes hash = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getHash()`
 * @return {!Uint8Array}
 */
proto.pb.GetBlockInfoRequest.prototype.getHash_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getHash()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.pb.GetBlockInfoRequest} returns this
 */
proto.pb.GetBlockInfoRequest.prototype.setHash = function(value) {
  return jspb.Message.setOneofField(this, 1, proto.pb.GetBlockInfoRequest.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.pb.GetBlockInfoRequest} returns this
 */
proto.pb.GetBlockInfoRequest.prototype.clearHash = function() {
  return jspb.Message.setOneofField(this, 1, proto.pb.GetBlockInfoRequest.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.pb.GetBlockInfoRequest.prototype.hasHash = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional int32 height = 2;
 * @return {number}
 */
proto.pb.GetBlockInfoRequest.prototype.getHeight = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.pb.GetBlockInfoRequest} returns this
 */
proto.pb.GetBlockInfoRequest.prototype.setHeight = function(value) {
  return jspb.Message.setOneofField(this, 2, proto.pb.GetBlockInfoRequest.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.pb.GetBlockInfoRequest} returns this
 */
proto.pb.GetBlockInfoRequest.prototype.clearHeight = function() {
  return jspb.Message.setOneofField(this, 2, proto.pb.GetBlockInfoRequest.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.pb.GetBlockInfoRequest.prototype.hasHeight = function() {
  return jspb.Message.getField(this, 2) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.GetBlockInfoResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.GetBlockInfoResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.GetBlockInfoResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetBlockInfoResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    info: (f = msg.getInfo()) && proto.pb.BlockInfo.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.GetBlockInfoResponse}
 */
proto.pb.GetBlockInfoResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.GetBlockInfoResponse;
  return proto.pb.GetBlockInfoResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.GetBlockInfoResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.GetBlockInfoResponse}
 */
proto.pb.GetBlockInfoResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.pb.BlockInfo;
      reader.readMessage(value,proto.pb.BlockInfo.deserializeBinaryFromReader);
      msg.setInfo(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.GetBlockInfoResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.GetBlockInfoResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.GetBlockInfoResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetBlockInfoResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getInfo();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.pb.BlockInfo.serializeBinaryToWriter
    );
  }
};


/**
 * optional BlockInfo info = 1;
 * @return {?proto.pb.BlockInfo}
 */
proto.pb.GetBlockInfoResponse.prototype.getInfo = function() {
  return /** @type{?proto.pb.BlockInfo} */ (
    jspb.Message.getWrapperField(this, proto.pb.BlockInfo, 1));
};


/**
 * @param {?proto.pb.BlockInfo|undefined} value
 * @return {!proto.pb.GetBlockInfoResponse} returns this
*/
proto.pb.GetBlockInfoResponse.prototype.setInfo = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.pb.GetBlockInfoResponse} returns this
 */
proto.pb.GetBlockInfoResponse.prototype.clearInfo = function() {
  return this.setInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.pb.GetBlockInfoResponse.prototype.hasInfo = function() {
  return jspb.Message.getField(this, 1) != null;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.pb.GetBlockRequest.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.pb.GetBlockRequest.HashOrHeightCase = {
  HASH_OR_HEIGHT_NOT_SET: 0,
  HASH: 1,
  HEIGHT: 2
};

/**
 * @return {proto.pb.GetBlockRequest.HashOrHeightCase}
 */
proto.pb.GetBlockRequest.prototype.getHashOrHeightCase = function() {
  return /** @type {proto.pb.GetBlockRequest.HashOrHeightCase} */(jspb.Message.computeOneofCase(this, proto.pb.GetBlockRequest.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.GetBlockRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.GetBlockRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.GetBlockRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetBlockRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    hash: msg.getHash_asB64(),
    height: jspb.Message.getFieldWithDefault(msg, 2, 0),
    fullTransactions: jspb.Message.getBooleanFieldWithDefault(msg, 3, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.GetBlockRequest}
 */
proto.pb.GetBlockRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.GetBlockRequest;
  return proto.pb.GetBlockRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.GetBlockRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.GetBlockRequest}
 */
proto.pb.GetBlockRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setHash(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setHeight(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setFullTransactions(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.GetBlockRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.GetBlockRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.GetBlockRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetBlockRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {!(string|Uint8Array)} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getFullTransactions();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
};


/**
 * optional bytes hash = 1;
 * @return {!(string|Uint8Array)}
 */
proto.pb.GetBlockRequest.prototype.getHash = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes hash = 1;
 * This is a type-conversion wrapper around `getHash()`
 * @return {string}
 */
proto.pb.GetBlockRequest.prototype.getHash_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getHash()));
};


/**
 * optional bytes hash = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getHash()`
 * @return {!Uint8Array}
 */
proto.pb.GetBlockRequest.prototype.getHash_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getHash()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.pb.GetBlockRequest} returns this
 */
proto.pb.GetBlockRequest.prototype.setHash = function(value) {
  return jspb.Message.setOneofField(this, 1, proto.pb.GetBlockRequest.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.pb.GetBlockRequest} returns this
 */
proto.pb.GetBlockRequest.prototype.clearHash = function() {
  return jspb.Message.setOneofField(this, 1, proto.pb.GetBlockRequest.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.pb.GetBlockRequest.prototype.hasHash = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional int32 height = 2;
 * @return {number}
 */
proto.pb.GetBlockRequest.prototype.getHeight = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.pb.GetBlockRequest} returns this
 */
proto.pb.GetBlockRequest.prototype.setHeight = function(value) {
  return jspb.Message.setOneofField(this, 2, proto.pb.GetBlockRequest.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.pb.GetBlockRequest} returns this
 */
proto.pb.GetBlockRequest.prototype.clearHeight = function() {
  return jspb.Message.setOneofField(this, 2, proto.pb.GetBlockRequest.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.pb.GetBlockRequest.prototype.hasHeight = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional bool full_transactions = 3;
 * @return {boolean}
 */
proto.pb.GetBlockRequest.prototype.getFullTransactions = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.pb.GetBlockRequest} returns this
 */
proto.pb.GetBlockRequest.prototype.setFullTransactions = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.GetBlockResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.GetBlockResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.GetBlockResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetBlockResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    block: (f = msg.getBlock()) && proto.pb.Block.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.GetBlockResponse}
 */
proto.pb.GetBlockResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.GetBlockResponse;
  return proto.pb.GetBlockResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.GetBlockResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.GetBlockResponse}
 */
proto.pb.GetBlockResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.pb.Block;
      reader.readMessage(value,proto.pb.Block.deserializeBinaryFromReader);
      msg.setBlock(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.GetBlockResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.GetBlockResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.GetBlockResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetBlockResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getBlock();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.pb.Block.serializeBinaryToWriter
    );
  }
};


/**
 * optional Block block = 1;
 * @return {?proto.pb.Block}
 */
proto.pb.GetBlockResponse.prototype.getBlock = function() {
  return /** @type{?proto.pb.Block} */ (
    jspb.Message.getWrapperField(this, proto.pb.Block, 1));
};


/**
 * @param {?proto.pb.Block|undefined} value
 * @return {!proto.pb.GetBlockResponse} returns this
*/
proto.pb.GetBlockResponse.prototype.setBlock = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.pb.GetBlockResponse} returns this
 */
proto.pb.GetBlockResponse.prototype.clearBlock = function() {
  return this.setBlock(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.pb.GetBlockResponse.prototype.hasBlock = function() {
  return jspb.Message.getField(this, 1) != null;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.pb.GetRawBlockRequest.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.pb.GetRawBlockRequest.HashOrHeightCase = {
  HASH_OR_HEIGHT_NOT_SET: 0,
  HASH: 1,
  HEIGHT: 2
};

/**
 * @return {proto.pb.GetRawBlockRequest.HashOrHeightCase}
 */
proto.pb.GetRawBlockRequest.prototype.getHashOrHeightCase = function() {
  return /** @type {proto.pb.GetRawBlockRequest.HashOrHeightCase} */(jspb.Message.computeOneofCase(this, proto.pb.GetRawBlockRequest.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.GetRawBlockRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.GetRawBlockRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.GetRawBlockRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetRawBlockRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    hash: msg.getHash_asB64(),
    height: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.GetRawBlockRequest}
 */
proto.pb.GetRawBlockRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.GetRawBlockRequest;
  return proto.pb.GetRawBlockRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.GetRawBlockRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.GetRawBlockRequest}
 */
proto.pb.GetRawBlockRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setHash(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setHeight(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.GetRawBlockRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.GetRawBlockRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.GetRawBlockRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetRawBlockRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {!(string|Uint8Array)} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeInt32(
      2,
      f
    );
  }
};


/**
 * optional bytes hash = 1;
 * @return {!(string|Uint8Array)}
 */
proto.pb.GetRawBlockRequest.prototype.getHash = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes hash = 1;
 * This is a type-conversion wrapper around `getHash()`
 * @return {string}
 */
proto.pb.GetRawBlockRequest.prototype.getHash_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getHash()));
};


/**
 * optional bytes hash = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getHash()`
 * @return {!Uint8Array}
 */
proto.pb.GetRawBlockRequest.prototype.getHash_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getHash()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.pb.GetRawBlockRequest} returns this
 */
proto.pb.GetRawBlockRequest.prototype.setHash = function(value) {
  return jspb.Message.setOneofField(this, 1, proto.pb.GetRawBlockRequest.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.pb.GetRawBlockRequest} returns this
 */
proto.pb.GetRawBlockRequest.prototype.clearHash = function() {
  return jspb.Message.setOneofField(this, 1, proto.pb.GetRawBlockRequest.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.pb.GetRawBlockRequest.prototype.hasHash = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional int32 height = 2;
 * @return {number}
 */
proto.pb.GetRawBlockRequest.prototype.getHeight = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.pb.GetRawBlockRequest} returns this
 */
proto.pb.GetRawBlockRequest.prototype.setHeight = function(value) {
  return jspb.Message.setOneofField(this, 2, proto.pb.GetRawBlockRequest.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.pb.GetRawBlockRequest} returns this
 */
proto.pb.GetRawBlockRequest.prototype.clearHeight = function() {
  return jspb.Message.setOneofField(this, 2, proto.pb.GetRawBlockRequest.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.pb.GetRawBlockRequest.prototype.hasHeight = function() {
  return jspb.Message.getField(this, 2) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.GetRawBlockResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.GetRawBlockResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.GetRawBlockResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetRawBlockResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    block: msg.getBlock_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.GetRawBlockResponse}
 */
proto.pb.GetRawBlockResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.GetRawBlockResponse;
  return proto.pb.GetRawBlockResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.GetRawBlockResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.GetRawBlockResponse}
 */
proto.pb.GetRawBlockResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setBlock(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.GetRawBlockResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.GetRawBlockResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.GetRawBlockResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetRawBlockResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getBlock_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
};


/**
 * optional bytes block = 1;
 * @return {!(string|Uint8Array)}
 */
proto.pb.GetRawBlockResponse.prototype.getBlock = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes block = 1;
 * This is a type-conversion wrapper around `getBlock()`
 * @return {string}
 */
proto.pb.GetRawBlockResponse.prototype.getBlock_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getBlock()));
};


/**
 * optional bytes block = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getBlock()`
 * @return {!Uint8Array}
 */
proto.pb.GetRawBlockResponse.prototype.getBlock_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getBlock()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.pb.GetRawBlockResponse} returns this
 */
proto.pb.GetRawBlockResponse.prototype.setBlock = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.pb.GetBlockFilterRequest.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.pb.GetBlockFilterRequest.HashOrHeightCase = {
  HASH_OR_HEIGHT_NOT_SET: 0,
  HASH: 1,
  HEIGHT: 2
};

/**
 * @return {proto.pb.GetBlockFilterRequest.HashOrHeightCase}
 */
proto.pb.GetBlockFilterRequest.prototype.getHashOrHeightCase = function() {
  return /** @type {proto.pb.GetBlockFilterRequest.HashOrHeightCase} */(jspb.Message.computeOneofCase(this, proto.pb.GetBlockFilterRequest.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.GetBlockFilterRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.GetBlockFilterRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.GetBlockFilterRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetBlockFilterRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    hash: msg.getHash_asB64(),
    height: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.GetBlockFilterRequest}
 */
proto.pb.GetBlockFilterRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.GetBlockFilterRequest;
  return proto.pb.GetBlockFilterRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.GetBlockFilterRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.GetBlockFilterRequest}
 */
proto.pb.GetBlockFilterRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setHash(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setHeight(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.GetBlockFilterRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.GetBlockFilterRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.GetBlockFilterRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetBlockFilterRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {!(string|Uint8Array)} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 2));
  if (f != null) {
    writer.writeInt32(
      2,
      f
    );
  }
};


/**
 * optional bytes hash = 1;
 * @return {!(string|Uint8Array)}
 */
proto.pb.GetBlockFilterRequest.prototype.getHash = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes hash = 1;
 * This is a type-conversion wrapper around `getHash()`
 * @return {string}
 */
proto.pb.GetBlockFilterRequest.prototype.getHash_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getHash()));
};


/**
 * optional bytes hash = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getHash()`
 * @return {!Uint8Array}
 */
proto.pb.GetBlockFilterRequest.prototype.getHash_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getHash()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.pb.GetBlockFilterRequest} returns this
 */
proto.pb.GetBlockFilterRequest.prototype.setHash = function(value) {
  return jspb.Message.setOneofField(this, 1, proto.pb.GetBlockFilterRequest.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.pb.GetBlockFilterRequest} returns this
 */
proto.pb.GetBlockFilterRequest.prototype.clearHash = function() {
  return jspb.Message.setOneofField(this, 1, proto.pb.GetBlockFilterRequest.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.pb.GetBlockFilterRequest.prototype.hasHash = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional int32 height = 2;
 * @return {number}
 */
proto.pb.GetBlockFilterRequest.prototype.getHeight = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.pb.GetBlockFilterRequest} returns this
 */
proto.pb.GetBlockFilterRequest.prototype.setHeight = function(value) {
  return jspb.Message.setOneofField(this, 2, proto.pb.GetBlockFilterRequest.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.pb.GetBlockFilterRequest} returns this
 */
proto.pb.GetBlockFilterRequest.prototype.clearHeight = function() {
  return jspb.Message.setOneofField(this, 2, proto.pb.GetBlockFilterRequest.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.pb.GetBlockFilterRequest.prototype.hasHeight = function() {
  return jspb.Message.getField(this, 2) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.GetBlockFilterResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.GetBlockFilterResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.GetBlockFilterResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetBlockFilterResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    filter: msg.getFilter_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.GetBlockFilterResponse}
 */
proto.pb.GetBlockFilterResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.GetBlockFilterResponse;
  return proto.pb.GetBlockFilterResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.GetBlockFilterResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.GetBlockFilterResponse}
 */
proto.pb.GetBlockFilterResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setFilter(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.GetBlockFilterResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.GetBlockFilterResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.GetBlockFilterResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetBlockFilterResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFilter_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
};


/**
 * optional bytes filter = 1;
 * @return {!(string|Uint8Array)}
 */
proto.pb.GetBlockFilterResponse.prototype.getFilter = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes filter = 1;
 * This is a type-conversion wrapper around `getFilter()`
 * @return {string}
 */
proto.pb.GetBlockFilterResponse.prototype.getFilter_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getFilter()));
};


/**
 * optional bytes filter = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getFilter()`
 * @return {!Uint8Array}
 */
proto.pb.GetBlockFilterResponse.prototype.getFilter_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getFilter()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.pb.GetBlockFilterResponse} returns this
 */
proto.pb.GetBlockFilterResponse.prototype.setFilter = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.pb.GetHeadersRequest.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.GetHeadersRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.GetHeadersRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.GetHeadersRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetHeadersRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    blockLocatorHashesList: msg.getBlockLocatorHashesList_asB64(),
    stopHash: msg.getStopHash_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.GetHeadersRequest}
 */
proto.pb.GetHeadersRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.GetHeadersRequest;
  return proto.pb.GetHeadersRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.GetHeadersRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.GetHeadersRequest}
 */
proto.pb.GetHeadersRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.addBlockLocatorHashes(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setStopHash(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.GetHeadersRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.GetHeadersRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.GetHeadersRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetHeadersRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getBlockLocatorHashesList_asU8();
  if (f.length > 0) {
    writer.writeRepeatedBytes(
      1,
      f
    );
  }
  f = message.getStopHash_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
};


/**
 * repeated bytes block_locator_hashes = 1;
 * @return {!(Array<!Uint8Array>|Array<string>)}
 */
proto.pb.GetHeadersRequest.prototype.getBlockLocatorHashesList = function() {
  return /** @type {!(Array<!Uint8Array>|Array<string>)} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * repeated bytes block_locator_hashes = 1;
 * This is a type-conversion wrapper around `getBlockLocatorHashesList()`
 * @return {!Array<string>}
 */
proto.pb.GetHeadersRequest.prototype.getBlockLocatorHashesList_asB64 = function() {
  return /** @type {!Array<string>} */ (jspb.Message.bytesListAsB64(
      this.getBlockLocatorHashesList()));
};


/**
 * repeated bytes block_locator_hashes = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getBlockLocatorHashesList()`
 * @return {!Array<!Uint8Array>}
 */
proto.pb.GetHeadersRequest.prototype.getBlockLocatorHashesList_asU8 = function() {
  return /** @type {!Array<!Uint8Array>} */ (jspb.Message.bytesListAsU8(
      this.getBlockLocatorHashesList()));
};


/**
 * @param {!(Array<!Uint8Array>|Array<string>)} value
 * @return {!proto.pb.GetHeadersRequest} returns this
 */
proto.pb.GetHeadersRequest.prototype.setBlockLocatorHashesList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {!(string|Uint8Array)} value
 * @param {number=} opt_index
 * @return {!proto.pb.GetHeadersRequest} returns this
 */
proto.pb.GetHeadersRequest.prototype.addBlockLocatorHashes = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.pb.GetHeadersRequest} returns this
 */
proto.pb.GetHeadersRequest.prototype.clearBlockLocatorHashesList = function() {
  return this.setBlockLocatorHashesList([]);
};


/**
 * optional bytes stop_hash = 2;
 * @return {!(string|Uint8Array)}
 */
proto.pb.GetHeadersRequest.prototype.getStopHash = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes stop_hash = 2;
 * This is a type-conversion wrapper around `getStopHash()`
 * @return {string}
 */
proto.pb.GetHeadersRequest.prototype.getStopHash_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getStopHash()));
};


/**
 * optional bytes stop_hash = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getStopHash()`
 * @return {!Uint8Array}
 */
proto.pb.GetHeadersRequest.prototype.getStopHash_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getStopHash()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.pb.GetHeadersRequest} returns this
 */
proto.pb.GetHeadersRequest.prototype.setStopHash = function(value) {
  return jspb.Message.setProto3BytesField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.pb.GetHeadersResponse.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.GetHeadersResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.GetHeadersResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.GetHeadersResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetHeadersResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    headersList: jspb.Message.toObjectList(msg.getHeadersList(),
    proto.pb.BlockInfo.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.GetHeadersResponse}
 */
proto.pb.GetHeadersResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.GetHeadersResponse;
  return proto.pb.GetHeadersResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.GetHeadersResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.GetHeadersResponse}
 */
proto.pb.GetHeadersResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.pb.BlockInfo;
      reader.readMessage(value,proto.pb.BlockInfo.deserializeBinaryFromReader);
      msg.addHeaders(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.GetHeadersResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.GetHeadersResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.GetHeadersResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetHeadersResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getHeadersList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.pb.BlockInfo.serializeBinaryToWriter
    );
  }
};


/**
 * repeated BlockInfo headers = 1;
 * @return {!Array<!proto.pb.BlockInfo>}
 */
proto.pb.GetHeadersResponse.prototype.getHeadersList = function() {
  return /** @type{!Array<!proto.pb.BlockInfo>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.pb.BlockInfo, 1));
};


/**
 * @param {!Array<!proto.pb.BlockInfo>} value
 * @return {!proto.pb.GetHeadersResponse} returns this
*/
proto.pb.GetHeadersResponse.prototype.setHeadersList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.pb.BlockInfo=} opt_value
 * @param {number=} opt_index
 * @return {!proto.pb.BlockInfo}
 */
proto.pb.GetHeadersResponse.prototype.addHeaders = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.pb.BlockInfo, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.pb.GetHeadersResponse} returns this
 */
proto.pb.GetHeadersResponse.prototype.clearHeadersList = function() {
  return this.setHeadersList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.GetTransactionRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.GetTransactionRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.GetTransactionRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetTransactionRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    hash: msg.getHash_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.GetTransactionRequest}
 */
proto.pb.GetTransactionRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.GetTransactionRequest;
  return proto.pb.GetTransactionRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.GetTransactionRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.GetTransactionRequest}
 */
proto.pb.GetTransactionRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setHash(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.GetTransactionRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.GetTransactionRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.GetTransactionRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetTransactionRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getHash_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
};


/**
 * optional bytes hash = 1;
 * @return {!(string|Uint8Array)}
 */
proto.pb.GetTransactionRequest.prototype.getHash = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes hash = 1;
 * This is a type-conversion wrapper around `getHash()`
 * @return {string}
 */
proto.pb.GetTransactionRequest.prototype.getHash_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getHash()));
};


/**
 * optional bytes hash = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getHash()`
 * @return {!Uint8Array}
 */
proto.pb.GetTransactionRequest.prototype.getHash_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getHash()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.pb.GetTransactionRequest} returns this
 */
proto.pb.GetTransactionRequest.prototype.setHash = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.GetTransactionResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.GetTransactionResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.GetTransactionResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetTransactionResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    transaction: (f = msg.getTransaction()) && proto.pb.Transaction.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.GetTransactionResponse}
 */
proto.pb.GetTransactionResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.GetTransactionResponse;
  return proto.pb.GetTransactionResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.GetTransactionResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.GetTransactionResponse}
 */
proto.pb.GetTransactionResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.pb.Transaction;
      reader.readMessage(value,proto.pb.Transaction.deserializeBinaryFromReader);
      msg.setTransaction(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.GetTransactionResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.GetTransactionResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.GetTransactionResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetTransactionResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTransaction();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.pb.Transaction.serializeBinaryToWriter
    );
  }
};


/**
 * optional Transaction transaction = 1;
 * @return {?proto.pb.Transaction}
 */
proto.pb.GetTransactionResponse.prototype.getTransaction = function() {
  return /** @type{?proto.pb.Transaction} */ (
    jspb.Message.getWrapperField(this, proto.pb.Transaction, 1));
};


/**
 * @param {?proto.pb.Transaction|undefined} value
 * @return {!proto.pb.GetTransactionResponse} returns this
*/
proto.pb.GetTransactionResponse.prototype.setTransaction = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.pb.GetTransactionResponse} returns this
 */
proto.pb.GetTransactionResponse.prototype.clearTransaction = function() {
  return this.setTransaction(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.pb.GetTransactionResponse.prototype.hasTransaction = function() {
  return jspb.Message.getField(this, 1) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.GetRawTransactionRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.GetRawTransactionRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.GetRawTransactionRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetRawTransactionRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    hash: msg.getHash_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.GetRawTransactionRequest}
 */
proto.pb.GetRawTransactionRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.GetRawTransactionRequest;
  return proto.pb.GetRawTransactionRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.GetRawTransactionRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.GetRawTransactionRequest}
 */
proto.pb.GetRawTransactionRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setHash(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.GetRawTransactionRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.GetRawTransactionRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.GetRawTransactionRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetRawTransactionRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getHash_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
};


/**
 * optional bytes hash = 1;
 * @return {!(string|Uint8Array)}
 */
proto.pb.GetRawTransactionRequest.prototype.getHash = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes hash = 1;
 * This is a type-conversion wrapper around `getHash()`
 * @return {string}
 */
proto.pb.GetRawTransactionRequest.prototype.getHash_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getHash()));
};


/**
 * optional bytes hash = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getHash()`
 * @return {!Uint8Array}
 */
proto.pb.GetRawTransactionRequest.prototype.getHash_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getHash()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.pb.GetRawTransactionRequest} returns this
 */
proto.pb.GetRawTransactionRequest.prototype.setHash = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.GetRawTransactionResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.GetRawTransactionResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.GetRawTransactionResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetRawTransactionResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    transaction: msg.getTransaction_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.GetRawTransactionResponse}
 */
proto.pb.GetRawTransactionResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.GetRawTransactionResponse;
  return proto.pb.GetRawTransactionResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.GetRawTransactionResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.GetRawTransactionResponse}
 */
proto.pb.GetRawTransactionResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setTransaction(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.GetRawTransactionResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.GetRawTransactionResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.GetRawTransactionResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetRawTransactionResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTransaction_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
};


/**
 * optional bytes transaction = 1;
 * @return {!(string|Uint8Array)}
 */
proto.pb.GetRawTransactionResponse.prototype.getTransaction = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes transaction = 1;
 * This is a type-conversion wrapper around `getTransaction()`
 * @return {string}
 */
proto.pb.GetRawTransactionResponse.prototype.getTransaction_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getTransaction()));
};


/**
 * optional bytes transaction = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getTransaction()`
 * @return {!Uint8Array}
 */
proto.pb.GetRawTransactionResponse.prototype.getTransaction_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getTransaction()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.pb.GetRawTransactionResponse} returns this
 */
proto.pb.GetRawTransactionResponse.prototype.setTransaction = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.pb.GetAddressTransactionsRequest.oneofGroups_ = [[4,5]];

/**
 * @enum {number}
 */
proto.pb.GetAddressTransactionsRequest.StartBlockCase = {
  START_BLOCK_NOT_SET: 0,
  HASH: 4,
  HEIGHT: 5
};

/**
 * @return {proto.pb.GetAddressTransactionsRequest.StartBlockCase}
 */
proto.pb.GetAddressTransactionsRequest.prototype.getStartBlockCase = function() {
  return /** @type {proto.pb.GetAddressTransactionsRequest.StartBlockCase} */(jspb.Message.computeOneofCase(this, proto.pb.GetAddressTransactionsRequest.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.GetAddressTransactionsRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.GetAddressTransactionsRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.GetAddressTransactionsRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetAddressTransactionsRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    address: jspb.Message.getFieldWithDefault(msg, 1, ""),
    nbSkip: jspb.Message.getFieldWithDefault(msg, 2, 0),
    nbFetch: jspb.Message.getFieldWithDefault(msg, 3, 0),
    hash: msg.getHash_asB64(),
    height: jspb.Message.getFieldWithDefault(msg, 5, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.GetAddressTransactionsRequest}
 */
proto.pb.GetAddressTransactionsRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.GetAddressTransactionsRequest;
  return proto.pb.GetAddressTransactionsRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.GetAddressTransactionsRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.GetAddressTransactionsRequest}
 */
proto.pb.GetAddressTransactionsRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setAddress(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setNbSkip(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setNbFetch(value);
      break;
    case 4:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setHash(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setHeight(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.GetAddressTransactionsRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.GetAddressTransactionsRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.GetAddressTransactionsRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetAddressTransactionsRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAddress();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getNbSkip();
  if (f !== 0) {
    writer.writeUint32(
      2,
      f
    );
  }
  f = message.getNbFetch();
  if (f !== 0) {
    writer.writeUint32(
      3,
      f
    );
  }
  f = /** @type {!(string|Uint8Array)} */ (jspb.Message.getField(message, 4));
  if (f != null) {
    writer.writeBytes(
      4,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 5));
  if (f != null) {
    writer.writeInt32(
      5,
      f
    );
  }
};


/**
 * optional string address = 1;
 * @return {string}
 */
proto.pb.GetAddressTransactionsRequest.prototype.getAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.pb.GetAddressTransactionsRequest} returns this
 */
proto.pb.GetAddressTransactionsRequest.prototype.setAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional uint32 nb_skip = 2;
 * @return {number}
 */
proto.pb.GetAddressTransactionsRequest.prototype.getNbSkip = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.pb.GetAddressTransactionsRequest} returns this
 */
proto.pb.GetAddressTransactionsRequest.prototype.setNbSkip = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional uint32 nb_fetch = 3;
 * @return {number}
 */
proto.pb.GetAddressTransactionsRequest.prototype.getNbFetch = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.pb.GetAddressTransactionsRequest} returns this
 */
proto.pb.GetAddressTransactionsRequest.prototype.setNbFetch = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional bytes hash = 4;
 * @return {!(string|Uint8Array)}
 */
proto.pb.GetAddressTransactionsRequest.prototype.getHash = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * optional bytes hash = 4;
 * This is a type-conversion wrapper around `getHash()`
 * @return {string}
 */
proto.pb.GetAddressTransactionsRequest.prototype.getHash_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getHash()));
};


/**
 * optional bytes hash = 4;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getHash()`
 * @return {!Uint8Array}
 */
proto.pb.GetAddressTransactionsRequest.prototype.getHash_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getHash()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.pb.GetAddressTransactionsRequest} returns this
 */
proto.pb.GetAddressTransactionsRequest.prototype.setHash = function(value) {
  return jspb.Message.setOneofField(this, 4, proto.pb.GetAddressTransactionsRequest.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.pb.GetAddressTransactionsRequest} returns this
 */
proto.pb.GetAddressTransactionsRequest.prototype.clearHash = function() {
  return jspb.Message.setOneofField(this, 4, proto.pb.GetAddressTransactionsRequest.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.pb.GetAddressTransactionsRequest.prototype.hasHash = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional int32 height = 5;
 * @return {number}
 */
proto.pb.GetAddressTransactionsRequest.prototype.getHeight = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.pb.GetAddressTransactionsRequest} returns this
 */
proto.pb.GetAddressTransactionsRequest.prototype.setHeight = function(value) {
  return jspb.Message.setOneofField(this, 5, proto.pb.GetAddressTransactionsRequest.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.pb.GetAddressTransactionsRequest} returns this
 */
proto.pb.GetAddressTransactionsRequest.prototype.clearHeight = function() {
  return jspb.Message.setOneofField(this, 5, proto.pb.GetAddressTransactionsRequest.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.pb.GetAddressTransactionsRequest.prototype.hasHeight = function() {
  return jspb.Message.getField(this, 5) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.pb.GetAddressTransactionsResponse.repeatedFields_ = [1,2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.GetAddressTransactionsResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.GetAddressTransactionsResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.GetAddressTransactionsResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetAddressTransactionsResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    confirmedTransactionsList: jspb.Message.toObjectList(msg.getConfirmedTransactionsList(),
    proto.pb.Transaction.toObject, includeInstance),
    unconfirmedTransactionsList: jspb.Message.toObjectList(msg.getUnconfirmedTransactionsList(),
    proto.pb.MempoolTransaction.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.GetAddressTransactionsResponse}
 */
proto.pb.GetAddressTransactionsResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.GetAddressTransactionsResponse;
  return proto.pb.GetAddressTransactionsResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.GetAddressTransactionsResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.GetAddressTransactionsResponse}
 */
proto.pb.GetAddressTransactionsResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.pb.Transaction;
      reader.readMessage(value,proto.pb.Transaction.deserializeBinaryFromReader);
      msg.addConfirmedTransactions(value);
      break;
    case 2:
      var value = new proto.pb.MempoolTransaction;
      reader.readMessage(value,proto.pb.MempoolTransaction.deserializeBinaryFromReader);
      msg.addUnconfirmedTransactions(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.GetAddressTransactionsResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.GetAddressTransactionsResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.GetAddressTransactionsResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetAddressTransactionsResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getConfirmedTransactionsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.pb.Transaction.serializeBinaryToWriter
    );
  }
  f = message.getUnconfirmedTransactionsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.pb.MempoolTransaction.serializeBinaryToWriter
    );
  }
};


/**
 * repeated Transaction confirmed_transactions = 1;
 * @return {!Array<!proto.pb.Transaction>}
 */
proto.pb.GetAddressTransactionsResponse.prototype.getConfirmedTransactionsList = function() {
  return /** @type{!Array<!proto.pb.Transaction>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.pb.Transaction, 1));
};


/**
 * @param {!Array<!proto.pb.Transaction>} value
 * @return {!proto.pb.GetAddressTransactionsResponse} returns this
*/
proto.pb.GetAddressTransactionsResponse.prototype.setConfirmedTransactionsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.pb.Transaction=} opt_value
 * @param {number=} opt_index
 * @return {!proto.pb.Transaction}
 */
proto.pb.GetAddressTransactionsResponse.prototype.addConfirmedTransactions = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.pb.Transaction, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.pb.GetAddressTransactionsResponse} returns this
 */
proto.pb.GetAddressTransactionsResponse.prototype.clearConfirmedTransactionsList = function() {
  return this.setConfirmedTransactionsList([]);
};


/**
 * repeated MempoolTransaction unconfirmed_transactions = 2;
 * @return {!Array<!proto.pb.MempoolTransaction>}
 */
proto.pb.GetAddressTransactionsResponse.prototype.getUnconfirmedTransactionsList = function() {
  return /** @type{!Array<!proto.pb.MempoolTransaction>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.pb.MempoolTransaction, 2));
};


/**
 * @param {!Array<!proto.pb.MempoolTransaction>} value
 * @return {!proto.pb.GetAddressTransactionsResponse} returns this
*/
proto.pb.GetAddressTransactionsResponse.prototype.setUnconfirmedTransactionsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.pb.MempoolTransaction=} opt_value
 * @param {number=} opt_index
 * @return {!proto.pb.MempoolTransaction}
 */
proto.pb.GetAddressTransactionsResponse.prototype.addUnconfirmedTransactions = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.pb.MempoolTransaction, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.pb.GetAddressTransactionsResponse} returns this
 */
proto.pb.GetAddressTransactionsResponse.prototype.clearUnconfirmedTransactionsList = function() {
  return this.setUnconfirmedTransactionsList([]);
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.pb.GetRawAddressTransactionsRequest.oneofGroups_ = [[4,5]];

/**
 * @enum {number}
 */
proto.pb.GetRawAddressTransactionsRequest.StartBlockCase = {
  START_BLOCK_NOT_SET: 0,
  HASH: 4,
  HEIGHT: 5
};

/**
 * @return {proto.pb.GetRawAddressTransactionsRequest.StartBlockCase}
 */
proto.pb.GetRawAddressTransactionsRequest.prototype.getStartBlockCase = function() {
  return /** @type {proto.pb.GetRawAddressTransactionsRequest.StartBlockCase} */(jspb.Message.computeOneofCase(this, proto.pb.GetRawAddressTransactionsRequest.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.GetRawAddressTransactionsRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.GetRawAddressTransactionsRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.GetRawAddressTransactionsRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetRawAddressTransactionsRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    address: jspb.Message.getFieldWithDefault(msg, 1, ""),
    nbSkip: jspb.Message.getFieldWithDefault(msg, 2, 0),
    nbFetch: jspb.Message.getFieldWithDefault(msg, 3, 0),
    hash: msg.getHash_asB64(),
    height: jspb.Message.getFieldWithDefault(msg, 5, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.GetRawAddressTransactionsRequest}
 */
proto.pb.GetRawAddressTransactionsRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.GetRawAddressTransactionsRequest;
  return proto.pb.GetRawAddressTransactionsRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.GetRawAddressTransactionsRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.GetRawAddressTransactionsRequest}
 */
proto.pb.GetRawAddressTransactionsRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setAddress(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setNbSkip(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setNbFetch(value);
      break;
    case 4:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setHash(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setHeight(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.GetRawAddressTransactionsRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.GetRawAddressTransactionsRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.GetRawAddressTransactionsRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetRawAddressTransactionsRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAddress();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getNbSkip();
  if (f !== 0) {
    writer.writeUint32(
      2,
      f
    );
  }
  f = message.getNbFetch();
  if (f !== 0) {
    writer.writeUint32(
      3,
      f
    );
  }
  f = /** @type {!(string|Uint8Array)} */ (jspb.Message.getField(message, 4));
  if (f != null) {
    writer.writeBytes(
      4,
      f
    );
  }
  f = /** @type {number} */ (jspb.Message.getField(message, 5));
  if (f != null) {
    writer.writeInt32(
      5,
      f
    );
  }
};


/**
 * optional string address = 1;
 * @return {string}
 */
proto.pb.GetRawAddressTransactionsRequest.prototype.getAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.pb.GetRawAddressTransactionsRequest} returns this
 */
proto.pb.GetRawAddressTransactionsRequest.prototype.setAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional uint32 nb_skip = 2;
 * @return {number}
 */
proto.pb.GetRawAddressTransactionsRequest.prototype.getNbSkip = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.pb.GetRawAddressTransactionsRequest} returns this
 */
proto.pb.GetRawAddressTransactionsRequest.prototype.setNbSkip = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional uint32 nb_fetch = 3;
 * @return {number}
 */
proto.pb.GetRawAddressTransactionsRequest.prototype.getNbFetch = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.pb.GetRawAddressTransactionsRequest} returns this
 */
proto.pb.GetRawAddressTransactionsRequest.prototype.setNbFetch = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional bytes hash = 4;
 * @return {!(string|Uint8Array)}
 */
proto.pb.GetRawAddressTransactionsRequest.prototype.getHash = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * optional bytes hash = 4;
 * This is a type-conversion wrapper around `getHash()`
 * @return {string}
 */
proto.pb.GetRawAddressTransactionsRequest.prototype.getHash_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getHash()));
};


/**
 * optional bytes hash = 4;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getHash()`
 * @return {!Uint8Array}
 */
proto.pb.GetRawAddressTransactionsRequest.prototype.getHash_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getHash()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.pb.GetRawAddressTransactionsRequest} returns this
 */
proto.pb.GetRawAddressTransactionsRequest.prototype.setHash = function(value) {
  return jspb.Message.setOneofField(this, 4, proto.pb.GetRawAddressTransactionsRequest.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.pb.GetRawAddressTransactionsRequest} returns this
 */
proto.pb.GetRawAddressTransactionsRequest.prototype.clearHash = function() {
  return jspb.Message.setOneofField(this, 4, proto.pb.GetRawAddressTransactionsRequest.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.pb.GetRawAddressTransactionsRequest.prototype.hasHash = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional int32 height = 5;
 * @return {number}
 */
proto.pb.GetRawAddressTransactionsRequest.prototype.getHeight = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.pb.GetRawAddressTransactionsRequest} returns this
 */
proto.pb.GetRawAddressTransactionsRequest.prototype.setHeight = function(value) {
  return jspb.Message.setOneofField(this, 5, proto.pb.GetRawAddressTransactionsRequest.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.pb.GetRawAddressTransactionsRequest} returns this
 */
proto.pb.GetRawAddressTransactionsRequest.prototype.clearHeight = function() {
  return jspb.Message.setOneofField(this, 5, proto.pb.GetRawAddressTransactionsRequest.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.pb.GetRawAddressTransactionsRequest.prototype.hasHeight = function() {
  return jspb.Message.getField(this, 5) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.pb.GetRawAddressTransactionsResponse.repeatedFields_ = [1,2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.GetRawAddressTransactionsResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.GetRawAddressTransactionsResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.GetRawAddressTransactionsResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetRawAddressTransactionsResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    confirmedTransactionsList: msg.getConfirmedTransactionsList_asB64(),
    unconfirmedTransactionsList: msg.getUnconfirmedTransactionsList_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.GetRawAddressTransactionsResponse}
 */
proto.pb.GetRawAddressTransactionsResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.GetRawAddressTransactionsResponse;
  return proto.pb.GetRawAddressTransactionsResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.GetRawAddressTransactionsResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.GetRawAddressTransactionsResponse}
 */
proto.pb.GetRawAddressTransactionsResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.addConfirmedTransactions(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.addUnconfirmedTransactions(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.GetRawAddressTransactionsResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.GetRawAddressTransactionsResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.GetRawAddressTransactionsResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetRawAddressTransactionsResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getConfirmedTransactionsList_asU8();
  if (f.length > 0) {
    writer.writeRepeatedBytes(
      1,
      f
    );
  }
  f = message.getUnconfirmedTransactionsList_asU8();
  if (f.length > 0) {
    writer.writeRepeatedBytes(
      2,
      f
    );
  }
};


/**
 * repeated bytes confirmed_transactions = 1;
 * @return {!(Array<!Uint8Array>|Array<string>)}
 */
proto.pb.GetRawAddressTransactionsResponse.prototype.getConfirmedTransactionsList = function() {
  return /** @type {!(Array<!Uint8Array>|Array<string>)} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * repeated bytes confirmed_transactions = 1;
 * This is a type-conversion wrapper around `getConfirmedTransactionsList()`
 * @return {!Array<string>}
 */
proto.pb.GetRawAddressTransactionsResponse.prototype.getConfirmedTransactionsList_asB64 = function() {
  return /** @type {!Array<string>} */ (jspb.Message.bytesListAsB64(
      this.getConfirmedTransactionsList()));
};


/**
 * repeated bytes confirmed_transactions = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getConfirmedTransactionsList()`
 * @return {!Array<!Uint8Array>}
 */
proto.pb.GetRawAddressTransactionsResponse.prototype.getConfirmedTransactionsList_asU8 = function() {
  return /** @type {!Array<!Uint8Array>} */ (jspb.Message.bytesListAsU8(
      this.getConfirmedTransactionsList()));
};


/**
 * @param {!(Array<!Uint8Array>|Array<string>)} value
 * @return {!proto.pb.GetRawAddressTransactionsResponse} returns this
 */
proto.pb.GetRawAddressTransactionsResponse.prototype.setConfirmedTransactionsList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {!(string|Uint8Array)} value
 * @param {number=} opt_index
 * @return {!proto.pb.GetRawAddressTransactionsResponse} returns this
 */
proto.pb.GetRawAddressTransactionsResponse.prototype.addConfirmedTransactions = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.pb.GetRawAddressTransactionsResponse} returns this
 */
proto.pb.GetRawAddressTransactionsResponse.prototype.clearConfirmedTransactionsList = function() {
  return this.setConfirmedTransactionsList([]);
};


/**
 * repeated bytes unconfirmed_transactions = 2;
 * @return {!(Array<!Uint8Array>|Array<string>)}
 */
proto.pb.GetRawAddressTransactionsResponse.prototype.getUnconfirmedTransactionsList = function() {
  return /** @type {!(Array<!Uint8Array>|Array<string>)} */ (jspb.Message.getRepeatedField(this, 2));
};


/**
 * repeated bytes unconfirmed_transactions = 2;
 * This is a type-conversion wrapper around `getUnconfirmedTransactionsList()`
 * @return {!Array<string>}
 */
proto.pb.GetRawAddressTransactionsResponse.prototype.getUnconfirmedTransactionsList_asB64 = function() {
  return /** @type {!Array<string>} */ (jspb.Message.bytesListAsB64(
      this.getUnconfirmedTransactionsList()));
};


/**
 * repeated bytes unconfirmed_transactions = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getUnconfirmedTransactionsList()`
 * @return {!Array<!Uint8Array>}
 */
proto.pb.GetRawAddressTransactionsResponse.prototype.getUnconfirmedTransactionsList_asU8 = function() {
  return /** @type {!Array<!Uint8Array>} */ (jspb.Message.bytesListAsU8(
      this.getUnconfirmedTransactionsList()));
};


/**
 * @param {!(Array<!Uint8Array>|Array<string>)} value
 * @return {!proto.pb.GetRawAddressTransactionsResponse} returns this
 */
proto.pb.GetRawAddressTransactionsResponse.prototype.setUnconfirmedTransactionsList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {!(string|Uint8Array)} value
 * @param {number=} opt_index
 * @return {!proto.pb.GetRawAddressTransactionsResponse} returns this
 */
proto.pb.GetRawAddressTransactionsResponse.prototype.addUnconfirmedTransactions = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.pb.GetRawAddressTransactionsResponse} returns this
 */
proto.pb.GetRawAddressTransactionsResponse.prototype.clearUnconfirmedTransactionsList = function() {
  return this.setUnconfirmedTransactionsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.GetAddressUnspentOutputsRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.GetAddressUnspentOutputsRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.GetAddressUnspentOutputsRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetAddressUnspentOutputsRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    address: jspb.Message.getFieldWithDefault(msg, 1, ""),
    includeMempool: jspb.Message.getBooleanFieldWithDefault(msg, 2, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.GetAddressUnspentOutputsRequest}
 */
proto.pb.GetAddressUnspentOutputsRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.GetAddressUnspentOutputsRequest;
  return proto.pb.GetAddressUnspentOutputsRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.GetAddressUnspentOutputsRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.GetAddressUnspentOutputsRequest}
 */
proto.pb.GetAddressUnspentOutputsRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setAddress(value);
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIncludeMempool(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.GetAddressUnspentOutputsRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.GetAddressUnspentOutputsRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.GetAddressUnspentOutputsRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetAddressUnspentOutputsRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAddress();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getIncludeMempool();
  if (f) {
    writer.writeBool(
      2,
      f
    );
  }
};


/**
 * optional string address = 1;
 * @return {string}
 */
proto.pb.GetAddressUnspentOutputsRequest.prototype.getAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.pb.GetAddressUnspentOutputsRequest} returns this
 */
proto.pb.GetAddressUnspentOutputsRequest.prototype.setAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional bool include_mempool = 2;
 * @return {boolean}
 */
proto.pb.GetAddressUnspentOutputsRequest.prototype.getIncludeMempool = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 2, false));
};


/**
 * @param {boolean} value
 * @return {!proto.pb.GetAddressUnspentOutputsRequest} returns this
 */
proto.pb.GetAddressUnspentOutputsRequest.prototype.setIncludeMempool = function(value) {
  return jspb.Message.setProto3BooleanField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.pb.GetAddressUnspentOutputsResponse.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.GetAddressUnspentOutputsResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.GetAddressUnspentOutputsResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.GetAddressUnspentOutputsResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetAddressUnspentOutputsResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    outputsList: jspb.Message.toObjectList(msg.getOutputsList(),
    proto.pb.UnspentOutput.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.GetAddressUnspentOutputsResponse}
 */
proto.pb.GetAddressUnspentOutputsResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.GetAddressUnspentOutputsResponse;
  return proto.pb.GetAddressUnspentOutputsResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.GetAddressUnspentOutputsResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.GetAddressUnspentOutputsResponse}
 */
proto.pb.GetAddressUnspentOutputsResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.pb.UnspentOutput;
      reader.readMessage(value,proto.pb.UnspentOutput.deserializeBinaryFromReader);
      msg.addOutputs(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.GetAddressUnspentOutputsResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.GetAddressUnspentOutputsResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.GetAddressUnspentOutputsResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetAddressUnspentOutputsResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOutputsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.pb.UnspentOutput.serializeBinaryToWriter
    );
  }
};


/**
 * repeated UnspentOutput outputs = 1;
 * @return {!Array<!proto.pb.UnspentOutput>}
 */
proto.pb.GetAddressUnspentOutputsResponse.prototype.getOutputsList = function() {
  return /** @type{!Array<!proto.pb.UnspentOutput>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.pb.UnspentOutput, 1));
};


/**
 * @param {!Array<!proto.pb.UnspentOutput>} value
 * @return {!proto.pb.GetAddressUnspentOutputsResponse} returns this
*/
proto.pb.GetAddressUnspentOutputsResponse.prototype.setOutputsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.pb.UnspentOutput=} opt_value
 * @param {number=} opt_index
 * @return {!proto.pb.UnspentOutput}
 */
proto.pb.GetAddressUnspentOutputsResponse.prototype.addOutputs = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.pb.UnspentOutput, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.pb.GetAddressUnspentOutputsResponse} returns this
 */
proto.pb.GetAddressUnspentOutputsResponse.prototype.clearOutputsList = function() {
  return this.setOutputsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.GetUnspentOutputRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.GetUnspentOutputRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.GetUnspentOutputRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetUnspentOutputRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    hash: msg.getHash_asB64(),
    index: jspb.Message.getFieldWithDefault(msg, 2, 0),
    includeMempool: jspb.Message.getBooleanFieldWithDefault(msg, 3, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.GetUnspentOutputRequest}
 */
proto.pb.GetUnspentOutputRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.GetUnspentOutputRequest;
  return proto.pb.GetUnspentOutputRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.GetUnspentOutputRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.GetUnspentOutputRequest}
 */
proto.pb.GetUnspentOutputRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setHash(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setIndex(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIncludeMempool(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.GetUnspentOutputRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.GetUnspentOutputRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.GetUnspentOutputRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetUnspentOutputRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getHash_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getIndex();
  if (f !== 0) {
    writer.writeUint32(
      2,
      f
    );
  }
  f = message.getIncludeMempool();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
};


/**
 * optional bytes hash = 1;
 * @return {!(string|Uint8Array)}
 */
proto.pb.GetUnspentOutputRequest.prototype.getHash = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes hash = 1;
 * This is a type-conversion wrapper around `getHash()`
 * @return {string}
 */
proto.pb.GetUnspentOutputRequest.prototype.getHash_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getHash()));
};


/**
 * optional bytes hash = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getHash()`
 * @return {!Uint8Array}
 */
proto.pb.GetUnspentOutputRequest.prototype.getHash_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getHash()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.pb.GetUnspentOutputRequest} returns this
 */
proto.pb.GetUnspentOutputRequest.prototype.setHash = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional uint32 index = 2;
 * @return {number}
 */
proto.pb.GetUnspentOutputRequest.prototype.getIndex = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.pb.GetUnspentOutputRequest} returns this
 */
proto.pb.GetUnspentOutputRequest.prototype.setIndex = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional bool include_mempool = 3;
 * @return {boolean}
 */
proto.pb.GetUnspentOutputRequest.prototype.getIncludeMempool = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.pb.GetUnspentOutputRequest} returns this
 */
proto.pb.GetUnspentOutputRequest.prototype.setIncludeMempool = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.GetUnspentOutputResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.GetUnspentOutputResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.GetUnspentOutputResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetUnspentOutputResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    outpoint: (f = msg.getOutpoint()) && proto.pb.Transaction.Input.Outpoint.toObject(includeInstance, f),
    pubkeyScript: msg.getPubkeyScript_asB64(),
    value: jspb.Message.getFieldWithDefault(msg, 3, 0),
    isCoinbase: jspb.Message.getBooleanFieldWithDefault(msg, 4, false),
    blockHeight: jspb.Message.getFieldWithDefault(msg, 5, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.GetUnspentOutputResponse}
 */
proto.pb.GetUnspentOutputResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.GetUnspentOutputResponse;
  return proto.pb.GetUnspentOutputResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.GetUnspentOutputResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.GetUnspentOutputResponse}
 */
proto.pb.GetUnspentOutputResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.pb.Transaction.Input.Outpoint;
      reader.readMessage(value,proto.pb.Transaction.Input.Outpoint.deserializeBinaryFromReader);
      msg.setOutpoint(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setPubkeyScript(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setValue(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsCoinbase(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setBlockHeight(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.GetUnspentOutputResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.GetUnspentOutputResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.GetUnspentOutputResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetUnspentOutputResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOutpoint();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.pb.Transaction.Input.Outpoint.serializeBinaryToWriter
    );
  }
  f = message.getPubkeyScript_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
  f = message.getValue();
  if (f !== 0) {
    writer.writeInt64(
      3,
      f
    );
  }
  f = message.getIsCoinbase();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
  f = message.getBlockHeight();
  if (f !== 0) {
    writer.writeInt32(
      5,
      f
    );
  }
};


/**
 * optional Transaction.Input.Outpoint outpoint = 1;
 * @return {?proto.pb.Transaction.Input.Outpoint}
 */
proto.pb.GetUnspentOutputResponse.prototype.getOutpoint = function() {
  return /** @type{?proto.pb.Transaction.Input.Outpoint} */ (
    jspb.Message.getWrapperField(this, proto.pb.Transaction.Input.Outpoint, 1));
};


/**
 * @param {?proto.pb.Transaction.Input.Outpoint|undefined} value
 * @return {!proto.pb.GetUnspentOutputResponse} returns this
*/
proto.pb.GetUnspentOutputResponse.prototype.setOutpoint = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.pb.GetUnspentOutputResponse} returns this
 */
proto.pb.GetUnspentOutputResponse.prototype.clearOutpoint = function() {
  return this.setOutpoint(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.pb.GetUnspentOutputResponse.prototype.hasOutpoint = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional bytes pubkey_script = 2;
 * @return {!(string|Uint8Array)}
 */
proto.pb.GetUnspentOutputResponse.prototype.getPubkeyScript = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes pubkey_script = 2;
 * This is a type-conversion wrapper around `getPubkeyScript()`
 * @return {string}
 */
proto.pb.GetUnspentOutputResponse.prototype.getPubkeyScript_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getPubkeyScript()));
};


/**
 * optional bytes pubkey_script = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getPubkeyScript()`
 * @return {!Uint8Array}
 */
proto.pb.GetUnspentOutputResponse.prototype.getPubkeyScript_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getPubkeyScript()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.pb.GetUnspentOutputResponse} returns this
 */
proto.pb.GetUnspentOutputResponse.prototype.setPubkeyScript = function(value) {
  return jspb.Message.setProto3BytesField(this, 2, value);
};


/**
 * optional int64 value = 3;
 * @return {number}
 */
proto.pb.GetUnspentOutputResponse.prototype.getValue = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.pb.GetUnspentOutputResponse} returns this
 */
proto.pb.GetUnspentOutputResponse.prototype.setValue = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional bool is_coinbase = 4;
 * @return {boolean}
 */
proto.pb.GetUnspentOutputResponse.prototype.getIsCoinbase = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.pb.GetUnspentOutputResponse} returns this
 */
proto.pb.GetUnspentOutputResponse.prototype.setIsCoinbase = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};


/**
 * optional int32 block_height = 5;
 * @return {number}
 */
proto.pb.GetUnspentOutputResponse.prototype.getBlockHeight = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.pb.GetUnspentOutputResponse} returns this
 */
proto.pb.GetUnspentOutputResponse.prototype.setBlockHeight = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.GetMerkleProofRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.GetMerkleProofRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.GetMerkleProofRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetMerkleProofRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    transactionHash: msg.getTransactionHash_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.GetMerkleProofRequest}
 */
proto.pb.GetMerkleProofRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.GetMerkleProofRequest;
  return proto.pb.GetMerkleProofRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.GetMerkleProofRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.GetMerkleProofRequest}
 */
proto.pb.GetMerkleProofRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setTransactionHash(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.GetMerkleProofRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.GetMerkleProofRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.GetMerkleProofRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetMerkleProofRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTransactionHash_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
};


/**
 * optional bytes transaction_hash = 1;
 * @return {!(string|Uint8Array)}
 */
proto.pb.GetMerkleProofRequest.prototype.getTransactionHash = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes transaction_hash = 1;
 * This is a type-conversion wrapper around `getTransactionHash()`
 * @return {string}
 */
proto.pb.GetMerkleProofRequest.prototype.getTransactionHash_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getTransactionHash()));
};


/**
 * optional bytes transaction_hash = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getTransactionHash()`
 * @return {!Uint8Array}
 */
proto.pb.GetMerkleProofRequest.prototype.getTransactionHash_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getTransactionHash()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.pb.GetMerkleProofRequest} returns this
 */
proto.pb.GetMerkleProofRequest.prototype.setTransactionHash = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.pb.GetMerkleProofResponse.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.GetMerkleProofResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.GetMerkleProofResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.GetMerkleProofResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetMerkleProofResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    block: (f = msg.getBlock()) && proto.pb.BlockInfo.toObject(includeInstance, f),
    hashesList: msg.getHashesList_asB64(),
    flags: msg.getFlags_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.GetMerkleProofResponse}
 */
proto.pb.GetMerkleProofResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.GetMerkleProofResponse;
  return proto.pb.GetMerkleProofResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.GetMerkleProofResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.GetMerkleProofResponse}
 */
proto.pb.GetMerkleProofResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.pb.BlockInfo;
      reader.readMessage(value,proto.pb.BlockInfo.deserializeBinaryFromReader);
      msg.setBlock(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.addHashes(value);
      break;
    case 3:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setFlags(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.GetMerkleProofResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.GetMerkleProofResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.GetMerkleProofResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.GetMerkleProofResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getBlock();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.pb.BlockInfo.serializeBinaryToWriter
    );
  }
  f = message.getHashesList_asU8();
  if (f.length > 0) {
    writer.writeRepeatedBytes(
      2,
      f
    );
  }
  f = message.getFlags_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      3,
      f
    );
  }
};


/**
 * optional BlockInfo block = 1;
 * @return {?proto.pb.BlockInfo}
 */
proto.pb.GetMerkleProofResponse.prototype.getBlock = function() {
  return /** @type{?proto.pb.BlockInfo} */ (
    jspb.Message.getWrapperField(this, proto.pb.BlockInfo, 1));
};


/**
 * @param {?proto.pb.BlockInfo|undefined} value
 * @return {!proto.pb.GetMerkleProofResponse} returns this
*/
proto.pb.GetMerkleProofResponse.prototype.setBlock = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.pb.GetMerkleProofResponse} returns this
 */
proto.pb.GetMerkleProofResponse.prototype.clearBlock = function() {
  return this.setBlock(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.pb.GetMerkleProofResponse.prototype.hasBlock = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * repeated bytes hashes = 2;
 * @return {!(Array<!Uint8Array>|Array<string>)}
 */
proto.pb.GetMerkleProofResponse.prototype.getHashesList = function() {
  return /** @type {!(Array<!Uint8Array>|Array<string>)} */ (jspb.Message.getRepeatedField(this, 2));
};


/**
 * repeated bytes hashes = 2;
 * This is a type-conversion wrapper around `getHashesList()`
 * @return {!Array<string>}
 */
proto.pb.GetMerkleProofResponse.prototype.getHashesList_asB64 = function() {
  return /** @type {!Array<string>} */ (jspb.Message.bytesListAsB64(
      this.getHashesList()));
};


/**
 * repeated bytes hashes = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getHashesList()`
 * @return {!Array<!Uint8Array>}
 */
proto.pb.GetMerkleProofResponse.prototype.getHashesList_asU8 = function() {
  return /** @type {!Array<!Uint8Array>} */ (jspb.Message.bytesListAsU8(
      this.getHashesList()));
};


/**
 * @param {!(Array<!Uint8Array>|Array<string>)} value
 * @return {!proto.pb.GetMerkleProofResponse} returns this
 */
proto.pb.GetMerkleProofResponse.prototype.setHashesList = function(value) {
  return jspb.Message.setField(this, 2, value || []);
};


/**
 * @param {!(string|Uint8Array)} value
 * @param {number=} opt_index
 * @return {!proto.pb.GetMerkleProofResponse} returns this
 */
proto.pb.GetMerkleProofResponse.prototype.addHashes = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 2, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.pb.GetMerkleProofResponse} returns this
 */
proto.pb.GetMerkleProofResponse.prototype.clearHashesList = function() {
  return this.setHashesList([]);
};


/**
 * optional bytes flags = 3;
 * @return {!(string|Uint8Array)}
 */
proto.pb.GetMerkleProofResponse.prototype.getFlags = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * optional bytes flags = 3;
 * This is a type-conversion wrapper around `getFlags()`
 * @return {string}
 */
proto.pb.GetMerkleProofResponse.prototype.getFlags_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getFlags()));
};


/**
 * optional bytes flags = 3;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getFlags()`
 * @return {!Uint8Array}
 */
proto.pb.GetMerkleProofResponse.prototype.getFlags_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getFlags()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.pb.GetMerkleProofResponse} returns this
 */
proto.pb.GetMerkleProofResponse.prototype.setFlags = function(value) {
  return jspb.Message.setProto3BytesField(this, 3, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.SubmitTransactionRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.SubmitTransactionRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.SubmitTransactionRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.SubmitTransactionRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    transaction: msg.getTransaction_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.SubmitTransactionRequest}
 */
proto.pb.SubmitTransactionRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.SubmitTransactionRequest;
  return proto.pb.SubmitTransactionRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.SubmitTransactionRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.SubmitTransactionRequest}
 */
proto.pb.SubmitTransactionRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setTransaction(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.SubmitTransactionRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.SubmitTransactionRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.SubmitTransactionRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.SubmitTransactionRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTransaction_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
};


/**
 * optional bytes transaction = 1;
 * @return {!(string|Uint8Array)}
 */
proto.pb.SubmitTransactionRequest.prototype.getTransaction = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes transaction = 1;
 * This is a type-conversion wrapper around `getTransaction()`
 * @return {string}
 */
proto.pb.SubmitTransactionRequest.prototype.getTransaction_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getTransaction()));
};


/**
 * optional bytes transaction = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getTransaction()`
 * @return {!Uint8Array}
 */
proto.pb.SubmitTransactionRequest.prototype.getTransaction_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getTransaction()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.pb.SubmitTransactionRequest} returns this
 */
proto.pb.SubmitTransactionRequest.prototype.setTransaction = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.SubmitTransactionResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.SubmitTransactionResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.SubmitTransactionResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.SubmitTransactionResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    hash: msg.getHash_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.SubmitTransactionResponse}
 */
proto.pb.SubmitTransactionResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.SubmitTransactionResponse;
  return proto.pb.SubmitTransactionResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.SubmitTransactionResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.SubmitTransactionResponse}
 */
proto.pb.SubmitTransactionResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setHash(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.SubmitTransactionResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.SubmitTransactionResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.SubmitTransactionResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.SubmitTransactionResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getHash_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
};


/**
 * optional bytes hash = 1;
 * @return {!(string|Uint8Array)}
 */
proto.pb.SubmitTransactionResponse.prototype.getHash = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes hash = 1;
 * This is a type-conversion wrapper around `getHash()`
 * @return {string}
 */
proto.pb.SubmitTransactionResponse.prototype.getHash_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getHash()));
};


/**
 * optional bytes hash = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getHash()`
 * @return {!Uint8Array}
 */
proto.pb.SubmitTransactionResponse.prototype.getHash_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getHash()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.pb.SubmitTransactionResponse} returns this
 */
proto.pb.SubmitTransactionResponse.prototype.setHash = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.SubscribeTransactionsRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.SubscribeTransactionsRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.SubscribeTransactionsRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.SubscribeTransactionsRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    subscribe: (f = msg.getSubscribe()) && proto.pb.TransactionFilter.toObject(includeInstance, f),
    unsubscribe: (f = msg.getUnsubscribe()) && proto.pb.TransactionFilter.toObject(includeInstance, f),
    includeMempool: jspb.Message.getBooleanFieldWithDefault(msg, 3, false),
    includeInBlock: jspb.Message.getBooleanFieldWithDefault(msg, 4, false),
    serializeTx: jspb.Message.getBooleanFieldWithDefault(msg, 5, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.SubscribeTransactionsRequest}
 */
proto.pb.SubscribeTransactionsRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.SubscribeTransactionsRequest;
  return proto.pb.SubscribeTransactionsRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.SubscribeTransactionsRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.SubscribeTransactionsRequest}
 */
proto.pb.SubscribeTransactionsRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.pb.TransactionFilter;
      reader.readMessage(value,proto.pb.TransactionFilter.deserializeBinaryFromReader);
      msg.setSubscribe(value);
      break;
    case 2:
      var value = new proto.pb.TransactionFilter;
      reader.readMessage(value,proto.pb.TransactionFilter.deserializeBinaryFromReader);
      msg.setUnsubscribe(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIncludeMempool(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIncludeInBlock(value);
      break;
    case 5:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSerializeTx(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.SubscribeTransactionsRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.SubscribeTransactionsRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.SubscribeTransactionsRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.SubscribeTransactionsRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSubscribe();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.pb.TransactionFilter.serializeBinaryToWriter
    );
  }
  f = message.getUnsubscribe();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.pb.TransactionFilter.serializeBinaryToWriter
    );
  }
  f = message.getIncludeMempool();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
  f = message.getIncludeInBlock();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
  f = message.getSerializeTx();
  if (f) {
    writer.writeBool(
      5,
      f
    );
  }
};


/**
 * optional TransactionFilter subscribe = 1;
 * @return {?proto.pb.TransactionFilter}
 */
proto.pb.SubscribeTransactionsRequest.prototype.getSubscribe = function() {
  return /** @type{?proto.pb.TransactionFilter} */ (
    jspb.Message.getWrapperField(this, proto.pb.TransactionFilter, 1));
};


/**
 * @param {?proto.pb.TransactionFilter|undefined} value
 * @return {!proto.pb.SubscribeTransactionsRequest} returns this
*/
proto.pb.SubscribeTransactionsRequest.prototype.setSubscribe = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.pb.SubscribeTransactionsRequest} returns this
 */
proto.pb.SubscribeTransactionsRequest.prototype.clearSubscribe = function() {
  return this.setSubscribe(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.pb.SubscribeTransactionsRequest.prototype.hasSubscribe = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional TransactionFilter unsubscribe = 2;
 * @return {?proto.pb.TransactionFilter}
 */
proto.pb.SubscribeTransactionsRequest.prototype.getUnsubscribe = function() {
  return /** @type{?proto.pb.TransactionFilter} */ (
    jspb.Message.getWrapperField(this, proto.pb.TransactionFilter, 2));
};


/**
 * @param {?proto.pb.TransactionFilter|undefined} value
 * @return {!proto.pb.SubscribeTransactionsRequest} returns this
*/
proto.pb.SubscribeTransactionsRequest.prototype.setUnsubscribe = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.pb.SubscribeTransactionsRequest} returns this
 */
proto.pb.SubscribeTransactionsRequest.prototype.clearUnsubscribe = function() {
  return this.setUnsubscribe(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.pb.SubscribeTransactionsRequest.prototype.hasUnsubscribe = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional bool include_mempool = 3;
 * @return {boolean}
 */
proto.pb.SubscribeTransactionsRequest.prototype.getIncludeMempool = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.pb.SubscribeTransactionsRequest} returns this
 */
proto.pb.SubscribeTransactionsRequest.prototype.setIncludeMempool = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};


/**
 * optional bool include_in_block = 4;
 * @return {boolean}
 */
proto.pb.SubscribeTransactionsRequest.prototype.getIncludeInBlock = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.pb.SubscribeTransactionsRequest} returns this
 */
proto.pb.SubscribeTransactionsRequest.prototype.setIncludeInBlock = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};


/**
 * optional bool serialize_tx = 5;
 * @return {boolean}
 */
proto.pb.SubscribeTransactionsRequest.prototype.getSerializeTx = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 5, false));
};


/**
 * @param {boolean} value
 * @return {!proto.pb.SubscribeTransactionsRequest} returns this
 */
proto.pb.SubscribeTransactionsRequest.prototype.setSerializeTx = function(value) {
  return jspb.Message.setProto3BooleanField(this, 5, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.SubscribeBlocksRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.SubscribeBlocksRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.SubscribeBlocksRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.SubscribeBlocksRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    fullBlock: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
    fullTransactions: jspb.Message.getBooleanFieldWithDefault(msg, 2, false),
    serializeBlock: jspb.Message.getBooleanFieldWithDefault(msg, 3, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.SubscribeBlocksRequest}
 */
proto.pb.SubscribeBlocksRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.SubscribeBlocksRequest;
  return proto.pb.SubscribeBlocksRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.SubscribeBlocksRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.SubscribeBlocksRequest}
 */
proto.pb.SubscribeBlocksRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setFullBlock(value);
      break;
    case 2:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setFullTransactions(value);
      break;
    case 3:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSerializeBlock(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.SubscribeBlocksRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.SubscribeBlocksRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.SubscribeBlocksRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.SubscribeBlocksRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFullBlock();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getFullTransactions();
  if (f) {
    writer.writeBool(
      2,
      f
    );
  }
  f = message.getSerializeBlock();
  if (f) {
    writer.writeBool(
      3,
      f
    );
  }
};


/**
 * optional bool full_block = 1;
 * @return {boolean}
 */
proto.pb.SubscribeBlocksRequest.prototype.getFullBlock = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.pb.SubscribeBlocksRequest} returns this
 */
proto.pb.SubscribeBlocksRequest.prototype.setFullBlock = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional bool full_transactions = 2;
 * @return {boolean}
 */
proto.pb.SubscribeBlocksRequest.prototype.getFullTransactions = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 2, false));
};


/**
 * @param {boolean} value
 * @return {!proto.pb.SubscribeBlocksRequest} returns this
 */
proto.pb.SubscribeBlocksRequest.prototype.setFullTransactions = function(value) {
  return jspb.Message.setProto3BooleanField(this, 2, value);
};


/**
 * optional bool serialize_block = 3;
 * @return {boolean}
 */
proto.pb.SubscribeBlocksRequest.prototype.getSerializeBlock = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 3, false));
};


/**
 * @param {boolean} value
 * @return {!proto.pb.SubscribeBlocksRequest} returns this
 */
proto.pb.SubscribeBlocksRequest.prototype.setSerializeBlock = function(value) {
  return jspb.Message.setProto3BooleanField(this, 3, value);
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.pb.BlockNotification.oneofGroups_ = [[2,3,4]];

/**
 * @enum {number}
 */
proto.pb.BlockNotification.BlockCase = {
  BLOCK_NOT_SET: 0,
  BLOCK_INFO: 2,
  MARSHALED_BLOCK: 3,
  SERIALIZED_BLOCK: 4
};

/**
 * @return {proto.pb.BlockNotification.BlockCase}
 */
proto.pb.BlockNotification.prototype.getBlockCase = function() {
  return /** @type {proto.pb.BlockNotification.BlockCase} */(jspb.Message.computeOneofCase(this, proto.pb.BlockNotification.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.BlockNotification.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.BlockNotification.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.BlockNotification} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.BlockNotification.toObject = function(includeInstance, msg) {
  var f, obj = {
    type: jspb.Message.getFieldWithDefault(msg, 1, 0),
    blockInfo: (f = msg.getBlockInfo()) && proto.pb.BlockInfo.toObject(includeInstance, f),
    marshaledBlock: (f = msg.getMarshaledBlock()) && proto.pb.Block.toObject(includeInstance, f),
    serializedBlock: msg.getSerializedBlock_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.BlockNotification}
 */
proto.pb.BlockNotification.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.BlockNotification;
  return proto.pb.BlockNotification.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.BlockNotification} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.BlockNotification}
 */
proto.pb.BlockNotification.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.pb.BlockNotification.Type} */ (reader.readEnum());
      msg.setType(value);
      break;
    case 2:
      var value = new proto.pb.BlockInfo;
      reader.readMessage(value,proto.pb.BlockInfo.deserializeBinaryFromReader);
      msg.setBlockInfo(value);
      break;
    case 3:
      var value = new proto.pb.Block;
      reader.readMessage(value,proto.pb.Block.deserializeBinaryFromReader);
      msg.setMarshaledBlock(value);
      break;
    case 4:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setSerializedBlock(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.BlockNotification.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.BlockNotification.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.BlockNotification} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.BlockNotification.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getType();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getBlockInfo();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.pb.BlockInfo.serializeBinaryToWriter
    );
  }
  f = message.getMarshaledBlock();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.pb.Block.serializeBinaryToWriter
    );
  }
  f = /** @type {!(string|Uint8Array)} */ (jspb.Message.getField(message, 4));
  if (f != null) {
    writer.writeBytes(
      4,
      f
    );
  }
};


/**
 * @enum {number}
 */
proto.pb.BlockNotification.Type = {
  CONNECTED: 0,
  DISCONNECTED: 1
};

/**
 * optional Type type = 1;
 * @return {!proto.pb.BlockNotification.Type}
 */
proto.pb.BlockNotification.prototype.getType = function() {
  return /** @type {!proto.pb.BlockNotification.Type} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.pb.BlockNotification.Type} value
 * @return {!proto.pb.BlockNotification} returns this
 */
proto.pb.BlockNotification.prototype.setType = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional BlockInfo block_info = 2;
 * @return {?proto.pb.BlockInfo}
 */
proto.pb.BlockNotification.prototype.getBlockInfo = function() {
  return /** @type{?proto.pb.BlockInfo} */ (
    jspb.Message.getWrapperField(this, proto.pb.BlockInfo, 2));
};


/**
 * @param {?proto.pb.BlockInfo|undefined} value
 * @return {!proto.pb.BlockNotification} returns this
*/
proto.pb.BlockNotification.prototype.setBlockInfo = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.pb.BlockNotification.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.pb.BlockNotification} returns this
 */
proto.pb.BlockNotification.prototype.clearBlockInfo = function() {
  return this.setBlockInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.pb.BlockNotification.prototype.hasBlockInfo = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional Block marshaled_block = 3;
 * @return {?proto.pb.Block}
 */
proto.pb.BlockNotification.prototype.getMarshaledBlock = function() {
  return /** @type{?proto.pb.Block} */ (
    jspb.Message.getWrapperField(this, proto.pb.Block, 3));
};


/**
 * @param {?proto.pb.Block|undefined} value
 * @return {!proto.pb.BlockNotification} returns this
*/
proto.pb.BlockNotification.prototype.setMarshaledBlock = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.pb.BlockNotification.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.pb.BlockNotification} returns this
 */
proto.pb.BlockNotification.prototype.clearMarshaledBlock = function() {
  return this.setMarshaledBlock(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.pb.BlockNotification.prototype.hasMarshaledBlock = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional bytes serialized_block = 4;
 * @return {!(string|Uint8Array)}
 */
proto.pb.BlockNotification.prototype.getSerializedBlock = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * optional bytes serialized_block = 4;
 * This is a type-conversion wrapper around `getSerializedBlock()`
 * @return {string}
 */
proto.pb.BlockNotification.prototype.getSerializedBlock_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getSerializedBlock()));
};


/**
 * optional bytes serialized_block = 4;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getSerializedBlock()`
 * @return {!Uint8Array}
 */
proto.pb.BlockNotification.prototype.getSerializedBlock_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getSerializedBlock()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.pb.BlockNotification} returns this
 */
proto.pb.BlockNotification.prototype.setSerializedBlock = function(value) {
  return jspb.Message.setOneofField(this, 4, proto.pb.BlockNotification.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.pb.BlockNotification} returns this
 */
proto.pb.BlockNotification.prototype.clearSerializedBlock = function() {
  return jspb.Message.setOneofField(this, 4, proto.pb.BlockNotification.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.pb.BlockNotification.prototype.hasSerializedBlock = function() {
  return jspb.Message.getField(this, 4) != null;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.pb.TransactionNotification.oneofGroups_ = [[2,3,4]];

/**
 * @enum {number}
 */
proto.pb.TransactionNotification.TransactionCase = {
  TRANSACTION_NOT_SET: 0,
  CONFIRMED_TRANSACTION: 2,
  UNCONFIRMED_TRANSACTION: 3,
  SERIALIZED_TRANSACTION: 4
};

/**
 * @return {proto.pb.TransactionNotification.TransactionCase}
 */
proto.pb.TransactionNotification.prototype.getTransactionCase = function() {
  return /** @type {proto.pb.TransactionNotification.TransactionCase} */(jspb.Message.computeOneofCase(this, proto.pb.TransactionNotification.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.TransactionNotification.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.TransactionNotification.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.TransactionNotification} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.TransactionNotification.toObject = function(includeInstance, msg) {
  var f, obj = {
    type: jspb.Message.getFieldWithDefault(msg, 1, 0),
    confirmedTransaction: (f = msg.getConfirmedTransaction()) && proto.pb.Transaction.toObject(includeInstance, f),
    unconfirmedTransaction: (f = msg.getUnconfirmedTransaction()) && proto.pb.MempoolTransaction.toObject(includeInstance, f),
    serializedTransaction: msg.getSerializedTransaction_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.TransactionNotification}
 */
proto.pb.TransactionNotification.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.TransactionNotification;
  return proto.pb.TransactionNotification.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.TransactionNotification} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.TransactionNotification}
 */
proto.pb.TransactionNotification.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.pb.TransactionNotification.Type} */ (reader.readEnum());
      msg.setType(value);
      break;
    case 2:
      var value = new proto.pb.Transaction;
      reader.readMessage(value,proto.pb.Transaction.deserializeBinaryFromReader);
      msg.setConfirmedTransaction(value);
      break;
    case 3:
      var value = new proto.pb.MempoolTransaction;
      reader.readMessage(value,proto.pb.MempoolTransaction.deserializeBinaryFromReader);
      msg.setUnconfirmedTransaction(value);
      break;
    case 4:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setSerializedTransaction(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.TransactionNotification.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.TransactionNotification.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.TransactionNotification} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.TransactionNotification.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getType();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getConfirmedTransaction();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.pb.Transaction.serializeBinaryToWriter
    );
  }
  f = message.getUnconfirmedTransaction();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.pb.MempoolTransaction.serializeBinaryToWriter
    );
  }
  f = /** @type {!(string|Uint8Array)} */ (jspb.Message.getField(message, 4));
  if (f != null) {
    writer.writeBytes(
      4,
      f
    );
  }
};


/**
 * @enum {number}
 */
proto.pb.TransactionNotification.Type = {
  UNCONFIRMED: 0,
  CONFIRMED: 1
};

/**
 * optional Type type = 1;
 * @return {!proto.pb.TransactionNotification.Type}
 */
proto.pb.TransactionNotification.prototype.getType = function() {
  return /** @type {!proto.pb.TransactionNotification.Type} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.pb.TransactionNotification.Type} value
 * @return {!proto.pb.TransactionNotification} returns this
 */
proto.pb.TransactionNotification.prototype.setType = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional Transaction confirmed_transaction = 2;
 * @return {?proto.pb.Transaction}
 */
proto.pb.TransactionNotification.prototype.getConfirmedTransaction = function() {
  return /** @type{?proto.pb.Transaction} */ (
    jspb.Message.getWrapperField(this, proto.pb.Transaction, 2));
};


/**
 * @param {?proto.pb.Transaction|undefined} value
 * @return {!proto.pb.TransactionNotification} returns this
*/
proto.pb.TransactionNotification.prototype.setConfirmedTransaction = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.pb.TransactionNotification.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.pb.TransactionNotification} returns this
 */
proto.pb.TransactionNotification.prototype.clearConfirmedTransaction = function() {
  return this.setConfirmedTransaction(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.pb.TransactionNotification.prototype.hasConfirmedTransaction = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional MempoolTransaction unconfirmed_transaction = 3;
 * @return {?proto.pb.MempoolTransaction}
 */
proto.pb.TransactionNotification.prototype.getUnconfirmedTransaction = function() {
  return /** @type{?proto.pb.MempoolTransaction} */ (
    jspb.Message.getWrapperField(this, proto.pb.MempoolTransaction, 3));
};


/**
 * @param {?proto.pb.MempoolTransaction|undefined} value
 * @return {!proto.pb.TransactionNotification} returns this
*/
proto.pb.TransactionNotification.prototype.setUnconfirmedTransaction = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.pb.TransactionNotification.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.pb.TransactionNotification} returns this
 */
proto.pb.TransactionNotification.prototype.clearUnconfirmedTransaction = function() {
  return this.setUnconfirmedTransaction(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.pb.TransactionNotification.prototype.hasUnconfirmedTransaction = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional bytes serialized_transaction = 4;
 * @return {!(string|Uint8Array)}
 */
proto.pb.TransactionNotification.prototype.getSerializedTransaction = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * optional bytes serialized_transaction = 4;
 * This is a type-conversion wrapper around `getSerializedTransaction()`
 * @return {string}
 */
proto.pb.TransactionNotification.prototype.getSerializedTransaction_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getSerializedTransaction()));
};


/**
 * optional bytes serialized_transaction = 4;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getSerializedTransaction()`
 * @return {!Uint8Array}
 */
proto.pb.TransactionNotification.prototype.getSerializedTransaction_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getSerializedTransaction()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.pb.TransactionNotification} returns this
 */
proto.pb.TransactionNotification.prototype.setSerializedTransaction = function(value) {
  return jspb.Message.setOneofField(this, 4, proto.pb.TransactionNotification.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.pb.TransactionNotification} returns this
 */
proto.pb.TransactionNotification.prototype.clearSerializedTransaction = function() {
  return jspb.Message.setOneofField(this, 4, proto.pb.TransactionNotification.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.pb.TransactionNotification.prototype.hasSerializedTransaction = function() {
  return jspb.Message.getField(this, 4) != null;
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.BlockInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.BlockInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.BlockInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.BlockInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    hash: msg.getHash_asB64(),
    height: jspb.Message.getFieldWithDefault(msg, 2, 0),
    version: jspb.Message.getFieldWithDefault(msg, 3, 0),
    previousBlock: msg.getPreviousBlock_asB64(),
    merkleRoot: msg.getMerkleRoot_asB64(),
    timestamp: jspb.Message.getFieldWithDefault(msg, 6, 0),
    bits: jspb.Message.getFieldWithDefault(msg, 7, 0),
    nonce: jspb.Message.getFieldWithDefault(msg, 8, 0),
    confirmations: jspb.Message.getFieldWithDefault(msg, 9, 0),
    difficulty: jspb.Message.getFloatingPointFieldWithDefault(msg, 10, 0.0),
    nextBlockHash: msg.getNextBlockHash_asB64(),
    size: jspb.Message.getFieldWithDefault(msg, 12, 0),
    medianTime: jspb.Message.getFieldWithDefault(msg, 13, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.BlockInfo}
 */
proto.pb.BlockInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.BlockInfo;
  return proto.pb.BlockInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.BlockInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.BlockInfo}
 */
proto.pb.BlockInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setHash(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setHeight(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setVersion(value);
      break;
    case 4:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setPreviousBlock(value);
      break;
    case 5:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setMerkleRoot(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setTimestamp(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setBits(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setNonce(value);
      break;
    case 9:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setConfirmations(value);
      break;
    case 10:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setDifficulty(value);
      break;
    case 11:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setNextBlockHash(value);
      break;
    case 12:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setSize(value);
      break;
    case 13:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setMedianTime(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.BlockInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.BlockInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.BlockInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.BlockInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getHash_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getHeight();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getVersion();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = message.getPreviousBlock_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      4,
      f
    );
  }
  f = message.getMerkleRoot_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      5,
      f
    );
  }
  f = message.getTimestamp();
  if (f !== 0) {
    writer.writeInt64(
      6,
      f
    );
  }
  f = message.getBits();
  if (f !== 0) {
    writer.writeUint32(
      7,
      f
    );
  }
  f = message.getNonce();
  if (f !== 0) {
    writer.writeUint32(
      8,
      f
    );
  }
  f = message.getConfirmations();
  if (f !== 0) {
    writer.writeInt32(
      9,
      f
    );
  }
  f = message.getDifficulty();
  if (f !== 0.0) {
    writer.writeDouble(
      10,
      f
    );
  }
  f = message.getNextBlockHash_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      11,
      f
    );
  }
  f = message.getSize();
  if (f !== 0) {
    writer.writeInt32(
      12,
      f
    );
  }
  f = message.getMedianTime();
  if (f !== 0) {
    writer.writeInt64(
      13,
      f
    );
  }
};


/**
 * optional bytes hash = 1;
 * @return {!(string|Uint8Array)}
 */
proto.pb.BlockInfo.prototype.getHash = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes hash = 1;
 * This is a type-conversion wrapper around `getHash()`
 * @return {string}
 */
proto.pb.BlockInfo.prototype.getHash_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getHash()));
};


/**
 * optional bytes hash = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getHash()`
 * @return {!Uint8Array}
 */
proto.pb.BlockInfo.prototype.getHash_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getHash()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.pb.BlockInfo} returns this
 */
proto.pb.BlockInfo.prototype.setHash = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional int32 height = 2;
 * @return {number}
 */
proto.pb.BlockInfo.prototype.getHeight = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.pb.BlockInfo} returns this
 */
proto.pb.BlockInfo.prototype.setHeight = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int32 version = 3;
 * @return {number}
 */
proto.pb.BlockInfo.prototype.getVersion = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.pb.BlockInfo} returns this
 */
proto.pb.BlockInfo.prototype.setVersion = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional bytes previous_block = 4;
 * @return {!(string|Uint8Array)}
 */
proto.pb.BlockInfo.prototype.getPreviousBlock = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * optional bytes previous_block = 4;
 * This is a type-conversion wrapper around `getPreviousBlock()`
 * @return {string}
 */
proto.pb.BlockInfo.prototype.getPreviousBlock_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getPreviousBlock()));
};


/**
 * optional bytes previous_block = 4;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getPreviousBlock()`
 * @return {!Uint8Array}
 */
proto.pb.BlockInfo.prototype.getPreviousBlock_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getPreviousBlock()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.pb.BlockInfo} returns this
 */
proto.pb.BlockInfo.prototype.setPreviousBlock = function(value) {
  return jspb.Message.setProto3BytesField(this, 4, value);
};


/**
 * optional bytes merkle_root = 5;
 * @return {!(string|Uint8Array)}
 */
proto.pb.BlockInfo.prototype.getMerkleRoot = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * optional bytes merkle_root = 5;
 * This is a type-conversion wrapper around `getMerkleRoot()`
 * @return {string}
 */
proto.pb.BlockInfo.prototype.getMerkleRoot_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getMerkleRoot()));
};


/**
 * optional bytes merkle_root = 5;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getMerkleRoot()`
 * @return {!Uint8Array}
 */
proto.pb.BlockInfo.prototype.getMerkleRoot_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getMerkleRoot()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.pb.BlockInfo} returns this
 */
proto.pb.BlockInfo.prototype.setMerkleRoot = function(value) {
  return jspb.Message.setProto3BytesField(this, 5, value);
};


/**
 * optional int64 timestamp = 6;
 * @return {number}
 */
proto.pb.BlockInfo.prototype.getTimestamp = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.pb.BlockInfo} returns this
 */
proto.pb.BlockInfo.prototype.setTimestamp = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};


/**
 * optional uint32 bits = 7;
 * @return {number}
 */
proto.pb.BlockInfo.prototype.getBits = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {number} value
 * @return {!proto.pb.BlockInfo} returns this
 */
proto.pb.BlockInfo.prototype.setBits = function(value) {
  return jspb.Message.setProto3IntField(this, 7, value);
};


/**
 * optional uint32 nonce = 8;
 * @return {number}
 */
proto.pb.BlockInfo.prototype.getNonce = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {number} value
 * @return {!proto.pb.BlockInfo} returns this
 */
proto.pb.BlockInfo.prototype.setNonce = function(value) {
  return jspb.Message.setProto3IntField(this, 8, value);
};


/**
 * optional int32 confirmations = 9;
 * @return {number}
 */
proto.pb.BlockInfo.prototype.getConfirmations = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/**
 * @param {number} value
 * @return {!proto.pb.BlockInfo} returns this
 */
proto.pb.BlockInfo.prototype.setConfirmations = function(value) {
  return jspb.Message.setProto3IntField(this, 9, value);
};


/**
 * optional double difficulty = 10;
 * @return {number}
 */
proto.pb.BlockInfo.prototype.getDifficulty = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 10, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.pb.BlockInfo} returns this
 */
proto.pb.BlockInfo.prototype.setDifficulty = function(value) {
  return jspb.Message.setProto3FloatField(this, 10, value);
};


/**
 * optional bytes next_block_hash = 11;
 * @return {!(string|Uint8Array)}
 */
proto.pb.BlockInfo.prototype.getNextBlockHash = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 11, ""));
};


/**
 * optional bytes next_block_hash = 11;
 * This is a type-conversion wrapper around `getNextBlockHash()`
 * @return {string}
 */
proto.pb.BlockInfo.prototype.getNextBlockHash_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getNextBlockHash()));
};


/**
 * optional bytes next_block_hash = 11;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getNextBlockHash()`
 * @return {!Uint8Array}
 */
proto.pb.BlockInfo.prototype.getNextBlockHash_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getNextBlockHash()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.pb.BlockInfo} returns this
 */
proto.pb.BlockInfo.prototype.setNextBlockHash = function(value) {
  return jspb.Message.setProto3BytesField(this, 11, value);
};


/**
 * optional int32 size = 12;
 * @return {number}
 */
proto.pb.BlockInfo.prototype.getSize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 12, 0));
};


/**
 * @param {number} value
 * @return {!proto.pb.BlockInfo} returns this
 */
proto.pb.BlockInfo.prototype.setSize = function(value) {
  return jspb.Message.setProto3IntField(this, 12, value);
};


/**
 * optional int64 median_time = 13;
 * @return {number}
 */
proto.pb.BlockInfo.prototype.getMedianTime = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 13, 0));
};


/**
 * @param {number} value
 * @return {!proto.pb.BlockInfo} returns this
 */
proto.pb.BlockInfo.prototype.setMedianTime = function(value) {
  return jspb.Message.setProto3IntField(this, 13, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.pb.Block.repeatedFields_ = [2];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.Block.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.Block.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.Block} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.Block.toObject = function(includeInstance, msg) {
  var f, obj = {
    info: (f = msg.getInfo()) && proto.pb.BlockInfo.toObject(includeInstance, f),
    transactionDataList: jspb.Message.toObjectList(msg.getTransactionDataList(),
    proto.pb.Block.TransactionData.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.Block}
 */
proto.pb.Block.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.Block;
  return proto.pb.Block.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.Block} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.Block}
 */
proto.pb.Block.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.pb.BlockInfo;
      reader.readMessage(value,proto.pb.BlockInfo.deserializeBinaryFromReader);
      msg.setInfo(value);
      break;
    case 2:
      var value = new proto.pb.Block.TransactionData;
      reader.readMessage(value,proto.pb.Block.TransactionData.deserializeBinaryFromReader);
      msg.addTransactionData(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.Block.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.Block.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.Block} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.Block.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getInfo();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.pb.BlockInfo.serializeBinaryToWriter
    );
  }
  f = message.getTransactionDataList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.pb.Block.TransactionData.serializeBinaryToWriter
    );
  }
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.pb.Block.TransactionData.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.pb.Block.TransactionData.TxidsOrTxsCase = {
  TXIDS_OR_TXS_NOT_SET: 0,
  TRANSACTION_HASH: 1,
  TRANSACTION: 2
};

/**
 * @return {proto.pb.Block.TransactionData.TxidsOrTxsCase}
 */
proto.pb.Block.TransactionData.prototype.getTxidsOrTxsCase = function() {
  return /** @type {proto.pb.Block.TransactionData.TxidsOrTxsCase} */(jspb.Message.computeOneofCase(this, proto.pb.Block.TransactionData.oneofGroups_[0]));
};



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.Block.TransactionData.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.Block.TransactionData.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.Block.TransactionData} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.Block.TransactionData.toObject = function(includeInstance, msg) {
  var f, obj = {
    transactionHash: msg.getTransactionHash_asB64(),
    transaction: (f = msg.getTransaction()) && proto.pb.Transaction.toObject(includeInstance, f)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.Block.TransactionData}
 */
proto.pb.Block.TransactionData.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.Block.TransactionData;
  return proto.pb.Block.TransactionData.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.Block.TransactionData} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.Block.TransactionData}
 */
proto.pb.Block.TransactionData.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setTransactionHash(value);
      break;
    case 2:
      var value = new proto.pb.Transaction;
      reader.readMessage(value,proto.pb.Transaction.deserializeBinaryFromReader);
      msg.setTransaction(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.Block.TransactionData.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.Block.TransactionData.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.Block.TransactionData} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.Block.TransactionData.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {!(string|Uint8Array)} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getTransaction();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.pb.Transaction.serializeBinaryToWriter
    );
  }
};


/**
 * optional bytes transaction_hash = 1;
 * @return {!(string|Uint8Array)}
 */
proto.pb.Block.TransactionData.prototype.getTransactionHash = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes transaction_hash = 1;
 * This is a type-conversion wrapper around `getTransactionHash()`
 * @return {string}
 */
proto.pb.Block.TransactionData.prototype.getTransactionHash_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getTransactionHash()));
};


/**
 * optional bytes transaction_hash = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getTransactionHash()`
 * @return {!Uint8Array}
 */
proto.pb.Block.TransactionData.prototype.getTransactionHash_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getTransactionHash()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.pb.Block.TransactionData} returns this
 */
proto.pb.Block.TransactionData.prototype.setTransactionHash = function(value) {
  return jspb.Message.setOneofField(this, 1, proto.pb.Block.TransactionData.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.pb.Block.TransactionData} returns this
 */
proto.pb.Block.TransactionData.prototype.clearTransactionHash = function() {
  return jspb.Message.setOneofField(this, 1, proto.pb.Block.TransactionData.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.pb.Block.TransactionData.prototype.hasTransactionHash = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Transaction transaction = 2;
 * @return {?proto.pb.Transaction}
 */
proto.pb.Block.TransactionData.prototype.getTransaction = function() {
  return /** @type{?proto.pb.Transaction} */ (
    jspb.Message.getWrapperField(this, proto.pb.Transaction, 2));
};


/**
 * @param {?proto.pb.Transaction|undefined} value
 * @return {!proto.pb.Block.TransactionData} returns this
*/
proto.pb.Block.TransactionData.prototype.setTransaction = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.pb.Block.TransactionData.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.pb.Block.TransactionData} returns this
 */
proto.pb.Block.TransactionData.prototype.clearTransaction = function() {
  return this.setTransaction(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.pb.Block.TransactionData.prototype.hasTransaction = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional BlockInfo info = 1;
 * @return {?proto.pb.BlockInfo}
 */
proto.pb.Block.prototype.getInfo = function() {
  return /** @type{?proto.pb.BlockInfo} */ (
    jspb.Message.getWrapperField(this, proto.pb.BlockInfo, 1));
};


/**
 * @param {?proto.pb.BlockInfo|undefined} value
 * @return {!proto.pb.Block} returns this
*/
proto.pb.Block.prototype.setInfo = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.pb.Block} returns this
 */
proto.pb.Block.prototype.clearInfo = function() {
  return this.setInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.pb.Block.prototype.hasInfo = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * repeated TransactionData transaction_data = 2;
 * @return {!Array<!proto.pb.Block.TransactionData>}
 */
proto.pb.Block.prototype.getTransactionDataList = function() {
  return /** @type{!Array<!proto.pb.Block.TransactionData>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.pb.Block.TransactionData, 2));
};


/**
 * @param {!Array<!proto.pb.Block.TransactionData>} value
 * @return {!proto.pb.Block} returns this
*/
proto.pb.Block.prototype.setTransactionDataList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.pb.Block.TransactionData=} opt_value
 * @param {number=} opt_index
 * @return {!proto.pb.Block.TransactionData}
 */
proto.pb.Block.prototype.addTransactionData = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.pb.Block.TransactionData, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.pb.Block} returns this
 */
proto.pb.Block.prototype.clearTransactionDataList = function() {
  return this.setTransactionDataList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.pb.Transaction.repeatedFields_ = [3,4];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.Transaction.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.Transaction.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.Transaction} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.Transaction.toObject = function(includeInstance, msg) {
  var f, obj = {
    hash: msg.getHash_asB64(),
    version: jspb.Message.getFieldWithDefault(msg, 2, 0),
    inputsList: jspb.Message.toObjectList(msg.getInputsList(),
    proto.pb.Transaction.Input.toObject, includeInstance),
    outputsList: jspb.Message.toObjectList(msg.getOutputsList(),
    proto.pb.Transaction.Output.toObject, includeInstance),
    lockTime: jspb.Message.getFieldWithDefault(msg, 5, 0),
    size: jspb.Message.getFieldWithDefault(msg, 8, 0),
    timestamp: jspb.Message.getFieldWithDefault(msg, 9, 0),
    confirmations: jspb.Message.getFieldWithDefault(msg, 10, 0),
    blockHeight: jspb.Message.getFieldWithDefault(msg, 11, 0),
    blockHash: msg.getBlockHash_asB64()
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.Transaction}
 */
proto.pb.Transaction.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.Transaction;
  return proto.pb.Transaction.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.Transaction} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.Transaction}
 */
proto.pb.Transaction.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setHash(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setVersion(value);
      break;
    case 3:
      var value = new proto.pb.Transaction.Input;
      reader.readMessage(value,proto.pb.Transaction.Input.deserializeBinaryFromReader);
      msg.addInputs(value);
      break;
    case 4:
      var value = new proto.pb.Transaction.Output;
      reader.readMessage(value,proto.pb.Transaction.Output.deserializeBinaryFromReader);
      msg.addOutputs(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setLockTime(value);
      break;
    case 8:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setSize(value);
      break;
    case 9:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setTimestamp(value);
      break;
    case 10:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setConfirmations(value);
      break;
    case 11:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setBlockHeight(value);
      break;
    case 12:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setBlockHash(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.Transaction.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.Transaction.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.Transaction} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.Transaction.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getHash_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getVersion();
  if (f !== 0) {
    writer.writeInt32(
      2,
      f
    );
  }
  f = message.getInputsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.pb.Transaction.Input.serializeBinaryToWriter
    );
  }
  f = message.getOutputsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      proto.pb.Transaction.Output.serializeBinaryToWriter
    );
  }
  f = message.getLockTime();
  if (f !== 0) {
    writer.writeUint32(
      5,
      f
    );
  }
  f = message.getSize();
  if (f !== 0) {
    writer.writeInt32(
      8,
      f
    );
  }
  f = message.getTimestamp();
  if (f !== 0) {
    writer.writeInt64(
      9,
      f
    );
  }
  f = message.getConfirmations();
  if (f !== 0) {
    writer.writeInt32(
      10,
      f
    );
  }
  f = message.getBlockHeight();
  if (f !== 0) {
    writer.writeInt32(
      11,
      f
    );
  }
  f = message.getBlockHash_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      12,
      f
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.Transaction.Input.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.Transaction.Input.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.Transaction.Input} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.Transaction.Input.toObject = function(includeInstance, msg) {
  var f, obj = {
    index: jspb.Message.getFieldWithDefault(msg, 1, 0),
    outpoint: (f = msg.getOutpoint()) && proto.pb.Transaction.Input.Outpoint.toObject(includeInstance, f),
    signatureScript: msg.getSignatureScript_asB64(),
    sequence: jspb.Message.getFieldWithDefault(msg, 4, 0),
    value: jspb.Message.getFieldWithDefault(msg, 5, 0),
    previousScript: msg.getPreviousScript_asB64(),
    address: jspb.Message.getFieldWithDefault(msg, 7, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.Transaction.Input}
 */
proto.pb.Transaction.Input.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.Transaction.Input;
  return proto.pb.Transaction.Input.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.Transaction.Input} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.Transaction.Input}
 */
proto.pb.Transaction.Input.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setIndex(value);
      break;
    case 2:
      var value = new proto.pb.Transaction.Input.Outpoint;
      reader.readMessage(value,proto.pb.Transaction.Input.Outpoint.deserializeBinaryFromReader);
      msg.setOutpoint(value);
      break;
    case 3:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setSignatureScript(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setSequence(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setValue(value);
      break;
    case 6:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setPreviousScript(value);
      break;
    case 7:
      var value = /** @type {string} */ (reader.readString());
      msg.setAddress(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.Transaction.Input.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.Transaction.Input.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.Transaction.Input} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.Transaction.Input.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getIndex();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = message.getOutpoint();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.pb.Transaction.Input.Outpoint.serializeBinaryToWriter
    );
  }
  f = message.getSignatureScript_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      3,
      f
    );
  }
  f = message.getSequence();
  if (f !== 0) {
    writer.writeUint32(
      4,
      f
    );
  }
  f = message.getValue();
  if (f !== 0) {
    writer.writeInt64(
      5,
      f
    );
  }
  f = message.getPreviousScript_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      6,
      f
    );
  }
  f = message.getAddress();
  if (f.length > 0) {
    writer.writeString(
      7,
      f
    );
  }
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.Transaction.Input.Outpoint.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.Transaction.Input.Outpoint.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.Transaction.Input.Outpoint} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.Transaction.Input.Outpoint.toObject = function(includeInstance, msg) {
  var f, obj = {
    hash: msg.getHash_asB64(),
    index: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.Transaction.Input.Outpoint}
 */
proto.pb.Transaction.Input.Outpoint.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.Transaction.Input.Outpoint;
  return proto.pb.Transaction.Input.Outpoint.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.Transaction.Input.Outpoint} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.Transaction.Input.Outpoint}
 */
proto.pb.Transaction.Input.Outpoint.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setHash(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setIndex(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.Transaction.Input.Outpoint.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.Transaction.Input.Outpoint.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.Transaction.Input.Outpoint} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.Transaction.Input.Outpoint.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getHash_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getIndex();
  if (f !== 0) {
    writer.writeUint32(
      2,
      f
    );
  }
};


/**
 * optional bytes hash = 1;
 * @return {!(string|Uint8Array)}
 */
proto.pb.Transaction.Input.Outpoint.prototype.getHash = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes hash = 1;
 * This is a type-conversion wrapper around `getHash()`
 * @return {string}
 */
proto.pb.Transaction.Input.Outpoint.prototype.getHash_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getHash()));
};


/**
 * optional bytes hash = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getHash()`
 * @return {!Uint8Array}
 */
proto.pb.Transaction.Input.Outpoint.prototype.getHash_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getHash()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.pb.Transaction.Input.Outpoint} returns this
 */
proto.pb.Transaction.Input.Outpoint.prototype.setHash = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional uint32 index = 2;
 * @return {number}
 */
proto.pb.Transaction.Input.Outpoint.prototype.getIndex = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.pb.Transaction.Input.Outpoint} returns this
 */
proto.pb.Transaction.Input.Outpoint.prototype.setIndex = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional uint32 index = 1;
 * @return {number}
 */
proto.pb.Transaction.Input.prototype.getIndex = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.pb.Transaction.Input} returns this
 */
proto.pb.Transaction.Input.prototype.setIndex = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional Outpoint outpoint = 2;
 * @return {?proto.pb.Transaction.Input.Outpoint}
 */
proto.pb.Transaction.Input.prototype.getOutpoint = function() {
  return /** @type{?proto.pb.Transaction.Input.Outpoint} */ (
    jspb.Message.getWrapperField(this, proto.pb.Transaction.Input.Outpoint, 2));
};


/**
 * @param {?proto.pb.Transaction.Input.Outpoint|undefined} value
 * @return {!proto.pb.Transaction.Input} returns this
*/
proto.pb.Transaction.Input.prototype.setOutpoint = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.pb.Transaction.Input} returns this
 */
proto.pb.Transaction.Input.prototype.clearOutpoint = function() {
  return this.setOutpoint(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.pb.Transaction.Input.prototype.hasOutpoint = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional bytes signature_script = 3;
 * @return {!(string|Uint8Array)}
 */
proto.pb.Transaction.Input.prototype.getSignatureScript = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * optional bytes signature_script = 3;
 * This is a type-conversion wrapper around `getSignatureScript()`
 * @return {string}
 */
proto.pb.Transaction.Input.prototype.getSignatureScript_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getSignatureScript()));
};


/**
 * optional bytes signature_script = 3;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getSignatureScript()`
 * @return {!Uint8Array}
 */
proto.pb.Transaction.Input.prototype.getSignatureScript_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getSignatureScript()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.pb.Transaction.Input} returns this
 */
proto.pb.Transaction.Input.prototype.setSignatureScript = function(value) {
  return jspb.Message.setProto3BytesField(this, 3, value);
};


/**
 * optional uint32 sequence = 4;
 * @return {number}
 */
proto.pb.Transaction.Input.prototype.getSequence = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.pb.Transaction.Input} returns this
 */
proto.pb.Transaction.Input.prototype.setSequence = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional int64 value = 5;
 * @return {number}
 */
proto.pb.Transaction.Input.prototype.getValue = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.pb.Transaction.Input} returns this
 */
proto.pb.Transaction.Input.prototype.setValue = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional bytes previous_script = 6;
 * @return {!(string|Uint8Array)}
 */
proto.pb.Transaction.Input.prototype.getPreviousScript = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * optional bytes previous_script = 6;
 * This is a type-conversion wrapper around `getPreviousScript()`
 * @return {string}
 */
proto.pb.Transaction.Input.prototype.getPreviousScript_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getPreviousScript()));
};


/**
 * optional bytes previous_script = 6;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getPreviousScript()`
 * @return {!Uint8Array}
 */
proto.pb.Transaction.Input.prototype.getPreviousScript_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getPreviousScript()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.pb.Transaction.Input} returns this
 */
proto.pb.Transaction.Input.prototype.setPreviousScript = function(value) {
  return jspb.Message.setProto3BytesField(this, 6, value);
};


/**
 * optional string address = 7;
 * @return {string}
 */
proto.pb.Transaction.Input.prototype.getAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 7, ""));
};


/**
 * @param {string} value
 * @return {!proto.pb.Transaction.Input} returns this
 */
proto.pb.Transaction.Input.prototype.setAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 7, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.Transaction.Output.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.Transaction.Output.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.Transaction.Output} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.Transaction.Output.toObject = function(includeInstance, msg) {
  var f, obj = {
    index: jspb.Message.getFieldWithDefault(msg, 1, 0),
    value: jspb.Message.getFieldWithDefault(msg, 2, 0),
    pubkeyScript: msg.getPubkeyScript_asB64(),
    address: jspb.Message.getFieldWithDefault(msg, 4, ""),
    scriptClass: jspb.Message.getFieldWithDefault(msg, 5, ""),
    disassembledScript: jspb.Message.getFieldWithDefault(msg, 6, "")
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.Transaction.Output}
 */
proto.pb.Transaction.Output.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.Transaction.Output;
  return proto.pb.Transaction.Output.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.Transaction.Output} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.Transaction.Output}
 */
proto.pb.Transaction.Output.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setIndex(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setValue(value);
      break;
    case 3:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setPubkeyScript(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setAddress(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setScriptClass(value);
      break;
    case 6:
      var value = /** @type {string} */ (reader.readString());
      msg.setDisassembledScript(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.Transaction.Output.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.Transaction.Output.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.Transaction.Output} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.Transaction.Output.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getIndex();
  if (f !== 0) {
    writer.writeUint32(
      1,
      f
    );
  }
  f = message.getValue();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
  f = message.getPubkeyScript_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      3,
      f
    );
  }
  f = message.getAddress();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getScriptClass();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getDisassembledScript();
  if (f.length > 0) {
    writer.writeString(
      6,
      f
    );
  }
};


/**
 * optional uint32 index = 1;
 * @return {number}
 */
proto.pb.Transaction.Output.prototype.getIndex = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.pb.Transaction.Output} returns this
 */
proto.pb.Transaction.Output.prototype.setIndex = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional int64 value = 2;
 * @return {number}
 */
proto.pb.Transaction.Output.prototype.getValue = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.pb.Transaction.Output} returns this
 */
proto.pb.Transaction.Output.prototype.setValue = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional bytes pubkey_script = 3;
 * @return {!(string|Uint8Array)}
 */
proto.pb.Transaction.Output.prototype.getPubkeyScript = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * optional bytes pubkey_script = 3;
 * This is a type-conversion wrapper around `getPubkeyScript()`
 * @return {string}
 */
proto.pb.Transaction.Output.prototype.getPubkeyScript_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getPubkeyScript()));
};


/**
 * optional bytes pubkey_script = 3;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getPubkeyScript()`
 * @return {!Uint8Array}
 */
proto.pb.Transaction.Output.prototype.getPubkeyScript_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getPubkeyScript()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.pb.Transaction.Output} returns this
 */
proto.pb.Transaction.Output.prototype.setPubkeyScript = function(value) {
  return jspb.Message.setProto3BytesField(this, 3, value);
};


/**
 * optional string address = 4;
 * @return {string}
 */
proto.pb.Transaction.Output.prototype.getAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.pb.Transaction.Output} returns this
 */
proto.pb.Transaction.Output.prototype.setAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string script_class = 5;
 * @return {string}
 */
proto.pb.Transaction.Output.prototype.getScriptClass = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.pb.Transaction.Output} returns this
 */
proto.pb.Transaction.Output.prototype.setScriptClass = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional string disassembled_script = 6;
 * @return {string}
 */
proto.pb.Transaction.Output.prototype.getDisassembledScript = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 6, ""));
};


/**
 * @param {string} value
 * @return {!proto.pb.Transaction.Output} returns this
 */
proto.pb.Transaction.Output.prototype.setDisassembledScript = function(value) {
  return jspb.Message.setProto3StringField(this, 6, value);
};


/**
 * optional bytes hash = 1;
 * @return {!(string|Uint8Array)}
 */
proto.pb.Transaction.prototype.getHash = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes hash = 1;
 * This is a type-conversion wrapper around `getHash()`
 * @return {string}
 */
proto.pb.Transaction.prototype.getHash_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getHash()));
};


/**
 * optional bytes hash = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getHash()`
 * @return {!Uint8Array}
 */
proto.pb.Transaction.prototype.getHash_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getHash()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.pb.Transaction} returns this
 */
proto.pb.Transaction.prototype.setHash = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional int32 version = 2;
 * @return {number}
 */
proto.pb.Transaction.prototype.getVersion = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.pb.Transaction} returns this
 */
proto.pb.Transaction.prototype.setVersion = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * repeated Input inputs = 3;
 * @return {!Array<!proto.pb.Transaction.Input>}
 */
proto.pb.Transaction.prototype.getInputsList = function() {
  return /** @type{!Array<!proto.pb.Transaction.Input>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.pb.Transaction.Input, 3));
};


/**
 * @param {!Array<!proto.pb.Transaction.Input>} value
 * @return {!proto.pb.Transaction} returns this
*/
proto.pb.Transaction.prototype.setInputsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.pb.Transaction.Input=} opt_value
 * @param {number=} opt_index
 * @return {!proto.pb.Transaction.Input}
 */
proto.pb.Transaction.prototype.addInputs = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.pb.Transaction.Input, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.pb.Transaction} returns this
 */
proto.pb.Transaction.prototype.clearInputsList = function() {
  return this.setInputsList([]);
};


/**
 * repeated Output outputs = 4;
 * @return {!Array<!proto.pb.Transaction.Output>}
 */
proto.pb.Transaction.prototype.getOutputsList = function() {
  return /** @type{!Array<!proto.pb.Transaction.Output>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.pb.Transaction.Output, 4));
};


/**
 * @param {!Array<!proto.pb.Transaction.Output>} value
 * @return {!proto.pb.Transaction} returns this
*/
proto.pb.Transaction.prototype.setOutputsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.pb.Transaction.Output=} opt_value
 * @param {number=} opt_index
 * @return {!proto.pb.Transaction.Output}
 */
proto.pb.Transaction.prototype.addOutputs = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.pb.Transaction.Output, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.pb.Transaction} returns this
 */
proto.pb.Transaction.prototype.clearOutputsList = function() {
  return this.setOutputsList([]);
};


/**
 * optional uint32 lock_time = 5;
 * @return {number}
 */
proto.pb.Transaction.prototype.getLockTime = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.pb.Transaction} returns this
 */
proto.pb.Transaction.prototype.setLockTime = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional int32 size = 8;
 * @return {number}
 */
proto.pb.Transaction.prototype.getSize = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 8, 0));
};


/**
 * @param {number} value
 * @return {!proto.pb.Transaction} returns this
 */
proto.pb.Transaction.prototype.setSize = function(value) {
  return jspb.Message.setProto3IntField(this, 8, value);
};


/**
 * optional int64 timestamp = 9;
 * @return {number}
 */
proto.pb.Transaction.prototype.getTimestamp = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/**
 * @param {number} value
 * @return {!proto.pb.Transaction} returns this
 */
proto.pb.Transaction.prototype.setTimestamp = function(value) {
  return jspb.Message.setProto3IntField(this, 9, value);
};


/**
 * optional int32 confirmations = 10;
 * @return {number}
 */
proto.pb.Transaction.prototype.getConfirmations = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 10, 0));
};


/**
 * @param {number} value
 * @return {!proto.pb.Transaction} returns this
 */
proto.pb.Transaction.prototype.setConfirmations = function(value) {
  return jspb.Message.setProto3IntField(this, 10, value);
};


/**
 * optional int32 block_height = 11;
 * @return {number}
 */
proto.pb.Transaction.prototype.getBlockHeight = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 11, 0));
};


/**
 * @param {number} value
 * @return {!proto.pb.Transaction} returns this
 */
proto.pb.Transaction.prototype.setBlockHeight = function(value) {
  return jspb.Message.setProto3IntField(this, 11, value);
};


/**
 * optional bytes block_hash = 12;
 * @return {!(string|Uint8Array)}
 */
proto.pb.Transaction.prototype.getBlockHash = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 12, ""));
};


/**
 * optional bytes block_hash = 12;
 * This is a type-conversion wrapper around `getBlockHash()`
 * @return {string}
 */
proto.pb.Transaction.prototype.getBlockHash_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getBlockHash()));
};


/**
 * optional bytes block_hash = 12;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getBlockHash()`
 * @return {!Uint8Array}
 */
proto.pb.Transaction.prototype.getBlockHash_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getBlockHash()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.pb.Transaction} returns this
 */
proto.pb.Transaction.prototype.setBlockHash = function(value) {
  return jspb.Message.setProto3BytesField(this, 12, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.MempoolTransaction.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.MempoolTransaction.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.MempoolTransaction} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.MempoolTransaction.toObject = function(includeInstance, msg) {
  var f, obj = {
    transaction: (f = msg.getTransaction()) && proto.pb.Transaction.toObject(includeInstance, f),
    addedTime: jspb.Message.getFieldWithDefault(msg, 2, 0),
    addedHeight: jspb.Message.getFieldWithDefault(msg, 3, 0),
    fee: jspb.Message.getFieldWithDefault(msg, 4, 0),
    feePerKb: jspb.Message.getFieldWithDefault(msg, 5, 0),
    startingPriority: jspb.Message.getFloatingPointFieldWithDefault(msg, 6, 0.0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.MempoolTransaction}
 */
proto.pb.MempoolTransaction.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.MempoolTransaction;
  return proto.pb.MempoolTransaction.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.MempoolTransaction} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.MempoolTransaction}
 */
proto.pb.MempoolTransaction.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.pb.Transaction;
      reader.readMessage(value,proto.pb.Transaction.deserializeBinaryFromReader);
      msg.setTransaction(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setAddedTime(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setAddedHeight(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setFee(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setFeePerKb(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readDouble());
      msg.setStartingPriority(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.MempoolTransaction.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.MempoolTransaction.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.MempoolTransaction} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.MempoolTransaction.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTransaction();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.pb.Transaction.serializeBinaryToWriter
    );
  }
  f = message.getAddedTime();
  if (f !== 0) {
    writer.writeInt64(
      2,
      f
    );
  }
  f = message.getAddedHeight();
  if (f !== 0) {
    writer.writeInt32(
      3,
      f
    );
  }
  f = message.getFee();
  if (f !== 0) {
    writer.writeInt64(
      4,
      f
    );
  }
  f = message.getFeePerKb();
  if (f !== 0) {
    writer.writeInt64(
      5,
      f
    );
  }
  f = message.getStartingPriority();
  if (f !== 0.0) {
    writer.writeDouble(
      6,
      f
    );
  }
};


/**
 * optional Transaction transaction = 1;
 * @return {?proto.pb.Transaction}
 */
proto.pb.MempoolTransaction.prototype.getTransaction = function() {
  return /** @type{?proto.pb.Transaction} */ (
    jspb.Message.getWrapperField(this, proto.pb.Transaction, 1));
};


/**
 * @param {?proto.pb.Transaction|undefined} value
 * @return {!proto.pb.MempoolTransaction} returns this
*/
proto.pb.MempoolTransaction.prototype.setTransaction = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.pb.MempoolTransaction} returns this
 */
proto.pb.MempoolTransaction.prototype.clearTransaction = function() {
  return this.setTransaction(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.pb.MempoolTransaction.prototype.hasTransaction = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional int64 added_time = 2;
 * @return {number}
 */
proto.pb.MempoolTransaction.prototype.getAddedTime = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.pb.MempoolTransaction} returns this
 */
proto.pb.MempoolTransaction.prototype.setAddedTime = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional int32 added_height = 3;
 * @return {number}
 */
proto.pb.MempoolTransaction.prototype.getAddedHeight = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.pb.MempoolTransaction} returns this
 */
proto.pb.MempoolTransaction.prototype.setAddedHeight = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional int64 fee = 4;
 * @return {number}
 */
proto.pb.MempoolTransaction.prototype.getFee = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.pb.MempoolTransaction} returns this
 */
proto.pb.MempoolTransaction.prototype.setFee = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};


/**
 * optional int64 fee_per_kb = 5;
 * @return {number}
 */
proto.pb.MempoolTransaction.prototype.getFeePerKb = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.pb.MempoolTransaction} returns this
 */
proto.pb.MempoolTransaction.prototype.setFeePerKb = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};


/**
 * optional double starting_priority = 6;
 * @return {number}
 */
proto.pb.MempoolTransaction.prototype.getStartingPriority = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 6, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.pb.MempoolTransaction} returns this
 */
proto.pb.MempoolTransaction.prototype.setStartingPriority = function(value) {
  return jspb.Message.setProto3FloatField(this, 6, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.UnspentOutput.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.UnspentOutput.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.UnspentOutput} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.UnspentOutput.toObject = function(includeInstance, msg) {
  var f, obj = {
    outpoint: (f = msg.getOutpoint()) && proto.pb.Transaction.Input.Outpoint.toObject(includeInstance, f),
    pubkeyScript: msg.getPubkeyScript_asB64(),
    value: jspb.Message.getFieldWithDefault(msg, 3, 0),
    isCoinbase: jspb.Message.getBooleanFieldWithDefault(msg, 4, false),
    blockHeight: jspb.Message.getFieldWithDefault(msg, 5, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.UnspentOutput}
 */
proto.pb.UnspentOutput.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.UnspentOutput;
  return proto.pb.UnspentOutput.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.UnspentOutput} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.UnspentOutput}
 */
proto.pb.UnspentOutput.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.pb.Transaction.Input.Outpoint;
      reader.readMessage(value,proto.pb.Transaction.Input.Outpoint.deserializeBinaryFromReader);
      msg.setOutpoint(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setPubkeyScript(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readInt64());
      msg.setValue(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsCoinbase(value);
      break;
    case 5:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setBlockHeight(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.UnspentOutput.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.UnspentOutput.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.UnspentOutput} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.UnspentOutput.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOutpoint();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.pb.Transaction.Input.Outpoint.serializeBinaryToWriter
    );
  }
  f = message.getPubkeyScript_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
  f = message.getValue();
  if (f !== 0) {
    writer.writeInt64(
      3,
      f
    );
  }
  f = message.getIsCoinbase();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
  f = message.getBlockHeight();
  if (f !== 0) {
    writer.writeInt32(
      5,
      f
    );
  }
};


/**
 * optional Transaction.Input.Outpoint outpoint = 1;
 * @return {?proto.pb.Transaction.Input.Outpoint}
 */
proto.pb.UnspentOutput.prototype.getOutpoint = function() {
  return /** @type{?proto.pb.Transaction.Input.Outpoint} */ (
    jspb.Message.getWrapperField(this, proto.pb.Transaction.Input.Outpoint, 1));
};


/**
 * @param {?proto.pb.Transaction.Input.Outpoint|undefined} value
 * @return {!proto.pb.UnspentOutput} returns this
*/
proto.pb.UnspentOutput.prototype.setOutpoint = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.pb.UnspentOutput} returns this
 */
proto.pb.UnspentOutput.prototype.clearOutpoint = function() {
  return this.setOutpoint(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.pb.UnspentOutput.prototype.hasOutpoint = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional bytes pubkey_script = 2;
 * @return {!(string|Uint8Array)}
 */
proto.pb.UnspentOutput.prototype.getPubkeyScript = function() {
  return /** @type {!(string|Uint8Array)} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes pubkey_script = 2;
 * This is a type-conversion wrapper around `getPubkeyScript()`
 * @return {string}
 */
proto.pb.UnspentOutput.prototype.getPubkeyScript_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getPubkeyScript()));
};


/**
 * optional bytes pubkey_script = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getPubkeyScript()`
 * @return {!Uint8Array}
 */
proto.pb.UnspentOutput.prototype.getPubkeyScript_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getPubkeyScript()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.pb.UnspentOutput} returns this
 */
proto.pb.UnspentOutput.prototype.setPubkeyScript = function(value) {
  return jspb.Message.setProto3BytesField(this, 2, value);
};


/**
 * optional int64 value = 3;
 * @return {number}
 */
proto.pb.UnspentOutput.prototype.getValue = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.pb.UnspentOutput} returns this
 */
proto.pb.UnspentOutput.prototype.setValue = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * optional bool is_coinbase = 4;
 * @return {boolean}
 */
proto.pb.UnspentOutput.prototype.getIsCoinbase = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.pb.UnspentOutput} returns this
 */
proto.pb.UnspentOutput.prototype.setIsCoinbase = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};


/**
 * optional int32 block_height = 5;
 * @return {number}
 */
proto.pb.UnspentOutput.prototype.getBlockHeight = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {number} value
 * @return {!proto.pb.UnspentOutput} returns this
 */
proto.pb.UnspentOutput.prototype.setBlockHeight = function(value) {
  return jspb.Message.setProto3IntField(this, 5, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.pb.TransactionFilter.repeatedFields_ = [1,2,3];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.pb.TransactionFilter.prototype.toObject = function(opt_includeInstance) {
  return proto.pb.TransactionFilter.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.pb.TransactionFilter} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.TransactionFilter.toObject = function(includeInstance, msg) {
  var f, obj = {
    addressesList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f,
    outpointsList: jspb.Message.toObjectList(msg.getOutpointsList(),
    proto.pb.Transaction.Input.Outpoint.toObject, includeInstance),
    dataElementsList: msg.getDataElementsList_asB64(),
    allTransactions: jspb.Message.getBooleanFieldWithDefault(msg, 4, false)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.pb.TransactionFilter}
 */
proto.pb.TransactionFilter.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.pb.TransactionFilter;
  return proto.pb.TransactionFilter.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.pb.TransactionFilter} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.pb.TransactionFilter}
 */
proto.pb.TransactionFilter.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.addAddresses(value);
      break;
    case 2:
      var value = new proto.pb.Transaction.Input.Outpoint;
      reader.readMessage(value,proto.pb.Transaction.Input.Outpoint.deserializeBinaryFromReader);
      msg.addOutpoints(value);
      break;
    case 3:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.addDataElements(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setAllTransactions(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.pb.TransactionFilter.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.pb.TransactionFilter.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.pb.TransactionFilter} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.pb.TransactionFilter.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAddressesList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      1,
      f
    );
  }
  f = message.getOutpointsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.pb.Transaction.Input.Outpoint.serializeBinaryToWriter
    );
  }
  f = message.getDataElementsList_asU8();
  if (f.length > 0) {
    writer.writeRepeatedBytes(
      3,
      f
    );
  }
  f = message.getAllTransactions();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
};


/**
 * repeated string addresses = 1;
 * @return {!Array<string>}
 */
proto.pb.TransactionFilter.prototype.getAddressesList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.pb.TransactionFilter} returns this
 */
proto.pb.TransactionFilter.prototype.setAddressesList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.pb.TransactionFilter} returns this
 */
proto.pb.TransactionFilter.prototype.addAddresses = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.pb.TransactionFilter} returns this
 */
proto.pb.TransactionFilter.prototype.clearAddressesList = function() {
  return this.setAddressesList([]);
};


/**
 * repeated Transaction.Input.Outpoint outpoints = 2;
 * @return {!Array<!proto.pb.Transaction.Input.Outpoint>}
 */
proto.pb.TransactionFilter.prototype.getOutpointsList = function() {
  return /** @type{!Array<!proto.pb.Transaction.Input.Outpoint>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.pb.Transaction.Input.Outpoint, 2));
};


/**
 * @param {!Array<!proto.pb.Transaction.Input.Outpoint>} value
 * @return {!proto.pb.TransactionFilter} returns this
*/
proto.pb.TransactionFilter.prototype.setOutpointsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.pb.Transaction.Input.Outpoint=} opt_value
 * @param {number=} opt_index
 * @return {!proto.pb.Transaction.Input.Outpoint}
 */
proto.pb.TransactionFilter.prototype.addOutpoints = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.pb.Transaction.Input.Outpoint, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.pb.TransactionFilter} returns this
 */
proto.pb.TransactionFilter.prototype.clearOutpointsList = function() {
  return this.setOutpointsList([]);
};


/**
 * repeated bytes data_elements = 3;
 * @return {!(Array<!Uint8Array>|Array<string>)}
 */
proto.pb.TransactionFilter.prototype.getDataElementsList = function() {
  return /** @type {!(Array<!Uint8Array>|Array<string>)} */ (jspb.Message.getRepeatedField(this, 3));
};


/**
 * repeated bytes data_elements = 3;
 * This is a type-conversion wrapper around `getDataElementsList()`
 * @return {!Array<string>}
 */
proto.pb.TransactionFilter.prototype.getDataElementsList_asB64 = function() {
  return /** @type {!Array<string>} */ (jspb.Message.bytesListAsB64(
      this.getDataElementsList()));
};


/**
 * repeated bytes data_elements = 3;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getDataElementsList()`
 * @return {!Array<!Uint8Array>}
 */
proto.pb.TransactionFilter.prototype.getDataElementsList_asU8 = function() {
  return /** @type {!Array<!Uint8Array>} */ (jspb.Message.bytesListAsU8(
      this.getDataElementsList()));
};


/**
 * @param {!(Array<!Uint8Array>|Array<string>)} value
 * @return {!proto.pb.TransactionFilter} returns this
 */
proto.pb.TransactionFilter.prototype.setDataElementsList = function(value) {
  return jspb.Message.setField(this, 3, value || []);
};


/**
 * @param {!(string|Uint8Array)} value
 * @param {number=} opt_index
 * @return {!proto.pb.TransactionFilter} returns this
 */
proto.pb.TransactionFilter.prototype.addDataElements = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 3, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.pb.TransactionFilter} returns this
 */
proto.pb.TransactionFilter.prototype.clearDataElementsList = function() {
  return this.setDataElementsList([]);
};


/**
 * optional bool all_transactions = 4;
 * @return {boolean}
 */
proto.pb.TransactionFilter.prototype.getAllTransactions = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.pb.TransactionFilter} returns this
 */
proto.pb.TransactionFilter.prototype.setAllTransactions = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};


goog.object.extend(exports, proto.pb);


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, Buffer) {var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.findInternal=function(a,b,c){a instanceof String&&(a=String(a));for(var d=a.length,e=0;e<d;e++){var f=a[e];if(b.call(c,f,e,a))return{i:e,v:f}}return{i:-1,v:void 0}};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;
$jscomp.defineProperty=$jscomp.ASSUME_ES5||"function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);
$jscomp.polyfill=function(a,b,c,d){if(b){c=$jscomp.global;a=a.split(".");for(d=0;d<a.length-1;d++){var e=a[d];e in c||(c[e]={});c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&$jscomp.defineProperty(c,a,{configurable:!0,writable:!0,value:b})}};$jscomp.polyfill("Array.prototype.findIndex",function(a){return a?a:function(a,c){return $jscomp.findInternal(this,a,c).i}},"es6","es3");
$jscomp.checkStringArgs=function(a,b,c){if(null==a)throw new TypeError("The 'this' value for String.prototype."+c+" must not be null or undefined");if(b instanceof RegExp)throw new TypeError("First argument to String.prototype."+c+" must not be a regular expression");return a+""};
$jscomp.polyfill("String.prototype.endsWith",function(a){return a?a:function(a,c){var b=$jscomp.checkStringArgs(this,a,"endsWith");a+="";void 0===c&&(c=b.length);c=Math.max(0,Math.min(c|0,b.length));for(var e=a.length;0<e&&0<c;)if(b[--c]!=a[--e])return!1;return 0>=e}},"es6","es3");$jscomp.polyfill("Array.prototype.find",function(a){return a?a:function(a,c){return $jscomp.findInternal(this,a,c).v}},"es6","es3");
$jscomp.polyfill("String.prototype.startsWith",function(a){return a?a:function(a,c){var b=$jscomp.checkStringArgs(this,a,"startsWith");a+="";var e=b.length,f=a.length;c=Math.max(0,Math.min(c|0,b.length));for(var g=0;g<f&&c<e;)if(b[c++]!=a[g++])return!1;return g>=f}},"es6","es3");
$jscomp.polyfill("String.prototype.repeat",function(a){return a?a:function(a){var b=$jscomp.checkStringArgs(this,null,"repeat");if(0>a||1342177279<a)throw new RangeError("Invalid count value");a|=0;for(var d="";a;)if(a&1&&(d+=b),a>>>=1)b+=b;return d}},"es6","es3");var COMPILED=!0,goog=goog||{};goog.global=this||self;goog.isDef=function(a){return void 0!==a};goog.isString=function(a){return"string"==typeof a};goog.isBoolean=function(a){return"boolean"==typeof a};
goog.isNumber=function(a){return"number"==typeof a};goog.exportPath_=function(a,b,c){a=a.split(".");c=c||goog.global;a[0]in c||"undefined"==typeof c.execScript||c.execScript("var "+a[0]);for(var d;a.length&&(d=a.shift());)!a.length&&goog.isDef(b)?c[d]=b:c=c[d]&&c[d]!==Object.prototype[d]?c[d]:c[d]={}};
goog.define=function(a,b){if(!COMPILED){var c=goog.global.CLOSURE_UNCOMPILED_DEFINES,d=goog.global.CLOSURE_DEFINES;c&&void 0===c.nodeType&&Object.prototype.hasOwnProperty.call(c,a)?b=c[a]:d&&void 0===d.nodeType&&Object.prototype.hasOwnProperty.call(d,a)&&(b=d[a])}return b};goog.FEATURESET_YEAR=2012;goog.DEBUG=!0;goog.LOCALE="en";goog.TRUSTED_SITE=!0;goog.STRICT_MODE_COMPATIBLE=!1;goog.DISALLOW_TEST_ONLY_CODE=COMPILED&&!goog.DEBUG;goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING=!1;
goog.provide=function(a){if(goog.isInModuleLoader_())throw Error("goog.provide cannot be used within a module.");if(!COMPILED&&goog.isProvided_(a))throw Error('Namespace "'+a+'" already declared.');goog.constructNamespace_(a)};goog.constructNamespace_=function(a,b){if(!COMPILED){delete goog.implicitNamespaces_[a];for(var c=a;(c=c.substring(0,c.lastIndexOf(".")))&&!goog.getObjectByName(c);)goog.implicitNamespaces_[c]=!0}goog.exportPath_(a,b)};
goog.getScriptNonce=function(a){if(a&&a!=goog.global)return goog.getScriptNonce_(a.document);null===goog.cspNonce_&&(goog.cspNonce_=goog.getScriptNonce_(goog.global.document));return goog.cspNonce_};goog.NONCE_PATTERN_=/^[\w+/_-]+[=]{0,2}$/;goog.cspNonce_=null;goog.getScriptNonce_=function(a){return(a=a.querySelector&&a.querySelector("script[nonce]"))&&(a=a.nonce||a.getAttribute("nonce"))&&goog.NONCE_PATTERN_.test(a)?a:""};goog.VALID_MODULE_RE_=/^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
goog.module=function(a){if(!goog.isString(a)||!a||-1==a.search(goog.VALID_MODULE_RE_))throw Error("Invalid module identifier");if(!goog.isInGoogModuleLoader_())throw Error("Module "+a+" has been loaded incorrectly. Note, modules cannot be loaded as normal scripts. They require some kind of pre-processing step. You're likely trying to load a module via a script tag or as a part of a concatenated bundle without rewriting the module. For more info see: https://github.com/google/closure-library/wiki/goog.module:-an-ES6-module-like-alternative-to-goog.provide.");
if(goog.moduleLoaderState_.moduleName)throw Error("goog.module may only be called once per module.");goog.moduleLoaderState_.moduleName=a;if(!COMPILED){if(goog.isProvided_(a))throw Error('Namespace "'+a+'" already declared.');delete goog.implicitNamespaces_[a]}};goog.module.get=function(a){return goog.module.getInternal_(a)};
goog.module.getInternal_=function(a){if(!COMPILED){if(a in goog.loadedModules_)return goog.loadedModules_[a].exports;if(!goog.implicitNamespaces_[a])return a=goog.getObjectByName(a),null!=a?a:null}return null};goog.ModuleType={ES6:"es6",GOOG:"goog"};goog.moduleLoaderState_=null;goog.isInModuleLoader_=function(){return goog.isInGoogModuleLoader_()||goog.isInEs6ModuleLoader_()};goog.isInGoogModuleLoader_=function(){return!!goog.moduleLoaderState_&&goog.moduleLoaderState_.type==goog.ModuleType.GOOG};
goog.isInEs6ModuleLoader_=function(){if(goog.moduleLoaderState_&&goog.moduleLoaderState_.type==goog.ModuleType.ES6)return!0;var a=goog.global.$jscomp;return a?"function"!=typeof a.getCurrentModulePath?!1:!!a.getCurrentModulePath():!1};
goog.module.declareLegacyNamespace=function(){if(!COMPILED&&!goog.isInGoogModuleLoader_())throw Error("goog.module.declareLegacyNamespace must be called from within a goog.module");if(!COMPILED&&!goog.moduleLoaderState_.moduleName)throw Error("goog.module must be called prior to goog.module.declareLegacyNamespace.");goog.moduleLoaderState_.declareLegacyNamespace=!0};
goog.declareModuleId=function(a){if(!COMPILED){if(!goog.isInEs6ModuleLoader_())throw Error("goog.declareModuleId may only be called from within an ES6 module");if(goog.moduleLoaderState_&&goog.moduleLoaderState_.moduleName)throw Error("goog.declareModuleId may only be called once per module.");if(a in goog.loadedModules_)throw Error('Module with namespace "'+a+'" already exists.');}if(goog.moduleLoaderState_)goog.moduleLoaderState_.moduleName=a;else{var b=goog.global.$jscomp;if(!b||"function"!=typeof b.getCurrentModulePath)throw Error('Module with namespace "'+
a+'" has been loaded incorrectly.');b=b.require(b.getCurrentModulePath());goog.loadedModules_[a]={exports:b,type:goog.ModuleType.ES6,moduleId:a}}};goog.setTestOnly=function(a){if(goog.DISALLOW_TEST_ONLY_CODE)throw a=a||"",Error("Importing test-only code into non-debug environment"+(a?": "+a:"."));};goog.forwardDeclare=function(a){};
COMPILED||(goog.isProvided_=function(a){return a in goog.loadedModules_||!goog.implicitNamespaces_[a]&&goog.isDefAndNotNull(goog.getObjectByName(a))},goog.implicitNamespaces_={"goog.module":!0});goog.getObjectByName=function(a,b){a=a.split(".");b=b||goog.global;for(var c=0;c<a.length;c++)if(b=b[a[c]],!goog.isDefAndNotNull(b))return null;return b};goog.globalize=function(a,b){b=b||goog.global;for(var c in a)b[c]=a[c]};
goog.addDependency=function(a,b,c,d){!COMPILED&&goog.DEPENDENCIES_ENABLED&&goog.debugLoader_.addDependency(a,b,c,d)};goog.ENABLE_DEBUG_LOADER=!0;goog.logToConsole_=function(a){goog.global.console&&goog.global.console.error(a)};
goog.require=function(a){if(!COMPILED){goog.ENABLE_DEBUG_LOADER&&goog.debugLoader_.requested(a);if(goog.isProvided_(a)){if(goog.isInModuleLoader_())return goog.module.getInternal_(a)}else if(goog.ENABLE_DEBUG_LOADER){var b=goog.moduleLoaderState_;goog.moduleLoaderState_=null;try{goog.debugLoader_.load_(a)}finally{goog.moduleLoaderState_=b}}return null}};goog.requireType=function(a){return{}};goog.basePath="";goog.nullFunction=function(){};
goog.abstractMethod=function(){throw Error("unimplemented abstract method");};goog.addSingletonGetter=function(a){a.instance_=void 0;a.getInstance=function(){if(a.instance_)return a.instance_;goog.DEBUG&&(goog.instantiatedSingletons_[goog.instantiatedSingletons_.length]=a);return a.instance_=new a}};goog.instantiatedSingletons_=[];goog.LOAD_MODULE_USING_EVAL=!0;goog.SEAL_MODULE_EXPORTS=goog.DEBUG;goog.loadedModules_={};goog.DEPENDENCIES_ENABLED=!COMPILED&&goog.ENABLE_DEBUG_LOADER;goog.TRANSPILE="detect";
goog.ASSUME_ES_MODULES_TRANSPILED=!1;goog.TRANSPILE_TO_LANGUAGE="";goog.TRANSPILER="transpile.js";goog.hasBadLetScoping=null;goog.useSafari10Workaround=function(){if(null==goog.hasBadLetScoping){try{var a=!eval('"use strict";let x = 1; function f() { return typeof x; };f() == "number";')}catch(b){a=!1}goog.hasBadLetScoping=a}return goog.hasBadLetScoping};goog.workaroundSafari10EvalBug=function(a){return"(function(){"+a+"\n;})();\n"};
goog.loadModule=function(a){var b=goog.moduleLoaderState_;try{goog.moduleLoaderState_={moduleName:"",declareLegacyNamespace:!1,type:goog.ModuleType.GOOG};if(goog.isFunction(a))var c=a.call(void 0,{});else if(goog.isString(a))goog.useSafari10Workaround()&&(a=goog.workaroundSafari10EvalBug(a)),c=goog.loadModuleFromSource_.call(void 0,a);else throw Error("Invalid module definition");var d=goog.moduleLoaderState_.moduleName;if(goog.isString(d)&&d)goog.moduleLoaderState_.declareLegacyNamespace?goog.constructNamespace_(d,
c):goog.SEAL_MODULE_EXPORTS&&Object.seal&&"object"==typeof c&&null!=c&&Object.seal(c),goog.loadedModules_[d]={exports:c,type:goog.ModuleType.GOOG,moduleId:goog.moduleLoaderState_.moduleName};else throw Error('Invalid module name "'+d+'"');}finally{goog.moduleLoaderState_=b}};goog.loadModuleFromSource_=function(a){eval(a);return{}};goog.normalizePath_=function(a){a=a.split("/");for(var b=0;b<a.length;)"."==a[b]?a.splice(b,1):b&&".."==a[b]&&a[b-1]&&".."!=a[b-1]?a.splice(--b,2):b++;return a.join("/")};
goog.loadFileSync_=function(a){if(goog.global.CLOSURE_LOAD_FILE_SYNC)return goog.global.CLOSURE_LOAD_FILE_SYNC(a);try{var b=new goog.global.XMLHttpRequest;b.open("get",a,!1);b.send();return 0==b.status||200==b.status?b.responseText:null}catch(c){return null}};
goog.transpile_=function(a,b,c){var d=goog.global.$jscomp;d||(goog.global.$jscomp=d={});var e=d.transpile;if(!e){var f=goog.basePath+goog.TRANSPILER,g=goog.loadFileSync_(f);if(g){(function(){(0,eval)(g+"\n//# sourceURL="+f)}).call(goog.global);if(goog.global.$gwtExport&&goog.global.$gwtExport.$jscomp&&!goog.global.$gwtExport.$jscomp.transpile)throw Error('The transpiler did not properly export the "transpile" method. $gwtExport: '+JSON.stringify(goog.global.$gwtExport));goog.global.$jscomp.transpile=
goog.global.$gwtExport.$jscomp.transpile;d=goog.global.$jscomp;e=d.transpile}}e||(e=d.transpile=function(a,b){goog.logToConsole_(b+" requires transpilation but no transpiler was found.");return a});return e(a,b,c)};
goog.typeOf=function(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b};goog.isNull=function(a){return null===a};goog.isDefAndNotNull=function(a){return null!=a};goog.isArray=function(a){return"array"==goog.typeOf(a)};goog.isArrayLike=function(a){var b=goog.typeOf(a);return"array"==b||"object"==b&&"number"==typeof a.length};goog.isDateLike=function(a){return goog.isObject(a)&&"function"==typeof a.getFullYear};goog.isFunction=function(a){return"function"==goog.typeOf(a)};
goog.isObject=function(a){var b=typeof a;return"object"==b&&null!=a||"function"==b};goog.getUid=function(a){return a[goog.UID_PROPERTY_]||(a[goog.UID_PROPERTY_]=++goog.uidCounter_)};goog.hasUid=function(a){return!!a[goog.UID_PROPERTY_]};goog.removeUid=function(a){null!==a&&"removeAttribute"in a&&a.removeAttribute(goog.UID_PROPERTY_);try{delete a[goog.UID_PROPERTY_]}catch(b){}};goog.UID_PROPERTY_="closure_uid_"+(1E9*Math.random()>>>0);goog.uidCounter_=0;goog.getHashCode=goog.getUid;
goog.removeHashCode=goog.removeUid;goog.cloneObject=function(a){var b=goog.typeOf(a);if("object"==b||"array"==b){if("function"===typeof a.clone)return a.clone();b="array"==b?[]:{};for(var c in a)b[c]=goog.cloneObject(a[c]);return b}return a};goog.bindNative_=function(a,b,c){return a.call.apply(a.bind,arguments)};
goog.bindJs_=function(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var c=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(c,d);return a.apply(b,c)}}return function(){return a.apply(b,arguments)}};goog.bind=function(a,b,c){Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?goog.bind=goog.bindNative_:goog.bind=goog.bindJs_;return goog.bind.apply(null,arguments)};
goog.partial=function(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=c.slice();b.push.apply(b,arguments);return a.apply(this,b)}};goog.mixin=function(a,b){for(var c in b)a[c]=b[c]};goog.now=goog.TRUSTED_SITE&&Date.now||function(){return+new Date};
goog.globalEval=function(a){if(goog.global.execScript)goog.global.execScript(a,"JavaScript");else if(goog.global.eval){if(null==goog.evalWorksForGlobals_){try{goog.global.eval("var _evalTest_ = 1;")}catch(d){}if("undefined"!=typeof goog.global._evalTest_){try{delete goog.global._evalTest_}catch(d){}goog.evalWorksForGlobals_=!0}else goog.evalWorksForGlobals_=!1}if(goog.evalWorksForGlobals_)goog.global.eval(a);else{var b=goog.global.document,c=b.createElement("SCRIPT");c.type="text/javascript";c.defer=
!1;c.appendChild(b.createTextNode(a));b.head.appendChild(c);b.head.removeChild(c)}}else throw Error("goog.globalEval not available");};goog.evalWorksForGlobals_=null;
goog.getCssName=function(a,b){if("."==String(a).charAt(0))throw Error('className passed in goog.getCssName must not start with ".". You passed: '+a);var c=function(a){return goog.cssNameMapping_[a]||a},d=function(a){a=a.split("-");for(var b=[],d=0;d<a.length;d++)b.push(c(a[d]));return b.join("-")};d=goog.cssNameMapping_?"BY_WHOLE"==goog.cssNameMappingStyle_?c:d:function(a){return a};a=b?a+"-"+d(b):d(a);return goog.global.CLOSURE_CSS_NAME_MAP_FN?goog.global.CLOSURE_CSS_NAME_MAP_FN(a):a};
goog.setCssNameMapping=function(a,b){goog.cssNameMapping_=a;goog.cssNameMappingStyle_=b};!COMPILED&&goog.global.CLOSURE_CSS_NAME_MAPPING&&(goog.cssNameMapping_=goog.global.CLOSURE_CSS_NAME_MAPPING);goog.getMsg=function(a,b,c){c&&c.html&&(a=a.replace(/</g,"&lt;"));b&&(a=a.replace(/\{\$([^}]+)}/g,function(a,c){return null!=b&&c in b?b[c]:a}));return a};goog.getMsgWithFallback=function(a,b){return a};goog.exportSymbol=function(a,b,c){goog.exportPath_(a,b,c)};
goog.exportProperty=function(a,b,c){a[b]=c};goog.inherits=function(a,b){function c(){}c.prototype=b.prototype;a.superClass_=b.prototype;a.prototype=new c;a.prototype.constructor=a;a.base=function(a,c,f){for(var d=Array(arguments.length-2),e=2;e<arguments.length;e++)d[e-2]=arguments[e];return b.prototype[c].apply(a,d)}};
goog.base=function(a,b,c){var d=arguments.callee.caller;if(goog.STRICT_MODE_COMPATIBLE||goog.DEBUG&&!d)throw Error("arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");if("undefined"!==typeof d.superClass_){for(var e=Array(arguments.length-1),f=1;f<arguments.length;f++)e[f-1]=arguments[f];return d.superClass_.constructor.apply(a,e)}if("string"!=typeof b&&"symbol"!=typeof b)throw Error("method names provided to goog.base must be a string or a symbol");
e=Array(arguments.length-2);for(f=2;f<arguments.length;f++)e[f-2]=arguments[f];f=!1;for(var g=a.constructor.prototype;g;g=Object.getPrototypeOf(g))if(g[b]===d)f=!0;else if(f)return g[b].apply(a,e);if(a[b]===d)return a.constructor.prototype[b].apply(a,e);throw Error("goog.base called from a method of one name to a method of a different name");};goog.scope=function(a){if(goog.isInModuleLoader_())throw Error("goog.scope is not supported within a module.");a.call(goog.global)};
COMPILED||(goog.global.COMPILED=COMPILED);goog.defineClass=function(a,b){var c=b.constructor,d=b.statics;c&&c!=Object.prototype.constructor||(c=function(){throw Error("cannot instantiate an interface (no constructor defined).");});c=goog.defineClass.createSealingConstructor_(c,a);a&&goog.inherits(c,a);delete b.constructor;delete b.statics;goog.defineClass.applyProperties_(c.prototype,b);null!=d&&(d instanceof Function?d(c):goog.defineClass.applyProperties_(c,d));return c};
goog.defineClass.SEAL_CLASS_INSTANCES=goog.DEBUG;goog.defineClass.createSealingConstructor_=function(a,b){if(!goog.defineClass.SEAL_CLASS_INSTANCES)return a;var c=!goog.defineClass.isUnsealable_(b),d=function(){var b=a.apply(this,arguments)||this;b[goog.UID_PROPERTY_]=b[goog.UID_PROPERTY_];this.constructor===d&&c&&Object.seal instanceof Function&&Object.seal(b);return b};return d};goog.defineClass.isUnsealable_=function(a){return a&&a.prototype&&a.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_]};
goog.defineClass.OBJECT_PROTOTYPE_FIELDS_="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");goog.defineClass.applyProperties_=function(a,b){for(var c in b)Object.prototype.hasOwnProperty.call(b,c)&&(a[c]=b[c]);for(var d=0;d<goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length;d++)c=goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[d],Object.prototype.hasOwnProperty.call(b,c)&&(a[c]=b[c])};
goog.tagUnsealableClass=function(a){!COMPILED&&goog.defineClass.SEAL_CLASS_INSTANCES&&(a.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_]=!0)};goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_="goog_defineClass_legacy_unsealable";
!COMPILED&&goog.DEPENDENCIES_ENABLED&&(goog.inHtmlDocument_=function(){var a=goog.global.document;return null!=a&&"write"in a},goog.isDocumentLoading_=function(){var a=goog.global.document;return a.attachEvent?"complete"!=a.readyState:"loading"==a.readyState},goog.findBasePath_=function(){if(goog.isDef(goog.global.CLOSURE_BASE_PATH)&&goog.isString(goog.global.CLOSURE_BASE_PATH))goog.basePath=goog.global.CLOSURE_BASE_PATH;else if(goog.inHtmlDocument_()){var a=goog.global.document,b=a.currentScript;
a=b?[b]:a.getElementsByTagName("SCRIPT");for(b=a.length-1;0<=b;--b){var c=a[b].src,d=c.lastIndexOf("?");d=-1==d?c.length:d;if("base.js"==c.substr(d-7,7)){goog.basePath=c.substr(0,d-7);break}}}},goog.findBasePath_(),goog.Transpiler=function(){this.requiresTranspilation_=null;this.transpilationTarget_=goog.TRANSPILE_TO_LANGUAGE},goog.Transpiler.prototype.createRequiresTranspilation_=function(){function a(a,b){e?d[a]=!0:b()?(c=a,d[a]=!1):e=d[a]=!0}function b(a){try{return!!eval(a)}catch(h){return!1}}
var c="es3",d={es3:!1},e=!1,f=goog.global.navigator&&goog.global.navigator.userAgent?goog.global.navigator.userAgent:"";a("es5",function(){return b("[1,].length==1")});a("es6",function(){return f.match(/Edge\/(\d+)(\.\d)*/i)?!1:b('(()=>{"use strict";class X{constructor(){if(new.target!=String)throw 1;this.x=42}}let q=Reflect.construct(X,[],String);if(q.x!=42||!(q instanceof String))throw 1;for(const a of[2,3]){if(a==2)continue;function f(z={a}){let a=0;return z.a}{function f(){return 0;}}return f()==3}})()')});
a("es7",function(){return b("2 ** 2 == 4")});a("es8",function(){return b("async () => 1, true")});a("es9",function(){return b("({...rest} = {}), true")});a("es_next",function(){return!1});return{target:c,map:d}},goog.Transpiler.prototype.needsTranspile=function(a,b){if("always"==goog.TRANSPILE)return!0;if("never"==goog.TRANSPILE)return!1;if(!this.requiresTranspilation_){var c=this.createRequiresTranspilation_();this.requiresTranspilation_=c.map;this.transpilationTarget_=this.transpilationTarget_||
c.target}if(a in this.requiresTranspilation_)return this.requiresTranspilation_[a]?!0:!goog.inHtmlDocument_()||"es6"!=b||"noModule"in goog.global.document.createElement("script")?!1:!0;throw Error("Unknown language mode: "+a);},goog.Transpiler.prototype.transpile=function(a,b){return goog.transpile_(a,b,this.transpilationTarget_)},goog.transpiler_=new goog.Transpiler,goog.protectScriptTag_=function(a){return a.replace(/<\/(SCRIPT)/ig,"\\x3c/$1")},goog.DebugLoader_=function(){this.dependencies_={};
this.idToPath_={};this.written_={};this.loadingDeps_=[];this.depsToLoad_=[];this.paused_=!1;this.factory_=new goog.DependencyFactory(goog.transpiler_);this.deferredCallbacks_={};this.deferredQueue_=[]},goog.DebugLoader_.prototype.bootstrap=function(a,b){function c(){d&&(goog.global.setTimeout(d,0),d=null)}var d=b;if(a.length){b=[];for(var e=0;e<a.length;e++){var f=this.getPathFromDeps_(a[e]);if(!f)throw Error("Unregonized namespace: "+a[e]);b.push(this.dependencies_[f])}f=goog.require;var g=0;for(e=
0;e<a.length;e++)f(a[e]),b[e].onLoad(function(){++g==a.length&&c()})}else c()},goog.DebugLoader_.prototype.loadClosureDeps=function(){this.depsToLoad_.push(this.factory_.createDependency(goog.normalizePath_(goog.basePath+"deps.js"),"deps.js",[],[],{},!1));this.loadDeps_()},goog.DebugLoader_.prototype.requested=function(a,b){(a=this.getPathFromDeps_(a))&&(b||this.areDepsLoaded_(this.dependencies_[a].requires))&&(b=this.deferredCallbacks_[a])&&(delete this.deferredCallbacks_[a],b())},goog.DebugLoader_.prototype.setDependencyFactory=
function(a){this.factory_=a},goog.DebugLoader_.prototype.load_=function(a){if(this.getPathFromDeps_(a)){var b=this,c=[],d=function(a){var e=b.getPathFromDeps_(a);if(!e)throw Error("Bad dependency path or symbol: "+a);if(!b.written_[e]){b.written_[e]=!0;a=b.dependencies_[e];for(e=0;e<a.requires.length;e++)goog.isProvided_(a.requires[e])||d(a.requires[e]);c.push(a)}};d(a);a=!!this.depsToLoad_.length;this.depsToLoad_=this.depsToLoad_.concat(c);this.paused_||a||this.loadDeps_()}else throw a="goog.require could not find: "+
a,goog.logToConsole_(a),Error(a);},goog.DebugLoader_.prototype.loadDeps_=function(){for(var a=this,b=this.paused_;this.depsToLoad_.length&&!b;)(function(){var c=!1,d=a.depsToLoad_.shift(),e=!1;a.loading_(d);var f={pause:function(){if(c)throw Error("Cannot call pause after the call to load.");b=!0},resume:function(){c?a.resume_():b=!1},loaded:function(){if(e)throw Error("Double call to loaded.");e=!0;a.loaded_(d)},pending:function(){for(var b=[],c=0;c<a.loadingDeps_.length;c++)b.push(a.loadingDeps_[c]);
return b},setModuleState:function(a){goog.moduleLoaderState_={type:a,moduleName:"",declareLegacyNamespace:!1}},registerEs6ModuleExports:function(a,b,c){c&&(goog.loadedModules_[c]={exports:b,type:goog.ModuleType.ES6,moduleId:c||""})},registerGoogModuleExports:function(a,b){goog.loadedModules_[a]={exports:b,type:goog.ModuleType.GOOG,moduleId:a}},clearModuleState:function(){goog.moduleLoaderState_=null},defer:function(b){if(c)throw Error("Cannot register with defer after the call to load.");a.defer_(d,
b)},areDepsLoaded:function(){return a.areDepsLoaded_(d.requires)}};try{d.load(f)}finally{c=!0}})();b&&this.pause_()},goog.DebugLoader_.prototype.pause_=function(){this.paused_=!0},goog.DebugLoader_.prototype.resume_=function(){this.paused_&&(this.paused_=!1,this.loadDeps_())},goog.DebugLoader_.prototype.loading_=function(a){this.loadingDeps_.push(a)},goog.DebugLoader_.prototype.loaded_=function(a){for(var b=0;b<this.loadingDeps_.length;b++)if(this.loadingDeps_[b]==a){this.loadingDeps_.splice(b,1);
break}for(b=0;b<this.deferredQueue_.length;b++)if(this.deferredQueue_[b]==a.path){this.deferredQueue_.splice(b,1);break}if(this.loadingDeps_.length==this.deferredQueue_.length&&!this.depsToLoad_.length)for(;this.deferredQueue_.length;)this.requested(this.deferredQueue_.shift(),!0);a.loaded()},goog.DebugLoader_.prototype.areDepsLoaded_=function(a){for(var b=0;b<a.length;b++){var c=this.getPathFromDeps_(a[b]);if(!c||!(c in this.deferredCallbacks_||goog.isProvided_(a[b])))return!1}return!0},goog.DebugLoader_.prototype.getPathFromDeps_=
function(a){return a in this.idToPath_?this.idToPath_[a]:a in this.dependencies_?a:null},goog.DebugLoader_.prototype.defer_=function(a,b){this.deferredCallbacks_[a.path]=b;this.deferredQueue_.push(a.path)},goog.LoadController=function(){},goog.LoadController.prototype.pause=function(){},goog.LoadController.prototype.resume=function(){},goog.LoadController.prototype.loaded=function(){},goog.LoadController.prototype.pending=function(){},goog.LoadController.prototype.registerEs6ModuleExports=function(a,
b,c){},goog.LoadController.prototype.setModuleState=function(a){},goog.LoadController.prototype.clearModuleState=function(){},goog.LoadController.prototype.defer=function(a){},goog.LoadController.prototype.areDepsLoaded=function(){},goog.Dependency=function(a,b,c,d,e){this.path=a;this.relativePath=b;this.provides=c;this.requires=d;this.loadFlags=e;this.loaded_=!1;this.loadCallbacks_=[]},goog.Dependency.prototype.getPathName=function(){var a=this.path,b=a.indexOf("://");0<=b&&(a=a.substring(b+3),b=
a.indexOf("/"),0<=b&&(a=a.substring(b+1)));return a},goog.Dependency.prototype.onLoad=function(a){this.loaded_?a():this.loadCallbacks_.push(a)},goog.Dependency.prototype.loaded=function(){this.loaded_=!0;var a=this.loadCallbacks_;this.loadCallbacks_=[];for(var b=0;b<a.length;b++)a[b]()},goog.Dependency.defer_=!1,goog.Dependency.callbackMap_={},goog.Dependency.registerCallback_=function(a){var b=Math.random().toString(32);goog.Dependency.callbackMap_[b]=a;return b},goog.Dependency.unregisterCallback_=
function(a){delete goog.Dependency.callbackMap_[a]},goog.Dependency.callback_=function(a,b){if(a in goog.Dependency.callbackMap_){for(var c=goog.Dependency.callbackMap_[a],d=[],e=1;e<arguments.length;e++)d.push(arguments[e]);c.apply(void 0,d)}else throw Error("Callback key "+a+" does not exist (was base.js loaded more than once?).");},goog.Dependency.prototype.load=function(a){if(goog.global.CLOSURE_IMPORT_SCRIPT)goog.global.CLOSURE_IMPORT_SCRIPT(this.path)?a.loaded():a.pause();else if(goog.inHtmlDocument_()){var b=
goog.global.document;if("complete"==b.readyState&&!goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING){if(/\bdeps.js$/.test(this.path)){a.loaded();return}throw Error('Cannot write "'+this.path+'" after document load');}if(!goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING&&goog.isDocumentLoading_()){var c=goog.Dependency.registerCallback_(function(b){goog.DebugLoader_.IS_OLD_IE_&&"complete"!=b.readyState||(goog.Dependency.unregisterCallback_(c),a.loaded())}),d=!goog.DebugLoader_.IS_OLD_IE_&&goog.getScriptNonce()?
' nonce="'+goog.getScriptNonce()+'"':"";d='<script src="'+this.path+'" '+(goog.DebugLoader_.IS_OLD_IE_?"onreadystatechange":"onload")+"=\"goog.Dependency.callback_('"+c+'\', this)" type="text/javascript" '+(goog.Dependency.defer_?"defer":"")+d+">\x3c/script>";b.write(goog.TRUSTED_TYPES_POLICY_?goog.TRUSTED_TYPES_POLICY_.createHTML(d):d)}else{var e=b.createElement("script");e.defer=goog.Dependency.defer_;e.async=!1;e.type="text/javascript";(d=goog.getScriptNonce())&&e.setAttribute("nonce",d);goog.DebugLoader_.IS_OLD_IE_?
(a.pause(),e.onreadystatechange=function(){if("loaded"==e.readyState||"complete"==e.readyState)a.loaded(),a.resume()}):e.onload=function(){e.onload=null;a.loaded()};e.src=goog.TRUSTED_TYPES_POLICY_?goog.TRUSTED_TYPES_POLICY_.createScriptURL(this.path):this.path;b.head.appendChild(e)}}else goog.logToConsole_("Cannot use default debug loader outside of HTML documents."),"deps.js"==this.relativePath?(goog.logToConsole_("Consider setting CLOSURE_IMPORT_SCRIPT before loading base.js, or setting CLOSURE_NO_DEPS to true."),
a.loaded()):a.pause()},goog.Es6ModuleDependency=function(a,b,c,d,e){goog.Dependency.call(this,a,b,c,d,e)},goog.inherits(goog.Es6ModuleDependency,goog.Dependency),goog.Es6ModuleDependency.prototype.load=function(a){function b(a,b){a=b?'<script type="module" crossorigin>'+b+"\x3c/script>":'<script type="module" crossorigin src="'+a+'">\x3c/script>';d.write(goog.TRUSTED_TYPES_POLICY_?goog.TRUSTED_TYPES_POLICY_.createHTML(a):a)}function c(a,b){var c=d.createElement("script");c.defer=!0;c.async=!1;c.type=
"module";c.setAttribute("crossorigin",!0);var e=goog.getScriptNonce();e&&c.setAttribute("nonce",e);b?c.textContent=goog.TRUSTED_TYPES_POLICY_?goog.TRUSTED_TYPES_POLICY_.createScript(b):b:c.src=goog.TRUSTED_TYPES_POLICY_?goog.TRUSTED_TYPES_POLICY_.createScriptURL(a):a;d.head.appendChild(c)}if(goog.global.CLOSURE_IMPORT_SCRIPT)goog.global.CLOSURE_IMPORT_SCRIPT(this.path)?a.loaded():a.pause();else if(goog.inHtmlDocument_()){var d=goog.global.document,e=this;if(goog.isDocumentLoading_()){var f=b;goog.Dependency.defer_=
!0}else f=c;var g=goog.Dependency.registerCallback_(function(){goog.Dependency.unregisterCallback_(g);a.setModuleState(goog.ModuleType.ES6)});f(void 0,'goog.Dependency.callback_("'+g+'")');f(this.path,void 0);var h=goog.Dependency.registerCallback_(function(b){goog.Dependency.unregisterCallback_(h);a.registerEs6ModuleExports(e.path,b,goog.moduleLoaderState_.moduleName)});f(void 0,'import * as m from "'+this.path+'"; goog.Dependency.callback_("'+h+'", m)');var k=goog.Dependency.registerCallback_(function(){goog.Dependency.unregisterCallback_(k);
a.clearModuleState();a.loaded()});f(void 0,'goog.Dependency.callback_("'+k+'")')}else goog.logToConsole_("Cannot use default debug loader outside of HTML documents."),a.pause()},goog.TransformedDependency=function(a,b,c,d,e){goog.Dependency.call(this,a,b,c,d,e);this.contents_=null;this.lazyFetch_=!goog.inHtmlDocument_()||!("noModule"in goog.global.document.createElement("script"))},goog.inherits(goog.TransformedDependency,goog.Dependency),goog.TransformedDependency.prototype.load=function(a){function b(){e.contents_=
goog.loadFileSync_(e.path);e.contents_&&(e.contents_=e.transform(e.contents_),e.contents_&&(e.contents_+="\n//# sourceURL="+e.path))}function c(){e.lazyFetch_&&b();if(e.contents_){f&&a.setModuleState(goog.ModuleType.ES6);try{var c=e.contents_;e.contents_=null;goog.globalEval(c);if(f)var d=goog.moduleLoaderState_.moduleName}finally{f&&a.clearModuleState()}f&&goog.global.$jscomp.require.ensure([e.getPathName()],function(){a.registerEs6ModuleExports(e.path,goog.global.$jscomp.require(e.getPathName()),
d)});a.loaded()}}function d(){var a=goog.global.document,b=goog.Dependency.registerCallback_(function(){goog.Dependency.unregisterCallback_(b);c()}),d='<script type="text/javascript">'+goog.protectScriptTag_('goog.Dependency.callback_("'+b+'");')+"\x3c/script>";a.write(goog.TRUSTED_TYPES_POLICY_?goog.TRUSTED_TYPES_POLICY_.createHTML(d):d)}var e=this;if(goog.global.CLOSURE_IMPORT_SCRIPT)b(),this.contents_&&goog.global.CLOSURE_IMPORT_SCRIPT("",this.contents_)?(this.contents_=null,a.loaded()):a.pause();
else{var f=this.loadFlags.module==goog.ModuleType.ES6;this.lazyFetch_||b();var g=1<a.pending().length,h=g&&goog.DebugLoader_.IS_OLD_IE_;g=goog.Dependency.defer_&&(g||goog.isDocumentLoading_());if(h||g)a.defer(function(){c()});else{var k=goog.global.document;h=goog.inHtmlDocument_()&&"ActiveXObject"in goog.global;if(f&&goog.inHtmlDocument_()&&goog.isDocumentLoading_()&&!h){goog.Dependency.defer_=!0;a.pause();var l=k.onreadystatechange;k.onreadystatechange=function(){"interactive"==k.readyState&&(k.onreadystatechange=
l,c(),a.resume());goog.isFunction(l)&&l.apply(void 0,arguments)}}else!goog.DebugLoader_.IS_OLD_IE_&&goog.inHtmlDocument_()&&goog.isDocumentLoading_()?d():c()}}},goog.TransformedDependency.prototype.transform=function(a){},goog.TranspiledDependency=function(a,b,c,d,e,f){goog.TransformedDependency.call(this,a,b,c,d,e);this.transpiler=f},goog.inherits(goog.TranspiledDependency,goog.TransformedDependency),goog.TranspiledDependency.prototype.transform=function(a){return this.transpiler.transpile(a,this.getPathName())},
goog.PreTranspiledEs6ModuleDependency=function(a,b,c,d,e){goog.TransformedDependency.call(this,a,b,c,d,e)},goog.inherits(goog.PreTranspiledEs6ModuleDependency,goog.TransformedDependency),goog.PreTranspiledEs6ModuleDependency.prototype.transform=function(a){return a},goog.GoogModuleDependency=function(a,b,c,d,e,f,g){goog.TransformedDependency.call(this,a,b,c,d,e);this.needsTranspile_=f;this.transpiler_=g},goog.inherits(goog.GoogModuleDependency,goog.TransformedDependency),goog.GoogModuleDependency.prototype.transform=
function(a){this.needsTranspile_&&(a=this.transpiler_.transpile(a,this.getPathName()));return goog.LOAD_MODULE_USING_EVAL&&goog.isDef(goog.global.JSON)?"goog.loadModule("+goog.global.JSON.stringify(a+"\n//# sourceURL="+this.path+"\n")+");":'goog.loadModule(function(exports) {"use strict";'+a+"\n;return exports});\n//# sourceURL="+this.path+"\n"},goog.DebugLoader_.IS_OLD_IE_=!(goog.global.atob||!goog.global.document||!goog.global.document.all),goog.DebugLoader_.prototype.addDependency=function(a,b,
c,d){b=b||[];a=a.replace(/\\/g,"/");var e=goog.normalizePath_(goog.basePath+a);d&&"boolean"!==typeof d||(d=d?{module:goog.ModuleType.GOOG}:{});c=this.factory_.createDependency(e,a,b,c,d,goog.transpiler_.needsTranspile(d.lang||"es3",d.module));this.dependencies_[e]=c;for(c=0;c<b.length;c++)this.idToPath_[b[c]]=e;this.idToPath_[a]=e},goog.DependencyFactory=function(a){this.transpiler=a},goog.DependencyFactory.prototype.createDependency=function(a,b,c,d,e,f){return e.module==goog.ModuleType.GOOG?new goog.GoogModuleDependency(a,
b,c,d,e,f,this.transpiler):f?new goog.TranspiledDependency(a,b,c,d,e,this.transpiler):e.module==goog.ModuleType.ES6?"never"==goog.TRANSPILE&&goog.ASSUME_ES_MODULES_TRANSPILED?new goog.PreTranspiledEs6ModuleDependency(a,b,c,d,e):new goog.Es6ModuleDependency(a,b,c,d,e):new goog.Dependency(a,b,c,d,e)},goog.debugLoader_=new goog.DebugLoader_,goog.loadClosureDeps=function(){goog.debugLoader_.loadClosureDeps()},goog.setDependencyFactory=function(a){goog.debugLoader_.setDependencyFactory(a)},goog.global.CLOSURE_NO_DEPS||
goog.debugLoader_.loadClosureDeps(),goog.bootstrap=function(a,b){goog.debugLoader_.bootstrap(a,b)});goog.TRUSTED_TYPES_POLICY_NAME="";goog.identity_=function(a){return a};goog.createTrustedTypesPolicy=function(a){var b=null;if("undefined"===typeof TrustedTypes||!TrustedTypes.createPolicy)return b;try{b=TrustedTypes.createPolicy(a,{createHTML:goog.identity_,createScript:goog.identity_,createScriptURL:goog.identity_,createURL:goog.identity_})}catch(c){goog.logToConsole_(c.message)}return b};
goog.TRUSTED_TYPES_POLICY_=goog.TRUSTED_TYPES_POLICY_NAME?goog.createTrustedTypesPolicy(goog.TRUSTED_TYPES_POLICY_NAME+"#base"):null;var jspb={BinaryConstants:{},ConstBinaryMessage:function(){},BinaryMessage:function(){}};jspb.BinaryConstants.FieldType={INVALID:-1,DOUBLE:1,FLOAT:2,INT64:3,UINT64:4,INT32:5,FIXED64:6,FIXED32:7,BOOL:8,STRING:9,GROUP:10,MESSAGE:11,BYTES:12,UINT32:13,ENUM:14,SFIXED32:15,SFIXED64:16,SINT32:17,SINT64:18,FHASH64:30,VHASH64:31};jspb.BinaryConstants.WireType={INVALID:-1,VARINT:0,FIXED64:1,DELIMITED:2,START_GROUP:3,END_GROUP:4,FIXED32:5};
jspb.BinaryConstants.FieldTypeToWireType=function(a){var b=jspb.BinaryConstants.FieldType,c=jspb.BinaryConstants.WireType;switch(a){case b.INT32:case b.INT64:case b.UINT32:case b.UINT64:case b.SINT32:case b.SINT64:case b.BOOL:case b.ENUM:case b.VHASH64:return c.VARINT;case b.DOUBLE:case b.FIXED64:case b.SFIXED64:case b.FHASH64:return c.FIXED64;case b.STRING:case b.MESSAGE:case b.BYTES:return c.DELIMITED;case b.FLOAT:case b.FIXED32:case b.SFIXED32:return c.FIXED32;default:return c.INVALID}};
jspb.BinaryConstants.INVALID_FIELD_NUMBER=-1;jspb.BinaryConstants.FLOAT32_EPS=1.401298464324817E-45;jspb.BinaryConstants.FLOAT32_MIN=1.1754943508222875E-38;jspb.BinaryConstants.FLOAT32_MAX=3.4028234663852886E38;jspb.BinaryConstants.FLOAT64_EPS=4.9E-324;jspb.BinaryConstants.FLOAT64_MIN=2.2250738585072014E-308;jspb.BinaryConstants.FLOAT64_MAX=1.7976931348623157E308;jspb.BinaryConstants.TWO_TO_20=1048576;jspb.BinaryConstants.TWO_TO_23=8388608;jspb.BinaryConstants.TWO_TO_31=2147483648;
jspb.BinaryConstants.TWO_TO_32=4294967296;jspb.BinaryConstants.TWO_TO_52=4503599627370496;jspb.BinaryConstants.TWO_TO_63=0x7fffffffffffffff;jspb.BinaryConstants.TWO_TO_64=1.8446744073709552E19;jspb.BinaryConstants.ZERO_HASH="\x00\x00\x00\x00\x00\x00\x00\x00";goog.dom={};goog.dom.NodeType={ELEMENT:1,ATTRIBUTE:2,TEXT:3,CDATA_SECTION:4,ENTITY_REFERENCE:5,ENTITY:6,PROCESSING_INSTRUCTION:7,COMMENT:8,DOCUMENT:9,DOCUMENT_TYPE:10,DOCUMENT_FRAGMENT:11,NOTATION:12};goog.debug={};goog.debug.Error=function(a){if(Error.captureStackTrace)Error.captureStackTrace(this,goog.debug.Error);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a));this.reportErrorToServer=!0};goog.inherits(goog.debug.Error,Error);goog.debug.Error.prototype.name="CustomError";goog.asserts={};goog.asserts.ENABLE_ASSERTS=goog.DEBUG;goog.asserts.AssertionError=function(a,b){goog.debug.Error.call(this,goog.asserts.subs_(a,b));this.messagePattern=a};goog.inherits(goog.asserts.AssertionError,goog.debug.Error);goog.asserts.AssertionError.prototype.name="AssertionError";goog.asserts.DEFAULT_ERROR_HANDLER=function(a){throw a;};goog.asserts.errorHandler_=goog.asserts.DEFAULT_ERROR_HANDLER;
goog.asserts.subs_=function(a,b){a=a.split("%s");for(var c="",d=a.length-1,e=0;e<d;e++)c+=a[e]+(e<b.length?b[e]:"%s");return c+a[d]};goog.asserts.doAssertFailure_=function(a,b,c,d){var e="Assertion failed";if(c){e+=": "+c;var f=d}else a&&(e+=": "+a,f=b);a=new goog.asserts.AssertionError(""+e,f||[]);goog.asserts.errorHandler_(a)};goog.asserts.setErrorHandler=function(a){goog.asserts.ENABLE_ASSERTS&&(goog.asserts.errorHandler_=a)};
goog.asserts.assert=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!a&&goog.asserts.doAssertFailure_("",null,b,Array.prototype.slice.call(arguments,2));return a};goog.asserts.assertExists=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&null==a&&goog.asserts.doAssertFailure_("Expected to exist: %s.",[a],b,Array.prototype.slice.call(arguments,2));return a};
goog.asserts.fail=function(a,b){goog.asserts.ENABLE_ASSERTS&&goog.asserts.errorHandler_(new goog.asserts.AssertionError("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1)))};goog.asserts.assertNumber=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isNumber(a)&&goog.asserts.doAssertFailure_("Expected number but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};
goog.asserts.assertString=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isString(a)&&goog.asserts.doAssertFailure_("Expected string but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};goog.asserts.assertFunction=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isFunction(a)&&goog.asserts.doAssertFailure_("Expected function but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};
goog.asserts.assertObject=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isObject(a)&&goog.asserts.doAssertFailure_("Expected object but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};goog.asserts.assertArray=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isArray(a)&&goog.asserts.doAssertFailure_("Expected array but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};
goog.asserts.assertBoolean=function(a,b,c){goog.asserts.ENABLE_ASSERTS&&!goog.isBoolean(a)&&goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};goog.asserts.assertElement=function(a,b,c){!goog.asserts.ENABLE_ASSERTS||goog.isObject(a)&&a.nodeType==goog.dom.NodeType.ELEMENT||goog.asserts.doAssertFailure_("Expected Element but got %s: %s.",[goog.typeOf(a),a],b,Array.prototype.slice.call(arguments,2));return a};
goog.asserts.assertInstanceof=function(a,b,c,d){!goog.asserts.ENABLE_ASSERTS||a instanceof b||goog.asserts.doAssertFailure_("Expected instanceof %s but got %s.",[goog.asserts.getType_(b),goog.asserts.getType_(a)],c,Array.prototype.slice.call(arguments,3));return a};goog.asserts.assertFinite=function(a,b,c){!goog.asserts.ENABLE_ASSERTS||"number"==typeof a&&isFinite(a)||goog.asserts.doAssertFailure_("Expected %s to be a finite number but it is not.",[a],b,Array.prototype.slice.call(arguments,2));return a};
goog.asserts.assertObjectPrototypeIsIntact=function(){for(var a in Object.prototype)goog.asserts.fail(a+" should not be enumerable in Object.prototype.")};goog.asserts.getType_=function(a){return a instanceof Function?a.displayName||a.name||"unknown type name":a instanceof Object?a.constructor.displayName||a.constructor.name||Object.prototype.toString.call(a):null===a?"null":typeof a};goog.array={};goog.NATIVE_ARRAY_PROTOTYPES=goog.TRUSTED_SITE;goog.array.ASSUME_NATIVE_FUNCTIONS=2012<goog.FEATURESET_YEAR;goog.array.peek=function(a){return a[a.length-1]};goog.array.last=goog.array.peek;
goog.array.indexOf=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.indexOf)?function(a,b,c){goog.asserts.assert(null!=a.length);return Array.prototype.indexOf.call(a,b,c)}:function(a,b,c){c=null==c?0:0>c?Math.max(0,a.length+c):c;if(goog.isString(a))return goog.isString(b)&&1==b.length?a.indexOf(b,c):-1;for(;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1};
goog.array.lastIndexOf=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.lastIndexOf)?function(a,b,c){goog.asserts.assert(null!=a.length);return Array.prototype.lastIndexOf.call(a,b,null==c?a.length-1:c)}:function(a,b,c){c=null==c?a.length-1:c;0>c&&(c=Math.max(0,a.length+c));if(goog.isString(a))return goog.isString(b)&&1==b.length?a.lastIndexOf(b,c):-1;for(;0<=c;c--)if(c in a&&a[c]===b)return c;return-1};
goog.array.forEach=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.forEach)?function(a,b,c){goog.asserts.assert(null!=a.length);Array.prototype.forEach.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=goog.isString(a)?a.split(""):a,f=0;f<d;f++)f in e&&b.call(c,e[f],f,a)};goog.array.forEachRight=function(a,b,c){var d=a.length,e=goog.isString(a)?a.split(""):a;for(--d;0<=d;--d)d in e&&b.call(c,e[d],d,a)};
goog.array.filter=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.filter)?function(a,b,c){goog.asserts.assert(null!=a.length);return Array.prototype.filter.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=[],f=0,g=goog.isString(a)?a.split(""):a,h=0;h<d;h++)if(h in g){var k=g[h];b.call(c,k,h,a)&&(e[f++]=k)}return e};
goog.array.map=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.map)?function(a,b,c){goog.asserts.assert(null!=a.length);return Array.prototype.map.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=Array(d),f=goog.isString(a)?a.split(""):a,g=0;g<d;g++)g in f&&(e[g]=b.call(c,f[g],g,a));return e};
goog.array.reduce=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.reduce)?function(a,b,c,d){goog.asserts.assert(null!=a.length);d&&(b=goog.bind(b,d));return Array.prototype.reduce.call(a,b,c)}:function(a,b,c,d){var e=c;goog.array.forEach(a,function(c,g){e=b.call(d,e,c,g,a)});return e};
goog.array.reduceRight=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.reduceRight)?function(a,b,c,d){goog.asserts.assert(null!=a.length);goog.asserts.assert(null!=b);d&&(b=goog.bind(b,d));return Array.prototype.reduceRight.call(a,b,c)}:function(a,b,c,d){var e=c;goog.array.forEachRight(a,function(c,g){e=b.call(d,e,c,g,a)});return e};
goog.array.some=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.some)?function(a,b,c){goog.asserts.assert(null!=a.length);return Array.prototype.some.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=goog.isString(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return!0;return!1};
goog.array.every=goog.NATIVE_ARRAY_PROTOTYPES&&(goog.array.ASSUME_NATIVE_FUNCTIONS||Array.prototype.every)?function(a,b,c){goog.asserts.assert(null!=a.length);return Array.prototype.every.call(a,b,c)}:function(a,b,c){for(var d=a.length,e=goog.isString(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&!b.call(c,e[f],f,a))return!1;return!0};goog.array.count=function(a,b,c){var d=0;goog.array.forEach(a,function(a,f,g){b.call(c,a,f,g)&&++d},c);return d};
goog.array.find=function(a,b,c){b=goog.array.findIndex(a,b,c);return 0>b?null:goog.isString(a)?a.charAt(b):a[b]};goog.array.findIndex=function(a,b,c){for(var d=a.length,e=goog.isString(a)?a.split(""):a,f=0;f<d;f++)if(f in e&&b.call(c,e[f],f,a))return f;return-1};goog.array.findRight=function(a,b,c){b=goog.array.findIndexRight(a,b,c);return 0>b?null:goog.isString(a)?a.charAt(b):a[b]};
goog.array.findIndexRight=function(a,b,c){var d=a.length,e=goog.isString(a)?a.split(""):a;for(--d;0<=d;d--)if(d in e&&b.call(c,e[d],d,a))return d;return-1};goog.array.contains=function(a,b){return 0<=goog.array.indexOf(a,b)};goog.array.isEmpty=function(a){return 0==a.length};goog.array.clear=function(a){if(!goog.isArray(a))for(var b=a.length-1;0<=b;b--)delete a[b];a.length=0};goog.array.insert=function(a,b){goog.array.contains(a,b)||a.push(b)};
goog.array.insertAt=function(a,b,c){goog.array.splice(a,c,0,b)};goog.array.insertArrayAt=function(a,b,c){goog.partial(goog.array.splice,a,c,0).apply(null,b)};goog.array.insertBefore=function(a,b,c){var d;2==arguments.length||0>(d=goog.array.indexOf(a,c))?a.push(b):goog.array.insertAt(a,b,d)};goog.array.remove=function(a,b){b=goog.array.indexOf(a,b);var c;(c=0<=b)&&goog.array.removeAt(a,b);return c};
goog.array.removeLast=function(a,b){b=goog.array.lastIndexOf(a,b);return 0<=b?(goog.array.removeAt(a,b),!0):!1};goog.array.removeAt=function(a,b){goog.asserts.assert(null!=a.length);return 1==Array.prototype.splice.call(a,b,1).length};goog.array.removeIf=function(a,b,c){b=goog.array.findIndex(a,b,c);return 0<=b?(goog.array.removeAt(a,b),!0):!1};goog.array.removeAllIf=function(a,b,c){var d=0;goog.array.forEachRight(a,function(e,f){b.call(c,e,f,a)&&goog.array.removeAt(a,f)&&d++});return d};
goog.array.concat=function(a){return Array.prototype.concat.apply([],arguments)};goog.array.join=function(a){return Array.prototype.concat.apply([],arguments)};goog.array.toArray=function(a){var b=a.length;if(0<b){for(var c=Array(b),d=0;d<b;d++)c[d]=a[d];return c}return[]};goog.array.clone=goog.array.toArray;goog.array.extend=function(a,b){for(var c=1;c<arguments.length;c++){var d=arguments[c];if(goog.isArrayLike(d)){var e=a.length||0,f=d.length||0;a.length=e+f;for(var g=0;g<f;g++)a[e+g]=d[g]}else a.push(d)}};
goog.array.splice=function(a,b,c,d){goog.asserts.assert(null!=a.length);return Array.prototype.splice.apply(a,goog.array.slice(arguments,1))};goog.array.slice=function(a,b,c){goog.asserts.assert(null!=a.length);return 2>=arguments.length?Array.prototype.slice.call(a,b):Array.prototype.slice.call(a,b,c)};
goog.array.removeDuplicates=function(a,b,c){b=b||a;var d=function(a){return goog.isObject(a)?"o"+goog.getUid(a):(typeof a).charAt(0)+a};c=c||d;d={};for(var e=0,f=0;f<a.length;){var g=a[f++],h=c(g);Object.prototype.hasOwnProperty.call(d,h)||(d[h]=!0,b[e++]=g)}b.length=e};goog.array.binarySearch=function(a,b,c){return goog.array.binarySearch_(a,c||goog.array.defaultCompare,!1,b)};goog.array.binarySelect=function(a,b,c){return goog.array.binarySearch_(a,b,!0,void 0,c)};
goog.array.binarySearch_=function(a,b,c,d,e){for(var f=0,g=a.length,h;f<g;){var k=f+g>>1;var l=c?b.call(e,a[k],k,a):b(d,a[k]);0<l?f=k+1:(g=k,h=!l)}return h?f:~f};goog.array.sort=function(a,b){a.sort(b||goog.array.defaultCompare)};goog.array.stableSort=function(a,b){for(var c=Array(a.length),d=0;d<a.length;d++)c[d]={index:d,value:a[d]};var e=b||goog.array.defaultCompare;goog.array.sort(c,function(a,b){return e(a.value,b.value)||a.index-b.index});for(d=0;d<a.length;d++)a[d]=c[d].value};
goog.array.sortByKey=function(a,b,c){var d=c||goog.array.defaultCompare;goog.array.sort(a,function(a,c){return d(b(a),b(c))})};goog.array.sortObjectsByKey=function(a,b,c){goog.array.sortByKey(a,function(a){return a[b]},c)};goog.array.isSorted=function(a,b,c){b=b||goog.array.defaultCompare;for(var d=1;d<a.length;d++){var e=b(a[d-1],a[d]);if(0<e||0==e&&c)return!1}return!0};
goog.array.equals=function(a,b,c){if(!goog.isArrayLike(a)||!goog.isArrayLike(b)||a.length!=b.length)return!1;var d=a.length;c=c||goog.array.defaultCompareEquality;for(var e=0;e<d;e++)if(!c(a[e],b[e]))return!1;return!0};goog.array.compare3=function(a,b,c){c=c||goog.array.defaultCompare;for(var d=Math.min(a.length,b.length),e=0;e<d;e++){var f=c(a[e],b[e]);if(0!=f)return f}return goog.array.defaultCompare(a.length,b.length)};goog.array.defaultCompare=function(a,b){return a>b?1:a<b?-1:0};
goog.array.inverseDefaultCompare=function(a,b){return-goog.array.defaultCompare(a,b)};goog.array.defaultCompareEquality=function(a,b){return a===b};goog.array.binaryInsert=function(a,b,c){c=goog.array.binarySearch(a,b,c);return 0>c?(goog.array.insertAt(a,b,-(c+1)),!0):!1};goog.array.binaryRemove=function(a,b,c){b=goog.array.binarySearch(a,b,c);return 0<=b?goog.array.removeAt(a,b):!1};
goog.array.bucket=function(a,b,c){for(var d={},e=0;e<a.length;e++){var f=a[e],g=b.call(c,f,e,a);goog.isDef(g)&&(d[g]||(d[g]=[])).push(f)}return d};goog.array.toObject=function(a,b,c){var d={};goog.array.forEach(a,function(e,f){d[b.call(c,e,f,a)]=e});return d};goog.array.range=function(a,b,c){var d=[],e=0,f=a;c=c||1;void 0!==b&&(e=a,f=b);if(0>c*(f-e))return[];if(0<c)for(a=e;a<f;a+=c)d.push(a);else for(a=e;a>f;a+=c)d.push(a);return d};
goog.array.repeat=function(a,b){for(var c=[],d=0;d<b;d++)c[d]=a;return c};goog.array.flatten=function(a){for(var b=[],c=0;c<arguments.length;c++){var d=arguments[c];if(goog.isArray(d))for(var e=0;e<d.length;e+=8192){var f=goog.array.slice(d,e,e+8192);f=goog.array.flatten.apply(null,f);for(var g=0;g<f.length;g++)b.push(f[g])}else b.push(d)}return b};
goog.array.rotate=function(a,b){goog.asserts.assert(null!=a.length);a.length&&(b%=a.length,0<b?Array.prototype.unshift.apply(a,a.splice(-b,b)):0>b&&Array.prototype.push.apply(a,a.splice(0,-b)));return a};goog.array.moveItem=function(a,b,c){goog.asserts.assert(0<=b&&b<a.length);goog.asserts.assert(0<=c&&c<a.length);b=Array.prototype.splice.call(a,b,1);Array.prototype.splice.call(a,c,0,b[0])};
goog.array.zip=function(a){if(!arguments.length)return[];for(var b=[],c=arguments[0].length,d=1;d<arguments.length;d++)arguments[d].length<c&&(c=arguments[d].length);for(d=0;d<c;d++){for(var e=[],f=0;f<arguments.length;f++)e.push(arguments[f][d]);b.push(e)}return b};goog.array.shuffle=function(a,b){b=b||Math.random;for(var c=a.length-1;0<c;c--){var d=Math.floor(b()*(c+1)),e=a[c];a[c]=a[d];a[d]=e}};goog.array.copyByIndex=function(a,b){var c=[];goog.array.forEach(b,function(b){c.push(a[b])});return c};
goog.array.concatMap=function(a,b,c){return goog.array.concat.apply([],goog.array.map(a,b,c))};goog.crypt={};goog.crypt.stringToByteArray=function(a){for(var b=[],c=0,d=0;d<a.length;d++){var e=a.charCodeAt(d);255<e&&(b[c++]=e&255,e>>=8);b[c++]=e}return b};goog.crypt.byteArrayToString=function(a){if(8192>=a.length)return String.fromCharCode.apply(null,a);for(var b="",c=0;c<a.length;c+=8192){var d=goog.array.slice(a,c,c+8192);b+=String.fromCharCode.apply(null,d)}return b};
goog.crypt.byteArrayToHex=function(a,b){return goog.array.map(a,function(a){a=a.toString(16);return 1<a.length?a:"0"+a}).join(b||"")};goog.crypt.hexToByteArray=function(a){goog.asserts.assert(0==a.length%2,"Key string length must be multiple of 2");for(var b=[],c=0;c<a.length;c+=2)b.push(parseInt(a.substring(c,c+2),16));return b};
goog.crypt.stringToUtf8ByteArray=function(a){for(var b=[],c=0,d=0;d<a.length;d++){var e=a.charCodeAt(d);128>e?b[c++]=e:(2048>e?b[c++]=e>>6|192:(55296==(e&64512)&&d+1<a.length&&56320==(a.charCodeAt(d+1)&64512)?(e=65536+((e&1023)<<10)+(a.charCodeAt(++d)&1023),b[c++]=e>>18|240,b[c++]=e>>12&63|128):b[c++]=e>>12|224,b[c++]=e>>6&63|128),b[c++]=e&63|128)}return b};
goog.crypt.utf8ByteArrayToString=function(a){for(var b=[],c=0,d=0;c<a.length;){var e=a[c++];if(128>e)b[d++]=String.fromCharCode(e);else if(191<e&&224>e){var f=a[c++];b[d++]=String.fromCharCode((e&31)<<6|f&63)}else if(239<e&&365>e){f=a[c++];var g=a[c++],h=a[c++];e=((e&7)<<18|(f&63)<<12|(g&63)<<6|h&63)-65536;b[d++]=String.fromCharCode(55296+(e>>10));b[d++]=String.fromCharCode(56320+(e&1023))}else f=a[c++],g=a[c++],b[d++]=String.fromCharCode((e&15)<<12|(f&63)<<6|g&63)}return b.join("")};
goog.crypt.xorByteArray=function(a,b){goog.asserts.assert(a.length==b.length,"XOR array lengths must match");for(var c=[],d=0;d<a.length;d++)c.push(a[d]^b[d]);return c};goog.string={};goog.string.internal={};goog.string.internal.startsWith=function(a,b){return 0==a.lastIndexOf(b,0)};goog.string.internal.endsWith=function(a,b){var c=a.length-b.length;return 0<=c&&a.indexOf(b,c)==c};goog.string.internal.caseInsensitiveStartsWith=function(a,b){return 0==goog.string.internal.caseInsensitiveCompare(b,a.substr(0,b.length))};goog.string.internal.caseInsensitiveEndsWith=function(a,b){return 0==goog.string.internal.caseInsensitiveCompare(b,a.substr(a.length-b.length,b.length))};
goog.string.internal.caseInsensitiveEquals=function(a,b){return a.toLowerCase()==b.toLowerCase()};goog.string.internal.isEmptyOrWhitespace=function(a){return/^[\s\xa0]*$/.test(a)};goog.string.internal.trim=goog.TRUSTED_SITE&&String.prototype.trim?function(a){return a.trim()}:function(a){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]};goog.string.internal.caseInsensitiveCompare=function(a,b){a=String(a).toLowerCase();b=String(b).toLowerCase();return a<b?-1:a==b?0:1};
goog.string.internal.newLineToBr=function(a,b){return a.replace(/(\r\n|\r|\n)/g,b?"<br />":"<br>")};
goog.string.internal.htmlEscape=function(a,b){if(b)a=a.replace(goog.string.internal.AMP_RE_,"&amp;").replace(goog.string.internal.LT_RE_,"&lt;").replace(goog.string.internal.GT_RE_,"&gt;").replace(goog.string.internal.QUOT_RE_,"&quot;").replace(goog.string.internal.SINGLE_QUOTE_RE_,"&#39;").replace(goog.string.internal.NULL_RE_,"&#0;");else{if(!goog.string.internal.ALL_RE_.test(a))return a;-1!=a.indexOf("&")&&(a=a.replace(goog.string.internal.AMP_RE_,"&amp;"));-1!=a.indexOf("<")&&(a=a.replace(goog.string.internal.LT_RE_,
"&lt;"));-1!=a.indexOf(">")&&(a=a.replace(goog.string.internal.GT_RE_,"&gt;"));-1!=a.indexOf('"')&&(a=a.replace(goog.string.internal.QUOT_RE_,"&quot;"));-1!=a.indexOf("'")&&(a=a.replace(goog.string.internal.SINGLE_QUOTE_RE_,"&#39;"));-1!=a.indexOf("\x00")&&(a=a.replace(goog.string.internal.NULL_RE_,"&#0;"))}return a};goog.string.internal.AMP_RE_=/&/g;goog.string.internal.LT_RE_=/</g;goog.string.internal.GT_RE_=/>/g;goog.string.internal.QUOT_RE_=/"/g;goog.string.internal.SINGLE_QUOTE_RE_=/'/g;
goog.string.internal.NULL_RE_=/\x00/g;goog.string.internal.ALL_RE_=/[\x00&<>"']/;goog.string.internal.whitespaceEscape=function(a,b){return goog.string.internal.newLineToBr(a.replace(/  /g," &#160;"),b)};goog.string.internal.contains=function(a,b){return-1!=a.indexOf(b)};goog.string.internal.caseInsensitiveContains=function(a,b){return goog.string.internal.contains(a.toLowerCase(),b.toLowerCase())};
goog.string.internal.compareVersions=function(a,b){var c=0;a=goog.string.internal.trim(String(a)).split(".");b=goog.string.internal.trim(String(b)).split(".");for(var d=Math.max(a.length,b.length),e=0;0==c&&e<d;e++){var f=a[e]||"",g=b[e]||"";do{f=/(\d*)(\D*)(.*)/.exec(f)||["","","",""];g=/(\d*)(\D*)(.*)/.exec(g)||["","","",""];if(0==f[0].length&&0==g[0].length)break;c=0==f[1].length?0:parseInt(f[1],10);var h=0==g[1].length?0:parseInt(g[1],10);c=goog.string.internal.compareElements_(c,h)||goog.string.internal.compareElements_(0==
f[2].length,0==g[2].length)||goog.string.internal.compareElements_(f[2],g[2]);f=f[3];g=g[3]}while(0==c)}return c};goog.string.internal.compareElements_=function(a,b){return a<b?-1:a>b?1:0};goog.string.TypedString=function(){};goog.string.Const=function(a,b){this.stringConstValueWithSecurityContract__googStringSecurityPrivate_=a===goog.string.Const.GOOG_STRING_CONSTRUCTOR_TOKEN_PRIVATE_&&b||"";this.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_=goog.string.Const.TYPE_MARKER_};goog.string.Const.prototype.implementsGoogStringTypedString=!0;goog.string.Const.prototype.getTypedStringValue=function(){return this.stringConstValueWithSecurityContract__googStringSecurityPrivate_};
goog.string.Const.prototype.toString=function(){return"Const{"+this.stringConstValueWithSecurityContract__googStringSecurityPrivate_+"}"};goog.string.Const.unwrap=function(a){if(a instanceof goog.string.Const&&a.constructor===goog.string.Const&&a.STRING_CONST_TYPE_MARKER__GOOG_STRING_SECURITY_PRIVATE_===goog.string.Const.TYPE_MARKER_)return a.stringConstValueWithSecurityContract__googStringSecurityPrivate_;goog.asserts.fail("expected object of type Const, got '"+a+"'");return"type_error:Const"};
goog.string.Const.from=function(a){return new goog.string.Const(goog.string.Const.GOOG_STRING_CONSTRUCTOR_TOKEN_PRIVATE_,a)};goog.string.Const.TYPE_MARKER_={};goog.string.Const.GOOG_STRING_CONSTRUCTOR_TOKEN_PRIVATE_={};goog.string.Const.EMPTY=goog.string.Const.from("");goog.fs={};goog.fs.url={};goog.fs.url.createObjectUrl=function(a){return goog.fs.url.getUrlObject_().createObjectURL(a)};goog.fs.url.revokeObjectUrl=function(a){goog.fs.url.getUrlObject_().revokeObjectURL(a)};goog.fs.url.getUrlObject_=function(){var a=goog.fs.url.findUrlObject_();if(null!=a)return a;throw Error("This browser doesn't seem to support blob URLs");};
goog.fs.url.findUrlObject_=function(){return goog.isDef(goog.global.URL)&&goog.isDef(goog.global.URL.createObjectURL)?goog.global.URL:goog.isDef(goog.global.webkitURL)&&goog.isDef(goog.global.webkitURL.createObjectURL)?goog.global.webkitURL:goog.isDef(goog.global.createObjectURL)?goog.global:null};goog.fs.url.browserSupportsObjectUrls=function(){return null!=goog.fs.url.findUrlObject_()};goog.html={};goog.html.trustedtypes={};goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY=goog.TRUSTED_TYPES_POLICY_NAME?goog.createTrustedTypesPolicy(goog.TRUSTED_TYPES_POLICY_NAME+"#html"):null;goog.i18n={};goog.i18n.bidi={};goog.i18n.bidi.FORCE_RTL=!1;
goog.i18n.bidi.IS_RTL=goog.i18n.bidi.FORCE_RTL||("ar"==goog.LOCALE.substring(0,2).toLowerCase()||"fa"==goog.LOCALE.substring(0,2).toLowerCase()||"he"==goog.LOCALE.substring(0,2).toLowerCase()||"iw"==goog.LOCALE.substring(0,2).toLowerCase()||"ps"==goog.LOCALE.substring(0,2).toLowerCase()||"sd"==goog.LOCALE.substring(0,2).toLowerCase()||"ug"==goog.LOCALE.substring(0,2).toLowerCase()||"ur"==goog.LOCALE.substring(0,2).toLowerCase()||"yi"==goog.LOCALE.substring(0,2).toLowerCase())&&(2==goog.LOCALE.length||
"-"==goog.LOCALE.substring(2,3)||"_"==goog.LOCALE.substring(2,3))||3<=goog.LOCALE.length&&"ckb"==goog.LOCALE.substring(0,3).toLowerCase()&&(3==goog.LOCALE.length||"-"==goog.LOCALE.substring(3,4)||"_"==goog.LOCALE.substring(3,4))||7<=goog.LOCALE.length&&("-"==goog.LOCALE.substring(2,3)||"_"==goog.LOCALE.substring(2,3))&&("adlm"==goog.LOCALE.substring(3,7).toLowerCase()||"arab"==goog.LOCALE.substring(3,7).toLowerCase()||"hebr"==goog.LOCALE.substring(3,7).toLowerCase()||"nkoo"==goog.LOCALE.substring(3,
7).toLowerCase()||"rohg"==goog.LOCALE.substring(3,7).toLowerCase()||"thaa"==goog.LOCALE.substring(3,7).toLowerCase())||8<=goog.LOCALE.length&&("-"==goog.LOCALE.substring(3,4)||"_"==goog.LOCALE.substring(3,4))&&("adlm"==goog.LOCALE.substring(4,8).toLowerCase()||"arab"==goog.LOCALE.substring(4,8).toLowerCase()||"hebr"==goog.LOCALE.substring(4,8).toLowerCase()||"nkoo"==goog.LOCALE.substring(4,8).toLowerCase()||"rohg"==goog.LOCALE.substring(4,8).toLowerCase()||"thaa"==goog.LOCALE.substring(4,8).toLowerCase());
goog.i18n.bidi.Format={LRE:"\u202a",RLE:"\u202b",PDF:"\u202c",LRM:"\u200e",RLM:"\u200f"};goog.i18n.bidi.Dir={LTR:1,RTL:-1,NEUTRAL:0};goog.i18n.bidi.RIGHT="right";goog.i18n.bidi.LEFT="left";goog.i18n.bidi.I18N_RIGHT=goog.i18n.bidi.IS_RTL?goog.i18n.bidi.LEFT:goog.i18n.bidi.RIGHT;goog.i18n.bidi.I18N_LEFT=goog.i18n.bidi.IS_RTL?goog.i18n.bidi.RIGHT:goog.i18n.bidi.LEFT;
goog.i18n.bidi.toDir=function(a,b){return"number"==typeof a?0<a?goog.i18n.bidi.Dir.LTR:0>a?goog.i18n.bidi.Dir.RTL:b?null:goog.i18n.bidi.Dir.NEUTRAL:null==a?null:a?goog.i18n.bidi.Dir.RTL:goog.i18n.bidi.Dir.LTR};goog.i18n.bidi.ltrChars_="A-Za-z\u00c0-\u00d6\u00d8-\u00f6\u00f8-\u02b8\u0300-\u0590\u0900-\u1fff\u200e\u2c00-\ud801\ud804-\ud839\ud83c-\udbff\uf900-\ufb1c\ufe00-\ufe6f\ufefd-\uffff";goog.i18n.bidi.rtlChars_="\u0591-\u06ef\u06fa-\u08ff\u200f\ud802-\ud803\ud83a-\ud83b\ufb1d-\ufdff\ufe70-\ufefc";
goog.i18n.bidi.htmlSkipReg_=/<[^>]*>|&[^;]+;/g;goog.i18n.bidi.stripHtmlIfNeeded_=function(a,b){return b?a.replace(goog.i18n.bidi.htmlSkipReg_,""):a};goog.i18n.bidi.rtlCharReg_=new RegExp("["+goog.i18n.bidi.rtlChars_+"]");goog.i18n.bidi.ltrCharReg_=new RegExp("["+goog.i18n.bidi.ltrChars_+"]");goog.i18n.bidi.hasAnyRtl=function(a,b){return goog.i18n.bidi.rtlCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a,b))};goog.i18n.bidi.hasRtlChar=goog.i18n.bidi.hasAnyRtl;
goog.i18n.bidi.hasAnyLtr=function(a,b){return goog.i18n.bidi.ltrCharReg_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a,b))};goog.i18n.bidi.ltrRe_=new RegExp("^["+goog.i18n.bidi.ltrChars_+"]");goog.i18n.bidi.rtlRe_=new RegExp("^["+goog.i18n.bidi.rtlChars_+"]");goog.i18n.bidi.isRtlChar=function(a){return goog.i18n.bidi.rtlRe_.test(a)};goog.i18n.bidi.isLtrChar=function(a){return goog.i18n.bidi.ltrRe_.test(a)};goog.i18n.bidi.isNeutralChar=function(a){return!goog.i18n.bidi.isLtrChar(a)&&!goog.i18n.bidi.isRtlChar(a)};
goog.i18n.bidi.ltrDirCheckRe_=new RegExp("^[^"+goog.i18n.bidi.rtlChars_+"]*["+goog.i18n.bidi.ltrChars_+"]");goog.i18n.bidi.rtlDirCheckRe_=new RegExp("^[^"+goog.i18n.bidi.ltrChars_+"]*["+goog.i18n.bidi.rtlChars_+"]");goog.i18n.bidi.startsWithRtl=function(a,b){return goog.i18n.bidi.rtlDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a,b))};goog.i18n.bidi.isRtlText=goog.i18n.bidi.startsWithRtl;
goog.i18n.bidi.startsWithLtr=function(a,b){return goog.i18n.bidi.ltrDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a,b))};goog.i18n.bidi.isLtrText=goog.i18n.bidi.startsWithLtr;goog.i18n.bidi.isRequiredLtrRe_=/^http:\/\/.*/;goog.i18n.bidi.isNeutralText=function(a,b){a=goog.i18n.bidi.stripHtmlIfNeeded_(a,b);return goog.i18n.bidi.isRequiredLtrRe_.test(a)||!goog.i18n.bidi.hasAnyLtr(a)&&!goog.i18n.bidi.hasAnyRtl(a)};
goog.i18n.bidi.ltrExitDirCheckRe_=new RegExp("["+goog.i18n.bidi.ltrChars_+"][^"+goog.i18n.bidi.rtlChars_+"]*$");goog.i18n.bidi.rtlExitDirCheckRe_=new RegExp("["+goog.i18n.bidi.rtlChars_+"][^"+goog.i18n.bidi.ltrChars_+"]*$");goog.i18n.bidi.endsWithLtr=function(a,b){return goog.i18n.bidi.ltrExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a,b))};goog.i18n.bidi.isLtrExitText=goog.i18n.bidi.endsWithLtr;
goog.i18n.bidi.endsWithRtl=function(a,b){return goog.i18n.bidi.rtlExitDirCheckRe_.test(goog.i18n.bidi.stripHtmlIfNeeded_(a,b))};goog.i18n.bidi.isRtlExitText=goog.i18n.bidi.endsWithRtl;goog.i18n.bidi.rtlLocalesRe_=/^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;goog.i18n.bidi.isRtlLanguage=function(a){return goog.i18n.bidi.rtlLocalesRe_.test(a)};goog.i18n.bidi.bracketGuardTextRe_=/(\(.*?\)+)|(\[.*?\]+)|(\{.*?\}+)|(<.*?>+)/g;
goog.i18n.bidi.guardBracketInText=function(a,b){b=(void 0===b?goog.i18n.bidi.hasAnyRtl(a):b)?goog.i18n.bidi.Format.RLM:goog.i18n.bidi.Format.LRM;return a.replace(goog.i18n.bidi.bracketGuardTextRe_,b+"$&"+b)};goog.i18n.bidi.enforceRtlInHtml=function(a){return"<"==a.charAt(0)?a.replace(/<\w+/,"$& dir=rtl"):"\n<span dir=rtl>"+a+"</span>"};goog.i18n.bidi.enforceRtlInText=function(a){return goog.i18n.bidi.Format.RLE+a+goog.i18n.bidi.Format.PDF};
goog.i18n.bidi.enforceLtrInHtml=function(a){return"<"==a.charAt(0)?a.replace(/<\w+/,"$& dir=ltr"):"\n<span dir=ltr>"+a+"</span>"};goog.i18n.bidi.enforceLtrInText=function(a){return goog.i18n.bidi.Format.LRE+a+goog.i18n.bidi.Format.PDF};goog.i18n.bidi.dimensionsRe_=/:\s*([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)\s+([.\d][.\w]*)/g;goog.i18n.bidi.leftRe_=/left/gi;goog.i18n.bidi.rightRe_=/right/gi;goog.i18n.bidi.tempRe_=/%%%%/g;
goog.i18n.bidi.mirrorCSS=function(a){return a.replace(goog.i18n.bidi.dimensionsRe_,":$1 $4 $3 $2").replace(goog.i18n.bidi.leftRe_,"%%%%").replace(goog.i18n.bidi.rightRe_,goog.i18n.bidi.LEFT).replace(goog.i18n.bidi.tempRe_,goog.i18n.bidi.RIGHT)};goog.i18n.bidi.doubleQuoteSubstituteRe_=/([\u0591-\u05f2])"/g;goog.i18n.bidi.singleQuoteSubstituteRe_=/([\u0591-\u05f2])'/g;
goog.i18n.bidi.normalizeHebrewQuote=function(a){return a.replace(goog.i18n.bidi.doubleQuoteSubstituteRe_,"$1\u05f4").replace(goog.i18n.bidi.singleQuoteSubstituteRe_,"$1\u05f3")};goog.i18n.bidi.wordSeparatorRe_=/\s+/;goog.i18n.bidi.hasNumeralsRe_=/[\d\u06f0-\u06f9]/;goog.i18n.bidi.rtlDetectionThreshold_=.4;
goog.i18n.bidi.estimateDirection=function(a,b){var c=0,d=0,e=!1;a=goog.i18n.bidi.stripHtmlIfNeeded_(a,b).split(goog.i18n.bidi.wordSeparatorRe_);for(b=0;b<a.length;b++){var f=a[b];goog.i18n.bidi.startsWithRtl(f)?(c++,d++):goog.i18n.bidi.isRequiredLtrRe_.test(f)?e=!0:goog.i18n.bidi.hasAnyLtr(f)?d++:goog.i18n.bidi.hasNumeralsRe_.test(f)&&(e=!0)}return 0==d?e?goog.i18n.bidi.Dir.LTR:goog.i18n.bidi.Dir.NEUTRAL:c/d>goog.i18n.bidi.rtlDetectionThreshold_?goog.i18n.bidi.Dir.RTL:goog.i18n.bidi.Dir.LTR};
goog.i18n.bidi.detectRtlDirectionality=function(a,b){return goog.i18n.bidi.estimateDirection(a,b)==goog.i18n.bidi.Dir.RTL};goog.i18n.bidi.setElementDirAndAlign=function(a,b){a&&(b=goog.i18n.bidi.toDir(b))&&(a.style.textAlign=b==goog.i18n.bidi.Dir.RTL?goog.i18n.bidi.RIGHT:goog.i18n.bidi.LEFT,a.dir=b==goog.i18n.bidi.Dir.RTL?"rtl":"ltr")};
goog.i18n.bidi.setElementDirByTextDirectionality=function(a,b){switch(goog.i18n.bidi.estimateDirection(b)){case goog.i18n.bidi.Dir.LTR:a.dir="ltr";break;case goog.i18n.bidi.Dir.RTL:a.dir="rtl";break;default:a.removeAttribute("dir")}};goog.i18n.bidi.DirectionalString=function(){};goog.html.TrustedResourceUrl=function(){this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_="";this.trustedURL_=null;this.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_=goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_};goog.html.TrustedResourceUrl.prototype.implementsGoogStringTypedString=!0;goog.html.TrustedResourceUrl.prototype.getTypedStringValue=function(){return this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_.toString()};
goog.html.TrustedResourceUrl.prototype.implementsGoogI18nBidiDirectionalString=!0;goog.html.TrustedResourceUrl.prototype.getDirection=function(){return goog.i18n.bidi.Dir.LTR};
goog.html.TrustedResourceUrl.prototype.cloneWithParams=function(a,b){var c=goog.html.TrustedResourceUrl.unwrap(this);c=goog.html.TrustedResourceUrl.URL_PARAM_PARSER_.exec(c);var d=c[3]||"";return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(c[1]+goog.html.TrustedResourceUrl.stringifyParams_("?",c[2]||"",a)+goog.html.TrustedResourceUrl.stringifyParams_("#",d,b))};
goog.DEBUG&&(goog.html.TrustedResourceUrl.prototype.toString=function(){return"TrustedResourceUrl{"+this.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_+"}"});goog.html.TrustedResourceUrl.unwrap=function(a){return goog.html.TrustedResourceUrl.unwrapTrustedScriptURL(a).toString()};
goog.html.TrustedResourceUrl.unwrapTrustedScriptURL=function(a){if(a instanceof goog.html.TrustedResourceUrl&&a.constructor===goog.html.TrustedResourceUrl&&a.TRUSTED_RESOURCE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_===goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_)return a.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_;goog.asserts.fail("expected object of type TrustedResourceUrl, got '"+a+"' of type "+goog.typeOf(a));return"type_error:TrustedResourceUrl"};
goog.html.TrustedResourceUrl.unwrapTrustedURL=function(a){return a.trustedURL_?a.trustedURL_:goog.html.TrustedResourceUrl.unwrap(a)};
goog.html.TrustedResourceUrl.format=function(a,b){var c=goog.string.Const.unwrap(a);if(!goog.html.TrustedResourceUrl.BASE_URL_.test(c))throw Error("Invalid TrustedResourceUrl format: "+c);a=c.replace(goog.html.TrustedResourceUrl.FORMAT_MARKER_,function(a,e){if(!Object.prototype.hasOwnProperty.call(b,e))throw Error('Found marker, "'+e+'", in format string, "'+c+'", but no valid label mapping found in args: '+JSON.stringify(b));a=b[e];return a instanceof goog.string.Const?goog.string.Const.unwrap(a):
encodeURIComponent(String(a))});return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(a)};goog.html.TrustedResourceUrl.FORMAT_MARKER_=/%{(\w+)}/g;goog.html.TrustedResourceUrl.BASE_URL_=/^((https:)?\/\/[0-9a-z.:[\]-]+\/|\/[^/\\]|[^:/\\%]+\/|[^:/\\%]*[?#]|about:blank#)/i;goog.html.TrustedResourceUrl.URL_PARAM_PARSER_=/^([^?#]*)(\?[^#]*)?(#[\s\S]*)?/;
goog.html.TrustedResourceUrl.formatWithParams=function(a,b,c,d){return goog.html.TrustedResourceUrl.format(a,b).cloneWithParams(c,d)};goog.html.TrustedResourceUrl.fromConstant=function(a){return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(goog.string.Const.unwrap(a))};goog.html.TrustedResourceUrl.fromConstants=function(a){for(var b="",c=0;c<a.length;c++)b+=goog.string.Const.unwrap(a[c]);return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(b)};
goog.html.TrustedResourceUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_={};
goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse=function(a){var b=new goog.html.TrustedResourceUrl;b.privateDoNotAccessOrElseTrustedResourceUrlWrappedValue_=goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY?goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY.createScriptURL(a):a;goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY&&(b.trustedURL_=goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY.createURL(a));return b};
goog.html.TrustedResourceUrl.stringifyParams_=function(a,b,c){if(null==c)return b;if(goog.isString(c))return c?a+encodeURIComponent(c):"";for(var d in c){var e=c[d];e=goog.isArray(e)?e:[e];for(var f=0;f<e.length;f++){var g=e[f];null!=g&&(b||(b=a),b+=(b.length>a.length?"&":"")+encodeURIComponent(d)+"="+encodeURIComponent(String(g)))}}return b};goog.html.SafeUrl=function(){this.privateDoNotAccessOrElseSafeUrlWrappedValue_="";this.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_=goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_};goog.html.SafeUrl.INNOCUOUS_STRING="about:invalid#zClosurez";goog.html.SafeUrl.prototype.implementsGoogStringTypedString=!0;goog.html.SafeUrl.prototype.getTypedStringValue=function(){return this.privateDoNotAccessOrElseSafeUrlWrappedValue_.toString()};
goog.html.SafeUrl.prototype.implementsGoogI18nBidiDirectionalString=!0;goog.html.SafeUrl.prototype.getDirection=function(){return goog.i18n.bidi.Dir.LTR};goog.DEBUG&&(goog.html.SafeUrl.prototype.toString=function(){return"SafeUrl{"+this.privateDoNotAccessOrElseSafeUrlWrappedValue_+"}"});goog.html.SafeUrl.unwrap=function(a){return goog.html.SafeUrl.unwrapTrustedURL(a).toString()};
goog.html.SafeUrl.unwrapTrustedURL=function(a){if(a instanceof goog.html.SafeUrl&&a.constructor===goog.html.SafeUrl&&a.SAFE_URL_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_===goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_)return a.privateDoNotAccessOrElseSafeUrlWrappedValue_;goog.asserts.fail("expected object of type SafeUrl, got '"+a+"' of type "+goog.typeOf(a));return"type_error:SafeUrl"};goog.html.SafeUrl.fromConstant=function(a){return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(goog.string.Const.unwrap(a))};
goog.html.SAFE_MIME_TYPE_PATTERN_=/^(?:audio\/(?:3gpp2|3gpp|aac|L16|midi|mp3|mp4|mpeg|oga|ogg|opus|x-m4a|x-wav|wav|webm)|image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp|x-icon)|text\/csv|video\/(?:mpeg|mp4|ogg|webm|quicktime))(?:;\w+=(?:\w+|"[\w;=]+"))*$/i;goog.html.SafeUrl.isSafeMimeType=function(a){return goog.html.SAFE_MIME_TYPE_PATTERN_.test(a)};goog.html.SafeUrl.fromBlob=function(a){a=goog.html.SAFE_MIME_TYPE_PATTERN_.test(a.type)?goog.fs.url.createObjectUrl(a):goog.html.SafeUrl.INNOCUOUS_STRING;return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)};
goog.html.DATA_URL_PATTERN_=/^data:([^,]*);base64,[a-z0-9+\/]+=*$/i;goog.html.SafeUrl.fromDataUrl=function(a){a=a.replace(/(%0A|%0D)/g,"");var b=a.match(goog.html.DATA_URL_PATTERN_);b=b&&goog.html.SAFE_MIME_TYPE_PATTERN_.test(b[1]);return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(b?a:goog.html.SafeUrl.INNOCUOUS_STRING)};goog.html.SafeUrl.fromTelUrl=function(a){goog.string.internal.caseInsensitiveStartsWith(a,"tel:")||(a=goog.html.SafeUrl.INNOCUOUS_STRING);return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)};
goog.html.SIP_URL_PATTERN_=/^sip[s]?:[+a-z0-9_.!$%&'*\/=^`{|}~-]+@([a-z0-9-]+\.)+[a-z0-9]{2,63}$/i;goog.html.SafeUrl.fromSipUrl=function(a){goog.html.SIP_URL_PATTERN_.test(decodeURIComponent(a))||(a=goog.html.SafeUrl.INNOCUOUS_STRING);return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)};goog.html.SafeUrl.fromFacebookMessengerUrl=function(a){goog.string.internal.caseInsensitiveStartsWith(a,"fb-messenger://share")||(a=goog.html.SafeUrl.INNOCUOUS_STRING);return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)};
goog.html.SafeUrl.fromWhatsAppUrl=function(a){goog.string.internal.caseInsensitiveStartsWith(a,"whatsapp://send")||(a=goog.html.SafeUrl.INNOCUOUS_STRING);return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)};goog.html.SafeUrl.fromSmsUrl=function(a){goog.string.internal.caseInsensitiveStartsWith(a,"sms:")&&goog.html.SafeUrl.isSmsUrlBodyValid_(a)||(a=goog.html.SafeUrl.INNOCUOUS_STRING);return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)};
goog.html.SafeUrl.isSmsUrlBodyValid_=function(a){var b=a.indexOf("#");0<b&&(a=a.substring(0,b));b=a.match(/[?&]body=/gi);if(!b)return!0;if(1<b.length)return!1;a=a.match(/[?&]body=([^&]*)/)[1];if(!a)return!0;try{decodeURIComponent(a)}catch(c){return!1}return/^(?:[a-z0-9\-_.~]|%[0-9a-f]{2})+$/i.test(a)};goog.html.SafeUrl.fromSshUrl=function(a){goog.string.internal.caseInsensitiveStartsWith(a,"ssh://")||(a=goog.html.SafeUrl.INNOCUOUS_STRING);return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)};
goog.html.SafeUrl.sanitizeChromeExtensionUrl=function(a,b){return goog.html.SafeUrl.sanitizeExtensionUrl_(/^chrome-extension:\/\/([^\/]+)\//,a,b)};goog.html.SafeUrl.sanitizeFirefoxExtensionUrl=function(a,b){return goog.html.SafeUrl.sanitizeExtensionUrl_(/^moz-extension:\/\/([^\/]+)\//,a,b)};goog.html.SafeUrl.sanitizeEdgeExtensionUrl=function(a,b){return goog.html.SafeUrl.sanitizeExtensionUrl_(/^ms-browser-extension:\/\/([^\/]+)\//,a,b)};
goog.html.SafeUrl.sanitizeExtensionUrl_=function(a,b,c){(a=a.exec(b))?(a=a[1],-1==(c instanceof goog.string.Const?[goog.string.Const.unwrap(c)]:c.map(function(a){return goog.string.Const.unwrap(a)})).indexOf(a)&&(b=goog.html.SafeUrl.INNOCUOUS_STRING)):b=goog.html.SafeUrl.INNOCUOUS_STRING;return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(b)};goog.html.SafeUrl.fromTrustedResourceUrl=function(a){return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(goog.html.TrustedResourceUrl.unwrap(a))};
goog.html.SAFE_URL_PATTERN_=/^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;goog.html.SafeUrl.SAFE_URL_PATTERN=goog.html.SAFE_URL_PATTERN_;goog.html.SafeUrl.sanitize=function(a){if(a instanceof goog.html.SafeUrl)return a;a="object"==typeof a&&a.implementsGoogStringTypedString?a.getTypedStringValue():String(a);goog.html.SAFE_URL_PATTERN_.test(a)||(a=goog.html.SafeUrl.INNOCUOUS_STRING);return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)};
goog.html.SafeUrl.sanitizeAssertUnchanged=function(a,b){if(a instanceof goog.html.SafeUrl)return a;a="object"==typeof a&&a.implementsGoogStringTypedString?a.getTypedStringValue():String(a);if(b&&/^data:/i.test(a)&&(b=goog.html.SafeUrl.fromDataUrl(a),b.getTypedStringValue()==a))return b;goog.asserts.assert(goog.html.SAFE_URL_PATTERN_.test(a),"%s does not match the safe URL pattern",a)||(a=goog.html.SafeUrl.INNOCUOUS_STRING);return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(a)};
goog.html.SafeUrl.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_={};goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse=function(a){var b=new goog.html.SafeUrl;b.privateDoNotAccessOrElseSafeUrlWrappedValue_=goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY?goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY.createURL(a):a;return b};goog.html.SafeUrl.ABOUT_BLANK=goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse("about:blank");goog.html.SafeStyle=function(){this.privateDoNotAccessOrElseSafeStyleWrappedValue_="";this.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_=goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_};goog.html.SafeStyle.prototype.implementsGoogStringTypedString=!0;goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_={};
goog.html.SafeStyle.fromConstant=function(a){a=goog.string.Const.unwrap(a);if(0===a.length)return goog.html.SafeStyle.EMPTY;goog.asserts.assert(goog.string.internal.endsWith(a,";"),"Last character of style string is not ';': "+a);goog.asserts.assert(goog.string.internal.contains(a,":"),"Style string must contain at least one ':', to specify a \"name: value\" pair: "+a);return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(a)};
goog.html.SafeStyle.prototype.getTypedStringValue=function(){return this.privateDoNotAccessOrElseSafeStyleWrappedValue_};goog.DEBUG&&(goog.html.SafeStyle.prototype.toString=function(){return"SafeStyle{"+this.privateDoNotAccessOrElseSafeStyleWrappedValue_+"}"});
goog.html.SafeStyle.unwrap=function(a){if(a instanceof goog.html.SafeStyle&&a.constructor===goog.html.SafeStyle&&a.SAFE_STYLE_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_===goog.html.SafeStyle.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_)return a.privateDoNotAccessOrElseSafeStyleWrappedValue_;goog.asserts.fail("expected object of type SafeStyle, got '"+a+"' of type "+goog.typeOf(a));return"type_error:SafeStyle"};goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse=function(a){return(new goog.html.SafeStyle).initSecurityPrivateDoNotAccessOrElse_(a)};
goog.html.SafeStyle.prototype.initSecurityPrivateDoNotAccessOrElse_=function(a){this.privateDoNotAccessOrElseSafeStyleWrappedValue_=a;return this};goog.html.SafeStyle.EMPTY=goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse("");goog.html.SafeStyle.INNOCUOUS_STRING="zClosurez";
goog.html.SafeStyle.create=function(a){var b="",c;for(c in a){if(!/^[-_a-zA-Z0-9]+$/.test(c))throw Error("Name allows only [-_a-zA-Z0-9], got: "+c);var d=a[c];null!=d&&(d=goog.isArray(d)?goog.array.map(d,goog.html.SafeStyle.sanitizePropertyValue_).join(" "):goog.html.SafeStyle.sanitizePropertyValue_(d),b+=c+":"+d+";")}return b?goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b):goog.html.SafeStyle.EMPTY};
goog.html.SafeStyle.sanitizePropertyValue_=function(a){if(a instanceof goog.html.SafeUrl)return'url("'+goog.html.SafeUrl.unwrap(a).replace(/</g,"%3c").replace(/[\\"]/g,"\\$&")+'")';a=a instanceof goog.string.Const?goog.string.Const.unwrap(a):goog.html.SafeStyle.sanitizePropertyValueString_(String(a));if(/[{;}]/.test(a))throw new goog.asserts.AssertionError("Value does not allow [{;}], got: %s.",[a]);return a};
goog.html.SafeStyle.sanitizePropertyValueString_=function(a){var b=a.replace(goog.html.SafeStyle.FUNCTIONS_RE_,"$1").replace(goog.html.SafeStyle.FUNCTIONS_RE_,"$1").replace(goog.html.SafeStyle.URL_RE_,"url");if(goog.html.SafeStyle.VALUE_RE_.test(b)){if(goog.html.SafeStyle.COMMENT_RE_.test(a))return goog.asserts.fail("String value disallows comments, got: "+a),goog.html.SafeStyle.INNOCUOUS_STRING;if(!goog.html.SafeStyle.hasBalancedQuotes_(a))return goog.asserts.fail("String value requires balanced quotes, got: "+
a),goog.html.SafeStyle.INNOCUOUS_STRING;if(!goog.html.SafeStyle.hasBalancedSquareBrackets_(a))return goog.asserts.fail("String value requires balanced square brackets and one identifier per pair of brackets, got: "+a),goog.html.SafeStyle.INNOCUOUS_STRING}else return goog.asserts.fail("String value allows only "+goog.html.SafeStyle.VALUE_ALLOWED_CHARS_+" and simple functions, got: "+a),goog.html.SafeStyle.INNOCUOUS_STRING;return goog.html.SafeStyle.sanitizeUrl_(a)};
goog.html.SafeStyle.hasBalancedQuotes_=function(a){for(var b=!0,c=!0,d=0;d<a.length;d++){var e=a.charAt(d);"'"==e&&c?b=!b:'"'==e&&b&&(c=!c)}return b&&c};goog.html.SafeStyle.hasBalancedSquareBrackets_=function(a){for(var b=!0,c=/^[-_a-zA-Z0-9]$/,d=0;d<a.length;d++){var e=a.charAt(d);if("]"==e){if(b)return!1;b=!0}else if("["==e){if(!b)return!1;b=!1}else if(!b&&!c.test(e))return!1}return b};goog.html.SafeStyle.VALUE_ALLOWED_CHARS_="[-,.\"'%_!# a-zA-Z0-9\\[\\]]";
goog.html.SafeStyle.VALUE_RE_=new RegExp("^"+goog.html.SafeStyle.VALUE_ALLOWED_CHARS_+"+$");goog.html.SafeStyle.URL_RE_=/\b(url\([ \t\n]*)('[ -&(-\[\]-~]*'|"[ !#-\[\]-~]*"|[!#-&*-\[\]-~]*)([ \t\n]*\))/g;goog.html.SafeStyle.FUNCTIONS_RE_=/\b(hsl|hsla|rgb|rgba|matrix|calc|minmax|fit-content|repeat|(rotate|scale|translate)(X|Y|Z|3d)?)\([-+*/0-9a-z.%\[\], ]+\)/g;goog.html.SafeStyle.COMMENT_RE_=/\/\*/;
goog.html.SafeStyle.sanitizeUrl_=function(a){return a.replace(goog.html.SafeStyle.URL_RE_,function(a,c,d,e){var b="";d=d.replace(/^(['"])(.*)\1$/,function(a,c,d){b=c;return d});a=goog.html.SafeUrl.sanitize(d).getTypedStringValue();return c+b+a+b+e})};goog.html.SafeStyle.concat=function(a){var b="",c=function(a){goog.isArray(a)?goog.array.forEach(a,c):b+=goog.html.SafeStyle.unwrap(a)};goog.array.forEach(arguments,c);return b?goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b):goog.html.SafeStyle.EMPTY};goog.html.SafeScript=function(){this.privateDoNotAccessOrElseSafeScriptWrappedValue_="";this.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_=goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_};goog.html.SafeScript.prototype.implementsGoogStringTypedString=!0;goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_={};goog.html.SafeScript.fromConstant=function(a){a=goog.string.Const.unwrap(a);return 0===a.length?goog.html.SafeScript.EMPTY:goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(a)};
goog.html.SafeScript.fromConstantAndArgs=function(a,b){for(var c=[],d=1;d<arguments.length;d++)c.push(goog.html.SafeScript.stringify_(arguments[d]));return goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse("("+goog.string.Const.unwrap(a)+")("+c.join(", ")+");")};goog.html.SafeScript.fromJson=function(a){return goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(goog.html.SafeScript.stringify_(a))};goog.html.SafeScript.prototype.getTypedStringValue=function(){return this.privateDoNotAccessOrElseSafeScriptWrappedValue_.toString()};
goog.DEBUG&&(goog.html.SafeScript.prototype.toString=function(){return"SafeScript{"+this.privateDoNotAccessOrElseSafeScriptWrappedValue_+"}"});goog.html.SafeScript.unwrap=function(a){return goog.html.SafeScript.unwrapTrustedScript(a).toString()};
goog.html.SafeScript.unwrapTrustedScript=function(a){if(a instanceof goog.html.SafeScript&&a.constructor===goog.html.SafeScript&&a.SAFE_SCRIPT_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_===goog.html.SafeScript.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_)return a.privateDoNotAccessOrElseSafeScriptWrappedValue_;goog.asserts.fail("expected object of type SafeScript, got '"+a+"' of type "+goog.typeOf(a));return"type_error:SafeScript"};
goog.html.SafeScript.stringify_=function(a){return JSON.stringify(a).replace(/</g,"\\x3c")};goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse=function(a){return(new goog.html.SafeScript).initSecurityPrivateDoNotAccessOrElse_(a)};
goog.html.SafeScript.prototype.initSecurityPrivateDoNotAccessOrElse_=function(a){this.privateDoNotAccessOrElseSafeScriptWrappedValue_=goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY?goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY.createScript(a):a;return this};goog.html.SafeScript.EMPTY=goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse("");goog.object={};goog.object.is=function(a,b){return a===b?0!==a||1/a===1/b:a!==a&&b!==b};goog.object.forEach=function(a,b,c){for(var d in a)b.call(c,a[d],d,a)};goog.object.filter=function(a,b,c){var d={},e;for(e in a)b.call(c,a[e],e,a)&&(d[e]=a[e]);return d};goog.object.map=function(a,b,c){var d={},e;for(e in a)d[e]=b.call(c,a[e],e,a);return d};goog.object.some=function(a,b,c){for(var d in a)if(b.call(c,a[d],d,a))return!0;return!1};
goog.object.every=function(a,b,c){for(var d in a)if(!b.call(c,a[d],d,a))return!1;return!0};goog.object.getCount=function(a){var b=0,c;for(c in a)b++;return b};goog.object.getAnyKey=function(a){for(var b in a)return b};goog.object.getAnyValue=function(a){for(var b in a)return a[b]};goog.object.contains=function(a,b){return goog.object.containsValue(a,b)};goog.object.getValues=function(a){var b=[],c=0,d;for(d in a)b[c++]=a[d];return b};
goog.object.getKeys=function(a){var b=[],c=0,d;for(d in a)b[c++]=d;return b};goog.object.getValueByKeys=function(a,b){var c=goog.isArrayLike(b),d=c?b:arguments;for(c=c?0:1;c<d.length;c++){if(null==a)return;a=a[d[c]]}return a};goog.object.containsKey=function(a,b){return null!==a&&b in a};goog.object.containsValue=function(a,b){for(var c in a)if(a[c]==b)return!0;return!1};goog.object.findKey=function(a,b,c){for(var d in a)if(b.call(c,a[d],d,a))return d};
goog.object.findValue=function(a,b,c){return(b=goog.object.findKey(a,b,c))&&a[b]};goog.object.isEmpty=function(a){for(var b in a)return!1;return!0};goog.object.clear=function(a){for(var b in a)delete a[b]};goog.object.remove=function(a,b){var c;(c=b in a)&&delete a[b];return c};goog.object.add=function(a,b,c){if(null!==a&&b in a)throw Error('The object already contains the key "'+b+'"');goog.object.set(a,b,c)};goog.object.get=function(a,b,c){return null!==a&&b in a?a[b]:c};
goog.object.set=function(a,b,c){a[b]=c};goog.object.setIfUndefined=function(a,b,c){return b in a?a[b]:a[b]=c};goog.object.setWithReturnValueIfNotSet=function(a,b,c){if(b in a)return a[b];c=c();return a[b]=c};goog.object.equals=function(a,b){for(var c in a)if(!(c in b)||a[c]!==b[c])return!1;for(var d in b)if(!(d in a))return!1;return!0};goog.object.clone=function(a){var b={},c;for(c in a)b[c]=a[c];return b};
goog.object.unsafeClone=function(a){var b=goog.typeOf(a);if("object"==b||"array"==b){if(goog.isFunction(a.clone))return a.clone();b="array"==b?[]:{};for(var c in a)b[c]=goog.object.unsafeClone(a[c]);return b}return a};goog.object.transpose=function(a){var b={},c;for(c in a)b[a[c]]=c;return b};goog.object.PROTOTYPE_FIELDS_="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.object.extend=function(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var f=0;f<goog.object.PROTOTYPE_FIELDS_.length;f++)c=goog.object.PROTOTYPE_FIELDS_[f],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};
goog.object.create=function(a){var b=arguments.length;if(1==b&&goog.isArray(arguments[0]))return goog.object.create.apply(null,arguments[0]);if(b%2)throw Error("Uneven number of arguments");for(var c={},d=0;d<b;d+=2)c[arguments[d]]=arguments[d+1];return c};goog.object.createSet=function(a){var b=arguments.length;if(1==b&&goog.isArray(arguments[0]))return goog.object.createSet.apply(null,arguments[0]);for(var c={},d=0;d<b;d++)c[arguments[d]]=!0;return c};
goog.object.createImmutableView=function(a){var b=a;Object.isFrozen&&!Object.isFrozen(a)&&(b=Object.create(a),Object.freeze(b));return b};goog.object.isImmutableView=function(a){return!!Object.isFrozen&&Object.isFrozen(a)};
goog.object.getAllPropertyNames=function(a,b,c){if(!a)return[];if(!Object.getOwnPropertyNames||!Object.getPrototypeOf)return goog.object.getKeys(a);for(var d={};a&&(a!==Object.prototype||b)&&(a!==Function.prototype||c);){for(var e=Object.getOwnPropertyNames(a),f=0;f<e.length;f++)d[e[f]]=!0;a=Object.getPrototypeOf(a)}return goog.object.getKeys(d)};goog.object.getSuperClass=function(a){return(a=Object.getPrototypeOf(a.prototype))&&a.constructor};goog.html.SafeStyleSheet=function(){this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_="";this.SAFE_STYLE_SHEET_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_=goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_};goog.html.SafeStyleSheet.prototype.implementsGoogStringTypedString=!0;goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_={};
goog.html.SafeStyleSheet.createRule=function(a,b){if(goog.string.internal.contains(a,"<"))throw Error("Selector does not allow '<', got: "+a);var c=a.replace(/('|")((?!\1)[^\r\n\f\\]|\\[\s\S])*\1/g,"");if(!/^[-_a-zA-Z0-9#.:* ,>+~[\]()=^$|]+$/.test(c))throw Error("Selector allows only [-_a-zA-Z0-9#.:* ,>+~[\\]()=^$|] and strings, got: "+a);if(!goog.html.SafeStyleSheet.hasBalancedBrackets_(c))throw Error("() and [] in selector must be balanced, got: "+a);b instanceof goog.html.SafeStyle||(b=goog.html.SafeStyle.create(b));
a=a+"{"+goog.html.SafeStyle.unwrap(b).replace(/</g,"\\3C ")+"}";return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(a)};goog.html.SafeStyleSheet.hasBalancedBrackets_=function(a){for(var b={"(":")","[":"]"},c=[],d=0;d<a.length;d++){var e=a[d];if(b[e])c.push(b[e]);else if(goog.object.contains(b,e)&&c.pop()!=e)return!1}return 0==c.length};
goog.html.SafeStyleSheet.concat=function(a){var b="",c=function(a){goog.isArray(a)?goog.array.forEach(a,c):b+=goog.html.SafeStyleSheet.unwrap(a)};goog.array.forEach(arguments,c);return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(b)};
goog.html.SafeStyleSheet.fromConstant=function(a){a=goog.string.Const.unwrap(a);if(0===a.length)return goog.html.SafeStyleSheet.EMPTY;goog.asserts.assert(!goog.string.internal.contains(a,"<"),"Forbidden '<' character in style sheet string: "+a);return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(a)};goog.html.SafeStyleSheet.prototype.getTypedStringValue=function(){return this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_};
goog.DEBUG&&(goog.html.SafeStyleSheet.prototype.toString=function(){return"SafeStyleSheet{"+this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_+"}"});
goog.html.SafeStyleSheet.unwrap=function(a){if(a instanceof goog.html.SafeStyleSheet&&a.constructor===goog.html.SafeStyleSheet&&a.SAFE_STYLE_SHEET_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_===goog.html.SafeStyleSheet.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_)return a.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_;goog.asserts.fail("expected object of type SafeStyleSheet, got '"+a+"' of type "+goog.typeOf(a));return"type_error:SafeStyleSheet"};
goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse=function(a){return(new goog.html.SafeStyleSheet).initSecurityPrivateDoNotAccessOrElse_(a)};goog.html.SafeStyleSheet.prototype.initSecurityPrivateDoNotAccessOrElse_=function(a){this.privateDoNotAccessOrElseSafeStyleSheetWrappedValue_=a;return this};goog.html.SafeStyleSheet.EMPTY=goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse("");goog.dom.tags={};goog.dom.tags.VOID_TAGS_={area:!0,base:!0,br:!0,col:!0,command:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0};goog.dom.tags.isVoidTag=function(a){return!0===goog.dom.tags.VOID_TAGS_[a]};goog.dom.HtmlElement=function(){};goog.dom.TagName=function(a){this.tagName_=a};goog.dom.TagName.prototype.toString=function(){return this.tagName_};goog.dom.TagName.A=new goog.dom.TagName("A");goog.dom.TagName.ABBR=new goog.dom.TagName("ABBR");goog.dom.TagName.ACRONYM=new goog.dom.TagName("ACRONYM");goog.dom.TagName.ADDRESS=new goog.dom.TagName("ADDRESS");goog.dom.TagName.APPLET=new goog.dom.TagName("APPLET");goog.dom.TagName.AREA=new goog.dom.TagName("AREA");goog.dom.TagName.ARTICLE=new goog.dom.TagName("ARTICLE");
goog.dom.TagName.ASIDE=new goog.dom.TagName("ASIDE");goog.dom.TagName.AUDIO=new goog.dom.TagName("AUDIO");goog.dom.TagName.B=new goog.dom.TagName("B");goog.dom.TagName.BASE=new goog.dom.TagName("BASE");goog.dom.TagName.BASEFONT=new goog.dom.TagName("BASEFONT");goog.dom.TagName.BDI=new goog.dom.TagName("BDI");goog.dom.TagName.BDO=new goog.dom.TagName("BDO");goog.dom.TagName.BIG=new goog.dom.TagName("BIG");goog.dom.TagName.BLOCKQUOTE=new goog.dom.TagName("BLOCKQUOTE");goog.dom.TagName.BODY=new goog.dom.TagName("BODY");
goog.dom.TagName.BR=new goog.dom.TagName("BR");goog.dom.TagName.BUTTON=new goog.dom.TagName("BUTTON");goog.dom.TagName.CANVAS=new goog.dom.TagName("CANVAS");goog.dom.TagName.CAPTION=new goog.dom.TagName("CAPTION");goog.dom.TagName.CENTER=new goog.dom.TagName("CENTER");goog.dom.TagName.CITE=new goog.dom.TagName("CITE");goog.dom.TagName.CODE=new goog.dom.TagName("CODE");goog.dom.TagName.COL=new goog.dom.TagName("COL");goog.dom.TagName.COLGROUP=new goog.dom.TagName("COLGROUP");
goog.dom.TagName.COMMAND=new goog.dom.TagName("COMMAND");goog.dom.TagName.DATA=new goog.dom.TagName("DATA");goog.dom.TagName.DATALIST=new goog.dom.TagName("DATALIST");goog.dom.TagName.DD=new goog.dom.TagName("DD");goog.dom.TagName.DEL=new goog.dom.TagName("DEL");goog.dom.TagName.DETAILS=new goog.dom.TagName("DETAILS");goog.dom.TagName.DFN=new goog.dom.TagName("DFN");goog.dom.TagName.DIALOG=new goog.dom.TagName("DIALOG");goog.dom.TagName.DIR=new goog.dom.TagName("DIR");goog.dom.TagName.DIV=new goog.dom.TagName("DIV");
goog.dom.TagName.DL=new goog.dom.TagName("DL");goog.dom.TagName.DT=new goog.dom.TagName("DT");goog.dom.TagName.EM=new goog.dom.TagName("EM");goog.dom.TagName.EMBED=new goog.dom.TagName("EMBED");goog.dom.TagName.FIELDSET=new goog.dom.TagName("FIELDSET");goog.dom.TagName.FIGCAPTION=new goog.dom.TagName("FIGCAPTION");goog.dom.TagName.FIGURE=new goog.dom.TagName("FIGURE");goog.dom.TagName.FONT=new goog.dom.TagName("FONT");goog.dom.TagName.FOOTER=new goog.dom.TagName("FOOTER");goog.dom.TagName.FORM=new goog.dom.TagName("FORM");
goog.dom.TagName.FRAME=new goog.dom.TagName("FRAME");goog.dom.TagName.FRAMESET=new goog.dom.TagName("FRAMESET");goog.dom.TagName.H1=new goog.dom.TagName("H1");goog.dom.TagName.H2=new goog.dom.TagName("H2");goog.dom.TagName.H3=new goog.dom.TagName("H3");goog.dom.TagName.H4=new goog.dom.TagName("H4");goog.dom.TagName.H5=new goog.dom.TagName("H5");goog.dom.TagName.H6=new goog.dom.TagName("H6");goog.dom.TagName.HEAD=new goog.dom.TagName("HEAD");goog.dom.TagName.HEADER=new goog.dom.TagName("HEADER");
goog.dom.TagName.HGROUP=new goog.dom.TagName("HGROUP");goog.dom.TagName.HR=new goog.dom.TagName("HR");goog.dom.TagName.HTML=new goog.dom.TagName("HTML");goog.dom.TagName.I=new goog.dom.TagName("I");goog.dom.TagName.IFRAME=new goog.dom.TagName("IFRAME");goog.dom.TagName.IMG=new goog.dom.TagName("IMG");goog.dom.TagName.INPUT=new goog.dom.TagName("INPUT");goog.dom.TagName.INS=new goog.dom.TagName("INS");goog.dom.TagName.ISINDEX=new goog.dom.TagName("ISINDEX");goog.dom.TagName.KBD=new goog.dom.TagName("KBD");
goog.dom.TagName.KEYGEN=new goog.dom.TagName("KEYGEN");goog.dom.TagName.LABEL=new goog.dom.TagName("LABEL");goog.dom.TagName.LEGEND=new goog.dom.TagName("LEGEND");goog.dom.TagName.LI=new goog.dom.TagName("LI");goog.dom.TagName.LINK=new goog.dom.TagName("LINK");goog.dom.TagName.MAIN=new goog.dom.TagName("MAIN");goog.dom.TagName.MAP=new goog.dom.TagName("MAP");goog.dom.TagName.MARK=new goog.dom.TagName("MARK");goog.dom.TagName.MATH=new goog.dom.TagName("MATH");goog.dom.TagName.MENU=new goog.dom.TagName("MENU");
goog.dom.TagName.MENUITEM=new goog.dom.TagName("MENUITEM");goog.dom.TagName.META=new goog.dom.TagName("META");goog.dom.TagName.METER=new goog.dom.TagName("METER");goog.dom.TagName.NAV=new goog.dom.TagName("NAV");goog.dom.TagName.NOFRAMES=new goog.dom.TagName("NOFRAMES");goog.dom.TagName.NOSCRIPT=new goog.dom.TagName("NOSCRIPT");goog.dom.TagName.OBJECT=new goog.dom.TagName("OBJECT");goog.dom.TagName.OL=new goog.dom.TagName("OL");goog.dom.TagName.OPTGROUP=new goog.dom.TagName("OPTGROUP");
goog.dom.TagName.OPTION=new goog.dom.TagName("OPTION");goog.dom.TagName.OUTPUT=new goog.dom.TagName("OUTPUT");goog.dom.TagName.P=new goog.dom.TagName("P");goog.dom.TagName.PARAM=new goog.dom.TagName("PARAM");goog.dom.TagName.PICTURE=new goog.dom.TagName("PICTURE");goog.dom.TagName.PRE=new goog.dom.TagName("PRE");goog.dom.TagName.PROGRESS=new goog.dom.TagName("PROGRESS");goog.dom.TagName.Q=new goog.dom.TagName("Q");goog.dom.TagName.RP=new goog.dom.TagName("RP");goog.dom.TagName.RT=new goog.dom.TagName("RT");
goog.dom.TagName.RTC=new goog.dom.TagName("RTC");goog.dom.TagName.RUBY=new goog.dom.TagName("RUBY");goog.dom.TagName.S=new goog.dom.TagName("S");goog.dom.TagName.SAMP=new goog.dom.TagName("SAMP");goog.dom.TagName.SCRIPT=new goog.dom.TagName("SCRIPT");goog.dom.TagName.SECTION=new goog.dom.TagName("SECTION");goog.dom.TagName.SELECT=new goog.dom.TagName("SELECT");goog.dom.TagName.SMALL=new goog.dom.TagName("SMALL");goog.dom.TagName.SOURCE=new goog.dom.TagName("SOURCE");goog.dom.TagName.SPAN=new goog.dom.TagName("SPAN");
goog.dom.TagName.STRIKE=new goog.dom.TagName("STRIKE");goog.dom.TagName.STRONG=new goog.dom.TagName("STRONG");goog.dom.TagName.STYLE=new goog.dom.TagName("STYLE");goog.dom.TagName.SUB=new goog.dom.TagName("SUB");goog.dom.TagName.SUMMARY=new goog.dom.TagName("SUMMARY");goog.dom.TagName.SUP=new goog.dom.TagName("SUP");goog.dom.TagName.SVG=new goog.dom.TagName("SVG");goog.dom.TagName.TABLE=new goog.dom.TagName("TABLE");goog.dom.TagName.TBODY=new goog.dom.TagName("TBODY");goog.dom.TagName.TD=new goog.dom.TagName("TD");
goog.dom.TagName.TEMPLATE=new goog.dom.TagName("TEMPLATE");goog.dom.TagName.TEXTAREA=new goog.dom.TagName("TEXTAREA");goog.dom.TagName.TFOOT=new goog.dom.TagName("TFOOT");goog.dom.TagName.TH=new goog.dom.TagName("TH");goog.dom.TagName.THEAD=new goog.dom.TagName("THEAD");goog.dom.TagName.TIME=new goog.dom.TagName("TIME");goog.dom.TagName.TITLE=new goog.dom.TagName("TITLE");goog.dom.TagName.TR=new goog.dom.TagName("TR");goog.dom.TagName.TRACK=new goog.dom.TagName("TRACK");goog.dom.TagName.TT=new goog.dom.TagName("TT");
goog.dom.TagName.U=new goog.dom.TagName("U");goog.dom.TagName.UL=new goog.dom.TagName("UL");goog.dom.TagName.VAR=new goog.dom.TagName("VAR");goog.dom.TagName.VIDEO=new goog.dom.TagName("VIDEO");goog.dom.TagName.WBR=new goog.dom.TagName("WBR");goog.labs={};goog.labs.userAgent={};goog.labs.userAgent.util={};goog.labs.userAgent.util.getNativeUserAgentString_=function(){var a=goog.labs.userAgent.util.getNavigator_();return a&&(a=a.userAgent)?a:""};goog.labs.userAgent.util.getNavigator_=function(){return goog.global.navigator};goog.labs.userAgent.util.userAgent_=goog.labs.userAgent.util.getNativeUserAgentString_();goog.labs.userAgent.util.setUserAgent=function(a){goog.labs.userAgent.util.userAgent_=a||goog.labs.userAgent.util.getNativeUserAgentString_()};
goog.labs.userAgent.util.getUserAgent=function(){return goog.labs.userAgent.util.userAgent_};goog.labs.userAgent.util.matchUserAgent=function(a){var b=goog.labs.userAgent.util.getUserAgent();return goog.string.internal.contains(b,a)};goog.labs.userAgent.util.matchUserAgentIgnoreCase=function(a){var b=goog.labs.userAgent.util.getUserAgent();return goog.string.internal.caseInsensitiveContains(b,a)};
goog.labs.userAgent.util.extractVersionTuples=function(a){for(var b=/(\w[\w ]+)\/([^\s]+)\s*(?:\((.*?)\))?/g,c=[],d;d=b.exec(a);)c.push([d[1],d[2],d[3]||void 0]);return c};goog.labs.userAgent.browser={};goog.labs.userAgent.browser.matchOpera_=function(){return goog.labs.userAgent.util.matchUserAgent("Opera")};goog.labs.userAgent.browser.matchIE_=function(){return goog.labs.userAgent.util.matchUserAgent("Trident")||goog.labs.userAgent.util.matchUserAgent("MSIE")};goog.labs.userAgent.browser.matchEdgeHtml_=function(){return goog.labs.userAgent.util.matchUserAgent("Edge")};goog.labs.userAgent.browser.matchEdgeChromium_=function(){return goog.labs.userAgent.util.matchUserAgent("Edg/")};
goog.labs.userAgent.browser.matchOperaChromium_=function(){return goog.labs.userAgent.util.matchUserAgent("OPR")};goog.labs.userAgent.browser.matchFirefox_=function(){return goog.labs.userAgent.util.matchUserAgent("Firefox")||goog.labs.userAgent.util.matchUserAgent("FxiOS")};
goog.labs.userAgent.browser.matchSafari_=function(){return goog.labs.userAgent.util.matchUserAgent("Safari")&&!(goog.labs.userAgent.browser.matchChrome_()||goog.labs.userAgent.browser.matchCoast_()||goog.labs.userAgent.browser.matchOpera_()||goog.labs.userAgent.browser.matchEdgeHtml_()||goog.labs.userAgent.browser.matchEdgeChromium_()||goog.labs.userAgent.browser.matchOperaChromium_()||goog.labs.userAgent.browser.matchFirefox_()||goog.labs.userAgent.browser.isSilk()||goog.labs.userAgent.util.matchUserAgent("Android"))};
goog.labs.userAgent.browser.matchCoast_=function(){return goog.labs.userAgent.util.matchUserAgent("Coast")};goog.labs.userAgent.browser.matchIosWebview_=function(){return(goog.labs.userAgent.util.matchUserAgent("iPad")||goog.labs.userAgent.util.matchUserAgent("iPhone"))&&!goog.labs.userAgent.browser.matchSafari_()&&!goog.labs.userAgent.browser.matchChrome_()&&!goog.labs.userAgent.browser.matchCoast_()&&!goog.labs.userAgent.browser.matchFirefox_()&&goog.labs.userAgent.util.matchUserAgent("AppleWebKit")};
goog.labs.userAgent.browser.matchChrome_=function(){return(goog.labs.userAgent.util.matchUserAgent("Chrome")||goog.labs.userAgent.util.matchUserAgent("CriOS"))&&!goog.labs.userAgent.browser.matchEdgeHtml_()};goog.labs.userAgent.browser.matchAndroidBrowser_=function(){return goog.labs.userAgent.util.matchUserAgent("Android")&&!(goog.labs.userAgent.browser.isChrome()||goog.labs.userAgent.browser.isFirefox()||goog.labs.userAgent.browser.isOpera()||goog.labs.userAgent.browser.isSilk())};
goog.labs.userAgent.browser.isOpera=goog.labs.userAgent.browser.matchOpera_;goog.labs.userAgent.browser.isIE=goog.labs.userAgent.browser.matchIE_;goog.labs.userAgent.browser.isEdge=goog.labs.userAgent.browser.matchEdgeHtml_;goog.labs.userAgent.browser.isEdgeChromium=goog.labs.userAgent.browser.matchEdgeChromium_;goog.labs.userAgent.browser.isOperaChromium=goog.labs.userAgent.browser.matchOperaChromium_;goog.labs.userAgent.browser.isFirefox=goog.labs.userAgent.browser.matchFirefox_;
goog.labs.userAgent.browser.isSafari=goog.labs.userAgent.browser.matchSafari_;goog.labs.userAgent.browser.isCoast=goog.labs.userAgent.browser.matchCoast_;goog.labs.userAgent.browser.isIosWebview=goog.labs.userAgent.browser.matchIosWebview_;goog.labs.userAgent.browser.isChrome=goog.labs.userAgent.browser.matchChrome_;goog.labs.userAgent.browser.isAndroidBrowser=goog.labs.userAgent.browser.matchAndroidBrowser_;goog.labs.userAgent.browser.isSilk=function(){return goog.labs.userAgent.util.matchUserAgent("Silk")};
goog.labs.userAgent.browser.getVersion=function(){function a(a){a=goog.array.find(a,d);return c[a]||""}var b=goog.labs.userAgent.util.getUserAgent();if(goog.labs.userAgent.browser.isIE())return goog.labs.userAgent.browser.getIEVersion_(b);b=goog.labs.userAgent.util.extractVersionTuples(b);var c={};goog.array.forEach(b,function(a){c[a[0]]=a[1]});var d=goog.partial(goog.object.containsKey,c);return goog.labs.userAgent.browser.isOpera()?a(["Version","Opera"]):goog.labs.userAgent.browser.isEdge()?a(["Edge"]):
goog.labs.userAgent.browser.isEdgeChromium()?a(["Edg"]):goog.labs.userAgent.browser.isChrome()?a(["Chrome","CriOS"]):(b=b[2])&&b[1]||""};goog.labs.userAgent.browser.isVersionOrHigher=function(a){return 0<=goog.string.internal.compareVersions(goog.labs.userAgent.browser.getVersion(),a)};
goog.labs.userAgent.browser.getIEVersion_=function(a){var b=/rv: *([\d\.]*)/.exec(a);if(b&&b[1])return b[1];b="";var c=/MSIE +([\d\.]+)/.exec(a);if(c&&c[1])if(a=/Trident\/(\d.\d)/.exec(a),"7.0"==c[1])if(a&&a[1])switch(a[1]){case "4.0":b="8.0";break;case "5.0":b="9.0";break;case "6.0":b="10.0";break;case "7.0":b="11.0"}else b="7.0";else b=c[1];return b};goog.html.SafeHtml=function(){this.privateDoNotAccessOrElseSafeHtmlWrappedValue_="";this.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_=goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_;this.dir_=null};goog.html.SafeHtml.prototype.implementsGoogI18nBidiDirectionalString=!0;goog.html.SafeHtml.prototype.getDirection=function(){return this.dir_};goog.html.SafeHtml.prototype.implementsGoogStringTypedString=!0;goog.html.SafeHtml.prototype.getTypedStringValue=function(){return this.privateDoNotAccessOrElseSafeHtmlWrappedValue_.toString()};
goog.DEBUG&&(goog.html.SafeHtml.prototype.toString=function(){return"SafeHtml{"+this.privateDoNotAccessOrElseSafeHtmlWrappedValue_+"}"});goog.html.SafeHtml.unwrap=function(a){return goog.html.SafeHtml.unwrapTrustedHTML(a).toString()};
goog.html.SafeHtml.unwrapTrustedHTML=function(a){if(a instanceof goog.html.SafeHtml&&a.constructor===goog.html.SafeHtml&&a.SAFE_HTML_TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_===goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_)return a.privateDoNotAccessOrElseSafeHtmlWrappedValue_;goog.asserts.fail("expected object of type SafeHtml, got '"+a+"' of type "+goog.typeOf(a));return"type_error:SafeHtml"};
goog.html.SafeHtml.htmlEscape=function(a){if(a instanceof goog.html.SafeHtml)return a;var b="object"==typeof a,c=null;b&&a.implementsGoogI18nBidiDirectionalString&&(c=a.getDirection());a=b&&a.implementsGoogStringTypedString?a.getTypedStringValue():String(a);return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.internal.htmlEscape(a),c)};
goog.html.SafeHtml.htmlEscapePreservingNewlines=function(a){if(a instanceof goog.html.SafeHtml)return a;a=goog.html.SafeHtml.htmlEscape(a);return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.internal.newLineToBr(goog.html.SafeHtml.unwrap(a)),a.getDirection())};
goog.html.SafeHtml.htmlEscapePreservingNewlinesAndSpaces=function(a){if(a instanceof goog.html.SafeHtml)return a;a=goog.html.SafeHtml.htmlEscape(a);return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(goog.string.internal.whitespaceEscape(goog.html.SafeHtml.unwrap(a)),a.getDirection())};goog.html.SafeHtml.from=goog.html.SafeHtml.htmlEscape;goog.html.SafeHtml.VALID_NAMES_IN_TAG_=/^[a-zA-Z0-9-]+$/;
goog.html.SafeHtml.URL_ATTRIBUTES_={action:!0,cite:!0,data:!0,formaction:!0,href:!0,manifest:!0,poster:!0,src:!0};goog.html.SafeHtml.NOT_ALLOWED_TAG_NAMES_={APPLET:!0,BASE:!0,EMBED:!0,IFRAME:!0,LINK:!0,MATH:!0,META:!0,OBJECT:!0,SCRIPT:!0,STYLE:!0,SVG:!0,TEMPLATE:!0};goog.html.SafeHtml.create=function(a,b,c){goog.html.SafeHtml.verifyTagName(String(a));return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse(String(a),b,c)};
goog.html.SafeHtml.verifyTagName=function(a){if(!goog.html.SafeHtml.VALID_NAMES_IN_TAG_.test(a))throw Error("Invalid tag name <"+a+">.");if(a.toUpperCase()in goog.html.SafeHtml.NOT_ALLOWED_TAG_NAMES_)throw Error("Tag name <"+a+"> is not allowed for SafeHtml.");};
goog.html.SafeHtml.createIframe=function(a,b,c,d){a&&goog.html.TrustedResourceUrl.unwrap(a);var e={};e.src=a||null;e.srcdoc=b&&goog.html.SafeHtml.unwrap(b);a=goog.html.SafeHtml.combineAttributes(e,{sandbox:""},c);return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("iframe",a,d)};
goog.html.SafeHtml.createSandboxIframe=function(a,b,c,d){if(!goog.html.SafeHtml.canUseSandboxIframe())throw Error("The browser does not support sandboxed iframes.");var e={};e.src=a?goog.html.SafeUrl.unwrap(goog.html.SafeUrl.sanitize(a)):null;e.srcdoc=b||null;e.sandbox="";a=goog.html.SafeHtml.combineAttributes(e,{},c);return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("iframe",a,d)};
goog.html.SafeHtml.canUseSandboxIframe=function(){return goog.global.HTMLIFrameElement&&"sandbox"in goog.global.HTMLIFrameElement.prototype};goog.html.SafeHtml.createScriptSrc=function(a,b){goog.html.TrustedResourceUrl.unwrap(a);a=goog.html.SafeHtml.combineAttributes({src:a},{},b);return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("script",a)};
goog.html.SafeHtml.createScript=function(a,b){for(var c in b){var d=c.toLowerCase();if("language"==d||"src"==d||"text"==d||"type"==d)throw Error('Cannot set "'+d+'" attribute');}c="";a=goog.array.concat(a);for(d=0;d<a.length;d++)c+=goog.html.SafeScript.unwrap(a[d]);a=goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(c,goog.i18n.bidi.Dir.NEUTRAL);return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("script",b,a)};
goog.html.SafeHtml.createStyle=function(a,b){b=goog.html.SafeHtml.combineAttributes({type:"text/css"},{},b);var c="";a=goog.array.concat(a);for(var d=0;d<a.length;d++)c+=goog.html.SafeStyleSheet.unwrap(a[d]);a=goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(c,goog.i18n.bidi.Dir.NEUTRAL);return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("style",b,a)};
goog.html.SafeHtml.createMetaRefresh=function(a,b){a=goog.html.SafeUrl.unwrap(goog.html.SafeUrl.sanitize(a));(goog.labs.userAgent.browser.isIE()||goog.labs.userAgent.browser.isEdge())&&goog.string.internal.contains(a,";")&&(a="'"+a.replace(/'/g,"%27")+"'");return goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse("meta",{"http-equiv":"refresh",content:(b||0)+"; url="+a})};
goog.html.SafeHtml.getAttrNameAndValue_=function(a,b,c){if(c instanceof goog.string.Const)c=goog.string.Const.unwrap(c);else if("style"==b.toLowerCase())c=goog.html.SafeHtml.getStyleValue_(c);else{if(/^on/i.test(b))throw Error('Attribute "'+b+'" requires goog.string.Const value, "'+c+'" given.');if(b.toLowerCase()in goog.html.SafeHtml.URL_ATTRIBUTES_)if(c instanceof goog.html.TrustedResourceUrl)c=goog.html.TrustedResourceUrl.unwrap(c);else if(c instanceof goog.html.SafeUrl)c=goog.html.SafeUrl.unwrap(c);
else if(goog.isString(c))c=goog.html.SafeUrl.sanitize(c).getTypedStringValue();else throw Error('Attribute "'+b+'" on tag "'+a+'" requires goog.html.SafeUrl, goog.string.Const, or string, value "'+c+'" given.');}c.implementsGoogStringTypedString&&(c=c.getTypedStringValue());goog.asserts.assert(goog.isString(c)||goog.isNumber(c),"String or number value expected, got "+typeof c+" with value: "+c);return b+'="'+goog.string.internal.htmlEscape(String(c))+'"'};
goog.html.SafeHtml.getStyleValue_=function(a){if(!goog.isObject(a))throw Error('The "style" attribute requires goog.html.SafeStyle or map of style properties, '+typeof a+" given: "+a);a instanceof goog.html.SafeStyle||(a=goog.html.SafeStyle.create(a));return goog.html.SafeStyle.unwrap(a)};goog.html.SafeHtml.createWithDir=function(a,b,c,d){b=goog.html.SafeHtml.create(b,c,d);b.dir_=a;return b};
goog.html.SafeHtml.join=function(a,b){a=goog.html.SafeHtml.htmlEscape(a);var c=a.getDirection(),d=[],e=function(a){goog.isArray(a)?goog.array.forEach(a,e):(a=goog.html.SafeHtml.htmlEscape(a),d.push(goog.html.SafeHtml.unwrap(a)),a=a.getDirection(),c==goog.i18n.bidi.Dir.NEUTRAL?c=a:a!=goog.i18n.bidi.Dir.NEUTRAL&&c!=a&&(c=null))};goog.array.forEach(b,e);return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(d.join(goog.html.SafeHtml.unwrap(a)),c)};
goog.html.SafeHtml.concat=function(a){return goog.html.SafeHtml.join(goog.html.SafeHtml.EMPTY,Array.prototype.slice.call(arguments))};goog.html.SafeHtml.concatWithDir=function(a,b){var c=goog.html.SafeHtml.concat(goog.array.slice(arguments,1));c.dir_=a;return c};goog.html.SafeHtml.TYPE_MARKER_GOOG_HTML_SECURITY_PRIVATE_={};goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse=function(a,b){return(new goog.html.SafeHtml).initSecurityPrivateDoNotAccessOrElse_(a,b)};
goog.html.SafeHtml.prototype.initSecurityPrivateDoNotAccessOrElse_=function(a,b){this.privateDoNotAccessOrElseSafeHtmlWrappedValue_=goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY?goog.html.trustedtypes.PRIVATE_DO_NOT_ACCESS_OR_ELSE_POLICY.createHTML(a):a;this.dir_=b;return this};
goog.html.SafeHtml.createSafeHtmlTagSecurityPrivateDoNotAccessOrElse=function(a,b,c){var d=null;var e="<"+a+goog.html.SafeHtml.stringifyAttributes(a,b);goog.isDefAndNotNull(c)?goog.isArray(c)||(c=[c]):c=[];goog.dom.tags.isVoidTag(a.toLowerCase())?(goog.asserts.assert(!c.length,"Void tag <"+a+"> does not allow content."),e+=">"):(d=goog.html.SafeHtml.concat(c),e+=">"+goog.html.SafeHtml.unwrap(d)+"</"+a+">",d=d.getDirection());(a=b&&b.dir)&&(d=/^(ltr|rtl|auto)$/i.test(a)?goog.i18n.bidi.Dir.NEUTRAL:
null);return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(e,d)};goog.html.SafeHtml.stringifyAttributes=function(a,b){var c="";if(b)for(var d in b){if(!goog.html.SafeHtml.VALID_NAMES_IN_TAG_.test(d))throw Error('Invalid attribute name "'+d+'".');var e=b[d];goog.isDefAndNotNull(e)&&(c+=" "+goog.html.SafeHtml.getAttrNameAndValue_(a,d,e))}return c};
goog.html.SafeHtml.combineAttributes=function(a,b,c){var d={},e;for(e in a)goog.asserts.assert(e.toLowerCase()==e,"Must be lower case"),d[e]=a[e];for(e in b)goog.asserts.assert(e.toLowerCase()==e,"Must be lower case"),d[e]=b[e];for(e in c){var f=e.toLowerCase();if(f in a)throw Error('Cannot override "'+f+'" attribute, got "'+e+'" with value "'+c[e]+'"');f in b&&delete d[f];d[e]=c[e]}return d};
goog.html.SafeHtml.DOCTYPE_HTML=goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("<!DOCTYPE html>",goog.i18n.bidi.Dir.NEUTRAL);goog.html.SafeHtml.EMPTY=goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("",goog.i18n.bidi.Dir.NEUTRAL);goog.html.SafeHtml.BR=goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse("<br>",goog.i18n.bidi.Dir.NEUTRAL);goog.html.uncheckedconversions={};goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract=function(a,b,c){goog.asserts.assertString(goog.string.Const.unwrap(a),"must provide justification");goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap(a)),"must provide non-empty justification");return goog.html.SafeHtml.createSafeHtmlSecurityPrivateDoNotAccessOrElse(b,c||null)};
goog.html.uncheckedconversions.safeScriptFromStringKnownToSatisfyTypeContract=function(a,b){goog.asserts.assertString(goog.string.Const.unwrap(a),"must provide justification");goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap(a)),"must provide non-empty justification");return goog.html.SafeScript.createSafeScriptSecurityPrivateDoNotAccessOrElse(b)};
goog.html.uncheckedconversions.safeStyleFromStringKnownToSatisfyTypeContract=function(a,b){goog.asserts.assertString(goog.string.Const.unwrap(a),"must provide justification");goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap(a)),"must provide non-empty justification");return goog.html.SafeStyle.createSafeStyleSecurityPrivateDoNotAccessOrElse(b)};
goog.html.uncheckedconversions.safeStyleSheetFromStringKnownToSatisfyTypeContract=function(a,b){goog.asserts.assertString(goog.string.Const.unwrap(a),"must provide justification");goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap(a)),"must provide non-empty justification");return goog.html.SafeStyleSheet.createSafeStyleSheetSecurityPrivateDoNotAccessOrElse(b)};
goog.html.uncheckedconversions.safeUrlFromStringKnownToSatisfyTypeContract=function(a,b){goog.asserts.assertString(goog.string.Const.unwrap(a),"must provide justification");goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap(a)),"must provide non-empty justification");return goog.html.SafeUrl.createSafeUrlSecurityPrivateDoNotAccessOrElse(b)};
goog.html.uncheckedconversions.trustedResourceUrlFromStringKnownToSatisfyTypeContract=function(a,b){goog.asserts.assertString(goog.string.Const.unwrap(a),"must provide justification");goog.asserts.assert(!goog.string.internal.isEmptyOrWhitespace(goog.string.Const.unwrap(a)),"must provide non-empty justification");return goog.html.TrustedResourceUrl.createTrustedResourceUrlSecurityPrivateDoNotAccessOrElse(b)};goog.dom.asserts={};goog.dom.asserts.assertIsLocation=function(a){if(goog.asserts.ENABLE_ASSERTS){var b=goog.dom.asserts.getWindow_(a);b&&(!a||!(a instanceof b.Location)&&a instanceof b.Element)&&goog.asserts.fail("Argument is not a Location (or a non-Element mock); got: %s",goog.dom.asserts.debugStringForType_(a))}return a};
goog.dom.asserts.assertIsElementType_=function(a,b){if(goog.asserts.ENABLE_ASSERTS){var c=goog.dom.asserts.getWindow_(a);c&&"undefined"!=typeof c[b]&&(a&&(a instanceof c[b]||!(a instanceof c.Location||a instanceof c.Element))||goog.asserts.fail("Argument is not a %s (or a non-Element, non-Location mock); got: %s",b,goog.dom.asserts.debugStringForType_(a)))}return a};goog.dom.asserts.assertIsHTMLAnchorElement=function(a){return goog.dom.asserts.assertIsElementType_(a,"HTMLAnchorElement")};
goog.dom.asserts.assertIsHTMLButtonElement=function(a){return goog.dom.asserts.assertIsElementType_(a,"HTMLButtonElement")};goog.dom.asserts.assertIsHTMLLinkElement=function(a){return goog.dom.asserts.assertIsElementType_(a,"HTMLLinkElement")};goog.dom.asserts.assertIsHTMLImageElement=function(a){return goog.dom.asserts.assertIsElementType_(a,"HTMLImageElement")};goog.dom.asserts.assertIsHTMLAudioElement=function(a){return goog.dom.asserts.assertIsElementType_(a,"HTMLAudioElement")};
goog.dom.asserts.assertIsHTMLVideoElement=function(a){return goog.dom.asserts.assertIsElementType_(a,"HTMLVideoElement")};goog.dom.asserts.assertIsHTMLInputElement=function(a){return goog.dom.asserts.assertIsElementType_(a,"HTMLInputElement")};goog.dom.asserts.assertIsHTMLTextAreaElement=function(a){return goog.dom.asserts.assertIsElementType_(a,"HTMLTextAreaElement")};goog.dom.asserts.assertIsHTMLCanvasElement=function(a){return goog.dom.asserts.assertIsElementType_(a,"HTMLCanvasElement")};
goog.dom.asserts.assertIsHTMLEmbedElement=function(a){return goog.dom.asserts.assertIsElementType_(a,"HTMLEmbedElement")};goog.dom.asserts.assertIsHTMLFormElement=function(a){return goog.dom.asserts.assertIsElementType_(a,"HTMLFormElement")};goog.dom.asserts.assertIsHTMLFrameElement=function(a){return goog.dom.asserts.assertIsElementType_(a,"HTMLFrameElement")};goog.dom.asserts.assertIsHTMLIFrameElement=function(a){return goog.dom.asserts.assertIsElementType_(a,"HTMLIFrameElement")};
goog.dom.asserts.assertIsHTMLObjectElement=function(a){return goog.dom.asserts.assertIsElementType_(a,"HTMLObjectElement")};goog.dom.asserts.assertIsHTMLScriptElement=function(a){return goog.dom.asserts.assertIsElementType_(a,"HTMLScriptElement")};
goog.dom.asserts.debugStringForType_=function(a){if(goog.isObject(a))try{return a.constructor.displayName||a.constructor.name||Object.prototype.toString.call(a)}catch(b){return"<object could not be stringified>"}else return void 0===a?"undefined":null===a?"null":typeof a};goog.dom.asserts.getWindow_=function(a){try{var b=a&&a.ownerDocument,c=b&&(b.defaultView||b.parentWindow);c=c||goog.global;if(c.Element&&c.Location)return c}catch(d){}return null};goog.functions={};goog.functions.constant=function(a){return function(){return a}};goog.functions.FALSE=function(){return!1};goog.functions.TRUE=function(){return!0};goog.functions.NULL=function(){return null};goog.functions.identity=function(a,b){return a};goog.functions.error=function(a){return function(){throw Error(a);}};goog.functions.fail=function(a){return function(){throw a;}};
goog.functions.lock=function(a,b){b=b||0;return function(){return a.apply(this,Array.prototype.slice.call(arguments,0,b))}};goog.functions.nth=function(a){return function(){return arguments[a]}};goog.functions.partialRight=function(a,b){var c=Array.prototype.slice.call(arguments,1);return function(){var b=Array.prototype.slice.call(arguments);b.push.apply(b,c);return a.apply(this,b)}};goog.functions.withReturnValue=function(a,b){return goog.functions.sequence(a,goog.functions.constant(b))};
goog.functions.equalTo=function(a,b){return function(c){return b?a==c:a===c}};goog.functions.compose=function(a,b){var c=arguments,d=c.length;return function(){var a;d&&(a=c[d-1].apply(this,arguments));for(var b=d-2;0<=b;b--)a=c[b].call(this,a);return a}};goog.functions.sequence=function(a){var b=arguments,c=b.length;return function(){for(var a,e=0;e<c;e++)a=b[e].apply(this,arguments);return a}};
goog.functions.and=function(a){var b=arguments,c=b.length;return function(){for(var a=0;a<c;a++)if(!b[a].apply(this,arguments))return!1;return!0}};goog.functions.or=function(a){var b=arguments,c=b.length;return function(){for(var a=0;a<c;a++)if(b[a].apply(this,arguments))return!0;return!1}};goog.functions.not=function(a){return function(){return!a.apply(this,arguments)}};
goog.functions.create=function(a,b){var c=function(){};c.prototype=a.prototype;c=new c;a.apply(c,Array.prototype.slice.call(arguments,1));return c};goog.functions.CACHE_RETURN_VALUE=!0;goog.functions.cacheReturnValue=function(a){var b=!1,c;return function(){if(!goog.functions.CACHE_RETURN_VALUE)return a();b||(c=a(),b=!0);return c}};goog.functions.once=function(a){var b=a;return function(){if(b){var a=b;b=null;a()}}};
goog.functions.debounce=function(a,b,c){var d=0;return function(e){goog.global.clearTimeout(d);var f=arguments;d=goog.global.setTimeout(function(){a.apply(c,f)},b)}};goog.functions.throttle=function(a,b,c){var d=0,e=!1,f=[],g=function(){d=0;e&&(e=!1,h())},h=function(){d=goog.global.setTimeout(g,b);a.apply(c,f)};return function(a){f=arguments;d?e=!0:h()}};goog.functions.rateLimit=function(a,b,c){var d=0,e=function(){d=0};return function(f){d||(d=goog.global.setTimeout(e,b),a.apply(c,arguments))}};goog.dom.safe={};goog.dom.safe.InsertAdjacentHtmlPosition={AFTERBEGIN:"afterbegin",AFTEREND:"afterend",BEFOREBEGIN:"beforebegin",BEFOREEND:"beforeend"};goog.dom.safe.insertAdjacentHtml=function(a,b,c){a.insertAdjacentHTML(b,goog.html.SafeHtml.unwrapTrustedHTML(c))};goog.dom.safe.SET_INNER_HTML_DISALLOWED_TAGS_={MATH:!0,SCRIPT:!0,STYLE:!0,SVG:!0,TEMPLATE:!0};
goog.dom.safe.isInnerHtmlCleanupRecursive_=goog.functions.cacheReturnValue(function(){if(goog.DEBUG&&"undefined"===typeof document)return!1;var a=document.createElement("div"),b=document.createElement("div");b.appendChild(document.createElement("div"));a.appendChild(b);if(goog.DEBUG&&!a.firstChild)return!1;b=a.firstChild.firstChild;a.innerHTML=goog.html.SafeHtml.unwrapTrustedHTML(goog.html.SafeHtml.EMPTY);return!b.parentElement});
goog.dom.safe.unsafeSetInnerHtmlDoNotUseOrElse=function(a,b){if(goog.dom.safe.isInnerHtmlCleanupRecursive_())for(;a.lastChild;)a.removeChild(a.lastChild);a.innerHTML=goog.html.SafeHtml.unwrapTrustedHTML(b)};
goog.dom.safe.setInnerHtml=function(a,b){if(goog.asserts.ENABLE_ASSERTS){var c=a.tagName.toUpperCase();if(goog.dom.safe.SET_INNER_HTML_DISALLOWED_TAGS_[c])throw Error("goog.dom.safe.setInnerHtml cannot be used to set content of "+a.tagName+".");}goog.dom.safe.unsafeSetInnerHtmlDoNotUseOrElse(a,b)};goog.dom.safe.setOuterHtml=function(a,b){a.outerHTML=goog.html.SafeHtml.unwrapTrustedHTML(b)};
goog.dom.safe.setFormElementAction=function(a,b){b=b instanceof goog.html.SafeUrl?b:goog.html.SafeUrl.sanitizeAssertUnchanged(b);goog.dom.asserts.assertIsHTMLFormElement(a).action=goog.html.SafeUrl.unwrapTrustedURL(b)};goog.dom.safe.setButtonFormAction=function(a,b){b=b instanceof goog.html.SafeUrl?b:goog.html.SafeUrl.sanitizeAssertUnchanged(b);goog.dom.asserts.assertIsHTMLButtonElement(a).formAction=goog.html.SafeUrl.unwrapTrustedURL(b)};
goog.dom.safe.setInputFormAction=function(a,b){b=b instanceof goog.html.SafeUrl?b:goog.html.SafeUrl.sanitizeAssertUnchanged(b);goog.dom.asserts.assertIsHTMLInputElement(a).formAction=goog.html.SafeUrl.unwrapTrustedURL(b)};goog.dom.safe.setStyle=function(a,b){a.style.cssText=goog.html.SafeStyle.unwrap(b)};goog.dom.safe.documentWrite=function(a,b){a.write(goog.html.SafeHtml.unwrapTrustedHTML(b))};
goog.dom.safe.setAnchorHref=function(a,b){goog.dom.asserts.assertIsHTMLAnchorElement(a);b=b instanceof goog.html.SafeUrl?b:goog.html.SafeUrl.sanitizeAssertUnchanged(b);a.href=goog.html.SafeUrl.unwrapTrustedURL(b)};goog.dom.safe.setImageSrc=function(a,b){goog.dom.asserts.assertIsHTMLImageElement(a);if(!(b instanceof goog.html.SafeUrl)){var c=/^data:image\//i.test(b);b=goog.html.SafeUrl.sanitizeAssertUnchanged(b,c)}a.src=goog.html.SafeUrl.unwrapTrustedURL(b)};
goog.dom.safe.setAudioSrc=function(a,b){goog.dom.asserts.assertIsHTMLAudioElement(a);if(!(b instanceof goog.html.SafeUrl)){var c=/^data:audio\//i.test(b);b=goog.html.SafeUrl.sanitizeAssertUnchanged(b,c)}a.src=goog.html.SafeUrl.unwrapTrustedURL(b)};goog.dom.safe.setVideoSrc=function(a,b){goog.dom.asserts.assertIsHTMLVideoElement(a);if(!(b instanceof goog.html.SafeUrl)){var c=/^data:video\//i.test(b);b=goog.html.SafeUrl.sanitizeAssertUnchanged(b,c)}a.src=goog.html.SafeUrl.unwrapTrustedURL(b)};
goog.dom.safe.setEmbedSrc=function(a,b){goog.dom.asserts.assertIsHTMLEmbedElement(a);a.src=goog.html.TrustedResourceUrl.unwrapTrustedScriptURL(b)};goog.dom.safe.setFrameSrc=function(a,b){goog.dom.asserts.assertIsHTMLFrameElement(a);a.src=goog.html.TrustedResourceUrl.unwrapTrustedURL(b)};goog.dom.safe.setIframeSrc=function(a,b){goog.dom.asserts.assertIsHTMLIFrameElement(a);a.src=goog.html.TrustedResourceUrl.unwrapTrustedURL(b)};
goog.dom.safe.setIframeSrcdoc=function(a,b){goog.dom.asserts.assertIsHTMLIFrameElement(a);a.srcdoc=goog.html.SafeHtml.unwrapTrustedHTML(b)};
goog.dom.safe.setLinkHrefAndRel=function(a,b,c){goog.dom.asserts.assertIsHTMLLinkElement(a);a.rel=c;goog.string.internal.caseInsensitiveContains(c,"stylesheet")?(goog.asserts.assert(b instanceof goog.html.TrustedResourceUrl,'URL must be TrustedResourceUrl because "rel" contains "stylesheet"'),a.href=goog.html.TrustedResourceUrl.unwrapTrustedURL(b)):a.href=b instanceof goog.html.TrustedResourceUrl?goog.html.TrustedResourceUrl.unwrapTrustedURL(b):b instanceof goog.html.SafeUrl?goog.html.SafeUrl.unwrapTrustedURL(b):
goog.html.SafeUrl.unwrapTrustedURL(goog.html.SafeUrl.sanitizeAssertUnchanged(b))};goog.dom.safe.setObjectData=function(a,b){goog.dom.asserts.assertIsHTMLObjectElement(a);a.data=goog.html.TrustedResourceUrl.unwrapTrustedScriptURL(b)};goog.dom.safe.setScriptSrc=function(a,b){goog.dom.asserts.assertIsHTMLScriptElement(a);a.src=goog.html.TrustedResourceUrl.unwrapTrustedScriptURL(b);(b=goog.getScriptNonce())&&a.setAttribute("nonce",b)};
goog.dom.safe.setScriptContent=function(a,b){goog.dom.asserts.assertIsHTMLScriptElement(a);a.text=goog.html.SafeScript.unwrapTrustedScript(b);(b=goog.getScriptNonce())&&a.setAttribute("nonce",b)};goog.dom.safe.setLocationHref=function(a,b){goog.dom.asserts.assertIsLocation(a);b=b instanceof goog.html.SafeUrl?b:goog.html.SafeUrl.sanitizeAssertUnchanged(b);a.href=goog.html.SafeUrl.unwrapTrustedURL(b)};
goog.dom.safe.assignLocation=function(a,b){goog.dom.asserts.assertIsLocation(a);b=b instanceof goog.html.SafeUrl?b:goog.html.SafeUrl.sanitizeAssertUnchanged(b);a.assign(goog.html.SafeUrl.unwrapTrustedURL(b))};goog.dom.safe.replaceLocation=function(a,b){goog.dom.asserts.assertIsLocation(a);b=b instanceof goog.html.SafeUrl?b:goog.html.SafeUrl.sanitizeAssertUnchanged(b);a.replace(goog.html.SafeUrl.unwrapTrustedURL(b))};
goog.dom.safe.openInWindow=function(a,b,c,d,e){a=a instanceof goog.html.SafeUrl?a:goog.html.SafeUrl.sanitizeAssertUnchanged(a);return(b||goog.global).open(goog.html.SafeUrl.unwrapTrustedURL(a),c?goog.string.Const.unwrap(c):"",d,e)};goog.dom.safe.parseFromStringHtml=function(a,b){return goog.dom.safe.parseFromString(a,b,"text/html")};goog.dom.safe.parseFromString=function(a,b,c){return a.parseFromString(goog.html.SafeHtml.unwrapTrustedHTML(b),c)};
goog.dom.safe.createImageFromBlob=function(a){if(!/^image\/.*/g.test(a.type))throw Error("goog.dom.safe.createImageFromBlob only accepts MIME type image/.*.");var b=goog.global.URL.createObjectURL(a);a=new goog.global.Image;a.onload=function(){goog.global.URL.revokeObjectURL(b)};goog.dom.safe.setImageSrc(a,goog.html.uncheckedconversions.safeUrlFromStringKnownToSatisfyTypeContract(goog.string.Const.from("Image blob URL."),b));return a};goog.string.DETECT_DOUBLE_ESCAPING=!1;goog.string.FORCE_NON_DOM_HTML_UNESCAPING=!1;goog.string.Unicode={NBSP:"\u00a0"};goog.string.startsWith=goog.string.internal.startsWith;goog.string.endsWith=goog.string.internal.endsWith;goog.string.caseInsensitiveStartsWith=goog.string.internal.caseInsensitiveStartsWith;goog.string.caseInsensitiveEndsWith=goog.string.internal.caseInsensitiveEndsWith;goog.string.caseInsensitiveEquals=goog.string.internal.caseInsensitiveEquals;
goog.string.subs=function(a,b){for(var c=a.split("%s"),d="",e=Array.prototype.slice.call(arguments,1);e.length&&1<c.length;)d+=c.shift()+e.shift();return d+c.join("%s")};goog.string.collapseWhitespace=function(a){return a.replace(/[\s\xa0]+/g," ").replace(/^\s+|\s+$/g,"")};goog.string.isEmptyOrWhitespace=goog.string.internal.isEmptyOrWhitespace;goog.string.isEmptyString=function(a){return 0==a.length};goog.string.isEmpty=goog.string.isEmptyOrWhitespace;goog.string.isEmptyOrWhitespaceSafe=function(a){return goog.string.isEmptyOrWhitespace(goog.string.makeSafe(a))};
goog.string.isEmptySafe=goog.string.isEmptyOrWhitespaceSafe;goog.string.isBreakingWhitespace=function(a){return!/[^\t\n\r ]/.test(a)};goog.string.isAlpha=function(a){return!/[^a-zA-Z]/.test(a)};goog.string.isNumeric=function(a){return!/[^0-9]/.test(a)};goog.string.isAlphaNumeric=function(a){return!/[^a-zA-Z0-9]/.test(a)};goog.string.isSpace=function(a){return" "==a};goog.string.isUnicodeChar=function(a){return 1==a.length&&" "<=a&&"~">=a||"\u0080"<=a&&"\ufffd">=a};
goog.string.stripNewlines=function(a){return a.replace(/(\r\n|\r|\n)+/g," ")};goog.string.canonicalizeNewlines=function(a){return a.replace(/(\r\n|\r|\n)/g,"\n")};goog.string.normalizeWhitespace=function(a){return a.replace(/\xa0|\s/g," ")};goog.string.normalizeSpaces=function(a){return a.replace(/\xa0|[ \t]+/g," ")};goog.string.collapseBreakingSpaces=function(a){return a.replace(/[\t\r\n ]+/g," ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g,"")};goog.string.trim=goog.string.internal.trim;
goog.string.trimLeft=function(a){return a.replace(/^[\s\xa0]+/,"")};goog.string.trimRight=function(a){return a.replace(/[\s\xa0]+$/,"")};goog.string.caseInsensitiveCompare=goog.string.internal.caseInsensitiveCompare;
goog.string.numberAwareCompare_=function(a,b,c){if(a==b)return 0;if(!a)return-1;if(!b)return 1;for(var d=a.toLowerCase().match(c),e=b.toLowerCase().match(c),f=Math.min(d.length,e.length),g=0;g<f;g++){c=d[g];var h=e[g];if(c!=h)return a=parseInt(c,10),!isNaN(a)&&(b=parseInt(h,10),!isNaN(b)&&a-b)?a-b:c<h?-1:1}return d.length!=e.length?d.length-e.length:a<b?-1:1};goog.string.intAwareCompare=function(a,b){return goog.string.numberAwareCompare_(a,b,/\d+|\D+/g)};
goog.string.floatAwareCompare=function(a,b){return goog.string.numberAwareCompare_(a,b,/\d+|\.\d+|\D+/g)};goog.string.numerateCompare=goog.string.floatAwareCompare;goog.string.urlEncode=function(a){return encodeURIComponent(String(a))};goog.string.urlDecode=function(a){return decodeURIComponent(a.replace(/\+/g," "))};goog.string.newLineToBr=goog.string.internal.newLineToBr;
goog.string.htmlEscape=function(a,b){a=goog.string.internal.htmlEscape(a,b);goog.string.DETECT_DOUBLE_ESCAPING&&(a=a.replace(goog.string.E_RE_,"&#101;"));return a};goog.string.E_RE_=/e/g;goog.string.unescapeEntities=function(a){return goog.string.contains(a,"&")?!goog.string.FORCE_NON_DOM_HTML_UNESCAPING&&"document"in goog.global?goog.string.unescapeEntitiesUsingDom_(a):goog.string.unescapePureXmlEntities_(a):a};
goog.string.unescapeEntitiesWithDocument=function(a,b){return goog.string.contains(a,"&")?goog.string.unescapeEntitiesUsingDom_(a,b):a};
goog.string.unescapeEntitiesUsingDom_=function(a,b){var c={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"'};var d=b?b.createElement("div"):goog.global.document.createElement("div");return a.replace(goog.string.HTML_ENTITY_PATTERN_,function(a,b){var e=c[a];if(e)return e;"#"==b.charAt(0)&&(b=Number("0"+b.substr(1)),isNaN(b)||(e=String.fromCharCode(b)));e||(goog.dom.safe.setInnerHtml(d,goog.html.uncheckedconversions.safeHtmlFromStringKnownToSatisfyTypeContract(goog.string.Const.from("Single HTML entity."),
a+" ")),e=d.firstChild.nodeValue.slice(0,-1));return c[a]=e})};goog.string.unescapePureXmlEntities_=function(a){return a.replace(/&([^;]+);/g,function(a,c){switch(c){case "amp":return"&";case "lt":return"<";case "gt":return">";case "quot":return'"';default:return"#"!=c.charAt(0)||(c=Number("0"+c.substr(1)),isNaN(c))?a:String.fromCharCode(c)}})};goog.string.HTML_ENTITY_PATTERN_=/&([^;\s<&]+);?/g;goog.string.whitespaceEscape=function(a,b){return goog.string.newLineToBr(a.replace(/  /g," &#160;"),b)};
goog.string.preserveSpaces=function(a){return a.replace(/(^|[\n ]) /g,"$1"+goog.string.Unicode.NBSP)};goog.string.stripQuotes=function(a,b){for(var c=b.length,d=0;d<c;d++){var e=1==c?b:b.charAt(d);if(a.charAt(0)==e&&a.charAt(a.length-1)==e)return a.substring(1,a.length-1)}return a};goog.string.truncate=function(a,b,c){c&&(a=goog.string.unescapeEntities(a));a.length>b&&(a=a.substring(0,b-3)+"...");c&&(a=goog.string.htmlEscape(a));return a};
goog.string.truncateMiddle=function(a,b,c,d){c&&(a=goog.string.unescapeEntities(a));if(d&&a.length>b){d>b&&(d=b);var e=a.length-d;a=a.substring(0,b-d)+"..."+a.substring(e)}else a.length>b&&(d=Math.floor(b/2),e=a.length-d,a=a.substring(0,d+b%2)+"..."+a.substring(e));c&&(a=goog.string.htmlEscape(a));return a};goog.string.specialEscapeChars_={"\x00":"\\0","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t","\x0B":"\\x0B",'"':'\\"',"\\":"\\\\","<":"\\u003C"};goog.string.jsEscapeCache_={"'":"\\'"};
goog.string.quote=function(a){a=String(a);for(var b=['"'],c=0;c<a.length;c++){var d=a.charAt(c),e=d.charCodeAt(0);b[c+1]=goog.string.specialEscapeChars_[d]||(31<e&&127>e?d:goog.string.escapeChar(d))}b.push('"');return b.join("")};goog.string.escapeString=function(a){for(var b=[],c=0;c<a.length;c++)b[c]=goog.string.escapeChar(a.charAt(c));return b.join("")};
goog.string.escapeChar=function(a){if(a in goog.string.jsEscapeCache_)return goog.string.jsEscapeCache_[a];if(a in goog.string.specialEscapeChars_)return goog.string.jsEscapeCache_[a]=goog.string.specialEscapeChars_[a];var b=a.charCodeAt(0);if(31<b&&127>b)var c=a;else{if(256>b){if(c="\\x",16>b||256<b)c+="0"}else c="\\u",4096>b&&(c+="0");c+=b.toString(16).toUpperCase()}return goog.string.jsEscapeCache_[a]=c};goog.string.contains=goog.string.internal.contains;goog.string.caseInsensitiveContains=goog.string.internal.caseInsensitiveContains;
goog.string.countOf=function(a,b){return a&&b?a.split(b).length-1:0};goog.string.removeAt=function(a,b,c){var d=a;0<=b&&b<a.length&&0<c&&(d=a.substr(0,b)+a.substr(b+c,a.length-b-c));return d};goog.string.remove=function(a,b){return a.replace(b,"")};goog.string.removeAll=function(a,b){b=new RegExp(goog.string.regExpEscape(b),"g");return a.replace(b,"")};goog.string.replaceAll=function(a,b,c){b=new RegExp(goog.string.regExpEscape(b),"g");return a.replace(b,c.replace(/\$/g,"$$$$"))};
goog.string.regExpEscape=function(a){return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08")};goog.string.repeat=String.prototype.repeat?function(a,b){return a.repeat(b)}:function(a,b){return Array(b+1).join(a)};goog.string.padNumber=function(a,b,c){a=goog.isDef(c)?a.toFixed(c):String(a);c=a.indexOf(".");-1==c&&(c=a.length);return goog.string.repeat("0",Math.max(0,b-c))+a};goog.string.makeSafe=function(a){return null==a?"":String(a)};
goog.string.buildString=function(a){return Array.prototype.join.call(arguments,"")};goog.string.getRandomString=function(){return Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^goog.now()).toString(36)};goog.string.compareVersions=goog.string.internal.compareVersions;goog.string.hashCode=function(a){for(var b=0,c=0;c<a.length;++c)b=31*b+a.charCodeAt(c)>>>0;return b};goog.string.uniqueStringCounter_=2147483648*Math.random()|0;
goog.string.createUniqueString=function(){return"goog_"+goog.string.uniqueStringCounter_++};goog.string.toNumber=function(a){var b=Number(a);return 0==b&&goog.string.isEmptyOrWhitespace(a)?NaN:b};goog.string.isLowerCamelCase=function(a){return/^[a-z]+([A-Z][a-z]*)*$/.test(a)};goog.string.isUpperCamelCase=function(a){return/^([A-Z][a-z]*)+$/.test(a)};goog.string.toCamelCase=function(a){return String(a).replace(/\-([a-z])/g,function(a,c){return c.toUpperCase()})};
goog.string.toSelectorCase=function(a){return String(a).replace(/([A-Z])/g,"-$1").toLowerCase()};goog.string.toTitleCase=function(a,b){b=goog.isString(b)?goog.string.regExpEscape(b):"\\s";return a.replace(new RegExp("(^"+(b?"|["+b+"]+":"")+")([a-z])","g"),function(a,b,e){return b+e.toUpperCase()})};goog.string.capitalize=function(a){return String(a.charAt(0)).toUpperCase()+String(a.substr(1)).toLowerCase()};
goog.string.parseInt=function(a){isFinite(a)&&(a=String(a));return goog.isString(a)?/^\s*-?0x/i.test(a)?parseInt(a,16):parseInt(a,10):NaN};goog.string.splitLimit=function(a,b,c){a=a.split(b);for(var d=[];0<c&&a.length;)d.push(a.shift()),c--;a.length&&d.push(a.join(b));return d};goog.string.lastComponent=function(a,b){if(b)"string"==typeof b&&(b=[b]);else return a;for(var c=-1,d=0;d<b.length;d++)if(""!=b[d]){var e=a.lastIndexOf(b[d]);e>c&&(c=e)}return-1==c?a:a.slice(c+1)};
goog.string.editDistance=function(a,b){var c=[],d=[];if(a==b)return 0;if(!a.length||!b.length)return Math.max(a.length,b.length);for(var e=0;e<b.length+1;e++)c[e]=e;for(e=0;e<a.length;e++){d[0]=e+1;for(var f=0;f<b.length;f++)d[f+1]=Math.min(d[f]+1,c[f+1]+1,c[f]+Number(a[e]!=b[f]));for(f=0;f<c.length;f++)c[f]=d[f]}return d[b.length]};goog.labs.userAgent.platform={};goog.labs.userAgent.platform.isAndroid=function(){return goog.labs.userAgent.util.matchUserAgent("Android")};goog.labs.userAgent.platform.isIpod=function(){return goog.labs.userAgent.util.matchUserAgent("iPod")};goog.labs.userAgent.platform.isIphone=function(){return goog.labs.userAgent.util.matchUserAgent("iPhone")&&!goog.labs.userAgent.util.matchUserAgent("iPod")&&!goog.labs.userAgent.util.matchUserAgent("iPad")};goog.labs.userAgent.platform.isIpad=function(){return goog.labs.userAgent.util.matchUserAgent("iPad")};
goog.labs.userAgent.platform.isIos=function(){return goog.labs.userAgent.platform.isIphone()||goog.labs.userAgent.platform.isIpad()||goog.labs.userAgent.platform.isIpod()};goog.labs.userAgent.platform.isMacintosh=function(){return goog.labs.userAgent.util.matchUserAgent("Macintosh")};goog.labs.userAgent.platform.isLinux=function(){return goog.labs.userAgent.util.matchUserAgent("Linux")};goog.labs.userAgent.platform.isWindows=function(){return goog.labs.userAgent.util.matchUserAgent("Windows")};
goog.labs.userAgent.platform.isChromeOS=function(){return goog.labs.userAgent.util.matchUserAgent("CrOS")};goog.labs.userAgent.platform.isChromecast=function(){return goog.labs.userAgent.util.matchUserAgent("CrKey")};goog.labs.userAgent.platform.isKaiOS=function(){return goog.labs.userAgent.util.matchUserAgentIgnoreCase("KaiOS")};goog.labs.userAgent.platform.isGo2Phone=function(){return goog.labs.userAgent.util.matchUserAgentIgnoreCase("GAFP")};
goog.labs.userAgent.platform.getVersion=function(){var a=goog.labs.userAgent.util.getUserAgent(),b="";goog.labs.userAgent.platform.isWindows()?(b=/Windows (?:NT|Phone) ([0-9.]+)/,b=(a=b.exec(a))?a[1]:"0.0"):goog.labs.userAgent.platform.isIos()?(b=/(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/,b=(a=b.exec(a))&&a[1].replace(/_/g,".")):goog.labs.userAgent.platform.isMacintosh()?(b=/Mac OS X ([0-9_.]+)/,b=(a=b.exec(a))?a[1].replace(/_/g,"."):"10"):goog.labs.userAgent.platform.isKaiOS()?(b=/(?:KaiOS)\/(\S+)/i,
b=(a=b.exec(a))&&a[1]):goog.labs.userAgent.platform.isAndroid()?(b=/Android\s+([^\);]+)(\)|;)/,b=(a=b.exec(a))&&a[1]):goog.labs.userAgent.platform.isChromeOS()&&(b=/(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/,b=(a=b.exec(a))&&a[1]);return b||""};goog.labs.userAgent.platform.isVersionOrHigher=function(a){return 0<=goog.string.compareVersions(goog.labs.userAgent.platform.getVersion(),a)};goog.reflect={};goog.reflect.object=function(a,b){return b};goog.reflect.objectProperty=function(a,b){return a};goog.reflect.sinkValue=function(a){goog.reflect.sinkValue[" "](a);return a};goog.reflect.sinkValue[" "]=goog.nullFunction;goog.reflect.canAccessProperty=function(a,b){try{return goog.reflect.sinkValue(a[b]),!0}catch(c){}return!1};goog.reflect.cache=function(a,b,c,d){d=d?d(b):b;return Object.prototype.hasOwnProperty.call(a,d)?a[d]:a[d]=c(b)};goog.labs.userAgent.engine={};goog.labs.userAgent.engine.isPresto=function(){return goog.labs.userAgent.util.matchUserAgent("Presto")};goog.labs.userAgent.engine.isTrident=function(){return goog.labs.userAgent.util.matchUserAgent("Trident")||goog.labs.userAgent.util.matchUserAgent("MSIE")};goog.labs.userAgent.engine.isEdge=function(){return goog.labs.userAgent.util.matchUserAgent("Edge")};
goog.labs.userAgent.engine.isWebKit=function(){return goog.labs.userAgent.util.matchUserAgentIgnoreCase("WebKit")&&!goog.labs.userAgent.engine.isEdge()};goog.labs.userAgent.engine.isGecko=function(){return goog.labs.userAgent.util.matchUserAgent("Gecko")&&!goog.labs.userAgent.engine.isWebKit()&&!goog.labs.userAgent.engine.isTrident()&&!goog.labs.userAgent.engine.isEdge()};
goog.labs.userAgent.engine.getVersion=function(){var a=goog.labs.userAgent.util.getUserAgent();if(a){a=goog.labs.userAgent.util.extractVersionTuples(a);var b=goog.labs.userAgent.engine.getEngineTuple_(a);if(b)return"Gecko"==b[0]?goog.labs.userAgent.engine.getVersionForKey_(a,"Firefox"):b[1];a=a[0];var c;if(a&&(c=a[2])&&(c=/Trident\/([^\s;]+)/.exec(c)))return c[1]}return""};
goog.labs.userAgent.engine.getEngineTuple_=function(a){if(!goog.labs.userAgent.engine.isEdge())return a[1];for(var b=0;b<a.length;b++){var c=a[b];if("Edge"==c[0])return c}};goog.labs.userAgent.engine.isVersionOrHigher=function(a){return 0<=goog.string.compareVersions(goog.labs.userAgent.engine.getVersion(),a)};goog.labs.userAgent.engine.getVersionForKey_=function(a,b){return(a=goog.array.find(a,function(a){return b==a[0]}))&&a[1]||""};goog.userAgent={};goog.userAgent.ASSUME_IE=!1;goog.userAgent.ASSUME_EDGE=!1;goog.userAgent.ASSUME_GECKO=!1;goog.userAgent.ASSUME_WEBKIT=!1;goog.userAgent.ASSUME_MOBILE_WEBKIT=!1;goog.userAgent.ASSUME_OPERA=!1;goog.userAgent.ASSUME_ANY_VERSION=!1;goog.userAgent.BROWSER_KNOWN_=goog.userAgent.ASSUME_IE||goog.userAgent.ASSUME_EDGE||goog.userAgent.ASSUME_GECKO||goog.userAgent.ASSUME_MOBILE_WEBKIT||goog.userAgent.ASSUME_WEBKIT||goog.userAgent.ASSUME_OPERA;goog.userAgent.getUserAgentString=function(){return goog.labs.userAgent.util.getUserAgent()};
goog.userAgent.getNavigatorTyped=function(){return goog.global.navigator||null};goog.userAgent.getNavigator=function(){return goog.userAgent.getNavigatorTyped()};goog.userAgent.OPERA=goog.userAgent.BROWSER_KNOWN_?goog.userAgent.ASSUME_OPERA:goog.labs.userAgent.browser.isOpera();goog.userAgent.IE=goog.userAgent.BROWSER_KNOWN_?goog.userAgent.ASSUME_IE:goog.labs.userAgent.browser.isIE();goog.userAgent.EDGE=goog.userAgent.BROWSER_KNOWN_?goog.userAgent.ASSUME_EDGE:goog.labs.userAgent.engine.isEdge();
goog.userAgent.EDGE_OR_IE=goog.userAgent.EDGE||goog.userAgent.IE;goog.userAgent.GECKO=goog.userAgent.BROWSER_KNOWN_?goog.userAgent.ASSUME_GECKO:goog.labs.userAgent.engine.isGecko();goog.userAgent.WEBKIT=goog.userAgent.BROWSER_KNOWN_?goog.userAgent.ASSUME_WEBKIT||goog.userAgent.ASSUME_MOBILE_WEBKIT:goog.labs.userAgent.engine.isWebKit();goog.userAgent.isMobile_=function(){return goog.userAgent.WEBKIT&&goog.labs.userAgent.util.matchUserAgent("Mobile")};
goog.userAgent.MOBILE=goog.userAgent.ASSUME_MOBILE_WEBKIT||goog.userAgent.isMobile_();goog.userAgent.SAFARI=goog.userAgent.WEBKIT;goog.userAgent.determinePlatform_=function(){var a=goog.userAgent.getNavigatorTyped();return a&&a.platform||""};goog.userAgent.PLATFORM=goog.userAgent.determinePlatform_();goog.userAgent.ASSUME_MAC=!1;goog.userAgent.ASSUME_WINDOWS=!1;goog.userAgent.ASSUME_LINUX=!1;goog.userAgent.ASSUME_X11=!1;goog.userAgent.ASSUME_ANDROID=!1;goog.userAgent.ASSUME_IPHONE=!1;
goog.userAgent.ASSUME_IPAD=!1;goog.userAgent.ASSUME_IPOD=!1;goog.userAgent.ASSUME_KAIOS=!1;goog.userAgent.ASSUME_GO2PHONE=!1;goog.userAgent.PLATFORM_KNOWN_=goog.userAgent.ASSUME_MAC||goog.userAgent.ASSUME_WINDOWS||goog.userAgent.ASSUME_LINUX||goog.userAgent.ASSUME_X11||goog.userAgent.ASSUME_ANDROID||goog.userAgent.ASSUME_IPHONE||goog.userAgent.ASSUME_IPAD||goog.userAgent.ASSUME_IPOD;goog.userAgent.MAC=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_MAC:goog.labs.userAgent.platform.isMacintosh();
goog.userAgent.WINDOWS=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_WINDOWS:goog.labs.userAgent.platform.isWindows();goog.userAgent.isLegacyLinux_=function(){return goog.labs.userAgent.platform.isLinux()||goog.labs.userAgent.platform.isChromeOS()};goog.userAgent.LINUX=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_LINUX:goog.userAgent.isLegacyLinux_();goog.userAgent.isX11_=function(){var a=goog.userAgent.getNavigatorTyped();return!!a&&goog.string.contains(a.appVersion||"","X11")};
goog.userAgent.X11=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_X11:goog.userAgent.isX11_();goog.userAgent.ANDROID=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_ANDROID:goog.labs.userAgent.platform.isAndroid();goog.userAgent.IPHONE=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_IPHONE:goog.labs.userAgent.platform.isIphone();goog.userAgent.IPAD=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_IPAD:goog.labs.userAgent.platform.isIpad();
goog.userAgent.IPOD=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_IPOD:goog.labs.userAgent.platform.isIpod();goog.userAgent.IOS=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_IPHONE||goog.userAgent.ASSUME_IPAD||goog.userAgent.ASSUME_IPOD:goog.labs.userAgent.platform.isIos();goog.userAgent.KAIOS=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_KAIOS:goog.labs.userAgent.platform.isKaiOS();goog.userAgent.GO2PHONE=goog.userAgent.PLATFORM_KNOWN_?goog.userAgent.ASSUME_GO2PHONE:goog.labs.userAgent.platform.isGo2Phone();
goog.userAgent.determineVersion_=function(){var a="",b=goog.userAgent.getVersionRegexResult_();b&&(a=b?b[1]:"");return goog.userAgent.IE&&(b=goog.userAgent.getDocumentMode_(),null!=b&&b>parseFloat(a))?String(b):a};
goog.userAgent.getVersionRegexResult_=function(){var a=goog.userAgent.getUserAgentString();if(goog.userAgent.GECKO)return/rv:([^\);]+)(\)|;)/.exec(a);if(goog.userAgent.EDGE)return/Edge\/([\d\.]+)/.exec(a);if(goog.userAgent.IE)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(goog.userAgent.WEBKIT)return/WebKit\/(\S+)/.exec(a);if(goog.userAgent.OPERA)return/(?:Version)[ \/]?(\S+)/.exec(a)};goog.userAgent.getDocumentMode_=function(){var a=goog.global.document;return a?a.documentMode:void 0};
goog.userAgent.VERSION=goog.userAgent.determineVersion_();goog.userAgent.compare=function(a,b){return goog.string.compareVersions(a,b)};goog.userAgent.isVersionOrHigherCache_={};goog.userAgent.isVersionOrHigher=function(a){return goog.userAgent.ASSUME_ANY_VERSION||goog.reflect.cache(goog.userAgent.isVersionOrHigherCache_,a,function(){return 0<=goog.string.compareVersions(goog.userAgent.VERSION,a)})};goog.userAgent.isVersion=goog.userAgent.isVersionOrHigher;
goog.userAgent.isDocumentModeOrHigher=function(a){return Number(goog.userAgent.DOCUMENT_MODE)>=a};goog.userAgent.isDocumentMode=goog.userAgent.isDocumentModeOrHigher;goog.userAgent.DOCUMENT_MODE=function(){if(goog.global.document&&goog.userAgent.IE)return goog.userAgent.getDocumentMode_()}();goog.userAgent.product={};goog.userAgent.product.ASSUME_FIREFOX=!1;goog.userAgent.product.ASSUME_IPHONE=!1;goog.userAgent.product.ASSUME_IPAD=!1;goog.userAgent.product.ASSUME_ANDROID=!1;goog.userAgent.product.ASSUME_CHROME=!1;goog.userAgent.product.ASSUME_SAFARI=!1;
goog.userAgent.product.PRODUCT_KNOWN_=goog.userAgent.ASSUME_IE||goog.userAgent.ASSUME_EDGE||goog.userAgent.ASSUME_OPERA||goog.userAgent.product.ASSUME_FIREFOX||goog.userAgent.product.ASSUME_IPHONE||goog.userAgent.product.ASSUME_IPAD||goog.userAgent.product.ASSUME_ANDROID||goog.userAgent.product.ASSUME_CHROME||goog.userAgent.product.ASSUME_SAFARI;goog.userAgent.product.OPERA=goog.userAgent.OPERA;goog.userAgent.product.IE=goog.userAgent.IE;goog.userAgent.product.EDGE=goog.userAgent.EDGE;
goog.userAgent.product.FIREFOX=goog.userAgent.product.PRODUCT_KNOWN_?goog.userAgent.product.ASSUME_FIREFOX:goog.labs.userAgent.browser.isFirefox();goog.userAgent.product.isIphoneOrIpod_=function(){return goog.labs.userAgent.platform.isIphone()||goog.labs.userAgent.platform.isIpod()};goog.userAgent.product.IPHONE=goog.userAgent.product.PRODUCT_KNOWN_?goog.userAgent.product.ASSUME_IPHONE:goog.userAgent.product.isIphoneOrIpod_();
goog.userAgent.product.IPAD=goog.userAgent.product.PRODUCT_KNOWN_?goog.userAgent.product.ASSUME_IPAD:goog.labs.userAgent.platform.isIpad();goog.userAgent.product.ANDROID=goog.userAgent.product.PRODUCT_KNOWN_?goog.userAgent.product.ASSUME_ANDROID:goog.labs.userAgent.browser.isAndroidBrowser();goog.userAgent.product.CHROME=goog.userAgent.product.PRODUCT_KNOWN_?goog.userAgent.product.ASSUME_CHROME:goog.labs.userAgent.browser.isChrome();
goog.userAgent.product.isSafariDesktop_=function(){return goog.labs.userAgent.browser.isSafari()&&!goog.labs.userAgent.platform.isIos()};goog.userAgent.product.SAFARI=goog.userAgent.product.PRODUCT_KNOWN_?goog.userAgent.product.ASSUME_SAFARI:goog.userAgent.product.isSafariDesktop_();goog.crypt.base64={};goog.crypt.base64.DEFAULT_ALPHABET_COMMON_="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";goog.crypt.base64.ENCODED_VALS=goog.crypt.base64.DEFAULT_ALPHABET_COMMON_+"+/=";goog.crypt.base64.ENCODED_VALS_WEBSAFE=goog.crypt.base64.DEFAULT_ALPHABET_COMMON_+"-_.";goog.crypt.base64.Alphabet={DEFAULT:0,NO_PADDING:1,WEBSAFE:2,WEBSAFE_DOT_PADDING:3,WEBSAFE_NO_PADDING:4};goog.crypt.base64.paddingChars_="=.";
goog.crypt.base64.isPadding_=function(a){return goog.string.contains(goog.crypt.base64.paddingChars_,a)};goog.crypt.base64.byteToCharMaps_={};goog.crypt.base64.charToByteMap_=null;goog.crypt.base64.ASSUME_NATIVE_SUPPORT_=goog.userAgent.GECKO||goog.userAgent.WEBKIT&&!goog.userAgent.product.SAFARI||goog.userAgent.OPERA;goog.crypt.base64.HAS_NATIVE_ENCODE_=goog.crypt.base64.ASSUME_NATIVE_SUPPORT_||"function"==typeof goog.global.btoa;
goog.crypt.base64.HAS_NATIVE_DECODE_=goog.crypt.base64.ASSUME_NATIVE_SUPPORT_||!goog.userAgent.product.SAFARI&&!goog.userAgent.IE&&"function"==typeof goog.global.atob;
goog.crypt.base64.encodeByteArray=function(a,b){goog.asserts.assert(goog.isArrayLike(a),"encodeByteArray takes an array as a parameter");void 0===b&&(b=goog.crypt.base64.Alphabet.DEFAULT);goog.crypt.base64.init_();b=goog.crypt.base64.byteToCharMaps_[b];for(var c=[],d=0;d<a.length;d+=3){var e=a[d],f=d+1<a.length,g=f?a[d+1]:0,h=d+2<a.length,k=h?a[d+2]:0,l=e>>2;e=(e&3)<<4|g>>4;g=(g&15)<<2|k>>6;k&=63;h||(k=64,f||(g=64));c.push(b[l],b[e],b[g]||"",b[k]||"")}return c.join("")};
goog.crypt.base64.encodeString=function(a,b){return goog.crypt.base64.HAS_NATIVE_ENCODE_&&!b?goog.global.btoa(a):goog.crypt.base64.encodeByteArray(goog.crypt.stringToByteArray(a),b)};goog.crypt.base64.decodeString=function(a,b){if(goog.crypt.base64.HAS_NATIVE_DECODE_&&!b)return goog.global.atob(a);var c="";goog.crypt.base64.decodeStringInternal_(a,function(a){c+=String.fromCharCode(a)});return c};
goog.crypt.base64.decodeStringToByteArray=function(a,b){var c=[];goog.crypt.base64.decodeStringInternal_(a,function(a){c.push(a)});return c};
goog.crypt.base64.decodeStringToUint8Array=function(a){goog.asserts.assert(!goog.userAgent.IE||goog.userAgent.isVersionOrHigher("10"),"Browser does not support typed arrays");var b=a.length,c=3*b/4;c%3?c=Math.floor(c):goog.crypt.base64.isPadding_(a[b-1])&&(c=goog.crypt.base64.isPadding_(a[b-2])?c-2:c-1);var d=new Uint8Array(c),e=0;goog.crypt.base64.decodeStringInternal_(a,function(a){d[e++]=a});return d.subarray(0,e)};
goog.crypt.base64.decodeStringInternal_=function(a,b){function c(b){for(;d<a.length;){var c=a.charAt(d++),e=goog.crypt.base64.charToByteMap_[c];if(null!=e)return e;if(!goog.string.isEmptyOrWhitespace(c))throw Error("Unknown base64 encoding at char: "+c);}return b}goog.crypt.base64.init_();for(var d=0;;){var e=c(-1),f=c(0),g=c(64),h=c(64);if(64===h&&-1===e)break;b(e<<2|f>>4);64!=g&&(b(f<<4&240|g>>2),64!=h&&b(g<<6&192|h))}};
goog.crypt.base64.init_=function(){if(!goog.crypt.base64.charToByteMap_){goog.crypt.base64.charToByteMap_={};for(var a=goog.crypt.base64.DEFAULT_ALPHABET_COMMON_.split(""),b=["+/=","+/","-_=","-_.","-_"],c=0;5>c;c++){var d=a.concat(b[c].split(""));goog.crypt.base64.byteToCharMaps_[c]=d;for(var e=0;e<d.length;e++){var f=d[e],g=goog.crypt.base64.charToByteMap_[f];void 0===g?goog.crypt.base64.charToByteMap_[f]=e:goog.asserts.assert(g===e)}}}};jspb.utils={};jspb.utils.split64Low=0;jspb.utils.split64High=0;jspb.utils.splitUint64=function(a){var b=a>>>0;a=Math.floor((a-b)/jspb.BinaryConstants.TWO_TO_32)>>>0;jspb.utils.split64Low=b;jspb.utils.split64High=a};jspb.utils.splitInt64=function(a){var b=0>a;a=Math.abs(a);var c=a>>>0;a=Math.floor((a-c)/jspb.BinaryConstants.TWO_TO_32);a>>>=0;b&&(a=~a>>>0,c=(~c>>>0)+1,4294967295<c&&(c=0,a++,4294967295<a&&(a=0)));jspb.utils.split64Low=c;jspb.utils.split64High=a};
jspb.utils.splitZigzag64=function(a){var b=0>a;a=2*Math.abs(a);jspb.utils.splitUint64(a);a=jspb.utils.split64Low;var c=jspb.utils.split64High;b&&(0==a?0==c?c=a=4294967295:(c--,a=4294967295):a--);jspb.utils.split64Low=a;jspb.utils.split64High=c};
jspb.utils.splitFloat32=function(a){var b=0>a?1:0;a=b?-a:a;if(0===a)0<1/a?(jspb.utils.split64High=0,jspb.utils.split64Low=0):(jspb.utils.split64High=0,jspb.utils.split64Low=2147483648);else if(isNaN(a))jspb.utils.split64High=0,jspb.utils.split64Low=2147483647;else if(a>jspb.BinaryConstants.FLOAT32_MAX)jspb.utils.split64High=0,jspb.utils.split64Low=(b<<31|2139095040)>>>0;else if(a<jspb.BinaryConstants.FLOAT32_MIN)a=Math.round(a/Math.pow(2,-149)),jspb.utils.split64High=0,jspb.utils.split64Low=(b<<31|
a)>>>0;else{var c=Math.floor(Math.log(a)/Math.LN2);a*=Math.pow(2,-c);a=Math.round(a*jspb.BinaryConstants.TWO_TO_23)&8388607;jspb.utils.split64High=0;jspb.utils.split64Low=(b<<31|c+127<<23|a)>>>0}};
jspb.utils.splitFloat64=function(a){var b=0>a?1:0;a=b?-a:a;if(0===a)jspb.utils.split64High=0<1/a?0:2147483648,jspb.utils.split64Low=0;else if(isNaN(a))jspb.utils.split64High=2147483647,jspb.utils.split64Low=4294967295;else if(a>jspb.BinaryConstants.FLOAT64_MAX)jspb.utils.split64High=(b<<31|2146435072)>>>0,jspb.utils.split64Low=0;else if(a<jspb.BinaryConstants.FLOAT64_MIN){var c=a/Math.pow(2,-1074);a=c/jspb.BinaryConstants.TWO_TO_32;jspb.utils.split64High=(b<<31|a)>>>0;jspb.utils.split64Low=c>>>0}else{c=
a;var d=0;if(2<=c)for(;2<=c&&1023>d;)d++,c/=2;else for(;1>c&&-1022<d;)c*=2,d--;c=a*Math.pow(2,-d);a=c*jspb.BinaryConstants.TWO_TO_20&1048575;c=c*jspb.BinaryConstants.TWO_TO_52>>>0;jspb.utils.split64High=(b<<31|d+1023<<20|a)>>>0;jspb.utils.split64Low=c}};
jspb.utils.splitHash64=function(a){var b=a.charCodeAt(0),c=a.charCodeAt(1),d=a.charCodeAt(2),e=a.charCodeAt(3),f=a.charCodeAt(4),g=a.charCodeAt(5),h=a.charCodeAt(6);a=a.charCodeAt(7);jspb.utils.split64Low=b+(c<<8)+(d<<16)+(e<<24)>>>0;jspb.utils.split64High=f+(g<<8)+(h<<16)+(a<<24)>>>0};jspb.utils.joinUint64=function(a,b){return b*jspb.BinaryConstants.TWO_TO_32+(a>>>0)};
jspb.utils.joinInt64=function(a,b){var c=b&2147483648;c&&(a=~a+1>>>0,b=~b>>>0,0==a&&(b=b+1>>>0));a=jspb.utils.joinUint64(a,b);return c?-a:a};jspb.utils.toZigzag64=function(a,b,c){var d=b>>31;return c(a<<1^d,(b<<1|a>>>31)^d)};jspb.utils.joinZigzag64=function(a,b){return jspb.utils.fromZigzag64(a,b,jspb.utils.joinInt64)};jspb.utils.fromZigzag64=function(a,b,c){var d=-(a&1);return c((a>>>1|b<<31)^d,b>>>1^d)};
jspb.utils.joinFloat32=function(a,b){b=2*(a>>31)+1;var c=a>>>23&255;a&=8388607;return 255==c?a?NaN:Infinity*b:0==c?b*Math.pow(2,-149)*a:b*Math.pow(2,c-150)*(a+Math.pow(2,23))};jspb.utils.joinFloat64=function(a,b){var c=2*(b>>31)+1,d=b>>>20&2047;a=jspb.BinaryConstants.TWO_TO_32*(b&1048575)+a;return 2047==d?a?NaN:Infinity*c:0==d?c*Math.pow(2,-1074)*a:c*Math.pow(2,d-1075)*(a+jspb.BinaryConstants.TWO_TO_52)};
jspb.utils.joinHash64=function(a,b){return String.fromCharCode(a>>>0&255,a>>>8&255,a>>>16&255,a>>>24&255,b>>>0&255,b>>>8&255,b>>>16&255,b>>>24&255)};jspb.utils.DIGITS="0123456789abcdef".split("");jspb.utils.ZERO_CHAR_CODE_=48;jspb.utils.A_CHAR_CODE_=97;
jspb.utils.joinUnsignedDecimalString=function(a,b){function c(a,b){a=a?String(a):"";return b?"0000000".slice(a.length)+a:a}if(2097151>=b)return""+(jspb.BinaryConstants.TWO_TO_32*b+a);var d=(a>>>24|b<<8)>>>0&16777215;b=b>>16&65535;a=(a&16777215)+6777216*d+6710656*b;d+=8147497*b;b*=2;1E7<=a&&(d+=Math.floor(a/1E7),a%=1E7);1E7<=d&&(b+=Math.floor(d/1E7),d%=1E7);return c(b,0)+c(d,b)+c(a,1)};
jspb.utils.joinSignedDecimalString=function(a,b){var c=b&2147483648;c&&(a=~a+1>>>0,b=~b+(0==a?1:0)>>>0);a=jspb.utils.joinUnsignedDecimalString(a,b);return c?"-"+a:a};jspb.utils.hash64ToDecimalString=function(a,b){jspb.utils.splitHash64(a);a=jspb.utils.split64Low;var c=jspb.utils.split64High;return b?jspb.utils.joinSignedDecimalString(a,c):jspb.utils.joinUnsignedDecimalString(a,c)};
jspb.utils.hash64ArrayToDecimalStrings=function(a,b){for(var c=Array(a.length),d=0;d<a.length;d++)c[d]=jspb.utils.hash64ToDecimalString(a[d],b);return c};
jspb.utils.decimalStringToHash64=function(a){function b(a,b){for(var c=0;8>c&&(1!==a||0<b);c++)b=a*e[c]+b,e[c]=b&255,b>>>=8}function c(){for(var a=0;8>a;a++)e[a]=~e[a]&255}goog.asserts.assert(0<a.length);var d=!1;"-"===a[0]&&(d=!0,a=a.slice(1));for(var e=[0,0,0,0,0,0,0,0],f=0;f<a.length;f++)b(10,a.charCodeAt(f)-jspb.utils.ZERO_CHAR_CODE_);d&&(c(),b(1,1));return goog.crypt.byteArrayToString(e)};jspb.utils.splitDecimalString=function(a){jspb.utils.splitHash64(jspb.utils.decimalStringToHash64(a))};
jspb.utils.toHexDigit_=function(a){return String.fromCharCode(10>a?jspb.utils.ZERO_CHAR_CODE_+a:jspb.utils.A_CHAR_CODE_-10+a)};jspb.utils.fromHexCharCode_=function(a){return a>=jspb.utils.A_CHAR_CODE_?a-jspb.utils.A_CHAR_CODE_+10:a-jspb.utils.ZERO_CHAR_CODE_};jspb.utils.hash64ToHexString=function(a){var b=Array(18);b[0]="0";b[1]="x";for(var c=0;8>c;c++){var d=a.charCodeAt(7-c);b[2*c+2]=jspb.utils.toHexDigit_(d>>4);b[2*c+3]=jspb.utils.toHexDigit_(d&15)}return b.join("")};
jspb.utils.hexStringToHash64=function(a){a=a.toLowerCase();goog.asserts.assert(18==a.length);goog.asserts.assert("0"==a[0]);goog.asserts.assert("x"==a[1]);for(var b="",c=0;8>c;c++){var d=jspb.utils.fromHexCharCode_(a.charCodeAt(2*c+2)),e=jspb.utils.fromHexCharCode_(a.charCodeAt(2*c+3));b=String.fromCharCode(16*d+e)+b}return b};
jspb.utils.hash64ToNumber=function(a,b){jspb.utils.splitHash64(a);a=jspb.utils.split64Low;var c=jspb.utils.split64High;return b?jspb.utils.joinInt64(a,c):jspb.utils.joinUint64(a,c)};jspb.utils.numberToHash64=function(a){jspb.utils.splitInt64(a);return jspb.utils.joinHash64(jspb.utils.split64Low,jspb.utils.split64High)};jspb.utils.countVarints=function(a,b,c){for(var d=0,e=b;e<c;e++)d+=a[e]>>7;return c-b-d};
jspb.utils.countVarintFields=function(a,b,c,d){var e=0;d=8*d+jspb.BinaryConstants.WireType.VARINT;if(128>d)for(;b<c&&a[b++]==d;)for(e++;;){var f=a[b++];if(0==(f&128))break}else for(;b<c;){for(f=d;128<f;){if(a[b]!=(f&127|128))return e;b++;f>>=7}if(a[b++]!=f)break;for(e++;f=a[b++],0!=(f&128););}return e};jspb.utils.countFixedFields_=function(a,b,c,d,e){var f=0;if(128>d)for(;b<c&&a[b++]==d;)f++,b+=e;else for(;b<c;){for(var g=d;128<g;){if(a[b++]!=(g&127|128))return f;g>>=7}if(a[b++]!=g)break;f++;b+=e}return f};
jspb.utils.countFixed32Fields=function(a,b,c,d){return jspb.utils.countFixedFields_(a,b,c,8*d+jspb.BinaryConstants.WireType.FIXED32,4)};jspb.utils.countFixed64Fields=function(a,b,c,d){return jspb.utils.countFixedFields_(a,b,c,8*d+jspb.BinaryConstants.WireType.FIXED64,8)};
jspb.utils.countDelimitedFields=function(a,b,c,d){var e=0;for(d=8*d+jspb.BinaryConstants.WireType.DELIMITED;b<c;){for(var f=d;128<f;){if(a[b++]!=(f&127|128))return e;f>>=7}if(a[b++]!=f)break;e++;for(var g=0,h=1;f=a[b++],g+=(f&127)*h,h*=128,0!=(f&128););b+=g}return e};jspb.utils.debugBytesToTextFormat=function(a){var b='"';if(a){a=jspb.utils.byteSourceToUint8Array(a);for(var c=0;c<a.length;c++)b+="\\x",16>a[c]&&(b+="0"),b+=a[c].toString(16)}return b+'"'};
jspb.utils.debugScalarToTextFormat=function(a){return"string"===typeof a?goog.string.quote(a):a.toString()};jspb.utils.stringToByteArray=function(a){for(var b=new Uint8Array(a.length),c=0;c<a.length;c++){var d=a.charCodeAt(c);if(255<d)throw Error("Conversion error: string contains codepoint outside of byte range");b[c]=d}return b};
jspb.utils.byteSourceToUint8Array=function(a){if(a.constructor===Uint8Array)return a;if(a.constructor===ArrayBuffer||"undefined"!=typeof Buffer&&a.constructor===Buffer||a.constructor===Array)return new Uint8Array(a);if(a.constructor===String)return goog.crypt.base64.decodeStringToUint8Array(a);goog.asserts.fail("Type not convertible to Uint8Array.");return new Uint8Array(0)};jspb.BinaryDecoder=function(a,b,c){this.bytes_=null;this.cursor_=this.end_=this.start_=0;this.error_=!1;a&&this.setBlock(a,b,c)};jspb.BinaryDecoder.instanceCache_=[];jspb.BinaryDecoder.alloc=function(a,b,c){if(jspb.BinaryDecoder.instanceCache_.length){var d=jspb.BinaryDecoder.instanceCache_.pop();a&&d.setBlock(a,b,c);return d}return new jspb.BinaryDecoder(a,b,c)};jspb.BinaryDecoder.prototype.free=function(){this.clear();100>jspb.BinaryDecoder.instanceCache_.length&&jspb.BinaryDecoder.instanceCache_.push(this)};
jspb.BinaryDecoder.prototype.clone=function(){return jspb.BinaryDecoder.alloc(this.bytes_,this.start_,this.end_-this.start_)};jspb.BinaryDecoder.prototype.clear=function(){this.bytes_=null;this.cursor_=this.end_=this.start_=0;this.error_=!1};jspb.BinaryDecoder.prototype.getBuffer=function(){return this.bytes_};
jspb.BinaryDecoder.prototype.setBlock=function(a,b,c){this.bytes_=jspb.utils.byteSourceToUint8Array(a);this.start_=void 0!==b?b:0;this.end_=void 0!==c?this.start_+c:this.bytes_.length;this.cursor_=this.start_};jspb.BinaryDecoder.prototype.getEnd=function(){return this.end_};jspb.BinaryDecoder.prototype.setEnd=function(a){this.end_=a};jspb.BinaryDecoder.prototype.reset=function(){this.cursor_=this.start_};jspb.BinaryDecoder.prototype.getCursor=function(){return this.cursor_};
jspb.BinaryDecoder.prototype.setCursor=function(a){this.cursor_=a};jspb.BinaryDecoder.prototype.advance=function(a){this.cursor_+=a;goog.asserts.assert(this.cursor_<=this.end_)};jspb.BinaryDecoder.prototype.atEnd=function(){return this.cursor_==this.end_};jspb.BinaryDecoder.prototype.pastEnd=function(){return this.cursor_>this.end_};jspb.BinaryDecoder.prototype.getError=function(){return this.error_||0>this.cursor_||this.cursor_>this.end_};
jspb.BinaryDecoder.prototype.readSplitVarint64=function(a){for(var b=128,c=0,d=0,e=0;4>e&&128<=b;e++)b=this.bytes_[this.cursor_++],c|=(b&127)<<7*e;128<=b&&(b=this.bytes_[this.cursor_++],c|=(b&127)<<28,d|=(b&127)>>4);if(128<=b)for(e=0;5>e&&128<=b;e++)b=this.bytes_[this.cursor_++],d|=(b&127)<<7*e+3;if(128>b)return a(c>>>0,d>>>0);goog.asserts.fail("Failed to read varint, encoding is invalid.");this.error_=!0};
jspb.BinaryDecoder.prototype.readSplitZigzagVarint64=function(a){return this.readSplitVarint64(function(b,c){return jspb.utils.fromZigzag64(b,c,a)})};jspb.BinaryDecoder.prototype.readSplitFixed64=function(a){var b=this.bytes_,c=this.cursor_;this.cursor_+=8;for(var d=0,e=0,f=c+7;f>=c;f--)d=d<<8|b[f],e=e<<8|b[f+4];return a(d,e)};jspb.BinaryDecoder.prototype.skipVarint=function(){for(;this.bytes_[this.cursor_]&128;)this.cursor_++;this.cursor_++};
jspb.BinaryDecoder.prototype.unskipVarint=function(a){for(;128<a;)this.cursor_--,a>>>=7;this.cursor_--};
jspb.BinaryDecoder.prototype.readUnsignedVarint32=function(){var a=this.bytes_;var b=a[this.cursor_+0];var c=b&127;if(128>b)return this.cursor_+=1,goog.asserts.assert(this.cursor_<=this.end_),c;b=a[this.cursor_+1];c|=(b&127)<<7;if(128>b)return this.cursor_+=2,goog.asserts.assert(this.cursor_<=this.end_),c;b=a[this.cursor_+2];c|=(b&127)<<14;if(128>b)return this.cursor_+=3,goog.asserts.assert(this.cursor_<=this.end_),c;b=a[this.cursor_+3];c|=(b&127)<<21;if(128>b)return this.cursor_+=4,goog.asserts.assert(this.cursor_<=
this.end_),c;b=a[this.cursor_+4];c|=(b&15)<<28;if(128>b)return this.cursor_+=5,goog.asserts.assert(this.cursor_<=this.end_),c>>>0;this.cursor_+=5;128<=a[this.cursor_++]&&128<=a[this.cursor_++]&&128<=a[this.cursor_++]&&128<=a[this.cursor_++]&&128<=a[this.cursor_++]&&goog.asserts.assert(!1);goog.asserts.assert(this.cursor_<=this.end_);return c};jspb.BinaryDecoder.prototype.readSignedVarint32=jspb.BinaryDecoder.prototype.readUnsignedVarint32;jspb.BinaryDecoder.prototype.readUnsignedVarint32String=function(){return this.readUnsignedVarint32().toString()};
jspb.BinaryDecoder.prototype.readSignedVarint32String=function(){return this.readSignedVarint32().toString()};jspb.BinaryDecoder.prototype.readZigzagVarint32=function(){var a=this.readUnsignedVarint32();return a>>>1^-(a&1)};jspb.BinaryDecoder.prototype.readUnsignedVarint64=function(){return this.readSplitVarint64(jspb.utils.joinUint64)};jspb.BinaryDecoder.prototype.readUnsignedVarint64String=function(){return this.readSplitVarint64(jspb.utils.joinUnsignedDecimalString)};
jspb.BinaryDecoder.prototype.readSignedVarint64=function(){return this.readSplitVarint64(jspb.utils.joinInt64)};jspb.BinaryDecoder.prototype.readSignedVarint64String=function(){return this.readSplitVarint64(jspb.utils.joinSignedDecimalString)};jspb.BinaryDecoder.prototype.readZigzagVarint64=function(){return this.readSplitVarint64(jspb.utils.joinZigzag64)};jspb.BinaryDecoder.prototype.readZigzagVarintHash64=function(){return this.readSplitZigzagVarint64(jspb.utils.joinHash64)};
jspb.BinaryDecoder.prototype.readZigzagVarint64String=function(){return this.readSplitZigzagVarint64(jspb.utils.joinSignedDecimalString)};jspb.BinaryDecoder.prototype.readUint8=function(){var a=this.bytes_[this.cursor_+0];this.cursor_+=1;goog.asserts.assert(this.cursor_<=this.end_);return a};jspb.BinaryDecoder.prototype.readUint16=function(){var a=this.bytes_[this.cursor_+0],b=this.bytes_[this.cursor_+1];this.cursor_+=2;goog.asserts.assert(this.cursor_<=this.end_);return a<<0|b<<8};
jspb.BinaryDecoder.prototype.readUint32=function(){var a=this.bytes_[this.cursor_+0],b=this.bytes_[this.cursor_+1],c=this.bytes_[this.cursor_+2],d=this.bytes_[this.cursor_+3];this.cursor_+=4;goog.asserts.assert(this.cursor_<=this.end_);return(a<<0|b<<8|c<<16|d<<24)>>>0};jspb.BinaryDecoder.prototype.readUint64=function(){var a=this.readUint32(),b=this.readUint32();return jspb.utils.joinUint64(a,b)};
jspb.BinaryDecoder.prototype.readUint64String=function(){var a=this.readUint32(),b=this.readUint32();return jspb.utils.joinUnsignedDecimalString(a,b)};jspb.BinaryDecoder.prototype.readInt8=function(){var a=this.bytes_[this.cursor_+0];this.cursor_+=1;goog.asserts.assert(this.cursor_<=this.end_);return a<<24>>24};
jspb.BinaryDecoder.prototype.readInt16=function(){var a=this.bytes_[this.cursor_+0],b=this.bytes_[this.cursor_+1];this.cursor_+=2;goog.asserts.assert(this.cursor_<=this.end_);return(a<<0|b<<8)<<16>>16};jspb.BinaryDecoder.prototype.readInt32=function(){var a=this.bytes_[this.cursor_+0],b=this.bytes_[this.cursor_+1],c=this.bytes_[this.cursor_+2],d=this.bytes_[this.cursor_+3];this.cursor_+=4;goog.asserts.assert(this.cursor_<=this.end_);return a<<0|b<<8|c<<16|d<<24};
jspb.BinaryDecoder.prototype.readInt64=function(){var a=this.readUint32(),b=this.readUint32();return jspb.utils.joinInt64(a,b)};jspb.BinaryDecoder.prototype.readInt64String=function(){var a=this.readUint32(),b=this.readUint32();return jspb.utils.joinSignedDecimalString(a,b)};jspb.BinaryDecoder.prototype.readFloat=function(){var a=this.readUint32();return jspb.utils.joinFloat32(a,0)};
jspb.BinaryDecoder.prototype.readDouble=function(){var a=this.readUint32(),b=this.readUint32();return jspb.utils.joinFloat64(a,b)};jspb.BinaryDecoder.prototype.readBool=function(){return!!this.bytes_[this.cursor_++]};jspb.BinaryDecoder.prototype.readEnum=function(){return this.readSignedVarint32()};
jspb.BinaryDecoder.prototype.readString=function(a){var b=this.bytes_,c=this.cursor_;a=c+a;for(var d=[],e="";c<a;){var f=b[c++];if(128>f)d.push(f);else if(192>f)continue;else if(224>f){var g=b[c++];d.push((f&31)<<6|g&63)}else if(240>f){g=b[c++];var h=b[c++];d.push((f&15)<<12|(g&63)<<6|h&63)}else if(248>f){g=b[c++];h=b[c++];var k=b[c++];f=(f&7)<<18|(g&63)<<12|(h&63)<<6|k&63;f-=65536;d.push((f>>10&1023)+55296,(f&1023)+56320)}8192<=d.length&&(e+=String.fromCharCode.apply(null,d),d.length=0)}e+=goog.crypt.byteArrayToString(d);
this.cursor_=c;return e};jspb.BinaryDecoder.prototype.readStringWithLength=function(){var a=this.readUnsignedVarint32();return this.readString(a)};jspb.BinaryDecoder.prototype.readBytes=function(a){if(0>a||this.cursor_+a>this.bytes_.length)return this.error_=!0,goog.asserts.fail("Invalid byte length!"),new Uint8Array(0);var b=this.bytes_.subarray(this.cursor_,this.cursor_+a);this.cursor_+=a;goog.asserts.assert(this.cursor_<=this.end_);return b};jspb.BinaryDecoder.prototype.readVarintHash64=function(){return this.readSplitVarint64(jspb.utils.joinHash64)};
jspb.BinaryDecoder.prototype.readFixedHash64=function(){var a=this.bytes_,b=this.cursor_,c=a[b+0],d=a[b+1],e=a[b+2],f=a[b+3],g=a[b+4],h=a[b+5],k=a[b+6];a=a[b+7];this.cursor_+=8;return String.fromCharCode(c,d,e,f,g,h,k,a)};jspb.BinaryReader=function(a,b,c){this.decoder_=jspb.BinaryDecoder.alloc(a,b,c);this.fieldCursor_=this.decoder_.getCursor();this.nextField_=jspb.BinaryConstants.INVALID_FIELD_NUMBER;this.nextWireType_=jspb.BinaryConstants.WireType.INVALID;this.error_=!1;this.readCallbacks_=null};jspb.BinaryReader.instanceCache_=[];
jspb.BinaryReader.alloc=function(a,b,c){if(jspb.BinaryReader.instanceCache_.length){var d=jspb.BinaryReader.instanceCache_.pop();a&&d.decoder_.setBlock(a,b,c);return d}return new jspb.BinaryReader(a,b,c)};jspb.BinaryReader.prototype.alloc=jspb.BinaryReader.alloc;
jspb.BinaryReader.prototype.free=function(){this.decoder_.clear();this.nextField_=jspb.BinaryConstants.INVALID_FIELD_NUMBER;this.nextWireType_=jspb.BinaryConstants.WireType.INVALID;this.error_=!1;this.readCallbacks_=null;100>jspb.BinaryReader.instanceCache_.length&&jspb.BinaryReader.instanceCache_.push(this)};jspb.BinaryReader.prototype.getFieldCursor=function(){return this.fieldCursor_};jspb.BinaryReader.prototype.getCursor=function(){return this.decoder_.getCursor()};
jspb.BinaryReader.prototype.getBuffer=function(){return this.decoder_.getBuffer()};jspb.BinaryReader.prototype.getFieldNumber=function(){return this.nextField_};jspb.BinaryReader.prototype.getWireType=function(){return this.nextWireType_};jspb.BinaryReader.prototype.isEndGroup=function(){return this.nextWireType_==jspb.BinaryConstants.WireType.END_GROUP};jspb.BinaryReader.prototype.getError=function(){return this.error_||this.decoder_.getError()};
jspb.BinaryReader.prototype.setBlock=function(a,b,c){this.decoder_.setBlock(a,b,c);this.nextField_=jspb.BinaryConstants.INVALID_FIELD_NUMBER;this.nextWireType_=jspb.BinaryConstants.WireType.INVALID};jspb.BinaryReader.prototype.reset=function(){this.decoder_.reset();this.nextField_=jspb.BinaryConstants.INVALID_FIELD_NUMBER;this.nextWireType_=jspb.BinaryConstants.WireType.INVALID};jspb.BinaryReader.prototype.advance=function(a){this.decoder_.advance(a)};
jspb.BinaryReader.prototype.nextField=function(){if(this.decoder_.atEnd())return!1;if(this.getError())return goog.asserts.fail("Decoder hit an error"),!1;this.fieldCursor_=this.decoder_.getCursor();var a=this.decoder_.readUnsignedVarint32(),b=a>>>3;a&=7;if(a!=jspb.BinaryConstants.WireType.VARINT&&a!=jspb.BinaryConstants.WireType.FIXED32&&a!=jspb.BinaryConstants.WireType.FIXED64&&a!=jspb.BinaryConstants.WireType.DELIMITED&&a!=jspb.BinaryConstants.WireType.START_GROUP&&a!=jspb.BinaryConstants.WireType.END_GROUP)return goog.asserts.fail("Invalid wire type: %s (at position %s)",
a,this.fieldCursor_),this.error_=!0,!1;this.nextField_=b;this.nextWireType_=a;return!0};jspb.BinaryReader.prototype.unskipHeader=function(){this.decoder_.unskipVarint(this.nextField_<<3|this.nextWireType_)};jspb.BinaryReader.prototype.skipMatchingFields=function(){var a=this.nextField_;for(this.unskipHeader();this.nextField()&&this.getFieldNumber()==a;)this.skipField();this.decoder_.atEnd()||this.unskipHeader()};
jspb.BinaryReader.prototype.skipVarintField=function(){this.nextWireType_!=jspb.BinaryConstants.WireType.VARINT?(goog.asserts.fail("Invalid wire type for skipVarintField"),this.skipField()):this.decoder_.skipVarint()};jspb.BinaryReader.prototype.skipDelimitedField=function(){if(this.nextWireType_!=jspb.BinaryConstants.WireType.DELIMITED)goog.asserts.fail("Invalid wire type for skipDelimitedField"),this.skipField();else{var a=this.decoder_.readUnsignedVarint32();this.decoder_.advance(a)}};
jspb.BinaryReader.prototype.skipFixed32Field=function(){this.nextWireType_!=jspb.BinaryConstants.WireType.FIXED32?(goog.asserts.fail("Invalid wire type for skipFixed32Field"),this.skipField()):this.decoder_.advance(4)};jspb.BinaryReader.prototype.skipFixed64Field=function(){this.nextWireType_!=jspb.BinaryConstants.WireType.FIXED64?(goog.asserts.fail("Invalid wire type for skipFixed64Field"),this.skipField()):this.decoder_.advance(8)};
jspb.BinaryReader.prototype.skipGroup=function(){var a=this.nextField_;do{if(!this.nextField()){goog.asserts.fail("Unmatched start-group tag: stream EOF");this.error_=!0;break}if(this.nextWireType_==jspb.BinaryConstants.WireType.END_GROUP){this.nextField_!=a&&(goog.asserts.fail("Unmatched end-group tag"),this.error_=!0);break}this.skipField()}while(1)};
jspb.BinaryReader.prototype.skipField=function(){switch(this.nextWireType_){case jspb.BinaryConstants.WireType.VARINT:this.skipVarintField();break;case jspb.BinaryConstants.WireType.FIXED64:this.skipFixed64Field();break;case jspb.BinaryConstants.WireType.DELIMITED:this.skipDelimitedField();break;case jspb.BinaryConstants.WireType.FIXED32:this.skipFixed32Field();break;case jspb.BinaryConstants.WireType.START_GROUP:this.skipGroup();break;default:goog.asserts.fail("Invalid wire encoding for field.")}};
jspb.BinaryReader.prototype.registerReadCallback=function(a,b){null===this.readCallbacks_&&(this.readCallbacks_={});goog.asserts.assert(!this.readCallbacks_[a]);this.readCallbacks_[a]=b};jspb.BinaryReader.prototype.runReadCallback=function(a){goog.asserts.assert(null!==this.readCallbacks_);a=this.readCallbacks_[a];goog.asserts.assert(a);return a(this)};
jspb.BinaryReader.prototype.readAny=function(a){this.nextWireType_=jspb.BinaryConstants.FieldTypeToWireType(a);var b=jspb.BinaryConstants.FieldType;switch(a){case b.DOUBLE:return this.readDouble();case b.FLOAT:return this.readFloat();case b.INT64:return this.readInt64();case b.UINT64:return this.readUint64();case b.INT32:return this.readInt32();case b.FIXED64:return this.readFixed64();case b.FIXED32:return this.readFixed32();case b.BOOL:return this.readBool();case b.STRING:return this.readString();
case b.GROUP:goog.asserts.fail("Group field type not supported in readAny()");case b.MESSAGE:goog.asserts.fail("Message field type not supported in readAny()");case b.BYTES:return this.readBytes();case b.UINT32:return this.readUint32();case b.ENUM:return this.readEnum();case b.SFIXED32:return this.readSfixed32();case b.SFIXED64:return this.readSfixed64();case b.SINT32:return this.readSint32();case b.SINT64:return this.readSint64();case b.FHASH64:return this.readFixedHash64();case b.VHASH64:return this.readVarintHash64();
default:goog.asserts.fail("Invalid field type in readAny()")}return 0};jspb.BinaryReader.prototype.readMessage=function(a,b){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.DELIMITED);var c=this.decoder_.getEnd(),d=this.decoder_.readUnsignedVarint32();d=this.decoder_.getCursor()+d;this.decoder_.setEnd(d);b(a,this);this.decoder_.setCursor(d);this.decoder_.setEnd(c)};
jspb.BinaryReader.prototype.readGroup=function(a,b,c){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.START_GROUP);goog.asserts.assert(this.nextField_==a);c(b,this);this.error_||this.nextWireType_==jspb.BinaryConstants.WireType.END_GROUP||(goog.asserts.fail("Group submessage did not end with an END_GROUP tag"),this.error_=!0)};
jspb.BinaryReader.prototype.getFieldDecoder=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.DELIMITED);var a=this.decoder_.readUnsignedVarint32(),b=this.decoder_.getCursor(),c=b+a;a=jspb.BinaryDecoder.alloc(this.decoder_.getBuffer(),b,a);this.decoder_.setCursor(c);return a};jspb.BinaryReader.prototype.readInt32=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readSignedVarint32()};
jspb.BinaryReader.prototype.readInt32String=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readSignedVarint32String()};jspb.BinaryReader.prototype.readInt64=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readSignedVarint64()};jspb.BinaryReader.prototype.readInt64String=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readSignedVarint64String()};
jspb.BinaryReader.prototype.readUint32=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readUnsignedVarint32()};jspb.BinaryReader.prototype.readUint32String=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readUnsignedVarint32String()};jspb.BinaryReader.prototype.readUint64=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readUnsignedVarint64()};
jspb.BinaryReader.prototype.readUint64String=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readUnsignedVarint64String()};jspb.BinaryReader.prototype.readSint32=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readZigzagVarint32()};jspb.BinaryReader.prototype.readSint64=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readZigzagVarint64()};
jspb.BinaryReader.prototype.readSint64String=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readZigzagVarint64String()};jspb.BinaryReader.prototype.readFixed32=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED32);return this.decoder_.readUint32()};jspb.BinaryReader.prototype.readFixed64=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED64);return this.decoder_.readUint64()};
jspb.BinaryReader.prototype.readFixed64String=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED64);return this.decoder_.readUint64String()};jspb.BinaryReader.prototype.readSfixed32=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED32);return this.decoder_.readInt32()};jspb.BinaryReader.prototype.readSfixed32String=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED32);return this.decoder_.readInt32().toString()};
jspb.BinaryReader.prototype.readSfixed64=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED64);return this.decoder_.readInt64()};jspb.BinaryReader.prototype.readSfixed64String=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED64);return this.decoder_.readInt64String()};jspb.BinaryReader.prototype.readFloat=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED32);return this.decoder_.readFloat()};
jspb.BinaryReader.prototype.readDouble=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED64);return this.decoder_.readDouble()};jspb.BinaryReader.prototype.readBool=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return!!this.decoder_.readUnsignedVarint32()};jspb.BinaryReader.prototype.readEnum=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readSignedVarint64()};
jspb.BinaryReader.prototype.readString=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.DELIMITED);var a=this.decoder_.readUnsignedVarint32();return this.decoder_.readString(a)};jspb.BinaryReader.prototype.readBytes=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.DELIMITED);var a=this.decoder_.readUnsignedVarint32();return this.decoder_.readBytes(a)};
jspb.BinaryReader.prototype.readVarintHash64=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readVarintHash64()};jspb.BinaryReader.prototype.readSintHash64=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readZigzagVarintHash64()};jspb.BinaryReader.prototype.readSplitVarint64=function(a){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readSplitVarint64(a)};
jspb.BinaryReader.prototype.readSplitZigzagVarint64=function(a){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.VARINT);return this.decoder_.readSplitVarint64(function(b,c){return jspb.utils.fromZigzag64(b,c,a)})};jspb.BinaryReader.prototype.readFixedHash64=function(){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED64);return this.decoder_.readFixedHash64()};
jspb.BinaryReader.prototype.readSplitFixed64=function(a){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.FIXED64);return this.decoder_.readSplitFixed64(a)};jspb.BinaryReader.prototype.readPackedField_=function(a){goog.asserts.assert(this.nextWireType_==jspb.BinaryConstants.WireType.DELIMITED);var b=this.decoder_.readUnsignedVarint32();b=this.decoder_.getCursor()+b;for(var c=[];this.decoder_.getCursor()<b;)c.push(a.call(this.decoder_));return c};
jspb.BinaryReader.prototype.readPackedInt32=function(){return this.readPackedField_(this.decoder_.readSignedVarint32)};jspb.BinaryReader.prototype.readPackedInt32String=function(){return this.readPackedField_(this.decoder_.readSignedVarint32String)};jspb.BinaryReader.prototype.readPackedInt64=function(){return this.readPackedField_(this.decoder_.readSignedVarint64)};jspb.BinaryReader.prototype.readPackedInt64String=function(){return this.readPackedField_(this.decoder_.readSignedVarint64String)};
jspb.BinaryReader.prototype.readPackedUint32=function(){return this.readPackedField_(this.decoder_.readUnsignedVarint32)};jspb.BinaryReader.prototype.readPackedUint32String=function(){return this.readPackedField_(this.decoder_.readUnsignedVarint32String)};jspb.BinaryReader.prototype.readPackedUint64=function(){return this.readPackedField_(this.decoder_.readUnsignedVarint64)};jspb.BinaryReader.prototype.readPackedUint64String=function(){return this.readPackedField_(this.decoder_.readUnsignedVarint64String)};
jspb.BinaryReader.prototype.readPackedSint32=function(){return this.readPackedField_(this.decoder_.readZigzagVarint32)};jspb.BinaryReader.prototype.readPackedSint64=function(){return this.readPackedField_(this.decoder_.readZigzagVarint64)};jspb.BinaryReader.prototype.readPackedSint64String=function(){return this.readPackedField_(this.decoder_.readZigzagVarint64String)};jspb.BinaryReader.prototype.readPackedFixed32=function(){return this.readPackedField_(this.decoder_.readUint32)};
jspb.BinaryReader.prototype.readPackedFixed64=function(){return this.readPackedField_(this.decoder_.readUint64)};jspb.BinaryReader.prototype.readPackedFixed64String=function(){return this.readPackedField_(this.decoder_.readUint64String)};jspb.BinaryReader.prototype.readPackedSfixed32=function(){return this.readPackedField_(this.decoder_.readInt32)};jspb.BinaryReader.prototype.readPackedSfixed64=function(){return this.readPackedField_(this.decoder_.readInt64)};
jspb.BinaryReader.prototype.readPackedSfixed64String=function(){return this.readPackedField_(this.decoder_.readInt64String)};jspb.BinaryReader.prototype.readPackedFloat=function(){return this.readPackedField_(this.decoder_.readFloat)};jspb.BinaryReader.prototype.readPackedDouble=function(){return this.readPackedField_(this.decoder_.readDouble)};jspb.BinaryReader.prototype.readPackedBool=function(){return this.readPackedField_(this.decoder_.readBool)};jspb.BinaryReader.prototype.readPackedEnum=function(){return this.readPackedField_(this.decoder_.readEnum)};
jspb.BinaryReader.prototype.readPackedVarintHash64=function(){return this.readPackedField_(this.decoder_.readVarintHash64)};jspb.BinaryReader.prototype.readPackedFixedHash64=function(){return this.readPackedField_(this.decoder_.readFixedHash64)};jspb.Map=function(a,b){this.arr_=a;this.valueCtor_=b;this.map_={};this.arrClean=!0;0<this.arr_.length&&this.loadFromArray_()};jspb.Map.prototype.loadFromArray_=function(){for(var a=0;a<this.arr_.length;a++){var b=this.arr_[a],c=b[0];this.map_[c.toString()]=new jspb.Map.Entry_(c,b[1])}this.arrClean=!0};
jspb.Map.prototype.toArray=function(){if(this.arrClean){if(this.valueCtor_){var a=this.map_,b;for(b in a)if(Object.prototype.hasOwnProperty.call(a,b)){var c=a[b].valueWrapper;c&&c.toArray()}}}else{this.arr_.length=0;a=this.stringKeys_();a.sort();for(b=0;b<a.length;b++){var d=this.map_[a[b]];(c=d.valueWrapper)&&c.toArray();this.arr_.push([d.key,d.value])}this.arrClean=!0}return this.arr_};
jspb.Map.prototype.toObject=function(a,b){for(var c=this.toArray(),d=[],e=0;e<c.length;e++){var f=this.map_[c[e][0].toString()];this.wrapEntry_(f);var g=f.valueWrapper;g?(goog.asserts.assert(b),d.push([f.key,b(a,g)])):d.push([f.key,f.value])}return d};jspb.Map.fromObject=function(a,b,c){b=new jspb.Map([],b);for(var d=0;d<a.length;d++){var e=a[d][0],f=c(a[d][1]);b.set(e,f)}return b};jspb.Map.ArrayIteratorIterable_=function(a){this.idx_=0;this.arr_=a};
jspb.Map.ArrayIteratorIterable_.prototype.next=function(){return this.idx_<this.arr_.length?{done:!1,value:this.arr_[this.idx_++]}:{done:!0,value:void 0}};"undefined"!=typeof Symbol&&(jspb.Map.ArrayIteratorIterable_.prototype[Symbol.iterator]=function(){return this});jspb.Map.prototype.getLength=function(){return this.stringKeys_().length};jspb.Map.prototype.clear=function(){this.map_={};this.arrClean=!1};
jspb.Map.prototype.del=function(a){a=a.toString();var b=this.map_.hasOwnProperty(a);delete this.map_[a];this.arrClean=!1;return b};jspb.Map.prototype.getEntryList=function(){var a=[],b=this.stringKeys_();b.sort();for(var c=0;c<b.length;c++){var d=this.map_[b[c]];a.push([d.key,d.value])}return a};jspb.Map.prototype.entries=function(){var a=[],b=this.stringKeys_();b.sort();for(var c=0;c<b.length;c++){var d=this.map_[b[c]];a.push([d.key,this.wrapEntry_(d)])}return new jspb.Map.ArrayIteratorIterable_(a)};
jspb.Map.prototype.keys=function(){var a=[],b=this.stringKeys_();b.sort();for(var c=0;c<b.length;c++)a.push(this.map_[b[c]].key);return new jspb.Map.ArrayIteratorIterable_(a)};jspb.Map.prototype.values=function(){var a=[],b=this.stringKeys_();b.sort();for(var c=0;c<b.length;c++)a.push(this.wrapEntry_(this.map_[b[c]]));return new jspb.Map.ArrayIteratorIterable_(a)};
jspb.Map.prototype.forEach=function(a,b){var c=this.stringKeys_();c.sort();for(var d=0;d<c.length;d++){var e=this.map_[c[d]];a.call(b,this.wrapEntry_(e),e.key,this)}};jspb.Map.prototype.set=function(a,b){var c=new jspb.Map.Entry_(a);this.valueCtor_?(c.valueWrapper=b,c.value=b.toArray()):c.value=b;this.map_[a.toString()]=c;this.arrClean=!1;return this};jspb.Map.prototype.wrapEntry_=function(a){return this.valueCtor_?(a.valueWrapper||(a.valueWrapper=new this.valueCtor_(a.value)),a.valueWrapper):a.value};
jspb.Map.prototype.get=function(a){if(a=this.map_[a.toString()])return this.wrapEntry_(a)};jspb.Map.prototype.has=function(a){return a.toString()in this.map_};jspb.Map.prototype.serializeBinary=function(a,b,c,d,e){var f=this.stringKeys_();f.sort();for(var g=0;g<f.length;g++){var h=this.map_[f[g]];b.beginSubMessage(a);c.call(b,1,h.key);this.valueCtor_?d.call(b,2,this.wrapEntry_(h),e):d.call(b,2,h.value);b.endSubMessage()}};
jspb.Map.deserializeBinary=function(a,b,c,d,e,f,g){for(;b.nextField()&&!b.isEndGroup();){var h=b.getFieldNumber();1==h?f=c.call(b):2==h&&(a.valueCtor_?(goog.asserts.assert(e),g||(g=new a.valueCtor_),d.call(b,g,e)):g=d.call(b))}goog.asserts.assert(void 0!=f);goog.asserts.assert(void 0!=g);a.set(f,g)};jspb.Map.prototype.stringKeys_=function(){var a=this.map_,b=[],c;for(c in a)Object.prototype.hasOwnProperty.call(a,c)&&b.push(c);return b};
jspb.Map.Entry_=function(a,b){this.key=a;this.value=b;this.valueWrapper=void 0};jspb.ExtensionFieldInfo=function(a,b,c,d,e){this.fieldIndex=a;this.fieldName=b;this.ctor=c;this.toObjectFn=d;this.isRepeated=e};jspb.ExtensionFieldBinaryInfo=function(a,b,c,d,e,f){this.fieldInfo=a;this.binaryReaderFn=b;this.binaryWriterFn=c;this.binaryMessageSerializeFn=d;this.binaryMessageDeserializeFn=e;this.isPacked=f};jspb.ExtensionFieldInfo.prototype.isMessageType=function(){return!!this.ctor};jspb.Message=function(){};jspb.Message.GENERATE_TO_OBJECT=!0;jspb.Message.GENERATE_FROM_OBJECT=!goog.DISALLOW_TEST_ONLY_CODE;
jspb.Message.GENERATE_TO_STRING=!0;jspb.Message.ASSUME_LOCAL_ARRAYS=!1;jspb.Message.SERIALIZE_EMPTY_TRAILING_FIELDS=!0;jspb.Message.SUPPORTS_UINT8ARRAY_="function"==typeof Uint8Array;jspb.Message.prototype.getJsPbMessageId=function(){return this.messageId_};jspb.Message.getIndex_=function(a,b){return b+a.arrayIndexOffset_};jspb.Message.hiddenES6Property_=function(){};jspb.Message.getFieldNumber_=function(a,b){return b-a.arrayIndexOffset_};
jspb.Message.initialize=function(a,b,c,d,e,f){a.wrappers_=null;b||(b=c?[c]:[]);a.messageId_=c?String(c):void 0;a.arrayIndexOffset_=0===c?-1:0;a.array=b;jspb.Message.initPivotAndExtensionObject_(a,d);a.convertedPrimitiveFields_={};jspb.Message.SERIALIZE_EMPTY_TRAILING_FIELDS||(a.repeatedFields=e);if(e)for(b=0;b<e.length;b++)c=e[b],c<a.pivot_?(c=jspb.Message.getIndex_(a,c),a.array[c]=a.array[c]||jspb.Message.EMPTY_LIST_SENTINEL_):(jspb.Message.maybeInitEmptyExtensionObject_(a),a.extensionObject_[c]=
a.extensionObject_[c]||jspb.Message.EMPTY_LIST_SENTINEL_);if(f&&f.length)for(b=0;b<f.length;b++)jspb.Message.computeOneofCase(a,f[b])};jspb.Message.EMPTY_LIST_SENTINEL_=goog.DEBUG&&Object.freeze?Object.freeze([]):[];jspb.Message.isArray_=function(a){return jspb.Message.ASSUME_LOCAL_ARRAYS?a instanceof Array:goog.isArray(a)};jspb.Message.isExtensionObject_=function(a){return null!==a&&"object"==typeof a&&!jspb.Message.isArray_(a)&&!(jspb.Message.SUPPORTS_UINT8ARRAY_&&a instanceof Uint8Array)};
jspb.Message.initPivotAndExtensionObject_=function(a,b){var c=a.array.length,d=-1;if(c&&(d=c-1,c=a.array[d],jspb.Message.isExtensionObject_(c))){a.pivot_=jspb.Message.getFieldNumber_(a,d);a.extensionObject_=c;return}-1<b?(a.pivot_=Math.max(b,jspb.Message.getFieldNumber_(a,d+1)),a.extensionObject_=null):a.pivot_=Number.MAX_VALUE};jspb.Message.maybeInitEmptyExtensionObject_=function(a){var b=jspb.Message.getIndex_(a,a.pivot_);a.array[b]||(a.extensionObject_=a.array[b]={})};
jspb.Message.toObjectList=function(a,b,c){for(var d=[],e=0;e<a.length;e++)d[e]=b.call(a[e],c,a[e]);return d};jspb.Message.toObjectExtension=function(a,b,c,d,e){for(var f in c){var g=c[f],h=d.call(a,g);if(null!=h){for(var k in g.fieldName)if(g.fieldName.hasOwnProperty(k))break;b[k]=g.toObjectFn?g.isRepeated?jspb.Message.toObjectList(h,g.toObjectFn,e):g.toObjectFn(e,h):h}}};
jspb.Message.serializeBinaryExtensions=function(a,b,c,d){for(var e in c){var f=c[e],g=f.fieldInfo;if(!f.binaryWriterFn)throw Error("Message extension present that was generated without binary serialization support");var h=d.call(a,g);if(null!=h)if(g.isMessageType())if(f.binaryMessageSerializeFn)f.binaryWriterFn.call(b,g.fieldIndex,h,f.binaryMessageSerializeFn);else throw Error("Message extension present holding submessage without binary support enabled, and message is being serialized to binary format");
else f.binaryWriterFn.call(b,g.fieldIndex,h)}};jspb.Message.readBinaryExtension=function(a,b,c,d,e){var f=c[b.getFieldNumber()];if(f){c=f.fieldInfo;if(!f.binaryReaderFn)throw Error("Deserializing extension whose generated code does not support binary format");if(c.isMessageType()){var g=new c.ctor;f.binaryReaderFn.call(b,g,f.binaryMessageDeserializeFn)}else g=f.binaryReaderFn.call(b);c.isRepeated&&!f.isPacked?(b=d.call(a,c))?b.push(g):e.call(a,c,[g]):e.call(a,c,g)}else b.skipField()};
jspb.Message.getField=function(a,b){if(b<a.pivot_){b=jspb.Message.getIndex_(a,b);var c=a.array[b];return c===jspb.Message.EMPTY_LIST_SENTINEL_?a.array[b]=[]:c}if(a.extensionObject_)return c=a.extensionObject_[b],c===jspb.Message.EMPTY_LIST_SENTINEL_?a.extensionObject_[b]=[]:c};jspb.Message.getRepeatedField=function(a,b){return jspb.Message.getField(a,b)};jspb.Message.getOptionalFloatingPointField=function(a,b){a=jspb.Message.getField(a,b);return null==a?a:+a};
jspb.Message.getBooleanField=function(a,b){a=jspb.Message.getField(a,b);return null==a?a:!!a};jspb.Message.getRepeatedFloatingPointField=function(a,b){var c=jspb.Message.getRepeatedField(a,b);a.convertedPrimitiveFields_||(a.convertedPrimitiveFields_={});if(!a.convertedPrimitiveFields_[b]){for(var d=0;d<c.length;d++)c[d]=+c[d];a.convertedPrimitiveFields_[b]=!0}return c};
jspb.Message.getRepeatedBooleanField=function(a,b){var c=jspb.Message.getRepeatedField(a,b);a.convertedPrimitiveFields_||(a.convertedPrimitiveFields_={});if(!a.convertedPrimitiveFields_[b]){for(var d=0;d<c.length;d++)c[d]=!!c[d];a.convertedPrimitiveFields_[b]=!0}return c};
jspb.Message.bytesAsB64=function(a){if(null==a||"string"===typeof a)return a;if(jspb.Message.SUPPORTS_UINT8ARRAY_&&a instanceof Uint8Array)return goog.crypt.base64.encodeByteArray(a);goog.asserts.fail("Cannot coerce to b64 string: "+goog.typeOf(a));return null};jspb.Message.bytesAsU8=function(a){if(null==a||a instanceof Uint8Array)return a;if("string"===typeof a)return goog.crypt.base64.decodeStringToUint8Array(a);goog.asserts.fail("Cannot coerce to Uint8Array: "+goog.typeOf(a));return null};
jspb.Message.bytesListAsB64=function(a){jspb.Message.assertConsistentTypes_(a);return a.length&&"string"!==typeof a[0]?goog.array.map(a,jspb.Message.bytesAsB64):a};jspb.Message.bytesListAsU8=function(a){jspb.Message.assertConsistentTypes_(a);return!a.length||a[0]instanceof Uint8Array?a:goog.array.map(a,jspb.Message.bytesAsU8)};
jspb.Message.assertConsistentTypes_=function(a){if(goog.DEBUG&&a&&1<a.length){var b=goog.typeOf(a[0]);goog.array.forEach(a,function(a){goog.typeOf(a)!=b&&goog.asserts.fail("Inconsistent type in JSPB repeated field array. Got "+goog.typeOf(a)+" expected "+b)})}};jspb.Message.getFieldWithDefault=function(a,b,c){a=jspb.Message.getField(a,b);return null==a?c:a};jspb.Message.getBooleanFieldWithDefault=function(a,b,c){a=jspb.Message.getBooleanField(a,b);return null==a?c:a};
jspb.Message.getFloatingPointFieldWithDefault=function(a,b,c){a=jspb.Message.getOptionalFloatingPointField(a,b);return null==a?c:a};jspb.Message.getFieldProto3=jspb.Message.getFieldWithDefault;jspb.Message.getMapField=function(a,b,c,d){a.wrappers_||(a.wrappers_={});if(b in a.wrappers_)return a.wrappers_[b];var e=jspb.Message.getField(a,b);if(!e){if(c)return;e=[];jspb.Message.setField(a,b,e)}return a.wrappers_[b]=new jspb.Map(e,d)};
jspb.Message.setField=function(a,b,c){goog.asserts.assertInstanceof(a,jspb.Message);b<a.pivot_?a.array[jspb.Message.getIndex_(a,b)]=c:(jspb.Message.maybeInitEmptyExtensionObject_(a),a.extensionObject_[b]=c);return a};jspb.Message.setProto3IntField=function(a,b,c){return jspb.Message.setFieldIgnoringDefault_(a,b,c,0)};jspb.Message.setProto3FloatField=function(a,b,c){return jspb.Message.setFieldIgnoringDefault_(a,b,c,0)};
jspb.Message.setProto3BooleanField=function(a,b,c){return jspb.Message.setFieldIgnoringDefault_(a,b,c,!1)};jspb.Message.setProto3StringField=function(a,b,c){return jspb.Message.setFieldIgnoringDefault_(a,b,c,"")};jspb.Message.setProto3BytesField=function(a,b,c){return jspb.Message.setFieldIgnoringDefault_(a,b,c,"")};jspb.Message.setProto3EnumField=function(a,b,c){return jspb.Message.setFieldIgnoringDefault_(a,b,c,0)};
jspb.Message.setProto3StringIntField=function(a,b,c){return jspb.Message.setFieldIgnoringDefault_(a,b,c,"0")};jspb.Message.setFieldIgnoringDefault_=function(a,b,c,d){goog.asserts.assertInstanceof(a,jspb.Message);c!==d?jspb.Message.setField(a,b,c):a.array[jspb.Message.getIndex_(a,b)]=null;return a};jspb.Message.addToRepeatedField=function(a,b,c,d){goog.asserts.assertInstanceof(a,jspb.Message);b=jspb.Message.getRepeatedField(a,b);void 0!=d?b.splice(d,0,c):b.push(c);return a};
jspb.Message.setOneofField=function(a,b,c,d){goog.asserts.assertInstanceof(a,jspb.Message);(c=jspb.Message.computeOneofCase(a,c))&&c!==b&&void 0!==d&&(a.wrappers_&&c in a.wrappers_&&(a.wrappers_[c]=void 0),jspb.Message.setField(a,c,void 0));return jspb.Message.setField(a,b,d)};jspb.Message.computeOneofCase=function(a,b){for(var c,d,e=0;e<b.length;e++){var f=b[e],g=jspb.Message.getField(a,f);null!=g&&(c=f,d=g,jspb.Message.setField(a,f,void 0))}return c?(jspb.Message.setField(a,c,d),c):0};
jspb.Message.getWrapperField=function(a,b,c,d){a.wrappers_||(a.wrappers_={});if(!a.wrappers_[c]){var e=jspb.Message.getField(a,c);if(d||e)a.wrappers_[c]=new b(e)}return a.wrappers_[c]};jspb.Message.getRepeatedWrapperField=function(a,b,c){jspb.Message.wrapRepeatedField_(a,b,c);b=a.wrappers_[c];b==jspb.Message.EMPTY_LIST_SENTINEL_&&(b=a.wrappers_[c]=[]);return b};
jspb.Message.wrapRepeatedField_=function(a,b,c){a.wrappers_||(a.wrappers_={});if(!a.wrappers_[c]){for(var d=jspb.Message.getRepeatedField(a,c),e=[],f=0;f<d.length;f++)e[f]=new b(d[f]);a.wrappers_[c]=e}};jspb.Message.setWrapperField=function(a,b,c){goog.asserts.assertInstanceof(a,jspb.Message);a.wrappers_||(a.wrappers_={});var d=c?c.toArray():c;a.wrappers_[b]=c;return jspb.Message.setField(a,b,d)};
jspb.Message.setOneofWrapperField=function(a,b,c,d){goog.asserts.assertInstanceof(a,jspb.Message);a.wrappers_||(a.wrappers_={});var e=d?d.toArray():d;a.wrappers_[b]=d;return jspb.Message.setOneofField(a,b,c,e)};jspb.Message.setRepeatedWrapperField=function(a,b,c){goog.asserts.assertInstanceof(a,jspb.Message);a.wrappers_||(a.wrappers_={});c=c||[];for(var d=[],e=0;e<c.length;e++)d[e]=c[e].toArray();a.wrappers_[b]=c;return jspb.Message.setField(a,b,d)};
jspb.Message.addToRepeatedWrapperField=function(a,b,c,d,e){jspb.Message.wrapRepeatedField_(a,d,b);var f=a.wrappers_[b];f||(f=a.wrappers_[b]=[]);c=c?c:new d;a=jspb.Message.getRepeatedField(a,b);void 0!=e?(f.splice(e,0,c),a.splice(e,0,c.toArray())):(f.push(c),a.push(c.toArray()));return c};jspb.Message.toMap=function(a,b,c,d){for(var e={},f=0;f<a.length;f++)e[b.call(a[f])]=c?c.call(a[f],d,a[f]):a[f];return e};
jspb.Message.prototype.syncMapFields_=function(){if(this.wrappers_)for(var a in this.wrappers_){var b=this.wrappers_[a];if(goog.isArray(b))for(var c=0;c<b.length;c++)b[c]&&b[c].toArray();else b&&b.toArray()}};jspb.Message.prototype.toArray=function(){this.syncMapFields_();return this.array};jspb.Message.GENERATE_TO_STRING&&(jspb.Message.prototype.toString=function(){this.syncMapFields_();return this.array.toString()});
jspb.Message.prototype.getExtension=function(a){if(this.extensionObject_){this.wrappers_||(this.wrappers_={});var b=a.fieldIndex;if(a.isRepeated){if(a.isMessageType())return this.wrappers_[b]||(this.wrappers_[b]=goog.array.map(this.extensionObject_[b]||[],function(b){return new a.ctor(b)})),this.wrappers_[b]}else if(a.isMessageType())return!this.wrappers_[b]&&this.extensionObject_[b]&&(this.wrappers_[b]=new a.ctor(this.extensionObject_[b])),this.wrappers_[b];return this.extensionObject_[b]}};
jspb.Message.prototype.setExtension=function(a,b){this.wrappers_||(this.wrappers_={});jspb.Message.maybeInitEmptyExtensionObject_(this);var c=a.fieldIndex;a.isRepeated?(b=b||[],a.isMessageType()?(this.wrappers_[c]=b,this.extensionObject_[c]=goog.array.map(b,function(a){return a.toArray()})):this.extensionObject_[c]=b):a.isMessageType()?(this.wrappers_[c]=b,this.extensionObject_[c]=b?b.toArray():b):this.extensionObject_[c]=b;return this};
jspb.Message.difference=function(a,b){if(!(a instanceof b.constructor))throw Error("Messages have different types.");var c=a.toArray();b=b.toArray();var d=[],e=0,f=c.length>b.length?c.length:b.length;a.getJsPbMessageId()&&(d[0]=a.getJsPbMessageId(),e=1);for(;e<f;e++)jspb.Message.compareFields(c[e],b[e])||(d[e]=b[e]);return new a.constructor(d)};jspb.Message.equals=function(a,b){return a==b||!(!a||!b)&&a instanceof b.constructor&&jspb.Message.compareFields(a.toArray(),b.toArray())};
jspb.Message.compareExtensions=function(a,b){a=a||{};b=b||{};var c={},d;for(d in a)c[d]=0;for(d in b)c[d]=0;for(d in c)if(!jspb.Message.compareFields(a[d],b[d]))return!1;return!0};
jspb.Message.compareFields=function(a,b){if(a==b)return!0;if(!goog.isObject(a)||!goog.isObject(b))return"number"===typeof a&&isNaN(a)||"number"===typeof b&&isNaN(b)?String(a)==String(b):!1;if(a.constructor!=b.constructor)return!1;if(jspb.Message.SUPPORTS_UINT8ARRAY_&&a.constructor===Uint8Array){if(a.length!=b.length)return!1;for(var c=0;c<a.length;c++)if(a[c]!=b[c])return!1;return!0}if(a.constructor===Array){var d=void 0,e=void 0,f=Math.max(a.length,b.length);for(c=0;c<f;c++){var g=a[c],h=b[c];g&&
g.constructor==Object&&(goog.asserts.assert(void 0===d),goog.asserts.assert(c===a.length-1),d=g,g=void 0);h&&h.constructor==Object&&(goog.asserts.assert(void 0===e),goog.asserts.assert(c===b.length-1),e=h,h=void 0);if(!jspb.Message.compareFields(g,h))return!1}return d||e?(d=d||{},e=e||{},jspb.Message.compareExtensions(d,e)):!0}if(a.constructor===Object)return jspb.Message.compareExtensions(a,b);throw Error("Invalid type in JSPB array");};jspb.Message.prototype.cloneMessage=function(){return jspb.Message.cloneMessage(this)};
jspb.Message.prototype.clone=function(){return jspb.Message.cloneMessage(this)};jspb.Message.clone=function(a){return jspb.Message.cloneMessage(a)};jspb.Message.cloneMessage=function(a){return new a.constructor(jspb.Message.clone_(a.toArray()))};
jspb.Message.copyInto=function(a,b){goog.asserts.assertInstanceof(a,jspb.Message);goog.asserts.assertInstanceof(b,jspb.Message);goog.asserts.assert(a.constructor==b.constructor,"Copy source and target message should have the same type.");a=jspb.Message.clone(a);for(var c=b.toArray(),d=a.toArray(),e=c.length=0;e<d.length;e++)c[e]=d[e];b.wrappers_=a.wrappers_;b.extensionObject_=a.extensionObject_};
jspb.Message.clone_=function(a){if(goog.isArray(a)){for(var b=Array(a.length),c=0;c<a.length;c++){var d=a[c];null!=d&&(b[c]="object"==typeof d?jspb.Message.clone_(goog.asserts.assert(d)):d)}return b}if(jspb.Message.SUPPORTS_UINT8ARRAY_&&a instanceof Uint8Array)return new Uint8Array(a);b={};for(c in a)d=a[c],null!=d&&(b[c]="object"==typeof d?jspb.Message.clone_(goog.asserts.assert(d)):d);return b};jspb.Message.registerMessageType=function(a,b){b.messageId=a};jspb.Message.messageSetExtensions={};
jspb.Message.messageSetExtensionsBinary={};jspb.arith={};jspb.arith.UInt64=function(a,b){this.lo=a;this.hi=b};jspb.arith.UInt64.prototype.cmp=function(a){return this.hi<a.hi||this.hi==a.hi&&this.lo<a.lo?-1:this.hi==a.hi&&this.lo==a.lo?0:1};jspb.arith.UInt64.prototype.rightShift=function(){return new jspb.arith.UInt64((this.lo>>>1|(this.hi&1)<<31)>>>0,this.hi>>>1>>>0)};jspb.arith.UInt64.prototype.leftShift=function(){return new jspb.arith.UInt64(this.lo<<1>>>0,(this.hi<<1|this.lo>>>31)>>>0)};
jspb.arith.UInt64.prototype.msb=function(){return!!(this.hi&2147483648)};jspb.arith.UInt64.prototype.lsb=function(){return!!(this.lo&1)};jspb.arith.UInt64.prototype.zero=function(){return 0==this.lo&&0==this.hi};jspb.arith.UInt64.prototype.add=function(a){return new jspb.arith.UInt64((this.lo+a.lo&4294967295)>>>0>>>0,((this.hi+a.hi&4294967295)>>>0)+(4294967296<=this.lo+a.lo?1:0)>>>0)};
jspb.arith.UInt64.prototype.sub=function(a){return new jspb.arith.UInt64((this.lo-a.lo&4294967295)>>>0>>>0,((this.hi-a.hi&4294967295)>>>0)-(0>this.lo-a.lo?1:0)>>>0)};jspb.arith.UInt64.mul32x32=function(a,b){var c=a&65535;a>>>=16;var d=b&65535,e=b>>>16;b=c*d+65536*(c*e&65535)+65536*(a*d&65535);for(c=a*e+(c*e>>>16)+(a*d>>>16);4294967296<=b;)b-=4294967296,c+=1;return new jspb.arith.UInt64(b>>>0,c>>>0)};
jspb.arith.UInt64.prototype.mul=function(a){var b=jspb.arith.UInt64.mul32x32(this.lo,a);a=jspb.arith.UInt64.mul32x32(this.hi,a);a.hi=a.lo;a.lo=0;return b.add(a)};
jspb.arith.UInt64.prototype.div=function(a){if(0==a)return[];var b=new jspb.arith.UInt64(0,0),c=new jspb.arith.UInt64(this.lo,this.hi);a=new jspb.arith.UInt64(a,0);for(var d=new jspb.arith.UInt64(1,0);!a.msb();)a=a.leftShift(),d=d.leftShift();for(;!d.zero();)0>=a.cmp(c)&&(b=b.add(d),c=c.sub(a)),a=a.rightShift(),d=d.rightShift();return[b,c]};jspb.arith.UInt64.prototype.toString=function(){for(var a="",b=this;!b.zero();){b=b.div(10);var c=b[0];a=b[1].lo+a;b=c}""==a&&(a="0");return a};
jspb.arith.UInt64.fromString=function(a){for(var b=new jspb.arith.UInt64(0,0),c=new jspb.arith.UInt64(0,0),d=0;d<a.length;d++){if("0">a[d]||"9"<a[d])return null;var e=parseInt(a[d],10);c.lo=e;b=b.mul(10).add(c)}return b};jspb.arith.UInt64.prototype.clone=function(){return new jspb.arith.UInt64(this.lo,this.hi)};jspb.arith.Int64=function(a,b){this.lo=a;this.hi=b};
jspb.arith.Int64.prototype.add=function(a){return new jspb.arith.Int64((this.lo+a.lo&4294967295)>>>0>>>0,((this.hi+a.hi&4294967295)>>>0)+(4294967296<=this.lo+a.lo?1:0)>>>0)};jspb.arith.Int64.prototype.sub=function(a){return new jspb.arith.Int64((this.lo-a.lo&4294967295)>>>0>>>0,((this.hi-a.hi&4294967295)>>>0)-(0>this.lo-a.lo?1:0)>>>0)};jspb.arith.Int64.prototype.clone=function(){return new jspb.arith.Int64(this.lo,this.hi)};
jspb.arith.Int64.prototype.toString=function(){var a=0!=(this.hi&2147483648),b=new jspb.arith.UInt64(this.lo,this.hi);a&&(b=(new jspb.arith.UInt64(0,0)).sub(b));return(a?"-":"")+b.toString()};jspb.arith.Int64.fromString=function(a){var b=0<a.length&&"-"==a[0];b&&(a=a.substring(1));a=jspb.arith.UInt64.fromString(a);if(null===a)return null;b&&(a=(new jspb.arith.UInt64(0,0)).sub(a));return new jspb.arith.Int64(a.lo,a.hi)};jspb.BinaryEncoder=function(){this.buffer_=[]};jspb.BinaryEncoder.prototype.length=function(){return this.buffer_.length};jspb.BinaryEncoder.prototype.end=function(){var a=this.buffer_;this.buffer_=[];return a};
jspb.BinaryEncoder.prototype.writeSplitVarint64=function(a,b){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(b==Math.floor(b));goog.asserts.assert(0<=a&&a<jspb.BinaryConstants.TWO_TO_32);for(goog.asserts.assert(0<=b&&b<jspb.BinaryConstants.TWO_TO_32);0<b||127<a;)this.buffer_.push(a&127|128),a=(a>>>7|b<<25)>>>0,b>>>=7;this.buffer_.push(a)};
jspb.BinaryEncoder.prototype.writeSplitFixed64=function(a,b){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(b==Math.floor(b));goog.asserts.assert(0<=a&&a<jspb.BinaryConstants.TWO_TO_32);goog.asserts.assert(0<=b&&b<jspb.BinaryConstants.TWO_TO_32);this.writeUint32(a);this.writeUint32(b)};
jspb.BinaryEncoder.prototype.writeUnsignedVarint32=function(a){goog.asserts.assert(a==Math.floor(a));for(goog.asserts.assert(0<=a&&a<jspb.BinaryConstants.TWO_TO_32);127<a;)this.buffer_.push(a&127|128),a>>>=7;this.buffer_.push(a)};
jspb.BinaryEncoder.prototype.writeSignedVarint32=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(a>=-jspb.BinaryConstants.TWO_TO_31&&a<jspb.BinaryConstants.TWO_TO_31);if(0<=a)this.writeUnsignedVarint32(a);else{for(var b=0;9>b;b++)this.buffer_.push(a&127|128),a>>=7;this.buffer_.push(1)}};
jspb.BinaryEncoder.prototype.writeUnsignedVarint64=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(0<=a&&a<jspb.BinaryConstants.TWO_TO_64);jspb.utils.splitInt64(a);this.writeSplitVarint64(jspb.utils.split64Low,jspb.utils.split64High)};
jspb.BinaryEncoder.prototype.writeSignedVarint64=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(a>=-jspb.BinaryConstants.TWO_TO_63&&a<jspb.BinaryConstants.TWO_TO_63);jspb.utils.splitInt64(a);this.writeSplitVarint64(jspb.utils.split64Low,jspb.utils.split64High)};
jspb.BinaryEncoder.prototype.writeZigzagVarint32=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(a>=-jspb.BinaryConstants.TWO_TO_31&&a<jspb.BinaryConstants.TWO_TO_31);this.writeUnsignedVarint32((a<<1^a>>31)>>>0)};jspb.BinaryEncoder.prototype.writeZigzagVarint64=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(a>=-jspb.BinaryConstants.TWO_TO_63&&a<jspb.BinaryConstants.TWO_TO_63);jspb.utils.splitZigzag64(a);this.writeSplitVarint64(jspb.utils.split64Low,jspb.utils.split64High)};
jspb.BinaryEncoder.prototype.writeZigzagVarint64String=function(a){this.writeZigzagVarintHash64(jspb.utils.decimalStringToHash64(a))};jspb.BinaryEncoder.prototype.writeZigzagVarintHash64=function(a){var b=this;jspb.utils.splitHash64(a);jspb.utils.toZigzag64(jspb.utils.split64Low,jspb.utils.split64High,function(a,d){b.writeSplitVarint64(a>>>0,d>>>0)})};
jspb.BinaryEncoder.prototype.writeUint8=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(0<=a&&256>a);this.buffer_.push(a>>>0&255)};jspb.BinaryEncoder.prototype.writeUint16=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(0<=a&&65536>a);this.buffer_.push(a>>>0&255);this.buffer_.push(a>>>8&255)};
jspb.BinaryEncoder.prototype.writeUint32=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(0<=a&&a<jspb.BinaryConstants.TWO_TO_32);this.buffer_.push(a>>>0&255);this.buffer_.push(a>>>8&255);this.buffer_.push(a>>>16&255);this.buffer_.push(a>>>24&255)};jspb.BinaryEncoder.prototype.writeUint64=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(0<=a&&a<jspb.BinaryConstants.TWO_TO_64);jspb.utils.splitUint64(a);this.writeUint32(jspb.utils.split64Low);this.writeUint32(jspb.utils.split64High)};
jspb.BinaryEncoder.prototype.writeInt8=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(-128<=a&&128>a);this.buffer_.push(a>>>0&255)};jspb.BinaryEncoder.prototype.writeInt16=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(-32768<=a&&32768>a);this.buffer_.push(a>>>0&255);this.buffer_.push(a>>>8&255)};
jspb.BinaryEncoder.prototype.writeInt32=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(a>=-jspb.BinaryConstants.TWO_TO_31&&a<jspb.BinaryConstants.TWO_TO_31);this.buffer_.push(a>>>0&255);this.buffer_.push(a>>>8&255);this.buffer_.push(a>>>16&255);this.buffer_.push(a>>>24&255)};
jspb.BinaryEncoder.prototype.writeInt64=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(a>=-jspb.BinaryConstants.TWO_TO_63&&a<jspb.BinaryConstants.TWO_TO_63);jspb.utils.splitInt64(a);this.writeSplitFixed64(jspb.utils.split64Low,jspb.utils.split64High)};
jspb.BinaryEncoder.prototype.writeInt64String=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(+a>=-jspb.BinaryConstants.TWO_TO_63&&+a<jspb.BinaryConstants.TWO_TO_63);jspb.utils.splitHash64(jspb.utils.decimalStringToHash64(a));this.writeSplitFixed64(jspb.utils.split64Low,jspb.utils.split64High)};
jspb.BinaryEncoder.prototype.writeFloat=function(a){goog.asserts.assert(Infinity===a||-Infinity===a||isNaN(a)||a>=-jspb.BinaryConstants.FLOAT32_MAX&&a<=jspb.BinaryConstants.FLOAT32_MAX);jspb.utils.splitFloat32(a);this.writeUint32(jspb.utils.split64Low)};
jspb.BinaryEncoder.prototype.writeDouble=function(a){goog.asserts.assert(Infinity===a||-Infinity===a||isNaN(a)||a>=-jspb.BinaryConstants.FLOAT64_MAX&&a<=jspb.BinaryConstants.FLOAT64_MAX);jspb.utils.splitFloat64(a);this.writeUint32(jspb.utils.split64Low);this.writeUint32(jspb.utils.split64High)};jspb.BinaryEncoder.prototype.writeBool=function(a){goog.asserts.assert("boolean"===typeof a||"number"===typeof a);this.buffer_.push(a?1:0)};
jspb.BinaryEncoder.prototype.writeEnum=function(a){goog.asserts.assert(a==Math.floor(a));goog.asserts.assert(a>=-jspb.BinaryConstants.TWO_TO_31&&a<jspb.BinaryConstants.TWO_TO_31);this.writeSignedVarint32(a)};jspb.BinaryEncoder.prototype.writeBytes=function(a){this.buffer_.push.apply(this.buffer_,a)};jspb.BinaryEncoder.prototype.writeVarintHash64=function(a){jspb.utils.splitHash64(a);this.writeSplitVarint64(jspb.utils.split64Low,jspb.utils.split64High)};
jspb.BinaryEncoder.prototype.writeFixedHash64=function(a){jspb.utils.splitHash64(a);this.writeUint32(jspb.utils.split64Low);this.writeUint32(jspb.utils.split64High)};
jspb.BinaryEncoder.prototype.writeString=function(a){for(var b=this.buffer_.length,c=0;c<a.length;c++){var d=a.charCodeAt(c);if(128>d)this.buffer_.push(d);else if(2048>d)this.buffer_.push(d>>6|192),this.buffer_.push(d&63|128);else if(65536>d)if(55296<=d&&56319>=d&&c+1<a.length){var e=a.charCodeAt(c+1);56320<=e&&57343>=e&&(d=1024*(d-55296)+e-56320+65536,this.buffer_.push(d>>18|240),this.buffer_.push(d>>12&63|128),this.buffer_.push(d>>6&63|128),this.buffer_.push(d&63|128),c++)}else this.buffer_.push(d>>
12|224),this.buffer_.push(d>>6&63|128),this.buffer_.push(d&63|128)}return this.buffer_.length-b};jspb.BinaryWriter=function(){this.blocks_=[];this.totalLength_=0;this.encoder_=new jspb.BinaryEncoder;this.bookmarks_=[]};jspb.BinaryWriter.prototype.appendUint8Array_=function(a){var b=this.encoder_.end();this.blocks_.push(b);this.blocks_.push(a);this.totalLength_+=b.length+a.length};
jspb.BinaryWriter.prototype.beginDelimited_=function(a){this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED);a=this.encoder_.end();this.blocks_.push(a);this.totalLength_+=a.length;a.push(this.totalLength_);return a};jspb.BinaryWriter.prototype.endDelimited_=function(a){var b=a.pop();b=this.totalLength_+this.encoder_.length()-b;for(goog.asserts.assert(0<=b);127<b;)a.push(b&127|128),b>>>=7,this.totalLength_++;a.push(b);this.totalLength_++};
jspb.BinaryWriter.prototype.writeSerializedMessage=function(a,b,c){this.appendUint8Array_(a.subarray(b,c))};jspb.BinaryWriter.prototype.maybeWriteSerializedMessage=function(a,b,c){null!=a&&null!=b&&null!=c&&this.writeSerializedMessage(a,b,c)};jspb.BinaryWriter.prototype.reset=function(){this.blocks_=[];this.encoder_.end();this.totalLength_=0;this.bookmarks_=[]};
jspb.BinaryWriter.prototype.getResultBuffer=function(){goog.asserts.assert(0==this.bookmarks_.length);for(var a=new Uint8Array(this.totalLength_+this.encoder_.length()),b=this.blocks_,c=b.length,d=0,e=0;e<c;e++){var f=b[e];a.set(f,d);d+=f.length}b=this.encoder_.end();a.set(b,d);d+=b.length;goog.asserts.assert(d==a.length);this.blocks_=[a];return a};jspb.BinaryWriter.prototype.getResultBase64String=function(a){return goog.crypt.base64.encodeByteArray(this.getResultBuffer(),a)};
jspb.BinaryWriter.prototype.beginSubMessage=function(a){this.bookmarks_.push(this.beginDelimited_(a))};jspb.BinaryWriter.prototype.endSubMessage=function(){goog.asserts.assert(0<=this.bookmarks_.length);this.endDelimited_(this.bookmarks_.pop())};jspb.BinaryWriter.prototype.writeFieldHeader_=function(a,b){goog.asserts.assert(1<=a&&a==Math.floor(a));this.encoder_.writeUnsignedVarint32(8*a+b)};
jspb.BinaryWriter.prototype.writeAny=function(a,b,c){var d=jspb.BinaryConstants.FieldType;switch(a){case d.DOUBLE:this.writeDouble(b,c);break;case d.FLOAT:this.writeFloat(b,c);break;case d.INT64:this.writeInt64(b,c);break;case d.UINT64:this.writeUint64(b,c);break;case d.INT32:this.writeInt32(b,c);break;case d.FIXED64:this.writeFixed64(b,c);break;case d.FIXED32:this.writeFixed32(b,c);break;case d.BOOL:this.writeBool(b,c);break;case d.STRING:this.writeString(b,c);break;case d.GROUP:goog.asserts.fail("Group field type not supported in writeAny()");
break;case d.MESSAGE:goog.asserts.fail("Message field type not supported in writeAny()");break;case d.BYTES:this.writeBytes(b,c);break;case d.UINT32:this.writeUint32(b,c);break;case d.ENUM:this.writeEnum(b,c);break;case d.SFIXED32:this.writeSfixed32(b,c);break;case d.SFIXED64:this.writeSfixed64(b,c);break;case d.SINT32:this.writeSint32(b,c);break;case d.SINT64:this.writeSint64(b,c);break;case d.FHASH64:this.writeFixedHash64(b,c);break;case d.VHASH64:this.writeVarintHash64(b,c);break;default:goog.asserts.fail("Invalid field type in writeAny()")}};
jspb.BinaryWriter.prototype.writeUnsignedVarint32_=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeUnsignedVarint32(b))};jspb.BinaryWriter.prototype.writeSignedVarint32_=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeSignedVarint32(b))};jspb.BinaryWriter.prototype.writeUnsignedVarint64_=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeUnsignedVarint64(b))};
jspb.BinaryWriter.prototype.writeSignedVarint64_=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeSignedVarint64(b))};jspb.BinaryWriter.prototype.writeZigzagVarint32_=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeZigzagVarint32(b))};jspb.BinaryWriter.prototype.writeZigzagVarint64_=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeZigzagVarint64(b))};
jspb.BinaryWriter.prototype.writeZigzagVarint64String_=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeZigzagVarint64String(b))};jspb.BinaryWriter.prototype.writeZigzagVarintHash64_=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeZigzagVarintHash64(b))};
jspb.BinaryWriter.prototype.writeInt32=function(a,b){null!=b&&(goog.asserts.assert(b>=-jspb.BinaryConstants.TWO_TO_31&&b<jspb.BinaryConstants.TWO_TO_31),this.writeSignedVarint32_(a,b))};jspb.BinaryWriter.prototype.writeInt32String=function(a,b){null!=b&&(b=parseInt(b,10),goog.asserts.assert(b>=-jspb.BinaryConstants.TWO_TO_31&&b<jspb.BinaryConstants.TWO_TO_31),this.writeSignedVarint32_(a,b))};
jspb.BinaryWriter.prototype.writeInt64=function(a,b){null!=b&&(goog.asserts.assert(b>=-jspb.BinaryConstants.TWO_TO_63&&b<jspb.BinaryConstants.TWO_TO_63),this.writeSignedVarint64_(a,b))};jspb.BinaryWriter.prototype.writeInt64String=function(a,b){null!=b&&(b=jspb.arith.Int64.fromString(b),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeSplitVarint64(b.lo,b.hi))};
jspb.BinaryWriter.prototype.writeUint32=function(a,b){null!=b&&(goog.asserts.assert(0<=b&&b<jspb.BinaryConstants.TWO_TO_32),this.writeUnsignedVarint32_(a,b))};jspb.BinaryWriter.prototype.writeUint32String=function(a,b){null!=b&&(b=parseInt(b,10),goog.asserts.assert(0<=b&&b<jspb.BinaryConstants.TWO_TO_32),this.writeUnsignedVarint32_(a,b))};jspb.BinaryWriter.prototype.writeUint64=function(a,b){null!=b&&(goog.asserts.assert(0<=b&&b<jspb.BinaryConstants.TWO_TO_64),this.writeUnsignedVarint64_(a,b))};
jspb.BinaryWriter.prototype.writeUint64String=function(a,b){null!=b&&(b=jspb.arith.UInt64.fromString(b),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeSplitVarint64(b.lo,b.hi))};jspb.BinaryWriter.prototype.writeSint32=function(a,b){null!=b&&(goog.asserts.assert(b>=-jspb.BinaryConstants.TWO_TO_31&&b<jspb.BinaryConstants.TWO_TO_31),this.writeZigzagVarint32_(a,b))};
jspb.BinaryWriter.prototype.writeSint64=function(a,b){null!=b&&(goog.asserts.assert(b>=-jspb.BinaryConstants.TWO_TO_63&&b<jspb.BinaryConstants.TWO_TO_63),this.writeZigzagVarint64_(a,b))};jspb.BinaryWriter.prototype.writeSintHash64=function(a,b){null!=b&&this.writeZigzagVarintHash64_(a,b)};jspb.BinaryWriter.prototype.writeSint64String=function(a,b){null!=b&&this.writeZigzagVarint64String_(a,b)};
jspb.BinaryWriter.prototype.writeFixed32=function(a,b){null!=b&&(goog.asserts.assert(0<=b&&b<jspb.BinaryConstants.TWO_TO_32),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED32),this.encoder_.writeUint32(b))};jspb.BinaryWriter.prototype.writeFixed64=function(a,b){null!=b&&(goog.asserts.assert(0<=b&&b<jspb.BinaryConstants.TWO_TO_64),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED64),this.encoder_.writeUint64(b))};
jspb.BinaryWriter.prototype.writeFixed64String=function(a,b){null!=b&&(b=jspb.arith.UInt64.fromString(b),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED64),this.encoder_.writeSplitFixed64(b.lo,b.hi))};jspb.BinaryWriter.prototype.writeSfixed32=function(a,b){null!=b&&(goog.asserts.assert(b>=-jspb.BinaryConstants.TWO_TO_31&&b<jspb.BinaryConstants.TWO_TO_31),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED32),this.encoder_.writeInt32(b))};
jspb.BinaryWriter.prototype.writeSfixed64=function(a,b){null!=b&&(goog.asserts.assert(b>=-jspb.BinaryConstants.TWO_TO_63&&b<jspb.BinaryConstants.TWO_TO_63),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED64),this.encoder_.writeInt64(b))};jspb.BinaryWriter.prototype.writeSfixed64String=function(a,b){null!=b&&(b=jspb.arith.Int64.fromString(b),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED64),this.encoder_.writeSplitFixed64(b.lo,b.hi))};
jspb.BinaryWriter.prototype.writeFloat=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED32),this.encoder_.writeFloat(b))};jspb.BinaryWriter.prototype.writeDouble=function(a,b){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED64),this.encoder_.writeDouble(b))};
jspb.BinaryWriter.prototype.writeBool=function(a,b){null!=b&&(goog.asserts.assert("boolean"===typeof b||"number"===typeof b),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeBool(b))};jspb.BinaryWriter.prototype.writeEnum=function(a,b){null!=b&&(goog.asserts.assert(b>=-jspb.BinaryConstants.TWO_TO_31&&b<jspb.BinaryConstants.TWO_TO_31),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeSignedVarint32(b))};
jspb.BinaryWriter.prototype.writeString=function(a,b){null!=b&&(a=this.beginDelimited_(a),this.encoder_.writeString(b),this.endDelimited_(a))};jspb.BinaryWriter.prototype.writeBytes=function(a,b){null!=b&&(b=jspb.utils.byteSourceToUint8Array(b),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED),this.encoder_.writeUnsignedVarint32(b.length),this.appendUint8Array_(b))};jspb.BinaryWriter.prototype.writeMessage=function(a,b,c){null!=b&&(a=this.beginDelimited_(a),c(b,this),this.endDelimited_(a))};
jspb.BinaryWriter.prototype.writeMessageSet=function(a,b,c){null!=b&&(this.writeFieldHeader_(1,jspb.BinaryConstants.WireType.START_GROUP),this.writeFieldHeader_(2,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeSignedVarint32(a),a=this.beginDelimited_(3),c(b,this),this.endDelimited_(a),this.writeFieldHeader_(1,jspb.BinaryConstants.WireType.END_GROUP))};
jspb.BinaryWriter.prototype.writeGroup=function(a,b,c){null!=b&&(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.START_GROUP),c(b,this),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.END_GROUP))};jspb.BinaryWriter.prototype.writeFixedHash64=function(a,b){null!=b&&(goog.asserts.assert(8==b.length),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED64),this.encoder_.writeFixedHash64(b))};
jspb.BinaryWriter.prototype.writeVarintHash64=function(a,b){null!=b&&(goog.asserts.assert(8==b.length),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT),this.encoder_.writeVarintHash64(b))};jspb.BinaryWriter.prototype.writeSplitFixed64=function(a,b,c){this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.FIXED64);this.encoder_.writeSplitFixed64(b,c)};
jspb.BinaryWriter.prototype.writeSplitVarint64=function(a,b,c){this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT);this.encoder_.writeSplitVarint64(b,c)};jspb.BinaryWriter.prototype.writeSplitZigzagVarint64=function(a,b,c){this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.VARINT);var d=this.encoder_;jspb.utils.toZigzag64(b,c,function(a,b){d.writeSplitVarint64(a>>>0,b>>>0)})};
jspb.BinaryWriter.prototype.writeRepeatedInt32=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeSignedVarint32_(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedInt32String=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeInt32String(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedInt64=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeSignedVarint64_(a,b[c])};
jspb.BinaryWriter.prototype.writeRepeatedSplitFixed64=function(a,b,c,d){if(null!=b)for(var e=0;e<b.length;e++)this.writeSplitFixed64(a,c(b[e]),d(b[e]))};jspb.BinaryWriter.prototype.writeRepeatedSplitVarint64=function(a,b,c,d){if(null!=b)for(var e=0;e<b.length;e++)this.writeSplitVarint64(a,c(b[e]),d(b[e]))};jspb.BinaryWriter.prototype.writeRepeatedSplitZigzagVarint64=function(a,b,c,d){if(null!=b)for(var e=0;e<b.length;e++)this.writeSplitZigzagVarint64(a,c(b[e]),d(b[e]))};
jspb.BinaryWriter.prototype.writeRepeatedInt64String=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeInt64String(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedUint32=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeUnsignedVarint32_(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedUint32String=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeUint32String(a,b[c])};
jspb.BinaryWriter.prototype.writeRepeatedUint64=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeUnsignedVarint64_(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedUint64String=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeUint64String(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedSint32=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeZigzagVarint32_(a,b[c])};
jspb.BinaryWriter.prototype.writeRepeatedSint64=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeZigzagVarint64_(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedSint64String=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeZigzagVarint64String_(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedSintHash64=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeZigzagVarintHash64_(a,b[c])};
jspb.BinaryWriter.prototype.writeRepeatedFixed32=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeFixed32(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedFixed64=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeFixed64(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedFixed64String=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeFixed64String(a,b[c])};
jspb.BinaryWriter.prototype.writeRepeatedSfixed32=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeSfixed32(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedSfixed64=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeSfixed64(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedSfixed64String=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeSfixed64String(a,b[c])};
jspb.BinaryWriter.prototype.writeRepeatedFloat=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeFloat(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedDouble=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeDouble(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedBool=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeBool(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedEnum=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeEnum(a,b[c])};
jspb.BinaryWriter.prototype.writeRepeatedString=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeString(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedBytes=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeBytes(a,b[c])};jspb.BinaryWriter.prototype.writeRepeatedMessage=function(a,b,c){if(null!=b)for(var d=0;d<b.length;d++){var e=this.beginDelimited_(a);c(b[d],this);this.endDelimited_(e)}};
jspb.BinaryWriter.prototype.writeRepeatedGroup=function(a,b,c){if(null!=b)for(var d=0;d<b.length;d++)this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.START_GROUP),c(b[d],this),this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.END_GROUP)};jspb.BinaryWriter.prototype.writeRepeatedFixedHash64=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeFixedHash64(a,b[c])};
jspb.BinaryWriter.prototype.writeRepeatedVarintHash64=function(a,b){if(null!=b)for(var c=0;c<b.length;c++)this.writeVarintHash64(a,b[c])};jspb.BinaryWriter.prototype.writePackedInt32=function(a,b){if(null!=b&&b.length){a=this.beginDelimited_(a);for(var c=0;c<b.length;c++)this.encoder_.writeSignedVarint32(b[c]);this.endDelimited_(a)}};
jspb.BinaryWriter.prototype.writePackedInt32String=function(a,b){if(null!=b&&b.length){a=this.beginDelimited_(a);for(var c=0;c<b.length;c++)this.encoder_.writeSignedVarint32(parseInt(b[c],10));this.endDelimited_(a)}};jspb.BinaryWriter.prototype.writePackedInt64=function(a,b){if(null!=b&&b.length){a=this.beginDelimited_(a);for(var c=0;c<b.length;c++)this.encoder_.writeSignedVarint64(b[c]);this.endDelimited_(a)}};
jspb.BinaryWriter.prototype.writePackedSplitFixed64=function(a,b,c,d){if(null!=b){a=this.beginDelimited_(a);for(var e=0;e<b.length;e++)this.encoder_.writeSplitFixed64(c(b[e]),d(b[e]));this.endDelimited_(a)}};jspb.BinaryWriter.prototype.writePackedSplitVarint64=function(a,b,c,d){if(null!=b){a=this.beginDelimited_(a);for(var e=0;e<b.length;e++)this.encoder_.writeSplitVarint64(c(b[e]),d(b[e]));this.endDelimited_(a)}};
jspb.BinaryWriter.prototype.writePackedSplitZigzagVarint64=function(a,b,c,d){if(null!=b){a=this.beginDelimited_(a);for(var e=this.encoder_,f=0;f<b.length;f++)jspb.utils.toZigzag64(c(b[f]),d(b[f]),function(a,b){e.writeSplitVarint64(a>>>0,b>>>0)});this.endDelimited_(a)}};jspb.BinaryWriter.prototype.writePackedInt64String=function(a,b){if(null!=b&&b.length){a=this.beginDelimited_(a);for(var c=0;c<b.length;c++){var d=jspb.arith.Int64.fromString(b[c]);this.encoder_.writeSplitVarint64(d.lo,d.hi)}this.endDelimited_(a)}};
jspb.BinaryWriter.prototype.writePackedUint32=function(a,b){if(null!=b&&b.length){a=this.beginDelimited_(a);for(var c=0;c<b.length;c++)this.encoder_.writeUnsignedVarint32(b[c]);this.endDelimited_(a)}};jspb.BinaryWriter.prototype.writePackedUint32String=function(a,b){if(null!=b&&b.length){a=this.beginDelimited_(a);for(var c=0;c<b.length;c++)this.encoder_.writeUnsignedVarint32(parseInt(b[c],10));this.endDelimited_(a)}};
jspb.BinaryWriter.prototype.writePackedUint64=function(a,b){if(null!=b&&b.length){a=this.beginDelimited_(a);for(var c=0;c<b.length;c++)this.encoder_.writeUnsignedVarint64(b[c]);this.endDelimited_(a)}};jspb.BinaryWriter.prototype.writePackedUint64String=function(a,b){if(null!=b&&b.length){a=this.beginDelimited_(a);for(var c=0;c<b.length;c++){var d=jspb.arith.UInt64.fromString(b[c]);this.encoder_.writeSplitVarint64(d.lo,d.hi)}this.endDelimited_(a)}};
jspb.BinaryWriter.prototype.writePackedSint32=function(a,b){if(null!=b&&b.length){a=this.beginDelimited_(a);for(var c=0;c<b.length;c++)this.encoder_.writeZigzagVarint32(b[c]);this.endDelimited_(a)}};jspb.BinaryWriter.prototype.writePackedSint64=function(a,b){if(null!=b&&b.length){a=this.beginDelimited_(a);for(var c=0;c<b.length;c++)this.encoder_.writeZigzagVarint64(b[c]);this.endDelimited_(a)}};
jspb.BinaryWriter.prototype.writePackedSint64String=function(a,b){if(null!=b&&b.length){a=this.beginDelimited_(a);for(var c=0;c<b.length;c++)this.encoder_.writeZigzagVarintHash64(jspb.utils.decimalStringToHash64(b[c]));this.endDelimited_(a)}};jspb.BinaryWriter.prototype.writePackedSintHash64=function(a,b){if(null!=b&&b.length){a=this.beginDelimited_(a);for(var c=0;c<b.length;c++)this.encoder_.writeZigzagVarintHash64(b[c]);this.endDelimited_(a)}};
jspb.BinaryWriter.prototype.writePackedFixed32=function(a,b){if(null!=b&&b.length)for(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED),this.encoder_.writeUnsignedVarint32(4*b.length),a=0;a<b.length;a++)this.encoder_.writeUint32(b[a])};jspb.BinaryWriter.prototype.writePackedFixed64=function(a,b){if(null!=b&&b.length)for(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED),this.encoder_.writeUnsignedVarint32(8*b.length),a=0;a<b.length;a++)this.encoder_.writeUint64(b[a])};
jspb.BinaryWriter.prototype.writePackedFixed64String=function(a,b){if(null!=b&&b.length)for(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED),this.encoder_.writeUnsignedVarint32(8*b.length),a=0;a<b.length;a++){var c=jspb.arith.UInt64.fromString(b[a]);this.encoder_.writeSplitFixed64(c.lo,c.hi)}};
jspb.BinaryWriter.prototype.writePackedSfixed32=function(a,b){if(null!=b&&b.length)for(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED),this.encoder_.writeUnsignedVarint32(4*b.length),a=0;a<b.length;a++)this.encoder_.writeInt32(b[a])};jspb.BinaryWriter.prototype.writePackedSfixed64=function(a,b){if(null!=b&&b.length)for(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED),this.encoder_.writeUnsignedVarint32(8*b.length),a=0;a<b.length;a++)this.encoder_.writeInt64(b[a])};
jspb.BinaryWriter.prototype.writePackedSfixed64String=function(a,b){if(null!=b&&b.length)for(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED),this.encoder_.writeUnsignedVarint32(8*b.length),a=0;a<b.length;a++)this.encoder_.writeInt64String(b[a])};jspb.BinaryWriter.prototype.writePackedFloat=function(a,b){if(null!=b&&b.length)for(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED),this.encoder_.writeUnsignedVarint32(4*b.length),a=0;a<b.length;a++)this.encoder_.writeFloat(b[a])};
jspb.BinaryWriter.prototype.writePackedDouble=function(a,b){if(null!=b&&b.length)for(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED),this.encoder_.writeUnsignedVarint32(8*b.length),a=0;a<b.length;a++)this.encoder_.writeDouble(b[a])};jspb.BinaryWriter.prototype.writePackedBool=function(a,b){if(null!=b&&b.length)for(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED),this.encoder_.writeUnsignedVarint32(b.length),a=0;a<b.length;a++)this.encoder_.writeBool(b[a])};
jspb.BinaryWriter.prototype.writePackedEnum=function(a,b){if(null!=b&&b.length){a=this.beginDelimited_(a);for(var c=0;c<b.length;c++)this.encoder_.writeEnum(b[c]);this.endDelimited_(a)}};jspb.BinaryWriter.prototype.writePackedFixedHash64=function(a,b){if(null!=b&&b.length)for(this.writeFieldHeader_(a,jspb.BinaryConstants.WireType.DELIMITED),this.encoder_.writeUnsignedVarint32(8*b.length),a=0;a<b.length;a++)this.encoder_.writeFixedHash64(b[a])};
jspb.BinaryWriter.prototype.writePackedVarintHash64=function(a,b){if(null!=b&&b.length){a=this.beginDelimited_(a);for(var c=0;c<b.length;c++)this.encoder_.writeVarintHash64(b[c]);this.endDelimited_(a)}};jspb.Export={};exports.Map=jspb.Map;exports.Message=jspb.Message;exports.BinaryReader=jspb.BinaryReader;exports.BinaryWriter=jspb.BinaryWriter;exports.ExtensionFieldInfo=jspb.ExtensionFieldInfo;exports.ExtensionFieldBinaryInfo=jspb.ExtensionFieldBinaryInfo;exports.exportSymbol=goog.exportSymbol;exports.inherits=goog.inherits;exports.object={extend:goog.object.extend};exports.typeOf=goog.typeOf;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(8), __webpack_require__(9).Buffer))

/***/ }),
/* 8 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(10)
var ieee754 = __webpack_require__(11)
var isArray = __webpack_require__(12)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(8)))

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  var i
  for (i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),
/* 11 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 12 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * @fileoverview gRPC-Web generated client stub for pb
 * @enhanceable
 * @public
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bchrpcClient = void 0;
// GENERATED CODE -- DO NOT EDIT!
const grpcWeb = __importStar(__webpack_require__(14));
const bchrpc_pb_1 = __webpack_require__(6);
class bchrpcClient {
    constructor(hostname, credentials, options) {
        this.methodInfoGetMempoolInfo = new grpcWeb.AbstractClientBase.MethodInfo(bchrpc_pb_1.GetMempoolInfoResponse, (request) => {
            return request.serializeBinary();
        }, bchrpc_pb_1.GetMempoolInfoResponse.deserializeBinary);
        this.methodInfoGetMempool = new grpcWeb.AbstractClientBase.MethodInfo(bchrpc_pb_1.GetMempoolResponse, (request) => {
            return request.serializeBinary();
        }, bchrpc_pb_1.GetMempoolResponse.deserializeBinary);
        this.methodInfoGetBlockchainInfo = new grpcWeb.AbstractClientBase.MethodInfo(bchrpc_pb_1.GetBlockchainInfoResponse, (request) => {
            return request.serializeBinary();
        }, bchrpc_pb_1.GetBlockchainInfoResponse.deserializeBinary);
        this.methodInfoGetBlockInfo = new grpcWeb.AbstractClientBase.MethodInfo(bchrpc_pb_1.GetBlockInfoResponse, (request) => {
            return request.serializeBinary();
        }, bchrpc_pb_1.GetBlockInfoResponse.deserializeBinary);
        this.methodInfoGetBlock = new grpcWeb.AbstractClientBase.MethodInfo(bchrpc_pb_1.GetBlockResponse, (request) => {
            return request.serializeBinary();
        }, bchrpc_pb_1.GetBlockResponse.deserializeBinary);
        this.methodInfoGetRawBlock = new grpcWeb.AbstractClientBase.MethodInfo(bchrpc_pb_1.GetRawBlockResponse, (request) => {
            return request.serializeBinary();
        }, bchrpc_pb_1.GetRawBlockResponse.deserializeBinary);
        this.methodInfoGetBlockFilter = new grpcWeb.AbstractClientBase.MethodInfo(bchrpc_pb_1.GetBlockFilterResponse, (request) => {
            return request.serializeBinary();
        }, bchrpc_pb_1.GetBlockFilterResponse.deserializeBinary);
        this.methodInfoGetHeaders = new grpcWeb.AbstractClientBase.MethodInfo(bchrpc_pb_1.GetHeadersResponse, (request) => {
            return request.serializeBinary();
        }, bchrpc_pb_1.GetHeadersResponse.deserializeBinary);
        this.methodInfoGetTransaction = new grpcWeb.AbstractClientBase.MethodInfo(bchrpc_pb_1.GetTransactionResponse, (request) => {
            return request.serializeBinary();
        }, bchrpc_pb_1.GetTransactionResponse.deserializeBinary);
        this.methodInfoGetRawTransaction = new grpcWeb.AbstractClientBase.MethodInfo(bchrpc_pb_1.GetRawTransactionResponse, (request) => {
            return request.serializeBinary();
        }, bchrpc_pb_1.GetRawTransactionResponse.deserializeBinary);
        this.methodInfoGetAddressTransactions = new grpcWeb.AbstractClientBase.MethodInfo(bchrpc_pb_1.GetAddressTransactionsResponse, (request) => {
            return request.serializeBinary();
        }, bchrpc_pb_1.GetAddressTransactionsResponse.deserializeBinary);
        this.methodInfoGetRawAddressTransactions = new grpcWeb.AbstractClientBase.MethodInfo(bchrpc_pb_1.GetRawAddressTransactionsResponse, (request) => {
            return request.serializeBinary();
        }, bchrpc_pb_1.GetRawAddressTransactionsResponse.deserializeBinary);
        this.methodInfoGetAddressUnspentOutputs = new grpcWeb.AbstractClientBase.MethodInfo(bchrpc_pb_1.GetAddressUnspentOutputsResponse, (request) => {
            return request.serializeBinary();
        }, bchrpc_pb_1.GetAddressUnspentOutputsResponse.deserializeBinary);
        this.methodInfoGetUnspentOutput = new grpcWeb.AbstractClientBase.MethodInfo(bchrpc_pb_1.GetUnspentOutputResponse, (request) => {
            return request.serializeBinary();
        }, bchrpc_pb_1.GetUnspentOutputResponse.deserializeBinary);
        this.methodInfoGetMerkleProof = new grpcWeb.AbstractClientBase.MethodInfo(bchrpc_pb_1.GetMerkleProofResponse, (request) => {
            return request.serializeBinary();
        }, bchrpc_pb_1.GetMerkleProofResponse.deserializeBinary);
        this.methodInfoSubmitTransaction = new grpcWeb.AbstractClientBase.MethodInfo(bchrpc_pb_1.SubmitTransactionResponse, (request) => {
            return request.serializeBinary();
        }, bchrpc_pb_1.SubmitTransactionResponse.deserializeBinary);
        this.methodInfoSubscribeTransactions = new grpcWeb.AbstractClientBase.MethodInfo(bchrpc_pb_1.TransactionNotification, (request) => {
            return request.serializeBinary();
        }, bchrpc_pb_1.TransactionNotification.deserializeBinary);
        this.methodInfoSubscribeBlocks = new grpcWeb.AbstractClientBase.MethodInfo(bchrpc_pb_1.BlockNotification, (request) => {
            return request.serializeBinary();
        }, bchrpc_pb_1.BlockNotification.deserializeBinary);
        if (!options)
            options = {};
        options['format'] = 'text';
        this.client_ = new grpcWeb.GrpcWebClientBase(options);
        this.hostname_ = hostname;
        this.credentials_ = credentials;
        this.options_ = options;
    }
    getMempoolInfo(request, metadata, callback) {
        return this.client_.rpcCall(this.hostname_ +
            '/pb.bchrpc/GetMempoolInfo', request, metadata || {}, this.methodInfoGetMempoolInfo, callback);
    }
    getMempool(request, metadata, callback) {
        return this.client_.rpcCall(this.hostname_ +
            '/pb.bchrpc/GetMempool', request, metadata || {}, this.methodInfoGetMempool, callback);
    }
    getBlockchainInfo(request, metadata, callback) {
        return this.client_.rpcCall(this.hostname_ +
            '/pb.bchrpc/GetBlockchainInfo', request, metadata || {}, this.methodInfoGetBlockchainInfo, callback);
    }
    getBlockInfo(request, metadata, callback) {
        return this.client_.rpcCall(this.hostname_ +
            '/pb.bchrpc/GetBlockInfo', request, metadata || {}, this.methodInfoGetBlockInfo, callback);
    }
    getBlock(request, metadata, callback) {
        return this.client_.rpcCall(this.hostname_ +
            '/pb.bchrpc/GetBlock', request, metadata || {}, this.methodInfoGetBlock, callback);
    }
    getRawBlock(request, metadata, callback) {
        return this.client_.rpcCall(this.hostname_ +
            '/pb.bchrpc/GetRawBlock', request, metadata || {}, this.methodInfoGetRawBlock, callback);
    }
    getBlockFilter(request, metadata, callback) {
        return this.client_.rpcCall(this.hostname_ +
            '/pb.bchrpc/GetBlockFilter', request, metadata || {}, this.methodInfoGetBlockFilter, callback);
    }
    getHeaders(request, metadata, callback) {
        return this.client_.rpcCall(this.hostname_ +
            '/pb.bchrpc/GetHeaders', request, metadata || {}, this.methodInfoGetHeaders, callback);
    }
    getTransaction(request, metadata, callback) {
        return this.client_.rpcCall(this.hostname_ +
            '/pb.bchrpc/GetTransaction', request, metadata || {}, this.methodInfoGetTransaction, callback);
    }
    getRawTransaction(request, metadata, callback) {
        return this.client_.rpcCall(this.hostname_ +
            '/pb.bchrpc/GetRawTransaction', request, metadata || {}, this.methodInfoGetRawTransaction, callback);
    }
    getAddressTransactions(request, metadata, callback) {
        return this.client_.rpcCall(this.hostname_ +
            '/pb.bchrpc/GetAddressTransactions', request, metadata || {}, this.methodInfoGetAddressTransactions, callback);
    }
    getRawAddressTransactions(request, metadata, callback) {
        return this.client_.rpcCall(this.hostname_ +
            '/pb.bchrpc/GetRawAddressTransactions', request, metadata || {}, this.methodInfoGetRawAddressTransactions, callback);
    }
    getAddressUnspentOutputs(request, metadata, callback) {
        return this.client_.rpcCall(this.hostname_ +
            '/pb.bchrpc/GetAddressUnspentOutputs', request, metadata || {}, this.methodInfoGetAddressUnspentOutputs, callback);
    }
    getUnspentOutput(request, metadata, callback) {
        return this.client_.rpcCall(this.hostname_ +
            '/pb.bchrpc/GetUnspentOutput', request, metadata || {}, this.methodInfoGetUnspentOutput, callback);
    }
    getMerkleProof(request, metadata, callback) {
        return this.client_.rpcCall(this.hostname_ +
            '/pb.bchrpc/GetMerkleProof', request, metadata || {}, this.methodInfoGetMerkleProof, callback);
    }
    submitTransaction(request, metadata, callback) {
        return this.client_.rpcCall(this.hostname_ +
            '/pb.bchrpc/SubmitTransaction', request, metadata || {}, this.methodInfoSubmitTransaction, callback);
    }
    subscribeTransactions(request, metadata) {
        return this.client_.serverStreaming(this.hostname_ +
            '/pb.bchrpc/SubscribeTransactions', request, metadata || {}, this.methodInfoSubscribeTransactions);
    }
    subscribeBlocks(request, metadata) {
        return this.client_.serverStreaming(this.hostname_ +
            '/pb.bchrpc/SubscribeBlocks', request, metadata || {}, this.methodInfoSubscribeBlocks);
    }
}
exports.bchrpcClient = bchrpcClient;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var aa="function"==typeof Object.defineProperties?Object.defineProperty:function(a,b,c){a!=Array.prototype&&a!=Object.prototype&&(a[b]=c.value)},ba="undefined"!=typeof window&&window===this?this:"undefined"!=typeof global&&null!=global?global:this;function ca(a,b){if(b){var c=ba;a=a.split(".");for(var d=0;d<a.length-1;d++){var e=a[d];e in c||(c[e]={});c=c[e]}a=a[a.length-1];d=c[a];b=b(d);b!=d&&null!=b&&aa(c,a,{configurable:!0,writable:!0,value:b})}}
function da(a){var b=0;return function(){return b<a.length?{done:!1,value:a[b++]}:{done:!0}}}function ea(a){var b="undefined"!=typeof Symbol&&Symbol.iterator&&a[Symbol.iterator];return b?b.call(a):{next:da(a)}}
ca("Promise",function(a){function b(f){this.b=0;this.c=void 0;this.a=[];var h=this.f();try{f(h.resolve,h.reject)}catch(k){h.reject(k)}}function c(){this.a=null}function d(f){return f instanceof b?f:new b(function(h){h(f)})}if(a)return a;c.prototype.b=function(f){if(null==this.a){this.a=[];var h=this;this.c(function(){h.g()})}this.a.push(f)};var e=ba.setTimeout;c.prototype.c=function(f){e(f,0)};c.prototype.g=function(){for(;this.a&&this.a.length;){var f=this.a;this.a=[];for(var h=0;h<f.length;++h){var k=
f[h];f[h]=null;try{k()}catch(l){this.f(l)}}}this.a=null};c.prototype.f=function(f){this.c(function(){throw f;})};b.prototype.f=function(){function f(l){return function(n){k||(k=!0,l.call(h,n))}}var h=this,k=!1;return{resolve:f(this.m),reject:f(this.g)}};b.prototype.m=function(f){if(f===this)this.g(new TypeError("A Promise cannot resolve to itself"));else if(f instanceof b)this.o(f);else{a:switch(typeof f){case "object":var h=null!=f;break a;case "function":h=!0;break a;default:h=!1}h?this.l(f):this.h(f)}};
b.prototype.l=function(f){var h=void 0;try{h=f.then}catch(k){this.g(k);return}"function"==typeof h?this.u(h,f):this.h(f)};b.prototype.g=function(f){this.i(2,f)};b.prototype.h=function(f){this.i(1,f)};b.prototype.i=function(f,h){if(0!=this.b)throw Error("Cannot settle("+f+", "+h+"): Promise already settled in state"+this.b);this.b=f;this.c=h;this.j()};b.prototype.j=function(){if(null!=this.a){for(var f=0;f<this.a.length;++f)g.b(this.a[f]);this.a=null}};var g=new c;b.prototype.o=function(f){var h=this.f();
f.A(h.resolve,h.reject)};b.prototype.u=function(f,h){var k=this.f();try{f.call(h,k.resolve,k.reject)}catch(l){k.reject(l)}};b.prototype.then=function(f,h){function k(u,A){return"function"==typeof u?function(X){try{l(u(X))}catch(Y){n(Y)}}:A}var l,n,Z=new b(function(u,A){l=u;n=A});this.A(k(f,l),k(h,n));return Z};b.prototype.catch=function(f){return this.then(void 0,f)};b.prototype.A=function(f,h){function k(){switch(l.b){case 1:f(l.c);break;case 2:h(l.c);break;default:throw Error("Unexpected state: "+
l.b);}}var l=this;null==this.a?g.b(k):this.a.push(k)};b.resolve=d;b.reject=function(f){return new b(function(h,k){k(f)})};b.race=function(f){return new b(function(h,k){for(var l=ea(f),n=l.next();!n.done;n=l.next())d(n.value).A(h,k)})};b.all=function(f){var h=ea(f),k=h.next();return k.done?d([]):new b(function(l,n){function Z(X){return function(Y){u[X]=Y;A--;0==A&&l(u)}}var u=[],A=0;do u.push(void 0),A++,d(k.value).A(Z(u.length-1),n),k=h.next();while(!k.done)})};return b});var fa=fa||{},m=this||self;
function p(a){return"string"==typeof a}function q(a,b){a=a.split(".");b=b||m;for(var c=0;c<a.length;c++)if(b=b[a[c]],null==b)return null;return b}function r(){}
function t(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==b&&"undefined"==typeof a.call)return"object";return b}function v(a){var b=typeof a;return"object"==b&&null!=a||"function"==b}var ha="closure_uid_"+(1E9*Math.random()>>>0),ia=0;function ja(a,b,c){return a.call.apply(a.bind,arguments)}
function ka(a,b,c){if(!a)throw Error();if(2<arguments.length){var d=Array.prototype.slice.call(arguments,2);return function(){var e=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(e,d);return a.apply(b,e)}}return function(){return a.apply(b,arguments)}}function w(a,b,c){Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?w=ja:w=ka;return w.apply(null,arguments)}var la=Date.now||function(){return+new Date};
function x(a,b){function c(){}c.prototype=b.prototype;a.T=b.prototype;a.prototype=new c;a.prototype.constructor=a};function ma(a){switch(a){case 0:return"No Error";case 1:return"Access denied to content document";case 2:return"File not found";case 3:return"Firefox silently errored";case 4:return"Application custom error";case 5:return"An exception occurred";case 6:return"Http response at 400 or 500 level";case 7:return"Request was aborted";case 8:return"Request timed out";case 9:return"The resource is not available offline";default:return"Unrecognized error code"}};function y(a){if(Error.captureStackTrace)Error.captureStackTrace(this,y);else{var b=Error().stack;b&&(this.stack=b)}a&&(this.message=String(a))}x(y,Error);y.prototype.name="CustomError";function na(a,b){a=a.split("%s");for(var c="",d=a.length-1,e=0;e<d;e++)c+=a[e]+(e<b.length?b[e]:"%s");y.call(this,c+a[d])}x(na,y);na.prototype.name="AssertionError";function oa(a,b){throw new na("Failure"+(a?": "+a:""),Array.prototype.slice.call(arguments,1));};function pa(){this.j=null;this.i=[];this.l=0;this.b=qa;this.f=this.a=this.h=0;this.c=null;this.g=0}var qa=0;function ra(a,b,c,d){a.b=3;a.j="The stream is broken @"+a.l+"/"+c+". Error: "+d+". With input:\n"+b;throw Error(a.j);}
function sa(a,b){function c(l){0==l?f.h=l:128==l?f.h=l:ra(f,h,k,"invalid frame byte");f.b=1;f.a=0;f.f=0}function d(l){f.f++;f.a=(f.a<<8)+l;4==f.f&&(f.b=2,f.g=0,"undefined"!==typeof Uint8Array?f.c=new Uint8Array(f.a):f.c=Array(f.a),0==f.a&&g())}function e(l){f.c[f.g++]=l;f.g==f.a&&g()}function g(){var l={};l[f.h]=f.c;f.i.push(l);f.b=qa}for(var f=a,h=b instanceof Array?b:new Uint8Array(b),k=0;k<h.length;){switch(f.b){case 3:ra(f,h,k,"stream already broken");break;case qa:c(h[k]);break;case 1:d(h[k]);
break;case 2:e(h[k]);break;default:throw Error("unexpected parser state: "+f.b);}f.l++;k++}a=f.i;f.i=[];return 0<a.length?a:null};function ta(a){switch(a){case 200:return 0;case 400:return 3;case 401:return 16;case 403:return 7;case 404:return 5;case 409:return 10;case 412:return 9;case 429:return 8;case 499:return 1;case 500:return 2;case 501:return 12;case 503:return 14;case 504:return 4;default:return 2}};var ua=Array.prototype.indexOf?function(a,b){return Array.prototype.indexOf.call(a,b,void 0)}:function(a,b){if(p(a))return p(b)&&1==b.length?a.indexOf(b,0):-1;for(var c=0;c<a.length;c++)if(c in a&&a[c]===b)return c;return-1};function va(a){a:{var b=wa;for(var c=a.length,d=p(a)?a.split(""):a,e=0;e<c;e++)if(e in d&&b.call(void 0,d[e],e,a)){b=e;break a}b=-1}return 0>b?null:p(a)?a.charAt(b):a[b]};function xa(a,b){for(var c in a)b.call(void 0,a[c],c,a)}function ya(a,b){var c={},d;for(d in a)c[d]=b.call(void 0,a[d],d,a);return c}var za="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Aa(a,b){for(var c,d,e=1;e<arguments.length;e++){d=arguments[e];for(c in d)a[c]=d[c];for(var g=0;g<za.length;g++)c=za[g],Object.prototype.hasOwnProperty.call(d,c)&&(a[c]=d[c])}};var Ba=String.prototype.trim?function(a){return a.trim()}:function(a){return/^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]};function z(a,b){return-1!=a.indexOf(b)}function Ca(a,b){return a<b?-1:a>b?1:0};var B;a:{var Da=m.navigator;if(Da){var Ea=Da.userAgent;if(Ea){B=Ea;break a}}B=""};function Fa(a){var b=1;a=a.split(":");for(var c=[];0<b&&a.length;)c.push(a.shift()),b--;a.length&&c.push(a.join(":"));return c};function Ga(){0!=Ha&&(this[ha]||(this[ha]=++ia));this.H=this.H}var Ha=0;Ga.prototype.H=!1;function Ia(a){Ia[" "](a);return a}Ia[" "]=r;function Ja(a,b){var c=Ka;return Object.prototype.hasOwnProperty.call(c,a)?c[a]:c[a]=b(a)};var La=z(B,"Opera"),C=z(B,"Trident")||z(B,"MSIE"),Ma=z(B,"Edge"),Na=z(B,"Gecko")&&!(z(B.toLowerCase(),"webkit")&&!z(B,"Edge"))&&!(z(B,"Trident")||z(B,"MSIE"))&&!z(B,"Edge"),Oa=z(B.toLowerCase(),"webkit")&&!z(B,"Edge");function Pa(){var a=m.document;return a?a.documentMode:void 0}var Qa;
a:{var Ra="",Sa=function(){var a=B;if(Na)return/rv:([^\);]+)(\)|;)/.exec(a);if(Ma)return/Edge\/([\d\.]+)/.exec(a);if(C)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);if(Oa)return/WebKit\/(\S+)/.exec(a);if(La)return/(?:Version)[ \/]?(\S+)/.exec(a)}();Sa&&(Ra=Sa?Sa[1]:"");if(C){var Ta=Pa();if(null!=Ta&&Ta>parseFloat(Ra)){Qa=String(Ta);break a}}Qa=Ra}var Ka={};
function Ua(a){return Ja(a,function(){for(var b=0,c=Ba(String(Qa)).split("."),d=Ba(String(a)).split("."),e=Math.max(c.length,d.length),g=0;0==b&&g<e;g++){var f=c[g]||"",h=d[g]||"";do{f=/(\d*)(\D*)(.*)/.exec(f)||["","","",""];h=/(\d*)(\D*)(.*)/.exec(h)||["","","",""];if(0==f[0].length&&0==h[0].length)break;b=Ca(0==f[1].length?0:parseInt(f[1],10),0==h[1].length?0:parseInt(h[1],10))||Ca(0==f[2].length,0==h[2].length)||Ca(f[2],h[2]);f=f[3];h=h[3]}while(0==b)}return 0<=b})}var Va;
Va=m.document&&C?Pa():void 0;var Wa=Object.freeze||function(a){return a};var Xa;(Xa=!C)||(Xa=9<=Number(Va));var Ya=Xa,Za=C&&!Ua("9"),$a=function(){if(!m.addEventListener||!Object.defineProperty)return!1;var a=!1,b=Object.defineProperty({},"passive",{get:function(){a=!0}});try{m.addEventListener("test",r,b),m.removeEventListener("test",r,b)}catch(c){}return a}();function D(a,b){this.type=a;this.a=this.target=b}D.prototype.b=function(){};function E(a,b){D.call(this,a?a.type:"");this.relatedTarget=this.a=this.target=null;this.button=this.screenY=this.screenX=this.clientY=this.clientX=0;this.key="";this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1;this.pointerId=0;this.pointerType="";this.c=null;if(a){var c=this.type=a.type,d=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement;this.a=b;if(b=a.relatedTarget){if(Na){a:{try{Ia(b.nodeName);var e=!0;break a}catch(g){}e=!1}e||(b=null)}}else"mouseover"==
c?b=a.fromElement:"mouseout"==c&&(b=a.toElement);this.relatedTarget=b;d?(this.clientX=void 0!==d.clientX?d.clientX:d.pageX,this.clientY=void 0!==d.clientY?d.clientY:d.pageY,this.screenX=d.screenX||0,this.screenY=d.screenY||0):(this.clientX=void 0!==a.clientX?a.clientX:a.pageX,this.clientY=void 0!==a.clientY?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0);this.button=a.button;this.key=a.key||"";this.ctrlKey=a.ctrlKey;this.altKey=a.altKey;this.shiftKey=a.shiftKey;this.metaKey=
a.metaKey;this.pointerId=a.pointerId||0;this.pointerType=p(a.pointerType)?a.pointerType:ab[a.pointerType]||"";this.c=a;a.defaultPrevented&&this.b()}}x(E,D);var ab=Wa({2:"touch",3:"pen",4:"mouse"});E.prototype.b=function(){E.T.b.call(this);var a=this.c;if(a.preventDefault)a.preventDefault();else if(a.returnValue=!1,Za)try{if(a.ctrlKey||112<=a.keyCode&&123>=a.keyCode)a.keyCode=-1}catch(b){}};var F="closure_listenable_"+(1E6*Math.random()|0),bb=0;function cb(a,b,c,d,e){this.listener=a;this.proxy=null;this.src=b;this.type=c;this.capture=!!d;this.B=e;this.key=++bb;this.s=this.w=!1}function db(a){a.s=!0;a.listener=null;a.proxy=null;a.src=null;a.B=null};function G(a){this.src=a;this.a={};this.b=0}G.prototype.add=function(a,b,c,d,e){var g=a.toString();a=this.a[g];a||(a=this.a[g]=[],this.b++);var f=eb(a,b,d,e);-1<f?(b=a[f],c||(b.w=!1)):(b=new cb(b,this.src,g,!!d,e),b.w=c,a.push(b));return b};function fb(a,b){var c=b.type;if(c in a.a){var d=a.a[c],e=ua(d,b),g;(g=0<=e)&&Array.prototype.splice.call(d,e,1);g&&(db(b),0==a.a[c].length&&(delete a.a[c],a.b--))}}
function eb(a,b,c,d){for(var e=0;e<a.length;++e){var g=a[e];if(!g.s&&g.listener==b&&g.capture==!!c&&g.B==d)return e}return-1};var gb="closure_lm_"+(1E6*Math.random()|0),hb={},ib=0;function jb(a,b,c,d,e){if(d&&d.once)kb(a,b,c,d,e);else if("array"==t(b))for(var g=0;g<b.length;g++)jb(a,b[g],c,d,e);else c=lb(c),a&&a[F]?a.f.add(String(b),c,!1,v(d)?!!d.capture:!!d,e):mb(a,b,c,!1,d,e)}
function mb(a,b,c,d,e,g){if(!b)throw Error("Invalid event type");var f=v(e)?!!e.capture:!!e,h=H(a);h||(a[gb]=h=new G(a));c=h.add(b,c,d,f,g);if(!c.proxy){d=nb();c.proxy=d;d.src=a;d.listener=c;if(a.addEventListener)$a||(e=f),void 0===e&&(e=!1),a.addEventListener(b.toString(),d,e);else if(a.attachEvent)a.attachEvent(ob(b.toString()),d);else if(a.addListener&&a.removeListener)a.addListener(d);else throw Error("addEventListener and attachEvent are unavailable.");ib++}}
function nb(){var a=pb,b=Ya?function(c){return a.call(b.src,b.listener,c)}:function(c){c=a.call(b.src,b.listener,c);if(!c)return c};return b}function kb(a,b,c,d,e){if("array"==t(b))for(var g=0;g<b.length;g++)kb(a,b[g],c,d,e);else c=lb(c),a&&a[F]?a.f.add(String(b),c,!0,v(d)?!!d.capture:!!d,e):mb(a,b,c,!0,d,e)}
function qb(a,b,c,d,e){if("array"==t(b))for(var g=0;g<b.length;g++)qb(a,b[g],c,d,e);else(d=v(d)?!!d.capture:!!d,c=lb(c),a&&a[F])?(a=a.f,b=String(b).toString(),b in a.a&&(g=a.a[b],c=eb(g,c,d,e),-1<c&&(db(g[c]),Array.prototype.splice.call(g,c,1),0==g.length&&(delete a.a[b],a.b--)))):a&&(a=H(a))&&(b=a.a[b.toString()],a=-1,b&&(a=eb(b,c,d,e)),(c=-1<a?b[a]:null)&&rb(c))}
function rb(a){if("number"!=typeof a&&a&&!a.s){var b=a.src;if(b&&b[F])fb(b.f,a);else{var c=a.type,d=a.proxy;b.removeEventListener?b.removeEventListener(c,d,a.capture):b.detachEvent?b.detachEvent(ob(c),d):b.addListener&&b.removeListener&&b.removeListener(d);ib--;(c=H(b))?(fb(c,a),0==c.b&&(c.src=null,b[gb]=null)):db(a)}}}function ob(a){return a in hb?hb[a]:hb[a]="on"+a}
function sb(a,b,c,d){var e=!0;if(a=H(a))if(b=a.a[b.toString()])for(b=b.concat(),a=0;a<b.length;a++){var g=b[a];g&&g.capture==c&&!g.s&&(g=tb(g,d),e=e&&!1!==g)}return e}function tb(a,b){var c=a.listener,d=a.B||a.src;a.w&&rb(a);return c.call(d,b)}
function pb(a,b){if(a.s)return!0;if(!Ya){var c=b||q("window.event");b=new E(c,this);var d=!0;if(!(0>c.keyCode||void 0!=c.returnValue)){a:{var e=!1;if(0==c.keyCode)try{c.keyCode=-1;break a}catch(f){e=!0}if(e||void 0==c.returnValue)c.returnValue=!0}c=[];for(e=b.a;e;e=e.parentNode)c.push(e);a=a.type;for(e=c.length-1;0<=e;e--){b.a=c[e];var g=sb(c[e],a,!0,b);d=d&&g}for(e=0;e<c.length;e++)b.a=c[e],g=sb(c[e],a,!1,b),d=d&&g}return d}return tb(a,new E(b,this))}
function H(a){a=a[gb];return a instanceof G?a:null}var ub="__closure_events_fn_"+(1E9*Math.random()>>>0);function lb(a){if("function"==t(a))return a;a[ub]||(a[ub]=function(b){return a.handleEvent(b)});return a[ub]};function I(){Ga.call(this);this.f=new G(this);this.P=this}x(I,Ga);I.prototype[F]=!0;I.prototype.removeEventListener=function(a,b,c,d){qb(this,a,b,c,d)};function J(a,b){a=a.P;var c=b.type||b;if(p(b))b=new D(b,a);else if(b instanceof D)b.target=b.target||a;else{var d=b;b=new D(c,a);Aa(b,d)}a=b.a=a;vb(a,c,!0,b);vb(a,c,!1,b)}
function vb(a,b,c,d){if(b=a.f.a[String(b)]){b=b.concat();for(var e=!0,g=0;g<b.length;++g){var f=b[g];if(f&&!f.s&&f.capture==c){var h=f.listener,k=f.B||f.src;f.w&&fb(a.f,f);e=!1!==h.call(k,d)&&e}}}};function wb(a,b,c){if("function"==t(a))c&&(a=w(a,c));else if(a&&"function"==typeof a.handleEvent)a=w(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(b)?-1:m.setTimeout(a,b||0)};function xb(a,b,c){this.reset(a,b,c,void 0,void 0)}xb.prototype.a=null;var yb=0;xb.prototype.reset=function(a,b,c,d,e){"number"==typeof e||yb++;d||la();delete this.a};function zb(a){this.f=a;this.b=this.c=this.a=null}function K(a,b){this.name=a;this.value=b}K.prototype.toString=function(){return this.name};var Ab=new K("SEVERE",1E3),Bb=new K("CONFIG",700),Cb=new K("FINE",500);function Db(a){if(a.c)return a.c;if(a.a)return Db(a.a);oa("Root logger has no level set.");return null}zb.prototype.log=function(a,b,c){if(a.value>=Db(this).value)for("function"==t(b)&&(b=b()),a=new xb(a,String(b),this.f),c&&(a.a=c),c=this;c;)c=c.a};var Eb={},L=null;
function Fb(a){L||(L=new zb(""),Eb[""]=L,L.c=Bb);var b;if(!(b=Eb[a])){b=new zb(a);var c=a.lastIndexOf("."),d=a.substr(c+1);c=Fb(a.substr(0,c));c.b||(c.b={});c.b[d]=b;b.a=c;Eb[a]=b}return b};function M(a,b){a&&a.log(Cb,b,void 0)};function Gb(){}Gb.prototype.a=null;function Hb(a){var b;(b=a.a)||(b={},Ib(a)&&(b[0]=!0,b[1]=!0),b=a.a=b);return b};var Jb;function Kb(){}x(Kb,Gb);function Lb(a){return(a=Ib(a))?new ActiveXObject(a):new XMLHttpRequest}function Ib(a){if(!a.b&&"undefined"==typeof XMLHttpRequest&&"undefined"!=typeof ActiveXObject){for(var b=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],c=0;c<b.length;c++){var d=b[c];try{return new ActiveXObject(d),a.b=d}catch(e){}}throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");}return a.b}Jb=new Kb;function N(a,b){this.b={};this.a=[];this.c=0;var c=arguments.length;if(1<c){if(c%2)throw Error("Uneven number of arguments");for(var d=0;d<c;d+=2)this.set(arguments[d],arguments[d+1])}else a&&Mb(this,a)}N.prototype.f=function(){Nb(this);return this.a.concat()};function Ob(a){a.b={};a.a.length=0;a.c=0}
function Nb(a){if(a.c!=a.a.length){for(var b=0,c=0;b<a.a.length;){var d=a.a[b];O(a.b,d)&&(a.a[c++]=d);b++}a.a.length=c}if(a.c!=a.a.length){var e={};for(c=b=0;b<a.a.length;)d=a.a[b],O(e,d)||(a.a[c++]=d,e[d]=1),b++;a.a.length=c}}N.prototype.get=function(a,b){return O(this.b,a)?this.b[a]:b};N.prototype.set=function(a,b){O(this.b,a)||(this.c++,this.a.push(a));this.b[a]=b};function Mb(a,b){if(b instanceof N)for(var c=b.f(),d=0;d<c.length;d++)a.set(c[d],b.get(c[d]));else for(c in b)a.set(c,b[c])}
N.prototype.forEach=function(a,b){for(var c=this.f(),d=0;d<c.length;d++){var e=c[d],g=this.get(e);a.call(b,g,e,this)}};function Pb(a){Nb(a);for(var b={},c=0;c<a.a.length;c++){var d=a.a[c];b[d]=a.b[d]}return b}function O(a,b){return Object.prototype.hasOwnProperty.call(a,b)};var Qb=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#([\s\S]*))?$/;function P(a){I.call(this);this.headers=new N;this.v=a||null;this.c=!1;this.G=this.a=null;this.K=this.u="";this.g=0;this.j="";this.i=this.J=this.o=this.I=!1;this.l=0;this.D=null;this.h=Rb;this.F=this.m=!1}x(P,I);var Rb="",Sb=P.prototype,Tb=Fb("goog.net.XhrIo");Sb.b=Tb;var Ub=/^https?$/i,Vb=["POST","PUT"];
function Wb(a,b,c){if(a.a)throw Error("[goog.net.XhrIo] Object is active with another request="+a.u+"; newUri="+b);a.u=b;a.j="";a.g=0;a.K="POST";a.I=!1;a.c=!0;a.a=a.v?Lb(a.v):Lb(Jb);a.G=a.v?Hb(a.v):Hb(Jb);a.a.onreadystatechange=w(a.L,a);try{M(a.b,Q(a,"Opening Xhr")),a.J=!0,a.a.open("POST",String(b),!0),a.J=!1}catch(g){M(a.b,Q(a,"Error opening Xhr: "+g.message));Xb(a,g);return}b=c||"";c=new N(a.headers);var d=va(c.f()),e=m.FormData&&b instanceof m.FormData;!(0<=ua(Vb,"POST"))||d||e||c.set("Content-Type",
"application/x-www-form-urlencoded;charset=utf-8");c.forEach(function(g,f){this.a.setRequestHeader(f,g)},a);a.h&&(a.a.responseType=a.h);"withCredentials"in a.a&&a.a.withCredentials!==a.m&&(a.a.withCredentials=a.m);try{Yb(a),0<a.l&&(a.F=Zb(a.a),M(a.b,Q(a,"Will abort after "+a.l+"ms if incomplete, xhr2 "+a.F)),a.F?(a.a.timeout=a.l,a.a.ontimeout=w(a.M,a)):a.D=wb(a.M,a.l,a)),M(a.b,Q(a,"Sending request")),a.o=!0,a.a.send(b),a.o=!1}catch(g){M(a.b,Q(a,"Send error: "+g.message)),Xb(a,g)}}
function Zb(a){return C&&Ua(9)&&"number"==typeof a.timeout&&void 0!==a.ontimeout}function wa(a){return"content-type"==a.toLowerCase()}P.prototype.M=function(){"undefined"!=typeof fa&&this.a&&(this.j="Timed out after "+this.l+"ms, aborting",this.g=8,M(this.b,Q(this,this.j)),J(this,"timeout"),this.abort(8))};function Xb(a,b){a.c=!1;a.a&&(a.i=!0,a.a.abort(),a.i=!1);a.j=b;a.g=5;$b(a);ac(a)}function $b(a){a.I||(a.I=!0,J(a,"complete"),J(a,"error"))}
P.prototype.abort=function(a){this.a&&this.c&&(M(this.b,Q(this,"Aborting")),this.c=!1,this.i=!0,this.a.abort(),this.i=!1,this.g=a||7,J(this,"complete"),J(this,"abort"),ac(this))};P.prototype.L=function(){this.H||(this.J||this.o||this.i?bc(this):this.R())};P.prototype.R=function(){bc(this)};
function bc(a){if(a.c&&"undefined"!=typeof fa)if(a.G[1]&&4==R(a)&&2==S(a))M(a.b,Q(a,"Local request error detected and ignored"));else if(a.o&&4==R(a))wb(a.L,0,a);else if(J(a,"readystatechange"),4==R(a)){M(a.b,Q(a,"Request complete"));a.c=!1;try{var b=S(a);a:switch(b){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break a;default:c=!1}var d;if(!(d=c)){var e;if(e=0===b){var g=String(a.u).match(Qb)[1]||null;if(!g&&m.self&&m.self.location){var f=m.self.location.protocol;g=f.substr(0,
f.length-1)}e=!Ub.test(g?g.toLowerCase():"")}d=e}if(d)J(a,"complete"),J(a,"success");else{a.g=6;try{var h=2<R(a)?a.a.statusText:""}catch(k){M(a.b,"Can not get status: "+k.message),h=""}a.j=h+" ["+S(a)+"]";$b(a)}}finally{ac(a)}}}function ac(a){if(a.a){Yb(a);var b=a.a,c=a.G[0]?r:null;a.a=null;a.G=null;J(a,"ready");try{b.onreadystatechange=c}catch(d){(a=a.b)&&a.log(Ab,"Problem encountered resetting onreadystatechange: "+d.message,void 0)}}}
function Yb(a){a.a&&a.F&&(a.a.ontimeout=null);a.D&&(m.clearTimeout(a.D),a.D=null)}function R(a){return a.a?a.a.readyState:0}function S(a){try{return 2<R(a)?a.a.status:-1}catch(b){return-1}}
function cc(a){try{if(!a.a)return null;if("response"in a.a)return a.a.response;switch(a.h){case Rb:case "text":return a.a.responseText;case "arraybuffer":if("mozResponseArrayBuffer"in a.a)return a.a.mozResponseArrayBuffer}var b=a.b;b&&b.log(Ab,"Response type "+a.h+" is not supported on this browser",void 0);return null}catch(c){return M(a.b,"Can not get response: "+c.message),null}}function dc(a,b){if(a.a&&4==R(a))return a=a.a.getResponseHeader(b),null===a?void 0:a}
function ec(a){var b={};a=(a.a&&4==R(a)?a.a.getAllResponseHeaders()||"":"").split("\r\n");for(var c=0;c<a.length;c++)if(!/^[\s\xa0]*$/.test(a[c])){var d=Fa(a[c]),e=d[0];d=d[1];if(p(d)){d=d.trim();var g=b[e]||[];b[e]=g;g.push(d)}}return ya(b,function(f){return f.join(", ")})}function Q(a,b){return b+" ["+a.K+" "+a.u+" "+S(a)+"]"};var fc={},T=null;function gc(a){var b;void 0===b&&(b=0);hc();b=fc[b];for(var c=[],d=0;d<a.length;d+=3){var e=a[d],g=d+1<a.length,f=g?a[d+1]:0,h=d+2<a.length,k=h?a[d+2]:0,l=e>>2;e=(e&3)<<4|f>>4;f=(f&15)<<2|k>>6;k&=63;h||(k=64,g||(f=64));c.push(b[l],b[e],b[f]||"",b[k]||"")}return c.join("")}function ic(a){var b=a.length,c=3*b/4;c%3?c=Math.floor(c):z("=.",a[b-1])&&(c=z("=.",a[b-2])?c-2:c-1);var d=new Uint8Array(c),e=0;jc(a,function(g){d[e++]=g});return d.subarray(0,e)}
function jc(a,b){function c(k){for(;d<a.length;){var l=a.charAt(d++),n=T[l];if(null!=n)return n;if(!/^[\s\xa0]*$/.test(l))throw Error("Unknown base64 encoding at char: "+l);}return k}hc();for(var d=0;;){var e=c(-1),g=c(0),f=c(64),h=c(64);if(64===h&&-1===e)break;b(e<<2|g>>4);64!=f&&(b(g<<4&240|f>>2),64!=h&&b(f<<6&192|h))}}
function hc(){if(!T){T={};for(var a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),b=["+/=","+/","-_=","-_.","-_"],c=0;5>c;c++){var d=a.concat(b[c].split(""));fc[c]=d;for(var e=0;e<d.length;e++){var g=d[e];void 0===T[g]&&(T[g]=e)}}}};function U(a){this.a=a.O;this.f=this.b=this.c=this.j=this.h=null;this.i=!1;this.g=0;this.l=new pa;var b=this;jb(this.a,"readystatechange",function(){var c=b.a;if(c=c.a?c.a.getResponseHeader("Content-Type"):null){c=c.toLowerCase();if(0==c.lastIndexOf("application/grpc-web-text",0)){c=b.a;try{var d=c.a?c.a.responseText:""}catch(k){M(c.b,"Can not get responseText: "+k.message),d=""}c=d.length-d.length%4;d=d.substr(b.g,c-b.g);if(0==d.length)return;b.g=c;d=ic(d)}else if(0==c.lastIndexOf("application/grpc",
0))d=new Uint8Array(cc(b.a));else return;if(d=sa(b.l,[].slice.call(d)))for(c=0;c<d.length;c++){if(0 in d[c]){var e=d[c][0];e&&(e=b.h(e))&&b.j(e)}if(128 in d[c]&&0<d[c][128].length){e="";for(var g=0;g<d[c][128].length;g++)e+=String.fromCharCode(d[c][128][g]);e=e.trim().split("\r\n");g={};for(var f=0;f<e.length;f++){var h=e[f].indexOf(":");g[e[f].substring(0,h).trim()]=e[f].substring(h+1).trim()}e=g;g=0;f="";"grpc-status"in e&&(g=e["grpc-status"]);"grpc-message"in e&&(f=e["grpc-message"]);b.c&&b.c({code:Number(g),
details:f,metadata:e})}}}});jb(this.a,"complete",function(){var c=b.a.g,d="";if(0!=c){switch(c){case 7:var e=10;break;case 8:e=4;break;case 6:e=ta(S(b.a));break;default:e=14}10==e&&b.i||!b.b||b.b({code:e,message:ma(c)})}else{c=!1;var g=ec(b.a);"grpc-status"in g&&(e=dc(b.a,"grpc-status"),"grpc-message"in g&&(d=dc(b.a,"grpc-message")),0!=Number(e)&&b.b&&(b.b({code:Number(e),message:d,metadata:g}),c=!0),b.c&&b.c({code:Number(e),details:d,metadata:g}));!c&&b.f&&b.f()}})}
U.prototype.C=function(a,b){"data"==a?this.j=b:"status"==a?this.c=b:"end"==a?this.f=b:"error"==a&&(this.b=b);return this};U.prototype.on=U.prototype.C;U.prototype.cancel=function(){this.i=!0;this.a.abort()};U.prototype.cancel=U.prototype.cancel;function kc(a){var b="";xa(a,function(c,d){b+=d;b+=":";b+=c;b+="\r\n"});return b}function lc(a,b){a:{for(c in b){var c=!1;break a}c=!0}if(c)return a;c=kc(b);if(p(a)){b=encodeURIComponent("$httpHeaders");c=null!=c?"="+encodeURIComponent(String(c)):"";if(b+=c){c=a.indexOf("#");0>c&&(c=a.length);var d=a.indexOf("?");if(0>d||d>c){d=c;var e=""}else e=a.substring(d+1,c);a=[a.substr(0,d),e,a.substr(c)];c=a[1];a[1]=b?c?c+"&"+b:b:c;a=a[0]+(a[1]?"?"+a[1]:"")+a[2]}return a}a.a("$httpHeaders",c);return a};function V(a){this.a=q("format",a)||"text";this.c=q("suppressCorsPreflight",a)||!1;this.b=q("withCredentials",a)||!1}
V.prototype.N=function(a,b,c,d,e){var g=new P;g.m=this.b;var f=new U({O:g});f.h=d.b;f.C("data",function(h){e(null,h)});f.C("status",function(h){0!=h.code&&e({code:h.code,message:h.details,metadata:h.metadata},null)});f.C("error",function(h){0!=h.code&&e({code:h.code,message:h.message,metadata:h.metadata},null)});Mb(g.headers,c);mc(this,g);this.c&&(c=Pb(g.headers),Ob(g.headers),a=lc(a,c));b=d.a(b);b=nc(b);"text"==this.a?b=gc(b):"binary"==this.a&&(g.h="arraybuffer");Wb(g,a,b);return f};
V.prototype.rpcCall=V.prototype.N;V.prototype.U=function(a,b,c,d){var e=this;return new Promise(function(g,f){e.N(a,b,c,d,function(h,k){h?f(h):g(k)})})};V.prototype.unaryCall=V.prototype.U;V.prototype.S=function(a,b,c,d){var e=new P;e.m=this.b;var g=new U({O:e});g.h=d.b;Mb(e.headers,c);mc(this,e);this.c&&(c=Pb(e.headers),Ob(e.headers),a=lc(a,c));b=d.a(b);b=nc(b);"text"==this.a?b=gc(b):"binary"==this.a&&(e.h="arraybuffer");Wb(e,a,b);return g};V.prototype.serverStreaming=V.prototype.S;
function nc(a){for(var b=a.length,c=[0,0,0,0],d=new Uint8Array(5+b),e=3;0<=e;e--)c[e]=b%256,b>>>=8;d.set(new Uint8Array(c),1);d.set(a,5);return d}
function mc(a,b){"text"==a.a?(b.headers.set("Content-Type","application/grpc-web-text"),b.headers.set("Accept","application/grpc-web-text")):b.headers.set("Content-Type","application/grpc-web+proto");b.headers.set("X-User-Agent","grpc-web-javascript/0.1");b.headers.set("X-Grpc-Web","1");if(O(b.headers.b,"deadline")){a=b.headers.get("deadline");a=Math.round(a-(new Date).getTime());var c=b.headers;O(c.b,"deadline")&&(delete c.b.deadline,c.c--,c.a.length>2*c.c&&Nb(c));Infinity===a&&(a=0);0<a&&b.headers.set("grpc-timeout",
a+"m")}};var W=module.exports;W.AbstractClientBase={MethodInfo:function(a,b,c,d){this.name=d;this.a=b;this.b=c}};W.GrpcWebClientBase=V;W.StatusCode={OK:0,CANCELLED:1,UNKNOWN:2,INVALID_ARGUMENT:3,DEADLINE_EXCEEDED:4,NOT_FOUND:5,ALREADY_EXISTS:6,PERMISSION_DENIED:7,UNAUTHENTICATED:16,RESOURCE_EXHAUSTED:8,FAILED_PRECONDITION:9,ABORTED:10,OUT_OF_RANGE:11,UNIMPLEMENTED:12,INTERNAL:13,UNAVAILABLE:14,DATA_LOSS:15};W.MethodDescriptor=function(a,b,c,d,e,g){this.name=a;this.a=e;this.b=g};
W.MethodType={UNARY:"unary",SERVER_STREAMING:"server_streaming"};

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(8)))

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bchrpc = __importStar(__webpack_require__(6));
const bchrpc_pb_service = __importStar(__webpack_require__(13));
const util = __importStar(__webpack_require__(16));
class GrpcClient {
    /**
     * Create a client.
     * @param url - The bchd server expressed as host:port.
     * @param testnet - Whether testnet is being used, default:false.
     * @param options - grpc client options.
     */
    constructor({ url, testnet = false, options }) {
        if (typeof url === 'string') {
            url = url;
        }
        else if (!url && !testnet) {
            url = "https://bchd.fountainhead.cash:443";
            // url = "https://bchd.greyh.at:8335";
        }
        else if (!url) {
            url = "https://bchd-testnet.greyh.at:18335";
        }
        if (!options) {
            options = {
                "grpc.max_receive_message_length": "-1",
            };
        }
        this.client = new bchrpc_pb_service.bchrpcClient(url, null, options);
    }
    /**
     * Get information about transactions in mempool
     */
    getMempoolInfo() {
        return new Promise((resolve, reject) => {
            this.client.getMempoolInfo(new bchrpc.GetMempoolInfoRequest(), null, (err, response) => {
                if (err !== null) {
                    reject(err);
                }
                else {
                    resolve(response);
                }
            });
        });
    }
    /**
     * Get transactions from mempool
     * @param fullTransactions - A flag to return full transaction data. Default is `false`, only transaction hashes are returned.
     */
    getMempool({ fullTransactions }) {
        const req = new bchrpc.GetMempoolRequest();
        if (fullTransactions) {
            req.setFullTransactions(fullTransactions);
        }
        return new Promise((resolve, reject) => {
            this.client.getMempool(req, null, (err, response) => {
                if (err !== null) {
                    reject(err);
                }
                else {
                    resolve(response);
                }
            });
        });
    }
    /**
     * Get a raw transaction
     * @param hash - the hash, in either a base64 encoded string or byte array, little-endian.
     * @param hashHex - the hash as a big-endian hexadecimal encoded string, sill be overridden by hash if provided.
     */
    getRawTransaction({ hash, hashHex }) {
        const req = new bchrpc.GetRawTransactionRequest();
        if (hashHex) {
            req.setHash(util.hexToU8(hashHex).reverse());
        }
        else if (hash) {
            req.setHash(hash);
        }
        else {
            throw Error("No hash provided for transaction");
        }
        return new Promise((resolve, reject) => {
            this.client.getRawTransaction(req, null, (err, response) => {
                if (err !== null) {
                    reject(err);
                }
                else {
                    resolve(response);
                }
            });
        });
    }
    /**
     * Get a transaction
     * @param hash - the hash, expressed in little-endian in either a base64 encoded string or byte array.
     * @param hashHex - the hash as a big-endian hexadecimal encoded string, will be overridden by hash, if provided.
     */
    getTransaction({ hash, hashHex }) {
        const req = new bchrpc.GetTransactionRequest();
        if (hashHex) {
            req.setHash(util.hexToU8(hashHex).reverse());
        }
        else if (hash) {
            req.setHash(hash);
        }
        else {
            throw Error("No hash provided for transaction");
        }
        return new Promise((resolve, reject) => {
            this.client.getTransaction(req, null, (err, response) => {
                if (err !== null) {
                    reject(err);
                }
                else {
                    resolve(response);
                }
            });
        });
    }
    /**
     * Get block header information
     * @param blockLocatorHashes - Sparse list of hashes known to the client.
     * @param stopHash -Last block hash to return.
     */
    getHeaders({ blockLocatorHashes, stopHash }) {
        const req = new bchrpc.GetHeadersRequest();
        if (blockLocatorHashes) {
            req.setBlockLocatorHashesList(blockLocatorHashes);
        }
        if (stopHash) {
            req.setStopHash(stopHash);
        }
        return new Promise((resolve, reject) => {
            this.client.getHeaders(req, null, (err, response) => {
                if (err !== null) {
                    reject(err);
                }
                else {
                    resolve(response);
                }
            });
        });
    }
    /**
     * Get transactions related to a particular address
     * @param address - Bitcoin cash address in casharr format.
     * @param nbSkip - Number of transactions to skip, in chronological order.
     * @param nbFetch - Number of transactions return.
     * @param height - Filter to only return transactions after this block number.
     * @param hash - the hash, expressed in little-endian in either a base64 encoded string or byte array.
     * @param hashHex - the hash as a big-endian hexadecimal encoded string, will be overridden by `hash`, if provided.
     */
    getAddressTransactions({ address, nbSkip, nbFetch, height, hashHex }) {
        const req = new bchrpc.GetAddressTransactionsRequest();
        if (nbSkip) {
            req.setNbSkip(nbSkip);
        }
        if (nbFetch) {
            req.setNbFetch(nbFetch);
        }
        if (height) {
            req.setHeight(height);
        }
        if (hashHex) {
            req.setHash(util.hexToU8(hashHex).reverse());
        }
        req.setAddress(address);
        return new Promise((resolve, reject) => {
            this.client.getAddressTransactions(req, null, (err, response) => {
                if (err !== null) {
                    reject(err);
                }
                else {
                    resolve(response);
                }
            });
        });
    }
    getUnspentOutput({ hash, hashHex, vout, includeMempool }) {
        const req = new bchrpc.GetUnspentOutputRequest();
        if (includeMempool) {
            req.setIncludeMempool(true);
        }
        if (hashHex) {
            req.setHash(util.hexToU8(hashHex).reverse());
        }
        else if (hash) {
            req.setHash(hash);
        }
        req.setIndex(vout);
        return new Promise((resolve, reject) => {
            this.client.getUnspentOutput(req, null, (err, data) => {
                if (err !== null) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    /**
     * Retrieve merkle (SPV) proof that the given transaction is in the provided block.
     * @param hash - the tx hash, in either a 'base64' encoded string or byte array, little-endian.
     * @param hashHex - the tx hash as a big-endian 'hex' encoded string, will be overridden by hash if also provided.
     */
    getMerkleProof({ hash, hashHex }) {
        const req = new bchrpc.GetMerkleProofRequest();
        if (hashHex) {
            req.setTransactionHash(util.hexToU8(hashHex).reverse());
        }
        else if (hash) {
            req.setTransactionHash(hash);
        }
        return new Promise((resolve, reject) => {
            this.client.getMerkleProof(req, null, (err, data) => {
                if (err !== null) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
    getAddressUtxos({ address, includeMempool }) {
        const req = new bchrpc.GetAddressUnspentOutputsRequest();
        req.setAddress(address);
        if (includeMempool) {
            req.setIncludeMempool(true);
        }
        return new Promise((resolve, reject) => {
            this.client.getAddressUnspentOutputs(req, null, (err, response) => {
                if (err !== null) {
                    reject(err);
                }
                else {
                    resolve(response);
                }
            });
        });
    }
    /**
     * Retrieve raw block from a hash
     * @param hash - the hash, in either a 'base64' encoded string or byte array, little-endian.
     * @param hashHex - the hash as a big-endian 'hex' encoded string, will be overridden by hash if also provided.
     */
    getRawBlock({ hash, hashHex }) {
        const req = new bchrpc.GetRawBlockRequest();
        if (hashHex) {
            req.setHash(util.hexToU8(hashHex).reverse());
        }
        else if (hash) {
            req.setHash(hash);
        }
        else {
            throw Error("No hash provided for raw block request");
        }
        return new Promise((resolve, reject) => {
            this.client.getRawBlock(req, null, (err, response) => {
                if (err !== null) {
                    reject(err);
                }
                else {
                    resolve(response);
                }
            });
        });
    }
    /**
     * Retrieve block info given a block number or hash
     * @param index - the block number to be retrieved.
     * @param hash - the hash, in either a 'base64' encoded string or byte array, little-endian.
     * @param hashHex - the hash as a big-endian 'hex' encoded string, will be overridden by hash if also provided.
     * @param fullTransactions - a flag to return full transaction data, by defult `false` only transaction hashes are returned.
     */
    getBlock({ index, hash, hashHex, fullTransactions }) {
        const req = new bchrpc.GetBlockRequest();
        if (index !== null && index !== undefined) {
            req.setHeight(index);
        }
        else if (hashHex) {
            req.setHash(util.hexToU8(hashHex).reverse());
        }
        else if (hash) {
            req.setHash(hash);
        }
        else {
            throw Error("No index or hash provided for block");
        }
        if (fullTransactions) {
            req.setFullTransactions(true);
        }
        return new Promise((resolve, reject) => {
            this.client.getBlock(req, null, (err, response) => {
                if (err !== null) {
                    reject(err);
                }
                else {
                    resolve(response);
                }
            });
        });
    }
    /**
     * Retrieve block filter given a block number or hash
     * @param height - the block number index to be retrieved.
     * @param hash - the hash, expressed in little-endian in either a base64 encoded string or byte array.
     * @param hashHex - the hash as a big-endian 'hex' encoded string, will be overridden a hash if provided.
     */
    getBlockFilter({ height, hash, hashHex }) {
        const req = new bchrpc.GetBlockInfoRequest();
        if (height !== null && height !== undefined) {
            req.setHeight(height);
        }
        else if (hashHex) {
            req.setHash(util.hexToU8(hashHex).reverse());
        }
        else if (hash) {
            req.setHash(hash);
        }
        return new Promise((resolve, reject) => {
            this.client.getBlockFilter(req, null, (err, response) => {
                if (err !== null) {
                    reject(err);
                }
                else {
                    resolve(response);
                }
            });
        });
    }
    /**
     * Retrieve block info given a block number or hash
     * @param height - the block number index to be retrieved.
     * @param hash - the hash, expressed in little-endian in either a base64 encoded string or byte array.
     * @param hashHex - the hash as a big-endian 'hex' encoded string, will be overridden a hash if provided.
     */
    getBlockInfo({ height, hash, hashHex }) {
        const req = new bchrpc.GetBlockInfoRequest();
        if (height !== null && height !== undefined) {
            req.setHeight(height);
        }
        else if (hashHex) {
            req.setHash(util.hexToU8(hashHex).reverse());
        }
        else if (hash) {
            req.setHash(hash);
        }
        return new Promise((resolve, reject) => {
            this.client.getBlockInfo(req, null, (err, response) => {
                if (err !== null) {
                    reject(err);
                }
                else {
                    resolve(response);
                }
            });
        });
    }
    /**
     * Retrieve block info for the network, network state and host node.
     */
    getBlockchainInfo({}) {
        return new Promise((resolve, reject) => {
            this.client.getBlockchainInfo(new bchrpc.GetBlockchainInfoRequest(), null, (err, response) => {
                if (err !== null) {
                    reject(err);
                }
                else {
                    resolve(response);
                }
            });
        });
    }
    /**
     * @param includeMempoolAcceptance - If true, new unconfirmed transactions from mempool are included apart from the ones confirmed in a block.
     * @param includeBlockAcceptance - If true, transactions are included when they are confirmed. This notification is sent in addition to any requested mempool notifications.
     * @param includeSerializedTxn - If true, transactions are serialized using bitcoin protocol encoding. Default is false, transaction will be Marshaled.
     * @param filter - Transaction filter
     * @param subscribeAllTransactions - If true, a filter will be constructed that captures all transactions
     * @param unsubscribe - NOT IMPLEMENTED, see ClientReadableStream.cancel()
     */
    subscribeTransactions({ includeMempoolAcceptance, includeBlockAcceptance, includeSerializedTxn, transactionFilter, unsubscribe }) {
        return new Promise((resolve, reject) => {
            const req = new bchrpc.SubscribeTransactionsRequest();
            includeMempoolAcceptance ? req.setIncludeMempool(true) : req.setIncludeMempool(false);
            includeBlockAcceptance ? req.setIncludeInBlock(true) : req.setIncludeInBlock(false);
            includeSerializedTxn ? req.setSerializeTx(true) : req.setSerializeTx(false);
            if (transactionFilter) {
                transactionFilter.setAllTransactions(false);
                req.setSubscribe(transactionFilter);
            }
            else {
                const defaultFilter = new bchrpc.TransactionFilter();
                defaultFilter.setAllTransactions(true);
                req.setSubscribe(defaultFilter);
            }
            if (unsubscribe) {
                throw new Error('Unsubscribing is not currently (2020) possible on grpc-web, see grpc-web ClientReadableStream.cancel()');
            }
            try {
                resolve(this.client.subscribeTransactions(req));
            }
            catch (err) {
                reject(err);
            }
        });
    }
    subscribeBlocks({ includeSerializedBlock, includeTxnHashes, includeTxnData }) {
        return new Promise((resolve, reject) => {
            const req = new bchrpc.SubscribeBlocksRequest();
            includeTxnHashes ? req.setFullBlock(true) : req.setFullBlock(false);
            includeTxnData ? req.setFullTransactions(true) : req.setFullTransactions(false);
            includeSerializedBlock ? req.setSerializeBlock(true) : req.setSerializeBlock(false);
            try {
                resolve(this.client.subscribeBlocks(req));
            }
            catch (err) {
                reject(err);
            }
        });
    }
    submitTransaction({ txnHex, txn }) {
        let tx;
        const req = new bchrpc.SubmitTransactionRequest();
        if (txnHex) {
            tx = util.hexToU8(txnHex);
        }
        else if (txn) {
            tx = txn;
        }
        else {
            throw Error("Most provide either Hex string or Uint8Array");
        }
        req.setTransaction(tx);
        return new Promise((resolve, reject) => {
            this.client.submitTransaction(req, null, (err, response) => {
                if (err !== null) {
                    reject(err);
                }
                else {
                    resolve(response);
                }
            });
        });
    }
}
exports.default = GrpcClient;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTransaction = exports.verifyBlock = exports.arrayBufferToBase64 = exports.u8toBase64 = exports.u8toHex = exports.base64toU8 = exports.base64toHex = exports.hexToBase64 = exports.hexToU8 = exports.numberPairToBase64 = exports.numberTo4ByteLEArray = exports.getMerkleRootFromProof = exports.compareUint8Array = exports.expandMerkleFlags = exports.hashPair = exports.hashSha256 = exports.sha256sha256 = void 0;
function sha256sha256(ab) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield crypto.subtle.digest('SHA-256', yield crypto.subtle.digest('SHA-256', ab));
        }
        catch (error) {
            throw error;
        }
    });
}
exports.sha256sha256 = sha256sha256;
function hashSha256(a) {
    return __awaiter(this, void 0, void 0, function* () {
        a = (typeof a === 'string') ? base64toU8(a) : a;
        return yield new Uint8Array(yield sha256sha256(new Uint8Array([...a])));
    });
}
exports.hashSha256 = hashSha256;
function hashPair(a, b) {
    return __awaiter(this, void 0, void 0, function* () {
        // If an argument is missing, assume it is a starting hash and return it
        if (!a) {
            return b;
        }
        ;
        if (!b) {
            return a;
        }
        ;
        // Convert base64 strings to Uint8Arrays
        a = (typeof a === 'string') ? base64toU8(a) : a;
        b = (typeof b === 'string') ? base64toU8(b) : b;
        return yield new Uint8Array(yield sha256sha256(new Uint8Array([...a, ...b])));
    });
}
exports.hashPair = hashPair;
function expandMerkleFlags(b) {
    return Array.from(b)
        .reverse()
        .map(x => x.toString(2).padStart(8, '0'))
        .join("")
        .replace(/\b0+/g, '')
        .split("")
        .map(x => parseInt(x, 10))
        .reverse();
}
exports.expandMerkleFlags = expandMerkleFlags;
function compareUint8Array(a, b) {
    // Convert base64 strings to Uint8Arrays
    a = (typeof a === 'string') ? base64toU8(a) : a;
    b = (typeof b === 'string') ? base64toU8(b) : b;
    for (let i = a.length; -1 < i; i -= 1) {
        if ((a[i] !== b[i]))
            return false;
    }
    return true;
}
exports.compareUint8Array = compareUint8Array;
function getMerkleRootFromProof(proof, flags, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        // proofCur tracks where in the list of proofs the next one is pulled from
        // count the number of zeros to get the index of the transaction hash in the proof array
        let proofCur = flags.filter(x => x === 0).length;
        // accumulator is the root of the proof walked so far
        let accumulator = null;
        for (let i = flags.length - 1; i >= 0;) {
            // If the previous leaf was on the right side, combine it with the hash on the left
            if (flags[i] === 0) {
                proofCur--;
                accumulator = yield fn(proof.splice(proofCur, 1).pop(), accumulator);
                flags.pop(); // remove the flag indicating that the previous node was on the right
                i--;
                flags.pop(); // remove the node flag
                i--;
            }
            // Otherwise, combine it with the leaf to the right
            else {
                accumulator = yield fn(accumulator, proof.splice(proofCur, 1).pop());
                flags.pop(); // remove the node flag
                i--;
            }
        }
        return accumulator;
    });
}
exports.getMerkleRootFromProof = getMerkleRootFromProof;
function numberTo4ByteLEArray(num) {
    const byteArray = [0, 0, 0, 0];
    for (let index = 0; index < byteArray.length; index++) {
        const byte = num & 0xff;
        byteArray[index] = byte;
        num = (num - byte) / 256;
    }
    return byteArray;
}
exports.numberTo4ByteLEArray = numberTo4ByteLEArray;
;
function numberPairToBase64(hi, lo) {
    const hiArray = numberTo4ByteLEArray(hi);
    const loArray = numberTo4ByteLEArray(lo);
    return u8toBase64(new Uint8Array([...hiArray, ...loArray]));
}
exports.numberPairToBase64 = numberPairToBase64;
function hexToU8(hashHex) {
    return new Uint8Array(hashHex.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
}
exports.hexToU8 = hexToU8;
function hexToBase64(hashHex) {
    return btoa(hashHex.match(/\w{2}/g).map((a) => String.fromCharCode(parseInt(a, 16))).join(""));
}
exports.hexToBase64 = hexToBase64;
function base64toHex(b64) {
    return base64toU8(b64).reduce(reduceToHex, '');
}
exports.base64toHex = base64toHex;
// see https://jsperf.com/base64-to-uint8array/19
function base64toU8(b64) {
    const binary = atob(b64);
    const len = binary.length >>> 0;
    const v = new Uint8Array(len);
    for (let i = 0; i < len; ++i)
        v[i] = binary.charCodeAt(i);
    return v;
}
exports.base64toU8 = base64toU8;
const hexArray = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
const reduceToHex = (s, c) => s + hexArray[c >>> 4] + hexArray[c & 0x0F];
function u8toHex(u8) {
    return u8.reduce(reduceToHex, '');
}
exports.u8toHex = u8toHex;
const reduceToBase64 = (s, c) => s + String.fromCharCode(c);
function u8toBase64(u8) {
    return btoa(u8.reduce(reduceToBase64, ''));
}
exports.u8toBase64 = u8toBase64;
function arrayBufferToBase64(ab) {
    return u8toBase64(new Uint8Array(ab));
}
exports.arrayBufferToBase64 = arrayBufferToBase64;
function verifyBlock({ block, hash }) {
    return __awaiter(this, void 0, void 0, function* () {
        hash = (typeof hash === 'string') ? base64toU8(hash) : hash;
        if (!block) {
            return false;
        }
        const header = new Uint8Array([
            ...numberTo4ByteLEArray(block.getVersion()),
            ...block.getPreviousBlock_asU8(),
            ...block.getMerkleRoot_asU8(),
            ...numberTo4ByteLEArray(block.getTimestamp()),
            ...numberTo4ByteLEArray(block.getBits()),
            ...numberTo4ByteLEArray(block.getNonce())
        ]);
        const hashComputed = yield hashSha256(header);
        return compareUint8Array(hashComputed, hash);
    });
}
exports.verifyBlock = verifyBlock;
function verifyTransaction({ txnHash, txnHashHex, merkleRoot, merkleRootHex, proof }) {
    return __awaiter(this, void 0, void 0, function* () {
        let tx;
        let localMerkleRoot;
        if (txnHashHex) {
            tx = hexToU8(txnHashHex);
        }
        else if (txnHash) {
            tx = txnHash;
        }
        else {
            throw Error("Most provide a transaction id for verification");
        }
        if (merkleRootHex) {
            localMerkleRoot = hexToU8(merkleRootHex);
        }
        else if (merkleRoot) {
            localMerkleRoot = merkleRoot;
        }
        else {
            throw Error("Most provide a locally validated merkle root for verification");
        }
        const merkleFlags = expandMerkleFlags(yield proof.getFlags_asU8());
        const merkleHashes = yield proof.getHashesList();
        const merkleCheckPromise = getMerkleRootFromProof(merkleHashes, merkleFlags, hashPair);
        return compareUint8Array(yield merkleCheckPromise, localMerkleRoot);
    });
}
exports.verifyTransaction = verifyTransaction;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Filter = void 0;
const siphash = __importStar(__webpack_require__(18));
const util_1 = __webpack_require__(16);
function toValue(hi, lo) {
    if (hi > 0) {
        throw Error("GCS value overflowed 32bits");
    }
    else {
        return Number(lo >>> 0);
    }
}
class Filter {
    /**
     * Create a Golomb-Rice encoded set filter handler for a particular block.
     * @param blockHash - The hash block corresponding to the filter object.
     * @param filterData - The compact filter for the block.
     */
    constructor({ blockHash, filterData, p = 19, m = 784931 }) {
        this.blockHash = (typeof blockHash === 'string') ? util_1.base64toU8(blockHash) : blockHash;
        this.keySize = 16;
        this.p = p;
        this.m = m;
        const filterBlob = this._gscFilterToArray(filterData);
        this.n = this._gcsGetFilterSize(filterBlob);
        this.filterValues = this._gcsGetFilterValues(filterBlob, p);
    }
    /**
     * Determine whether some data likely matches the filter.
     * @param data - The public key script or serialized outpoint to be matched
     */
    match({ data }) {
        const dataValue = this._getFilterValue(data);
        return this.filterValues.has(dataValue);
    }
    /**
     * Determine whether a list of Base64 encoded strings likely matches the filter
     * @param values - A list of data as Base64 encoded strings to match
     */
    matchAllBase64(values) {
        const valuesU8 = values.map(s => util_1.base64toU8(s));
        return this.matchAllU8(valuesU8);
    }
    /**
     * Determine whether a list of Uint8Arrays likely matches the filter
     * @param values - A list of data as Uint8Arrays to match
     */
    matchAllU8(values) {
        const mapFn = (x) => this._getFilterValue(x);
        const valueList = values.map(mapFn);
        const intersection = this._intersection(this.filterValues, new Set([...valueList]));
        return intersection.values().next().value > 0;
    }
    /**
     * Get the numberic value corresponding to the data
     * @param data - A Uint8Array to match
     */
    _getFilterValue(data) {
        const key = this.blockHash.subarray(0, this.keySize);
        const modulus = siphash.mul64(this.m, this.n);
        const b = siphash.sipmod(data, key, modulus.hi, modulus.lo);
        return toValue(b[0], b[1]);
    }
    _intersection(setA, setB) {
        const _intersection = new Set();
        for (const elem of setB) {
            if (setA.has(elem)) {
                _intersection.add(elem);
            }
        }
        return _intersection;
    }
    /**
     * Parse the compact filter for a block and return a set of numeric values.
     * @param rawFilter - The filter as a binary numeric array
     * @param p - The bucket size of the Golomb encoding
     */
    _gcsGetFilterValues(rawFilter, p) {
        // disgard the first 8 bits
        rawFilter = rawFilter.splice(8);
        // Create a Set for the decoded values
        const values = new Set();
        let quo = 0;
        let value = 0;
        while (rawFilter.length > 0) {
            const i = rawFilter.shift();
            // end of quotent bits
            if (i === 0) {
                // get a block value and store it in the Set
                const remainder = Number("0b" + rawFilter.slice(0, p).join(""));
                const delta = (quo << p) + Number(remainder);
                if (delta > 0) {
                    value += delta;
                    values.add(value);
                }
                quo = 0;
                // remove the bucket bits
                rawFilter = rawFilter.splice(p);
            }
            else {
                // increment the quotent
                quo++;
            }
        }
        return values;
    }
    /**
     * Transform the filter from an Uint8Array to type number[] of 1/0s
     * @param f - A Uint8Array to match
     */
    _gscFilterToArray(f) {
        return Array.from(f)
            .map(x => x.toString(2).padStart(8, '0'))
            .join("")
            .split("")
            .map(x => parseInt(x, 2));
    }
    /**
     * Get the decimal value of the first eight bits of a binary array
     * @param f - a binary array provided as an array of numbers
     */
    _gcsGetFilterSize(f) {
        const sizeN = f.slice(0, 8);
        return parseInt(sizeN.join(""), 2);
    }
}
exports.Filter = Filter;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 *
 * This is a truncated version of the bcoin library for siphash
 *
 *
 * siphash.js - siphash for bcoin
 * Copyright (c) 2017, Christopher Jeffrey (MIT License).
 * https://github.com/bcoin-org/bcoin
 */

Object.defineProperty(exports, "__esModule", { value: true });
exports.mul64 = exports.sipmod = exports.siphash = void 0;
/*
 * Constants
 */
const HI = 1 / 0x100000000;
/**
 * Javascript siphash 2-4 implementation.
 * @private
 * @param {Uint8Array} data
 * @param {Uint8Array} key - 128 bit key.
 * @returns {Array} [hi, lo]
 */
function _siphash(data, key) {
    const blocks = data.length >>> 3;
    const c0 = new U64(0x736f6d65, 0x70736575);
    const c1 = new U64(0x646f7261, 0x6e646f6d);
    const c2 = new U64(0x6c796765, 0x6e657261);
    const c3 = new U64(0x74656462, 0x79746573);
    const f0 = new U64(data.length << 24, 0);
    const f1 = new U64(0, 0xff);
    const k0 = U64.fromRaw(key, 0);
    const k1 = U64.fromRaw(key, 8);
    // Init
    const v0 = c0.ixor(k0);
    const v1 = c1.ixor(k1);
    const v2 = c2.ixor(k0);
    const v3 = c3.ixor(k1);
    // Blocks
    let p = 0;
    for (let i = 0; i < blocks; i++) {
        const d = U64.fromRaw(data, p);
        p += 8;
        v3.ixor(d);
        sipround(v0, v1, v2, v3);
        sipround(v0, v1, v2, v3);
        v0.ixor(d);
    }
    switch (data.length & 7) {
        case 7:
            f0.hi |= data[p + 6] << 16;
        case 6:
            f0.hi |= data[p + 5] << 8;
        case 5:
            f0.hi |= data[p + 4];
        case 4:
            f0.lo |= data[p + 3] << 24;
        case 3:
            f0.lo |= data[p + 2] << 16;
        case 2:
            f0.lo |= data[p + 1] << 8;
        case 1:
            f0.lo |= data[p];
    }
    // Finalization
    v3.ixor(f0);
    sipround(v0, v1, v2, v3);
    sipround(v0, v1, v2, v3);
    v0.ixor(f0);
    v2.ixor(f1);
    sipround(v0, v1, v2, v3);
    sipround(v0, v1, v2, v3);
    sipround(v0, v1, v2, v3);
    sipround(v0, v1, v2, v3);
    v0.ixor(v1);
    v0.ixor(v2);
    v0.ixor(v3);
    return [v0.hi, v0.lo];
}
/**
 * Javascript siphash 2-4 implementation.
 * Used by bitcoin for compact block relay.
 * @param {Uint8Array} data
 * @param {Uint8Array} key - 128 bit key.
 * @returns {Array} [hi, lo]
 */
function siphash(data, key) {
    return _siphash(data, key);
}
exports.siphash = siphash;
/**
 * Javascript siphash 2-4 implementation
 * plus 128 bit reduction by a modulus.
 * Used by the neutrino protocol.
 * @param {Uint8Array} data
 * @param {Uint8Array} key - 128 bit key.
 * @param {Number} mhi - Modulus hi bits.
 * @param {Number} mlo - Modulus lo bits.
 * @returns {Array} [hi, lo]
 */
function sipmod(data, key, mhi, mlo) {
    const [hi, lo] = _siphash(data, key);
    return reduce64(hi, lo, mhi, mlo);
}
exports.sipmod = sipmod;
/**
 * U64
 * @ignore
 */
class U64 {
    constructor(hi, lo) {
        this.hi = hi | 0;
        this.lo = lo | 0;
    }
    iadd(b) {
        const a = this;
        // Credit to @indutny for this method.
        const lo = (a.lo + b.lo) | 0;
        const s = lo >> 31;
        const as = a.lo >> 31;
        const bs = b.lo >> 31;
        const c = ((as & bs) | (~s & (as ^ bs))) & 1;
        const hi = ((a.hi + b.hi) | 0) + c;
        a.hi = hi | 0;
        a.lo = lo;
        return a;
    }
    ixor(b) {
        this.hi ^= b.hi;
        this.lo ^= b.lo;
        return this;
    }
    irotl(bits) {
        let ahi = this.hi;
        let alo = this.lo;
        let bhi = this.hi;
        let blo = this.lo;
        // a = x << b
        if (bits < 32) {
            ahi <<= bits;
            ahi |= alo >>> (32 - bits);
            alo <<= bits;
        }
        else {
            ahi = alo << (bits - 32);
            alo = 0;
        }
        bits = 64 - bits;
        // b = x >> (64 - b)
        if (bits < 32) {
            blo >>>= bits;
            blo |= bhi << (32 - bits);
            bhi >>>= bits;
        }
        else {
            blo = bhi >>> (bits - 32);
            bhi = 0;
        }
        // a | b
        this.hi = ahi | bhi;
        this.lo = alo | blo;
        return this;
    }
    static fromRaw(data, off) {
        const lo = readUInt32LE(data, off);
        const hi = readUInt32LE(data, off + 4);
        return new U64(hi, lo);
    }
}
/*
 * Helpers
 */
function sipround(v0, v1, v2, v3) {
    v0.iadd(v1);
    v1.irotl(13);
    v1.ixor(v0);
    v0.irotl(32);
    v2.iadd(v3);
    v3.irotl(16);
    v3.ixor(v2);
    v0.iadd(v3);
    v3.irotl(21);
    v3.ixor(v0);
    v2.iadd(v1);
    v1.irotl(17);
    v1.ixor(v2);
    v2.irotl(32);
}
// Compute `((uint128_t)a * b) >> 64`
function reduce64(ahi, alo, bhi, blo) {
    const axbhi = mul64(ahi, bhi);
    const axbmid = mul64(ahi, blo);
    const bxamid = mul64(bhi, alo);
    const axblo = mul64(alo, blo);
    // Hack:
    const c = (axbmid.lo >>> 0) + (bxamid.lo >>> 0) + (axblo.hi >>> 0);
    const m = (axbmid.hi >>> 0) + (bxamid.hi >>> 0) + ((c * HI) >>> 0);
    // More hacks:
    const mhi = (m * HI) | 0;
    const mlo = m | 0;
    const { hi, lo } = sum64(axbhi.hi, axbhi.lo, mhi, mlo);
    return [hi, lo];
}
function sum64(ahi, alo, bhi, blo) {
    // Credit to @indutny for this method.
    const lo = (alo + blo) | 0;
    const s = lo >> 31;
    const as = alo >> 31;
    const bs = blo >> 31;
    const c = ((as & bs) | (~s & (as ^ bs))) & 1;
    const hi = (((ahi + bhi) | 0) + c) | 0;
    return { hi, lo };
}
function mul64(alo, blo) {
    const a16 = alo >>> 16;
    const a00 = alo & 0xffff;
    const b16 = blo >>> 16;
    const b00 = blo & 0xffff;
    let c48 = 0;
    let c32 = 0;
    let c16 = 0;
    let c00 = 0;
    c00 += a00 * b00;
    c16 += c00 >>> 16;
    c00 &= 0xffff;
    c16 += a16 * b00;
    c32 += c16 >>> 16;
    c16 &= 0xffff;
    c16 += a00 * b16;
    c32 += c16 >>> 16;
    c16 &= 0xffff;
    c48 += c32 >>> 16;
    c32 &= 0xffff;
    c32 += a16 * b16;
    c48 += c32 >>> 16;
    c32 &= 0xffff;
    c48 += c32 >>> 16;
    c48 &= 0xffff;
    const hi = (c48 << 16) | c32;
    const lo = (c16 << 16) | c00;
    return { hi, lo };
}
exports.mul64 = mul64;
function readUInt32LE(data, offset) {
    offset = offset >>> 0;
    return ((data[offset]) |
        (data[offset + 1] << 8) |
        (data[offset + 2] << 16)) +
        (data[offset + 3] * 0x1000000);
}


/***/ })
/******/ ]);
});