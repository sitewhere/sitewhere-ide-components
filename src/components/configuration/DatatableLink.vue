<template>
  <a @click="onLinkClicked" class="clink">{{ text }}</a>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { VCard } from "vuetify/lib";

@Component({
  components: { VCard }
})
export default class DatatableLink extends Vue {
  @Prop() readonly text!: string;

  onLinkClicked() {
    this.$emit("linkClicked");
  }
}
</script>

<style scoped>
.clink {
  color: #2255cc;
}
.clink:hover {
  text-decoration: underline;
}
</style>
