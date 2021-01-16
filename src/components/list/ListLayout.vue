<template>
  <v-container class="pa-2" fluid grid-list-md fill-height>
    <v-layout align-content-start wrap>
      <slot />
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import { VContainer, VLayout } from "vuetify/lib";

@Component({ components: { VContainer, VLayout } })
export default class ListLayout extends Vue {}
</script>
