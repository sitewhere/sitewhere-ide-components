<template>
  <v-select
    eager
    single-line
    flat
    outlined
    dense
    hide-details
    class="small-select"
    :items="items"
    :title="title"
    :label="label"
    :item-text="itemText"
    :item-value="itemValue"
    v-model="selected"
  />
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

import { VSelect } from "vuetify/lib";

@Component({
  components: {
    VSelect
  }
})
export default class Selection extends Vue {
  @Prop() readonly value!: string | null;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  @Prop() readonly items!: any[];
  @Prop() readonly label!: string;
  @Prop() readonly title!: string;
  @Prop() readonly itemText!: string;
  @Prop() readonly itemValue!: string;

  selected: string | null = null;

  @Watch("value", { immediate: true })
  onValueChanged(updated: string) {
    this.selected = updated;
  }

  @Watch("selected")
  onSelectionChanged(updated: string) {
    this.$emit("input", updated);
  }
}
</script>

<style scoped>
.small-select >>> div.v-input__slot {
  min-height: 24px !important;
}
.small-select >>> div.v-select__slot label {
  font-size: 14px;
  top: 7px;
}
.small-select >>> div.v-select__selection {
  font-size: 14px;
  top: 7px;
}
</style>