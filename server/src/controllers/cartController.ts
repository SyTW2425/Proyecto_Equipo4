import { Request, Response } from "express";
import Cart from "../models/cart.js";
import Book from "../models/book.js";

// Obtener el carrito de un usuario
export const getCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({ message: "El ID del usuario es obligatorio." });
      return;
    }

    const cart = await Cart.findOne({ user: userId }).populate("items.book", "title price image");

    if (!cart) {
      res.status(404).json({ message: "Carrito no encontrado." });
      return;
    }

    res.status(200).json(cart);
  } catch (error: any) {
    res.status(500).json({ message: "Error al obtener el carrito.", error: error.message });
  }
};

// Agregar un libro al carrito
import mongoose from "mongoose";

export const addItemToCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const { bookId, quantity } = req.body;

    if (!userId || !bookId || !quantity) {
      res.status(400).json({ message: "El ID del usuario, libro y la cantidad son obligatorios." });
      return;
    }

    const cart = await Cart.findOne({ user: userId });

    if (cart) {
      const existingItem = cart.items.find((item) => item.book === bookId);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ book: bookId, quantity });
      }

      await cart.save();
      res.status(200).json({ message: "Libro añadido al carrito.", cart });
    } else {
      const newCart = new Cart({
        user: userId,
        items: [{ book: bookId, quantity }],
      });

      await newCart.save();
      res.status(201).json({ message: "Carrito creado y libro añadido.", cart: newCart });
    }
  } catch (error: any) {
    res.status(500).json({ message: "Error al añadir el libro al carrito.", error: error.message });
  }
};



// Eliminar un libro del carrito
export const removeItemFromCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const { bookId } = req.body;

    if (!userId || !bookId) {
      res.status(400).json({ message: "El ID del usuario y del libro son obligatorios." });
      return;
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      res.status(404).json({ message: "Carrito no encontrado." });
      return;
    }

    cart.items = cart.items.filter((item) => item.book.toString() !== bookId);

    await cart.save();
    res.status(200).json({ message: "Libro eliminado del carrito.", cart });
  } catch (error: any) {
    res.status(500).json({ message: "Error al eliminar el libro del carrito.", error: error.message });
  }
};

// Vaciar el carrito
export const clearCart = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({ message: "El ID del usuario es obligatorio." });
      return;
    }

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      res.status(404).json({ message: "Carrito no encontrado." });
      return;
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({ message: "Carrito vaciado.", cart });
  } catch (error: any) {
    res.status(500).json({ message: "Error al vaciar el carrito.", error: error.message });
  }
};
