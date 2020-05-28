<template>
  <v-list v-if="sections" dense>
    <v-list-group
      v-for="section in sections"
      :key="section.id"
      v-model="section.active"
      :prepend-icon="section.icon"
    >
      <template v-slot:activator>
        <v-list-item-title>{{ section.title }}</v-list-item-title>
      </template>

      <v-divider class="mb-4" />
      <v-list-item
        @click="onSectionClicked(subsection)"
        v-for="subsection in section.subsections"
        :key="subsection.id"
      >
        <v-list-item-title>{{ subsection.title }}</v-list-item-title>
        <v-list-item-icon>
          <v-icon>{{ subsection.icon }}</v-icon>
        </v-list-item-icon>
      </v-list-item>
      <v-divider class="mt-4" />
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
  VListItemIcon,
  VIcon,
  VDivider
} from "vuetify/lib";

@Component({
  components: {
    VList,
    VListGroup,
    VListItem,
    VListItemContent,
    VListItemTitle,
    VListItemIcon,
    VIcon,
    VDivider
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
