import redirects from "../redirects.json";

export default function ({ route, redirect }) {
  const foundRedirect = redirects.find(r => {
    return new RegExp(r.from.source, r.from.flags).test(route.fullPath);
  });

  // If it exists, redirect the page with a statusCode response else carry on
  if (foundRedirect) {
    redirect(foundRedirect.statusCode, foundRedirect.to);
  }
}
