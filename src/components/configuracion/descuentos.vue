<template>
    <div class="content ml-5 pl-5">
        <div class="shadow col-lg-8 pb-4">
        <form>
        <div class="row ml-2">
            <label class="titulos"><h2>Configurar Descuentos</h2></label>
        </div>
        <div class="row ml-5">
            <div class="col-md-4">
                <label class="titulos">% de Descuento</label><br>
                <input v-model="descuento.porcentaje" type="text" class="form-control-sm redondeadonorelieve" id="identificador" placeholder="Monto" autocomplete="off">
            </div>                                                                  
        </div>
        <div class="row ml-5">
            <div class="col-md-4">
                <label class="titulos">Descuento por Minutos</label><br>
                <input v-model="descuento.tiempo" type="text" class="form-control-sm redondeadonorelieve" id="identificador" placeholder="Monto" autocomplete="off">
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
            descuento:{
                id: 1,
                porcentaje: 0,
                tiempo: 0
            }
        }
    },
    methods: {
        validarCampoMonto: function (monto) {
            let montoRegex = /^[0-9]+([.])?([0-9]+)?$/;
            if (montoRegex.test(monto)) {
                return true;
            } else {
                return false;
            }
        },
        validaEntero: function(numero){            
            let montoRegex = /^\d*$/;
            if (montoRegex.test(numero)) {
                return true;
            } else {
                return false;
            }
        },        
        validar: function(){
            let porcen = this.validarCampoMonto(this.descuento.porcentaje);
            let min = this.validaEntero(this.descuento.tiempo);
            if(porcen == false){
                this.$toastr.warning('Formato de Porcentaje Incorrecto', 'Advertencia');
            }else if(min == false){
                this.$toastr.warning('El formato de minutos debe ser un Numero Entero', 'Advertencia');
            }else{
                this.actualizarDescuento();
            }
        },        
        actualizarDescuento: function(){
            this.$store
		    .dispatch('actualizarDescuento', this.descuento)
            .then(success => {
            //console.log(success);
                this.$toastr.success('Descuento Actualizado con Exito', 'Parqueadero');
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
        }
    }
}
</script>

<style>

</style>