<template>
  <v-dialog v-model="visible" persistent eager :width="width">
    <v-card flat tile>
      <v-card flat tile class="pa-2 white--text" color="primary">
        <v-icon class="mr-2 mb-1" style="font-size: 20px;" dark>{{ icon }}</v-icon>
        <span style="font-size: 18px;">{{ title }}</span>
      </v-card>
      <slot name="error">
        <error-banner :error="error" />
      </slot>
      <slot name="header" />

      <v-card flat tile>
        <div style="position: relative;">
          <slot />
          <v-tabs v-model="active" v-if="tabbed">
            <slot name="tabs" />
            <slot name="tab-items" />
          </v-tabs>
          <loading-overlay v-if="!loaded" :loadingMessage="loadingMessage" />
        </div>
      </v-card>

      <v-divider v-if="!hideButtons" class="mb-2" />
      <v-card-actions v-if="!hideButtons">
        <v-spacer></v-spacer>
        <v-btn tile outlined color="primary" @click="onCancelClicked">
          {{
          cancelLabel
          }}
        </v-btn>
        <v-btn
          tile
          color="primary"
          v-if="!hideCreate"
          :disabled="invalid"
          @click="onCreateClicked"
        >{{ createLabel }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import Vue from "vue";

import ErrorBanner from "../common/ErrorBanner.vue";
import LoadingOverlay from "../common/LoadingOverlay.vue";

import { ITabbedComponent } from "sitewhere-ide-common";

import {
  VDialog,
  VCard,
  VIcon,
  VCardText,
  VTabs,
  VDivider,
  VCardActions,
  VSpacer,
  VBtn
} from "vuetify/lib";

@Component({
  components: {
    VDialog,
    VCard,
    VIcon,
    VCardText,
    VTabs,
    VDivider,
    VCardActions,
    VSpacer,
    VBtn,
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
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  onCancelClicked(e: any) {
    this.$emit("cancelClicked", e);
  }

  /** Handle create clicked */
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  onCreateClicked(e: any) {
    this.$emit("createClicked", e);
  }
}
</script>