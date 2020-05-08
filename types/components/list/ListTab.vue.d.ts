import Vue from "vue";
import { IPaging, IPageSizes } from "sitewhere-ide-common";
export default class ListTab extends Vue {
    readonly tabkey: string;
    readonly pageSizes: IPageSizes;
    readonly loadingMessage: string;
    readonly loaded: boolean;
    readonly results: {
        numResults: number;
        results: {}[];
    };
    /** Detect whether loaded with results */
    get hasResults(): boolean;
    /** Detect whether loaded with no results */
    get noResults(): boolean;
    /** Update paging values and run query */
    onPagingUpdated(paging: IPaging): void;
}
