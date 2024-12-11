import request from 'supertest';
import { expect } from 'chai';
import app from '../../src/app.js';
import mongoose from 'mongoose';


describe('List Controller', () => {
  let createdListId: string;
  let userId: string;
  let bookId: string;
  let username: string;  // Guardar el username

  before(async () => {
    try {
         
      const userResponse = await request(app)
        .post('/users/register')
        .send({
          username: 'testuser2',
          password: 'password123',
          name: 'Test',
          lastname: 'User',
          email: 'testuser@example.com'
        });
      //console.log(userResponse.body); // Verifica que el usuario se haya creado correctamente
      expect(userResponse.status).to.equal(201);
      userId = userResponse.body._id;
  
      const bookResponse = await request(app)
        .post('/books/create')
        .send({
            _id: '978-3-16-148410-0', // ISBN como ejemplo de _id
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
        });
      
      expect(bookResponse.status).to.equal(201);
      bookId = bookResponse.body._id;
      userId = userResponse.body._id;  // Guarda el userId
    username = userResponse.body.username;  // Guarda el username
    } catch (error) {
      console.error(error);
      throw error;
    }
  });
  

 // Test para crear una nueva lista
it('debería crear una nueva lista', async () => {
    const newList = {
      title: 'Test List',
      username: username,  // Usa el username obtenido anteriormente
    };
  
    const response = await request(app)
      .post('/lists')
      .send(newList)
      .expect(201);  // Espera un código de estado 201
  
    expect(response.body).to.have.property('message', 'Lista creada exitosamente.');
    expect(response.body.list).to.have.property('title', 'Test List');
    createdListId = response.body.list._id;
  });
  
  // Test para obtener todas las listas
  it('debería obtener todas las listas', (done) => {
    request(app)
      .get('/lists')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  // Test para obtener una lista por ID
  it('debería obtener una lista por ID', (done) => {
    request(app)
      .get(`/lists/${createdListId}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('_id', createdListId);
        expect(res.body).to.have.property('title', 'Test List');
        done();
      });
  });

  // Test para actualizar una lista
  it('debería actualizar una lista existente', (done) => {
    const updatedList = {
      title: 'Updated Test List',
      history: [bookId],
    };

    request(app)
      .put(`/lists/${createdListId}`)
      .send(updatedList)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('message', 'Lista actualizada exitosamente.');
        expect(res.body.list).to.have.property('title', 'Updated Test List');
        done();
      });
  });


  // Test para eliminar un libro de la lista
  it('debería eliminar un libro de la lista', (done) => {
    const removeBook = {
      listId: createdListId,
      bookId: bookId,
    };

    request(app)
      .patch('/lists/remove-book')
      .send(removeBook)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('message', 'Libro eliminado de la lista.');
        expect(res.body.list.history).to.not.include(bookId);
        done();
      });
  });

  // Test para eliminar una lista
  it('debería eliminar una lista existente', (done) => {
    request(app)
      .delete(`/lists/${createdListId}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('message', 'Lista eliminada exitosamente.');
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
