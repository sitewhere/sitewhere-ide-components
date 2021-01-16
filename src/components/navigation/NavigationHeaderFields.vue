<template>
  <v-card tile class="ma-2" flat>
    <slot />
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import { VCard } from "vuetify/lib";

@Component({ components: { VCard } })
export default class NavigationHeaderFields extends Vue {}
</script>
