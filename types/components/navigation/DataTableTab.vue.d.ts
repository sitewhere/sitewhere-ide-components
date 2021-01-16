import Vue from "vue";
import { IPaging, IPageSizes, ITableHeaders } from "sitewhere-ide-common";
export default class DataTableTab extends Vue {
    readonly tabkey: string;
    readonly headers: ITableHeaders;
    readonly pageSizes: IPageSizes;
    readonly noDataText: string;
    readonly loadingMessage: string;
    readonly loaded: boolean;
    readonly results: {
        numResults: number;
        results: {}[];
    };
    /** Get current matches */
    get matches(): {}[];
    /** Dims results when loading */
    get tableStyle(): {};
    /** Update paging values and run query */
    onPagingUpdated(paging: IPaging): void;
}
