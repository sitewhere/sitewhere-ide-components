<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts">
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
export default class DetailComponent<T> extends Vue {
  token: string | null = null;
  record: any | null = null;
  loaded: boolean = false;

  // Get parameter for route token.
  getTokenParameter(): string {
    return "token";
  }

  // Called on initial create.
  created() {
    this.display(this.$route.params[this.getTokenParameter()]);
  }

  // Called when component is reused.
  beforeRouteUpdate(to: Route, from: Route, next: any) {
    this.display(to.params.token);
    next();
  }

  // Display record with the given token.
  display(token: string) {
    this.token = token;
    this.refresh();
  }

  /** Return promise for loading record */
  loadRecord(token: string | null): AxiosPromise<T> {
    throw new Error("Implement loadRecord()");
  }

  // Refresh list contents.
  async refresh() {
    try {
      this.loaded = false;
      let promise: AxiosPromise<T> = this.loadRecord(this.token);
      let response: AxiosResponse<T> = await promise;
      this.record = response.data;
      this.afterRecordLoaded(this.record);
    } catch (err) {
      showError(this, err);
    }
    this.loaded = true;
  }

  /** Called after record is loaded */
  afterRecordLoaded(record: any): void {}
}
</script>
