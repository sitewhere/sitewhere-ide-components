<template>
  <v-row class="mb-1">
    <v-col
      cols="4"
      class="text-right subheading pr-4"
    >
      <strong>{{ label }}</strong>:
    </v-col>
    <v-col
      class="field"
      cols="8"
    >
      <slot />
    </v-col>
  </v-row>
</template>

<script>
  export default {

    props: ['label'],
    data: () => ({}),

    methods: {},
  }
</script>

<style scoped>
.field {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
