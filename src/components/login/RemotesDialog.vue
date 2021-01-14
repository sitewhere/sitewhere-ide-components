<template>
  <base-dialog
    ref="dialog"
    :icon="icon"
    title="Edit Remote Connection Settings"
    :loaded="loaded"
    :visible="dialogVisible"
    createLabel="Ok"
    cancelLabel="Cancel"
    @createClicked="onCreateClicked"
    @cancelClicked="onCancelClicked"
  >
    <v-card flat class="ma-2">
      <remote-instances-list :remotes="remotes" />
    </v-card>
    <v-divider />
    <v-card flat class="ml-2 mr-2 mb-0 mt-4">
      <remote-instances-details class="pa-1" @added="onConnectionAdded" />
    </v-card>
  </base-dialog>
</template>

<script lang="ts">
import { Component, Ref } from "vue-property-decorator";
import { ITabbedComponent, NavigationIcon } from "sitewhere-ide-common";
import { DialogComponent } from "../core/DialogComponent";
import { DialogSection } from "../core/DialogSection";

import BaseDialog from "../dialog/BaseDialog.vue";
import RemoteInstancesList from "./RemoteInstancesList.vue";
import RemoteInstanceDetails from "./RemoteInstanceDetails.vue";

import { VCard, VDivider } from "vuetify/lib";

import { IRemoteInstances, IRemoteInstance } from "sitewhere-ide-common";

@Component({
  components: {
    BaseDialog,
    RemoteInstancesList,
    RemoteInstanceDetails,
    VCard,
    VDivider,
  },
})
export default class RemotesDialog extends DialogComponent<IRemoteInstances> {
  @Ref() readonly dialog!: ITabbedComponent;
  @Ref() readonly connections!: DialogSection;

  remotes: IRemoteInstances | null = null;

  /** Get icon for dialog */
  get icon(): NavigationIcon {
    return NavigationIcon.Remotes;
  }

  // Reset dialog contents.
  reset() {
    if (this.connections) {
      this.connections.reset();
    }
  }

  // Load dialog from a given payload.
  load(payload: IRemoteInstances) {
    this.remotes = JSON.parse(JSON.stringify(payload));
    this.reset();
    if (this.connections) {
      this.connections.load(payload);
    }
  }

  // Called when a new instance is added.
  onConnectionAdded(added: IRemoteInstance) {
    if (this.remotes) {
      this.remotes.instances.push(added);
    }
  }

  // Called after create button is clicked.
  onCreateClicked() {
    this.$emit("save", this.remotes);
  }
}
</script>
