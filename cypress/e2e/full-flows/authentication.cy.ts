import { createRandomUser } from '../../support/Auth.commands';

describe.skip('authentication', () => {
  const user = createRandomUser();
  it('registration', () => {
    cy.registerUser(user);
  });

  it('login', () => {
    cy.loginUser(user.email, user.password);
  });
});
