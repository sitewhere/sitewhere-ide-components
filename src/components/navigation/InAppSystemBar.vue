<template>
  <v-system-bar color="#444" class="title-bar">
    <v-btn text icon small class="ma-0 title-bar-button" @click="openWebTools">
      <v-icon color="white">menu</v-icon>
    </v-btn>
    <span class="system-bar-title">{{ title }}</span>
    <v-spacer></v-spacer>
    <v-btn text icon small class="ma-0 title-bar-button" @click="minWindow">
      <v-icon color="white">remove</v-icon>
    </v-btn>
    <v-btn text icon small class="ma-0 title-bar-button" @click="maxWindow">
      <v-icon color="white">check_box_outline_blank</v-icon>
    </v-btn>
    <v-btn text icon small class="ma-0 title-bar-button" @click="closeWindow">
      <v-icon color="white">close</v-icon>
    </v-btn>
  </v-system-bar>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { VSystemBar, VBtn, VIcon, VSpacer } from "vuetify/lib";

@Component({ components: { VSystemBar, VBtn, VIcon, VSpacer } })
export default class InAppSystemBar extends Vue {
  @Prop() readonly title!: string;

  openWebTools() {
    this.$emit("openWebTools");
  }

  minWindow() {
    this.$emit("minimize");
  }

  maxWindow() {
    this.$emit("maximize");
  }

  closeWindow() {
    this.$emit("close");
  }
}
</script>

<style scoped>
.title-bar-button {
  -webkit-app-region: no-drag;
}
.system-bar-title {
  color: #eee;
  margin-left: 10px;
  margin-right: 10px;
}
</style>
