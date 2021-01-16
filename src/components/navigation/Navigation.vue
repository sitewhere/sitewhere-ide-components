<template>
  <v-list v-if="sections" dense>
    <div v-for="section in sections" :key="section.id">
      <v-list-item v-if="!section.subsections" @click="onSectionClicked(section)">
        <v-list-item-icon>
          <v-icon>{{ section.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{ section.title }}</v-list-item-title>
      </v-list-item>

      <v-list-group v-else :prepend-icon="section.icon" :value="containsSubsection(section)">
        <template v-slot:activator>
          <v-list-item-title>{{ section.title }}</v-list-item-title>
        </template>

        <v-divider class="mb-4" />
        <v-list-item
          v-for="subsection in section.subsections"
          :key="subsection.id"
          @click="onSectionClicked(subsection)"
        >
          <v-list-item-icon>
            <v-icon v-if="isSelectedSection(subsection)">star</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-if="isSelectedSection(subsection)">
              <strong>{{ subsection.title }}</strong>
            </v-list-item-title>
            <v-list-item-title v-else>{{ subsection.title }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon>{{ subsection.icon }}</v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-divider class="mt-4" />
      </v-list-group>
    </div>
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

  /** Check whether section is the currently selected */
  isSelectedSection(section: INavigationSection): boolean {
    const current: INavigationSection = this.$store.getters.currentSection;
    if (section && current) {
      return section.id === current.id;
    }
    return false;
  }

  /** Get currently selected section */
  containsSubsection(section: INavigationSection): boolean {
    const current: INavigationSection = this.$store.getters.currentSection;
    let contained = false;
    if (section.subsections) {
      section.subsections.forEach(section => {
        if (current.id === section.id) {
          contained = true;
        }
      });
    }
    return contained;
  }

  /** Called when a section is clicked */
  onSectionClicked(section: INavigationSection) {
    this.$emit("sectionSelected", section);
  }
}
</script>
