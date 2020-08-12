export default class Coins {
    static totalActive = 0;

    static formatCurrency(val, digits=2) {
        if (Number(val) >= 1) {
            // >= $1.00, only shows at most 2 decimals by default
            return new Intl.NumberFormat('en-us', { style: 'currency', currency: 'USD', minimumFractionDigits: digits }).format(val);
        } 

        // < $1.00, shows up to 6 decimals
        return new Intl.NumberFormat('en-us', { style: 'currency', currency: 'USD', maximumSignificantDigits: 6 }).format(val);
    }

    static formatPercentage(val, digits=2) {
        return new Intl.NumberFormat('en-us', { maximumFractionDigits: digits }).format(val) + '%';
    }

    static setGlobalStats(data) {
        // totalActive is used to determine how many pages of coins there are
        this.totalActive = data.active_cryptocurrencies;
    }

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

    static sortData(data, sortfield, sortorder) {
        let direction = sortorder == 'asc' ? 1 : -1;
        let numericSort = (a,b) => (a[sortfield] - b[sortfield]) * direction;
        let textSort = (a,b) => (a[sortfield].toLowerCase() < b[sortfield].toLowerCase() ? -1 : 1) * direction;
        let sortMethod = numericSort;

        switch (sortfield.toLowerCase()) {
            case 'rank': sortfield = 'market_cap_rank'; break;
            case 'symbol': {
                sortfield = 'symbol'; 
                sortMethod = textSort;
                break;
            }
            case 'price': sortfield = 'current_price'; break;
            case '1h': sortfield = 'price_change_percentage_1h_in_currency'; break;
            case '24h': sortfield = 'price_change_percentage_24h_in_currency'; break;
            case '7d': sortfield = 'price_change_percentage_7d_in_currency'; break;
            case '24hvolume': sortfield = 'total_volume'; break;
            default: sortfield = 'market_cap'; break;
        }

        data.sort(sortMethod);
        return data;
    }

    static generateCoinTable(container, data, pagenum, pagesize) {
        let rankOffset = (pagenum-1) * pagesize + 1;

        for (let i=0; i < data.length; i++) {
            let {name, symbol, current_price, total_volume, 
                 market_cap, market_cap_rank, price_change_percentage_7d_in_currency, 
                 price_change_percentage_1h_in_currency, price_change_percentage_24h_in_currency } = data[i];

            let tr = `<tr>` + 
                        `<td>${market_cap_rank ? market_cap_rank : ''}</td>` +
                        `<td>${name} ${symbol.toUpperCase()}</td>` +
                        `<td class="text-right">${this.formatCurrency(current_price)}</td>` +
                        `<td class="text-right ${this.getColorClass(price_change_percentage_1h_in_currency)}">${this.formatPercentage(price_change_percentage_1h_in_currency)}</td>` +
                        `<td class="text-right ${this.getColorClass(price_change_percentage_24h_in_currency)}">${this.formatPercentage(price_change_percentage_24h_in_currency)}</td>` + 
                        `<td class="text-right ${this.getColorClass(price_change_percentage_7d_in_currency)}">${this.formatPercentage(price_change_percentage_7d_in_currency)}</td>` + 
                        `<td class="text-right">${this.formatCurrency(total_volume, 0)}</td>` +
                        `<td class="text-right">${this.formatCurrency(market_cap, 0)}<td><td></td>` +
                    `</tr>`;

            container.append(tr);
        }
    }

    static generateCoinTableHeader(container, {sortfield, sortorder, pagenum, pagesize}) {
        let link = (text, field, default_sortorder = 'desc') => {
            let newSortOrder = default_sortorder;
            if (sortfield == field) {
                // reverse sortorder for current sortfield
                newSortOrder = (sortorder == 'asc') ? 'desc' : 'asc';
            }
            return `<a href="index.html?sortfield=${field}&sortorder=${newSortOrder}&pagenum=${pagenum}&pagesize=${pagesize}">${text}</a>`;
        };

        let generateSortArrow = (field) => {
            if (field == sortfield) {
                if (sortorder == 'asc') {
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
                `<th>Last 7 Days</th>` +
            "</tr>"
        );
    }
};