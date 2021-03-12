import getPrismicData from "./get-prismic-data";
import getShopifyData, {
  getSelectedVariantId,
  getVariantsById,
  getVariantsByPosition,
  getTilesInfo,
  getOptionsByName,
  getImages,
} from "./get-shopify-data";
import getRebuyData from "./get-rebuy-app-data";

export {
  getSelectedVariantId,
  getVariantsById,
  getVariantsByPosition,
  getTilesInfo,
  getOptionsByName,
  getImages,
  getRebuyData,
};

/**
 * fetch the data required for PDP page
 * @param {object} context - object from nuxt
 */
export async function handler({ route, app }) {
  const { handle } = route.params;
  const [
    {
      body: slices,
      title: pageTitle,
      icon_gallery: paymentIcons,
      meta_robots: metaRobots,
    },
    shopifyData,
  ] = await Promise.all([
    getPrismicData(handle, app),
    getShopifyData(handle, app),
  ]);

  return { slices, metaRobots, pageTitle, paymentIcons, shopifyData };
}
