export default class Page {
    static createDefaultParams() {
        return {
            start: 0,
            end: 99
        };
    }

    static processUrl(url) {
        let pageUrl = url,
            urlVars = pageUrl.split('?'),
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
}
