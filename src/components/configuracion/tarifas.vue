<template>
    <div class="content ml-5 pl-5">
        <div class="shadow col-lg-8 pb-4">
        <form>
        <div class="row ml-2">
            <label class="titulos"><h2>Configurar Tarifas</h2></label>
        </div>
        <div class="row pl-4 ml-5">
            <div class="col-md-3">
                <label class="titulos">Tipo de Vehiculo</label><br>
                    <select v-model="tarifas.tipoVehiculo_id" @change="asignarId" class="form-control-sm redondeadonorelieve" id="tipo_vehiculo_id">
                        <option value="0" selected>Seleccione...</option>
                        <option v-for="item in objTipoVehiculo" :key="item.id" :value="item.id">{{item.descripcion}}</option>
                    </select>
            </div>
            <div class="col-md-3">
                <label class="titulos">Precio</label><br>
                <input v-model="tarifas.monto" type="text" class="form-control-sm redondeadonorelieve" id="identificador" placeholder="Monto" autocomplete="off">
            </div>                                                        
        </div>
        <div class="row">
            <div class="col-md-2 pt-3">
                <button type="button" class="btn btn-success" @click="validar">SALVAR</button>
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
            objTipoVehiculo: [],
            tarifas:{                
                tipoVehiculo_id: 0,
                monto: null,
                id: 0
            },
            tabuladorPrecios: []           
        }
    },
    mounted(){
        this.cargarTipoVehiculo();
        this.cargarTarifas();
    },
    methods:{
        asignarId: function(){
            const objTabulador = this.tabuladorPrecios.find( item => item.tipo_vehiculo_id === this.tarifas.tipoVehiculo_id);
            this.tarifas.id = objTabulador.id;
            this.tarifas.monto = objTabulador.monto;
        },
        actualizarTarifas: function(){
            this.$store
		    .dispatch('actualizarTarifas', this.tarifas)
            .then(success => {
            //console.log(success);
                this.$toastr.success('Tarifa Actualizada con Exito', 'Parqueadero');
                this.cargarTarifas();
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
        cargarTarifas: function(){
            this.$store
		    .dispatch('cargarTarifas')
            .then(success => {
            //console.log(success);
                this.tabuladorPrecios = success.data;
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
        validarCampoMonto: function (monto) {
            let montoRegex = /^[0-9]+([.])?([0-9]+)?$/;
            if (montoRegex.test(monto)) {
                return true;
            } else {
                return false;
            }
        },        
        validar: function(){
            let resp = this.validarCampoMonto(this.tarifas.monto);
            if(this.tarifas.tipoVehiculo_id < 1){
                this.$toastr.warning('Debe seleccionar el Tipo de Vehiculo', 'Advertencia');
            }else if(resp == false){
                this.$toastr.warning('Formato de Monto Incorrecto', 'Advertencia');
            }else{
                this.actualizarTarifas();
            }
        }
    }
}
</script>

<style>

</style>