// @vitest-environment node
import { SignJWT, generateKeyPair } from 'jose';
import { describe, expect, it } from 'vitest';
import { verifyToken } from './verify-token.js';

describe('verifyToken', () => {
  it('accepts tokens signed by a key in the JWKS', async () => {
    const { publicKey, privateKey } = await generateKeyPair('RS256');

    const token = await new SignJWT({ scope: 'openid' })
      .setProtectedHeader({ alg: 'RS256', kid: 'test-key' })
      .setIssuer('https://issuer.example.com')
      .setAudience('uranus-api')
      .setSubject('user-1')
      .setIssuedAt()
      .setExpirationTime('5m')
      .sign(privateKey);

    const result = await verifyToken(token, {
      jwksUri: 'https://example.com/.well-known/jwks.json',
      issuer: 'https://issuer.example.com',
      audience: 'uranus-api',
      // Bypass the network — feed an inline keyset.
      getKeySet: (async () => publicKey) as unknown as Parameters<
        typeof verifyToken
      >[1]['getKeySet'],
    });
    expect(result.payload.sub).toBe('user-1');
    expect(result.payload.scope).toBe('openid');
  });

  it('rejects tokens signed by another key', async () => {
    const { privateKey } = await generateKeyPair('RS256');
    const { publicKey: otherPublic } = await generateKeyPair('RS256');

    const token = await new SignJWT({ scope: 'openid' })
      .setProtectedHeader({ alg: 'RS256', kid: 'rogue' })
      .setIssuer('https://issuer.example.com')
      .setAudience('uranus-api')
      .setSubject('user-1')
      .setIssuedAt()
      .setExpirationTime('5m')
      .sign(privateKey);

    await expect(
      verifyToken(token, {
        jwksUri: 'https://example.com/.well-known/jwks.json',
        issuer: 'https://issuer.example.com',
        audience: 'uranus-api',
        getKeySet: (async () => otherPublic) as unknown as Parameters<
          typeof verifyToken
        >[1]['getKeySet'],
      }),
    ).rejects.toThrow();
  });
});
