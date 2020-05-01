/**
  * SiteWhere IDE Components v3.0.0-alpha.2
  * (c) 2020 SiteWhere LLC
  * @license CPAL-1.0
  */
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var SiteWhereIdeCommon = require('sitewhere-ide-common');
var SiteWhereIdeCommon__default = _interopDefault(SiteWhereIdeCommon);
var Vue = _interopDefault(require('vue'));
var vuePropertyDecorator = require('vue-property-decorator');
var vueColor = require('vue-color');
var moment = _interopDefault(require('moment'));
var Electron = _interopDefault(require('electron'));

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

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

/**
 * Base class for create dialogs.
 */
class CreateDialogComponent extends Vue {
    /** Get wrapped dialog */
    getDialog() {
        throw new Error("Create dialog must implement getDialog().");
    }
    /** Open wrapped dialog */
    open() {
        this.getDialog().reset();
        this.getDialog().openDialog();
    }
    /** Load dialog then open it */
    loadAndOpen(payload) {
        this.getDialog().reset();
        this.getDialog().load(payload);
        this.getDialog().openDialog();
    }
    /** Implemented in subclasses to save payload */
    save(payload) {
        throw new Error("Create dialog must implement save().");
    }
    /** Implemented in subclasses for after-save */
    afterSave(payload) { }
    /** Type guard to differentiate between responses */
    isAxiosResponse(response) {
        return response.data !== undefined;
    }
    /** Handle payload commit */
    commit(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield this.save(payload);
                let created = this.isAxiosResponse(response)
                    ? response.data
                    : response;
                this.afterSave(created);
                this.$emit("created", created);
                this.getDialog().closeDialog();
            }
            catch (err) {
                SiteWhereIdeCommon.showError(this, err);
            }
        });
    }
}

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
const __vue_script__ = CreateDialogComponent;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", [_vm._t("default")], 2)
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

/**
 * Base class for delete dialog components.
 */
let DeleteDialogComponent = class DeleteDialogComponent extends Vue {
    constructor() {
        super(...arguments);
        this.record = null;
        this.visible = false;
        this.error = null;
    }
    /**
     * Load object to be deleted.
     * @param identifier
     */
    prepareLoad(identifier) {
        throw new Error("Load not implemented in dialog.");
    }
    /** Type guard to differentiate between responses */
    isAxiosResponse(response) {
        return response.data !== undefined;
    }
    /** Called after record is loaded */
    afterLoad(record) { }
    /**
     * Load data, then open dialog.
     * @param identifier
     */
    open(identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield this.prepareLoad(identifier);
                this.record = this.isAxiosResponse(response) ? response.data : response;
                this.visible = true;
                this.afterLoad(this.record);
            }
            catch (err) {
                SiteWhereIdeCommon.showError(this, err);
            }
        });
    }
    /** Return method to delete record */
    prepareDelete(record) {
        throw new Error("Delete not implemented in dialog.");
    }
    /** Action invoked when delete is clicked */
    delete() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.record) {
                throw new Error("Unable to delete. Record is null.");
            }
            try {
                let response = yield this.prepareDelete(this.record);
                this.record = this.isAxiosResponse(response) ? response.data : response;
                this.$emit("deleted", this.record);
                this.closeDialog();
            }
            catch (err) {
                SiteWhereIdeCommon.showError(this, err);
            }
        });
    }
    /** Action invoked when cancel is clicked */
    cancel() {
        this.closeDialog();
    }
    /** Called to open the dialog */
    closeDialog() {
        this.visible = false;
    }
    /** Called to show an error message */
    showError(error) {
        this.error = error;
    }
};
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], DeleteDialogComponent.prototype, "title", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Number)
], DeleteDialogComponent.prototype, "width", void 0);
DeleteDialogComponent = __decorate([
    vuePropertyDecorator.Component
], DeleteDialogComponent);
var script = DeleteDialogComponent;

/* script */
const __vue_script__$1 = script;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", [_vm._t("default")], 2)
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$1 = normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
    undefined,
    undefined
  );

/**
 * Base class for components that display data for a single record
 * based on SiteWhere REST services.
 */
let DetailComponent = class DetailComponent extends Vue {
    constructor() {
        super(...arguments);
        this.token = null;
        this.record = null;
        this.loaded = false;
    }
    // Get parameter for route token.
    getTokenParameter() {
        return "token";
    }
    // Called on initial create.
    created() {
        this.display(this.$route.params[this.getTokenParameter()]);
    }
    // Called when component is reused.
    beforeRouteUpdate(to, from, next) {
        this.display(to.params.token);
        next();
    }
    // Display record with the given token.
    display(token) {
        this.token = token;
        this.refresh();
    }
    /** Return promise for loading record */
    loadRecord(token) {
        throw new Error("Implement loadRecord()");
    }
    // Refresh list contents.
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.loaded = false;
                let promise = this.loadRecord(this.token);
                let response = yield promise;
                this.record = response.data;
                this.afterRecordLoaded(this.record);
            }
            catch (err) {
                SiteWhereIdeCommon.showError(this, err);
            }
            this.loaded = true;
        });
    }
    /** Called after record is loaded */
    afterRecordLoaded(record) { }
};
DetailComponent = __decorate([
    vuePropertyDecorator.Component
], DetailComponent);
var script$1 = DetailComponent;

/* script */
const __vue_script__$2 = script$1;

/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", [_vm._t("default")], 2)
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  const __vue_inject_styles__$2 = undefined;
  /* scoped */
  const __vue_scope_id__$2 = undefined;
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$2 = normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    undefined,
    undefined,
    undefined
  );

/**
 * Base class for dialog components.
 */
let DialogComponent = class DialogComponent extends Vue {
    constructor() {
        super(...arguments);
        this.dialogVisible = false;
        this.error = null;
    }
    /** Reset dialog content */
    reset() {
        throw new Error("Reset not implemented in dialog.");
    }
    /** Load dialog from model */
    load(model) {
        throw new Error("Load not implemented in dialog.");
    }
    /** Called to open the dialog */
    openDialog() {
        this.dialogVisible = true;
    }
    /** Called to open the dialog */
    closeDialog() {
        this.dialogVisible = false;
    }
    /** Called to show an error message */
    showError(error) {
        this.error = error;
    }
    /** Action invoked when create is clicked */
    onCreateClicked(e) { }
    /** Action invoked when cancel is clicked */
    onCancelClicked(e) {
        this.closeDialog();
    }
};
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], DialogComponent.prototype, "title", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Number)
], DialogComponent.prototype, "width", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], DialogComponent.prototype, "createLabel", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], DialogComponent.prototype, "cancelLabel", void 0);
__decorate([
    vuePropertyDecorator.Prop({ default: true }),
    __metadata("design:type", Boolean)
], DialogComponent.prototype, "loaded", void 0);
DialogComponent = __decorate([
    vuePropertyDecorator.Component
], DialogComponent);
var script$2 = DialogComponent;

/* script */
const __vue_script__$3 = script$2;

/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", [_vm._t("default")], 2)
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  const __vue_inject_styles__$3 = undefined;
  /* scoped */
  const __vue_scope_id__$3 = undefined;
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$3 = normalizeComponent(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    undefined,
    undefined,
    undefined
  );

/**
 * Base class for dialog sections.
 */
let DialogSection = class DialogSection extends Vue {
    /** Called on component create */
    created() {
        this.reset();
    }
    /** Reset section content */
    reset() {
        throw new Error("Reset not implemented in dialog section.");
    }
    /** Validate fields in the dialog section */
    validate() {
        return true;
    }
    /** Load form data from an object */
    load(input) { }
    /** Save form data to an object */
    save() {
        return {};
    }
};
DialogSection = __decorate([
    vuePropertyDecorator.Component
], DialogSection);
var script$3 = DialogSection;

/* script */
const __vue_script__$4 = script$3;

/* template */
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", [_vm._t("default")], 2)
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  const __vue_inject_styles__$4 = undefined;
  /* scoped */
  const __vue_scope_id__$4 = undefined;
  /* module identifier */
  const __vue_module_identifier__$4 = undefined;
  /* functional template */
  const __vue_is_functional_template__$4 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$4 = normalizeComponent(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    false,
    undefined,
    undefined,
    undefined
  );

/**
 * Base class for edit dialogs.
 */
class EditDialogComponent extends Vue {
    constructor() {
        super(...arguments);
        this.record = null;
        this.loaded = false;
    }
    /** Get wrapped dialog */
    getDialog() {
        throw new Error("Edit dialog must implement getDialog().");
    }
    /**
     * Prepare load for the given identifier.
     * @param identifier
     */
    prepareLoad(identifier) {
        throw new Error("Edit dialog must implement load().");
    }
    /** Type guard to differentiate between responses */
    isAxiosResponse(response) {
        return response.data !== undefined;
    }
    /**
     * Load record for identifer and open dialog.
     * @param identifier
     */
    open(identifier) {
        return __awaiter(this, void 0, void 0, function* () {
            this.getDialog().openDialog();
            this.getDialog().reset();
            this.loaded = false;
            try {
                let response = yield this.prepareLoad(identifier);
                this.record = this.isAxiosResponse(response) ? response.data : response;
                this.getDialog().load(this.record);
            }
            catch (err) {
                SiteWhereIdeCommon.showError(this, err);
            }
            this.loaded = true;
        });
    }
    /** Implemented in subclasses to save payload */
    prepareSave(original, updated) {
        throw new Error("Edit dialog must implement save().");
    }
    /** Handle payload commit */
    save(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.record) {
                throw new Error("Unable to update. Record is null.");
            }
            try {
                let response = yield this.prepareSave(this.record, payload);
                let updated = this.isAxiosResponse(response)
                    ? response.data
                    : response;
                this.afterSave(updated);
                this.$emit("updated", updated);
                this.getDialog().closeDialog();
            }
            catch (err) {
                SiteWhereIdeCommon.showError(this, err);
            }
        });
    }
    /** Implemented in subclasses for after-save */
    afterSave(payload) { }
}

/* script */
const __vue_script__$5 = EditDialogComponent;

/* template */
var __vue_render__$5 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", [_vm._t("default")], 2)
};
var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;

  /* style */
  const __vue_inject_styles__$5 = undefined;
  /* scoped */
  const __vue_scope_id__$5 = undefined;
  /* module identifier */
  const __vue_module_identifier__$5 = undefined;
  /* functional template */
  const __vue_is_functional_template__$5 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$5 = normalizeComponent(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    false,
    undefined,
    undefined,
    undefined
  );

/**
 * Base class for components that display header data for a
 * SiteWhere entity.
 */
let HeaderComponent = class HeaderComponent extends Vue {
    // Handle date formatting in a standard way.
    formatDate(date) {
        return SiteWhereIdeCommon.formatDate(date);
    }
};
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Object)
], HeaderComponent.prototype, "record", void 0);
HeaderComponent = __decorate([
    vuePropertyDecorator.Component
], HeaderComponent);
var script$4 = HeaderComponent;

/* script */
const __vue_script__$6 = script$4;

/* template */
var __vue_render__$6 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", [_vm._t("default")], 2)
};
var __vue_staticRenderFns__$6 = [];
__vue_render__$6._withStripped = true;

  /* style */
  const __vue_inject_styles__$6 = undefined;
  /* scoped */
  const __vue_scope_id__$6 = undefined;
  /* module identifier */
  const __vue_module_identifier__$6 = undefined;
  /* functional template */
  const __vue_is_functional_template__$6 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$6 = normalizeComponent(
    { render: __vue_render__$6, staticRenderFns: __vue_staticRenderFns__$6 },
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    false,
    undefined,
    undefined,
    undefined
  );

/**
 * Base class for components that display lists based on
 * SiteWhere REST services.
 */
let ListComponent = class ListComponent extends Vue {
    constructor() {
        super(...arguments);
        this.results = null;
        this.paging = null;
        this.matches = [];
        this.loaded = false;
    }
    /** Update paging values and run query */
    onPagingUpdated(paging) {
        this.paging = paging;
        this.refresh();
    }
    /** Build search criteria for list */
    buildSearchCriteria() {
        throw new Error("Implement buildSearchCriteria()");
    }
    /** Build response format for list */
    buildResponseFormat() {
        throw new Error("Implement buildResponseFormat()");
    }
    /** Return promise for performing search */
    performSearch(criteria, format) {
        throw new Error("Implement performSearch()");
    }
    // Refresh list contents.
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            let criteria = this.buildSearchCriteria();
            let format = this.buildResponseFormat();
            if (this.paging) {
                criteria.pageNumber = this.paging.pageNumber;
                criteria.pageSize = this.paging.pageSize;
            }
            try {
                this.loaded = false;
                let promise = this.performSearch(criteria, format);
                let response = yield promise;
                this.results = response.data;
                this.matches = response.data.results;
            }
            catch (err) {
                SiteWhereIdeCommon.handleError(err);
            }
            this.loaded = true;
        });
    }
};
ListComponent = __decorate([
    vuePropertyDecorator.Component
], ListComponent);
var script$5 = ListComponent;

const isOldIE = typeof navigator !== 'undefined' &&
    /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
    return (id, style) => addStyle(id, style);
}
let HEAD;
const styles = {};
function addStyle(id, css) {
    const group = isOldIE ? css.media || 'default' : id;
    const style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
    if (!style.ids.has(id)) {
        style.ids.add(id);
        let code = css.source;
        if (css.map) {
            // https://developer.chrome.com/devtools/docs/javascript-debugging
            // this makes source maps inside style tags work properly in Chrome
            code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
            // http://stackoverflow.com/a/26603875
            code +=
                '\n/*# sourceMappingURL=data:application/json;base64,' +
                    btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                    ' */';
        }
        if (!style.element) {
            style.element = document.createElement('style');
            style.element.type = 'text/css';
            if (css.media)
                style.element.setAttribute('media', css.media);
            if (HEAD === undefined) {
                HEAD = document.head || document.getElementsByTagName('head')[0];
            }
            HEAD.appendChild(style.element);
        }
        if ('styleSheet' in style.element) {
            style.styles.push(code);
            style.element.styleSheet.cssText = style.styles
                .filter(Boolean)
                .join('\n');
        }
        else {
            const index = style.ids.size - 1;
            const textNode = document.createTextNode(code);
            const nodes = style.element.childNodes;
            if (nodes[index])
                style.element.removeChild(nodes[index]);
            if (nodes.length)
                style.element.insertBefore(textNode, nodes[index]);
            else
                style.element.appendChild(textNode);
        }
    }
}

/* script */
const __vue_script__$7 = script$5;

