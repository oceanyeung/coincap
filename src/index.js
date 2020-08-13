import Page from './page.js';
import Coins from './coins.js';
import Api from './api.js';
import Widgets from './widgets.js';
import NumberUtil from './numberutil.js';

$(document).ready(() => {
    $('#header').append(Widgets.generateHeader(Page.Pages.index));

    // Get the overriding params from url
    Page.processUrl(window.location.href);
    console.log(Page.params);

    Api.loadGlobalStats().then(resp => {
        resp.json().then(data => {
            Page.setGlobalStats(data.data);

            Page.setPagingParameters(Page.globalStats.active_cryptocurrencies);

            Widgets.generatePagingContainer($('#pagingContainerTop'), Page.Pages.index, Page.params);
            Widgets.generatePagingContainer($('#pagingContainerBottom'), Page.Pages.index, Page.params);

            Api.loadCoins(Page.params).then(resp => {
                resp.json().then(data => {
                    Coins.sortData(data, Page.params.sortfield, Page.params.sortorder);
                    Coins.generateTableHeader($("#header_row"), Page.params);
                    Coins.generateTable($("#coins"), data);
                });
            });
        });
    });
});
