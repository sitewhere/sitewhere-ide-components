<template>
  <v-card flat :width="width">
    <v-data-table class="datatable" dense :headers="headers" :items="items" hide-default-footer>
      <template v-for="(_, slot) of $scopedSlots" v-slot:[slot]="scope">
        <slot :name="slot" v-bind="scope" />
      </template>
    </v-data-table>
    <slot name="datatable-footer" />
    <slot name="datatable-dialogs" />
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { VCard, VDataTable } from "vuetify/lib";

@Component({
  components: { VCard, VDataTable }
})
export default class DatatableSection extends Vue {
  @Prop() readonly icon!: string;
  @Prop() readonly fa!: boolean;
  @Prop() readonly title!: string;
  @Prop() readonly help!: string;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  @Prop() readonly headers!: any[];
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  @Prop() readonly items!: any[];
  @Prop() readonly width!: string;
  @Prop() readonly hideHeader!: boolean;
}
</script>

<style scoped>
.datatable {
  border: 1px solid #ddd;
}
.datatable >>> tr {
  height: 30px;
}
.datatable >>> tr:hover {
  background: #ffffff !important;
}
.datatable >>> th {
  padding: 5px !important;
}
.datatable >>> td {
  padding: 5px !important;
  height: 30px;
}
</style>
