// Common components.
import ClipboardCopyField from "./common/ClipboardCopyField.vue";
import ColorInputField from "./common/ColorInputField.vue";
import ColorPicker from "./common/ColorPicker.vue";
import DateTimePicker from "./common/DateTimePicker.vue";
import ErrorBanner from "./common/ErrorBanner.vue";
import FloatingActionButton from "./common/FloatingActionButton.vue";
import HeaderField from "./common/HeaderField.vue";
import IconSelector from "./common/IconSelector.vue";
import LinkedHeaderField from "./common/LinkedHeaderField.vue";
import LoadingOverlay from "./common/LoadingOverlay.vue";

// List components.
import ListEntry from "./list/ListEntry.vue";
import ListLayout from "./list/ListLayout.vue";
import ListPage from "./list/ListPage.vue";
import ListTab from "./list/ListTab.vue";
import Pager from "./list/Pager.vue";

// Process as Vue plugin.
const SiteWhere = {
  install(Vue, options) {
    // Register common components.
    Vue.component("sw-clipboard-copy-field", ClipboardCopyField);
    Vue.component("sw-color-input-field", ColorInputField);
    Vue.component("sw-color-picker", ColorPicker);
    Vue.component("sw-date-time-picker", DateTimePicker);
    Vue.component("sw-error-banner", ErrorBanner);
    Vue.component("sw-fab", FloatingActionButton);
    Vue.component("sw-header-field", HeaderField);
    Vue.component("sw-icon-selector", IconSelector);
    Vue.component("sw-linked-header-field", LinkedHeaderField);
    Vue.component("sw-loading-overlay", LoadingOverlay);

    // Register list components.
    Vue.component("sw-list-entry", ListEntry);
    Vue.component("sw-list-layout", ListLayout);
    Vue.component("sw-list-page", ListPage);
    Vue.component("sw-list-tab", ListTab);
    Vue.component("sw-pager", Pager);
  }
};

// Export common components.
export {
  ClipboardCopyField,
  ColorInputField,
  ColorPicker,
  DateTimePicker,
  ErrorBanner,
  FloatingActionButton,
  HeaderField,
  IconSelector,
  LinkedHeaderField,
  LoadingOverlay
};

// Export list components.
export { ListEntry, ListLayout, ListPage, ListTab, Pager };

export default SiteWhere;
