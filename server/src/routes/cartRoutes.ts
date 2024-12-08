import { Router } from "express";
import {
  getCart,
  addItemToCart,
  removeItemFromCart,
  clearCart,
} from "../controllers/cartController.js";

const router = Router();

// Obtener el carrito de un usuario
router.get("/:userId", getCart);

// Agregar un libro al carrito
router.post("/:userId/add", addItemToCart);

// Eliminar un libro del carrito
router.post("/:userId/remove", removeItemFromCart);

// Vaciar el carrito
router.post("/:userId/clear", clearCart);

export default router;
