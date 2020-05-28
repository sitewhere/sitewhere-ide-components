<template>
  <v-container class="ma-0 pa-0" fluid>
    <v-layout wrap>
      <v-flex xs8>
        <v-text-field
          :label="text"
          class="text-field-input"
          placeholder=" "
          v-model="updatedColor"
          prepend-icon="color_lens"
        />
      </v-flex>
      <v-flex xs4>
        <v-menu offset-y top :close-on-content-click="false" v-model="menu">
          <template v-slot:activator="{ on }">
            <v-btn class="mt-3 ml-3" v-on="on" :style="{ 'background-color' : valueOrDefault }" />
          </template>
          <chrome :value="valueOrDefault" @input="onColorChosen" />
        </v-menu>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import Vue from "vue";

import {
  VContainer,
  VLayout,
  VFlex,
  VTextField,
  VMenu,
  VBtn
} from "vuetify/lib";

import { Chrome } from "vue-color";

@Component({
  components: {
    Chrome,
    VContainer,
    VFlex,
    VLayout,
    VTextField,
    VMenu,
    VBtn
  }
})
export default class ColorInputField extends Vue {
  @Prop() readonly value!: string;
  @Prop() readonly text!: string;

  menu: string | null = null;
  updatedColor: string | null = null;

  @Watch("value")
  onValueChanged(val: string) {
    this.updatedColor = val;
  }

  get valueOrDefault() {
    return this.updatedColor || "#fff";
  }

  /** Called when color is chosen */
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  onColorChosen(val: any) {
    this.updatedColor = val.hex;
    this.$emit("input", val.hex);
    this.$emit("opacityChanged", val.a);
  }
}
</script>

<style scoped>
.text-field-input >>> i.v-icon {
  font-size: 16px;
  color: #ccc;
}
</style>