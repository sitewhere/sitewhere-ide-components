import Vue from "vue";
export default class FormText extends Vue {
    readonly title: string;
    readonly label: string;
    readonly icon: string;
    readonly required: boolean;
    readonly value: string;
    get wrapped(): string;
    set wrapped(updated: string);
}
