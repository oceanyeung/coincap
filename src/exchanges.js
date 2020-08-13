import Page from './page.js';
import NumberUtil from './numberutil.js';

export default class Exchanges {
    static sortData(data, sortField, sortOrder) {
        let direction = sortOrder == 'asc' ? 1 : -1;
        let numericSort = (a,b) => (a[sortField] - b[sortField]) * direction;
        let textSort = (a,b) => ((a[sortField] ?? '').toLowerCase() < (b[sortField] ?? '').toLowerCase() ? -1 : 1) * direction;
        let sortMethod = numericSort;

        switch (sortField.toLowerCase()) {
            case 'rank': sortField = 'market_cap_rank'; break;
            case 'name':
            case 'country': {
                sortMethod = textSort;
                break;
            }
            case 'year_established': sortField = 'year_established'; break;
            case '24hbtc_normalized': sortField = 'trade_volume_24h_btc_normalized'; break;
            case '24hbtc': sortField = 'trade_volume_24h_btc'; break;
            case 'trust_score': sortField = 'trust_score'; break;
            default: sortField = 'trade_volume_24h_btc_normalized'; break;
        }

        data.sort(sortMethod);
        return data;
    }

    static generateTable(container, data) {
        for (let i=0; i < data.length; i++) {
            let {name, url, image, trade_volume_24h_btc_normalized, trade_volume_24h_btc, year_established, country, trust_score, trust_score_rank } = data[i];

            let tr = `<tr>` + 
                        `<td>${trust_score_rank ?? ''}</td>` +
                        `<td><a href="${url}"><img src="${image}" width=30 class="mr-2" /> ${name}</a></td>` +
                        `<td class="text-center">${trust_score ?? ''}</td>` +
                        `<td class="btccol text-right">${NumberUtil.formatNumber(trade_volume_24h_btc_normalized)}</td>` +
                        `<td class="text-right pr-4">${NumberUtil.formatNumber(trade_volume_24h_btc)}</td>` +
                        `<td>${country ?? ''}</td>` +
                        `<td>${year_established ?? '' }</td>` +
                    `</tr>`;

            container.append(tr);
        }
    }

    static generateTableHeader(container, {sortfield: sortField, sortorder: sortOrder, pagenum: pageNum, pagesize: pageSize}) {
        let link = (text, field, default_sortOrder = 'desc') => {
            let newsortOrder = default_sortOrder;
            if (sortField == field) {
                // reverse sortOrder for current sortField
                newsortOrder = (sortOrder == 'asc') ? 'desc' : 'asc';
            }
            return `<a href="${Page.Pages.exchanges}?sortfield=${field}&sortorder=${newsortOrder}&pagenum=${pageNum}&pagesize=${pageSize}">${text}</a>`;
        };

        let generateSortArrow = (field) => {
            if (field == sortField) {
                if (sortOrder == 'asc') {
                    return '<i class="fas fa-chevron-up"></i>';
                } else {
                    return '<i class="fas fa-chevron-down"></i>';
                }
            }
            return '';
        }

        let generateHeader = (display, field, cssClass, defaultSort) => {
            return `<th ${cssClass ? 'class="' + cssClass +'"': ''}>${link(display, field, defaultSort)} ${generateSortArrow(field)}</th>`;
        }

        container.append(
            "<tr>" +
                generateHeader('#', 'rank', null, 'asc') +
                generateHeader('Exchange', 'name', null, 'asc') +
                generateHeader('Trust Score', 'trust_score', 'text-center') +
                generateHeader('24h BTC Vol (Normalized)', '24hbtc_normalized', 'text-center') +
                generateHeader('24h BTC Volume', '24hbtc', 'text-center') +
                generateHeader('Country', 'country', 'text-center') +
                generateHeader('Year Established', 'year_established', 'text-center') +
            "</tr>"
        );
    }
};