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
}
