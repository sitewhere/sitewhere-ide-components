<template>
  <v-container fluid class="pa-0 mb-3">
    <v-layout wrap>
      <v-flex xs6>
        <v-text-field
          :label="text"
          placeholder=" "
          v-model="updatedColor"
          prepend-icon="color_lens"
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-menu offset-y top :close-on-content-click="false" v-model="menu">
          <v-btn :style="{ 'background-color' : valueOrDefault }" slot="activator"></v-btn>
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
