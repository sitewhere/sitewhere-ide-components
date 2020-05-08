import Vue from "vue";
export default class InAppSystemBar extends Vue {
    readonly title: string;
    openWebTools(): void;
    minWindow(): void;
    maxWindow(): void;
    closeWindow(): void;
}
