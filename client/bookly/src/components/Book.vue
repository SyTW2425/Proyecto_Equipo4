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
     <!-- Estrellas -->
     <div class="flex mt-2">
       <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 3.926L7.618 8.4 3.2 9.217a1 1 0 00-.554 1.732l3.604 3.278-1.031 5.9a1 1 0 001.449 1.057l4.667-2.446 4.667 2.446a1 1 0 001.448-1.057l-1.032-5.9 3.604-3.278a1 1 0 00-.554-1.732l-4.418-.817-1.43-4.474a1 1 0 00-1.892 0z"/></svg>
       <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 3.926L7.618 8.4 3.2 9.217a1 1 0 00-.554 1.732l3.604 3.278-1.031 5.9a1 1 0 001.449 1.057l4.667-2.446 4.667 2.446a1 1 0 001.448-1.057l-1.032-5.9 3.604-3.278a1 1 0 00-.554-1.732l-4.418-.817-1.43-4.474a1 1 0 00-1.892 0z"/></svg>
       <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 3.926L7.618 8.4 3.2 9.217a1 1 0 00-.554 1.732l3.604 3.278-1.031 5.9a1 1 0 001.449 1.057l4.667-2.446 4.667 2.446a1 1 0 001.448-1.057l-1.032-5.9 3.604-3.278a1 1 0 00-.554-1.732l-4.418-.817-1.43-4.474a1 1 0 00-1.892 0z"/></svg>
       <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 3.926L7.618 8.4 3.2 9.217a1 1 0 00-.554 1.732l3.604 3.278-1.031 5.9a1 1 0 001.449 1.057l4.667-2.446 4.667 2.446a1 1 0 001.448-1.057l-1.032-5.9 3.604-3.278a1 1 0 00-.554-1.732l-4.418-.817-1.43-4.474a1 1 0 00-1.892 0z"/></svg>
       <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 3.926L7.618 8.4 3.2 9.217a1 1 0 00-.554 1.732l3.604 3.278-1.031 5.9a1 1 0 001.449 1.057l4.667-2.446 4.667 2.446a1 1 0 001.448-1.057l-1.032-5.9 3.604-3.278a1 1 0 00-.554-1.732l-4.418-.817-1.43-4.474a1 1 0 00-1.892 0z"/></svg>
     </div>
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
   <!-- Recuadro de valoración del libro -->
   <div class="bg-white bg-opacity-60 p-4 rounded-lg shadow-md">
     <h3 class="text-lg font-semibold text-center">Danos tu valoración de este libro</h3>
     <div class="flex justify-center mt-2" id="rating-container">
       <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400 star" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 3.926L7.618 8.4 3.2 9.217a1 1 0 00-.554 1.732l3.604 3.278-1.031 5.9a1 1 0 001.449 1.057l4.667-2.446 4.667 2.446a1 1 0 001.448-1.057l-1.032-5.9 3.604-3.278a1 1 0 00-.554-1.732l-4.418-.817-1.43-4.474a1 1 0 00-1.892 0z"/></svg>
       <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400 star" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 3.926L7.618 8.4 3.2 9.217a1 1 0 00-.554 1.732l3.604 3.278-1.031 5.9a1 1 0 001.449 1.057l4.667-2.446 4.667 2.446a1 1 0 001.448-1.057l-1.032-5.9 3.604-3.278a1 1 0 00-.554-1.732l-4.418-.817-1.43-4.474a1 1 0 00-1.892 0z"/></svg>
       <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400 star" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 3.926L7.618 8.4 3.2 9.217a1 1 0 00-.554 1.732l3.604 3.278-1.031 5.9a1 1 0 001.449 1.057l4.667-2.446 4.667 2.446a1 1 0 001.448-1.057l-1.032-5.9 3.604-3.278a1 1 0 00-.554-1.732l-4.418-.817-1.43-4.474a1 1 0 00-1.892 0z"/></svg>
       <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400 star" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 3.926L7.618 8.4 3.2 9.217a1 1 0 00-.554 1.732l3.604 3.278-1.031 5.9a1 1 0 001.449 1.057l4.667-2.446 4.667 2.446a1 1 0 001.448-1.057l-1.032-5.9 3.604-3.278a1 1 0 00-.554-1.732l-4.418-.817-1.43-4.474a1 1 0 00-1.892 0z"/></svg>
       <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-gray-400 star" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 3.926L7.618 8.4 3.2 9.217a1 1 0 00-.554 1.732l3.604 3.278-1.031 5.9a1 1 0 001.449 1.057l4.667-2.446 4.667 2.446a1 1 0 001.448-1.057l-1.032-5.9 3.604-3.278a1 1 0 00-.554-1.732l-4.418-.817-1.43-4.474a1 1 0 00-1.892 0z"/></svg>
     </div>
     <p class="text-sm mt-2 text-gray-700 text-center" id="rating-text">Desliza sobre las estrellas para valorarlo</p>
   </div>
 </div>
 </template>
 
 <script>
   const stars = document.querySelectorAll('.star');
   const ratingText = document.getElementById('rating-text');
   stars.forEach((star, index) => {
     star.addEventListener('mouseover', () => {
       // Cambiar color de las estrellas
       stars.forEach((s, i) => {
         s.classList.remove('text-yellow-400');
         if (i <= index) {
           s.classList.add('text-yellow-400');
         }
       });
       ratingText.textContent = `Has valorado con ${index + 1} estrellas.`;
     });
 
     star.addEventListener('mouseout', () => {
       // Restaurar el color original
       stars.forEach(s => s.classList.remove('text-yellow-400'));
       ratingText.textContent = 'Desliza sobre las estrellas para valorarlo';
     });
   });
 </script>