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
      <h1 class="text-2xl font-bold text-gray-800 underline">Regístrate</h1>

      <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 w-full sm:max-w-sm">
        <div class="bg-white p-6 shadow-lg rounded-lg">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Crea tu cuenta</h2>
          <form @submit.prevent="formularioRegistro" class="space-y-4">
            <!-- Campo Nombre de Usuario -->
            <div>
              <label for="username" class="block text-sm font-medium text-gray-700">Nombre de Usuario:</label>
              <input
                type="text"
                id="username"
                v-model="form.username"
                placeholder="Ingresa tu nombre de usuario"
                required
                class="block w-full rounded-lg border border-gray-300 py-2 px-3 text-gray-700 placeholder-gray-400 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <!-- Campo Nombre -->
            <div>
              <label for="nombre" class="block text-sm font-medium text-gray-700">Nombre:</label>
              <input
                type="text"
                id="name"
                v-model="form.name"
                placeholder="Ingresa tu nombre"
                required
                class="block w-full rounded-lg border border-gray-300 py-2 px-3 text-gray-700 placeholder-gray-400 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <!-- Campo Apellido -->
            <div>
              <label for="apellido" class="block text-sm font-medium text-gray-700">Apellido:</label>
              <input
                type="text"
                id="lastname"
                v-model="form.lastname"
                placeholder="Ingresa tu apellido"
                required
                class="block w-full rounded-lg border border-gray-300 py-2 px-3 text-gray-700 placeholder-gray-400 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <!-- Campo Correo Electrónico -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Correo Electrónico:</label>
              <input
                type="email"
                id="email"
                v-model="form.email"
                placeholder="Ingresa tu correo electrónico"
                required
                class="block w-full rounded-lg border border-gray-300 py-2 px-3 text-gray-700 placeholder-gray-400 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <!-- Campo Contraseña -->
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

            <!-- Botón de Registro -->
            <div>
              <button
                type="submit"
                class="rounded-full px-3 py-2 w-full text-sm flex justify-center bg-emerald-600 font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
              >
                Regístrate
              </button>
            </div>
          </form>

          <!-- Mensaje de confirmación -->
          <div v-if="mensajeEnviado" class="mt-6 p-4 bg-green-100 rounded-lg text-green-700 border border-green-300">
            <p><strong>¡Registro exitoso!</strong></p>
            <div>
              <button class="w-full bg-emerald-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-emerald-500 transition-all duration-300">
                <router-link to="/Sign-in" class="text-white">Inicia sesión</router-link>
              </button>
            </div>
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
        name: "",
        lastname: "",
        email: "",
        password: "",
      },
      mensajeEnviado: false,
    };
  },
  methods: {
    async formularioRegistro() {
      try {
        // URL del endpoint del backend
        const url = "http://localhost:3000/users/register";

        // Enviar datos al backend
        const respuesta = await axios.post(url, this.form);

        // Procesar respuesta del servidor
        console.log("Respuesta del servidor:", respuesta.data);
        this.mensajeEnviado = true;

        // Limpiar formulario
        this.form = {
          username: "",
          name: "",
          lastname: "",
          email: "",
          password: "",
        };
      } catch (error) {
        console.error("Error al registrar:", error.response || error.message);
        alert("Ocurrió un error al registrar. Por favor, inténtalo de nuevo.");
      }
    },
  },
};
</script>

<style>
/* Estilos específicos para personalizar el diseño */
</style>