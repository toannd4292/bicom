(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{578:function(t,n,o){"use strict";o.r(n),function(t){o.d(n,"default",(function(){return c}));var e=o(54),r=o(153),a=o(587);function i(t,n){return(i=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t})(t,n)}var c=function(n){var o,e;function c(){return n.apply(this,arguments)||this}e=n,(o=c).prototype=Object.create(e.prototype),o.prototype.constructor=o,i(o,e);var u=c.prototype;return u.onReady=function(){this.registerContactFormValidation()},u.registerContactFormValidation=function(){var n="form[data-contact-form]",o=Object(r.a)({submit:n+' input[type="submit"]'}),e=t(n);o.add([{selector:n+' input[name="contact_email"]',validate:function(t,n){t(a.a.email(n))},errorMessage:this.context.contactEmail},{selector:n+' textarea[name="contact_question"]',validate:function(t,n){t(a.a.notEmpty(n))},errorMessage:this.context.contactQuestion}]),e.on("submit",(function(t){o.performCheck(),o.areAll("valid")||t.preventDefault()}))},c}(e.a)}.call(this,o(2))},587:function(t,n,o){"use strict";n.a={email:function(t){return/^.+@.+\..+/.test(t)},password:function(t){return this.notEmpty(t)},notEmpty:function(t){return t.length>0}}}}]);
//# sourceMappingURL=theme-bundle.chunk.14.js.map