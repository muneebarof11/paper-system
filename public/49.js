(window.webpackJsonp=window.webpackJsonp||[]).push([[49],{256:function(e,t,n){"use strict";n.r(t);var o=n(0),r=n.n(o),a=n(4),i=n(247),c=n.n(i),s=n(248),l=n(3),u=n(2);function p(e){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function m(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}function f(e,t){return(f=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function d(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,o=y(e);if(t){var r=y(this).constructor;n=Reflect.construct(o,arguments,r)}else n=o.apply(this,arguments);return h(this,n)}}function h(e,t){return!t||"object"!==p(t)&&"function"!=typeof t?b(e):t}function b(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function y(e){return(y=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var v=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&f(e,t)}(l,e);var t,o,a,i=d(l);function l(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,l),(t=i.call(this,e)).state={question_en:"",question_rtl:""},t.submitForm=t.submitForm.bind(b(t)),t.hideTopicForm=t.hideTopicForm.bind(b(t)),t.updateStatement=t.updateStatement.bind(b(t)),t}return t=l,(o=[{key:"hideTopicForm",value:function(){if(!window.confirm("Are you sure you want to cancel?"))return!1;this.props.hideForm(this.props.index)}},{key:"updateStatement",value:function(e,t){"en"===t?this.setState({question_en:e}):this.setState({question_rtl:e})}},{key:"submitForm",value:function(e){e.preventDefault();var t=n(53)(document.querySelector("#sectionForm_".concat(this.props.index)),{hash:!0});if(this.state.question_en.length<=0&&this.state.question_rtl.length<=0)return alert("Question statement is required"),!1;var o=new FormData;for(var r in t)o.append(r,t[r]);o.append("question_en",this.state.question_en),o.append("question_rtl",this.state.question_rtl),this.props.addQuestion(o,this.props.endpoint,this.props.type,this.props.index)}},{key:"render",value:function(){var e=this;return r.a.createElement("form",{onSubmit:this.submitForm,className:"mb-4 sectionForm",id:"sectionForm_".concat(this.props.index)},r.a.createElement("input",{type:"hidden",value:this.props.form,name:"section_info"}),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"form-group col-md-12 row"},r.a.createElement("select",{className:"custom-select col-lg-11",name:"priority",id:"priority"},r.a.createElement("option",{value:"exercise"},"Exercise"),r.a.createElement("option",{value:"past_paper"},"Past Paper"),r.a.createElement("option",{value:"additional"},"Additional")),r.a.createElement("label",{className:"col-lg-1 col-form-label",htmlFor:"priority"},"Priority"))),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"form-group col-lg-12 container-fluid urdu-font"},r.a.createElement("h4",null,r.a.createElement("label",{className:"col-lg-12 col-form-label text-align-right",htmlFor:"question_rtl_".concat(this.props.index)},":سوال")),r.a.createElement("div",{className:"col-lg-12"},r.a.createElement(c.a,{editor:s.a,onChange:function(t,n){var o=n.getData();e.setState({question_rtl:o})},config:u.b})))),r.a.createElement("p",{className:"mt-3"}),r.a.createElement("div",{className:"form-group row"},r.a.createElement("div",{className:"mx-auto col-lg-6 row"},r.a.createElement("button",{className:"btn btn-primary col-lg-5",type:"submit",disabled:this.props.loading},this.props.loading?"Saving...":"Save"),r.a.createElement("button",{className:"btn btn-danger col-lg-5",type:"button",onClick:this.hideTopicForm},"Cancel"))))}}])&&m(t.prototype,o),a&&m(t,a),l}(o.Component);t.default=Object(a.b)((function(e){return{loading:e.questions.loading,message:e.questions.message}}),(function(e){return{addQuestion:function(t,n,o,r){return e(Object(l.a)(e,t,n,o,r))},hideForm:function(t){return e(Object(l.i)(e,t))}}}))(v)}}]);
//# sourceMappingURL=49.js.map