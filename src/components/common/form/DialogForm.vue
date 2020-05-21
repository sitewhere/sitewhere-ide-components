<template>
  <v-container fluid class="pa-3">
    <v-layout class="pl-2 pr-2 pt-0 pb-0" wrap>
      <slot />
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { VContainer, VLayout } from "vuetify/lib";

@Component({ components: { VContainer, VLayout } })
export default class DialogForm extends Vue {}
</script>
