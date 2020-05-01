<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { Validation } from "vuelidate";

/**
 * Base class for dialog sections.
 */
@Component
export default class DialogSection extends Vue {
  /** Called on component create */
  created(): void {
    this.reset();
  }

  /** Reset section content */
  reset(): void {
    throw new Error("Reset not implemented in dialog section.");
  }

  /** Validate fields in the dialog section */
  validate(): boolean {
    return true;
  }

  /** Load form data from an object */
  load(input: {}): void {}

  /** Save form data to an object */
  save(): {} {
    return {};
  }
}
</script>

