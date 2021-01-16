import Vue from "vue";
import { DialogComponent } from "./DialogComponent";
import { AxiosPromise, AxiosResponse } from "axios";
/**
 * Base class for create dialogs.
 */
export declare class CreateDialogComponent<T, R> extends Vue {
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
    /** Type guard to differentiate between responses */
    isAxiosResponse(response: AxiosResponse<T> | T): response is AxiosResponse<T>;
    /** Handle payload commit */
    commit(payload: R): Promise<void>;
}
