import Vue from "vue";
import {
  Swiper as SwiperClass,
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/swiper.esm.js";
import getAwesomeSwiper from "vue-awesome-swiper/dist/exporter";

// Swiper modules
SwiperClass.use([Navigation, Pagination, Autoplay]);

// local component
const { directive } = getAwesomeSwiper(SwiperClass);

Vue.directive("swiper", directive);
