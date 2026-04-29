import { describe, expect, it } from 'vitest';
import { keycloakLogoutUrl } from './logout.js';

describe('keycloakLogoutUrl', () => {
  it('builds the Keycloak end-session URL', () => {
    const url = keycloakLogoutUrl({
      authority: 'https://auth.uranus.com.br/realms/uranus',
      clientId: 'omnifisco-web',
      postLogoutRedirectUri: 'https://app.uranus.com.br/',
    });
    expect(url).toContain('/protocol/openid-connect/logout');
    expect(url).toContain('client_id=omnifisco-web');
    expect(url).toContain(
      `post_logout_redirect_uri=${encodeURIComponent('https://app.uranus.com.br/')}`,
    );
  });

  it('appends id_token_hint when provided', () => {
    const url = keycloakLogoutUrl({
      authority: 'https://auth.uranus.com.br/realms/uranus/',
      clientId: 'omnifisco-web',
      postLogoutRedirectUri: 'https://app.uranus.com.br/',
      idTokenHint: 'hint',
    });
    expect(url).toContain('id_token_hint=hint');
  });
});
