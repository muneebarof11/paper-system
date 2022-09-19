(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[35],{

/***/ "./resources/js/v1/Questions/components/urdu/forms/McqForm.jsx":
/*!*********************************************************************!*\
  !*** ./resources/js/v1/Questions/components/urdu/forms/McqForm.jsx ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var _redux_Actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../redux/Actions */ \"./resources/js/v1/Questions/redux/Actions.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\n\n\nvar McqForm = /*#__PURE__*/function (_Component) {\n  _inherits(McqForm, _Component);\n\n  var _super = _createSuper(McqForm);\n\n  function McqForm(props) {\n    var _this;\n\n    _classCallCheck(this, McqForm);\n\n    _this = _super.call(this, props);\n    _this.state = {\n      options: [1]\n    };\n    _this.hideTopicForm = _this.hideTopicForm.bind(_assertThisInitialized(_this));\n    _this.submitForm = _this.submitForm.bind(_assertThisInitialized(_this));\n    _this.addOption = _this.addOption.bind(_assertThisInitialized(_this));\n    _this.removeOption = _this.removeOption.bind(_assertThisInitialized(_this));\n    return _this;\n  }\n\n  _createClass(McqForm, [{\n    key: \"hideTopicForm\",\n    value: function hideTopicForm() {\n      var confirmation = window.confirm('Are you sure you want to cancel?');\n      if (!confirmation) return false;\n      this.props.hideForm(this.props.index);\n    }\n  }, {\n    key: \"addOption\",\n    value: function addOption() {\n      var options = this.state.options;\n      var last_option = options[options.length - 1] + 1;\n      options.push(last_option);\n      this.setState({\n        options: options\n      });\n    }\n  }, {\n    key: \"removeOption\",\n    value: function removeOption(index) {\n      var options = this.state.options;\n\n      if (options.length === 1) {\n        return false;\n      }\n\n      options.splice(index, 1);\n      this.setState({\n        options: options\n      });\n    }\n  }, {\n    key: \"submitForm\",\n    value: function submitForm(e) {\n      e.preventDefault();\n\n      var serialize = __webpack_require__(/*! form-serialize */ \"./node_modules/form-serialize/index.js\");\n\n      var form = document.querySelector(\"#sectionForm_\".concat(this.props.index));\n      var form_data = serialize(form, {\n        hash: true\n      });\n\n      if (!form_data.question_rtl) {\n        alert('Urdu question statement is required');\n        return false;\n      }\n\n      if (!form_data.option_en && !form_data.option_rtl) {\n        alert('Urdu option(s) are required');\n        return false;\n      }\n\n      form_data['option_rtl'] = JSON.stringify(form_data['option_rtl']);\n      var formData = new FormData();\n\n      for (var key in form_data) {\n        formData.append(key, form_data[key]);\n      }\n\n      this.props.addQuestion(formData, this.props.endpoint, this.props.type, this.props.index);\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _this2 = this;\n\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"form\", {\n        onSubmit: this.submitForm,\n        className: \"mb-4 sectionForm\",\n        id: \"sectionForm_\".concat(this.props.index)\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n        type: \"hidden\",\n        value: this.props.form,\n        name: \"section_info\"\n      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"row\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"form-group col-md-12 row\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"select\", {\n        className: \"custom-select col-lg-11\",\n        name: \"priority\",\n        id: \"priority\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", {\n        value: \"exercise\"\n      }, \"Exercise\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", {\n        value: \"past_paper\"\n      }, \"Past Paper\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", {\n        value: \"additional\"\n      }, \"Additional\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n        className: \"col-lg-1 col-form-label\",\n        htmlFor: \"priority\"\n      }, \"Priority\"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"row\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"form-group col-lg-12 row urdu-font\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n        className: \"col-lg-1 col-form-label\",\n        htmlFor: \"question_rtl_\".concat(this.props.index)\n      }, \"\\u0633\\u0648\\u0627\\u0644:\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"col-lg-11\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n        type: \"text\",\n        className: \"form-control\",\n        id: \"question_rtl_\".concat(this.props.index),\n        name: \"question_rtl\"\n      })))), this.state.options.length > 0 ? this.state.options.map(function (o, i) {\n        var j = i + 1;\n        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: \"row\"\n        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: \"form-group col-lg-12 row urdu-font\"\n        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n          className: \"col-lg-1 col-form-label\",\n          htmlFor: \"option_rtl_\".concat(j)\n        }, \":\", $helper.getAlphabet(i), \"    \\u0622\\u067E\\u0634\\u0646\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: \"col-lg-7\"\n        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n          type: \"text\",\n          className: \"form-control\",\n          id: \"option_rtl_\".concat(j),\n          name: \"option_rtl[]\"\n        })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: \"col-lg-1\"\n        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n          type: \"button\",\n          className: \"action-btn btn btn-warning float-right\",\n          onClick: _this2.addOption\n        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"i\", {\n          className: \"fa fa-plus-circle\"\n        }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n          className: \"col-lg-1\"\n        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n          type: \"button\",\n          className: \"\".concat(i === 0 ? 'd-none' : '', \" action-btn btn btn-danger\"),\n          onClick: function onClick() {\n            _this2.removeOption(i);\n          }\n        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"i\", {\n          className: \"fa fa-minus-circle\"\n        })))));\n      }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"hr\", {\n        className: \"mt-3\"\n      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"form-group row\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"col-lg-6 row\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n        className: \"btn btn-primary col-lg-5\",\n        type: \"submit\",\n        disabled: this.props.loading\n      }, this.props.loading ? 'Saving...' : 'Save'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n        className: \"btn btn-danger col-lg-5\",\n        type: \"button\",\n        onClick: this.hideTopicForm\n      }, \"Cancel\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"form-group col-md-6 row\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n        className: \"col-lg-3 col-form-label\",\n        htmlFor: \"correct_option\"\n      }, \"Correct Answer\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"select\", {\n        className: \"custom-select col-lg-9\",\n        name: \"correct_option\",\n        id: \"correct_option\"\n      }, this.state.options.length > 0 ? this.state.options.map(function (o, i) {\n        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", {\n          value: $helper.getAlphabet(i)\n        }, \"Option \", $helper.getAlphabet(i));\n      }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", null, \"Loading...\")))));\n    }\n  }]);\n\n  return McqForm;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]);\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    loading: state.questions.loading,\n    message: state.questions.message\n  };\n};\n\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n  return {\n    addQuestion: function addQuestion(formData, endpoint, type, index) {\n      return dispatch(Object(_redux_Actions__WEBPACK_IMPORTED_MODULE_2__[\"addQuestion\"])(dispatch, formData, endpoint, type, index));\n    },\n    hideForm: function hideForm(index) {\n      return dispatch(Object(_redux_Actions__WEBPACK_IMPORTED_MODULE_2__[\"hideQuestionForm\"])(dispatch, index));\n    }\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])(mapStateToProps, mapDispatchToProps)(McqForm));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvdjEvUXVlc3Rpb25zL2NvbXBvbmVudHMvdXJkdS9mb3Jtcy9NY3FGb3JtLmpzeD8wNjI3Il0sIm5hbWVzIjpbIk1jcUZvcm0iLCJwcm9wcyIsInN0YXRlIiwib3B0aW9ucyIsImhpZGVUb3BpY0Zvcm0iLCJiaW5kIiwic3VibWl0Rm9ybSIsImFkZE9wdGlvbiIsInJlbW92ZU9wdGlvbiIsImNvbmZpcm1hdGlvbiIsIndpbmRvdyIsImNvbmZpcm0iLCJoaWRlRm9ybSIsImluZGV4IiwibGFzdF9vcHRpb24iLCJsZW5ndGgiLCJwdXNoIiwic2V0U3RhdGUiLCJzcGxpY2UiLCJlIiwicHJldmVudERlZmF1bHQiLCJzZXJpYWxpemUiLCJyZXF1aXJlIiwiZm9ybSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImZvcm1fZGF0YSIsImhhc2giLCJxdWVzdGlvbl9ydGwiLCJhbGVydCIsIm9wdGlvbl9lbiIsIm9wdGlvbl9ydGwiLCJKU09OIiwic3RyaW5naWZ5IiwiZm9ybURhdGEiLCJGb3JtRGF0YSIsImtleSIsImFwcGVuZCIsImFkZFF1ZXN0aW9uIiwiZW5kcG9pbnQiLCJ0eXBlIiwibWFwIiwibyIsImkiLCJqIiwiJGhlbHBlciIsImdldEFscGhhYmV0IiwibG9hZGluZyIsIkNvbXBvbmVudCIsIm1hcFN0YXRlVG9Qcm9wcyIsInF1ZXN0aW9ucyIsIm1lc3NhZ2UiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJkaXNwYXRjaCIsImhpZGVRdWVzdGlvbkZvcm0iLCJjb25uZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7O0lBRU1BLE87Ozs7O0FBQ0YsbUJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQTs7QUFDZiw4QkFBTUEsS0FBTjtBQUVBLFVBQUtDLEtBQUwsR0FBYTtBQUNUQyxhQUFPLEVBQUUsQ0FBQyxDQUFEO0FBREEsS0FBYjtBQUlBLFVBQUtD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QUFxQkssUUFBckIsRUFBK0JDLElBQS9CLEVBQXFDM0IsS0FBckMsQ0FBWixDQUE3QztBQUFBLEtBRFY7QUFFSEQsWUFBUSxFQUFFLGtCQUFDQyxLQUFEO0FBQUEsYUFBV3dDLFFBQVEsQ0FBQ0MsdUVBQWdCLENBQUNELFFBQUQsRUFBV3hDLEtBQVgsQ0FBakIsQ0FBbkI7QUFBQTtBQUZQLEdBQVA7QUFJSCxDQUxEOztBQU9lMEMsMEhBQU8sQ0FBQ04sZUFBRCxFQUFrQkcsa0JBQWxCLENBQVAsQ0FBNkNwRCxPQUE3QyxDQUFmIiwiZmlsZSI6Ii4vcmVzb3VyY2VzL2pzL3YxL1F1ZXN0aW9ucy9jb21wb25lbnRzL3VyZHUvZm9ybXMvTWNxRm9ybS5qc3guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIjtcbmltcG9ydCB7YWRkUXVlc3Rpb24sIGhpZGVRdWVzdGlvbkZvcm19IGZyb20gXCIuLi8uLi8uLi9yZWR1eC9BY3Rpb25zXCI7XG5cbmNsYXNzIE1jcUZvcm0gZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgb3B0aW9uczogWzFdXG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5oaWRlVG9waWNGb3JtID0gdGhpcy5oaWRlVG9waWNGb3JtLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuc3VibWl0Rm9ybSA9IHRoaXMuc3VibWl0Rm9ybS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmFkZE9wdGlvbiA9IHRoaXMuYWRkT3B0aW9uLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMucmVtb3ZlT3B0aW9uID0gdGhpcy5yZW1vdmVPcHRpb24uYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBoaWRlVG9waWNGb3JtKCkge1xuICAgICAgICBjb25zdCBjb25maXJtYXRpb24gPSB3aW5kb3cuY29uZmlybSgnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNhbmNlbD8nKTtcbiAgICAgICAgaWYgKCFjb25maXJtYXRpb24pIHJldHVybiBmYWxzZTtcblxuICAgICAgICB0aGlzLnByb3BzLmhpZGVGb3JtKHRoaXMucHJvcHMuaW5kZXgpO1xuICAgIH1cblxuICAgIGFkZE9wdGlvbigpIHtcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB0aGlzLnN0YXRlLm9wdGlvbnM7XG4gICAgICAgIGxldCBsYXN0X29wdGlvbiA9IG9wdGlvbnNbb3B0aW9ucy5sZW5ndGgtMV0gKyAxO1xuICAgICAgICBvcHRpb25zLnB1c2gobGFzdF9vcHRpb24pO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtvcHRpb25zOiBvcHRpb25zfSk7XG4gICAgfVxuXG4gICAgcmVtb3ZlT3B0aW9uKGluZGV4KSB7XG4gICAgICAgIGxldCBvcHRpb25zID0gdGhpcy5zdGF0ZS5vcHRpb25zO1xuXG4gICAgICAgIGlmKG9wdGlvbnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBvcHRpb25zLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe29wdGlvbnM6IG9wdGlvbnN9KTtcbiAgICB9XG5cbiAgICBzdWJtaXRGb3JtKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0IHNlcmlhbGl6ZSA9IHJlcXVpcmUoJ2Zvcm0tc2VyaWFsaXplJyk7XG4gICAgICAgIGxldCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3NlY3Rpb25Gb3JtXyR7dGhpcy5wcm9wcy5pbmRleH1gKTtcbiAgICAgICAgbGV0IGZvcm1fZGF0YSA9IHNlcmlhbGl6ZShmb3JtLCB7IGhhc2g6IHRydWUgfSk7XG5cbiAgICAgICAgaWYoIWZvcm1fZGF0YS5xdWVzdGlvbl9ydGwpIHtcbiAgICAgICAgICAgIGFsZXJ0KCdVcmR1IHF1ZXN0aW9uIHN0YXRlbWVudCBpcyByZXF1aXJlZCcpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIWZvcm1fZGF0YS5vcHRpb25fZW4gJiYgIWZvcm1fZGF0YS5vcHRpb25fcnRsKSB7XG4gICAgICAgICAgICBhbGVydCgnVXJkdSBvcHRpb24ocykgYXJlIHJlcXVpcmVkJyk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBmb3JtX2RhdGFbJ29wdGlvbl9ydGwnXSA9IEpTT04uc3RyaW5naWZ5KGZvcm1fZGF0YVsnb3B0aW9uX3J0bCddKTtcblxuICAgICAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICBmb3IgKGxldCBrZXkgaW4gZm9ybV9kYXRhKSB7XG4gICAgICAgICAgICBmb3JtRGF0YS5hcHBlbmQoa2V5LCBmb3JtX2RhdGFba2V5XSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnByb3BzLmFkZFF1ZXN0aW9uKGZvcm1EYXRhLCB0aGlzLnByb3BzLmVuZHBvaW50LCB0aGlzLnByb3BzLnR5cGUsIHRoaXMucHJvcHMuaW5kZXgpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxmb3JtIG9uU3VibWl0PXt0aGlzLnN1Ym1pdEZvcm19IGNsYXNzTmFtZT1cIm1iLTQgc2VjdGlvbkZvcm1cIiBpZD17YHNlY3Rpb25Gb3JtXyR7dGhpcy5wcm9wcy5pbmRleH1gfT5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImhpZGRlblwiIHZhbHVlPXt0aGlzLnByb3BzLmZvcm19IG5hbWU9XCJzZWN0aW9uX2luZm9cIiAvPlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwIGNvbC1tZC0xMiByb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPVwiY3VzdG9tLXNlbGVjdCBjb2wtbGctMTFcIiBuYW1lPVwicHJpb3JpdHlcIiBpZD1cInByaW9yaXR5XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImV4ZXJjaXNlXCI+RXhlcmNpc2U8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicGFzdF9wYXBlclwiPlBhc3QgUGFwZXI8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYWRkaXRpb25hbFwiPkFkZGl0aW9uYWw8L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc2VsZWN0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImNvbC1sZy0xIGNvbC1mb3JtLWxhYmVsXCIgaHRtbEZvcj1cInByaW9yaXR5XCI+UHJpb3JpdHk8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCBjb2wtbGctMTIgcm93IHVyZHUtZm9udFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImNvbC1sZy0xIGNvbC1mb3JtLWxhYmVsXCIgaHRtbEZvcj17YHF1ZXN0aW9uX3J0bF8ke3RoaXMucHJvcHMuaW5kZXh9YH0+2LPZiNin2YQ6PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29sLWxnLTExXCI+PGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPVwiZm9ybS1jb250cm9sXCIgaWQ9e2BxdWVzdGlvbl9ydGxfJHt0aGlzLnByb3BzLmluZGV4fWB9IG5hbWU9XCJxdWVzdGlvbl9ydGxcIiAvPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUub3B0aW9ucy5sZW5ndGggPiAwXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuc3RhdGUub3B0aW9ucy5tYXAoKG8sIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaj0gaSsxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgY29sLWxnLTEyIHJvdyB1cmR1LWZvbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiY29sLWxnLTEgY29sLWZvcm0tbGFiZWxcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sRm9yPXtgb3B0aW9uX3J0bF8ke2p9YH0+OnskaGVscGVyLmdldEFscGhhYmV0KGkpfSAgICDYotm+2LTZhlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbGctN1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBpZD17YG9wdGlvbl9ydGxfJHtqfWB9IG5hbWU9e2BvcHRpb25fcnRsW11gfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbGctMVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJhY3Rpb24tYnRuIGJ0biBidG4td2FybmluZyBmbG9hdC1yaWdodFwiIG9uQ2xpY2s9e3RoaXMuYWRkT3B0aW9ufT48aSBjbGFzc05hbWU9XCJmYSBmYS1wbHVzLWNpcmNsZVwiPjwvaT48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1sZy0xXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT17YCR7aSA9PT0gMCA/ICdkLW5vbmUnIDogJyd9IGFjdGlvbi1idG4gYnRuIGJ0bi1kYW5nZXJgfSBvbkNsaWNrPXsoKSA9PiB7dGhpcy5yZW1vdmVPcHRpb24oaSl9fT48aSBjbGFzc05hbWU9XCJmYSBmYS1taW51cy1jaXJjbGVcIj48L2k+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgIDogPFJlYWN0LkZyYWdtZW50PjwvUmVhY3QuRnJhZ21lbnQ+XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICA8aHIgY2xhc3NOYW1lPVwibXQtM1wiIC8+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgcm93XCI+XG5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbGctNiByb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IGNvbC1sZy01XCIgdHlwZT1cInN1Ym1pdFwiIGRpc2FibGVkPXt0aGlzLnByb3BzLmxvYWRpbmd9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmxvYWRpbmcgPyAnU2F2aW5nLi4uJyA6ICdTYXZlJ31cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWRhbmdlciBjb2wtbGctNVwiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXt0aGlzLmhpZGVUb3BpY0Zvcm19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENhbmNlbFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCBjb2wtbWQtNiByb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJjb2wtbGctMyBjb2wtZm9ybS1sYWJlbFwiIGh0bWxGb3I9XCJjb3JyZWN0X29wdGlvblwiPkNvcnJlY3QgQW5zd2VyPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPVwiY3VzdG9tLXNlbGVjdCBjb2wtbGctOVwiIG5hbWU9XCJjb3JyZWN0X29wdGlvblwiIGlkPVwiY29ycmVjdF9vcHRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUub3B0aW9ucy5sZW5ndGggPiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IHRoaXMuc3RhdGUub3B0aW9ucy5tYXAoKG8sIGkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPG9wdGlvbiB2YWx1ZT17JGhlbHBlci5nZXRBbHBoYWJldChpKX0+T3B0aW9uIHskaGVscGVyLmdldEFscGhhYmV0KGkpfTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogPG9wdGlvbj5Mb2FkaW5nLi4uPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICApXG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSBzdGF0ZSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbG9hZGluZzogc3RhdGUucXVlc3Rpb25zLmxvYWRpbmcsXG4gICAgICAgIG1lc3NhZ2U6IHN0YXRlLnF1ZXN0aW9ucy5tZXNzYWdlLFxuICAgIH1cbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBhZGRRdWVzdGlvbjogKGZvcm1EYXRhLCBlbmRwb2ludCwgdHlwZSwgaW5kZXgpID0+IGRpc3BhdGNoKGFkZFF1ZXN0aW9uKGRpc3BhdGNoLCBmb3JtRGF0YSwgZW5kcG9pbnQsIHR5cGUsIGluZGV4KSksXG4gICAgICAgIGhpZGVGb3JtOiAoaW5kZXgpID0+IGRpc3BhdGNoKGhpZGVRdWVzdGlvbkZvcm0oZGlzcGF0Y2gsIGluZGV4KSlcbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShNY3FGb3JtKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./resources/js/v1/Questions/components/urdu/forms/McqForm.jsx\n");

/***/ })

}]);