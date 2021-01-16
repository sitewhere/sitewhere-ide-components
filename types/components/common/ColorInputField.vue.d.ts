import Vue from "vue";
export default class ColorInputField extends Vue {
    readonly value: string;
    readonly label: string;
    readonly title: string;
    readonly mode: string;
    menu: string | null;
    updatedColor: string | null;
    onValueChanged(val: string): void;
    get valueOrDefault(): string;
    /** Called when color is chosen */
    onColorChosen(val: string): void;
}
