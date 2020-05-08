import Vue from "vue";
export default class ClipboardCopyField extends Vue {
    /** Called after id is copied */
    onFieldCopied(): void;
    /** Called if unable to copy id */
    onFieldCopyFailed(): void;
}
