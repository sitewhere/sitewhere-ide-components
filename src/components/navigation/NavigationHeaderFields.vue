<template>
  <v-card class="mt-2" flat>
    <slot />
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

@Component({})
export default class NavigationHeaderFields extends Vue {}
</script>
