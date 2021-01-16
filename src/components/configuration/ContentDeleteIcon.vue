<template>
  <v-icon small class="trash" @click="onDeleteClicked">fa-trash</v-icon>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import { VIcon } from "vuetify/lib";

@Component({
  components: { VIcon }
})
export default class ContentDeleteIcon extends Vue {
  onDeleteClicked(): void {
    this.$emit("delete");
  }
}
</script>

<style scoped>
.trash {
  color: #ddd;
}
.trash:hover {
  color: #999;
}
</style>
