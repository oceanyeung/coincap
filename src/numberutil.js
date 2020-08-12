export default class NumberUtil {
    static clamp(num, min, max) {
        return Math.min(Math.max(num, min), max);
    }
}