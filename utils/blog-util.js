import { splitEvery } from "ramda";

export function getCursor({ currentPage, cursors, blogsPerPage = 5 } = {}) {
  // if page is in url and 2nd page onwards
  if (currentPage > 1) {
    // split cursor array so that we can get last cursor to get data for next page
    const splittedArr = splitEvery(blogsPerPage, cursors);
    const pageCursorArr = splittedArr[currentPage - 2];
    if (pageCursorArr) {
      return pageCursorArr[pageCursorArr.length - 1];
    }
  }
}
