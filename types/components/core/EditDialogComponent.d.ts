import Vue from "vue";
import { DialogComponent } from "./DialogComponent";
import { AxiosPromise, AxiosResponse } from "axios";
/**
 * Base class for edit dialogs.
 */
export declare class EditDialogComponent<T, R> extends Vue {
    record: T | null;
    loaded: boolean;
    /** Get wrapped dialog */
    getDialog(): DialogComponent<T>;
    /**
     * Prepare load for the given identifier.
     * @param identifier
     */
    prepareLoad(identifier: string | null): AxiosPromise<T> | T;
    /** Type guard to differentiate between responses */
    isAxiosResponse(response: AxiosResponse<T> | T): response is AxiosResponse<T>;
    /**
     * Load record for identifer and open dialog.
     * @param identifier
     */
    open(identifier: string | null): Promise<void>;
    /** Implemented in subclasses to save payload */
    prepareSave(original: T, updated: R): AxiosPromise<T> | T;
    /** Handle payload commit */
    save(payload: R): Promise<void>;
    /** Implemented in subclasses for after-save */
    afterSave(payload: T): void;
}
