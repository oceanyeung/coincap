import Page from './page.js';
import Coins from './coins.js';
import Api from './api.js';

$(document).ready(() => {
    let params = Page.processUrl(window.location.href);
    console.log(params);

    let pageButtons = Page.generatePager(params);
    $("#pager").append(pageButtons);

    Api.loadCoins(params).then(resp => {
        resp.json().then(data => {
            console.log(Coins.createCoinTable($("#coins"), data, params));
        });
    });
});
