/* v8 ignore start */
import { createApp } from 'vue';
import App from './App.vue';
import { i18n } from '@/utils/i18n';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTrash, faPenToSquare, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

import '@/assets/styles/main.css';
library.add(faTrash, faPenToSquare, faFloppyDisk);

createApp(App).use(i18n).component('font-awesome-icon', FontAwesomeIcon).mount('#app');
