<template>
  <navigation-page
    :icon="icon"
    :title="title"
    :loadingMessage="loadingMessage"
    :loaded="loaded"
  >
    <template v-slot:header>
      <slot name="header" />
    </template>
    <template v-if="record" v-slot:content>
      <div v-if="noTabs" class="flex-rows">
        <div class="tab-items-row">
          <slot />
        </div>
      </div>
      <div v-else-if="tabsOnBottom" class="flex-rows">
        <v-tabs-items class="tab-items-row" v-model="active">
          <slot name="tab-items" />
        </v-tabs-items>
        <v-tabs class="tabs-row" v-model="active">
          <slot name="tabs" />
        </v-tabs>
      </div>
      <div v-else class="flex-rows">
        <v-tabs class="tabs-row" v-model="active">
          <slot name="tabs" />
        </v-tabs>
        <v-tabs-items class="tab-items-row" v-model="active">
          <slot name="tab-items" />
        </v-tabs-items>
      </div>
    </template>
    <template v-slot:actions>
      <slot name="actions" />
    </template>
    <template v-slot:dialogs>
      <slot name="dialogs" />
    </template>
  </navigation-page>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import NavigationPage from "../navigation/NavigationPage.vue";

import { VTabsItems, VTabs } from "vuetify/lib";

@Component({
  components: {
    NavigationPage,
    VTabsItems,
    VTabs,
  },
})
export default class DetailPage extends Vue {
  @Prop() readonly icon!: string;
  @Prop() readonly title!: string;
  @Prop() readonly loadingMessage!: string;
  @Prop() readonly loaded!: boolean;
  @Prop() readonly record!: {};
  @Prop() readonly noTabs!: boolean;
  @Prop() readonly tabsOnBottom!: boolean;

  active: string | null = null;
}
</script>

<style scoped>
.flex-rows {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.tabs-row {
  flex: 0;
}
.tab-items-row {
  flex: 1;
  overflow-y: auto;
}
.tab-items-row >>> .v-window__container,
.tab-items-row >>> .v-window-item {
  height: 100%;
}
</style>
