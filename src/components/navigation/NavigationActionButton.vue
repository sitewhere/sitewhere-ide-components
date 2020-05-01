<template>
  <v-tooltip left>
    <v-icon class="ma-0 ml-1 navbutton" @click="onAction" slot="activator">
      {{
      icon
      }}
    </v-icon>
    <span>{{ tooltip }}</span>
  </v-tooltip>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

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
  font-size: 16px;
  padding-left: 8px;
  color: #666;
  vertical-align: middle;
}
.navbutton:hover {
  color: #999;
}
</style>
