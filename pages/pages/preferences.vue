<template>
  <div class="modal-content">
    <iframe class="w-full h-full" :src="iframeUrl"></iframe>
  </div>
</template>

<script>
export default {
  asyncData({ route }) {
    const hashValue = route.query.hash;
    return {
      hashValue,
    };
  },
  computed: {
    iframeUrl() {
      return `${this.$config.vercelAppUrl}/member/${this.hashValue}`;
    },
  },
};
</script>

<style lang="postcss" scoped>
@media screen and (min-width: 330px) {
  .modal-content iframe {
    height: 1350px;
  }
}

@media screen and (min-width: 350px) {
  .modal-content iframe {
    height: 1300px;
  }
}

@media screen and (min-width: 400px) {
  .modal-content iframe {
    height: 1250px;
  }
}

@media screen and (min-width: 580px) {
  .modal-content iframe {
    height: 1150px;
  }
}

@media screen and (min-width: 640px) {
  .modal-content iframe {
    height: 965px;
  }
}
</style>
