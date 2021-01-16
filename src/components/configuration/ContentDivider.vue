<template>
  <v-divider class="mt-5 mb-5" />
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

import { VDivider } from "vuetify/lib";

@Component({
  components: { VDivider }
})
export default class ContentDivider extends Vue {}
</script>
