<template>
  <v-snackbar v-if="error" v-model="errorDisplayed" class="error-banner" :timeout="5000" error>
    {{ errorMessage }}
    <v-btn dark text @click.native="errorDisplayed = false">Close</v-btn>
  </v-snackbar>
</template>


<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

import { VSnackbar, VBtn } from "vuetify/lib";

@Component({ components: { VSnackbar, VBtn } })
export default class ErrorBanner extends Vue {
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  @Prop() readonly error!: any;

  errorDisplayed = false;

  @Watch("error", { immediate: true })
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  onErrorUpdated(updated: any) {
    if (updated) {
      if (this.error.response && this.error.response.status == 503) {
        this.$data.errorDisplayed = false;
      } else if (this.error.response || this.error.message) {
        this.$data.errorDisplayed = true;
      }
    }
  }

  /** Get error message text */
  get errorMessage() {
    if (!this.error) {
      return "";
    } else if (this.error.response && this.error.response.headers) {
      if (this.error.response.headers["x-sitewhere-error"]) {
        return this.error.response.headers["x-sitewhere-error"];
      } else if (this.error.response.status === 403) {
        return "Server Authentication Failed";
      }
    }
    return this.error.message;
  }
}
</script>

<style scoped>
.error-banner {
  z-index: 2000;
}
</style>
