import Vue from "vue";
export default class DatatableSection extends Vue {
    readonly icon: string;
    readonly fa: boolean;
    readonly title: string;
    readonly noDataText: string;
    readonly help: string;
    readonly headers: any[];
    readonly items: any[];
    readonly width: string;
}
