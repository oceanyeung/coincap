import Page from './page.js';
import NumberUtil from './numberutil.js';

export default class Coins {
    static getColorClass(val) {
        if (Number(val) < 0) {
            return 'text-danger';
        } else {
            if (Number(val) > 0) {
                return 'text-success';
            }
        }

        return '';
    }

    static sortData(data, sortField, sortOrder) {
        let direction = sortOrder == 'asc' ? 1 : -1;
        let numericSort = (a,b) => (a[sortField] - b[sortField]) * direction;
        let textSort = (a,b) => (a[sortField].toLowerCase() < b[sortField].toLowerCase() ? -1 : 1) * direction;
        let sortMethod = numericSort;

        switch (sortField.toLowerCase()) {
            case 'rank': sortField = 'market_cap_rank'; break;
            case 'symbol': {
                sortField = 'symbol'; 
                sortMethod = textSort;
                break;
            }
            case 'price': sortField = 'current_price'; break;
            case '1h': sortField = 'price_change_percentage_1h_in_currency'; break;
            case '24h': sortField = 'price_change_percentage_24h_in_currency'; break;
            case '7d': sortField = 'price_change_percentage_7d_in_currency'; break;
            case '24hvolume': sortField = 'total_volume'; break;
            default: sortField = 'market_cap'; break;
        }

        data.sort(sortMethod);
        return data;
    }

    static generateTable(container, data) {
        for (let i=0; i < data.length; i++) {
            let {name, symbol, current_price, total_volume, 
                 market_cap, market_cap_rank, price_change_percentage_7d_in_currency, 
                 price_change_percentage_1h_in_currency, price_change_percentage_24h_in_currency, image } = data[i];

            let tr = `<tr>` + 
                        `<td>${market_cap_rank ? market_cap_rank : ''}</td>` +
                        `<td><img src="${image}" width=30 class="mr-2" /> ${name} <span class="symbol">${symbol.toUpperCase()}</span></td>` +
                        `<td class="text-right">${NumberUtil.formatCurrency(current_price)}</td>` +
                        `<td class="text-right ${this.getColorClass(price_change_percentage_1h_in_currency)}">${NumberUtil.formatPercentage(price_change_percentage_1h_in_currency)}</td>` +
                        `<td class="text-right ${this.getColorClass(price_change_percentage_24h_in_currency)}">${NumberUtil.formatPercentage(price_change_percentage_24h_in_currency)}</td>` + 
                        `<td class="text-right ${this.getColorClass(price_change_percentage_7d_in_currency)}">${NumberUtil.formatPercentage(price_change_percentage_7d_in_currency)}</td>` + 
                        `<td class="text-right">${NumberUtil.formatCurrency(total_volume, 0)}</td>` +
                        `<td class="text-right">${NumberUtil.formatCurrency(market_cap, 0)}<td><td></td>` +
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
            return `<a href="${Page.Pages.index}?sortfield=${field}&sortorder=${newsortOrder}&pagenum=${pageNum}&pagesize=${pageSize}">${text}</a>`;
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
                generateHeader('Coin', 'symbol', null, 'asc') +
                generateHeader('Price', 'price', 'text-center') +
                generateHeader('1h', '1h', 'text-center') +
                generateHeader('24h', '24h', 'text-center') +
                generateHeader('7d', '7d', 'text-center') +
                generateHeader('24h Volume', '24hvolume', 'text-center') +
                generateHeader('Mkt Cap', 'marketcap', 'text-center') +
            "</tr>"
        );
    }
};