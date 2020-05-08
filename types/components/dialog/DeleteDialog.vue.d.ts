import Vue from "vue";
export default class DeleteDialog extends Vue {
    readonly title: string;
    readonly width: number;
    readonly error: string;
    readonly visible: boolean;
    /** Called after create button is clicked */
    onDeleteClicked(): void;
    /** Called after cancel button is clicked */
    onCancelClicked(): void;
}
