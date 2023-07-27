class reservapp{
	get={
		nuevaReserva:()=> cy.get('button[class$="primary"]'),
		listaReserva:()=>cy.get('tbody tr'), // Esta lista contiene un total de 44 filas
		//room types
		buscarDisponibilidad:()=>cy.get('[class$="justify-content-between"] [class*="content-start"] button'),
		inputPasajeros:()=>cy.get('[class$="justify-content-between"] input').first(),
		inputFechaEntrada:()=>cy.get('[class$="justify-content-between"] input').eq(1),
		inputFechaSalida:()=>cy.get('[class$="justify-content-between"] input').last(),
		tablaDisponibilidad:()=>cy.get('tbody tr'), // Deberá de tener una length igual o mayor a la cantidad de pasajeros
		botonReserva:()=>cy.get('tbody tr [class="text-end"] span'), // Deberá de tener una length igual o mayor a la cantidad de pasajeros
		tipoHabitacion:()=>cy.get('tbody tr [class="text-start"]'),// Deberá de tener una length igual o mayor a la cantidad de pasajeros
		// capacidad:()=>cy.get('tbody tr [class="text-center"]'),
		cantidadDisponible:()=>cy.get('tbody tr [class="text-center"]'),
		precioVenta:()=>cy.get('tbody tr [class="text-center"]'),
		
		//creación de reserva
		fechaEntrada:()=>cy.get('[name="start_date"]'),
		fechaSalida:()=>cy.get('[name="end_date"]'),
		pasajeros:()=>cy.get('[name="guest_count"]'),
		habitacion:()=>cy.get('select[name="room_id"]'),

		nombre:()=>cy.get('[name="contact_info_0"]'),
		correoElectronico:()=>cy.get('[name="contact_info_1"]'),


		telefono:()=>cy.get('[name="contact_info_2"]'),
		precio:()=>cy.get('input[type="text"]').last(),
		btnCrearReserva:()=>cy.get('button[type="submit"]'),
		paginaError:()=>cy.get('body'),
		reservaError:()=>cy.get('body'),

	}
	consultarNuevaReserva(){
		this.get.nuevaReserva().click();
	}
	agregarPasajeros(pasajeros){
		pasajeros && this.get.inputPasajeros().type(pasajeros);
		cy.log(`Se ingresó la cantidad de ${pasajeros} para la búsqueda`)
	}
	agregarFechaEntrada(fechaEntrada){
		this.get.inputFechaEntrada().type(fechaEntrada);
	}
	agregarFechaSalida(fechaSalida){
		this.get.inputFechaSalida().type(fechaSalida);
	}
	clickBtnBuscarDisponibilidad(){
		this.get.buscarDisponibilidad().click();
	}
	clickBotonReserva(){
		this.get.botonReserva().first().click();
	}
	validarHabitacionesDisponibles(pasajeros) {
		let habitacionesDisponibles = [];

		if (pasajeros === 1) {
		habitacionesDisponibles = ['Individual', 'Doble', 'Triple', 'Cuádruple'];
		} else if (pasajeros === 2) {
		habitacionesDisponibles = ['Doble', 'Triple', 'Cuádruple'];
		} else if (pasajeros === 3) {
		habitacionesDisponibles = ['Triple', 'Cuádruple'];
		} else if (pasajeros === 4) {
		habitacionesDisponibles = ['Cuádruple'];
		} else {
		cy.log('No hay pasajeros agregados');
		}
		return habitacionesDisponibles
	}
	pasajerosForm(pasajeros){
		this.get.pasajeros().type(pasajeros);
	}

	nombreForm(nombre){
		this.get.nombre().type(nombre);
	}

	correoElectronicoForm(email){
		this.get.correoElectronico().type(email);
	}

	telefonoForm(telefono){
		this.get.telefono().type(telefono);
	}

	botonCrearReserva(){
		this.get.btnCrearReserva().click()
	}
    
	
	
}
export const Reservapp = new reservapp();