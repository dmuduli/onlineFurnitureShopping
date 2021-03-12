import { colors } from "~/colors.config";

export default {
  methods: {
    /**
     *
     * @param {*} settings will come from admin api assets
     * @param {*} product will come from algolia/shopify
     */
    getSaleTag({ tags, metafields, price, compareAtPrice }) {
      /*
      const settings = {
        show_member_event_badge: false,
        color_member_event_badge: "#efefef",
        text_member_event_badge: "my member",
        velocity_member: "no",
      };
      */
      // read assets from shopify admin API
      const settings = this.$store.state.assets;

      // for member event
      if (settings.show_member_event_badge) {
        return {
          backgroundColor: settings.color_member_event_badge,
          text: settings.text_member_event_badge,
        };
      }

      // For Clearance
      if (tags !== undefined && tags.includes("clearance")) {
        return {
          backgroundColor: colors.campaign.clearance,
          text: "CLEARANCE",
        };
      }

      if (metafields == null) {
        return {
          backgroundColor: "",
          text: "",
        };
      }

      // For Campaign
      if (
        metafields.product_campaign_badge_color != "" &&
        settings.velocity_member != "yes"
      ) {
        return {
          backgroundColor: metafields.product_campaign_badge_color,
          text: metafields.product_campaign_badge_title,
        };
      }

      // For normal Sale
      const comparing =
        Number(compareAtPrice) && Number(compareAtPrice) > Number(price);

      if (comparing) {
        return {
          backgroundClass: colors.campaign.sale,
          text: "SALE",
        };
      }
    },
  },
};
