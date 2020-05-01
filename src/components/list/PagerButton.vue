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

@Component
export default class Pager extends Vue {
  @Prop() readonly icon!: string;
  @Prop() readonly text!: string;
  @Prop({ default: false }) readonly disabled!: boolean;

  onButtonClicked(e: any) {
    this.$emit("click", e);
  }
}
</script>
