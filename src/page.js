import NumberUtil from './numberutil.js';

export default class Page {
    static params = {
        pagenum: 1,
        pagesize: 100,
        currency: 'usd',
        totalPage: 0,
        sortfield: 'marketcap',
        sortorder: 'desc'
    };

    static hash;

    static setPageParameters(totalActive) {
        this.params.totalPage = Math.ceil(totalActive / this.params.pagesize);
        this.params.pagenum = NumberUtil.clamp(this.params.pagenum, 1, this.params.totalPage);
    }

    static processUrl(url = '') {
        let urlVars = url.split('?'),
            paramsWithHash = Array.isArray(urlVars) && (urlVars.length > 1) ? urlVars[1].split('#') : [],
            params = Array.isArray(paramsWithHash) && (paramsWithHash.length > 0) ? paramsWithHash[0].split('&') : [];

        if (paramsWithHash.length > 1) {
            this.hash = paramsWithHash[1];
        }

        for (let i = 0; i < params.length; i++) {
            let param = params[i].split('=');
            this.params[param[0]] = param[1];
        }

        this.params.pagenum = Number(this.params.pagenum);
        this.params.pagesize = Number(this.params.pagesize);
    }

    static getCurrentPagingUrlParams() {
        return `pagesize=${this.params.pagesize}&pagenum=${this.params.pagenum}`;
    }

    static generatePageLink(pageNum, pageSize, text = pageNum) {
        return `<a class="page-link" href="index.html?pagenum=${pageNum}&pagesize=${pageSize}&sortorder=${this.params.sortorder}&sortfield=${this.params.sortfield}">${text}</a>`
    }

    static generatePageButton(currentPage, pageNum) {
        if (pageNum > 0) {
            let activeClass = (currentPage == pageNum) ? ' active' : "";
            return `<li class="page-item ${activeClass}">${this.generatePageLink(pageNum, this.params.pagesize)}</li>`;
        } else {
            // return ... since pageNum is -1
            return `<li class="page-item mr-2 ml-2">...</li>`;
        }
    }

    static generatePager(currentPage, totalPage) {
        let pageButtons = '';
        let start = 1;
        let end = currentPage + 2;
        let append = '';
        
        if (currentPage > 1) {
            // Not the first page, so generate previous page button
            pageButtons = `<li class="page-item">${this.generatePageLink(currentPage - 1, this.params.pagesize, '&lt;')}</li>`;
        }

        if (currentPage > 5) {
            // Page is > 5, so show page 1 and ...
            pageButtons += this.generatePageButton(currentPage, 1);
            pageButtons += this.generatePageButton(-1, -1);

            start = currentPage - 3;
            end = currentPage + 3;
        }

        if (currentPage+3 < totalPage) {
            // Page is more than 3 pages away from the max page, so show the last page and ...
            append += this.generatePageButton(-1, -1);
            append += this.generatePageButton(currentPage, totalPage);

            end = currentPage + 2;
        } else {
            end = currentPage + 3;
        }

        end = Math.min(end, totalPage); // Clamp max value to size of page

        for (let i = start; i <= end; i++) {
            pageButtons += this.generatePageButton(currentPage, i);
        }

        pageButtons += append; // Add the ... and last page button

        if (currentPage < totalPage) {
            // Not the last page, generate the next page button
            pageButtons += `<li class="page-item">${this.generatePageLink(currentPage + 1, this.params.pagesize, '&gt;')}</li>`;
        }

        return pageButtons
    }
}
