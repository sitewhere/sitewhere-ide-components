import Vue from "vue";
export default class ContentHeader extends Vue {
    readonly title: string;
    readonly icon: string;
    readonly fa: boolean;
    get iconClass(): string;
}
