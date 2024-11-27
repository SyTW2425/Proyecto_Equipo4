<template>
<div class="bg-emerald-600 text-white py-4 px-6 flex justify-between items-center fixed top-0 left-0 w-full shadow-md z-50">
  <div class="flex items-center space-x-4">
    <img src="../assets/logo.png" alt="Logo" class="h-10 w-10 rounded-full">
    <span class="text-xl font-semibold">Bookly</span>
  </div>

  <!-- BARRA DE BÚSQUEDA -->
  <div class="flex items-center bg-white text-black rounded-full px-4 py-2 w-1/3">
    <input type="text" placeholder="Buscar..." class="flex-grow bg-transparent outline-none px-2">
    <button class="text-emerald-600 hover:text-emerald-800">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zm-7 4a7 7 0 1114 0 7 7 0 01-14 0zm14.707 6.293a1 1 0 00-1.414 0l-2.83 2.829a1 1 0 001.415 1.415l2.83-2.829a1 1 0 000-1.415z" clip-rule="evenodd" />
      </svg>
    </button>
  </div>    
  
  <nav>
    <ul>
      <li><router-link to="/sign-in">Sign In</router-link></li>
    </ul>
  </nav> 
</div>

<!-- BARRA IZQUIERDA -->
<div class="bg-emerald-600 w-64 h-screen fixed top-0 left-0 text-white flex flex-col justify-between">

<!-- Contenido superior -->
<div class="mt-8 p-16">
  <h2 class="text-lg font-bold underline">CATEGORÍAS</h2>
  <ul class="mt-4 space-y-4"> <!-- Añadí más espacio entre las categorías -->
    <li class="transition-transform ease-in-out duration-300 hover:translate-x-2">
      <a href="#" class="block py-4 text-center w-full border-b border-transparent hover:border-white hover:bg-emerald-700 rounded-lg">Libros de autoayuda</a>
    </li>
    <li class="transition-transform ease-in-out duration-300 hover:translate-x-2">
      <a href="#" class="block py-4 text-center w-full border-b border-transparent hover:border-white hover:bg-emerald-700 rounded-lg">Libros infantiles</a>
    </li>
    <li class="transition-transform ease-in-out duration-300 hover:translate-x-2">
      <a href="#" class="block py-4 text-center w-full border-b border-transparent hover:border-white hover:bg-emerald-700 rounded-lg">Fantasía</a>
    </li>
    <li class="transition-transform ease-in-out duration-300 hover:translate-x-2">
      <a href="#" class="block py-4 text-center w-full border-b border-transparent hover:border-white hover:bg-emerald-700 rounded-lg">Historia</a>
    </li>
    <li class="transition-transform ease-in-out duration-300 hover:translate-x-2">
      <a href="#" class="block py-4 text-center w-full border-b border-transparent hover:border-white hover:bg-emerald-700 rounded-lg">Libros prácticos</a>
    </li>
    <li class="transition-transform ease-in-out duration-300 hover:translate-x-2">
      <a href="#" class="block py-4 text-center w-full border-b border-transparent hover:border-white hover:bg-emerald-700 rounded-lg">Literatura</a>
    </li>
    <li class="transition-transform ease-in-out duration-300 hover:translate-x-2">
      <a href="#" class="block py-4 text-center w-full border-b border-transparent hover:border-white hover:bg-emerald-700 rounded-lg">Novedades</a>
    </li>
  </ul>
</div>

<!-- Contenido inferior -->
<div class="p-4 flex justify-center">
  <p class="text-sm">© 2024 Mi Web</p>
</div>
</div>


<!-- PANTALLA CENTRAL -->
<div class="ml-64 mt-[17vh] px-8 flex flex-col items-center">

<div class="absolute top-0 left-0 w-full h-[100vh] z-10">
  <video class="w-full h-full object-cover" autoplay loop muted>
    <source src="../assets/clip_cabecera_inicio.mp4" type="video/mp4">
  </video>
</div>      
    
