import Vue from "vue";
export default class NavigationActionButton extends Vue {
    readonly icon: string;
    readonly tooltip: string;
    readonly light: boolean;
    readonly material: boolean;
    onAction(): void;
}
