import Page from './page.js';
import Coins from './coins.js';
import Api from './api.js';
import NumberUtil from './numberutil.js';

$(document).ready(() => {
    // Get the overriding params from url
    Page.processUrl(window.location.href);
    console.log(Page.params);

    Api.loadGlobalStats().then(resp => {
        resp.json().then(data => {
            Coins.setGlobalStats(data.data);
            console.log(data.data.active_cryptocurrencies);

            Page.setPageParameters(Coins.totalActive);

            let pageButtons = Page.generatePager(Page.params.pagenum, Page.params.totalPage);
            $("#pager").append(pageButtons);

            Api.loadCoins(Page.params).then(resp => {
                resp.json().then(data => {
                    Coins.sortData(data, Page.params.sortfield, Page.params.sortorder);
                    Coins.generateCoinTableHeader($("#header_row"), Page.params);
                    Coins.generateCoinTable($("#coins"), data, Page.params.pagenum, Page.params.pagesize, Page.params.sortfield, Page.params.sortorder);
                });
            });
        });
    });
});
