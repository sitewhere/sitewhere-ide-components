<template>
  <v-card class="list-entry" flat hover>
    <slot />
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import { VCard } from "vuetify/lib";

@Component({ components: { VCard } })
export default class ListEntry extends Vue {}
</script>

<style scoped>
.list-entry {
  border: 1px solid #eee;
}
</style>
