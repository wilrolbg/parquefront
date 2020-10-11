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
						//console.log(response.data.data);
					}
				})
				.catch(error => {
					reject(error);
				});
			});			
		}        
  },
  modules: {

  },
  getters: {

  }
})
