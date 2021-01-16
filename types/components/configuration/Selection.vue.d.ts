import Vue from "vue";
export default class Selection extends Vue {
    readonly value: string | null;
    readonly items: any[];
    readonly label: string;
    readonly title: string;
    readonly itemText: string;
    readonly itemValue: string;
    selected: string | null;
    onValueChanged(updated: string): void;
    onSelectionChanged(updated: string): void;
}
