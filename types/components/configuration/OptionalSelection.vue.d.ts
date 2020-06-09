import Vue from "vue";
export default class OptionalSelection extends Vue {
    readonly value: string | null;
    readonly width: string;
    readonly items: any[];
    readonly checkboxTitle: string;
    readonly selectLabel: string;
    readonly selectTitle: string;
    readonly selectItemText: string;
    readonly selectItemValue: string;
    chosen: boolean;
    selected: string | null;
    onChosenChanged(updated: boolean): void;
    onValueChanged(updated: string): void;
    onSelectionChanged(updated: string): void;
}
