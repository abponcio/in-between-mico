import numeral from "numeral";

export default {
  install(Vue) {
    Vue.prototype.numeral = numeral;
  },
};
