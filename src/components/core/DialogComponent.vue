<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

/**
 * Base class for dialog components.
 */
@Component
export default class DialogComponent<T> extends Vue {
  @Prop() readonly title!: string;
  @Prop() readonly width!: number;
  @Prop() readonly createLabel!: string;
  @Prop() readonly cancelLabel!: string;
  @Prop({ default: true }) readonly loaded!: boolean;

  dialogVisible: boolean = false;
  error: string | null = null;

  /** Reset dialog content */
  reset(): void {
    throw new Error("Reset not implemented in dialog.");
  }

  /** Load dialog from model */
  load(model: T): void {
    throw new Error("Load not implemented in dialog.");
  }

  /** Called to open the dialog */
  openDialog() {
    this.dialogVisible = true;
  }

  /** Called to open the dialog */
  closeDialog() {
    this.dialogVisible = false;
  }

  /** Called to show an error message */
  showError(error: string) {
    this.error = error;
  }

  /** Action invoked when create is clicked */
  onCreateClicked(e: any) {}

  /** Action invoked when cancel is clicked */
  onCancelClicked(e: any) {
    this.closeDialog();
  }
}
</script>

