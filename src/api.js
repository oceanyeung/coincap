export default class Api {
    static loadCoins({pagesize, pagenum, currency}) {
        let url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${pagesize}&page=${pagenum}&sparkline=true`;
        return fetch(url);
    }
}
