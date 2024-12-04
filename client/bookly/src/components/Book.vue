<template>
  <div>
    <!-- BARRA SUPERIOR -->
    <div class="bg-emerald-600 text-white py-4 px-6 flex justify-between items-center fixed top-0 left-0 w-full shadow-md z-50">
  <router-link to="/" class="flex items-center space-x-4">
    <img src="../assets/logo.png" alt="Logo" class="h-10 w-10 rounded-full" />
    <span class="text-xl font-semibold ml-2">Bookly</span>
  </router-link>

  <!-- Usuario y menú -->
  <nav>
    <ul class="flex items-center space-x-4">
      <li v-if="!currentUser">
        <router-link to="/sign-in" class="text-white hover:text-gray-300">Login</router-link>
      </li>
      <li v-else class="relative">
        <button
          @click="toggleMenu"
          class="flex items-center space-x-2 text-white focus:outline-none"
        >
          <span>{{ currentUser.username }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <!-- Menú desplegable -->
        <div
          v-if="showMenu"
          class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
        >
          <router-link
            to="/book-list"
            class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Mis Listas
          </router-link>
          <router-link
            to="/my-reviews"
            class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Mis Reseñas
          </router-link>
          <button
            @click="logout"
            class="block w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      </li>
    </ul>
  </nav>
</div>


    <!-- BARRA IZQUIERDA -->
    <div class="bg-emerald-600 w-64 h-screen fixed top-0 left-0 text-white flex flex-col justify-between">
      <!-- Contenido superior -->
      <div class="mt-8 p-16">
        <h2 class="text-lg font-bold underline">Categorías</h2>
        <ul class="mt-4 space-y-2">
          <li><a href="#" class="hover:text-gray-400">Libros de autoayuda</a></li>
          <li><a href="#" class="hover:text-gray-400">Libros infantiles</a></li>
          <li><a href="#" class="hover:text-gray-400">Fantasía</a></li>
          <li><a href="#" class="hover:text-gray-400">Historia</a></li>
          <li><a href="#" class="hover:text-gray-400">Libros prácticos</a></li>
          <li><a href="#" class="hover:text-gray-400">Literatura</a></li>
          <li><a href="#" class="hover:text-gray-400">Novedades</a></li>
        </ul>
      </div>
      <!-- Contenido inferior -->
      <div class="p-4 flex justify-start">
        <p class="text-sm">© 2024 Mi Web</p>
      </div>
    </div>

    <!-- PANTALLA CENTRAL -->
    <div v-if="isLoading" class="flex justify-center items-center mt-32">
      <p class="text-lg font-bold text-gray-600">Cargando...</p>
    </div>

    <div v-else>
      <div class="flex justify-start items-start mt-32 ml-80 space-x-8">
        <!-- Imagen del libro -->
        <img :src="book.image" :alt="book.title" class="w-48 h-auto object-cover shadow-md" />

        <!-- Información del libro -->
        <div class="flex flex-col justify-start space-y-2">
          <h1 class="text-3xl font-semibold">{{ book.title }}</h1>
          <p class="text-lg text-gray-600">{{ book.author }}</p>
          <!-- Detalles del libro -->
          <div class="bg-white bg-opacity-60 p-4 mt-4 rounded-lg shadow-md">
            <h3 class="text-lg font-semibold">Detalles del libro</h3>
            <p class="text-sm mt-2 text-gray-700"><strong>Editorial:</strong> {{ book.publisher }}</p>
            <p class="text-sm mt-2 text-gray-700"><strong>Encuadernación:</strong> {{ book.binding }}</p>
            <p class="text-sm mt-2 text-gray-700"><strong>Páginas:</strong> {{ book.pages }}</p>
            <p class="text-sm mt-2 text-gray-700"><strong>ISBN:</strong> {{ book._id }}</p>
            <p class="text-sm mt-2 text-gray-700"><strong>Dimensiones:</strong> {{ book.dimensions }}</p>
            <p class="text-sm mt-2 text-gray-700"><strong>Idioma:</strong> {{ book.language }}</p>
          </div>
        </div>
      </div>

      <!-- Resumen -->
      <div class="ml-80 mt-8 w-[60%] space-y-8">
        <div class="bg-pink-100 bg-opacity-60 p-4 rounded-lg shadow-md">
          <h3 class="text-lg font-semibold">Resumen del libro</h3>
          <p class="text-sm mt-2 text-gray-700">{{ book.description }}</p>
        </div>
      </div>

      <!-- FORMULARIO PARA CREAR UNA RESEÑA -->
      <div class="mt-8 bg-white bg-opacity-60 p-4 rounded-lg shadow-md w-[60%] ml-80">
        <h3 class="text-lg font-semibold text-center">Escribe tu reseña</h3>
        <form @submit.prevent="crearResena" class="space-y-4">
          <div>
            <label for="titulo" class="block text-sm font-medium text-gray-700">Título de la reseña:</label>
            <input
              type="text"
              id="titulo"
              v-model="review.title"
              placeholder="Escribe un título para tu reseña"
              required
              class="block w-full rounded-lg border border-gray-300 py-2 px-3 text-gray-700 placeholder-gray-400 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          <div>
            <label for="descripcion" class="block text-sm font-medium text-gray-700">Descripción:</label>
            <textarea
              id="descripcion"
              v-model="review.description"
              placeholder="Describe tu experiencia con este libro"
              required
              rows="4"
              class="block w-full rounded-lg border border-gray-300 py-2 px-3 text-gray-700 placeholder-gray-400 focus:ring-emerald-500 focus:border-emerald-500"
            ></textarea>
          </div>

          <div>
            <label for="rating" class="block text-sm font-medium text-gray-700">Valoración:</label>
            <select
              id="rating"
              v-model="review.rating"
              required
              class="block w-full rounded-lg border border-gray-300 py-2 px-3 text-gray-700 placeholder-gray-400 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="" disabled selected>Selecciona una valoración</option>
              <option v-for="num in 5" :key="num" :value="num">{{ num }} Estrella(s)</option>
            </select>
          </div>

          <div>
            <button
              type="submit"
              class="rounded-full px-3 py-2 w-full text-sm flex justify-center bg-emerald-600 font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
            >
              Enviar Reseña
            </button>
          </div>
        </form>

        <div v-if="mensajeExito" class="mt-4 p-4 bg-green-100 text-green-700 border border-green-300 rounded-lg">
          <p>¡Reseña enviada con éxito!</p>
        </div>
      </div>

      <!-- Reseñas existentes -->
      <div class="mt-8 bg-white bg-opacity-60 p-4 rounded-lg shadow-md w-[60%] ml-80">
        <h3 class="text-lg font-semibold text-center">Reseñas del libro</h3>
        <div v-if="reviews.length > 0">
          <div
            v-for="(resena, index) in reviews"
            :key="index"
            class="mt-4 p-4 border border-gray-300 rounded-lg bg-gray-50"
          >
            <h4 class="text-md font-semibold">{{ resena.title }}</h4>
            <p class="text-sm text-gray-700">{{ resena.description }}</p>
            <p class="text-sm text-yellow-500">Valoración: {{ resena.rating }} Estrella(s)</p>
            <p class="text-xs text-gray-500">Por: {{ resena.user }} - {{ new Date(resena.created).toLocaleDateString() }}</p>
          </div>
        </div>
        <div v-else>
          <p class="text-gray-500 text-sm">No hay reseñas para este libro todavía.</p>
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
      book: null,
      bookId: this.$route.params.id,
      reviews: [],
      review: {
        user: null, // El usuario logeado se asignará aquí
        book: this.$route.params.id,
        title: "",
        description: "",
        rating: "",
      },
      mensajeExito: false,
      isLoading: true,
      currentUser: null, // Usuario actualmente logeado
      showMenu: false, // Controla la visibilidad del menú desplegable
    };
  },
  watch: {
    '$route.params.id': {
      handler(newId) {
        this.bookId = newId;
        this.loadBookDetails();
      },
      immediate: true,
    },
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu; // Alterna el estado del menú
    },
    logout() {
      localStorage.removeItem("authToken");
      this.user = null;
      this.showMenu = false;
      this.$router.push("/sign-in");
    },
    async loadBookDetails() {
      try {
        this.isLoading = true;
        this.book = null;
        const url = `http://localhost:3000/books/${this.bookId}`;
        const response = await axios.get(url);
        this.book = response.data;
        this.obtenerResenas();
      } catch (error) {
        console.error("Error al obtener detalles del libro:", error.response || error.message);
        alert("No se pudo cargar la información del libro.");
      } finally {
        this.isLoading = false;
      }
    },
    async crearResena() {
      if (!this.review.title || !this.review.description || !this.review.rating) {
        alert("Todos los campos son obligatorios.");
        return;
      }

      try {
        // Asigna el usuario actual antes de enviar la reseña
        this.review.user = this.currentUser.username;

        const url = "http://localhost:3000/reviews/create";
        await axios.post(url, this.review);
        this.mensajeExito = true;

        // Restablece el formulario de reseña
        this.review = {
          user: this.currentUser.username,
          book: this.bookId,
          title: "",
          description: "",
          rating: "",
        };
        this.obtenerResenas();
      } catch (error) {
        console.error("Error al enviar la reseña:", error.response || error.message);
        alert("Hubo un error al enviar la reseña.");
      }
    },
    async obtenerResenas() {
      try {
        const url = `http://localhost:3000/reviews/by-book?book=${this.bookId}`;
        const response = await axios.get(url);
        this.reviews = response.data;
      } catch (error) {
        console.error("Error al obtener las reseñas:", error.response || error.message);
        this.reviews = [];
      }
    },
    async fetchCurrentUser() {
      try {
        const response = await axios.get("http://localhost:3000/user", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        this.currentUser = response.data.user;
        this.review.user = this.currentUser.username; // Asigna el usuario logeado a las reseñas
      } catch (error) {
        console.error("Error al obtener el usuario actual:", error.response || error.message);
        this.currentUser = null;
      }
    },
  },
  async mounted() {
    await this.fetchCurrentUser();
    this.loadBookDetails();
  },
};
</script>
