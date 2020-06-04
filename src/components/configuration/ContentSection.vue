<template>
  <v-card style="display: relative;" flat>
    <content-header :title="title" :icon="icon" :fa="fa" />
    <v-card flat style="margin-left: 40px;">
      <slot />
    </v-card>
    <div class="overlay">
      <slot name="overlay" />
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import ContentHeader from "./ContentHeader.vue";

import { VCard } from "vuetify/lib";

@Component({
  components: { ContentHeader, VCard }
})
export default class Section extends Vue {
  @Prop() readonly icon!: string;
  @Prop() readonly fa!: boolean;
  @Prop() readonly title!: string;
  @Prop() readonly help!: string;
}
</script>

<style scoped>
.overlay {
  position: absolute;
  left: 50%;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
