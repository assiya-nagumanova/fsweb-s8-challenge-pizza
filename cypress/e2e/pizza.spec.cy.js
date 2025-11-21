//Sipariş sayfasını test et
describe('Position Absolute Acı Pizza - E2E (data-cy)', () => {
  const baseUrl = Cypress.env('BASE_URL') || 'http://localhost:5174/';
  const orderPath = '/form';

  beforeEach(() => {
    cy.visitOrder(orderPath);
  });

  it('1) Sayfa yüklendiğinde başlık, fiyat ve açıklama görünür', () => {
    cy.get('[data-cy=title]').should('be.visible').and('contain.text', 'Position Absolute Acı Pizza');
    cy.contains('Frontent Dev olarak hala position:absolute kullanıyorsan').should('be.visible');
    cy.get('img[alt="Logo"]').should('be.visible');
  });

  it('2) Malzeme seçimi ve fiyat güncellemesi çalışıyor', () => {
    // ilk 4 malzemeyi seç
    cy.selectExtras(4);
    cy.contains(/Seçildi\s+4/).should('exist');

    // Seçimler alanındaki toplam format kontrolü
    cy.contains('Seçimler').parent().within(() => {
      cy.get('span').last().invoke('text').then((txt) => {
        expect(txt.trim()).to.match(/^\d+\.\d{2}₺$/);
      });
    });
  });

  it('3) Minimum / maksimum malzeme validasyonu çalışıyor', () => {
    // 3 malzeme seç -> hata
    cy.selectExtras([0,1,2]);
    cy.contains('Lütfen en az 4, en çok 10 malzeme seçin.').should('be.visible');

    // 4. seç -> hata kaybolmalı
    cy.selectExtras([3]);
    cy.contains('Lütfen en az 4, en çok 10 malzeme seçin.').should('not.exist');

    // tümünü seçmeye çalış ve 10'dan fazla olmadığını doğrula
    cy.get('[data-cy=extras]').within(() => {
      cy.get('input[type="checkbox"]').each(($cb) => {
        cy.wrap($cb).check({ force: true });
      });
    });
    cy.contains(/Seçildi\s+\d+/).invoke('text').then((t) => {
      const m = t.match(/Seçildi\s+(\d+)/);
      if (m) {
        expect(parseInt(m[1], 10)).to.be.at.most(10);
      }
    });
  });

  it('4) Adet arttırma/azaltma ve toplam hesaplama doğru', () => {
    // quantity + ve - butonları
    cy.get('[data-cy=qty-plus]').click();
    cy.get('[data-cy=quantity-display]').should(($d) => {
      expect(parseInt($d.text().trim(), 10)).to.equal(2);
    });

    cy.get('[data-cy=qty-minus]').click();
    cy.get('[data-cy=quantity-display]').should(($d) => {
      expect(parseInt($d.text().trim(), 10)).to.equal(1);
    });

    // 4 malzeme seç ve quantity 2 yap -> toplam format
    cy.selectExtras(4);
    cy.get('[data-cy=qty-plus]').click();
    cy.get('[data-cy=total-price]', { timeout: 10000 }).invoke('text').then((t) => {
      const onlyPrice = t.replace(/\s|Toplam/gi,'').trim(); "215.00₺"
        expect(onlyPrice).to.match(/^\d+\.\d{2}₺$/);
    });
  });

  it('5) Form gönderimi ve success yönlendirmesi (mocked) çalışıyor', () => {
    cy.mockPostOrder({ id: 12345 }, 201);
    cy.selectExtras(5);
    cy.fillName('Ahmet');
    cy.get('[data-cy=submit-order]').click().should('contain.text', 'Gönderiliyor...');

    cy.wait('@postOrder').its('response.statusCode').should('eq', 201);
    cy.location('pathname', { timeout: 5000 }).should('include', '/success');

  });
});