(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[33],{

/***/ "./resources/js/v1/Questions/components/math/forms/QuestionWithImage.jsx":
/*!*******************************************************************************!*\
  !*** ./resources/js/v1/Questions/components/math/forms/QuestionWithImage.jsx ***!
  \*******************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _redux_Actions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../redux/Actions */ \"./resources/js/v1/Questions/redux/Actions.js\");\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\n\n\nvar QuestionWithImage = /*#__PURE__*/function (_Component) {\n  _inherits(QuestionWithImage, _Component);\n\n  var _super = _createSuper(QuestionWithImage);\n\n  function QuestionWithImage(props) {\n    var _this;\n\n    _classCallCheck(this, QuestionWithImage);\n\n    _this = _super.call(this, props);\n    _this.state = {\n      image: {}\n    };\n    _this.submitForm = _this.submitForm.bind(_assertThisInitialized(_this));\n    _this.hideTopicForm = _this.hideTopicForm.bind(_assertThisInitialized(_this));\n    _this.updateFile = _this.updateFile.bind(_assertThisInitialized(_this));\n    _this.showImage = _this.showImage.bind(_assertThisInitialized(_this));\n    return _this;\n  }\n\n  _createClass(QuestionWithImage, [{\n    key: \"submitForm\",\n    value: function submitForm(e) {\n      e.preventDefault();\n      var file = this.state.image;\n\n      if (!file.name) {\n        alert('Please select an image');\n        return false;\n      }\n\n      var serialize = __webpack_require__(/*! form-serialize */ \"./node_modules/form-serialize/index.js\");\n\n      var form = document.querySelector(\"#sectionForm_\".concat(this.props.index));\n      var form_data = serialize(form, {\n        hash: true\n      });\n\n      if (!form_data.question_en && !form_data.question_rtl) {\n        alert('Either English or Urdu question statement is required');\n        return false;\n      }\n\n      var formData = new FormData();\n\n      for (var key in form_data) {\n        formData.append(key, form_data[key]);\n      }\n\n      formData.append(\"file\", file, file.name);\n      this.props.addQuestion(formData, this.props.endpoint, this.props.type, this.props.index);\n    }\n  }, {\n    key: \"hideTopicForm\",\n    value: function hideTopicForm(warning) {\n      var confirmation = window.confirm('Are you sure you want to cancel?');\n      if (!confirmation) return false;\n      this.props.hideForm(this.props.index);\n    }\n  }, {\n    key: \"updateFile\",\n    value: function updateFile(e) {\n      var id = \"question_image_\".concat(this.props.index);\n      var src = document.getElementById(id);\n      var target = document.getElementById(\"question_image_preview\");\n      this.showImage(src, target);\n      var file = e.target.files[0];\n      this.setState({\n        image: file\n      });\n    }\n  }, {\n    key: \"showImage\",\n    value: function showImage(src, target) {\n      var fr = new FileReader(); // when image is loaded, set the src of the image where you want to display it\n\n      fr.onload = function (e) {\n        target.src = this.result;\n      };\n\n      fr.readAsDataURL(src.files[0]);\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"form\", {\n        onSubmit: this.submitForm,\n        className: \"mb-4 sectionForm\",\n        id: \"sectionForm_\".concat(this.props.index),\n        encType: \"multipart/form-data\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n        type: \"hidden\",\n        value: this.props.form,\n        name: \"section_info\"\n      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"row\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"form-group col-md-6 row\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n        className: \"col-lg-3 col-form-label\",\n        htmlFor: \"priority\"\n      }, \"Priority\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"select\", {\n        className: \"custom-select col-lg-9\",\n        name: \"priority\",\n        id: \"priority\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", {\n        value: \"exercise\"\n      }, \"Exercise\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", {\n        value: \"past_paper\"\n      }, \"Past Paper\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", {\n        value: \"additional\"\n      }, \"Additional\")))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"row\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"form-group col-lg-6 row\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n        className: \"col-form-label col-lg-2\",\n        htmlFor: \"question_en_\".concat(this.props.index)\n      }, \"Question:\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"col-lg-10\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"textarea\", {\n        className: \"form-control\",\n        name: \"question_en\",\n        id: \"question_en_\".concat(this.props.index),\n        rows: \"3\"\n      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"form-group col-lg-6 row urdu-font\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"col-lg-10\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"textarea\", {\n        className: \"form-control text-align-right\",\n        name: \"question_rtl\",\n        id: \"question_rtl_\".concat(this.props.index),\n        rows: \"3\"\n      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n        className: \"col-lg-2 col-form-label text-align-right\",\n        htmlFor: \"question_rtl_\".concat(this.props.index)\n      }, \":\\u0633\\u0648\\u0627\\u0644\"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"row\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"form-group col-lg-6 row\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n        className: \"col-lg-3 col-form-label\"\n      }, \"Choose Image\"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"custom-file col-lg-8\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n        type: \"file\",\n        className: \"custom-file-input\",\n        id: \"question_image_\".concat(this.props.index),\n        name: \"question_image\",\n        onChange: this.updateFile\n      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n        className: \"custom-file-label\",\n        htmlFor: \"question_image_\".concat(this.props.index)\n      }, \"Choose file\"))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"form-group col-lg-6 row urdu-font\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n        id: \"question_image_preview\",\n        className: \"img-thumbnail mx-auto row-cols-8\"\n      }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", {\n        className: \"mt-3\"\n      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"form-group row\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"mx-auto col-lg-6 row\"\n      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n        className: \"btn btn-primary col-lg-5\",\n        type: \"submit\",\n        disabled: this.state.is_loading\n      }, this.state.is_loading ? 'Saving...' : 'Save'), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n        className: \"btn btn-danger col-lg-5\",\n        type: \"button\",\n        onClick: this.hideTopicForm\n      }, \"Cancel\"))));\n    }\n  }]);\n\n  return QuestionWithImage;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]);\n\nvar mapStateToProps = function mapStateToProps(state) {\n  return {\n    loading: state.questions.loading,\n    message: state.questions.message\n  };\n};\n\nvar mapDispatchToProps = function mapDispatchToProps(dispatch) {\n  return {\n    addQuestion: function addQuestion(formData, endpoint, type, index) {\n      return dispatch(Object(_redux_Actions__WEBPACK_IMPORTED_MODULE_1__[\"addQuestion\"])(dispatch, formData, endpoint, type, index));\n    },\n    hideForm: function hideForm(index) {\n      return dispatch(Object(_redux_Actions__WEBPACK_IMPORTED_MODULE_1__[\"hideQuestionForm\"])(dispatch, index));\n    }\n  };\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_2__[\"connect\"])(mapStateToProps, mapDispatchToProps)(QuestionWithImage));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9yZXNvdXJjZXMvanMvdjEvUXVlc3Rpb25zL2NvbXBvbmVudHMvbWF0aC9mb3Jtcy9RdWVzdGlvbldpdGhJbWFnZS5qc3g/NmJlZSJdLCJuYW1lcyI6WyJRdWVzdGlvbldpdGhJbWFnZSIsInByb3BzIiwic3RhdGUiLCJpbWFnZSIsInN1Ym1pdEZvcm0iLCJiaW5kIiwiaGlkZVRvcGljRm9ybSIsInVwZGF0ZUZpbGUiLCJzaG93SW1hZ2UiLCJlIiwicHJldmVudERlZmF1bHQiLCJmaWxlIiwibmFtZSIsImFsZXJ0Iiwic2VyaWFsaXplIiwicmVxdWlyZSIsImZvcm0iLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJpbmRleCIsImZvcm1fZGF0YSIsImhhc2giLCJxdWVzdGlvbl9lbiIsInF1ZXN0aW9uX3J0bCIsImZvcm1EYXRhIiwiRm9ybURhdGEiLCJrZXkiLCJhcHBlbmQiLCJhZGRRdWVzdGlvbiIsImVuZHBvaW50IiwidHlwZSIsIndhcm5pbmciLCJjb25maXJtYXRpb24iLCJ3aW5kb3ciLCJjb25maXJtIiwiaGlkZUZvcm0iLCJpZCIsInNyYyIsImdldEVsZW1lbnRCeUlkIiwidGFyZ2V0IiwiZmlsZXMiLCJzZXRTdGF0ZSIsImZyIiwiRmlsZVJlYWRlciIsIm9ubG9hZCIsInJlc3VsdCIsInJlYWRBc0RhdGFVUkwiLCJpc19sb2FkaW5nIiwiQ29tcG9uZW50IiwibWFwU3RhdGVUb1Byb3BzIiwibG9hZGluZyIsInF1ZXN0aW9ucyIsIm1lc3NhZ2UiLCJtYXBEaXNwYXRjaFRvUHJvcHMiLCJkaXNwYXRjaCIsImhpZGVRdWVzdGlvbkZvcm0iLCJjb25uZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7O0lBRU1BLGlCOzs7OztBQUVGLDZCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUE7O0FBQ2YsOEJBQU1BLEtBQU47QUFFQSxVQUFLQyxLQUFMLEdBQWE7QUFDVEMs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LENBQVc2QyxVQUFYLEdBQXdCLFdBQXhCLEdBQXNDLE1BRDNDLENBREosZUFJSTtBQUFRLGlCQUFTLEVBQUMseUJBQWxCO0FBQTRDLFlBQUksRUFBQyxRQUFqRDtBQUEwRCxlQUFPLEVBQUUsS0FBS3pDO0FBQXhFLGtCQUpKLENBRkosQ0EzQ0osQ0FESjtBQTBESDs7OztFQTdIMkIwQywrQzs7QUFnSWhDLElBQU1DLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0IsQ0FBQS9DLEtBQUssRUFBSTtBQUM3QixTQUFPO0FBQ0hnRCxXQUFPLEVBQUVoRCxLQUFLLENBQUNpRCxTQUFOLENBQWdCRCxPQUR0QjtBQUVIRSxXQUFPLEVBQUVsRCxLQUFLLENBQUNpRCxTQUFOLENBQWdCQztBQUZ0QixHQUFQO0FBSUgsQ0FMRDs7QUFPQSxJQUFNQyxrQkFBa0IsR0FBRyxTQUFyQkEsa0JBQXFCLENBQUFDLFFBQVEsRUFBSTtBQUNuQyxTQUFPO0FBQ0gxQixlQUFXLEVBQUUscUJBQUNKLFFBQUQsRUFBV0ssUUFBWCxFQUFxQkMsSUFBckIsRUFBMkJYLEtBQTNCO0FBQUEsYUFBcUNtQyxRQUFRLENBQUMxQixrRUFBVyxDQUFDMEIsUUFBRCxFQUFXOUIsUUFBWCxFQUFxQkssUUFBckIsRUFBK0JDLElBQS9CLEVBQXFDWCxLQUFyQyxDQUFaLENBQTdDO0FBQUEsS0FEVjtBQUVIZ0IsWUFBUSxFQUFFLGtCQUFDaEIsS0FBRDtBQUFBLGFBQVdtQyxRQUFRLENBQUNDLHVFQUFnQixDQUFDRCxRQUFELEVBQVduQyxLQUFYLENBQWpCLENBQW5CO0FBQUE7QUFGUCxHQUFQO0FBSUgsQ0FMRDs7QUFPZXFDLDBIQUFPLENBQUNQLGVBQUQsRUFBa0JJLGtCQUFsQixDQUFQLENBQTZDckQsaUJBQTdDLENBQWYiLCJmaWxlIjoiLi9yZXNvdXJjZXMvanMvdjEvUXVlc3Rpb25zL2NvbXBvbmVudHMvbWF0aC9mb3Jtcy9RdWVzdGlvbldpdGhJbWFnZS5qc3guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHthZGRRdWVzdGlvbiwgaGlkZVF1ZXN0aW9uRm9ybX0gZnJvbSBcIi4uLy4uLy4uL3JlZHV4L0FjdGlvbnNcIjtcbmltcG9ydCB7Y29ubmVjdH0gZnJvbSBcInJlYWN0LXJlZHV4XCI7XG5cbmNsYXNzIFF1ZXN0aW9uV2l0aEltYWdlIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgaW1hZ2U6IHt9XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5zdWJtaXRGb3JtID0gdGhpcy5zdWJtaXRGb3JtLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGlkZVRvcGljRm9ybSA9IHRoaXMuaGlkZVRvcGljRm9ybS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnVwZGF0ZUZpbGUgPSB0aGlzLnVwZGF0ZUZpbGUuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5zaG93SW1hZ2UgPSB0aGlzLnNob3dJbWFnZS5iaW5kKHRoaXMpO1xuICAgIH1cblxuICAgIHN1Ym1pdEZvcm0oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgbGV0IGZpbGUgPSB0aGlzLnN0YXRlLmltYWdlO1xuICAgICAgICBpZighZmlsZS5uYW1lKSB7XG4gICAgICAgICAgICBhbGVydCgnUGxlYXNlIHNlbGVjdCBhbiBpbWFnZScpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2VyaWFsaXplID0gcmVxdWlyZSgnZm9ybS1zZXJpYWxpemUnKTtcbiAgICAgICAgbGV0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjc2VjdGlvbkZvcm1fJHt0aGlzLnByb3BzLmluZGV4fWApO1xuICAgICAgICBsZXQgZm9ybV9kYXRhID0gc2VyaWFsaXplKGZvcm0sIHsgaGFzaDogdHJ1ZSB9KTtcblxuICAgICAgICBpZighZm9ybV9kYXRhLnF1ZXN0aW9uX2VuICYmICFmb3JtX2RhdGEucXVlc3Rpb25fcnRsKSB7XG4gICAgICAgICAgICBhbGVydCgnRWl0aGVyIEVuZ2xpc2ggb3IgVXJkdSBxdWVzdGlvbiBzdGF0ZW1lbnQgaXMgcmVxdWlyZWQnKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gICAgICAgIGZvciAobGV0IGtleSBpbiBmb3JtX2RhdGEpIHtcbiAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZChrZXksIGZvcm1fZGF0YVtrZXldKTtcbiAgICAgICAgfVxuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoXCJmaWxlXCIsIGZpbGUsIGZpbGUubmFtZSk7XG5cbiAgICAgICAgdGhpcy5wcm9wcy5hZGRRdWVzdGlvbihmb3JtRGF0YSwgdGhpcy5wcm9wcy5lbmRwb2ludCwgdGhpcy5wcm9wcy50eXBlLCB0aGlzLnByb3BzLmluZGV4KTtcbiAgICB9XG5cbiAgICBoaWRlVG9waWNGb3JtKHdhcm5pbmcpIHtcbiAgICAgICAgY29uc3QgY29uZmlybWF0aW9uID0gd2luZG93LmNvbmZpcm0oJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBjYW5jZWw/Jyk7XG4gICAgICAgIGlmICghY29uZmlybWF0aW9uKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgdGhpcy5wcm9wcy5oaWRlRm9ybSh0aGlzLnByb3BzLmluZGV4KTtcbiAgICB9XG5cbiAgICB1cGRhdGVGaWxlKGUpIHtcbiAgICAgICAgbGV0IGlkID0gYHF1ZXN0aW9uX2ltYWdlXyR7dGhpcy5wcm9wcy5pbmRleH1gO1xuICAgICAgICBjb25zdCBzcmMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicXVlc3Rpb25faW1hZ2VfcHJldmlld1wiKTtcbiAgICAgICAgdGhpcy5zaG93SW1hZ2Uoc3JjLCB0YXJnZXQpO1xuXG4gICAgICAgIGxldCBmaWxlID0gZS50YXJnZXQuZmlsZXNbMF07XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2ltYWdlOiBmaWxlfSk7XG4gICAgfVxuXG4gICAgc2hvd0ltYWdlKHNyYywgdGFyZ2V0KSB7XG4gICAgICAgIGxldCBmciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgIC8vIHdoZW4gaW1hZ2UgaXMgbG9hZGVkLCBzZXQgdGhlIHNyYyBvZiB0aGUgaW1hZ2Ugd2hlcmUgeW91IHdhbnQgdG8gZGlzcGxheSBpdFxuICAgICAgICBmci5vbmxvYWQgPSBmdW5jdGlvbihlKSB7IHRhcmdldC5zcmMgPSB0aGlzLnJlc3VsdDsgfTtcbiAgICAgICAgZnIucmVhZEFzRGF0YVVSTChzcmMuZmlsZXNbMF0pO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxmb3JtIG9uU3VibWl0PXt0aGlzLnN1Ym1pdEZvcm19IGNsYXNzTmFtZT1cIm1iLTQgc2VjdGlvbkZvcm1cIiBpZD17YHNlY3Rpb25Gb3JtXyR7dGhpcy5wcm9wcy5pbmRleH1gfSBlbmNUeXBlPVwibXVsdGlwYXJ0L2Zvcm0tZGF0YVwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgdmFsdWU9e3RoaXMucHJvcHMuZm9ybX0gbmFtZT1cInNlY3Rpb25faW5mb1wiIC8+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwIGNvbC1tZC02IHJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImNvbC1sZy0zIGNvbC1mb3JtLWxhYmVsXCIgaHRtbEZvcj1cInByaW9yaXR5XCI+UHJpb3JpdHk8L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzc05hbWU9XCJjdXN0b20tc2VsZWN0IGNvbC1sZy05XCIgbmFtZT1cInByaW9yaXR5XCIgaWQ9XCJwcmlvcml0eVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJleGVyY2lzZVwiPkV4ZXJjaXNlPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cInBhc3RfcGFwZXJcIj5QYXN0IFBhcGVyPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImFkZGl0aW9uYWxcIj5BZGRpdGlvbmFsPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZvcm0tZ3JvdXAgY29sLWxnLTYgcm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiY29sLWZvcm0tbGFiZWwgY29sLWxnLTJcIiBodG1sRm9yPXtgcXVlc3Rpb25fZW5fJHt0aGlzLnByb3BzLmluZGV4fWB9PlF1ZXN0aW9uOjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1sZy0xMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2xcIiBuYW1lPVwicXVlc3Rpb25fZW5cIiBpZD17YHF1ZXN0aW9uX2VuXyR7dGhpcy5wcm9wcy5pbmRleH1gfSByb3dzPVwiM1wiPjwvdGV4dGFyZWE+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCBjb2wtbGctNiByb3cgdXJkdS1mb250XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1sZy0xMFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0ZXh0YXJlYSBjbGFzc05hbWU9XCJmb3JtLWNvbnRyb2wgdGV4dC1hbGlnbi1yaWdodFwiIG5hbWU9XCJxdWVzdGlvbl9ydGxcIiBpZD17YHF1ZXN0aW9uX3J0bF8ke3RoaXMucHJvcHMuaW5kZXh9YH0gcm93cz1cIjNcIj48L3RleHRhcmVhPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPVwiY29sLWxnLTIgY29sLWZvcm0tbGFiZWwgdGV4dC1hbGlnbi1yaWdodFwiIGh0bWxGb3I9e2BxdWVzdGlvbl9ydGxfJHt0aGlzLnByb3BzLmluZGV4fWB9PjrYs9mI2KfZhDwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwIGNvbC1sZy02IHJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImNvbC1sZy0zIGNvbC1mb3JtLWxhYmVsXCI+Q2hvb3NlIEltYWdlPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY3VzdG9tLWZpbGUgY29sLWxnLThcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImZpbGVcIiBjbGFzc05hbWU9XCJjdXN0b20tZmlsZS1pbnB1dFwiIGlkPXtgcXVlc3Rpb25faW1hZ2VfJHt0aGlzLnByb3BzLmluZGV4fWB9IG5hbWU9XCJxdWVzdGlvbl9pbWFnZVwiIG9uQ2hhbmdlPXt0aGlzLnVwZGF0ZUZpbGV9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImN1c3RvbS1maWxlLWxhYmVsXCIgaHRtbEZvcj17YHF1ZXN0aW9uX2ltYWdlXyR7dGhpcy5wcm9wcy5pbmRleH1gfT5DaG9vc2UgZmlsZTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZm9ybS1ncm91cCBjb2wtbGctNiByb3cgdXJkdS1mb250XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIGlkPVwicXVlc3Rpb25faW1hZ2VfcHJldmlld1wiIGNsYXNzTmFtZT1cImltZy10aHVtYm5haWwgbXgtYXV0byByb3ctY29scy04XCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJtdC0zXCI+PC9wPlxuXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmb3JtLWdyb3VwIHJvd1wiPlxuXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibXgtYXV0byBjb2wtbGctNiByb3dcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IGNvbC1sZy01XCIgdHlwZT1cInN1Ym1pdFwiIGRpc2FibGVkPXt0aGlzLnN0YXRlLmlzX2xvYWRpbmd9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHt0aGlzLnN0YXRlLmlzX2xvYWRpbmcgPyAnU2F2aW5nLi4uJyA6ICdTYXZlJ31cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLWRhbmdlciBjb2wtbGctNVwiIHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXt0aGlzLmhpZGVUb3BpY0Zvcm19PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIENhbmNlbFxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Zvcm0+XG4gICAgICAgIClcbiAgICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IHN0YXRlID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgICBsb2FkaW5nOiBzdGF0ZS5xdWVzdGlvbnMubG9hZGluZyxcbiAgICAgICAgbWVzc2FnZTogc3RhdGUucXVlc3Rpb25zLm1lc3NhZ2UsXG4gICAgfVxufTtcblxuY29uc3QgbWFwRGlzcGF0Y2hUb1Byb3BzID0gZGlzcGF0Y2ggPT4ge1xuICAgIHJldHVybiB7XG4gICAgICAgIGFkZFF1ZXN0aW9uOiAoZm9ybURhdGEsIGVuZHBvaW50LCB0eXBlLCBpbmRleCkgPT4gZGlzcGF0Y2goYWRkUXVlc3Rpb24oZGlzcGF0Y2gsIGZvcm1EYXRhLCBlbmRwb2ludCwgdHlwZSwgaW5kZXgpKSxcbiAgICAgICAgaGlkZUZvcm06IChpbmRleCkgPT4gZGlzcGF0Y2goaGlkZVF1ZXN0aW9uRm9ybShkaXNwYXRjaCwgaW5kZXgpKVxuICAgIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpKFF1ZXN0aW9uV2l0aEltYWdlKTtcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./resources/js/v1/Questions/components/math/forms/QuestionWithImage.jsx\n");

/***/ })

}]);