<template>
  <div>
    <v-card flat tile class="white pa-3">
      <v-layout row wrap>
        <v-flex xs3>
          <span>
            <slot name="left" />
          </span>
        </v-flex>
        <v-flex xs6>
          <span>
            <slot name="content" />
          </span>
        </v-flex>
        <v-flex xs3>
          <span class="header-right">
            <slot name="right" />
          </span>
        </v-flex>
      </v-layout>
    </v-card>
    <v-divider />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import { VCard, VLayout, VFlex, VDivider } from "vuetify/lib";

@Component({ components: { VCard, VLayout, VFlex, VDivider } })
export default class NavigationHeaderPanel extends Vue {}
</script>
