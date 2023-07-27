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
    
	Reservapp.consultarNuevaRecerva();
	Reservapp.agregarPasajeros(pasajeros);
	Reservapp.get.inputPasajeros().should('have.value', pasajeros);
	Reservapp.agregarFechaEntrada(data.fechaEntrada);
	Reservapp.get.inputFechaEntrada().should('have.value', data.fechaEntrada);
	Reservapp.agregarFechaSalida(data.fechaSalida);
	Reservapp.get.inputFechaSalida().should('have.value', data.fechaSalida);
	Reservapp.clickBtnBuscarDisponibilidad();
	cy.url().should('contain', data.urlDisponibilidad );
	Reservapp.get.botonRecerva().its('length').then((boton)=>{
		expect(boton).to.be.greaterThan(0);
	})
	Reservapp.clickBotonRecerva();
	cy.url().should('contain', data.urlReserva);
	Reservapp.get.fechaEntrada().should('have.value', data.fechaEntrada);
	Reservapp.get.fechaSalida().should('have.value', data.fechaSalida);
  });

  it('TC02: Validar que el sistema no permita crear reserva dentro de la restricción de fechas.', () => {
	Reservapp.consultarNuevaRecerva();
	Reservapp.agregarPasajeros(pasajeros);
	Reservapp.get.inputPasajeros().should('have.value', pasajeros);
	Reservapp.agregarFechaEntrada(data.fechaEntradaInvalida);
	Reservapp.get.inputFechaEntrada().should('have.value', data.fechaEntradaInvalida);
	Reservapp.agregarFechaSalida(data.fechaSalidaInvalida);
	Reservapp.get.inputFechaSalida().should('have.value', data.fechaSalidaInvalida);
	Reservapp.clickBtnBuscarDisponibilidad();
	Reservapp.get.botonRecerva().its('length').then((boton)=>{
		expect(boton).to.be.greaterThan(0);
	})
	Reservapp.clickBotonRecerva();
    Reservapp.get.paginaError().should('contain', data.msgError);
  });


  it('TC03: Validar que el sistema muestre el tipo de habitaciones disponibles de acuerdo al número de huéspedes.', () => {
    Reservapp.consultarNuevaRecerva();
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


  it('TC05: Validar que el sistema muestre los precios correctos de cada reserva.', () => {
    Reservapp.consultarNuevaRecerva();
	  Reservapp.agregarPasajeros(pasajeros);
	  Reservapp.get.inputPasajeros().should('have.value', pasajeros);
	  Reservapp.agregarFechaEntrada(data.fechaEntrada);
	  Reservapp.get.inputFechaEntrada().should('have.value', data.fechaEntrada);
	  Reservapp.agregarFechaSalida(data.fechaSalida);
	  Reservapp.get.inputFechaSalida().should('have.value', data.fechaSalida);
	  Reservapp.clickBtnBuscarDisponibilidad();
	  //Reservapp.PrecioCuadruple().
    
   

  });


  it('TC06: Validar la actualización del número de habitaciones disponibles por fecha.', () => {

   

  });


  it.only('TC07: Validar formulario ingresando datos correctos.', () => {
    Reservapp.consultarNuevaRecerva();
	  Reservapp.agregarPasajeros(pasajeros);
	  Reservapp.get.inputPasajeros().should('have.value', pasajeros);
	  Reservapp.agregarFechaEntrada(data.fechaEntrada);
	  Reservapp.get.inputFechaEntrada().should('have.value', data.fechaEntrada);
	  Reservapp.agregarFechaSalida(data.fechaSalida);
	  Reservapp.get.inputFechaSalida().should('have.value', data.fechaSalida);
	  Reservapp.clickBtnBuscarDisponibilidad();
    Reservapp.get.botonRecerva().its('length').then((boton)=>{
      expect(boton).to.be.greaterThan(0);
    })
    Reservapp.clickBotonRecerva();
    Reservapp.pasajerosForm(pasajeros);
    Reservapp.nombreForm(data.nombreForm);
    Reservapp.correoElectronicoForm(data.email)
    //cy.get('[name="guest_count"]').type('1');
    //cy.get('input[name="contact_info_0"]').type('José').should('have.value', 'José');
    //cy.get('input[name="contact_info_1"]').type('jose@gmail.com').should('have.value', 'jose@gmail.com');
    //cy.get('input[name="contact_info_2"]').type('675896458').should('have.value', '675896458');
    //cy.get('button.btn.btn-primary.w-50').click();
    //cy.contains('button.btn.btn-primary.w-50', 'Crear reserva').should('be.visible');
    
   

  });


  it('TC08: Validar formulario con campos obligatorios vacíos.', () => {
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


  it.skip('TC09: Validar formulario con tipo de datos inválidos.', () => {

   

  });


 
});

