<template>
  <div>
    <div v-if="selected">
      <v-card flat tile color="transparent" class="body-2 pb-0 mb-0">{{ chosenText }}</v-card>
      <v-list two-line dense>
        <v-list-item :key="selected.token">
          <v-list-item-avatar>
            <img :src="selected.imageUrl" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html="selected.name"></v-list-item-title>
            <v-list-item-subtitle v-html="selected.description"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon ripple @click.stop="onRemoved(true)">
              <v-icon class="grey--text">delete</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </div>
    <div v-else>
      <v-card flat tile color="transparent" class="body-2 pb-0 mb-0">{{ notChosenText }}</v-card>
      <v-list v-if="all" class="scrolling-list" two-line dense>
        <template v-for="item in all">
          <v-list-item :key="item.token" @click="onSelected(item, true)">
            <v-list-item-avatar>
              <img :src="item.imageUrl" />
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-html="item.name"></v-list-item-title>
              <v-list-item-subtitle v-html="item.description"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch } from "vue-property-decorator";
import Vue from "vue";

import {
  VCard,
  VList,
  VListItem,
  VListItemAvatar,
  VListItemContent,
  VListItemTitle,
  VListItemSubtitle,
  VListItemAction,
  VBtn,
  VIcon
} from "vuetify/lib";

import { IBrandedEntity } from "sitewhere-rest-api";

@Component({
  components: {
    VCard,
    VList,
    VListItem,
    VListItemAvatar,
    VListItemContent,
    VListItemTitle,
    VListItemSubtitle,
    VListItemAction,
    VBtn,
    VIcon
  }
})
export default class Chooser extends Vue {
  @Prop() readonly value!: string;
  @Prop() readonly chosenText!: string;
  @Prop() readonly notChosenText!: string;
  @Prop() readonly all!: IBrandedEntity[];

  selected: IBrandedEntity | null = null;

  @Watch("value", { immediate: true })
  onValueChanged(updated: string) {
    this.onValueUpdated(updated);
  }

  /** Called to update choice based on token */
  onValueUpdated(token: string) {
    let found = false;
    this.all.forEach(item => {
      if (item.token === token) {
        found = true;
        this.onSelected(item, false);
      }
    });
    if (!found) {
      this.onRemoved(false);
    }
  }

  /** Called to select an item */
  onSelected(entity: IBrandedEntity, emit: boolean) {
    this.selected = entity;
    if (emit) {
      this.$emit("selected", entity.token);
    }
  }

  /** Called to remove selection */
  onRemoved(emit: boolean) {
    this.selected = null;
    if (emit) {
      this.$emit("selected", null);
    }
  }
}
</script>

<style scoped>
.scrolling-list {
  max-height: 300px;
  overflow-y: auto;
}
</style>
