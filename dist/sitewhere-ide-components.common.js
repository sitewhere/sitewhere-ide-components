/**
  * SiteWhere IDE Components v0.0.35
  * (c) 2019 SiteWhere LLC
  * @license CPAL-1.0
  */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var sitewhereIdeCommon = require('sitewhere-ide-common');
var Vue = _interopDefault(require('vue'));
var vueColor = require('vue-color');
var FlatPickr = _interopDefault(require('vue-flatpickr-component'));
require('moment');
var Electron = _interopDefault(require('electron'));

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script = {
  data: () => ({
    showFieldCopied: false
  }),

  props: ["field", "message"],

  methods: {
    // Called after id is copied.
    onFieldCopied: function(e) {
      this.$data.showFieldCopied = true;
    },

    // Called if unable to copy id.
    onFieldCopyFailed: function(e) {}
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
  return function (id, style) {
    return addStyle(id, style);
  };
}
var HEAD = document.head || document.getElementsByTagName('head')[0];
var styles = {};

function addStyle(id, css) {
  var group = isOldIE ? css.media || 'default' : id;
  var style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    var code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) style.element.setAttribute('media', css.media);
      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      var index = style.ids.size - 1;
      var textNode = document.createTextNode(code);
      var nodes = style.element.childNodes;
      if (nodes[index]) style.element.removeChild(nodes[index]);
      if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
    }
  }
}

var browser = createInjector;

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "span",
    [
      _vm._v("\n  " + _vm._s(_vm.field) + "\n  "),
      _c("v-tooltip", { attrs: { right: "" } }, [
        _c(
          "span",
          {
            directives: [
              {
                name: "clipboard",
                rawName: "v-clipboard",
                value: _vm.field,
                expression: "field"
              }
            ],
            key: _vm.field,
            attrs: { slot: "activator" },
            on: { success: _vm.onFieldCopied, error: _vm.onFieldCopyFailed },
            slot: "activator"
          },
          [
            _c("font-awesome-icon", {
              staticClass: "grey--text text--lighten-1 mt-1",
              staticStyle: { "vertical-align": "top" },
              attrs: { icon: "copy", size: "sm" }
            })
          ],
          1
        ),
        _vm._v(" "),
        _c("span", [_vm._v("Copy to Clipboard")])
      ]),
      _vm._v(" "),
      _c(
        "v-snackbar",
        {
          attrs: { timeout: 2000, success: "" },
          model: {
            value: _vm.showFieldCopied,
            callback: function($$v) {
              _vm.showFieldCopied = $$v;
            },
            expression: "showFieldCopied"
          }
        },
        [
          _vm._v("\n    " + _vm._s(_vm.message) + "\n    "),
          _c(
            "v-btn",
            {
              attrs: { dark: "", flat: "" },
              on: {
                click: function($event) {
                  _vm.showFieldCopied = false;
                }
              }
            },
            [_vm._v("Close")]
          )
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-4e07dcce_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"ClipboardCopyField.vue"}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-4e07dcce";
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  

  
  var ClipboardCopyField = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    browser,
    undefined
  );

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

var ColorInputField = /** @class */ (function (_super) {
    __extends(ColorInputField, _super);
    function ColorInputField() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.menu = null;
        _this.updatedColor = null;
        return _this;
    }
    ColorInputField.prototype.onValueChanged = function (val, oldVal) {
        this.updatedColor = val;
    };
    Object.defineProperty(ColorInputField.prototype, "valueOrDefault", {
        get: function () {
            return this.updatedColor || "#fff";
        },
        enumerable: true,
        configurable: true
    });
    /** Called when color is chosen */
    ColorInputField.prototype.onColorChosen = function (val) {
        this.updatedColor = val.hex;
        this.$emit("input", val.hex);
        this.$emit("opacityChanged", val.a);
    };
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", String)
    ], ColorInputField.prototype, "value", void 0);
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", String)
    ], ColorInputField.prototype, "text", void 0);
    __decorate([
        sitewhereIdeCommon.Watch("value"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String, String]),
        __metadata("design:returntype", void 0)
    ], ColorInputField.prototype, "onValueChanged", null);
    ColorInputField = __decorate([
        sitewhereIdeCommon.Component({
            components: {
                Chrome: vueColor.Chrome
            }
        })
    ], ColorInputField);
    return ColorInputField;
}(Vue));

