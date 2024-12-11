import request from 'supertest';
import { expect } from 'chai';
import app from '../../src/app.js';
import mongoose from 'mongoose';

describe('Cart Controller', () => {
  let userId: string;
  let bookId: string;

  before(async () => {
    try {

      // Crear un usuario
      const userResponse = await request(app)
        .post('/users/register')
        .send({
          username: 'testuser3',
          password: 'password123',
          name: 'Test',
          lastname: 'User',
          email: 'testuser3@example.com',
        });

      expect(userResponse.status).to.equal(201);
      userId = userResponse.body._id;

      // Crear un libro
      const bookResponse = await request(app)
        .post('/books/create')
        .send({
          _id: '978-3-16-148410-1',
          title: '1984',
          author: 'George Orwell',
          description: 'A dystopian social science fiction novel and cautionary tale.',
          publisher: 'Secker & Warburg',
          year: 1949,
          binding: 'Hardcover',
          pages: 328,
          dimensions: '8.5 x 5.8 inches',
          language: 'English',
          price: 9.99,
          image: 'http://example.com/1984.jpg',
        });

      expect(bookResponse.status).to.equal(201);
      bookId = bookResponse.body._id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  });

  // Test para agregar un libro al carrito
it('debería agregar un libro al carrito', (done) => {
    const newItem = {
      bookId: bookId,
      quantity: 1,
    };
  
    request(app)
      .post(`/cart/${userId}/add`)
      .send(newItem)
      .expect((res) => {
        // Aceptar tanto 200 como 201
        if (res.status === 201) {
          expect(res.body).to.have.property('message', 'Carrito creado y libro añadido.');
        } else if (res.status === 200) {
          expect(res.body).to.have.property('message', 'Libro añadido al carrito.');
        } else {
          throw new Error(`Status code is not 200 or 201: ${res.status}`);
        }
        expect(res.body.cart.items).to.have.lengthOf(1);
        expect(res.body.cart.items[0]).to.have.property('book', bookId);
        expect(res.body.cart.items[0]).to.have.property('quantity', 1);
      })
      .end((err, res) => {
        if (err) return done(err);
        done();
      });
  });
  

  // Test para agregar más cantidad de un libro al carrito
  it('debería aumentar la cantidad de un libro en el carrito', (done) => {
    const newItem = {
      bookId: bookId,
      quantity: 2,
    };

    request(app)
      .post(`/cart/${userId}/add`)
      .send(newItem)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('message', 'Libro añadido al carrito.');
        expect(res.body.cart.items).to.have.lengthOf(1); // Solo un libro
        expect(res.body.cart.items[0]).to.have.property('quantity', 3); // Se debe haber incrementado a 3
        done();
      });
  });

  // Test para eliminar un libro del carrito
  it('debería eliminar un libro del carrito', (done) => {
    const removeItem = {
      bookId: bookId,
    };

    request(app)
      .post(`/cart/${userId}/remove`)
      .send(removeItem)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('message', 'Libro eliminado del carrito.');
        expect(res.body.cart.items).to.be.an('array').that.is.empty; // El carrito debe estar vacío
        done();
      });
  });

  // Test para vaciar el carrito
  it('debería vaciar el carrito', (done) => {
    request(app)
      .post(`/cart/${userId}/clear`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('message', 'Carrito vaciado.');
        expect(res.body.cart.items).to.be.an('array').that.is.empty; // El carrito debe estar vacío
        done();
      });
  });

  after(async () => {
    try {
      // Eliminar el libro creado usando la función definida
    await request(app)
    .delete(`/books/${bookId}`) // Utilizamos la ruta implementada para eliminar el libro
    .expect(200)
    .catch(err => console.error('Error al eliminar el libro:', err));
  
      // Validar y convertir `userId` si es un ObjectId válido
      if (mongoose.Types.ObjectId.isValid(userId)) {
        const userIdObject = new mongoose.Types.ObjectId(userId);
        await mongoose.connection.collection('users').deleteOne({ _id: userIdObject });
      } else {
        console.error('userId no es un ObjectId válido:', userId);
      }
    } catch (error) {
      console.error('Error al limpiar la base de datos:', error);
    }
  });
  
  
});
