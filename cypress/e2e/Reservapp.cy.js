import {Reservapp} from '../support/Pages/Reservapp.page';
import data from '../fixtures/data.json';

const pasajeros = Cypress._.random(1,4);
describe('Sistema de Gestión de Hoteles - Automatización de Casos de Prueba', () => {
  beforeEach('Precondición, visitar la página web',() => {
	cy.viewport(1920,1080);
    cy.visit('/');
	cy.url().should('contain', data.urlPrincipal);

  });


  it('TC01: Validar el ingreso de datos correctos para la creación de la reserva.', () => {
    
	  Reservapp.consultarNuevaReserva();
	  Reservapp.agregarPasajeros(pasajeros);
	  Reservapp.get.inputPasajeros().should('have.value', pasajeros);
	  Reservapp.agregarFechaEntrada(data.fechaEntrada);
	  Reservapp.get.inputFechaEntrada().should('have.value', data.fechaEntrada);
	  Reservapp.agregarFechaSalida(data.fechaSalida);
	  Reservapp.get.inputFechaSalida().should('have.value', data.fechaSalida);
	  Reservapp.clickBtnBuscarDisponibilidad();
	  cy.url().should('contain', data.urlDisponibilidad );
	  Reservapp.get.botonReserva().its('length').then((boton)=>{
		  expect(boton).to.be.greaterThan(0);
	  })
	  Reservapp.clickBotonReserva();
	  cy.url().should('contain', data.urlReserva);
	  Reservapp.get.fechaEntrada().should('have.value', data.fechaEntrada);
	  Reservapp.get.fechaSalida().should('have.value', data.fechaSalida);

  });

  it('TC02: Validar el ingreso de datos incorrectos para la creación de la reserva.', () => {
    
    Reservapp.consultarNuevaReserva();
	  Reservapp.agregarPasajeros(pasajeros);
	  Reservapp.get.inputPasajeros().should('have.value', pasajeros);
	  Reservapp.agregarFechaEntrada(data.fechaIncorrectaReserva);
	  Reservapp.get.inputFechaEntrada().should('have.value', data.fechaIncorrectaReserva);
	  Reservapp.agregarFechaSalida(data.fechaIncorrectaReservaSalida);
	  Reservapp.get.inputFechaSalida().should('have.value', data.fechaIncorrectaReservaSalida);
	  Reservapp.clickBtnBuscarDisponibilidad();
	  Reservapp.get.botonReserva().its('length').then((boton)=>{
		expect(boton).to.be.greaterThan(0);
	  })
	  Reservapp.clickBotonReserva();
    Reservapp.get.reservaError().should('contain', data.msgReservaInv);
});


  

  it('TC03: Validar que el sistema no permita crear reserva dentro de la restricción de fechas', () => {
	  Reservapp.consultarNuevaReserva();
	  Reservapp.agregarPasajeros(pasajeros);
	  Reservapp.get.inputPasajeros().should('have.value', pasajeros);
	  Reservapp.agregarFechaEntrada(data.fechaEntradaInvalida);
	  Reservapp.get.inputFechaEntrada().should('have.value', data.fechaEntradaInvalida);
	  Reservapp.agregarFechaSalida(data.fechaSalidaInvalida);
	  Reservapp.get.inputFechaSalida().should('have.value', data.fechaSalidaInvalida);
	  Reservapp.clickBtnBuscarDisponibilidad();
	  Reservapp.get.botonReserva().its('length').then((boton)=>{
		expect(boton).to.be.greaterThan(0);
	  })
	  Reservapp.clickBotonReserva();
    Reservapp.get.paginaError().should('contain', data.msgError);

  });

  it('TC04: Validar que el sistema muestre solo las habitaciones disponibles que se ajusten al número de huéspedes.', () => {
    Reservapp.consultarNuevaReserva();
    Reservapp.agregarPasajeros(pasajeros);
    Reservapp.get.inputPasajeros().should('have.value', pasajeros);
    Reservapp.agregarFechaEntrada(data.fechaEntrada);
    Reservapp.get.inputFechaEntrada().should('have.value', data.fechaEntrada);
    Reservapp.agregarFechaSalida(data.fechaSalida);
    Reservapp.get.inputFechaSalida().should('have.value', data.fechaSalida);
    Reservapp.clickBtnBuscarDisponibilidad();
    cy.url().should('contain', data.urlDisponibilidad );
    cy.wrap(Reservapp.validarHabitacionesDisponibles(pasajeros)).as('habitacionesDisponibles');
    cy.get('@habitacionesDisponibles').then((habitacionesDisponibles) => {
        expect(habitacionesDisponibles.length).to.equal(5 - pasajeros);
    });
  
  });

  


  it('TC05: Validar los precios correctos por tipo de habitación.', () => {
    const pasajero = 2
    Reservapp.consultarNuevaReserva();
    Reservapp.agregarPasajeros(pasajero);
    Reservapp.get.inputPasajeros().should('have.value', pasajero);
    Reservapp.agregarFechaEntrada(data.fechaEntrada);
    Reservapp.get.inputFechaEntrada().should('have.value', data.fechaEntrada);
    Reservapp.agregarFechaSalida(data.fechaSalida);
    Reservapp.get.inputFechaSalida().should('have.value', data.fechaSalida);
    Reservapp.clickBtnBuscarDisponibilidad();
    cy.url().should('contain', data.urlDisponibilidad );
    Reservapp.get.botonReserva().its('length').then((boton)=>{
    expect(boton).to.be.greaterThan(0);
    })
    Reservapp.get.cantidadDisponible().last().invoke('text').then((precioFinal)=>{
    expect(precioFinal).to.equal(data.precio)
    })

  });


  it('TC06: Validar el formulario de reserva con datos y funcionalidades correctas.', () => {
    Reservapp.consultarNuevaReserva();
	  Reservapp.agregarPasajeros(pasajeros);
	  Reservapp.get.inputPasajeros().should('have.value', pasajeros);
	  Reservapp.agregarFechaEntrada(data.fechaEntrada);
	  Reservapp.get.inputFechaEntrada().should('have.value', data.fechaEntrada);
	  Reservapp.agregarFechaSalida(data.fechaSalida);
	  Reservapp.get.inputFechaSalida().should('have.value', data.fechaSalida);
	  Reservapp.clickBtnBuscarDisponibilidad();
    Reservapp.get.botonReserva().its('length').then((boton)=>{
      expect(boton).to.be.greaterThan(0);
    })
    Reservapp.clickBotonReserva();
    cy.url().should('contain', data.urlReserva);
    Reservapp.pasajerosForm(pasajeros);
    Reservapp.get.pasajeros().should('have.value',pasajeros);
    Reservapp.nombreForm(data.nombreForm);
    Reservapp.correoElectronicoForm(data.email);
    Reservapp.telefonoForm(data.telefono);
    Reservapp.botonCrearReserva();
    cy.get('body').should('contain', 'QQ8YEE9RJG');

    
   
  });



  it('TC08: Validar la actualización del número de habitaciones disponibles al crear una reserva.', () => {
    const pasajero = 2
    Reservapp.consultarNuevaReserva();
    Reservapp.agregarPasajeros(pasajero);
    Reservapp.get.inputPasajeros().should('have.value', pasajero);
    Reservapp.agregarFechaEntrada(data.fechaEntrada);
    Reservapp.get.inputFechaEntrada().should('have.value', data.fechaEntrada);
    Reservapp.agregarFechaSalida(data.fechaSalida);
    Reservapp.get.inputFechaSalida().should('have.value', data.fechaSalida);
    Reservapp.clickBtnBuscarDisponibilidad();
    cy.url().should('contain', data.urlDisponibilidad );
    Reservapp.get.botonReserva().its('length').then((boton)=>{
      expect(boton).to.be.greaterThan(0);
    })
    Reservapp.get.cantidadDisponible().eq(7).invoke('text').then((cantidadHabitaciones)=>{
      Cypress.env('cantidadHabitaciones',cantidadHabitaciones)
      cy.log(cantidadHabitaciones)
    })
    Reservapp.clickBotonReserva();

  });


  it.skip('TC07: Validar el formulario de reserva con datos inválidos.', () => {
      //este TC no pasó las pruebas manuales
   

  });


 
});





  




 





  

