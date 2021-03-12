<template>
  <div class="flex items-center h-full">
    <lite-youtube
      v-if="isYoutube"
      :videoid="videoId"
      params="fs=0&modestbranding=2&rel=0&enablejsapi=1"
    >
      <button type="button" class="lty-playbtn">
        <span class="lyt-visually-hidden">Play Video</span>
      </button>
    </lite-youtube>
    <lite-vimeo v-else :videoid="videoId">
      <div class="ltv-playbtn"></div>
    </lite-vimeo>
  </div>
</template>

<script>
import { pathOr, split, last, pipe, replace } from "ramda";

export default {
  props: { field: { type: Object, default: () => {} } },
  computed: {
    provider() {
      return pathOr("", ["provider_name"], this.field);
    },
    mediaUrl() {
      return pathOr("", ["embed_url"], this.field);
    },
    thumbnailUrl() {
      return pathOr("", ["thumbnail_url"], this.field);
    },
    isYoutube() {
      return this.provider.toLowerCase() === "youtube";
    },
    videoId() {
      return pipe(split("/"), last, replace(/watch\?v=/gi, ""))(this.mediaUrl);
    },
  },
};
</script>
