<template>
  <v-tooltip left>
    <v-btn
      slot="activator"
      fab
      fixed
      bottom
      right
      dark
      color="red darken-2"
      class="elevation-5"
      @click.stop="onButtonClicked"
    >
      <font-awesome-icon :icon="icon" size="lg" />
    </v-btn>
    <span>{{ label }}</span>
  </v-tooltip>
</template>

<script>
import { VTooltip, VBtn } from "vuetify/lib";

export default {
  props: ["label", "icon"],

  components: {
    VTooltip,
    VBtn
  },

  data: () => ({}),

  methods: {
    // Called when button is clicked.
    onButtonClicked: function() {
      this.$emit("action");
    }
  }
};
</script>
