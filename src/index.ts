import { VueConstructor } from "vue";

// Common components.
import ClipboardCopyField from "./components/common/ClipboardCopyField.vue";
import ColorInputField from "./components/common/ColorInputField.vue";
import ColorPicker from "./components/common/ColorPicker.vue";
import CondensedToolbar from "./components/common/CondensedToolbar.vue";
import DateTimePicker from "./components/common/DateTimePicker.vue";
import ErrorBanner from "./components/common/ErrorBanner.vue";
import FloatingActionButton from "./components/common/FloatingActionButton.vue";
import HeaderField from "./components/common/HeaderField.vue";
import IconSelector from "./components/common/IconSelector.vue";
import ImageZoomOnHover from "./components/common/ImageZoomOnHover.vue";
import LinkedHeaderField from "./components/common/LinkedHeaderField.vue";
import LoadingOverlay from "./components/common/LoadingOverlay.vue";

// Configuration components.
import ContentDeleteIcon from "./components/configuration/ContentDeleteIcon.vue";
import ContentField from "./components/configuration/ContentField.vue";
import ContentLink from "./components/configuration/ContentLink.vue";
import ContentSection from "./components/configuration/ContentSection.vue";
import ContentWarning from "./components/configuration/ContentWarning.vue";
import DatatableLink from "./components/configuration/DatatableLink.vue";
import DatatableSection from "./components/configuration/DatatableSection.vue";
import NewElementChooser from "./components/configuration/NewElementChooser.vue";
import NewElementEntry from "./components/configuration/NewElementEntry.vue";
import PageHeader from "./components/configuration/PageHeader.vue";

// Form components
import DialogForm from "./components/common/form/DialogForm.vue";
import FormDateTimePicker from "./components/common/form/FormDateTimePicker.vue";
import FormSelect from "./components/common/form/FormSelect.vue";
import FormSelectCondensed from "./components/common/form/FormSelectCondensed.vue";
import FormText from "./components/common/form/FormText.vue";
import FormTextArea from "./components/common/form/FormTextArea.vue";
import ScriptChooser from "./components/common/form/ScriptChooser.vue";

// Dialog components.
import BaseDialog from "./components/dialog/BaseDialog.vue";
import ConfirmDialog from "./components/dialog/ConfirmDialog.vue";
import DeleteDialog from "./components/dialog/DeleteDialog.vue";
import DialogHeader from "./components/dialog/DialogHeader.vue";
import MetadataPanel from "./components/dialog/MetadataPanel.vue";

// List components.
import ListEntry from "./components/list/ListEntry.vue";
import ListLayout from "./components/list/ListLayout.vue";
import ListPage from "./components/list/ListPage.vue";
import ListTab from "./components/list/ListTab.vue";
import Pager from "./components/list/Pager.vue";

// Login components.
import RemotesDialog from "./components/login/RemotesDialog.vue";
import RemotesDropdown from "./components/login/RemotesDropdown.vue";

// Navigation components.
import ContentTab from "./components/navigation/ContentTab.vue";
import DataEntryPanel from "./components/navigation/DataEntryPanel.vue";
import DataTableTab from "./components/navigation/DataTableTab.vue";
import DetailPage from "./components/navigation/DetailPage.vue";
import HeaderBrandingPanel from "./components/navigation/HeaderBrandingPanel.vue";
import InAppFooter from "./components/navigation/InAppFooter.vue";
import InAppSystemBar from "./components/navigation/InAppSystemBar.vue";
import Navigation from "./components/navigation/Navigation.vue";
import NavigationActionButton from "./components/navigation/NavigationActionButton.vue";
import NavigationHeaderFields from "./components/navigation/NavigationHeaderFields.vue";
import NavigationHeaderLeft from "./components/navigation/NavigationHeaderLeft.vue";
import NavigationHeaderPanel from "./components/navigation/NavigationHeaderPanel.vue";
import NavigationPage from "./components/navigation/NavigationPage.vue";

import { CreateDialogComponent } from "./components/core/CreateDialogComponent";
import { DetailComponent } from "./components/core/DetailComponent";
import { DeleteDialogComponent } from "./components/core/DeleteDialogComponent";
import { DialogComponent } from "./components/core/DialogComponent";
import { DialogSection } from "./components/core/DialogSection";
import { EditDialogComponent } from "./components/core/EditDialogComponent";
import { HeaderComponent } from "./components/core/HeaderComponent";
import { ListComponent } from "./components/core/ListComponent";

/* eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-empty-interface */
export interface Options {
}

