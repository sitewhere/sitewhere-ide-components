<template>
  <v-card class="pa-2" color="#fffff5" style="border: 1px solid #ddddcc;" flat>
    <v-icon small class="mr-2">fa-exclamation-circle</v-icon>
    {{ text }}
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { VCard, VIcon } from "vuetify/lib";

@Component({
  components: { VCard, VIcon }
})
export default class ContentWarning extends Vue {
  @Prop() readonly text!: string;
}
</script>
