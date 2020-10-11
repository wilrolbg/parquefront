<template>
    <div class="container">
    <div class="modal-header">
        <button type="button" class="btn btn-success" @click="registrarEntrada">REGISTRAR ENTRADA</button> 
        <button type="button" class="btn btn-warning">REGISTRAR SALIDA</button> 
    </div>        
        <table class="table table-sm table-bordered">
        <thead>
            <tr>
                <th colspan="11" class="text-center top">PARQUEADERO</th>                
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="entrada">E</td>
                <td v-for="posicion in mapa.fila1" :key="posicion.id" colspan="2" :class="posicion.status == 'D' ? 'text-center disponible' : 'text-center ocupado'">{{posicion.puesto}}</td>
            </tr>
            <tr>
                <td class="entrada">N</td>
                <td v-for="posicion in mapa.fila2" :key="posicion.id" colspan="2" :class="posicion.status == 'D' ? 'text-center disponible' : 'text-center ocupado'">{{posicion.puesto}}</td>                     
            </tr>
            <tr>
                <td class="entrada">T</td>
                <td colspan="10"></td>                       
            </tr>
            <tr>
                <td class="entrada">R</td>
                <td v-for="posicion in mapa.fila3" :key="posicion.id" :class="posicion.status == 'D' ? 'text-center disponible' : 'text-center ocupado'">{{posicion.puesto}}</td>                      
            </tr>
            <tr>
                <td class="entrada">A</td>
                <td colspan="10"></td>                            
            </tr>
            <tr>
                <td class="entrada">D</td>
                <td v-for="posicion in mapa.fila4" :key="posicion.id" :class="posicion.status == 'D' ? 'text-center disponible' : 'text-center ocupado'">{{posicion.puesto}}</td>                          
            </tr>
            <tr>
                <td class="entrada">A</td>
                <td v-for="posicion in mapa.fila5" :key="posicion.id" :class="posicion.status == 'D' ? 'text-center disponible' : 'text-center ocupado'">{{posicion.puesto}}</td>                      
            </tr>                                                                        
        </tbody>
        </table> 
        <Procesar-Entrada/>  
    </div>
</template>

<script>
export default {
    metaInfo: {
        title: 'Procesos'
    },
    data(){
        return {
            mapa: {
                fila1: [],
                fila2: [],
                fila3: [],
                fila4: [],
                fila5: []
            }
        }
    },
    mounted(){
        this.cargarMapa();
    },
    methods:{
        cargarMapa: function(){
		    this.$store
		    .dispatch('cargarMapa')
            .then(success => {
                for (var i = 0; i < success.data.length; i++){
                    switch (success.data[i].fila) {
                    case 1:
                        this.mapa.fila1.push(success.data[i]);
                        break;
                    case 2: 
                        this.mapa.fila2.push(success.data[i]);
                        break;
                    case 3:
                        this.mapa.fila3.push(success.data[i]);
                        break;
                    case 4:
                        this.mapa.fila4.push(success.data[i]);
                        break;
                    default:
                        this.mapa.fila5.push(success.data[i]);
                    }                    
                }
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
        },
        registrarEntrada: function(){
            this.$bvModal.show("entrada");
        }
    }
}
</script>

<style>
.disponible{
    background-color: #2CF604 !important;
    color:#000000 !important;
    font-weight: bold !important;
}

.ocupado{
    background-color: #F14122 !important;
    color:#000000 !important;
    font-weight: bold !important;
}

.top{
    background-color: #000000 !important;
    color:#FFFFFF !important;
    font-weight: bold !important;
    font-size:medium !important;
}
.entrada{
    background-color:darkorange !important;
    color:#000000 !important;
    font-weight: bold !important;
}
</style>