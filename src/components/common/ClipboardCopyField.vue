<template>
  <span>
    {{ field }}
    <v-tooltip right>
      <span
        slot="activator"
        v-clipboard="field"
        :key="field"
        @success="onFieldCopied"
        @error="onFieldCopyFailed"
      >
        <v-icon small>copy</v-icon>
      </span>
      <span>Copy to Clipboard</span>
    </v-tooltip>
  </span>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { showMessage } from "sitewhere-ide-common";

import { VTooltip } from "vuetify/lib";

@Component({ components: { VTooltip } })
export default class ClipboardCopyField extends Vue {
  /** Called after id is copied */
  onFieldCopied() {
    showMessage(this, "Value copied to clipboard.");
  }

  /** Called if unable to copy id */
  onFieldCopyFailed() {
    showMessage(this, "Unable to copy value to clipboard");
  }
}
</script>
