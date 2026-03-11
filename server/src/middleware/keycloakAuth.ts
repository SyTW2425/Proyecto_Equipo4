import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';
import { User } from '../models/user.js';

const KEYCLOAK_URL = process.env.KEYCLOAK_URL || 'http://keycloak:8080';
const REALM        = process.env.KEYCLOAK_REALM || 'bookly';
const ISSUER       = process.env.KEYCLOAK_ISSUER || 'http://localhost:8180/realms/bookly';

const client = jwksClient({
  jwksUri: `${KEYCLOAK_URL}/realms/${REALM}/protocol/openid-connect/certs`,
  cache: true,
  rateLimit: true,
});

function getKey(header: jwt.JwtHeader, callback: jwt.SigningKeyCallback) {
  client.getSigningKey(header.kid!, (err, key) => {
    callback(err, key?.getPublicKey());
  });
}

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token no proporcionado o inválido' });
    return;
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, getKey, { algorithms: ['RS256'], issuer: ISSUER }, async (err, decoded) => {
    if (err || !decoded || typeof decoded !== 'object') {
      res.status(403).json({ message: 'Token inválido o expirado' });
      return;
    }

    const keycloakId = (decoded as jwt.JwtPayload).sub!;

    try {
      const user = await User.findOne({ keycloak_id: keycloakId });

      if (!user) {
        res.status(404).json({ message: 'Usuario no registrado en el sistema' });
        return;
      }

      res.locals.user = user;
      next();
    } catch (dbErr) {
      res.status(500).json({ message: 'Error al obtener el usuario', error: dbErr });
    }
  });
};
