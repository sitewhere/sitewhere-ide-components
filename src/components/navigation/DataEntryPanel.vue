<template>
  <v-container fluid>
    <v-layout wrap>
      <slot />
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import { VContainer, VLayout } from "vuetify/lib";

@Component({
  components: { VContainer, VLayout }
})
export default class DataEntryPanel extends Vue {}
</script>