/* template */
var __vue_render__$7 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", [_vm._t("default")], 2)
};
var __vue_staticRenderFns__$7 = [];
__vue_render__$7._withStripped = true;

  /* style */
  const __vue_inject_styles__$7 = function (inject) {
    if (!inject) return
    inject("data-v-1f65c673_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"ListComponent.vue"}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$7 = "data-v-1f65c673";
  /* module identifier */
  const __vue_module_identifier__$7 = undefined;
  /* functional template */
  const __vue_is_functional_template__$7 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$7 = normalizeComponent(
    { render: __vue_render__$7, staticRenderFns: __vue_staticRenderFns__$7 },
    __vue_inject_styles__$7,
    __vue_script__$7,
    __vue_scope_id__$7,
    __vue_is_functional_template__$7,
    __vue_module_identifier__$7,
    false,
    createInjector,
    undefined,
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

var script$6 = {
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

/* script */
const __vue_script__$8 = script$6;

/* template */
var __vue_render__$8 = function() {
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
var __vue_staticRenderFns__$8 = [];
__vue_render__$8._withStripped = true;

  /* style */
  const __vue_inject_styles__$8 = function (inject) {
    if (!inject) return
    inject("data-v-4e07dcce_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"ClipboardCopyField.vue"}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$8 = "data-v-4e07dcce";
  /* module identifier */
  const __vue_module_identifier__$8 = undefined;
  /* functional template */
  const __vue_is_functional_template__$8 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$8 = normalizeComponent(
    { render: __vue_render__$8, staticRenderFns: __vue_staticRenderFns__$8 },
    __vue_inject_styles__$8,
    __vue_script__$8,
    __vue_scope_id__$8,
    __vue_is_functional_template__$8,
    __vue_module_identifier__$8,
    false,
    createInjector,
    undefined,
    undefined
  );

let ColorInputField = class ColorInputField extends Vue {
    constructor() {
        super(...arguments);
        this.menu = null;
        this.updatedColor = null;
    }
    onValueChanged(val, oldVal) {
        this.updatedColor = val;
    }
    get valueOrDefault() {
        return this.updatedColor || "#fff";
    }
    /** Called when color is chosen */
    onColorChosen(val) {
        this.updatedColor = val.hex;
        this.$emit("input", val.hex);
        this.$emit("opacityChanged", val.a);
    }
};
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], ColorInputField.prototype, "value", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], ColorInputField.prototype, "text", void 0);
__decorate([
    vuePropertyDecorator.Watch("value"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], ColorInputField.prototype, "onValueChanged", null);
ColorInputField = __decorate([
    vuePropertyDecorator.Component({
        components: {
            Chrome: vueColor.Chrome
        }
    })
], ColorInputField);
var script$7 = ColorInputField;

/* script */
const __vue_script__$9 = script$7;

/* template */
var __vue_render__$9 = function() {
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
var __vue_staticRenderFns__$9 = [];
__vue_render__$9._withStripped = true;

  /* style */
  const __vue_inject_styles__$9 = function (inject) {
    if (!inject) return
    inject("data-v-bff34f12_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"ColorInputField.vue"}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$9 = "data-v-bff34f12";
  /* module identifier */
  const __vue_module_identifier__$9 = undefined;
  /* functional template */
  const __vue_is_functional_template__$9 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$9 = normalizeComponent(
    { render: __vue_render__$9, staticRenderFns: __vue_staticRenderFns__$9 },
    __vue_inject_styles__$9,
    __vue_script__$9,
    __vue_scope_id__$9,
    __vue_is_functional_template__$9,
    __vue_module_identifier__$9,
    false,
    createInjector,
    undefined,
    undefined
  );

let ColorPicker = class ColorPicker extends Vue {
    constructor() {
        super(...arguments);
        this.menu = false;
        this.currentColor = null;
        this.currentOpacity = null;
    }
    onValueChanged(val) {
        this.currentColor = val;
    }
    onOpacityChanged(val) {
        this.currentOpacity = val;
    }
    /** Convert color into picker format */
    get pickerColor() {
        return {
            hex: this.currentColor,
            a: this.opacity
        };
    }
    /** Called when a color is chosen */
    onColorChosen(val) {
        this.currentColor = val.hex;
        this.$emit("input", val.hex);
        this.currentOpacity = val.a;
        this.$emit("opacityChanged", val.a);
    }
};
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], ColorPicker.prototype, "value", void 0);
__decorate([
    vuePropertyDecorator.Prop({ default: 1 }),
    __metadata("design:type", String)
], ColorPicker.prototype, "opacity", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], ColorPicker.prototype, "text", void 0);
__decorate([
    vuePropertyDecorator.Watch("value"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ColorPicker.prototype, "onValueChanged", null);
__decorate([
    vuePropertyDecorator.Watch("opacity"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ColorPicker.prototype, "onOpacityChanged", null);
ColorPicker = __decorate([
    vuePropertyDecorator.Component({
        components: {
            Picker: vueColor.Sketch
        }
    })
], ColorPicker);
var script$8 = ColorPicker;

/* script */
const __vue_script__$a = script$8;

/* template */
var __vue_render__$a = function() {
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
      _c("picker", {
        attrs: { value: _vm.pickerColor },
        on: { input: _vm.onColorChosen }
      })
    ],
    1
  )
};
var __vue_staticRenderFns__$a = [];
__vue_render__$a._withStripped = true;

  /* style */
  const __vue_inject_styles__$a = undefined;
  /* scoped */
  const __vue_scope_id__$a = undefined;
  /* module identifier */
  const __vue_module_identifier__$a = undefined;
  /* functional template */
  const __vue_is_functional_template__$a = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$a = normalizeComponent(
    { render: __vue_render__$a, staticRenderFns: __vue_staticRenderFns__$a },
    __vue_inject_styles__$a,
    __vue_script__$a,
    __vue_scope_id__$a,
    __vue_is_functional_template__$a,
    __vue_module_identifier__$a,
    false,
    undefined,
    undefined,
    undefined
  );

let CondensedToolbar = class CondensedToolbar extends Vue {
};
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], CondensedToolbar.prototype, "title", void 0);
CondensedToolbar = __decorate([
    vuePropertyDecorator.Component({})
], CondensedToolbar);
var script$9 = CondensedToolbar;

/* script */
const __vue_script__$b = script$9;

/* template */
var __vue_render__$b = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-toolbar",
    {
      staticClass: "tb",
      attrs: {
        flat: "",
        dark: "",
        dense: "",
        card: "",
        color: "primary",
        height: "38"
      }
    },
    [
      _vm._t("icon"),
      _vm._v(" "),
      _c("v-toolbar-title", { staticClass: "white--text body-2 ml-2" }, [
        _vm._v(_vm._s(_vm.title))
      ]),
      _vm._v(" "),
      _vm._t("left"),
      _vm._v(" "),
      _c("v-spacer"),
      _vm._v(" "),
      _vm._t("default")
    ],
    2
  )
};
var __vue_staticRenderFns__$b = [];
__vue_render__$b._withStripped = true;

  /* style */
  const __vue_inject_styles__$b = function (inject) {
    if (!inject) return
    inject("data-v-60cd4835_0", { source: "\n.tb[data-v-60cd4835] .v-toolbar__content {\r\n  padding: 0 10px;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\common\\CondensedToolbar.vue"],"names":[],"mappings":";AAqBA;EACA,eAAA;AACA","file":"CondensedToolbar.vue","sourcesContent":["<template>\r\n  <v-toolbar flat dark dense card color=\"primary\" class=\"tb\" height=\"38\">\r\n    <slot name=\"icon\" />\r\n    <v-toolbar-title class=\"white--text body-2 ml-2\">{{ title }}</v-toolbar-title>\r\n    <slot name=\"left\" />\r\n    <v-spacer></v-spacer>\r\n    <slot />\r\n  </v-toolbar>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\nimport { Component, Prop } from \"vue-property-decorator\";\r\n\r\n@Component({})\r\nexport default class CondensedToolbar extends Vue {\r\n  @Prop() readonly title!: string;\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.tb >>> .v-toolbar__content {\r\n  padding: 0 10px;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$b = "data-v-60cd4835";
  /* module identifier */
  const __vue_module_identifier__$b = undefined;
  /* functional template */
  const __vue_is_functional_template__$b = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$b = normalizeComponent(
    { render: __vue_render__$b, staticRenderFns: __vue_staticRenderFns__$b },
    __vue_inject_styles__$b,
    __vue_script__$b,
    __vue_scope_id__$b,
    __vue_is_functional_template__$b,
    __vue_module_identifier__$b,
    false,
    createInjector,
    undefined,
    undefined
  );

let DateTimePicker = class DateTimePicker extends Vue {
    constructor() {
        super(...arguments);
        this.date = null;
        this.time = "12:00";
        this.datemenu = false;
        this.timemenu = false;
    }
    onValueUpdated(updated) {
        if (updated) {
            let datetime = this.parseIso8601(updated);
            if (datetime) {
                this.time =
                    datetime
                        .getHours()
                        .toString()
                        .padStart(2, "0") +
                        ":" +
                        datetime
                            .getMinutes()
                            .toString()
                            .padStart(2, "0");
                this.date = moment(updated).format("YYYY-MM-DD");
            }
        }
        else {
            this.date = null;
            this.time = "12:00";
        }
    }
    onDateUpdated(updated) {
        if (updated) {
            let value = moment(updated).toDate();
            let parts = this.time.split(":");
            let hour = parseInt(parts[0]);
            let minute = parseInt(parts[1]);
            value.setHours(hour, minute);
            this.$emit("input", value);
        }
    }
    onTimeUpdated(updated) {
        if (this.date) {
            this.onDateUpdated(this.date);
        }
    }
    /** Parse date in ISO8601 format */
    parseIso8601(value) {
        if (!value) {
            return null;
        }
        return moment(value).toDate();
    }
};
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Date)
], DateTimePicker.prototype, "value", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], DateTimePicker.prototype, "label", void 0);
__decorate([
    vuePropertyDecorator.Watch("value"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DateTimePicker.prototype, "onValueUpdated", null);
__decorate([
    vuePropertyDecorator.Watch("date"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DateTimePicker.prototype, "onDateUpdated", null);
__decorate([
    vuePropertyDecorator.Watch("time"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DateTimePicker.prototype, "onTimeUpdated", null);
DateTimePicker = __decorate([
    vuePropertyDecorator.Component({})
], DateTimePicker);
var script$a = DateTimePicker;

/* script */
const __vue_script__$c = script$a;

/* template */
var __vue_render__$c = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-layout",
    { attrs: { row: "", wrap: "" } },
    [
      _c(
        "v-flex",
        { attrs: { xs8: "" } },
        [
          _c(
            "v-menu",
            {
              attrs: {
                "close-on-content-click": false,
                transition: "scale-transition",
                "offset-y": "",
                "full-width": ""
              },
              scopedSlots: _vm._u([
                {
                  key: "activator",
                  fn: function(ref) {
                    var on = ref.on;
                    return [
                      _c(
                        "v-text-field",
                        _vm._g(
                          {
                            attrs: {
                              label: _vm.label,
                              placeholder: " ",
                              "prepend-icon": "event",
                              readonly: ""
                            },
                            model: {
                              value: _vm.date,
                              callback: function($$v) {
                                _vm.date = $$v;
                              },
                              expression: "date"
                            }
                          },
                          on
                        )
                      )
                    ]
                  }
                }
              ]),
              model: {
                value: _vm.datemenu,
                callback: function($$v) {
                  _vm.datemenu = $$v;
                },
                expression: "datemenu"
              }
            },
            [
              _vm._v(" "),
              _c("v-date-picker", {
                on: {
                  input: function($event) {
                    _vm.datemenu = false;
                  }
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
          )
        ],
        1
      ),
      _vm._v(" "),
      _vm.date
        ? _c(
            "v-flex",
            { attrs: { xs4: "" } },
            [
              _c(
                "v-menu",
                {
                  ref: "menu",
                  attrs: {
                    "close-on-content-click": false,
                    "return-value": _vm.time,
                    transition: "scale-transition",
                    "offset-y": "",
                    "full-width": ""
                  },
                  on: {
                    "update:returnValue": function($event) {
                      _vm.time = $event;
                    },
                    "update:return-value": function($event) {
                      _vm.time = $event;
                    }
                  },
                  scopedSlots: _vm._u(
                    [
                      {
                        key: "activator",
                        fn: function(ref) {
                          var on = ref.on;
                          return [
                            _c(
                              "v-text-field",
                              _vm._g(
                                {
                                  attrs: {
                                    label: " ",
                                    placeholder: " ",
                                    "prepend-icon": "access_time",
                                    readonly: ""
                                  },
                                  model: {
                                    value: _vm.time,
                                    callback: function($$v) {
                                      _vm.time = $$v;
                                    },
                                    expression: "time"
                                  }
                                },
                                on
                              )
                            )
                          ]
                        }
                      }
                    ],
                    null,
                    false,
                    4181482063
                  ),
                  model: {
                    value: _vm.timemenu,
                    callback: function($$v) {
                      _vm.timemenu = $$v;
                    },
                    expression: "timemenu"
                  }
                },
                [
                  _vm._v(" "),
                  _vm.timemenu
                    ? _c("v-time-picker", {
                        attrs: { "full-width": "" },
                        on: {
                          "click:minute": function($event) {
                            return _vm.$refs.menu.save(_vm.time)
                          }
                        },
                        model: {
                          value: _vm.time,
                          callback: function($$v) {
                            _vm.time = $$v;
                          },
                          expression: "time"
                        }
                      })
                    : _vm._e()
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
var __vue_staticRenderFns__$c = [];
__vue_render__$c._withStripped = true;

  /* style */
  const __vue_inject_styles__$c = undefined;
  /* scoped */
  const __vue_scope_id__$c = undefined;
  /* module identifier */
  const __vue_module_identifier__$c = undefined;
  /* functional template */
  const __vue_is_functional_template__$c = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$c = normalizeComponent(
    { render: __vue_render__$c, staticRenderFns: __vue_staticRenderFns__$c },
    __vue_inject_styles__$c,
    __vue_script__$c,
    __vue_scope_id__$c,
    __vue_is_functional_template__$c,
    __vue_module_identifier__$c,
    false,
    undefined,
    undefined,
    undefined
  );

//
//
//
//
//
//
//

var script$b = {
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
const __vue_script__$d = script$b;

/* template */
var __vue_render__$d = function() {
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
var __vue_staticRenderFns__$d = [];
__vue_render__$d._withStripped = true;

  /* style */
  const __vue_inject_styles__$d = function (inject) {
    if (!inject) return
    inject("data-v-6e3d2d05_0", { source: "\n.error-banner[data-v-6e3d2d05] {\r\n  z-index: 2000;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\common\\ErrorBanner.vue"],"names":[],"mappings":";AA+CA;EACA,aAAA;AACA","file":"ErrorBanner.vue","sourcesContent":["<template>\r\n  <v-snackbar class=\"error-banner\" v-if=\"error\" :timeout=\"5000\" error v-model=\"errorDisplayed\">\r\n    {{ errorMessage }}\r\n    <v-btn dark flat @click.native=\"errorDisplayed = false\">Close</v-btn>\r\n  </v-snackbar>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n  data: () => ({\r\n    errorDisplayed: false\r\n  }),\r\n\r\n  props: [\"error\"],\r\n\r\n  watch: {\r\n    error: function(value) {\r\n      if (value) {\r\n        if (this.error.response && this.error.response.status == 503) {\r\n          this.$data.errorDisplayed = false;\r\n        } else if (this.error.response || this.error.message) {\r\n          this.$data.errorDisplayed = true;\r\n        }\r\n      }\r\n    }\r\n  },\r\n\r\n  computed: {\r\n    errorMessage: function() {\r\n      if (!this.error) {\r\n        return \"\";\r\n      } else if (this.error.response && this.error.response.headers) {\r\n        if (this.error.response.headers[\"x-sitewhere-error\"]) {\r\n          return this.error.response.headers[\"x-sitewhere-error\"];\r\n        } else if (this.error.response.status === 403) {\r\n          return \"Server Authentication Failed\";\r\n        }\r\n      }\r\n      return this.error.message;\r\n    }\r\n  },\r\n\r\n  methods: {}\r\n};\r\n</script>\r\n\r\n<style scoped>\r\n.error-banner {\r\n  z-index: 2000;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$d = "data-v-6e3d2d05";
  /* module identifier */
  const __vue_module_identifier__$d = undefined;
  /* functional template */
  const __vue_is_functional_template__$d = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$d = normalizeComponent(
    { render: __vue_render__$d, staticRenderFns: __vue_staticRenderFns__$d },
    __vue_inject_styles__$d,
    __vue_script__$d,
    __vue_scope_id__$d,
    __vue_is_functional_template__$d,
    __vue_module_identifier__$d,
    false,
    createInjector,
    undefined,
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

var script$c = {
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
const __vue_script__$e = script$c;

/* template */
var __vue_render__$e = function() {
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
var __vue_staticRenderFns__$e = [];
__vue_render__$e._withStripped = true;

  /* style */
  const __vue_inject_styles__$e = function (inject) {
    if (!inject) return
    inject("data-v-73a38ecb_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"FloatingActionButton.vue"}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$e = "data-v-73a38ecb";
  /* module identifier */
  const __vue_module_identifier__$e = undefined;
  /* functional template */
  const __vue_is_functional_template__$e = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$e = normalizeComponent(
    { render: __vue_render__$e, staticRenderFns: __vue_staticRenderFns__$e },
    __vue_inject_styles__$e,
    __vue_script__$e,
    __vue_scope_id__$e,
    __vue_is_functional_template__$e,
    __vue_module_identifier__$e,
    false,
    createInjector,
    undefined,
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

var script$d = {
  data: () => ({}),

  props: ["label"],

  methods: {}
};

/* script */
const __vue_script__$f = script$d;

/* template */
var __vue_render__$f = function() {
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
var __vue_staticRenderFns__$f = [];
__vue_render__$f._withStripped = true;

  /* style */
  const __vue_inject_styles__$f = function (inject) {
    if (!inject) return
    inject("data-v-e7901184_0", { source: "\n.field[data-v-e7901184] {\r\n  text-overflow: ellipsis;\r\n  white-space: nowrap;\r\n  overflow: hidden;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\common\\HeaderField.vue"],"names":[],"mappings":";AAsBA;EACA,uBAAA;EACA,mBAAA;EACA,gBAAA;AACA","file":"HeaderField.vue","sourcesContent":["<template>\r\n  <v-layout row wrap class=\"mb-1\">\r\n    <v-flex xs4 class=\"text-xs-right subheading pr-4\">\r\n      <strong>{{ label }}</strong>:\r\n    </v-flex>\r\n    <v-flex class=\"field\" xs8>\r\n      <slot></slot>\r\n    </v-flex>\r\n  </v-layout>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n  data: () => ({}),\r\n\r\n  props: [\"label\"],\r\n\r\n  methods: {}\r\n};\r\n</script>\r\n\r\n<style scoped>\r\n.field {\r\n  text-overflow: ellipsis;\r\n  white-space: nowrap;\r\n  overflow: hidden;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$f = "data-v-e7901184";
  /* module identifier */
  const __vue_module_identifier__$f = undefined;
  /* functional template */
  const __vue_is_functional_template__$f = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$f = normalizeComponent(
    { render: __vue_render__$f, staticRenderFns: __vue_staticRenderFns__$f },
    __vue_inject_styles__$f,
    __vue_script__$f,
    __vue_scope_id__$f,
    __vue_is_functional_template__$f,
    __vue_module_identifier__$f,
    false,
    createInjector,
    undefined,
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

var script$e = {
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
const __vue_script__$g = script$e;

/* template */
var __vue_render__$g = function() {
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
var __vue_staticRenderFns__$g = [];
__vue_render__$g._withStripped = true;

  /* style */
  const __vue_inject_styles__$g = function (inject) {
    if (!inject) return
    inject("data-v-98884e52_0", { source: "\n.faicon[data-v-98884e52] {\r\n  min-height: 30px;\r\n  text-align: center;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\common\\IconSelector.vue"],"names":[],"mappings":";AAyrCA;EACA,gBAAA;EACA,kBAAA;AACA","file":"IconSelector.vue","sourcesContent":["<template>\r\n  <v-menu offset-y lazy>\r\n    <span slot=\"activator\">\r\n      <v-container fluid class=\"pa-0\">\r\n        <v-layout row wrap>\r\n          <v-flex xs12>\r\n            <v-text-field label=\"Icon\" placeholder=\" \" v-model=\"icon\" prepend-icon=\"image\"/>\r\n          </v-flex>\r\n        </v-layout>\r\n      </v-container>\r\n    </span>\r\n    <v-card>\r\n      <v-container :style=\"ddStyle\" fluid grid-list-sm>\r\n        <v-layout row wrap>\r\n          <v-flex class=\"faicon\" xs1 v-for=\"(icon) in iconsSolid\" :key=\"icon\">\r\n            <v-tooltip left>\r\n              <font-awesome-icon\r\n                class=\"faicon text--grey\"\r\n                :icon=\"icon\"\r\n                size=\"lg\"\r\n                @click=\"onIconSelected(icon)\"\r\n                slot=\"activator\"\r\n              />\r\n              <span>{{ icon }}</span>\r\n            </v-tooltip>\r\n          </v-flex>\r\n        </v-layout>\r\n      </v-container>\r\n    </v-card>\r\n  </v-menu>\r\n</template>\r\n\r\n<script>\r\nexport default {\r\n  computed: {\r\n    // Compute style of logo.\r\n    ddStyle: function() {\r\n      return {\r\n        width: \"500px\",\r\n        \"max-height\": \"400px\",\r\n        \"overflow-y\": \"scroll\"\r\n      };\r\n    },\r\n    icon: function() {\r\n      return this.value;\r\n    }\r\n  },\r\n\r\n  props: [\"value\"],\r\n\r\n  methods: {\r\n    // Called when icon is selected.\r\n    onIconSelected: function(e) {\r\n      this.$data.selectedIcon = e;\r\n      this.$emit(\"input\", e);\r\n    }\r\n  },\r\n\r\n  data: () => ({\r\n    active: null,\r\n    selectedIcon: null,\r\n    iconsSolid: [\r\n      \"address-book\",\r\n      \"address-card\",\r\n      \"adjust\",\r\n      \"air-freshener\",\r\n      \"align-center\",\r\n      \"align-justify\",\r\n      \"align-left\",\r\n      \"align-right\",\r\n      \"allergies\",\r\n      \"ambulance\",\r\n      \"american-sign-language-interpreting\",\r\n      \"anchor\",\r\n      \"angle-double-down\",\r\n      \"angle-double-left\",\r\n      \"angle-double-right\",\r\n      \"angle-double-up\",\r\n      \"angle-down\",\r\n      \"angle-left\",\r\n      \"angle-right\",\r\n      \"angle-up\",\r\n      \"angry\",\r\n      \"apple-alt\",\r\n      \"archive\",\r\n      \"archway\",\r\n      \"arrow-alt-circle-down\",\r\n      \"arrow-alt-circle-left\",\r\n      \"arrow-alt-circle-right\",\r\n      \"arrow-alt-circle-up\",\r\n      \"arrow-circle-down\",\r\n      \"arrow-circle-left\",\r\n      \"arrow-circle-right\",\r\n      \"arrow-circle-up\",\r\n      \"arrow-down\",\r\n      \"arrow-left\",\r\n      \"arrow-right\",\r\n      \"arrow-up\",\r\n      \"arrows-alt\",\r\n      \"arrows-alt-h\",\r\n      \"arrows-alt-v\",\r\n      \"assistive-listening-systems\",\r\n      \"asterisk\",\r\n      \"at\",\r\n      \"atlas\",\r\n      \"atom\",\r\n      \"audio-description\",\r\n      \"award\",\r\n      \"backspace\",\r\n      \"backward\",\r\n      \"balance-scale\",\r\n      \"ban\",\r\n      \"band-aid\",\r\n      \"barcode\",\r\n      \"bars\",\r\n      \"baseball-ball\",\r\n      \"basketball-ball\",\r\n      \"bath\",\r\n      \"battery-empty\",\r\n      \"battery-full\",\r\n      \"battery-half\",\r\n      \"battery-quarter\",\r\n      \"battery-three-quarters\",\r\n      \"bed\",\r\n      \"beer\",\r\n      \"bell\",\r\n      \"bell-slash\",\r\n      \"bezier-curve\",\r\n      \"bicycle\",\r\n      \"binoculars\",\r\n      \"birthday-cake\",\r\n      \"blender\",\r\n      \"blind\",\r\n      \"bold\",\r\n      \"bolt\",\r\n      \"bomb\",\r\n      \"bone\",\r\n      \"bong\",\r\n      \"book\",\r\n      \"book-open\",\r\n      \"book-reader\",\r\n      \"bookmark\",\r\n      \"bowling-ball\",\r\n      \"box\",\r\n      \"box-open\",\r\n      \"boxes\",\r\n      \"braille\",\r\n      \"brain\",\r\n      \"briefcase\",\r\n      \"briefcase-medical\",\r\n      \"broadcast-tower\",\r\n      \"broom\",\r\n      \"brush\",\r\n      \"bug\",\r\n      \"building\",\r\n      \"bullhorn\",\r\n      \"bullseye\",\r\n      \"burn\",\r\n      \"bus\",\r\n      \"bus-alt\",\r\n      \"calculator\",\r\n      \"calendar\",\r\n      \"calendar-alt\",\r\n      \"calendar-check\",\r\n      \"calendar-minus\",\r\n      \"calendar-plus\",\r\n      \"calendar-times\",\r\n      \"camera\",\r\n      \"camera-retro\",\r\n      \"cannabis\",\r\n      \"capsules\",\r\n      \"car\",\r\n      \"car-alt\",\r\n      \"car-battery\",\r\n      \"car-crash\",\r\n      \"car-side\",\r\n      \"caret-down\",\r\n      \"caret-left\",\r\n      \"caret-right\",\r\n      \"caret-square-down\",\r\n      \"caret-square-left\",\r\n      \"caret-square-right\",\r\n      \"caret-square-up\",\r\n      \"caret-up\",\r\n      \"cart-arrow-down\",\r\n      \"cart-plus\",\r\n      \"certificate\",\r\n      \"chalkboard\",\r\n      \"chalkboard-teacher\",\r\n      \"charging-station\",\r\n      \"chart-area\",\r\n      \"chart-bar\",\r\n      \"chart-line\",\r\n      \"chart-pie\",\r\n      \"check\",\r\n      \"check-circle\",\r\n      \"check-double\",\r\n      \"check-square\",\r\n      \"chess\",\r\n      \"chess-bishop\",\r\n      \"chess-board\",\r\n      \"chess-king\",\r\n      \"chess-knight\",\r\n      \"chess-pawn\",\r\n      \"chess-queen\",\r\n      \"chess-rook\",\r\n      \"chevron-circle-down\",\r\n      \"chevron-circle-left\",\r\n      \"chevron-circle-right\",\r\n      \"chevron-circle-up\",\r\n      \"chevron-down\",\r\n      \"chevron-left\",\r\n      \"chevron-right\",\r\n      \"chevron-up\",\r\n      \"child\",\r\n      \"church\",\r\n      \"circle\",\r\n      \"circle-notch\",\r\n      \"clipboard\",\r\n      \"clipboard-check\",\r\n      \"clipboard-list\",\r\n      \"clock\",\r\n      \"clone\",\r\n      \"closed-captioning\",\r\n      \"cloud\",\r\n      \"cloud-download-alt\",\r\n      \"cloud-upload-alt\",\r\n      \"cocktail\",\r\n      \"code\",\r\n      \"code-branch\",\r\n      \"coffee\",\r\n      \"cog\",\r\n      \"cogs\",\r\n      \"coins\",\r\n      \"columns\",\r\n      \"comment\",\r\n      \"comment-alt\",\r\n      \"comment-dots\",\r\n      \"comment-slash\",\r\n      \"comments\",\r\n      \"compact-disc\",\r\n      \"compass\",\r\n      \"compress\",\r\n      \"concierge-bell\",\r\n      \"cookie\",\r\n      \"cookie-bite\",\r\n      \"copy\",\r\n      \"copyright\",\r\n      \"couch\",\r\n      \"credit-card\",\r\n      \"crop\",\r\n      \"crop-alt\",\r\n      \"crosshairs\",\r\n      \"crow\",\r\n      \"crown\",\r\n      \"cube\",\r\n      \"cubes\",\r\n      \"cut\",\r\n      \"database\",\r\n      \"deaf\",\r\n      \"desktop\",\r\n      \"diagnoses\",\r\n      \"dice\",\r\n      \"dice-five\",\r\n      \"dice-four\",\r\n      \"dice-one\",\r\n      \"dice-six\",\r\n      \"dice-three\",\r\n      \"dice-two\",\r\n      \"digital-tachograph\",\r\n      \"directions\",\r\n      \"divide\",\r\n      \"dizzy\",\r\n      \"dna\",\r\n      \"dollar-sign\",\r\n      \"dolly\",\r\n      \"dolly-flatbed\",\r\n      \"donate\",\r\n      \"door-closed\",\r\n      \"door-open\",\r\n      \"dot-circle\",\r\n      \"dove\",\r\n      \"download\",\r\n      \"drafting-compass\",\r\n      \"draw-polygon\",\r\n      \"drum\",\r\n      \"drum-steelpan\",\r\n      \"dumbbell\",\r\n      \"edit\",\r\n      \"eject\",\r\n      \"ellipsis-h\",\r\n      \"ellipsis-v\",\r\n      \"envelope\",\r\n      \"envelope-open\",\r\n      \"envelope-square\",\r\n      \"equals\",\r\n      \"eraser\",\r\n      \"euro-sign\",\r\n      \"exchange-alt\",\r\n      \"exclamation\",\r\n      \"exclamation-circle\",\r\n      \"exclamation-triangle\",\r\n      \"expand\",\r\n      \"expand-arrows-alt\",\r\n      \"external-link-alt\",\r\n      \"external-link-square-alt\",\r\n      \"eye\",\r\n      \"eye-dropper\",\r\n      \"eye-slash\",\r\n      \"fast-backward\",\r\n      \"fast-forward\",\r\n      \"fax\",\r\n      \"feather\",\r\n      \"feather-alt\",\r\n      \"female\",\r\n      \"fighter-jet\",\r\n      \"file\",\r\n      \"file-alt\",\r\n      \"file-archive\",\r\n      \"file-audio\",\r\n      \"file-code\",\r\n      \"file-contract\",\r\n      \"file-download\",\r\n      \"file-excel\",\r\n      \"file-export\",\r\n      \"file-image\",\r\n      \"file-import\",\r\n      \"file-invoice\",\r\n      \"file-invoice-dollar\",\r\n      \"file-medical\",\r\n      \"file-medical-alt\",\r\n      \"file-pdf\",\r\n      \"file-powerpoint\",\r\n      \"file-prescription\",\r\n      \"file-signature\",\r\n      \"file-upload\",\r\n      \"file-video\",\r\n      \"file-word\",\r\n      \"fill\",\r\n      \"fill-drip\",\r\n      \"film\",\r\n      \"filter\",\r\n      \"fingerprint\",\r\n      \"fire\",\r\n      \"fire-extinguisher\",\r\n      \"first-aid\",\r\n      \"fish\",\r\n      \"flag\",\r\n      \"flag-checkered\",\r\n      \"flask\",\r\n      \"flushed\",\r\n      \"folder\",\r\n      \"folder-open\",\r\n      \"font\",\r\n      \"football-ball\",\r\n      \"forward\",\r\n      \"frog\",\r\n      \"frown\",\r\n      \"frown-open\",\r\n      \"futbol\",\r\n      \"gamepad\",\r\n      \"gas-pump\",\r\n      \"gavel\",\r\n      \"gem\",\r\n      \"genderless\",\r\n      \"gift\",\r\n      \"glass-martini\",\r\n      \"glass-martini-alt\",\r\n      \"glasses\",\r\n      \"globe\",\r\n      \"globe-africa\",\r\n      \"globe-americas\",\r\n      \"globe-asia\",\r\n      \"golf-ball\",\r\n      \"graduation-cap\",\r\n      \"greater-than\",\r\n      \"greater-than-equal\",\r\n      \"grimace\",\r\n      \"grin\",\r\n      \"grin-alt\",\r\n      \"grin-beam\",\r\n      \"grin-beam-sweat\",\r\n      \"grin-hearts\",\r\n      \"grin-squint\",\r\n      \"grin-squint-tears\",\r\n      \"grin-stars\",\r\n      \"grin-tears\",\r\n      \"grin-tongue\",\r\n      \"grin-tongue-squint\",\r\n      \"grin-tongue-wink\",\r\n      \"grin-wink\",\r\n      \"grip-horizontal\",\r\n      \"grip-vertical\",\r\n      \"h-square\",\r\n      \"hand-holding\",\r\n      \"hand-holding-heart\",\r\n      \"hand-holding-usd\",\r\n      \"hand-lizard\",\r\n      \"hand-paper\",\r\n      \"hand-peace\",\r\n      \"hand-point-down\",\r\n      \"hand-point-left\",\r\n      \"hand-point-right\",\r\n      \"hand-point-up\",\r\n      \"hand-pointer\",\r\n      \"hand-rock\",\r\n      \"hand-scissors\",\r\n      \"hand-spock\",\r\n      \"hands\",\r\n      \"hands-helping\",\r\n      \"handshake\",\r\n      \"hashtag\",\r\n      \"hdd\",\r\n      \"heading\",\r\n      \"headphones\",\r\n      \"headphones-alt\",\r\n      \"helicopter\",\r\n      \"highlighter\",\r\n      \"history\",\r\n      \"hockey-puck\",\r\n      \"home\",\r\n      \"hospital\",\r\n      \"hospital-alt\",\r\n      \"hospital-symbol\",\r\n      \"hot-tub\",\r\n      \"hotel\",\r\n      \"hourglass\",\r\n      \"hourglass-end\",\r\n      \"hourglass-half\",\r\n      \"hourglass-start\",\r\n      \"i-cursor\",\r\n      \"id-badge\",\r\n      \"id-card\",\r\n      \"id-card-alt\",\r\n      \"image\",\r\n      \"images\",\r\n      \"inbox\",\r\n      \"indent\",\r\n      \"industry\",\r\n      \"infinity\",\r\n      \"info\",\r\n      \"info-circle\",\r\n      \"italic\",\r\n      \"joint\",\r\n      \"key\",\r\n      \"keyboard\",\r\n      \"kiss\",\r\n      \"kiss-beam\",\r\n      \"kiss-wink-heart\",\r\n      \"kiwi-bird\",\r\n      \"language\",\r\n      \"laptop\",\r\n      \"laptop-code\",\r\n      \"laugh\",\r\n      \"laugh-beam\",\r\n      \"laugh-squint\",\r\n      \"laugh-wink\",\r\n      \"layer-group\",\r\n      \"leaf\",\r\n      \"lemon\",\r\n      \"less-than\",\r\n      \"less-than-equal\",\r\n      \"level-down-alt\",\r\n      \"level-up-alt\",\r\n      \"life-ring\",\r\n      \"lightbulb\",\r\n      \"link\",\r\n      \"lira-sign\",\r\n      \"list\",\r\n      \"list-alt\",\r\n      \"list-ol\",\r\n      \"list-ul\",\r\n      \"location-arrow\",\r\n      \"lock\",\r\n      \"lock-open\",\r\n      \"long-arrow-alt-down\",\r\n      \"long-arrow-alt-left\",\r\n      \"long-arrow-alt-right\",\r\n      \"long-arrow-alt-up\",\r\n      \"low-vision\",\r\n      \"luggage-cart\",\r\n      \"magic\",\r\n      \"magnet\",\r\n      \"male\",\r\n      \"map\",\r\n      \"map-marked\",\r\n      \"map-marked-alt\",\r\n      \"map-marker\",\r\n      \"map-marker-alt\",\r\n      \"map-pin\",\r\n      \"map-signs\",\r\n      \"marker\",\r\n      \"mars\",\r\n      \"mars-double\",\r\n      \"mars-stroke\",\r\n      \"mars-stroke-h\",\r\n      \"mars-stroke-v\",\r\n      \"medal\",\r\n      \"medkit\",\r\n      \"meh\",\r\n      \"meh-blank\",\r\n      \"meh-rolling-eyes\",\r\n      \"memory\",\r\n      \"mercury\",\r\n      \"microchip\",\r\n      \"microphone\",\r\n      \"microphone-alt\",\r\n      \"microphone-alt-slash\",\r\n      \"microphone-slash\",\r\n      \"microscope\",\r\n      \"minus\",\r\n      \"minus-circle\",\r\n      \"minus-square\",\r\n      \"mobile\",\r\n      \"mobile-alt\",\r\n      \"money-bill\",\r\n      \"money-bill-alt\",\r\n      \"money-bill-wave\",\r\n      \"money-bill-wave-alt\",\r\n      \"money-check\",\r\n      \"money-check-alt\",\r\n      \"monument\",\r\n      \"moon\",\r\n      \"mortar-pestle\",\r\n      \"motorcycle\",\r\n      \"mouse-pointer\",\r\n      \"music\",\r\n      \"neuter\",\r\n      \"newspaper\",\r\n      \"not-equal\",\r\n      \"notes-medical\",\r\n      \"object-group\",\r\n      \"object-ungroup\",\r\n      \"oil-can\",\r\n      \"outdent\",\r\n      \"paint-brush\",\r\n      \"paint-roller\",\r\n      \"palette\",\r\n      \"pallet\",\r\n      \"paper-plane\",\r\n      \"paperclip\",\r\n      \"parachute-box\",\r\n      \"paragraph\",\r\n      \"parking\",\r\n      \"passport\",\r\n      \"paste\",\r\n      \"pause\",\r\n      \"pause-circle\",\r\n      \"paw\",\r\n      \"pen\",\r\n      \"pen-alt\",\r\n      \"pen-fancy\",\r\n      \"pen-nib\",\r\n      \"pen-square\",\r\n      \"pencil-alt\",\r\n      \"pencil-ruler\",\r\n      \"people-carry\",\r\n      \"percent\",\r\n      \"percentage\",\r\n      \"phone\",\r\n      \"phone-slash\",\r\n      \"phone-square\",\r\n      \"phone-volume\",\r\n      \"piggy-bank\",\r\n      \"pills\",\r\n      \"plane\",\r\n      \"plane-arrival\",\r\n      \"plane-departure\",\r\n      \"play\",\r\n      \"play-circle\",\r\n      \"plug\",\r\n      \"plus\",\r\n      \"plus-circle\",\r\n      \"plus-square\",\r\n      \"podcast\",\r\n      \"poo\",\r\n      \"portrait\",\r\n      \"pound-sign\",\r\n      \"power-off\",\r\n      \"prescription\",\r\n      \"prescription-bottle\",\r\n      \"prescription-bottle-alt\",\r\n      \"print\",\r\n      \"procedures\",\r\n      \"project-diagram\",\r\n      \"puzzle-piece\",\r\n      \"qrcode\",\r\n      \"question\",\r\n      \"question-circle\",\r\n      \"quidditch\",\r\n      \"quote-left\",\r\n      \"quote-right\",\r\n      \"random\",\r\n      \"receipt\",\r\n      \"recycle\",\r\n      \"redo\",\r\n      \"redo-alt\",\r\n      \"registered\",\r\n      \"reply\",\r\n      \"reply-all\",\r\n      \"retweet\",\r\n      \"ribbon\",\r\n      \"road\",\r\n      \"robot\",\r\n      \"rocket\",\r\n      \"route\",\r\n      \"rss\",\r\n      \"rss-square\",\r\n      \"ruble-sign\",\r\n      \"ruler\",\r\n      \"ruler-combined\",\r\n      \"ruler-horizontal\",\r\n      \"ruler-vertical\",\r\n      \"rupee-sign\",\r\n      \"sad-cry\",\r\n      \"sad-tear\",\r\n      \"save\",\r\n      \"school\",\r\n      \"screwdriver\",\r\n      \"search\",\r\n      \"search-minus\",\r\n      \"search-plus\",\r\n      \"seedling\",\r\n      \"server\",\r\n      \"shapes\",\r\n      \"share\",\r\n      \"share-alt\",\r\n      \"share-alt-square\",\r\n      \"share-square\",\r\n      \"shekel-sign\",\r\n      \"shield-alt\",\r\n      \"ship\",\r\n      \"shipping-fast\",\r\n      \"shoe-prints\",\r\n      \"shopping-bag\",\r\n      \"shopping-basket\",\r\n      \"shopping-cart\",\r\n      \"shower\",\r\n      \"shuttle-van\",\r\n      \"sign\",\r\n      \"sign-in-alt\",\r\n      \"sign-language\",\r\n      \"sign-out-alt\",\r\n      \"signal\",\r\n      \"signature\",\r\n      \"sitemap\",\r\n      \"skull\",\r\n      \"sliders-h\",\r\n      \"smile\",\r\n      \"smile-beam\",\r\n      \"smile-wink\",\r\n      \"smoking\",\r\n      \"smoking-ban\",\r\n      \"snowflake\",\r\n      \"solar-panel\",\r\n      \"sort\",\r\n      \"sort-alpha-down\",\r\n      \"sort-alpha-up\",\r\n      \"sort-amount-down\",\r\n      \"sort-amount-up\",\r\n      \"sort-down\",\r\n      \"sort-numeric-down\",\r\n      \"sort-numeric-up\",\r\n      \"sort-up\",\r\n      \"spa\",\r\n      \"space-shuttle\",\r\n      \"spinner\",\r\n      \"splotch\",\r\n      \"spray-can\",\r\n      \"square\",\r\n      \"square-full\",\r\n      \"stamp\",\r\n      \"star\",\r\n      \"star-half\",\r\n      \"star-half-alt\",\r\n      \"star-of-life\",\r\n      \"step-backward\",\r\n      \"step-forward\",\r\n      \"stethoscope\",\r\n      \"sticky-note\",\r\n      \"stop\",\r\n      \"stop-circle\",\r\n      \"stopwatch\",\r\n      \"store\",\r\n      \"store-alt\",\r\n      \"stream\",\r\n      \"street-view\",\r\n      \"strikethrough\",\r\n      \"stroopwafel\",\r\n      \"subscript\",\r\n      \"subway\",\r\n      \"suitcase\",\r\n      \"suitcase-rolling\",\r\n      \"sun\",\r\n      \"superscript\",\r\n      \"surprise\",\r\n      \"swatchbook\",\r\n      \"swimmer\",\r\n      \"swimming-pool\",\r\n      \"sync\",\r\n      \"sync-alt\",\r\n      \"syringe\",\r\n      \"table\",\r\n      \"table-tennis\",\r\n      \"tablet\",\r\n      \"tablet-alt\",\r\n      \"tablets\",\r\n      \"tachometer-alt\",\r\n      \"tag\",\r\n      \"tags\",\r\n      \"tape\",\r\n      \"tasks\",\r\n      \"taxi\",\r\n      \"teeth\",\r\n      \"teeth-open\",\r\n      \"terminal\",\r\n      \"text-height\",\r\n      \"text-width\",\r\n      \"th\",\r\n      \"th-large\",\r\n      \"th-list\",\r\n      \"theater-masks\",\r\n      \"thermometer\",\r\n      \"thermometer-empty\",\r\n      \"thermometer-full\",\r\n      \"thermometer-half\",\r\n      \"thermometer-quarter\",\r\n      \"thermometer-three-quarters\",\r\n      \"thumbs-down\",\r\n      \"thumbs-up\",\r\n      \"thumbtack\",\r\n      \"ticket-alt\",\r\n      \"times\",\r\n      \"times-circle\",\r\n      \"tint\",\r\n      \"tint-slash\",\r\n      \"tired\",\r\n      \"toggle-off\",\r\n      \"toggle-on\",\r\n      \"toolbox\",\r\n      \"tooth\",\r\n      \"trademark\",\r\n      \"traffic-light\",\r\n      \"train\",\r\n      \"transgender\",\r\n      \"transgender-alt\",\r\n      \"trash\",\r\n      \"trash-alt\",\r\n      \"tree\",\r\n      \"trophy\",\r\n      \"truck\",\r\n      \"truck-loading\",\r\n      \"truck-monster\",\r\n      \"truck-moving\",\r\n      \"truck-pickup\",\r\n      \"tshirt\",\r\n      \"tty\",\r\n      \"tv\",\r\n      \"umbrella\",\r\n      \"umbrella-beach\",\r\n      \"underline\",\r\n      \"undo\",\r\n      \"undo-alt\",\r\n      \"universal-access\",\r\n      \"university\",\r\n      \"unlink\",\r\n      \"unlock\",\r\n      \"unlock-alt\",\r\n      \"upload\",\r\n      \"user\",\r\n      \"user-alt\",\r\n      \"user-alt-slash\",\r\n      \"user-astronaut\",\r\n      \"user-check\",\r\n      \"user-circle\",\r\n      \"user-clock\",\r\n      \"user-cog\",\r\n      \"user-edit\",\r\n      \"user-friends\",\r\n      \"user-graduate\",\r\n      \"user-lock\",\r\n      \"user-md\",\r\n      \"user-minus\",\r\n      \"user-ninja\",\r\n      \"user-plus\",\r\n      \"user-secret\",\r\n      \"user-shield\",\r\n      \"user-slash\",\r\n      \"user-tag\",\r\n      \"user-tie\",\r\n      \"user-times\",\r\n      \"users\",\r\n      \"users-cog\",\r\n      \"utensil-spoon\",\r\n      \"utensils\",\r\n      \"vector-square\",\r\n      \"venus\",\r\n      \"venus-double\",\r\n      \"venus-mars\",\r\n      \"vial\",\r\n      \"vials\",\r\n      \"video\",\r\n      \"video-slash\",\r\n      \"volleyball-ball\",\r\n      \"volume-down\",\r\n      \"volume-off\",\r\n      \"volume-up\",\r\n      \"walking\",\r\n      \"wallet\",\r\n      \"warehouse\",\r\n      \"weight\",\r\n      \"weight-hanging\",\r\n      \"wheelchair\",\r\n      \"wifi\",\r\n      \"window-close\",\r\n      \"window-maximize\",\r\n      \"window-minimize\",\r\n      \"window-restore\",\r\n      \"wine-glass\",\r\n      \"wine-glass-alt\",\r\n      \"won-sign\",\r\n      \"wrench\",\r\n      \"x-ray\",\r\n      \"yen-sign\"\r\n    ],\r\n    iconsBrand: [\r\n      \"500px\",\r\n      \"accessible-icon\",\r\n      \"accusoft\",\r\n      \"adn\",\r\n      \"adversal\",\r\n      \"affiliatetheme\",\r\n      \"algolia\",\r\n      \"amazon\",\r\n      \"amazon-pay\",\r\n      \"amilia\",\r\n      \"android\",\r\n      \"angellist\",\r\n      \"angrycreative\",\r\n      \"angular\",\r\n      \"app-store\",\r\n      \"app-store-ios\",\r\n      \"apper\",\r\n      \"apple\",\r\n      \"apple-pay\",\r\n      \"asymmetrik\",\r\n      \"audible\",\r\n      \"autoprefixer\",\r\n      \"avianex\",\r\n      \"aviato\",\r\n      \"aws\",\r\n      \"bandcamp\",\r\n      \"behance\",\r\n      \"behance-square\",\r\n      \"bimobject\",\r\n      \"bitbucket\",\r\n      \"bitcoin\",\r\n      \"bity\",\r\n      \"black-tie\",\r\n      \"blackberry\",\r\n      \"blogger\",\r\n      \"blogger-b\",\r\n      \"bluetooth\",\r\n      \"bluetooth-b\",\r\n      \"btc\",\r\n      \"buromobelexperte\",\r\n      \"buysellads\",\r\n      \"cc-amazon-pay\",\r\n      \"cc-amex\",\r\n      \"cc-apple-pay\",\r\n      \"cc-diners-club\",\r\n      \"cc-discover\",\r\n      \"cc-jcb\",\r\n      \"cc-mastercard\",\r\n      \"cc-paypal\",\r\n      \"cc-stripe\",\r\n      \"cc-visa\",\r\n      \"centercode\",\r\n      \"chrome\",\r\n      \"cloudscale\",\r\n      \"cloudsmith\",\r\n      \"cloudversify\",\r\n      \"vcodepen\",\r\n      \"codiepie\",\r\n      \"connectdevelop\",\r\n      \"contao\",\r\n      \"cpanel\",\r\n      \"creative-commons\",\r\n      \"creative-commons-by\",\r\n      \"creative-commons-nc\",\r\n      \"creative-commons-nc-eu\",\r\n      \"creative-commons-nc-jp\",\r\n      \"creative-commons-nd\",\r\n      \"creative-commons-pd\",\r\n      \"creative-commons-pd-alt\",\r\n      \"creative-commons-remix\",\r\n      \"creative-commons-sa\",\r\n      \"creative-commons-sampling\",\r\n      \"creative-commons-sampling-plus\",\r\n      \"creative-commons-share\",\r\n      \"css3\",\r\n      \"css3-alt\",\r\n      \"cuttlefish\",\r\n      \"d-and-d\",\r\n      \"dashcube\",\r\n      \"delicious\",\r\n      \"deploydog\",\r\n      \"deskpro\",\r\n      \"deviantart\",\r\n      \"digg\",\r\n      \"digital-ocean\",\r\n      \"discord\",\r\n      \"discourse\",\r\n      \"dochub\",\r\n      \"docker\",\r\n      \"draft2digital\",\r\n      \"dribbble\",\r\n      \"dribbble-square\",\r\n      \"dropbox\",\r\n      \"drupal\",\r\n      \"dyalog\",\r\n      \"earlybirds\",\r\n      \"ebay\",\r\n      \"edge\",\r\n      \"elementor\",\r\n      \"ello\",\r\n      \"ember\",\r\n      \"empire\",\r\n      \"envira\",\r\n      \"erlang\",\r\n      \"ethereum\",\r\n      \"etsy\",\r\n      \"expeditedssl\",\r\n      \"facebook\",\r\n      \"facebook-f\",\r\n      \"facebook-messenger\",\r\n      \"facebook-square\",\r\n      \"firefox\",\r\n      \"first-order\",\r\n      \"first-order-alt\",\r\n      \"firstdraft\",\r\n      \"flickr\",\r\n      \"flipboard\",\r\n      \"fly\",\r\n      \"font-awesome\",\r\n      \"font-awesome-alt\",\r\n      \"font-awesome-flag\",\r\n      \"fonticons\",\r\n      \"fonticons-fi\",\r\n      \"fort-awesome\",\r\n      \"fort-awesome-alt\",\r\n      \"forumbee\",\r\n      \"foursquare\",\r\n      \"free-code-camp\",\r\n      \"freebsd\",\r\n      \"fulcrum\",\r\n      \"galactic-republic\",\r\n      \"galactic-senate\",\r\n      \"get-pocket\",\r\n      \"gg\",\r\n      \"gg-circle\",\r\n      \"git\",\r\n      \"git-square\",\r\n      \"github\",\r\n      \"github-alt\",\r\n      \"github-square\",\r\n      \"gitkraken\",\r\n      \"gitlab\",\r\n      \"gitter\",\r\n      \"glide\",\r\n      \"glide-g\",\r\n      \"gofore\",\r\n      \"goodreads\",\r\n      \"goodreads-g\",\r\n      \"google\",\r\n      \"google-drive\",\r\n      \"google-play\",\r\n      \"google-plus\",\r\n      \"google-plus-g\",\r\n      \"google-plus-square\",\r\n      \"google-wallet\",\r\n      \"gratipay\",\r\n      \"grav\",\r\n      \"gripfire\",\r\n      \"grunt\",\r\n      \"gulp\",\r\n      \"hacker-news\",\r\n      \"hacker-news-square\",\r\n      \"hackerrank\",\r\n      \"hips\",\r\n      \"hire-a-helper\",\r\n      \"hooli\",\r\n      \"hornbill\",\r\n      \"hotjar\",\r\n      \"houzz\",\r\n      \"html5\",\r\n      \"hubspot\",\r\n      \"imdb\",\r\n      \"instagram\",\r\n      \"internet-explorer\",\r\n      \"ioxhost\",\r\n      \"itunes\",\r\n      \"itunes-note\",\r\n      \"java\",\r\n      \"jedi-order\",\r\n      \"jenkins\",\r\n      \"joget\",\r\n      \"joomla\",\r\n      \"js\",\r\n      \"js-square\",\r\n      \"jsfiddle\",\r\n      \"kaggle\",\r\n      \"keybase\",\r\n      \"keycdn\",\r\n      \"kickstarter\",\r\n      \"kickstarter-k\",\r\n      \"korvue\",\r\n      \"laravel\",\r\n      \"lastfm\",\r\n      \"lastfm-square\",\r\n      \"leanpub\",\r\n      \"less\",\r\n      \"line\",\r\n      \"linkedin\",\r\n      \"linkedin-in\",\r\n      \"linode\",\r\n      \"linux\",\r\n      \"lyft\",\r\n      \"magento\",\r\n      \"mailchimp\",\r\n      \"mandalorian\",\r\n      \"markdown\",\r\n      \"mastodon\",\r\n      \"maxcdn\",\r\n      \"medapps\",\r\n      \"medium\",\r\n      \"medium-m\",\r\n      \"medrt\",\r\n      \"meetup\",\r\n      \"megaport\",\r\n      \"microsoft\",\r\n      \"mix\",\r\n      \"mixcloud\",\r\n      \"mizuni\",\r\n      \"modx\",\r\n      \"monero\",\r\n      \"napster\",\r\n      \"neos\",\r\n      \"nimblr\",\r\n      \"nintendo-switch\",\r\n      \"node\",\r\n      \"node-js\",\r\n      \"npm\",\r\n      \"ns8\",\r\n      \"nutritionix\",\r\n      \"odnoklassniki\",\r\n      \"odnoklassniki-square\",\r\n      \"old-republic\",\r\n      \"opencart\",\r\n      \"openid\",\r\n      \"opera\",\r\n      \"optin-monster\",\r\n      \"osi\",\r\n      \"page4\",\r\n      \"pagelines\",\r\n      \"palfed\",\r\n      \"patreon\",\r\n      \"paypal\",\r\n      \"periscope\",\r\n      \"phabricator\",\r\n      \"phoenix-framework\",\r\n      \"phoenix-squadron\",\r\n      \"php\",\r\n      \"pied-piper\",\r\n      \"pied-piper-alt\",\r\n      \"pied-piper-hat\",\r\n      \"pied-piper-pp\",\r\n      \"pinterest\",\r\n      \"pinterest-p\",\r\n      \"pinterest-square\",\r\n      \"playstation\",\r\n      \"product-hunt\",\r\n      \"pushed\",\r\n      \"python\",\r\n      \"qq\",\r\n      \"quinscape\",\r\n      \"quora\",\r\n      \"r-project\",\r\n      \"ravelry\",\r\n      \"react\",\r\n      \"readme\",\r\n      \"rebel\",\r\n      \"red-river\",\r\n      \"reddit\",\r\n      \"reddit-alien\",\r\n      \"reddit-square\",\r\n      \"rendact\",\r\n      \"renren\",\r\n      \"replyd\",\r\n      \"researchgate\",\r\n      \"resolving\",\r\n      \"rev\",\r\n      \"rocketchat\",\r\n      \"rockrms\",\r\n      \"safari\",\r\n      \"sass\",\r\n      \"schlix\",\r\n      \"scribd\",\r\n      \"searchengin\",\r\n      \"sellcast\",\r\n      \"sellsy\",\r\n      \"servicestack\",\r\n      \"shirtsinbulk\",\r\n      \"shopware\",\r\n      \"simplybuilt\",\r\n      \"sistrix\",\r\n      \"sith\",\r\n      \"skyatlas\",\r\n      \"skype\",\r\n      \"slack\",\r\n      \"slack-hash\",\r\n      \"slideshare\",\r\n      \"snapchat\",\r\n      \"snapchat-ghost\",\r\n      \"snapchat-square\",\r\n      \"soundcloud\",\r\n      \"speakap\",\r\n      \"spotify\",\r\n      \"squarespace\",\r\n      \"stack-exchange\",\r\n      \"stack-overflow\",\r\n      \"staylinked\",\r\n      \"steam\",\r\n      \"steam-square\",\r\n      \"steam-symbol\",\r\n      \"sticker-mule\",\r\n      \"strava\",\r\n      \"stripe\",\r\n      \"stripe-s\",\r\n      \"studiovinari\",\r\n      \"stumbleupon\",\r\n      \"stumbleupon-circle\",\r\n      \"superpowers\",\r\n      \"supple\",\r\n      \"telegram\",\r\n      \"telegram-plane\",\r\n      \"tencent-weibo\",\r\n      \"themeco\",\r\n      \"themeisle\",\r\n      \"trade-federation\",\r\n      \"trello\",\r\n      \"tripadvisor\",\r\n      \"tumblr\",\r\n      \"tumblr-square\",\r\n      \"twitch\",\r\n      \"twitter\",\r\n      \"twitter-square\",\r\n      \"typo3\",\r\n      \"uber\",\r\n      \"uikit\",\r\n      \"uniregistry\",\r\n      \"untappd\",\r\n      \"usb\",\r\n      \"ussunnah\",\r\n      \"vaadin\",\r\n      \"viacoin\",\r\n      \"viadeo\",\r\n      \"viadeo-square\",\r\n      \"viber\",\r\n      \"vimeo\",\r\n      \"vimeo-square\",\r\n      \"vimeo-v\",\r\n      \"vine\",\r\n      \"vk\",\r\n      \"vnv\",\r\n      \"vuejs\",\r\n      \"weebly\",\r\n      \"weibo\",\r\n      \"weixin\",\r\n      \"whatsapp\",\r\n      \"whatsapp-square\",\r\n      \"whmcs\",\r\n      \"wikipedia-w\",\r\n      \"windows\",\r\n      \"wix\",\r\n      \"wolf-pack-battalion\",\r\n      \"wordpress\",\r\n      \"wordpress-simple\",\r\n      \"wpbeginner\",\r\n      \"wpexplorer\",\r\n      \"wpforms\",\r\n      \"xbox\",\r\n      \"xing\",\r\n      \"xing-square\",\r\n      \"y-combinator\",\r\n      \"yahoo\",\r\n      \"yandex\",\r\n      \"yandex-international\",\r\n      \"yelp\",\r\n      \"yoast\",\r\n      \"youtube\",\r\n      \"youtube-square\",\r\n      \"zhihu\"\r\n    ]\r\n  })\r\n};\r\n</script>\r\n\r\n<style scoped>\r\n.faicon {\r\n  min-height: 30px;\r\n  text-align: center;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$g = "data-v-98884e52";
  /* module identifier */
  const __vue_module_identifier__$g = undefined;
  /* functional template */
  const __vue_is_functional_template__$g = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$g = normalizeComponent(
    { render: __vue_render__$g, staticRenderFns: __vue_staticRenderFns__$g },
    __vue_inject_styles__$g,
    __vue_script__$g,
    __vue_scope_id__$g,
    __vue_is_functional_template__$g,
    __vue_module_identifier__$g,
    false,
    createInjector,
    undefined,
    undefined
  );

let ImageZoomOnHover = class ImageZoomOnHover extends Vue {
    // Compute style of image.
    get imageStyle() {
        return {
            "background-color": "#fff",
            "background-image": "url(" + this.imageUrl + ")",
            "background-size": "contain",
            "background-position": "center",
            transition: "all 0.5s ease",
            height: "100%",
            width: "100%"
        };
    }
};
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], ImageZoomOnHover.prototype, "imageUrl", void 0);
ImageZoomOnHover = __decorate([
    vuePropertyDecorator.Component({})
], ImageZoomOnHover);
var script$f = ImageZoomOnHover;

/* script */
const __vue_script__$h = script$f;

/* template */
var __vue_render__$h = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "zoomer" }, [
    _c("div", { staticClass: "zoomed", style: _vm.imageStyle })
  ])
};
var __vue_staticRenderFns__$h = [];
__vue_render__$h._withStripped = true;

  /* style */
  const __vue_inject_styles__$h = function (inject) {
    if (!inject) return
    inject("data-v-ad5a208c_0", { source: "\n.zoomer[data-v-ad5a208c] {\r\n  position: absolute;\r\n  top: 0px;\r\n  left: 0px;\r\n  bottom: 0px;\r\n  right: 0px;\r\n  margin: 10px;\n}\n.zoomed[data-v-ad5a208c] {\r\n  transition: all 0.5s ease;\n}\n.zoomed[data-v-ad5a208c]:hover {\r\n  transform: scale(1.05);\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\common\\ImageZoomOnHover.vue"],"names":[],"mappings":";AA8BA;EACA,kBAAA;EACA,QAAA;EACA,SAAA;EACA,WAAA;EACA,UAAA;EACA,YAAA;AACA;AACA;EACA,yBAAA;AACA;AACA;EACA,sBAAA;AACA","file":"ImageZoomOnHover.vue","sourcesContent":["<template>\r\n  <div class=\"zoomer\">\r\n    <div class=\"zoomed\" :style=\"imageStyle\" />\r\n  </div>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\nimport { Component, Prop } from \"vue-property-decorator\";\r\n\r\n@Component({})\r\nexport default class ImageZoomOnHover extends Vue {\r\n  @Prop() readonly imageUrl!: string;\r\n\r\n  // Compute style of image.\r\n  get imageStyle() {\r\n    return {\r\n      \"background-color\": \"#fff\",\r\n      \"background-image\": \"url(\" + this.imageUrl + \")\",\r\n      \"background-size\": \"contain\",\r\n      \"background-position\": \"center\",\r\n      transition: \"all 0.5s ease\",\r\n      height: \"100%\",\r\n      width: \"100%\"\r\n    };\r\n  }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.zoomer {\r\n  position: absolute;\r\n  top: 0px;\r\n  left: 0px;\r\n  bottom: 0px;\r\n  right: 0px;\r\n  margin: 10px;\r\n}\r\n.zoomed {\r\n  transition: all 0.5s ease;\r\n}\r\n.zoomed:hover {\r\n  transform: scale(1.05);\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$h = "data-v-ad5a208c";
  /* module identifier */
  const __vue_module_identifier__$h = undefined;
  /* functional template */
  const __vue_is_functional_template__$h = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$h = normalizeComponent(
    { render: __vue_render__$h, staticRenderFns: __vue_staticRenderFns__$h },
    __vue_inject_styles__$h,
    __vue_script__$h,
    __vue_scope_id__$h,
    __vue_is_functional_template__$h,
    __vue_module_identifier__$h,
    false,
    createInjector,
    undefined,
    undefined
  );

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

var script$g = {
  data: () => ({}),

  props: ["label", "url", "text"],

  components: {
    HeaderField: __vue_component__$f
  },

  methods: {
    // Handle link clicked.
    onLinkClicked: function() {
      routeTo(this, this.url);
    }
  }
};

/* script */
const __vue_script__$i = script$g;

/* template */
var __vue_render__$i = function() {
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
var __vue_staticRenderFns__$i = [];
__vue_render__$i._withStripped = true;

  /* style */
  const __vue_inject_styles__$i = function (inject) {
    if (!inject) return
    inject("data-v-ff72be10_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"LinkedHeaderField.vue"}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$i = "data-v-ff72be10";
  /* module identifier */
  const __vue_module_identifier__$i = undefined;
  /* functional template */
  const __vue_is_functional_template__$i = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$i = normalizeComponent(
    { render: __vue_render__$i, staticRenderFns: __vue_staticRenderFns__$i },
    __vue_inject_styles__$i,
    __vue_script__$i,
    __vue_scope_id__$i,
    __vue_is_functional_template__$i,
    __vue_module_identifier__$i,
    false,
    createInjector,
    undefined,
    undefined
  );

let LoadingOverlay = class LoadingOverlay extends Vue {
};
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], LoadingOverlay.prototype, "loadingMessage", void 0);
LoadingOverlay = __decorate([
    vuePropertyDecorator.Component({})
], LoadingOverlay);
var script$h = LoadingOverlay;

/* script */
const __vue_script__$j = script$h;

/* template */
var __vue_render__$j = function() {
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
var __vue_staticRenderFns__$j = [];
__vue_render__$j._withStripped = true;

  /* style */
  const __vue_inject_styles__$j = function (inject) {
    if (!inject) return
    inject("data-v-003323df_0", { source: "\n.overlay[data-v-003323df] {\r\n  position: absolute;\r\n  top: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  right: 0;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\common\\LoadingOverlay.vue"],"names":[],"mappings":";AA6BA;EACA,kBAAA;EACA,MAAA;EACA,SAAA;EACA,OAAA;EACA,QAAA;AACA","file":"LoadingOverlay.vue","sourcesContent":["<template>\r\n  <div class=\"overlay\">\r\n    <v-container fill-height>\r\n      <v-layout align-center justify-center column fill-height>\r\n        <v-flex xs5 />\r\n        <v-flex xs1>\r\n          <v-progress-circular size=\"65\" color=\"#666\" class=\"mb-4\" :indeterminate=\"true\" />\r\n        </v-flex>\r\n        <v-flex xs1>\r\n          <div class=\"subheading\" style=\"color: #666;\">{{ loadingMessage || 'Loading ...' }}</div>\r\n        </v-flex>\r\n        <v-flex xs5 />\r\n      </v-layout>\r\n    </v-container>\r\n  </div>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport { Component, Prop } from \"vue-property-decorator\";\r\n\r\nimport Vue from \"vue\";\r\n\r\n@Component({})\r\nexport default class LoadingOverlay extends Vue {\r\n  @Prop() readonly loadingMessage!: string;\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.overlay {\r\n  position: absolute;\r\n  top: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  right: 0;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$j = "data-v-003323df";
  /* module identifier */
  const __vue_module_identifier__$j = undefined;
  /* functional template */
  const __vue_is_functional_template__$j = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$j = normalizeComponent(
    { render: __vue_render__$j, staticRenderFns: __vue_staticRenderFns__$j },
    __vue_inject_styles__$j,
    __vue_script__$j,
    __vue_scope_id__$j,
    __vue_is_functional_template__$j,
    __vue_module_identifier__$j,
    false,
    createInjector,
    undefined,
    undefined
  );

let ContentDeleteIcon = class ContentDeleteIcon extends Vue {
    onDeleteClicked() {
        this.$emit("delete");
    }
};
ContentDeleteIcon = __decorate([
    vuePropertyDecorator.Component({
        components: {}
    })
], ContentDeleteIcon);
var script$i = ContentDeleteIcon;

/* script */
const __vue_script__$k = script$i;

/* template */
var __vue_render__$k = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-icon",
    {
      staticClass: "trash",
      attrs: { small: "" },
      on: { click: _vm.onDeleteClicked }
    },
    [_vm._v("fa-trash")]
  )
};
var __vue_staticRenderFns__$k = [];
__vue_render__$k._withStripped = true;

  /* style */
  const __vue_inject_styles__$k = function (inject) {
    if (!inject) return
    inject("data-v-6779f9fa_0", { source: "\n.trash[data-v-6779f9fa] {\r\n  color: #ddd;\n}\n.trash[data-v-6779f9fa]:hover {\r\n  color: #999;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\configuration\\ContentDeleteIcon.vue"],"names":[],"mappings":";AAmBA;EACA,WAAA;AACA;AACA;EACA,WAAA;AACA","file":"ContentDeleteIcon.vue","sourcesContent":["<template>\r\n  <v-icon small class=\"trash\" @click=\"onDeleteClicked\">fa-trash</v-icon>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\nimport { Component } from \"vue-property-decorator\";\r\n\r\n@Component({\r\n  components: {}\r\n})\r\nexport default class ContentDeleteIcon extends Vue {\r\n  onDeleteClicked(): void {\r\n    this.$emit(\"delete\");\r\n  }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.trash {\r\n  color: #ddd;\r\n}\r\n.trash:hover {\r\n  color: #999;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$k = "data-v-6779f9fa";
  /* module identifier */
  const __vue_module_identifier__$k = undefined;
  /* functional template */
  const __vue_is_functional_template__$k = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$k = normalizeComponent(
    { render: __vue_render__$k, staticRenderFns: __vue_staticRenderFns__$k },
    __vue_inject_styles__$k,
    __vue_script__$k,
    __vue_scope_id__$k,
    __vue_is_functional_template__$k,
    __vue_module_identifier__$k,
    false,
    createInjector,
    undefined,
    undefined
  );

let ContentField = class ContentField extends Vue {
    get displayValue() {
        return this.password ? "***" : this.value;
    }
};
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], ContentField.prototype, "name", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], ContentField.prototype, "value", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Boolean)
], ContentField.prototype, "alt", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Boolean)
], ContentField.prototype, "password", void 0);
ContentField = __decorate([
    vuePropertyDecorator.Component({
        components: {}
    })
], ContentField);
var script$j = ContentField;

/* script */
const __vue_script__$l = script$j;

/* template */
var __vue_render__$l = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-card",
    {
      staticClass: "caption mb-1",
      attrs: { color: _vm.alt ? "#fafafa" : "#ffffff", flat: "" }
    },
    [
      _c(
        "span",
        {
          staticStyle: {
            display: "inline-block",
            width: "180px",
            "font-weight": "700"
          }
        },
        [_vm._v("\n    " + _vm._s(_vm.name) + "\n  ")]
      ),
      _vm._v(" "),
      _c("span", { staticStyle: { display: "inline-block", width: "400px" } }, [
        _vm._v(_vm._s(_vm.displayValue))
      ])
    ]
  )
};
var __vue_staticRenderFns__$l = [];
__vue_render__$l._withStripped = true;

  /* style */
  const __vue_inject_styles__$l = function (inject) {
    if (!inject) return
    inject("data-v-815bc036_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"ContentField.vue"}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$l = "data-v-815bc036";
  /* module identifier */
  const __vue_module_identifier__$l = undefined;
  /* functional template */
  const __vue_is_functional_template__$l = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$l = normalizeComponent(
    { render: __vue_render__$l, staticRenderFns: __vue_staticRenderFns__$l },
    __vue_inject_styles__$l,
    __vue_script__$l,
    __vue_scope_id__$l,
    __vue_is_functional_template__$l,
    __vue_module_identifier__$l,
    false,
    createInjector,
    undefined,
    undefined
  );

let ContentLink = class ContentLink extends Vue {
    onLinkClicked() {
        this.$emit("linkClicked");
    }
};
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], ContentLink.prototype, "icon", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], ContentLink.prototype, "text", void 0);
ContentLink = __decorate([
    vuePropertyDecorator.Component({
        components: {}
    })
], ContentLink);
var script$k = ContentLink;

/* script */
const __vue_script__$m = script$k;

/* template */
var __vue_render__$m = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-card",
    {
      staticClass: "caption mb-1",
      attrs: { flat: "" },
      on: { click: _vm.onLinkClicked }
    },
    [
      _c("a", { staticClass: "clink" }, [_vm._v(_vm._s(_vm.text))]),
      _vm._v(" "),
      _c("v-icon", { staticClass: "ilink" }, [_vm._v(_vm._s(_vm.icon))])
    ],
    1
  )
};
var __vue_staticRenderFns__$m = [];
__vue_render__$m._withStripped = true;

  /* style */
  const __vue_inject_styles__$m = function (inject) {
    if (!inject) return
    inject("data-v-0c4c3566_0", { source: "\n.clink[data-v-0c4c3566] {\r\n  color: #2255cc;\r\n  font-size: 13px;\n}\n.clink[data-v-0c4c3566]:hover {\r\n  text-decoration: underline;\n}\n.ilink[data-v-0c4c3566] {\r\n  color: #2255cc;\r\n  line-height: 1.17;\r\n  font-size: 11px;\r\n  margin-left: 5px;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\configuration\\ContentLink.vue"],"names":[],"mappings":";AAyBA;EACA,cAAA;EACA,eAAA;AACA;AACA;EACA,0BAAA;AACA;AACA;EACA,cAAA;EACA,iBAAA;EACA,eAAA;EACA,gBAAA;AACA","file":"ContentLink.vue","sourcesContent":["<template>\r\n  <v-card @click=\"onLinkClicked\" flat class=\"caption mb-1\">\r\n    <a class=\"clink\">{{ text }}</a>\r\n    <v-icon class=\"ilink\">{{ icon }}</v-icon>\r\n  </v-card>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\nimport { Component, Prop } from \"vue-property-decorator\";\r\n\r\n@Component({\r\n  components: {}\r\n})\r\nexport default class ContentLink extends Vue {\r\n  @Prop() readonly icon!: string;\r\n  @Prop() readonly text!: string;\r\n\r\n  onLinkClicked() {\r\n    this.$emit(\"linkClicked\");\r\n  }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.clink {\r\n  color: #2255cc;\r\n  font-size: 13px;\r\n}\r\n.clink:hover {\r\n  text-decoration: underline;\r\n}\r\n.ilink {\r\n  color: #2255cc;\r\n  line-height: 1.17;\r\n  font-size: 11px;\r\n  margin-left: 5px;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$m = "data-v-0c4c3566";
  /* module identifier */
  const __vue_module_identifier__$m = undefined;
  /* functional template */
  const __vue_is_functional_template__$m = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$m = normalizeComponent(
    { render: __vue_render__$m, staticRenderFns: __vue_staticRenderFns__$m },
    __vue_inject_styles__$m,
    __vue_script__$m,
    __vue_scope_id__$m,
    __vue_is_functional_template__$m,
    __vue_module_identifier__$m,
    false,
    createInjector,
    undefined,
    undefined
  );

let ContentHeader = class ContentHeader extends Vue {
    get iconClass() {
        return this.fa ? "icon-fa" : "icon-non-fa";
    }
};
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], ContentHeader.prototype, "title", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], ContentHeader.prototype, "icon", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Boolean)
], ContentHeader.prototype, "fa", void 0);
ContentHeader = __decorate([
    vuePropertyDecorator.Component({
        components: {}
    })
], ContentHeader);
var script$l = ContentHeader;

/* script */
const __vue_script__$n = script$l;

/* template */
var __vue_render__$n = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-card",
    { staticClass: "mb-3", attrs: { flat: "" } },
    [
      _c("v-icon", { class: _vm.iconClass }, [_vm._v(_vm._s(_vm.icon))]),
      _vm._v(" "),
      _c("span", { staticClass: "subheading" }, [
        _vm._v(_vm._s(_vm.title) + ":")
      ])
    ],
    1
  )
};
var __vue_staticRenderFns__$n = [];
__vue_render__$n._withStripped = true;

  /* style */
  const __vue_inject_styles__$n = function (inject) {
    if (!inject) return
    inject("data-v-a5172b64_0", { source: "\n.icon-fa[data-v-a5172b64] {\r\n  font-size: 13px !important;\r\n  width: 25px;\n}\n.icon-non-fa[data-v-a5172b64] {\r\n  font-size: 16px !important;\r\n  width: 25px;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\configuration\\ContentHeader.vue"],"names":[],"mappings":";AA0BA;EACA,0BAAA;EACA,WAAA;AACA;AACA;EACA,0BAAA;EACA,WAAA;AACA","file":"ContentHeader.vue","sourcesContent":["<template>\r\n  <v-card flat class=\"mb-3\">\r\n    <v-icon :class=\"iconClass\">{{ icon }}</v-icon>\r\n    <span class=\"subheading\">{{ title }}:</span>\r\n  </v-card>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\nimport { Component, Prop } from \"vue-property-decorator\";\r\n\r\n@Component({\r\n  components: {}\r\n})\r\nexport default class ContentHeader extends Vue {\r\n  @Prop() readonly title!: string;\r\n  @Prop() readonly icon!: string;\r\n  @Prop() readonly fa!: boolean;\r\n\r\n  get iconClass(): string {\r\n    return this.fa ? \"icon-fa\" : \"icon-non-fa\";\r\n  }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.icon-fa {\r\n  font-size: 13px !important;\r\n  width: 25px;\r\n}\r\n.icon-non-fa {\r\n  font-size: 16px !important;\r\n  width: 25px;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$n = "data-v-a5172b64";
  /* module identifier */
  const __vue_module_identifier__$n = undefined;
  /* functional template */
  const __vue_is_functional_template__$n = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$n = normalizeComponent(
    { render: __vue_render__$n, staticRenderFns: __vue_staticRenderFns__$n },
    __vue_inject_styles__$n,
    __vue_script__$n,
    __vue_scope_id__$n,
    __vue_is_functional_template__$n,
    __vue_module_identifier__$n,
    false,
    createInjector,
    undefined,
    undefined
  );

let Section = class Section extends Vue {
};
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], Section.prototype, "icon", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Boolean)
], Section.prototype, "fa", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], Section.prototype, "title", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], Section.prototype, "help", void 0);
Section = __decorate([
    vuePropertyDecorator.Component({
        components: { ContentHeader: __vue_component__$n }
    })
], Section);
var script$m = Section;

/* script */
const __vue_script__$o = script$m;

/* template */
var __vue_render__$o = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-card",
    { staticStyle: { display: "relative" }, attrs: { flat: "" } },
    [
      _c("content-header", {
        attrs: { title: _vm.title, icon: _vm.icon, fa: _vm.fa }
      }),
      _vm._v(" "),
      _c(
        "v-card",
        { staticStyle: { "margin-left": "25px" }, attrs: { flat: "" } },
        [_vm._t("default")],
        2
      ),
      _vm._v(" "),
      _c("div", { staticClass: "overlay" }, [_vm._t("overlay")], 2)
    ],
    1
  )
};
var __vue_staticRenderFns__$o = [];
__vue_render__$o._withStripped = true;

  /* style */
  const __vue_inject_styles__$o = function (inject) {
    if (!inject) return
    inject("data-v-55dc39f8_0", { source: "\n.overlay[data-v-55dc39f8] {\r\n  position: absolute;\r\n  left: 50%;\r\n  right: 0;\r\n  top: 0;\r\n  bottom: 0;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\configuration\\ContentSection.vue"],"names":[],"mappings":";AA8BA;EACA,kBAAA;EACA,SAAA;EACA,QAAA;EACA,MAAA;EACA,SAAA;AACA","file":"ContentSection.vue","sourcesContent":["<template>\r\n  <v-card style=\"display: relative;\" flat>\r\n    <content-header :title=\"title\" :icon=\"icon\" :fa=\"fa\" />\r\n    <v-card flat style=\"margin-left: 25px;\">\r\n      <slot />\r\n    </v-card>\r\n    <div class=\"overlay\">\r\n      <slot name=\"overlay\" />\r\n    </div>\r\n  </v-card>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\nimport { Component, Prop } from \"vue-property-decorator\";\r\n\r\nimport ContentHeader from \"./ContentHeader.vue\";\r\n\r\n@Component({\r\n  components: { ContentHeader }\r\n})\r\nexport default class Section extends Vue {\r\n  @Prop() readonly icon!: string;\r\n  @Prop() readonly fa!: boolean;\r\n  @Prop() readonly title!: string;\r\n  @Prop() readonly help!: string;\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.overlay {\r\n  position: absolute;\r\n  left: 50%;\r\n  right: 0;\r\n  top: 0;\r\n  bottom: 0;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$o = "data-v-55dc39f8";
  /* module identifier */
  const __vue_module_identifier__$o = undefined;
  /* functional template */
  const __vue_is_functional_template__$o = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$o = normalizeComponent(
    { render: __vue_render__$o, staticRenderFns: __vue_staticRenderFns__$o },
    __vue_inject_styles__$o,
    __vue_script__$o,
    __vue_scope_id__$o,
    __vue_is_functional_template__$o,
    __vue_module_identifier__$o,
    false,
    createInjector,
    undefined,
    undefined
  );

let ContentWarning = class ContentWarning extends Vue {
};
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], ContentWarning.prototype, "text", void 0);
ContentWarning = __decorate([
    vuePropertyDecorator.Component({
        components: {}
    })
], ContentWarning);
var script$n = ContentWarning;

/* script */
const __vue_script__$p = script$n;

/* template */
var __vue_render__$p = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-card",
    {
      staticClass: "pa-2",
      staticStyle: { border: "1px solid #ddddcc" },
      attrs: { color: "#fffff5", flat: "" }
    },
    [
      _c("v-icon", { staticClass: "mr-2", attrs: { small: "" } }, [
        _vm._v("fa-exclamation-circle")
      ]),
      _vm._v("\n  " + _vm._s(_vm.text) + "\n")
    ],
    1
  )
};
var __vue_staticRenderFns__$p = [];
__vue_render__$p._withStripped = true;

  /* style */
  const __vue_inject_styles__$p = function (inject) {
    if (!inject) return
    inject("data-v-7885369f_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"ContentWarning.vue"}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$p = "data-v-7885369f";
  /* module identifier */
  const __vue_module_identifier__$p = undefined;
  /* functional template */
  const __vue_is_functional_template__$p = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$p = normalizeComponent(
    { render: __vue_render__$p, staticRenderFns: __vue_staticRenderFns__$p },
    __vue_inject_styles__$p,
    __vue_script__$p,
    __vue_scope_id__$p,
    __vue_is_functional_template__$p,
    __vue_module_identifier__$p,
    false,
    createInjector,
    undefined,
    undefined
  );

let DatatableLink = class DatatableLink extends Vue {
    onLinkClicked() {
        this.$emit("linkClicked");
    }
};
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], DatatableLink.prototype, "text", void 0);
DatatableLink = __decorate([
    vuePropertyDecorator.Component({
        components: {}
    })
], DatatableLink);
var script$o = DatatableLink;

/* script */
const __vue_script__$q = script$o;

/* template */
var __vue_render__$q = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-card",
    {
      staticClass: "caption",
      staticStyle: { "background-color": "transparent" },
      attrs: { flat: "" },
      on: { click: _vm.onLinkClicked }
    },
    [_c("a", { staticClass: "clink" }, [_vm._v(_vm._s(_vm.text))])]
  )
};
var __vue_staticRenderFns__$q = [];
__vue_render__$q._withStripped = true;

  /* style */
  const __vue_inject_styles__$q = function (inject) {
    if (!inject) return
    inject("data-v-bd136fec_0", { source: "\n.clink[data-v-bd136fec] {\r\n  color: #2255cc;\r\n  font-size: 13px;\r\n  text-decoration: underline;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\configuration\\DatatableLink.vue"],"names":[],"mappings":";AAuBA;EACA,cAAA;EACA,eAAA;EACA,0BAAA;AACA","file":"DatatableLink.vue","sourcesContent":["<template>\r\n  <v-card style=\"background-color: transparent;\" @click=\"onLinkClicked\" flat class=\"caption\">\r\n    <a class=\"clink\">{{ text }}</a>\r\n  </v-card>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\nimport { Component, Prop } from \"vue-property-decorator\";\r\n\r\n@Component({\r\n  components: {}\r\n})\r\nexport default class DatatableLink extends Vue {\r\n  @Prop() readonly text!: string;\r\n\r\n  onLinkClicked() {\r\n    this.$emit(\"linkClicked\");\r\n  }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.clink {\r\n  color: #2255cc;\r\n  font-size: 13px;\r\n  text-decoration: underline;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$q = "data-v-bd136fec";
  /* module identifier */
  const __vue_module_identifier__$q = undefined;
  /* functional template */
  const __vue_is_functional_template__$q = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$q = normalizeComponent(
    { render: __vue_render__$q, staticRenderFns: __vue_staticRenderFns__$q },
    __vue_inject_styles__$q,
    __vue_script__$q,
    __vue_scope_id__$q,
    __vue_is_functional_template__$q,
    __vue_module_identifier__$q,
    false,
    createInjector,
    undefined,
    undefined
  );

let Section$1 = class Section extends Vue {
};
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], Section$1.prototype, "icon", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Boolean)
], Section$1.prototype, "fa", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], Section$1.prototype, "title", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], Section$1.prototype, "help", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Array)
], Section$1.prototype, "headers", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Array)
], Section$1.prototype, "items", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], Section$1.prototype, "width", void 0);
Section$1 = __decorate([
    vuePropertyDecorator.Component({
        components: { ContentHeader: __vue_component__$n }
    })
], Section$1);
var script$p = Section$1;

/* script */
const __vue_script__$r = script$p;

/* template */
var __vue_render__$r = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-card",
    { attrs: { flat: "" } },
    [
      _c("content-header", {
        attrs: { title: _vm.title, icon: _vm.icon, fa: _vm.fa }
      }),
      _vm._v(" "),
      _c(
        "v-card",
        {
          staticStyle: { "margin-left": "25px" },
          attrs: { flat: "", width: _vm.width }
        },
        [
          _c("v-data-table", {
            staticClass: "datatable",
            attrs: {
              dense: "",
              headers: _vm.headers,
              items: _vm.items,
              "hide-actions": ""
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
          }),
          _vm._v(" "),
          _vm._t("datatable-footer"),
          _vm._v(" "),
          _vm._t("datatable-dialogs")
        ],
        2
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$r = [];
__vue_render__$r._withStripped = true;

  /* style */
  const __vue_inject_styles__$r = function (inject) {
    if (!inject) return
    inject("data-v-70dbf956_0", { source: "\n.datatable[data-v-70dbf956] tr {\r\n  height: 30px;\n}\n.datatable[data-v-70dbf956] th {\r\n  padding: 3px !important;\n}\n.datatable[data-v-70dbf956] td {\r\n  padding: 3px !important;\r\n  height: 30px;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\configuration\\DatatableSection.vue"],"names":[],"mappings":";AAoCA;EACA,YAAA;AACA;AACA;EACA,uBAAA;AACA;AACA;EACA,uBAAA;EACA,YAAA;AACA","file":"DatatableSection.vue","sourcesContent":["<template>\r\n  <v-card flat>\r\n    <content-header :title=\"title\" :icon=\"icon\" :fa=\"fa\" />\r\n    <v-card flat style=\"margin-left: 25px;\" :width=\"width\">\r\n      <v-data-table class=\"datatable\" dense :headers=\"headers\" :items=\"items\" hide-actions>\r\n        <template v-for=\"(_, slot) of $scopedSlots\" v-slot:[slot]=\"scope\">\r\n          <slot :name=\"slot\" v-bind=\"scope\" />\r\n        </template>\r\n      </v-data-table>\r\n      <slot name=\"datatable-footer\" />\r\n      <slot name=\"datatable-dialogs\" />\r\n    </v-card>\r\n  </v-card>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\nimport { Component, Prop } from \"vue-property-decorator\";\r\n\r\nimport ContentHeader from \"./ContentHeader.vue\";\r\n\r\n@Component({\r\n  components: { ContentHeader }\r\n})\r\nexport default class Section extends Vue {\r\n  @Prop() readonly icon!: string;\r\n  @Prop() readonly fa!: boolean;\r\n  @Prop() readonly title!: string;\r\n  @Prop() readonly help!: string;\r\n  @Prop() readonly headers!: any[];\r\n  @Prop() readonly items!: any[];\r\n  @Prop() readonly width!: string;\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.datatable >>> tr {\r\n  height: 30px;\r\n}\r\n.datatable >>> th {\r\n  padding: 3px !important;\r\n}\r\n.datatable >>> td {\r\n  padding: 3px !important;\r\n  height: 30px;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$r = "data-v-70dbf956";
  /* module identifier */
  const __vue_module_identifier__$r = undefined;
  /* functional template */
  const __vue_is_functional_template__$r = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$r = normalizeComponent(
    { render: __vue_render__$r, staticRenderFns: __vue_staticRenderFns__$r },
    __vue_inject_styles__$r,
    __vue_script__$r,
    __vue_scope_id__$r,
    __vue_is_functional_template__$r,
    __vue_module_identifier__$r,
    false,
    createInjector,
    undefined,
    undefined
  );

let BaseDialog = class BaseDialog extends Vue {
    constructor() {
        super(...arguments);
        this.active = null;
    }
    onTabSelected(updated) {
        this.$emit("tabSelected", updated);
    }
    /** Set the active tab */
    setActiveTab(tab) {
        this.$nextTick(() => {
            this.active = tab;
        });
    }
    /** Handle cancel clicked */
    onCancelClicked(e) {
        this.$emit("cancelClicked", e);
    }
    /** Handle create clicked */
    onCreateClicked(e) {
        this.$emit("createClicked", e);
    }
};
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], BaseDialog.prototype, "title", void 0);
__decorate([
    vuePropertyDecorator.Prop({ default: 600 }),
    __metadata("design:type", Number)
], BaseDialog.prototype, "width", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], BaseDialog.prototype, "icon", void 0);
__decorate([
    vuePropertyDecorator.Prop({ default: true }),
    __metadata("design:type", Boolean)
], BaseDialog.prototype, "visible", void 0);
__decorate([
    vuePropertyDecorator.Prop({ default: true }),
    __metadata("design:type", Boolean)
], BaseDialog.prototype, "tabbed", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], BaseDialog.prototype, "createLabel", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], BaseDialog.prototype, "cancelLabel", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], BaseDialog.prototype, "error", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Boolean)
], BaseDialog.prototype, "hideButtons", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Boolean)
], BaseDialog.prototype, "hideCreate", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Boolean)
], BaseDialog.prototype, "invalid", void 0);
__decorate([
    vuePropertyDecorator.Prop({ default: false }),
    __metadata("design:type", Boolean)
], BaseDialog.prototype, "lazy", void 0);
__decorate([
    vuePropertyDecorator.Prop({ default: true }),
    __metadata("design:type", Boolean)
], BaseDialog.prototype, "loaded", void 0);
__decorate([
    vuePropertyDecorator.Prop({ default: "Loading..." }),
    __metadata("design:type", String)
], BaseDialog.prototype, "loadingMessage", void 0);
__decorate([
    vuePropertyDecorator.Watch("active", { immediate: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BaseDialog.prototype, "onTabSelected", null);
BaseDialog = __decorate([
    vuePropertyDecorator.Component({
        components: {
            ErrorBanner: __vue_component__$d,
            LoadingOverlay: __vue_component__$j
        }
    })
], BaseDialog);
var script$q = BaseDialog;

/* script */
const __vue_script__$s = script$q;

/* template */
var __vue_render__$s = function() {
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
            "v-card",
            { staticClass: "pa-2 white--text", attrs: { color: "primary" } },
            [
              _c(
                "v-icon",
                { staticClass: "mr-1", attrs: { small: "", dark: "" } },
                [_vm._v(_vm._s(_vm.icon))]
              ),
              _vm._v(" "),
              _c("span", { staticClass: "subheading" }, [
                _vm._v(_vm._s(_vm.title))
              ])
            ],
            1
          ),
          _vm._v(" "),
          _vm._t("error", [
            _c("error-banner", { attrs: { error: _vm.error } })
          ]),
          _vm._v(" "),
          _vm._t("header"),
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
          !_vm.hideButtons
            ? _c("v-divider", { staticClass: "mb-2" })
            : _vm._e(),
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
                    [
                      _vm._v(
                        "\n        " + _vm._s(_vm.cancelLabel) + "\n      "
                      )
                    ]
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
        2
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
    inject("data-v-9c6a354c_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"BaseDialog.vue"}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$s = "data-v-9c6a354c";
  /* module identifier */
  const __vue_module_identifier__$s = undefined;
  /* functional template */
  const __vue_is_functional_template__$s = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$s = normalizeComponent(
    { render: __vue_render__$s, staticRenderFns: __vue_staticRenderFns__$s },
    __vue_inject_styles__$s,
    __vue_script__$s,
    __vue_scope_id__$s,
    __vue_is_functional_template__$s,
    __vue_module_identifier__$s,
    false,
    createInjector,
    undefined,
    undefined
  );

let NewElementChooser = class NewElementChooser extends Vue {
    constructor() {
        super(...arguments);
        this.dialogVisible = false;
    }
    /** Open dialog */
    openDialog() {
        this.dialogVisible = true;
    }
    /** Close dialog */
    closeDialog() {
        this.dialogVisible = false;
    }
};
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], NewElementChooser.prototype, "icon", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], NewElementChooser.prototype, "title", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Number)
], NewElementChooser.prototype, "width", void 0);
__decorate([
    vuePropertyDecorator.Ref(),
    __metadata("design:type", __vue_component__$s)
], NewElementChooser.prototype, "dialog", void 0);
NewElementChooser = __decorate([
    vuePropertyDecorator.Component({
        components: { BaseDialog: __vue_component__$s }
    })
], NewElementChooser);
var script$r = NewElementChooser;

/* script */
const __vue_script__$t = script$r;

/* template */
var __vue_render__$t = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "base-dialog",
    {
      ref: "dialog",
      attrs: {
        icon: _vm.icon,
        title: _vm.title,
        width: _vm.width,
        loaded: true,
        visible: _vm.dialogVisible,
        tabbed: false,
        hideCreate: true,
        cancelLabel: "Cancel"
      },
      on: { cancelClicked: _vm.closeDialog }
    },
    [
      _c(
        "v-card",
        { staticClass: "scroll-chooser", attrs: { flat: "" } },
        [_vm._t("default")],
        2
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$t = [];
__vue_render__$t._withStripped = true;

  /* style */
  const __vue_inject_styles__$t = function (inject) {
    if (!inject) return
    inject("data-v-eb9f45e0_0", { source: "\n.scroll-chooser[data-v-eb9f45e0] {\r\n  max-height: 300px;\r\n  overflow-y: auto;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\configuration\\NewElementChooser.vue"],"names":[],"mappings":";AAkDA;EACA,iBAAA;EACA,gBAAA;AACA","file":"NewElementChooser.vue","sourcesContent":["<template>\r\n  <base-dialog\r\n    ref=\"dialog\"\r\n    :icon=\"icon\"\r\n    :title=\"title\"\r\n    :width=\"width\"\r\n    :loaded=\"true\"\r\n    :visible=\"dialogVisible\"\r\n    :tabbed=\"false\"\r\n    :hideCreate=\"true\"\r\n    cancelLabel=\"Cancel\"\r\n    @cancelClicked=\"closeDialog\"\r\n  >\r\n    <v-card class=\"scroll-chooser\" flat>\r\n      <slot />\r\n    </v-card>\r\n  </base-dialog>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\nimport { Component, Prop, Ref } from \"vue-property-decorator\";\r\nimport { ITabbedComponent } from \"sitewhere-ide-common\";\r\n\r\nimport BaseDialog from \"../dialog/BaseDialog.vue\";\r\n\r\n@Component({\r\n  components: { BaseDialog }\r\n})\r\nexport default class NewElementChooser extends Vue {\r\n  @Prop() readonly icon!: string;\r\n  @Prop() readonly title!: string;\r\n  @Prop() readonly width!: number;\r\n  @Ref() readonly dialog!: BaseDialog;\r\n\r\n  dialogVisible: boolean = false;\r\n\r\n  /** Open dialog */\r\n  openDialog(): void {\r\n    this.dialogVisible = true;\r\n  }\r\n\r\n  /** Close dialog */\r\n  closeDialog(): void {\r\n    this.dialogVisible = false;\r\n  }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.scroll-chooser {\r\n  max-height: 300px;\r\n  overflow-y: auto;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$t = "data-v-eb9f45e0";
  /* module identifier */
  const __vue_module_identifier__$t = undefined;
  /* functional template */
  const __vue_is_functional_template__$t = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$t = normalizeComponent(
    { render: __vue_render__$t, staticRenderFns: __vue_staticRenderFns__$t },
    __vue_inject_styles__$t,
    __vue_script__$t,
    __vue_scope_id__$t,
    __vue_is_functional_template__$t,
    __vue_module_identifier__$t,
    false,
    createInjector,
    undefined,
    undefined
  );

let NewElementChooser$1 = class NewElementChooser extends Vue {
    /** Called when the element is clicked */
    onElementClicked() {
        this.$emit("chosen", this.itemId);
    }
};
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], NewElementChooser$1.prototype, "icon", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], NewElementChooser$1.prototype, "itemId", void 0);
NewElementChooser$1 = __decorate([
    vuePropertyDecorator.Component({
        components: {}
    })
], NewElementChooser$1);
var script$s = NewElementChooser$1;

/* script */
const __vue_script__$u = script$s;

/* template */
var __vue_render__$u = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    [
      _c(
        "v-card",
        { attrs: { flat: "" } },
        [
          _c(
            "v-card-text",
            { staticClass: "elm-entry", on: { click: _vm.onElementClicked } },
            [
              _c("v-icon", { staticClass: "mr-2", attrs: { small: "" } }, [
                _vm._v(_vm._s(_vm.icon))
              ]),
              _vm._v(" "),
              _vm._t("default")
            ],
            2
          )
        ],
        1
      ),
      _vm._v(" "),
      _c("v-divider")
    ],
    1
  )
};
var __vue_staticRenderFns__$u = [];
__vue_render__$u._withStripped = true;

  /* style */
  const __vue_inject_styles__$u = function (inject) {
    if (!inject) return
    inject("data-v-6ff72e9a_0", { source: "\n.elm-entry[data-v-6ff72e9a] {\r\n  cursor: pointer;\r\n  border-left: 5px solid transparent;\n}\n.elm-entry[data-v-6ff72e9a]:hover {\r\n  border-left: 5px solid #ccc;\r\n  background-color: #eee;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\configuration\\NewElementEntry.vue"],"names":[],"mappings":";AA+BA;EACA,eAAA;EACA,kCAAA;AACA;AACA;EACA,2BAAA;EACA,sBAAA;AACA","file":"NewElementEntry.vue","sourcesContent":["<template>\r\n  <div>\r\n    <v-card flat>\r\n      <v-card-text class=\"elm-entry\" @click=\"onElementClicked\">\r\n        <v-icon small class=\"mr-2\">{{ icon }}</v-icon>\r\n        <slot />\r\n      </v-card-text>\r\n    </v-card>\r\n    <v-divider />\r\n  </div>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\nimport { Component, Prop } from \"vue-property-decorator\";\r\n\r\n@Component({\r\n  components: {}\r\n})\r\nexport default class NewElementChooser extends Vue {\r\n  @Prop() readonly icon!: string;\r\n  @Prop() readonly itemId!: string;\r\n\r\n  /** Called when the element is clicked */\r\n  onElementClicked(): void {\r\n    this.$emit(\"chosen\", this.itemId);\r\n  }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.elm-entry {\r\n  cursor: pointer;\r\n  border-left: 5px solid transparent;\r\n}\r\n.elm-entry:hover {\r\n  border-left: 5px solid #ccc;\r\n  background-color: #eee;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$u = "data-v-6ff72e9a";
  /* module identifier */
  const __vue_module_identifier__$u = undefined;
  /* functional template */
  const __vue_is_functional_template__$u = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$u = normalizeComponent(
    { render: __vue_render__$u, staticRenderFns: __vue_staticRenderFns__$u },
    __vue_inject_styles__$u,
    __vue_script__$u,
    __vue_scope_id__$u,
    __vue_is_functional_template__$u,
    __vue_module_identifier__$u,
    false,
    createInjector,
    undefined,
    undefined
  );

let PageHeader = class PageHeader extends Vue {
};
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], PageHeader.prototype, "text", void 0);
PageHeader = __decorate([
    vuePropertyDecorator.Component({
        components: {}
    })
], PageHeader);
var script$t = PageHeader;

/* script */
const __vue_script__$v = script$t;

/* template */
var __vue_render__$v = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-card",
    {
      staticClass: "subheading pb-1 mb-3",
      staticStyle: { "border-bottom": "1px solid #f0f0f0" },
      attrs: { flat: "" }
    },
    [_vm._v(_vm._s(_vm.text))]
  )
};
var __vue_staticRenderFns__$v = [];
__vue_render__$v._withStripped = true;

  /* style */
  const __vue_inject_styles__$v = function (inject) {
    if (!inject) return
    inject("data-v-71f36d8d_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"PageHeader.vue"}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$v = "data-v-71f36d8d";
  /* module identifier */
  const __vue_module_identifier__$v = undefined;
  /* functional template */
  const __vue_is_functional_template__$v = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$v = normalizeComponent(
    { render: __vue_render__$v, staticRenderFns: __vue_staticRenderFns__$v },
    __vue_inject_styles__$v,
    __vue_script__$v,
    __vue_scope_id__$v,
    __vue_is_functional_template__$v,
    __vue_module_identifier__$v,
    false,
    createInjector,
    undefined,
    undefined
  );

let DialogForm = class DialogForm extends Vue {
};
DialogForm = __decorate([
    vuePropertyDecorator.Component({})
], DialogForm);
var script$u = DialogForm;

/* script */
const __vue_script__$w = script$u;

/* template */
var __vue_render__$w = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-container",
    { staticClass: "pa-3", attrs: { fluid: "" } },
    [
      _c(
        "v-layout",
        { staticClass: "pl-2 pr-2 pt-0 pb-0", attrs: { row: "", wrap: "" } },
        [_vm._t("default")],
        2
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$w = [];
__vue_render__$w._withStripped = true;

  /* style */
  const __vue_inject_styles__$w = undefined;
  /* scoped */
  const __vue_scope_id__$w = undefined;
  /* module identifier */
  const __vue_module_identifier__$w = undefined;
  /* functional template */
  const __vue_is_functional_template__$w = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$w = normalizeComponent(
    { render: __vue_render__$w, staticRenderFns: __vue_staticRenderFns__$w },
    __vue_inject_styles__$w,
    __vue_script__$w,
    __vue_scope_id__$w,
    __vue_is_functional_template__$w,
    __vue_module_identifier__$w,
    false,
    undefined,
    undefined,
    undefined
  );

let FormDateTimePicker = class FormDateTimePicker extends Vue {
    get wrapped() {
        return this.value;
    }
    set wrapped(updated) {
        this.$emit("input", updated);
    }
};
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], FormDateTimePicker.prototype, "title", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], FormDateTimePicker.prototype, "label", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], FormDateTimePicker.prototype, "icon", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Boolean)
], FormDateTimePicker.prototype, "required", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], FormDateTimePicker.prototype, "value", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], FormDateTimePicker.prototype, "type", void 0);
FormDateTimePicker = __decorate([
    vuePropertyDecorator.Component({
        components: {
            DateTimePicker: __vue_component__$c
        }
    })
], FormDateTimePicker);
var script$v = FormDateTimePicker;

