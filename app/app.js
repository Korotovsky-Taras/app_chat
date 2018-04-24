/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var pug_has_own_property = Object.prototype.hasOwnProperty;

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = pug_merge;
function pug_merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = pug_merge(attrs, a[i]);
    }
    return attrs;
  }

  for (var key in b) {
    if (key === 'class') {
      var valA = a[key] || [];
      a[key] = (Array.isArray(valA) ? valA : [valA]).concat(b[key] || []);
    } else if (key === 'style') {
      var valA = pug_style(a[key]);
      valA = valA && valA[valA.length - 1] !== ';' ? valA + ';' : valA;
      var valB = pug_style(b[key]);
      valB = valB && valB[valB.length - 1] !== ';' ? valB + ';' : valB;
      a[key] = valA + valB;
    } else {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Process array, object, or string as a string of classes delimited by a space.
 *
 * If `val` is an array, all members of it and its subarrays are counted as
 * classes. If `escaping` is an array, then whether or not the item in `val` is
 * escaped depends on the corresponding item in `escaping`. If `escaping` is
 * not an array, no escaping is done.
 *
 * If `val` is an object, all the keys whose value is truthy are counted as
 * classes. No escaping is done.
 *
 * If `val` is a string, it is counted as a class. No escaping is done.
 *
 * @param {(Array.<string>|Object.<string, boolean>|string)} val
 * @param {?Array.<string>} escaping
 * @return {String}
 */
exports.classes = pug_classes;
function pug_classes_array(val, escaping) {
  var classString = '', className, padding = '', escapeEnabled = Array.isArray(escaping);
  for (var i = 0; i < val.length; i++) {
    className = pug_classes(val[i]);
    if (!className) continue;
    escapeEnabled && escaping[i] && (className = pug_escape(className));
    classString = classString + padding + className;
    padding = ' ';
  }
  return classString;
}
function pug_classes_object(val) {
  var classString = '', padding = '';
  for (var key in val) {
    if (key && val[key] && pug_has_own_property.call(val, key)) {
      classString = classString + padding + key;
      padding = ' ';
    }
  }
  return classString;
}
function pug_classes(val, escaping) {
  if (Array.isArray(val)) {
    return pug_classes_array(val, escaping);
  } else if (val && typeof val === 'object') {
    return pug_classes_object(val);
  } else {
    return val || '';
  }
}

/**
 * Convert object or string to a string of CSS styles delimited by a semicolon.
 *
 * @param {(Object.<string, string>|string)} val
 * @return {String}
 */

exports.style = pug_style;
function pug_style(val) {
  if (!val) return '';
  if (typeof val === 'object') {
    var out = '';
    for (var style in val) {
      /* istanbul ignore else */
      if (pug_has_own_property.call(val, style)) {
        out = out + style + ':' + val[style] + ';';
      }
    }
    return out;
  } else {
    return val + '';
  }
};

/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = pug_attr;
function pug_attr(key, val, escaped, terse) {
  if (val === false || val == null || !val && (key === 'class' || key === 'style')) {
    return '';
  }
  if (val === true) {
    return ' ' + (terse ? key : key + '="' + key + '"');
  }
  if (typeof val.toJSON === 'function') {
    val = val.toJSON();
  }
  if (typeof val !== 'string') {
    val = JSON.stringify(val);
    if (!escaped && val.indexOf('"') !== -1) {
      return ' ' + key + '=\'' + val.replace(/'/g, '&#39;') + '\'';
    }
  }
  if (escaped) val = pug_escape(val);
  return ' ' + key + '="' + val + '"';
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} terse whether to use HTML5 terse boolean attributes
 * @return {String}
 */
exports.attrs = pug_attrs;
function pug_attrs(obj, terse){
  var attrs = '';

  for (var key in obj) {
    if (pug_has_own_property.call(obj, key)) {
      var val = obj[key];

      if ('class' === key) {
        val = pug_classes(val);
        attrs = pug_attr(key, val, false, terse) + attrs;
        continue;
      }
      if ('style' === key) {
        val = pug_style(val);
      }
      attrs += pug_attr(key, val, false, terse);
    }
  }

  return attrs;
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

var pug_match_html = /["&<>]/;
exports.escape = pug_escape;
function pug_escape(_html){
  var html = '' + _html;
  var regexResult = pug_match_html.exec(html);
  if (!regexResult) return _html;

  var result = '';
  var i, lastIndex, escape;
  for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
    switch (html.charCodeAt(i)) {
      case 34: escape = '&quot;'; break;
      case 38: escape = '&amp;'; break;
      case 60: escape = '&lt;'; break;
      case 62: escape = '&gt;'; break;
      default: continue;
    }
    if (lastIndex !== i) result += html.substring(lastIndex, i);
    lastIndex = i + 1;
    result += escape;
  }
  if (lastIndex !== i) return result + html.substring(lastIndex, i);
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the pug in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @param {String} str original source
 * @api private
 */

exports.rethrow = pug_rethrow;
function pug_rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || __webpack_require__(13).readFileSync(filename, 'utf8')
  } catch (ex) {
    pug_rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Pug') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Message = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _message = __webpack_require__(12);

var _message2 = _interopRequireDefault(_message);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Message = exports.Message = function () {
    function Message(el, data) {
        _classCallCheck(this, Message);

        this.el = el;
        this.data = data;
        this.render();
    }

    _createClass(Message, [{
        key: 'render',
        value: function render() {
            var _this = this;

            this.el.innerHTML = (0, _message2.default)();

            var form = this.el.querySelector('.message');

            form.addEventListener('submit', function (event) {
                event.preventDefault();
                _this.sendMessage();
                console.log('send');
            });

            form.addEventListener('keydown', function (event) {
                if (event.ctrlKey && event.keyCode === 13) {
                    event.preventDefault();
                    _this.sendMessage();
                    console.log('send');
                } else if (!event.ctrlKey && event.keyCode === 13) {
                    event.preventDefault();
                }
            });
        }
    }, {
        key: 'sendMessage',
        value: function sendMessage() {
            var input = this.el.querySelector('.message__input');
            this.insertMessage(input.value);
            input.value = '';
        }

        /**
         * Добавляение сообщения
         * @override
         * @param text
         */

    }, {
        key: 'insertMessage',
        value: function insertMessage(text) {}
    }]);

    return Message;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KEY = 'user';

var User = exports.User = function () {
    function User(name) {
        _classCallCheck(this, User);

        this.name = name;
    }

    _createClass(User, [{
        key: 'save',
        value: function save() {
            localStorage.setItem(KEY, this.name);
        }
    }], [{
        key: 'get',
        value: function get() {
            var name = localStorage.getItem(KEY);

            if (name) {
                return new User(name);
            }

            return null;
        }
    }]);

    return User;
}();

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = exports.View = function () {
    function View(el) {
        _classCallCheck(this, View);

        this.el = document.createElement('div');
        el.appendChild(this.el);
    }

    _createClass(View, [{
        key: 'toggle',
        value: function toggle(state) {
            this.el.hidden = !state;
        }
    }]);

    return View;
}();

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Router = exports.Router = function () {
    function Router() {
        _classCallCheck(this, Router);

        this.routes = {};
        this.current = null;
    }

    _createClass(Router, [{
        key: 'register',
        value: function register(path, view) {
            this.routes[path] = view;
            view.toggle(false);
        }
    }, {
        key: 'go',
        value: function go(path) {

            if (this.current) {
                this.current.toggle(false);
            }

            this.routes[path].toggle(true);
            this.current = this.routes[path];
        }
    }, {
        key: 'start',
        value: function start() {
            var _this = this;

            this.go(location.hash.replace(/^#/, ''));

            window.addEventListener('hashchange', function () {
                _this.go(location.hash.replace(/^#/, ''));
            });
        }
    }]);

    return Router;
}();

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.AuthView = undefined;

var _view = __webpack_require__(3);

var _auth = __webpack_require__(8);

var _user = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AuthView = exports.AuthView = function (_View) {
    _inherits(AuthView, _View);

    function AuthView(el) {
        _classCallCheck(this, AuthView);

        var _this = _possibleConstructorReturn(this, (AuthView.__proto__ || Object.getPrototypeOf(AuthView)).call(this, el));

        _this.auth = new _auth.Auth(_this.el, {});

        _this.auth.onLogin = function (name, pwd) {

            if (name && pwd) {
                var model = new _user.User(name, pwd);
                model.save();
                location.hash = '#chat';
            } else {
                console.log('Authorization failed');
            }
        };
        return _this;
    }

    return AuthView;
}(_view.View);

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ChatView = undefined;

var _view = __webpack_require__(3);

var _chat = __webpack_require__(9);

var _message = __webpack_require__(1);

var _user = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ChatView = exports.ChatView = function (_View) {
    _inherits(ChatView, _View);

    function ChatView(el) {
        _classCallCheck(this, ChatView);

        var _this = _possibleConstructorReturn(this, (ChatView.__proto__ || Object.getPrototypeOf(ChatView)).call(this, el));

        _this.user = _user.User.get();

        if (!_this.user) {
            location.hash = '#login';
            return _possibleConstructorReturn(_this);
        }

        _this.chat = new _chat.Chat(document.createElement('div'), {});
        _this.message = new _message.Message(document.createElement('div'));

        _this.el.appendChild(_this.chat.el);
        _this.el.appendChild(_this.message.el);

        _this.message.insertMessage = function (text) {
            _this.chat.insertMessage(text);
        };

        return _this;
    }

    return ChatView;
}(_view.View);

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _auth = __webpack_require__(5);

var _chat = __webpack_require__(6);

var _router = __webpack_require__(4);

window.addEventListener('DOMContentLoaded', function () {
    var router = new _router.Router();

    router.register('login', new _auth.AuthView(document.body));
    router.register('chat', new _chat.ChatView(document.body));

    router.start();
});

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.defaultLogin = exports.Auth = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _auth = __webpack_require__(10);

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Auth = exports.Auth = function () {
    function Auth(el, data) {
        var _this = this;

        _classCallCheck(this, Auth);

        this.el = el;
        this.data = data;

        this.render();

        var form = this.el.querySelector('.auth');

        form.addEventListener('submit', function (event) {
            event.preventDefault();

            var name = _this.el.querySelector('.auth__name').value.slice();
            var password = _this.el.querySelector('.auth__password').value.slice();
            var authenticated = name && password;

            _this.onLogin(name, password);
        });
    }

    /**
     * @override
     */


    _createClass(Auth, [{
        key: 'onLogin',
        value: function onLogin() {}
    }, {
        key: 'render',
        value: function render() {
            this.el.innerHTML = (0, _auth2.default)();
        }
    }]);

    return Auth;
}();

var defaultLogin = exports.defaultLogin = 'user';

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Chat = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _message = __webpack_require__(1);

var _chat = __webpack_require__(11);

var _chat2 = _interopRequireDefault(_chat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Chat = exports.Chat = function () {
    function Chat(el, data) {
        _classCallCheck(this, Chat);

        this.el = el;
        this.data = data;
        this.render();
    }

    _createClass(Chat, [{
        key: 'render',
        value: function render() {
            var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'test';
            var user = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

            this.el.innerHTML += (0, _chat2.default)({
                text: text, user: user
            });
        }
    }, {
        key: 'insertMessage',
        value: function insertMessage(text) {
            this.render(text);
        }
    }]);

    return Chat;
}();

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cform class=\"auth pure-form\"\u003E\u003Cinput class=\"auth__name\" type=\"text\" placeholder=\"Login\"\u003E\u003Cinput class=\"auth__password\" type=\"password\" placeholder=\"Password\"\u003E\u003Cbutton class=\"auth__submit pure-button pure-button-primary\" type=\"submit\"\u003ESign in\u003C\u002Fbutton\u003E\u003C\u002Fform\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (text, user) {pug_html = pug_html + "\u003Cdiv class=\"chat-container\"\u003E\u003Cdiv class=\"chat pure-u-1-2\"\u003E\u003Cspan class=\"chat__name\"\u003E" + (pug.escape(null == (pug_interp = user) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cspan class=\"chat__message\"\u003E" + (pug.escape(null == (pug_interp = text) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";}.call(this,"text" in locals_for_with?locals_for_with.text:typeof text!=="undefined"?text:undefined,"user" in locals_for_with?locals_for_with.user:typeof user!=="undefined"?user:undefined));;return pug_html;};
module.exports = template;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cform class=\"message pure-form\"\u003E\u003Ctextarea class=\"message__input pure-input-1-2\" placeholder=\"Add your message here...\"\u003E\u003C\u002Ftextarea\u003E\u003Cbutton class=\"message__button button-success pure-button\"\u003ESend\u003C\u002Fbutton\u003E\u003C\u002Fform\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })
/******/ ]);
//# sourceMappingURL=app.js.map