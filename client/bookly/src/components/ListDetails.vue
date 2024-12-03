<template>
  <div>
    <!-- BARRA SUPERIOR -->
    <div class="bg-emerald-600 text-white py-4 px-6 flex justify-between items-center fixed top-0 left-0 w-full shadow-md z-50">
      <router-link to="/" class="flex items-center space-x-4">
        <img src="../assets/logo.png" alt="Logo" class="h-10 w-10 rounded-full" />
        <span class="text-xl font-semibold ml-2">Bookly</span>
      </router-link>
    </div>

    <!-- CONTENIDO -->
    <div class="pt-16 px-8">
      <div v-if="isLoading" class="text-center mt-8">
        <p class="text-gray-600">Cargando lista...</p>
      </div>
      <div v-else-if="list">
        <h1 class="text-3xl font-bold text-center mt-8">{{ list.title }}</h1>

        <!-- Libros en la Lista -->
        <div v-if="list.history.length === 0" class="text-center mt-8">
          <p class="text-gray-600">No hay libros en esta lista.</p>
        </div>
        <div v-else class="grid grid-cols-3 gap-6 mt-8">
          <div
            v-for="book in books"
            :key="book._id"
            class="border border-gray-300 p-4 rounded shadow"
          >
            <h3 class="text-xl font-bold">{{ book.title }}</h3>
            <p class="text-sm text-gray-600">{{ book.author }}</p>
            <img :src="book.image" :alt="book.title" class="mt-4 w-full h-[200px] object-cover rounded-lg" />
          </div>
        </div>
      </div>
      <div v-else class="text-center mt-8">
        <p class="text-red-600">No se pudo cargar la lista.</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ListDetails",
  data() {
    return {
      list: null,
      books: [],
      isLoading: true,
    };
  },
  methods: {
    async fetchListDetails() {
      try {
        const listId = this.$route.params.id;
        const response = await axios.get(`http://localhost:3000/lists/${listId}`);
        this.list = response.data;

        // Cargar los libros basados en la lista
        const bookIds = this.list.history;
        const bookRequests = bookIds.map((id) =>
          axios.get(`http://localhost:3000/books/${id}`)
        );
        const bookResponses = await Promise.all(bookRequests);
        this.books = bookResponses.map((res) => res.data);
      } catch (error) {
        console.error("Error al cargar los detalles de la lista:", error.response || error.message);
      } finally {
        this.isLoading = false;
      }
    },
  },
  async mounted() {
    await this.fetchListDetails();
  },
};
</script>

<style>
/* Personaliza los estilos */
</style>
