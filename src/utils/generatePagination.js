function generatePagination(currentPage, totalPage, desiredLength) {
  let count = [];

  let leftSide = Math.floor(desiredLength / 2);
  let rightSide = desiredLength - leftSide - 1;

  let startPage = currentPage - leftSide;
  let endPage = currentPage + rightSide;

  // Adjust the start and end pages if they go out of total pages range
  if (startPage < 1) {
    endPage += 1 - startPage; // Shift endPage to the right as much as startPage is below 1
    startPage = 1;
  }

  if (endPage > totalPage) {
    startPage -= endPage - totalPage; // Shift startPage to the left as much as endPage is above totalPage
    endPage = totalPage;
  }

  // Final corrections to ensure we don't go out of bounds
  if (startPage < 1) {
    startPage = 1;
  }

  if (endPage > totalPage) {
    endPage = totalPage;
  }

  if (startPage + desiredLength - 1 <= totalPage) {
    // Only adjust to desired length if within bounds
    endPage = startPage + desiredLength - 1;
  } else if (endPage - desiredLength + 1 >= 1) {
    // Adjust startPage to ensure the length remains 7
    startPage = endPage - desiredLength + 1;
  }

  // Generate the pagination array considering first and last page
  if (startPage > 1) {
    count.push(1);
    if (startPage > 2) count.push("..."); // Add ellipsis if there's a gap
  }

  for (let i = startPage; i <= endPage; i++) {
    count.push(i);
  }

  if (endPage < totalPage) {
    if (endPage < totalPage - 1) count.push("..."); // Add ellipsis if there's a gap
    count.push(totalPage);
  }

  return count; // Return the result
}

export default generatePagination;
