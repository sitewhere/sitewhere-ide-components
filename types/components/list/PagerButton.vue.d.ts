import Vue from "vue";
export default class Pager extends Vue {
    readonly icon: string;
    readonly text: string;
    readonly disabled: boolean;
    onButtonClicked(e: any): void;
}
