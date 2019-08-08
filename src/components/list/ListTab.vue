<template>
  <v-tab-item :key="tabkey">
    <div class="flex-rows">
      <div class="list-filters">
        <slot name="filters" />
      </div>
      <div class="list-content">
        <slot v-if="hasResults" />
        <slot name="noresults" v-else-if="noResults" />
      </div>
      <div class="list-footer">
        <pager :results="results" @pagingUpdated="onPagingUpdated" :pageSizes="pageSizes" />
      </div>
    </div>
    <loading-overlay v-if="!loaded" :loadingMessage="loadingMessage" />
    <slot name="dialogs" />
  </v-tab-item>
</template>

<script lang="ts">
import Vue from "vue";

import Pager from "./Pager.vue";
import LoadingOverlay from "../common/LoadingOverlay.vue";

import { Component, Prop, IPaging, IPageSizes } from "sitewhere-ide-common";

@Component({
  components: {
    Pager,
    LoadingOverlay
  }
})
export default class ListTab extends Vue {
  @Prop() readonly tabkey!: string;
  @Prop() readonly pageSizes!: IPageSizes;
  @Prop() readonly loadingMessage!: string;
  @Prop() readonly loaded!: boolean;
  @Prop() readonly results!: { numResults: number; results: {}[] };

  /** Detect whether loaded with results */
  get hasResults() {
    return this.loaded && this.results && this.results.numResults > 0;
  }

  /** Detect whether loaded with no results */
  get noResults() {
    return this.loaded && this.results && this.results.numResults === 0;
  }

  /** Update paging values and run query */
  onPagingUpdated(paging: IPaging) {
    this.$emit("pagingUpdated", paging);
  }
}
</script>

<style scoped>
.flex-rows {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.list-filters {
  flex: 0;
}
.list-content {
  flex: 1;
  background-color: #eee;
  overflow-y: auto;
}
.list-footer {
  flex: 0;
}
</style>
