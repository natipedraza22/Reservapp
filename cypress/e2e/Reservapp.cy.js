describe('Sistema de Gestión de Hoteles - Automatización de Casos de Prueba', () => {
  beforeEach(() => {
    cy.visit('https://mggp.pythonanywhere.com/'); // Precondición general para todos
  });
  
  


  it.only("TC01: Validar que el sistema permita la creación de reserva con las opciones correctas.", () => {
   
    
    cy.get("input[name='start_date']").type("1989-07-22"); // Introducir fechas de entrada.
    cy.get("input[name='end_date']").type("2023-08-05"); // Introducir fechas de salida.

    
    cy.get("input[name='guest_count']").type("2"); // Ingresar el número de huéspedes.

    
    cy.get('button.btn.btn-primary').contains("Buscar disponibilidad").click(); // Realizar la búsqueda


    cy.get(".text-start").should("exist"); // Validar que se muestre tipo de habitación.

    cy.get(".text-center").eq(1).should("exist"); // Validar que se muestre número de habitación disponibles.

    cy.get(".text-center").eq(2).should("exist"); // Validar que se muestre precio total de la estancia.
    
    cy.get(".text-end").eq(1).should("be.visible");// Validar que haya un boton para seleccionar la habitación.
  });


  it("TC02: Validar que el sistema no permita crear reserva dentro de la restricción de fechas.", () => {

   

  });


  it("TC03: Validar que el sistema muestre el tipo de habitaciones disponibles de acuerdo al número de huéspedes.", () => {

   

  });


  it("TC05: Validar que el sistema muestre los precios correctos de cada reserva.", () => {

   

  });


  it("TC06: Validar la actualización del número de habitaciones disponibles por fecha.", () => {

   

  });


  it("TC07: Validar formulario ingresando datos correctos.", () => {

   

  });


  it("TC08: Validar formulario con campos obligatorios vacíos.", () => {

   

  });


  it.skip("TC09: Validar formulario con tipo de datos inválidos.", () => {

   

  });

 
});

