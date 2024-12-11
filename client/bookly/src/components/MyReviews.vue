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
        <ul>
          <li v-if="!user">
            <router-link to="/sign-in">Sign In</router-link>
          </li>
          <li v-else class="relative">
            <button
              @click="toggleMenu"
              class="flex items-center space-x-2 text-white focus:outline-none"
            >
              <span>{{ user.username }}</span>
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

    <!-- CONTENIDO -->
    <div class="pt-20 px-8">
      <h1 class="text-3xl font-bold text-center mt-8">Mis Reseñas</h1>

      <div v-if="isLoading" class="text-center mt-8">
        <p class="text-gray-600">Cargando reseñas...</p>
      </div>

      <div v-else-if="reviews.length === 0" class="text-center mt-8">
        <p class="text-gray-600">No has publicado ninguna reseña aún.</p>
      </div>

      <div v-else class="grid grid-cols-2 gap-6 mt-8">
        <div
          v-for="review in reviews"
          :key="review._id"
          class="border border-gray-300 p-4 rounded shadow"
        >
          <h3 class="text-xl font-bold">{{ review.title }}</h3>
          <p class="text-sm text-gray-600 mb-2">Libro: {{ review.bookTitle || "Título no disponible" }}</p>
          <p class="text-sm text-gray-600 mb-2">Calificación: {{ review.rating }}/5</p>
          <p class="text-gray-800">{{ review.description }}</p>
          <p class="text-gray-500 text-sm mt-2">Publicado: {{ formatDate(review.created) }}</p>
          <button
            @click="deleteReview(review._id)"
            class="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Eliminar Reseña
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "UserReviews",
  data() {
    return {
      reviews: [], // Lista de reseñas del usuario
      user: null, // Usuario autenticado
      isLoading: true, // Indicador de carga
      showMenu: false, // Controla el menú desplegable
    };
  },
  methods: {
    async fetchUserReviews() {
      try {
        const response = await axios.get(`http://localhost:3000/reviews/by-username`, {
          params: { username: this.user.username },
        });

        const reviews = response.data;

        // Obtener títulos de libros
        const bookRequests = reviews.map((review) =>
          axios.get(`http://localhost:3000/books/${review.book}`).catch(() => null)
        );

        const bookResponses = await Promise.all(bookRequests);

        // Asigna los títulos de los libros a las reseñas
        this.reviews = reviews.map((review, index) => ({
          ...review,
          bookTitle: bookResponses[index]?.data?.title || "Título no disponible",
        }));
      } catch (error) {
        console.error("Error al obtener las reseñas del usuario:", error.response || error.message);
      } finally {
        this.isLoading = false;
      }
    },
    async deleteReview(reviewId) {
      if (!confirm("¿Estás seguro de que quieres eliminar esta reseña?")) return;

      try {
        await axios.delete(`http://localhost:3000/reviews/${reviewId}`);
        this.reviews = this.reviews.filter((review) => review._id !== reviewId);
        alert("Reseña eliminada correctamente.");
      } catch (error) {
        console.error("Error al eliminar la reseña:", error.response || error.message);
        alert("Hubo un error al eliminar la reseña.");
      }
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    logout() {
      localStorage.removeItem("authToken");
      this.user = null;
      this.showMenu = false;
      this.$router.push("/sign-in");
    },
    formatDate(date) {
      const options = { year: "numeric", month: "long", day: "numeric" };
      return new Date(date).toLocaleDateString(undefined, options);
    },
    async fetchUser() {
      try {
        const response = await axios.get("http://localhost:3000/user", {
          headers: { authorization: `Bearer ${localStorage.getItem("authToken")}` },
        });
        this.user = response.data.user;
        await this.fetchUserReviews();
      } catch (error) {
        console.error("Error al obtener el usuario:", error.response || error.message);
      }
    },
  },
  async mounted() {
    await this.fetchUser();
  },
};
</script>

<style>
/* Personaliza los estilos */
</style>
