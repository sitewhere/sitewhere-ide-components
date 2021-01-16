import Vue from "vue";
export default class FormText extends Vue {
    readonly title: string;
    readonly label: string;
    readonly icon: string;
    readonly required: boolean;
    readonly value: string;
    readonly type: string;
    readonly readonly: boolean;
    readonly dense: boolean;
    readonly autofocus: boolean;
    readonly field: any;
    get wrapped(): string;
    set wrapped(updated: string);
    /** Focus the wrapped input */
    focus(): void;
}
