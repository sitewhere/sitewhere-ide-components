<template>
  <div>
    <div class="subtitle-2">{{ title }}</div>
    <v-divider class="mt-1 mb-3" style="width: 50%" />
    <v-card flat class="mb-3 caption" style="width: 50%">{{ description }}</v-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { VDivider, VCard } from "vuetify/lib";

@Component({
  components: { VDivider, VCard }
})
export default class SectionOverview extends Vue {
  @Prop() readonly title!: string;
  @Prop() readonly description!: string;
}
</script>
