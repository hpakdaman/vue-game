import { createApp } from "vue";
import App from "./App.vue";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faBurn, faHeart, faStopwatch, faTrophy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// import VueNumber from "vue-number-animation";
// plugins

library.add(faHeart);
library.add(faStopwatch);
library.add(faTrophy);
library.add(faBurn);

const app = createApp(App);

app.component("font-awesome-icon", FontAwesomeIcon);

// app.use(VueNumber);
// app.config.productionTip = false;

app.mount("#app");
