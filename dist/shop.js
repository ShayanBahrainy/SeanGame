/******/ (() => { // webpackBootstrap
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var DataHandler = /*#__PURE__*/function () {
  function DataHandler(reset) {
    _classCallCheck(this, DataHandler);
    if (reset) {
      chrome.storage.local.clear();
    }
    this.levelprices = {};
    this.levelprices[2] = 2500;
    this.levelprices[3] = 10000;
    this.hatprices = {};
    this.hatprices["WhiteHat"] = 1000;
    this.hatprices["GreenHat"] = 2500;
    this.hatprices["BlueHat"] = 5000;
    this.hatprices["BeaconHat"] = 20000;
    this.hatprices["PurpleHat"] = 50000;
    this.hatprices["RainbowHat"] = 100000;
    this.multiplayerfactorprices = {};
    this.multiplayerfactorprices[2] = 2000;
    this.multiplayerfactorprices[3] = 4000;
    this.multiplayerfactorprices[4] = 8000;
    this.multiplayerfactorprices[5] = 16000;
  }
  return _createClass(DataHandler, [{
    key: "HireSean",
    value: function () {
      var _HireSean = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var data;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return chrome.storage.local.get();
            case 2:
              data = _context.sent;
              data["HireSean"] = 4;
              _context.next = 6;
              return chrome.storage.local.set(data);
            case 6:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function HireSean() {
        return _HireSean.apply(this, arguments);
      }
      return HireSean;
    }()
  }, {
    key: "giveHat",
    value: function () {
      var _giveHat = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(type) {
        var data;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return chrome.storage.local.get();
            case 2:
              data = _context2.sent;
              if (!data["hats"]) {
                data["hats"] = [];
              }
              if (data["hats"].indexOf(type) == -1) {
                data["hats"].push(type);
              }
              _context2.next = 7;
              return chrome.storage.local.set(data);
            case 7:
              UpdateInfo(this);
              return _context2.abrupt("return", false);
            case 9:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function giveHat(_x) {
        return _giveHat.apply(this, arguments);
      }
      return giveHat;
    }()
  }, {
    key: "ownsHat",
    value: function () {
      var _ownsHat = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(type) {
        var data;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return chrome.storage.local.get();
            case 2:
              data = _context3.sent;
              if (!data["hats"]) {
                data["hats"] = [];
              }
              return _context3.abrupt("return", data["hats"].indexOf(type) != -1);
            case 5:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function ownsHat(_x2) {
        return _ownsHat.apply(this, arguments);
      }
      return ownsHat;
    }()
  }, {
    key: "PlayerHealth",
    value: function () {
      var _PlayerHealth = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var data;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return chrome.storage.local.get();
            case 2:
              data = _context4.sent;
              if (data["PlayerHealth"]) {
                data["PlayerHealth"] += 50;
              } else {
                data["PlayerHealth"] = 300;
              }
              _context4.next = 6;
              return chrome.storage.local.set(data);
            case 6:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      function PlayerHealth() {
        return _PlayerHealth.apply(this, arguments);
      }
      return PlayerHealth;
    }()
  }, {
    key: "upgrade",
    value: function () {
      var _upgrade = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(type) {
        var data, Value;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return chrome.storage.local.get();
            case 2:
              data = _context5.sent;
              if (!(type.indexOf("Exponential") == -1)) {
                _context5.next = 7;
                break;
              }
              type = type.replace("Exponential", "");
              this[type]();
              return _context5.abrupt("return");
            case 7:
              type = type.replace("Exponential", "");
              Value = data[type];
              if (!(Value && Value < 4)) {
                _context5.next = 14;
                break;
              }
              Value += Math.ceil(Math.pow(Math.pow(Value, 3) + 1, 1 / 3));
              data[type] = Value;
              _context5.next = 14;
              return chrome.storage.local.set(data);
            case 14:
              UpdateInfo(this);
            case 15:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this);
      }));
      function upgrade(_x3) {
        return _upgrade.apply(this, arguments);
      }
      return upgrade;
    }()
  }, {
    key: "decreaseBling",
    value: function () {
      var _decreaseBling = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(amount) {
        var data, Bling;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return chrome.storage.local.get();
            case 2:
              data = _context6.sent;
              Bling = data["bling"];
              if (!(Bling && Bling >= amount)) {
                _context6.next = 10;
                break;
              }
              Bling -= amount;
              data["bling"] = Bling;
              _context6.next = 9;
              return chrome.storage.local.set(data);
            case 9:
              return _context6.abrupt("return", true);
            case 10:
              return _context6.abrupt("return", false);
            case 11:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }));
      function decreaseBling(_x4) {
        return _decreaseBling.apply(this, arguments);
      }
      return decreaseBling;
    }()
  }, {
    key: "getValue",
    value: function () {
      var _getValue = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7(type) {
        var data, Value;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              if (type.indexOf("Exponential") != -1) {
                type = type.replace("Exponential", "");
              }
              _context7.next = 3;
              return chrome.storage.local.get();
            case 3:
              data = _context7.sent;
              Value = data[type];
              if (!Value) {
                _context7.next = 7;
                break;
              }
              return _context7.abrupt("return", Value);
            case 7:
              return _context7.abrupt("return", 1);
            case 8:
            case "end":
              return _context7.stop();
          }
        }, _callee7);
      }));
      function getValue(_x5) {
        return _getValue.apply(this, arguments);
      }
      return getValue;
    }()
  }, {
    key: "MultiplayerFactor",
    value: function () {
      var _MultiplayerFactor = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
        var data;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return chrome.storage.local.get();
            case 2:
              data = _context8.sent;
              if (!data["MultiplayerFactor"]) {
                data["MultiplayerFactor"] = 2;
              } else {
                data["MultiplayerFactor"] += 1;
              }
              _context8.next = 6;
              return chrome.storage.local.set(data);
            case 6:
            case "end":
              return _context8.stop();
          }
        }, _callee8);
      }));
      function MultiplayerFactor() {
        return _MultiplayerFactor.apply(this, arguments);
      }
      return MultiplayerFactor;
    }()
  }, {
    key: "getMultiplayerFactor",
    value: function () {
      var _getMultiplayerFactor = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9() {
        var data;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return chrome.storage.local.get();
            case 2:
              data = _context9.sent;
              if (!data["MultiplayerFactor"]) {
                _context9.next = 7;
                break;
              }
              return _context9.abrupt("return", data["MultiplayerFactor"]);
            case 7:
              return _context9.abrupt("return", 1);
            case 8:
            case "end":
              return _context9.stop();
          }
        }, _callee9);
      }));
      function getMultiplayerFactor() {
        return _getMultiplayerFactor.apply(this, arguments);
      }
      return getMultiplayerFactor;
    }()
  }, {
    key: "getPrice",
    value: function () {
      var _getPrice = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10(type) {
        var Value, X, _Value, self, factor;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              if (!(type == "PlayerHealth")) {
                _context10.next = 6;
                break;
              }
              _context10.next = 3;
              return this.getValue(type);
            case 3:
              Value = _context10.sent;
              if (Value > 250) {
                X = (Value - 250) / 50 + 1;
              } else {
                X = 2;
              }
              return _context10.abrupt("return", Math.pow(X, 2) * 2000 + 2);
            case 6:
              if (!(type == "HireSean")) {
                _context10.next = 8;
                break;
              }
              return _context10.abrupt("return", 1000);
            case 8:
              if (!(type.indexOf("Hat") != -1)) {
                _context10.next = 10;
                break;
              }
              return _context10.abrupt("return", this.hatprices[type]);
            case 10:
              if (!(type.indexOf("Exponential") != -1)) {
                _context10.next = 16;
                break;
              }
              //Equation
              //Y=6X^4+75
              //Formula
              //ceil(6((y/6 - 12)^1/4)^4)+12
              type = type.replace("Exponential", "");
              _context10.next = 14;
              return this.getValue(type);
            case 14:
              _Value = _context10.sent;
              return _context10.abrupt("return", Math.ceil(6 * Math.pow(Math.pow(_Value / 6 - 12, 1 / 4), 4)) + 12);
            case 16:
              if (!(type == "BuyLevel")) {
                _context10.next = 31;
                break;
              }
              _context10.next = 19;
              return this.getLevel();
            case 19:
              _context10.t0 = _context10.sent;
              _context10.t1 = _context10.t0 + 1;
              if (!this.levelprices[_context10.t1]) {
                _context10.next = 29;
                break;
              }
              _context10.next = 24;
              return this.getLevel();
            case 24:
              _context10.t3 = _context10.sent;
              _context10.t4 = _context10.t3 + 1;
              _context10.t2 = this.levelprices[_context10.t4];
              _context10.next = 30;
              break;
            case 29:
              _context10.t2 = Infinity;
            case 30:
              return _context10.abrupt("return", _context10.t2);
            case 31:
              if (!(type == "MultiplayerFactor")) {
                _context10.next = 39;
                break;
              }
              self = this;
              _context10.next = 35;
              return this.getMultiplayerFactor();
            case 35:
              factor = _context10.sent;
              if (self.multiplayerfactorprices[factor + 1]) {
                _context10.next = 38;
                break;
              }
              return _context10.abrupt("return", Infinity);
            case 38:
              return _context10.abrupt("return", self.multiplayerfactorprices[factor + 1]);
            case 39:
            case "end":
              return _context10.stop();
          }
        }, _callee10, this);
      }));
      function getPrice(_x6) {
        return _getPrice.apply(this, arguments);
      }
      return getPrice;
    }()
  }, {
    key: "BuyLevel",
    value: function () {
      var _BuyLevel = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee11() {
        var data;
        return _regeneratorRuntime().wrap(function _callee11$(_context11) {
          while (1) switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return chrome.storage.local.get();
            case 2:
              data = _context11.sent;
              if (!data["level"]) {
                data["level"] = 1;
              }
              data["level"] += 1;
              _context11.next = 7;
              return chrome.storage.local.set(data);
            case 7:
              UpdateInfo(this);
              return _context11.abrupt("return", true);
            case 9:
            case "end":
              return _context11.stop();
          }
        }, _callee11, this);
      }));
      function BuyLevel() {
        return _BuyLevel.apply(this, arguments);
      }
      return BuyLevel;
    }()
  }, {
    key: "getLevel",
    value: function () {
      var _getLevel = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee12() {
        var data;
        return _regeneratorRuntime().wrap(function _callee12$(_context12) {
          while (1) switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return chrome.storage.local.get();
            case 2:
              data = _context12.sent;
              if (data["level"]) {
                _context12.next = 5;
                break;
              }
              return _context12.abrupt("return", 1);
            case 5:
              return _context12.abrupt("return", data["level"]);
            case 6:
            case "end":
              return _context12.stop();
          }
        }, _callee12);
      }));
      function getLevel() {
        return _getLevel.apply(this, arguments);
      }
      return getLevel;
    }()
  }]);
}();
function UpdateInfo(datahandler) {
  var type;
  if (document.getElementById("shoptoggle").innerText == "Hats") {
    type = document.getElementById("upgrades").value;
  } else {
    type = document.getElementById("hats").value;
  }
  if (type.indexOf("Hat") != -1) {
    datahandler.ownsHat(type).then(function (v) {
      document.getElementById("buy").disabled = v;
    });
  }
  datahandler.getPrice(type).then(function (v) {
    document.getElementById("price").innerText = "Cost: PRICE bling.".replace("PRICE", v);
  });
  datahandler.getValue("bling").then(function (v) {
    document.getElementById("wallet").innerText = "Balance: BALANCE bling.".replace("BALANCE", v);
  });
  datahandler.getLevel().then(function (v) {
    document.getElementById("level").innerText = "You are on stage " + v + ".";
  });
}
function ToggleShop() {
  var toggle = document.getElementById("shoptoggle");
  var buy = document.getElementById("buy");
  var toShow = document.getElementsByClassName(toggle.innerText);
  var _iterator = _createForOfIteratorHelper(toShow),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var element = _step.value;
      element.className = element.className.replaceAll(" hidden", "");
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  if (toggle.innerText == "Upgrades") {
    toggle.innerText = "Hats";
    buy.innerText = "Upgrade";
  } else {
    toggle.innerText = "Upgrades";
    buy.innerText = "Buy";
  }
  var toHide = document.getElementsByClassName(toggle.innerText);
  var _iterator2 = _createForOfIteratorHelper(toHide),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var _element = _step2.value;
      _element.className += " hidden";
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
}
function openPage(page) {
  chrome.runtime.sendMessage({
    type: "open",
    page: page
  }, function (response) {
    if (response.type == "close") {
      window.close();
    }
  });
}
window.addEventListener("load", function (e) {
  var datahandler = new DataHandler(false);
  this.document.getElementById("backbutton").addEventListener("click", function (ev) {
    openPage("popup.html");
  });
  this.document.getElementById("shoptoggle").addEventListener("click", ToggleShop);
  this.document.getElementById("inventory").addEventListener("click", function () {
    openPage("inventory.html");
  });
  this.document.getElementById("upgrades").addEventListener("change", function () {
    UpdateInfo(datahandler);
  });
  this.document.getElementById("hats").addEventListener("change", function () {
    UpdateInfo(datahandler);
  });
  this.document.getElementById("buy").addEventListener("click", function () {
    var type;
    if (document.getElementById("shoptoggle").innerText == "Hats") {
      type = document.getElementById("upgrades").value;
    } else {
      type = document.getElementById("hats").value;
    }
    datahandler.getPrice(type).then(function (v) {
      datahandler.decreaseBling(v).then(function (success) {
        if (success) {
          if (type.indexOf("Hat") == -1) {
            datahandler.upgrade(type);
          } else {
            datahandler.giveHat(type);
          }
          UpdateInfo(datahandler);
        }
      });
    });
  });
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUNDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQ3lCLGdCQUFnQixDQUFDLE9BQU8sRUFBQyxZQUFZO0lBQ3JFLElBQUlwTixJQUFJO0lBQ1IsSUFBSTBMLFFBQVEsQ0FBQ0MsY0FBYyxDQUFDLFlBQVksQ0FBQyxDQUFDQyxTQUFTLElBQUksTUFBTSxFQUFFO01BQzNENUwsSUFBSSxHQUFHMEwsUUFBUSxDQUFDQyxjQUFjLENBQUMsVUFBVSxDQUFDLENBQUM5TSxLQUFLO0lBQ3BELENBQUMsTUFDSTtNQUNEbUIsSUFBSSxHQUFHMEwsUUFBUSxDQUFDQyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUM5TSxLQUFLO0lBQ2hEO0lBQ0E0TSxXQUFXLENBQUNYLFFBQVEsQ0FBQzlLLElBQUksQ0FBQyxDQUFDd0IsSUFBSSxDQUFDLFVBQVVYLENBQUMsRUFBRTtNQUN6QzRLLFdBQVcsQ0FBQzVDLGFBQWEsQ0FBQ2hJLENBQUMsQ0FBQyxDQUFDVyxJQUFJLENBQUMsVUFBVThMLE9BQU8sRUFBRTtRQUNqRCxJQUFJQSxPQUFPLEVBQUU7VUFDVCxJQUFJdE4sSUFBSSxDQUFDNkcsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFO1lBQzNCNEUsV0FBVyxDQUFDcEQsT0FBTyxDQUFDckksSUFBSSxDQUFDO1VBQzdCLENBQUMsTUFDSTtZQUNEeUwsV0FBVyxDQUFDMUUsT0FBTyxDQUFDL0csSUFBSSxDQUFDO1VBQzdCO1VBQ0E4RyxVQUFVLENBQUMyRSxXQUFXLENBQUM7UUFDM0I7TUFDSixDQUFDLENBQUM7SUFDTixDQUFDLENBQUM7RUFDTixDQUFDLENBQUM7QUFDTixDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NlYW5nYW1lLy4vc3JjL3Nob3AuanMiXSwic291cmNlc0NvbnRlbnQiOlsiY2xhc3MgRGF0YUhhbmRsZXJ7XG4gICAgY29uc3RydWN0b3IocmVzZXQpe1xuICAgICAgICBpZiAocmVzZXQpIHtcbiAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmNsZWFyKClcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxldmVscHJpY2VzID0ge31cbiAgICAgICAgdGhpcy5sZXZlbHByaWNlc1syXSA9IDI1MDBcbiAgICAgICAgdGhpcy5sZXZlbHByaWNlc1szXSA9IDEwMDAwXG4gICAgICAgIHRoaXMuaGF0cHJpY2VzID0ge31cbiAgICAgICAgdGhpcy5oYXRwcmljZXNbXCJXaGl0ZUhhdFwiXSA9IDEwMDBcbiAgICAgICAgdGhpcy5oYXRwcmljZXNbXCJHcmVlbkhhdFwiXSA9IDI1MDBcbiAgICAgICAgdGhpcy5oYXRwcmljZXNbXCJCbHVlSGF0XCJdID0gNTAwMFxuICAgICAgICB0aGlzLmhhdHByaWNlc1tcIkJlYWNvbkhhdFwiXSA9IDIwMDAwXG4gICAgICAgIHRoaXMuaGF0cHJpY2VzW1wiUHVycGxlSGF0XCJdID0gNTAwMDBcbiAgICAgICAgdGhpcy5oYXRwcmljZXNbXCJSYWluYm93SGF0XCJdID0gMTAwMDAwXG4gICAgICAgIHRoaXMubXVsdGlwbGF5ZXJmYWN0b3JwcmljZXMgPSB7fVxuICAgICAgICB0aGlzLm11bHRpcGxheWVyZmFjdG9ycHJpY2VzWzJdID0gMjAwMFxuICAgICAgICB0aGlzLm11bHRpcGxheWVyZmFjdG9ycHJpY2VzWzNdID0gNDAwMFxuICAgICAgICB0aGlzLm11bHRpcGxheWVyZmFjdG9ycHJpY2VzWzRdID0gODAwMFxuICAgICAgICB0aGlzLm11bHRpcGxheWVyZmFjdG9ycHJpY2VzWzVdID0gMTYwMDBcbiAgICB9XG4gICAgYXN5bmMgSGlyZVNlYW4oKSB7XG4gICAgICAgIGxldCBkYXRhID0gYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KClcbiAgICAgICAgZGF0YVtcIkhpcmVTZWFuXCJdID0gNFxuICAgICAgICBhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoZGF0YSlcbiAgICB9XG4gICAgYXN5bmMgZ2l2ZUhhdCh0eXBlKSB7XG4gICAgICAgIGxldCBkYXRhID0gYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KClcbiAgICAgICAgaWYgKCFkYXRhW1wiaGF0c1wiXSkge1xuICAgICAgICAgICAgZGF0YVtcImhhdHNcIl0gPSBbXVxuICAgICAgICB9XG4gICAgICAgIGlmIChkYXRhW1wiaGF0c1wiXS5pbmRleE9mKHR5cGUpID09IC0xKSB7XG4gICAgICAgICAgICBkYXRhW1wiaGF0c1wiXS5wdXNoKHR5cGUpXG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KGRhdGEpXG4gICAgICAgIFVwZGF0ZUluZm8odGhpcylcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIGFzeW5jIG93bnNIYXQodHlwZSkge1xuICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgpXG4gICAgICAgIGlmICghZGF0YVtcImhhdHNcIl0pIHtcbiAgICAgICAgICAgIGRhdGFbXCJoYXRzXCJdID0gW11cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0YVtcImhhdHNcIl0uaW5kZXhPZih0eXBlKSAhPSAtMVxuICAgIH0gXG4gICAgYXN5bmMgUGxheWVySGVhbHRoKCkge1xuICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgpXG4gICAgICAgIGlmIChkYXRhW1wiUGxheWVySGVhbHRoXCJdKSB7XG4gICAgICAgICAgICBkYXRhW1wiUGxheWVySGVhbHRoXCJdICs9IDUwXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkYXRhW1wiUGxheWVySGVhbHRoXCJdID0gMzAwXG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KGRhdGEpXG4gICAgfVxuICAgIGFzeW5jIHVwZ3JhZGUodHlwZSkge1xuICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgpXG4gICAgICAgIGlmICh0eXBlLmluZGV4T2YoXCJFeHBvbmVudGlhbFwiKSA9PSAtMSkge1xuICAgICAgICAgICAgdHlwZSA9IHR5cGUucmVwbGFjZShcIkV4cG9uZW50aWFsXCIsXCJcIilcbiAgICAgICAgICAgIHRoaXNbdHlwZV0oKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgdHlwZSA9IHR5cGUucmVwbGFjZShcIkV4cG9uZW50aWFsXCIsXCJcIilcbiAgICAgICAgbGV0IFZhbHVlID0gZGF0YVt0eXBlXVxuICAgICAgICBpZiAoVmFsdWUgJiYgVmFsdWUgPCA0ICkge1xuICAgICAgICAgICAgVmFsdWUgKz0gTWF0aC5jZWlsKE1hdGgucG93KE1hdGgucG93KFZhbHVlLDMpICsgMSwxLzMpKVxuICAgICAgICAgICAgZGF0YVt0eXBlXSA9IFZhbHVlXG4gICAgICAgICAgICBhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoZGF0YSlcbiAgICAgICAgfVxuICAgICAgICBVcGRhdGVJbmZvKHRoaXMpXG4gICAgfVxuICAgIGFzeW5jIGRlY3JlYXNlQmxpbmcoYW1vdW50KSB7XG4gICAgICAgIGxldCBkYXRhID0gYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KClcbiAgICAgICAgbGV0IEJsaW5nID0gZGF0YVtcImJsaW5nXCJdXG4gICAgICAgIGlmIChCbGluZyAmJiBCbGluZyA+PSBhbW91bnQpIHtcbiAgICAgICAgICAgIEJsaW5nIC09IGFtb3VudFxuICAgICAgICAgICAgZGF0YVtcImJsaW5nXCJdID0gQmxpbmdcbiAgICAgICAgICAgIGF3YWl0IGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldChkYXRhKVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgYXN5bmMgZ2V0VmFsdWUodHlwZSkge1xuICAgICAgICBpZiAodHlwZS5pbmRleE9mKFwiRXhwb25lbnRpYWxcIikgIT0gLTEpe1xuICAgICAgICAgICAgdHlwZSA9IHR5cGUucmVwbGFjZShcIkV4cG9uZW50aWFsXCIsXCJcIilcbiAgICAgICAgfVxuICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgpXG4gICAgICAgIGxldCBWYWx1ZSA9IGRhdGFbdHlwZV1cbiAgICAgICAgaWYgKFZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gVmFsdWVcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMVxuICAgIH1cblxuICAgIGFzeW5jIE11bHRpcGxheWVyRmFjdG9yKCkge1xuICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgpXG4gICAgICAgIGlmICghZGF0YVtcIk11bHRpcGxheWVyRmFjdG9yXCJdKSB7XG4gICAgICAgICAgICBkYXRhW1wiTXVsdGlwbGF5ZXJGYWN0b3JcIl0gPSAyXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkYXRhW1wiTXVsdGlwbGF5ZXJGYWN0b3JcIl0gKz0gMVxuICAgICAgICB9XG4gICAgICAgIGF3YWl0IGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldChkYXRhKVxuICAgIH1cblxuICAgIGFzeW5jIGdldE11bHRpcGxheWVyRmFjdG9yKCkge1xuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KClcbiAgICAgICAgaWYgKGRhdGFbXCJNdWx0aXBsYXllckZhY3RvclwiXSkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGFbXCJNdWx0aXBsYXllckZhY3RvclwiXVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDFcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGdldFByaWNlKHR5cGUpIHtcbiAgICAgICAgaWYgKHR5cGUgPT0gXCJQbGF5ZXJIZWFsdGhcIikge1xuICAgICAgICAgICAgbGV0IFZhbHVlID0gYXdhaXQgdGhpcy5nZXRWYWx1ZSh0eXBlKVxuICAgICAgICAgICAgbGV0IFhcbiAgICAgICAgICAgIGlmIChWYWx1ZSA+IDI1MCl7XG4gICAgICAgICAgICAgICAgWCA9IChWYWx1ZSAtIDI1MCkvNTAgKyAxXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBYID0gMlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuICgoTWF0aC5wb3coWCwyKSkgKiAyMDAwKSArIDJcbiAgICAgICAgfVxuICAgICAgICBpZiAodHlwZSA9PSBcIkhpcmVTZWFuXCIpIHtcbiAgICAgICAgICAgIHJldHVybiAxMDAwXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGUuaW5kZXhPZihcIkhhdFwiKSAhPSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGF0cHJpY2VzW3R5cGVdXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGUuaW5kZXhPZihcIkV4cG9uZW50aWFsXCIpICE9IC0xKSB7XG4gICAgICAgICAgICAvL0VxdWF0aW9uXG4gICAgICAgICAgICAvL1k9NlheNCs3NVxuICAgICAgICAgICAgLy9Gb3JtdWxhXG4gICAgICAgICAgICAvL2NlaWwoNigoeS82IC0gMTIpXjEvNCleNCkrMTJcbiAgICAgICAgICAgIHR5cGUgPSB0eXBlLnJlcGxhY2UoXCJFeHBvbmVudGlhbFwiLFwiXCIpXG4gICAgICAgICAgICBsZXQgVmFsdWUgPSBhd2FpdCB0aGlzLmdldFZhbHVlKHR5cGUpXG4gICAgICAgICAgICByZXR1cm4gTWF0aC5jZWlsKDYgKiBNYXRoLnBvdygoTWF0aC5wb3coVmFsdWUvNiAtIDEyLDEvNCkpLDQpKSArIDEyXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGUgPT0gXCJCdXlMZXZlbFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sZXZlbHByaWNlc1thd2FpdCB0aGlzLmdldExldmVsKCkgKyAxXSA/IHRoaXMubGV2ZWxwcmljZXNbYXdhaXQgdGhpcy5nZXRMZXZlbCgpICsgMV0gOiBJbmZpbml0eVxuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlID09IFwiTXVsdGlwbGF5ZXJGYWN0b3JcIikge1xuICAgICAgICAgICAgbGV0IHNlbGYgPSB0aGlzXG4gICAgICAgICAgICBsZXQgZmFjdG9yID0gYXdhaXQgdGhpcy5nZXRNdWx0aXBsYXllckZhY3RvcigpXG4gICAgICAgICAgICBpZiAoIXNlbGYubXVsdGlwbGF5ZXJmYWN0b3JwcmljZXNbZmFjdG9yICsgMV0pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gSW5maW5pdHlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzZWxmLm11bHRpcGxheWVyZmFjdG9ycHJpY2VzW2ZhY3RvciArIDFdXG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgYXN5bmMgQnV5TGV2ZWwoKSB7XG4gICAgICAgIGxldCBkYXRhID0gYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwuZ2V0KClcbiAgICAgICAgaWYgKCFkYXRhW1wibGV2ZWxcIl0pIHtcbiAgICAgICAgICAgIGRhdGFbXCJsZXZlbFwiXSA9IDFcbiAgICAgICAgfVxuICAgICAgICBkYXRhW1wibGV2ZWxcIl0gKz0gMVxuICAgICAgICBhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoZGF0YSlcbiAgICAgICAgVXBkYXRlSW5mbyh0aGlzKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICBhc3luYyBnZXRMZXZlbCgpIHtcbiAgICAgICAgbGV0IGRhdGEgPSBhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoKVxuICAgICAgICBpZiAoIWRhdGFbXCJsZXZlbFwiXSkge1xuICAgICAgICAgICAgcmV0dXJuIDFcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0YVtcImxldmVsXCJdXG4gICAgfVxufVxuZnVuY3Rpb24gVXBkYXRlSW5mbyhkYXRhaGFuZGxlcikge1xuICAgIGxldCB0eXBlXG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2hvcHRvZ2dsZVwiKS5pbm5lclRleHQgPT0gXCJIYXRzXCIpIHtcbiAgICAgICAgdHlwZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidXBncmFkZXNcIikudmFsdWVcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHR5cGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhhdHNcIikudmFsdWVcbiAgICB9XG4gICAgaWYgKHR5cGUuaW5kZXhPZihcIkhhdFwiKSAhPSAtMSkge1xuICAgICAgICBkYXRhaGFuZGxlci5vd25zSGF0KHR5cGUpLnRoZW4oZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnV5XCIpLmRpc2FibGVkID0gdlxuICAgICAgICB9KVxuICAgIH1cbiAgICBkYXRhaGFuZGxlci5nZXRQcmljZSh0eXBlKS50aGVuKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicHJpY2VcIikuaW5uZXJUZXh0ID0gXCJDb3N0OiBQUklDRSBibGluZy5cIi5yZXBsYWNlKFwiUFJJQ0VcIix2KVxuICAgIH0pXG4gICAgZGF0YWhhbmRsZXIuZ2V0VmFsdWUoXCJibGluZ1wiKS50aGVuKGZ1bmN0aW9uICh2KSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwid2FsbGV0XCIpLmlubmVyVGV4dCA9IFwiQmFsYW5jZTogQkFMQU5DRSBibGluZy5cIi5yZXBsYWNlKFwiQkFMQU5DRVwiLHYpXG4gICAgfSlcbiAgICBkYXRhaGFuZGxlci5nZXRMZXZlbCgpLnRoZW4oZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsZXZlbFwiKS5pbm5lclRleHQgPSBcIllvdSBhcmUgb24gc3RhZ2UgXCIgKyB2ICsgXCIuXCJcbiAgICB9KVxufVxuZnVuY3Rpb24gVG9nZ2xlU2hvcCgpIHtcbiAgICBsZXQgdG9nZ2xlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaG9wdG9nZ2xlXCIpXG4gICAgbGV0IGJ1eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnV5XCIpXG4gICAgbGV0IHRvU2hvdyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodG9nZ2xlLmlubmVyVGV4dClcbiAgICBmb3IgKGxldCBlbGVtZW50IG9mIHRvU2hvdyl7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gZWxlbWVudC5jbGFzc05hbWUucmVwbGFjZUFsbChcIiBoaWRkZW5cIixcIlwiKVxuICAgIH1cbiAgICBpZiAodG9nZ2xlLmlubmVyVGV4dCA9PSBcIlVwZ3JhZGVzXCIpIHtcbiAgICAgICAgdG9nZ2xlLmlubmVyVGV4dCA9IFwiSGF0c1wiXG4gICAgICAgIGJ1eS5pbm5lclRleHQgPSBcIlVwZ3JhZGVcIlxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdG9nZ2xlLmlubmVyVGV4dCA9IFwiVXBncmFkZXNcIlxuICAgICAgICBidXkuaW5uZXJUZXh0ID0gXCJCdXlcIlxuICAgIH1cbiAgICBsZXQgdG9IaWRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0b2dnbGUuaW5uZXJUZXh0KVxuICAgIGZvciAobGV0IGVsZW1lbnQgb2YgdG9IaWRlKXtcbiAgICAgICAgZWxlbWVudC5jbGFzc05hbWUgKz0gXCIgaGlkZGVuXCJcbiAgICB9XG59XG5mdW5jdGlvbiBvcGVuUGFnZShwYWdlKSB7XG4gICAgY2hyb21lLnJ1bnRpbWUuc2VuZE1lc3NhZ2Uoe3R5cGU6XCJvcGVuXCIsIHBhZ2U6cGFnZX0sIGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICBpZiAocmVzcG9uc2UudHlwZSA9PSBcImNsb3NlXCIpIHtcbiAgICAgICAgICAgIHdpbmRvdy5jbG9zZSgpXG4gICAgICAgIH1cbiAgICB9KVxufVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsZnVuY3Rpb24gKGUpIHtcbiAgICBsZXQgZGF0YWhhbmRsZXIgPSBuZXcgRGF0YUhhbmRsZXIoZmFsc2UpXG4gICAgdGhpcy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJhY2tidXR0b25cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChldikge1xuICAgICAgICBvcGVuUGFnZShcInBvcHVwLmh0bWxcIilcbiAgICB9KVxuICAgIHRoaXMuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaG9wdG9nZ2xlXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBUb2dnbGVTaG9wKVxuICAgIHRoaXMuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnZlbnRvcnlcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgb3BlblBhZ2UoXCJpbnZlbnRvcnkuaHRtbFwiKVxuICAgIH0pXG4gICAgdGhpcy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInVwZ3JhZGVzXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgZnVuY3Rpb24gKCkge1xuICAgICAgICBVcGRhdGVJbmZvKGRhdGFoYW5kbGVyKVxuICAgIH0pXG4gICAgdGhpcy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImhhdHNcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIFVwZGF0ZUluZm8oZGF0YWhhbmRsZXIpXG4gICAgfSlcbiAgICB0aGlzLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnV5XCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IHR5cGUgXG4gICAgICAgIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNob3B0b2dnbGVcIikuaW5uZXJUZXh0ID09IFwiSGF0c1wiKSB7XG4gICAgICAgICAgICB0eXBlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ1cGdyYWRlc1wiKS52YWx1ZVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdHlwZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaGF0c1wiKS52YWx1ZVxuICAgICAgICB9XG4gICAgICAgIGRhdGFoYW5kbGVyLmdldFByaWNlKHR5cGUpLnRoZW4oZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgIGRhdGFoYW5kbGVyLmRlY3JlYXNlQmxpbmcodikudGhlbihmdW5jdGlvbiAoc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlLmluZGV4T2YoXCJIYXRcIikgPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFoYW5kbGVyLnVwZ3JhZGUodHlwZSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGFoYW5kbGVyLmdpdmVIYXQodHlwZSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBVcGRhdGVJbmZvKGRhdGFoYW5kbGVyKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfSlcbn0pIl0sIm5hbWVzIjpbIl9yZWdlbmVyYXRvclJ1bnRpbWUiLCJlIiwidCIsInIiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJuIiwiaGFzT3duUHJvcGVydHkiLCJvIiwiZGVmaW5lUHJvcGVydHkiLCJ2YWx1ZSIsImkiLCJTeW1ib2wiLCJhIiwiaXRlcmF0b3IiLCJjIiwiYXN5bmNJdGVyYXRvciIsInUiLCJ0b1N0cmluZ1RhZyIsImRlZmluZSIsImVudW1lcmFibGUiLCJjb25maWd1cmFibGUiLCJ3cml0YWJsZSIsIndyYXAiLCJHZW5lcmF0b3IiLCJjcmVhdGUiLCJDb250ZXh0IiwibWFrZUludm9rZU1ldGhvZCIsInRyeUNhdGNoIiwidHlwZSIsImFyZyIsImNhbGwiLCJoIiwibCIsImYiLCJzIiwieSIsIkdlbmVyYXRvckZ1bmN0aW9uIiwiR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUiLCJwIiwiZCIsImdldFByb3RvdHlwZU9mIiwidiIsInZhbHVlcyIsImciLCJkZWZpbmVJdGVyYXRvck1ldGhvZHMiLCJmb3JFYWNoIiwiX2ludm9rZSIsIkFzeW5jSXRlcmF0b3IiLCJpbnZva2UiLCJfdHlwZW9mIiwicmVzb2x2ZSIsIl9fYXdhaXQiLCJ0aGVuIiwiY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmciLCJFcnJvciIsImRvbmUiLCJtZXRob2QiLCJkZWxlZ2F0ZSIsIm1heWJlSW52b2tlRGVsZWdhdGUiLCJzZW50IiwiX3NlbnQiLCJkaXNwYXRjaEV4Y2VwdGlvbiIsImFicnVwdCIsIlR5cGVFcnJvciIsInJlc3VsdE5hbWUiLCJuZXh0IiwibmV4dExvYyIsInB1c2hUcnlFbnRyeSIsInRyeUxvYyIsImNhdGNoTG9jIiwiZmluYWxseUxvYyIsImFmdGVyTG9jIiwidHJ5RW50cmllcyIsInB1c2giLCJyZXNldFRyeUVudHJ5IiwiY29tcGxldGlvbiIsInJlc2V0IiwiaXNOYU4iLCJsZW5ndGgiLCJkaXNwbGF5TmFtZSIsImlzR2VuZXJhdG9yRnVuY3Rpb24iLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJtYXJrIiwic2V0UHJvdG90eXBlT2YiLCJfX3Byb3RvX18iLCJhd3JhcCIsImFzeW5jIiwiUHJvbWlzZSIsImtleXMiLCJyZXZlcnNlIiwicG9wIiwicHJldiIsImNoYXJBdCIsInNsaWNlIiwic3RvcCIsInJ2YWwiLCJoYW5kbGUiLCJjb21wbGV0ZSIsImZpbmlzaCIsIl9jYXRjaCIsImRlbGVnYXRlWWllbGQiLCJhc3luY0dlbmVyYXRvclN0ZXAiLCJfYXN5bmNUb0dlbmVyYXRvciIsImFyZ3VtZW50cyIsImFwcGx5IiwiX25leHQiLCJfdGhyb3ciLCJfY2xhc3NDYWxsQ2hlY2siLCJfZGVmaW5lUHJvcGVydGllcyIsIl90b1Byb3BlcnR5S2V5Iiwia2V5IiwiX2NyZWF0ZUNsYXNzIiwiX3RvUHJpbWl0aXZlIiwidG9QcmltaXRpdmUiLCJTdHJpbmciLCJOdW1iZXIiLCJEYXRhSGFuZGxlciIsImNocm9tZSIsInN0b3JhZ2UiLCJsb2NhbCIsImNsZWFyIiwibGV2ZWxwcmljZXMiLCJoYXRwcmljZXMiLCJtdWx0aXBsYXllcmZhY3RvcnByaWNlcyIsIl9IaXJlU2VhbiIsIl9jYWxsZWUiLCJkYXRhIiwiX2NhbGxlZSQiLCJfY29udGV4dCIsImdldCIsInNldCIsIkhpcmVTZWFuIiwiX2dpdmVIYXQiLCJfY2FsbGVlMiIsIl9jYWxsZWUyJCIsIl9jb250ZXh0MiIsImluZGV4T2YiLCJVcGRhdGVJbmZvIiwiZ2l2ZUhhdCIsIl94IiwiX293bnNIYXQiLCJfY2FsbGVlMyIsIl9jYWxsZWUzJCIsIl9jb250ZXh0MyIsIm93bnNIYXQiLCJfeDIiLCJfUGxheWVySGVhbHRoIiwiX2NhbGxlZTQiLCJfY2FsbGVlNCQiLCJfY29udGV4dDQiLCJQbGF5ZXJIZWFsdGgiLCJfdXBncmFkZSIsIl9jYWxsZWU1IiwiVmFsdWUiLCJfY2FsbGVlNSQiLCJfY29udGV4dDUiLCJyZXBsYWNlIiwiTWF0aCIsImNlaWwiLCJwb3ciLCJ1cGdyYWRlIiwiX3gzIiwiX2RlY3JlYXNlQmxpbmciLCJfY2FsbGVlNiIsImFtb3VudCIsIkJsaW5nIiwiX2NhbGxlZTYkIiwiX2NvbnRleHQ2IiwiZGVjcmVhc2VCbGluZyIsIl94NCIsIl9nZXRWYWx1ZSIsIl9jYWxsZWU3IiwiX2NhbGxlZTckIiwiX2NvbnRleHQ3IiwiZ2V0VmFsdWUiLCJfeDUiLCJfTXVsdGlwbGF5ZXJGYWN0b3IiLCJfY2FsbGVlOCIsIl9jYWxsZWU4JCIsIl9jb250ZXh0OCIsIk11bHRpcGxheWVyRmFjdG9yIiwiX2dldE11bHRpcGxheWVyRmFjdG9yIiwiX2NhbGxlZTkiLCJfY2FsbGVlOSQiLCJfY29udGV4dDkiLCJnZXRNdWx0aXBsYXllckZhY3RvciIsIl9nZXRQcmljZSIsIl9jYWxsZWUxMCIsIlgiLCJfVmFsdWUiLCJzZWxmIiwiZmFjdG9yIiwiX2NhbGxlZTEwJCIsIl9jb250ZXh0MTAiLCJnZXRMZXZlbCIsInQwIiwidDEiLCJ0MyIsInQ0IiwidDIiLCJJbmZpbml0eSIsImdldFByaWNlIiwiX3g2IiwiX0J1eUxldmVsIiwiX2NhbGxlZTExIiwiX2NhbGxlZTExJCIsIl9jb250ZXh0MTEiLCJCdXlMZXZlbCIsIl9nZXRMZXZlbCIsIl9jYWxsZWUxMiIsIl9jYWxsZWUxMiQiLCJfY29udGV4dDEyIiwiZGF0YWhhbmRsZXIiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiaW5uZXJUZXh0IiwiZGlzYWJsZWQiLCJUb2dnbGVTaG9wIiwidG9nZ2xlIiwiYnV5IiwidG9TaG93IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsIl9pdGVyYXRvciIsIl9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyIiwiX3N0ZXAiLCJlbGVtZW50IiwiY2xhc3NOYW1lIiwicmVwbGFjZUFsbCIsImVyciIsInRvSGlkZSIsIl9pdGVyYXRvcjIiLCJfc3RlcDIiLCJvcGVuUGFnZSIsInBhZ2UiLCJydW50aW1lIiwic2VuZE1lc3NhZ2UiLCJyZXNwb25zZSIsIndpbmRvdyIsImNsb3NlIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2Iiwic3VjY2VzcyJdLCJzb3VyY2VSb290IjoiIn0=