<template>
  <v-dialog v-model="visible" :lazy="lazy" persistent :width="width">
    <v-card>
      <v-toolbar dense flat card dark class="mb-0" color="primary">
        <v-toolbar-title>
          <v-icon class="mr-1">{{ icon }}</v-icon>
          {{title}}
        </v-toolbar-title>
      </v-toolbar>
      <error-banner :error="error"></error-banner>

      <v-card-text class="pa-0">
        <div style="position: relative;">
          <slot />
          <v-tabs v-model="active" v-if="tabbed">
            <slot name="tabs" />
            <slot name="tab-items" />
          </v-tabs>
          <loading-overlay v-if="!loaded" :loadingMessage="loadingMessage" />
        </div>
      </v-card-text>
      <v-divider v-if="!hideButtons" class="mt-2 mb-2" />
      <v-card-actions v-if="!hideButtons">
        <v-spacer></v-spacer>
        <v-btn outline color="primary" @click="onCancelClicked">{{cancelLabel}}</v-btn>
        <v-btn
          color="primary"
          v-if="!hideCreate"
          :disabled="invalid"
          @click="onCreateClicked"
        >{{createLabel}}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "sitewhere-ide-common";
import Vue from "vue";

import ErrorBanner from "../common/ErrorBanner.vue";
import LoadingOverlay from "../common/LoadingOverlay.vue";

import { ITabbedComponent } from "sitewhere-ide-common";

@Component({
  components: {
    ErrorBanner,
    LoadingOverlay
  }
})
export default class BaseDialog extends Vue implements ITabbedComponent {
  @Prop() readonly title!: string;
  @Prop({ default: 600 }) readonly width!: number;
  @Prop() readonly icon!: string;
  @Prop({ default: true }) readonly visible!: boolean;
  @Prop({ default: true }) readonly tabbed!: boolean;
  @Prop() readonly createLabel!: string;
  @Prop() readonly cancelLabel!: string;
  @Prop() readonly error!: string;
  @Prop() readonly hideButtons!: boolean;
  @Prop() readonly hideCreate!: boolean;
  @Prop() readonly invalid!: boolean;
  @Prop({ default: false }) readonly lazy!: boolean;
  @Prop({ default: true }) readonly loaded!: boolean;
  @Prop({ default: "Loading..." }) readonly loadingMessage!: string;

  active: number | null = null;

  @Watch("active", { immediate: true })
  onTabSelected(updated: string) {
    this.$emit("tabSelected", updated);
  }

  /** Set the active tab */
  setActiveTab(tab: number): void {
    this.$nextTick(() => {
      this.active = tab;
    });
  }

  /** Handle cancel clicked */
  onCancelClicked(e: any) {
    this.$emit("cancelClicked", e);
  }

  /** Handle create clicked */
  onCreateClicked(e: any) {
    this.$emit("createClicked", e);
  }
}
</script>

<style scoped>
</style>
