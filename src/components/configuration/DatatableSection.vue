<template>
  <v-card flat>
    <content-header :title="title" :icon="icon" :fa="fa" />
    <v-card flat style="margin-left: 25px;" :width="width">
      <v-data-table class="datatable" dense :headers="headers" :items="items" hide-default-footer>
        <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
          <slot :name="slot" v-bind="scope" />
        </template>
      </v-data-table>
      <slot name="datatable-footer" />
      <slot name="datatable-dialogs" />
    </v-card>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import ContentHeader from "./ContentHeader.vue";

import { VCard, VDataTable } from "vuetify/lib";

@Component({
  components: { ContentHeader, VCard, VDataTable }
})
export default class Section extends Vue {
  @Prop() readonly icon!: string;
  @Prop() readonly fa!: boolean;
  @Prop() readonly title!: string;
  @Prop() readonly help!: string;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  @Prop() readonly headers!: any[];
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  @Prop() readonly items!: any[];
  @Prop() readonly width!: string;
}
</script>

<style scoped>
.datatable >>> tr {
  height: 30px;
}
.datatable >>> th {
  padding: 3px !important;
}
.datatable >>> td {
  padding: 3px !important;
  height: 30px;
}
</style>
