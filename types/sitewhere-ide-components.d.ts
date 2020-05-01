import Vue, { PluginFunction } from "vue";
import { AxiosPromise } from "axios";
import {
    ISearchCriteria,
    IResponseFormat,
    ISearchResults
} from "sitewhere-rest-api";
import { IPaging, ITabbedComponent } from "sitewhere-ide-common";

/**
 * Base component for dialogs used in create operations.
 */
export class CreateDialogComponent<T, R> extends Vue {
    /** Get wrapped dialog */
    getDialog(): DialogComponent<T>;

    /** Open wrapped dialog */
    open(): void;

    /** Load dialog then open it */
    loadAndOpen(payload: T): void;

    /** Implemented in subclasses to save payload */
    save(payload: R): AxiosPromise<T> | T;

    /** Implemented in subclasses for after-save */
    afterSave(payload: T): void;

    /** Handle payload commit */
    commit(payload: R): void;
}

/**
 * Base component for dialogs used in delete operations.
 */
export abstract class DeleteDialogComponent<T> extends Vue {
    record: any | null;
    visible: boolean;
    error: string | null;

    /** Prepare to load dialog */
    prepareLoad(identifier: string): AxiosPromise<T> | T;

    /** Called after record is loaded */
    afterLoad(record: T): void;

    /** Load data then open dialog */
    open(identifier: string): void;

    /** Return method to delete record */
    prepareDelete(record: T): AxiosPromise<T> | T;

    /** Action invoked when delete is clicked */
    delete(): void;

    /** Action invoked when cancel is clicked */
    cancel(): void;

    /** Called to open the dialog */
    closeDialog(): void;

    /** Called to show an error message */
    showError(error: string): void;
}

/**
 * Base class for detail pages.
 */
export abstract class DetailComponent<T> extends Vue {
    token: string | null;
    record: any | null;
    loaded: boolean;

    /** Get parameter for route token */
    getTokenParameter(): string;

    /** Display record with the given token */
    display(token: string): void;

    /** Return promise for loading record */
    loadRecord(token: string | null): AxiosPromise<T>;

    /** Refresh */
    refresh(): void;

    /** Called after record is loaded */
    afterRecordLoaded(record: T): void
}

/**
 * Base class for dialog components.
 */
export abstract class DialogComponent<T> extends Vue {
    dialogVisible: boolean;
    error: string | null;

    /** Reset dialog content */
    reset(): void;

    /** Load dialog from model */
    load(model: T): void;

    /** Called to open the dialog */
    openDialog(): void;

    /** Called to open the dialog */
    closeDialog(): void;

    /** Called to show an error message */
    showError(error: string): void;

    /** Action invoked when create is clicked */
    onCreateClicked(e: any): void;

    /** Action invoked when cancel is clicked */
    onCancelClicked(e: any): void;
}

/**
 * Data section/page in a dialog.
 */
export abstract class DialogSection extends Vue {
    /** Reset section content */
    reset(): void;

    /** Validate fields in the dialog section */
    validate(): boolean;

    /** Load form data from an object */
    load(input: {}): void;

    /** Save form data to an object */
    save(): any
}

/**
 * Base class for dialogs used in edit operations.
 */
export abstract class EditDialogComponent<T, R> extends Vue {
    record: any | null;
    loaded: boolean;

    /** Get wrapped dialog */
    getDialog(): DialogComponent<T>;

    /** Prepare load for the given identifier */
    prepareLoad(identifier: string | null): AxiosPromise<T> | T;

    /** Load record for identifer and open dialog */
    open(identifier: string | null): void;

    /** Implemented in subclasses to save payload */
    prepareSave(original: T, updated: R): AxiosPromise<T> | T;

    /** Handle payload commit */
    save(payload: R): void

    /** Implemented in subclasses for after-save */
    afterSave(payload: T): void;
}

/**
 * Base class for header components.
 */
export abstract class HeaderComponent<T> extends Vue {
    record: T;
}

/**
 * Base class for list components.
 */
export abstract class ListComponent<
    T,
    S extends ISearchCriteria,
    F extends IResponseFormat,
    R extends ISearchResults<T>
    > extends Vue {
    results: R | null;
    paging: IPaging | null;
    matches: T[];
    loaded: boolean;

    /** Update paging values and run query */
    onPagingUpdated(paging: IPaging): void;

    /** Build search criteria for list */
    buildSearchCriteria(): S;

    /** Build response format for list */
    buildResponseFormat(): F;

    /** Return promise for performing search */
    performSearch(criteria: S, format: F): AxiosPromise<R>;

    /** Refresh list contents */
    refresh(): void;
}

// Common components.
export const ClipboardCopyField: any;
export const ColorInputField: any;
export const ColorPicker: any;
export const DateTimePicker: any;
export const ErrorBanner: any;
export const FloatingActionButton: any;
export const HeaderField: any;
export const IconSelector: any;
export const LinkedHeaderField: any;
export const LoadingOverlay: any;

/**
 * Base for all dialog components.
 */
export class BaseDialog extends Vue implements ITabbedComponent {
    setActiveTab(tab: number): void;
}

export const ConfirmDialog: any;
export const DeleteDialog: any;
export const MetadataPanel: any;

// List components.
export const ListEntry: any;
export const ListLayout: any;
export const ListPage: any;
export const ListTab: any;
export const Pager: any;

// Navigation components.
export const ContentTab: any;
export const DataEntryPanel: any;
export const DataTableTab: any;
export const DetailPage: any;
export const InAppFooter: any;
export const InAppSystemBar: any;
export const Navigation: any;
export const NavigationActionButton: any;
export const NavigationHeaderPanel: any;
export const NavigationPage: any;

// Export Vue plugin.
export const SiteWhere: PluginFunction<any>;
export default SiteWhere;
