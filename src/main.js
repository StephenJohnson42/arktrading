import { createApp } from 'vue'
import App from './App.vue'
import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'
import PrimeVue from 'primevue/config';

import Button from 'primevue/button';

import 'primevue/resources/themes/saga-blue/theme.css';      //theme
import 'primevue/resources/primevue.min.css';                 //core css
import 'primeicons/primeicons.css';                           //icons
import Chart from 'primevue/chart';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
//import ColumnGroup from 'primevue/columngroup';  

const app = createApp(App);
app.use(PrimeVue);

//**** App Components
app.component('Chart', Chart);
app.component('Button', Button);
app.component("DataTable", DataTable);
app.component("Column", Column);
//**** 

Amplify.configure(awsconfig)
app.mount('#app')
