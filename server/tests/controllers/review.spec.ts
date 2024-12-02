import request from 'supertest';
import { expect } from 'chai';
import app from '../../src/app.js';

describe('Review Controller', () => {

  let createdReviewId: string;

  // Test para crear una reseña
  it('debería crear una nueva reseña', (done) => {
    const newReview = {
      user: 'testUserId',
      book: 'testBookId',
      title: 'Great Book',
      description: 'This book was amazing!',
      rating: 5
    };

    request(app)
      .post('/reviews/create')
      .send(newReview)
      .expect(201) // Espera un código de respuesta 201
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('user', 'testUserId');
        expect(res.body).to.have.property('book', 'testBookId');
        expect(res.body).to.have.property('title', 'Great Book');
        expect(res.body).to.have.property('rating', 5);
        createdReviewId = res.body._id;  // Guarda el ID de la reseña creada para usarlo en otras pruebas
        done();
      });
  });

  // Test para obtener todas las reseñas
  it('debería obtener todas las reseñas', (done) => {
    request(app)
      .get('/reviews')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  // Test para obtener una reseña por ID
  it('debería obtener una reseña por ID', (done) => {
    request(app)
      .get(`/reviews/${createdReviewId}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('_id', createdReviewId);
        done();
      });
  });

  // Test para obtener todas las reseñas de un libro
  it('debería obtener reseñas por libro', (done) => {
    request(app)
      .get('/reviews/by-book?book=testBookId')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  // Test para actualizar una reseña
  it('debería actualizar una reseña existente', (done) => {
    const updatedReview = {
      title: 'Updated Book Title',
      description: 'This is an updated description.',
      rating: 4
    };

    request(app)
      .put(`/reviews/${createdReviewId}`)
      .send(updatedReview)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('title', 'Updated Book Title');
        expect(res.body).to.have.property('rating', 4);
        done();
      });
  });

  // Test para eliminar una reseña
  it('debería eliminar una reseña existente', (done) => {
    request(app)
      .delete(`/reviews/${createdReviewId}`)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('message', 'Review deleted');
        done();
      });
  });

});

