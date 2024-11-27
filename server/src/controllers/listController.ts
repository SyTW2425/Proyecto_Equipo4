import { Request, Response } from 'express';
import List from '../models/list';

// Obtener todas las listas de libros
export const getLists = async (req: Request, res: Response): Promise<void> => {
  try {
    const lists = await List.find().populate("user", "username email");
    res.json(lists);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Obtener una lista de libros por su ID
export const getList = async (req: Request, res: Response): Promise<void> => {
  try {
    const list = await List.findById(req.params.id).populate("user", "username email");
    res.json(list);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Crear una nueva lista de libros
export const createList = async (req: Request, res: Response): Promise<void> => {
  try {
    const list = new List(req.body);
    await list.save();
    res.status(201).json(list);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Actualizar una lista de libros por su ID
export const updateList = async (req: Request, res: Response): Promise<void> => {
  try {
    const list = await List.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(list);
  } catch (error) {
    res.status(400).json(error);
  }
};

// Eliminar una lista de libros por su ID
export const deleteList = async (req: Request, res: Response): Promise<void> => {
  try {
    await List.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json(error);
  }
};
