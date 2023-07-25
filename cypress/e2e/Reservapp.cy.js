describe('Sistema de Gestión de Hoteles - Automatización de Casos de Prueba', () => {
  beforeEach(() => {
    cy.visit('https://mggp.pythonanywhere.com/'); // Precondición general para todos
  });
  
  
  it("TC1: Validar que el botón para crear reserva contenga las opciones correctas", () => {

    cy.contains("button", "Nueva reserva").click(); //Hacer click en el botón de creación de reserva.

    cy.get(".container-lg.bg-light.mt-5.pt-3").contains("Entrada").should("be.visible");// Validar que la opcion de fecha de entrada esté presente.

    cy.get(".container-lg.bg-light.mt-5.pt-3").contains("Salida").should("be.visible");// Validar que la opcion de fecha de salida esté presente.

    cy.get(".container-lg.bg-light.mt-5.pt-3 input[name='guest_count']").should("exist").should("be.visible");// Validar que la opcion de número de huéspedes esté presente.

  });

  it.only("TC2: Validar que al buscar entre 2 fechas se muestre la información correcta.", () => {
   
    
    cy.get("input[name='start_date']").type("1989-07-22"); // Introducir fechas de entrada.
    cy.get("input[name='end_date']").type("2023-08-05"); // Introducir fechas de salida.

    
    cy.get("input[name='guest_count']").type("2"); // Ingresar el número de huéspedes.

    
    cy.get('button.btn.btn-primary').contains("Buscar disponibilidad").click(); // Realizar la búsqueda


    cy.get(".text-start").should("exist"); // Validar que se muestre tipo de habitación.

    cy.get(".text-center").eq(1).should("exist"); // Validar que se muestre número de habitación disponibles.

    cy.get(".text-center").eq(2).should("exist"); // Validar que se muestre precio total de la estancia.
    
    cy.get(".text-end").eq(1).should("be.visible");// Validar que haya un boton para seleccionar la habitación.
  });
 
});

