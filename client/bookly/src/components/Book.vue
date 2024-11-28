<template>
  <!-- BARRA SUPERIOR -->
  <div class="bg-emerald-600 text-white py-4 px-6 flex justify-between items-start fixed top-0 left-0 w-full shadow-md z-50">
     <div class="flex items-start space-x-4">
       <img src="../assets/logo.png" alt="Logo" class="h-10 w-10 rounded-full">
       <span class="text-xl font-semibold"><router-link to="/">Bookly</router-link></span>
     </div>
     <!-- BARRA DE BÚSQUEDA -->
     <div class="flex items-start bg-white text-black rounded-full px-4 py-2 w-1/3">
       <input type="text" placeholder="Buscar..." class="flex-grow bg-transparent outline-none px-2">
       <button class="text-emerald-600 hover:text-emerald-800">
         <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
           <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zm-7 4a7 7 0 1114 0 7 7 0 01-14 0zm14.707 6.293a1 1 0 00-1.414 0l-2.83 2.829a1 1 0 001.415 1.415l2.83-2.829a1 1 0 000-1.415z" clip-rule="evenodd" />
         </svg>
       </button>
     </div>    
     
     <nav>
       <ul class="flex space-x-6">
         <li><a href="index.html" class="hover:text-gray-400">Inicio</a></li>
         <li><a href="sign_in.html" class="hover:text-gray-400">Login</a></li>
         <li><a href="#" class="hover:text-gray-400">Contacto</a></li>
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
 <div class="flex justify-start items-start mt-32 ml-80 space-x-8">
   <!-- Imagen del libro -->
   <img src="../assets/books/book_1.jpg" alt="Libro 1" class="w-48 h-auto object-cover shadow-md">
   
   <!-- Información del libro (a la derecha de la imagen) -->
   <div class="flex flex-col justify-start space-y-2">
     <h1 class="text-3xl font-semibold">El Título del Libro</h1>
     <p class="text-lg text-gray-600">Autor del Libro</p>
       <!-- Cuadro de detalles del libro -->
     <div class="bg-white bg-opacity-60 p-4 mt-4 rounded-lg shadow-md">
       <h3 class="text-lg font-semibold">Detalles del libro</h3>
       <p class="text-sm mt-2 text-gray-700">
         <strong>Editorial:</strong> Titania
       </p>
       <p class="text-sm mt-2 text-gray-700">
         <strong>Encuadernación:</strong> <span class="font-normal">Tapa dura</span>
       </p>
       <p class="text-sm mt-2 text-gray-700">
         <strong>Páginas:</strong> 234
       </p>
       <p class="text-sm mt-2 text-gray-700">
         <strong>ISBN:</strong> 9788419131812
       </p>
       <p class="text-sm mt-2 text-gray-700">
         <strong>Dimensiones:</strong> 23,6 x 15,3 cm
       </p>
       <p class="text-sm mt-2 text-gray-700">
         <strong>Idioma:</strong> Español
       </p>
     </div>
   </div>
 </div>
 <!-- Recuadro de resumen independiente -->
 <div class="ml-80 mt-8 w-[60%] space-y-8">
   <div class="bg-white bg-opacity-60 p-4 rounded-lg shadow-md">
     <h3 class="text-lg font-semibold">Resumen del libro</h3>
     <p class="text-sm mt-2 text-gray-700">
       Este es un breve resumen del contenido del libro, que describe la trama principal, los personajes y el mensaje central. Un resumen conciso que da al lector una idea de qué esperar sin revelar spoilers.
     </p>
   </div> 
 </div>
  <div>

    <!-- FORMULARIO PARA CREAR UNA RESEÑA -->
    <div class="mt-8 bg-white bg-opacity-60 p-4 rounded-lg shadow-md w-[60%] ml-80">
      <h3 class="text-lg font-semibold text-center">Escribe tu reseña</h3>
      <form @submit.prevent="crearResena" class="space-y-4">
        <!-- Campo Título -->
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

        <!-- Campo Descripción -->
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

        <!-- Campo Valoración -->
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

        <!-- Botón Enviar -->
        <div>
          <button
            type="submit"
            class="rounded-full px-3 py-2 w-full text-sm flex justify-center bg-emerald-600 font-semibold text-white shadow-sm hover:bg-emerald-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            Enviar Reseña
          </button>
        </div>
      </form>

      <!-- Mensaje de éxito -->
      <div v-if="mensajeExito" class="mt-4 p-4 bg-green-100 text-green-700 border border-green-300 rounded-lg">
        <p>¡Reseña enviada con éxito!</p>
      </div>
    </div>
  </div>
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

</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      bookId: "9788419131812", // ID del libro actual (puedes hacerlo dinámico)
      reviews: [], // Almacenará las reseñas del libro
      review: {
        user: "UsuarioActual", // Cambiar según el usuario logueado
        book: "9788419131812", // ID del libro
        title: "",
        description: "",
        rating: "",
      },
      mensajeExito: false,
    };
  },
  methods: {
    async crearResena() {
      if (!this.review.title || !this.review.description || !this.review.rating) {
        alert("Todos los campos son obligatorios.");
        return;
      }

      try {
        const url = "http://localhost:3000/reviews/create"; // Endpoint para crear reseñas
        const response = await axios.post(url, this.review);

        console.log("Reseña enviada:", response.data);
        this.mensajeExito = true;

        // Limpiar formulario
        this.review = {
          user: "UsuarioActual",
          book: this.bookId,
          title: "",
          description: "",
          rating: "",
        };

        // Actualizar la lista de reseñas después de agregar una nueva
        await this.obtenerResenas();
      } catch (error) {
        if (error.response?.status === 400) {
          alert("Error: Verifica los datos enviados.");
        } else if (error.response?.status === 500) {
          alert("Error del servidor. Por favor, intenta más tarde.");
        } else {
          alert("Error desconocido al enviar la reseña.");
        }
        console.error("Error al enviar la reseña:", error.response || error.message);
      }
    },
    async obtenerResenas() {
      try {
        const url = `http://localhost:3000/reviews/by-book?book=${this.bookId}`; // Endpoint correcto
        const response = await axios.get(url);
        this.reviews = response.data; // Asigna las reseñas al array
      } catch (error) {
        console.error("Error al obtener las reseñas:", error.response || error.message);
        this.reviews = []; // Asegúrate de que no haya datos rotos
      }
    },
  },
  mounted() {
    this.obtenerResenas();
  },
};
</script>


<style>
/* Puedes personalizar los estilos aquí */
</style>
