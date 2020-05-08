import Vue from "vue";
export default class ContentLink extends Vue {
    readonly icon: string;
    readonly text: string;
    onLinkClicked(): void;
}
