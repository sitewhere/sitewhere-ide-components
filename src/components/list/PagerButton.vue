<template>
  <v-tooltip top>
    <v-btn
      :disabled="disabled"
      icon
      light
      class="ml-0 mr-0 grey--text text--darken-2"
      @click="onButtonClicked"
      slot="activator"
    >
      <v-icon>{{ icon }}</v-icon>
    </v-btn>
    <span>{{ text }}</span>
  </v-tooltip>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { VTooltip, VBtn, VIcon } from "vuetify/lib";

@Component({ components: { VTooltip, VBtn, VIcon } })
export default class Pager extends Vue {
  @Prop() readonly icon!: string;
  @Prop() readonly text!: string;
  @Prop({ default: false }) readonly disabled!: boolean;

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  onButtonClicked(e: any) {
    this.$emit("click", e);
  }
}
</script>