/* script */
const __vue_script__$x = script$v;

/* template */
var __vue_render__$x = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "mb-3" },
    [
      _c("date-time-picker", {
        attrs: { title: _vm.title, label: _vm.label },
        model: {
          value: _vm.wrapped,
          callback: function($$v) {
            _vm.wrapped = $$v;
          },
          expression: "wrapped"
        }
      }),
      _vm._v(" "),
      _c("div", { staticClass: "verror" }, [_vm._t("default")], 2)
    ],
    1
  )
};
var __vue_staticRenderFns__$x = [];
__vue_render__$x._withStripped = true;

  /* style */
  const __vue_inject_styles__$x = undefined;
  /* scoped */
  const __vue_scope_id__$x = undefined;
  /* module identifier */
  const __vue_module_identifier__$x = undefined;
  /* functional template */
  const __vue_is_functional_template__$x = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$x = normalizeComponent(
    { render: __vue_render__$x, staticRenderFns: __vue_staticRenderFns__$x },
    __vue_inject_styles__$x,
    __vue_script__$x,
    __vue_scope_id__$x,
    __vue_is_functional_template__$x,
    __vue_module_identifier__$x,
    false,
    undefined,
    undefined,
    undefined
  );

let FormSelect = class FormSelect extends Vue {
    get wrapped() {
        return this.value;
    }
    set wrapped(updated) {
        this.$emit("input", updated);
    }
    onSelectionChanged(selection) {
        this.$emit("change", selection);
    }
};
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], FormSelect.prototype, "title", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], FormSelect.prototype, "label", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], FormSelect.prototype, "icon", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Array)
], FormSelect.prototype, "items", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Boolean)
], FormSelect.prototype, "required", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], FormSelect.prototype, "value", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], FormSelect.prototype, "itemText", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], FormSelect.prototype, "itemValue", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Boolean)
], FormSelect.prototype, "multiple", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Boolean)
], FormSelect.prototype, "chips", void 0);
FormSelect = __decorate([
    vuePropertyDecorator.Component({})
], FormSelect);
var script$w = FormSelect;

