import "./style.css";
import App from "./App.vue";
import { createApp } from "vue";
import disableDevtool from'disable-devtool';

// https://github.com/theajack/disable-devtool/blob/master/README.cn.md
disableDevtool({url: "https://www.baidu.com/",  timeOutUrl: "https://www.baidu.com/"});

const app = createApp(App);
app.mount("#app");
