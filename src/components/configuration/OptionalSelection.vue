<template>
  <v-card flat tile :width="width">
    <v-row>
      <v-col cols="7" class="pl-3 pt-3 ma-0">
        <v-checkbox class="pa-0 ma-0" dense hide-details v-model="chosen">
          <template v-slot:label>
            <span class="body-2">{{checkboxTitle}}</span>
          </template>
        </v-checkbox>
      </v-col>
      <v-col cols="5" class="pa-0 ma-0">
        <selection
          class="pt-1"
          v-show="chosen"
          :items="items"
          :title="selectTitle"
          :label="selectLabel"
          :item-text="selectItemText"
          :item-value="selectItemValue"
          v-model="selected"
        />
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

import Selection from "./Selection.vue";

import { VCard, VRow, VCol, VCheckbox } from "vuetify/lib";

@Component({
  components: {
    VCard,
    VRow,
    VCol,
    VCheckbox,
    Selection
  }
})
export default class OptionalSelection extends Vue {
  @Prop() readonly value!: string | null;
  @Prop() readonly width!: string;
  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  @Prop() readonly items!: any[];
  @Prop() readonly checkboxTitle!: string;
  @Prop() readonly selectLabel!: string;
  @Prop() readonly selectTitle!: string;
  @Prop() readonly selectItemText!: string;
  @Prop() readonly selectItemValue!: string;

  chosen = false;
  selected: string | null = null;

  @Watch("chosen")
  onChosenChanged(updated: boolean) {
    if (!updated) {
      this.selected = null;
    }
  }

  @Watch("value", { immediate: true })
  onValueChanged(updated: string) {
    this.chosen = updated != null;
    this.selected = updated;
  }

  @Watch("selected")
  onSelectionChanged(updated: string) {
    this.$emit("input", updated);
  }
}
</script>