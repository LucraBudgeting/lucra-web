import { createRandomUser } from '../../support/Auth.commands';

const baseTimeout = 10000;

describe('dashboard', () => {
  const user = createRandomUser();

  it('creates user', () => {
    cy.registerUser(user);
  });

  it('create a new income category', () => {
    cy.loginUser(user.email, user.password);
    cy.get('#add_new_budget_header_icon').click();
    cy.get('#income_toggle_button').click();
    cy.get('#category_name_input').type('Test Income Category');
    cy.get('#category_currency_input').type('100');
    cy.get('#dialog_success_btn').click();
    cy.get('#budget_income_categories').children().should('have.length.gte', 2);
  });

  it('create a new expense category', () => {
    cy.loginUser(user.email, user.password);
    cy.get('#add_new_budget_header_icon').click();
    cy.get('#expense_toggle_button').click();
    cy.get('#category_name_input').type('Test Expense Category');
    cy.get('#category_currency_input').type('100');
    cy.get('#dialog_success_btn').click();
    cy.get('#budget_expense_categories').children().should('have.length.gte', 2);
  });

  it('can edit category', () => {
    cy.loginUser(user.email, user.password);
    cy.get('[id*="budget_item_"]').first().click();
    cy.get('#dialog_edit_icon').click();
  });

  it('can add an account through plaid', () => {
    cy.loginUser(user.email, user.password);
    cy.get('#settings_cog_budget_header_icon').click();
    cy.get('#settings_accounts').click();
    cy.get('#plaid_add_account_btn', { timeout: baseTimeout }).should('not.be.disabled').click();

    cy.frameLoaded('[id*="plaid-link-iframe-"]', { timeout: baseTimeout }).first();

    cy.iframe('[id*="plaid-link-iframe-"]', { timeout: baseTimeout })
      .first()
      .within(() => {
        cy.get('#aut-button', { timeout: baseTimeout }).click();
        cy.get('#search-input', { timeout: baseTimeout }).type('first credit');
        cy.get('#aut-ins_120013', { timeout: baseTimeout }).click();
        cy.get('#aut-input-0', { timeout: baseTimeout }).type('user_good');
        cy.get('#aut-input-1', { timeout: baseTimeout }).type('pass_good');
        cy.get('#aut-button', { timeout: baseTimeout }).click();
        cy.get('#aut-button', { timeout: baseTimeout }).click();
        cy.get('#aut-button', { timeout: baseTimeout }).click();
      });

    cy.url().should('include', '/dashboard');
  });

  after(() => {
    cy.deleteTestUser();
  });
});
