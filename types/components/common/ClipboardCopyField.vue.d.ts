import Vue from "vue";
export default class ClipboardCopyField extends Vue {
    readonly field: string;
    readonly message: string;
    /** Called after successful copy */
    onFieldCopied(): void;
    /** Called after failed copy */
    onFieldCopyFailed(): void;
}
