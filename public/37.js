(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[37],{

/***/ "./resources/js/v1/common/BoxButton.jsx":
/*!**********************************************!*\
  !*** ./resources/js/v1/common/BoxButton.jsx ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\nvar BoxButton = /*#__PURE__*/function (_Component) {\n  _inherits(BoxButton, _Component);\n\n  var _super = _createSuper(BoxButton);\n\n  function BoxButton(props) {\n    var _this;\n\n    _classCallCheck(this, BoxButton);\n\n    _this = _super.call(this, props);\n    _this.state = {\n      box_class: \"alert alert-primary jumbotron jumbotron-fluid \",\n      icon_class: \"fa \"\n    };\n    _this.clickHandler = _this.clickHandler.bind(_assertThisInitialized(_this));\n    return _this;\n  }\n\n  _createClass(BoxButton, [{\n    key: \"clickHandler\",\n    value: function clickHandler() {\n      // prop binding with parent component\n      if (typeof this.props.onClick === 'function') {\n        this.props.onClick(this.props.data, this.props.index);\n      }\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: this.props.parent_class + ' boxSm btnBox',\n        onClick: this.clickHandler\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: this.state.box_class + this.props.box_class\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"row\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h4\", {\n        className: \"display-5 mt-3 mb-4\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"i\", {\n        className: this.state.icon_class + this.props.icon_class\n      }), \"\\xA0\", this.props.box_title))));\n    }\n  }]);\n\n  return BoxButton;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (BoxButton);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvdjEvY29tbW9uL0JveEJ1dHRvbi5qc3g/Y2FkNiJdLCJuYW1lcyI6WyJCb3hCdXR0b24iLCJwcm9wcyIsInN0YXRlIiwiYm94X2NsYXNzIiwiaWNvbl9jbGFzcyIsImNsaWNrSGFuZGxlciIsImJpbmQiLCJvbkNsaWNrIiwiZGF0YSIsImluZGV4IiwicGFyZW50X2NsYXNzIiwiYm94X3RpdGxlIiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7O0lBRU1BLFM7Ozs7O0FBRUYscUJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQTs7QUFDZiw4QkFBTUEsS0FBTjtBQUNBLFVBQUtDLEtBQUwsR0FBYTtBQUNUQyxlQUFTLEVBQUcsZ0RBREg7QUFFVEMsZ0JBQVUsRUFBRTtBQUZILEtBQWI7QUFLQSxVQUFLQyxZQUFMLEdBQW9CLE1BQUtBLFlBQUwsQ0FBa0JDLElBQWxCLCtCQUFwQjtBQVBlO0FBUWxCOzs7O21DQUVjO0FBQ1g7QUFDQSxVQUFJLE9BQU8sS0FBS0wsS0FBTCxDQUFXTSxPQUFsQixLQUE4QixVQUFsQyxFQUE4QztBQUMxQyxhQUFLTixLQUFMLENBQVdNLE9BQVgsQ0FBbUIsS0FBS04sS0FBTCxDQUFXTyxJQUE5QixFQUFvQyxLQUFLUCxLQUFMLENBQVdRLEtBQS9DO0FBQ0g7QUFDSjs7OzZCQUVRO0FBQ0wsMEJBQ0k7QUFBSyxpQkFBUyxFQUFFLEtBQUtSLEtBQUwsQ0FBV1MsWUFBWCxHQUEwQixlQUExQztBQUE0RCxlQUFPLEVBQUUsS0FBS0w7QUFBMUUsc0JBQ0k7QUFBSyxpQkFBUyxFQUFFLEtBQUtILEtBQUwsQ0FBV0MsU0FBWCxHQUF1QixLQUFLRixLQUFMLENBQVdFO0FBQWxELHNCQUNJO0FBQUssaUJBQVMsRUFBQztBQUFmLHNCQUNJO0FBQUksaUJBQVMsRUFBQztBQUFkLHNCQUNJO0FBQUcsaUJBQVMsRUFBRSxLQUFLRCxLQUFMLENBQVdFLFVBQVgsR0FBd0IsS0FBS0gsS0FBTCxDQUFXRztBQUFqRCxRQURKLFVBR0ssS0FBS0gsS0FBTCxDQUFXVSxTQUhoQixDQURKLENBREosQ0FESixDQURKO0FBYUg7Ozs7RUFqQ29CQywrQzs7QUFvQ1ZaLHdFQUFmIiwiZmlsZSI6Ii4vcmVzb3VyY2VzL2pzL3YxL2NvbW1vbi9Cb3hCdXR0b24uanN4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcblxuY2xhc3MgQm94QnV0dG9uIGV4dGVuZHMgIENvbXBvbmVudCB7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBib3hfY2xhc3MgOiBcImFsZXJ0IGFsZXJ0LXByaW1hcnkganVtYm90cm9uIGp1bWJvdHJvbi1mbHVpZCBcIixcbiAgICAgICAgICAgIGljb25fY2xhc3M6IFwiZmEgXCJcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLmNsaWNrSGFuZGxlciA9IHRoaXMuY2xpY2tIYW5kbGVyLmJpbmQodGhpcyk7XG4gICAgfVxuXG4gICAgY2xpY2tIYW5kbGVyKCkge1xuICAgICAgICAvLyBwcm9wIGJpbmRpbmcgd2l0aCBwYXJlbnQgY29tcG9uZW50XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5wcm9wcy5vbkNsaWNrID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2xpY2sodGhpcy5wcm9wcy5kYXRhLCB0aGlzLnByb3BzLmluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXt0aGlzLnByb3BzLnBhcmVudF9jbGFzcyArICcgYm94U20gYnRuQm94JyB9IG9uQ2xpY2s9e3RoaXMuY2xpY2tIYW5kbGVyfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17dGhpcy5zdGF0ZS5ib3hfY2xhc3MgKyB0aGlzLnByb3BzLmJveF9jbGFzc30+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDQgY2xhc3NOYW1lPVwiZGlzcGxheS01IG10LTMgbWItNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT17dGhpcy5zdGF0ZS5pY29uX2NsYXNzICsgdGhpcy5wcm9wcy5pY29uX2NsYXNzfT48L2k+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJm5ic3A7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3RoaXMucHJvcHMuYm94X3RpdGxlfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9oND5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEJveEJ1dHRvbjtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./resources/js/v1/common/BoxButton.jsx\n");

/***/ })

}]);