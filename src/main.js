import Vue from "vue";
import App from "./App.vue";
import Buefy from "buefy";
import router from "./router";
import "buefy/dist/buefy.css";
import axios from "axios";
// import Cookies from 'js-cookie'

axios.defaults.baseURL = "http://localhost:3000";
axios.interceptors.request.use(
  function (config) {
    // const token = Cookies.get('jwt');
    // const token = store.getters.token;
    // if (token != undefined) {
      // axios.defaults.withCredentials = true;
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

axios.interceptors.response.use(function (response) {
    console.log(response);
    // if () {
      
    // }
    return response;
  }, function (error) {
    return Promise.reject(error);
  });
Vue.config.productionTip = false;
Vue.use(Buefy);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
