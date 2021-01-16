import Vue from "vue";
export default class FormSelect extends Vue {
    readonly title: string;
    readonly label: string;
    readonly icon: string;
    readonly items: {}[];
    readonly required: boolean;
    readonly value: string;
    readonly itemText: string;
    readonly itemValue: string;
    readonly multiple: boolean;
    readonly chips: boolean;
    get wrapped(): string;
    set wrapped(updated: string);
    onSelectionChanged(selection: any): void;
}
