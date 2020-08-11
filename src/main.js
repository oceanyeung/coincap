import Page from './pageutils.js';
import Coins from './coins.js';

$(document).ready(() => {
    let params = Page.processUrl(window.location.href);
    console.log(params);
});
