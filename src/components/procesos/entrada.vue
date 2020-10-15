<template>
      <div class="content">
        <div class="shadow col-lg-12 p-4">
        <form>
        <div class="row">
            <label class="titulos"><h5>Registrar Entrada</h5></label>
        </div>
        <div class="row">
            <div class="col-md-3">
                <label class="titulos">Nro Documento</label>
                <input v-model="entrada.documento" @keyup="formatear('doc')" @change="buscarPersona" type="text" class="form-control-sm redondeadonorelieve" placeholder="Nro. Documento">
            </div>
            <div class="col-md-3">
                <label class="titulos">Nombres</label>
                <input v-model="entrada.nombres" type="text" class="form-control-sm redondeadonorelieve" placeholder="Nombres">
            </div>
            <div class="col-md-3">
                <label class="titulos">Apellidos</label>
                <input v-model="entrada.apellidos" type="text" class="form-control-sm redondeadonorelieve" placeholder="Apellidos">
            </div>
            <div class="col-md-2 pt-3">
                <button type="button" class="btn btn-success" @click="validar">REGISTRAR</button>
            </div>                      
        </div>
        <div class="row">
            <div class="col-md-3">
                <label class="titulos">Placa o Serial</label>
                <input v-model="entrada.placaSerial" @keyup="formatear('placa')" type="text" class="form-control-sm redondeadonorelieve" id="identificador" placeholder="Placa o Serial" autocomplete="off">
            </div>
            <div class="col-md-3">
                <label class="titulos">Tipo de Vehiculo</label><br>
                    <select v-model="entrada.tipoVehiculo_id" class="form-control-sm redondeadonorelieve" id="tipo_vehiculo_id" @change="disponibles">
                        <option value="0" selected>Seleccione...</option>
                        <option v-for="item in objTipoVehiculo" :key="item.id" :value="item.id">{{item.descripcion}}</option>
                    </select>
            </div>
            <div class="col-md-3">
                <label class="titulos">Puesto</label><br>
                    <select  v-model="entrada.puesto_id" class="form-control-sm redondeadonorelieve" id="mapa_id">
                    <option value="0" selected>Seleccione...</option>
                    <option v-for="item in objPuestosDisponibles" :key="item.id" :value="item.id">{{item.puesto}}</option>
                    </select>
            </div>                     
        </div>        
        </form>
        </div>
      </div>
</template>

