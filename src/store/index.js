import Vue from 'vue'
import Vuex from '../../node_modules/vuex'
import '../../node_modules/es6-promise/auto'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {    
    codigoMsgLogin: '',
    mensajeLogin: '',
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
    msgErrorLoginMut: function(state, codigo){
      state.codigoMsgLogin = codigo;
        switch (codigo) {
          case '001':
            state.mensajeLogin = 'Debe Ingresar su Correo Eletrónico';
            break;
          case '002':
            state.mensajeLogin = 'Debe Ingresar su Contraseña';
            break;          
          case '003':
            state.mensajeLogin = 'El formato del Correo Electrónico es Inválido';
            break;
          case '004':
            state.mensajeLogin = 'Credenciales Inválidas';
            break;            
          default:
            console.log('No hay usuarios logueados...');
        }   
    },
    limpiarErrores: function(state){
      this.state.codigoMsgLogin = '';
      this.state.mensajeLogin = '';
    },
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
    msgErrorLoginAct: function(context, codigo){
    context.commit('msgErrorLoginMut', codigo);
    }      
  },
  modules: {

  },
  getters: {

  }
})
