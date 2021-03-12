export function formatDate(dateString, monthFormat = "long") {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-AU", {
    year: "numeric",
    month: monthFormat,
    day: "numeric",
  });
}
