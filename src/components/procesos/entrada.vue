<template>
<b-modal id="entrada" size="lg">
      <div slot="modal-title">Registrar Entrada</div>
            <form>
                <div class="form-row pt-1">
                    <div class="form-group col-md-6">
                        <label class="titulos">Nro Documento</label>
                        <input type="text" class="form-control redondeadonorelieve" id="documento" placeholder="Nro de Docuemento">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group col-md-5">
                        <label class="titulos">Nombres</label>
                        <input type="text" class="form-control redondeadonorelieve" id="nombres" placeholder="Nombres">
                    </div>
                    <div class="form-group col-md-5">
                        <label class="titulos">Apellidos</label>
                        <input type="text" class="form-control redondeadonorelieve" id="apellidos" placeholder="Apellidos">
                    </div>                                                               
                </div>
                <div class="form-row">
                    <div class="form-group col-md-3">
                        <label class="titulos">Placa o Serial</label>
                        <input type="text" class="form-control redondeadonorelieve" id="identificador" placeholder="Placa o Serial">
                    </div>
                <div class="form-group col-md-3">
                    <label class="titulos">Tipo de Vehiculo</label>
                    <select class="form-control redondeadonorelieve" id="tipo_vehiculo_id">
                    <option selected>Seleccione...</option>
                    <option>Automovil</option>
                    <option>Bicicleta</option>
                    <option>Moto</option>
                    </select>
                </div>
                <div class="form-group col-md-3">
                    <label class="titulos">Puesto</label>
                    <select class="form-control redondeadonorelieve" id="mapa_id">
                    <option selected>Seleccione...</option>
                    <option>A1</option>
                    <option>A2</option>
                    <option>A3</option>
                    </select>
                </div>                                                     
                </div>                          
            </form>       
      <template v-slot:modal-footer>
        <b-button>Cancelar</b-button>
        <b-button class="btn btn-info">Guardar</b-button>
      </template>
    </b-modal>
</template>

<script>
export default {
    data(){
        return{

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