<template>
  <v-card flat class="mb-3">
    <v-icon :class="iconClass">{{ icon }}</v-icon>
    <span class="subtitle-1">{{ title }}:</span>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { VCard, VIcon } from "vuetify/lib";

@Component({
  components: { VCard, VIcon }
})
export default class ContentHeader extends Vue {
  @Prop() readonly title!: string;
  @Prop() readonly icon!: string;
  @Prop() readonly fa!: boolean;

  get iconClass(): string {
    return this.fa ? "icon-fa" : "icon-non-fa";
  }
}
</script>

<style scoped>
.icon-fa {
  font-size: 13px !important;
  width: 40px;
}
.icon-non-fa {
  font-size: 16px !important;
  width: 40px;
}
</style>
