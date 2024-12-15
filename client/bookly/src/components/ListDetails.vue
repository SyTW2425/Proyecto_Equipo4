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
      <!-- Notificación -->
      <div
        v-if="notification.message"
        :class="['fixed bottom-4 right-4 p-4 rounded shadow-lg', notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white']"
      >
        {{ notification.message }}
      </div>

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
            <button
              @click="removeBookFromList(book._id)"
              class="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Eliminar de la Lista
            </button>
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
      list: null, // Detalles de la lista
      books: [], // Detalles de los libros en la lista
      isLoading: true, // Indicador de carga
      notification: { message: "", type: "" }, // Notificación dinámica
    };
  },
  methods: {
    showNotification(message, type) {
      this.notification = { message, type };
      setTimeout(() => {
        this.notification = { message: "", type: "" };
      }, 3000);
    },
    async fetchListDetails() {
      try {
        const listId = this.$route.params.id; // ID de la lista desde la ruta
        const response = await axios.get(`http://localhost:3000/lists/${listId}`);
        this.list = response.data;

        // Cargar los detalles de los libros basados en los IDs de la lista
        const bookIds = this.list.history || [];
        const bookRequests = bookIds.map((id) =>
          axios.get(`http://localhost:3000/books/${id}`)
        );
        const bookResponses = await Promise.all(bookRequests);
        this.books = bookResponses.map((res) => res.data);
      } catch (error) {
        console.error("Error al cargar los detalles de la lista:", error.response || error.message);
      } finally {
        this.isLoading = false; // Detiene el indicador de carga
      }
    },
    async removeBookFromList(bookId) {
      if (!confirm("¿Estás seguro de que quieres eliminar este libro de la lista?")) return;

      try {
        const listId = this.$route.params.id; // ID de la lista desde la ruta

        // Realiza la solicitud al backend para eliminar el libro
        await axios.patch("http://localhost:3000/lists/remove-book", {
          listId,
          bookId,
        });

        // Actualiza la lista y libros localmente
        this.list.history = this.list.history.filter((id) => id !== bookId);
        this.books = this.books.filter((book) => book._id !== bookId);

        // Muestra una notificación de éxito
        this.showNotification("Libro eliminado de la lista correctamente.", "success");
      } catch (error) {
        console.error("Error al eliminar el libro de la lista:", error.response || error.message);
        this.showNotification("Hubo un error al eliminar el libro de la lista.", "error");
      }
    },
  },
  async mounted() {
    await this.fetchListDetails(); // Carga los detalles de la lista al montar el componente
  },
};
</script>

<style>
/* Personaliza los estilos */
</style>