/* script */
const __vue_script__$y = script$w;

/* template */
var __vue_render__$y = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "mb-3" },
    [
      _c("v-select", {
        staticClass: "text-field-input",
        attrs: {
          required: _vm.required,
          title: _vm.title,
          label: _vm.label,
          items: _vm.items,
          multiple: _vm.multiple,
          "item-text": _vm.itemText,
          "item-value": _vm.itemValue,
          chips: _vm.chips,
          "prepend-icon": _vm.icon,
          "menu-props": { closeOnContentClick: true },
          "hide-details": true,
          placeholder: " "
        },
        on: { change: _vm.onSelectionChanged },
        model: {
          value: _vm.wrapped,
          callback: function($$v) {
            _vm.wrapped = $$v;
          },
          expression: "wrapped"
        }
      }),
      _vm._v(" "),
      _c("div", { staticClass: "verror" }, [_vm._t("default")], 2)
    ],
    1
  )
};
var __vue_staticRenderFns__$y = [];
__vue_render__$y._withStripped = true;

  /* style */
  const __vue_inject_styles__$y = function (inject) {
    if (!inject) return
    inject("data-v-b48b6b86_0", { source: "\n.text-field-input[data-v-b48b6b86] i.v-icon {\r\n  font-size: 16px;\r\n  color: #999;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\common\\form\\FormSelect.vue"],"names":[],"mappings":";AAyDA;EACA,eAAA;EACA,WAAA;AACA","file":"FormSelect.vue","sourcesContent":["<template>\r\n  <div class=\"mb-3\">\r\n    <v-select\r\n      class=\"text-field-input\"\r\n      :required=\"required\"\r\n      :title=\"title\"\r\n      :label=\"label\"\r\n      :items=\"items\"\r\n      v-model=\"wrapped\"\r\n      :multiple=\"multiple\"\r\n      :item-text=\"itemText\"\r\n      :item-value=\"itemValue\"\r\n      :chips=\"chips\"\r\n      :prepend-icon=\"icon\"\r\n      :menu-props=\"{ closeOnContentClick: true }\"\r\n      :hide-details=\"true\"\r\n      placeholder=\" \"\r\n      @change=\"onSelectionChanged\"\r\n    />\r\n    <div class=\"verror\">\r\n      <slot />\r\n    </div>\r\n  </div>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\nimport { Component, Prop } from \"vue-property-decorator\";\r\n\r\n@Component({})\r\nexport default class FormSelect extends Vue {\r\n  @Prop() readonly title!: string;\r\n  @Prop() readonly label!: string;\r\n  @Prop() readonly icon!: string;\r\n  @Prop() readonly items!: {}[];\r\n  @Prop() readonly required!: boolean;\r\n  @Prop() readonly value!: string;\r\n  @Prop() readonly itemText!: string;\r\n  @Prop() readonly itemValue!: string;\r\n  @Prop() readonly multiple!: boolean;\r\n  @Prop() readonly chips!: boolean;\r\n\r\n  get wrapped(): string {\r\n    return this.value;\r\n  }\r\n\r\n  set wrapped(updated: string) {\r\n    this.$emit(\"input\", updated);\r\n  }\r\n\r\n  onSelectionChanged(selection: any) {\r\n    this.$emit(\"change\", selection);\r\n  }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.text-field-input >>> i.v-icon {\r\n  font-size: 16px;\r\n  color: #999;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$y = "data-v-b48b6b86";
  /* module identifier */
  const __vue_module_identifier__$y = undefined;
  /* functional template */
  const __vue_is_functional_template__$y = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$y = normalizeComponent(
    { render: __vue_render__$y, staticRenderFns: __vue_staticRenderFns__$y },
    __vue_inject_styles__$y,
    __vue_script__$y,
    __vue_scope_id__$y,
    __vue_is_functional_template__$y,
    __vue_module_identifier__$y,
    false,
    createInjector,
    undefined,
    undefined
  );

let FormSelect$1 = class FormSelect extends Vue {
    get wrapped() {
        return this.value;
    }
    set wrapped(updated) {
        this.$emit("input", updated);
    }
    onSelectionChanged(selection) {
        this.$emit("change", selection);
    }
};
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], FormSelect$1.prototype, "title", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], FormSelect$1.prototype, "label", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], FormSelect$1.prototype, "icon", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Array)
], FormSelect$1.prototype, "items", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Boolean)
], FormSelect$1.prototype, "required", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], FormSelect$1.prototype, "value", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], FormSelect$1.prototype, "itemText", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], FormSelect$1.prototype, "itemValue", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Boolean)
], FormSelect$1.prototype, "multiple", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Boolean)
], FormSelect$1.prototype, "chips", void 0);
FormSelect$1 = __decorate([
    vuePropertyDecorator.Component({})
], FormSelect$1);
var script$x = FormSelect$1;

/* script */
const __vue_script__$z = script$x;

/* template */
var __vue_render__$z = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "ma-0 pa-0" },
    [
      _c("v-select", {
        attrs: {
          "hide-details": "",
          required: _vm.required,
          title: _vm.title,
          items: _vm.items,
          multiple: _vm.multiple,
          "item-text": _vm.itemText,
          "item-value": _vm.itemValue,
          chips: _vm.chips,
          placeholder: " "
        },
        on: { change: _vm.onSelectionChanged },
        model: {
          value: _vm.wrapped,
          callback: function($$v) {
            _vm.wrapped = $$v;
          },
          expression: "wrapped"
        }
      })
    ],
    1
  )
};
var __vue_staticRenderFns__$z = [];
__vue_render__$z._withStripped = true;

  /* style */
  const __vue_inject_styles__$z = function (inject) {
    if (!inject) return
    inject("data-v-b2c31850_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"FormSelectCondensed.vue"}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$z = "data-v-b2c31850";
  /* module identifier */
  const __vue_module_identifier__$z = undefined;
  /* functional template */
  const __vue_is_functional_template__$z = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$z = normalizeComponent(
    { render: __vue_render__$z, staticRenderFns: __vue_staticRenderFns__$z },
    __vue_inject_styles__$z,
    __vue_script__$z,
    __vue_scope_id__$z,
    __vue_is_functional_template__$z,
    __vue_module_identifier__$z,
    false,
    createInjector,
    undefined,
    undefined
  );

let FormText = class FormText extends Vue {
    get wrapped() {
        return this.value;
    }
    set wrapped(updated) {
        this.$emit("input", updated);
    }
    /** Focus the wrapped input */
    focus() {
        this.field.focus();
    }
};
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], FormText.prototype, "title", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], FormText.prototype, "label", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], FormText.prototype, "icon", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Boolean)
], FormText.prototype, "required", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], FormText.prototype, "value", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], FormText.prototype, "type", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Boolean)
], FormText.prototype, "readonly", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Boolean)
], FormText.prototype, "dense", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Boolean)
], FormText.prototype, "autofocus", void 0);
__decorate([
    vuePropertyDecorator.Ref(),
    __metadata("design:type", Object)
], FormText.prototype, "field", void 0);
FormText = __decorate([
    vuePropertyDecorator.Component({})
], FormText);
var script$y = FormText;

/* script */
const __vue_script__$A = script$y;

