import request from 'supertest';
import { expect } from 'chai';
import app from '../../src/app.js';

describe('Book Controller', () => {
  
  let createdBookId: string;

  // Test para crear un nuevo libro
  it('debería crear un nuevo libro', (done) => {
    const newBook = {
      _id: '123-6-16-17840-1', // Ejemplo de ISBN como _id
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      description: 'A novel set in the Jazz Age that critiques the American Dream.',
      publisher: 'Scribner',
      year: 1925,
      binding: 'Hardcover',
      pages: 180,
      dimensions: '8.5 x 5.8 inches',
      language: 'English',
      price: 15.99,
      image: 'http://example.com/gatsby.jpg',
    };

    request(app)
      .post('/books/create')
      .send(newBook)
      .expect(201) // Espera un código de respuesta 201
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('title', 'The Great Gatsby');
        expect(res.body).to.have.property('author', 'F. Scott Fitzgerald');
        expect(res.body).to.have.property('price', 15.99);
        createdBookId = res.body._id; // Guarda el ID del libro creado para usarlo en otras pruebas
        done();
      });
  });

  // Test para obtener todos los libros
  it('debería obtener todos los libros', (done) => {
    request(app)
      .get('/books')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  // Test para obtener un libro por ID
  it('debería obtener un libro por ID', (done) => {
    request(app)
      .get(`/books/${createdBookId}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('_id', createdBookId);
        done();
      });
  });

  // Test para actualizar un libro
  it('debería actualizar un libro existente', (done) => {
    const updatedBook = {
      title: 'The Great Gatsby.',
      price: 19.99
    };

    request(app)
      .put(`/books/${createdBookId}`)
      .send(updatedBook)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('title', 'The Great Gatsby.');
        expect(res.body).to.have.property('price', 19.99);
        done();
      });
  });

  // Test para eliminar un libro
  it('debería eliminar un libro existente', (done) => {
    request(app)
      .delete(`/books/${createdBookId}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('message', 'Libro eliminado con éxito.');
        done();
      });
  });

});

