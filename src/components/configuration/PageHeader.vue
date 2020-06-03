<template>
  <v-card flat class="subtitle-1 pb-1 mb-5" style="border-bottom: 1px solid #f0f0f0">{{ text }}</v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { VCard } from "vuetify/lib";

@Component({
  components: { VCard }
})
export default class PageHeader extends Vue {
  @Prop() readonly text!: string;
}
</script>
