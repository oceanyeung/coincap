export default class NumberUtil {
    static clamp(num, min, max) {
        return Math.min(Math.max(num, min), max);
    }

    static formatCurrency(val, digits=2) {
        if (Number(val) >= 1) {
            // >= $1.00, only shows at most 2 decimals by default
            return new Intl.NumberFormat('en-us', { style: 'currency', currency: 'USD', minimumFractionDigits: digits }).format(val);
        } 

        // < $1.00, shows up to 6 decimals
        return new Intl.NumberFormat('en-us', { style: 'currency', currency: 'USD', maximumSignificantDigits: 6 }).format(val);
    }

    static formatNumber(val, digits=2, append = '') {
        return new Intl.NumberFormat('en-us', { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(val) + append;
    }

    static formatPercentage(val, digits=2) {
        return this.formatNumber(val, digits, '%');
    }
}