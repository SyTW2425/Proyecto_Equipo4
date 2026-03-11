import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import keycloak from './keycloak';

keycloak
  .init({
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
  })
  .then(() => {
    const app = createApp(App);
    app.config.globalProperties.$keycloak = keycloak;
    app.use(router);
    app.mount('#app');
  });
