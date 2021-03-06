<template>
  <div class="pager">
    <slot v-if="results && results.numResults === 0" name="noresults"></slot>
    <v-container class="ma-0 pa-0">
      <v-layout wrap>
        <v-flex xs2>
          <v-subheader>Rows per page</v-subheader>
        </v-flex>
        <v-flex xs3>
          <v-btn-toggle dense v-model="pageSize" class="mt-2">
            <v-btn
              small
              :value="entry.value"
              v-for="entry in pageSizesWithDefaults"
              :key="entry.value"
            >{{ entry.text }}</v-btn>
          </v-btn-toggle>
        </v-flex>
        <v-flex xs4 class="pa-2">
          <pager-button
            :disabled="!previousEnabled"
            @click="onFirstPage"
            icon="fa-fast-backward"
            text="First Page"
          />
          <pager-button
            :disabled="!previousEnabled"
            @click="onPreviousPage"
            icon="fa-backward"
            text="Previous Page"
          />
          <pager-button @click="onRefresh" icon="fa-sync" text="Refresh" />
          <pager-button
            :disabled="!nextEnabled"
            @click="onNextPage"
            icon="fa-forward"
            text="Next Page"
          />
          <pager-button
            :disabled="!nextEnabled"
            @click="onLastPage"
            icon="fa-fast-forward"
            text="Last Page"
          />
        </v-flex>
        <v-flex xs3>
          <v-subheader class="ma-0 pt-0 float-right">{{ description }}</v-subheader>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

import PagerButton from "./PagerButton.vue";

import { Component, Prop, Watch } from "vue-property-decorator";
import { IPaging, IPageSizes } from "sitewhere-ide-common";

import {
  VContainer,
  VLayout,
  VFlex,
  VSubheader,
  VBtnToggle,
  VBtn
} from "vuetify/lib";

@Component({
  components: {
    PagerButton,
    VContainer,
    VLayout,
    VFlex,
    VSubheader,
    VBtnToggle,
    VBtn
  }
})
export default class Pager extends Vue {
  @Prop() readonly results!: { numResults: number; results: {}[] };
  @Prop() readonly pageSizes!: IPageSizes;

  page = 1;
  pageSize: number | null = null;
  defaultResults: { numResults: number; results: {}[] } = {
    numResults: 0,
    results: []
  };
  defaultPageSizes: IPageSizes = [
    {
      text: "10",
      value: 10
    },
    {
      text: "25",
      value: 25
    },
    {
      text: "50",
      value: 50
    }
  ];

  created() {
    if (!this.pageSize) {
      this.pageSize = this.pageSizesWithDefaults[0].value;
    }
    this.onPagingUpdated();
  }

  /** Refresh results on page size updated */
  @Watch("pageSize") onPageSizeUpdated() {
    this.page = 1;
    this.onPagingUpdated();
  }

  /** Results with defaults fallback */
  get resultsWithDefaults(): { numResults: number; results: {}[] } {
    return this.results || this.defaultResults;
  }

  /** Total record count */
  get total(): number {
    return this.resultsWithDefaults.numResults;
  }

  /** Description */
  get description(): string {
    const size = this.pageSize || 0;
    const total = this.total;
    const page = this.page;
    const first = size * (page - 1) + 1;
    const last = Math.min(total, first + size - 1);
    return "" + first + "-" + last + " of " + total;
  }

  /** Calculate number of pages */
  get pageCount() {
    const results = this.resultsWithDefaults;
    const total = results.numResults;
    const size = this.pageSize || 0;
    const mod = total % size;
    let count = (total / size) | 0;
    count += mod > 0 ? 1 : 0;
    return count;
  }

  // Get list of available page sizes with fallback defaults.
  get pageSizesWithDefaults(): { text: string; value: number }[] {
    return this.pageSizes || this.defaultPageSizes;
  }

  /** Indicates if 'previous' button should be enabled */
  get previousEnabled(): boolean {
    return this.page > 1;
  }

  /** Indicates if 'next' button should be enabled */
  get nextEnabled(): boolean {
    return this.page < this.pageCount;
  }

  /** Called to move to first page */
  onFirstPage() {
    if (this.page !== 1) {
      this.page = 1;
      this.onPagingUpdated();
    }
  }

  /** Called to move to previous page */
  onPreviousPage() {
    if (this.page > 1) {
      this.page--;
      this.onPagingUpdated();
    }
  }

  /** Called to refresh data */
  onRefresh() {
    this.onPagingUpdated();
  }

  /** Called to move to next page */
  onNextPage() {
    if (this.page < this.pageCount) {
      this.page++;
      this.onPagingUpdated();
    }
  }

  /** Called to move to last page */
  onLastPage() {
    if (this.page < this.pageCount) {
      this.page = this.pageCount;
      this.onPagingUpdated();
    }
  }

  /** Called when paging values are updated */
  onPagingUpdated() {
    const paging: IPaging = {
      pageNumber: this.page,
      pageSize: this.pageSize || 0
    };
    this.$emit("pagingUpdated", paging);
  }
}
</script>

<style scoped>
.pager {
  color: #333;
  background-color: #eee;
  border-top: 1px solid #ddd;
}
</style>
