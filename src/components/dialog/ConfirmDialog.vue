<template>
  <v-dialog v-model="visible" persistent :width="width">
    <v-card>
      <v-toolbar dense flat card dark color="primary">
        <v-toolbar-title>{{title}}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <slot>
          <div>Your content goes here!</div>
        </slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn outline color="primary" @click="onCancelClicked">Cancel</v-btn>
        <v-btn color="primary" @click="onActionConfirmed">{{ buttonText || 'Ok' }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop } from "sitewhere-ide-common";
import Vue from "vue";

@Component({})
export default class ConfirmDialog extends Vue {
  @Prop() readonly title!: string;
  @Prop() readonly width!: number;
  @Prop() readonly buttonText!: string;

  visible: boolean = false;
  error: any = null;

  /** Called to open the dialog */
  open() {
    this.visible = true;
  }

  /** Called when action button is clicked */
  onActionConfirmed() {
    this.$emit("confirmed");
    this.visible = false;
  }

  /** Called after cancel button is clicked */
  onCancelClicked(e: any) {
    this.$emit("cancelled");
    this.visible = false;
  }
}
</script>
