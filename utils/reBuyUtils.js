const keyUpdateasPrismic = {
  color_hex: "colourHex",
};

const constructVariantsData = variants => {
  return variants.map(obj => {
    let metaFields = {};
    obj.metafields.forEach(elm => {
      const key = keyUpdateasPrismic[elm.key] || elm.key;
      metaFields[key] = elm.value;
      metaFields[elm.key] = elm.value;
    });
    const selectedOptions = {
      Colour: {
        name: "Colour",
        value: obj.option2 || obj.option1,
      },
    };
    return {
      ...obj,
      ...metaFields,
      selectedOptions,
      metafields: metaFields,
    };
  });
};

export const isSliceRenderByRebuy = (slices, componentName) => {
  return slices.filter(
    item => item.label == componentName && item.primary.from_rebuy
  ).length;
};

export const constructRebuyAppData = products => {
  const filterProducts = products.data.filter(
    item => item.product_type == "Product"
  );
  return filterProducts.map(item => {
    const { body_html: descriptionHtml, image, tags, variants } = item;
    const tagsArr = tags.split(", ");
    const yotpoReviewObj = item.metafields.find(e => e.key == "bottomline");
    // variant data formation
    const variantsArr = constructVariantsData(variants);
    return {
      product: {
        ...item,
        // id: item.id,
        // title: item.title,
        // handle: item.handle,
        tags: tagsArr,
        description: "",
        descriptionHtml,
        // vendor: item.vendor,
        featuredImage: image.src,
        // options: [],
        reviews_average: "",
        reviews_count: "",
        bottomline: yotpoReviewObj.value,
        // images: [],
        variants: variantsArr,
        collections: [],
        metafields: {},
      },
      __typename: "",
    };
  });
};

export const updatedSlices = (slices, rebuyAppData) => {
  return slices.map(obj => {
    const { label, type, primary } = obj;
    if (
      label == "you_might_also_like" &&
      type == "shopify_products" &&
      primary.from_rebuy
    ) {
      const fieldsConst = constructRebuyAppData(rebuyAppData);
      return {
        ...obj,
        fields: fieldsConst,
      };
    }
    return obj;
  });
};
