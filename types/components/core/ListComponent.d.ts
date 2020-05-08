import Vue from "vue";
import { ISearchCriteria, IResponseFormat, ISearchResults } from "sitewhere-rest-api";
import { IPaging } from "sitewhere-ide-common";
import { AxiosPromise } from "axios";
/**
 * Base class for components that display lists based on
 * SiteWhere REST services.
 */
export declare class ListComponent<T, S extends ISearchCriteria, F extends IResponseFormat, R extends ISearchResults<T>> extends Vue {
    results: R | null;
    paging: IPaging | null;
    matches: T[];
    loaded: boolean;
    /** Update paging values and run query */
    onPagingUpdated(paging: IPaging): void;
    /** Build search criteria for list */
    buildSearchCriteria(): S;
    /** Build response format for list */
    buildResponseFormat(): F;
    /** Return promise for performing search */
    performSearch(criteria: S, format: F): AxiosPromise<R>;
    /** Refresh list contents */
    refresh(): Promise<void>;
}
