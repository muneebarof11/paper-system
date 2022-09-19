(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{268:function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o),a=n(3),i=n(4);function c(e){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function s(e,t){return(s=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function m(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,o=f(e);if(t){var r=f(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return u(this,n)}}function u(e,t){return!t||"object"!==c(t)&&"function"!=typeof t?p(e):t}function p(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function f(e){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var d=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&s(e,t)}(c,e);var t,o,a,i=m(c);function c(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,c),(t=i.call(this,e)).state={options:[1]},t.submitForm=t.submitForm.bind(p(t)),t.hideTopicForm=t.hideTopicForm.bind(p(t)),t.addOption=t.addOption.bind(p(t)),t.removeOption=t.removeOption.bind(p(t)),t}return t=c,(o=[{key:"addOption",value:function(){var e=this.state.options,t=e[e.length-1]+1;e.push(t),this.setState({options:e})}},{key:"removeOption",value:function(e){var t=this.state.options;if(1===t.length)return!1;t.splice(e,1),this.setState({options:t})}},{key:"submitForm",value:function(e){e.preventDefault();var t=n(53)(document.querySelector("#sectionForm_".concat(this.props.index)),{hash:!0});if(!t.question_en&&!t.question_rtl)return alert("Question statement is required"),!1;if(!t.option_en&&!t.option_rtl)return alert("Column A & Column B are required"),!1;t.option_en=JSON.stringify(t.option_en),t.option_rtl=JSON.stringify(t.option_rtl);var o=new FormData;for(var r in t)o.append(r,t[r]);this.props.addQuestion(o,this.props.endpoint,this.props.type,this.props.index)}},{key:"hideTopicForm",value:function(e){if(!window.confirm("Are you sure you want to cancel?"))return!1;this.props.hideForm(this.props.index)}},{key:"render",value:function(){var e=this;return r.a.createElement("form",{onSubmit:this.submitForm,className:"mb-4 sectionForm",id:"sectionForm_".concat(this.props.index)},r.a.createElement("input",{type:"hidden",value:this.props.form,name:"section_info"}),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"form-group col-md-6 row"},r.a.createElement("label",{className:"col-lg-3 col-form-label",htmlFor:"priority"},"Priority"),r.a.createElement("select",{className:"custom-select col-lg-9",name:"priority",id:"priority"},r.a.createElement("option",{value:"exercise"},"Exercise"),r.a.createElement("option",{value:"past_paper"},"Past Paper"),r.a.createElement("option",{value:"additional"},"Additional")))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"form-group col-lg-6 row"},r.a.createElement("label",{className:"col-form-label col-lg-3",htmlFor:"question_en_".concat(this.props.index)},"Question:"),r.a.createElement("div",{className:"col-lg-9"},r.a.createElement("input",{type:"text",className:"form-control",id:"question_en_".concat(this.props.index),name:"question_en"})))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"form-group col-lg-12 text-center row"},r.a.createElement("div",{className:"col-lg-6"},"Column A"),r.a.createElement("div",{className:"col-lg-6"},"Column B"))),this.state.options.length>0?this.state.options.map((function(t,n){var o=n+1;return r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"form-group col-lg-6 row"},r.a.createElement("label",{className:"col-form-label col-lg-3",htmlFor:"option_en_".concat(o)},$helper.getAlphabet(n),":"),r.a.createElement("div",{className:"col-lg-7"},r.a.createElement("input",{type:"text",className:"form-control",id:"option_en_".concat(o),name:"option_en[".concat(n,"]")})),r.a.createElement("div",{className:"col-lg-2"},r.a.createElement("button",{type:"button",className:"action-btn btn btn-warning float-right",onClick:e.addOption},r.a.createElement("i",{className:"fa fa-plus-circle"})))),r.a.createElement("div",{className:"form-group col-lg-6 row"},r.a.createElement("div",{className:"col-lg-2"},r.a.createElement("button",{type:"button",className:"".concat(0===n?"d-none":""," action-btn btn btn-danger"),onClick:function(){e.removeOption(n)}},r.a.createElement("i",{className:"fa fa-minus-circle"}))),r.a.createElement("div",{className:"col-lg-7"},r.a.createElement("input",{type:"text",className:"form-control text-align-right",id:"option_rtl_".concat(o),name:"option_rtl[".concat(n,"]")})),r.a.createElement("label",{className:"col-lg-3 col-form-label text-align-right",htmlFor:"option_rtl_".concat(o)},":",$helper.getAlphabet(n)," ")))})):r.a.createElement(r.a.Fragment,null),r.a.createElement("hr",{className:"mt-3"}),r.a.createElement("div",{className:"form-group row"},r.a.createElement("div",{className:"mx-auto col-lg-6 row"},r.a.createElement("button",{className:"btn btn-primary col-lg-5",type:"submit",disabled:this.props.loading},this.props.loading?"Saving...":"Save"),r.a.createElement("button",{className:"btn btn-danger col-lg-5",type:"button",onClick:this.hideTopicForm},"Cancel"))))}}])&&l(t.prototype,o),a&&l(t,a),c}(o.Component);t.default=Object(i.b)((function(e){return{loading:e.questions.loading,message:e.questions.message}}),(function(e){return{addQuestion:function(t,n,o,r){return e(Object(a.a)(e,t,n,o,r))},hideForm:function(t){return e(Object(a.i)(e,t))}}}))(d)}}]);
//# sourceMappingURL=43.js.map