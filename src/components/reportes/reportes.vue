<template>
    <div class="content">
        <div class="shadow col-lg-12 p-4">
            <div class="row ml-5">
                <label class="titulos"><h3><strong>Reportes</strong></h3></label>
            </div>
            <div class="row col-md-12">
                <div class="col-md-3">
                    <label class="titulos">Desde</label><br>
                    <input v-model="filtro.fecha_desde" type="date" name="desde">
                </div>
                <div class="col-md-3">
                    <label class="titulos">Hasta</label><br>
                    <input v-model="filtro.fecha_hasta" type="date" name="desde">
                </div>
                <div class="col-md-3">
                <label class="titulos">Reporte</label><br>
                    <select v-model="reporte" class="form-control-sm redondeadonorelieve" id="tipo_vehiculo_id">
                        <option value="0" selected>Seleccione...</option>                    
                        <option value="1" >Transacciones Entrada y Salida</option>
                        <option value="2" >Vehículos por Tipos</option> 
                        <option value="3" >Monto Obtenido por Dia</option>     
                        <option value="4" >Puesto mas Utilizado</option>  
                    </select>
                </div>
                <div class="col-md-2 pt-3 ml-2">
                    <button type="button" class="btn btn-success" @click="validarFecHasta">BUSCAR</button>
                </div>                             
            </div>
        <div class="row">
            
        </div>   
        </div>
    </div>
</template>
<script>

export default {     
    data(){
        var f = new Date();
        return {
            filtro: {
                fecha_desde: f.getFullYear()+"-"+(f.getMonth() +1)+"-"+f.getDate(),
                fecha_hasta: f.getFullYear()+"-"+(f.getMonth() +1)+"-"+f.getDate()  
            },
            reporte: 0             
        }
    },
    methods: {
        validarFecHasta: function(){
            if(this.filtro.fecha_desde > this.filtro.fecha_hasta){
                this.$toastr.warning('La fecha Desde no puede ser Mayor que la fecha Hasta', 'Parqueadero');
            }else{
                this.buscar();
            }

        },
        buscar: function(){
            switch (this.reporte) {
                    case '1':
                        this.generarEntradaSalida();
                        break;
                    case '2': 
                        this.generarTipoVehiculos();
                        break;
                    case '3':
                        this.generarMontosXdia();
                        break;
                    case '4':
                        this.generarIteraciones();
                        break;                        
                    }  
        },
        generarEntradaSalida: function(){
            this.$store
		    .dispatch('generarEntradaSalida', this.filtro)
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
        },
        generarTipoVehiculos: function(){
                    this.$store
                    .dispatch('generarTipoVehiculos', this.filtro)
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
                },
        generarMontosXdia: function(){
            this.$store
            .dispatch('generarMontosXdia', this.filtro)
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
        },
        generarIteraciones: function(){
            this.$store
            .dispatch('generarIteraciones', this.filtro)
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
        }                                   
    }
}
</script>