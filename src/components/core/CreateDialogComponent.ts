import Vue from "vue";
import { Component } from "vue-property-decorator";
import { DialogComponent } from "./DialogComponent";
import { showError } from "sitewhere-ide-common";
import { AxiosPromise, AxiosResponse } from "axios";

/**
 * Base class for create dialogs.
 */
@Component
export class CreateDialogComponent<T, R> extends Vue {
    /** Get wrapped dialog */
    getDialog(): DialogComponent<T> {
        throw new Error("Create dialog must implement getDialog().");
    }

    /** Open wrapped dialog */
    open() {
        this.getDialog().reset();
        this.getDialog().openDialog();
    }

    /** Load dialog then open it */
    loadAndOpen(payload: T) {
        this.getDialog().reset();
        this.getDialog().load(payload);
        this.getDialog().openDialog();
    }

    /** Implemented in subclasses to save payload */
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    save(payload: R): AxiosPromise<T> | T {
        throw new Error("Create dialog must implement save().");
    }

    /** Implemented in subclasses for after-save */
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function */
    afterSave(payload: T): void { }

    /** Type guard to differentiate between responses */
    isAxiosResponse(
        response: AxiosResponse<T> | T
    ): response is AxiosResponse<T> {
        return (response as AxiosResponse<T>).data !== undefined;
    }

    /** Handle payload commit */
    async commit(payload: R) {
        try {
            const response: AxiosResponse<T> | T = await this.save(payload);
            const created: T = this.isAxiosResponse(response)
                ? response.data
                : response;
            this.afterSave(created);
            this.$emit("created", created);
            this.getDialog().closeDialog();
        } catch (err) {
            showError(this, err);
        }
    }
}