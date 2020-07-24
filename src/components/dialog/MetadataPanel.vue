<template>
  <dialog-form>
    <v-flex xs12>
      <v-data-table
        hide-default-footer
        :headers="headers"
        :items="metadata"
        :no-data-text="noDataMessage"
      >
        <template slot="item" slot-scope="props">
          <tr>
            <td width="250px" :title="props.item.name">
              {{
              props.item.name.length > 25
              ? props.item.name.substring(0, 25) + "..."
              : props.item.name
              }}
            </td>
            <td width="370px" :title="props.item.value">
              {{
              props.item.value.length > 50
              ? props.item.value.substring(0, 50) + "..."
              : props.item.value
              }}
            </td>
            <td v-if="!readOnly" width="20px">
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <v-btn
                    small
                    icon
                    v-on="on"
                    @click="onDeleteItem(props.item.name)"
                    slot="activator"
                  >
                    <v-icon small class="grey--text">fa-trash</v-icon>
                  </v-btn>
                </template>
                <span>Delete Item</span>
              </v-tooltip>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-flex>
    <v-flex xs12>
      <v-divider class="mb-5" />
    </v-flex>
    <v-flex xs12>
      <v-card color="#eee" outlined v-if="!readOnly">
        <v-container fluid>
          <v-layout>
            <v-flex xs5 class="pr-3">
              <v-text-field light label="Name" placeholder=" " v-model="newItemName" />
            </v-flex>
            <v-flex xs5>
              <v-text-field light label="Value" placeholder=" " v-model="newItemValue" />
            </v-flex>
            <v-flex xs2 class="pt-3 pl-3">
              <v-tooltip left>
                <template v-slot:activator="{ on }">
                  <v-btn
                    v-on="on"
                    icon
                    outlined
                    color="primary"
                    class="mt-1 ml-2"
                    @click="onAddItem"
                  >
                    <v-icon>add</v-icon>
                  </v-btn>
                </template>
                <span>Add Item</span>
              </v-tooltip>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-flex>
  </dialog-form>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import { ITableHeaders } from "sitewhere-ide-common";

import { DialogSection } from "../core/DialogSection";
import DialogForm from "../common/form/DialogForm.vue";

import {
  VCard,
  VDivider,
  VDataTable,
  VTooltip,
  VBtn,
  VIcon,
  VAlert,
  VContainer,
  VLayout,
  VFlex,
  VTextField,
} from "vuetify/lib";

import { arrayToMetadata, metadataToArray } from "sitewhere-ide-common";

@Component({
  components: {
    VCard,
    VDivider,
    DialogForm,
    VDataTable,
    VTooltip,
    VBtn,
    VIcon,
    VAlert,
    VContainer,
    VLayout,
    VFlex,
    VTextField,
  },
})
export default class MetadataPanel extends DialogSection {
  @Prop({ default: false }) readonly readOnly!: boolean;
  @Prop({ default: "No metadata has been assigned" })
  readonly noDataMessage!: string;
  @Prop({
    default: () => {
      return [5];
    },
  })
  readonly pageSizes!: number[];

  metadata: { name: string; value: string }[] = [];
  newItemName = "";
  newItemValue = "";
  error: string | null = null;

  /** Reset section content */
  reset(): void {
    this.metadata = [];
    this.error = null;
  }

  /** Perform validation */
  validate(): boolean {
    return true;
  }

  /** Load form data from an object */
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  load(input: any): void {
    const initial = input.metadata;
    if (initial) {
      this.metadata = metadataToArray(initial);
    }
  }

  /** Save form data to an object */
  save(): {} {
    const updated: {} = arrayToMetadata(this.metadata);
    return {
      metadata: updated,
    };
  }

  /** Delete an item */
  onDeleteItem(deleteName: string): void {
    const updated: { name: string; value: string }[] = [];
    this.metadata.forEach((item) => {
      if (item.name !== deleteName) {
        updated.push(item);
      }
    });
    this.metadata = updated;
  }

  // Let owner know an item was added.
  onAddItem() {
    const item: { name: string; value: string } = {
      name: this.newItemName,
      value: this.newItemValue,
    };

    // Check for empty.
    if (item.name.length === 0) {
      this.error = "Name must not be empty.";
    }

    // Check for bad characters.
    const regex = /^[\w-]+$/;
    if (!this.error && !regex.test(item.name)) {
      this.error = "Name contains invalid characters.";
    }

    if (!this.error) {
      this.metadata.push(item);
      this.newItemName = "";
      this.newItemValue = "";
      this.error = null;
    }
  }

  get headers(): ITableHeaders {
    if (!this.readOnly) {
      return [
        {
          align: "left",
          sortable: false,
          text: "Name",
          value: "name",
        },
        {
          align: "left",
          sortable: false,
          text: "Value",
          value: "value",
        },
        {
          align: "left",
          sortable: false,
          text: "Delete",
          value: "value",
        },
      ];
    } else {
      return [
        {
          align: "left",
          sortable: false,
          text: "Name",
          value: "name",
        },
        {
          align: "left",
          sortable: false,
          text: "Value",
          value: "value",
        },
      ];
    }
  }
}
</script>

