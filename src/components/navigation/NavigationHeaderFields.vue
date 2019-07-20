<template>
  <v-card class="mt-2" flat>
    <slot />
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "sitewhere-ide-common";

@Component({})
export default class NavigationHeaderFields extends Vue {}
</script>
