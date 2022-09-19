(window.webpackJsonp=window.webpackJsonp||[]).push([[46],{269:function(e,t,o){"use strict";o.r(t);var n=o(0),a=o.n(n),r=o(3),i=o(4);function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function c(e,t){for(var o=0;o<t.length;o++){var n=t[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function s(e,t){return(s=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}function u(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var o,n=f(e);if(t){var a=f(this).constructor;o=Reflect.construct(n,arguments,a)}else o=n.apply(this,arguments);return m(this,o)}}function m(e,t){return!t||"object"!==l(t)&&"function"!=typeof t?p(e):t}function p(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function f(e){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}var d=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&s(e,t)}(l,e);var t,n,r,i=u(l);function l(e){var t;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,l),(t=i.call(this,e)).state={image:{}},t.submitForm=t.submitForm.bind(p(t)),t.hideTopicForm=t.hideTopicForm.bind(p(t)),t.updateFile=t.updateFile.bind(p(t)),t.showImage=t.showImage.bind(p(t)),t}return t=l,(n=[{key:"submitForm",value:function(e){e.preventDefault();var t=this.state.image;if(!t.name)return alert("Please select an image"),!1;var n=o(53)(document.querySelector("#sectionForm_".concat(this.props.index)),{hash:!0});if(!n.question_en&&!n.question_rtl)return alert("Either English or Urdu question statement is required"),!1;var a=new FormData;for(var r in n)a.append(r,n[r]);a.append("file",t,t.name),this.props.addQuestion(a,this.props.endpoint,this.props.type,this.props.index)}},{key:"hideTopicForm",value:function(e){if(!window.confirm("Are you sure you want to cancel?"))return!1;this.props.hideForm(this.props.index)}},{key:"updateFile",value:function(e){var t="question_image_".concat(this.props.index),o=document.getElementById(t),n=document.getElementById("question_image_preview");this.showImage(o,n);var a=e.target.files[0];this.setState({image:a})}},{key:"showImage",value:function(e,t){var o=new FileReader;o.onload=function(e){t.src=this.result},o.readAsDataURL(e.files[0])}},{key:"render",value:function(){return a.a.createElement("form",{onSubmit:this.submitForm,className:"mb-4 sectionForm",id:"sectionForm_".concat(this.props.index),encType:"multipart/form-data"},a.a.createElement("input",{type:"hidden",value:this.props.form,name:"section_info"}),a.a.createElement("div",{className:"row"},a.a.createElement("div",{className:"form-group col-md-6 row"},a.a.createElement("label",{className:"col-lg-3 col-form-label",htmlFor:"priority"},"Priority"),a.a.createElement("select",{className:"custom-select col-lg-9",name:"priority",id:"priority"},a.a.createElement("option",{value:"exercise"},"Exercise"),a.a.createElement("option",{value:"past_paper"},"Past Paper"),a.a.createElement("option",{value:"additional"},"Additional")))),a.a.createElement("div",{className:"row"},a.a.createElement("div",{className:"form-group col-lg-6 row"},a.a.createElement("label",{className:"col-form-label col-lg-2",htmlFor:"question_en_".concat(this.props.index)},"Question:"),a.a.createElement("div",{className:"col-lg-10"},a.a.createElement("textarea",{className:"form-control",name:"question_en",id:"question_en_".concat(this.props.index),rows:"3"}))),a.a.createElement("div",{className:"form-group col-lg-6 row urdu-font"},a.a.createElement("div",{className:"col-lg-10"},a.a.createElement("textarea",{className:"form-control text-align-right",name:"question_rtl",id:"question_rtl_".concat(this.props.index),rows:"3"})),a.a.createElement("label",{className:"col-lg-2 col-form-label text-align-right",htmlFor:"question_rtl_".concat(this.props.index)},":سوال"))),a.a.createElement("div",{className:"row"},a.a.createElement("div",{className:"form-group col-lg-6 row"},a.a.createElement("label",{className:"col-lg-3 col-form-label"},"Choose Image"),a.a.createElement("div",{className:"custom-file col-lg-8"},a.a.createElement("input",{type:"file",className:"custom-file-input",id:"question_image_".concat(this.props.index),name:"question_image",onChange:this.updateFile}),a.a.createElement("label",{className:"custom-file-label",htmlFor:"question_image_".concat(this.props.index)},"Choose file"))),a.a.createElement("div",{className:"form-group col-lg-6 row urdu-font"},a.a.createElement("img",{id:"question_image_preview",className:"img-thumbnail mx-auto row-cols-8"}))),a.a.createElement("p",{className:"mt-3"}),a.a.createElement("div",{className:"form-group row"},a.a.createElement("div",{className:"mx-auto col-lg-6 row"},a.a.createElement("button",{className:"btn btn-primary col-lg-5",type:"submit",disabled:this.state.is_loading},this.state.is_loading?"Saving...":"Save"),a.a.createElement("button",{className:"btn btn-danger col-lg-5",type:"button",onClick:this.hideTopicForm},"Cancel"))))}}])&&c(t.prototype,n),r&&c(t,r),l}(n.Component);t.default=Object(i.b)((function(e){return{loading:e.questions.loading,message:e.questions.message}}),(function(e){return{addQuestion:function(t,o,n,a){return e(Object(r.a)(e,t,o,n,a))},hideForm:function(t){return e(Object(r.i)(e,t))}}}))(d)}}]);
//# sourceMappingURL=46.js.map