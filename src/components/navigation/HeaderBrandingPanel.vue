<template>
  <navigation-header-left>
    <image-zoom-on-hover v-if="imageUrl" :imageUrl="imageUrl" />
    <span v-else-if="icon" class="header-icon">
      <font-awesome-icon class="grey--text" :icon="icon" size="7x" />
    </span>
  </navigation-header-left>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "sitewhere-ide-common";

import NavigationHeaderLeft from "./NavigationHeaderLeft.vue";
import ImageZoomOnHover from "../common/ImageZoomOnHover.vue";

import { IBrandedEntity } from "sitewhere-rest-api";

@Component({
  components: {
    NavigationHeaderLeft,
    ImageZoomOnHover
  }
})
export default class HeaderBrandingPanel extends Vue {
  @Prop() readonly entity!: IBrandedEntity;

  /** Accessor for image URL */
  get imageUrl() {
    return this.entity ? this.entity.imageUrl : null;
  }

  /** Accessor for icon */
  get icon() {
    return this.entity ? this.entity.icon : null;
  }

  // Compute style of image.
  get imageStyle() {
    return {
      "background-color": "#fff",
      "background-image": "url(" + this.entity.imageUrl + ")",
      "background-size": "contain",
      "background-repeat": "no-repeat",
      "background-position": "50% 50%"
    };
  }
}
</script>

<style scoped>
.header-image {
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
}

.header-icon {
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  padding: 50px;
}
</style>
