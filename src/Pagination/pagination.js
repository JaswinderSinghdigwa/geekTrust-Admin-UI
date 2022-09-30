/**
 * @description
 * paginate function that outputs,
 * * What are the pages to display per view.
 * * what are items to display for given current page.
 * @param {*} sumOfItems
 * @param {number} [viewPage=1]
 * @param {number} [itemsPerPage=10]
 * @param {number} [pagesPerView=10]
 * @return {object}
 */

    const paginate = (
    sumOfItem,
    viewPage = 1,
    dataPerPage = 10,
    pagePerView = 10,
    ) => {
        console.log("ViewPage",viewPage);
    // calculate total pages
    const sumOfPage = Math.ceil(sumOfItem / dataPerPage)

    // calculate start and end page numbers
    let startPageNumber, endPageNumber;
    if (sumOfPage <= pagePerView) {
        startPageNumber = 1;
        endPageNumber = sumOfPage;
    } else {
        startPageNumber = viewPage - Math.floor(pagePerView / 2);
        if (startPageNumber < 1) {
            startPageNumber = 1;
        }
        endPageNumber = startPageNumber + pagePerView - 1;
        if (endPageNumber > sumOfPage) {
            endPageNumber = sumOfPage;
            startPageNumber = endPageNumber - pagePerView + 1;
        }
    }

    // calculate start and end index of items of the current page
    const startDataIndex = (viewPage - 1) * dataPerPage;
    const endDataIndex = Math.min(startDataIndex + dataPerPage - 1, sumOfItem - 1);

    // fill page numbers in pages Array
    const pages = [];
    for (let i = startPageNumber; i <= endPageNumber; i++) {
        pages.push(i)
    }

    // fill items in pages Array
    const items = [];
    for (let i = startDataIndex; i <= endDataIndex; i++) {
        items.push(i)
    }
    return {
        sumOfPage,
        startPageNumber,
        endPageNumber,
        startDataIndex,
        endDataIndex,
        viewPage,
        pages
    };
}

export default paginate