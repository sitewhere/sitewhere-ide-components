<template>
  <div>
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { AxiosPromise, AxiosResponse } from "axios";
import { showError } from "sitewhere-ide-common";

/**
 * Base class for delete dialog components.
 */
@Component
export default class DeleteDialogComponent<T> extends Vue {
  @Prop() readonly title!: string;
  @Prop() readonly width!: number;

  record: any | null = null;
  visible: boolean = false;
  error: string | null = null;

  /**
   * Load object to be deleted.
   * @param identifier
   */
  prepareLoad(identifier: string): AxiosPromise<T> | T {
    throw new Error("Load not implemented in dialog.");
  }

  /** Type guard to differentiate between responses */
  isAxiosResponse(
    response: AxiosResponse<T> | T
  ): response is AxiosResponse<T> {
    return (<AxiosResponse<T>>response).data !== undefined;
  }

  /** Called after record is loaded */
  afterLoad(record: T): void {}

  /**
   * Load data, then open dialog.
   * @param identifier
   */
  async open(identifier: string) {
    try {
      let response: AxiosResponse<T> | T = await this.prepareLoad(identifier);
      this.record = this.isAxiosResponse(response) ? response.data : response;
      this.visible = true;
      this.afterLoad(this.record);
    } catch (err) {
      showError(this, err);
    }
  }

  /** Return method to delete record */
  prepareDelete(record: T): AxiosPromise<T> | T {
    throw new Error("Delete not implemented in dialog.");
  }

  /** Action invoked when delete is clicked */
  async delete() {
    if (!this.record) {
      throw new Error("Unable to delete. Record is null.");
    }
    try {
      let response: AxiosResponse<T> | T = await this.prepareDelete(
        this.record
      );
      this.record = this.isAxiosResponse(response) ? response.data : response;
      this.$emit("deleted", this.record);
      this.closeDialog();
    } catch (err) {
      showError(this, err);
    }
  }

  /** Action invoked when cancel is clicked */
  cancel() {
    this.closeDialog();
  }

  /** Called to open the dialog */
  closeDialog() {
    this.visible = false;
  }

  /** Called to show an error message */
  showError(error: string) {
    this.error = error;
  }
}
</script>
