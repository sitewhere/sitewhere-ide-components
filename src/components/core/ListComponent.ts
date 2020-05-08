import Vue from "vue";
import { Component } from "vue-property-decorator";
import { ISearchCriteria, IResponseFormat, ISearchResults } from "sitewhere-rest-api";
import { IPaging, showError } from "sitewhere-ide-common";
import { AxiosPromise, AxiosResponse } from "axios";

/**
 * Base class for components that display lists based on
 * SiteWhere REST services.
 */
@Component
export class ListComponent<
    T,
    S extends ISearchCriteria,
    F extends IResponseFormat,
    R extends ISearchResults<T>
    > extends Vue {
    results: R | null = null;
    paging: IPaging | null = null;
    matches: T[] = [];
    loaded = false;

    /** Update paging values and run query */
    onPagingUpdated(paging: IPaging) {
        this.paging = paging;
        this.refresh();
    }

    /** Build search criteria for list */
    buildSearchCriteria(): S {
        throw new Error("Implement buildSearchCriteria()");
    }

    /** Build response format for list */
    buildResponseFormat(): F {
        throw new Error("Implement buildResponseFormat()");
    }

    /** Return promise for performing search */
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    performSearch(criteria: S, format: F): AxiosPromise<R> {
        throw new Error("Implement performSearch()");
    }

    /** Refresh list contents */
    async refresh() {
        const criteria: S = this.buildSearchCriteria();
        const format: F = this.buildResponseFormat();
        if (this.paging) {
            criteria.pageNumber = this.paging.pageNumber;
            criteria.pageSize = this.paging.pageSize;
        }

        try {
            this.loaded = false;
            const promise: AxiosPromise<R> = this.performSearch(criteria, format);
            const response: AxiosResponse<R> = await promise;
            this.results = response.data;
            this.matches = response.data.results;
        } catch (err) {
            showError(this, err);
        }
        this.loaded = true;
    }
}
