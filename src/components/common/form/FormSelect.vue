<template>
  <div class="mb-3">
    <v-select
      class="text-field-input"
      :required="required"
      :title="title"
      :label="label"
      :items="items"
      v-model="wrapped"
      :multiple="multiple"
      :item-text="itemText"
      :item-value="itemValue"
      :chips="chips"
      :prepend-icon="icon"
      :menu-props="{ closeOnContentClick: true }"
      :hide-details="true"
      placeholder=" "
      @change="onSelectionChanged"
    />
    <div class="verror">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { VSelect } from "vuetify/lib";

@Component({ components: { VSelect } })
export default class FormSelect extends Vue {
  @Prop() readonly title!: string;
  @Prop() readonly label!: string;
  @Prop() readonly icon!: string;
  @Prop() readonly items!: {}[];
  @Prop() readonly required!: boolean;
  @Prop() readonly value!: string;
  @Prop() readonly itemText!: string;
  @Prop() readonly itemValue!: string;
  @Prop() readonly multiple!: boolean;
  @Prop() readonly chips!: boolean;

  get wrapped(): string {
    return this.value;
  }

  set wrapped(updated: string) {
    this.$emit("input", updated);
  }

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  onSelectionChanged(selection: any) {
    this.$emit("change", selection);
  }
}
</script>

<style scoped>
.text-field-input >>> i.v-icon {
  font-size: 16px;
  color: #999;
}
</style>
