<template>
  <v-data-table
    v-model="selected"
    class="scrolling-list"
    :headers="headers"
    :items="all"
    item-key="token"
    hide-default-footer
    show-select
  >
    <template v-slot:item.avatar="{ item }">
      <v-avatar size="36px">
        <img :src="item.imageUrl" v-if="item.imageUrl" />
        <v-icon v-else-if="item.icon" class="grey--text" size="2x">{{item.icon}}</v-icon>
      </v-avatar>
    </template>
    <template v-slot:item.name="{ item }">
      <span class="subheading">{{ item.name }}</span>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import Vue from "vue";

import { IBrandedEntity } from "sitewhere-rest-api";

import { VDataTable, VCheckbox, VAvatar, VIcon } from "vuetify/lib";

@Component({ components: { VDataTable, VCheckbox, VAvatar, VIcon } })
export default class Multichooser extends Vue {
  @Prop() readonly value!: string[];
  @Prop() readonly all!: IBrandedEntity[];
  @Prop({ default: false }) readonly idMode!: boolean;

  selected: IBrandedEntity[] = [];
  headers: {}[] = [
    { text: "Icon", value: "avatar", width: "10%" },
    { text: "Name", value: "name", width: "90%" },
  ];

  @Watch("value", { immediate: true })
  onValueUpdated(updated: string[]) {
    if (updated) {
      if (
        this.selected.length != updated.length ||
        !this.selected.every((e) => updated.includes(e.token))
      ) {
        const selection: IBrandedEntity[] = [];
        if (this.idMode) {
          this.all.forEach((item) => {
            if (updated.indexOf(item.id) > -1) {
              selection.push(item);
            }
          });
        } else {
          this.all.forEach((item) => {
            if (updated.indexOf(item.token) > -1) {
              selection.push(item);
            }
          });
        }
        this.selected = selection;
      }
    } else {
      this.selected = [];
    }
  }

  @Watch("selected", { immediate: true })
  onSelectionUpdated() {
    const selection: string[] = [];
    this.selected.forEach((item) => {
      selection.push(item.token);
    });
    this.$emit("input", selection);
  }
}
</script>

<style scoped>
.scrolling-list {
  max-height: 300px;
  overflow-y: auto;
}
</style>
