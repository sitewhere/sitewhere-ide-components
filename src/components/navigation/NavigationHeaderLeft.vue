<template>
  <v-card flat style="position: relative; height: 100%">
    <slot />
    <div class="right-overlay">
      <slot name="right-overlay" />
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import { VCard } from "vuetify/lib";

@Component({ components: { VCard } })
export default class NavigationHeaderLeft extends Vue {}
</script>

<style scoped>
.right-overlay {
  position: absolute;
  right: 0;
  top: 0;
}
</style>
