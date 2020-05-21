<template>
  <v-list v-if="sections" dense>
    <v-list-group
      v-for="section in sections"
      :key="section.id"
      v-model="section.active"
      :prepend-icon="section.icon"
      :append-icon="section.subsections ? '$vuetify.icons.expand' : ''"
      no-action
    >
      <template v-slot:activator>
        <v-list-item @click="onSectionClicked(section)">
          <v-list-item-content>
            <v-list-item-title>{{ section.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-list-item
        @click="onSectionClicked(subsection)"
        v-for="subsection in section.subsections"
        :key="subsection.id"
      >
        <v-list-item-content>
          <v-list-item-title>{{ subsection.title }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon>{{ subsection.icon }}</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list-group>
  </v-list>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { INavigationSection } from "sitewhere-ide-common";

import {
  VList,
  VListGroup,
  VListItem,
  VListItemContent,
  VListItemTitle,
  VListItemAction,
  VIcon
} from "vuetify/lib";

@Component({
  components: {
    VList,
    VListGroup,
    VListItem,
    VListItemContent,
    VListItemTitle,
    VListItemAction,
    VIcon
  }
})
export default class Navigation extends Vue {
  @Prop() readonly sections!: INavigationSection[];

  /** Called when a section is clicked */
  onSectionClicked(section: INavigationSection) {
    this.$emit("sectionSelected", section);
  }
}
</script>
