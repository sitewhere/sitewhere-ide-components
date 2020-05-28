import Vue from "vue";
export default class FormToken extends Vue {
    readonly title: string;
    readonly label: string;
    readonly required: boolean;
    readonly value: string;
    readonly validator: any;
    get wrapped(): string;
    set wrapped(updated: string);
}
