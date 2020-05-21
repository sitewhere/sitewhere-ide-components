<template>
  <v-row class="mb-1">
    <v-col cols="4" class="text-right subheading pr-4">
      <strong>{{ label }}</strong>:
    </v-col>
    <v-col class="field" cols="8">
      <slot />
    </v-col>
  </v-row>
</template>

<script>
import { VRow, VCol } from "vuetify/lib";

export default {
  props: ["label"],

  components: {
    VRow,
    VCol
  },

  data: () => ({}),

  methods: {}
};
</script>

<style scoped>
.field {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
