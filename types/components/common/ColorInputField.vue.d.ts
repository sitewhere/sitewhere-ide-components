import Vue from "vue";
export default class ColorInputField extends Vue {
    readonly value: string;
    readonly text: string;
    menu: string | null;
    updatedColor: string | null;
    onValueChanged(val: string): void;
    get valueOrDefault(): string;
    /** Called when color is chosen */
    onColorChosen(val: any): void;
}
