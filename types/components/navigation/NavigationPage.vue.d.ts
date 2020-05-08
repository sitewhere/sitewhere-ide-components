import Vue from "vue";
export default class NavigationPage extends Vue {
    readonly icon: string;
    readonly title: string;
    readonly loadingMessage: string;
    readonly loaded: boolean;
}
