/******/ (() => { // webpackBootstrap
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var renderer;
var player;
var obstacle;
var sean;
var keyhandler;
var datahandler;
var networkingclient;
var boss;
var abhinav;
var GAMEMODE;
var DataHandler = /*#__PURE__*/function () {
  function DataHandler(reset) {
    _classCallCheck(this, DataHandler);
    if (reset) {
      chrome.storage.local.clear();
    }
  }
  return _createClass(DataHandler, [{
    key: "getSelectedHat",
    value: function () {
      var _getSelectedHat = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var data;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return chrome.storage.local.get();
            case 2:
              data = _context.sent;
              if (!data["hat"]) {
                _context.next = 5;
                break;
              }
              return _context.abrupt("return", data["hat"]);
            case 5:
              return _context.abrupt("return", null);
            case 6:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function getSelectedHat() {
        return _getSelectedHat.apply(this, arguments);
      }
      return getSelectedHat;
    }()
  }, {
    key: "getBling",
    value: function () {
      var _getBling = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var data;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return chrome.storage.local.get();
            case 2:
              data = _context2.sent;
              if (!data["bling"]) {
                _context2.next = 6;
                break;
              }
              data["bling"] = parseInt(data["bling"]);
              return _context2.abrupt("return", data["bling"]);
            case 6:
              return _context2.abrupt("return", 0);
            case 7:
            case "end":
              return _context2.stop();
          }
        }, _callee2);
      }));
      function getBling() {
        return _getBling.apply(this, arguments);
      }
      return getBling;
    }()
  }, {
    key: "getPlayerHealth",
    value: function () {
      var _getPlayerHealth = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var data;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return chrome.storage.local.get();
            case 2:
              data = _context3.sent;
              if (!data["PlayerHealth"]) {
                _context3.next = 7;
                break;
              }
              return _context3.abrupt("return", data["PlayerHealth"]);
            case 7:
              return _context3.abrupt("return", 250);
            case 8:
            case "end":
              return _context3.stop();
          }
        }, _callee3);
      }));
      function getPlayerHealth() {
        return _getPlayerHealth.apply(this, arguments);
      }
      return getPlayerHealth;
    }()
  }, {
    key: "addBling",
    value: function () {
      var _addBling = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(amount) {
        var data;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return chrome.storage.local.get();
            case 2:
              data = _context4.sent;
              if (data["bling"]) {
                data["bling"] = parseInt(data["bling"]);
                data["bling"] += amount;
              } else {
                data["bling"] = amount;
              }
              _context4.next = 6;
              return chrome.storage.local.set(data);
            case 6:
            case "end":
              return _context4.stop();
          }
        }, _callee4);
      }));
      function addBling(_x) {
        return _addBling.apply(this, arguments);
      }
      return addBling;
    }()
  }, {
    key: "getPlayerBullet",
    value: function () {
      var _getPlayerBullet = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        var data;
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return chrome.storage.local.get();
            case 2:
              data = _context5.sent;
              if (!data["PlayerBullet"]) {
                _context5.next = 5;
                break;
              }
              return _context5.abrupt("return", data["PlayerBullet"]);
            case 5:
              data["PlayerBullet"] = 1;
              _context5.next = 8;
              return chrome.storage.local.set(data);
            case 8:
              return _context5.abrupt("return", 1);
            case 9:
            case "end":
              return _context5.stop();
          }
        }, _callee5);
      }));
      function getPlayerBullet() {
        return _getPlayerBullet.apply(this, arguments);
      }
      return getPlayerBullet;
    }()
  }, {
    key: "getSeanBullet",
    value: function () {
      var _getSeanBullet = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        var data;
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return chrome.storage.local.get();
            case 2:
              data = _context6.sent;
              if (!data["SeanBullet"]) {
                _context6.next = 5;
                break;
              }
              return _context6.abrupt("return", data["SeanBullet"]);
            case 5:
              data["SeanBullet"] = 1;
              _context6.next = 8;
              return chrome.storage.local.set(data);
            case 8:
              return _context6.abrupt("return", 1);
            case 9:
            case "end":
              return _context6.stop();
          }
        }, _callee6);
      }));
      function getSeanBullet() {
        return _getSeanBullet.apply(this, arguments);
      }
      return getSeanBullet;
    }()
  }, {
    key: "getSeanStatus",
    value: function () {
      var _getSeanStatus = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
        var data;
        return _regeneratorRuntime().wrap(function _callee7$(_context7) {
          while (1) switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return chrome.storage.local.get();
            case 2:
              data = _context7.sent;
              if (!data["HireSean"]) {
                _context7.next = 5;
                break;
              }
              return _context7.abrupt("return", true);
            case 5:
              return _context7.abrupt("return", false);
            case 6:
            case "end":
              return _context7.stop();
          }
        }, _callee7);
      }));
      function getSeanStatus() {
        return _getSeanStatus.apply(this, arguments);
      }
      return getSeanStatus;
    }()
  }, {
    key: "subtractBling",
    value: function () {
      var _subtractBling = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8(amount) {
        var data;
        return _regeneratorRuntime().wrap(function _callee8$(_context8) {
          while (1) switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return chrome.storage.local.get();
            case 2:
              data = _context8.sent;
              if (!(!data["bling"] || data["bling"] < amount)) {
                _context8.next = 5;
                break;
              }
              return _context8.abrupt("return", false);
            case 5:
              data["bling"] -= amount;
              _context8.next = 8;
              return chrome.storage.local.set(data);
            case 8:
              return _context8.abrupt("return", true);
            case 9:
            case "end":
              return _context8.stop();
          }
        }, _callee8);
      }));
      function subtractBling(_x2) {
        return _subtractBling.apply(this, arguments);
      }
      return subtractBling;
    }()
  }, {
    key: "handleLevel",
    value: function () {
      var _handleLevel = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(level) {
        var data;
        return _regeneratorRuntime().wrap(function _callee9$(_context9) {
          while (1) switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return chrome.storage.local.get();
            case 2:
              data = _context9.sent;
              if (data["level"]) {
                _context9.next = 5;
                break;
              }
              return _context9.abrupt("return", false);
            case 5:
              if (!(data["level"] < level)) {
                _context9.next = 7;
                break;
              }
              return _context9.abrupt("return", false);
            case 7:
              return _context9.abrupt("return", true);
            case 8:
            case "end":
              return _context9.stop();
          }
        }, _callee9);
      }));
      function handleLevel(_x3) {
        return _handleLevel.apply(this, arguments);
      }
      return handleLevel;
    }()
  }, {
    key: "handleAdView",
    value: function () {
      var _handleAdView = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee10() {
        var data, lastreset, now;
        return _regeneratorRuntime().wrap(function _callee10$(_context10) {
          while (1) switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return chrome.storage.local.get();
            case 2:
              data = _context10.sent;
              if (!data["rewardreset"]) {
                data["rewardreset"] = Date.now();
                data["reward"] = 260;
              }
              lastreset = new Date();
              lastreset.setTime(data["rewardreset"]);
              now = new Date();
              now.setTime(Date.now());
              if (lastreset.getUTCDate() != now.getUTCDate() || lastreset.getUTCMonth() != now.getUTCMonth()) {
                data["rewardreset"] = Date.now();
                data["reward"] = 260;
              }
              if (data["reward"] > 10) {
                data["reward"] -= 10;
              }
              _context10.next = 12;
              return chrome.storage.local.set(data);
            case 12:
              _context10.next = 14;
              return this.addBling(parseInt(data["reward"]) + 10);
            case 14:
            case "end":
              return _context10.stop();
          }
        }, _callee10, this);
      }));
      function handleAdView() {
        return _handleAdView.apply(this, arguments);
      }
      return handleAdView;
    }()
  }]);
}();
var NetworkingClient = /*#__PURE__*/function () {
  function NetworkingClient(server, canvas, width, height) {
    _classCallCheck(this, NetworkingClient);
    this.server = server;
    this.width = width;
    this.height = height;
    this.canvas = canvas;
    this.checkinterval = setInterval(this.checkConnection, 100, this);
    this.keys = [];
    this.mousex = 0;
    this.mousestate = false;
    this.mousey = 0;
    this.statustext = "Connecting...";
    this.connection = new WebSocket(this.server);
    this.connection.addEventListener("close", this);
    this.connection.addEventListener("message", this);
    this.connection.addEventListener("open", this);
    this.connection.addEventListener("error", this);
    document.addEventListener("mousemove", this);
    document.addEventListener("pointerdown", this);
    document.addEventListener("pointerup", this);
    document.addEventListener("keydown", this);
    document.addEventListener("keyup", this);
  }
  return _createClass(NetworkingClient, [{
    key: "socketClose",
    value: function socketClose(saveStatus) {
      clearInterval(this.tick);
      clearInterval(this.checkinterval);
      this.clearListeners();
      if (!saveStatus) {
        this.statustext = "Disconnected :(";
      }
    }
  }, {
    key: "checkConnection",
    value: function checkConnection() {
      if (!self.connection) {
        return;
      }
      var Time = new Date().getTime();
      if (self.connection.readyState > WebSocket.CONNECTING && Time - self.lastMessage > 3000) {
        self.connection.close();
        self.socketClose();
      }
    }
  }, {
    key: "clearListeners",
    value: function clearListeners() {
      document.removeEventListener("mousemove", this);
      document.removeEventListener("pointerdown", this);
      document.removeEventListener("pointerup", this);
      document.removeEventListener("keydown", this);
      document.removeEventListener("keyup", this);
    }
  }, {
    key: "draw",
    value: function draw(data) {
      var context = this.canvas.getContext("2d");
      context.clearRect(0, 0, this.width, this.height);
      for (var key in data) {
        var object = data[key];
        if (object.type == "text") {
          context.font = "18px Times New Roman";
          context.textAlign = "center";
          context.textBaseline = "middle";
          context.fillStyle = "#8aea92";
          context.fillText(object.text, object.x, object.y);
        }
        context.fillStyle = object.fillStyle;
        if (object.type == "rectangle") {
          context.fillRect(object.x, object.y, object.width, object.height);
        }
        if (object.type == "circle") {
          context.beginPath();
          context.arc(object.x, object.y, object.radius, 0, 360, false);
          context.closePath();
          context.fill();
        }
        if (object.shape == "texture") {
          var img = new Image(object.width, object.height);
          img.src = object.texture;
          context.drawImage(img, object.x, object.y);
        }
      }
    }
  }, {
    key: "statustext",
    set: function set(value) {
      this._statustext = value;
      var context = this.canvas.getContext("2d");
      context.clearRect(0, 0, this.width, this.height);
      context.font = "18px Times New Roman";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillStyle = "#8aea92";
      context.fillText(value, this.width / 2, this.height / 2);
    }
  }, {
    key: "reconnect",
    value: function reconnect(self) {
      networkingclient = new NetworkingClient(self.server, self.canvas, self.width, self.height);
    }
  }, {
    key: "recieveUpdate",
    value: function recieveUpdate(request) {
      if (request.type == "frame") {
        this.draw(request.data);
      }
      if (request.type == "kick") {
        this.statustext = request.reason;
        this.clearListeners();
      }
      if (request.type == "reconnect") {
        setTimeout(this.reconnect, request.time, this);
        this.socketClose(true);
        this.connection.close();
        this.connection.removeEventListener("close", this);
        this.connection.removeEventListener("message", this);
        this.connection.removeEventListener("open", this);
        this.connection.removeEventListener("error", this);
        this.statustext = "Reconnecting...";
      }
    }
  }, {
    key: "handleEvent",
    value: function handleEvent(ev) {
      if (ev.type == "pointerdown") {
        this.mousestate = true;
      }
      if (ev.type == "pointerup") {
        this.mousestate = false;
      }
      if (ev.type == "mousemove") {
        var canvas = this.canvas;
        var rect = canvas.getBoundingClientRect();
        this.mousex = ev.clientX - rect.left;
        this.mousey = ev.clientY - rect.top;
      }
      if (ev.type == "message") {
        this.recieveUpdate(JSON.parse(ev.data));
        this.lastMessage = new Date().getTime();
      }
      if (ev.type == "open") {
        this.statustext = "";
        this.tick = setInterval(this.sendUpdate, 1000 / 60, this);
      }
      if (ev.type == "close") {
        this.socketClose();
      }
      if (ev.type == "error") {
        this.socketClose();
      }
      if (ev.type == "keydown") {
        if (this.keys.indexOf(ev.key) == -1) {
          this.keys.push(ev.key);
        }
      }
      if (ev.type == "keyup") {
        var index = this.keys.indexOf(ev.key);
        if (index > -1) {
          this.keys.splice(index, 1);
        }
      }
    }
  }, {
    key: "sendUpdate",
    value: function sendUpdate(self) {
      var Input = {
        Keys: self.keys,
        MousePos: {
          X: self.mousex,
          Y: self.mousey
        },
        MouseState: self.mousestate
      };
      self.connection.send(JSON.stringify(Input));
    }
  }]);
}();
window.addEventListener("load", function () {
  chrome.action.setPopup({
    popup: "popup.html"
  });
  datahandler = new DataHandler(false);
  var canvas = document.createElement("canvas");
  canvas.id = "canvas";
  document.body.appendChild(canvas);
  canvas.width = 400;
  canvas.height = 300;
  networkingclient = new NetworkingClient("ws://127.0.0.1:690", canvas, 400, 300);
  this.window.networkingclient = networkingclient;
});
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDQyxLQUFLLEdBQUcsR0FBRztFQUNsQkQsTUFBTSxDQUFDRSxNQUFNLEdBQUcsR0FBRztFQUNuQjlFLGdCQUFnQixHQUFHLElBQUkwRSxnQkFBZ0IsQ0FBQyxvQkFBb0IsRUFBRUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUM7RUFDL0UsSUFBSSxDQUFDZ0YsTUFBTSxDQUFDNUosZ0JBQWdCLEdBQUdBLGdCQUFnQjtBQUNuRCxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL3NlYW5nYW1lLy4vc3JjL211bHRpcGxheWVyLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImxldCByZW5kZXJlclxubGV0IHBsYXllclxubGV0IG9ic3RhY2xlXG5sZXQgc2VhblxubGV0IGtleWhhbmRsZXJcbmxldCBkYXRhaGFuZGxlclxubGV0IG5ldHdvcmtpbmdjbGllbnRcbmxldCBib3NzXG5sZXQgYWJoaW5hdlxubGV0IEdBTUVNT0RFXG5jbGFzcyBEYXRhSGFuZGxlciB7XG4gICAgY29uc3RydWN0b3IocmVzZXQpIHtcbiAgICAgICAgaWYgKHJlc2V0KXtcbiAgICAgICAgICAgIGNocm9tZS5zdG9yYWdlLmxvY2FsLmNsZWFyKClcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBnZXRTZWxlY3RlZEhhdCgpIHtcbiAgICAgICAgbGV0IGRhdGEgPSBhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoKVxuICAgICAgICBpZiAoZGF0YVtcImhhdFwiXSkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGFbXCJoYXRcIl1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgICBhc3luYyBnZXRCbGluZygpIHtcbiAgICAgICAgbGV0IGRhdGEgPSBhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoKVxuICAgICAgICBpZiAoZGF0YVtcImJsaW5nXCJdKSB7XG4gICAgICAgICAgICBkYXRhW1wiYmxpbmdcIl0gPSBwYXJzZUludChkYXRhW1wiYmxpbmdcIl0pXG4gICAgICAgICAgICByZXR1cm4gZGF0YVtcImJsaW5nXCJdXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGFzeW5jIGdldFBsYXllckhlYWx0aCgpIHtcbiAgICAgICAgbGV0IGRhdGEgPSBhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoKVxuICAgICAgICBpZiAoZGF0YVtcIlBsYXllckhlYWx0aFwiXSl7XG4gICAgICAgICAgICByZXR1cm4gZGF0YVtcIlBsYXllckhlYWx0aFwiXVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDI1MFxuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIGFkZEJsaW5nKGFtb3VudCkge1xuICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgpXG4gICAgICAgIGlmIChkYXRhW1wiYmxpbmdcIl0pe1xuICAgICAgICAgICAgZGF0YVtcImJsaW5nXCJdID0gcGFyc2VJbnQoZGF0YVtcImJsaW5nXCJdKVxuICAgICAgICAgICAgZGF0YVtcImJsaW5nXCJdICs9IGFtb3VudFxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGF0YVtcImJsaW5nXCJdID0gYW1vdW50XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgY2hyb21lLnN0b3JhZ2UubG9jYWwuc2V0KGRhdGEpXG4gICAgfVxuICAgIGFzeW5jIGdldFBsYXllckJ1bGxldCgpIHtcbiAgICAgICAgbGV0IGRhdGEgPSBhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoKVxuICAgICAgICBpZiAoZGF0YVtcIlBsYXllckJ1bGxldFwiXSkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGFbXCJQbGF5ZXJCdWxsZXRcIl1cbiAgICAgICAgfVxuICAgICAgICBkYXRhW1wiUGxheWVyQnVsbGV0XCJdID0gMVxuICAgICAgICBhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoZGF0YSlcbiAgICAgICAgcmV0dXJuIDFcbiAgICB9XG4gICAgYXN5bmMgZ2V0U2VhbkJ1bGxldCgpIHtcbiAgICAgICAgbGV0IGRhdGEgPSBhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoKVxuICAgICAgICBpZiAoZGF0YVtcIlNlYW5CdWxsZXRcIl0pIHtcbiAgICAgICAgICAgIHJldHVybiBkYXRhW1wiU2VhbkJ1bGxldFwiXVxuICAgICAgICB9XG4gICAgICAgIGRhdGFbXCJTZWFuQnVsbGV0XCJdID0gMVxuICAgICAgICBhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoZGF0YSlcbiAgICAgICAgcmV0dXJuIDFcbiAgICB9XG4gICAgYXN5bmMgZ2V0U2VhblN0YXR1cygpIHtcbiAgICAgICAgbGV0IGRhdGEgPSBhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoKVxuICAgICAgICBpZiAoZGF0YVtcIkhpcmVTZWFuXCJdKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBhc3luYyBzdWJ0cmFjdEJsaW5nKGFtb3VudCkge1xuICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgpXG4gICAgICAgIGlmICghZGF0YVtcImJsaW5nXCJdIHx8IGRhdGFbXCJibGluZ1wiXSA8IGFtb3VudCl7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBkYXRhW1wiYmxpbmdcIl0gLT0gYW1vdW50XG4gICAgICAgIGF3YWl0IGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldChkYXRhKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgICBhc3luYyBoYW5kbGVMZXZlbChsZXZlbCkge1xuICAgICAgICBsZXQgZGF0YSA9IGF3YWl0IGNocm9tZS5zdG9yYWdlLmxvY2FsLmdldCgpXG4gICAgICAgIGlmICghZGF0YVtcImxldmVsXCJdKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBpZiAoZGF0YVtcImxldmVsXCJdIDwgbGV2ZWwpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuICAgIGFzeW5jIGhhbmRsZUFkVmlldygpIHtcbiAgICAgICAgbGV0IGRhdGEgPSBhd2FpdCBjaHJvbWUuc3RvcmFnZS5sb2NhbC5nZXQoKVxuXG4gICAgICAgIGlmICghZGF0YVtcInJld2FyZHJlc2V0XCJdKSB7XG4gICAgICAgICAgICBkYXRhW1wicmV3YXJkcmVzZXRcIl0gPSBEYXRlLm5vdygpXG4gICAgICAgICAgICBkYXRhW1wicmV3YXJkXCJdID0gMjYwXG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbGFzdHJlc2V0ID0gbmV3IERhdGUoKVxuICAgICAgICBsYXN0cmVzZXQuc2V0VGltZShkYXRhW1wicmV3YXJkcmVzZXRcIl0pXG4gICAgICAgIGxldCBub3cgPSBuZXcgRGF0ZSgpXG4gICAgICAgIG5vdy5zZXRUaW1lKERhdGUubm93KCkpXG5cbiAgICAgICAgaWYgKGxhc3RyZXNldC5nZXRVVENEYXRlKCkgIT0gbm93LmdldFVUQ0RhdGUoKSB8fCBsYXN0cmVzZXQuZ2V0VVRDTW9udGgoKSAhPSBub3cuZ2V0VVRDTW9udGgoKSkge1xuICAgICAgICAgICAgZGF0YVtcInJld2FyZHJlc2V0XCJdID0gRGF0ZS5ub3coKVxuICAgICAgICAgICAgZGF0YVtcInJld2FyZFwiXSA9IDI2MFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGRhdGFbXCJyZXdhcmRcIl0gPiAxMCkge1xuICAgICAgICAgICAgZGF0YVtcInJld2FyZFwiXSAtPSAxMFxuICAgICAgICB9XG4gICAgICAgIGF3YWl0IGNocm9tZS5zdG9yYWdlLmxvY2FsLnNldChkYXRhKVxuICAgICAgICBhd2FpdCB0aGlzLmFkZEJsaW5nKHBhcnNlSW50KGRhdGFbXCJyZXdhcmRcIl0pICsgMTApXG4gICAgfVxufVxuY2xhc3MgTmV0d29ya2luZ0NsaWVudCB7XG4gICAgY29uc3RydWN0b3Ioc2VydmVyLCBjYW52YXMsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgdGhpcy5zZXJ2ZXIgPSBzZXJ2ZXJcblxuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGhcbiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHRcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXNcbiAgICAgICAgdGhpcy5jaGVja2ludGVydmFsID0gc2V0SW50ZXJ2YWwodGhpcy5jaGVja0Nvbm5lY3Rpb24sIDEwMCwgdGhpcylcbiAgICAgICAgdGhpcy5rZXlzID0gW11cbiAgICAgICAgdGhpcy5tb3VzZXggPSAwXG4gICAgICAgIHRoaXMubW91c2VzdGF0ZSA9IGZhbHNlXG4gICAgICAgIHRoaXMubW91c2V5ID0gMFxuXG4gICAgICAgIHRoaXMuc3RhdHVzdGV4dCA9IFwiQ29ubmVjdGluZy4uLlwiXG5cbiAgICAgICAgdGhpcy5jb25uZWN0aW9uID0gbmV3IFdlYlNvY2tldCh0aGlzLnNlcnZlcilcblxuICAgICAgICB0aGlzLmNvbm5lY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcImNsb3NlXCIsIHRoaXMpXG4gICAgICAgIHRoaXMuY29ubmVjdGlvbi5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCB0aGlzKVxuICAgICAgICB0aGlzLmNvbm5lY3Rpb24uYWRkRXZlbnRMaXN0ZW5lcihcIm9wZW5cIiwgdGhpcylcbiAgICAgICAgdGhpcy5jb25uZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLCB0aGlzKVxuXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIix0aGlzKVxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcmRvd25cIix0aGlzKVxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwicG9pbnRlcnVwXCIsIHRoaXMpXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsdGhpcylcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleXVwXCIsdGhpcylcbiAgICB9XG4gICAgc29ja2V0Q2xvc2Uoc2F2ZVN0YXR1cykge1xuICAgICAgICBjbGVhckludGVydmFsKHRoaXMudGljaylcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmNoZWNraW50ZXJ2YWwpXG4gICAgICAgIHRoaXMuY2xlYXJMaXN0ZW5lcnMoKVxuICAgICAgICBpZiAoIXNhdmVTdGF0dXMpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzdGV4dCA9IFwiRGlzY29ubmVjdGVkIDooXCJcbiAgICAgICAgfVxuICAgIH1cbiAgICBjaGVja0Nvbm5lY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXNlbGYuY29ubmVjdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgbGV0IFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxuICAgICAgICBpZiAoc2VsZi5jb25uZWN0aW9uLnJlYWR5U3RhdGUgPiBXZWJTb2NrZXQuQ09OTkVDVElORyAmJiAoVGltZSAtIHNlbGYubGFzdE1lc3NhZ2UgPiAzMDAwKSkge1xuICAgICAgICAgICAgc2VsZi5jb25uZWN0aW9uLmNsb3NlKClcbiAgICAgICAgICAgIHNlbGYuc29ja2V0Q2xvc2UoKVxuICAgICAgICB9XG4gICAgfVxuICAgIGNsZWFyTGlzdGVuZXJzKCkge1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2Vtb3ZlXCIsdGhpcylcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJkb3duXCIsdGhpcylcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInBvaW50ZXJ1cFwiLCB0aGlzKVxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLHRoaXMpXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJrZXl1cFwiLHRoaXMpXG4gICAgfVxuICAgIGRyYXcoZGF0YSkge1xuICAgICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpXG4gICAgICAgIGNvbnRleHQuY2xlYXJSZWN0KDAsMCx0aGlzLndpZHRoLHRoaXMuaGVpZ2h0KVxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gZGF0YSkge1xuICAgICAgICAgICAgbGV0IG9iamVjdCA9IGRhdGFba2V5XVxuICAgICAgICAgICAgaWYgKG9iamVjdC50eXBlID09IFwidGV4dFwiKXtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZvbnQgPSBcIjE4cHggVGltZXMgTmV3IFJvbWFuXCJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnRleHRBbGlnbiA9IFwiY2VudGVyXCJcbiAgICAgICAgICAgICAgICBjb250ZXh0LnRleHRCYXNlbGluZSA9IFwibWlkZGxlXCJcbiAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwiIzhhZWE5MlwiXG4gICAgICAgICAgICAgICAgY29udGV4dC5maWxsVGV4dChvYmplY3QudGV4dCxvYmplY3QueCxvYmplY3QueSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gb2JqZWN0LmZpbGxTdHlsZVxuICAgICAgICAgICAgaWYgKG9iamVjdC50eXBlID09IFwicmVjdGFuZ2xlXCIpe1xuICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3Qob2JqZWN0Lngsb2JqZWN0Lnksb2JqZWN0LndpZHRoLG9iamVjdC5oZWlnaHQpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob2JqZWN0LnR5cGUgPT0gXCJjaXJjbGVcIil7XG4gICAgICAgICAgICAgICAgY29udGV4dC5iZWdpblBhdGgoKVxuICAgICAgICAgICAgICAgIGNvbnRleHQuYXJjKG9iamVjdC54LG9iamVjdC55LG9iamVjdC5yYWRpdXMsMCwzNjAsZmFsc2UpXG4gICAgICAgICAgICAgICAgY29udGV4dC5jbG9zZVBhdGgoKVxuICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbCgpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAob2JqZWN0LnNoYXBlID09IFwidGV4dHVyZVwiKSB7XG4gICAgICAgICAgICAgICAgbGV0IGltZyA9IG5ldyBJbWFnZShvYmplY3Qud2lkdGgsb2JqZWN0LmhlaWdodClcbiAgICAgICAgICAgICAgICBpbWcuc3JjID0gb2JqZWN0LnRleHR1cmVcbiAgICAgICAgICAgICAgICBjb250ZXh0LmRyYXdJbWFnZShpbWcsb2JqZWN0Lngsb2JqZWN0LnkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gXG4gICAgfVxuICAgIHNldCBzdGF0dXN0ZXh0KHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX3N0YXR1c3RleHQgPSB2YWx1ZVxuICAgICAgICBjb25zdCBjb250ZXh0ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpXG4gICAgICAgIGNvbnRleHQuY2xlYXJSZWN0KDAsMCx0aGlzLndpZHRoLHRoaXMuaGVpZ2h0KVxuICAgICAgICBjb250ZXh0LmZvbnQgPSBcIjE4cHggVGltZXMgTmV3IFJvbWFuXCJcbiAgICAgICAgY29udGV4dC50ZXh0QWxpZ24gPSBcImNlbnRlclwiXG4gICAgICAgIGNvbnRleHQudGV4dEJhc2VsaW5lID0gXCJtaWRkbGVcIlxuICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9IFwiIzhhZWE5MlwiXG4gICAgICAgIGNvbnRleHQuZmlsbFRleHQodmFsdWUsdGhpcy53aWR0aC8yLHRoaXMuaGVpZ2h0LzIpXG4gICAgICAgIFxuICAgIH1cblxuICAgIHJlY29ubmVjdChzZWxmKSB7XG4gICAgICAgIG5ldHdvcmtpbmdjbGllbnQgPSBuZXcgTmV0d29ya2luZ0NsaWVudChzZWxmLnNlcnZlciwgc2VsZi5jYW52YXMsIHNlbGYud2lkdGgsIHNlbGYuaGVpZ2h0KVxuICAgIH1cblxuICAgIHJlY2lldmVVcGRhdGUocmVxdWVzdCkge1xuICAgICAgICBpZiAocmVxdWVzdC50eXBlID09IFwiZnJhbWVcIikge1xuICAgICAgICAgICAgdGhpcy5kcmF3KHJlcXVlc3QuZGF0YSlcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVxdWVzdC50eXBlID09IFwia2lja1wiKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXR1c3RleHQgPSByZXF1ZXN0LnJlYXNvblxuICAgICAgICAgICAgdGhpcy5jbGVhckxpc3RlbmVycygpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlcXVlc3QudHlwZSA9PSBcInJlY29ubmVjdFwiKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMucmVjb25uZWN0LCByZXF1ZXN0LnRpbWUsIHRoaXMpXG4gICAgICAgICAgICB0aGlzLnNvY2tldENsb3NlKHRydWUpXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb24uY2xvc2UoKVxuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJjbG9zZVwiLCB0aGlzKVxuICAgICAgICAgICAgdGhpcy5jb25uZWN0aW9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIHRoaXMpXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3Rpb24ucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm9wZW5cIiwgdGhpcylcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdGlvbi5yZW1vdmVFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgdGhpcylcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzdGV4dCA9IFwiUmVjb25uZWN0aW5nLi4uXCJcbiAgICAgICAgfVxuICAgIH1cbiAgICBoYW5kbGVFdmVudChldikge1xuICAgICAgICBpZiAoZXYudHlwZSA9PSBcInBvaW50ZXJkb3duXCIpIHtcbiAgICAgICAgICAgIHRoaXMubW91c2VzdGF0ZSA9IHRydWVcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXYudHlwZSA9PSBcInBvaW50ZXJ1cFwiKSB7XG4gICAgICAgICAgICB0aGlzLm1vdXNlc3RhdGUgPSBmYWxzZVxuICAgICAgICB9XG4gICAgICAgIGlmIChldi50eXBlID09IFwibW91c2Vtb3ZlXCIpIHtcbiAgICAgICAgICAgIGNvbnN0IGNhbnZhcyA9IHRoaXMuY2FudmFzXG4gICAgICAgICAgICBjb25zdCByZWN0ID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgICAgICB0aGlzLm1vdXNleCA9IGV2LmNsaWVudFggLSByZWN0LmxlZnRcbiAgICAgICAgICAgIHRoaXMubW91c2V5ID0gZXYuY2xpZW50WSAtIHJlY3QudG9wXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2LnR5cGUgPT0gXCJtZXNzYWdlXCIpIHtcbiAgICAgICAgICAgIHRoaXMucmVjaWV2ZVVwZGF0ZShKU09OLnBhcnNlKGV2LmRhdGEpKVxuICAgICAgICAgICAgdGhpcy5sYXN0TWVzc2FnZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2LnR5cGUgPT0gXCJvcGVuXCIpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdHVzdGV4dCA9IFwiXCJcbiAgICAgICAgICAgIHRoaXMudGljayA9IHNldEludGVydmFsKHRoaXMuc2VuZFVwZGF0ZSwgMTAwMC82MCwgdGhpcylcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXYudHlwZSA9PSBcImNsb3NlXCIpIHtcbiAgICAgICAgICAgIHRoaXMuc29ja2V0Q2xvc2UoKVxuICAgICAgICB9XG4gICAgICAgIGlmIChldi50eXBlID09IFwiZXJyb3JcIikge1xuICAgICAgICAgICAgdGhpcy5zb2NrZXRDbG9zZSgpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV2LnR5cGUgPT0gXCJrZXlkb3duXCIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmtleXMuaW5kZXhPZihldi5rZXkpID09IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5rZXlzLnB1c2goZXYua2V5KSAgIFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChldi50eXBlID09IFwia2V5dXBcIikge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5rZXlzLmluZGV4T2YoZXYua2V5KVxuICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmtleXMuc3BsaWNlKGluZGV4LDEpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2VuZFVwZGF0ZShzZWxmKSB7XG4gICAgICAgIGxldCBJbnB1dCA9IHtcbiAgICAgICAgICAgIEtleXM6IHNlbGYua2V5cyxcbiAgICAgICAgICAgIE1vdXNlUG9zOiB7WDogc2VsZi5tb3VzZXgsIFk6IHNlbGYubW91c2V5fSxcbiAgICAgICAgICAgIE1vdXNlU3RhdGU6IHNlbGYubW91c2VzdGF0ZVxuICAgICAgICB9XG4gICAgICAgIHNlbGYuY29ubmVjdGlvbi5zZW5kKEpTT04uc3RyaW5naWZ5KElucHV0KSlcbiAgICB9XG59XG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgZnVuY3Rpb24gKCl7XG4gICAgY2hyb21lLmFjdGlvbi5zZXRQb3B1cCh7cG9wdXA6XCJwb3B1cC5odG1sXCJ9KVxuICAgIGRhdGFoYW5kbGVyID0gbmV3IERhdGFIYW5kbGVyKGZhbHNlKVxuICAgIGxldCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpXG4gICAgY2FudmFzLmlkID0gXCJjYW52YXNcIlxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2FudmFzKVxuICAgIGNhbnZhcy53aWR0aCA9IDQwMFxuICAgIGNhbnZhcy5oZWlnaHQgPSAzMDBcbiAgICBuZXR3b3JraW5nY2xpZW50ID0gbmV3IE5ldHdvcmtpbmdDbGllbnQoXCJ3czovLzEyNy4wLjAuMTo2OTBcIiwgY2FudmFzLCA0MDAsIDMwMClcbiAgICB0aGlzLndpbmRvdy5uZXR3b3JraW5nY2xpZW50ID0gbmV0d29ya2luZ2NsaWVudFxufSkiXSwibmFtZXMiOlsiX3JlZ2VuZXJhdG9yUnVudGltZSIsImUiLCJ0IiwiciIsIk9iamVjdCIsInByb3RvdHlwZSIsIm4iLCJoYXNPd25Qcm9wZXJ0eSIsIm8iLCJkZWZpbmVQcm9wZXJ0eSIsInZhbHVlIiwiaSIsIlN5bWJvbCIsImEiLCJpdGVyYXRvciIsImMiLCJhc3luY0l0ZXJhdG9yIiwidSIsInRvU3RyaW5nVGFnIiwiZGVmaW5lIiwiZW51bWVyYWJsZSIsImNvbmZpZ3VyYWJsZSIsIndyaXRhYmxlIiwid3JhcCIsIkdlbmVyYXRvciIsImNyZWF0ZSIsIkNvbnRleHQiLCJtYWtlSW52b2tlTWV0aG9kIiwidHJ5Q2F0Y2giLCJ0eXBlIiwiYXJnIiwiY2FsbCIsImgiLCJsIiwiZiIsInMiLCJ5IiwiR2VuZXJhdG9yRnVuY3Rpb24iLCJHZW5lcmF0b3JGdW5jdGlvblByb3RvdHlwZSIsInAiLCJkIiwiZ2V0UHJvdG90eXBlT2YiLCJ2IiwidmFsdWVzIiwiZyIsImRlZmluZUl0ZXJhdG9yTWV0aG9kcyIsImZvckVhY2giLCJfaW52b2tlIiwiQXN5bmNJdGVyYXRvciIsImludm9rZSIsIl90eXBlb2YiLCJyZXNvbHZlIiwiX19hd2FpdCIsInRoZW4iLCJjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyIsIkVycm9yIiwiZG9uZSIsIm1ldGhvZCIsImRlbGVnYXRlIiwibWF5YmVJbnZva2VEZWxlZ2F0ZSIsInNlbnQiLCJfc2VudCIsImRpc3BhdGNoRXhjZXB0aW9uIiwiYWJydXB0IiwiVHlwZUVycm9yIiwicmVzdWx0TmFtZSIsIm5leHQiLCJuZXh0TG9jIiwicHVzaFRyeUVudHJ5IiwidHJ5TG9jIiwiY2F0Y2hMb2MiLCJmaW5hbGx5TG9jIiwiYWZ0ZXJMb2MiLCJ0cnlFbnRyaWVzIiwicHVzaCIsInJlc2V0VHJ5RW50cnkiLCJjb21wbGV0aW9uIiwicmVzZXQiLCJpc05hTiIsImxlbmd0aCIsImRpc3BsYXlOYW1lIiwiaXNHZW5lcmF0b3JGdW5jdGlvbiIsImNvbnN0cnVjdG9yIiwibmFtZSIsIm1hcmsiLCJzZXRQcm90b3R5cGVPZiIsIl9fcHJvdG9fXyIsImF3cmFwIiwiYXN5bmMiLCJQcm9taXNlIiwia2V5cyIsInJldmVyc2UiLCJwb3AiLCJwcmV2IiwiY2hhckF0Iiwic2xpY2UiLCJzdG9wIiwicnZhbCIsImhhbmRsZSIsImNvbXBsZXRlIiwiZmluaXNoIiwiX2NhdGNoIiwiZGVsZWdhdGVZaWVsZCIsImFzeW5jR2VuZXJhdG9yU3RlcCIsIl9hc3luY1RvR2VuZXJhdG9yIiwiYXJndW1lbnRzIiwiYXBwbHkiLCJfbmV4dCIsIl90aHJvdyIsIl9jbGFzc0NhbGxDaGVjayIsIl9kZWZpbmVQcm9wZXJ0aWVzIiwiX3RvUHJvcGVydHlLZXkiLCJrZXkiLCJfY3JlYXRlQ2xhc3MiLCJfdG9QcmltaXRpdmUiLCJ0b1ByaW1pdGl2ZSIsIlN0cmluZyIsIk51bWJlciIsInJlbmRlcmVyIiwicGxheWVyIiwib2JzdGFjbGUiLCJzZWFuIiwia2V5aGFuZGxlciIsImRhdGFoYW5kbGVyIiwibmV0d29ya2luZ2NsaWVudCIsImJvc3MiLCJhYmhpbmF2IiwiR0FNRU1PREUiLCJEYXRhSGFuZGxlciIsImNocm9tZSIsInN0b3JhZ2UiLCJsb2NhbCIsImNsZWFyIiwiX2dldFNlbGVjdGVkSGF0IiwiX2NhbGxlZSIsImRhdGEiLCJfY2FsbGVlJCIsIl9jb250ZXh0IiwiZ2V0IiwiZ2V0U2VsZWN0ZWRIYXQiLCJfZ2V0QmxpbmciLCJfY2FsbGVlMiIsIl9jYWxsZWUyJCIsIl9jb250ZXh0MiIsInBhcnNlSW50IiwiZ2V0QmxpbmciLCJfZ2V0UGxheWVySGVhbHRoIiwiX2NhbGxlZTMiLCJfY2FsbGVlMyQiLCJfY29udGV4dDMiLCJnZXRQbGF5ZXJIZWFsdGgiLCJfYWRkQmxpbmciLCJfY2FsbGVlNCIsImFtb3VudCIsIl9jYWxsZWU0JCIsIl9jb250ZXh0NCIsInNldCIsImFkZEJsaW5nIiwiX3giLCJfZ2V0UGxheWVyQnVsbGV0IiwiX2NhbGxlZTUiLCJfY2FsbGVlNSQiLCJfY29udGV4dDUiLCJnZXRQbGF5ZXJCdWxsZXQiLCJfZ2V0U2VhbkJ1bGxldCIsIl9jYWxsZWU2IiwiX2NhbGxlZTYkIiwiX2NvbnRleHQ2IiwiZ2V0U2VhbkJ1bGxldCIsIl9nZXRTZWFuU3RhdHVzIiwiX2NhbGxlZTciLCJfY2FsbGVlNyQiLCJfY29udGV4dDciLCJnZXRTZWFuU3RhdHVzIiwiX3N1YnRyYWN0QmxpbmciLCJfY2FsbGVlOCIsIl9jYWxsZWU4JCIsIl9jb250ZXh0OCIsInN1YnRyYWN0QmxpbmciLCJfeDIiLCJfaGFuZGxlTGV2ZWwiLCJfY2FsbGVlOSIsImxldmVsIiwiX2NhbGxlZTkkIiwiX2NvbnRleHQ5IiwiaGFuZGxlTGV2ZWwiLCJfeDMiLCJfaGFuZGxlQWRWaWV3IiwiX2NhbGxlZTEwIiwibGFzdHJlc2V0Iiwibm93IiwiX2NhbGxlZTEwJCIsIl9jb250ZXh0MTAiLCJEYXRlIiwic2V0VGltZSIsImdldFVUQ0RhdGUiLCJnZXRVVENNb250aCIsImhhbmRsZUFkVmlldyIsIk5ldHdvcmtpbmdDbGllbnQiLCJzZXJ2ZXIiLCJjYW52YXMiLCJ3aWR0aCIsImhlaWdodCIsImNoZWNraW50ZXJ2YWwiLCJzZXRJbnRlcnZhbCIsImNoZWNrQ29ubmVjdGlvbiIsIm1vdXNleCIsIm1vdXNlc3RhdGUiLCJtb3VzZXkiLCJzdGF0dXN0ZXh0IiwiY29ubmVjdGlvbiIsIldlYlNvY2tldCIsImFkZEV2ZW50TGlzdGVuZXIiLCJkb2N1bWVudCIsInNvY2tldENsb3NlIiwic2F2ZVN0YXR1cyIsImNsZWFySW50ZXJ2YWwiLCJ0aWNrIiwiY2xlYXJMaXN0ZW5lcnMiLCJzZWxmIiwiVGltZSIsImdldFRpbWUiLCJyZWFkeVN0YXRlIiwiQ09OTkVDVElORyIsImxhc3RNZXNzYWdlIiwiY2xvc2UiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZHJhdyIsImNvbnRleHQiLCJnZXRDb250ZXh0IiwiY2xlYXJSZWN0Iiwib2JqZWN0IiwiZm9udCIsInRleHRBbGlnbiIsInRleHRCYXNlbGluZSIsImZpbGxTdHlsZSIsImZpbGxUZXh0IiwidGV4dCIsIngiLCJmaWxsUmVjdCIsImJlZ2luUGF0aCIsImFyYyIsInJhZGl1cyIsImNsb3NlUGF0aCIsImZpbGwiLCJzaGFwZSIsImltZyIsIkltYWdlIiwic3JjIiwidGV4dHVyZSIsImRyYXdJbWFnZSIsIl9zdGF0dXN0ZXh0IiwicmVjb25uZWN0IiwicmVjaWV2ZVVwZGF0ZSIsInJlcXVlc3QiLCJyZWFzb24iLCJzZXRUaW1lb3V0IiwidGltZSIsImhhbmRsZUV2ZW50IiwiZXYiLCJyZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwiY2xpZW50WCIsImxlZnQiLCJjbGllbnRZIiwidG9wIiwiSlNPTiIsInBhcnNlIiwic2VuZFVwZGF0ZSIsImluZGV4T2YiLCJpbmRleCIsInNwbGljZSIsIklucHV0IiwiS2V5cyIsIk1vdXNlUG9zIiwiWCIsIlkiLCJNb3VzZVN0YXRlIiwic2VuZCIsInN0cmluZ2lmeSIsIndpbmRvdyIsImFjdGlvbiIsInNldFBvcHVwIiwicG9wdXAiLCJjcmVhdGVFbGVtZW50IiwiaWQiLCJib2R5IiwiYXBwZW5kQ2hpbGQiXSwic291cmNlUm9vdCI6IiJ9