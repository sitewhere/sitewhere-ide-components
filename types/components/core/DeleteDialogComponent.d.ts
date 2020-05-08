import Vue from "vue";
import { AxiosPromise, AxiosResponse } from "axios";
/**
 * Base class for delete dialog components.
 */
export declare class DeleteDialogComponent<T> extends Vue {
    readonly title: string;
    readonly width: number;
    record: T | null;
    visible: boolean;
    error: string | null;
    /**
     * Load object to be deleted.
     * @param identifier
     */
    prepareLoad(identifier: string): AxiosPromise<T> | T;
    /** Type guard to differentiate between responses */
    isAxiosResponse(response: AxiosResponse<T> | T): response is AxiosResponse<T>;
    /** Called after record is loaded */
    afterLoad(record: T): void;
    /**
     * Load data, then open dialog.
     * @param identifier
     */
    open(identifier: string): Promise<void>;
    /** Return method to delete record */
    prepareDelete(record: T): AxiosPromise<T> | T;
    /** Action invoked when delete is clicked */
    delete(): Promise<void>;
    /** Action invoked when cancel is clicked */
    cancel(): void;
    /** Called to open the dialog */
    closeDialog(): void;
    /** Called to show an error message */
    showError(error: string): void;
}
