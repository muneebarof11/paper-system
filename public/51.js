(window.webpackJsonp=window.webpackJsonp||[]).push([[51],{253:function(t,e,o){"use strict";o.r(e);var n=o(0),r=o.n(n);function c(t){return(c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function s(t,e){for(var o=0;o<e.length;o++){var n=e[o];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function i(t,e){return(i=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}function a(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var o,n=p(t);if(e){var r=p(this).constructor;o=Reflect.construct(n,arguments,r)}else o=n.apply(this,arguments);return u(this,o)}}function u(t,e){return!e||"object"!==c(e)&&"function"!=typeof e?l(t):e}function l(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function p(t){return(p=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}var f=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&i(t,e)}(u,t);var e,o,n,c=a(u);function u(t){var e;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,u),(e=c.call(this,t)).state={box_class:"alert alert-primary jumbotron jumbotron-fluid ",icon_class:"fa "},e.cacheTopics=e.cacheTopics.bind(l(e)),e}return e=u,(o=[{key:"cacheTopics",value:function(t){t.preventDefault(),window.location.href=this.props.url}},{key:"render",value:function(){return r.a.createElement("div",{className:this.props.parent_class+" boxSm",title:this.props.box_title},r.a.createElement("a",{href:this.props.url,onClick:this.cacheTopics},r.a.createElement("div",{className:this.state.box_class+this.props.box_class},r.a.createElement("div",{className:"row"},"eng"==this.props.medium||"dual"==this.props.medium?r.a.createElement("h4",{className:"display-5 mt-3 mb-4 ".concat("dual"!=this.props.medium||this.props.rtl_none?"":"col-lg-6")},r.a.createElement("i",{className:this.state.icon_class+this.props.icon_class})," ",this.props.box_title):"","dual"==this.props.medium||"urdu"==this.props.medium?r.a.createElement("h4",{className:"urdu-font display-5 mt-3 mb-4 ".concat("dual"==this.props.medium?"col-lg-6":""," ").concat(this.props.rtl_none?"d-none":"")},r.a.createElement("i",{className:this.state.icon_class+this.props.icon_class})," ",this.props.box_rtl_title):""))))}}])&&s(e.prototype,o),n&&s(e,n),u}(n.Component);e.default=f}}]);
//# sourceMappingURL=51.js.map