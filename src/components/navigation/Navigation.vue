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
        <v-list-tile @click="onSectionClicked(section)">
          <v-list-tile-content>
            <v-list-tile-title>{{ section.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>

      <v-list-tile
        @click="onSectionClicked(subsection)"
        v-for="subsection in section.subsections"
        :key="subsection.id"
      >
        <v-list-tile-content>
          <v-list-tile-title>{{ subsection.title }}</v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon>{{ subsection.icon }}</v-icon>
        </v-list-tile-action>
      </v-list-tile>
    </v-list-group>
  </v-list>
</template>

<script lang="ts">
import { Component, Prop, INavigationSection } from "sitewhere-ide-common";
import Vue from "vue";

@Component({})
export default class Navigation extends Vue {
  @Prop() readonly sections!: INavigationSection[];

  /** Called when a section is clicked */
  onSectionClicked(section: INavigationSection) {
    this.$emit("sectionSelected", section);
  }
}
</script>

<style scoped>
.list__tile__action {
  min-width: 30px;
}
.list__tile__title {
  font-size: 16px;
}
</style>
