"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePurchase = exports.updatePurchase = exports.createPurchase = exports.getPurchaseById = exports.getPurchases = void 0;
const purchase_1 = __importDefault(require("../models/purchase"));
// Obtener todas las compras
const getPurchases = async (req, res) => {
    try {
        const purchases = await purchase_1.default.find();
        res.status(200).json(purchases);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getPurchases = getPurchases;
// Obtener una compra por ID
const getPurchaseById = async (req, res) => {
    try {
        const { id } = req.params;
        const purchase = await purchase_1.default.findById(id);
        if (!purchase) {
            res.status(404).json({ message: 'Purchase not found' });
            return;
        }
        res.status(200).json(purchase);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getPurchaseById = getPurchaseById;
// Crear una nueva compra
const createPurchase = async (req, res) => {
    try {
        const newPurchase = new purchase_1.default(req.body);
        await newPurchase.save();
        res.status(201).json(newPurchase);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.createPurchase = createPurchase;
// Actualizar una compra por ID
const updatePurchase = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPurchase = await purchase_1.default.findByIdAndUpdate(id, req.body, {
            new: true, // Devuelve el documento actualizado
            runValidators: true, // Ejecuta validaciones del esquema
        });
        if (!updatedPurchase) {
            res.status(404).json({ message: 'Purchase not found' });
            return;
        }
        res.status(200).json(updatedPurchase);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
exports.updatePurchase = updatePurchase;
// Eliminar una compra por ID
const deletePurchase = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPurchase = await purchase_1.default.findByIdAndDelete(id);
        if (!deletedPurchase) {
            res.status(404).json({ message: 'Purchase not found' });
            return;
        }
        res.status(200).json({ message: 'Purchase deleted successfully', purchase: deletedPurchase });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deletePurchase = deletePurchase;
