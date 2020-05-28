<template>
  <div>
    <v-card class="pa-4 body-2" flat color="#f5f5f5">
      <slot />
    </v-card>
    <v-divider />
  </div>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Vue from "vue";

import { VCard, VDivider } from "vuetify/lib";

@Component({ components: { VCard, VDivider } })
export default class DialogHeader extends Vue {}
</script>
