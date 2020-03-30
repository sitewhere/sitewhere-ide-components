<template>
  <v-card :color="alt ? '#fafafa' : '#ffffff'" flat class="caption mb-1">
    <span style="display: inline-block; width: 180px; font-weight: 700">{{
      name
    }}</span>
    <span style="display: inline-block; width: 400px;">{{ displayValue }}</span>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "sitewhere-ide-common";

@Component({
  components: {}
})
export default class ContentField extends Vue {
  @Prop() readonly name!: string;
  @Prop() readonly value!: string;
  @Prop() readonly alt!: boolean;
  @Prop() readonly password!: boolean;

  get displayValue(): string {
    return this.password ? "***" : this.value;
  }
}
</script>

<style scoped></style>
