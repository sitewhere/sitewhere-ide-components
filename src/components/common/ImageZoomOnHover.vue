<template>
  <div class="zoomer">
    <div class="zoomed" :style="imageStyle" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "sitewhere-ide-common";

@Component({})
export default class ImageZoomOnHover extends Vue {
  @Prop() readonly imageUrl!: string;

  // Compute style of image.
  get imageStyle() {
    return {
      "background-color": "#fff",
      "background-image": "url(" + this.imageUrl + ")",
      "background-size": "contain",
      "background-position": "center",
      transition: "all 0.5s ease",
      height: "100%",
      width: "100%"
    };
  }
}
</script>

<style scoped>
.zoomer {
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  margin: 10px;
}
.zoomed {
  transition: all 0.5s ease;
}
.zoomed:hover {
  transform: scale(1.05);
}
</style>