/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
export function SiteWhereIdeComponents<Options>(Vue: VueConstructor, options: Options): void {
    // Register common components.
    Vue.component("sw-clipboard-copy-field", ClipboardCopyField);
    Vue.component("sw-color-input-field", ColorInputField);
    Vue.component("sw-color-picker", ColorPicker);
    Vue.component("sw-condensed-toolbar", CondensedToolbar);
    Vue.component("sw-date-time-picker", DateTimePicker);
    Vue.component("sw-error-banner", ErrorBanner);
    Vue.component("sw-fab", FloatingActionButton);
    Vue.component("sw-header-field", HeaderField);
    Vue.component("sw-icon-selector", IconSelector);
    Vue.component("sw-image-zoom-on-hover", ImageZoomOnHover);
    Vue.component("sw-linked-header-field", LinkedHeaderField);
    Vue.component("sw-loading-overlay", LoadingOverlay);

    // Register configuration components.
    Vue.component("sw-content-delete-icon", ContentDeleteIcon);
    Vue.component("sw-content-field", ContentField);
    Vue.component("sw-content-link", ContentLink);
    Vue.component("sw-content-section", ContentSection);
    Vue.component("sw-content-warning", ContentWarning);
    Vue.component("sw-datatable-link", DatatableLink);
    Vue.component("sw-datatable-section", DatatableSection);
    Vue.component("sw-new-element-chooser", NewElementChooser);
    Vue.component("sw-new-element-entry", NewElementEntry);
    Vue.component("sw-page-header", PageHeader);

    // Register common form components.
    Vue.component("sw-dialog-form", DialogForm);
    Vue.component("sw-form-date-time-picker", FormDateTimePicker);
    Vue.component("sw-form-select", FormSelect);
    Vue.component("sw-form-select-condensed", FormSelectCondensed);
    Vue.component("sw-form-text", FormText);
    Vue.component("sw-form-text-area", FormTextArea);
    Vue.component("sw-script-chooser", ScriptChooser);

    // Register dialog components.
    Vue.component("sw-base-dialog", BaseDialog);
    Vue.component("sw-confirm-dialog", ConfirmDialog);
    Vue.component("sw-delete-dialog", DeleteDialog);
    Vue.component("sw-dialog-header", DialogHeader);
    Vue.component("sw-metadata-panel", MetadataPanel);

    // Register list components.
    Vue.component("sw-list-entry", ListEntry);
    Vue.component("sw-list-layout", ListLayout);
    Vue.component("sw-list-page", ListPage);
    Vue.component("sw-list-tab", ListTab);
    Vue.component("sw-pager", Pager);

    // Register login components.
    Vue.component("sw-remotes-dialog", RemotesDialog);
    Vue.component("sw-remotes-dropdown", RemotesDropdown);

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
    Vue.component("sw-navigation-header-fields", NavigationHeaderFields);
    Vue.component("sw-navigation-header-left", NavigationHeaderLeft);
    Vue.component("sw-navigation-header-panel", NavigationHeaderPanel);
    Vue.component("sw-navigation-page", NavigationPage);
}

/** Common components */
export {
    ClipboardCopyField,
    ColorInputField,
    ColorPicker,
    CondensedToolbar,
    DateTimePicker,
    ErrorBanner,
    FloatingActionButton,
    HeaderField,
    IconSelector,
    ImageZoomOnHover,
    LinkedHeaderField,
    LoadingOverlay
}

/** Configuration components */
export {
    ContentDeleteIcon,
    ContentField,
    ContentLink,
    ContentSection,
    ContentWarning,
    DatatableLink,
    DatatableSection,
    NewElementChooser,
    NewElementEntry,
    PageHeader
}

/** Form components */
export {
    DialogForm,
    FormDateTimePicker,
    FormSelect,
    FormSelectCondensed,
    FormText,
    FormTextArea,
    ScriptChooser
}

/** Dialog components */
export {
    BaseDialog,
    ConfirmDialog,
    DeleteDialog,
    DialogHeader,
    MetadataPanel
}

/** List components */
export {
    ListEntry,
    ListLayout,
    ListPage,
    ListTab,
    Pager
}

/** Login components */
export {
    RemotesDialog,
    RemotesDropdown
}

/** Navigation components */
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
    NavigationHeaderFields,
    NavigationHeaderLeft,
    NavigationHeaderPanel,
    NavigationPage
}

/** Core components */
export {
    CreateDialogComponent,
    DeleteDialogComponent,
    DetailComponent,
    DialogComponent,
    DialogSection,
    EditDialogComponent,
    HeaderComponent,
    ListComponent
};
