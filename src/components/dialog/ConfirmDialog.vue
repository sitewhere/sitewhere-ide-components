<template>
  <v-dialog v-model="visible" persistent eager :width="width">
    <v-card>
      <v-card flat tile class="pa-2 white--text" color="primary">
        <v-icon class="mr-2 mb-1" style="font-size: 20px;" dark>fa-question-circle</v-icon>
        <span style="font-size: 18px;">{{ title }}</span>
      </v-card>
      <v-card-text>
        <slot>
          <div>Your content goes here!</div>
        </slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn outlined color="primary" @click="onCancelClicked">Cancel</v-btn>
        <v-btn color="primary" @click="onActionConfirmed">{{ buttonText || 'Ok' }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Vue from "vue";

import {
  VDialog,
  VCard,
  VToolbar,
  VToolbarTitle,
  VCardText,
  VCardActions,
  VSpacer,
  VBtn
} from "vuetify/lib";

@Component({
  components: {
    VDialog,
    VCard,
    VToolbar,
    VToolbarTitle,
    VCardText,
    VCardActions,
    VSpacer,
    VBtn
  }
})
export default class ConfirmDialog extends Vue {
  @Prop() readonly title!: string;
  @Prop() readonly width!: number;
  @Prop() readonly buttonText!: string;

  visible = false;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
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
  onCancelClicked() {
    this.$emit("cancelled");
    this.visible = false;
  }
}
</script>
