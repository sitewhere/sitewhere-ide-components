import Vue from "vue";
import { AxiosPromise } from "axios";
import { Route } from "vue-router";
/**
 * Base class for components that display data for a single record
 * based on SiteWhere REST services.
 */
export declare class DetailComponent<T> extends Vue {
    token: string | null;
    record: T | null;
    loaded: boolean;
    /** Get parameter for route token */
    getTokenParameter(): string;
    /** Called on initial create */
    created(): void;
    /** Called when component is reused */
    beforeRouteUpdate(to: Route, from: Route, next: any): void;
    /** Display record with the given token */
    display(token: string): void;
    /** Return promise for loading record */
    loadRecord(token: string | null): AxiosPromise<T>;
    /** Refresh list contents */
    refresh(): Promise<void>;
    /** Called after record is loaded */
    afterRecordLoaded(record: T): void;
}
