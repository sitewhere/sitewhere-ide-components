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

import DialogComponent from "./DialogComponent.vue";

/**
 * Base class for edit dialogs.
 */
export default class EditDialogComponent<T, R> extends Vue {
  record: any | null = null;
  loaded: boolean = false;

  /** Get wrapped dialog */
  getDialog(): any {
    throw new Error("Edit dialog must implement getDialog().");
  }

  /**
   * Prepare load for the given identifier.
   * @param identifier
   */
  prepareLoad(identifier: string | null): AxiosPromise<T> | T {
    throw new Error("Edit dialog must implement load().");
  }

  /** Type guard to differentiate between responses */
  isAxiosResponse(
    response: AxiosResponse<T> | T
  ): response is AxiosResponse<T> {
    return (<AxiosResponse<T>>response).data !== undefined;
  }

  /**
   * Load record for identifer and open dialog.
   * @param identifier
   */
  async open(identifier: string | null) {
    this.getDialog().openDialog();
    this.getDialog().reset();
    this.loaded = false;
    try {
      let response: AxiosResponse<T> | T = await this.prepareLoad(identifier);
      this.record = this.isAxiosResponse(response) ? response.data : response;
      this.getDialog().load(this.record);
    } catch (err) {
      showError(this, err);
    }
    this.loaded = true;
  }

  /** Implemented in subclasses to save payload */
  prepareSave(original: T, updated: R): AxiosPromise<T> | T {
    throw new Error("Edit dialog must implement save().");
  }

  /** Handle payload commit */
  async save(payload: R) {
    if (!this.record) {
      throw new Error("Unable to update. Record is null.");
    }
    try {
      let response: AxiosResponse<any> | any = await this.prepareSave(
        this.record,
        payload
      );
      let updated: any = this.isAxiosResponse(response)
        ? response.data
        : response;
      this.afterSave(updated);
      this.$emit("updated", updated);
      this.getDialog().closeDialog();
    } catch (err) {
      showError(this, err);
    }
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: T): void {}
}
</script>
