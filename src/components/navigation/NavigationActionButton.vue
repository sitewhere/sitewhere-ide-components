<template>
  <v-tooltip left>
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" small icon @click="onAction">
        <v-icon small color="#666" class="navbutton">{{icon}}</v-icon>
      </v-btn>
    </template>
    <span>{{ tooltip }}</span>
  </v-tooltip>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { VTooltip, VBtn, VIcon } from "vuetify/lib";

@Component({ components: { VTooltip, VBtn, VIcon } })
export default class NavigationActionButton extends Vue {
  @Prop() readonly icon!: string;
  @Prop() readonly tooltip!: string;
  @Prop({ default: false }) readonly material!: boolean;

  onAction() {
    this.$emit("action");
  }
}
</script>