<div class="flex justify-center space-x-32 w-full mt-[85vh]">

  
  <!-- Carrusel -->
  <div class="flex flex-col items-center space-y-4">
    <div class="flex items-start space-x-4">
      <!-- Contenedor con opciones hover y detalles del libro -->
      <div class="relative group w-[230px] h-[360px]">
        <!-- Imagen del libro -->
        <img src="../assets/books/book_1.jpg" alt="Libro 1" class="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105">
         
        <!-- Opciones flotantes al hacer hover -->
        <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center space-y-2">
          <!-- Botones con enlaces -->
          <a href="app/components/book/book.component.html" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-center">Comprar</a>
          <a href="book.html" class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 text-center">Ver reseñas</a>
          <a href="book.html" class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 text-center">Libros similares</a>
        </div>
      </div>
    
      <!-- Información del libro -->
      <div class="flex flex-col items-start">
        <!-- Título como enlace -->
        <a href="app/components/book/book.component.html" class="text-xl font-semibold text-blue-800 hover:underline"><router-link to="/book">Título del Libro 1</router-link></a>
        <p class="text-sm text-black">Autor 1</p>
        <p class="text-sm font-bold text-black">22.00€</p>
      </div>
    </div>
     

    <div class="flex items-start space-x-4">
      <!-- Contenedor con opciones hover y detalles del libro -->
      <div class="relative group w-[230px] h-[360px]">
        <!-- Imagen del libro -->
        <img src="../assets/books/book_2.jpg" alt="Libro 2" class="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105">
        
        <!-- Opciones flotantes al hacer hover -->
        <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center space-y-2">
          <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Comprar</button>
          <button class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Ver reseñas</button>
          <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Libros similares</button>
        </div>
      </div>
      
      <!-- Información del libro -->
      <div class="flex flex-col items-start">
        <h3 class="text-xl font-semibold text-blue-800">Título del Libro 2</h3>
        <p class="text-sm text-black">Autor 2</p>
        <p class="text-sm font-bold text-black">22.00€</p>
      </div>
    </div>      
    
    <div class="flex items-start space-x-4">
      <!-- Contenedor con opciones hover y detalles del libro -->
      <div class="relative group w-[230px] h-[360px]">
        <!-- Imagen del libro -->
        <img src="../assets/books/book_3.jpg" alt="Libro 3" class="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105">
        
        <!-- Opciones flotantes al hacer hover -->
        <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center space-y-2">
          <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Comprar</button>
          <button class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Ver reseñas</button>
          <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Libros similares</button>
        </div>
      </div>
      
      <!-- Información del libro -->
      <div class="flex flex-col items-start">
        <h3 class="text-xl font-semibold text-blue-800">Título del Libro 3</h3>
        <p class="text-sm text-black">Autor 3</p>
        <p class="text-sm font-bold text-black">19.50€</p>
      </div>
    </div> 
  </div>

  <!-- Carrusel del centro -->
  <div class="flex flex-col items-center space-y-4">
    <div class="flex items-start space-x-4">
      <!-- Contenedor con opciones hover y detalles del libro -->
      <div class="relative group w-[230px] h-[360px]">
        <!-- Imagen del libro -->
        <img src="../assets/books/book_4.webp" alt="Libro 4" class="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105">
        
        <!-- Opciones flotantes al hacer hover -->
        <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center space-y-2">
          <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Comprar</button>
          <button class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Ver reseñas</button>
          <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Libros similares</button>
        </div>
      </div>
      
      <!-- Información del libro -->
      <div class="flex flex-col items-start">
        <h3 class="text-xl font-semibold text-blue-800">Título del Libro 4</h3>
        <p class="text-sm text-black">Autor 4</p>
        <p class="text-sm font-bold text-black">23.20€</p>
      </div>
    </div> 
    
    <div class="flex items-start space-x-4">
      <!-- Contenedor con opciones hover y detalles del libro -->
      <div class="relative group w-[230px] h-[360px]">
        <!-- Imagen del libro -->
        <img src="../assets/books/book_5.jpg" alt="Libro 5" class="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105">
        
        <!-- Opciones flotantes al hacer hover -->
        <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center space-y-2">
          <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Comprar</button>
          <button class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Ver reseñas</button>
          <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Libros similares</button>
        </div>
      </div>
      
      <!-- Información del libro -->
      <div class="flex flex-col items-start">
        <h3 class="text-xl font-semibold text-blue-800">Título del Libro 5</h3>
        <p class="text-sm text-black">Autor 5</p>
        <p class="text-sm font-bold text-black">17.90€</p>
      </div>
    </div> 
    
    <div class="flex items-start space-x-4">
      <!-- Contenedor con opciones hover y detalles del libro -->
      <div class="relative group w-[230px] h-[360px]">
        <!-- Imagen del libro -->
        <img src="../assets/books/book_6.webp" alt="Libro 6" class="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105">
        
        <!-- Opciones flotantes al hacer hover -->
        <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center space-y-2">
          <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Comprar</button>
          <button class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Ver reseñas</button>
          <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Libros similares</button>
        </div>
      </div>
      
      <!-- Información del libro -->
      <div class="flex flex-col items-start">
        <h3 class="text-xl font-semibold text-blue-800">Título del Libro 6</h3>
        <p class="text-sm text-black">Autor 6</p>
        <p class="text-sm font-bold text-black">14.20€</p>
      </div>
    </div> 
  </div>

  <!-- Carrusel de la derecha -->
  <div class="flex flex-col items-center space-y-4">
    <div class="flex items-start space-x-4">
      <!-- Contenedor con opciones hover y detalles del libro -->
      <div class="relative group w-[230px] h-[360px]">
        <!-- Imagen del libro -->
        <img src="../assets/books/book_7.avif" alt="Libro 7" class="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105">
        
        <!-- Opciones flotantes al hacer hover -->
        <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center space-y-2">
          <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Comprar</button>
          <button class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Ver reseñas</button>
          <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Libros similares</button>
        </div>
      </div>
      
      <!-- Información del libro -->
      <div class="flex flex-col items-start">
        <h3 class="text-xl font-semibold text-blue-800">Título del Libro 7</h3>
        <p class="text-sm text-black">Autor 7</p>
        <p class="text-sm font-bold text-black">13.20€</p>
      </div>
    </div> 
    
    <div class="flex items-start space-x-4">
      <!-- Contenedor con opciones hover y detalles del libro -->
      <div class="relative group w-[230px] h-[360px]">
        <!-- Imagen del libro -->
        <img src="../assets/books/book_8.avif" alt="Libro 8" class="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105">
        
        <!-- Opciones flotantes al hacer hover -->
        <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center space-y-2">
          <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Comprar</button>
          <button class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Ver reseñas</button>
          <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Libros similares</button>
        </div>
      </div>
      
      <!-- Información del libro -->
      <div class="flex flex-col items-start">
        <h3 class="text-xl font-semibold text-blue-800">Título del Libro 8</h3>
        <p class="text-sm text-black">Autor 8</p>
        <p class="text-sm font-bold text-black">18.70€</p>
      </div>
    </div> 
    
    <div class="flex items-start space-x-4">
      <!-- Contenedor con opciones hover y detalles del libro -->
      <div class="relative group w-[230px] h-[360px]">
        <!-- Imagen del libro -->
        <img src="../assets/books/book_9.avif" alt="Libro 9" class="w-full h-full object-cover rounded-lg transition-transform duration-300 group-hover:scale-105">
        
        <!-- Opciones flotantes al hacer hover -->
        <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center space-y-2">
          <button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Comprar</button>
          <button class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">Ver reseñas</button>
          <button class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Libros similares</button>
        </div>
      </div>
      
      <!-- Información del libro -->
      <div class="flex flex-col items-start">
        <h3 class="text-xl font-semibold text-blue-800">Título del Libro 9</h3>
        <p class="text-sm text-black">Autor 9</p>
        <p class="text-sm font-bold text-black">21.55€</p>
      </div>
    </div> 
  </div>

</div>    
</div>

</template>

<script>
export default {
  name: 'Home',
};
</script>