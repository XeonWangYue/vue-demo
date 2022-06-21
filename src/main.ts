import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/display.css';
import ElementPlus from 'element-plus';
import formCreate from "@form-create/element-ui";

createApp(App).use(ElementPlus).use(formCreate).mount('#app')
