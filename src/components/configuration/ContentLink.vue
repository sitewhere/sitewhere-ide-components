<template>
  <div>
    <a @click="onLinkClicked" class="clink body-2">{{ text }}</a>
    <v-icon class="ilink">{{ icon }}</v-icon>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { VCard, VIcon } from "vuetify/lib";

@Component({
  components: { VCard, VIcon }
})
export default class ContentLink extends Vue {
  @Prop() readonly icon!: string;
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
.ilink {
  color: #2255cc;
  line-height: 1.17;
  font-size: 11px;
  margin-left: 5px;
}
</style>
