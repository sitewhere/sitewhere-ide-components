import Vue from "vue";
import { Component } from "vue-property-decorator";
import { showError } from "sitewhere-ide-common";
import { AxiosPromise, AxiosResponse } from "axios";
import { Route } from "vue-router";

/**
 * Base class for components that display data for a single record
 * based on SiteWhere REST services.
 */
@Component
export class DetailComponent<T> extends Vue {
    token: string | null = null;
    record: T | null = null;
    loaded = false;

    /** Get parameter for route token */
    getTokenParameter(): string {
        return "token";
    }

    /** Called on initial create */
    created() {
        this.display(this.$route.params[this.getTokenParameter()]);
    }

    /** Called when component is reused */
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any */
    beforeRouteUpdate(to: Route, from: Route, next: any) {
        this.display(to.params.token);
        next();
    }

    /** Display record with the given token */
    display(token: string) {
        this.token = token;
        this.refresh();
    }

    /** Return promise for loading record */
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
    loadRecord(token: string | null): AxiosPromise<T> {
        throw new Error("Implement loadRecord()");
    }

    /** Refresh list contents */
    async refresh() {
        try {
            this.loaded = false;
            const promise: AxiosPromise<T> = this.loadRecord(this.token);
            const response: AxiosResponse<T> = await promise;
            this.record = response.data;
            this.afterRecordLoaded(this.record);
        } catch (err) {
            showError(this, err);
        }
        this.loaded = true;
    }

    /** Called after record is loaded */
    /* eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function */
    afterRecordLoaded(record: T): void { }
}