<template>
  <v-dialog v-model="visible" persistent eager :width="width">
    <v-card>
      <v-card flat tile class="pa-2 white--text" color="primary">
        <v-icon class="mr-2 mb-1" style="font-size: 20px;" dark>delete</v-icon>
        <span style="font-size: 18px;">{{ title }}</span>
      </v-card>
      <v-alert
        class="ma-0"
        error
        v-bind:value="true"
        style="width: 100%"
        slot="error"
        v-if="error"
      >{{error}}</v-alert>
      <v-card-text class="pa-0">
        <slot>
          <div>Your content goes here!</div>
        </slot>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn outlined color="primary" @click="onCancelClicked">Cancel</v-btn>
        <v-btn color="primary" @click="onDeleteClicked">Delete</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import Vue from "vue";

import ErrorBanner from "../common/ErrorBanner.vue";

import {
  VDialog,
  VCard,
  VAlert,
  VCardText,
  VCardActions,
  VSpacer,
  VBtn,
  VIcon
} from "vuetify/lib";

@Component({
  components: {
    ErrorBanner,
    VDialog,
    VCard,
    VAlert,
    VCardText,
    VCardActions,
    VSpacer,
    VBtn,
    VIcon
  }
})
export default class DeleteDialog extends Vue {
  @Prop() readonly title!: string;
  @Prop() readonly width!: number;
  @Prop() readonly error!: string;
  @Prop({ default: false }) readonly visible!: boolean;

  /** Called after create button is clicked */
  onDeleteClicked() {
    this.$emit("delete");
  }

  /** Called after cancel button is clicked */
  onCancelClicked() {
    this.$emit("cancel");
  }
}
</script>
