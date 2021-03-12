<template>
  <div
    class="zoom-on-hover"
    :class="{ zoomed }"
    @pointerover="touchzoom"
    @pointerout="touchzoom"
    @pointermove="move"
    @pointerenter="zoom"
    @pointerleave="unzoom"
  >
    <img ref="normal" class="normal" :src="imgNormal" :alt="altText" />
    <img ref="zoom" class="zoom" :src="imgZoom || imgNormal" :alt="altText" />
  </div>
</template>
<script>
export default {
  props: {
    imgNormal: { type: String, default: () => "" },
    imgZoom: { type: String, default: () => "" },
    scale: { type: Number, default: () => 1 },
    disabled: { type: Boolean, required: false },
    altText: { type: String, required: false, default: () => "" },
  },
  data() {
    return {
      scaleFactor: 1,
      resizeCheckInterval: null,
      zoomed: false,
    };
  },
  mounted() {
    if (this.scale) {
      this.scaleFactor = parseInt(this.scale);
      this.$refs.zoom.style.transform = "scale(" + this.scaleFactor + ")";
    }
    this.initEventLoaded();
    this.initEventResized();
  },
  updated() {
    this.initEventLoaded();
  },
  beforeDestroy() {
    this.resizeCheckInterval && clearInterval(this.resizeCheckInterval);
  },
  methods: {
    pageOffset(el) {
      // -> {x: number, y: number}
      // get the left and top offset of a dom block element
      let rect = el.getBoundingClientRect();
      let scrollLeft =
        window.pageXOffset || document.documentElement.scrollLeft;
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return {
        y: rect.top + scrollTop,
        x: rect.left + scrollLeft,
      };
    },
    touchzoom(event) {
      if (this.disabled) return;
      this.zoomed = event.type === "pointerover";
      this.move(event);
    },
    zoom() {
      if (this.disabled) return;
      this.zoomed = true;
    },
    unzoom() {
      if (this.disabled) return;
      this.zoomed = false;
    },
    move(event) {
      let zoom = this.$refs.zoom;
      let normal = this.$refs.normal;
      if (this.disabled || !this.zoomed || !zoom || !normal) return;
      let offset = this.pageOffset(this.$el);
      let relativeX = event.clientX - offset.x + window.pageXOffset;
      let relativeY = event.clientY - offset.y + window.pageYOffset;
      let normalFactorX = relativeX / normal.offsetWidth;
      let normalFactorY = relativeY / normal.offsetHeight;
      let x =
        normalFactorX *
        (zoom.offsetWidth * this.scaleFactor - normal.offsetWidth);
      let y =
        normalFactorY *
        (zoom.offsetHeight * this.scaleFactor - normal.offsetHeight);
      zoom.style.left = -x + "px";
      zoom.style.top = -y + "px";
    },
    initEventLoaded() {
      // emit the "loaded" event if all images have been loaded
      let promises = [this.$refs.zoom, this.$refs.normal].map(function (image) {
        return new Promise(function (resolve, reject) {
          image.addEventListener("load", resolve);
          image.addEventListener("error", reject);
        });
      });
      let component = this;
      Promise.all(promises).then(function () {
        component.$emit("loaded");
      });
    },
    initEventResized() {
      let normal = this.$refs.normal;
      let previousWidth = normal.offsetWidth;
      let previousHeight = normal.offsetHeight;
      let component = this;
      this.resizeCheckInterval = setInterval(function () {
        if (
          previousWidth != normal.offsetWidth ||
          previousHeight != normal.offsetHeight
        ) {
          previousWidth = normal.offsetWidth;
          previousHeight = normal.offsetHeight;
          component.$emit("resized", {
            width: normal.width,
            height: normal.height,
            fullWidth: normal.naturalWidth,
            fullHeight: normal.naturalHeight,
          });
        }
      }, 1000);
    },
  },
};
</script>
<style scoped>
.zoom-on-hover {
  position: relative;
  overflow: hidden;
}
.zoom-on-hover .normal {
  width: 100%;
}
.zoom-on-hover .zoom {
  position: absolute;
  opacity: 0;
  transform-origin: top left;
}
.zoom-on-hover.zoomed .zoom {
  opacity: 1;
}
.zoom-on-hover.zoomed .normal {
  opacity: 0;
}
</style>
