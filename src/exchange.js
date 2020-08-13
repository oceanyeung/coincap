import Page from './page.js';
import Exchanges from './exchanges.js';
import Api from './api.js';
import Widgets from './widgets.js';
import NumberUtil from './numberutil.js';

$(document).ready(() => {
    $('#header').append(Widgets.generateHeader(Page.Pages.exchanges));

    Page.params.sortfield = '24hbtc_normalized';

    // Get the overriding params from url
    Page.processUrl(window.location.href);
    console.log(Page.params);

    Api.loadGlobalStats().then(resp => {
        resp.json().then(data => {
            console.log(data.data);
            Page.setGlobalStats(data.data);

            Page.setPagingParameters(299);

            let pageButtons = Widgets.generatePager(Page.Pages.exchanges, Page.params);
            $("#pagerTop").append(pageButtons);
            $("#pagerBottom").append(pageButtons);

    //         Api.loadCoins(Page.params).then(resp => {
    //             resp.json().then(data => {
    //                 Coins.sortData(data, Page.params.sortfield, Page.params.sortorder);
    //                 Coins.generateCoinTableHeader($("#header_row"), Page.params);
    //                 Coins.generateCoinTable($("#coins"), data);
    //             });
            //});
        });
    });

    Api.loadExchanges(Page.params).then(resp => {
        resp.json().then(data => {
            Exchanges.sortData(data, Page.params.sortfield, Page.params.sortorder);
            Exchanges.generateTableHeader($("#header_row"), Page.params);
            Exchanges.generateTable($("#exchanges"), data);
        });
    });
});
