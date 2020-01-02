require('./css/reset.css');
const Person = require('./js/a.js');
const a = new Person();

import Vue from 'vue';
import App from './components/app.vue';
new Vue({
    el: '#app',
    render: h=>h(App)
})