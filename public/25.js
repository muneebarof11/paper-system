(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[25],{

/***/ "./resources/js/v1/Questions/components/english/forms/EngQuestionForm.jsx":
/*!********************************************************************************!*\
  !*** ./resources/js/v1/Questions/components/english/forms/EngQuestionForm.jsx ***!
  \********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var _ckeditor_ckeditor5_react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @ckeditor/ckeditor5-react */ \"./node_modules/@ckeditor/ckeditor5-react/dist/ckeditor.js\");\n/* harmony import */ var _ckeditor_ckeditor5_react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ckeditor_ckeditor5_react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var ckeditor5_classic_with_mathtype__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ckeditor5-classic-with-mathtype */ \"./node_modules/ckeditor5-classic-with-mathtype/index.js\");\n/* harmony import */ var _redux_Actions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../redux/Actions */ \"./resources/js/v1/Questions/redux/Actions.js\");\n/* harmony import */ var _params__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../params */ \"./resources/js/v1/params.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\n\n\n\n\n\nvar EngQuestionForm = /*#__PURE__*/function (_Component) {\n  _inherits(EngQuestionForm, _Component);\n\n  var _super = _createSuper(EngQuestionForm);\n\n  function EngQuestionForm(props) {\n    var _this;\n\n    _classCallCheck(this, EngQuestionForm);\n\n    _this = _super.call(this, props);\n    _this.state = {\n      question_en: '',\n      question_rtl: ''\n    };\n    _this.submitForm = _this.submitForm.bind(_assertThisInitialized(_this));\n    _this.hideTopicForm = _this.hideTopicForm.bind(_assertThisInitialized(_this));\n    _this.updateStatement = _this.updateStatement.bind(_assertThisInitialized(_this));\n    return _this;\n  }\n\n  _createClass(EngQuestionForm, [{\n    key: \"hideTopicForm\",\n    value: function hideTopicForm() {\n      var confirmation = window.confirm('Are you sure you want to cancel?');\n      if (!confirmation) return false;\n      this.props.hideForm(this.props.index);\n    }\n  }, {\n    key: \"updateStatement\",\n    value: function updateStatement(statement, type) {\n      if (type === 'en') {\n        this.setState({\n          question_en: statement\n        });\n      } else {\n        this.setState({\n          question_rtl: statement\n        });\n      }\n    }\n  }, {\n    key: \"submitForm\",\n    value: function submitForm(e) {\n      e.preventDefault();\n\n      var serialize = __webpack_require__(/*! form-serialize */ \"./node_modules/form-serialize/index.js\");\n\n      var form = document.querySelector(\"#sectionForm_\".concat(this.props.index));\n      var form_data = serialize(form, {\n        hash: true\n      });\n\n      if (this.state.question_en.length <= 0 && this.state.question_rtl.length <= 0) {\n        alert('Either English or Urdu question statement is required');\n        return false;\n      }\n\n      var formData = new FormData();\n\n      for (var key in form_data) {\n        formData.append(key, form_data[key]);\n      }\n\n      formData.append('question_en', this.state.question_en);\n      formData.append('question_rtl', this.state.question_rtl);\n      this.props.addQuestion(formData, this.props.endpoint, this.props.type, this.props.index);\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      var _this2 = this;\n\n      var toolbar = ['heading', '|', 'bold', 'italic', 'blockQuote', '|', 'bulletedList', 'numberedList', '|', 'undo', 'redo'];\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"form\", {\n        onSubmit: this.submitForm,\n        className: \"mb-4 sectionForm\",\n        id: \"sectionForm_\".concat(this.props.index)\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n        type: \"hidden\",\n        value: this.props.form,\n        name: \"section_info\"\n      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"row\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n        className: \"col-lg-1 col-form-label\",\n        htmlFor: \"priority\"\n      }, \"Priority\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"form-group col-md-12 row\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"select\", {\n        className: \"custom-select col-lg-11\",\n        name: \"priority\",\n        id: \"priority\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", {\n        value: \"exercise\"\n      }, \"Exercise\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", {\n        value: \"past_paper\"\n      }, \"Past Paper\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", {\n        value: \"additional\"\n      }, \"Additional\")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"row\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"form-group container-fluid\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h4\", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n        className: \"col-form-label col-lg-12\",\n        htmlFor: \"question_en_\".concat(this.props.index)\n      }, \"Question:\")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"col-lg-12\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ckeditor_ckeditor5_react__WEBPACK_IMPORTED_MODULE_2___default.a, {\n        editor: ckeditor5_classic_with_mathtype__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n        onChange: function onChange(event, editor) {\n          var data = editor.getData();\n\n          _this2.setState({\n            question_en: data\n          });\n        },\n        config: _params__WEBPACK_IMPORTED_MODULE_5__[\"ckEditor_config\"]\n      })))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", {\n        className: \"mt-3\"\n      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"form-group row\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"mx-auto col-lg-6 row\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n        className: \"btn btn-primary col-lg-5\",\n        type: \"submit\",\n        disabled: this.props.loading\n      }, this.props.loading ? 'Saving...' : 'Save'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n        className: \"btn btn-danger col-lg-5\",\n        type: \"button\",\n        onClick: this.hideTopicForm\n      }, \"Cancel\"))));\n    }\n  }]);\n\n  return EngQuestionForm;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]);\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    loading: state.questions.loading,\n    message: state.questions.message\n  };\n};\n\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n  return {\n    addQuestion: function addQuestion(formData, endpoint, type, index) {\n      return dispatch(Object(_redux_Actions__WEBPACK_IMPORTED_MODULE_4__[\"addQuestion\"])(dispatch, formData, endpoint, type, index));\n    },\n    hideForm: function hideForm(index) {\n      return dispatch(Object(_redux_Actions__WEBPACK_IMPORTED_MODULE_4__[\"hideQuestionForm\"])(dispatch, index));\n    }\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__[\"connect\"])(mapStateToProps, mapDispatchToProps)(EngQuestionForm));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvdjEvUXVlc3Rpb25zL2NvbXBvbmVudHMvZW5nbGlzaC9mb3Jtcy9FbmdRdWVzdGlvbkZvcm0uanN4PzNmY2UiXSwibmFtZXMiOlsiRW5nUXVlc3Rpb25Gb3JtIiwicHJvcHMiLCJzdGF0ZSIsInF1ZXN0aW9uX2VuIiwicXVlc3Rpb25fcnRsIiwic3VibWl0Rm9ybSIsImJpbmQiLCJoaWRlVG9waWNGb3JtIiwidXBkYXRlU3RhdGVtZW50IiwiY29uZmlybWF0aW9uIiwid2luZG93IiwiY29uZmlybSIsImhpZGVGb3JtIiwiaW5kZXgiLCJzdGF0ZW1lbnQiLCJ0eXBlIiwic2V0U3RhdGUiLCJlIiwicHJldmVudERlZmF1bHQiLCJzZXJpYWxpemUiLCJyZXF1aXJlIiwiZm9ybSIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImZvcm1fZGF0YSIsImhhc2giLCJsZW5ndGgiLCJhbGVydCIsImZvcm1EYXRhIiwiRm9ybURhdGEiLCJrZXkiLCJhcHBlbmQiLCJhZGRRdWVzdGlvbiIsImVuZHBvaW50IiwidG9vbGJhciIsIkNsYXNzaWNFZGl0b3IiLCJldmVudCIsImVkaXRvciIsImRhdGEiLCJnZXREYXRhIiwiY2tFZGl0b3JfY29uZmlnIiwibG9hZGluZyIsIkNvbXBvbmVudCIsIm1hcFN0YXRlVG9Qcm9wcyIsInF1ZXN0aW9ucyIsIm1lc3NhZ2UiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJkaXNwYXRjaCIsImhpZGVRdWVzdGlvbkZvcm0iLCJjb25uZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBOztJQUVNQSxlOzs7OztBQUNGLDJCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUE7O0FBQ2YsOEJBQU1BLEtBQU47QUFFQSxVQUFLQyxLQUFMLEdBQWE7QUFDVEMsaUJBQVcsRUFBRSxFQURKO0FBRVRDLGtCQUFZLEVBQUU7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RUFBQyxRQUFqRDtBQUEwRCxlQUFPLEVBQUUsS0FBS2xDO0FBQXhFLGtCQUpKLENBRkosQ0FoQ0osQ0FESjtBQStDSDs7OztFQXZHeUJtQywrQzs7QUEwRzlCLElBQU1DLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0IsQ0FBQXpDLEtBQUssRUFBSTtBQUM3QixTQUFPO0FBQ0h1QyxXQUFPLEVBQUV2QyxLQUFLLENBQUMwQyxTQUFOLENBQWdCSCxPQUR0QjtBQUVISSxXQUFPLEVBQUUzQyxLQUFLLENBQUMwQyxTQUFOLENBQWdCQztBQUZ0QixHQUFQO0FBSUgsQ0FMRDs7QUFPQSxJQUFNQyxrQkFBa0IsR0FBRyxTQUFyQkEsa0JBQXFCLENBQUFDLFFBQVEsRUFBSTtBQUNuQyxTQUFPO0FBQ0hmLGVBQVcsRUFBRSxxQkFBQ0osUUFBRCxFQUFXSyxRQUFYLEVBQXFCbEIsSUFBckIsRUFBMkJGLEtBQTNCO0FBQUEsYUFBcUNrQyxRQUFRLENBQUNmLGtFQUFXLENBQUNlLFFBQUQsRUFBV25CLFFBQVgsRUFBcUJLLFFBQXJCLEVBQStCbEIsSUFBL0IsRUFBcUNGLEtBQXJDLENBQVosQ0FBN0M7QUFBQSxLQURWO0FBRUhELFlBQVEsRUFBRSxrQkFBQ0MsS0FBRDtBQUFBLGFBQVdrQyxRQUFRLENBQUNDLHVFQUFnQixDQUFDRCxRQUFELEVBQVdsQyxLQUFYLENBQWpCLENBQW5CO0FBQUE7QUFGUCxHQUFQO0FBSUgsQ0FMRDs7QUFPZW9DLDBIQUFPLENBQUNOLGVBQUQsRUFBa0JHLGtCQUFsQixDQUFQLENBQTZDOUMsZUFBN0MsQ0FBZiIsImZpbGUiOiIuL3Jlc291cmNlcy9qcy92MS9RdWVzdGlvbnMvY29tcG9uZW50cy9lbmdsaXNoL2Zvcm1zL0VuZ1F1ZXN0aW9uRm9ybS5qc3guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHtjb25uZWN0fSBmcm9tIFwicmVhY3QtcmVkdXhcIjtcblxuaW1wb3J0IENLRWRpdG9yIGZyb20gJ0Bja2VkaXRvci9ja2VkaXRvcjUtcmVhY3QnO1xuaW1wb3J0IENsYXNzaWNFZGl0b3IgZnJvbSAnY2tlZGl0b3I1LWNsYXNzaWMtd2l0aC1tYXRodHlwZSc7XG5cbmltcG9ydCB7YWRkUXVlc3Rpb24sIGhpZGVRdWVzdGlvbkZvcm19IGZyb20gXCIuLi8uLi8uLi9yZWR1eC9BY3Rpb25zXCI7XG5pbXBvcnQge2NrRWRpdG9yX2NvbmZpZ30gZnJvbSBcIi4uLy4uLy4uLy4uL3BhcmFtc1wiO1xuXG5jbGFzcyBFbmdRdWVzdGlvbkZvcm0gZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgcXVlc3Rpb25fZW46ICcnLFxuICAgICAgICAgICAgcXVlc3Rpb25fcnRsOiAnJyxcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnN1Ym1pdEZvcm0gPSB0aGlzLnN1Ym1pdEZvcm0uYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5oaWRlVG9waWNGb3JtID0gdGhpcy5oaWRlVG9waWNGb3JtLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGVtZW50ID0gdGhpcy51cGRhdGVTdGF0ZW1lbnQuYmluZCh0aGlzKTtcbiAgICB9XG5cbiAgICBoaWRlVG9waWNGb3JtKCkge1xuICAgICAgICBjb25zdCBjb25maXJtYXRpb24gPSB3aW5kb3cuY29uZmlybSgnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGNhbmNlbD8nKTtcbiAgICAgICAgaWYgKCFjb25maXJtYXRpb24pIHJldHVybiBmYWxzZTtcblxuICAgICAgICB0aGlzLnByb3BzLmhpZGVGb3JtKHRoaXMucHJvcHMuaW5kZXgpO1xuICAgIH1cblxuICAgIHVwZGF0ZVN0YXRlbWVudChzdGF0ZW1lbnQsIHR5cGUpIHtcbiAgICAgICAgaWYodHlwZSA9PT0gJ2VuJykge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cXVlc3Rpb25fZW46IHN0YXRlbWVudH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtxdWVzdGlvbl9ydGw6IHN0YXRlbWVudH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzdWJtaXRGb3JtKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGNvbnN0IHNlcmlhbGl6ZSA9IHJlcXVpcmUoJ2Zvcm0tc2VyaWFsaXplJyk7XG4gICAgICAgIGxldCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3NlY3Rpb25Gb3JtXyR7dGhpcy5wcm9wcy5pbmRleH1gKTtcblxuICAgICAgICBsZXQgZm9ybV9kYXRhID0gc2VyaWFsaXplKGZvcm0sIHsgaGFzaDogdHJ1ZSB9KTtcblxuICAgICAgICBpZih0aGlzLnN0YXRlLnF1ZXN0aW9uX2VuLmxlbmd0aCA8PSAwICYmIHRoaXMuc3RhdGUucXVlc3Rpb25fcnRsLmxlbmd0aCA8PSAwKSB7XG4gICAgICAgICAgICBhbGVydCgnRWl0aGVyIEVuZ2xpc2ggb3IgVXJkdSBxdWVzdGlvbiBzdGF0ZW1lbnQgaXMgcmVxdWlyZWQnKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgIGZvciAobGV0IGtleSBpbiBmb3JtX2RhdGEpIHtcbiAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIGZvcm1fZGF0YVtrZXldKTtcbiAgICAgICAgfVxuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoJ3F1ZXN0aW9uX2VuJywgdGhpcy5zdGF0ZS5xdWVzdGlvbl9lbik7XG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZCgncXVlc3Rpb25fcnRsJywgdGhpcy5zdGF0ZS5xdWVzdGlvbl9ydGwpO1xuXG4gICAgICAgIHRoaXMucHJvcHMuYWRkUXVlc3Rpb24oZm9ybURhdGEsIHRoaXMucHJvcHMuZW5kcG9pbnQsIHRoaXMucHJvcHMudHlwZSwgdGhpcy5wcm9wcy5pbmRleCk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgdG9vbGJhciA9IFtcbiAgICAgICAgICAgICdoZWFkaW5nJywgJ3wnLCAnYm9sZCcsICdpdGFsaWMnLCAnYmxvY2tRdW90ZScsICd8JywgJ2J1bGxldGVkTGlzdCcsICdudW1iZXJlZExpc3QnLCAnfCcsICAndW5kbycsICdyZWRvJ1xuICAgICAgICBdO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGZvcm0gb25TdWJtaXQ9e3RoaXMuc3VibWl0Rm9ybX0gY2xhc3NOYW1lPVwibWItNCBzZWN0aW9uRm9ybVwiIGlkPXtgc2VjdGlvbkZvcm1fJHt0aGlzLnByb3BzLmluZGV4fWB9PlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgdmFsdWU9e3RoaXMucHJvcHMuZm9ybX0gbmFtZT1cInNlY3Rpb25faW5mb1wiIC8+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiY29sLWxnLTEgY29sLWZvcm0tbGFiZWxcIiBodG1sRm9yPVwicHJpb3JpdHlcIj5Qcmlvcml0eTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCBjb2wtbWQtMTIgcm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c2VsZWN0IGNsYXNzTmFtZT1cImN1c3RvbS1zZWxlY3QgY29sLWxnLTExXCIgbmFtZT1cInByaW9yaXR5XCIgaWQ9XCJwcmlvcml0eVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJleGVyY2lzZVwiPkV4ZXJjaXNlPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInBhc3RfcGFwZXJcIj5QYXN0IFBhcGVyPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImFkZGl0aW9uYWxcIj5BZGRpdGlvbmFsPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgY29udGFpbmVyLWZsdWlkXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aDQ+PGxhYmVsIGNsYXNzTmFtZT1cImNvbC1mb3JtLWxhYmVsIGNvbC1sZy0xMlwiIGh0bWxGb3I9e2BxdWVzdGlvbl9lbl8ke3RoaXMucHJvcHMuaW5kZXh9YH0+UXVlc3Rpb246PC9sYWJlbD48L2g0PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtbGctMTJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8Q0tFZGl0b3JcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdG9yPXtDbGFzc2ljRWRpdG9yfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17ICggZXZlbnQsIGVkaXRvciApID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBlZGl0b3IuZ2V0RGF0YSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7cXVlc3Rpb25fZW46IGRhdGF9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maWc9e2NrRWRpdG9yX2NvbmZpZ31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwibXQtM1wiPjwvcD5cblxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCByb3dcIj5cblxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm14LWF1dG8gY29sLWxnLTYgcm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cImJ0biBidG4tcHJpbWFyeSBjb2wtbGctNVwiIHR5cGU9XCJzdWJtaXRcIiBkaXNhYmxlZD17dGhpcy5wcm9wcy5sb2FkaW5nfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5sb2FkaW5nID8gJ1NhdmluZy4uLicgOiAnU2F2ZSd9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1kYW5nZXIgY29sLWxnLTVcIiB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17dGhpcy5oaWRlVG9waWNGb3JtfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBDYW5jZWxcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cblxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICApXG4gICAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSBzdGF0ZSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbG9hZGluZzogc3RhdGUucXVlc3Rpb25zLmxvYWRpbmcsXG4gICAgICAgIG1lc3NhZ2U6IHN0YXRlLnF1ZXN0aW9ucy5tZXNzYWdlLFxuICAgIH1cbn07XG5cbmNvbnN0IG1hcERpc3BhdGNoVG9Qcm9wcyA9IGRpc3BhdGNoID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBhZGRRdWVzdGlvbjogKGZvcm1EYXRhLCBlbmRwb2ludCwgdHlwZSwgaW5kZXgpID0+IGRpc3BhdGNoKGFkZFF1ZXN0aW9uKGRpc3BhdGNoLCBmb3JtRGF0YSwgZW5kcG9pbnQsIHR5cGUsIGluZGV4KSksXG4gICAgICAgIGhpZGVGb3JtOiAoaW5kZXgpID0+IGRpc3BhdGNoKGhpZGVRdWVzdGlvbkZvcm0oZGlzcGF0Y2gsIGluZGV4KSlcbiAgICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKShFbmdRdWVzdGlvbkZvcm0pO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./resources/js/v1/Questions/components/english/forms/EngQuestionForm.jsx\n");

/***/ })

}]);