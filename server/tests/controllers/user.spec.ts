import { expect } from 'chai';
import { describe, it } from 'mocha';
import request from 'supertest'; 
import app from '../../src/app.js';

describe('User Controller', () => {


  // Prueba para obtener un usuario por ID con un token inválido
  it('debería rechazar la obtención de un usuario con un token inválido', (done) => {
    const token = 'invalid_token';

    request(app)
      .get('/users/1234567890abcdef12345678')
      .set('Authorization', `Bearer ${token}`)
      .expect(500)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('message', 'Error al obtener la información del usuario con ID: undefined');
        done();
      });
  });

  // Prueba para obtener todos los usuarios
  it('debería obtener todos los usuarios', (done) => {
    request(app)
      .get('/users')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.be.an('array');
        done();
      });
  });

  // Prueba para crear un nuevo usuario con datos faltantes (error)
  it('debería retornar error al crear un usuario con datos faltantes', (done) => {
    const incompleteUser = {
      username: 'incompleteuser',
      email: 'incompleteuser@example.com', 
      password: 'testpassword'
    };

    request(app)
      .post('/users/register')
      .send(incompleteUser)
      .expect(400)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property('message', 'Error al crear el usuario');
        done();
      });
  });

});
