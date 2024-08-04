import { faker } from '@faker-js/faker';

const env = Cypress.env('VITE_ENV');
const feDomain = Cypress.env(`VITE_BASE_URL_${env}`);
const apiDomain = Cypress.env(`VITE_API_BASE_URL_${env}`);
const TEST_PREPEND = 'TEST_5NhSgd_';

export function createRandomUser(): ITestUser {
  // return {
  //   fullName: TEST_PREPEND + faker.person.fullName(),
  //   email: 'TEST_5NhSgd_Paxton.Balistreri@yahoo.com',
  //   password: 'Password98!',
  // };

  return {
    fullName: TEST_PREPEND + faker.person.fullName(),
    email: TEST_PREPEND + faker.internet.email(),
    password: 'Password98!',
  };
}

export interface ITestUser {
  email: string;
  password: string;
  fullName: string;
}

const baseTimeout = 10000;

Cypress.Commands.add('loginUser', (email: string, password: string) => {
  cy.visit('http://localhost:3030/auth/login', { timeout: baseTimeout });

  cy.get('#login-email', { timeout: baseTimeout }).type(email);
  cy.get('#login-password').type(password);

  cy.get('#auth-dialog-container').click();

  cy.get('#auth-dialog-cb-btn').click();

  cy.url().should('include', '/dashboard');
});

Cypress.Commands.add('registerUser', (user: ITestUser) => {
  // Visit the login page and navigate to the registration page
  cy.visit('http://localhost:3030/auth/login', { timeout: baseTimeout });
  cy.get('#login-register-footer', { timeout: baseTimeout }).click();

  // Fill in the registration form
  cy.get('#registration-full-name').type(user.fullName);
  cy.get('#registration-email').type(user.email);
  cy.get('#registration-password').type(user.password);
  cy.get('#registration-confirm-password').type(user.password);

  // Trigger blur event
  cy.get('#auth-dialog-container').click();

  // Submit the registration form
  cy.get('#auth-dialog-cb-btn').click();

  cy.origin(
    'https://checkout.stripe.com',
    { args: { user, baseTimeout } },
    ({ user, baseTimeout }) => {
      cy.on('uncaught:exception', () => {
        return false;
      });

      cy.get('#cardNumber').type('4242424242424242');
      cy.get('#cardCvc').type('123');
      cy.get('#cardExpiry').type('12' + (new Date().getFullYear() + 10).toString().substring(2));
      cy.get('#billingName').type(user.fullName);
      cy.get('#billingPostalCode').type('94043');

      cy.get('.SubmitButton', { timeout: baseTimeout * 3 }).click();
    }
  );

  cy.log('User registered', { feDomain, env });

  if (feDomain.includes('localhost')) {
    cy.url({ timeout: baseTimeout }).should('include', '/auth/login');
  } else {
    cy.origin(feDomain, { args: { baseTimeout } }, ({ baseTimeout }) => {
      cy.url({ timeout: baseTimeout }).should('include', '/auth/login');
    });
  }
});

Cypress.Commands.add('deleteTestUser', () => {
  cy.window().then((win) => {
    const token = win.localStorage.getItem('ADMIN_USER_TOKEN');

    if (!token) {
      throw new Error('No token found');
    }

    const decoded = decodeJWT(token);

    cy.request({
      method: 'DELETE',
      url: `${apiDomain}/api/automation/test/${decoded.user.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});

const decodeJWT = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join('')
  );

  return JSON.parse(jsonPayload);
};
