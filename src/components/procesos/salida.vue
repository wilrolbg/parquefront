<template>
      <div class="content">
        <form>
        <div class="row">
            <label class="titulos"><h5>Registrar Salida</h5></label>
        </div>
        <div class="row">
            <div class="col-md-3">
                <label class="titulos">Placa o Serial</label>
                <input
                    v-model="entrada.identificador"
                    @change="consultarEntradaCliente"
                    @keyup="formatear"
                    type="text"
                    class="form-control-sm redondeadonorelieve"
                    id="identificador"
                    placeholder="Placa o Serial"
                    autocomplete="off">
            </div>            
            <div class="col-md-3">
                <label class="titulos">Nro Documento:</label><br>
                <label class="titulos">{{ entrada.documento }}</label>
            </div>
            <div class="col-md-3">
                <label class="titulos">Nombres y Apellidos:</label><br>
                <label class="titulos">{{ entrada.nombres }} {{ entrada.apellidos }}</label>
            </div>
            <div class="col-md-2 pt-3">
                <button type="button" class="btn btn-warning" :disabled="btnInactivo" @click="grabarSalida">REGISTRAR</button>
            </div>                      
        </div><br>
        <div class="row">
            <div class="col-md-3">
                <label class="titulos">Tipo de Vehiculo:</label><br>
                <label class="titulos">{{ entrada.descripcion }}</label>
            </div>
            <div class="col-md-3">
                <label class="titulos">Puesto:</label><br>
                <label class="titulos">{{ entrada.puesto }}</label>
            </div>
            <div class="col-md-2">
                <label class="titulos">Fecha de Entrada:</label><br>
                <label v-if="entrada.fecha_entrada != ''" class="titulos">{{ entrada.fecha_entrada | ShortDate }}</label>
            </div>
            <div class="col-md-2">
                <label class="titulos">Hora de Entrada:</label><br>
                <label v-if="entrada.hora_entrada != ''" class="titulos">{{ entrada.hora_entrada }}</label>
            </div>                               
        </div>        
        </form>            
      </div>    
</template>

<script>
export default {
    data(){
        return {
           entrada: {
               //Cliente........
                id_persona: 0,
                documento: '',
                nombres: '',
                apellidos: '',
              //Vehiculo........
                identificador: '',
                vehiculos_id: 0,
                tipo_vehiculo_id: 0,
                descripcion: '',
             //Movimiento.......
                id: 0,
                fecha_entrada: '',
                hora_entrada: '',
                fecha_salida: '',
                hora_salida: '',
                status_mov: 'C',
            //Mapa Ubicacion.....
                mapa_id: 0,
                puesto: '',
                fila: 0,
                status: ''
            },
            btnInactivo: true
        }
    },
    methods: {
        limpiarPayload: function(){
            this.entrada.documento = '';
            this.entrada.nombres = '';
            this.entrada.apellidos = '';
            this.entrada.descripcion = '';
            this.entrada.puesto = '';
            this.entrada.fecha_entrada = '';
            this.entrada.hora_entrada = '';
        },
        grabarSalida: function(){
          this.$store
		    .dispatch('grabarSalida', this.entrada)
            .then(success => {
                //console.log(success);
                this.$toastr.success('Salida Registrada con Exito', 'Parqueadero');
                this.$emit('recargarMapa');
                    this.$store
                    .dispatch('generarTicketSalida', this.entrada)
                    .then(success => {
                        //console.log(success);
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
                //this.limpiarPayload();
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
        consultarEntradaCliente: function(){
            this.$store
		    .dispatch('consultarEntradaCliente', this.entrada.identificador)
            .then(success => {
                console.log(success);
                if(success.data[0].original.Entrada[0].id > 0){
                    this.entrada.id_persona             = success.data[0].original.Entrada[0].personas_id;
                    this.entrada.documento              = success.data[0].original.Entrada[0].documento;
                    this.entrada.nombres                = success.data[0].original.Entrada[0].nombres;
                    this.entrada.apellidos              = success.data[0].original.Entrada[0].apellidos;
                    this.entrada.identificador          = success.data[0].original.Entrada[0].identificador;
                    this.entrada.vehiculos_id           = success.data[0].original.Entrada[0].vehiculos_id;
                    this.entrada.tipo_vehiculo_id       = success.data[0].original.Entrada[0].tipo_vehiculo_id;
                    this.entrada.descripcion            = success.data[0].original.Entrada[0].descripcion;
                    this.entrada.id                     = success.data[0].original.Entrada[0].id;
                    this.entrada.fecha_entrada          = success.data[0].original.Entrada[0].fecha_entrada;
                    this.entrada.hora_entrada           = success.data[0].original.Entrada[0].hora_entrada;
                    this.entrada.fecha_salida           = success.data[0].original.Entrada[0].fecha_salida;
                    this.entrada.hora_salida            = success.data[0].original.Entrada[0].hora_salida;
                    this.entrada.mapa_id                = success.data[0].original.Entrada[0].mapa_id;
                    this.entrada.puesto                 = success.data[0].original.Entrada[0].puesto;
                    this.entrada.fila                   = success.data[0].original.Entrada[0].fila;
                    this.entrada.status                 = success.data[0].original.Entrada[0].status;
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
        formatear: function(){
            this.entrada.identificador = this.entrada.identificador.toUpperCase();
            if(this.entrada.identificador.length > 0){
                this.btnInactivo = false;
            }else{
                this.btnInactivo = true;
            }
        }
    }
}
</script>

<style>

</style>