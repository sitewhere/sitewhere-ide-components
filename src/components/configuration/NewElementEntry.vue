<template>
  <div>
    <v-card flat>
      <v-card-text class="elm-entry" @click="onElementClicked">
        <v-icon small class="mr-2">{{ icon }}</v-icon>
        <slot />
      </v-card-text>
    </v-card>
    <v-divider />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { VCard, VCardText, VIcon } from "vuetify/lib";

@Component({
  components: { VCard, VCardText, VIcon }
})
export default class NewElementChooser extends Vue {
  @Prop() readonly icon!: string;
  @Prop() readonly itemId!: string;

  /** Called when the element is clicked */
  onElementClicked(): void {
    this.$emit("chosen", this.itemId);
  }
}
</script>

<style scoped>
.elm-entry {
  cursor: pointer;
  border-left: 5px solid transparent;
}
.elm-entry:hover {
  border-left: 5px solid #ccc;
  background-color: #eee;
}
</style>
