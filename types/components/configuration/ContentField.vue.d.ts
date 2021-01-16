import Vue from "vue";
export default class ContentField extends Vue {
    readonly name: string;
    readonly value: string;
    readonly alt: boolean;
    readonly password: boolean;
    get displayValue(): string;
}
