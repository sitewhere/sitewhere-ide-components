import Vue from "vue";
export default class ConfirmDialog extends Vue {
    readonly title: string;
    readonly width: number;
    readonly buttonText: string;
    visible: boolean;
    error: any;
    /** Called to open the dialog */
    open(): void;
    /** Called when action button is clicked */
    onActionConfirmed(): void;
    /** Called after cancel button is clicked */
    onCancelClicked(): void;
}
