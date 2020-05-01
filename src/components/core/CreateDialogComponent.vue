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
 * Base class for create dialogs.
 */
export default class CreateDialogComponent<T, R> extends Vue {
  /** Get wrapped dialog */
  getDialog(): any {
    throw new Error("Create dialog must implement getDialog().");
  }

  /** Open wrapped dialog */
  open() {
    this.getDialog().reset();
    this.getDialog().openDialog();
  }

  /** Load dialog then open it */
  loadAndOpen(payload: any) {
    this.getDialog().reset();
    this.getDialog().load(payload);
    this.getDialog().openDialog();
  }

  /** Implemented in subclasses to save payload */
  save(payload: R): AxiosPromise<T> | T {
    throw new Error("Create dialog must implement save().");
  }

  /** Implemented in subclasses for after-save */
  afterSave(payload: T): void {}

  /** Type guard to differentiate between responses */
  isAxiosResponse(
    response: AxiosResponse<any> | any
  ): response is AxiosResponse<any> {
    return (<AxiosResponse<any>>response).data !== undefined;
  }

  /** Handle payload commit */
  async commit(payload: R) {
    try {
      let response: AxiosResponse<any> | any = await this.save(payload);
      let created: any = this.isAxiosResponse(response)
        ? response.data
        : response;
      this.afterSave(created);
      this.$emit("created", created);
      this.getDialog().closeDialog();
    } catch (err) {
      showError(this as any, err);
    }
  }
}
</script>
