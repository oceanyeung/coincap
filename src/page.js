export default class Page {
    static createDefaultParams() {
        return {
            pagenum: 1,
            pagesize: 100,
            currency: 'usd',
            maxpage: 59
        };
    }

    static processUrl(url = '') {
        let urlVars = url.split('?'),
            paramsWithHash = Array.isArray(urlVars) && (urlVars.length > 1) ? urlVars[1].split('#') : [],
            params = Array.isArray(paramsWithHash) && (paramsWithHash.length > 0) ? paramsWithHash[0].split('&') : [],
            result = Page.createDefaultParams();

        if (paramsWithHash.length > 1) {
            result._hash = paramsWithHash[1];
        }

        for (let i=0; i < params.length; i++) {
            let param = params[i].split('=');
            result[param[0]] = param[1];
        }

        return result;
    }

    static generatePager(params) {
        let pageButtons = '';
        for (let i=0; i < 20; i++) {
            let activeClass = (params.pagenum == (i+1)) ? ' active' : "";
            pageButtons += `<li class="page-item ${activeClass}"><a class="page-link" href="index.html?pagenum=${i+1}">${i+1}</a></li>`;
        }

        return pageButtons
    }
}
