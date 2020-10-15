import Vue from 'vue'
import axios from 'axios'
import Vuex from 'vuex'
import 'es6-promise/auto'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {    
    mapa: [],
        Paginacion: {
            'total': 0,
            'current_page': 0,
            'per_page': 0,
            'last_page': 0,
            'from': 0,
            'to': 0
         }    
  },
  mutations: {
    cargarPaginador: function(state, objPaginacion){ // PAGINADOR
      this.state.Paginacion.total         = objPaginacion.total;
      this.state.Paginacion.current_page  = objPaginacion.current_page;
      this.state.Paginacion.per_page      = objPaginacion.per_page;
      this.state.Paginacion.last_page     = objPaginacion.last_page;
      this.state.Paginacion.from          = objPaginacion.from;
      this.state.Paginacion.to            = objPaginacion.to;      
    },
    paginaActual: function(state, numeroPagina){ // PAGINADOR
      this.state.Paginacion.current_page = numeroPagina;
    }       
  },
  actions: {
    actualPagina: function(context, pagina){     // PAGINADOR
      context.commit('paginaActual', pagina);
    },
		cargarMapa: function(context){
			let url = '/mapa/cargar';
			return new Promise((resolve, reject, response) =>{
				axios
				.get(url)
				.then((response) => {
					if(response.status === 200){																
						resolve(response);
					}
				})
				.catch(error => {
					reject(error);
				});
			});			
    },
    cargarTipoVehiculo: function(context){
			let url = '/tipovehiculo/cargar';
			return new Promise((resolve, reject, response) =>{
				axios
				.get(url)
				.then((response) => {
					if(response.status === 200){																
						resolve(response);
						//console.log(response.data.data);
					}
				})
				.catch(error => {
					reject(error);
				});
			});			
	},
	cargarTarifas: function(context){
		let url = '/tarifas/consultar';
		return new Promise((resolve, reject, response) =>{
			axios
			.get(url)
			.then((response) => {
				if(response.status === 200){																
					resolve(response);
					//console.log(response.data.data);
				}
			})
			.catch(error => {
				reject(error);
			});
		});			
	},
	actualizarTarifas: function(context, objTarifas){
		let url = `/tarifas/actualizar/${objTarifas.id}`;
		return new Promise((resolve, reject, response) =>{
			axios
			.put(url, objTarifas)
			.then((response) => {
				if(response.status === 200){																
					resolve(response);
					//console.log(response.data.data);
				}
			})
			.catch(error => {
				reject(error);
			});
		});			
	},
	actualizarDescuento: function(context, objDescuento){
		let url = `/descuento/actualizar/${objDescuento.id}`;
		return new Promise((resolve, reject, response) =>{
			axios
			.put(url, objDescuento)
			.then((response) => {
				if(response.status === 200){																
					resolve(response);
					//console.log(response.data.data);
				}
			})
			.catch(error => {
				reject(error);
			});
		});			
	},			
    cargarPuestosDisponibles: function(context, id){
			let url = `/disponibles/cargar/${id}`;
			return new Promise((resolve, reject, response) =>{
				axios
				.get(url)
				.then((response) => {
					if(response.status === 200){																
						resolve(response);
						//console.log(response.data.data);
					}
				})
				.catch(error => {
					reject(error);
				});
			});			
		},
		consultarEntradaCliente: function(context, identificador){
			let url = `/movimientos/buscar/${identificador}`;
			return new Promise((resolve, reject, response) =>{
				axios
				.get(url)
				.then((response) => {
					if(response.status === 200){																
						resolve(response);
						//console.log(response.data.data);
					}
				})
				.catch(error => {
					reject(error);
				});
			});
		},
		buscarPersona: function(context, documento){
			let url = `/personas/buscar/${documento}`;
			return new Promise((resolve, reject, response) =>{
				axios
				.get(url)
				.then((response) => {
					if(response.status === 200){																
						resolve(response);
						//console.log(response.data.data);
					}
				})
				.catch(error => {
					reject(error);
				});
			});			
		},		
		grabarEntrada: function(context, payload){
			let url = '/entrada/registrar';
			return new Promise((resolve, reject, response) =>{
				axios
				.post(url, payload)
				.then((response) => {
					if(response.status === 200){																
						resolve(response);
						//console.log(response.data.data);
					}
				})
				.catch(error => {
					reject(error);
				});
			});			
		},
		grabarSalida: function(context, payload){
			let url = `/registrar/salida/${payload.tipo_vehiculo_id}`;
			return new Promise((resolve, reject, response) =>{
				axios
				.put(url, payload)
				.then((response) => {
					if(response.status === 200){																
						resolve(response);
						//console.log(response.data.data);
					}
				})
				.catch(error => {
					reject(error);
				});
			});			
		},
		generarTicketEntrada: function (context, id) {
			let url = `/imprimir/ticketentrada/${id}`;
			let token = sessionStorage.sessionToken;
			return new Promise((resolve, reject) => {
				axios
					.get(url, {responseType: 'blob' })
					.then((response) => {
						if (response.status === 200) {
							resolve(response);
							//console.log(response);								
						}
					})
					.catch(error => {
						reject(error);
					});
			});
		},
		generarTicketSalida: function (context, payload) {
			let url = '/imprimir/ticketsalida';
			let token = sessionStorage.sessionToken;
			return new Promise((resolve, reject) => {
				axios
					.post(url, payload, {responseType: 'blob' })
					.then((response) => {
						if (response.status === 200) {
							resolve(response);
							//console.log(response);								
						}
					})
					.catch(error => {
						reject(error);
					});
			});
		},
		generarEntradaSalida: function (context, payload) {
			console.log(payload);
			let url = '/imprimir/entradasalida';
			let token = sessionStorage.sessionToken;
			return new Promise((resolve, reject) => {
				axios
					.post(url, payload, {responseType: 'blob' })
					.then((response) => {
						if (response.status === 200) {
							resolve(response);
							//console.log(response);								
						}
					})
					.catch(error => {
						reject(error);
					});
			});
		},
		generarTipoVehiculos: function (context, payload) {
			console.log(payload);
			let url = '/imprimir/vehiculostipo';
			let token = sessionStorage.sessionToken;
			return new Promise((resolve, reject) => {
				axios
					.post(url, payload, {responseType: 'blob' })
					.then((response) => {
						if (response.status === 200) {
							resolve(response);
							//console.log(response);								
						}
					})
					.catch(error => {
						reject(error);
					});
			});
		},
		generarMontosXdia: function (context, payload) {
			console.log(payload);
			let url = '/imprimir/totaldiario';
			let token = sessionStorage.sessionToken;
			return new Promise((resolve, reject) => {
				axios
					.post(url, payload, {responseType: 'blob' })
					.then((response) => {
						if (response.status === 200) {
							resolve(response);
							//console.log(response);								
						}
					})
					.catch(error => {
						reject(error);
					});
			});
		},			
		generarIteraciones: function (context, payload) {
			console.log(payload);
			let url = '/imprimir/masutilizado';
			let token = sessionStorage.sessionToken;
			return new Promise((resolve, reject) => {
				axios
					.post(url, payload, {responseType: 'blob' })
					.then((response) => {
						if (response.status === 200) {
							resolve(response);
							//console.log(response);								
						}
					})
					.catch(error => {
						reject(error);
					});
			});
		},								
		descargarPDF: function(context, blob){
			var fileURL = URL.createObjectURL(blob);
			  window.open(fileURL);	
		  },   				 		   		     
  },
  modules: {

  },
  getters: {

  }
})
