<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" :disabled="disabled" icon small @click="onButtonClicked">
        <v-icon small class="grey--text text--darken-2">{{ icon }}</v-icon>
      </v-btn>
    </template>
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