/* template */
var __vue_render__$A = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: !_vm.dense ? "mb-3" : "" },
    [
      _c("v-text-field", {
        ref: "field",
        staticClass: "text-field-input",
        attrs: {
          required: _vm.required,
          title: _vm.title,
          label: _vm.label,
          type: _vm.type,
          placeholder: " ",
          "hide-details": "",
          "prepend-icon": _vm.icon,
          disabled: _vm.readonly,
          autofocus: _vm.autofocus
        },
        model: {
          value: _vm.wrapped,
          callback: function($$v) {
            _vm.wrapped = $$v;
          },
          expression: "wrapped"
        }
      }),
      _vm._v(" "),
      _c("div", { staticClass: "verror" }, [_vm._t("default")], 2)
    ],
    1
  )
};
var __vue_staticRenderFns__$A = [];
__vue_render__$A._withStripped = true;

  /* style */
  const __vue_inject_styles__$A = function (inject) {
    if (!inject) return
    inject("data-v-507e3f55_0", { source: "\n.text-field-input[data-v-507e3f55] i.v-icon {\r\n  font-size: 16px;\r\n  color: #ccc;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\common\\form\\FormText.vue"],"names":[],"mappings":";AAuDA;EACA,eAAA;EACA,WAAA;AACA","file":"FormText.vue","sourcesContent":["<template>\r\n  <div :class=\"!dense ? 'mb-3' : ''\">\r\n    <v-text-field\r\n      ref=\"field\"\r\n      class=\"text-field-input\"\r\n      :required=\"required\"\r\n      :title=\"title\"\r\n      :label=\"label\"\r\n      :type=\"type\"\r\n      placeholder=\" \"\r\n      v-model=\"wrapped\"\r\n      hide-details\r\n      :prepend-icon=\"icon\"\r\n      :disabled=\"readonly\"\r\n      :autofocus=\"autofocus\"\r\n    />\r\n    <div class=\"verror\">\r\n      <slot />\r\n    </div>\r\n  </div>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\nimport { Component, Prop, Ref } from \"vue-property-decorator\";\r\n\r\n@Component({})\r\nexport default class FormText extends Vue {\r\n  @Prop() readonly title!: string;\r\n  @Prop() readonly label!: string;\r\n  @Prop() readonly icon!: string;\r\n  @Prop() readonly required!: boolean;\r\n  @Prop() readonly value!: string;\r\n  @Prop() readonly type!: string;\r\n  @Prop() readonly readonly!: boolean;\r\n  @Prop() readonly dense!: boolean;\r\n  @Prop() readonly autofocus!: boolean;\r\n  @Ref() readonly field!: any;\r\n\r\n  get wrapped(): string {\r\n    return this.value;\r\n  }\r\n\r\n  set wrapped(updated: string) {\r\n    this.$emit(\"input\", updated);\r\n  }\r\n\r\n  /** Focus the wrapped input */\r\n  focus(): void {\r\n    this.field.focus();\r\n  }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.text-field-input >>> i.v-icon {\r\n  font-size: 16px;\r\n  color: #ccc;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$A = "data-v-507e3f55";
  /* module identifier */
  const __vue_module_identifier__$A = undefined;
  /* functional template */
  const __vue_is_functional_template__$A = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$A = normalizeComponent(
    { render: __vue_render__$A, staticRenderFns: __vue_staticRenderFns__$A },
    __vue_inject_styles__$A,
    __vue_script__$A,
    __vue_scope_id__$A,
    __vue_is_functional_template__$A,
    __vue_module_identifier__$A,
    false,
    createInjector,
    undefined,
    undefined
  );

let FormText$1 = class FormText extends Vue {
    get wrapped() {
        return this.value;
    }
    set wrapped(updated) {
        this.$emit("input", updated);
    }
};
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], FormText$1.prototype, "title", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], FormText$1.prototype, "label", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], FormText$1.prototype, "icon", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Boolean)
], FormText$1.prototype, "required", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], FormText$1.prototype, "value", void 0);
FormText$1 = __decorate([
    vuePropertyDecorator.Component({})
], FormText$1);
var script$z = FormText$1;

/* script */
const __vue_script__$B = script$z;

/* template */
var __vue_render__$B = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "mb-3" },
    [
      _c("v-textarea", {
        attrs: {
          required: _vm.required,
          title: _vm.title,
          label: _vm.label,
          placeholder: " ",
          "hide-details": "",
          "prepend-icon": _vm.icon
        },
        model: {
          value: _vm.wrapped,
          callback: function($$v) {
            _vm.wrapped = $$v;
          },
          expression: "wrapped"
        }
      }),
      _vm._v(" "),
      _c("div", { staticClass: "verror" }, [_vm._t("default")], 2)
    ],
    1
  )
};
var __vue_staticRenderFns__$B = [];
__vue_render__$B._withStripped = true;

  /* style */
  const __vue_inject_styles__$B = function (inject) {
    if (!inject) return
    inject("data-v-2009c778_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"FormTextArea.vue"}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$B = "data-v-2009c778";
  /* module identifier */
  const __vue_module_identifier__$B = undefined;
  /* functional template */
  const __vue_is_functional_template__$B = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$B = normalizeComponent(
    { render: __vue_render__$B, staticRenderFns: __vue_staticRenderFns__$B },
    __vue_inject_styles__$B,
    __vue_script__$B,
    __vue_scope_id__$B,
    __vue_is_functional_template__$B,
    __vue_module_identifier__$B,
    false,
    createInjector,
    undefined,
    undefined
  );

let ScriptChooser = class ScriptChooser extends Vue {
    constructor() {
        super(...arguments);
        this.items = [];
    }
    get wrapped() {
        return this.value;
    }
    set wrapped(updated) {
        this.$emit("input", updated);
    }
    /** Perform reset on initial create */
    created() {
        this.reset();
    }
    /** Reload list of scripts for functional area */
    reset() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield SiteWhereIdeCommon.listTenantScriptsForCategory(this.$store, this.functionalArea, this.tenantId, this.category);
                this.items = response.data;
            }
            catch (err) {
                SiteWhereIdeCommon.showError(this, err);
            }
        });
    }
    onSelectionChanged(selection) {
        this.$emit("change", selection);
    }
};
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], ScriptChooser.prototype, "tenantId", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], ScriptChooser.prototype, "functionalArea", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], ScriptChooser.prototype, "category", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], ScriptChooser.prototype, "title", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], ScriptChooser.prototype, "label", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], ScriptChooser.prototype, "icon", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], ScriptChooser.prototype, "value", void 0);
ScriptChooser = __decorate([
    vuePropertyDecorator.Component({})
], ScriptChooser);
var script$A = ScriptChooser;

/* script */
const __vue_script__$C = script$A;

/* template */
var __vue_render__$C = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "mb-3" },
    [
      _c("v-select", {
        staticClass: "text-field-input",
        attrs: {
          required: true,
          title: _vm.title,
          label: _vm.label,
          items: _vm.items,
          "item-text": "name",
          "item-value": "id",
          "prepend-icon": _vm.icon,
          "menu-props": { closeOnContentClick: true },
          "hide-details": true,
          placeholder: " "
        },
        on: { change: _vm.onSelectionChanged },
        model: {
          value: _vm.wrapped,
          callback: function($$v) {
            _vm.wrapped = $$v;
          },
          expression: "wrapped"
        }
      }),
      _vm._v(" "),
      _c("div", { staticClass: "verror" }, [_vm._t("default")], 2)
    ],
    1
  )
};
var __vue_staticRenderFns__$C = [];
__vue_render__$C._withStripped = true;

  /* style */
  const __vue_inject_styles__$C = function (inject) {
    if (!inject) return
    inject("data-v-dd48b850_0", { source: "\n.text-field-input[data-v-dd48b850] i.v-icon {\r\n  font-size: 16px;\r\n  color: #999;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\common\\form\\ScriptChooser.vue"],"names":[],"mappings":";AA8EA;EACA,eAAA;EACA,WAAA;AACA","file":"ScriptChooser.vue","sourcesContent":["<template>\r\n  <div class=\"mb-3\">\r\n    <v-select\r\n      class=\"text-field-input\"\r\n      :required=\"true\"\r\n      :title=\"title\"\r\n      :label=\"label\"\r\n      :items=\"items\"\r\n      v-model=\"wrapped\"\r\n      item-text=\"name\"\r\n      item-value=\"id\"\r\n      :prepend-icon=\"icon\"\r\n      :menu-props=\"{ closeOnContentClick: true }\"\r\n      :hide-details=\"true\"\r\n      placeholder=\" \"\r\n      @change=\"onSelectionChanged\"\r\n    />\r\n    <div class=\"verror\">\r\n      <slot />\r\n    </div>\r\n  </div>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\nimport { Component, Prop } from \"vue-property-decorator\";\r\nimport { listTenantScriptsForCategory, showError } from \"sitewhere-ide-common\";\r\n\r\nimport { AxiosResponse } from \"axios\";\r\nimport { IScriptMetadata } from \"sitewhere-rest-api\";\r\n\r\n@Component({})\r\nexport default class ScriptChooser extends Vue {\r\n  @Prop() readonly tenantId!: string;\r\n  @Prop() readonly functionalArea!: string;\r\n  @Prop() readonly category!: string;\r\n  @Prop() readonly title!: string;\r\n  @Prop() readonly label!: string;\r\n  @Prop() readonly icon!: string;\r\n  @Prop() readonly value!: string;\r\n\r\n  items: IScriptMetadata[] = [];\r\n\r\n  get wrapped(): string {\r\n    return this.value;\r\n  }\r\n\r\n  set wrapped(updated: string) {\r\n    this.$emit(\"input\", updated);\r\n  }\r\n\r\n  /** Perform reset on initial create */\r\n  created() {\r\n    this.reset();\r\n  }\r\n\r\n  /** Reload list of scripts for functional area */\r\n  async reset() {\r\n    try {\r\n      let response: AxiosResponse<IScriptMetadata[]> = await listTenantScriptsForCategory(\r\n        this.$store,\r\n        this.functionalArea,\r\n        this.tenantId,\r\n        this.category\r\n      );\r\n      this.items = response.data;\r\n    } catch (err) {\r\n      showError(this, err);\r\n    }\r\n  }\r\n\r\n  onSelectionChanged(selection: any) {\r\n    this.$emit(\"change\", selection);\r\n  }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.text-field-input >>> i.v-icon {\r\n  font-size: 16px;\r\n  color: #999;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$C = "data-v-dd48b850";
  /* module identifier */
  const __vue_module_identifier__$C = undefined;
  /* functional template */
  const __vue_is_functional_template__$C = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$C = normalizeComponent(
    { render: __vue_render__$C, staticRenderFns: __vue_staticRenderFns__$C },
    __vue_inject_styles__$C,
    __vue_script__$C,
    __vue_scope_id__$C,
    __vue_is_functional_template__$C,
    __vue_module_identifier__$C,
    false,
    createInjector,
    undefined,
    undefined
  );

let ConfirmDialog = class ConfirmDialog extends Vue {
    constructor() {
        super(...arguments);
        this.visible = false;
        this.error = null;
    }
    /** Called to open the dialog */
    open() {
        this.visible = true;
    }
    /** Called when action button is clicked */
    onActionConfirmed() {
        this.$emit("confirmed");
        this.visible = false;
    }
    /** Called after cancel button is clicked */
    onCancelClicked(e) {
        this.$emit("cancelled");
        this.visible = false;
    }
};
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], ConfirmDialog.prototype, "title", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Number)
], ConfirmDialog.prototype, "width", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], ConfirmDialog.prototype, "buttonText", void 0);
ConfirmDialog = __decorate([
    vuePropertyDecorator.Component({})
], ConfirmDialog);
var script$B = ConfirmDialog;

/* script */
const __vue_script__$D = script$B;

/* template */
var __vue_render__$D = function() {
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
                  on: { click: _vm.onActionConfirmed }
                },
                [_vm._v(_vm._s(_vm.buttonText || "Ok"))]
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
var __vue_staticRenderFns__$D = [];
__vue_render__$D._withStripped = true;

  /* style */
  const __vue_inject_styles__$D = undefined;
  /* scoped */
  const __vue_scope_id__$D = undefined;
  /* module identifier */
  const __vue_module_identifier__$D = undefined;
  /* functional template */
  const __vue_is_functional_template__$D = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$D = normalizeComponent(
    { render: __vue_render__$D, staticRenderFns: __vue_staticRenderFns__$D },
    __vue_inject_styles__$D,
    __vue_script__$D,
    __vue_scope_id__$D,
    __vue_is_functional_template__$D,
    __vue_module_identifier__$D,
    false,
    undefined,
    undefined,
    undefined
  );

let DeleteDialog = class DeleteDialog extends Vue {
    // Called after create button is clicked.
    onDeleteClicked(e) {
        this.$emit("delete");
    }
    // Called after cancel button is clicked.
    onCancelClicked(e) {
        this.$emit("cancel");
    }
};
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], DeleteDialog.prototype, "title", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Number)
], DeleteDialog.prototype, "width", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], DeleteDialog.prototype, "error", void 0);
__decorate([
    vuePropertyDecorator.Prop({ default: false }),
    __metadata("design:type", Boolean)
], DeleteDialog.prototype, "visible", void 0);
DeleteDialog = __decorate([
    vuePropertyDecorator.Component({
        components: {
            ErrorBanner: __vue_component__$d
        }
    })
], DeleteDialog);
var script$C = DeleteDialog;

/* script */
const __vue_script__$E = script$C;

/* template */
var __vue_render__$E = function() {
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
var __vue_staticRenderFns__$E = [];
__vue_render__$E._withStripped = true;

  /* style */
  const __vue_inject_styles__$E = function (inject) {
    if (!inject) return
    inject("data-v-188445d0_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"DeleteDialog.vue"}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$E = "data-v-188445d0";
  /* module identifier */
  const __vue_module_identifier__$E = undefined;
  /* functional template */
  const __vue_is_functional_template__$E = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$E = normalizeComponent(
    { render: __vue_render__$E, staticRenderFns: __vue_staticRenderFns__$E },
    __vue_inject_styles__$E,
    __vue_script__$E,
    __vue_scope_id__$E,
    __vue_is_functional_template__$E,
    __vue_module_identifier__$E,
    false,
    createInjector,
    undefined,
    undefined
  );

let DialogHeader = class DialogHeader extends Vue {
};
DialogHeader = __decorate([
    vuePropertyDecorator.Component({})
], DialogHeader);
var script$D = DialogHeader;

/* script */
const __vue_script__$F = script$D;

/* template */
var __vue_render__$F = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-card",
    {
      staticStyle: {
        "background-color": "#f5f5f5",
        "border-bottom": "1px solid #eee"
      },
      attrs: { flat: "" }
    },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$F = [];
__vue_render__$F._withStripped = true;

  /* style */
  const __vue_inject_styles__$F = undefined;
  /* scoped */
  const __vue_scope_id__$F = undefined;
  /* module identifier */
  const __vue_module_identifier__$F = undefined;
  /* functional template */
  const __vue_is_functional_template__$F = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$F = normalizeComponent(
    { render: __vue_render__$F, staticRenderFns: __vue_staticRenderFns__$F },
    __vue_inject_styles__$F,
    __vue_script__$F,
    __vue_scope_id__$F,
    __vue_is_functional_template__$F,
    __vue_module_identifier__$F,
    false,
    undefined,
    undefined,
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
/** Generate a unique id */
function generateUniqueId() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        let r = crypto.getRandomValues(new Uint8Array(1))[0] % 16 | 0;
        let v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
/**
 * Move an element in an array from one index to another.
 * @param arr
 * @param old_index
 * @param new_index
 */
function arrayMove(arr, old_index, new_index) {
    while (old_index < 0) {
        old_index += arr.length;
    }
    while (new_index < 0) {
        new_index += arr.length;
    }
    if (new_index >= arr.length) {
        var k = new_index - arr.length;
        while (k-- + 1) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr;
}

let MetadataPanel = class MetadataPanel extends __vue_component__$4 {
    constructor() {
        super(...arguments);
        this.metadata = [];
        this.newItemName = "";
        this.newItemValue = "";
        this.error = null;
    }
    /** Reset section content */
    reset() {
        this.metadata = [];
        this.error = null;
    }
    /** Perform validation */
    validate() {
        return true;
    }
    /** Load form data from an object */
    load(input) {
        let initial = input.metadata;
        if (initial) {
            this.metadata = metadataToArray(initial);
        }
    }
    /** Save form data to an object */
    save() {
        let updated = arrayToMetadata(this.metadata);
        return {
            metadata: updated
        };
    }
    /** Delete an item */
    onDeleteItem(deleteName) {
        let updated = [];
        this.metadata.forEach(item => {
            if (item.name !== deleteName) {
                updated.push(item);
            }
        });
        this.metadata = updated;
    }
    // Let owner know an item was added.
    onAddItem() {
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
    }
    get headers() {
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
    }
};
__decorate([
    vuePropertyDecorator.Prop({ default: false }),
    __metadata("design:type", Boolean)
], MetadataPanel.prototype, "readOnly", void 0);
__decorate([
    vuePropertyDecorator.Prop({ default: "No metadata has been assigned" }),
    __metadata("design:type", String)
], MetadataPanel.prototype, "noDataMessage", void 0);
__decorate([
    vuePropertyDecorator.Prop({
        default: () => {
            return [5];
        }
    }),
    __metadata("design:type", Array)
], MetadataPanel.prototype, "pageSizes", void 0);
MetadataPanel = __decorate([
    vuePropertyDecorator.Component({})
], MetadataPanel);
var script$E = MetadataPanel;

/* script */
const __vue_script__$G = script$E;

/* template */
var __vue_render__$G = function() {
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
                          "\n          " +
                            _vm._s(
                              props.item.name.length > 25
                                ? props.item.name.substring(0, 25) + "..."
                                : props.item.name
                            ) +
                            "\n        "
                        )
                      ]
                    ),
                    _vm._v(" "),
                    _c(
                      "td",
                      { attrs: { width: "370px", title: props.item.value } },
                      [
                        _vm._v(
                          "\n          " +
                            _vm._s(
                              props.item.value.length > 50
                                ? props.item.value.substring(0, 50) + "..."
                                : props.item.value
                            ) +
                            "\n        "
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
                                    _c(
                                      "v-icon",
                                      { staticClass: "grey--text" },
                                      [_vm._v("fa-trash")]
                                    )
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
                                  _c(
                                    "v-icon",
                                    {
                                      staticClass: "blue--text text--darken-2"
                                    },
                                    [_vm._v("fa-plus-circle")]
                                  )
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
var __vue_staticRenderFns__$G = [];
__vue_render__$G._withStripped = true;

  /* style */
  const __vue_inject_styles__$G = function (inject) {
    if (!inject) return
    inject("data-v-44add45b_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"MetadataPanel.vue"}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$G = "data-v-44add45b";
  /* module identifier */
  const __vue_module_identifier__$G = undefined;
  /* functional template */
  const __vue_is_functional_template__$G = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$G = normalizeComponent(
    { render: __vue_render__$G, staticRenderFns: __vue_staticRenderFns__$G },
    __vue_inject_styles__$G,
    __vue_script__$G,
    __vue_scope_id__$G,
    __vue_is_functional_template__$G,
    __vue_module_identifier__$G,
    false,
    createInjector,
    undefined,
    undefined
  );

let ListEntry = class ListEntry extends Vue {
};
ListEntry = __decorate([
    vuePropertyDecorator.Component
], ListEntry);
var script$F = ListEntry;

/* script */
const __vue_script__$H = script$F;

/* template */
var __vue_render__$H = function() {
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
var __vue_staticRenderFns__$H = [];
__vue_render__$H._withStripped = true;

  /* style */
  const __vue_inject_styles__$H = function (inject) {
    if (!inject) return
    inject("data-v-459ba68c_0", { source: "\n.list-entry[data-v-459ba68c] {\r\n  border: 1px solid #eee;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\list\\ListEntry.vue"],"names":[],"mappings":";AAeA;EACA,sBAAA;AACA","file":"ListEntry.vue","sourcesContent":["<template>\r\n  <v-card class=\"list-entry\" flat hover>\r\n    <slot />\r\n  </v-card>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\nimport { Component } from \"vue-property-decorator\";\r\n\r\n@Component\r\nexport default class ListEntry extends Vue {}\r\n</script>\r\n\r\n<style scoped>\r\n.list-entry {\r\n  border: 1px solid #eee;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$H = "data-v-459ba68c";
  /* module identifier */
  const __vue_module_identifier__$H = undefined;
  /* functional template */
  const __vue_is_functional_template__$H = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$H = normalizeComponent(
    { render: __vue_render__$H, staticRenderFns: __vue_staticRenderFns__$H },
    __vue_inject_styles__$H,
    __vue_script__$H,
    __vue_scope_id__$H,
    __vue_is_functional_template__$H,
    __vue_module_identifier__$H,
    false,
    createInjector,
    undefined,
    undefined
  );

let ListLayout = class ListLayout extends Vue {
};
ListLayout = __decorate([
    vuePropertyDecorator.Component({})
], ListLayout);
var script$G = ListLayout;

/* script */
const __vue_script__$I = script$G;

/* template */
var __vue_render__$I = function() {
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
var __vue_staticRenderFns__$I = [];
__vue_render__$I._withStripped = true;

  /* style */
  const __vue_inject_styles__$I = function (inject) {
    if (!inject) return
    inject("data-v-6fee8c5e_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"ListLayout.vue"}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$I = "data-v-6fee8c5e";
  /* module identifier */
  const __vue_module_identifier__$I = undefined;
  /* functional template */
  const __vue_is_functional_template__$I = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$I = normalizeComponent(
    { render: __vue_render__$I, staticRenderFns: __vue_staticRenderFns__$I },
    __vue_inject_styles__$I,
    __vue_script__$I,
    __vue_scope_id__$I,
    __vue_is_functional_template__$I,
    __vue_module_identifier__$I,
    false,
    createInjector,
    undefined,
    undefined
  );

let NavigationPage = class NavigationPage extends Vue {
};
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], NavigationPage.prototype, "icon", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], NavigationPage.prototype, "title", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], NavigationPage.prototype, "loadingMessage", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Boolean)
], NavigationPage.prototype, "loaded", void 0);
NavigationPage = __decorate([
    vuePropertyDecorator.Component({
        components: {
            LoadingOverlay: __vue_component__$j
        }
    })
], NavigationPage);
var script$H = NavigationPage;

/* script */
const __vue_script__$J = script$H;

/* template */
var __vue_render__$J = function() {
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
var __vue_staticRenderFns__$J = [];
__vue_render__$J._withStripped = true;

  /* style */
  const __vue_inject_styles__$J = function (inject) {
    if (!inject) return
    inject("data-v-dcb661ca_0", { source: "\n.flex-rows[data-v-dcb661ca] {\r\n  display: flex;\r\n  flex-direction: column;\n}\n.toolbar[data-v-dcb661ca] {\r\n  flex: 0;\r\n  z-index: 1;\r\n  color: #333;\n}\n.header[data-v-dcb661ca] {\r\n  flex: 0;\r\n  z-index: 1;\n}\n.content[data-v-dcb661ca] {\r\n  flex: 1;\r\n  overflow-y: auto;\r\n  z-index: 0;\n}\n.footer[data-v-dcb661ca] {\r\n  flex: 0;\r\n  z-index: 1;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\navigation\\NavigationPage.vue"],"names":[],"mappings":";AA0CA;EACA,aAAA;EACA,sBAAA;AACA;AACA;EACA,OAAA;EACA,UAAA;EACA,WAAA;AACA;AACA;EACA,OAAA;EACA,UAAA;AACA;AACA;EACA,OAAA;EACA,gBAAA;EACA,UAAA;AACA;AACA;EACA,OAAA;EACA,UAAA;AACA","file":"NavigationPage.vue","sourcesContent":["<template>\r\n  <v-card class=\"flex-rows\" flat fill-height>\r\n    <v-toolbar class=\"elevation-1 toolbar\" dense>\r\n      <v-icon>{{ icon }}</v-icon>\r\n      <v-toolbar-title class=\"ml-2 subheading\">{{ title }}</v-toolbar-title>\r\n      <v-spacer></v-spacer>\r\n      <slot name=\"actions\" />\r\n    </v-toolbar>\r\n    <div class=\"header\">\r\n      <slot name=\"header\" />\r\n    </div>\r\n    <div class=\"content\">\r\n      <slot v-if=\"loaded\" name=\"content\" />\r\n    </div>\r\n    <div class=\"footer\">\r\n      <slot name=\"footer\" />\r\n    </div>\r\n    <loading-overlay v-if=\"!loaded\" :loadingMessage=\"loadingMessage\" />\r\n    <slot name=\"dialogs\" />\r\n  </v-card>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\nimport { Component, Prop } from \"vue-property-decorator\";\r\n\r\nimport LoadingOverlay from \"../common/LoadingOverlay.vue\";\r\n\r\n@Component({\r\n  components: {\r\n    LoadingOverlay\r\n  }\r\n})\r\nexport default class NavigationPage extends Vue {\r\n  @Prop() readonly icon!: string;\r\n  @Prop() readonly title!: string;\r\n  @Prop() readonly loadingMessage!: string;\r\n  @Prop() readonly loaded!: boolean;\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.flex-rows {\r\n  display: flex;\r\n  flex-direction: column;\r\n}\r\n.toolbar {\r\n  flex: 0;\r\n  z-index: 1;\r\n  color: #333;\r\n}\r\n.header {\r\n  flex: 0;\r\n  z-index: 1;\r\n}\r\n.content {\r\n  flex: 1;\r\n  overflow-y: auto;\r\n  z-index: 0;\r\n}\r\n.footer {\r\n  flex: 0;\r\n  z-index: 1;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$J = "data-v-dcb661ca";
  /* module identifier */
  const __vue_module_identifier__$J = undefined;
  /* functional template */
  const __vue_is_functional_template__$J = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$J = normalizeComponent(
    { render: __vue_render__$J, staticRenderFns: __vue_staticRenderFns__$J },
    __vue_inject_styles__$J,
    __vue_script__$J,
    __vue_scope_id__$J,
    __vue_is_functional_template__$J,
    __vue_module_identifier__$J,
    false,
    createInjector,
    undefined,
    undefined
  );

let Pager = class Pager extends Vue {
    onButtonClicked(e) {
        this.$emit("click", e);
    }
};
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], Pager.prototype, "icon", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], Pager.prototype, "text", void 0);
__decorate([
    vuePropertyDecorator.Prop({ default: false }),
    __metadata("design:type", Boolean)
], Pager.prototype, "disabled", void 0);
Pager = __decorate([
    vuePropertyDecorator.Component
], Pager);
var script$I = Pager;

/* script */
const __vue_script__$K = script$I;

/* template */
var __vue_render__$K = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-tooltip",
    { attrs: { top: "" } },
    [
      _c(
        "v-btn",
        {
          staticClass: "ml-0 mr-0 grey--text text--darken-2",
          attrs: {
            slot: "activator",
            disabled: _vm.disabled,
            icon: "",
            light: ""
          },
          on: { click: _vm.onButtonClicked },
          slot: "activator"
        },
        [_c("v-icon", [_vm._v(_vm._s(_vm.icon))])],
        1
      ),
      _vm._v(" "),
      _c("span", [_vm._v(_vm._s(_vm.text))])
    ],
    1
  )
};
var __vue_staticRenderFns__$K = [];
__vue_render__$K._withStripped = true;

  /* style */
  const __vue_inject_styles__$K = undefined;
  /* scoped */
  const __vue_scope_id__$K = undefined;
  /* module identifier */
  const __vue_module_identifier__$K = undefined;
  /* functional template */
  const __vue_is_functional_template__$K = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$K = normalizeComponent(
    { render: __vue_render__$K, staticRenderFns: __vue_staticRenderFns__$K },
    __vue_inject_styles__$K,
    __vue_script__$K,
    __vue_scope_id__$K,
    __vue_is_functional_template__$K,
    __vue_module_identifier__$K,
    false,
    undefined,
    undefined,
    undefined
  );

let Pager$1 = class Pager extends Vue {
    constructor() {
        super(...arguments);
        this.page = 1;
        this.pageSize = null;
        this.defaultResults = {
            numResults: 0,
            results: []
        };
        this.defaultPageSizes = [
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
    }
    created() {
        if (!this.pageSize) {
            this.pageSize = this.pageSizesWithDefaults[0].value;
        }
        this.onPagingUpdated();
    }
    // Refresh results on page size updated.
    onPageSizeUpdated(val, oldVal) {
        this.page = 1;
        this.onPagingUpdated();
    }
    // Results with defaults fallback.
    get resultsWithDefaults() {
        return this.results || this.defaultResults;
    }
    // Total record count.
    get total() {
        return this.resultsWithDefaults.numResults;
    }
    // Description.
    get description() {
        let size = this.pageSize || 0;
        let total = this.total;
        let page = this.page;
        var first = size * (page - 1) + 1;
        var last = Math.min(total, first + size - 1);
        return "" + first + "-" + last + " of " + total;
    }
    // Calculate number of pages.
    get pageCount() {
        var results = this.resultsWithDefaults;
        var total = results.numResults;
        var size = this.pageSize || 0;
        var mod = total % size;
        var count = (total / size) | 0;
        count += mod > 0 ? 1 : 0;
        return count;
    }
    // Get list of available page sizes with fallback defaults.
    get pageSizesWithDefaults() {
        return this.pageSizes || this.defaultPageSizes;
    }
    // Indicates if 'first' button should be enabled.
    get previousEnabled() {
        return this.page > 1;
    }
    // Indicates if 'first' button should be enabled.
    get nextEnabled() {
        return this.page < this.pageCount;
    }
    // Called to move to first page.
    onFirstPage() {
        if (this.page !== 1) {
            this.page = 1;
            this.onPagingUpdated();
        }
    }
    // Called to move to previous page.
    onPreviousPage() {
        if (this.page > 1) {
            this.page--;
            this.onPagingUpdated();
        }
    }
    // Called to refresh data.
    onRefresh() {
        this.onPagingUpdated();
    }
    // Called to move to next page.
    onNextPage() {
        if (this.page < this.pageCount) {
            this.page++;
            this.onPagingUpdated();
        }
    }
    // Called to move to last page.
    onLastPage() {
        if (this.page < this.pageCount) {
            this.page = this.pageCount;
            this.onPagingUpdated();
        }
    }
    // Called when paging values are updated.
    onPagingUpdated() {
        var paging = {
            pageNumber: this.page,
            pageSize: this.pageSize || 0
        };
        this.$emit("pagingUpdated", paging);
    }
};
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Object)
], Pager$1.prototype, "results", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Array)
], Pager$1.prototype, "pageSizes", void 0);
__decorate([
    vuePropertyDecorator.Watch("pageSize"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], Pager$1.prototype, "onPageSizeUpdated", null);
Pager$1 = __decorate([
    vuePropertyDecorator.Component({
        components: {
            PagerButton: __vue_component__$K
        }
    })
], Pager$1);
var script$J = Pager$1;

/* script */
const __vue_script__$L = script$J;

/* template */
var __vue_render__$L = function() {
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
                  _c("pager-button", {
                    attrs: {
                      disabled: !_vm.previousEnabled,
                      icon: "fa-fast-backward",
                      text: "First Page"
                    },
                    on: { click: _vm.onFirstPage }
                  }),
                  _vm._v(" "),
                  _c("pager-button", {
                    attrs: {
                      disabled: !_vm.previousEnabled,
                      icon: "fa-backward",
                      text: "Previous Page"
                    },
                    on: { click: _vm.onPreviousPage }
                  }),
                  _vm._v(" "),
                  _c("pager-button", {
                    attrs: { icon: "fa-sync", text: "Refresh" },
                    on: { click: _vm.onRefresh }
                  }),
                  _vm._v(" "),
                  _c("pager-button", {
                    attrs: {
                      disabled: !_vm.nextEnabled,
                      icon: "fa-forward",
                      text: "Next Page"
                    },
                    on: { click: _vm.onNextPage }
                  }),
                  _vm._v(" "),
                  _c("pager-button", {
                    attrs: {
                      disabled: !_vm.nextEnabled,
                      icon: "fa-fast-forward",
                      text: "Last Page"
                    },
                    on: { click: _vm.onLastPage }
                  })
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
var __vue_staticRenderFns__$L = [];
__vue_render__$L._withStripped = true;

  /* style */
  const __vue_inject_styles__$L = function (inject) {
    if (!inject) return
    inject("data-v-530897b7_0", { source: "\n.pager[data-v-530897b7] {\r\n  color: #333;\r\n  background-color: #eee;\r\n  border-top: 1px solid #ccc;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\list\\Pager.vue"],"names":[],"mappings":";AAuMA;EACA,WAAA;EACA,sBAAA;EACA,0BAAA;AACA","file":"Pager.vue","sourcesContent":["<template>\r\n  <div class=\"pager\">\r\n    <slot v-if=\"results && results.numResults === 0\" name=\"noresults\"></slot>\r\n    <v-container class=\"ma-0 pa-0\">\r\n      <v-layout row wrap>\r\n        <v-flex xs2>\r\n          <v-subheader class=\"ma-0 pt-0 pr-0\">Rows per page</v-subheader>\r\n        </v-flex>\r\n        <v-flex xs3>\r\n          <v-btn-toggle v-model=\"pageSize\" class=\"mt-1\">\r\n            <v-btn\r\n              flat\r\n              :value=\"entry.value\"\r\n              v-for=\"entry in pageSizesWithDefaults\"\r\n              :key=\"entry.value\"\r\n            >{{ entry.text }}</v-btn>\r\n          </v-btn-toggle>\r\n        </v-flex>\r\n        <v-flex xs4>\r\n          <pager-button\r\n            :disabled=\"!previousEnabled\"\r\n            @click=\"onFirstPage\"\r\n            icon=\"fa-fast-backward\"\r\n            text=\"First Page\"\r\n          />\r\n          <pager-button\r\n            :disabled=\"!previousEnabled\"\r\n            @click=\"onPreviousPage\"\r\n            icon=\"fa-backward\"\r\n            text=\"Previous Page\"\r\n          />\r\n          <pager-button @click=\"onRefresh\" icon=\"fa-sync\" text=\"Refresh\" />\r\n          <pager-button\r\n            :disabled=\"!nextEnabled\"\r\n            @click=\"onNextPage\"\r\n            icon=\"fa-forward\"\r\n            text=\"Next Page\"\r\n          />\r\n          <pager-button\r\n            :disabled=\"!nextEnabled\"\r\n            @click=\"onLastPage\"\r\n            icon=\"fa-fast-forward\"\r\n            text=\"Last Page\"\r\n          />\r\n        </v-flex>\r\n        <v-flex xs3>\r\n          <v-subheader class=\"ma-0 pt-0 right\">{{ description }}</v-subheader>\r\n        </v-flex>\r\n      </v-layout>\r\n    </v-container>\r\n  </div>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\n\r\nimport PagerButton from \"./PagerButton.vue\";\r\n\r\nimport { Component, Prop, Watch } from \"vue-property-decorator\";\r\nimport { IPaging, IPageSizes } from \"sitewhere-ide-common\";\r\n\r\n@Component({\r\n  components: {\r\n    PagerButton\r\n  }\r\n})\r\nexport default class Pager extends Vue {\r\n  @Prop() readonly results!: { numResults: number; results: {}[] };\r\n  @Prop() readonly pageSizes!: IPageSizes;\r\n\r\n  page: number = 1;\r\n  pageSize: number | null = null;\r\n  defaultResults: { numResults: number; results: {}[] } = {\r\n    numResults: 0,\r\n    results: []\r\n  };\r\n  defaultPageSizes: IPageSizes = [\r\n    {\r\n      text: \"10\",\r\n      value: 10\r\n    },\r\n    {\r\n      text: \"25\",\r\n      value: 25\r\n    },\r\n    {\r\n      text: \"50\",\r\n      value: 50\r\n    }\r\n  ];\r\n\r\n  created() {\r\n    if (!this.pageSize) {\r\n      this.pageSize = this.pageSizesWithDefaults[0].value;\r\n    }\r\n    this.onPagingUpdated();\r\n  }\r\n\r\n  // Refresh results on page size updated.\r\n  @Watch(\"pageSize\") onPageSizeUpdated(val: number, oldVal: number) {\r\n    this.page = 1;\r\n    this.onPagingUpdated();\r\n  }\r\n\r\n  // Results with defaults fallback.\r\n  get resultsWithDefaults(): { numResults: number; results: {}[] } {\r\n    return this.results || this.defaultResults;\r\n  }\r\n\r\n  // Total record count.\r\n  get total(): number {\r\n    return this.resultsWithDefaults.numResults;\r\n  }\r\n\r\n  // Description.\r\n  get description(): string {\r\n    let size = this.pageSize || 0;\r\n    let total = this.total;\r\n    let page = this.page;\r\n    var first = size * (page - 1) + 1;\r\n    var last = Math.min(total, first + size - 1);\r\n    return \"\" + first + \"-\" + last + \" of \" + total;\r\n  }\r\n\r\n  // Calculate number of pages.\r\n  get pageCount() {\r\n    var results = this.resultsWithDefaults;\r\n    var total = results.numResults;\r\n    var size = this.pageSize || 0;\r\n    var mod = total % size;\r\n    var count = (total / size) | 0;\r\n    count += mod > 0 ? 1 : 0;\r\n    return count;\r\n  }\r\n\r\n  // Get list of available page sizes with fallback defaults.\r\n  get pageSizesWithDefaults(): { text: string; value: number }[] {\r\n    return this.pageSizes || this.defaultPageSizes;\r\n  }\r\n\r\n  // Indicates if 'first' button should be enabled.\r\n  get previousEnabled(): boolean {\r\n    return this.page > 1;\r\n  }\r\n\r\n  // Indicates if 'first' button should be enabled.\r\n  get nextEnabled(): boolean {\r\n    return this.page < this.pageCount;\r\n  }\r\n\r\n  // Called to move to first page.\r\n  onFirstPage() {\r\n    if (this.page !== 1) {\r\n      this.page = 1;\r\n      this.onPagingUpdated();\r\n    }\r\n  }\r\n\r\n  // Called to move to previous page.\r\n  onPreviousPage() {\r\n    if (this.page > 1) {\r\n      this.page--;\r\n      this.onPagingUpdated();\r\n    }\r\n  }\r\n\r\n  // Called to refresh data.\r\n  onRefresh() {\r\n    this.onPagingUpdated();\r\n  }\r\n\r\n  // Called to move to next page.\r\n  onNextPage() {\r\n    if (this.page < this.pageCount) {\r\n      this.page++;\r\n      this.onPagingUpdated();\r\n    }\r\n  }\r\n\r\n  // Called to move to last page.\r\n  onLastPage() {\r\n    if (this.page < this.pageCount) {\r\n      this.page = this.pageCount;\r\n      this.onPagingUpdated();\r\n    }\r\n  }\r\n\r\n  // Called when paging values are updated.\r\n  onPagingUpdated() {\r\n    var paging: IPaging = {\r\n      pageNumber: this.page,\r\n      pageSize: this.pageSize || 0\r\n    };\r\n    this.$emit(\"pagingUpdated\", paging);\r\n  }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.pager {\r\n  color: #333;\r\n  background-color: #eee;\r\n  border-top: 1px solid #ccc;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$L = "data-v-530897b7";
  /* module identifier */
  const __vue_module_identifier__$L = undefined;
  /* functional template */
  const __vue_is_functional_template__$L = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$L = normalizeComponent(
    { render: __vue_render__$L, staticRenderFns: __vue_staticRenderFns__$L },
    __vue_inject_styles__$L,
    __vue_script__$L,
    __vue_scope_id__$L,
    __vue_is_functional_template__$L,
    __vue_module_identifier__$L,
    false,
    createInjector,
    undefined,
    undefined
  );

let ListPage = class ListPage extends Vue {
    /** Detect whether loaded with results */
    get hasResults() {
        return this.loaded && this.results && this.results.numResults > 0;
    }
    /** Detect whether loaded with no results */
    get noResults() {
        return this.loaded && this.results && this.results.numResults === 0;
    }
    /** Update paging values and run query */
    onPagingUpdated(paging) {
        this.$emit("pagingUpdated", paging);
    }
};
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], ListPage.prototype, "icon", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], ListPage.prototype, "title", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], ListPage.prototype, "loadingMessage", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Array)
], ListPage.prototype, "pageSizes", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Boolean)
], ListPage.prototype, "loaded", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Object)
], ListPage.prototype, "results", void 0);
ListPage = __decorate([
    vuePropertyDecorator.Component({
        components: {
            NavigationPage: __vue_component__$J,
            Pager: __vue_component__$L
        }
    })
], ListPage);
var script$K = ListPage;

