<template>
  <v-tooltip left>
    <v-icon
      v-if="material"
      class="ma-0 ml-1 navbutton"
      @click="onAction"
      slot="activator"
    >{{ icon }}</v-icon>
    <font-awesome-icon
      v-else
      class="ma-1 navbutton"
      :icon="icon"
      @click="onAction"
      slot="activator"
    />
    <span>{{ tooltip }}</span>
  </v-tooltip>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "sitewhere-ide-common";

@Component({})
export default class NavigationActionButton extends Vue {
  @Prop() readonly icon!: string;
  @Prop() readonly tooltip!: string;
  @Prop({ default: false }) readonly material!: boolean;

  onAction() {
    this.$emit("action");
  }
}
</script>

<style scoped>
.navbutton {
  font-size: 22px;
  padding-left: 6px;
  color: #666;
  vertical-align: middle;
}
.navbutton:hover {
  color: #999;
}
</style>
