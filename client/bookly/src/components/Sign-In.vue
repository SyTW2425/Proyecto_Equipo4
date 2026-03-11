<template>
  <div>
    <!-- BARRA SUPERIOR -->
    <div class="bg-emerald-600 text-white py-4 px-6 flex justify-between items-center fixed top-0 left-0 w-full shadow-md z-50">
      <div class="flex items-center space-x-4">
        <a href="index.html" class="flex items-center space-x-2">
          <img src="../assets/logo.png" alt="Logo" class="h-10 w-10 rounded-full">
          <span class="text-xl font-semibold"><router-link to="/">Bookly</router-link></span>
        </a>
      </div>
    </div>

    <!-- PANTALLA CENTRAL -->
    <div class="mt-32 px-8 flex flex-col items-center">
      <h1 class="text-2xl font-bold text-gray-800 underline">Inicio de sesión</h1>

      <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 w-full sm:max-w-sm">
        <div class="formulario bg-white p-6 shadow-lg rounded-lg flex flex-col items-center space-y-6">
          <p class="text-sm text-gray-600 text-center">
            Serás redirigido a la página de inicio de sesión segura.
          </p>
          <button
            @click="login"
            class="rounded-full px-6 py-3 w-full text-sm flex justify-center bg-emerald-600 font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            Iniciar sesión
          </button>

          <p class="text-center text-sm text-gray-600">
            ¿No tienes cuenta?
            <router-link to="/sign-up" class="font-semibold text-emerald-600 hover:underline">
              Regístrate aquí
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    login() {
      this.$keycloak.login({ redirectUri: window.location.origin + '/' });
    },
  },
  mounted() {
    if (this.$keycloak.authenticated) {
      this.$router.push('/');
    }
  },
};
</script>

<style>
.formulario {
  max-width: 100%;
  margin: 0 auto;
}
</style>
