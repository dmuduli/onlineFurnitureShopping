import Vue from "vue";
import responsiveMixin from "~/mixins/responsiveMixin";

if (!Vue.__mY_mIXIn__) {
  Vue.__mY_mIXIn__ = true;
  Vue.mixin({ ...responsiveMixin });
}
