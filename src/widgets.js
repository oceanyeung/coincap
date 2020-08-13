import Page from './page.js';

export default class Widgets {
    static generateHeader(currentPage) {
        let generatePageLink = (displayName, pageLink) => {
            return (currentPage == pageLink) ? 
                `<a href="${pageLink}" class="nav-link active">${displayName} <span class="sr-only">(Current)</span></a>` :
                `<a href="${pageLink}" class="nav-link">${displayName}</a>`;
        };

        return '<nav class="navbar navbar-expand-sm bg-dark navbar-dark">' +
                    `<a class="navbar-brand" href="${Page.Pages.index}">Coincap</a>` +
                    '<ul class="navbar-nav mr-auto mt-2 mt-lg-0">' +
                        `<li class="nav-item">${generatePageLink("Coins", Page.Pages.index)}</li>` +
                        `<li class="nav-item">${generatePageLink("Exchanges", Page.Pages.exchanges)}</li>` +
                    '</ul>' +
                    '<div class="form-inline my-2 my-lg-0">' +
                        '<input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />' +
                        '<button class="btn btn-outline-success my-2 my-sm-0">Search</button>' +
                    '</div>' +
                '</nav>';
    }

    static generatePageLink(baseLink = Page.Pages.index, targetPage, text = targetPage, pageSize, sortField, sortOrder) {
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

    static generatePager(baseLink, { totalPage, pagenum: currentPage, pagesize: pageSize, sortfield: sortField, sortorder: sortOrder }) {
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

    static generatePagingContainer(container, baseLink, params) {
        container.append('<div class="row">' +
            '<div class="col-sm">' +
                'Page size: ' +
                '<a href="exchange.html?pagesize=50&pagenum=1">50</a> | '+
                '<a href="exchange.html?pagesize=100&pagenum=1">100</a> | ' +
                '<a href="exchange.html?pagesize=250&pagenum=1">250</a>' +
            '</div>' +
            '<div class="col-sm">' +
                '<nav aria-label="Page navigation example">' +
                    '<ul class="pagination justify-content-center">' +
                    this.generatePager(baseLink, params) +
                    '</ul>' +
                '</nav>' +
            '</div>' +
        '</div>');
    }
}