import {Reservapp} from '../support/Pages/Reservapp.page';
import data from '../fixtures/data.json';

const pasajeros = Cypress._.random(1,4);
describe('Sistema de Gestión de Hoteles - Automatización de Casos de Prueba', () => {
  beforeEach('Precondición, visitar la página web',() => {
	cy.viewport(1920,1080);
    cy.visit('/');
	cy.url().should('contain', data.urlPrincipal);

  });


  it('TC01: validar que el sistema permita la búsqueda de disponibilidad ingresando datos correctos.', () => {
    
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

  it('TC02: Validar que el sistema no permita crear reserva dentro de la restricción de fechas.', () => {
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


  it('TC03: Validar que el sistema muestre el tipo de habitaciones disponibles de acuerdo al número de huéspedes.', () => {
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


  it('TC04: Validar que el sistema muestre los precios correctos de cada reserva.', () => {
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


  it('TC05: Validar la actualización del número de habitaciones disponibles por fecha.', () => {
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




  it('TC06: Validar formulario ingresando datos correctos.', () => {
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
    
   
  });





  it.skip('TC07: Validar formulario con tipo de datos inválidos.', () => {

   

  });


 
});

