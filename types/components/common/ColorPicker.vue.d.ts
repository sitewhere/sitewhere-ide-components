import Vue from "vue";
export default class ColorPicker extends Vue {
    readonly value: string;
    readonly opacity: string;
    readonly text: string;
    menu: boolean;
    currentColor: string | null;
    currentOpacity: number | null;
    onValueChanged(val: string): void;
    onOpacityChanged(val: number): void;
    /** Convert color into picker format */
    get pickerColor(): {
        hex: string | null;
        a: string;
    };
    /** Called when a color is chosen */
    onColorChosen(val: any): void;
}
