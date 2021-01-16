<template>
  <v-tab-item :key="tabkey">
    <div class="flex-rows">
      <div class="tab-header">
        <slot name="header" />
      </div>
      <div class="tab-content">
        <slot v-if="loaded" />
        <v-card style="height: 100%" v-else>
          <loading-overlay v-if="!loaded" :loadingMessage="loadingMessage" />
        </v-card>
      </div>
      <div class="tab-footer">
        <slot name="footer" />
      </div>
    </div>
    <slot name="dialogs"></slot>
  </v-tab-item>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import LoadingOverlay from "../common/LoadingOverlay.vue";

import { VTabItem, VCard } from "vuetify/lib";

@Component({
  components: {
    LoadingOverlay,
    VTabItem,
    VCard
  }
})
export default class ContentTab extends Vue {
  @Prop() readonly tabkey!: string;
  @Prop() readonly loadingMessage!: string;
  @Prop() readonly loaded!: boolean;
}
</script>

<style scoped>
.flex-rows {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.tab-header {
  flex: 0;
}
.tab-content {
  flex: 1;
  background-color: #fff;
  overflow-y: auto;
}
.tab-footer {
  flex: 0;
}
</style>
