export default class Api {
    static provider = 'https://api.coingecko.com/api/v3/';
    static marketApi = 'coins/markets';
    static exchangesApi = 'exchanges';
    static globalApi = 'global';

    static loadCoins({pagesize, pagenum, currency}) {
        let url = this.provider + this.marketApi + `?vs_currency=${currency}&order=market_cap_desc&per_page=${pagesize}&page=${pagenum}&price_change_percentage=1h,24h,7d&sparkline=true`;
        return fetch(url);
    }

    static loadGlobalStats() {
        let url = this.provider + this.globalApi;
        return fetch(url);
    }

    static loadExchanges({pagesize, pagenum}) {
        let url = this.provider + this.exchangesApi + `?per_page=${pagesize}&page=${pagenum}`;
        return fetch(url);
    }
}
