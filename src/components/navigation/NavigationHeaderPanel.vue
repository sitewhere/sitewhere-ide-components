<template>
  <v-card flat :style="panelStyle" class="white mt-2 mb-3 pr-3 pl-3 header-panel">
    <v-card-text>
      <span class="header-left">
        <slot name="left" />
      </span>
      <span class="header-content">
        <slot name="content" />
      </span>
      <span class="header-right">
        <slot name="right" />
      </span>
      <span class="options-menu">
        <slot name="options" />
      </span>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "sitewhere-ide-common";

@Component({})
export default class NavigationHeaderPanel extends Vue {
  @Prop() readonly height!: string;

  // Style for top-level panel.
  get panelStyle() {
    return {
      "min-height": this.height
    };
  }
}
</script>

<style scoped>
.header-panel {
  min-width: 920px;
  overflow-y: hidden;
}

.header-left {
  position: absolute;
  top: 10px;
  left: 10px;
  bottom: 10px;
  width: 230px;
  height: 100%;
}

.header-right {
  position: absolute;
  top: 10px;
  right: 10px;
  bottom: 10px;
  width: 230px;
  height: 100%;
}

.header-content {
  position: absolute;
  top: 10px;
  left: 250px;
  right: 250px;
  height: 100%;
}

.options-menu {
  position: absolute;
  top: 10px;
  right: 190px;
}
</style>
