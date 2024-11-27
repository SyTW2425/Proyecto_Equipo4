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
        <div class="formulario bg-white p-6 shadow-lg rounded-lg">
          <form @submit.prevent="formularioInicio" class="space-y-4">
            <div>
              <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre de usuario:</label>
              <input
                type="text"
                id="nombre"
                v-model="form.username"
                placeholder="Ingresa tu nombre de usuario"
                required
                class="block w-full rounded-lg border border-gray-300 py-2 px-3 text-gray-700 placeholder-gray-400 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Contraseña:</label>
              <input
                type="password"
                id="password"
                v-model="form.password"
                placeholder="Ingresa tu contraseña"
                required
                class="block w-full rounded-lg border border-gray-300 py-2 px-3 text-gray-700 placeholder-gray-400 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div>
              <button
                type="submit"
                class="rounded-full px-3 py-2 w-full text-sm flex justify-center bg-emerald-600 font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              >
                Iniciar sesión
              </button>
            </div>
          </form>

          <!-- Mensaje de Registro -->
          <p class="mt-4 text-center text-sm text-gray-600">
            ¿No tienes cuenta? 
            <router-link to="/sign-up" class="font-semibold text-emerald-600 hover:underline">
              Regístrate aquí
            </router-link>
          </p>

          <div v-if="mensajeEnviado" class="mt-6 p-4 bg-green-100 rounded-lg text-green-700 border border-green-300">
            <p><strong>¡Formulario enviado!</strong></p>
            <p><strong>Nombre:</strong> {{ form.username }}</p>
            <p><strong>Contraseña:</strong> {{ form.password }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      mensajeEnviado: false,
    };
  },
  methods: {
    async formularioInicio() {
      try {
        // URL del endpoint del backend (asegúrate de que esta ruta sea la correcta)
        const url = "http://localhost:3000/users/login";

        // Enviar datos del formulario (nombre de usuario y contraseña) al backend
        const respuesta = await axios.post(url, {
          username: this.form.username,
          password: this.form.password,
        });

        // Procesar respuesta del servidor
        console.log("Respuesta del servidor:", respuesta.data);

        // Si el inicio de sesión es exitoso, puedes hacer algo aquí (e.g., redirigir al usuario)
        // Por ejemplo, guardar un token en el localStorage
        localStorage.setItem('authToken', respuesta.data.token);  // Suponiendo que el token se devuelve en la respuesta

        // Redirigir al usuario a otra página después de iniciar sesión (e.g., al dashboard)
        this.$router.push('/');  // Ajusta la ruta según corresponda

        // Limpiar formulario si es necesario
        this.form = {
          username: "",
          password: "",
        };

        // Si lo deseas, mostrar un mensaje de éxito
        this.mensajeEnviado = true;

      } catch (error) {
        console.error("Error al iniciar sesión", error.response || error.message);
        alert(error.response.data.message || "Ocurrió un error al iniciar sesión. Por favor, inténtalo de nuevo.");
      }
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