/* script */
const __vue_script__$1 = ColorInputField;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-container",
    { staticClass: "pa-0 mb-3", attrs: { fluid: "" } },
    [
      _c(
        "v-layout",
        { attrs: { row: "", wrap: "" } },
        [
          _c(
            "v-flex",
            { attrs: { xs6: "" } },
            [
              _c("v-text-field", {
                attrs: {
                  label: _vm.text,
                  placeholder: " ",
                  "prepend-icon": "color_lens"
                },
                model: {
                  value: _vm.updatedColor,
                  callback: function($$v) {
                    _vm.updatedColor = $$v;
                  },
                  expression: "updatedColor"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-flex",
            { attrs: { xs6: "" } },
            [
              _c(
                "v-menu",
                {
                  attrs: {
                    "offset-y": "",
                    top: "",
                    "close-on-content-click": false
                  },
                  model: {
                    value: _vm.menu,
                    callback: function($$v) {
                      _vm.menu = $$v;
                    },
                    expression: "menu"
                  }
                },
                [
                  _c("v-btn", {
                    style: { "background-color": _vm.valueOrDefault },
                    attrs: { slot: "activator" },
                    slot: "activator"
                  }),
                  _vm._v(" "),
                  _c("chrome", {
                    attrs: { value: _vm.valueOrDefault },
                    on: { input: _vm.onColorChosen }
                  })
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-9f3288c4_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"ColorInputField.vue"}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$1 = "data-v-9f3288c4";
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject SSR */
  

  
  var ColorInputField$1 = normalizeComponent_1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    browser,
    undefined
  );

//

var script$1 = {
  data: () => ({
    menu: null,
    updatedColor: null
  }),

  components: {
    Chrome: vueColor.Chrome
  },

  computed: {
    chromeColor: function() {
      return {
        hex: this.currentColor
      };
    },
    currentColor: function() {
      return this.updatedColor || this.value;
    }
  },

  props: ["value", "text"],

  methods: {
    // Called when a color is chosen.
    onColorChosen: function(val) {
      this.updatedColor = val.hex;
      this.$emit("input", val.hex);
      this.$emit("opacityChanged", val.a);
    }
  }
};

/* script */
const __vue_script__$2 = script$1;

/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-menu",
    {
      attrs: { "offset-y": "", top: "", "close-on-content-click": false },
      model: {
        value: _vm.menu,
        callback: function($$v) {
          _vm.menu = $$v;
        },
        expression: "menu"
      }
    },
    [
      _c(
        "v-btn",
        {
          style: { "background-color": _vm.currentColor, color: "#fff" },
          attrs: { slot: "activator" },
          slot: "activator"
        },
        [_vm._v(_vm._s(_vm.text))]
      ),
      _vm._v(" "),
      _c("chrome", {
        attrs: { value: _vm.chromeColor },
        on: { input: _vm.onColorChosen }
      })
    ],
    1
  )
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  const __vue_inject_styles__$2 = function (inject) {
    if (!inject) return
    inject("data-v-10e8b9d6_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"ColorPicker.vue"}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$2 = "data-v-10e8b9d6";
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* style inject SSR */
  

  
  var ColorPicker = normalizeComponent_1(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    browser,
    undefined
  );

//

var script$2 = {
  data: () => ({
    date: null,
    formattedValue: null,
    menu: null,
    dateTimeConfig: {
      wrap: false,
      enableTime: true,
      altFormat: "Y-m-d H:iK",
      altInput: true,
      dateFormat: "Y-m-d H:i:S"
    }
  }),

  components: {
    FlatPickr
  },

  props: ["value", "label"],

  watch: {
    value: function(value) {
      this.$data.date = value;
    },
    date: function(value) {
      this.$emit("input", value);
    }
  },

  methods: {
    onClear: function() {
      this.$data.date = null;
    }
  }
};

/* script */
const __vue_script__$3 = script$2;

/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "date-time-picker mt-3 mb-4" },
    [
      _c("v-icon", { staticClass: "mr-3 ml-1", attrs: { fa: "" } }, [
        _vm._v("calendar")
      ]),
      _vm._v(" "),
      _c(
        "span",
        { staticClass: "date-input" },
        [
          _c("flat-pickr", {
            attrs: {
              placeholder: _vm.label,
              config: _vm.dateTimeConfig,
              required: true,
              name: "date"
            },
            model: {
              value: _vm.date,
              callback: function($$v) {
                _vm.date = $$v;
              },
              expression: "date"
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-btn",
        {
          staticClass: "delete-icon ma-0",
          attrs: { icon: "", small: "", flat: "" },
          nativeOn: {
            click: function($event) {
              return _vm.onClear($event)
            }
          }
        },
        [_c("v-icon", { attrs: { fa: "" } }, [_vm._v("remove")])],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  const __vue_inject_styles__$3 = function (inject) {
    if (!inject) return
    inject("data-v-03a23ee8_0", { source: "\n.date-input[data-v-03a23ee8] {\r\n  color: #333;\r\n  font-size: 16px;\r\n  border-bottom: 1px solid #999;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\common\\DateTimePicker.vue"],"names":[],"mappings":";AA2DA;EACA,WAAA;EACA,eAAA;EACA,6BAAA;AACA","file":"DateTimePicker.vue","sourcesContent":["<template>\r\n  <div class=\"date-time-picker mt-3 mb-4\">\r\n    <v-icon fa class=\"mr-3 ml-1\">calendar</v-icon>\r\n    <span class=\"date-input\">\r\n      <flat-pickr\r\n        v-model=\"date\"\r\n        :placeholder=\"label\"\r\n        :config=\"dateTimeConfig\"\r\n        :required=\"true\"\r\n        name=\"date\"\r\n      ></flat-pickr>\r\n    </span>\r\n    <v-btn icon small flat class=\"delete-icon ma-0\" @click.native=\"onClear\">\r\n      <v-icon fa>remove</v-icon>\r\n    </v-btn>\r\n  </div>\r\n</template>\r\n\r\n<script>\r\nimport FlatPickr from \"vue-flatpickr-component\";\r\n\r\nexport default {\r\n  data: () => ({\r\n    date: null,\r\n    formattedValue: null,\r\n    menu: null,\r\n    dateTimeConfig: {\r\n      wrap: false,\r\n      enableTime: true,\r\n      altFormat: \"Y-m-d H:iK\",\r\n      altInput: true,\r\n      dateFormat: \"Y-m-d H:i:S\"\r\n    }\r\n  }),\r\n\r\n  components: {\r\n    FlatPickr\r\n  },\r\n\r\n  props: [\"value\", \"label\"],\r\n\r\n  watch: {\r\n    value: function(value) {\r\n      this.$data.date = value;\r\n    },\r\n    date: function(value) {\r\n      this.$emit(\"input\", value);\r\n    }\r\n  },\r\n\r\n  methods: {\r\n    onClear: function() {\r\n      this.$data.date = null;\r\n    }\r\n  }\r\n};\r\n</script>\r\n\r\n<style scoped>\r\n.date-input {\r\n  color: #333;\r\n  font-size: 16px;\r\n  border-bottom: 1px solid #999;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$3 = "data-v-03a23ee8";
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* style inject SSR */
  

  
  var DateTimePicker = normalizeComponent_1(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    browser,
    undefined
  );

//
//
//
//
//
//
//

var script$3 = {
  data: () => ({
    errorDisplayed: false
  }),

  props: ["error"],

  watch: {
    error: function(value) {
      if (value) {
        if (this.error.response && this.error.response.status == 503) {
          this.$data.errorDisplayed = false;
        } else if (this.error.response || this.error.message) {
          this.$data.errorDisplayed = true;
        }
      }
    }
  },

  computed: {
    errorMessage: function() {
      if (!this.error) {
        return "";
      } else if (this.error.response && this.error.response.headers) {
        if (this.error.response.headers["x-sitewhere-error"]) {
          return this.error.response.headers["x-sitewhere-error"];
        } else if (this.error.response.status === 403) {
          return "Server Authentication Failed";
        }
      }
      return this.error.message;
    }
  },

  methods: {}
};

/* script */
const __vue_script__$4 = script$3;

/* template */
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.error
    ? _c(
        "v-snackbar",
        {
          staticClass: "error-banner",
          attrs: { timeout: 5000, error: "" },
          model: {
            value: _vm.errorDisplayed,
            callback: function($$v) {
              _vm.errorDisplayed = $$v;
            },
            expression: "errorDisplayed"
          }
        },
        [
          _vm._v("\n  " + _vm._s(_vm.errorMessage) + "\n  "),
          _c(
            "v-btn",
            {
              attrs: { dark: "", flat: "" },
              nativeOn: {
                click: function($event) {
                  _vm.errorDisplayed = false;
                }
              }
            },
            [_vm._v("Close")]
          )
        ],
        1
      )
    : _vm._e()
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  const __vue_inject_styles__$4 = function (inject) {
    if (!inject) return
    inject("data-v-6e3d2d05_0", { source: "\n.error-banner[data-v-6e3d2d05] {\r\n  z-index: 2000;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\common\\ErrorBanner.vue"],"names":[],"mappings":";AA+CA;EACA,aAAA;AACA","file":"ErrorBanner.vue","sourcesContent":["<template>\r\n  <v-snackbar class=\"error-banner\" v-if=\"error\" :timeout=\"5000\" error v-model=\"errorDisplayed\">\r\n    {{ errorMessage }}\r\n    <v-btn dark flat @click.native=\"errorDisplayed = false\">Close</v-btn>\r\n  </v-snackbar>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n  data: () => ({\r\n    errorDisplayed: false\r\n  }),\r\n\r\n  props: [\"error\"],\r\n\r\n  watch: {\r\n    error: function(value) {\r\n      if (value) {\r\n        if (this.error.response && this.error.response.status == 503) {\r\n          this.$data.errorDisplayed = false;\r\n        } else if (this.error.response || this.error.message) {\r\n          this.$data.errorDisplayed = true;\r\n        }\r\n      }\r\n    }\r\n  },\r\n\r\n  computed: {\r\n    errorMessage: function() {\r\n      if (!this.error) {\r\n        return \"\";\r\n      } else if (this.error.response && this.error.response.headers) {\r\n        if (this.error.response.headers[\"x-sitewhere-error\"]) {\r\n          return this.error.response.headers[\"x-sitewhere-error\"];\r\n        } else if (this.error.response.status === 403) {\r\n          return \"Server Authentication Failed\";\r\n        }\r\n      }\r\n      return this.error.message;\r\n    }\r\n  },\r\n\r\n  methods: {}\r\n};\r\n</script>\r\n\r\n<style scoped>\r\n.error-banner {\r\n  z-index: 2000;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$4 = "data-v-6e3d2d05";
  /* module identifier */
  const __vue_module_identifier__$4 = undefined;
  /* functional template */
  const __vue_is_functional_template__$4 = false;
  /* style inject SSR */
  

  
  var ErrorBanner = normalizeComponent_1(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    browser,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$4 = {
  data: () => ({}),

  props: ["label", "icon"],

  methods: {
    // Called when button is clicked.
    onButtonClicked: function() {
      this.$emit("action");
    }
  }
};

/* script */
const __vue_script__$5 = script$4;

/* template */
var __vue_render__$5 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-tooltip",
    { attrs: { left: "" } },
    [
      _c(
        "v-btn",
        {
          staticClass: "elevation-5",
          attrs: {
            slot: "activator",
            fab: "",
            fixed: "",
            bottom: "",
            right: "",
            dark: "",
            color: "red darken-2"
          },
          on: {
            click: function($event) {
              $event.stopPropagation();
              return _vm.onButtonClicked($event)
            }
          },
          slot: "activator"
        },
        [_c("font-awesome-icon", { attrs: { icon: _vm.icon, size: "lg" } })],
        1
      ),
      _vm._v(" "),
      _c("span", [_vm._v(_vm._s(_vm.label))])
    ],
    1
  )
};
var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;

  /* style */
  const __vue_inject_styles__$5 = function (inject) {
    if (!inject) return
    inject("data-v-73a38ecb_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"FloatingActionButton.vue"}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$5 = "data-v-73a38ecb";
  /* module identifier */
  const __vue_module_identifier__$5 = undefined;
  /* functional template */
  const __vue_is_functional_template__$5 = false;
  /* style inject SSR */
  

  
  var FloatingActionButton = normalizeComponent_1(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    browser,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//

var script$5 = {
  data: () => ({}),

  props: ["label"],

  methods: {}
};

/* script */
const __vue_script__$6 = script$5;

/* template */
var __vue_render__$6 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-layout",
    { staticClass: "mb-1", attrs: { row: "", wrap: "" } },
    [
      _c(
        "v-flex",
        { staticClass: "text-xs-right subheading pr-4", attrs: { xs4: "" } },
        [_c("strong", [_vm._v(_vm._s(_vm.label))]), _vm._v(":\n  ")]
      ),
      _vm._v(" "),
      _c(
        "v-flex",
        { staticClass: "field", attrs: { xs8: "" } },
        [_vm._t("default")],
        2
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$6 = [];
__vue_render__$6._withStripped = true;

  /* style */
  const __vue_inject_styles__$6 = function (inject) {
    if (!inject) return
    inject("data-v-e7901184_0", { source: "\n.field[data-v-e7901184] {\r\n  text-overflow: ellipsis;\r\n  white-space: nowrap;\r\n  overflow: hidden;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\common\\HeaderField.vue"],"names":[],"mappings":";AAsBA;EACA,uBAAA;EACA,mBAAA;EACA,gBAAA;AACA","file":"HeaderField.vue","sourcesContent":["<template>\r\n  <v-layout row wrap class=\"mb-1\">\r\n    <v-flex xs4 class=\"text-xs-right subheading pr-4\">\r\n      <strong>{{ label }}</strong>:\r\n    </v-flex>\r\n    <v-flex class=\"field\" xs8>\r\n      <slot></slot>\r\n    </v-flex>\r\n  </v-layout>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n  data: () => ({}),\r\n\r\n  props: [\"label\"],\r\n\r\n  methods: {}\r\n};\r\n</script>\r\n\r\n<style scoped>\r\n.field {\r\n  text-overflow: ellipsis;\r\n  white-space: nowrap;\r\n  overflow: hidden;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$6 = "data-v-e7901184";
  /* module identifier */
  const __vue_module_identifier__$6 = undefined;
  /* functional template */
  const __vue_is_functional_template__$6 = false;
  /* style inject SSR */
  

  
  var HeaderField = normalizeComponent_1(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    browser,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$6 = {
  computed: {
    // Compute style of logo.
    ddStyle: function() {
      return {
        width: "500px",
        "max-height": "400px",
        "overflow-y": "scroll"
      };
    },
    icon: function() {
      return this.value;
    }
  },

  props: ["value"],

  methods: {
    // Called when icon is selected.
    onIconSelected: function(e) {
      this.$data.selectedIcon = e;
      this.$emit("input", e);
    }
  },

  data: () => ({
    active: null,
    selectedIcon: null,
    iconsSolid: [
      "address-book",
      "address-card",
      "adjust",
      "air-freshener",
      "align-center",
      "align-justify",
      "align-left",
      "align-right",
      "allergies",
      "ambulance",
      "american-sign-language-interpreting",
      "anchor",
      "angle-double-down",
      "angle-double-left",
      "angle-double-right",
      "angle-double-up",
      "angle-down",
      "angle-left",
      "angle-right",
      "angle-up",
      "angry",
      "apple-alt",
      "archive",
      "archway",
      "arrow-alt-circle-down",
      "arrow-alt-circle-left",
      "arrow-alt-circle-right",
      "arrow-alt-circle-up",
      "arrow-circle-down",
      "arrow-circle-left",
      "arrow-circle-right",
      "arrow-circle-up",
      "arrow-down",
      "arrow-left",
      "arrow-right",
      "arrow-up",
      "arrows-alt",
      "arrows-alt-h",
      "arrows-alt-v",
      "assistive-listening-systems",
      "asterisk",
      "at",
      "atlas",
      "atom",
      "audio-description",
      "award",
      "backspace",
      "backward",
      "balance-scale",
      "ban",
      "band-aid",
      "barcode",
      "bars",
      "baseball-ball",
      "basketball-ball",
      "bath",
      "battery-empty",
      "battery-full",
      "battery-half",
      "battery-quarter",
      "battery-three-quarters",
      "bed",
      "beer",
      "bell",
      "bell-slash",
      "bezier-curve",
      "bicycle",
      "binoculars",
      "birthday-cake",
      "blender",
      "blind",
      "bold",
      "bolt",
      "bomb",
      "bone",
      "bong",
      "book",
      "book-open",
      "book-reader",
      "bookmark",
      "bowling-ball",
      "box",
      "box-open",
      "boxes",
      "braille",
      "brain",
      "briefcase",
      "briefcase-medical",
      "broadcast-tower",
      "broom",
      "brush",
      "bug",
      "building",
      "bullhorn",
      "bullseye",
      "burn",
      "bus",
      "bus-alt",
      "calculator",
      "calendar",
      "calendar-alt",
      "calendar-check",
      "calendar-minus",
      "calendar-plus",
      "calendar-times",
      "camera",
      "camera-retro",
      "cannabis",
      "capsules",
      "car",
      "car-alt",
      "car-battery",
      "car-crash",
      "car-side",
      "caret-down",
      "caret-left",
      "caret-right",
      "caret-square-down",
      "caret-square-left",
      "caret-square-right",
      "caret-square-up",
      "caret-up",
      "cart-arrow-down",
      "cart-plus",
      "certificate",
      "chalkboard",
      "chalkboard-teacher",
      "charging-station",
      "chart-area",
      "chart-bar",
      "chart-line",
      "chart-pie",
      "check",
      "check-circle",
      "check-double",
      "check-square",
      "chess",
      "chess-bishop",
      "chess-board",
      "chess-king",
      "chess-knight",
      "chess-pawn",
      "chess-queen",
      "chess-rook",
      "chevron-circle-down",
      "chevron-circle-left",
      "chevron-circle-right",
      "chevron-circle-up",
      "chevron-down",
      "chevron-left",
      "chevron-right",
      "chevron-up",
      "child",
      "church",
      "circle",
      "circle-notch",
      "clipboard",
      "clipboard-check",
      "clipboard-list",
      "clock",
      "clone",
      "closed-captioning",
      "cloud",
      "cloud-download-alt",
      "cloud-upload-alt",
      "cocktail",
      "code",
      "code-branch",
      "coffee",
      "cog",
      "cogs",
      "coins",
      "columns",
      "comment",
      "comment-alt",
      "comment-dots",
      "comment-slash",
      "comments",
      "compact-disc",
      "compass",
      "compress",
      "concierge-bell",
      "cookie",
      "cookie-bite",
      "copy",
      "copyright",
      "couch",
      "credit-card",
      "crop",
      "crop-alt",
      "crosshairs",
      "crow",
      "crown",
      "cube",
      "cubes",
      "cut",
      "database",
      "deaf",
      "desktop",
      "diagnoses",
      "dice",
      "dice-five",
      "dice-four",
      "dice-one",
      "dice-six",
      "dice-three",
      "dice-two",
      "digital-tachograph",
      "directions",
      "divide",
      "dizzy",
      "dna",
      "dollar-sign",
      "dolly",
      "dolly-flatbed",
      "donate",
      "door-closed",
      "door-open",
      "dot-circle",
      "dove",
      "download",
      "drafting-compass",
      "draw-polygon",
      "drum",
      "drum-steelpan",
      "dumbbell",
      "edit",
      "eject",
      "ellipsis-h",
      "ellipsis-v",
      "envelope",
      "envelope-open",
      "envelope-square",
      "equals",
      "eraser",
      "euro-sign",
      "exchange-alt",
      "exclamation",
      "exclamation-circle",
      "exclamation-triangle",
      "expand",
      "expand-arrows-alt",
      "external-link-alt",
      "external-link-square-alt",
      "eye",
      "eye-dropper",
      "eye-slash",
      "fast-backward",
      "fast-forward",
      "fax",
      "feather",
      "feather-alt",
      "female",
      "fighter-jet",
      "file",
      "file-alt",
      "file-archive",
      "file-audio",
      "file-code",
      "file-contract",
      "file-download",
      "file-excel",
      "file-export",
      "file-image",
      "file-import",
      "file-invoice",
      "file-invoice-dollar",
      "file-medical",
      "file-medical-alt",
      "file-pdf",
      "file-powerpoint",
      "file-prescription",
      "file-signature",
      "file-upload",
      "file-video",
      "file-word",
      "fill",
      "fill-drip",
      "film",
      "filter",
      "fingerprint",
      "fire",
      "fire-extinguisher",
      "first-aid",
      "fish",
      "flag",
      "flag-checkered",
      "flask",
      "flushed",
      "folder",
      "folder-open",
      "font",
      "football-ball",
      "forward",
      "frog",
      "frown",
      "frown-open",
      "futbol",
      "gamepad",
      "gas-pump",
      "gavel",
      "gem",
      "genderless",
      "gift",
      "glass-martini",
      "glass-martini-alt",
      "glasses",
      "globe",
      "globe-africa",
      "globe-americas",
      "globe-asia",
      "golf-ball",
      "graduation-cap",
      "greater-than",
      "greater-than-equal",
      "grimace",
      "grin",
      "grin-alt",
      "grin-beam",
      "grin-beam-sweat",
      "grin-hearts",
      "grin-squint",
      "grin-squint-tears",
      "grin-stars",
      "grin-tears",
      "grin-tongue",
      "grin-tongue-squint",
      "grin-tongue-wink",
      "grin-wink",
      "grip-horizontal",
      "grip-vertical",
      "h-square",
      "hand-holding",
      "hand-holding-heart",
      "hand-holding-usd",
      "hand-lizard",
      "hand-paper",
      "hand-peace",
      "hand-point-down",
      "hand-point-left",
      "hand-point-right",
      "hand-point-up",
      "hand-pointer",
      "hand-rock",
      "hand-scissors",
      "hand-spock",
      "hands",
      "hands-helping",
      "handshake",
      "hashtag",
      "hdd",
      "heading",
      "headphones",
      "headphones-alt",
      "helicopter",
      "highlighter",
      "history",
      "hockey-puck",
      "home",
      "hospital",
      "hospital-alt",
      "hospital-symbol",
      "hot-tub",
      "hotel",
      "hourglass",
      "hourglass-end",
      "hourglass-half",
      "hourglass-start",
      "i-cursor",
      "id-badge",
      "id-card",
      "id-card-alt",
      "image",
      "images",
      "inbox",
      "indent",
      "industry",
      "infinity",
      "info",
      "info-circle",
      "italic",
      "joint",
      "key",
      "keyboard",
      "kiss",
      "kiss-beam",
      "kiss-wink-heart",
      "kiwi-bird",
      "language",
      "laptop",
      "laptop-code",
      "laugh",
      "laugh-beam",
      "laugh-squint",
      "laugh-wink",
      "layer-group",
      "leaf",
      "lemon",
      "less-than",
      "less-than-equal",
      "level-down-alt",
      "level-up-alt",
      "life-ring",
      "lightbulb",
      "link",
      "lira-sign",
      "list",
      "list-alt",
      "list-ol",
      "list-ul",
      "location-arrow",
      "lock",
      "lock-open",
      "long-arrow-alt-down",
      "long-arrow-alt-left",
      "long-arrow-alt-right",
      "long-arrow-alt-up",
      "low-vision",
      "luggage-cart",
      "magic",
      "magnet",
      "male",
      "map",
      "map-marked",
      "map-marked-alt",
      "map-marker",
      "map-marker-alt",
      "map-pin",
      "map-signs",
      "marker",
      "mars",
      "mars-double",
      "mars-stroke",
      "mars-stroke-h",
      "mars-stroke-v",
      "medal",
      "medkit",
      "meh",
      "meh-blank",
      "meh-rolling-eyes",
      "memory",
      "mercury",
      "microchip",
      "microphone",
      "microphone-alt",
      "microphone-alt-slash",
      "microphone-slash",
      "microscope",
      "minus",
      "minus-circle",
      "minus-square",
      "mobile",
      "mobile-alt",
      "money-bill",
      "money-bill-alt",
      "money-bill-wave",
      "money-bill-wave-alt",
      "money-check",
      "money-check-alt",
      "monument",
      "moon",
      "mortar-pestle",
      "motorcycle",
      "mouse-pointer",
      "music",
      "neuter",
      "newspaper",
      "not-equal",
      "notes-medical",
      "object-group",
      "object-ungroup",
      "oil-can",
      "outdent",
      "paint-brush",
      "paint-roller",
      "palette",
      "pallet",
      "paper-plane",
      "paperclip",
      "parachute-box",
      "paragraph",
      "parking",
      "passport",
      "paste",
      "pause",
      "pause-circle",
      "paw",
      "pen",
      "pen-alt",
      "pen-fancy",
      "pen-nib",
      "pen-square",
      "pencil-alt",
      "pencil-ruler",
      "people-carry",
      "percent",
      "percentage",
      "phone",
      "phone-slash",
      "phone-square",
      "phone-volume",
      "piggy-bank",
      "pills",
      "plane",
      "plane-arrival",
      "plane-departure",
      "play",
      "play-circle",
      "plug",
      "plus",
      "plus-circle",
      "plus-square",
      "podcast",
      "poo",
      "portrait",
      "pound-sign",
      "power-off",
      "prescription",
      "prescription-bottle",
      "prescription-bottle-alt",
      "print",
      "procedures",
      "project-diagram",
      "puzzle-piece",
      "qrcode",
      "question",
      "question-circle",
      "quidditch",
      "quote-left",
      "quote-right",
      "random",
      "receipt",
      "recycle",
      "redo",
      "redo-alt",
      "registered",
      "reply",
      "reply-all",
      "retweet",
      "ribbon",
      "road",
      "robot",
      "rocket",
      "route",
      "rss",
      "rss-square",
      "ruble-sign",
      "ruler",
      "ruler-combined",
      "ruler-horizontal",
      "ruler-vertical",
      "rupee-sign",
      "sad-cry",
      "sad-tear",
      "save",
      "school",
      "screwdriver",
      "search",
      "search-minus",
      "search-plus",
      "seedling",
      "server",
      "shapes",
      "share",
      "share-alt",
      "share-alt-square",
      "share-square",
      "shekel-sign",
      "shield-alt",
      "ship",
      "shipping-fast",
      "shoe-prints",
      "shopping-bag",
      "shopping-basket",
      "shopping-cart",
      "shower",
      "shuttle-van",
      "sign",
      "sign-in-alt",
      "sign-language",
      "sign-out-alt",
      "signal",
      "signature",
      "sitemap",
      "skull",
      "sliders-h",
      "smile",
      "smile-beam",
      "smile-wink",
      "smoking",
      "smoking-ban",
      "snowflake",
      "solar-panel",
      "sort",
      "sort-alpha-down",
      "sort-alpha-up",
      "sort-amount-down",
      "sort-amount-up",
      "sort-down",
      "sort-numeric-down",
      "sort-numeric-up",
      "sort-up",
      "spa",
      "space-shuttle",
      "spinner",
      "splotch",
      "spray-can",
      "square",
      "square-full",
      "stamp",
      "star",
      "star-half",
      "star-half-alt",
      "star-of-life",
      "step-backward",
      "step-forward",
      "stethoscope",
      "sticky-note",
      "stop",
      "stop-circle",
      "stopwatch",
      "store",
      "store-alt",
      "stream",
      "street-view",
      "strikethrough",
      "stroopwafel",
      "subscript",
      "subway",
      "suitcase",
      "suitcase-rolling",
      "sun",
      "superscript",
      "surprise",
      "swatchbook",
      "swimmer",
      "swimming-pool",
      "sync",
      "sync-alt",
      "syringe",
      "table",
      "table-tennis",
      "tablet",
      "tablet-alt",
      "tablets",
      "tachometer-alt",
      "tag",
      "tags",
      "tape",
      "tasks",
      "taxi",
      "teeth",
      "teeth-open",
      "terminal",
      "text-height",
      "text-width",
      "th",
      "th-large",
      "th-list",
      "theater-masks",
      "thermometer",
      "thermometer-empty",
      "thermometer-full",
      "thermometer-half",
      "thermometer-quarter",
      "thermometer-three-quarters",
      "thumbs-down",
      "thumbs-up",
      "thumbtack",
      "ticket-alt",
      "times",
      "times-circle",
      "tint",
      "tint-slash",
      "tired",
      "toggle-off",
      "toggle-on",
      "toolbox",
      "tooth",
      "trademark",
      "traffic-light",
      "train",
      "transgender",
      "transgender-alt",
      "trash",
      "trash-alt",
      "tree",
      "trophy",
      "truck",
      "truck-loading",
      "truck-monster",
      "truck-moving",
      "truck-pickup",
      "tshirt",
      "tty",
      "tv",
      "umbrella",
      "umbrella-beach",
      "underline",
      "undo",
      "undo-alt",
      "universal-access",
      "university",
      "unlink",
      "unlock",
      "unlock-alt",
      "upload",
      "user",
      "user-alt",
      "user-alt-slash",
      "user-astronaut",
      "user-check",
      "user-circle",
      "user-clock",
      "user-cog",
      "user-edit",
      "user-friends",
      "user-graduate",
      "user-lock",
      "user-md",
      "user-minus",
      "user-ninja",
      "user-plus",
      "user-secret",
      "user-shield",
      "user-slash",
      "user-tag",
      "user-tie",
      "user-times",
      "users",
      "users-cog",
      "utensil-spoon",
      "utensils",
      "vector-square",
      "venus",
      "venus-double",
      "venus-mars",
      "vial",
      "vials",
      "video",
      "video-slash",
      "volleyball-ball",
      "volume-down",
      "volume-off",
      "volume-up",
      "walking",
      "wallet",
      "warehouse",
      "weight",
      "weight-hanging",
      "wheelchair",
      "wifi",
      "window-close",
      "window-maximize",
      "window-minimize",
      "window-restore",
      "wine-glass",
      "wine-glass-alt",
      "won-sign",
      "wrench",
      "x-ray",
      "yen-sign"
    ],
    iconsBrand: [
      "500px",
      "accessible-icon",
      "accusoft",
      "adn",
      "adversal",
      "affiliatetheme",
      "algolia",
      "amazon",
      "amazon-pay",
      "amilia",
      "android",
      "angellist",
      "angrycreative",
      "angular",
      "app-store",
      "app-store-ios",
      "apper",
      "apple",
      "apple-pay",
      "asymmetrik",
      "audible",
      "autoprefixer",
      "avianex",
      "aviato",
      "aws",
      "bandcamp",
      "behance",
      "behance-square",
      "bimobject",
      "bitbucket",
      "bitcoin",
      "bity",
      "black-tie",
      "blackberry",
      "blogger",
      "blogger-b",
      "bluetooth",
      "bluetooth-b",
      "btc",
      "buromobelexperte",
      "buysellads",
      "cc-amazon-pay",
      "cc-amex",
      "cc-apple-pay",
      "cc-diners-club",
      "cc-discover",
      "cc-jcb",
      "cc-mastercard",
      "cc-paypal",
      "cc-stripe",
      "cc-visa",
      "centercode",
      "chrome",
      "cloudscale",
      "cloudsmith",
      "cloudversify",
      "vcodepen",
      "codiepie",
      "connectdevelop",
      "contao",
      "cpanel",
      "creative-commons",
      "creative-commons-by",
      "creative-commons-nc",
      "creative-commons-nc-eu",
      "creative-commons-nc-jp",
      "creative-commons-nd",
      "creative-commons-pd",
      "creative-commons-pd-alt",
      "creative-commons-remix",
      "creative-commons-sa",
      "creative-commons-sampling",
      "creative-commons-sampling-plus",
      "creative-commons-share",
      "css3",
      "css3-alt",
      "cuttlefish",
      "d-and-d",
      "dashcube",
      "delicious",
      "deploydog",
      "deskpro",
      "deviantart",
      "digg",
      "digital-ocean",
      "discord",
      "discourse",
      "dochub",
      "docker",
      "draft2digital",
      "dribbble",
      "dribbble-square",
      "dropbox",
      "drupal",
      "dyalog",
      "earlybirds",
      "ebay",
      "edge",
      "elementor",
      "ello",
      "ember",
      "empire",
      "envira",
      "erlang",
      "ethereum",
      "etsy",
      "expeditedssl",
      "facebook",
      "facebook-f",
      "facebook-messenger",
      "facebook-square",
      "firefox",
      "first-order",
      "first-order-alt",
      "firstdraft",
      "flickr",
      "flipboard",
      "fly",
      "font-awesome",
      "font-awesome-alt",
      "font-awesome-flag",
      "fonticons",
      "fonticons-fi",
      "fort-awesome",
      "fort-awesome-alt",
      "forumbee",
      "foursquare",
      "free-code-camp",
      "freebsd",
      "fulcrum",
      "galactic-republic",
      "galactic-senate",
      "get-pocket",
      "gg",
      "gg-circle",
      "git",
      "git-square",
      "github",
      "github-alt",
      "github-square",
      "gitkraken",
      "gitlab",
      "gitter",
      "glide",
      "glide-g",
      "gofore",
      "goodreads",
      "goodreads-g",
      "google",
      "google-drive",
      "google-play",
      "google-plus",
      "google-plus-g",
      "google-plus-square",
      "google-wallet",
      "gratipay",
      "grav",
      "gripfire",
      "grunt",
      "gulp",
      "hacker-news",
      "hacker-news-square",
      "hackerrank",
      "hips",
      "hire-a-helper",
      "hooli",
      "hornbill",
      "hotjar",
      "houzz",
      "html5",
      "hubspot",
      "imdb",
      "instagram",
      "internet-explorer",
      "ioxhost",
      "itunes",
      "itunes-note",
      "java",
      "jedi-order",
      "jenkins",
      "joget",
      "joomla",
      "js",
      "js-square",
      "jsfiddle",
      "kaggle",
      "keybase",
      "keycdn",
      "kickstarter",
      "kickstarter-k",
      "korvue",
      "laravel",
      "lastfm",
      "lastfm-square",
      "leanpub",
      "less",
      "line",
      "linkedin",
      "linkedin-in",
      "linode",
      "linux",
      "lyft",
      "magento",
      "mailchimp",
      "mandalorian",
      "markdown",
      "mastodon",
      "maxcdn",
      "medapps",
      "medium",
      "medium-m",
      "medrt",
      "meetup",
      "megaport",
      "microsoft",
      "mix",
      "mixcloud",
      "mizuni",
      "modx",
      "monero",
      "napster",
      "neos",
      "nimblr",
      "nintendo-switch",
      "node",
      "node-js",
      "npm",
      "ns8",
      "nutritionix",
      "odnoklassniki",
      "odnoklassniki-square",
      "old-republic",
      "opencart",
      "openid",
      "opera",
      "optin-monster",
      "osi",
      "page4",
      "pagelines",
      "palfed",
      "patreon",
      "paypal",
      "periscope",
      "phabricator",
      "phoenix-framework",
      "phoenix-squadron",
      "php",
      "pied-piper",
      "pied-piper-alt",
      "pied-piper-hat",
      "pied-piper-pp",
      "pinterest",
      "pinterest-p",
      "pinterest-square",
      "playstation",
      "product-hunt",
      "pushed",
      "python",
      "qq",
      "quinscape",
      "quora",
      "r-project",
      "ravelry",
      "react",
      "readme",
      "rebel",
      "red-river",
      "reddit",
      "reddit-alien",
      "reddit-square",
      "rendact",
      "renren",
      "replyd",
      "researchgate",
      "resolving",
      "rev",
      "rocketchat",
      "rockrms",
      "safari",
      "sass",
      "schlix",
      "scribd",
      "searchengin",
      "sellcast",
      "sellsy",
      "servicestack",
      "shirtsinbulk",
      "shopware",
      "simplybuilt",
      "sistrix",
      "sith",
      "skyatlas",
      "skype",
      "slack",
      "slack-hash",
      "slideshare",
      "snapchat",
      "snapchat-ghost",
      "snapchat-square",
      "soundcloud",
      "speakap",
      "spotify",
      "squarespace",
      "stack-exchange",
      "stack-overflow",
      "staylinked",
      "steam",
      "steam-square",
      "steam-symbol",
      "sticker-mule",
      "strava",
      "stripe",
      "stripe-s",
      "studiovinari",
      "stumbleupon",
      "stumbleupon-circle",
      "superpowers",
      "supple",
      "telegram",
      "telegram-plane",
      "tencent-weibo",
      "themeco",
      "themeisle",
      "trade-federation",
      "trello",
      "tripadvisor",
      "tumblr",
      "tumblr-square",
      "twitch",
      "twitter",
      "twitter-square",
      "typo3",
      "uber",
      "uikit",
      "uniregistry",
      "untappd",
      "usb",
      "ussunnah",
      "vaadin",
      "viacoin",
      "viadeo",
      "viadeo-square",
      "viber",
      "vimeo",
      "vimeo-square",
      "vimeo-v",
      "vine",
      "vk",
      "vnv",
      "vuejs",
      "weebly",
      "weibo",
      "weixin",
      "whatsapp",
      "whatsapp-square",
      "whmcs",
      "wikipedia-w",
      "windows",
      "wix",
      "wolf-pack-battalion",
      "wordpress",
      "wordpress-simple",
      "wpbeginner",
      "wpexplorer",
      "wpforms",
      "xbox",
      "xing",
      "xing-square",
      "y-combinator",
      "yahoo",
      "yandex",
      "yandex-international",
      "yelp",
      "yoast",
      "youtube",
      "youtube-square",
      "zhihu"
    ]
  })
};

/* script */
const __vue_script__$7 = script$6;

/* template */
var __vue_render__$7 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-menu",
    { attrs: { "offset-y": "", lazy: "" } },
    [
      _c(
        "span",
        { attrs: { slot: "activator" }, slot: "activator" },
        [
          _c(
            "v-container",
            { staticClass: "pa-0", attrs: { fluid: "" } },
            [
              _c(
                "v-layout",
                { attrs: { row: "", wrap: "" } },
                [
                  _c(
                    "v-flex",
                    { attrs: { xs12: "" } },
                    [
                      _c("v-text-field", {
                        attrs: {
                          label: "Icon",
                          placeholder: " ",
                          "prepend-icon": "image"
                        },
                        model: {
                          value: _vm.icon,
                          callback: function($$v) {
                            _vm.icon = $$v;
                          },
                          expression: "icon"
                        }
                      })
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-card",
        [
          _c(
            "v-container",
            { style: _vm.ddStyle, attrs: { fluid: "", "grid-list-sm": "" } },
            [
              _c(
                "v-layout",
                { attrs: { row: "", wrap: "" } },
                _vm._l(_vm.iconsSolid, function(icon) {
                  return _c(
                    "v-flex",
                    { key: icon, staticClass: "faicon", attrs: { xs1: "" } },
                    [
                      _c(
                        "v-tooltip",
                        { attrs: { left: "" } },
                        [
                          _c("font-awesome-icon", {
                            staticClass: "faicon text--grey",
                            attrs: {
                              slot: "activator",
                              icon: icon,
                              size: "lg"
                            },
                            on: {
                              click: function($event) {
                                return _vm.onIconSelected(icon)
                              }
                            },
                            slot: "activator"
                          }),
                          _vm._v(" "),
                          _c("span", [_vm._v(_vm._s(icon))])
                        ],
                        1
                      )
                    ],
                    1
                  )
                }),
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$7 = [];
__vue_render__$7._withStripped = true;

  /* style */
  const __vue_inject_styles__$7 = function (inject) {
    if (!inject) return
    inject("data-v-98884e52_0", { source: "\n.faicon[data-v-98884e52] {\r\n  min-height: 30px;\r\n  text-align: center;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\common\\IconSelector.vue"],"names":[],"mappings":";AAyrCA;EACA,gBAAA;EACA,kBAAA;AACA","file":"IconSelector.vue","sourcesContent":["<template>\r\n  <v-menu offset-y lazy>\r\n    <span slot=\"activator\">\r\n      <v-container fluid class=\"pa-0\">\r\n        <v-layout row wrap>\r\n          <v-flex xs12>\r\n            <v-text-field label=\"Icon\" placeholder=\" \" v-model=\"icon\" prepend-icon=\"image\"/>\r\n          </v-flex>\r\n        </v-layout>\r\n      </v-container>\r\n    </span>\r\n    <v-card>\r\n      <v-container :style=\"ddStyle\" fluid grid-list-sm>\r\n        <v-layout row wrap>\r\n          <v-flex class=\"faicon\" xs1 v-for=\"(icon) in iconsSolid\" :key=\"icon\">\r\n            <v-tooltip left>\r\n              <font-awesome-icon\r\n                class=\"faicon text--grey\"\r\n                :icon=\"icon\"\r\n                size=\"lg\"\r\n                @click=\"onIconSelected(icon)\"\r\n                slot=\"activator\"\r\n              />\r\n              <span>{{ icon }}</span>\r\n            </v-tooltip>\r\n          </v-flex>\r\n        </v-layout>\r\n      </v-container>\r\n    </v-card>\r\n  </v-menu>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n  computed: {\r\n    // Compute style of logo.\r\n    ddStyle: function() {\r\n      return {\r\n        width: \"500px\",\r\n        \"max-height\": \"400px\",\r\n        \"overflow-y\": \"scroll\"\r\n      };\r\n    },\r\n    icon: function() {\r\n      return this.value;\r\n    }\r\n  },\r\n\r\n  props: [\"value\"],\r\n\r\n  methods: {\r\n    // Called when icon is selected.\r\n    onIconSelected: function(e) {\r\n      this.$data.selectedIcon = e;\r\n      this.$emit(\"input\", e);\r\n    }\r\n  },\r\n\r\n  data: () => ({\r\n    active: null,\r\n    selectedIcon: null,\r\n    iconsSolid: [\r\n      \"address-book\",\r\n      \"address-card\",\r\n      \"adjust\",\r\n      \"air-freshener\",\r\n      \"align-center\",\r\n      \"align-justify\",\r\n      \"align-left\",\r\n      \"align-right\",\r\n      \"allergies\",\r\n      \"ambulance\",\r\n      \"american-sign-language-interpreting\",\r\n      \"anchor\",\r\n      \"angle-double-down\",\r\n      \"angle-double-left\",\r\n      \"angle-double-right\",\r\n      \"angle-double-up\",\r\n      \"angle-down\",\r\n      \"angle-left\",\r\n      \"angle-right\",\r\n      \"angle-up\",\r\n      \"angry\",\r\n      \"apple-alt\",\r\n      \"archive\",\r\n      \"archway\",\r\n      \"arrow-alt-circle-down\",\r\n      \"arrow-alt-circle-left\",\r\n      \"arrow-alt-circle-right\",\r\n      \"arrow-alt-circle-up\",\r\n      \"arrow-circle-down\",\r\n      \"arrow-circle-left\",\r\n      \"arrow-circle-right\",\r\n      \"arrow-circle-up\",\r\n      \"arrow-down\",\r\n      \"arrow-left\",\r\n      \"arrow-right\",\r\n      \"arrow-up\",\r\n      \"arrows-alt\",\r\n      \"arrows-alt-h\",\r\n      \"arrows-alt-v\",\r\n      \"assistive-listening-systems\",\r\n      \"asterisk\",\r\n      \"at\",\r\n      \"atlas\",\r\n      \"atom\",\r\n      \"audio-description\",\r\n      \"award\",\r\n      \"backspace\",\r\n      \"backward\",\r\n      \"balance-scale\",\r\n      \"ban\",\r\n      \"band-aid\",\r\n      \"barcode\",\r\n      \"bars\",\r\n      \"baseball-ball\",\r\n      \"basketball-ball\",\r\n      \"bath\",\r\n      \"battery-empty\",\r\n      \"battery-full\",\r\n      \"battery-half\",\r\n      \"battery-quarter\",\r\n      \"battery-three-quarters\",\r\n      \"bed\",\r\n      \"beer\",\r\n      \"bell\",\r\n      \"bell-slash\",\r\n      \"bezier-curve\",\r\n      \"bicycle\",\r\n      \"binoculars\",\r\n      \"birthday-cake\",\r\n      \"blender\",\r\n      \"blind\",\r\n      \"bold\",\r\n      \"bolt\",\r\n      \"bomb\",\r\n      \"bone\",\r\n      \"bong\",\r\n      \"book\",\r\n      \"book-open\",\r\n      \"book-reader\",\r\n      \"bookmark\",\r\n      \"bowling-ball\",\r\n      \"box\",\r\n      \"box-open\",\r\n      \"boxes\",\r\n      \"braille\",\r\n      \"brain\",\r\n      \"briefcase\",\r\n      \"briefcase-medical\",\r\n      \"broadcast-tower\",\r\n      \"broom\",\r\n      \"brush\",\r\n      \"bug\",\r\n      \"building\",\r\n      \"bullhorn\",\r\n      \"bullseye\",\r\n      \"burn\",\r\n      \"bus\",\r\n      \"bus-alt\",\r\n      \"calculator\",\r\n      \"calendar\",\r\n      \"calendar-alt\",\r\n      \"calendar-check\",\r\n      \"calendar-minus\",\r\n      \"calendar-plus\",\r\n      \"calendar-times\",\r\n      \"camera\",\r\n      \"camera-retro\",\r\n      \"cannabis\",\r\n      \"capsules\",\r\n      \"car\",\r\n      \"car-alt\",\r\n      \"car-battery\",\r\n      \"car-crash\",\r\n      \"car-side\",\r\n      \"caret-down\",\r\n      \"caret-left\",\r\n      \"caret-right\",\r\n      \"caret-square-down\",\r\n      \"caret-square-left\",\r\n      \"caret-square-right\",\r\n      \"caret-square-up\",\r\n      \"caret-up\",\r\n      \"cart-arrow-down\",\r\n      \"cart-plus\",\r\n      \"certificate\",\r\n      \"chalkboard\",\r\n      \"chalkboard-teacher\",\r\n      \"charging-station\",\r\n      \"chart-area\",\r\n      \"chart-bar\",\r\n      \"chart-line\",\r\n      \"chart-pie\",\r\n      \"check\",\r\n      \"check-circle\",\r\n      \"check-double\",\r\n      \"check-square\",\r\n      \"chess\",\r\n      \"chess-bishop\",\r\n      \"chess-board\",\r\n      \"chess-king\",\r\n      \"chess-knight\",\r\n      \"chess-pawn\",\r\n      \"chess-queen\",\r\n      \"chess-rook\",\r\n      \"chevron-circle-down\",\r\n      \"chevron-circle-left\",\r\n      \"chevron-circle-right\",\r\n      \"chevron-circle-up\",\r\n      \"chevron-down\",\r\n      \"chevron-left\",\r\n      \"chevron-right\",\r\n      \"chevron-up\",\r\n      \"child\",\r\n      \"church\",\r\n      \"circle\",\r\n      \"circle-notch\",\r\n      \"clipboard\",\r\n      \"clipboard-check\",\r\n      \"clipboard-list\",\r\n      \"clock\",\r\n      \"clone\",\r\n      \"closed-captioning\",\r\n      \"cloud\",\r\n      \"cloud-download-alt\",\r\n      \"cloud-upload-alt\",\r\n      \"cocktail\",\r\n      \"code\",\r\n      \"code-branch\",\r\n      \"coffee\",\r\n      \"cog\",\r\n      \"cogs\",\r\n      \"coins\",\r\n      \"columns\",\r\n      \"comment\",\r\n      \"comment-alt\",\r\n      \"comment-dots\",\r\n      \"comment-slash\",\r\n      \"comments\",\r\n      \"compact-disc\",\r\n      \"compass\",\r\n      \"compress\",\r\n      \"concierge-bell\",\r\n      \"cookie\",\r\n      \"cookie-bite\",\r\n      \"copy\",\r\n      \"copyright\",\r\n      \"couch\",\r\n      \"credit-card\",\r\n      \"crop\",\r\n      \"crop-alt\",\r\n      \"crosshairs\",\r\n      \"crow\",\r\n      \"crown\",\r\n      \"cube\",\r\n      \"cubes\",\r\n      \"cut\",\r\n      \"database\",\r\n      \"deaf\",\r\n      \"desktop\",\r\n      \"diagnoses\",\r\n      \"dice\",\r\n      \"dice-five\",\r\n      \"dice-four\",\r\n      \"dice-one\",\r\n      \"dice-six\",\r\n      \"dice-three\",\r\n      \"dice-two\",\r\n      \"digital-tachograph\",\r\n      \"directions\",\r\n      \"divide\",\r\n      \"dizzy\",\r\n      \"dna\",\r\n      \"dollar-sign\",\r\n      \"dolly\",\r\n      \"dolly-flatbed\",\r\n      \"donate\",\r\n      \"door-closed\",\r\n      \"door-open\",\r\n      \"dot-circle\",\r\n      \"dove\",\r\n      \"download\",\r\n      \"drafting-compass\",\r\n      \"draw-polygon\",\r\n      \"drum\",\r\n      \"drum-steelpan\",\r\n      \"dumbbell\",\r\n      \"edit\",\r\n      \"eject\",\r\n      \"ellipsis-h\",\r\n      \"ellipsis-v\",\r\n      \"envelope\",\r\n      \"envelope-open\",\r\n      \"envelope-square\",\r\n      \"equals\",\r\n      \"eraser\",\r\n      \"euro-sign\",\r\n      \"exchange-alt\",\r\n      \"exclamation\",\r\n      \"exclamation-circle\",\r\n      \"exclamation-triangle\",\r\n      \"expand\",\r\n      \"expand-arrows-alt\",\r\n      \"external-link-alt\",\r\n      \"external-link-square-alt\",\r\n      \"eye\",\r\n      \"eye-dropper\",\r\n      \"eye-slash\",\r\n      \"fast-backward\",\r\n      \"fast-forward\",\r\n      \"fax\",\r\n      \"feather\",\r\n      \"feather-alt\",\r\n      \"female\",\r\n      \"fighter-jet\",\r\n      \"file\",\r\n      \"file-alt\",\r\n      \"file-archive\",\r\n      \"file-audio\",\r\n      \"file-code\",\r\n      \"file-contract\",\r\n      \"file-download\",\r\n      \"file-excel\",\r\n      \"file-export\",\r\n      \"file-image\",\r\n      \"file-import\",\r\n      \"file-invoice\",\r\n      \"file-invoice-dollar\",\r\n      \"file-medical\",\r\n      \"file-medical-alt\",\r\n      \"file-pdf\",\r\n      \"file-powerpoint\",\r\n      \"file-prescription\",\r\n      \"file-signature\",\r\n      \"file-upload\",\r\n      \"file-video\",\r\n      \"file-word\",\r\n      \"fill\",\r\n      \"fill-drip\",\r\n      \"film\",\r\n      \"filter\",\r\n      \"fingerprint\",\r\n      \"fire\",\r\n      \"fire-extinguisher\",\r\n      \"first-aid\",\r\n      \"fish\",\r\n      \"flag\",\r\n      \"flag-checkered\",\r\n      \"flask\",\r\n      \"flushed\",\r\n      \"folder\",\r\n      \"folder-open\",\r\n      \"font\",\r\n      \"football-ball\",\r\n      \"forward\",\r\n      \"frog\",\r\n      \"frown\",\r\n      \"frown-open\",\r\n      \"futbol\",\r\n      \"gamepad\",\r\n      \"gas-pump\",\r\n      \"gavel\",\r\n      \"gem\",\r\n      \"genderless\",\r\n      \"gift\",\r\n      \"glass-martini\",\r\n      \"glass-martini-alt\",\r\n      \"glasses\",\r\n      \"globe\",\r\n      \"globe-africa\",\r\n      \"globe-americas\",\r\n      \"globe-asia\",\r\n      \"golf-ball\",\r\n      \"graduation-cap\",\r\n      \"greater-than\",\r\n      \"greater-than-equal\",\r\n      \"grimace\",\r\n      \"grin\",\r\n      \"grin-alt\",\r\n      \"grin-beam\",\r\n      \"grin-beam-sweat\",\r\n      \"grin-hearts\",\r\n      \"grin-squint\",\r\n      \"grin-squint-tears\",\r\n      \"grin-stars\",\r\n      \"grin-tears\",\r\n      \"grin-tongue\",\r\n      \"grin-tongue-squint\",\r\n      \"grin-tongue-wink\",\r\n      \"grin-wink\",\r\n      \"grip-horizontal\",\r\n      \"grip-vertical\",\r\n      \"h-square\",\r\n      \"hand-holding\",\r\n      \"hand-holding-heart\",\r\n      \"hand-holding-usd\",\r\n      \"hand-lizard\",\r\n      \"hand-paper\",\r\n      \"hand-peace\",\r\n      \"hand-point-down\",\r\n      \"hand-point-left\",\r\n      \"hand-point-right\",\r\n      \"hand-point-up\",\r\n      \"hand-pointer\",\r\n      \"hand-rock\",\r\n      \"hand-scissors\",\r\n      \"hand-spock\",\r\n      \"hands\",\r\n      \"hands-helping\",\r\n      \"handshake\",\r\n      \"hashtag\",\r\n      \"hdd\",\r\n      \"heading\",\r\n      \"headphones\",\r\n      \"headphones-alt\",\r\n      \"helicopter\",\r\n      \"highlighter\",\r\n      \"history\",\r\n      \"hockey-puck\",\r\n      \"home\",\r\n      \"hospital\",\r\n      \"hospital-alt\",\r\n      \"hospital-symbol\",\r\n      \"hot-tub\",\r\n      \"hotel\",\r\n      \"hourglass\",\r\n      \"hourglass-end\",\r\n      \"hourglass-half\",\r\n      \"hourglass-start\",\r\n      \"i-cursor\",\r\n      \"id-badge\",\r\n      \"id-card\",\r\n      \"id-card-alt\",\r\n      \"image\",\r\n      \"images\",\r\n      \"inbox\",\r\n      \"indent\",\r\n      \"industry\",\r\n      \"infinity\",\r\n      \"info\",\r\n      \"info-circle\",\r\n      \"italic\",\r\n      \"joint\",\r\n      \"key\",\r\n      \"keyboard\",\r\n      \"kiss\",\r\n      \"kiss-beam\",\r\n      \"kiss-wink-heart\",\r\n      \"kiwi-bird\",\r\n      \"language\",\r\n      \"laptop\",\r\n      \"laptop-code\",\r\n      \"laugh\",\r\n      \"laugh-beam\",\r\n      \"laugh-squint\",\r\n      \"laugh-wink\",\r\n      \"layer-group\",\r\n      \"leaf\",\r\n      \"lemon\",\r\n      \"less-than\",\r\n      \"less-than-equal\",\r\n      \"level-down-alt\",\r\n      \"level-up-alt\",\r\n      \"life-ring\",\r\n      \"lightbulb\",\r\n      \"link\",\r\n      \"lira-sign\",\r\n      \"list\",\r\n      \"list-alt\",\r\n      \"list-ol\",\r\n      \"list-ul\",\r\n      \"location-arrow\",\r\n      \"lock\",\r\n      \"lock-open\",\r\n      \"long-arrow-alt-down\",\r\n      \"long-arrow-alt-left\",\r\n      \"long-arrow-alt-right\",\r\n      \"long-arrow-alt-up\",\r\n      \"low-vision\",\r\n      \"luggage-cart\",\r\n      \"magic\",\r\n      \"magnet\",\r\n      \"male\",\r\n      \"map\",\r\n      \"map-marked\",\r\n      \"map-marked-alt\",\r\n      \"map-marker\",\r\n      \"map-marker-alt\",\r\n      \"map-pin\",\r\n      \"map-signs\",\r\n      \"marker\",\r\n      \"mars\",\r\n      \"mars-double\",\r\n      \"mars-stroke\",\r\n      \"mars-stroke-h\",\r\n      \"mars-stroke-v\",\r\n      \"medal\",\r\n      \"medkit\",\r\n      \"meh\",\r\n      \"meh-blank\",\r\n      \"meh-rolling-eyes\",\r\n      \"memory\",\r\n      \"mercury\",\r\n      \"microchip\",\r\n      \"microphone\",\r\n      \"microphone-alt\",\r\n      \"microphone-alt-slash\",\r\n      \"microphone-slash\",\r\n      \"microscope\",\r\n      \"minus\",\r\n      \"minus-circle\",\r\n      \"minus-square\",\r\n      \"mobile\",\r\n      \"mobile-alt\",\r\n      \"money-bill\",\r\n      \"money-bill-alt\",\r\n      \"money-bill-wave\",\r\n      \"money-bill-wave-alt\",\r\n      \"money-check\",\r\n      \"money-check-alt\",\r\n      \"monument\",\r\n      \"moon\",\r\n      \"mortar-pestle\",\r\n      \"motorcycle\",\r\n      \"mouse-pointer\",\r\n      \"music\",\r\n      \"neuter\",\r\n      \"newspaper\",\r\n      \"not-equal\",\r\n      \"notes-medical\",\r\n      \"object-group\",\r\n      \"object-ungroup\",\r\n      \"oil-can\",\r\n      \"outdent\",\r\n      \"paint-brush\",\r\n      \"paint-roller\",\r\n      \"palette\",\r\n      \"pallet\",\r\n      \"paper-plane\",\r\n      \"paperclip\",\r\n      \"parachute-box\",\r\n      \"paragraph\",\r\n      \"parking\",\r\n      \"passport\",\r\n      \"paste\",\r\n      \"pause\",\r\n      \"pause-circle\",\r\n      \"paw\",\r\n      \"pen\",\r\n      \"pen-alt\",\r\n      \"pen-fancy\",\r\n      \"pen-nib\",\r\n      \"pen-square\",\r\n      \"pencil-alt\",\r\n      \"pencil-ruler\",\r\n      \"people-carry\",\r\n      \"percent\",\r\n      \"percentage\",\r\n      \"phone\",\r\n      \"phone-slash\",\r\n      \"phone-square\",\r\n      \"phone-volume\",\r\n      \"piggy-bank\",\r\n      \"pills\",\r\n      \"plane\",\r\n      \"plane-arrival\",\r\n      \"plane-departure\",\r\n      \"play\",\r\n      \"play-circle\",\r\n      \"plug\",\r\n      \"plus\",\r\n      \"plus-circle\",\r\n      \"plus-square\",\r\n      \"podcast\",\r\n      \"poo\",\r\n      \"portrait\",\r\n      \"pound-sign\",\r\n      \"power-off\",\r\n      \"prescription\",\r\n      \"prescription-bottle\",\r\n      \"prescription-bottle-alt\",\r\n      \"print\",\r\n      \"procedures\",\r\n      \"project-diagram\",\r\n      \"puzzle-piece\",\r\n      \"qrcode\",\r\n      \"question\",\r\n      \"question-circle\",\r\n      \"quidditch\",\r\n      \"quote-left\",\r\n      \"quote-right\",\r\n      \"random\",\r\n      \"receipt\",\r\n      \"recycle\",\r\n      \"redo\",\r\n      \"redo-alt\",\r\n      \"registered\",\r\n      \"reply\",\r\n      \"reply-all\",\r\n      \"retweet\",\r\n      \"ribbon\",\r\n      \"road\",\r\n      \"robot\",\r\n      \"rocket\",\r\n      \"route\",\r\n      \"rss\",\r\n      \"rss-square\",\r\n      \"ruble-sign\",\r\n      \"ruler\",\r\n      \"ruler-combined\",\r\n      \"ruler-horizontal\",\r\n      \"ruler-vertical\",\r\n      \"rupee-sign\",\r\n      \"sad-cry\",\r\n      \"sad-tear\",\r\n      \"save\",\r\n      \"school\",\r\n      \"screwdriver\",\r\n      \"search\",\r\n      \"search-minus\",\r\n      \"search-plus\",\r\n      \"seedling\",\r\n      \"server\",\r\n      \"shapes\",\r\n      \"share\",\r\n      \"share-alt\",\r\n      \"share-alt-square\",\r\n      \"share-square\",\r\n      \"shekel-sign\",\r\n      \"shield-alt\",\r\n      \"ship\",\r\n      \"shipping-fast\",\r\n      \"shoe-prints\",\r\n      \"shopping-bag\",\r\n      \"shopping-basket\",\r\n      \"shopping-cart\",\r\n      \"shower\",\r\n      \"shuttle-van\",\r\n      \"sign\",\r\n      \"sign-in-alt\",\r\n      \"sign-language\",\r\n      \"sign-out-alt\",\r\n      \"signal\",\r\n      \"signature\",\r\n      \"sitemap\",\r\n      \"skull\",\r\n      \"sliders-h\",\r\n      \"smile\",\r\n      \"smile-beam\",\r\n      \"smile-wink\",\r\n      \"smoking\",\r\n      \"smoking-ban\",\r\n      \"snowflake\",\r\n      \"solar-panel\",\r\n      \"sort\",\r\n      \"sort-alpha-down\",\r\n      \"sort-alpha-up\",\r\n      \"sort-amount-down\",\r\n      \"sort-amount-up\",\r\n      \"sort-down\",\r\n      \"sort-numeric-down\",\r\n      \"sort-numeric-up\",\r\n      \"sort-up\",\r\n      \"spa\",\r\n      \"space-shuttle\",\r\n      \"spinner\",\r\n      \"splotch\",\r\n      \"spray-can\",\r\n      \"square\",\r\n      \"square-full\",\r\n      \"stamp\",\r\n      \"star\",\r\n      \"star-half\",\r\n      \"star-half-alt\",\r\n      \"star-of-life\",\r\n      \"step-backward\",\r\n      \"step-forward\",\r\n      \"stethoscope\",\r\n      \"sticky-note\",\r\n      \"stop\",\r\n      \"stop-circle\",\r\n      \"stopwatch\",\r\n      \"store\",\r\n      \"store-alt\",\r\n      \"stream\",\r\n      \"street-view\",\r\n      \"strikethrough\",\r\n      \"stroopwafel\",\r\n      \"subscript\",\r\n      \"subway\",\r\n      \"suitcase\",\r\n      \"suitcase-rolling\",\r\n      \"sun\",\r\n      \"superscript\",\r\n      \"surprise\",\r\n      \"swatchbook\",\r\n      \"swimmer\",\r\n      \"swimming-pool\",\r\n      \"sync\",\r\n      \"sync-alt\",\r\n      \"syringe\",\r\n      \"table\",\r\n      \"table-tennis\",\r\n      \"tablet\",\r\n      \"tablet-alt\",\r\n      \"tablets\",\r\n      \"tachometer-alt\",\r\n      \"tag\",\r\n      \"tags\",\r\n      \"tape\",\r\n      \"tasks\",\r\n      \"taxi\",\r\n      \"teeth\",\r\n      \"teeth-open\",\r\n      \"terminal\",\r\n      \"text-height\",\r\n      \"text-width\",\r\n      \"th\",\r\n      \"th-large\",\r\n      \"th-list\",\r\n      \"theater-masks\",\r\n      \"thermometer\",\r\n      \"thermometer-empty\",\r\n      \"thermometer-full\",\r\n      \"thermometer-half\",\r\n      \"thermometer-quarter\",\r\n      \"thermometer-three-quarters\",\r\n      \"thumbs-down\",\r\n      \"thumbs-up\",\r\n      \"thumbtack\",\r\n      \"ticket-alt\",\r\n      \"times\",\r\n      \"times-circle\",\r\n      \"tint\",\r\n      \"tint-slash\",\r\n      \"tired\",\r\n      \"toggle-off\",\r\n      \"toggle-on\",\r\n      \"toolbox\",\r\n      \"tooth\",\r\n      \"trademark\",\r\n      \"traffic-light\",\r\n      \"train\",\r\n      \"transgender\",\r\n      \"transgender-alt\",\r\n      \"trash\",\r\n      \"trash-alt\",\r\n      \"tree\",\r\n      \"trophy\",\r\n      \"truck\",\r\n      \"truck-loading\",\r\n      \"truck-monster\",\r\n      \"truck-moving\",\r\n      \"truck-pickup\",\r\n      \"tshirt\",\r\n      \"tty\",\r\n      \"tv\",\r\n      \"umbrella\",\r\n      \"umbrella-beach\",\r\n      \"underline\",\r\n      \"undo\",\r\n      \"undo-alt\",\r\n      \"universal-access\",\r\n      \"university\",\r\n      \"unlink\",\r\n      \"unlock\",\r\n      \"unlock-alt\",\r\n      \"upload\",\r\n      \"user\",\r\n      \"user-alt\",\r\n      \"user-alt-slash\",\r\n      \"user-astronaut\",\r\n      \"user-check\",\r\n      \"user-circle\",\r\n      \"user-clock\",\r\n      \"user-cog\",\r\n      \"user-edit\",\r\n      \"user-friends\",\r\n      \"user-graduate\",\r\n      \"user-lock\",\r\n      \"user-md\",\r\n      \"user-minus\",\r\n      \"user-ninja\",\r\n      \"user-plus\",\r\n      \"user-secret\",\r\n      \"user-shield\",\r\n      \"user-slash\",\r\n      \"user-tag\",\r\n      \"user-tie\",\r\n      \"user-times\",\r\n      \"users\",\r\n      \"users-cog\",\r\n      \"utensil-spoon\",\r\n      \"utensils\",\r\n      \"vector-square\",\r\n      \"venus\",\r\n      \"venus-double\",\r\n      \"venus-mars\",\r\n      \"vial\",\r\n      \"vials\",\r\n      \"video\",\r\n      \"video-slash\",\r\n      \"volleyball-ball\",\r\n      \"volume-down\",\r\n      \"volume-off\",\r\n      \"volume-up\",\r\n      \"walking\",\r\n      \"wallet\",\r\n      \"warehouse\",\r\n      \"weight\",\r\n      \"weight-hanging\",\r\n      \"wheelchair\",\r\n      \"wifi\",\r\n      \"window-close\",\r\n      \"window-maximize\",\r\n      \"window-minimize\",\r\n      \"window-restore\",\r\n      \"wine-glass\",\r\n      \"wine-glass-alt\",\r\n      \"won-sign\",\r\n      \"wrench\",\r\n      \"x-ray\",\r\n      \"yen-sign\"\r\n    ],\r\n    iconsBrand: [\r\n      \"500px\",\r\n      \"accessible-icon\",\r\n      \"accusoft\",\r\n      \"adn\",\r\n      \"adversal\",\r\n      \"affiliatetheme\",\r\n      \"algolia\",\r\n      \"amazon\",\r\n      \"amazon-pay\",\r\n      \"amilia\",\r\n      \"android\",\r\n      \"angellist\",\r\n      \"angrycreative\",\r\n      \"angular\",\r\n      \"app-store\",\r\n      \"app-store-ios\",\r\n      \"apper\",\r\n      \"apple\",\r\n      \"apple-pay\",\r\n      \"asymmetrik\",\r\n      \"audible\",\r\n      \"autoprefixer\",\r\n      \"avianex\",\r\n      \"aviato\",\r\n      \"aws\",\r\n      \"bandcamp\",\r\n      \"behance\",\r\n      \"behance-square\",\r\n      \"bimobject\",\r\n      \"bitbucket\",\r\n      \"bitcoin\",\r\n      \"bity\",\r\n      \"black-tie\",\r\n      \"blackberry\",\r\n      \"blogger\",\r\n      \"blogger-b\",\r\n      \"bluetooth\",\r\n      \"bluetooth-b\",\r\n      \"btc\",\r\n      \"buromobelexperte\",\r\n      \"buysellads\",\r\n      \"cc-amazon-pay\",\r\n      \"cc-amex\",\r\n      \"cc-apple-pay\",\r\n      \"cc-diners-club\",\r\n      \"cc-discover\",\r\n      \"cc-jcb\",\r\n      \"cc-mastercard\",\r\n      \"cc-paypal\",\r\n      \"cc-stripe\",\r\n      \"cc-visa\",\r\n      \"centercode\",\r\n      \"chrome\",\r\n      \"cloudscale\",\r\n      \"cloudsmith\",\r\n      \"cloudversify\",\r\n      \"vcodepen\",\r\n      \"codiepie\",\r\n      \"connectdevelop\",\r\n      \"contao\",\r\n      \"cpanel\",\r\n      \"creative-commons\",\r\n      \"creative-commons-by\",\r\n      \"creative-commons-nc\",\r\n      \"creative-commons-nc-eu\",\r\n      \"creative-commons-nc-jp\",\r\n      \"creative-commons-nd\",\r\n      \"creative-commons-pd\",\r\n      \"creative-commons-pd-alt\",\r\n      \"creative-commons-remix\",\r\n      \"creative-commons-sa\",\r\n      \"creative-commons-sampling\",\r\n      \"creative-commons-sampling-plus\",\r\n      \"creative-commons-share\",\r\n      \"css3\",\r\n      \"css3-alt\",\r\n      \"cuttlefish\",\r\n      \"d-and-d\",\r\n      \"dashcube\",\r\n      \"delicious\",\r\n      \"deploydog\",\r\n      \"deskpro\",\r\n      \"deviantart\",\r\n      \"digg\",\r\n      \"digital-ocean\",\r\n      \"discord\",\r\n      \"discourse\",\r\n      \"dochub\",\r\n      \"docker\",\r\n      \"draft2digital\",\r\n      \"dribbble\",\r\n      \"dribbble-square\",\r\n      \"dropbox\",\r\n      \"drupal\",\r\n      \"dyalog\",\r\n      \"earlybirds\",\r\n      \"ebay\",\r\n      \"edge\",\r\n      \"elementor\",\r\n      \"ello\",\r\n      \"ember\",\r\n      \"empire\",\r\n      \"envira\",\r\n      \"erlang\",\r\n      \"ethereum\",\r\n      \"etsy\",\r\n      \"expeditedssl\",\r\n      \"facebook\",\r\n      \"facebook-f\",\r\n      \"facebook-messenger\",\r\n      \"facebook-square\",\r\n      \"firefox\",\r\n      \"first-order\",\r\n      \"first-order-alt\",\r\n      \"firstdraft\",\r\n      \"flickr\",\r\n      \"flipboard\",\r\n      \"fly\",\r\n      \"font-awesome\",\r\n      \"font-awesome-alt\",\r\n      \"font-awesome-flag\",\r\n      \"fonticons\",\r\n      \"fonticons-fi\",\r\n      \"fort-awesome\",\r\n      \"fort-awesome-alt\",\r\n      \"forumbee\",\r\n      \"foursquare\",\r\n      \"free-code-camp\",\r\n      \"freebsd\",\r\n      \"fulcrum\",\r\n      \"galactic-republic\",\r\n      \"galactic-senate\",\r\n      \"get-pocket\",\r\n      \"gg\",\r\n      \"gg-circle\",\r\n      \"git\",\r\n      \"git-square\",\r\n      \"github\",\r\n      \"github-alt\",\r\n      \"github-square\",\r\n      \"gitkraken\",\r\n      \"gitlab\",\r\n      \"gitter\",\r\n      \"glide\",\r\n      \"glide-g\",\r\n      \"gofore\",\r\n      \"goodreads\",\r\n      \"goodreads-g\",\r\n      \"google\",\r\n      \"google-drive\",\r\n      \"google-play\",\r\n      \"google-plus\",\r\n      \"google-plus-g\",\r\n      \"google-plus-square\",\r\n      \"google-wallet\",\r\n      \"gratipay\",\r\n      \"grav\",\r\n      \"gripfire\",\r\n      \"grunt\",\r\n      \"gulp\",\r\n      \"hacker-news\",\r\n      \"hacker-news-square\",\r\n      \"hackerrank\",\r\n      \"hips\",\r\n      \"hire-a-helper\",\r\n      \"hooli\",\r\n      \"hornbill\",\r\n      \"hotjar\",\r\n      \"houzz\",\r\n      \"html5\",\r\n      \"hubspot\",\r\n      \"imdb\",\r\n      \"instagram\",\r\n      \"internet-explorer\",\r\n      \"ioxhost\",\r\n      \"itunes\",\r\n      \"itunes-note\",\r\n      \"java\",\r\n      \"jedi-order\",\r\n      \"jenkins\",\r\n      \"joget\",\r\n      \"joomla\",\r\n      \"js\",\r\n      \"js-square\",\r\n      \"jsfiddle\",\r\n      \"kaggle\",\r\n      \"keybase\",\r\n      \"keycdn\",\r\n      \"kickstarter\",\r\n      \"kickstarter-k\",\r\n      \"korvue\",\r\n      \"laravel\",\r\n      \"lastfm\",\r\n      \"lastfm-square\",\r\n      \"leanpub\",\r\n      \"less\",\r\n      \"line\",\r\n      \"linkedin\",\r\n      \"linkedin-in\",\r\n      \"linode\",\r\n      \"linux\",\r\n      \"lyft\",\r\n      \"magento\",\r\n      \"mailchimp\",\r\n      \"mandalorian\",\r\n      \"markdown\",\r\n      \"mastodon\",\r\n      \"maxcdn\",\r\n      \"medapps\",\r\n      \"medium\",\r\n      \"medium-m\",\r\n      \"medrt\",\r\n      \"meetup\",\r\n      \"megaport\",\r\n      \"microsoft\",\r\n      \"mix\",\r\n      \"mixcloud\",\r\n      \"mizuni\",\r\n      \"modx\",\r\n      \"monero\",\r\n      \"napster\",\r\n      \"neos\",\r\n      \"nimblr\",\r\n      \"nintendo-switch\",\r\n      \"node\",\r\n      \"node-js\",\r\n      \"npm\",\r\n      \"ns8\",\r\n      \"nutritionix\",\r\n      \"odnoklassniki\",\r\n      \"odnoklassniki-square\",\r\n      \"old-republic\",\r\n      \"opencart\",\r\n      \"openid\",\r\n      \"opera\",\r\n      \"optin-monster\",\r\n      \"osi\",\r\n      \"page4\",\r\n      \"pagelines\",\r\n      \"palfed\",\r\n      \"patreon\",\r\n      \"paypal\",\r\n      \"periscope\",\r\n      \"phabricator\",\r\n      \"phoenix-framework\",\r\n      \"phoenix-squadron\",\r\n      \"php\",\r\n      \"pied-piper\",\r\n      \"pied-piper-alt\",\r\n      \"pied-piper-hat\",\r\n      \"pied-piper-pp\",\r\n      \"pinterest\",\r\n      \"pinterest-p\",\r\n      \"pinterest-square\",\r\n      \"playstation\",\r\n      \"product-hunt\",\r\n      \"pushed\",\r\n      \"python\",\r\n      \"qq\",\r\n      \"quinscape\",\r\n      \"quora\",\r\n      \"r-project\",\r\n      \"ravelry\",\r\n      \"react\",\r\n      \"readme\",\r\n      \"rebel\",\r\n      \"red-river\",\r\n      \"reddit\",\r\n      \"reddit-alien\",\r\n      \"reddit-square\",\r\n      \"rendact\",\r\n      \"renren\",\r\n      \"replyd\",\r\n      \"researchgate\",\r\n      \"resolving\",\r\n      \"rev\",\r\n      \"rocketchat\",\r\n      \"rockrms\",\r\n      \"safari\",\r\n      \"sass\",\r\n      \"schlix\",\r\n      \"scribd\",\r\n      \"searchengin\",\r\n      \"sellcast\",\r\n      \"sellsy\",\r\n      \"servicestack\",\r\n      \"shirtsinbulk\",\r\n      \"shopware\",\r\n      \"simplybuilt\",\r\n      \"sistrix\",\r\n      \"sith\",\r\n      \"skyatlas\",\r\n      \"skype\",\r\n      \"slack\",\r\n      \"slack-hash\",\r\n      \"slideshare\",\r\n      \"snapchat\",\r\n      \"snapchat-ghost\",\r\n      \"snapchat-square\",\r\n      \"soundcloud\",\r\n      \"speakap\",\r\n      \"spotify\",\r\n      \"squarespace\",\r\n      \"stack-exchange\",\r\n      \"stack-overflow\",\r\n      \"staylinked\",\r\n      \"steam\",\r\n      \"steam-square\",\r\n      \"steam-symbol\",\r\n      \"sticker-mule\",\r\n      \"strava\",\r\n      \"stripe\",\r\n      \"stripe-s\",\r\n      \"studiovinari\",\r\n      \"stumbleupon\",\r\n      \"stumbleupon-circle\",\r\n      \"superpowers\",\r\n      \"supple\",\r\n      \"telegram\",\r\n      \"telegram-plane\",\r\n      \"tencent-weibo\",\r\n      \"themeco\",\r\n      \"themeisle\",\r\n      \"trade-federation\",\r\n      \"trello\",\r\n      \"tripadvisor\",\r\n      \"tumblr\",\r\n      \"tumblr-square\",\r\n      \"twitch\",\r\n      \"twitter\",\r\n      \"twitter-square\",\r\n      \"typo3\",\r\n      \"uber\",\r\n      \"uikit\",\r\n      \"uniregistry\",\r\n      \"untappd\",\r\n      \"usb\",\r\n      \"ussunnah\",\r\n      \"vaadin\",\r\n      \"viacoin\",\r\n      \"viadeo\",\r\n      \"viadeo-square\",\r\n      \"viber\",\r\n      \"vimeo\",\r\n      \"vimeo-square\",\r\n      \"vimeo-v\",\r\n      \"vine\",\r\n      \"vk\",\r\n      \"vnv\",\r\n      \"vuejs\",\r\n      \"weebly\",\r\n      \"weibo\",\r\n      \"weixin\",\r\n      \"whatsapp\",\r\n      \"whatsapp-square\",\r\n      \"whmcs\",\r\n      \"wikipedia-w\",\r\n      \"windows\",\r\n      \"wix\",\r\n      \"wolf-pack-battalion\",\r\n      \"wordpress\",\r\n      \"wordpress-simple\",\r\n      \"wpbeginner\",\r\n      \"wpexplorer\",\r\n      \"wpforms\",\r\n      \"xbox\",\r\n      \"xing\",\r\n      \"xing-square\",\r\n      \"y-combinator\",\r\n      \"yahoo\",\r\n      \"yandex\",\r\n      \"yandex-international\",\r\n      \"yelp\",\r\n      \"yoast\",\r\n      \"youtube\",\r\n      \"youtube-square\",\r\n      \"zhihu\"\r\n    ]\r\n  })\r\n};\r\n</script>\r\n\r\n<style scoped>\r\n.faicon {\r\n  min-height: 30px;\r\n  text-align: center;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$7 = "data-v-98884e52";
  /* module identifier */
  const __vue_module_identifier__$7 = undefined;
  /* functional template */
  const __vue_is_functional_template__$7 = false;
  /* style inject SSR */
  

  
  var IconSelector = normalizeComponent_1(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    browser,
    undefined
  );

var ImageZoomOnHover = /** @class */ (function (_super) {
    __extends(ImageZoomOnHover, _super);
    function ImageZoomOnHover() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ImageZoomOnHover.prototype, "imageStyle", {
        // Compute style of image.
        get: function () {
            return {
                "background-color": "#fff",
                "background-image": "url(" + this.imageUrl + ")",
                "background-size": "contain",
                "background-position": "center",
                transition: "all 0.5s ease",
                height: "100%",
                width: "100%"
            };
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", String)
    ], ImageZoomOnHover.prototype, "imageUrl", void 0);
    ImageZoomOnHover = __decorate([
        sitewhereIdeCommon.Component({})
    ], ImageZoomOnHover);
    return ImageZoomOnHover;
}(Vue));

/* script */
const __vue_script__$8 = ImageZoomOnHover;

/* template */
var __vue_render__$8 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "zoomer" }, [
    _c("div", { staticClass: "zoomed", style: _vm.imageStyle })
  ])
};
var __vue_staticRenderFns__$8 = [];
__vue_render__$8._withStripped = true;

  /* style */
  const __vue_inject_styles__$8 = function (inject) {
    if (!inject) return
    inject("data-v-4ce995a9_0", { source: "\n.zoomer[data-v-4ce995a9] {\r\n  position: absolute;\r\n  top: 0px;\r\n  left: 0px;\r\n  bottom: 0px;\r\n  right: 0px;\r\n  margin: 10px;\n}\n.zoomed[data-v-4ce995a9] {\r\n  transition: all 0.5s ease;\n}\n.zoomed[data-v-4ce995a9]:hover {\r\n  transform: scale(1.05);\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\common\\ImageZoomOnHover.vue"],"names":[],"mappings":";AA8BA;EACA,kBAAA;EACA,QAAA;EACA,SAAA;EACA,WAAA;EACA,UAAA;EACA,YAAA;AACA;AACA;EACA,yBAAA;AACA;AACA;EACA,sBAAA;AACA","file":"ImageZoomOnHover.vue","sourcesContent":["<template>\r\n  <div class=\"zoomer\">\r\n    <div class=\"zoomed\" :style=\"imageStyle\" />\r\n  </div>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\nimport { Component, Prop } from \"sitewhere-ide-common\";\r\n\r\n@Component({})\r\nexport default class ImageZoomOnHover extends Vue {\r\n  @Prop() readonly imageUrl!: string;\r\n\r\n  // Compute style of image.\r\n  get imageStyle() {\r\n    return {\r\n      \"background-color\": \"#fff\",\r\n      \"background-image\": \"url(\" + this.imageUrl + \")\",\r\n      \"background-size\": \"contain\",\r\n      \"background-position\": \"center\",\r\n      transition: \"all 0.5s ease\",\r\n      height: \"100%\",\r\n      width: \"100%\"\r\n    };\r\n  }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.zoomer {\r\n  position: absolute;\r\n  top: 0px;\r\n  left: 0px;\r\n  bottom: 0px;\r\n  right: 0px;\r\n  margin: 10px;\r\n}\r\n.zoomed {\r\n  transition: all 0.5s ease;\r\n}\r\n.zoomed:hover {\r\n  transform: scale(1.05);\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$8 = "data-v-4ce995a9";
  /* module identifier */
  const __vue_module_identifier__$8 = undefined;
  /* functional template */
  const __vue_is_functional_template__$8 = false;
  /* style inject SSR */
  

  
  var ImageZoomOnHover$1 = normalizeComponent_1(
    { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
    __vue_inject_styles__$8,
    __vue_script__$8,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
    browser,
    undefined
  );

/**
 * Converts metadata object into array.
 * @param meta
 */
function metadataToArray(meta) {
    var flat = [];
    if (meta) {
        for (var key in meta) {
            if (meta.hasOwnProperty(key)) {
                flat.push({ name: key, value: meta[key] });
            }
        }
    }
    return flat;
}
/**
 * Converts array to metadata object.
 * @param arrayMeta
 */
function arrayToMetadata(arrayMeta) {
    var metadata = {};
    if (arrayMeta) {
        for (var i = 0; i < arrayMeta.length; i++) {
            metadata[arrayMeta[i].name] = arrayMeta[i].value;
        }
    }
    return metadata;
}
/**
 * Indicates if logged-in user is authorized for all auths in list.
 * @param component
 * @param list
 */
function isAuthForAll(component, list) {
    var user = component.$store.getters.user;
    if (!user) {
        console.log("No user for permissions check.");
        return false;
    }
    return list.every(function (auth) { return user.authorities.indexOf(auth) > -1; });
}
/**
 * Routes to a applicaton-relative URL.
 * @param component
 * @param url
 */
function routeTo(component, url) {
    var tenant = component.$store.getters.selectedTenant;
    if (tenant) {
        component.$router.push("/tenants/" + tenant.token + url);
    }
}

//

var script$7 = {
  data: () => ({}),

  props: ["label", "url", "text"],

  components: {
    HeaderField
  },

  methods: {
    // Handle link clicked.
    onLinkClicked: function() {
      routeTo(this, this.url);
    }
  }
};

/* script */
const __vue_script__$9 = script$7;

/* template */
var __vue_render__$9 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("header-field", { attrs: { label: _vm.label } }, [
    _c(
      "a",
      {
        staticStyle: { color: "#33c", "font-weight": "700" },
        on: { click: _vm.onLinkClicked }
      },
      [_vm._v(_vm._s(_vm.text))]
    )
  ])
};
var __vue_staticRenderFns__$9 = [];
__vue_render__$9._withStripped = true;

  /* style */
  const __vue_inject_styles__$9 = function (inject) {
    if (!inject) return
    inject("data-v-40317dd2_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"LinkedHeaderField.vue"}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$9 = "data-v-40317dd2";
  /* module identifier */
  const __vue_module_identifier__$9 = undefined;
  /* functional template */
  const __vue_is_functional_template__$9 = false;
  /* style inject SSR */
  

  
  var LinkedHeaderField = normalizeComponent_1(
    { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
    __vue_inject_styles__$9,
    __vue_script__$9,
    __vue_scope_id__$9,
    __vue_is_functional_template__$9,
    __vue_module_identifier__$9,
    browser,
    undefined
  );

var LoadingOverlay = /** @class */ (function (_super) {
    __extends(LoadingOverlay, _super);
    function LoadingOverlay() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", String)
    ], LoadingOverlay.prototype, "loadingMessage", void 0);
    LoadingOverlay = __decorate([
        sitewhereIdeCommon.Component({})
    ], LoadingOverlay);
    return LoadingOverlay;
}(Vue));

/* script */
const __vue_script__$a = LoadingOverlay;

/* template */
var __vue_render__$a = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "overlay" },
    [
      _c(
        "v-container",
        { attrs: { "fill-height": "" } },
        [
          _c(
            "v-layout",
            {
              attrs: {
                "align-center": "",
                "justify-center": "",
                column: "",
                "fill-height": ""
              }
            },
            [
              _c("v-flex", { attrs: { xs5: "" } }),
              _vm._v(" "),
              _c(
                "v-flex",
                { attrs: { xs1: "" } },
                [
                  _c("v-progress-circular", {
                    staticClass: "mb-4",
                    attrs: { size: "65", color: "#666", indeterminate: true }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c("v-flex", { attrs: { xs1: "" } }, [
                _c(
                  "div",
                  { staticClass: "subheading", staticStyle: { color: "#666" } },
                  [_vm._v(_vm._s(_vm.loadingMessage || "Loading ..."))]
                )
              ]),
              _vm._v(" "),
              _c("v-flex", { attrs: { xs5: "" } })
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$a = [];
__vue_render__$a._withStripped = true;

  /* style */
  const __vue_inject_styles__$a = function (inject) {
    if (!inject) return
    inject("data-v-07c26cc4_0", { source: "\n.overlay[data-v-07c26cc4] {\r\n  position: absolute;\r\n  top: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  right: 0;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\common\\LoadingOverlay.vue"],"names":[],"mappings":";AA6BA;EACA,kBAAA;EACA,MAAA;EACA,SAAA;EACA,OAAA;EACA,QAAA;AACA","file":"LoadingOverlay.vue","sourcesContent":["<template>\r\n  <div class=\"overlay\">\r\n    <v-container fill-height>\r\n      <v-layout align-center justify-center column fill-height>\r\n        <v-flex xs5/>\r\n        <v-flex xs1>\r\n          <v-progress-circular size=\"65\" color=\"#666\" class=\"mb-4\" :indeterminate=\"true\"/>\r\n        </v-flex>\r\n        <v-flex xs1>\r\n          <div class=\"subheading\" style=\"color: #666;\">{{ loadingMessage || 'Loading ...' }}</div>\r\n        </v-flex>\r\n        <v-flex xs5/>\r\n      </v-layout>\r\n    </v-container>\r\n  </div>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport { Component, Prop } from \"sitewhere-ide-common\";\r\n\r\nimport Vue from \"vue\";\r\n\r\n@Component({})\r\nexport default class LoadingOverlay extends Vue {\r\n  @Prop() readonly loadingMessage!: string;\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.overlay {\r\n  position: absolute;\r\n  top: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  right: 0;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$a = "data-v-07c26cc4";
  /* module identifier */
  const __vue_module_identifier__$a = undefined;
  /* functional template */
  const __vue_is_functional_template__$a = false;
  /* style inject SSR */
  

  
  var LoadingOverlay$1 = normalizeComponent_1(
    { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
    __vue_inject_styles__$a,
    __vue_script__$a,
    __vue_scope_id__$a,
    __vue_is_functional_template__$a,
    __vue_module_identifier__$a,
    browser,
    undefined
  );

var BaseDialog = /** @class */ (function (_super) {
    __extends(BaseDialog, _super);
    function BaseDialog() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.active = null;
        return _this;
    }
    BaseDialog.prototype.onTabSelected = function (updated) {
        this.$emit("tabSelected", updated);
    };
    /** Set the active tab */
    BaseDialog.prototype.setActiveTab = function (tab) {
        var _this = this;
        this.$nextTick(function () {
            _this.active = tab;
        });
    };
    /** Handle cancel clicked */
    BaseDialog.prototype.onCancelClicked = function (e) {
        this.$emit("cancelClicked", e);
    };
    /** Handle create clicked */
    BaseDialog.prototype.onCreateClicked = function (e) {
        this.$emit("createClicked", e);
    };
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", String)
    ], BaseDialog.prototype, "title", void 0);
    __decorate([
        sitewhereIdeCommon.Prop({ default: 600 }),
        __metadata("design:type", Number)
    ], BaseDialog.prototype, "width", void 0);
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", String)
    ], BaseDialog.prototype, "icon", void 0);
    __decorate([
        sitewhereIdeCommon.Prop({ default: true }),
        __metadata("design:type", Boolean)
    ], BaseDialog.prototype, "visible", void 0);
    __decorate([
        sitewhereIdeCommon.Prop({ default: true }),
        __metadata("design:type", Boolean)
    ], BaseDialog.prototype, "tabbed", void 0);
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", String)
    ], BaseDialog.prototype, "createLabel", void 0);
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", String)
    ], BaseDialog.prototype, "cancelLabel", void 0);
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", String)
    ], BaseDialog.prototype, "error", void 0);
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", Boolean)
    ], BaseDialog.prototype, "hideButtons", void 0);
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", Boolean)
    ], BaseDialog.prototype, "hideCreate", void 0);
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", Boolean)
    ], BaseDialog.prototype, "invalid", void 0);
    __decorate([
        sitewhereIdeCommon.Prop({ default: false }),
        __metadata("design:type", Boolean)
    ], BaseDialog.prototype, "lazy", void 0);
    __decorate([
        sitewhereIdeCommon.Prop({ default: true }),
        __metadata("design:type", Boolean)
    ], BaseDialog.prototype, "loaded", void 0);
    __decorate([
        sitewhereIdeCommon.Prop({ default: "Loading..." }),
        __metadata("design:type", String)
    ], BaseDialog.prototype, "loadingMessage", void 0);
    __decorate([
        sitewhereIdeCommon.Watch("active", { immediate: true }),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], BaseDialog.prototype, "onTabSelected", null);
    BaseDialog = __decorate([
        sitewhereIdeCommon.Component({
            components: {
                ErrorBanner: ErrorBanner,
                LoadingOverlay: LoadingOverlay$1
            }
        })
    ], BaseDialog);
    return BaseDialog;
}(Vue));

/* script */
const __vue_script__$b = BaseDialog;

/* template */
var __vue_render__$b = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-dialog",
    {
      attrs: { lazy: _vm.lazy, persistent: "", width: _vm.width },
      model: {
        value: _vm.visible,
        callback: function($$v) {
          _vm.visible = $$v;
        },
        expression: "visible"
      }
    },
    [
      _c(
        "v-card",
        [
          _c(
            "v-toolbar",
            {
              staticClass: "mb-0",
              attrs: {
                dense: "",
                flat: "",
                card: "",
                dark: "",
                color: "primary"
              }
            },
            [
              _c(
                "v-toolbar-title",
                [
                  _c("v-icon", { staticClass: "mr-1" }, [
                    _vm._v(_vm._s(_vm.icon))
                  ]),
                  _vm._v("\n        " + _vm._s(_vm.title) + "\n      ")
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c("error-banner", { attrs: { error: _vm.error } }),
          _vm._v(" "),
          _c("v-card-text", { staticClass: "pa-0" }, [
            _c(
              "div",
              { staticStyle: { position: "relative" } },
              [
                _vm._t("default"),
                _vm._v(" "),
                _vm.tabbed
                  ? _c(
                      "v-tabs",
                      {
                        model: {
                          value: _vm.active,
                          callback: function($$v) {
                            _vm.active = $$v;
                          },
                          expression: "active"
                        }
                      },
                      [_vm._t("tabs"), _vm._v(" "), _vm._t("tab-items")],
                      2
                    )
                  : _vm._e(),
                _vm._v(" "),
                !_vm.loaded
                  ? _c("loading-overlay", {
                      attrs: { loadingMessage: _vm.loadingMessage }
                    })
                  : _vm._e()
              ],
              2
            )
          ]),
          _vm._v(" "),
          _c("v-divider", { staticClass: "mt-2 mb-2" }),
          _vm._v(" "),
          !_vm.hideButtons
            ? _c(
                "v-card-actions",
                [
                  _c("v-spacer"),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      attrs: { outline: "", color: "primary" },
                      on: { click: _vm.onCancelClicked }
                    },
                    [_vm._v(_vm._s(_vm.cancelLabel))]
                  ),
                  _vm._v(" "),
                  !_vm.hideCreate
                    ? _c(
                        "v-btn",
                        {
                          attrs: { color: "primary", disabled: _vm.invalid },
                          on: { click: _vm.onCreateClicked }
                        },
                        [_vm._v(_vm._s(_vm.createLabel))]
                      )
                    : _vm._e()
                ],
                1
              )
            : _vm._e()
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$b = [];
__vue_render__$b._withStripped = true;

  /* style */
  const __vue_inject_styles__$b = function (inject) {
    if (!inject) return
    inject("data-v-52b511bf_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"BaseDialog.vue"}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$b = "data-v-52b511bf";
  /* module identifier */
  const __vue_module_identifier__$b = undefined;
  /* functional template */
  const __vue_is_functional_template__$b = false;
  /* style inject SSR */
  

  
  var BaseDialog$1 = normalizeComponent_1(
    { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b },
    __vue_inject_styles__$b,
    __vue_script__$b,
    __vue_scope_id__$b,
    __vue_is_functional_template__$b,
    __vue_module_identifier__$b,
    browser,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var script$8 = {
  data: () => ({
    visible: false,
    error: null
  }),

  props: ["title", "width", "buttonText"],

  computed: {
    // Use fallback for button text.
    text: function() {
      return this.buttonText ? this.buttonText : "Ok";
    }
  },

  methods: {
    // Called to open the dialog.
    openDialog: function() {
      this.$data.visible = true;
    },

    // Called to open the dialog.
    closeDialog: function() {
      this.$data.visible = false;
    },

    // Called to show an error message.
    showError: function(error) {
      this.$data.error = error;
    },

    // Called after action button is clicked.
    onActionClicked: function(e) {
      this.$emit("action");
    },

    // Called after cancel button is clicked.
    onCancelClicked: function(e) {
      this.$data.visible = false;
    }
  }
};

/* script */
const __vue_script__$c = script$8;

/* template */
var __vue_render__$c = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-dialog",
    {
      attrs: { persistent: "", width: _vm.width },
      model: {
        value: _vm.visible,
        callback: function($$v) {
          _vm.visible = $$v;
        },
        expression: "visible"
      }
    },
    [
      _c(
        "v-card",
        [
          _c(
            "v-toolbar",
            {
              attrs: {
                dense: "",
                flat: "",
                card: "",
                dark: "",
                color: "primary"
              }
            },
            [_c("v-toolbar-title", [_vm._v(_vm._s(_vm.title))])],
            1
          ),
          _vm._v(" "),
          _vm.error
            ? _c(
                "v-alert",
                {
                  staticClass: "ma-0",
                  staticStyle: { width: "100%" },
                  attrs: { error: "", value: true }
                },
                [_vm._v(_vm._s(_vm.error.message))]
              )
            : _vm._e(),
          _vm._v(" "),
          _c(
            "v-card-text",
            [
              _vm._t("default", [
                _c("div", [_vm._v("Your content goes here!")])
              ])
            ],
            2
          ),
          _vm._v(" "),
          _c(
            "v-card-actions",
            [
              _c("v-spacer"),
              _vm._v(" "),
              _c(
                "v-btn",
                {
                  staticClass: "grey--text darken-1",
                  attrs: { flat: "flat" },
                  nativeOn: {
                    click: function($event) {
                      return _vm.onCancelClicked($event)
                    }
                  }
                },
                [_vm._v("Cancel")]
              ),
              _vm._v(" "),
              _c(
                "v-btn",
                {
                  staticClass: "blue--text darken-1",
                  attrs: { flat: "flat" },
                  nativeOn: {
                    click: function($event) {
                      return _vm.onActionClicked($event)
                    }
                  }
                },
                [_vm._v(_vm._s(_vm.text))]
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$c = [];
__vue_render__$c._withStripped = true;

  /* style */
  const __vue_inject_styles__$c = function (inject) {
    if (!inject) return
    inject("data-v-153c90a8_0", { source: "\n.confirm-dialog[data-v-153c90a8] {\r\n  padding: 10px;\r\n  font-size: 26px;\r\n  width: 100%;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\dialog\\ConfirmDialog.vue"],"names":[],"mappings":";AAyEA;EACA,aAAA;EACA,eAAA;EACA,WAAA;AACA","file":"ConfirmDialog.vue","sourcesContent":["<template>\r\n  <v-dialog v-model=\"visible\" persistent :width=\"width\">\r\n    <v-card>\r\n      <v-toolbar dense flat card dark color=\"primary\">\r\n        <v-toolbar-title>{{title}}</v-toolbar-title>\r\n      </v-toolbar>\r\n      <v-alert\r\n        class=\"ma-0\"\r\n        error\r\n        v-bind:value=\"true\"\r\n        style=\"width: 100%\"\r\n        v-if=\"error\"\r\n      >{{ error.message }}</v-alert>\r\n      <v-card-text>\r\n        <slot>\r\n          <div>Your content goes here!</div>\r\n        </slot>\r\n      </v-card-text>\r\n      <v-card-actions>\r\n        <v-spacer></v-spacer>\r\n        <v-btn class=\"grey--text darken-1\" flat=\"flat\" @click.native=\"onCancelClicked\">Cancel</v-btn>\r\n        <v-btn class=\"blue--text darken-1\" flat=\"flat\" @click.native=\"onActionClicked\">{{ text }}</v-btn>\r\n      </v-card-actions>\r\n    </v-card>\r\n  </v-dialog>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n  data: () => ({\r\n    visible: false,\r\n    error: null\r\n  }),\r\n\r\n  props: [\"title\", \"width\", \"buttonText\"],\r\n\r\n  computed: {\r\n    // Use fallback for button text.\r\n    text: function() {\r\n      return this.buttonText ? this.buttonText : \"Ok\";\r\n    }\r\n  },\r\n\r\n  methods: {\r\n    // Called to open the dialog.\r\n    openDialog: function() {\r\n      this.$data.visible = true;\r\n    },\r\n\r\n    // Called to open the dialog.\r\n    closeDialog: function() {\r\n      this.$data.visible = false;\r\n    },\r\n\r\n    // Called to show an error message.\r\n    showError: function(error) {\r\n      this.$data.error = error;\r\n    },\r\n\r\n    // Called after action button is clicked.\r\n    onActionClicked: function(e) {\r\n      this.$emit(\"action\");\r\n    },\r\n\r\n    // Called after cancel button is clicked.\r\n    onCancelClicked: function(e) {\r\n      this.$data.visible = false;\r\n    }\r\n  }\r\n};\r\n</script>\r\n\r\n<style scoped>\r\n.confirm-dialog {\r\n  padding: 10px;\r\n  font-size: 26px;\r\n  width: 100%;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$c = "data-v-153c90a8";
  /* module identifier */
  const __vue_module_identifier__$c = undefined;
  /* functional template */
  const __vue_is_functional_template__$c = false;
  /* style inject SSR */
  

  
  var ConfirmDialog = normalizeComponent_1(
    { render: __vue_render__$c, staticRenderFns: __vue_staticRenderFns__$c },
    __vue_inject_styles__$c,
    __vue_script__$c,
    __vue_scope_id__$c,
    __vue_is_functional_template__$c,
    __vue_module_identifier__$c,
    browser,
    undefined
  );

var DeleteDialog = /** @class */ (function (_super) {
    __extends(DeleteDialog, _super);
    function DeleteDialog() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // Called after create button is clicked.
    DeleteDialog.prototype.onDeleteClicked = function (e) {
        this.$emit("delete");
    };
    // Called after cancel button is clicked.
    DeleteDialog.prototype.onCancelClicked = function (e) {
        this.$emit("cancel");
    };
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", String)
    ], DeleteDialog.prototype, "title", void 0);
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", Number)
    ], DeleteDialog.prototype, "width", void 0);
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", String)
    ], DeleteDialog.prototype, "error", void 0);
    __decorate([
        sitewhereIdeCommon.Prop({ default: false }),
        __metadata("design:type", Boolean)
    ], DeleteDialog.prototype, "visible", void 0);
    DeleteDialog = __decorate([
        sitewhereIdeCommon.Component({
            components: {
                ErrorBanner: ErrorBanner
            }
        })
    ], DeleteDialog);
    return DeleteDialog;
}(Vue));

/* script */
const __vue_script__$d = DeleteDialog;

/* template */
var __vue_render__$d = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-dialog",
    {
      attrs: { persistent: "", width: _vm.width },
      model: {
        value: _vm.visible,
        callback: function($$v) {
          _vm.visible = $$v;
        },
        expression: "visible"
      }
    },
    [
      _c(
        "v-card",
        [
          _c(
            "v-toolbar",
            {
              attrs: {
                dense: "",
                flat: "",
                card: "",
                dark: "",
                color: "primary"
              }
            },
            [_c("v-toolbar-title", [_vm._v(_vm._s(_vm.title))])],
            1
          ),
          _vm._v(" "),
          _vm.error
            ? _c(
                "v-alert",
                {
                  staticClass: "ma-0",
                  staticStyle: { width: "100%" },
                  attrs: { slot: "error", error: "", value: true },
                  slot: "error"
                },
                [_vm._v(_vm._s(_vm.error))]
              )
            : _vm._e(),
          _vm._v(" "),
          _c(
            "v-card-text",
            { staticClass: "pa-0" },
            [
              _vm._t("default", [
                _c("div", [_vm._v("Your content goes here!")])
              ])
            ],
            2
          ),
          _vm._v(" "),
          _c(
            "v-card-actions",
            [
              _c("v-spacer"),
              _vm._v(" "),
              _c(
                "v-btn",
                {
                  attrs: { outline: "", color: "primary" },
                  on: { click: _vm.onCancelClicked }
                },
                [_vm._v("Cancel")]
              ),
              _vm._v(" "),
              _c(
                "v-btn",
                {
                  attrs: { color: "primary" },
                  on: { click: _vm.onDeleteClicked }
                },
                [_vm._v("Delete")]
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$d = [];
__vue_render__$d._withStripped = true;

  /* style */
  const __vue_inject_styles__$d = function (inject) {
    if (!inject) return
    inject("data-v-5453c202_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"DeleteDialog.vue"}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$d = "data-v-5453c202";
  /* module identifier */
  const __vue_module_identifier__$d = undefined;
  /* functional template */
  const __vue_is_functional_template__$d = false;
  /* style inject SSR */
  

  
  var DeleteDialog$1 = normalizeComponent_1(
    { render: __vue_render__$d, staticRenderFns: __vue_staticRenderFns__$d },
    __vue_inject_styles__$d,
    __vue_script__$d,
    __vue_scope_id__$d,
    __vue_is_functional_template__$d,
    __vue_module_identifier__$d,
    browser,
    undefined
  );

var MetadataPanel = /** @class */ (function (_super) {
    __extends(MetadataPanel, _super);
    function MetadataPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.metadata = [];
        _this.newItemName = "";
        _this.newItemValue = "";
        _this.error = null;
        return _this;
    }
    /** Reset section content */
    MetadataPanel.prototype.reset = function () {
        this.metadata = [];
        this.error = null;
    };
    /** Perform validation */
    MetadataPanel.prototype.validate = function () {
        return true;
    };
    /** Load form data from an object */
    MetadataPanel.prototype.load = function (input) {
        var initial = input.metadata;
        if (initial) {
            this.metadata = metadataToArray(initial);
        }
    };
    /** Save form data to an object */
    MetadataPanel.prototype.save = function () {
        var updated = arrayToMetadata(this.metadata);
        return {
            metadata: updated
        };
    };
    /** Delete an item */
    MetadataPanel.prototype.onDeleteItem = function (deleteName) {
        var updated = [];
        this.metadata.forEach(function (item) {
            if (item.name !== deleteName) {
                updated.push(item);
            }
        });
        this.metadata = updated;
    };
    // Let owner know an item was added.
    MetadataPanel.prototype.onAddItem = function () {
        var item = {
            name: this.newItemName,
            value: this.newItemValue
        };
        // Check for empty.
        if (item.name.length === 0) {
            this.error = "Name must not be empty.";
        }
        // Check for bad characters.
        var regex = /^[\w-]+$/;
        if (!this.error && !regex.test(item.name)) {
            this.error = "Name contains invalid characters.";
        }
        if (!this.error) {
            this.metadata.push(item);
            this.newItemName = "";
            this.newItemValue = "";
            this.error = null;
        }
    };
    Object.defineProperty(MetadataPanel.prototype, "headers", {
        get: function () {
            if (!this.readOnly) {
                return [
                    {
                        align: "left",
                        sortable: false,
                        text: "Name",
                        value: "name"
                    },
                    {
                        align: "left",
                        sortable: false,
                        text: "Value",
                        value: "value"
                    },
                    {
                        align: "left",
                        sortable: false,
                        text: "Delete",
                        value: "value"
                    }
                ];
            }
            else {
                return [
                    {
                        align: "left",
                        sortable: false,
                        text: "Name",
                        value: "name"
                    },
                    {
                        align: "left",
                        sortable: false,
                        text: "Value",
                        value: "value"
                    }
                ];
            }
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        sitewhereIdeCommon.Prop({ default: false }),
        __metadata("design:type", Boolean)
    ], MetadataPanel.prototype, "readOnly", void 0);
    __decorate([
        sitewhereIdeCommon.Prop({ default: "No metadata has been assigned" }),
        __metadata("design:type", String)
    ], MetadataPanel.prototype, "noDataMessage", void 0);
    __decorate([
        sitewhereIdeCommon.Prop({
            default: function () {
                return [5];
            }
        }),
        __metadata("design:type", Array)
    ], MetadataPanel.prototype, "pageSizes", void 0);
    MetadataPanel = __decorate([
        sitewhereIdeCommon.Component({})
    ], MetadataPanel);
    return MetadataPanel;
}(sitewhereIdeCommon.DialogSection));

/* script */
const __vue_script__$e = MetadataPanel;

/* template */
var __vue_render__$e = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    [
      _c(
        "v-card-text",
        [
          _c("v-data-table", {
            attrs: {
              headers: _vm.headers,
              items: _vm.metadata,
              "rows-per-page-items": _vm.pageSizes,
              "no-data-text": _vm.noDataMessage
            },
            scopedSlots: _vm._u([
              {
                key: "items",
                fn: function(props) {
                  return [
                    _c(
                      "td",
                      { attrs: { width: "250px", title: props.item.name } },
                      [
                        _vm._v(
                          _vm._s(
                            props.item.name.length > 25
                              ? props.item.name.substring(0, 25) + "..."
                              : props.item.name
                          )
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "td",
                      { attrs: { width: "370px", title: props.item.value } },
                      [
                        _vm._v(
                          _vm._s(
                            props.item.value.length > 50
                              ? props.item.value.substring(0, 50) + "..."
                              : props.item.value
                          )
                        )
                      ]
                    ),
                    _vm._v(" "),
                    !_vm.readOnly
                      ? _c(
                          "td",
                          { attrs: { width: "20px" } },
                          [
                            _c(
                              "v-tooltip",
                              { attrs: { left: "" } },
                              [
                                _c(
                                  "v-btn",
                                  {
                                    attrs: { slot: "activator", icon: "" },
                                    on: {
                                      click: function($event) {
                                        return _vm.onDeleteItem(props.item.name)
                                      }
                                    },
                                    slot: "activator"
                                  },
                                  [
                                    _c("font-awesome-icon", {
                                      staticClass: "grey--text",
                                      attrs: { icon: "trash", size: "lg" }
                                    })
                                  ],
                                  1
                                ),
                                _vm._v(" "),
                                _c("span", [_vm._v("Delete Item")])
                              ],
                              1
                            )
                          ],
                          1
                        )
                      : _vm._e()
                  ]
                }
              }
            ])
          })
        ],
        1
      ),
      _vm._v(" "),
      _vm.error
        ? _c(
            "v-alert",
            {
              staticClass: "ma-0",
              staticStyle: { width: "100%" },
              attrs: { error: "", value: true }
            },
            [_vm._v(_vm._s(_vm.error))]
          )
        : _vm._e(),
      _vm._v(" "),
      !_vm.readOnly
        ? _c(
            "div",
            [
              _c(
                "v-container",
                { attrs: { fluid: "" } },
                [
                  _c(
                    "v-layout",
                    { attrs: { row: "" } },
                    [
                      _c(
                        "v-flex",
                        { staticClass: "pr-3", attrs: { xs5: "" } },
                        [
                          _c("v-text-field", {
                            attrs: {
                              light: "",
                              label: "Name",
                              placeholder: " "
                            },
                            model: {
                              value: _vm.newItemName,
                              callback: function($$v) {
                                _vm.newItemName = $$v;
                              },
                              expression: "newItemName"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-flex",
                        { attrs: { xs6: "" } },
                        [
                          _c("v-text-field", {
                            attrs: {
                              light: "",
                              label: "Value",
                              placeholder: " "
                            },
                            model: {
                              value: _vm.newItemValue,
                              callback: function($$v) {
                                _vm.newItemValue = $$v;
                              },
                              expression: "newItemValue"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-flex",
                        { staticClass: "pt-3", attrs: { xs1: "" } },
                        [
                          _c(
                            "v-tooltip",
                            { attrs: { left: "" } },
                            [
                              _c(
                                "v-btn",
                                {
                                  attrs: { slot: "activator", icon: "" },
                                  on: { click: _vm.onAddItem },
                                  slot: "activator"
                                },
                                [
                                  _c("font-awesome-icon", {
                                    staticClass: "blue--text text--darken-2",
                                    attrs: { icon: "plus-circle", size: "2x" }
                                  })
                                ],
                                1
                              ),
                              _vm._v(" "),
                              _c("span", [_vm._v("Add Item")])
                            ],
                            1
                          )
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        : _vm._e()
    ],
    1
  )
};
var __vue_staticRenderFns__$e = [];
__vue_render__$e._withStripped = true;

  /* style */
  const __vue_inject_styles__$e = function (inject) {
    if (!inject) return
    inject("data-v-1bf1f529_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"MetadataPanel.vue"}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$e = "data-v-1bf1f529";
  /* module identifier */
  const __vue_module_identifier__$e = undefined;
  /* functional template */
  const __vue_is_functional_template__$e = false;
  /* style inject SSR */
  

  
  var MetadataPanel$1 = normalizeComponent_1(
    { render: __vue_render__$e, staticRenderFns: __vue_staticRenderFns__$e },
    __vue_inject_styles__$e,
    __vue_script__$e,
    __vue_scope_id__$e,
    __vue_is_functional_template__$e,
    __vue_module_identifier__$e,
    browser,
    undefined
  );

var ListEntry = /** @class */ (function (_super) {
    __extends(ListEntry, _super);
    function ListEntry() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListEntry = __decorate([
        sitewhereIdeCommon.Component
    ], ListEntry);
    return ListEntry;
}(Vue));

/* script */
const __vue_script__$f = ListEntry;

/* template */
var __vue_render__$f = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-card",
    { staticClass: "list-entry", attrs: { flat: "", hover: "" } },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$f = [];
__vue_render__$f._withStripped = true;

  /* style */
  const __vue_inject_styles__$f = function (inject) {
    if (!inject) return
    inject("data-v-2ee7dd54_0", { source: "\n.list-entry[data-v-2ee7dd54] {\r\n  border: 1px solid #ddd;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\list\\ListEntry.vue"],"names":[],"mappings":";AAeA;EACA,sBAAA;AACA","file":"ListEntry.vue","sourcesContent":["<template>\r\n  <v-card class=\"list-entry\" flat hover>\r\n    <slot/>\r\n  </v-card>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\nimport { Component } from \"sitewhere-ide-common\";\r\n\r\n@Component\r\nexport default class ListEntry extends Vue {}\r\n</script>\r\n\r\n<style scoped>\r\n.list-entry {\r\n  border: 1px solid #ddd;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$f = "data-v-2ee7dd54";
  /* module identifier */
  const __vue_module_identifier__$f = undefined;
  /* functional template */
  const __vue_is_functional_template__$f = false;
  /* style inject SSR */
  

  
  var ListEntry$1 = normalizeComponent_1(
    { render: __vue_render__$f, staticRenderFns: __vue_staticRenderFns__$f },
    __vue_inject_styles__$f,
    __vue_script__$f,
    __vue_scope_id__$f,
    __vue_is_functional_template__$f,
    __vue_module_identifier__$f,
    browser,
    undefined
  );

var ListLayout = /** @class */ (function (_super) {
    __extends(ListLayout, _super);
    function ListLayout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListLayout = __decorate([
        sitewhereIdeCommon.Component({})
    ], ListLayout);
    return ListLayout;
}(Vue));

/* script */
const __vue_script__$g = ListLayout;

/* template */
var __vue_render__$g = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-container",
    {
      staticClass: "pa-2",
      attrs: { fluid: "", "grid-list-md": "", "fill-height": "" }
    },
    [
      _c(
        "v-layout",
        { attrs: { "align-content-start": "", row: "", wrap: "" } },
        [_vm._t("default")],
        2
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$g = [];
__vue_render__$g._withStripped = true;

  /* style */
  const __vue_inject_styles__$g = function (inject) {
    if (!inject) return
    inject("data-v-15fab996_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"ListLayout.vue"}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$g = "data-v-15fab996";
  /* module identifier */
  const __vue_module_identifier__$g = undefined;
  /* functional template */
  const __vue_is_functional_template__$g = false;
  /* style inject SSR */
  

  
  var ListLayout$1 = normalizeComponent_1(
    { render: __vue_render__$g, staticRenderFns: __vue_staticRenderFns__$g },
    __vue_inject_styles__$g,
    __vue_script__$g,
    __vue_scope_id__$g,
    __vue_is_functional_template__$g,
    __vue_module_identifier__$g,
    browser,
    undefined
  );

var NavigationPage = /** @class */ (function (_super) {
    __extends(NavigationPage, _super);
    function NavigationPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", String)
    ], NavigationPage.prototype, "icon", void 0);
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", String)
    ], NavigationPage.prototype, "title", void 0);
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", String)
    ], NavigationPage.prototype, "loadingMessage", void 0);
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", Boolean)
    ], NavigationPage.prototype, "loaded", void 0);
    NavigationPage = __decorate([
        sitewhereIdeCommon.Component({
            components: {
                LoadingOverlay: LoadingOverlay$1
            }
        })
    ], NavigationPage);
    return NavigationPage;
}(Vue));

/* script */
const __vue_script__$h = NavigationPage;

/* template */
var __vue_render__$h = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-card",
    { staticClass: "flex-rows", attrs: { flat: "", "fill-height": "" } },
    [
      _c(
        "v-toolbar",
        { staticClass: "elevation-1 toolbar", attrs: { dense: "" } },
        [
          _c("v-icon", [_vm._v(_vm._s(_vm.icon))]),
          _vm._v(" "),
          _c("v-toolbar-title", { staticClass: "ml-2 subheading" }, [
            _vm._v(_vm._s(_vm.title))
          ]),
          _vm._v(" "),
          _c("v-spacer"),
          _vm._v(" "),
          _vm._t("actions")
        ],
        2
      ),
      _vm._v(" "),
      _c("div", { staticClass: "header" }, [_vm._t("header")], 2),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "content" },
        [_vm.loaded ? _vm._t("content") : _vm._e()],
        2
      ),
      _vm._v(" "),
      _c("div", { staticClass: "footer" }, [_vm._t("footer")], 2),
      _vm._v(" "),
      !_vm.loaded
        ? _c("loading-overlay", {
            attrs: { loadingMessage: _vm.loadingMessage }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm._t("dialogs")
    ],
    2
  )
};
var __vue_staticRenderFns__$h = [];
__vue_render__$h._withStripped = true;

  /* style */
  const __vue_inject_styles__$h = function (inject) {
    if (!inject) return
    inject("data-v-380c53f4_0", { source: "\n.flex-rows[data-v-380c53f4] {\r\n  display: flex;\r\n  flex-direction: column;\n}\n.toolbar[data-v-380c53f4] {\r\n  flex: 0;\r\n  z-index: 1;\r\n  color: #333;\n}\n.header[data-v-380c53f4] {\r\n  flex: 0;\r\n  z-index: 1;\n}\n.content[data-v-380c53f4] {\r\n  flex: 1;\r\n  overflow-y: auto;\r\n  z-index: 0;\n}\n.footer[data-v-380c53f4] {\r\n  flex: 0;\r\n  z-index: 1;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\navigation\\NavigationPage.vue"],"names":[],"mappings":";AA0CA;EACA,aAAA;EACA,sBAAA;AACA;AACA;EACA,OAAA;EACA,UAAA;EACA,WAAA;AACA;AACA;EACA,OAAA;EACA,UAAA;AACA;AACA;EACA,OAAA;EACA,gBAAA;EACA,UAAA;AACA;AACA;EACA,OAAA;EACA,UAAA;AACA","file":"NavigationPage.vue","sourcesContent":["<template>\r\n  <v-card class=\"flex-rows\" flat fill-height>\r\n    <v-toolbar class=\"elevation-1 toolbar\" dense>\r\n      <v-icon>{{ icon }}</v-icon>\r\n      <v-toolbar-title class=\"ml-2 subheading\">{{ title }}</v-toolbar-title>\r\n      <v-spacer></v-spacer>\r\n      <slot name=\"actions\"/>\r\n    </v-toolbar>\r\n    <div class=\"header\">\r\n      <slot name=\"header\"/>\r\n    </div>\r\n    <div class=\"content\">\r\n      <slot v-if=\"loaded\" name=\"content\"/>\r\n    </div>\r\n    <div class=\"footer\">\r\n      <slot name=\"footer\"/>\r\n    </div>\r\n    <loading-overlay v-if=\"!loaded\" :loadingMessage=\"loadingMessage\"/>\r\n    <slot name=\"dialogs\"/>\r\n  </v-card>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\nimport { Component, Prop } from \"sitewhere-ide-common\";\r\n\r\nimport LoadingOverlay from \"../common/LoadingOverlay.vue\";\r\n\r\n@Component({\r\n  components: {\r\n    LoadingOverlay\r\n  }\r\n})\r\nexport default class NavigationPage extends Vue {\r\n  @Prop() readonly icon!: string;\r\n  @Prop() readonly title!: string;\r\n  @Prop() readonly loadingMessage!: string;\r\n  @Prop() readonly loaded!: boolean;\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.flex-rows {\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n.toolbar {\r\n  flex: 0;\r\n  z-index: 1;\r\n  color: #333;\r\n}\r\n.header {\r\n  flex: 0;\r\n  z-index: 1;\r\n}\r\n.content {\r\n  flex: 1;\r\n  overflow-y: auto;\r\n  z-index: 0;\r\n}\r\n.footer {\r\n  flex: 0;\r\n  z-index: 1;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$h = "data-v-380c53f4";
  /* module identifier */
  const __vue_module_identifier__$h = undefined;
  /* functional template */
  const __vue_is_functional_template__$h = false;
  /* style inject SSR */
  

  
  var NavigationPage$1 = normalizeComponent_1(
    { render: __vue_render__$h, staticRenderFns: __vue_staticRenderFns__$h },
    __vue_inject_styles__$h,
    __vue_script__$h,
    __vue_scope_id__$h,
    __vue_is_functional_template__$h,
    __vue_module_identifier__$h,
    browser,
    undefined
  );

var Pager = /** @class */ (function (_super) {
    __extends(Pager, _super);
    function Pager() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.page = 1;
        _this.pageSize = null;
        _this.defaultResults = {
            numResults: 0,
            results: []
        };
        _this.defaultPageSizes = [
            {
                text: "10",
                value: 10
            },
            {
                text: "25",
                value: 25
            },
            {
                text: "50",
                value: 50
            }
        ];
        return _this;
    }
    Pager.prototype.created = function () {
        if (!this.pageSize) {
            this.pageSize = this.pageSizesWithDefaults[0].value;
        }
        this.onPagingUpdated();
    };
    // Refresh results on page size updated.
    Pager.prototype.onPageSizeUpdated = function (val, oldVal) {
        this.page = 1;
        this.onPagingUpdated();
    };
    Object.defineProperty(Pager.prototype, "resultsWithDefaults", {
        // Results with defaults fallback.
        get: function () {
            return this.results || this.defaultResults;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pager.prototype, "total", {
        // Total record count.
        get: function () {
            return this.resultsWithDefaults.numResults;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pager.prototype, "description", {
        // Description.
        get: function () {
            var size = this.pageSize || 0;
            var total = this.total;
            var page = this.page;
            var first = size * (page - 1) + 1;
            var last = Math.min(total, first + size - 1);
            return "" + first + "-" + last + " of " + total;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pager.prototype, "pageCount", {
        // Calculate number of pages.
        get: function () {
            var results = this.resultsWithDefaults;
            var total = results.numResults;
            var size = this.pageSize || 0;
            var mod = total % size;
            var count = (total / size) | 0;
            count += mod > 0 ? 1 : 0;
            return count;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pager.prototype, "pageSizesWithDefaults", {
        // Get list of available page sizes with fallback defaults.
        get: function () {
            return this.pageSizes || this.defaultPageSizes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pager.prototype, "previousEnabled", {
        // Indicates if 'first' button should be enabled.
        get: function () {
            return this.page > 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Pager.prototype, "nextEnabled", {
        // Indicates if 'first' button should be enabled.
        get: function () {
            return this.page < this.pageCount;
        },
        enumerable: true,
        configurable: true
    });
    // Called to move to first page.
    Pager.prototype.onFirstPage = function () {
        if (this.page !== 1) {
            this.page = 1;
            this.onPagingUpdated();
        }
    };
    // Called to move to previous page.
    Pager.prototype.onPreviousPage = function () {
        if (this.page > 1) {
            this.page--;
            this.onPagingUpdated();
        }
    };
    // Called to refresh data.
    Pager.prototype.onRefresh = function () {
        this.onPagingUpdated();
    };
    // Called to move to next page.
    Pager.prototype.onNextPage = function () {
        if (this.page < this.pageCount) {
            this.page++;
            this.onPagingUpdated();
        }
    };
    // Called to move to last page.
    Pager.prototype.onLastPage = function () {
        if (this.page < this.pageCount) {
            this.page = this.pageCount;
            this.onPagingUpdated();
        }
    };
    // Called when paging values are updated.
    Pager.prototype.onPagingUpdated = function () {
        var paging = {
            pageNumber: this.page,
            pageSize: this.pageSize || 0
        };
        this.$emit("pagingUpdated", paging);
    };
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", Object)
    ], Pager.prototype, "results", void 0);
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", Array)
    ], Pager.prototype, "pageSizes", void 0);
    __decorate([
        sitewhereIdeCommon.Watch("pageSize"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number, Number]),
        __metadata("design:returntype", void 0)
    ], Pager.prototype, "onPageSizeUpdated", null);
    Pager = __decorate([
        sitewhereIdeCommon.Component
    ], Pager);
    return Pager;
}(Vue));

/* script */
const __vue_script__$i = Pager;

/* template */
var __vue_render__$i = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "pager" },
    [
      _vm.results && _vm.results.numResults === 0
        ? _vm._t("noresults")
        : _vm._e(),
      _vm._v(" "),
      _c(
        "v-container",
        { staticClass: "ma-0 pa-0" },
        [
          _c(
            "v-layout",
            { attrs: { row: "", wrap: "" } },
            [
              _c(
                "v-flex",
                { attrs: { xs2: "" } },
                [
                  _c("v-subheader", { staticClass: "ma-0 pt-0 pr-0" }, [
                    _vm._v("Rows per page")
                  ])
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-flex",
                { attrs: { xs3: "" } },
                [
                  _c(
                    "v-btn-toggle",
                    {
                      staticClass: "mt-1",
                      model: {
                        value: _vm.pageSize,
                        callback: function($$v) {
                          _vm.pageSize = $$v;
                        },
                        expression: "pageSize"
                      }
                    },
                    _vm._l(_vm.pageSizesWithDefaults, function(entry) {
                      return _c(
                        "v-btn",
                        {
                          key: entry.value,
                          attrs: { flat: "", value: entry.value }
                        },
                        [_vm._v(_vm._s(entry.text))]
                      )
                    }),
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-flex",
                { attrs: { xs4: "" } },
                [
                  _c(
                    "v-tooltip",
                    { attrs: { top: "" } },
                    [
                      _c(
                        "v-btn",
                        {
                          staticClass: "ml-0 mr-0",
                          attrs: {
                            slot: "activator",
                            disabled: !_vm.previousEnabled,
                            icon: "",
                            light: ""
                          },
                          on: { click: _vm.onFirstPage },
                          slot: "activator"
                        },
                        [
                          _c("font-awesome-icon", {
                            staticClass: "grey--text text--darken-1",
                            attrs: { icon: "fast-backward", size: "lg" }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("span", [_vm._v("First Page")])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-tooltip",
                    { attrs: { top: "" } },
                    [
                      _c(
                        "v-btn",
                        {
                          staticClass: "ml-0 mr-0",
                          attrs: {
                            slot: "activator",
                            disabled: !_vm.previousEnabled,
                            icon: "",
                            light: ""
                          },
                          on: { click: _vm.onPreviousPage },
                          slot: "activator"
                        },
                        [
                          _c("font-awesome-icon", {
                            staticClass: "grey--text text--darken-1",
                            attrs: { icon: "backward", size: "lg" }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("span", [_vm._v("Previous Page")])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-tooltip",
                    { attrs: { top: "" } },
                    [
                      _c(
                        "v-btn",
                        {
                          staticClass: "ml-0 mr-0",
                          attrs: { slot: "activator", icon: "", light: "" },
                          on: { click: _vm.onRefresh },
                          slot: "activator"
                        },
                        [
                          _c("font-awesome-icon", {
                            staticClass: "grey--text text--darken-1",
                            attrs: { icon: "sync", size: "lg" }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("span", [_vm._v("Refresh")])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-tooltip",
                    { attrs: { top: "" } },
                    [
                      _c(
                        "v-btn",
                        {
                          staticClass: "ml-0 mr-0",
                          attrs: {
                            slot: "activator",
                            disabled: !_vm.nextEnabled,
                            icon: "",
                            light: ""
                          },
                          on: { click: _vm.onNextPage },
                          slot: "activator"
                        },
                        [
                          _c("font-awesome-icon", {
                            staticClass: "grey--text text--darken-1",
                            attrs: { icon: "forward", size: "lg" }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("span", [_vm._v("Next Page")])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-tooltip",
                    { attrs: { top: "" } },
                    [
                      _c(
                        "v-btn",
                        {
                          staticClass: "ml-0 mr-0",
                          attrs: {
                            slot: "activator",
                            disabled: !_vm.nextEnabled,
                            icon: "",
                            light: ""
                          },
                          on: { click: _vm.onLastPage },
                          slot: "activator"
                        },
                        [
                          _c("font-awesome-icon", {
                            staticClass: "grey--text text--darken-1",
                            attrs: { icon: "fast-forward", size: "lg" }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("span", [_vm._v("Last Page")])
                    ],
                    1
                  )
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-flex",
                { attrs: { xs3: "" } },
                [
                  _c("v-subheader", { staticClass: "ma-0 pt-0 right" }, [
                    _vm._v(_vm._s(_vm.description))
                  ])
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    2
  )
};
var __vue_staticRenderFns__$i = [];
__vue_render__$i._withStripped = true;

  /* style */
  const __vue_inject_styles__$i = function (inject) {
    if (!inject) return
    inject("data-v-5282a815_0", { source: "\n.pager[data-v-5282a815] {\r\n  color: #333;\r\n  background-color: #eee;\r\n  border-top: 1px solid #ccc;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\list\\Pager.vue"],"names":[],"mappings":";AAuOA;EACA,WAAA;EACA,sBAAA;EACA,0BAAA;AACA","file":"Pager.vue","sourcesContent":["<template>\r\n  <div class=\"pager\">\r\n    <slot v-if=\"results && results.numResults === 0\" name=\"noresults\"></slot>\r\n    <v-container class=\"ma-0 pa-0\">\r\n      <v-layout row wrap>\r\n        <v-flex xs2>\r\n          <v-subheader class=\"ma-0 pt-0 pr-0\">Rows per page</v-subheader>\r\n        </v-flex>\r\n        <v-flex xs3>\r\n          <v-btn-toggle v-model=\"pageSize\" class=\"mt-1\">\r\n            <v-btn\r\n              flat\r\n              :value=\"entry.value\"\r\n              v-for=\"entry in pageSizesWithDefaults\"\r\n              :key=\"entry.value\"\r\n            >{{ entry.text }}</v-btn>\r\n          </v-btn-toggle>\r\n        </v-flex>\r\n        <v-flex xs4>\r\n          <v-tooltip top>\r\n            <v-btn\r\n              :disabled=\"!previousEnabled\"\r\n              icon\r\n              light\r\n              class=\"ml-0 mr-0\"\r\n              @click=\"onFirstPage\"\r\n              slot=\"activator\"\r\n            >\r\n              <font-awesome-icon class=\"grey--text text--darken-1\" icon=\"fast-backward\" size=\"lg\"/>\r\n            </v-btn>\r\n            <span>First Page</span>\r\n          </v-tooltip>\r\n          <v-tooltip top>\r\n            <v-btn\r\n              :disabled=\"!previousEnabled\"\r\n              icon\r\n              light\r\n              class=\"ml-0 mr-0\"\r\n              @click=\"onPreviousPage\"\r\n              slot=\"activator\"\r\n            >\r\n              <font-awesome-icon class=\"grey--text text--darken-1\" icon=\"backward\" size=\"lg\"/>\r\n            </v-btn>\r\n            <span>Previous Page</span>\r\n          </v-tooltip>\r\n          <v-tooltip top>\r\n            <v-btn icon light class=\"ml-0 mr-0\" @click=\"onRefresh\" slot=\"activator\">\r\n              <font-awesome-icon class=\"grey--text text--darken-1\" icon=\"sync\" size=\"lg\"/>\r\n            </v-btn>\r\n            <span>Refresh</span>\r\n          </v-tooltip>\r\n          <v-tooltip top>\r\n            <v-btn\r\n              :disabled=\"!nextEnabled\"\r\n              icon\r\n              light\r\n              class=\"ml-0 mr-0\"\r\n              @click=\"onNextPage\"\r\n              slot=\"activator\"\r\n            >\r\n              <font-awesome-icon class=\"grey--text text--darken-1\" icon=\"forward\" size=\"lg\"/>\r\n            </v-btn>\r\n            <span>Next Page</span>\r\n          </v-tooltip>\r\n          <v-tooltip top>\r\n            <v-btn\r\n              :disabled=\"!nextEnabled\"\r\n              icon\r\n              light\r\n              class=\"ml-0 mr-0\"\r\n              @click=\"onLastPage\"\r\n              slot=\"activator\"\r\n            >\r\n              <font-awesome-icon class=\"grey--text text--darken-1\" icon=\"fast-forward\" size=\"lg\"/>\r\n            </v-btn>\r\n            <span>Last Page</span>\r\n          </v-tooltip>\r\n        </v-flex>\r\n        <v-flex xs3>\r\n          <v-subheader class=\"ma-0 pt-0 right\">{{ description }}</v-subheader>\r\n        </v-flex>\r\n      </v-layout>\r\n    </v-container>\r\n  </div>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\n\r\nimport {\r\n  Component,\r\n  Prop,\r\n  Watch,\r\n  IPaging,\r\n  IPageSizes\r\n} from \"sitewhere-ide-common\";\r\n\r\n@Component\r\nexport default class Pager extends Vue {\r\n  @Prop() readonly results!: { numResults: number; results: {}[] };\r\n  @Prop() readonly pageSizes!: IPageSizes;\r\n\r\n  page: number = 1;\r\n  pageSize: number | null = null;\r\n  defaultResults: { numResults: number; results: {}[] } = {\r\n    numResults: 0,\r\n    results: []\r\n  };\r\n  defaultPageSizes: IPageSizes = [\r\n    {\r\n      text: \"10\",\r\n      value: 10\r\n    },\r\n    {\r\n      text: \"25\",\r\n      value: 25\r\n    },\r\n    {\r\n      text: \"50\",\r\n      value: 50\r\n    }\r\n  ];\r\n\r\n  created() {\r\n    if (!this.pageSize) {\r\n      this.pageSize = this.pageSizesWithDefaults[0].value;\r\n    }\r\n    this.onPagingUpdated();\r\n  }\r\n\r\n  // Refresh results on page size updated.\r\n  @Watch(\"pageSize\") onPageSizeUpdated(val: number, oldVal: number) {\r\n    this.page = 1;\r\n    this.onPagingUpdated();\r\n  }\r\n\r\n  // Results with defaults fallback.\r\n  get resultsWithDefaults(): { numResults: number; results: {}[] } {\r\n    return this.results || this.defaultResults;\r\n  }\r\n\r\n  // Total record count.\r\n  get total(): number {\r\n    return this.resultsWithDefaults.numResults;\r\n  }\r\n\r\n  // Description.\r\n  get description(): string {\r\n    let size = this.pageSize || 0;\r\n    let total = this.total;\r\n    let page = this.page;\r\n    var first = size * (page - 1) + 1;\r\n    var last = Math.min(total, first + size - 1);\r\n    return \"\" + first + \"-\" + last + \" of \" + total;\r\n  }\r\n\r\n  // Calculate number of pages.\r\n  get pageCount() {\r\n    var results = this.resultsWithDefaults;\r\n    var total = results.numResults;\r\n    var size = this.pageSize || 0;\r\n    var mod = total % size;\r\n    var count = (total / size) | 0;\r\n    count += mod > 0 ? 1 : 0;\r\n    return count;\r\n  }\r\n\r\n  // Get list of available page sizes with fallback defaults.\r\n  get pageSizesWithDefaults(): { text: string; value: number }[] {\r\n    return this.pageSizes || this.defaultPageSizes;\r\n  }\r\n\r\n  // Indicates if 'first' button should be enabled.\r\n  get previousEnabled(): boolean {\r\n    return this.page > 1;\r\n  }\r\n\r\n  // Indicates if 'first' button should be enabled.\r\n  get nextEnabled(): boolean {\r\n    return this.page < this.pageCount;\r\n  }\r\n\r\n  // Called to move to first page.\r\n  onFirstPage() {\r\n    if (this.page !== 1) {\r\n      this.page = 1;\r\n      this.onPagingUpdated();\r\n    }\r\n  }\r\n\r\n  // Called to move to previous page.\r\n  onPreviousPage() {\r\n    if (this.page > 1) {\r\n      this.page--;\r\n      this.onPagingUpdated();\r\n    }\r\n  }\r\n\r\n  // Called to refresh data.\r\n  onRefresh() {\r\n    this.onPagingUpdated();\r\n  }\r\n\r\n  // Called to move to next page.\r\n  onNextPage() {\r\n    if (this.page < this.pageCount) {\r\n      this.page++;\r\n      this.onPagingUpdated();\r\n    }\r\n  }\r\n\r\n  // Called to move to last page.\r\n  onLastPage() {\r\n    if (this.page < this.pageCount) {\r\n      this.page = this.pageCount;\r\n      this.onPagingUpdated();\r\n    }\r\n  }\r\n\r\n  // Called when paging values are updated.\r\n  onPagingUpdated() {\r\n    var paging: IPaging = {\r\n      pageNumber: this.page,\r\n      pageSize: this.pageSize || 0\r\n    };\r\n    this.$emit(\"pagingUpdated\", paging);\r\n  }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.pager {\r\n  color: #333;\r\n  background-color: #eee;\r\n  border-top: 1px solid #ccc;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$i = "data-v-5282a815";
  /* module identifier */
  const __vue_module_identifier__$i = undefined;
  /* functional template */
  const __vue_is_functional_template__$i = false;
  /* style inject SSR */
  

  
  var Pager$1 = normalizeComponent_1(
    { render: __vue_render__$i, staticRenderFns: __vue_staticRenderFns__$i },
    __vue_inject_styles__$i,
    __vue_script__$i,
    __vue_scope_id__$i,
    __vue_is_functional_template__$i,
    __vue_module_identifier__$i,
    browser,
    undefined
  );

var ListPage = /** @class */ (function (_super) {
    __extends(ListPage, _super);
    function ListPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /** Update paging values and run query */
    ListPage.prototype.onPagingUpdated = function (paging) {
        this.$emit("pagingUpdated", paging);
    };
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", String)
    ], ListPage.prototype, "icon", void 0);
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", String)
    ], ListPage.prototype, "title", void 0);
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", String)
    ], ListPage.prototype, "loadingMessage", void 0);
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", Array)
    ], ListPage.prototype, "pageSizes", void 0);
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", Boolean)
    ], ListPage.prototype, "loaded", void 0);
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", Array)
    ], ListPage.prototype, "results", void 0);
    ListPage = __decorate([
        sitewhereIdeCommon.Component({
            components: {
                NavigationPage: NavigationPage$1,
                Pager: Pager$1
            }
        })
    ], ListPage);
    return ListPage;
}(Vue));

/* script */
const __vue_script__$j = ListPage;

/* template */
var __vue_render__$j = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "navigation-page",
    {
      attrs: {
        icon: _vm.icon,
        title: _vm.title,
        loadingMessage: _vm.loadingMessage,
        loaded: _vm.loaded
      }
    },
    [
      _c("template", { slot: "content" }, [
        _c("div", { staticClass: "flex-rows" }, [
          _c("div", { staticClass: "list-filters" }, [_vm._t("filters")], 2),
          _vm._v(" "),
          _c("div", { staticClass: "list-content" }, [_vm._t("default")], 2)
        ])
      ]),
      _vm._v(" "),
      _c(
        "template",
        { slot: "footer" },
        [
          _c("pager", {
            attrs: { results: _vm.results, pageSizes: _vm.pageSizes },
            on: { pagingUpdated: _vm.onPagingUpdated }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c("template", { slot: "actions" }, [_vm._t("actions")], 2),
      _vm._v(" "),
      _c("template", { slot: "dialogs" }, [_vm._t("dialogs")], 2)
    ],
    2
  )
};
var __vue_staticRenderFns__$j = [];
__vue_render__$j._withStripped = true;

  /* style */
  const __vue_inject_styles__$j = function (inject) {
    if (!inject) return
    inject("data-v-2fa52cba_0", { source: "\n.flex-rows[data-v-2fa52cba] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  height: 100%;\n}\n.list-filters[data-v-2fa52cba] {\r\n  flex: 0;\n}\n.list-content[data-v-2fa52cba] {\r\n  flex: 1;\r\n  background-color: #eee;\r\n  overflow-y: auto;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\list\\ListPage.vue"],"names":[],"mappings":";AAsDA;EACA,aAAA;EACA,sBAAA;EACA,YAAA;AACA;AACA;EACA,OAAA;AACA;AACA;EACA,OAAA;EACA,sBAAA;EACA,gBAAA;AACA","file":"ListPage.vue","sourcesContent":["<template>\r\n  <navigation-page :icon=\"icon\" :title=\"title\" :loadingMessage=\"loadingMessage\" :loaded=\"loaded\">\r\n    <template slot=\"content\">\r\n      <div class=\"flex-rows\">\r\n        <div class=\"list-filters\">\r\n          <slot name=\"filters\" />\r\n        </div>\r\n        <div class=\"list-content\">\r\n          <slot />\r\n        </div>\r\n      </div>\r\n    </template>\r\n    <template slot=\"footer\">\r\n      <pager :results=\"results\" @pagingUpdated=\"onPagingUpdated\" :pageSizes=\"pageSizes\" />\r\n    </template>\r\n    <template slot=\"actions\">\r\n      <slot name=\"actions\" />\r\n    </template>\r\n    <template slot=\"dialogs\">\r\n      <slot name=\"dialogs\" />\r\n    </template>\r\n  </navigation-page>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\n\r\nimport NavigationPage from \"../navigation/NavigationPage.vue\";\r\nimport Pager from \"../list/Pager.vue\";\r\n\r\nimport { Component, Prop, IPaging, IPageSizes } from \"sitewhere-ide-common\";\r\n\r\n@Component({\r\n  components: {\r\n    NavigationPage,\r\n    Pager\r\n  }\r\n})\r\nexport default class ListPage extends Vue {\r\n  @Prop() readonly icon!: string;\r\n  @Prop() readonly title!: string;\r\n  @Prop() readonly loadingMessage!: string;\r\n  @Prop() readonly pageSizes!: IPageSizes;\r\n  @Prop() readonly loaded!: boolean;\r\n  @Prop() readonly results!: {}[];\r\n\r\n  /** Update paging values and run query */\r\n  onPagingUpdated(paging: IPaging) {\r\n    this.$emit(\"pagingUpdated\", paging);\r\n  }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.flex-rows {\r\n  display: flex;\r\n  flex-direction: column;\r\n  height: 100%;\r\n}\r\n.list-filters {\r\n  flex: 0;\r\n}\r\n.list-content {\r\n  flex: 1;\r\n  background-color: #eee;\r\n  overflow-y: auto;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$j = "data-v-2fa52cba";
  /* module identifier */
  const __vue_module_identifier__$j = undefined;
  /* functional template */
  const __vue_is_functional_template__$j = false;
  /* style inject SSR */
  

  
  var ListPage$1 = normalizeComponent_1(
    { render: __vue_render__$j, staticRenderFns: __vue_staticRenderFns__$j },
    __vue_inject_styles__$j,
    __vue_script__$j,
    __vue_scope_id__$j,
    __vue_is_functional_template__$j,
    __vue_module_identifier__$j,
    browser,
    undefined
  );

var ListTab = /** @class */ (function (_super) {
    __extends(ListTab, _super);
    function ListTab() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /** Update paging values and run query */
    ListTab.prototype.onPagingUpdated = function (paging) {
        this.$emit("pagingUpdated", paging);
    };
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", String)
    ], ListTab.prototype, "tabkey", void 0);
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", Array)
    ], ListTab.prototype, "pageSizes", void 0);
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", String)
    ], ListTab.prototype, "loadingMessage", void 0);
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", Boolean)
    ], ListTab.prototype, "loaded", void 0);
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", Object)
    ], ListTab.prototype, "results", void 0);
    ListTab = __decorate([
        sitewhereIdeCommon.Component({
            components: {
                Pager: Pager$1,
                LoadingOverlay: LoadingOverlay$1
            }
        })
    ], ListTab);
    return ListTab;
}(Vue));

/* script */
const __vue_script__$k = ListTab;

/* template */
var __vue_render__$k = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-tab-item",
    { key: _vm.tabkey },
    [
      _c("div", { staticClass: "flex-rows" }, [
        _c("div", { staticClass: "list-filters" }, [_vm._t("filters")], 2),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "list-content" },
          [_vm.loaded ? _vm._t("default") : _vm._e()],
          2
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "list-footer" },
          [
            _c("pager", {
              attrs: { results: _vm.results, pageSizes: _vm.pageSizes },
              on: { pagingUpdated: _vm.onPagingUpdated }
            })
          ],
          1
        )
      ]),
      _vm._v(" "),
      !_vm.loaded
        ? _c("loading-overlay", {
            attrs: { loadingMessage: _vm.loadingMessage }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm._t("dialogs")
    ],
    2
  )
};
var __vue_staticRenderFns__$k = [];
__vue_render__$k._withStripped = true;

  /* style */
  const __vue_inject_styles__$k = function (inject) {
    if (!inject) return
    inject("data-v-15596729_0", { source: "\n.flex-rows[data-v-15596729] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  height: 100%;\n}\n.list-filters[data-v-15596729] {\r\n  flex: 0;\n}\n.list-content[data-v-15596729] {\r\n  flex: 1;\r\n  background-color: #eee;\r\n  overflow-y: auto;\n}\n.list-footer[data-v-15596729] {\r\n  flex: 0;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\list\\ListTab.vue"],"names":[],"mappings":";AA+CA;EACA,aAAA;EACA,sBAAA;EACA,YAAA;AACA;AACA;EACA,OAAA;AACA;AACA;EACA,OAAA;EACA,sBAAA;EACA,gBAAA;AACA;AACA;EACA,OAAA;AACA","file":"ListTab.vue","sourcesContent":["<template>\r\n  <v-tab-item :key=\"tabkey\">\r\n    <div class=\"flex-rows\">\r\n      <div class=\"list-filters\">\r\n        <slot name=\"filters\"/>\r\n      </div>\r\n      <div class=\"list-content\">\r\n        <slot v-if=\"loaded\"/>\r\n      </div>\r\n      <div class=\"list-footer\">\r\n        <pager :results=\"results\" @pagingUpdated=\"onPagingUpdated\" :pageSizes=\"pageSizes\"/>\r\n      </div>\r\n    </div>\r\n    <loading-overlay v-if=\"!loaded\" :loadingMessage=\"loadingMessage\"/>\r\n    <slot name=\"dialogs\"></slot>\r\n  </v-tab-item>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\n\r\nimport Pager from \"./Pager.vue\";\r\nimport LoadingOverlay from \"../common/LoadingOverlay.vue\";\r\n\r\nimport { Component, Prop, IPaging, IPageSizes } from \"sitewhere-ide-common\";\r\n\r\n@Component({\r\n  components: {\r\n    Pager,\r\n    LoadingOverlay\r\n  }\r\n})\r\nexport default class ListTab extends Vue {\r\n  @Prop() readonly tabkey!: string;\r\n  @Prop() readonly pageSizes!: IPageSizes;\r\n  @Prop() readonly loadingMessage!: string;\r\n  @Prop() readonly loaded!: boolean;\r\n  @Prop() readonly results!: { numResults: number; results: {}[] };\r\n\r\n  /** Update paging values and run query */\r\n  onPagingUpdated(paging: IPaging) {\r\n    this.$emit(\"pagingUpdated\", paging);\r\n  }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.flex-rows {\r\n  display: flex;\r\n  flex-direction: column;\r\n  height: 100%;\r\n}\r\n.list-filters {\r\n  flex: 0;\r\n}\r\n.list-content {\r\n  flex: 1;\r\n  background-color: #eee;\r\n  overflow-y: auto;\r\n}\r\n.list-footer {\r\n  flex: 0;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$k = "data-v-15596729";
  /* module identifier */
  const __vue_module_identifier__$k = undefined;
  /* functional template */
  const __vue_is_functional_template__$k = false;
  /* style inject SSR */
  

  
  var ListTab$1 = normalizeComponent_1(
    { render: __vue_render__$k, staticRenderFns: __vue_staticRenderFns__$k },
    __vue_inject_styles__$k,
    __vue_script__$k,
    __vue_scope_id__$k,
    __vue_is_functional_template__$k,
    __vue_module_identifier__$k,
    browser,
    undefined
  );

var ContentTab = /** @class */ (function (_super) {
    __extends(ContentTab, _super);
    function ContentTab() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", String)
    ], ContentTab.prototype, "tabkey", void 0);
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", String)
    ], ContentTab.prototype, "loadingMessage", void 0);
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", Boolean)
    ], ContentTab.prototype, "loaded", void 0);
    ContentTab = __decorate([
        sitewhereIdeCommon.Component({})
    ], ContentTab);
    return ContentTab;
}(Vue));

/* script */
const __vue_script__$l = ContentTab;

/* template */
var __vue_render__$l = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-tab-item",
    { key: _vm.tabkey },
    [
      _c("div", { staticClass: "flex-rows" }, [
        _c("div", { staticClass: "tab-header" }, [_vm._t("header")], 2),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "tab-content" },
          [
            _vm.loaded
              ? _vm._t("default")
              : _c(
                  "v-card",
                  [
                    _c(
                      "v-card-text",
                      [
                        _c("span", { staticClass: "title" }, [
                          _vm._v(_vm._s(_vm.loadingMessage || "Loading ..."))
                        ]),
                        _vm._v(" "),
                        _c("v-progress-circular", {
                          attrs: { indeterminate: true }
                        })
                      ],
                      1
                    )
                  ],
                  1
                )
          ],
          2
        ),
        _vm._v(" "),
        _c("div", { staticClass: "tab-footer" }, [_vm._t("footer")], 2)
      ]),
      _vm._v(" "),
      _vm._t("dialogs")
    ],
    2
  )
};
var __vue_staticRenderFns__$l = [];
__vue_render__$l._withStripped = true;

  /* style */
  const __vue_inject_styles__$l = function (inject) {
    if (!inject) return
    inject("data-v-c80e0034_0", { source: "\n.flex-rows[data-v-c80e0034] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  height: 100%;\n}\n.tab-header[data-v-c80e0034] {\r\n  flex: 0;\n}\n.tab-content[data-v-c80e0034] {\r\n  flex: 1;\r\n  background-color: #eee;\r\n  overflow-y: auto;\n}\n.tab-footer[data-v-c80e0034] {\r\n  flex: 0;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\navigation\\ContentTab.vue"],"names":[],"mappings":";AAoCA;EACA,aAAA;EACA,sBAAA;EACA,YAAA;AACA;AACA;EACA,OAAA;AACA;AACA;EACA,OAAA;EACA,sBAAA;EACA,gBAAA;AACA;AACA;EACA,OAAA;AACA","file":"ContentTab.vue","sourcesContent":["<template>\r\n  <v-tab-item :key=\"tabkey\">\r\n    <div class=\"flex-rows\">\r\n      <div class=\"tab-header\">\r\n        <slot name=\"header\"/>\r\n      </div>\r\n      <div class=\"tab-content\">\r\n        <slot v-if=\"loaded\"/>\r\n        <v-card v-else>\r\n          <v-card-text>\r\n            <span class=\"title\">{{ loadingMessage || 'Loading ...' }}</span>\r\n            <v-progress-circular :indeterminate=\"true\"/>\r\n          </v-card-text>\r\n        </v-card>\r\n      </div>\r\n      <div class=\"tab-footer\">\r\n        <slot name=\"footer\"/>\r\n      </div>\r\n    </div>\r\n    <slot name=\"dialogs\"></slot>\r\n  </v-tab-item>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\nimport { Component, Prop } from \"sitewhere-ide-common\";\r\n\r\n@Component({})\r\nexport default class ContentTab extends Vue {\r\n  @Prop() readonly tabkey!: string;\r\n  @Prop() readonly loadingMessage!: string;\r\n  @Prop() readonly loaded!: boolean;\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.flex-rows {\r\n  display: flex;\r\n  flex-direction: column;\r\n  height: 100%;\r\n}\r\n.tab-header {\r\n  flex: 0;\r\n}\r\n.tab-content {\r\n  flex: 1;\r\n  background-color: #eee;\r\n  overflow-y: auto;\r\n}\r\n.tab-footer {\r\n  flex: 0;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$l = "data-v-c80e0034";
  /* module identifier */
  const __vue_module_identifier__$l = undefined;
  /* functional template */
  const __vue_is_functional_template__$l = false;
  /* style inject SSR */
  

  
  var ContentTab$1 = normalizeComponent_1(
    { render: __vue_render__$l, staticRenderFns: __vue_staticRenderFns__$l },
    __vue_inject_styles__$l,
    __vue_script__$l,
    __vue_scope_id__$l,
    __vue_is_functional_template__$l,
    __vue_module_identifier__$l,
    browser,
    undefined
  );

/**
  * vue-class-component v7.1.0
  * (c) 2015-present Evan You
  * @license MIT
  */

// The rational behind the verbose Reflect-feature check below is the fact that there are polyfills
// which add an implementation for Reflect.defineMetadata but not for Reflect.getOwnMetadataKeys.
// Without this check consumers will encounter hard to track down runtime errors.
var reflectionIsSupported = typeof Reflect !== 'undefined' && Reflect.defineMetadata && Reflect.getOwnMetadataKeys;
function copyReflectionMetadata(to, from) {
    forwardMetadata(to, from);
    Object.getOwnPropertyNames(from.prototype).forEach(function (key) {
        forwardMetadata(to.prototype, from.prototype, key);
    });
    Object.getOwnPropertyNames(from).forEach(function (key) {
        forwardMetadata(to, from, key);
    });
}
function forwardMetadata(to, from, propertyKey) {
    var metaKeys = propertyKey
        ? Reflect.getOwnMetadataKeys(from, propertyKey)
        : Reflect.getOwnMetadataKeys(from);
    metaKeys.forEach(function (metaKey) {
        var metadata = propertyKey
            ? Reflect.getOwnMetadata(metaKey, from, propertyKey)
            : Reflect.getOwnMetadata(metaKey, from);
        if (propertyKey) {
            Reflect.defineMetadata(metaKey, metadata, to, propertyKey);
        }
        else {
            Reflect.defineMetadata(metaKey, metadata, to);
        }
    });
}

var fakeArray = { __proto__: [] };
var hasProto = fakeArray instanceof Array;
function isPrimitive(value) {
    var type = typeof value;
    return value == null || (type !== 'object' && type !== 'function');
}
function warn(message) {
    if (typeof console !== 'undefined') {
        console.warn('[vue-class-component] ' + message);
    }
}

function collectDataFromConstructor(vm, Component) {
    // override _init to prevent to init as Vue instance
    var originalInit = Component.prototype._init;
    Component.prototype._init = function () {
        var _this = this;
        // proxy to actual vm
        var keys = Object.getOwnPropertyNames(vm);
        // 2.2.0 compat (props are no longer exposed as self properties)
        if (vm.$options.props) {
            for (var key in vm.$options.props) {
                if (!vm.hasOwnProperty(key)) {
                    keys.push(key);
                }
            }
        }
        keys.forEach(function (key) {
            if (key.charAt(0) !== '_') {
                Object.defineProperty(_this, key, {
                    get: function () { return vm[key]; },
                    set: function (value) { vm[key] = value; },
                    configurable: true
                });
            }
        });
    };
    // should be acquired class property values
    var data = new Component();
    // restore original _init to avoid memory leak (#209)
    Component.prototype._init = originalInit;
    // create plain data object
    var plainData = {};
    Object.keys(data).forEach(function (key) {
        if (data[key] !== undefined) {
            plainData[key] = data[key];
        }
    });
    if (process.env.NODE_ENV !== 'production') {
        if (!(Component.prototype instanceof Vue) && Object.keys(plainData).length > 0) {
            warn('Component class must inherit Vue or its descendant class ' +
                'when class property is used.');
        }
    }
    return plainData;
}

var $internalHooks = [
    'data',
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeDestroy',
    'destroyed',
    'beforeUpdate',
    'updated',
    'activated',
    'deactivated',
    'render',
    'errorCaptured',
    'serverPrefetch' // 2.6
];
function componentFactory(Component, options) {
    if (options === void 0) { options = {}; }
    options.name = options.name || Component._componentTag || Component.name;
    // prototype props.
    var proto = Component.prototype;
    Object.getOwnPropertyNames(proto).forEach(function (key) {
        if (key === 'constructor') {
            return;
        }
        // hooks
        if ($internalHooks.indexOf(key) > -1) {
            options[key] = proto[key];
            return;
        }
        var descriptor = Object.getOwnPropertyDescriptor(proto, key);
        if (descriptor.value !== void 0) {
            // methods
            if (typeof descriptor.value === 'function') {
                (options.methods || (options.methods = {}))[key] = descriptor.value;
            }
            else {
                // typescript decorated data
                (options.mixins || (options.mixins = [])).push({
                    data: function () {
                        var _a;
                        return _a = {}, _a[key] = descriptor.value, _a;
                    }
                });
            }
        }
        else if (descriptor.get || descriptor.set) {
            // computed properties
            (options.computed || (options.computed = {}))[key] = {
                get: descriptor.get,
                set: descriptor.set
            };
        }
    });
    (options.mixins || (options.mixins = [])).push({
        data: function () {
            return collectDataFromConstructor(this, Component);
        }
    });
    // decorate options
    var decorators = Component.__decorators__;
    if (decorators) {
        decorators.forEach(function (fn) { return fn(options); });
        delete Component.__decorators__;
    }
    // find super
    var superProto = Object.getPrototypeOf(Component.prototype);
    var Super = superProto instanceof Vue
        ? superProto.constructor
        : Vue;
    var Extended = Super.extend(options);
    forwardStaticMembers(Extended, Component, Super);
    if (reflectionIsSupported) {
        copyReflectionMetadata(Extended, Component);
    }
    return Extended;
}
var reservedPropertyNames = [
    // Unique id
    'cid',
    // Super Vue constructor
    'super',
    // Component options that will be used by the component
    'options',
    'superOptions',
    'extendOptions',
    'sealedOptions',
    // Private assets
    'component',
    'directive',
    'filter'
];
var shouldIgnore = {
    prototype: true,
    arguments: true,
    callee: true,
    caller: true
};
function forwardStaticMembers(Extended, Original, Super) {
    // We have to use getOwnPropertyNames since Babel registers methods as non-enumerable
    Object.getOwnPropertyNames(Original).forEach(function (key) {
        // Skip the properties that should not be overwritten
        if (shouldIgnore[key]) {
            return;
        }
        // Some browsers does not allow reconfigure built-in properties
        var extendedDescriptor = Object.getOwnPropertyDescriptor(Extended, key);
        if (extendedDescriptor && !extendedDescriptor.configurable) {
            return;
        }
        var descriptor = Object.getOwnPropertyDescriptor(Original, key);
        // If the user agent does not support `__proto__` or its family (IE <= 10),
        // the sub class properties may be inherited properties from the super class in TypeScript.
        // We need to exclude such properties to prevent to overwrite
        // the component options object which stored on the extended constructor (See #192).
        // If the value is a referenced value (object or function),
        // we can check equality of them and exclude it if they have the same reference.
        // If it is a primitive value, it will be forwarded for safety.
        if (!hasProto) {
            // Only `cid` is explicitly exluded from property forwarding
            // because we cannot detect whether it is a inherited property or not
            // on the no `__proto__` environment even though the property is reserved.
            if (key === 'cid') {
                return;
            }
            var superDescriptor = Object.getOwnPropertyDescriptor(Super, key);
            if (!isPrimitive(descriptor.value) &&
                superDescriptor &&
                superDescriptor.value === descriptor.value) {
                return;
            }
        }
        // Warn if the users manually declare reserved properties
        if (process.env.NODE_ENV !== 'production' &&
            reservedPropertyNames.indexOf(key) >= 0) {
            warn("Static property name '" + key + "' declared on class '" + Original.name + "' " +
                'conflicts with reserved property name of Vue internal. ' +
                'It may cause unexpected behavior of the component. Consider renaming the property.');
        }
        Object.defineProperty(Extended, key, descriptor);
    });
}

function Component(options) {
    if (typeof options === 'function') {
        return componentFactory(options);
    }
    return function (Component) {
        return componentFactory(Component, options);
    };
}
Component.registerHooks = function registerHooks(keys) {
    $internalHooks.push.apply($internalHooks, keys);
};

/** vue-property-decorator verson 8.2.1 MIT LICENSE copyright 2019 kaorun343 */

var DataEntryPanel = /** @class */ (function (_super) {
    __extends(DataEntryPanel, _super);
    function DataEntryPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DataEntryPanel = __decorate([
        Component({
            components: {}
        })
    ], DataEntryPanel);
    return DataEntryPanel;
}(Vue));

/* script */
const __vue_script__$m = DataEntryPanel;

/* template */
var __vue_render__$m = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-container",
    { attrs: { fluid: "" } },
    [_c("v-layout", { attrs: { row: "", wrap: "" } }, [_vm._t("default")], 2)],
    1
  )
};
var __vue_staticRenderFns__$m = [];
__vue_render__$m._withStripped = true;

  /* style */
  const __vue_inject_styles__$m = function (inject) {
    if (!inject) return
    inject("data-v-f33dfbec_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"DataEntryPanel.vue"}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$m = "data-v-f33dfbec";
  /* module identifier */
  const __vue_module_identifier__$m = undefined;
  /* functional template */
  const __vue_is_functional_template__$m = false;
  /* style inject SSR */
  

  
  var DataEntryPanel$1 = normalizeComponent_1(
    { render: __vue_render__$m, staticRenderFns: __vue_staticRenderFns__$m },
    __vue_inject_styles__$m,
    __vue_script__$m,
    __vue_scope_id__$m,
    __vue_is_functional_template__$m,
    __vue_module_identifier__$m,
    browser,
    undefined
  );

var DataTableTab = /** @class */ (function (_super) {
    __extends(DataTableTab, _super);
    function DataTableTab() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(DataTableTab.prototype, "matches", {
        /** Get current matches */
        get: function () {
            return this.results ? this.results.results : [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DataTableTab.prototype, "tableStyle", {
        /** Dims results when loading */
        get: function () {
            return { opacity: this.loaded ? 1.0 : 0.3 };
        },
        enumerable: true,
        configurable: true
    });
    /** Update paging values and run query */
    DataTableTab.prototype.onPagingUpdated = function (paging) {
        this.$emit("pagingUpdated", paging);
    };
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", String)
    ], DataTableTab.prototype, "tabkey", void 0);
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", Array)
    ], DataTableTab.prototype, "headers", void 0);
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", Array)
    ], DataTableTab.prototype, "pageSizes", void 0);
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", String)
    ], DataTableTab.prototype, "noDataText", void 0);
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", String)
    ], DataTableTab.prototype, "loadingMessage", void 0);
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", Boolean)
    ], DataTableTab.prototype, "loaded", void 0);
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", Object)
    ], DataTableTab.prototype, "results", void 0);
    DataTableTab = __decorate([
        sitewhereIdeCommon.Component({
            components: {
                Pager: Pager$1,
                LoadingOverlay: LoadingOverlay$1
            }
        })
    ], DataTableTab);
    return DataTableTab;
}(Vue));

/* script */
const __vue_script__$n = DataTableTab;

/* template */
var __vue_render__$n = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-tab-item",
    { key: _vm.tabkey },
    [
      _c("div", { staticClass: "flex-rows" }, [
        _c("div", { staticClass: "tab-header" }, [_vm._t("header")], 2),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "tab-content" },
          [
            _c(
              "v-layout",
              { attrs: { row: "", wrap: "" } },
              [
                _c(
                  "v-flex",
                  { attrs: { xs12: "" } },
                  [
                    _c("v-data-table", {
                      style: _vm.tableStyle,
                      attrs: {
                        headers: _vm.headers,
                        items: _vm.matches,
                        "hide-actions": true,
                        "no-data-text": _vm.noDataText
                      },
                      scopedSlots: _vm._u(
                        [
                          _vm._l(_vm.$scopedSlots, function(_, slot) {
                            return {
                              key: slot,
                              fn: function(scope) {
                                return [_vm._t(slot, null, null, scope)]
                              }
                            }
                          })
                        ],
                        null,
                        true
                      )
                    })
                  ],
                  1
                )
              ],
              1
            )
          ],
          1
        ),
        _vm._v(" "),
        _c(
          "div",
          { staticClass: "tab-footer" },
          [
            _c("pager", {
              attrs: { results: _vm.results, pageSizes: _vm.pageSizes },
              on: { pagingUpdated: _vm.onPagingUpdated }
            })
          ],
          1
        )
      ]),
      _vm._v(" "),
      !_vm.loaded
        ? _c("loading-overlay", {
            attrs: { loadingMessage: _vm.loadingMessage }
          })
        : _vm._e(),
      _vm._v(" "),
      _vm._t("dialogs")
    ],
    2
  )
};
var __vue_staticRenderFns__$n = [];
__vue_render__$n._withStripped = true;

  /* style */
  const __vue_inject_styles__$n = function (inject) {
    if (!inject) return
    inject("data-v-1a035a38_0", { source: "\n.flex-rows[data-v-1a035a38] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  height: 100%;\n}\n.tab-header[data-v-1a035a38] {\r\n  flex: 0;\n}\n.tab-content[data-v-1a035a38] {\r\n  flex: 1;\r\n  background-color: #eee;\r\n  overflow-y: auto;\n}\n.tab-footer[data-v-1a035a38] {\r\n  flex: 0;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\navigation\\DataTableTab.vue"],"names":[],"mappings":";AA0EA;EACA,aAAA;EACA,sBAAA;EACA,YAAA;AACA;AACA;EACA,OAAA;AACA;AACA;EACA,OAAA;EACA,sBAAA;EACA,gBAAA;AACA;AACA;EACA,OAAA;AACA","file":"DataTableTab.vue","sourcesContent":["<template>\r\n  <v-tab-item :key=\"tabkey\">\r\n    <div class=\"flex-rows\">\r\n      <div class=\"tab-header\">\r\n        <slot name=\"header\"/>\r\n      </div>\r\n      <div class=\"tab-content\">\r\n        <v-layout row wrap>\r\n          <v-flex xs12>\r\n            <v-data-table\r\n              :headers=\"headers\"\r\n              :items=\"matches\"\r\n              :hide-actions=\"true\"\r\n              :no-data-text=\"noDataText\"\r\n              :style=\"tableStyle\"\r\n            >\r\n              <template v-for=\"(_, slot) of $scopedSlots\" v-slot:[slot]=\"scope\">\r\n                <slot :name=\"slot\" v-bind=\"scope\"/>\r\n              </template>\r\n            </v-data-table>\r\n          </v-flex>\r\n        </v-layout>\r\n      </div>\r\n      <div class=\"tab-footer\">\r\n        <pager :results=\"results\" @pagingUpdated=\"onPagingUpdated\" :pageSizes=\"pageSizes\"/>\r\n      </div>\r\n    </div>\r\n    <loading-overlay v-if=\"!loaded\" :loadingMessage=\"loadingMessage\"/>\r\n    <slot name=\"dialogs\"></slot>\r\n  </v-tab-item>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\nimport { Component, Prop } from \"sitewhere-ide-common\";\r\n\r\nimport Pager from \"../list/Pager.vue\";\r\nimport LoadingOverlay from \"../common/LoadingOverlay.vue\";\r\n\r\nimport { IPaging, IPageSizes, ITableHeaders } from \"sitewhere-ide-common\";\r\n\r\n@Component({\r\n  components: {\r\n    Pager,\r\n    LoadingOverlay\r\n  }\r\n})\r\nexport default class DataTableTab extends Vue {\r\n  @Prop() readonly tabkey!: string;\r\n  @Prop() readonly headers!: ITableHeaders;\r\n  @Prop() readonly pageSizes!: IPageSizes;\r\n  @Prop() readonly noDataText!: string;\r\n  @Prop() readonly loadingMessage!: string;\r\n  @Prop() readonly loaded!: boolean;\r\n  @Prop() readonly results!: { numResults: number; results: {}[] };\r\n\r\n  /** Get current matches */\r\n  get matches(): {}[] {\r\n    return this.results ? this.results.results : [];\r\n  }\r\n\r\n  /** Dims results when loading */\r\n  get tableStyle(): {} {\r\n    return { opacity: this.loaded ? 1.0 : 0.3 };\r\n  }\r\n\r\n  /** Update paging values and run query */\r\n  onPagingUpdated(paging: IPaging) {\r\n    this.$emit(\"pagingUpdated\", paging);\r\n  }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.flex-rows {\r\n  display: flex;\r\n  flex-direction: column;\r\n  height: 100%;\r\n}\r\n.tab-header {\r\n  flex: 0;\r\n}\r\n.tab-content {\r\n  flex: 1;\r\n  background-color: #eee;\r\n  overflow-y: auto;\r\n}\r\n.tab-footer {\r\n  flex: 0;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$n = "data-v-1a035a38";
  /* module identifier */
  const __vue_module_identifier__$n = undefined;
  /* functional template */
  const __vue_is_functional_template__$n = false;
  /* style inject SSR */
  

  
  var DataTableTab$1 = normalizeComponent_1(
    { render: __vue_render__$n, staticRenderFns: __vue_staticRenderFns__$n },
    __vue_inject_styles__$n,
    __vue_script__$n,
    __vue_scope_id__$n,
    __vue_is_functional_template__$n,
    __vue_module_identifier__$n,
    browser,
    undefined
  );

var DetailPage = /** @class */ (function (_super) {
    __extends(DetailPage, _super);
    function DetailPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.active = null;
        return _this;
    }
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", String)
    ], DetailPage.prototype, "icon", void 0);
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", String)
    ], DetailPage.prototype, "title", void 0);
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", String)
    ], DetailPage.prototype, "loadingMessage", void 0);
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", Boolean)
    ], DetailPage.prototype, "loaded", void 0);
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", Object)
    ], DetailPage.prototype, "record", void 0);
    DetailPage = __decorate([
        sitewhereIdeCommon.Component({
            components: {
                NavigationPage: NavigationPage$1
            }
        })
    ], DetailPage);
    return DetailPage;
}(Vue));

/* script */
const __vue_script__$o = DetailPage;

/* template */
var __vue_render__$o = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "navigation-page",
    {
      attrs: {
        icon: _vm.icon,
        title: _vm.title,
        loadingMessage: _vm.loadingMessage,
        loaded: _vm.loaded
      }
    },
    [
      _c("template", { slot: "header" }, [_vm._t("header")], 2),
      _vm._v(" "),
      _vm.record
        ? _c("template", { slot: "content" }, [
            _c(
              "div",
              { staticClass: "flex-rows" },
              [
                _c(
                  "v-tabs",
                  {
                    staticClass: "tabs-row",
                    model: {
                      value: _vm.active,
                      callback: function($$v) {
                        _vm.active = $$v;
                      },
                      expression: "active"
                    }
                  },
                  [_vm._t("tabs")],
                  2
                ),
                _vm._v(" "),
                _c(
                  "v-tabs-items",
                  {
                    staticClass: "tab-items-row",
                    model: {
                      value: _vm.active,
                      callback: function($$v) {
                        _vm.active = $$v;
                      },
                      expression: "active"
                    }
                  },
                  [_vm._t("tab-items")],
                  2
                )
              ],
              1
            )
          ])
        : _vm._e(),
      _vm._v(" "),
      _c("template", { slot: "actions" }, [_vm._t("actions")], 2),
      _vm._v(" "),
      _c("template", { slot: "dialogs" }, [_vm._t("dialogs")], 2)
    ],
    2
  )
};
var __vue_staticRenderFns__$o = [];
__vue_render__$o._withStripped = true;

  /* style */
  const __vue_inject_styles__$o = function (inject) {
    if (!inject) return
    inject("data-v-2470e10a_0", { source: "\n.flex-rows[data-v-2470e10a] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  height: 100%;\n}\n.tabs-row[data-v-2470e10a] {\r\n  flex: 0;\n}\n.tab-items-row[data-v-2470e10a] {\r\n  flex: 1;\r\n  overflow-y: auto;\n}\n.tab-items-row[data-v-2470e10a] .v-window__container,\r\n.tab-items-row[data-v-2470e10a] .v-window-item {\r\n  height: 100%;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\navigation\\DetailPage.vue"],"names":[],"mappings":";AA+CA;EACA,aAAA;EACA,sBAAA;EACA,YAAA;AACA;AACA;EACA,OAAA;AACA;AACA;EACA,OAAA;EACA,gBAAA;AACA;AACA;;EAEA,YAAA;AACA","file":"DetailPage.vue","sourcesContent":["<template>\r\n  <navigation-page :icon=\"icon\" :title=\"title\" :loadingMessage=\"loadingMessage\" :loaded=\"loaded\">\r\n    <template slot=\"header\">\r\n      <slot name=\"header\"/>\r\n    </template>\r\n    <template v-if=\"record\" slot=\"content\">\r\n      <div class=\"flex-rows\">\r\n        <v-tabs class=\"tabs-row\" v-model=\"active\">\r\n          <slot name=\"tabs\"/>\r\n        </v-tabs>\r\n        <v-tabs-items class=\"tab-items-row\" v-model=\"active\">\r\n          <slot name=\"tab-items\"/>\r\n        </v-tabs-items>\r\n      </div>\r\n    </template>\r\n    <template slot=\"actions\">\r\n      <slot name=\"actions\"/>\r\n    </template>\r\n    <template slot=\"dialogs\">\r\n      <slot name=\"dialogs\"/>\r\n    </template>\r\n  </navigation-page>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\nimport { Component, Prop } from \"sitewhere-ide-common\";\r\n\r\nimport NavigationPage from \"../navigation/NavigationPage.vue\";\r\n\r\n@Component({\r\n  components: {\r\n    NavigationPage\r\n  }\r\n})\r\nexport default class DetailPage extends Vue {\r\n  @Prop() readonly icon!: string;\r\n  @Prop() readonly title!: string;\r\n  @Prop() readonly loadingMessage!: string;\r\n  @Prop() readonly loaded!: boolean;\r\n  @Prop() readonly record!: {};\r\n\r\n  active: string | null = null;\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.flex-rows {\r\n  display: flex;\r\n  flex-direction: column;\r\n  height: 100%;\r\n}\r\n.tabs-row {\r\n  flex: 0;\r\n}\r\n.tab-items-row {\r\n  flex: 1;\r\n  overflow-y: auto;\r\n}\r\n.tab-items-row >>> .v-window__container,\r\n.tab-items-row >>> .v-window-item {\r\n  height: 100%;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$o = "data-v-2470e10a";
  /* module identifier */
  const __vue_module_identifier__$o = undefined;
  /* functional template */
  const __vue_is_functional_template__$o = false;
  /* style inject SSR */
  

  
  var DetailPage$1 = normalizeComponent_1(
    { render: __vue_render__$o, staticRenderFns: __vue_staticRenderFns__$o },
    __vue_inject_styles__$o,
    __vue_script__$o,
    __vue_scope_id__$o,
    __vue_is_functional_template__$o,
    __vue_module_identifier__$o,
    browser,
    undefined
  );

var NavigationHeaderLeft = /** @class */ (function (_super) {
    __extends(NavigationHeaderLeft, _super);
    function NavigationHeaderLeft() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NavigationHeaderLeft = __decorate([
        sitewhereIdeCommon.Component({})
    ], NavigationHeaderLeft);
    return NavigationHeaderLeft;
}(Vue));

/* script */
const __vue_script__$p = NavigationHeaderLeft;

/* template */
var __vue_render__$p = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-card",
    {
      staticStyle: { position: "relative", height: "100%" },
      attrs: { flat: "" }
    },
    [
      _vm._t("default"),
      _vm._v(" "),
      _c("div", { staticClass: "right-overlay" }, [_vm._t("right-overlay")], 2)
    ],
    2
  )
};
var __vue_staticRenderFns__$p = [];
__vue_render__$p._withStripped = true;

  /* style */
  const __vue_inject_styles__$p = function (inject) {
    if (!inject) return
    inject("data-v-f78ad04a_0", { source: "\n.right-overlay[data-v-f78ad04a] {\r\n  position: absolute;\r\n  right: 0;\r\n  top: 0;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\navigation\\NavigationHeaderLeft.vue"],"names":[],"mappings":";AAkBA;EACA,kBAAA;EACA,QAAA;EACA,MAAA;AACA","file":"NavigationHeaderLeft.vue","sourcesContent":["<template>\r\n  <v-card flat style=\"position: relative; height: 100%\">\r\n    <slot />\r\n    <div class=\"right-overlay\">\r\n      <slot name=\"right-overlay\" />\r\n    </div>\r\n  </v-card>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\nimport { Component, Prop } from \"sitewhere-ide-common\";\r\n\r\n@Component({})\r\nexport default class NavigationHeaderLeft extends Vue {}\r\n</script>\r\n\r\n<style scoped>\r\n.right-overlay {\r\n  position: absolute;\r\n  right: 0;\r\n  top: 0;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$p = "data-v-f78ad04a";
  /* module identifier */
  const __vue_module_identifier__$p = undefined;
  /* functional template */
  const __vue_is_functional_template__$p = false;
  /* style inject SSR */
  

  
  var NavigationHeaderLeft$1 = normalizeComponent_1(
    { render: __vue_render__$p, staticRenderFns: __vue_staticRenderFns__$p },
    __vue_inject_styles__$p,
    __vue_script__$p,
    __vue_scope_id__$p,
    __vue_is_functional_template__$p,
    __vue_module_identifier__$p,
    browser,
    undefined
  );

var HeaderBrandingPanel = /** @class */ (function (_super) {
    __extends(HeaderBrandingPanel, _super);
    function HeaderBrandingPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(HeaderBrandingPanel.prototype, "imageUrl", {
        /** Accessor for image URL */
        get: function () {
            return this.entity ? this.entity.imageUrl : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeaderBrandingPanel.prototype, "icon", {
        /** Accessor for icon */
        get: function () {
            return this.entity ? this.entity.icon : null;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(HeaderBrandingPanel.prototype, "imageStyle", {
        // Compute style of image.
        get: function () {
            return {
                "background-color": "#fff",
                "background-image": "url(" + this.entity.imageUrl + ")",
                "background-size": "contain",
                "background-repeat": "no-repeat",
                "background-position": "50% 50%"
            };
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", Object)
    ], HeaderBrandingPanel.prototype, "entity", void 0);
    HeaderBrandingPanel = __decorate([
        sitewhereIdeCommon.Component({
            components: {
                NavigationHeaderLeft: NavigationHeaderLeft$1
            }
        })
    ], HeaderBrandingPanel);
    return HeaderBrandingPanel;
}(Vue));

/* script */
const __vue_script__$q = HeaderBrandingPanel;

/* template */
var __vue_render__$q = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("navigation-header-left", [
    _vm.imageUrl
      ? _c("span", { staticClass: "header-image", style: _vm.imageStyle })
      : _vm.icon
      ? _c(
          "span",
          { staticClass: "header-icon" },
          [
            _c("font-awesome-icon", {
              staticClass: "grey--text",
              attrs: { icon: _vm.icon, size: "7x" }
            })
          ],
          1
        )
      : _c("span", [_vm._v("No Branding")])
  ])
};
var __vue_staticRenderFns__$q = [];
__vue_render__$q._withStripped = true;

  /* style */
  const __vue_inject_styles__$q = function (inject) {
    if (!inject) return
    inject("data-v-6e6bb7a6_0", { source: "\n.header-image[data-v-6e6bb7a6] {\r\n  position: absolute;\r\n  top: 0px;\r\n  left: 0px;\r\n  bottom: 0px;\r\n  right: 0px;\n}\n.header-icon[data-v-6e6bb7a6] {\r\n  position: absolute;\r\n  top: 0px;\r\n  left: 0px;\r\n  bottom: 0px;\r\n  right: 0px;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\navigation\\HeaderBrandingPanel.vue"],"names":[],"mappings":";AAkDA;EACA,kBAAA;EACA,QAAA;EACA,SAAA;EACA,WAAA;EACA,UAAA;AACA;AAEA;EACA,kBAAA;EACA,QAAA;EACA,SAAA;EACA,WAAA;EACA,UAAA;AACA","file":"HeaderBrandingPanel.vue","sourcesContent":["<template>\r\n  <navigation-header-left>\r\n    <span v-if=\"imageUrl\" class=\"header-image\" :style=\"imageStyle\" />\r\n    <span v-else-if=\"icon\" class=\"header-icon\">\r\n      <font-awesome-icon class=\"grey--text\" :icon=\"icon\" size=\"7x\" />\r\n    </span>\r\n    <span v-else>No Branding</span>\r\n  </navigation-header-left>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\nimport { Component, Prop } from \"sitewhere-ide-common\";\r\n\r\nimport NavigationHeaderLeft from \"./NavigationHeaderLeft.vue\";\r\n\r\nimport { IBrandedEntity } from \"sitewhere-rest-api\";\r\n\r\n@Component({\r\n  components: {\r\n    NavigationHeaderLeft\r\n  }\r\n})\r\nexport default class HeaderBrandingPanel extends Vue {\r\n  @Prop() readonly entity!: IBrandedEntity;\r\n\r\n  /** Accessor for image URL */\r\n  get imageUrl() {\r\n    return this.entity ? this.entity.imageUrl : null;\r\n  }\r\n\r\n  /** Accessor for icon */\r\n  get icon() {\r\n    return this.entity ? this.entity.icon : null;\r\n  }\r\n\r\n  // Compute style of image.\r\n  get imageStyle() {\r\n    return {\r\n      \"background-color\": \"#fff\",\r\n      \"background-image\": \"url(\" + this.entity.imageUrl + \")\",\r\n      \"background-size\": \"contain\",\r\n      \"background-repeat\": \"no-repeat\",\r\n      \"background-position\": \"50% 50%\"\r\n    };\r\n  }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.header-image {\r\n  position: absolute;\r\n  top: 0px;\r\n  left: 0px;\r\n  bottom: 0px;\r\n  right: 0px;\r\n}\r\n\r\n.header-icon {\r\n  position: absolute;\r\n  top: 0px;\r\n  left: 0px;\r\n  bottom: 0px;\r\n  right: 0px;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$q = "data-v-6e6bb7a6";
  /* module identifier */
  const __vue_module_identifier__$q = undefined;
  /* functional template */
  const __vue_is_functional_template__$q = false;
  /* style inject SSR */
  

  
  var HeaderBrandingPanel$1 = normalizeComponent_1(
    { render: __vue_render__$q, staticRenderFns: __vue_staticRenderFns__$q },
    __vue_inject_styles__$q,
    __vue_script__$q,
    __vue_scope_id__$q,
    __vue_is_functional_template__$q,
    __vue_module_identifier__$q,
    browser,
    undefined
  );

var InAppFooter = /** @class */ (function (_super) {
    __extends(InAppFooter, _super);
    function InAppFooter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InAppFooter = __decorate([
        sitewhereIdeCommon.Component({})
    ], InAppFooter);
    return InAppFooter;
}(Vue));

/* script */
const __vue_script__$r = InAppFooter;

/* template */
var __vue_render__$r = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("v-footer", { attrs: { app: "" } }, [
    _c("div", { staticClass: "footer-content" }, [
      _c("span", [_vm._v("Footer content goes here..")])
    ])
  ])
};
var __vue_staticRenderFns__$r = [];
__vue_render__$r._withStripped = true;

  /* style */
  const __vue_inject_styles__$r = function (inject) {
    if (!inject) return
    inject("data-v-b556a29e_0", { source: "\n.footer-content[data-v-b556a29e] {\r\n  border-top: 1px solid #ddd;\r\n  width: 100%;\r\n  height: 100%;\r\n  color: #666;\r\n  padding: 7px;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\navigation\\InAppFooter.vue"],"names":[],"mappings":";AAiBA;EACA,0BAAA;EACA,WAAA;EACA,YAAA;EACA,WAAA;EACA,YAAA;AACA","file":"InAppFooter.vue","sourcesContent":["<template>\r\n  <v-footer app>\r\n    <div class=\"footer-content\">\r\n      <span>Footer content goes here..</span>\r\n    </div>\r\n  </v-footer>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\nimport { Component } from \"sitewhere-ide-common\";\r\n\r\n@Component({})\r\nexport default class InAppFooter extends Vue {}\r\n</script>\r\n\r\n<style scoped>\r\n.footer-content {\r\n  border-top: 1px solid #ddd;\r\n  width: 100%;\r\n  height: 100%;\r\n  color: #666;\r\n  padding: 7px;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$r = "data-v-b556a29e";
  /* module identifier */
  const __vue_module_identifier__$r = undefined;
  /* functional template */
  const __vue_is_functional_template__$r = false;
  /* style inject SSR */
  

  
  var InAppFooter$1 = normalizeComponent_1(
    { render: __vue_render__$r, staticRenderFns: __vue_staticRenderFns__$r },
    __vue_inject_styles__$r,
    __vue_script__$r,
    __vue_scope_id__$r,
    __vue_is_functional_template__$r,
    __vue_module_identifier__$r,
    browser,
    undefined
  );

var InAppSystemBar = /** @class */ (function (_super) {
    __extends(InAppSystemBar, _super);
    function InAppSystemBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.title = Electron.remote.getCurrentWindow().getTitle();
        return _this;
    }
    InAppSystemBar.prototype.openWebTools = function () {
        Electron.remote.getCurrentWebContents().openDevTools();
    };
    InAppSystemBar.prototype.minWindow = function () {
        Electron.remote.getCurrentWindow().minimize();
    };
    InAppSystemBar.prototype.maxWindow = function () {
        Electron.remote.getCurrentWindow().maximize();
    };
    InAppSystemBar.prototype.closeWindow = function () {
        Electron.remote.getCurrentWindow().close();
        Electron.app.quit();
    };
    InAppSystemBar = __decorate([
        sitewhereIdeCommon.Component({})
    ], InAppSystemBar);
    return InAppSystemBar;
}(Vue));

/* script */
const __vue_script__$s = InAppSystemBar;

/* template */
var __vue_render__$s = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-system-bar",
    { staticClass: "title-bar", attrs: { color: "#444" } },
    [
      _c(
        "v-btn",
        {
          staticClass: "ma-0 title-bar-button",
          attrs: { flat: "", icon: "", small: "" },
          on: { click: _vm.openWebTools }
        },
        [_c("v-icon", { attrs: { color: "white" } }, [_vm._v("menu")])],
        1
      ),
      _vm._v(" "),
      _c("span", { staticClass: "system-bar-title" }, [
        _vm._v(_vm._s(_vm.title))
      ]),
      _vm._v(" "),
      _c("v-spacer"),
      _vm._v(" "),
      _c(
        "v-btn",
        {
          staticClass: "ma-0 title-bar-button",
          attrs: { flat: "", icon: "", small: "" },
          on: { click: _vm.minWindow }
        },
        [_c("v-icon", { attrs: { color: "white" } }, [_vm._v("remove")])],
        1
      ),
      _vm._v(" "),
      _c(
        "v-btn",
        {
          staticClass: "ma-0 title-bar-button",
          attrs: { flat: "", icon: "", small: "" },
          on: { click: _vm.maxWindow }
        },
        [
          _c("v-icon", { attrs: { color: "white" } }, [
            _vm._v("check_box_outline_blank")
          ])
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-btn",
        {
          staticClass: "ma-0 title-bar-button",
          attrs: { flat: "", icon: "", small: "" },
          on: { click: _vm.closeWindow }
        },
        [_c("v-icon", { attrs: { color: "white" } }, [_vm._v("close")])],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$s = [];
__vue_render__$s._withStripped = true;

  /* style */
  const __vue_inject_styles__$s = function (inject) {
    if (!inject) return
    inject("data-v-660b8b92_0", { source: "\n.title-bar-button[data-v-660b8b92] {\r\n  -webkit-app-region: no-drag;\n}\n.system-bar-title[data-v-660b8b92] {\r\n  color: #eee;\r\n  margin-left: 10px;\r\n  margin-right: 10px;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\navigation\\InAppSystemBar.vue"],"names":[],"mappings":";AAiDA;EACA,2BAAA;AACA;AACA;EACA,WAAA;EACA,iBAAA;EACA,kBAAA;AACA","file":"InAppSystemBar.vue","sourcesContent":["<template>\r\n  <v-system-bar color=\"#444\" class=\"title-bar\">\r\n    <v-btn flat icon small class=\"ma-0 title-bar-button\" @click=\"openWebTools\">\r\n      <v-icon color=\"white\">menu</v-icon>\r\n    </v-btn>\r\n    <span class=\"system-bar-title\">{{ title }}</span>\r\n    <v-spacer></v-spacer>\r\n    <v-btn flat icon small class=\"ma-0 title-bar-button\" @click=\"minWindow\">\r\n      <v-icon color=\"white\">remove</v-icon>\r\n    </v-btn>\r\n    <v-btn flat icon small class=\"ma-0 title-bar-button\" @click=\"maxWindow\">\r\n      <v-icon color=\"white\">check_box_outline_blank</v-icon>\r\n    </v-btn>\r\n    <v-btn flat icon small class=\"ma-0 title-bar-button\" @click=\"closeWindow\">\r\n      <v-icon color=\"white\">close</v-icon>\r\n    </v-btn>\r\n  </v-system-bar>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\nimport { Component } from \"sitewhere-ide-common\";\r\n\r\nimport Electron from \"electron\";\r\n\r\n@Component({})\r\nexport default class InAppSystemBar extends Vue {\r\n  title: string = Electron.remote.getCurrentWindow().getTitle();\r\n\r\n  openWebTools() {\r\n    Electron.remote.getCurrentWebContents().openDevTools();\r\n  }\r\n\r\n  minWindow() {\r\n    Electron.remote.getCurrentWindow().minimize();\r\n  }\r\n\r\n  maxWindow() {\r\n    Electron.remote.getCurrentWindow().maximize();\r\n  }\r\n\r\n  closeWindow() {\r\n    Electron.remote.getCurrentWindow().close();\r\n    Electron.app.quit();\r\n  }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.title-bar-button {\r\n  -webkit-app-region: no-drag;\r\n}\r\n.system-bar-title {\r\n  color: #eee;\r\n  margin-left: 10px;\r\n  margin-right: 10px;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$s = "data-v-660b8b92";
  /* module identifier */
  const __vue_module_identifier__$s = undefined;
  /* functional template */
  const __vue_is_functional_template__$s = false;
  /* style inject SSR */
  

  
  var InAppSystemBar$1 = normalizeComponent_1(
    { render: __vue_render__$s, staticRenderFns: __vue_staticRenderFns__$s },
    __vue_inject_styles__$s,
    __vue_script__$s,
    __vue_scope_id__$s,
    __vue_is_functional_template__$s,
    __vue_module_identifier__$s,
    browser,
    undefined
  );

//

var script$9 = {
  data: () => ({
    sites: null,
    drawerEdit: true
  }),

  props: ["sections"],

  methods: {
    // Determines whether user is authorized for section.
    isAuthForSection: function(section) {
      if (section.requireAll) {
        return isAuthForAll(this, section.requireAll);
      }
      return true;
    },

    onSectionClicked: function(section) {
      console.log("Section clicked", section);
      this.$emit("sectionSelected", section);
    }
  }
};

/* script */
const __vue_script__$t = script$9;

/* template */
var __vue_render__$t = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _vm.sections
    ? _c(
        "v-list",
        { attrs: { dense: "" } },
        _vm._l(_vm.sections, function(section) {
          return _c(
            "v-list-group",
            {
              key: section.id,
              attrs: {
                "prepend-icon": section.icon,
                "append-icon": section.subsections
                  ? "$vuetify.icons.expand"
                  : "",
                "no-action": ""
              },
              scopedSlots: _vm._u(
                [
                  {
                    key: "activator",
                    fn: function() {
                      return [
                        _c(
                          "v-list-tile",
                          {
                            on: {
                              click: function($event) {
                                return _vm.onSectionClicked(section)
                              }
                            }
                          },
                          [
                            _c(
                              "v-list-tile-content",
                              [
                                _c("v-list-tile-title", [
                                  _vm._v(_vm._s(section.title))
                                ])
                              ],
                              1
                            )
                          ],
                          1
                        )
                      ]
                    },
                    proxy: true
                  }
                ],
                null,
                true
              ),
              model: {
                value: section.active,
                callback: function($$v) {
                  _vm.$set(section, "active", $$v);
                },
                expression: "section.active"
              }
            },
            [
              _vm._v(" "),
              _vm._l(section.subsections, function(subsection) {
                return _c(
                  "v-list-tile",
                  {
                    key: subsection.id,
                    on: {
                      click: function($event) {
                        return _vm.onSectionClicked(subsection)
                      }
                    }
                  },
                  [
                    _c(
                      "v-list-tile-content",
                      [
                        _c("v-list-tile-title", [
                          _vm._v(_vm._s(subsection.title))
                        ])
                      ],
                      1
                    ),
                    _vm._v(" "),
                    _c(
                      "v-list-tile-action",
                      [_c("v-icon", [_vm._v(_vm._s(subsection.icon))])],
                      1
                    )
                  ],
                  1
                )
              })
            ],
            2
          )
        }),
        1
      )
    : _vm._e()
};
var __vue_staticRenderFns__$t = [];
__vue_render__$t._withStripped = true;

  /* style */
  const __vue_inject_styles__$t = function (inject) {
    if (!inject) return
    inject("data-v-7dcd91c0_0", { source: "\n.list__tile__action[data-v-7dcd91c0] {\r\n  min-width: 30px;\n}\n.list__tile__title[data-v-7dcd91c0] {\r\n  font-size: 16px;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\navigation\\Navigation.vue"],"names":[],"mappings":";AA+DA;EACA,eAAA;AACA;AACA;EACA,eAAA;AACA","file":"Navigation.vue","sourcesContent":["<template>\r\n  <v-list v-if=\"sections\" dense>\r\n    <v-list-group\r\n      v-for=\"section in sections\"\r\n      :key=\"section.id\"\r\n      v-model=\"section.active\"\r\n      :prepend-icon=\"section.icon\"\r\n      :append-icon=\"section.subsections ? '$vuetify.icons.expand' : ''\"\r\n      no-action\r\n    >\r\n      <template v-slot:activator>\r\n        <v-list-tile @click=\"onSectionClicked(section)\">\r\n          <v-list-tile-content>\r\n            <v-list-tile-title>{{ section.title }}</v-list-tile-title>\r\n          </v-list-tile-content>\r\n        </v-list-tile>\r\n      </template>\r\n\r\n      <v-list-tile\r\n        @click=\"onSectionClicked(subsection)\"\r\n        v-for=\"subsection in section.subsections\"\r\n        :key=\"subsection.id\"\r\n      >\r\n        <v-list-tile-content>\r\n          <v-list-tile-title>{{ subsection.title }}</v-list-tile-title>\r\n        </v-list-tile-content>\r\n        <v-list-tile-action>\r\n          <v-icon>{{ subsection.icon }}</v-icon>\r\n        </v-list-tile-action>\r\n      </v-list-tile>\r\n    </v-list-group>\r\n  </v-list>\r\n</template>\r\n\r\n<script>\r\nimport { isAuthForAll } from \"../common/Utils\";\r\n\r\nexport default {\r\n  data: () => ({\r\n    sites: null,\r\n    drawerEdit: true\r\n  }),\r\n\r\n  props: [\"sections\"],\r\n\r\n  methods: {\r\n    // Determines whether user is authorized for section.\r\n    isAuthForSection: function(section) {\r\n      if (section.requireAll) {\r\n        return isAuthForAll(this, section.requireAll);\r\n      }\r\n      return true;\r\n    },\r\n\r\n    onSectionClicked: function(section) {\r\n      console.log(\"Section clicked\", section);\r\n      this.$emit(\"sectionSelected\", section);\r\n    }\r\n  }\r\n};\r\n</script>\r\n\r\n<style scoped>\r\n.list__tile__action {\r\n  min-width: 30px;\r\n}\r\n.list__tile__title {\r\n  font-size: 16px;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$t = "data-v-7dcd91c0";
  /* module identifier */
  const __vue_module_identifier__$t = undefined;
  /* functional template */
  const __vue_is_functional_template__$t = false;
  /* style inject SSR */
  

  
  var Navigation = normalizeComponent_1(
    { render: __vue_render__$t, staticRenderFns: __vue_staticRenderFns__$t },
    __vue_inject_styles__$t,
    __vue_script__$t,
    __vue_scope_id__$t,
    __vue_is_functional_template__$t,
    __vue_module_identifier__$t,
    browser,
    undefined
  );

var NavigationActionButton = /** @class */ (function (_super) {
    __extends(NavigationActionButton, _super);
    function NavigationActionButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NavigationActionButton.prototype.onAction = function () {
        this.$emit("action");
    };
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", String)
    ], NavigationActionButton.prototype, "icon", void 0);
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", String)
    ], NavigationActionButton.prototype, "tooltip", void 0);
    __decorate([
        sitewhereIdeCommon.Prop({ default: false }),
        __metadata("design:type", Boolean)
    ], NavigationActionButton.prototype, "material", void 0);
    NavigationActionButton = __decorate([
        sitewhereIdeCommon.Component({})
    ], NavigationActionButton);
    return NavigationActionButton;
}(Vue));

/* script */
const __vue_script__$u = NavigationActionButton;

/* template */
var __vue_render__$u = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-tooltip",
    { attrs: { left: "" } },
    [
      _vm.material
        ? _c(
            "v-icon",
            {
              staticClass: "ma-0 ml-1 navbutton",
              attrs: { slot: "activator" },
              on: { click: _vm.onAction },
              slot: "activator"
            },
            [_vm._v(_vm._s(_vm.icon))]
          )
        : _c("font-awesome-icon", {
            staticClass: "ma-1 navbutton",
            attrs: { slot: "activator", icon: _vm.icon },
            on: { click: _vm.onAction },
            slot: "activator"
          }),
      _vm._v(" "),
      _c("span", [_vm._v(_vm._s(_vm.tooltip))])
    ],
    1
  )
};
var __vue_staticRenderFns__$u = [];
__vue_render__$u._withStripped = true;

  /* style */
  const __vue_inject_styles__$u = function (inject) {
    if (!inject) return
    inject("data-v-4588e05d_0", { source: "\n.navbutton[data-v-4588e05d] {\r\n  font-size: 22px;\r\n  padding-left: 6px;\r\n  color: #666;\r\n  vertical-align: middle;\n}\n.navbutton[data-v-4588e05d]:hover {\r\n  color: #999;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\navigation\\NavigationActionButton.vue"],"names":[],"mappings":";AAoCA;EACA,eAAA;EACA,iBAAA;EACA,WAAA;EACA,sBAAA;AACA;AACA;EACA,WAAA;AACA","file":"NavigationActionButton.vue","sourcesContent":["<template>\r\n  <v-tooltip left>\r\n    <v-icon\r\n      v-if=\"material\"\r\n      class=\"ma-0 ml-1 navbutton\"\r\n      @click=\"onAction\"\r\n      slot=\"activator\"\r\n    >{{ icon }}</v-icon>\r\n    <font-awesome-icon\r\n      v-else\r\n      class=\"ma-1 navbutton\"\r\n      :icon=\"icon\"\r\n      @click=\"onAction\"\r\n      slot=\"activator\"\r\n    />\r\n    <span>{{ tooltip }}</span>\r\n  </v-tooltip>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\nimport { Component, Prop } from \"sitewhere-ide-common\";\r\n\r\n@Component({})\r\nexport default class NavigationActionButton extends Vue {\r\n  @Prop() readonly icon!: string;\r\n  @Prop() readonly tooltip!: string;\r\n  @Prop({ default: false }) readonly material!: boolean;\r\n\r\n  onAction() {\r\n    this.$emit(\"action\");\r\n  }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.navbutton {\r\n  font-size: 22px;\r\n  padding-left: 6px;\r\n  color: #666;\r\n  vertical-align: middle;\r\n}\r\n.navbutton:hover {\r\n  color: #999;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$u = "data-v-4588e05d";
  /* module identifier */
  const __vue_module_identifier__$u = undefined;
  /* functional template */
  const __vue_is_functional_template__$u = false;
  /* style inject SSR */
  

  
  var NavigationActionButton$1 = normalizeComponent_1(
    { render: __vue_render__$u, staticRenderFns: __vue_staticRenderFns__$u },
    __vue_inject_styles__$u,
    __vue_script__$u,
    __vue_scope_id__$u,
    __vue_is_functional_template__$u,
    __vue_module_identifier__$u,
    browser,
    undefined
  );

var NavigationHeaderPanel = /** @class */ (function (_super) {
    __extends(NavigationHeaderPanel, _super);
    function NavigationHeaderPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(NavigationHeaderPanel.prototype, "panelStyle", {
        // Style for top-level panel.
        get: function () {
            return {
                "min-height": this.height
            };
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        sitewhereIdeCommon.Prop(),
        __metadata("design:type", String)
    ], NavigationHeaderPanel.prototype, "height", void 0);
    NavigationHeaderPanel = __decorate([
        sitewhereIdeCommon.Component({})
    ], NavigationHeaderPanel);
    return NavigationHeaderPanel;
}(Vue));

/* script */
const __vue_script__$v = NavigationHeaderPanel;

/* template */
var __vue_render__$v = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-card",
    {
      staticClass: "white mt-2 mb-3 pr-3 pl-3 header-panel",
      style: _vm.panelStyle,
      attrs: { flat: "" }
    },
    [
      _c("v-card-text", [
        _c("span", { staticClass: "header-left" }, [_vm._t("left")], 2),
        _vm._v(" "),
        _c("span", { staticClass: "header-content" }, [_vm._t("content")], 2),
        _vm._v(" "),
        _c("span", { staticClass: "header-right" }, [_vm._t("right")], 2),
        _vm._v(" "),
        _c("span", { staticClass: "options-menu" }, [_vm._t("options")], 2)
      ])
    ],
    1
  )
};
var __vue_staticRenderFns__$v = [];
__vue_render__$v._withStripped = true;

  /* style */
  const __vue_inject_styles__$v = function (inject) {
    if (!inject) return
    inject("data-v-6b0c2a59_0", { source: "\n.header-panel[data-v-6b0c2a59] {\r\n  min-width: 920px;\r\n  overflow-y: hidden;\n}\n.header-left[data-v-6b0c2a59] {\r\n  position: absolute;\r\n  top: 10px;\r\n  left: 10px;\r\n  bottom: 10px;\r\n  width: 230px;\r\n  height: 100%;\n}\n.header-right[data-v-6b0c2a59] {\r\n  position: absolute;\r\n  top: 10px;\r\n  right: 10px;\r\n  bottom: 10px;\r\n  width: 230px;\r\n  height: 100%;\n}\n.header-content[data-v-6b0c2a59] {\r\n  position: absolute;\r\n  top: 10px;\r\n  left: 250px;\r\n  right: 250px;\r\n  height: 100%;\n}\n.options-menu[data-v-6b0c2a59] {\r\n  position: absolute;\r\n  top: 10px;\r\n  right: 190px;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\navigation\\NavigationHeaderPanel.vue"],"names":[],"mappings":";AAqCA;EACA,gBAAA;EACA,kBAAA;AACA;AAEA;EACA,kBAAA;EACA,SAAA;EACA,UAAA;EACA,YAAA;EACA,YAAA;EACA,YAAA;AACA;AAEA;EACA,kBAAA;EACA,SAAA;EACA,WAAA;EACA,YAAA;EACA,YAAA;EACA,YAAA;AACA;AAEA;EACA,kBAAA;EACA,SAAA;EACA,WAAA;EACA,YAAA;EACA,YAAA;AACA;AAEA;EACA,kBAAA;EACA,SAAA;EACA,YAAA;AACA","file":"NavigationHeaderPanel.vue","sourcesContent":["<template>\r\n  <v-card flat :style=\"panelStyle\" class=\"white mt-2 mb-3 pr-3 pl-3 header-panel\">\r\n    <v-card-text>\r\n      <span class=\"header-left\">\r\n        <slot name=\"left\" />\r\n      </span>\r\n      <span class=\"header-content\">\r\n        <slot name=\"content\" />\r\n      </span>\r\n      <span class=\"header-right\">\r\n        <slot name=\"right\" />\r\n      </span>\r\n      <span class=\"options-menu\">\r\n        <slot name=\"options\" />\r\n      </span>\r\n    </v-card-text>\r\n  </v-card>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\nimport { Component, Prop } from \"sitewhere-ide-common\";\r\n\r\n@Component({})\r\nexport default class NavigationHeaderPanel extends Vue {\r\n  @Prop() readonly height!: string;\r\n\r\n  // Style for top-level panel.\r\n  get panelStyle() {\r\n    return {\r\n      \"min-height\": this.height\r\n    };\r\n  }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.header-panel {\r\n  min-width: 920px;\r\n  overflow-y: hidden;\r\n}\r\n\r\n.header-left {\r\n  position: absolute;\r\n  top: 10px;\r\n  left: 10px;\r\n  bottom: 10px;\r\n  width: 230px;\r\n  height: 100%;\r\n}\r\n\r\n.header-right {\r\n  position: absolute;\r\n  top: 10px;\r\n  right: 10px;\r\n  bottom: 10px;\r\n  width: 230px;\r\n  height: 100%;\r\n}\r\n\r\n.header-content {\r\n  position: absolute;\r\n  top: 10px;\r\n  left: 250px;\r\n  right: 250px;\r\n  height: 100%;\r\n}\r\n\r\n.options-menu {\r\n  position: absolute;\r\n  top: 10px;\r\n  right: 190px;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$v = "data-v-6b0c2a59";
  /* module identifier */
  const __vue_module_identifier__$v = undefined;
  /* functional template */
  const __vue_is_functional_template__$v = false;
  /* style inject SSR */
  

  
  var NavigationHeaderPanel$1 = normalizeComponent_1(
    { render: __vue_render__$v, staticRenderFns: __vue_staticRenderFns__$v },
    __vue_inject_styles__$v,
    __vue_script__$v,
    __vue_scope_id__$v,
    __vue_is_functional_template__$v,
    __vue_module_identifier__$v,
    browser,
    undefined
  );

// Common components.

// Process as Vue plugin.
function SiteWhere(Vue) {
  // Register common components.
  Vue.component("sw-clipboard-copy-field", ClipboardCopyField);
  Vue.component("sw-color-input-field", ColorInputField$1);
  Vue.component("sw-color-picker", ColorPicker);
  Vue.component("sw-date-time-picker", DateTimePicker);
  Vue.component("sw-error-banner", ErrorBanner);
  Vue.component("sw-fab", FloatingActionButton);
  Vue.component("sw-header-field", HeaderField);
  Vue.component("sw-icon-selector", IconSelector);
  Vue.component("sw-image-zoom-on-hover", ImageZoomOnHover$1);
  Vue.component("sw-linked-header-field", LinkedHeaderField);
  Vue.component("sw-loading-overlay", LoadingOverlay$1);

  // Register dialog components.
  Vue.component("sw-base-dialog", BaseDialog$1);
  Vue.component("sw-confirm-dialog", ConfirmDialog);
  Vue.component("sw-delete-dialog", DeleteDialog$1);
  Vue.component("sw-metadata-panel", MetadataPanel$1);

  // Register list components.
  Vue.component("sw-list-entry", ListEntry$1);
  Vue.component("sw-list-layout", ListLayout$1);
  Vue.component("sw-list-page", ListPage$1);
  Vue.component("sw-list-tab", ListTab$1);
  Vue.component("sw-pager", Pager$1);

  // Register navigation components.
  Vue.component("sw-content-tab", ContentTab$1);
  Vue.component("sw-data-entry-panel", DataEntryPanel$1);
  Vue.component("sw-data-table-tab", DataTableTab$1);
  Vue.component("sw-detail-page", DetailPage$1);
  Vue.component("sw-header-branding-panel", HeaderBrandingPanel$1);
  Vue.component("sw-in-app-footer", InAppFooter$1);
  Vue.component("sw-in-app-system-bar", InAppSystemBar$1);
  Vue.component("sw-navigation", Navigation);
  Vue.component("sw-navigation-action-button", NavigationActionButton$1);
  Vue.component("sw-navigation-header-left", NavigationHeaderLeft$1);
  Vue.component("sw-navigation-header-panel", NavigationHeaderPanel$1);
  Vue.component("sw-navigation-page", NavigationPage$1);
}

exports.BaseDialog = BaseDialog$1;
exports.ClipboardCopyField = ClipboardCopyField;
exports.ColorInputField = ColorInputField$1;
exports.ColorPicker = ColorPicker;
exports.ConfirmDialog = ConfirmDialog;
exports.ContentTab = ContentTab$1;
exports.DataEntryPanel = DataEntryPanel$1;
exports.DataTableTab = DataTableTab$1;
exports.DateTimePicker = DateTimePicker;
exports.DeleteDialog = DeleteDialog$1;
exports.DetailPage = DetailPage$1;
exports.ErrorBanner = ErrorBanner;
exports.FloatingActionButton = FloatingActionButton;
exports.HeaderBrandingPanel = HeaderBrandingPanel$1;
exports.HeaderField = HeaderField;
exports.IconSelector = IconSelector;
exports.ImageZoomOnHover = ImageZoomOnHover$1;
exports.InAppFooter = InAppFooter$1;
exports.InAppSystemBar = InAppSystemBar$1;
exports.LinkedHeaderField = LinkedHeaderField;
exports.ListEntry = ListEntry$1;
exports.ListLayout = ListLayout$1;
exports.ListPage = ListPage$1;
exports.ListTab = ListTab$1;
exports.LoadingOverlay = LoadingOverlay$1;
exports.MetadataPanel = MetadataPanel$1;
exports.Navigation = Navigation;
exports.NavigationActionButton = NavigationActionButton$1;
exports.NavigationHeaderLeft = NavigationHeaderLeft$1;
exports.NavigationHeaderPanel = NavigationHeaderPanel$1;
exports.NavigationPage = NavigationPage$1;
exports.Pager = Pager$1;
exports.default = SiteWhere;
