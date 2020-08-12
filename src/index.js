import Page from './page.js';
import Coins from './coins.js';
import Api from './api.js';
import Widgets from './widgets.js';
import NumberUtil from './numberutil.js';

$(document).ready(() => {
    $('#header').append(Widgets.generateHeader());

    // Get the overriding params from url
    Page.processUrl(window.location.href);
    console.log(Page.params);

    Api.loadGlobalStats().then(resp => {
        resp.json().then(data => {
            Coins.setGlobalStats(data.data);

            Page.setPageParameters(Coins.totalActive);

            let pageButtons = Widgets.generatePager('index.html', Page.params);
            $("#pager").append(pageButtons);

            Api.loadCoins(Page.params).then(resp => {
                resp.json().then(data => {
                    Coins.sortData(data, Page.params.sortfield, Page.params.sortorder);
                    Coins.generateCoinTableHeader($("#header_row"), Page.params);
                    Coins.generateCoinTable($("#coins"), data);
                });
            });
        });
    });
});
