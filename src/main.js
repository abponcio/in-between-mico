import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./plugins/bootstrap";
import firebase from "./plugins/firebase";
import numeral from "./plugins/numeral";
import MLoader from "@/components/ui/MLoader";

Vue.component("m-loader", MLoader);

Vue.config.productionTip = false;

Vue.use(firebase);
Vue.use(numeral);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
