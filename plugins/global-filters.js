import Vue from "vue";
import { currency, formatCurrency } from "~/utils/currency";
import { formatDate } from "~/utils/date";

/**
 * Register Vue Filters
 */
Vue.filter("currency", currency);
Vue.filter("formatCurrency", formatCurrency);
Vue.filter("formatDate", formatDate);
