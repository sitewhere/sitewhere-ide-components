<template>
  <header-field :label="label">
    <a
      style="color: #33c; font-weight: 700;"
      @click="onLinkClicked"
    >{{ text }}</a>
  </header-field>
</template>

<script>
  import HeaderField from './HeaderField.vue'

  import { routeTo } from '../common/Utils.ts'

  export default {

    components: {
      HeaderField,
    },

    props: ['label', 'url', 'text'],
    data: () => ({}),

    methods: {
      // Handle link clicked.
      onLinkClicked: function () {
        routeTo(this, this.url)
      },
    },
  }
</script>

<style scoped>
</style>
