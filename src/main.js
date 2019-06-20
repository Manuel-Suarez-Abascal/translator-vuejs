import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

// Import bootstrap-vue
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);

new Vue({
  render: h => h(App)
}).$mount("#app");
