import Vue from "vue";
export default class DetailPage extends Vue {
    readonly icon: string;
    readonly title: string;
    readonly loadingMessage: string;
    readonly loaded: boolean;
    readonly record: {};
    readonly tabsOnBottom: boolean;
    active: string | null;
}
