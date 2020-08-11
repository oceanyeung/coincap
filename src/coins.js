export default class Coins {
    static formatAmount(amount, digits=2) {
        if (amount >= 1) {
            // >= $1.00, only shows at most 2 decimals by default
            return new Intl.NumberFormat('en-us', { style: 'currency', currency: 'USD', minimumFractionDigits: digits }).format(amount);
        } 

        // < $1.00, shows up to 6 decimals
        return new Intl.NumberFormat('en-us', { style: 'currency', currency: 'USD', maximumSignificantDigits: 6 }).format(amount);
    }

    static createCoinTable(container, data, params) {
        let {pagesize, pagenum} = params;
        let rankOffset = (pagenum-1) * pagesize + 1;

        for (let i=0; i < data.length; i++) {
            let coin = data[i];
            let {name, current_price, price_change_percentage_24h, total_volume, market_cap } = data[i];

            let tr = `<tr>` + 
                        `<td>${i+rankOffset}</td>` +
                        `<td>${name}</td>` +
                        `<td class="text-right">${Coins.formatAmount(current_price)}</td>` +
                        `<td></td>` +
                        `<td>${price_change_percentage_24h}</td>` + 
                        `<td></td>` + 
                        `<td class="text-right">${Coins.formatAmount(total_volume, 0)}</td>` +
                        `<td class="text-right">${Coins.formatAmount(market_cap, 0)}<td><td></td>` +
                    `</tr>`;

            container.append(tr);
        }
    }
};