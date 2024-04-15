<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import Swal from 'sweetalert2'
//Importacion de datos
import { ranges, departments } from '@/data/employeesData'

const dateSelect: Ref<string | undefined> = ref()
const employeeId: Ref<string | undefined> = ref()
const rangeSelect: Ref<string | undefined> = ref()
const departmentSelect: Ref<string | undefined> = ref()
const motive: Ref<string | undefined> = ref()
let form = {
    id: employeeId.value,
    type: 'Vacations',
    range: rangeSelect.value,
    department: departmentSelect.value,
    motive: motive.value,
    date: dateSelect.value,
    errors: []
}

function submit(){
    console.log('Form values')
    form = {
        id: employeeId.value,
        type: 'Vacations',
        range: rangeSelect.value,
        department: departmentSelect.value,
        motive: motive.value,
        date: dateSelect.value,
        errors: []
    }
    Swal.fire({
        title: 'Error!',
        text: 'Do you want to continue',
        icon: 'error',
        confirmButtonText: 'Cool'
    })
    console.log(form);
}
function checkForm(){

}
</script>
<template>
    <div class="container">
        <div class="form-container">
            <form @submit.prevent="submit">
                <div class="main-title">
                    <h2>
                        Solicitud de Vacaciones
                    </h2>
                </div>
                <div class="input-container">
                    <div class="title">
                        Id de Empleado
                    </div>
                    <v-text-field
                        v-model="employeeId"
                        item-title="id"
                        label="Id"
                        return-object
                        single-line
                        variant="outlined"
                    ></v-text-field>
                </div>
                <div class="employee-data">
                    <div class="input-container">
                        <div class="title">
                            Puesto
                        </div>
                        <v-select
                            clearable
                            v-model="rangeSelect"
                            :items="ranges"
                            item-title="Puesto"
                            label="Puesto"
                            return-object
                            single-line
                            variant="outlined"
                        ></v-select>
                    </div>
                    <div class="input-container">
                        <div class="title">
                            Departamento
                        </div>
                        <v-select
                            clearable
                            v-model="departmentSelect"
                            :items="departments"
                            item-title="Departamento"
                            label="Departamento"
                            return-object
                            single-line
                            variant="outlined"
                        ></v-select>
                    </div>
                </div>
                <div class="input-container">
                    <div class="title">
                        Motivo
                    </div>
                    <v-textarea 
                        item-titles="Motivo"
                        v-model='motive'
                        variant="outlined"
                    ></v-textarea>
                </div>
                <VueDatePicker 
                    v-model="dateSelect" 
                    :range="{ minRange: 1 }" 
                    :enable-time-picker="false" 
                    ></VueDatePicker>
                <div class="btn-wrapper">
                    <v-btn class="me-4 px-8 text-white submit-pill" type="submit" rounded="pill">
                        Enviar Solicitud
                    </v-btn>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped lang="scss">
.form-container{
    background: #fff;
    border-radius: 1rem;
    padding: 1.3rem;
    .main-title{
        h2{
            font-size: 1.6rem;
            margin-bottom: 1rem;
            font-weight: 500;
            color: #FF735C;
        }
    }
}
.employee-data{
    display: flex;
    gap: .8rem;
}
.btn-wrapper{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .submit-pill{
        margin-top: 1.5rem;
    }
}
</style>
