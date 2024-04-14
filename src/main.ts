import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/index.css'
import App from './App.vue'
import router from './router'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
import { VueFire, VueFireAuth, VueFireFirestoreOptionsAPI } from 'vuefire'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light'
  }
})
export const firebaseApp = initializeApp({
  apiKey: "AIzaSyDrCMtsrTuCbnLWj-NaHtxTO1KG_2X1VY0",
  authDomain: "nominas-vue-ut.firebaseapp.com",
  projectId: "nominas-vue-ut",
  storageBucket: "nominas-vue-ut.appspot.com",
  messagingSenderId: "58400371978",
  appId: "1:58400371978:web:8c0478505ed10cd8c8b6f3"
})

// used for the firestore refs
const db = getFirestore(firebaseApp)

// here we can export reusable database references
export const todosRef = collection(db, 'todos')

const app = createApp(App)

app.use(vuetify)
app.use(createPinia())
app.use(router)
app.use(VueFire, {
  // imported above but could also just be created here
  firebaseApp,
  modules: [
    // we will see other modules later on
    VueFireAuth(),
    VueFireFirestoreOptionsAPI(),
  ],
})
app.mount('#app')
