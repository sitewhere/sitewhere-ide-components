<template>
  <div class="mb-3">
    <v-text-field
      :required="required"
      :title="title"
      class="form-token-input"
      label="Token"
      placeholder=" "
      v-model="wrapped"
      hide-details
      prepend-icon="vpn_key"
    />
    <div class="verror">
      <slot>
        <span
          v-if="!validator.token.required && validator.$dirty"
        >{{ label || "Token" }} is required.</span>
        <span v-if="!validator.token.validToken && validator.$dirty">
          {{ label || "Token" }} is not valid (Alphanumeric with '-' or
          '_').
        </span>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { VTextField } from "vuetify/lib";

@Component({ components: { VTextField } })
export default class FormToken extends Vue {
  @Prop() readonly title!: string;
  @Prop() readonly label!: string;
  @Prop() readonly required!: boolean;
  @Prop() readonly value!: string;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  @Prop() readonly validator!: any;

  get wrapped(): string {
    return this.value;
  }

  set wrapped(updated: string) {
    this.$emit("input", updated);
  }
}
</script>

<style scoped>
.form-token-input >>> i.v-icon {
  font-size: 16px;
  color: #ccc;
}
</style>