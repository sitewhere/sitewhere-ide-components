<template>
  <v-toolbar flat dark dense card color="primary" class="tb" height="38">
    <slot name="icon" />
    <v-toolbar-title class="white--text body-2 ml-2">{{ title }}</v-toolbar-title>
    <slot name="left" />
    <v-spacer></v-spacer>
    <slot />
  </v-toolbar>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { VToolbar, VToolbarTitle, VSpacer } from "vuetify/lib";

@Component({
  components: {
    VToolbar,
    VToolbarTitle,
    VSpacer
  }
})
export default class CondensedToolbar extends Vue {
  @Prop() readonly title!: string;
}
</script>

<style scoped>
.tb >>> .v-toolbar__content {
  padding: 0 10px;
}
</style>