/* script */
const __vue_script__$M = script$K;

/* template */
var __vue_render__$M = function() {
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
          _c(
            "div",
            { staticClass: "list-content" },
            [
              _vm.hasResults
                ? _vm._t("default")
                : _vm.noResults
                ? _vm._t("noresults")
                : _vm._e()
            ],
            2
          )
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
var __vue_staticRenderFns__$M = [];
__vue_render__$M._withStripped = true;

  /* style */
  const __vue_inject_styles__$M = function (inject) {
    if (!inject) return
    inject("data-v-44205fd0_0", { source: "\n.flex-rows[data-v-44205fd0] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  height: 100%;\n}\n.list-filters[data-v-44205fd0] {\r\n  flex: 0;\n}\n.list-content[data-v-44205fd0] {\r\n  flex: 1;\r\n  overflow-y: auto;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\list\\ListPage.vue"],"names":[],"mappings":";AAkEA;EACA,aAAA;EACA,sBAAA;EACA,YAAA;AACA;AACA;EACA,OAAA;AACA;AACA;EACA,OAAA;EACA,gBAAA;AACA","file":"ListPage.vue","sourcesContent":["<template>\r\n  <navigation-page :icon=\"icon\" :title=\"title\" :loadingMessage=\"loadingMessage\" :loaded=\"loaded\">\r\n    <template slot=\"content\">\r\n      <div class=\"flex-rows\">\r\n        <div class=\"list-filters\">\r\n          <slot name=\"filters\" />\r\n        </div>\r\n        <div class=\"list-content\">\r\n          <slot v-if=\"hasResults\" />\r\n          <slot name=\"noresults\" v-else-if=\"noResults\" />\r\n        </div>\r\n      </div>\r\n    </template>\r\n    <template slot=\"footer\">\r\n      <pager :results=\"results\" @pagingUpdated=\"onPagingUpdated\" :pageSizes=\"pageSizes\" />\r\n    </template>\r\n    <template slot=\"actions\">\r\n      <slot name=\"actions\" />\r\n    </template>\r\n    <template slot=\"dialogs\">\r\n      <slot name=\"dialogs\" />\r\n    </template>\r\n  </navigation-page>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\n\r\nimport NavigationPage from \"../navigation/NavigationPage.vue\";\r\nimport Pager from \"../list/Pager.vue\";\r\n\r\nimport { Component, Prop } from \"vue-property-decorator\";\r\nimport { IPaging, IPageSizes } from \"sitewhere-ide-common\";\r\n\r\n@Component({\r\n  components: {\r\n    NavigationPage,\r\n    Pager\r\n  }\r\n})\r\nexport default class ListPage extends Vue {\r\n  @Prop() readonly icon!: string;\r\n  @Prop() readonly title!: string;\r\n  @Prop() readonly loadingMessage!: string;\r\n  @Prop() readonly pageSizes!: IPageSizes;\r\n  @Prop() readonly loaded!: boolean;\r\n  @Prop() readonly results!: { numResults: number; results: {}[] };\r\n\r\n  /** Detect whether loaded with results */\r\n  get hasResults() {\r\n    return this.loaded && this.results && this.results.numResults > 0;\r\n  }\r\n\r\n  /** Detect whether loaded with no results */\r\n  get noResults() {\r\n    return this.loaded && this.results && this.results.numResults === 0;\r\n  }\r\n\r\n  /** Update paging values and run query */\r\n  onPagingUpdated(paging: IPaging) {\r\n    this.$emit(\"pagingUpdated\", paging);\r\n  }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.flex-rows {\r\n  display: flex;\r\n  flex-direction: column;\r\n  height: 100%;\r\n}\r\n.list-filters {\r\n  flex: 0;\r\n}\r\n.list-content {\r\n  flex: 1;\r\n  overflow-y: auto;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$M = "data-v-44205fd0";
  /* module identifier */
  const __vue_module_identifier__$M = undefined;
  /* functional template */
  const __vue_is_functional_template__$M = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$M = normalizeComponent(
    { render: __vue_render__$M, staticRenderFns: __vue_staticRenderFns__$M },
    __vue_inject_styles__$M,
    __vue_script__$M,
    __vue_scope_id__$M,
    __vue_is_functional_template__$M,
    __vue_module_identifier__$M,
    false,
    createInjector,
    undefined,
    undefined
  );

let ListTab = class ListTab extends Vue {
    /** Detect whether loaded with results */
    get hasResults() {
        return this.loaded && this.results && this.results.numResults > 0;
    }
    /** Detect whether loaded with no results */
    get noResults() {
        return this.loaded && this.results && this.results.numResults === 0;
    }
    /** Update paging values and run query */
    onPagingUpdated(paging) {
        this.$emit("pagingUpdated", paging);
    }
};
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], ListTab.prototype, "tabkey", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Array)
], ListTab.prototype, "pageSizes", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], ListTab.prototype, "loadingMessage", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Boolean)
], ListTab.prototype, "loaded", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Object)
], ListTab.prototype, "results", void 0);
ListTab = __decorate([
    vuePropertyDecorator.Component({
        components: {
            Pager: __vue_component__$L,
            LoadingOverlay: __vue_component__$j
        }
    })
], ListTab);
var script$L = ListTab;

/* script */
const __vue_script__$N = script$L;

/* template */
var __vue_render__$N = function() {
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
          [
            _vm.hasResults
              ? _vm._t("default")
              : _vm.noResults
              ? _vm._t("noresults")
              : _vm._e()
          ],
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
var __vue_staticRenderFns__$N = [];
__vue_render__$N._withStripped = true;

  /* style */
  const __vue_inject_styles__$N = function (inject) {
    if (!inject) return
    inject("data-v-77bbde59_0", { source: "\n.flex-rows[data-v-77bbde59] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  height: 100%;\n}\n.list-filters[data-v-77bbde59] {\r\n  flex: 0;\n}\n.list-content[data-v-77bbde59] {\r\n  flex: 1;\r\n  background-color: #eee;\r\n  overflow-y: auto;\n}\n.list-footer[data-v-77bbde59] {\r\n  flex: 0;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\list\\ListTab.vue"],"names":[],"mappings":";AA2DA;EACA,aAAA;EACA,sBAAA;EACA,YAAA;AACA;AACA;EACA,OAAA;AACA;AACA;EACA,OAAA;EACA,sBAAA;EACA,gBAAA;AACA;AACA;EACA,OAAA;AACA","file":"ListTab.vue","sourcesContent":["<template>\r\n  <v-tab-item :key=\"tabkey\">\r\n    <div class=\"flex-rows\">\r\n      <div class=\"list-filters\">\r\n        <slot name=\"filters\" />\r\n      </div>\r\n      <div class=\"list-content\">\r\n        <slot v-if=\"hasResults\" />\r\n        <slot name=\"noresults\" v-else-if=\"noResults\" />\r\n      </div>\r\n      <div class=\"list-footer\">\r\n        <pager :results=\"results\" @pagingUpdated=\"onPagingUpdated\" :pageSizes=\"pageSizes\" />\r\n      </div>\r\n    </div>\r\n    <loading-overlay v-if=\"!loaded\" :loadingMessage=\"loadingMessage\" />\r\n    <slot name=\"dialogs\" />\r\n  </v-tab-item>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\n\r\nimport Pager from \"./Pager.vue\";\r\nimport LoadingOverlay from \"../common/LoadingOverlay.vue\";\r\n\r\nimport { Component, Prop } from \"vue-property-decorator\";\r\nimport { IPaging, IPageSizes } from \"sitewhere-ide-common\";\r\n\r\n@Component({\r\n  components: {\r\n    Pager,\r\n    LoadingOverlay\r\n  }\r\n})\r\nexport default class ListTab extends Vue {\r\n  @Prop() readonly tabkey!: string;\r\n  @Prop() readonly pageSizes!: IPageSizes;\r\n  @Prop() readonly loadingMessage!: string;\r\n  @Prop() readonly loaded!: boolean;\r\n  @Prop() readonly results!: { numResults: number; results: {}[] };\r\n\r\n  /** Detect whether loaded with results */\r\n  get hasResults() {\r\n    return this.loaded && this.results && this.results.numResults > 0;\r\n  }\r\n\r\n  /** Detect whether loaded with no results */\r\n  get noResults() {\r\n    return this.loaded && this.results && this.results.numResults === 0;\r\n  }\r\n\r\n  /** Update paging values and run query */\r\n  onPagingUpdated(paging: IPaging) {\r\n    this.$emit(\"pagingUpdated\", paging);\r\n  }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.flex-rows {\r\n  display: flex;\r\n  flex-direction: column;\r\n  height: 100%;\r\n}\r\n.list-filters {\r\n  flex: 0;\r\n}\r\n.list-content {\r\n  flex: 1;\r\n  background-color: #eee;\r\n  overflow-y: auto;\r\n}\r\n.list-footer {\r\n  flex: 0;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$N = "data-v-77bbde59";
  /* module identifier */
  const __vue_module_identifier__$N = undefined;
  /* functional template */
  const __vue_is_functional_template__$N = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$N = normalizeComponent(
    { render: __vue_render__$N, staticRenderFns: __vue_staticRenderFns__$N },
    __vue_inject_styles__$N,
    __vue_script__$N,
    __vue_scope_id__$N,
    __vue_is_functional_template__$N,
    __vue_module_identifier__$N,
    false,
    createInjector,
    undefined,
    undefined
  );

let RemoteConnectionsList = class RemoteConnectionsList extends Vue {
    constructor() {
        super(...arguments);
        this.selected = [];
        this.selection = null;
    }
    /** Single select item */
    onSelect(selected) {
        this.selected = [];
        this.connections.forEach(connection => {
            if (connection.id == selected.id) {
                this.selected.push(connection);
                this.selection = connection;
                this.$emit("selected", connection);
            }
        });
    }
    textStyle(conn) {
        return {
            "font-weight": conn.id === this.remotes.default ? "bold" : "normal"
        };
    }
    get isUpDisabled() {
        if (this.selection) {
            if (this.getConnectionIndex(this.selection) === 0) {
                return true;
            }
            return false;
        }
        return true;
    }
    get isDownDisabled() {
        if (this.selection) {
            if (this.getConnectionIndex(this.selection) >=
                this.remotes.connections.length - 1) {
                return true;
            }
            return false;
        }
        return true;
    }
    get isDefaultDisabled() {
        if (this.selection) {
            if (this.selection.id === this.remotes.default) {
                return true;
            }
            return false;
        }
        return true;
    }
    get isDeleteDisabled() {
        if (this.selection) {
            if (this.selection.id === this.remotes.default) {
                return true;
            }
            return false;
        }
        return true;
    }
    get connections() {
        return this.remotes ? this.remotes.connections : [];
    }
    getNameAndUrl(connection) {
        return `${connection.name} (${connection.protocol}://${connection.host}:${connection.port})`;
    }
    /** Handle click on connection in list */
    onConnectionClicked(connection) {
        this.selected = [connection];
    }
    /** Get index for a connection */
    getConnectionIndex(connection) {
        return this.remotes.connections.indexOf(connection);
    }
    /** Move connection up in the list */
    onConnectionMoveUp() {
        if (this.selection) {
            let old = this.getConnectionIndex(this.selection);
            arrayMove(this.remotes.connections, old, old - 1);
        }
    }
    /** Move connection down in the list */
    onConnectionMoveDown() {
        if (this.selection) {
            let old = this.getConnectionIndex(this.selection);
            arrayMove(this.remotes.connections, old, old + 1);
        }
    }
    /** Delete a connection */
    onConnectionDelete() {
        if (this.selection) {
            this.remotes.connections.splice(this.getConnectionIndex(this.selection), 1);
        }
    }
    /** Set current selection as the default */
    onConnectionDefault() {
        if (this.selection) {
            this.remotes.default = this.selection.id;
        }
    }
};
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Object)
], RemoteConnectionsList.prototype, "remotes", void 0);
RemoteConnectionsList = __decorate([
    vuePropertyDecorator.Component({})
], RemoteConnectionsList);
var script$M = RemoteConnectionsList;

/* script */
const __vue_script__$O = script$M;

/* template */
var __vue_render__$O = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    [
      _c(
        "div",
        {
          staticStyle: {
            height: "300px",
            "overflow-y": "auto",
            border: "1px solid #ddd"
          }
        },
        [
          _c("v-data-table", {
            attrs: {
              items: _vm.connections,
              "item-key": "id",
              "hide-headers": "",
              "hide-actions": ""
            },
            scopedSlots: _vm._u([
              {
                key: "items",
                fn: function(props) {
                  return [
                    _c(
                      "tr",
                      {
                        staticStyle: { cursor: "pointer" },
                        attrs: { active: props.selected },
                        on: {
                          click: function($event) {
                            return _vm.onSelect(props.item)
                          }
                        }
                      },
                      [
                        _c(
                          "td",
                          { staticClass: "pa-2", attrs: { width: "5%" } },
                          [
                            _c("v-icon", [
                              _vm._v(
                                _vm._s(
                                  props.item.protocol === "https"
                                    ? "lock"
                                    : "lock_open"
                                )
                              )
                            ])
                          ],
                          1
                        ),
                        _vm._v(" "),
                        _c(
                          "td",
                          {
                            staticClass: "subheading pa-2",
                            style: _vm.textStyle(props.item),
                            attrs: { width: "90%" }
                          },
                          [_vm._v(_vm._s(_vm.getNameAndUrl(props.item)))]
                        ),
                        _vm._v(" "),
                        _c(
                          "td",
                          { staticClass: "pa-2", attrs: { width: "5%" } },
                          [
                            props.item.id === _vm.remotes.default
                              ? _c("v-icon", [_vm._v("star")])
                              : _vm._e()
                          ],
                          1
                        )
                      ]
                    )
                  ]
                }
              }
            ]),
            model: {
              value: _vm.selected,
              callback: function($$v) {
                _vm.selected = $$v;
              },
              expression: "selected"
            }
          })
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-layout",
        { attrs: { row: "", wrap: "" } },
        [
          _c(
            "v-flex",
            { staticClass: "pa-1", attrs: { xs3: "" } },
            [
              _c(
                "v-btn",
                {
                  attrs: { small: "", block: "", disabled: _vm.isUpDisabled },
                  on: { click: _vm.onConnectionMoveUp }
                },
                [
                  _c("v-icon", { attrs: { left: "" } }, [
                    _vm._v("arrow_upward")
                  ]),
                  _vm._v("Up\n      ")
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-flex",
            { staticClass: "pa-1", attrs: { xs3: "" } },
            [
              _c(
                "v-btn",
                {
                  attrs: { small: "", block: "", disabled: _vm.isDownDisabled },
                  on: { click: _vm.onConnectionMoveDown }
                },
                [
                  _c("v-icon", { attrs: { left: "" } }, [
                    _vm._v("arrow_downward")
                  ]),
                  _vm._v("Down\n      ")
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-flex",
            { staticClass: "pa-1", attrs: { xs3: "" } },
            [
              _c(
                "v-btn",
                {
                  attrs: {
                    small: "",
                    block: "",
                    disabled: _vm.isDefaultDisabled
                  },
                  on: { click: _vm.onConnectionDefault }
                },
                [
                  _c("v-icon", { attrs: { left: "" } }, [_vm._v("star")]),
                  _vm._v("Default\n      ")
                ],
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "v-flex",
            { staticClass: "pa-1", attrs: { xs3: "" } },
            [
              _c(
                "v-btn",
                {
                  attrs: {
                    small: "",
                    block: "",
                    disabled: _vm.isDeleteDisabled
                  },
                  on: { click: _vm.onConnectionDelete }
                },
                [
                  _c("v-icon", { attrs: { left: "" } }, [_vm._v("delete")]),
                  _vm._v("Delete\n      ")
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
var __vue_staticRenderFns__$O = [];
__vue_render__$O._withStripped = true;

  /* style */
  const __vue_inject_styles__$O = undefined;
  /* scoped */
  const __vue_scope_id__$O = undefined;
  /* module identifier */
  const __vue_module_identifier__$O = undefined;
  /* functional template */
  const __vue_is_functional_template__$O = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$O = normalizeComponent(
    { render: __vue_render__$O, staticRenderFns: __vue_staticRenderFns__$O },
    __vue_inject_styles__$O,
    __vue_script__$O,
    __vue_scope_id__$O,
    __vue_is_functional_template__$O,
    __vue_module_identifier__$O,
    false,
    undefined,
    undefined,
    undefined
  );

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function unwrapExports (x) {
	return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var withParamsBrowser = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withParams = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var root = typeof window !== 'undefined' ? window : typeof commonjsGlobal !== 'undefined' ? commonjsGlobal : {};

var fakeWithParams = function fakeWithParams(paramsOrClosure, maybeValidator) {
  if (_typeof(paramsOrClosure) === 'object' && maybeValidator !== undefined) {
    return maybeValidator;
  }

  return paramsOrClosure(function () {});
};

var withParams = root.vuelidate ? root.vuelidate.withParams : fakeWithParams;
exports.withParams = withParams;
});

unwrapExports(withParamsBrowser);
var withParamsBrowser_1 = withParamsBrowser.withParams;

var params = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pushParams = pushParams;
exports.popParams = popParams;
exports.withParams = withParams;
exports._setTarget = exports.target = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var stack = [];
var target = null;
exports.target = target;

var _setTarget = function _setTarget(x) {
  exports.target = target = x;
};

exports._setTarget = _setTarget;

function pushParams() {
  if (target !== null) {
    stack.push(target);
  }

  exports.target = target = {};
}

function popParams() {
  var lastTarget = target;
  var newTarget = exports.target = target = stack.pop() || null;

  if (newTarget) {
    if (!Array.isArray(newTarget.$sub)) {
      newTarget.$sub = [];
    }

    newTarget.$sub.push(lastTarget);
  }

  return lastTarget;
}

function addParams(params) {
  if (_typeof(params) === 'object' && !Array.isArray(params)) {
    exports.target = target = _objectSpread({}, target, {}, params);
  } else {
    throw new Error('params must be an object');
  }
}

function withParamsDirect(params, validator) {
  return withParamsClosure(function (add) {
    return function () {
      add(params);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return validator.apply(this, args);
    };
  });
}

function withParamsClosure(closure) {
  var validator = closure(addParams);
  return function () {
    pushParams();

    try {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return validator.apply(this, args);
    } finally {
      popParams();
    }
  };
}

function withParams(paramsOrClosure, maybeValidator) {
  if (_typeof(paramsOrClosure) === 'object' && maybeValidator !== undefined) {
    return withParamsDirect(paramsOrClosure, maybeValidator);
  }

  return withParamsClosure(paramsOrClosure);
}
});

unwrapExports(params);
var params_1 = params.pushParams;
var params_2 = params.popParams;
var params_3 = params.withParams;
var params_4 = params._setTarget;
var params_5 = params.target;

var withParams_1 = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var withParams = process.env.BUILD === 'web' ? withParamsBrowser.withParams : params.withParams;
var _default = withParams;
exports.default = _default;
});

unwrapExports(withParams_1);

var common = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "withParams", {
  enumerable: true,
  get: function get() {
    return _withParams.default;
  }
});
exports.regex = exports.ref = exports.len = exports.req = void 0;

var _withParams = _interopRequireDefault(withParams_1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var req = function req(value) {
  if (Array.isArray(value)) return !!value.length;

  if (value === undefined || value === null) {
    return false;
  }

  if (value === false) {
    return true;
  }

  if (value instanceof Date) {
    return !isNaN(value.getTime());
  }

  if (_typeof(value) === 'object') {
    for (var _ in value) {
      return true;
    }

    return false;
  }

  return !!String(value).length;
};

exports.req = req;

var len = function len(value) {
  if (Array.isArray(value)) return value.length;

  if (_typeof(value) === 'object') {
    return Object.keys(value).length;
  }

  return String(value).length;
};

exports.len = len;

var ref = function ref(reference, vm, parentVm) {
  return typeof reference === 'function' ? reference.call(vm, parentVm) : parentVm[reference];
};

exports.ref = ref;

var regex = function regex(type, expr) {
  return (0, _withParams.default)({
    type: type
  }, function (value) {
    return !req(value) || expr.test(value);
  });
};

exports.regex = regex;
});

unwrapExports(common);
var common_1 = common.regex;
var common_2 = common.ref;
var common_3 = common.len;
var common_4 = common.req;

var alpha = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var _default = (0, common.regex)('alpha', /^[a-zA-Z]*$/);

exports.default = _default;
});

unwrapExports(alpha);

var alphaNum = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var _default = (0, common.regex)('alphaNum', /^[a-zA-Z0-9]*$/);

exports.default = _default;
});

unwrapExports(alphaNum);

var numeric = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var _default = (0, common.regex)('numeric', /^[0-9]*$/);

exports.default = _default;
});

unwrapExports(numeric);

var between = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var _default = function _default(min, max) {
  return (0, common.withParams)({
    type: 'between',
    min: min,
    max: max
  }, function (value) {
    return !(0, common.req)(value) || (!/\s/.test(value) || value instanceof Date) && +min <= +value && +max >= +value;
  });
};

exports.default = _default;
});

unwrapExports(between);

var email = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var emailRegex = /(^$|^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$)/;

var _default = (0, common.regex)('email', emailRegex);

exports.default = _default;
});

unwrapExports(email);

var ipAddress = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var _default = (0, common.withParams)({
  type: 'ipAddress'
}, function (value) {
  if (!(0, common.req)(value)) {
    return true;
  }

  if (typeof value !== 'string') {
    return false;
  }

  var nibbles = value.split('.');
  return nibbles.length === 4 && nibbles.every(nibbleValid);
});

exports.default = _default;

var nibbleValid = function nibbleValid(nibble) {
  if (nibble.length > 3 || nibble.length === 0) {
    return false;
  }

  if (nibble[0] === '0' && nibble !== '0') {
    return false;
  }

  if (!nibble.match(/^\d+$/)) {
    return false;
  }

  var numeric = +nibble | 0;
  return numeric >= 0 && numeric <= 255;
};
});

unwrapExports(ipAddress);

var macAddress = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var _default = function _default() {
  var separator = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ':';
  return (0, common.withParams)({
    type: 'macAddress'
  }, function (value) {
    if (!(0, common.req)(value)) {
      return true;
    }

    if (typeof value !== 'string') {
      return false;
    }

    var parts = typeof separator === 'string' && separator !== '' ? value.split(separator) : value.length === 12 || value.length === 16 ? value.match(/.{2}/g) : null;
    return parts !== null && (parts.length === 6 || parts.length === 8) && parts.every(hexValid);
  });
};

exports.default = _default;

var hexValid = function hexValid(hex) {
  return hex.toLowerCase().match(/^[0-9a-f]{2}$/);
};
});

unwrapExports(macAddress);

var maxLength = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var _default = function _default(length) {
  return (0, common.withParams)({
    type: 'maxLength',
    max: length
  }, function (value) {
    return !(0, common.req)(value) || (0, common.len)(value) <= length;
  });
};

exports.default = _default;
});

unwrapExports(maxLength);

var minLength = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var _default = function _default(length) {
  return (0, common.withParams)({
    type: 'minLength',
    min: length
  }, function (value) {
    return !(0, common.req)(value) || (0, common.len)(value) >= length;
  });
};

exports.default = _default;
});

unwrapExports(minLength);

var required = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var _default = (0, common.withParams)({
  type: 'required'
}, function (value) {
  if (typeof value === 'string') {
    return (0, common.req)(value.trim());
  }

  return (0, common.req)(value);
});

exports.default = _default;
});

unwrapExports(required);

var requiredIf = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var _default = function _default(prop) {
  return (0, common.withParams)({
    type: 'requiredIf',
    prop: prop
  }, function (value, parentVm) {
    return (0, common.ref)(prop, this, parentVm) ? (0, common.req)(value) : true;
  });
};

exports.default = _default;
});

unwrapExports(requiredIf);

var requiredUnless = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var _default = function _default(prop) {
  return (0, common.withParams)({
    type: 'requiredUnless',
    prop: prop
  }, function (value, parentVm) {
    return !(0, common.ref)(prop, this, parentVm) ? (0, common.req)(value) : true;
  });
};

exports.default = _default;
});

unwrapExports(requiredUnless);

var sameAs = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var _default = function _default(equalTo) {
  return (0, common.withParams)({
    type: 'sameAs',
    eq: equalTo
  }, function (value, parentVm) {
    return value === (0, common.ref)(equalTo, this, parentVm);
  });
};

