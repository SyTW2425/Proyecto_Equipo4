import Purchase from '../models/purchase.js';
// Obtener todas las compras
export const getPurchases = async (req, res) => {
    try {
        const purchases = await Purchase.find();
        res.status(200).json(purchases);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
// Obtener una compra por ID
export const getPurchaseById = async (req, res) => {
    try {
        const { id } = req.params;
        const purchase = await Purchase.findById(id);
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
// Crear una nueva compra
export const createPurchase = async (req, res) => {
    try {
        const newPurchase = new Purchase(req.body);
        await newPurchase.save();
        res.status(201).json(newPurchase);
    }
    catch (error) {
        res.status(400).json({ error: error.message });
    }
};
// Actualizar una compra por ID
export const updatePurchase = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedPurchase = await Purchase.findByIdAndUpdate(id, req.body, {
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
// Eliminar una compra por ID
export const deletePurchase = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPurchase = await Purchase.findByIdAndDelete(id);
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
