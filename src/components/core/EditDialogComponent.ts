import Vue from "vue";
import { Component } from "vue-property-decorator";
import { DialogComponent } from "./DialogComponent";
import { showError } from "sitewhere-ide-common";
import { AxiosPromise, AxiosResponse } from "axios";

/**
 * Base class for edit dialogs.
 */
@Component
export class EditDialogComponent<T, R> extends Vue {
    record: T | null = null;
    loaded = false;

    /** Get wrapped dialog */
    getDialog(): DialogComponent<T> {
        throw new Error("Edit dialog must implement getDialog().");
    }

    /**
     * Prepare load for the given identifier.
     * @param identifier
     */
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    prepareLoad(identifier: string | null): AxiosPromise<T> | T {
        throw new Error("Edit dialog must implement load().");
    }

    /** Type guard to differentiate between responses */
    isAxiosResponse(
        response: AxiosResponse<T> | T
    ): response is AxiosResponse<T> {
        return (response as AxiosResponse<T>).data !== undefined;
    }

    /**
     * Load record for identifer and open dialog.
     * @param identifier
     */
    async open(identifier: string | null) {
        this.getDialog().openDialog();
        this.getDialog().reset();
        this.loaded = false;
        try {
            const response: AxiosResponse<T> | T = await this.prepareLoad(identifier);
            this.record = this.isAxiosResponse(response) ? response.data : response;
            this.getDialog().load(this.record);
        } catch (err) {
            showError(this, err);
        }
        this.loaded = true;
    }

    /** Implemented in subclasses to save payload */
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    prepareSave(original: T, updated: R): AxiosPromise<T> | T {
        throw new Error("Edit dialog must implement save().");
    }

    /** Handle payload commit */
    async save(payload: R) {
        if (!this.record) {
            throw new Error("Unable to update. Record is null.");
        }
        try {
            const response: AxiosResponse<T> | T = await this.prepareSave(
                this.record,
                payload
            );
            const updated: T = this.isAxiosResponse(response)
                ? response.data
                : response;
            this.afterSave(updated);
            this.$emit("updated", updated);
            this.getDialog().closeDialog();
        } catch (err) {
            showError(this, err);
        }
    }

    /** Implemented in subclasses for after-save */
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function */
    afterSave(payload: T): void { }
}