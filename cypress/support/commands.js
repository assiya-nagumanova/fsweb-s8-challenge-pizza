
Cypress.Commands.add('visitOrder', (path = '/form') => {
  const base = Cypress.env('BASE_URL') || 'http://localhost:5174';
  cy.visit(base + path, {
    onBeforeLoad(win) {
      try { win.localStorage.removeItem('pizza_order_draft'); } catch (e) {}
    }
  });
});

Cypress.Commands.add('selectExtras', (arg) => {
  cy.get('[data-cy=extras]').within(() => {
    if (Array.isArray(arg)) {
      arg.forEach((it) => {
        if (typeof it === 'number') {
          cy.get('input[type="checkbox"]').eq(it).check({ force: true });
        } else {
          cy.get(`[data-cy="extra-${it}"]`).check({ force: true });
        }
      });
    } else if (typeof arg === 'number') {
      for (let i = 0; i < arg; i++) {
        cy.get('input[type="checkbox"]').eq(i).check({ force: true });
      }
    }
  });
});

Cypress.Commands.add('fillName', (name) => {
  cy.get('[data-cy=name]').clear().type(name);
});

Cypress.Commands.add('setQuantity', (target) => {
  cy.get('[data-cy=quantity-display]').then(($el) => {
    const current = parseInt($el.text().trim(), 10);
    if (current === target) return;
    const diff = target - current;
    const times = Math.abs(diff);
    for (let i = 0; i < times; i++) {
      if (diff > 0) cy.get('[data-cy=qty-plus]').click();
      else cy.get('[data-cy=qty-minus]').click();
    }
  });
});

Cypress.Commands.add('mockPostOrder', (body = { id: 12345 }, statusCode = 201) => {
  cy.intercept('POST', 'https://jsonplaceholder.typicode.com/posts', {
    statusCode,
    body,
  }).as('postOrder');
});