exports.default = _default;
});

unwrapExports(sameAs);

var url = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var urlRegex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

var _default = (0, common.regex)('url', urlRegex);

exports.default = _default;
});

unwrapExports(url);

var or = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var _default = function _default() {
  for (var _len = arguments.length, validators = new Array(_len), _key = 0; _key < _len; _key++) {
    validators[_key] = arguments[_key];
  }

  return (0, common.withParams)({
    type: 'or'
  }, function () {
    var _this = this;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return validators.length > 0 && validators.reduce(function (valid, fn) {
      return valid || fn.apply(_this, args);
    }, false);
  });
};

exports.default = _default;
});

unwrapExports(or);

var and = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var _default = function _default() {
  for (var _len = arguments.length, validators = new Array(_len), _key = 0; _key < _len; _key++) {
    validators[_key] = arguments[_key];
  }

  return (0, common.withParams)({
    type: 'and'
  }, function () {
    var _this = this;

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return validators.length > 0 && validators.reduce(function (valid, fn) {
      return valid && fn.apply(_this, args);
    }, true);
  });
};

exports.default = _default;
});

unwrapExports(and);

var not = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var _default = function _default(validator) {
  return (0, common.withParams)({
    type: 'not'
  }, function (value, vm) {
    return !(0, common.req)(value) || !validator.call(this, value, vm);
  });
};

exports.default = _default;
});

unwrapExports(not);

var minValue = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var _default = function _default(min) {
  return (0, common.withParams)({
    type: 'minValue',
    min: min
  }, function (value) {
    return !(0, common.req)(value) || (!/\s/.test(value) || value instanceof Date) && +value >= +min;
  });
};

exports.default = _default;
});

unwrapExports(minValue);

var maxValue = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var _default = function _default(max) {
  return (0, common.withParams)({
    type: 'maxValue',
    max: max
  }, function (value) {
    return !(0, common.req)(value) || (!/\s/.test(value) || value instanceof Date) && +value <= +max;
  });
};

exports.default = _default;
});

unwrapExports(maxValue);

var integer = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var _default = (0, common.regex)('integer', /(^[0-9]*$)|(^-[0-9]+$)/);

exports.default = _default;
});

unwrapExports(integer);

var decimal = createCommonjsModule(function (module, exports) {

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;



var _default = (0, common.regex)('decimal', /^[-]?\d*(\.\d+)?$/);

exports.default = _default;
});

unwrapExports(decimal);

var validators = createCommonjsModule(function (module, exports) {

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "alpha", {
  enumerable: true,
  get: function get() {
    return _alpha.default;
  }
});
Object.defineProperty(exports, "alphaNum", {
  enumerable: true,
  get: function get() {
    return _alphaNum.default;
  }
});
Object.defineProperty(exports, "numeric", {
  enumerable: true,
  get: function get() {
    return _numeric.default;
  }
});
Object.defineProperty(exports, "between", {
  enumerable: true,
  get: function get() {
    return _between.default;
  }
});
Object.defineProperty(exports, "email", {
  enumerable: true,
  get: function get() {
    return _email.default;
  }
});
Object.defineProperty(exports, "ipAddress", {
  enumerable: true,
  get: function get() {
    return _ipAddress.default;
  }
});
Object.defineProperty(exports, "macAddress", {
  enumerable: true,
  get: function get() {
    return _macAddress.default;
  }
});
Object.defineProperty(exports, "maxLength", {
  enumerable: true,
  get: function get() {
    return _maxLength.default;
  }
});
Object.defineProperty(exports, "minLength", {
  enumerable: true,
  get: function get() {
    return _minLength.default;
  }
});
Object.defineProperty(exports, "required", {
  enumerable: true,
  get: function get() {
    return _required.default;
  }
});
Object.defineProperty(exports, "requiredIf", {
  enumerable: true,
  get: function get() {
    return _requiredIf.default;
  }
});
Object.defineProperty(exports, "requiredUnless", {
  enumerable: true,
  get: function get() {
    return _requiredUnless.default;
  }
});
Object.defineProperty(exports, "sameAs", {
  enumerable: true,
  get: function get() {
    return _sameAs.default;
  }
});
Object.defineProperty(exports, "url", {
  enumerable: true,
  get: function get() {
    return _url.default;
  }
});
Object.defineProperty(exports, "or", {
  enumerable: true,
  get: function get() {
    return _or.default;
  }
});
Object.defineProperty(exports, "and", {
  enumerable: true,
  get: function get() {
    return _and.default;
  }
});
Object.defineProperty(exports, "not", {
  enumerable: true,
  get: function get() {
    return _not.default;
  }
});
Object.defineProperty(exports, "minValue", {
  enumerable: true,
  get: function get() {
    return _minValue.default;
  }
});
Object.defineProperty(exports, "maxValue", {
  enumerable: true,
  get: function get() {
    return _maxValue.default;
  }
});
Object.defineProperty(exports, "integer", {
  enumerable: true,
  get: function get() {
    return _integer.default;
  }
});
Object.defineProperty(exports, "decimal", {
  enumerable: true,
  get: function get() {
    return _decimal.default;
  }
});
exports.helpers = void 0;

var _alpha = _interopRequireDefault(alpha);

var _alphaNum = _interopRequireDefault(alphaNum);

var _numeric = _interopRequireDefault(numeric);

var _between = _interopRequireDefault(between);

var _email = _interopRequireDefault(email);

var _ipAddress = _interopRequireDefault(ipAddress);

var _macAddress = _interopRequireDefault(macAddress);

var _maxLength = _interopRequireDefault(maxLength);

var _minLength = _interopRequireDefault(minLength);

var _required = _interopRequireDefault(required);

var _requiredIf = _interopRequireDefault(requiredIf);

var _requiredUnless = _interopRequireDefault(requiredUnless);

var _sameAs = _interopRequireDefault(sameAs);

var _url = _interopRequireDefault(url);

var _or = _interopRequireDefault(or);

var _and = _interopRequireDefault(and);

var _not = _interopRequireDefault(not);

var _minValue = _interopRequireDefault(minValue);

var _maxValue = _interopRequireDefault(maxValue);

var _integer = _interopRequireDefault(integer);

var _decimal = _interopRequireDefault(decimal);

var helpers = _interopRequireWildcard(common);

exports.helpers = helpers;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
});

unwrapExports(validators);
var validators_1 = validators.required;
var validators_2 = validators.helpers;

let RemoteConnectionDetails = class RemoteConnectionDetails extends __vue_component__$4 {
    constructor() {
        super(...arguments);
        this.name = null;
        this.protocol = null;
        this.host = null;
        this.port = null;
        this.protocols = [
            {
                text: "http",
                value: "http"
            },
            {
                text: "https",
                value: "https"
            }
        ];
    }
    /** Reset section content */
    reset() {
        this.name = null;
        this.protocol = null;
        this.host = null;
        this.port = null;
        this.$v.$reset();
    }
    /** Perform validation */
    validate() {
        this.$v.$touch();
        return !this.$v.$invalid;
    }
    /** Load form data from an object */
    load(input) {
        this.name = input.name;
        this.protocol = input.protocol;
        this.host = input.areaType.host;
        this.port = input.port;
    }
    /** Save form data to an object */
    save() {
        return {
            id: generateUniqueId(),
            name: this.name,
            protocol: this.protocol,
            host: this.host,
            port: this.port
        };
    }
    /** Called when create button is clicked */
    onCreateClicked() {
        let added = this.save();
        this.$emit("added", added);
        this.reset();
    }
};
RemoteConnectionDetails = __decorate([
    vuePropertyDecorator.Component({
        components: {
            DialogForm: __vue_component__$w,
            FormText: __vue_component__$A,
            FormSelect: __vue_component__$y
        },
        validations: {
            name: {
                required: validators_1
            },
            protocol: {
                required: validators_1
            },
            host: {
                required: validators_1
            },
            port: {
                required: validators_1
            }
        }
    })
], RemoteConnectionDetails);
var script$N = RemoteConnectionDetails;

/* script */
const __vue_script__$P = script$N;

/* template */
var __vue_render__$P = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "dialog-form",
    [
      _c(
        "v-flex",
        { attrs: { xs12: "" } },
        [
          _c(
            "form-text",
            {
              attrs: {
                required: "",
                label: "Name",
                title: "Name displayed for remote.",
                icon: "info"
              },
              model: {
                value: _vm.name,
                callback: function($$v) {
                  _vm.name = $$v;
                },
                expression: "name"
              }
            },
            [
              !_vm.$v.name.required && _vm.$v.$dirty
                ? _c("span", [_vm._v("Name is required.")])
                : _vm._e()
            ]
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-flex",
        { attrs: { xs2: "" } },
        [
          _c("form-select", {
            attrs: {
              items: _vm.protocols,
              title: "Choose connection protocol",
              label: "Protocol",
              "item-text": "text",
              "item-value": "value",
              icon: "router"
            },
            model: {
              value: _vm.protocol,
              callback: function($$v) {
                _vm.protocol = $$v;
              },
              expression: "protocol"
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
            "form-text",
            {
              staticClass: "ml-3",
              attrs: {
                required: "",
                label: "Hostname",
                title: "Hostname for remote."
              },
              model: {
                value: _vm.host,
                callback: function($$v) {
                  _vm.host = $$v;
                },
                expression: "host"
              }
            },
            [
              !_vm.$v.host.required && _vm.$v.$dirty
                ? _c("span", [_vm._v("Hostname is required.")])
                : _vm._e()
            ]
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-flex",
        { attrs: { xs3: "" } },
        [
          _c(
            "form-text",
            {
              staticClass: "ml-3",
              attrs: {
                required: "",
                type: "number",
                label: "Port",
                title: "Port for remote."
              },
              model: {
                value: _vm.port,
                callback: function($$v) {
                  _vm.port = $$v;
                },
                expression: "port"
              }
            },
            [
              !_vm.$v.port.required && _vm.$v.$dirty
                ? _c("span", [_vm._v("Port is required.")])
                : _vm._e()
            ]
          )
        ],
        1
      ),
      _vm._v(" "),
      _c(
        "v-flex",
        { attrs: { xs1: "" } },
        [
          _c(
            "v-btn",
            {
              staticClass: "mb-0",
              attrs: { color: "primary", icon: "" },
              on: { click: _vm.onCreateClicked }
            },
            [_c("v-icon", [_vm._v("add")])],
            1
          )
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$P = [];
__vue_render__$P._withStripped = true;

  /* style */
  const __vue_inject_styles__$P = undefined;
  /* scoped */
  const __vue_scope_id__$P = undefined;
  /* module identifier */
  const __vue_module_identifier__$P = undefined;
  /* functional template */
  const __vue_is_functional_template__$P = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$P = normalizeComponent(
    { render: __vue_render__$P, staticRenderFns: __vue_staticRenderFns__$P },
    __vue_inject_styles__$P,
    __vue_script__$P,
    __vue_scope_id__$P,
    __vue_is_functional_template__$P,
    __vue_module_identifier__$P,
    false,
    undefined,
    undefined,
    undefined
  );

let RemotesDialog = class RemotesDialog extends __vue_component__$3 {
    constructor() {
        super(...arguments);
        this.remotes = null;
    }
    /** Get icon for dialog */
    get icon() {
        return SiteWhereIdeCommon.NavigationIcon.Remotes;
    }
    // Reset dialog contents.
    reset() {
        if (this.connections) {
            this.connections.reset();
        }
    }
    // Load dialog from a given payload.
    load(payload) {
        this.remotes = JSON.parse(JSON.stringify(payload));
        this.reset();
        if (this.connections) {
            this.connections.load(payload);
        }
    }
    // Called when a new connection is added.
    onConnectionAdded(added) {
        if (this.remotes) {
            this.remotes.connections.push(added);
        }
    }
    // Called after create button is clicked.
    onCreateClicked(e) {
        this.$emit("save", this.remotes);
    }
};
__decorate([
    vuePropertyDecorator.Ref(),
    __metadata("design:type", Object)
], RemotesDialog.prototype, "dialog", void 0);
__decorate([
    vuePropertyDecorator.Ref(),
    __metadata("design:type", Object)
], RemotesDialog.prototype, "connections", void 0);
RemotesDialog = __decorate([
    vuePropertyDecorator.Component({
        components: {
            RemoteConnectionsList: __vue_component__$O,
            RemoteConnectionDetails: __vue_component__$P
        }
    })
], RemotesDialog);
var script$O = RemotesDialog;

/* script */
const __vue_script__$Q = script$O;

/* template */
var __vue_render__$Q = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "sw-base-dialog",
    {
      ref: "dialog",
      attrs: {
        icon: _vm.icon,
        title: "Edit Remote Connection Settings",
        loaded: _vm.loaded,
        visible: _vm.dialogVisible,
        createLabel: "Ok",
        cancelLabel: "Cancel"
      },
      on: {
        createClicked: _vm.onCreateClicked,
        cancelClicked: _vm.onCancelClicked
      }
    },
    [
      _c(
        "v-card",
        { staticClass: "ma-2", attrs: { flat: "" } },
        [_c("remote-connections-list", { attrs: { remotes: _vm.remotes } })],
        1
      ),
      _vm._v(" "),
      _c("v-divider"),
      _vm._v(" "),
      _c(
        "v-card",
        { staticClass: "ml-2 mr-2 mb-0 mt-4", attrs: { flat: "" } },
        [
          _c("remote-connection-details", {
            ref: "connections",
            staticClass: "pa-1",
            on: { added: _vm.onConnectionAdded }
          })
        ],
        1
      )
    ],
    1
  )
};
var __vue_staticRenderFns__$Q = [];
__vue_render__$Q._withStripped = true;

  /* style */
  const __vue_inject_styles__$Q = undefined;
  /* scoped */
  const __vue_scope_id__$Q = undefined;
  /* module identifier */
  const __vue_module_identifier__$Q = undefined;
  /* functional template */
  const __vue_is_functional_template__$Q = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$Q = normalizeComponent(
    { render: __vue_render__$Q, staticRenderFns: __vue_staticRenderFns__$Q },
    __vue_inject_styles__$Q,
    __vue_script__$Q,
    __vue_scope_id__$Q,
    __vue_is_functional_template__$Q,
    __vue_module_identifier__$Q,
    false,
    undefined,
    undefined,
    undefined
  );

let RemotesDropdown = class RemotesDropdown extends Vue {
    constructor() {
        super(...arguments);
        this.selected = null;
    }
    get connections() {
        return this.remotes ? this.remotes.connections : [];
    }
    onConnectionsUpdated(updated) {
        updated.forEach(connection => {
            if (this.remotes && this.remotes.default) {
                if (this.remotes.default === connection.id) {
                    this.selected = connection;
                }
            }
        });
    }
    onSelectionChanged(updated) {
        this.$emit("selected", updated);
    }
    getNameAndUrl(connection) {
        return `${connection.name} (${connection.protocol}://${connection.host}:${connection.port})`;
    }
};
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Object)
], RemotesDropdown.prototype, "remotes", void 0);
__decorate([
    vuePropertyDecorator.Watch("connections", { immediate: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", void 0)
], RemotesDropdown.prototype, "onConnectionsUpdated", null);
__decorate([
    vuePropertyDecorator.Watch("selected", { immediate: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], RemotesDropdown.prototype, "onSelectionChanged", null);
RemotesDropdown = __decorate([
    vuePropertyDecorator.Component
], RemotesDropdown);
var script$P = RemotesDropdown;

/* script */
const __vue_script__$R = script$P;

/* template */
var __vue_render__$R = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("v-select", {
    attrs: { items: _vm.connections, solo: "" },
    scopedSlots: _vm._u([
      {
        key: "selection",
        fn: function(data) {
          return [
            _c("v-icon", { staticClass: "pr-2", attrs: { small: "" } }, [
              _vm._v("router")
            ]),
            _vm._v("\n    " + _vm._s(_vm.getNameAndUrl(data.item)) + "\n  ")
          ]
        }
      },
      {
        key: "item",
        fn: function(data) {
          return [
            _c("v-icon", { staticClass: "pr-2", attrs: { small: "" } }, [
              _vm._v("router")
            ]),
            _vm._v("\n    " + _vm._s(_vm.getNameAndUrl(data.item)) + "\n  ")
          ]
        }
      }
    ]),
    model: {
      value: _vm.selected,
      callback: function($$v) {
        _vm.selected = $$v;
      },
      expression: "selected"
    }
  })
};
var __vue_staticRenderFns__$R = [];
__vue_render__$R._withStripped = true;

  /* style */
  const __vue_inject_styles__$R = undefined;
  /* scoped */
  const __vue_scope_id__$R = undefined;
  /* module identifier */
  const __vue_module_identifier__$R = undefined;
  /* functional template */
  const __vue_is_functional_template__$R = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$R = normalizeComponent(
    { render: __vue_render__$R, staticRenderFns: __vue_staticRenderFns__$R },
    __vue_inject_styles__$R,
    __vue_script__$R,
    __vue_scope_id__$R,
    __vue_is_functional_template__$R,
    __vue_module_identifier__$R,
    false,
    undefined,
    undefined,
    undefined
  );

let ContentTab = class ContentTab extends Vue {
};
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], ContentTab.prototype, "tabkey", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], ContentTab.prototype, "loadingMessage", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Boolean)
], ContentTab.prototype, "loaded", void 0);
ContentTab = __decorate([
    vuePropertyDecorator.Component({
        components: {
            LoadingOverlay: __vue_component__$j
        }
    })
], ContentTab);
var script$Q = ContentTab;

/* script */
const __vue_script__$S = script$Q;

/* template */
var __vue_render__$S = function() {
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
                  { staticStyle: { height: "100%" } },
                  [
                    !_vm.loaded
                      ? _c("loading-overlay", {
                          attrs: { loadingMessage: _vm.loadingMessage }
                        })
                      : _vm._e()
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
var __vue_staticRenderFns__$S = [];
__vue_render__$S._withStripped = true;

  /* style */
  const __vue_inject_styles__$S = function (inject) {
    if (!inject) return
    inject("data-v-ba3b4054_0", { source: "\n.flex-rows[data-v-ba3b4054] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  height: 100%;\n}\n.tab-header[data-v-ba3b4054] {\r\n  flex: 0;\n}\n.tab-content[data-v-ba3b4054] {\r\n  flex: 1;\r\n  background-color: #fff;\r\n  overflow-y: auto;\n}\n.tab-footer[data-v-ba3b4054] {\r\n  flex: 0;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\navigation\\ContentTab.vue"],"names":[],"mappings":";AAuCA;EACA,aAAA;EACA,sBAAA;EACA,YAAA;AACA;AACA;EACA,OAAA;AACA;AACA;EACA,OAAA;EACA,sBAAA;EACA,gBAAA;AACA;AACA;EACA,OAAA;AACA","file":"ContentTab.vue","sourcesContent":["<template>\r\n  <v-tab-item :key=\"tabkey\">\r\n    <div class=\"flex-rows\">\r\n      <div class=\"tab-header\">\r\n        <slot name=\"header\" />\r\n      </div>\r\n      <div class=\"tab-content\">\r\n        <slot v-if=\"loaded\" />\r\n        <v-card style=\"height: 100%\" v-else>\r\n          <loading-overlay v-if=\"!loaded\" :loadingMessage=\"loadingMessage\" />\r\n        </v-card>\r\n      </div>\r\n      <div class=\"tab-footer\">\r\n        <slot name=\"footer\" />\r\n      </div>\r\n    </div>\r\n    <slot name=\"dialogs\"></slot>\r\n  </v-tab-item>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\nimport { Component, Prop } from \"vue-property-decorator\";\r\n\r\nimport LoadingOverlay from \"../common/LoadingOverlay.vue\";\r\n\r\n@Component({\r\n  components: {\r\n    LoadingOverlay\r\n  }\r\n})\r\nexport default class ContentTab extends Vue {\r\n  @Prop() readonly tabkey!: string;\r\n  @Prop() readonly loadingMessage!: string;\r\n  @Prop() readonly loaded!: boolean;\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.flex-rows {\r\n  display: flex;\r\n  flex-direction: column;\r\n  height: 100%;\r\n}\r\n.tab-header {\r\n  flex: 0;\r\n}\r\n.tab-content {\r\n  flex: 1;\r\n  background-color: #fff;\r\n  overflow-y: auto;\r\n}\r\n.tab-footer {\r\n  flex: 0;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$S = "data-v-ba3b4054";
  /* module identifier */
  const __vue_module_identifier__$S = undefined;
  /* functional template */
  const __vue_is_functional_template__$S = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$S = normalizeComponent(
    { render: __vue_render__$S, staticRenderFns: __vue_staticRenderFns__$S },
    __vue_inject_styles__$S,
    __vue_script__$S,
    __vue_scope_id__$S,
    __vue_is_functional_template__$S,
    __vue_module_identifier__$S,
    false,
    createInjector,
    undefined,
    undefined
  );

let DataEntryPanel = class DataEntryPanel extends Vue {
};
DataEntryPanel = __decorate([
    vuePropertyDecorator.Component({
        components: {}
    })
], DataEntryPanel);
var script$R = DataEntryPanel;

/* script */
const __vue_script__$T = script$R;

/* template */
var __vue_render__$T = function() {
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
var __vue_staticRenderFns__$T = [];
__vue_render__$T._withStripped = true;

  /* style */
  const __vue_inject_styles__$T = function (inject) {
    if (!inject) return
    inject("data-v-2d6ed950_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"DataEntryPanel.vue"}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$T = "data-v-2d6ed950";
  /* module identifier */
  const __vue_module_identifier__$T = undefined;
  /* functional template */
  const __vue_is_functional_template__$T = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$T = normalizeComponent(
    { render: __vue_render__$T, staticRenderFns: __vue_staticRenderFns__$T },
    __vue_inject_styles__$T,
    __vue_script__$T,
    __vue_scope_id__$T,
    __vue_is_functional_template__$T,
    __vue_module_identifier__$T,
    false,
    createInjector,
    undefined,
    undefined
  );

let DataTableTab = class DataTableTab extends Vue {
    /** Get current matches */
    get matches() {
        return this.results ? this.results.results : [];
    }
    /** Dims results when loading */
    get tableStyle() {
        return { opacity: this.loaded ? 1.0 : 0.3 };
    }
    /** Update paging values and run query */
    onPagingUpdated(paging) {
        this.$emit("pagingUpdated", paging);
    }
};
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], DataTableTab.prototype, "tabkey", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Array)
], DataTableTab.prototype, "headers", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Array)
], DataTableTab.prototype, "pageSizes", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], DataTableTab.prototype, "noDataText", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], DataTableTab.prototype, "loadingMessage", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Boolean)
], DataTableTab.prototype, "loaded", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Object)
], DataTableTab.prototype, "results", void 0);
DataTableTab = __decorate([
    vuePropertyDecorator.Component({
        components: {
            Pager: __vue_component__$L,
            LoadingOverlay: __vue_component__$j
        }
    })
], DataTableTab);
var script$S = DataTableTab;

/* script */
const __vue_script__$U = script$S;

/* template */
var __vue_render__$U = function() {
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
var __vue_staticRenderFns__$U = [];
__vue_render__$U._withStripped = true;

  /* style */
  const __vue_inject_styles__$U = function (inject) {
    if (!inject) return
    inject("data-v-2fb3cffb_0", { source: "\n.flex-rows[data-v-2fb3cffb] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  height: 100%;\n}\n.tab-header[data-v-2fb3cffb] {\r\n  flex: 0;\n}\n.tab-content[data-v-2fb3cffb] {\r\n  flex: 1;\r\n  background-color: #eee;\r\n  overflow-y: auto;\n}\n.tab-footer[data-v-2fb3cffb] {\r\n  flex: 0;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\navigation\\DataTableTab.vue"],"names":[],"mappings":";AA0EA;EACA,aAAA;EACA,sBAAA;EACA,YAAA;AACA;AACA;EACA,OAAA;AACA;AACA;EACA,OAAA;EACA,sBAAA;EACA,gBAAA;AACA;AACA;EACA,OAAA;AACA","file":"DataTableTab.vue","sourcesContent":["<template>\r\n  <v-tab-item :key=\"tabkey\">\r\n    <div class=\"flex-rows\">\r\n      <div class=\"tab-header\">\r\n        <slot name=\"header\" />\r\n      </div>\r\n      <div class=\"tab-content\">\r\n        <v-layout row wrap>\r\n          <v-flex xs12>\r\n            <v-data-table\r\n              :headers=\"headers\"\r\n              :items=\"matches\"\r\n              :hide-actions=\"true\"\r\n              :no-data-text=\"noDataText\"\r\n              :style=\"tableStyle\"\r\n            >\r\n              <template v-for=\"(_, slot) of $scopedSlots\" v-slot:[slot]=\"scope\">\r\n                <slot :name=\"slot\" v-bind=\"scope\" />\r\n              </template>\r\n            </v-data-table>\r\n          </v-flex>\r\n        </v-layout>\r\n      </div>\r\n      <div class=\"tab-footer\">\r\n        <pager :results=\"results\" @pagingUpdated=\"onPagingUpdated\" :pageSizes=\"pageSizes\" />\r\n      </div>\r\n    </div>\r\n    <loading-overlay v-if=\"!loaded\" :loadingMessage=\"loadingMessage\" />\r\n    <slot name=\"dialogs\"></slot>\r\n  </v-tab-item>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\nimport { Component, Prop } from \"vue-property-decorator\";\r\n\r\nimport Pager from \"../list/Pager.vue\";\r\nimport LoadingOverlay from \"../common/LoadingOverlay.vue\";\r\n\r\nimport { IPaging, IPageSizes, ITableHeaders } from \"sitewhere-ide-common\";\r\n\r\n@Component({\r\n  components: {\r\n    Pager,\r\n    LoadingOverlay\r\n  }\r\n})\r\nexport default class DataTableTab extends Vue {\r\n  @Prop() readonly tabkey!: string;\r\n  @Prop() readonly headers!: ITableHeaders;\r\n  @Prop() readonly pageSizes!: IPageSizes;\r\n  @Prop() readonly noDataText!: string;\r\n  @Prop() readonly loadingMessage!: string;\r\n  @Prop() readonly loaded!: boolean;\r\n  @Prop() readonly results!: { numResults: number; results: {}[] };\r\n\r\n  /** Get current matches */\r\n  get matches(): {}[] {\r\n    return this.results ? this.results.results : [];\r\n  }\r\n\r\n  /** Dims results when loading */\r\n  get tableStyle(): {} {\r\n    return { opacity: this.loaded ? 1.0 : 0.3 };\r\n  }\r\n\r\n  /** Update paging values and run query */\r\n  onPagingUpdated(paging: IPaging) {\r\n    this.$emit(\"pagingUpdated\", paging);\r\n  }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.flex-rows {\r\n  display: flex;\r\n  flex-direction: column;\r\n  height: 100%;\r\n}\r\n.tab-header {\r\n  flex: 0;\r\n}\r\n.tab-content {\r\n  flex: 1;\r\n  background-color: #eee;\r\n  overflow-y: auto;\r\n}\r\n.tab-footer {\r\n  flex: 0;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$U = "data-v-2fb3cffb";
  /* module identifier */
  const __vue_module_identifier__$U = undefined;
  /* functional template */
  const __vue_is_functional_template__$U = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$U = normalizeComponent(
    { render: __vue_render__$U, staticRenderFns: __vue_staticRenderFns__$U },
    __vue_inject_styles__$U,
    __vue_script__$U,
    __vue_scope_id__$U,
    __vue_is_functional_template__$U,
    __vue_module_identifier__$U,
    false,
    createInjector,
    undefined,
    undefined
  );

let DetailPage = class DetailPage extends Vue {
    constructor() {
        super(...arguments);
        this.active = null;
    }
};
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], DetailPage.prototype, "icon", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], DetailPage.prototype, "title", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], DetailPage.prototype, "loadingMessage", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Boolean)
], DetailPage.prototype, "loaded", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Object)
], DetailPage.prototype, "record", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Boolean)
], DetailPage.prototype, "tabsOnBottom", void 0);
DetailPage = __decorate([
    vuePropertyDecorator.Component({
        components: {
            NavigationPage: __vue_component__$J
        }
    })
], DetailPage);
var script$T = DetailPage;

/* script */
const __vue_script__$V = script$T;

