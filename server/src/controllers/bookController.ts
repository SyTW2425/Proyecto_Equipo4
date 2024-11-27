import { Request, Response } from 'express';
import Book from '../models/book';

// Obtener todos los libros
export const getBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener un libro por ISBN
export const getBookByIsbn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { isbn } = req.params;
    const book = await Book.findOne({ isbn });

    if (!book) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }

    res.status(200).json(book);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
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
    const { isbn } = req.params;
    const deletedBook = await Book.findOneAndDelete({ isbn });

    if (!deletedBook) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }

    res.status(200).json({ message: 'Book deleted successfully', book: deletedBook });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
