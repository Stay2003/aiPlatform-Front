import { createApp } from "vue";
import App from "./App.vue";
import ArcoVue from "@arco-design/web-vue";
import { createPinia } from "pinia";
import "@arco-design/web-vue/dist/arco.css";
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from "./router";
import "@/access";

const pinia = createPinia();

createApp(App).use(ArcoVue).use(ElementPlus).use(pinia).use(router).mount("#app");
