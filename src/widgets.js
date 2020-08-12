export default class Widgets {
    static generateHeader() {
        return '<nav class="navbar navbar-expand-sm bg-dark navbar-dark">' +
                    '<a class="navbar-brand" href="#">Coincap</a>' +
                    '<ul class="navbar-nav mr-auto mt-2 mt-lg-0">' +
                        '<li class="nav-item"><a href="#" class="nav-link active">Coins <span class="sr-only">(Current)</span></a></li>' +
                        '<li class="nav-item"><a href="#" class="nav-link">Exchanges</a></li>' +
                    '</ul>' +
                    '<div class="form-inline my-2 my-lg-0">' +
                        '<input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />' +
                        '<button class="btn btn-outline-success my-2 my-sm-0">Search</button>' +
                    '</div>' +
                '</nav>';
    }

    static generatePageLink(baseLink = 'index.html', targetPage, text = targetPage, pageSize, sortField, sortOrder) {
        return `<a class="page-link" href="${baseLink}?pagenum=${targetPage}&pagesize=${pageSize}&sortorder=${sortOrder}&sortfield=${sortField}">${text}</a>`
    }

    static generatePageButton(baseLink, currentPage, targetPage, pageSize, sortField, sortOrder) {
        if (targetPage > 0) {
            let activeClass = (currentPage == targetPage) ? ' active' : "";
            return `<li class="page-item ${activeClass}">${this.generatePageLink(baseLink, targetPage, targetPage, pageSize, sortField, sortOrder)}</li>`;
        } else {
            // return ... since currentPage is -1
            return `<li class="page-item mr-2 ml-2">...</li>`;
        }
    }

    static generatePager(baseLink, { pagenum: currentPage, pagesize: pageSize, totalPage, sortfield: sortField, sortorder: sortOrder }) {
        let pageButtons = '';
        let start = 1;
        let end = currentPage + 2;
        let append = '';
        
        if (currentPage > 1) {
            // Not the first page, so generate previous page button
            pageButtons = `<li class="page-item">${this.generatePageLink(baseLink, currentPage - 1, '&lt;', pageSize, sortField, sortOrder)}</li>`;
        }

        if (currentPage > 5) {
            // Page is > 5, so show page 1 and ...
            pageButtons += this.generatePageButton(baseLink, currentPage, 1, pageSize, sortField, sortOrder);
            pageButtons += this.generatePageButton(baseLink, -1, -1, pageSize, sortField, sortOrder);

            start = currentPage - 3;
            end = currentPage + 3;
        }

        if (currentPage+3 < totalPage) {
            // Page is more than 3 pages away from the max page, so show the last page and ...
            append += this.generatePageButton(baseLink, -1, -1, pageSize, sortField, sortOrder);
            append += this.generatePageButton(baseLink, currentPage, totalPage, pageSize, sortField, sortOrder);

            end = currentPage + 2;
        } else {
            end = currentPage + 3;
        }

        end = Math.min(end, totalPage); // Clamp max value to size of page

        for (let i = start; i <= end; i++) {
            pageButtons += this.generatePageButton(baseLink, currentPage, i, pageSize, sortField, sortOrder);
        }

        pageButtons += append; // Add the ... and last page button

        if (currentPage < totalPage) {
            // Not the last page, generate the next page button
            pageButtons += `<li class="page-item">${this.generatePageLink(baseLink, currentPage + 1, '&gt;', pageSize, sortField, sortOrder)}</li>`;
        }

        return pageButtons
    }
}