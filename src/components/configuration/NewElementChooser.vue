<template>
  <base-dialog
    ref="dialog"
    :icon="icon"
    :title="title"
    :width="width"
    :loaded="true"
    :visible="dialogVisible"
    :tabbed="false"
    :hideCreate="true"
    cancelLabel="Cancel"
    @cancelClicked="closeDialog"
  >
    <v-card class="scroll-chooser" flat>
      <slot />
    </v-card>
  </base-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Refs } from "sitewhere-ide-common";
import { ITabbedComponent } from "sitewhere-ide-common";

import BaseDialog from "../dialog/BaseDialog.vue";

@Component({
  components: { BaseDialog }
})
export default class NewElementChooser extends Vue {
  @Prop() readonly icon!: string;
  @Prop() readonly title!: string;
  @Prop() readonly width!: number;

  dialogVisible: boolean = false;

  /** References */
  $refs!: Refs<{
    dialog: ITabbedComponent;
  }>;

  /** Open dialog */
  openDialog(): void {
    this.dialogVisible = true;
  }

  /** Close dialog */
  closeDialog(): void {
    this.dialogVisible = false;
  }
}
</script>

<style scoped>
.scroll-chooser {
  max-height: 300px;
  overflow-y: auto;
}
</style>
