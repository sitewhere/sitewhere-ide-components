import Vue from "vue";
import { IPageSizes } from "sitewhere-ide-common";
export default class Pager extends Vue {
    readonly results: {
        numResults: number;
        results: {}[];
    };
    readonly pageSizes: IPageSizes;
    page: number;
    pageSize: number | null;
    defaultResults: {
        numResults: number;
        results: {}[];
    };
    defaultPageSizes: IPageSizes;
    created(): void;
    /** Refresh results on page size updated */
    onPageSizeUpdated(): void;
    /** Results with defaults fallback */
    get resultsWithDefaults(): {
        numResults: number;
        results: {}[];
    };
    /** Total record count */
    get total(): number;
    /** Description */
    get description(): string;
    /** Calculate number of pages */
    get pageCount(): number;
    get pageSizesWithDefaults(): {
        text: string;
        value: number;
    }[];
    /** Indicates if 'previous' button should be enabled */
    get previousEnabled(): boolean;
    /** Indicates if 'next' button should be enabled */
    get nextEnabled(): boolean;
    /** Called to move to first page */
    onFirstPage(): void;
    /** Called to move to previous page */
    onPreviousPage(): void;
    /** Called to refresh data */
    onRefresh(): void;
    /** Called to move to next page */
    onNextPage(): void;
    /** Called to move to last page */
    onLastPage(): void;
    /** Called when paging values are updated */
    onPagingUpdated(): void;
}
