<template>
  <dialog-form>
    <v-flex xs12>
      <form-text
        required
        label="Name"
        title="Name displayed for remote."
        v-model="name"
        icon="info"
      >
        <span v-if="!$v.name.required && $v.$dirty">Name is required.</span>
      </form-text>
    </v-flex>
    <v-flex xs2>
      <form-select
        :items="protocols"
        title="Choose connection protocol"
        label="Protocol"
        item-text="text"
        item-value="value"
        v-model="protocol"
        icon="router"
      />
    </v-flex>
    <v-flex xs6>
      <form-text required class="ml-3" label="Hostname" title="Hostname for remote." v-model="host">
        <span v-if="!$v.host.required && $v.$dirty">Hostname is required.</span>
      </form-text>
    </v-flex>
    <v-flex xs3>
      <form-text
        required
        class="ml-3"
        type="number"
        label="Port"
        title="Port for remote."
        v-model="port"
      >
        <span v-if="!$v.port.required && $v.$dirty">Port is required.</span>
      </form-text>
    </v-flex>
    <v-flex xs1>
      <v-btn class="mb-0" color="primary" icon @click="onCreateClicked">
        <v-icon>add</v-icon>
      </v-btn>
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component } from "vue-property-decorator";
import { IRemoteConnection } from "sitewhere-ide-common";

import { generateUniqueId } from "../common/Utils";

import { DialogSection } from "../core/DialogSection";

import DialogForm from "../common/form/DialogForm.vue";
import FormText from "../common/form/FormText.vue";
import FormSelect from "../common/form/FormSelect.vue";

@Component({
  components: {
    DialogForm,
    FormText,
    FormSelect
  }
})
export default class RemoteConnectionDetails extends DialogSection {
  name: string | null = null;
  protocol: string | null = null;
  host: string | null = null;
  port: number | null = null;
  protocols: { text: string; value: string }[] = [
    {
      text: "http",
      value: "http"
    },
    {
      text: "https",
      value: "https"
    }
  ];

  /** Reset section content */
  reset(): void {
    this.name = null;
    this.protocol = null;
    this.host = null;
    this.port = null;
    // this.$v.$reset();
  }

  /** Perform validation */
  validate(): boolean {
    // this.$v.$touch();
    // return !this.$v.$invalid;
    return true;
  }

  /** Load form data from an object */
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  load(input: any): void {
    this.name = input.name;
    this.protocol = input.protocol;
    this.host = input.areaType.host;
    this.port = input.port;
  }

  /** Save form data to an object */
  save(): {} {
    return {
      id: generateUniqueId(),
      name: this.name,
      protocol: this.protocol,
      host: this.host,
      port: this.port
    };
  }

  /** Called when create button is clicked */
  onCreateClicked() {
    const added: IRemoteConnection = this.save() as IRemoteConnection;
    this.$emit("added", added);
    this.reset();
  }
}
</script>
