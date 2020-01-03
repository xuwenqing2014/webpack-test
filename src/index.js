import './css/reset.css';
import Person from './js/a.js';
const a = new Person();

import Vue from 'vue';
import App from './components/app.vue';
new Vue({
    el: '#app',
    render: h=>h(App)
})