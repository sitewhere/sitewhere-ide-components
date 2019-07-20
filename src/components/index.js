// Common components.
import ClipboardCopyField from "./common/ClipboardCopyField.vue";
import ColorInputField from "./common/ColorInputField.vue";
import ColorPicker from "./common/ColorPicker.vue";
import DateTimePicker from "./common/DateTimePicker.vue";
import ErrorBanner from "./common/ErrorBanner.vue";
import FloatingActionButton from "./common/FloatingActionButton.vue";
import HeaderField from "./common/HeaderField.vue";
import IconSelector from "./common/IconSelector.vue";
import ImageZoomOnHover from "./common/ImageZoomOnHover.vue";
import LinkedHeaderField from "./common/LinkedHeaderField.vue";
import LoadingOverlay from "./common/LoadingOverlay.vue";

// Dialog components.
import BaseDialog from "./dialog/BaseDialog.vue";
import ConfirmDialog from "./dialog/ConfirmDialog.vue";
import DeleteDialog from "./dialog/DeleteDialog.vue";
import MetadataPanel from "./dialog/MetadataPanel.vue";

// List components.
import ListEntry from "./list/ListEntry.vue";
import ListLayout from "./list/ListLayout.vue";
import ListPage from "./list/ListPage.vue";
import ListTab from "./list/ListTab.vue";
import Pager from "./list/Pager.vue";

// Navigation components.
import ContentTab from "./navigation/ContentTab.vue";
import DataEntryPanel from "./navigation/DataEntryPanel.vue";
import DataTableTab from "./navigation/DataTableTab.vue";
import DetailPage from "./navigation/DetailPage.vue";
import HeaderBrandingPanel from "./navigation/HeaderBrandingPanel.vue";
import InAppFooter from "./navigation/InAppFooter.vue";
import InAppSystemBar from "./navigation/InAppSystemBar.vue";
import Navigation from "./navigation/Navigation.vue";
import NavigationActionButton from "./navigation/NavigationActionButton.vue";
import NavigationHeaderLeft from "./navigation/NavigationHeaderLeft.vue";
import NavigationHeaderPanel from "./navigation/NavigationHeaderPanel.vue";
import NavigationPage from "./navigation/NavigationPage.vue";

// Process as Vue plugin.
function SiteWhere(Vue) {
  // Register common components.
  Vue.component("sw-clipboard-copy-field", ClipboardCopyField);
  Vue.component("sw-color-input-field", ColorInputField);
  Vue.component("sw-color-picker", ColorPicker);
  Vue.component("sw-date-time-picker", DateTimePicker);
  Vue.component("sw-error-banner", ErrorBanner);
  Vue.component("sw-fab", FloatingActionButton);
  Vue.component("sw-header-field", HeaderField);
  Vue.component("sw-icon-selector", IconSelector);
  Vue.component("sw-image-zoom-on-hover", ImageZoomOnHover);
  Vue.component("sw-linked-header-field", LinkedHeaderField);
  Vue.component("sw-loading-overlay", LoadingOverlay);

  // Register dialog components.
  Vue.component("sw-base-dialog", BaseDialog);
  Vue.component("sw-confirm-dialog", ConfirmDialog);
  Vue.component("sw-delete-dialog", DeleteDialog);
  Vue.component("sw-metadata-panel", MetadataPanel);

  // Register list components.
  Vue.component("sw-list-entry", ListEntry);
  Vue.component("sw-list-layout", ListLayout);
  Vue.component("sw-list-page", ListPage);
  Vue.component("sw-list-tab", ListTab);
  Vue.component("sw-pager", Pager);

  // Register navigation components.
  Vue.component("sw-content-tab", ContentTab);
  Vue.component("sw-data-entry-panel", DataEntryPanel);
  Vue.component("sw-data-table-tab", DataTableTab);
  Vue.component("sw-detail-page", DetailPage);
  Vue.component("sw-header-branding-panel", HeaderBrandingPanel);
  Vue.component("sw-in-app-footer", InAppFooter);
  Vue.component("sw-in-app-system-bar", InAppSystemBar);
  Vue.component("sw-navigation", Navigation);
  Vue.component("sw-navigation-action-button", NavigationActionButton);
  Vue.component("sw-navigation-header-left", NavigationHeaderLeft);
  Vue.component("sw-navigation-header-panel", NavigationHeaderPanel);
  Vue.component("sw-navigation-page", NavigationPage);
}

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
  ImageZoomOnHover,
  LinkedHeaderField,
  LoadingOverlay
};

// Export dialog components.
export { BaseDialog, ConfirmDialog, DeleteDialog, MetadataPanel };

// Export list components.
export { ListEntry, ListLayout, ListPage, ListTab, Pager };

// Export navigation components.
export {
  ContentTab,
  DataEntryPanel,
  DataTableTab,
  DetailPage,
  HeaderBrandingPanel,
  InAppFooter,
  InAppSystemBar,
  Navigation,
  NavigationActionButton,
  NavigationHeaderLeft,
  NavigationHeaderPanel,
  NavigationPage
};

export default SiteWhere;
