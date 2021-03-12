export default (
  { graphQLErrors, networkError, operation, forward },
  nuxtContext
) => {
  if (typeof console != "undefined") {
    console.dir("Global error handler");
    console.dir(graphQLErrors, networkError, operation, forward);
  }
};
