export default function getRebuyAppData(
  $axios,
  { apiRebuyAppUrl },
  productIds
) {
  const url = apiRebuyAppUrl.replace("$PRODUCT_IDS", productIds);
  return $axios.get(url);
}