/* template */
var __vue_render__$V = function() {
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
            _vm.tabsOnBottom
              ? _c(
                  "div",
                  { staticClass: "flex-rows" },
                  [
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
                    ),
                    _vm._v(" "),
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
                    )
                  ],
                  1
                )
              : _c(
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
var __vue_staticRenderFns__$V = [];
__vue_render__$V._withStripped = true;

  /* style */
  const __vue_inject_styles__$V = function (inject) {
    if (!inject) return
    inject("data-v-95bb9612_0", { source: "\n.flex-rows[data-v-95bb9612] {\r\n  display: flex;\r\n  flex-direction: column;\r\n  height: 100%;\n}\n.tabs-row[data-v-95bb9612] {\r\n  flex: 0;\n}\n.tab-items-row[data-v-95bb9612] {\r\n  flex: 1;\r\n  overflow-y: auto;\n}\n.tab-items-row[data-v-95bb9612] .v-window__container,\r\n.tab-items-row[data-v-95bb9612] .v-window-item {\r\n  height: 100%;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\navigation\\DetailPage.vue"],"names":[],"mappings":";AAwDA;EACA,aAAA;EACA,sBAAA;EACA,YAAA;AACA;AACA;EACA,OAAA;AACA;AACA;EACA,OAAA;EACA,gBAAA;AACA;AACA;;EAEA,YAAA;AACA","file":"DetailPage.vue","sourcesContent":["<template>\r\n  <navigation-page :icon=\"icon\" :title=\"title\" :loadingMessage=\"loadingMessage\" :loaded=\"loaded\">\r\n    <template slot=\"header\">\r\n      <slot name=\"header\" />\r\n    </template>\r\n    <template v-if=\"record\" slot=\"content\">\r\n      <div v-if=\"tabsOnBottom\" class=\"flex-rows\">\r\n        <v-tabs-items class=\"tab-items-row\" v-model=\"active\">\r\n          <slot name=\"tab-items\" />\r\n        </v-tabs-items>\r\n        <v-tabs class=\"tabs-row\" v-model=\"active\">\r\n          <slot name=\"tabs\" />\r\n        </v-tabs>\r\n      </div>\r\n      <div v-else class=\"flex-rows\">\r\n        <v-tabs class=\"tabs-row\" v-model=\"active\">\r\n          <slot name=\"tabs\" />\r\n        </v-tabs>\r\n        <v-tabs-items class=\"tab-items-row\" v-model=\"active\">\r\n          <slot name=\"tab-items\" />\r\n        </v-tabs-items>\r\n      </div>\r\n    </template>\r\n    <template slot=\"actions\">\r\n      <slot name=\"actions\" />\r\n    </template>\r\n    <template slot=\"dialogs\">\r\n      <slot name=\"dialogs\" />\r\n    </template>\r\n  </navigation-page>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\nimport { Component, Prop } from \"vue-property-decorator\";\r\n\r\nimport NavigationPage from \"../navigation/NavigationPage.vue\";\r\n\r\n@Component({\r\n  components: {\r\n    NavigationPage\r\n  }\r\n})\r\nexport default class DetailPage extends Vue {\r\n  @Prop() readonly icon!: string;\r\n  @Prop() readonly title!: string;\r\n  @Prop() readonly loadingMessage!: string;\r\n  @Prop() readonly loaded!: boolean;\r\n  @Prop() readonly record!: {};\r\n  @Prop() readonly tabsOnBottom!: boolean;\r\n\r\n  active: string | null = null;\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.flex-rows {\r\n  display: flex;\r\n  flex-direction: column;\r\n  height: 100%;\r\n}\r\n.tabs-row {\r\n  flex: 0;\r\n}\r\n.tab-items-row {\r\n  flex: 1;\r\n  overflow-y: auto;\r\n}\r\n.tab-items-row >>> .v-window__container,\r\n.tab-items-row >>> .v-window-item {\r\n  height: 100%;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$V = "data-v-95bb9612";
  /* module identifier */
  const __vue_module_identifier__$V = undefined;
  /* functional template */
  const __vue_is_functional_template__$V = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$V = normalizeComponent(
    { render: __vue_render__$V, staticRenderFns: __vue_staticRenderFns__$V },
    __vue_inject_styles__$V,
    __vue_script__$V,
    __vue_scope_id__$V,
    __vue_is_functional_template__$V,
    __vue_module_identifier__$V,
    false,
    createInjector,
    undefined,
    undefined
  );

let NavigationHeaderLeft = class NavigationHeaderLeft extends Vue {
};
NavigationHeaderLeft = __decorate([
    vuePropertyDecorator.Component({})
], NavigationHeaderLeft);
var script$U = NavigationHeaderLeft;

/* script */
const __vue_script__$W = script$U;

/* template */
var __vue_render__$W = function() {
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
var __vue_staticRenderFns__$W = [];
__vue_render__$W._withStripped = true;

  /* style */
  const __vue_inject_styles__$W = function (inject) {
    if (!inject) return
    inject("data-v-8ca34a28_0", { source: "\n.right-overlay[data-v-8ca34a28] {\r\n  position: absolute;\r\n  right: 0;\r\n  top: 0;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\navigation\\NavigationHeaderLeft.vue"],"names":[],"mappings":";AAkBA;EACA,kBAAA;EACA,QAAA;EACA,MAAA;AACA","file":"NavigationHeaderLeft.vue","sourcesContent":["<template>\r\n  <v-card flat style=\"position: relative; height: 100%\">\r\n    <slot />\r\n    <div class=\"right-overlay\">\r\n      <slot name=\"right-overlay\" />\r\n    </div>\r\n  </v-card>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\nimport { Component, Prop } from \"vue-property-decorator\";\r\n\r\n@Component({})\r\nexport default class NavigationHeaderLeft extends Vue {}\r\n</script>\r\n\r\n<style scoped>\r\n.right-overlay {\r\n  position: absolute;\r\n  right: 0;\r\n  top: 0;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$W = "data-v-8ca34a28";
  /* module identifier */
  const __vue_module_identifier__$W = undefined;
  /* functional template */
  const __vue_is_functional_template__$W = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$W = normalizeComponent(
    { render: __vue_render__$W, staticRenderFns: __vue_staticRenderFns__$W },
    __vue_inject_styles__$W,
    __vue_script__$W,
    __vue_scope_id__$W,
    __vue_is_functional_template__$W,
    __vue_module_identifier__$W,
    false,
    createInjector,
    undefined,
    undefined
  );

let HeaderBrandingPanel = class HeaderBrandingPanel extends Vue {
    /** Accessor for image URL */
    get imageUrl() {
        return this.entity ? this.entity.imageUrl : null;
    }
    /** Accessor for icon */
    get icon() {
        return this.entity ? this.entity.icon : null;
    }
    // Compute style of image.
    get imageStyle() {
        return {
            "background-color": "#fff",
            "background-image": "url(" + this.entity.imageUrl + ")",
            "background-size": "contain",
            "background-repeat": "no-repeat",
            "background-position": "50% 50%"
        };
    }
};
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Object)
], HeaderBrandingPanel.prototype, "entity", void 0);
HeaderBrandingPanel = __decorate([
    vuePropertyDecorator.Component({
        components: {
            NavigationHeaderLeft: __vue_component__$W,
            ImageZoomOnHover: __vue_component__$h
        }
    })
], HeaderBrandingPanel);
var script$V = HeaderBrandingPanel;

/* script */
const __vue_script__$X = script$V;

/* template */
var __vue_render__$X = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "navigation-header-left",
    [
      _vm.imageUrl
        ? _c("image-zoom-on-hover", { attrs: { imageUrl: _vm.imageUrl } })
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
        : _vm._e()
    ],
    1
  )
};
var __vue_staticRenderFns__$X = [];
__vue_render__$X._withStripped = true;

  /* style */
  const __vue_inject_styles__$X = function (inject) {
    if (!inject) return
    inject("data-v-24f7d9f1_0", { source: "\n.header-image[data-v-24f7d9f1] {\r\n  position: absolute;\r\n  top: 0px;\r\n  left: 0px;\r\n  bottom: 0px;\r\n  right: 0px;\n}\n.header-icon[data-v-24f7d9f1] {\r\n  position: absolute;\r\n  top: 0px;\r\n  left: 0px;\r\n  bottom: 0px;\r\n  right: 0px;\r\n  padding: 50px;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\navigation\\HeaderBrandingPanel.vue"],"names":[],"mappings":";AAmDA;EACA,kBAAA;EACA,QAAA;EACA,SAAA;EACA,WAAA;EACA,UAAA;AACA;AAEA;EACA,kBAAA;EACA,QAAA;EACA,SAAA;EACA,WAAA;EACA,UAAA;EACA,aAAA;AACA","file":"HeaderBrandingPanel.vue","sourcesContent":["<template>\r\n  <navigation-header-left>\r\n    <image-zoom-on-hover v-if=\"imageUrl\" :imageUrl=\"imageUrl\" />\r\n    <span v-else-if=\"icon\" class=\"header-icon\">\r\n      <font-awesome-icon class=\"grey--text\" :icon=\"icon\" size=\"7x\" />\r\n    </span>\r\n  </navigation-header-left>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\nimport { Component, Prop } from \"vue-property-decorator\";\r\n\r\nimport NavigationHeaderLeft from \"./NavigationHeaderLeft.vue\";\r\nimport ImageZoomOnHover from \"../common/ImageZoomOnHover.vue\";\r\n\r\nimport { IBrandedEntity } from \"sitewhere-rest-api\";\r\n\r\n@Component({\r\n  components: {\r\n    NavigationHeaderLeft,\r\n    ImageZoomOnHover\r\n  }\r\n})\r\nexport default class HeaderBrandingPanel extends Vue {\r\n  @Prop() readonly entity!: IBrandedEntity;\r\n\r\n  /** Accessor for image URL */\r\n  get imageUrl() {\r\n    return this.entity ? this.entity.imageUrl : null;\r\n  }\r\n\r\n  /** Accessor for icon */\r\n  get icon() {\r\n    return this.entity ? this.entity.icon : null;\r\n  }\r\n\r\n  // Compute style of image.\r\n  get imageStyle() {\r\n    return {\r\n      \"background-color\": \"#fff\",\r\n      \"background-image\": \"url(\" + this.entity.imageUrl + \")\",\r\n      \"background-size\": \"contain\",\r\n      \"background-repeat\": \"no-repeat\",\r\n      \"background-position\": \"50% 50%\"\r\n    };\r\n  }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.header-image {\r\n  position: absolute;\r\n  top: 0px;\r\n  left: 0px;\r\n  bottom: 0px;\r\n  right: 0px;\r\n}\r\n\r\n.header-icon {\r\n  position: absolute;\r\n  top: 0px;\r\n  left: 0px;\r\n  bottom: 0px;\r\n  right: 0px;\r\n  padding: 50px;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$X = "data-v-24f7d9f1";
  /* module identifier */
  const __vue_module_identifier__$X = undefined;
  /* functional template */
  const __vue_is_functional_template__$X = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$X = normalizeComponent(
    { render: __vue_render__$X, staticRenderFns: __vue_staticRenderFns__$X },
    __vue_inject_styles__$X,
    __vue_script__$X,
    __vue_scope_id__$X,
    __vue_is_functional_template__$X,
    __vue_module_identifier__$X,
    false,
    createInjector,
    undefined,
    undefined
  );

let InAppFooter = class InAppFooter extends Vue {
};
InAppFooter = __decorate([
    vuePropertyDecorator.Component({})
], InAppFooter);
var script$W = InAppFooter;

/* script */
const __vue_script__$Y = script$W;

/* template */
var __vue_render__$Y = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("v-footer", { attrs: { app: "" } }, [
    _c("div", { staticClass: "footer-content" }, [_vm._t("default")], 2)
  ])
};
var __vue_staticRenderFns__$Y = [];
__vue_render__$Y._withStripped = true;

  /* style */
  const __vue_inject_styles__$Y = function (inject) {
    if (!inject) return
    inject("data-v-8835994c_0", { source: "\n.footer-content[data-v-8835994c] {\r\n  border-top: 1px solid #ddd;\r\n  width: 100%;\r\n  height: 100%;\r\n  color: #666;\r\n  padding: 7px;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\navigation\\InAppFooter.vue"],"names":[],"mappings":";AAiBA;EACA,0BAAA;EACA,WAAA;EACA,YAAA;EACA,WAAA;EACA,YAAA;AACA","file":"InAppFooter.vue","sourcesContent":["<template>\r\n  <v-footer app>\r\n    <div class=\"footer-content\">\r\n      <slot />\r\n    </div>\r\n  </v-footer>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\nimport { Component } from \"vue-property-decorator\";\r\n\r\n@Component({})\r\nexport default class InAppFooter extends Vue {}\r\n</script>\r\n\r\n<style scoped>\r\n.footer-content {\r\n  border-top: 1px solid #ddd;\r\n  width: 100%;\r\n  height: 100%;\r\n  color: #666;\r\n  padding: 7px;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$Y = "data-v-8835994c";
  /* module identifier */
  const __vue_module_identifier__$Y = undefined;
  /* functional template */
  const __vue_is_functional_template__$Y = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$Y = normalizeComponent(
    { render: __vue_render__$Y, staticRenderFns: __vue_staticRenderFns__$Y },
    __vue_inject_styles__$Y,
    __vue_script__$Y,
    __vue_scope_id__$Y,
    __vue_is_functional_template__$Y,
    __vue_module_identifier__$Y,
    false,
    createInjector,
    undefined,
    undefined
  );

let InAppSystemBar = class InAppSystemBar extends Vue {
    constructor() {
        super(...arguments);
        this.title = Electron.remote.getCurrentWindow().getTitle();
    }
    openWebTools() {
        Electron.remote.getCurrentWebContents().openDevTools();
    }
    minWindow() {
        Electron.remote.getCurrentWindow().minimize();
    }
    maxWindow() {
        Electron.remote.getCurrentWindow().maximize();
    }
    closeWindow() {
        Electron.remote.getCurrentWindow().close();
        Electron.app.quit();
    }
};
InAppSystemBar = __decorate([
    vuePropertyDecorator.Component({})
], InAppSystemBar);
var script$X = InAppSystemBar;

/* script */
const __vue_script__$Z = script$X;

/* template */
var __vue_render__$Z = function() {
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
var __vue_staticRenderFns__$Z = [];
__vue_render__$Z._withStripped = true;

  /* style */
  const __vue_inject_styles__$Z = function (inject) {
    if (!inject) return
    inject("data-v-5eb1d823_0", { source: "\n.title-bar-button[data-v-5eb1d823] {\r\n  -webkit-app-region: no-drag;\n}\n.system-bar-title[data-v-5eb1d823] {\r\n  color: #eee;\r\n  margin-left: 10px;\r\n  margin-right: 10px;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\navigation\\InAppSystemBar.vue"],"names":[],"mappings":";AAiDA;EACA,2BAAA;AACA;AACA;EACA,WAAA;EACA,iBAAA;EACA,kBAAA;AACA","file":"InAppSystemBar.vue","sourcesContent":["<template>\r\n  <v-system-bar color=\"#444\" class=\"title-bar\">\r\n    <v-btn flat icon small class=\"ma-0 title-bar-button\" @click=\"openWebTools\">\r\n      <v-icon color=\"white\">menu</v-icon>\r\n    </v-btn>\r\n    <span class=\"system-bar-title\">{{ title }}</span>\r\n    <v-spacer></v-spacer>\r\n    <v-btn flat icon small class=\"ma-0 title-bar-button\" @click=\"minWindow\">\r\n      <v-icon color=\"white\">remove</v-icon>\r\n    </v-btn>\r\n    <v-btn flat icon small class=\"ma-0 title-bar-button\" @click=\"maxWindow\">\r\n      <v-icon color=\"white\">check_box_outline_blank</v-icon>\r\n    </v-btn>\r\n    <v-btn flat icon small class=\"ma-0 title-bar-button\" @click=\"closeWindow\">\r\n      <v-icon color=\"white\">close</v-icon>\r\n    </v-btn>\r\n  </v-system-bar>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\nimport { Component } from \"vue-property-decorator\";\r\n\r\nimport Electron from \"electron\";\r\n\r\n@Component({})\r\nexport default class InAppSystemBar extends Vue {\r\n  title: string = Electron.remote.getCurrentWindow().getTitle();\r\n\r\n  openWebTools() {\r\n    Electron.remote.getCurrentWebContents().openDevTools();\r\n  }\r\n\r\n  minWindow() {\r\n    Electron.remote.getCurrentWindow().minimize();\r\n  }\r\n\r\n  maxWindow() {\r\n    Electron.remote.getCurrentWindow().maximize();\r\n  }\r\n\r\n  closeWindow() {\r\n    Electron.remote.getCurrentWindow().close();\r\n    Electron.app.quit();\r\n  }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.title-bar-button {\r\n  -webkit-app-region: no-drag;\r\n}\r\n.system-bar-title {\r\n  color: #eee;\r\n  margin-left: 10px;\r\n  margin-right: 10px;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$Z = "data-v-5eb1d823";
  /* module identifier */
  const __vue_module_identifier__$Z = undefined;
  /* functional template */
  const __vue_is_functional_template__$Z = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$Z = normalizeComponent(
    { render: __vue_render__$Z, staticRenderFns: __vue_staticRenderFns__$Z },
    __vue_inject_styles__$Z,
    __vue_script__$Z,
    __vue_scope_id__$Z,
    __vue_is_functional_template__$Z,
    __vue_module_identifier__$Z,
    false,
    createInjector,
    undefined,
    undefined
  );

let Navigation = class Navigation extends Vue {
    /** Called when a section is clicked */
    onSectionClicked(section) {
        this.$emit("sectionSelected", section);
    }
};
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", Array)
], Navigation.prototype, "sections", void 0);
Navigation = __decorate([
    vuePropertyDecorator.Component({})
], Navigation);
var script$Y = Navigation;

/* script */
const __vue_script__$_ = script$Y;

/* template */
var __vue_render__$_ = function() {
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
var __vue_staticRenderFns__$_ = [];
__vue_render__$_._withStripped = true;

  /* style */
  const __vue_inject_styles__$_ = function (inject) {
    if (!inject) return
    inject("data-v-cc688ed6_0", { source: "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", map: {"version":3,"sources":[],"names":[],"mappings":"","file":"Navigation.vue"}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$_ = "data-v-cc688ed6";
  /* module identifier */
  const __vue_module_identifier__$_ = undefined;
  /* functional template */
  const __vue_is_functional_template__$_ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$_ = normalizeComponent(
    { render: __vue_render__$_, staticRenderFns: __vue_staticRenderFns__$_ },
    __vue_inject_styles__$_,
    __vue_script__$_,
    __vue_scope_id__$_,
    __vue_is_functional_template__$_,
    __vue_module_identifier__$_,
    false,
    createInjector,
    undefined,
    undefined
  );

let NavigationActionButton = class NavigationActionButton extends Vue {
    onAction() {
        this.$emit("action");
    }
};
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], NavigationActionButton.prototype, "icon", void 0);
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], NavigationActionButton.prototype, "tooltip", void 0);
__decorate([
    vuePropertyDecorator.Prop({ default: false }),
    __metadata("design:type", Boolean)
], NavigationActionButton.prototype, "material", void 0);
NavigationActionButton = __decorate([
    vuePropertyDecorator.Component({})
], NavigationActionButton);
var script$Z = NavigationActionButton;

/* script */
const __vue_script__$$ = script$Z;

/* template */
var __vue_render__$$ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-tooltip",
    { attrs: { left: "" } },
    [
      _c(
        "v-icon",
        {
          staticClass: "ma-0 ml-1 navbutton",
          attrs: { slot: "activator" },
          on: { click: _vm.onAction },
          slot: "activator"
        },
        [_vm._v("\n    " + _vm._s(_vm.icon) + "\n  ")]
      ),
      _vm._v(" "),
      _c("span", [_vm._v(_vm._s(_vm.tooltip))])
    ],
    1
  )
};
var __vue_staticRenderFns__$$ = [];
__vue_render__$$._withStripped = true;

  /* style */
  const __vue_inject_styles__$$ = function (inject) {
    if (!inject) return
    inject("data-v-0b3cae2e_0", { source: "\n.navbutton[data-v-0b3cae2e] {\r\n  font-size: 16px;\r\n  padding-left: 8px;\r\n  color: #666;\r\n  vertical-align: middle;\n}\n.navbutton[data-v-0b3cae2e]:hover {\r\n  color: #999;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\navigation\\NavigationActionButton.vue"],"names":[],"mappings":";AA4BA;EACA,eAAA;EACA,iBAAA;EACA,WAAA;EACA,sBAAA;AACA;AACA;EACA,WAAA;AACA","file":"NavigationActionButton.vue","sourcesContent":["<template>\r\n  <v-tooltip left>\r\n    <v-icon class=\"ma-0 ml-1 navbutton\" @click=\"onAction\" slot=\"activator\">\r\n      {{\r\n      icon\r\n      }}\r\n    </v-icon>\r\n    <span>{{ tooltip }}</span>\r\n  </v-tooltip>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\nimport { Component, Prop } from \"vue-property-decorator\";\r\n\r\n@Component({})\r\nexport default class NavigationActionButton extends Vue {\r\n  @Prop() readonly icon!: string;\r\n  @Prop() readonly tooltip!: string;\r\n  @Prop({ default: false }) readonly material!: boolean;\r\n\r\n  onAction() {\r\n    this.$emit(\"action\");\r\n  }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.navbutton {\r\n  font-size: 16px;\r\n  padding-left: 8px;\r\n  color: #666;\r\n  vertical-align: middle;\r\n}\r\n.navbutton:hover {\r\n  color: #999;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$$ = "data-v-0b3cae2e";
  /* module identifier */
  const __vue_module_identifier__$$ = undefined;
  /* functional template */
  const __vue_is_functional_template__$$ = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$$ = normalizeComponent(
    { render: __vue_render__$$, staticRenderFns: __vue_staticRenderFns__$$ },
    __vue_inject_styles__$$,
    __vue_script__$$,
    __vue_scope_id__$$,
    __vue_is_functional_template__$$,
    __vue_module_identifier__$$,
    false,
    createInjector,
    undefined,
    undefined
  );

let NavigationHeaderFields = class NavigationHeaderFields extends Vue {
};
NavigationHeaderFields = __decorate([
    vuePropertyDecorator.Component({})
], NavigationHeaderFields);
var script$_ = NavigationHeaderFields;

/* script */
const __vue_script__$10 = script$_;

/* template */
var __vue_render__$10 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "v-card",
    { staticClass: "mt-2", attrs: { flat: "" } },
    [_vm._t("default")],
    2
  )
};
var __vue_staticRenderFns__$10 = [];
__vue_render__$10._withStripped = true;

  /* style */
  const __vue_inject_styles__$10 = undefined;
  /* scoped */
  const __vue_scope_id__$10 = undefined;
  /* module identifier */
  const __vue_module_identifier__$10 = undefined;
  /* functional template */
  const __vue_is_functional_template__$10 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$10 = normalizeComponent(
    { render: __vue_render__$10, staticRenderFns: __vue_staticRenderFns__$10 },
    __vue_inject_styles__$10,
    __vue_script__$10,
    __vue_scope_id__$10,
    __vue_is_functional_template__$10,
    __vue_module_identifier__$10,
    false,
    undefined,
    undefined,
    undefined
  );

let NavigationHeaderPanel = class NavigationHeaderPanel extends Vue {
    // Style for top-level panel.
    get panelStyle() {
        return {
            "min-height": this.height
        };
    }
};
__decorate([
    vuePropertyDecorator.Prop(),
    __metadata("design:type", String)
], NavigationHeaderPanel.prototype, "height", void 0);
NavigationHeaderPanel = __decorate([
    vuePropertyDecorator.Component({})
], NavigationHeaderPanel);
var script$$ = NavigationHeaderPanel;

/* script */
const __vue_script__$11 = script$$;

/* template */
var __vue_render__$11 = function() {
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
var __vue_staticRenderFns__$11 = [];
__vue_render__$11._withStripped = true;

  /* style */
  const __vue_inject_styles__$11 = function (inject) {
    if (!inject) return
    inject("data-v-d788bf2c_0", { source: "\n.header-panel[data-v-d788bf2c] {\r\n  min-width: 920px;\r\n  overflow-y: hidden;\n}\n.header-left[data-v-d788bf2c] {\r\n  position: absolute;\r\n  top: 10px;\r\n  left: 10px;\r\n  bottom: 10px;\r\n  width: 230px;\r\n  height: 100%;\n}\n.header-right[data-v-d788bf2c] {\r\n  position: absolute;\r\n  top: 10px;\r\n  right: 10px;\r\n  bottom: 10px;\r\n  width: 230px;\r\n  height: 100%;\n}\n.header-content[data-v-d788bf2c] {\r\n  position: absolute;\r\n  top: 10px;\r\n  left: 250px;\r\n  right: 250px;\r\n  height: 100%;\n}\n.options-menu[data-v-d788bf2c] {\r\n  position: absolute;\r\n  top: 10px;\r\n  right: 190px;\n}\r\n", map: {"version":3,"sources":["C:\\Users\\Derek\\Documents\\GitHub\\sitewhere-ide-components\\src\\components\\navigation\\NavigationHeaderPanel.vue"],"names":[],"mappings":";AAqCA;EACA,gBAAA;EACA,kBAAA;AACA;AAEA;EACA,kBAAA;EACA,SAAA;EACA,UAAA;EACA,YAAA;EACA,YAAA;EACA,YAAA;AACA;AAEA;EACA,kBAAA;EACA,SAAA;EACA,WAAA;EACA,YAAA;EACA,YAAA;EACA,YAAA;AACA;AAEA;EACA,kBAAA;EACA,SAAA;EACA,WAAA;EACA,YAAA;EACA,YAAA;AACA;AAEA;EACA,kBAAA;EACA,SAAA;EACA,YAAA;AACA","file":"NavigationHeaderPanel.vue","sourcesContent":["<template>\r\n  <v-card flat :style=\"panelStyle\" class=\"white mt-2 mb-3 pr-3 pl-3 header-panel\">\r\n    <v-card-text>\r\n      <span class=\"header-left\">\r\n        <slot name=\"left\" />\r\n      </span>\r\n      <span class=\"header-content\">\r\n        <slot name=\"content\" />\r\n      </span>\r\n      <span class=\"header-right\">\r\n        <slot name=\"right\" />\r\n      </span>\r\n      <span class=\"options-menu\">\r\n        <slot name=\"options\" />\r\n      </span>\r\n    </v-card-text>\r\n  </v-card>\r\n</template>\r\n\r\n<script lang=\"ts\">\r\nimport Vue from \"vue\";\r\nimport { Component, Prop } from \"vue-property-decorator\";\r\n\r\n@Component({})\r\nexport default class NavigationHeaderPanel extends Vue {\r\n  @Prop() readonly height!: string;\r\n\r\n  // Style for top-level panel.\r\n  get panelStyle() {\r\n    return {\r\n      \"min-height\": this.height\r\n    };\r\n  }\r\n}\r\n</script>\r\n\r\n<style scoped>\r\n.header-panel {\r\n  min-width: 920px;\r\n  overflow-y: hidden;\r\n}\r\n\r\n.header-left {\r\n  position: absolute;\r\n  top: 10px;\r\n  left: 10px;\r\n  bottom: 10px;\r\n  width: 230px;\r\n  height: 100%;\r\n}\r\n\r\n.header-right {\r\n  position: absolute;\r\n  top: 10px;\r\n  right: 10px;\r\n  bottom: 10px;\r\n  width: 230px;\r\n  height: 100%;\r\n}\r\n\r\n.header-content {\r\n  position: absolute;\r\n  top: 10px;\r\n  left: 250px;\r\n  right: 250px;\r\n  height: 100%;\r\n}\r\n\r\n.options-menu {\r\n  position: absolute;\r\n  top: 10px;\r\n  right: 190px;\r\n}\r\n</style>\r\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$11 = "data-v-d788bf2c";
  /* module identifier */
  const __vue_module_identifier__$11 = undefined;
  /* functional template */
  const __vue_is_functional_template__$11 = false;
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$11 = normalizeComponent(
    { render: __vue_render__$11, staticRenderFns: __vue_staticRenderFns__$11 },
    __vue_inject_styles__$11,
    __vue_script__$11,
    __vue_scope_id__$11,
    __vue_is_functional_template__$11,
    __vue_module_identifier__$11,
    false,
    createInjector,
    undefined,
    undefined
  );

/** Process as Vue plugin */
function SiteWhereIdeComponents(Vue) {
  Vue.use(SiteWhereIdeCommon__default);

  // Register common components.
  Vue.component("sw-clipboard-copy-field", __vue_component__$8);
  Vue.component("sw-color-input-field", __vue_component__$9);
  Vue.component("sw-color-picker", __vue_component__$a);
  Vue.component("sw-condensed-toolbar", __vue_component__$b);
  Vue.component("sw-date-time-picker", __vue_component__$c);
  Vue.component("sw-error-banner", __vue_component__$d);
  Vue.component("sw-fab", __vue_component__$e);
  Vue.component("sw-header-field", __vue_component__$f);
  Vue.component("sw-icon-selector", __vue_component__$g);
  Vue.component("sw-image-zoom-on-hover", __vue_component__$h);
  Vue.component("sw-linked-header-field", __vue_component__$i);
  Vue.component("sw-loading-overlay", __vue_component__$j);

  // Register configuration components.
  Vue.component("sw-content-delete-icon", __vue_component__$k);
  Vue.component("sw-content-field", __vue_component__$l);
  Vue.component("sw-content-link", __vue_component__$m);
  Vue.component("sw-content-section", __vue_component__$o);
  Vue.component("sw-content-warning", __vue_component__$p);
  Vue.component("sw-datatable-link", __vue_component__$q);
  Vue.component("sw-datatable-section", __vue_component__$r);
  Vue.component("sw-new-element-chooser", __vue_component__$t);
  Vue.component("sw-new-element-entry", __vue_component__$u);
  Vue.component("sw-page-header", __vue_component__$v);

  // Register common form components.
  Vue.component("sw-dialog-form", __vue_component__$w);
  Vue.component("sw-form-date-time-picker", __vue_component__$x);
  Vue.component("sw-form-select", __vue_component__$y);
  Vue.component("sw-form-select-condensed", __vue_component__$z);
  Vue.component("sw-form-text", __vue_component__$A);
  Vue.component("sw-form-text-area", __vue_component__$B);
  Vue.component("sw-script-chooser", __vue_component__$C);

  // Register dialog components.
  Vue.component("sw-base-dialog", __vue_component__$s);
  Vue.component("sw-confirm-dialog", __vue_component__$D);
  Vue.component("sw-delete-dialog", __vue_component__$E);
  Vue.component("sw-dialog-header", __vue_component__$F);
  Vue.component("sw-metadata-panel", __vue_component__$G);

  // Register list components.
  Vue.component("sw-list-entry", __vue_component__$H);
  Vue.component("sw-list-layout", __vue_component__$I);
  Vue.component("sw-list-page", __vue_component__$M);
  Vue.component("sw-list-tab", __vue_component__$N);
  Vue.component("sw-pager", __vue_component__$L);

  // Register login components.
  Vue.component("sw-remotes-dialog", __vue_component__$Q);
  Vue.component("sw-remotes-dropdown", __vue_component__$R);

  // Register navigation components.
  Vue.component("sw-content-tab", __vue_component__$S);
  Vue.component("sw-data-entry-panel", __vue_component__$T);
  Vue.component("sw-data-table-tab", __vue_component__$U);
  Vue.component("sw-detail-page", __vue_component__$V);
  Vue.component("sw-header-branding-panel", __vue_component__$X);
  Vue.component("sw-in-app-footer", __vue_component__$Y);
  Vue.component("sw-in-app-system-bar", __vue_component__$Z);
  Vue.component("sw-navigation", __vue_component__$_);
  Vue.component("sw-navigation-action-button", __vue_component__$$);
  Vue.component("sw-navigation-header-fields", __vue_component__$10);
  Vue.component("sw-navigation-header-left", __vue_component__$W);
  Vue.component("sw-navigation-header-panel", __vue_component__$11);
  Vue.component("sw-navigation-page", __vue_component__$J);
}

exports.BaseDialog = __vue_component__$s;
exports.ClipboardCopyField = __vue_component__$8;
exports.ColorInputField = __vue_component__$9;
exports.ColorPicker = __vue_component__$a;
exports.CondensedToolbar = __vue_component__$b;
exports.ConfirmDialog = __vue_component__$D;
exports.ContentDeleteIcon = __vue_component__$k;
exports.ContentField = __vue_component__$l;
exports.ContentLink = __vue_component__$m;
exports.ContentSection = __vue_component__$o;
exports.ContentTab = __vue_component__$S;
exports.ContentWarning = __vue_component__$p;
exports.CreateDialogComponent = __vue_component__;
exports.DataEntryPanel = __vue_component__$T;
exports.DataTableTab = __vue_component__$U;
exports.DatatableLink = __vue_component__$q;
exports.DatatableSection = __vue_component__$r;
exports.DateTimePicker = __vue_component__$c;
exports.DeleteDialog = __vue_component__$E;
exports.DeleteDialogComponent = __vue_component__$1;
exports.DetailComponent = __vue_component__$2;
exports.DetailPage = __vue_component__$V;
exports.DialogComponent = __vue_component__$3;
exports.DialogForm = __vue_component__$w;
exports.DialogHeader = __vue_component__$F;
exports.DialogSection = __vue_component__$4;
exports.EditDialogComponent = __vue_component__$5;
exports.ErrorBanner = __vue_component__$d;
exports.FloatingActionButton = __vue_component__$e;
exports.FormDateTimePicker = __vue_component__$x;
exports.FormSelect = __vue_component__$y;
exports.FormSelectCondensed = __vue_component__$z;
exports.FormText = __vue_component__$A;
exports.FormTextArea = __vue_component__$B;
exports.HeaderBrandingPanel = __vue_component__$X;
exports.HeaderComponent = __vue_component__$6;
exports.HeaderField = __vue_component__$f;
exports.IconSelector = __vue_component__$g;
exports.ImageZoomOnHover = __vue_component__$h;
exports.InAppFooter = __vue_component__$Y;
exports.InAppSystemBar = __vue_component__$Z;
exports.LinkedHeaderField = __vue_component__$i;
exports.ListComponent = __vue_component__$7;
exports.ListEntry = __vue_component__$H;
exports.ListLayout = __vue_component__$I;
exports.ListPage = __vue_component__$M;
exports.ListTab = __vue_component__$N;
exports.LoadingOverlay = __vue_component__$j;
exports.MetadataPanel = __vue_component__$G;
exports.Navigation = __vue_component__$_;
exports.NavigationActionButton = __vue_component__$$;
exports.NavigationHeaderFields = __vue_component__$10;
exports.NavigationHeaderLeft = __vue_component__$W;
exports.NavigationHeaderPanel = __vue_component__$11;
exports.NavigationPage = __vue_component__$J;
exports.NewElementChooser = __vue_component__$t;
exports.NewElementEntry = __vue_component__$u;
exports.PageHeader = __vue_component__$v;
exports.Pager = __vue_component__$L;
exports.RemotesDialog = __vue_component__$Q;
exports.RemotesDropdown = __vue_component__$R;
exports.ScriptChooser = __vue_component__$C;
exports.default = SiteWhereIdeComponents;
