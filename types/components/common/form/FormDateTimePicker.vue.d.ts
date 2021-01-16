import Vue from "vue";
export default class FormDateTimePicker extends Vue {
    readonly title: string;
    readonly label: string;
    readonly icon: string;
    readonly required: boolean;
    readonly value: string;
    readonly type: string;
    get wrapped(): string;
    set wrapped(updated: string);
}
