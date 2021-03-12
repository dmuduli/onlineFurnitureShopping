import resources from "~/resource-gone.json"; // update to your file path

export default function ({ route, error }) {
  const foundResource = resources.find(r => {
    return new RegExp(r.from.source, r.from.flags).test(route.fullPath);
  });

  // If it exists, redirect the page with a statusCode response else carry on
  if (foundResource) {
    error({ statusCode: 410, message: foundResource.message });
  }
}
