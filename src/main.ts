import { createApp } from "vue";
import App from "./App.vue";
import ArcoVue from "@arco-design/web-vue";
import { createPinia } from "pinia";
import "@arco-design/web-vue/dist/arco.css";
import router from "./router";
import "@/access";
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

const pinia = createPinia();

const app = createApp(App);

app.use(ArcoVue);
app.use(ElementPlus);
app.use(pinia);
app.use(router);

app.mount("#app");
