/**
  * SiteWhere IDE Components v0.0.3
  * (c) 2019 SiteWhere LLC
  * @license CPAL-1.0
  */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('sitewhere-ide-common'), require('vue')) :
    typeof define === 'function' && define.amd ? define(['exports', 'sitewhere-ide-common', 'vue'], factory) :
    (global = global || self, factory(global.SiteWhereIdeComponents = {}, global.sitewhereIdeCommon, global.Vue));
}(this, function (exports, sitewhereIdeCommon, Vue) { 'use strict';

    Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

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
    const __vue_script__ = LoadingOverlay;

    /* template */
    var __vue_render__ = function() {
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
    var __vue_staticRenderFns__ = [];
    __vue_render__._withStripped = true;

      /* style */
      const __vue_inject_styles__ = function (inject) {
        if (!inject) return
        inject("data-v-07c26cc4_0", { source: "\n.overlay[data-v-07c26cc4] {\r\n  position: absolute;\r\n  top: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  right: 0;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\common\\LoadingOverlay.vue"],"names":[],"mappings":";AA6BA;EACA,kBAAA;EACA,MAAA;EACA,SAAA;EACA,OAAA;EACA,QAAA;AACA","file":"LoadingOverlay.vue","sourcesContent":["<template>\r\n  <div class=\"overlay\">\r\n    <v-container fill-height>\r\n      <v-layout align-center justify-center column fill-height>\r\n        <v-flex xs5/>\r\n        <v-flex xs1>\r\n          <v-progress-circular size=\"65\" color=\"#666\" class=\"mb-4\" :indeterminate=\"true\"/>\r\n        </v-flex>\r\n        <v-flex xs1>\r\n          <div class=\"subheading\" style=\"color: #666;\">{{ loadingMessage || 'Loading ...' }}</div>\r\n        </v-flex>\r\n        <v-flex xs5/>\r\n      </v-layout>\r\n    </v-container>\r\n  </div>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport { Component, Prop } from \"sitewhere-ide-common\";\r\n\r\nimport Vue from \"vue\";\r\n\r\n@Component({})\r\nexport default class LoadingOverlay extends Vue {\r\n  @Prop() readonly loadingMessage!: string;\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.overlay {\r\n  position: absolute;\r\n  top: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  right: 0;\r\n}\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__ = "data-v-07c26cc4";
      /* module identifier */
      const __vue_module_identifier__ = undefined;
      /* functional template */
      const __vue_is_functional_template__ = false;
      /* style inject SSR */
      

      
      var LoadingOverlay$1 = normalizeComponent_1(
        { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
        __vue_inject_styles__,
        __vue_script__,
        __vue_scope_id__,
        __vue_is_functional_template__,
        __vue_module_identifier__,
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
    const __vue_script__$1 = ListEntry;

    /* template */
    var __vue_render__$1 = function() {
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
    var __vue_staticRenderFns__$1 = [];
    __vue_render__$1._withStripped = true;

      /* style */
      const __vue_inject_styles__$1 = function (inject) {
        if (!inject) return
        inject("data-v-2ee7dd54_0", { source: "\n.list-entry[data-v-2ee7dd54] {\r\n  border: 1px solid #ddd;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\list\\ListEntry.vue"],"names":[],"mappings":";AAeA;EACA,sBAAA;AACA","file":"ListEntry.vue","sourcesContent":["<template>\r\n  <v-card class=\"list-entry\" flat hover>\r\n    <slot/>\r\n  </v-card>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\nimport { Component } from \"sitewhere-ide-common\";\r\n\r\n@Component\r\nexport default class ListEntry extends Vue {}\r\n</script>\r\n\r\n<style scoped>\r\n.list-entry {\r\n  border: 1px solid #ddd;\r\n}\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$1 = "data-v-2ee7dd54";
      /* module identifier */
      const __vue_module_identifier__$1 = undefined;
      /* functional template */
      const __vue_is_functional_template__$1 = false;
      /* style inject SSR */
      

      
      var ListEntry$1 = normalizeComponent_1(
        { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
        __vue_inject_styles__$1,
        __vue_script__$1,
        __vue_scope_id__$1,
        __vue_is_functional_template__$1,
        __vue_module_identifier__$1,
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
    const __vue_script__$2 = ListLayout;

    /* template */
    var __vue_render__$2 = function() {
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
    var __vue_staticRenderFns__$2 = [];
    __vue_render__$2._withStripped = true;

      /* style */
      const __vue_inject_styles__$2 = function (inject) {
        if (!inject) return
        inject("data-v-15fab996_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"ListLayout.vue"}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$2 = "data-v-15fab996";
      /* module identifier */
      const __vue_module_identifier__$2 = undefined;
      /* functional template */
      const __vue_is_functional_template__$2 = false;
      /* style inject SSR */
      

      
      var ListLayout$1 = normalizeComponent_1(
        { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
        __vue_inject_styles__$2,
        __vue_script__$2,
        __vue_scope_id__$2,
        __vue_is_functional_template__$2,
        __vue_module_identifier__$2,
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
    const __vue_script__$3 = NavigationPage;

    /* template */
    var __vue_render__$3 = function() {
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
    var __vue_staticRenderFns__$3 = [];
    __vue_render__$3._withStripped = true;

      /* style */
      const __vue_inject_styles__$3 = function (inject) {
        if (!inject) return
        inject("data-v-380c53f4_0", { source: "\n.flex-rows[data-v-380c53f4] {\r\n  display: flex;\r\n  flex-direction: column;\n}\n.toolbar[data-v-380c53f4] {\r\n  flex: 0;\r\n  z-index: 1;\r\n  color: #333;\n}\n.header[data-v-380c53f4] {\r\n  flex: 0;\r\n  z-index: 1;\n}\n.content[data-v-380c53f4] {\r\n  flex: 1;\r\n  overflow-y: auto;\r\n  z-index: 0;\n}\n.footer[data-v-380c53f4] {\r\n  flex: 0;\r\n  z-index: 1;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\navigation\\NavigationPage.vue"],"names":[],"mappings":";AA0CA;EACA,aAAA;EACA,sBAAA;AACA;AACA;EACA,OAAA;EACA,UAAA;EACA,WAAA;AACA;AACA;EACA,OAAA;EACA,UAAA;AACA;AACA;EACA,OAAA;EACA,gBAAA;EACA,UAAA;AACA;AACA;EACA,OAAA;EACA,UAAA;AACA","file":"NavigationPage.vue","sourcesContent":["<template>\r\n  <v-card class=\"flex-rows\" flat fill-height>\r\n    <v-toolbar class=\"elevation-1 toolbar\" dense>\r\n      <v-icon>{{ icon }}</v-icon>\r\n      <v-toolbar-title class=\"ml-2 subheading\">{{ title }}</v-toolbar-title>\r\n      <v-spacer></v-spacer>\r\n      <slot name=\"actions\"/>\r\n    </v-toolbar>\r\n    <div class=\"header\">\r\n      <slot name=\"header\"/>\r\n    </div>\r\n    <div class=\"content\">\r\n      <slot v-if=\"loaded\" name=\"content\"/>\r\n    </div>\r\n    <div class=\"footer\">\r\n      <slot name=\"footer\"/>\r\n    </div>\r\n    <loading-overlay v-if=\"!loaded\" :loadingMessage=\"loadingMessage\"/>\r\n    <slot name=\"dialogs\"/>\r\n  </v-card>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\nimport { Component, Prop } from \"sitewhere-ide-common\";\r\n\r\nimport LoadingOverlay from \"../common/LoadingOverlay.vue\";\r\n\r\n@Component({\r\n  components: {\r\n    LoadingOverlay\r\n  }\r\n})\r\nexport default class NavigationPage extends Vue {\r\n  @Prop() readonly icon!: string;\r\n  @Prop() readonly title!: string;\r\n  @Prop() readonly loadingMessage!: string;\r\n  @Prop() readonly loaded!: boolean;\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.flex-rows {\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n.toolbar {\r\n  flex: 0;\r\n  z-index: 1;\r\n  color: #333;\r\n}\r\n.header {\r\n  flex: 0;\r\n  z-index: 1;\r\n}\r\n.content {\r\n  flex: 1;\r\n  overflow-y: auto;\r\n  z-index: 0;\r\n}\r\n.footer {\r\n  flex: 0;\r\n  z-index: 1;\r\n}\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$3 = "data-v-380c53f4";
      /* module identifier */
      const __vue_module_identifier__$3 = undefined;
      /* functional template */
      const __vue_is_functional_template__$3 = false;
      /* style inject SSR */
      

      
      var NavigationPage$1 = normalizeComponent_1(
        { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
        __vue_inject_styles__$3,
        __vue_script__$3,
        __vue_scope_id__$3,
        __vue_is_functional_template__$3,
        __vue_module_identifier__$3,
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
    const __vue_script__$4 = Pager;

    /* template */
    var __vue_render__$4 = function() {
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
    var __vue_staticRenderFns__$4 = [];
    __vue_render__$4._withStripped = true;

      /* style */
      const __vue_inject_styles__$4 = function (inject) {
        if (!inject) return
        inject("data-v-5282a815_0", { source: "\n.pager[data-v-5282a815] {\r\n  color: #333;\r\n  background-color: #eee;\r\n  border-top: 1px solid #ccc;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\list\\Pager.vue"],"names":[],"mappings":";AAuOA;EACA,WAAA;EACA,sBAAA;EACA,0BAAA;AACA","file":"Pager.vue","sourcesContent":["<template>\r\n  <div class=\"pager\">\r\n    <slot v-if=\"results && results.numResults === 0\" name=\"noresults\"></slot>\r\n    <v-container class=\"ma-0 pa-0\">\r\n      <v-layout row wrap>\r\n        <v-flex xs2>\r\n          <v-subheader class=\"ma-0 pt-0 pr-0\">Rows per page</v-subheader>\r\n        </v-flex>\r\n        <v-flex xs3>\r\n          <v-btn-toggle v-model=\"pageSize\" class=\"mt-1\">\r\n            <v-btn\r\n              flat\r\n              :value=\"entry.value\"\r\n              v-for=\"entry in pageSizesWithDefaults\"\r\n              :key=\"entry.value\"\r\n            >{{ entry.text }}</v-btn>\r\n          </v-btn-toggle>\r\n        </v-flex>\r\n        <v-flex xs4>\r\n          <v-tooltip top>\r\n            <v-btn\r\n              :disabled=\"!previousEnabled\"\r\n              icon\r\n              light\r\n              class=\"ml-0 mr-0\"\r\n              @click=\"onFirstPage\"\r\n              slot=\"activator\"\r\n            >\r\n              <font-awesome-icon class=\"grey--text text--darken-1\" icon=\"fast-backward\" size=\"lg\"/>\r\n            </v-btn>\r\n            <span>First Page</span>\r\n          </v-tooltip>\r\n          <v-tooltip top>\r\n            <v-btn\r\n              :disabled=\"!previousEnabled\"\r\n              icon\r\n              light\r\n              class=\"ml-0 mr-0\"\r\n              @click=\"onPreviousPage\"\r\n              slot=\"activator\"\r\n            >\r\n              <font-awesome-icon class=\"grey--text text--darken-1\" icon=\"backward\" size=\"lg\"/>\r\n            </v-btn>\r\n            <span>Previous Page</span>\r\n          </v-tooltip>\r\n          <v-tooltip top>\r\n            <v-btn icon light class=\"ml-0 mr-0\" @click=\"onRefresh\" slot=\"activator\">\r\n              <font-awesome-icon class=\"grey--text text--darken-1\" icon=\"sync\" size=\"lg\"/>\r\n            </v-btn>\r\n            <span>Refresh</span>\r\n          </v-tooltip>\r\n          <v-tooltip top>\r\n            <v-btn\r\n              :disabled=\"!nextEnabled\"\r\n              icon\r\n              light\r\n              class=\"ml-0 mr-0\"\r\n              @click=\"onNextPage\"\r\n              slot=\"activator\"\r\n            >\r\n              <font-awesome-icon class=\"grey--text text--darken-1\" icon=\"forward\" size=\"lg\"/>\r\n            </v-btn>\r\n            <span>Next Page</span>\r\n          </v-tooltip>\r\n          <v-tooltip top>\r\n            <v-btn\r\n              :disabled=\"!nextEnabled\"\r\n              icon\r\n              light\r\n              class=\"ml-0 mr-0\"\r\n              @click=\"onLastPage\"\r\n              slot=\"activator\"\r\n            >\r\n              <font-awesome-icon class=\"grey--text text--darken-1\" icon=\"fast-forward\" size=\"lg\"/>\r\n            </v-btn>\r\n            <span>Last Page</span>\r\n          </v-tooltip>\r\n        </v-flex>\r\n        <v-flex xs3>\r\n          <v-subheader class=\"ma-0 pt-0 right\">{{ description }}</v-subheader>\r\n        </v-flex>\r\n      </v-layout>\r\n    </v-container>\r\n  </div>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\n\r\nimport {\r\n  Component,\r\n  Prop,\r\n  Watch,\r\n  IPaging,\r\n  IPageSizes\r\n} from \"sitewhere-ide-common\";\r\n\r\n@Component\r\nexport default class Pager extends Vue {\r\n  @Prop() readonly results!: { numResults: number; results: {}[] };\r\n  @Prop() readonly pageSizes!: IPageSizes;\r\n\r\n  page: number = 1;\r\n  pageSize: number | null = null;\r\n  defaultResults: { numResults: number; results: {}[] } = {\r\n    numResults: 0,\r\n    results: []\r\n  };\r\n  defaultPageSizes: IPageSizes = [\r\n    {\r\n      text: \"10\",\r\n      value: 10\r\n    },\r\n    {\r\n      text: \"25\",\r\n      value: 25\r\n    },\r\n    {\r\n      text: \"50\",\r\n      value: 50\r\n    }\r\n  ];\r\n\r\n  created() {\r\n    if (!this.pageSize) {\r\n      this.pageSize = this.pageSizesWithDefaults[0].value;\r\n    }\r\n    this.onPagingUpdated();\r\n  }\r\n\r\n  // Refresh results on page size updated.\r\n  @Watch(\"pageSize\") onPageSizeUpdated(val: number, oldVal: number) {\r\n    this.page = 1;\r\n    this.onPagingUpdated();\r\n  }\r\n\r\n  // Results with defaults fallback.\r\n  get resultsWithDefaults(): { numResults: number; results: {}[] } {\r\n    return this.results || this.defaultResults;\r\n  }\r\n\r\n  // Total record count.\r\n  get total(): number {\r\n    return this.resultsWithDefaults.numResults;\r\n  }\r\n\r\n  // Description.\r\n  get description(): string {\r\n    let size = this.pageSize || 0;\r\n    let total = this.total;\r\n    let page = this.page;\r\n    var first = size * (page - 1) + 1;\r\n    var last = Math.min(total, first + size - 1);\r\n    return \"\" + first + \"-\" + last + \" of \" + total;\r\n  }\r\n\r\n  // Calculate number of pages.\r\n  get pageCount() {\r\n    var results = this.resultsWithDefaults;\r\n    var total = results.numResults;\r\n    var size = this.pageSize || 0;\r\n    var mod = total % size;\r\n    var count = (total / size) | 0;\r\n    count += mod > 0 ? 1 : 0;\r\n    return count;\r\n  }\r\n\r\n  // Get list of available page sizes with fallback defaults.\r\n  get pageSizesWithDefaults(): { text: string; value: number }[] {\r\n    return this.pageSizes || this.defaultPageSizes;\r\n  }\r\n\r\n  // Indicates if 'first' button should be enabled.\r\n  get previousEnabled(): boolean {\r\n    return this.page > 1;\r\n  }\r\n\r\n  // Indicates if 'first' button should be enabled.\r\n  get nextEnabled(): boolean {\r\n    return this.page < this.pageCount;\r\n  }\r\n\r\n  // Called to move to first page.\r\n  onFirstPage() {\r\n    if (this.page !== 1) {\r\n      this.page = 1;\r\n      this.onPagingUpdated();\r\n    }\r\n  }\r\n\r\n  // Called to move to previous page.\r\n  onPreviousPage() {\r\n    if (this.page > 1) {\r\n      this.page--;\r\n      this.onPagingUpdated();\r\n    }\r\n  }\r\n\r\n  // Called to refresh data.\r\n  onRefresh() {\r\n    this.onPagingUpdated();\r\n  }\r\n\r\n  // Called to move to next page.\r\n  onNextPage() {\r\n    if (this.page < this.pageCount) {\r\n      this.page++;\r\n      this.onPagingUpdated();\r\n    }\r\n  }\r\n\r\n  // Called to move to last page.\r\n  onLastPage() {\r\n    if (this.page < this.pageCount) {\r\n      this.page = this.pageCount;\r\n      this.onPagingUpdated();\r\n    }\r\n  }\r\n\r\n  // Called when paging values are updated.\r\n  onPagingUpdated() {\r\n    var paging: IPaging = {\r\n      pageNumber: this.page,\r\n      pageSize: this.pageSize || 0\r\n    };\r\n    this.$emit(\"pagingUpdated\", paging);\r\n  }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.pager {\r\n  color: #333;\r\n  background-color: #eee;\r\n  border-top: 1px solid #ccc;\r\n}\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$4 = "data-v-5282a815";
      /* module identifier */
      const __vue_module_identifier__$4 = undefined;
      /* functional template */
      const __vue_is_functional_template__$4 = false;
      /* style inject SSR */
      

      
      var Pager$1 = normalizeComponent_1(
        { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
        __vue_inject_styles__$4,
        __vue_script__$4,
        __vue_scope_id__$4,
        __vue_is_functional_template__$4,
        __vue_module_identifier__$4,
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
    const __vue_script__$5 = ListPage;

    /* template */
    var __vue_render__$5 = function() {
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
    var __vue_staticRenderFns__$5 = [];
    __vue_render__$5._withStripped = true;

      /* style */
      const __vue_inject_styles__$5 = function (inject) {
        if (!inject) return
        inject("data-v-49691b21_0", { source: "\n.flex-rows[data-v-49691b21] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  height: 100%;\n}\n.list-filters[data-v-49691b21] {\r\n  flex: 0;\n}\n.list-content[data-v-49691b21] {\r\n  flex: 1;\r\n  background-color: #eee;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\list\\ListPage.vue"],"names":[],"mappings":";AAsDA;EACA,aAAA;EACA,sBAAA;EACA,YAAA;AACA;AACA;EACA,OAAA;AACA;AACA;EACA,OAAA;EACA,sBAAA;AACA","file":"ListPage.vue","sourcesContent":["<template>\r\n  <navigation-page :icon=\"icon\" :title=\"title\" :loadingMessage=\"loadingMessage\" :loaded=\"loaded\">\r\n    <template slot=\"content\">\r\n      <div class=\"flex-rows\">\r\n        <div class=\"list-filters\">\r\n          <slot name=\"filters\"/>\r\n        </div>\r\n        <div class=\"list-content\">\r\n          <slot/>\r\n        </div>\r\n      </div>\r\n    </template>\r\n    <template slot=\"footer\">\r\n      <pager :results=\"results\" @pagingUpdated=\"onPagingUpdated\" :pageSizes=\"pageSizes\"/>\r\n    </template>\r\n    <template slot=\"actions\">\r\n      <slot name=\"actions\"/>\r\n    </template>\r\n    <template slot=\"dialogs\">\r\n      <slot name=\"dialogs\"/>\r\n    </template>\r\n  </navigation-page>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\n\r\nimport NavigationPage from \"../navigation/NavigationPage.vue\";\r\nimport Pager from \"../list/Pager.vue\";\r\n\r\nimport { Component, Prop, IPaging, IPageSizes } from \"sitewhere-ide-common\";\r\n\r\n@Component({\r\n  components: {\r\n    NavigationPage,\r\n    Pager\r\n  }\r\n})\r\nexport default class ListPage extends Vue {\r\n  @Prop() readonly icon!: string;\r\n  @Prop() readonly title!: string;\r\n  @Prop() readonly loadingMessage!: string;\r\n  @Prop() readonly pageSizes!: IPageSizes;\r\n  @Prop() readonly loaded!: boolean;\r\n  @Prop() readonly results!: {}[];\r\n\r\n  /** Update paging values and run query */\r\n  onPagingUpdated(paging: IPaging) {\r\n    this.$emit(\"pagingUpdated\", paging);\r\n  }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.flex-rows {\r\n  display: flex;\r\n  flex-direction: column;\r\n  height: 100%;\r\n}\r\n.list-filters {\r\n  flex: 0;\r\n}\r\n.list-content {\r\n  flex: 1;\r\n  background-color: #eee;\r\n}\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$5 = "data-v-49691b21";
      /* module identifier */
      const __vue_module_identifier__$5 = undefined;
      /* functional template */
      const __vue_is_functional_template__$5 = false;
      /* style inject SSR */
      

      
      var ListPage$1 = normalizeComponent_1(
        { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
        __vue_inject_styles__$5,
        __vue_script__$5,
        __vue_scope_id__$5,
        __vue_is_functional_template__$5,
        __vue_module_identifier__$5,
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
            __metadata("design:type", String)
        ], ListTab.prototype, "id", void 0);
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
    const __vue_script__$6 = ListTab;

    /* template */
    var __vue_render__$6 = function() {
      var _vm = this;
      var _h = _vm.$createElement;
      var _c = _vm._self._c || _h;
      return _c(
        "v-tab-item",
        { key: _vm.tabkey, attrs: { id: _vm.id } },
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
    var __vue_staticRenderFns__$6 = [];
    __vue_render__$6._withStripped = true;

      /* style */
      const __vue_inject_styles__$6 = function (inject) {
        if (!inject) return
        inject("data-v-26e851cd_0", { source: "\n.flex-rows[data-v-26e851cd] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  height: 100%;\n}\n.list-filters[data-v-26e851cd] {\r\n  flex: 0;\n}\n.list-content[data-v-26e851cd] {\r\n  flex: 1;\r\n  background-color: #eee;\r\n  overflow-y: auto;\n}\n.list-footer[data-v-26e851cd] {\r\n  flex: 0;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\list\\ListTab.vue"],"names":[],"mappings":";AAgDA;EACA,aAAA;EACA,sBAAA;EACA,YAAA;AACA;AACA;EACA,OAAA;AACA;AACA;EACA,OAAA;EACA,sBAAA;EACA,gBAAA;AACA;AACA;EACA,OAAA;AACA","file":"ListTab.vue","sourcesContent":["<template>\r\n  <v-tab-item :key=\"tabkey\" :id=\"id\">\r\n    <div class=\"flex-rows\">\r\n      <div class=\"list-filters\">\r\n        <slot name=\"filters\"/>\r\n      </div>\r\n      <div class=\"list-content\">\r\n        <slot v-if=\"loaded\"/>\r\n      </div>\r\n      <div class=\"list-footer\">\r\n        <pager :results=\"results\" @pagingUpdated=\"onPagingUpdated\" :pageSizes=\"pageSizes\"/>\r\n      </div>\r\n    </div>\r\n    <loading-overlay v-if=\"!loaded\" :loadingMessage=\"loadingMessage\"/>\r\n    <slot name=\"dialogs\"></slot>\r\n  </v-tab-item>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\n\r\nimport Pager from \"./Pager.vue\";\r\nimport LoadingOverlay from \"../common/LoadingOverlay.vue\";\r\n\r\nimport { Component, Prop, IPaging, IPageSizes } from \"sitewhere-ide-common\";\r\n\r\n@Component({\r\n  components: {\r\n    Pager,\r\n    LoadingOverlay\r\n  }\r\n})\r\nexport default class ListTab extends Vue {\r\n  @Prop() readonly tabkey!: string;\r\n  @Prop() readonly id!: string;\r\n  @Prop() readonly pageSizes!: IPageSizes;\r\n  @Prop() readonly loadingMessage!: string;\r\n  @Prop() readonly loaded!: boolean;\r\n  @Prop() readonly results!: { numResults: number; results: {}[] };\r\n\r\n  /** Update paging values and run query */\r\n  onPagingUpdated(paging: IPaging) {\r\n    this.$emit(\"pagingUpdated\", paging);\r\n  }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.flex-rows {\r\n  display: flex;\r\n  flex-direction: column;\r\n  height: 100%;\r\n}\r\n.list-filters {\r\n  flex: 0;\r\n}\r\n.list-content {\r\n  flex: 1;\r\n  background-color: #eee;\r\n  overflow-y: auto;\r\n}\r\n.list-footer {\r\n  flex: 0;\r\n}\r\n</style>\r\n"]}, media: undefined });

      };
      /* scoped */
      const __vue_scope_id__$6 = "data-v-26e851cd";
      /* module identifier */
      const __vue_module_identifier__$6 = undefined;
      /* functional template */
      const __vue_is_functional_template__$6 = false;
      /* style inject SSR */
      

      
      var ListTab$1 = normalizeComponent_1(
        { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
        __vue_inject_styles__$6,
        __vue_script__$6,
        __vue_scope_id__$6,
        __vue_is_functional_template__$6,
        __vue_module_identifier__$6,
        browser,
        undefined
      );

    // Common components.

    // Process as Vue plugin.
    const SiteWhere = {
      install(Vue, options) {
        // Register common components.
        Vue.component("sw-loading-overlay", LoadingOverlay$1);

        // Register list components.
        Vue.component("sw-list-entry", ListEntry$1);
        Vue.component("sw-list-layout", ListLayout$1);
        Vue.component("sw-list-page", ListPage$1);
        Vue.component("sw-list-tab", ListTab$1);
        Vue.component("sw-pager", Pager$1);
      }
    };

    exports.ListEntry = ListEntry$1;
    exports.ListLayout = ListLayout$1;
    exports.ListPage = ListPage$1;
    exports.ListTab = ListTab$1;
    exports.LoadingOverlay = LoadingOverlay$1;
    exports.Pager = Pager$1;
    exports.default = SiteWhere;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
