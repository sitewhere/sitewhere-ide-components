<template>
  <v-row color="grey">
    <v-col cols="4" class="text-right body-2 pt-1 pb-1 pr-4">
      <strong>{{ label }}</strong>:
    </v-col>
    <v-col class="field body-2 pt-1 pb-1" cols="8">
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
