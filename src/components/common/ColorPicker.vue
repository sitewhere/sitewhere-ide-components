<template>
  <v-menu offset-y top :close-on-content-click="false" v-model="menu">
    <v-btn
      :style="{ 'background-color' : currentColor, 'color': '#fff' }"
      slot="activator"
    >{{ text }}</v-btn>
    <picker :value="pickerColor" @input="onColorChosen" />
  </v-menu>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "sitewhere-ide-common";
import Vue from "vue";

import { Sketch as Picker } from "vue-color";

@Component({
  components: {
    Picker
  }
})
export default class ColorPicker extends Vue {
  @Prop() readonly value!: string;
  @Prop({ default: 1 }) readonly opacity!: string;
  @Prop() readonly text!: string;

  menu: boolean = false;
  currentColor: string | null = null;
  currentOpacity: number | null = null;

  @Watch("value")
  onValueChanged(val: string) {
    this.currentColor = val;
  }

  @Watch("opacity")
  onOpacityChanged(val: number) {
    this.currentOpacity = val;
  }

  /** Convert color into picker format */
  get pickerColor() {
    return {
      hex: this.currentColor,
      a: this.opacity
    };
  }

  /** Called when a color is chosen */
  onColorChosen(val: any) {
    this.currentColor = val.hex;
    this.$emit("input", val.hex);

    this.currentOpacity = val.a;
    this.$emit("opacityChanged", val.a);
  }
}
</script>
