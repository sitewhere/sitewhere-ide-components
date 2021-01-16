import Vue from "vue";
export default class NewElementChooser extends Vue {
    readonly icon: string;
    readonly itemId: string;
    /** Called when the element is clicked */
    onElementClicked(): void;
}
