import Vue from "vue";
import BaseDialog from "../dialog/BaseDialog.vue";
export default class NewElementChooser extends Vue {
    readonly icon: string;
    readonly title: string;
    readonly width: number;
    readonly dialog: BaseDialog;
    dialogVisible: boolean;
    /** Open dialog */
    openDialog(): void;
    /** Close dialog */
    closeDialog(): void;
}