<script>
export default {
    data(){
        return{
            entrada: {
                id_persona: 0,
                status_mov: 'A',
                documento: '',
                nombres: '',
                apellidos: '',
                placaSerial: '',
                tipoVehiculo_id: 0,
                puesto_id: 0
            },
            objTipoVehiculo: [],
            objPuestosDisponibles: []
        }
    },
    mounted(){
        this.cargarTipoVehiculo();
    },
    methods: {
        validar: function(){
            if(this.entrada.documento == ''){
                this.$toastr.warning('El Nro de Documento es Obligatorio', 'Advertencia');
            }else if(this.entrada.nombres == ''){
                this.$toastr.warning('El Nombre es Obligatorio', 'Advertencia');
            }else if(this.entrada.apellidos == ''){
                this.$toastr.warning('El Apellido es Obligatorio', 'Advertencia');
            }else if(this.entrada.placaSerial == ''){
                this.$toastr.warning('La Placa o Serie es Obligatoria', 'Advertencia');
            }else if(this.entrada.tipoVehiculo_id < 1){
                this.$toastr.warning('Sebe Seleccionar un Tipo de Vehiculo', 'Advertencia');
            }else if(this.entrada.puesto_id < 1){
                this.entrada.puesto_id = this.objPuestosDisponibles[0].id;
                this.grabarEntrada();
            }else{
                this.grabarEntrada();
            }
        },
        formatear: function(opcion){
            switch (opcion) {
                    case 'placa':
                        this.entrada.placaSerial = this.entrada.placaSerial.toUpperCase();
                        break;
                    case 'doc': 
                        this.entrada.documento = this.entrada.documento.toUpperCase();
                        break;
                    }
        },
        buscarPersona: function(){
            this.$store
		    .dispatch('buscarPersona', this.entrada.documento)
            .then(success => {
                //console.log(success);
                if(success.data[0].original.Persona[0].id > 0){
                    this.entrada.id_persona = success.data[0].original.Persona[0].id;
                    this.entrada.nombres    = success.data[0].original.Persona[0].nombres;
                    this.entrada.apellidos  = success.data[0].original.Persona[0].apellidos;
                }
            })
            .catch(error =>{					
            if (error.response) {
                this.$toastr.error('Error de Respuesta', 'Parqueadero');
                console.log(error.response.data);
                console.log(error.response.status);
                    if(error.response.status === 400){
                        this.$toastr.error('Error 400', 'Parqueadero');					            	
                        }
                        console.log(error.response.headers);
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log('Error', error.message);
                    }
                        console.log(error.config);
        })             
        },
        grabarEntrada: function(){
            this.$store
		    .dispatch('grabarEntrada', this.entrada)
            .then(success => {
                //console.log(success);
                this.$toastr.success('Imprimiendo Ticket de Entrada', 'Parqueadero');
                this.$emit('recargarMapa');
                //imprimir ticket de entrada
                    this.$store
                    .dispatch('generarTicketEntrada', this.entrada.placaSerial)
                    .then(success => {
                        console.log(success);
                        this.$store.dispatch('descargarPDF', success.data);
                    })
                    .catch(error =>{					
                    if (error.response) {
                        this.$toastr.error('Error de Respuesta', 'Parqueadero');
                        console.log(error.response.data);
                        console.log(error.response.status);
                            if(error.response.status === 400){
                                this.$toastr.error('Error 400', 'Parqueadero');					            	
                                }
                                console.log(error.response.headers);
                            } else if (error.request) {
                                console.log(error.request);
                            } else {
                                console.log('Error', error.message);
                            }
                                console.log(error.config);
                })
                //==================================================                 
                this.limpiarPayload();
            })
            .catch(error =>{					
            if (error.response) {
                this.$toastr.error('Error de Respuesta', 'Parqueadero');
                console.log(error.response.data);
                console.log(error.response.status);
                    if(error.response.status === 400){
                        this.$toastr.error('Error 400', 'Parqueadero');					            	
                        }
                        console.log(error.response.headers);
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log('Error', error.message);
                    }
                        console.log(error.config);
        })  
        },
        cargarTipoVehiculo: function(){
		    this.$store
		    .dispatch('cargarTipoVehiculo')
            .then(success => {
            //console.log(success);
                this.objTipoVehiculo = success.data;
            })
            .catch(error =>{					
            if (error.response) {
                this.$toastr.error('Error de Respuesta', 'Parqueadero');
                console.log(error.response.data);
                console.log(error.response.status);
                    if(error.response.status === 400){
                        this.$toastr.error('Error 400', 'Parqueadero');					            	
                        }
                        console.log(error.response.headers);
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log('Error', error.message);
                    }
                        console.log(error.config);
        })            
        },
        disponibles: function(){
            if(this.entrada.tipoVehiculo_id > 0){            
                    this.$store
                    .dispatch('cargarPuestosDisponibles', this.entrada.tipoVehiculo_id)
                    .then(success => {
                    if(this.entrada.tipoVehiculo_id == 1){
                        this.objPuestosDisponibles = [];
                        var dafila1 = 0;
                        for (var i = 0; i < success.data.length; i++){
                            if(success.data[i].fila == 1){
                                this.objPuestosDisponibles.push(success.data[i]);
                                dafila1++;
                            }
                        }
                    }else if(this.entrada.tipoVehiculo_id == 2){
                        this.objPuestosDisponibles = [];
                        var dafila5 = 0;
                        for (var i = 0; i < success.data.length; i++){
                            if(success.data[i].fila == 5){
                                this.objPuestosDisponibles.push(success.data[i]);
                                dafila5++;
                            }
                        }
                    }
                    if(dafila1 == 0){
                       if(this.entrada.tipoVehiculo_id == 1){
                           this.objPuestosDisponibles = [];
                        for (var i = 0; i < success.data.length; i++){
                            if(success.data[i].fila == 2){
                                this.objPuestosDisponibles.push(success.data[i]);
                            }
                          }
                        } 
                    }
                    if(dafila5 == 0){
                       if(this.entrada.tipoVehiculo_id == 2){
                           this.objPuestosDisponibles = [];
                        for (var i = 0; i < success.data.length; i++){
                            if(success.data[i].fila == 4){
                                this.objPuestosDisponibles.push(success.data[i]);
                            }
                          }
                        } 
                    }
                    if(this.entrada.tipoVehiculo_id == 3){
                        this.objPuestosDisponibles = [];
                        for (var i = 0; i < success.data.length; i++){
                            if(success.data[i].fila == 3){
                                this.objPuestosDisponibles.push(success.data[i]);
                            }
                          }
                    }                    
                    //console.log(success);
                    //this.objTipoVehiculo = success.data;
                    })
                    .catch(error =>{					
                    if (error.response) {
                        this.$toastr.success('Error de Respuesta', 'Parqueadero');
                        console.log(error.response.data);
                        console.log(error.response.status);
                            if(error.response.status === 400){
                                this.$toastr.success('Error 400', 'Parqueadero');					            	
                                }
                                console.log(error.response.headers);
                            } else if (error.request) {
                                console.log(error.request);
                            } else {
                                console.log('Error', error.message);
                            }
                                console.log(error.config);
                })
            }              
        },
        limpiarPayload: function(){
            this.entrada.id_persona = 0;
            this.entrada.documento = '';
            this.entrada.nombres = '';
            this.entrada.apellidos = '';
            this.entrada.placaSerial = '';
            this.entrada.tipoVehiculo_id = 0;
            this.entrada.puesto_id = 0;
        }
    }
}
</script>

<style>
.titulos{
    color:#000000 !important;
    font-weight: bold !important;    
}
.redondeadonorelieve {
   border-radius: 5px;
   border: 1px solid #39c;
 }
</style>