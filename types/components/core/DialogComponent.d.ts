import Vue from "vue";
/**
 * Base class for dialog components.
 */
export declare class DialogComponent<T> extends Vue {
    readonly title: string;
    readonly width: number;
    readonly createLabel: string;
    readonly cancelLabel: string;
    readonly loaded: boolean;
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
