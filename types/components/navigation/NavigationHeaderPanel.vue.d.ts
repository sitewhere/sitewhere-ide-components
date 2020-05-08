import Vue from "vue";
export default class NavigationHeaderPanel extends Vue {
    readonly height: string;
    get panelStyle(): {
        "min-height": string;
    };
}
