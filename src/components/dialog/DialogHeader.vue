<template>
  <v-card flat style="background-color: #f5f5f5; border-bottom: 1px solid #eee;">
    <slot />
  </v-card>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import Vue from "vue";

@Component({})
export default class DialogHeader extends Vue {}
</script>
