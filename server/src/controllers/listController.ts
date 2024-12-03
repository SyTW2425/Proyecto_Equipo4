import { Request, Response } from "express";
import List from "../models/list";
import User from "../models/user";
import Book from "../models/book";

// Obtener todas las listas
export const getLists = async (req: Request, res: Response): Promise<void> => {
  try {
    const lists = await List.find().populate("user", "username").populate("history", "title");
    res.status(200).json(lists);
  } catch (error: any) {
    res.status(500).json({ message: "Error al obtener las listas", error: error.message });
  }
};

// Obtener una lista por ID
export const getListById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "El ID de la lista es obligatorio." });
      return;
    }

    const list = await List.findById(id).populate("user", "username").populate("history", "title");

    if (!list) {
      res.status(404).json({ message: "Lista no encontrada." });
      return;
    }

    res.status(200).json(list);
  } catch (error: any) {
    res.status(500).json({ message: "Error al obtener la lista.", error: error.message });
  }
};

// Crear una nueva lista
export const createList = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, username } = req.body;

    if (!title || !username) {
      res.status(400).json({ message: "El título y el nombre de usuario son obligatorios." });
      return;
    }

    const user = await User.findOne({ username });

    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado." });
      return;
    }

    const newList = new List({ title, user: user._id });
    await newList.save();

    res.status(201).json({ message: "Lista creada exitosamente.", list: newList });
  } catch (error: any) {
    res.status(500).json({ message: "Error al crear la lista.", error: error.message });
  }
};

// Actualizar una lista por ID
export const updateList = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, history } = req.body;

    const updatedList = await List.findByIdAndUpdate(
      id,
      { title, history },
      { new: true, runValidators: true }
    );

    if (!updatedList) {
      res.status(404).json({ message: "Lista no encontrada." });
      return;
    }

    res.status(200).json({ message: "Lista actualizada exitosamente.", list: updatedList });
  } catch (error: any) {
    res.status(500).json({ message: "Error al actualizar la lista.", error: error.message });
  }
};

// Eliminar una lista por ID
export const deleteList = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedList = await List.findByIdAndDelete(id);

    if (!deletedList) {
      res.status(404).json({ message: "Lista no encontrada." });
      return;
    }

    res.status(200).json({ message: "Lista eliminada exitosamente.", list: deletedList });
  } catch (error: any) {
    res.status(500).json({ message: "Error al eliminar la lista.", error: error.message });
  }
};

// Agregar un libro a la lista
export const addBookToList = async (req: Request, res: Response): Promise<void> => {
  try {
    const { listId, bookId } = req.body;

    if (!listId || !bookId) {
      res.status(400).json({ message: "El ID de la lista y del libro son obligatorios." });
      return;
    }

    const list = await List.findById(listId);

    if (!list) {
      res.status(404).json({ message: "Lista no encontrada." });
      return;
    }

    const book = await Book.findById(bookId);

    if (!book) {
      res.status(404).json({ message: "Libro no encontrado." });
      return;
    }

    if (!list.history.includes(bookId)) {
      list.history.push(bookId);
      await list.save();
    } else {
      res.status(400).json({ message: "El libro ya está en la lista." });
      return;
    }

    res.status(200).json({ message: "Libro añadido a la lista.", list });
  } catch (error: any) {
    res.status(500).json({ message: "Error al añadir el libro a la lista.", error: error.message });
  }
};
