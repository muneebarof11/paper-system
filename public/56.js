(window.webpackJsonp=window.webpackJsonp||[]).push([[56],{258:function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),a=n(3),c=n(49);function i(e){return(i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function l(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function s(e,t){return(s=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function u(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=f(e);if(t){var o=f(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return p(this,n)}}function p(e,t){return!t||"object"!==i(t)&&"function"!=typeof t?m(e):t}function m(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function f(e){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var d=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&s(e,t)}(i,e);var t,r,a,c=u(i);function i(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,i),(t=c.call(this,e)).sectionTopicSubmit=t.sectionTopicSubmit.bind(m(t)),t}return t=i,(r=[{key:"sectionTopicSubmit",value:function(e){e.preventDefault();var t=n(55)(document.querySelector("#sectionForm_".concat(this.props.index)),{hash:!0});if(!t.eng_name&&!t.rlt_name)return alert("Either English or Urdu title is required"),!1;var r=JSON.parse(t.section_info),o=new FormData;o.append("parent_id",r.seid),o.append("subject_code",r.subject_code),o.append("eng_name",t.eng_name?t.eng_name:""),o.append("rlt_name",t.rlt_name?t.rlt_name:""),o.append("syllabus_type_id",r.stid),o.append("class_id",r.cid),o.append("subject_id",r.suid),this.props.addTopic(this.props.index,o)}},{key:"render",value:function(){var e=this;return o.a.createElement("form",{onSubmit:this.sectionTopicSubmit,className:"sectionForm mb-5",id:"sectionForm_".concat(this.props.index)},o.a.createElement("input",{type:"hidden",value:this.props.form,name:"section_info"}),o.a.createElement("div",{className:"form-group row"},o.a.createElement("label",{className:"col-sm-4 col-form-label",htmlFor:"eng_name"},"English title"),o.a.createElement("div",{className:"col-sm-8"},o.a.createElement("input",{type:"text",className:"form-control",id:"eng_name",name:"eng_name"}))),o.a.createElement("div",{className:"form-group row"},o.a.createElement("label",{className:"col-sm-4 col-form-label",htmlFor:"rlt_name"},"Urdu title"),o.a.createElement("div",{className:"col-sm-8"},o.a.createElement("input",{type:"text",className:" form-control",id:"rlt_name",name:"rlt_name"}))),o.a.createElement("div",{className:"form-group row"},o.a.createElement("button",{className:"btn btn-primary col-lg-5",type:"submit",disabled:this.props.loading},this.props.loading?"Saving...":"Save"),o.a.createElement("button",{className:"btn btn-danger col-lg-5",type:"button",onClick:function(){e.props.hideTopicForm(e.props.index)}},"Cancel")))}}])&&l(t.prototype,r),a&&l(t,a),i}(r.PureComponent);t.default=Object(a.b)((function(e){return{loading:e.section.loading,message:e.section.message}}),(function(e){return{addTopic:function(t,n){return e(Object(c.b)(e,t,n))},hideTopicForm:function(t){return e(Object(c.d)(e,t))}}}))(d)}}]);
//# sourceMappingURL=56.js.map