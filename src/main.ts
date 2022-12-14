import { createApp } from "vue";
import { i18n } from "@/i18n";
import App from "./App.vue";

import "./assets/main.css";
import { createPinia } from "pinia";
import router from "@/router";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faCheck, faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faCheck, faDeleteLeft);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);
app.use(createPinia());
app.use(router);
app.use(i18n);

app.mount("#app");
