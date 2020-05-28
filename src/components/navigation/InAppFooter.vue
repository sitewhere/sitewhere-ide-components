<template>
  <v-footer app class="pa-0" style="z-index: 10;">
    <div class="footer-content">
      <slot />
    </div>
  </v-footer>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import { VFooter } from "vuetify/lib";

@Component({ components: { VFooter } })
export default class InAppFooter extends Vue {}
</script>

<style scoped>
.footer-content {
  border-top: 1px solid #ddd;
  width: 100%;
  height: 100%;
  color: #666;
  padding: 7px;
}
</style>
