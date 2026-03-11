import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
  url: 'http://localhost:8180',
  realm: 'bookly',
  clientId: 'bookly-client',
});

export default keycloak;
