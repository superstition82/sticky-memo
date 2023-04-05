import { createApp } from "vue";
import { createPinia } from "pinia";
import "./global.css";
import App from "./App.vue";

const pinia = createPinia();

createApp(App).use(pinia).mount("#app");
