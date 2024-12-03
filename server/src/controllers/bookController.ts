import { Request, Response } from 'express';
import Book from '../models/book.js';

// Obtener todos los libros
export const getBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getBookById = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookId = req.params.id; // Obtén el ID del libro desde los parámetros de la ruta

    if (!bookId) {
      res.status(400).json({ message: "El ID del libro es obligatorio." });
      return;
    }

    // Busca el libro en la base de datos por su _id
    const book = await Book.findById(bookId);

    if (!book) {
      res.status(404).json({ message: "Libro no encontrado." });
      return;
    }

    res.status(200).json(book); // Devuelve el libro encontrado
  } catch (error) {
    console.error("Error al obtener el libro:", error);
    res.status(500).json({ message: "Error al obtener el libro." });
  }
};

// Crear un nuevo libro
export const createBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Actualizar un libro por ISBN
export const updateBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { isbn } = req.params;
    const updatedBook = await Book.findOneAndUpdate({ isbn }, req.body, {
      new: true, // Devuelve el documento actualizado
      runValidators: true, // Ejecuta validaciones del esquema
    });

    if (!updatedBook) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }

    res.status(200).json(updatedBook);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Eliminar un libro por ISBN
export const deleteBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const bookId = req.params.id; // Obtén el ID del libro desde los parámetros de la ruta

    if (!bookId) {
      res.status(400).json({ message: "El ID del libro es obligatorio." });
      return;
    }

    // Busca y elimina el libro en la base de datos por su _id
    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      res.status(404).json({ message: "Libro no encontrado." });
      return;
    }

    res.status(200).json({ message: "Libro eliminado con éxito.", book: deletedBook });
  } catch (error) {
    console.error("Error al eliminar el libro:", error);
    res.status(500).json({ message: "Error al eliminar el libro." });
  }
};
