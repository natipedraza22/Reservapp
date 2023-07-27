describe('Sistema de Gestión de Hoteles - Automatización de Casos de Prueba', () => {
  beforeEach(() => {
    cy.visit('https://mggp.pythonanywhere.com/'); // Precondición general para todos
  });
  
  


  it('TC01: validar que el sistema permita la búsqueda de disponibilidad ingresando datos correctos.', () => {
   
    
    cy.get('.btn.btn-primary').click();
    cy.get('[type="date"]').eq(0).type('2022-02-22');
    cy.get('[type="date"]').eq(1).type('2022-03-22');
    cy.get('[name="guest_count"]').type('1');
    cy.get('[type="submit"]').click();
    cy.get('.d-inline-block.bi-arrow-right-square-fill.text-success').eq(0).click();
    cy.get('div.container-fluid').should('exist');
  });


  it('TC02: Validar que el sistema no permita crear reserva dentro de la restricción de fechas.', () => {
    cy.get('.btn.btn-primary').click();
    cy.get('[type="date"]').eq(0).type('2023-02-22');
    cy.get('[type="date"]').eq(1).type('2023-03-22');
    cy.get('[name="guest_count"]').type('1');
    cy.get('[type="submit"]').click();
    cy.get('.d-inline-block.bi-arrow-right-square-fill.text-success').eq(0).click();
    cy.get('body').should('contain', 'No se pudo calcular el precio para la reserva. La fecha de salida tiene que ser anterior a 2022-12-31');
   

  });


  it('TC03: Validar que el sistema muestre el tipo de habitaciones disponibles de acuerdo al número de huéspedes.', () => {
    cy.get('.btn.btn-primary').click();
    cy.get('[type="date"]').eq(0).type('2022-04-22');
    cy.get('[type="date"]').eq(1).type('2022-04-25');
    cy.get('[name="guest_count"]').type('1');
    cy.get('[type="submit"]').click();
    cy.get('.table-responsive').eq(0).should('contain','Individual');
    cy.get('.table-responsive').eq(0).should('contain','Doble');
    cy.get('.table-responsive').eq(0).should('contain','Triple');
    cy.get('.table-responsive').eq(0).should('contain','Cuádruple');
    

  });


  it('TC05: Validar que el sistema muestre los precios correctos de cada reserva.', () => {
    cy.get('.btn.btn-primary').click();
    cy.get('[type="date"]').eq(0).type('2022-04-22');
    cy.get('[type="date"]').eq(1).type('2022-04-25');
    cy.get('[name="guest_count"]').type('1');
    cy.get('[type="submit"]').click();
    cy.get('td.text-center').eq(3).should('contain','60,00');
   

  });


  it('TC06: Validar la actualización del número de habitaciones disponibles por fecha.', () => {

   

  });


  it('TC07: Validar formulario ingresando datos correctos.', () => {
    cy.get('.btn.btn-primary').click();
    cy.get('[type="date"]').eq(0).type('2022-02-22');
    cy.get('[type="date"]').eq(1).type('2022-03-22');
    cy.get('[name="guest_count"]').type('1');
    cy.get('[type="submit"]').click();
    cy.get('.d-inline-block.bi-arrow-right-square-fill.text-success').eq(0).click();
    cy.get('[name="guest_count"]').type('1');
    cy.get('input[name="contact_info_0"]').type('José').should('have.value', 'José');
    cy.get('input[name="contact_info_1"]').type('jose@gmail.com').should('have.value', 'jose@gmail.com');
    cy.get('input[name="contact_info_2"]').type('675896458').should('have.value', '675896458');
    cy.get('button.btn.btn-primary.w-50').click();
    cy.contains('button.btn.btn-primary.w-50', 'Crear reserva').should('be.visible');
    
   

  });


  it("TC08: Validar formulario con campos obligatorios vacíos.", () => {
    cy.get('.btn.btn-primary').click();
    cy.get('[type="date"]').eq(0).type('2022-02-22');
    cy.get('[type="date"]').eq(1).type('2022-03-22');
    cy.get('[name="guest_count"]').type('1');
    cy.get('[type="submit"]').click();
    cy.get('.d-inline-block.bi-arrow-right-square-fill.text-success').eq(0).click();
    cy.get('[name="guest_count"]').type('').should('be.empty');
    cy.get('input[name="contact_info_0"]').type('').should('be.empty');
    cy.get('input[name="contact_info_1"]').type('').should('be.empty');
    cy.get('input[name="contact_info_2"]').type('').should('be.empty');
    cy.get('button.btn.btn-primary.w-50').click();
   

  });


  it.skip("TC09: Validar formulario con tipo de datos inválidos.", () => {

   

  });


 
});

