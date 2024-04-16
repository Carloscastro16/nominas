<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import '@vuepic/vue-datepicker/dist/main.css'
import Swal from 'sweetalert2'
//Importacion de datos
import { ranges, departments } from '@/data/employeesData'
import type { Employee } from '@/interfaces/employees'
import { setEmployeeInfo } from '@/services/FirestoreFunctions'

const name: Ref<string | undefined> = ref()
const curp: Ref<string | undefined> = ref()
const rfc: Ref<string | undefined> = ref()
const imss: Ref<string | undefined> = ref()
const lastName: Ref<string | undefined> = ref()
const hourlyWage: Ref<string | undefined> = ref()
const rangeSelect: Ref<string | undefined> = ref()
const departmentSelect: Ref<string | undefined> = ref()
const emits = defineEmits(['closeDialog'])
let form: Ref<Employee> = ref({
    name: name.value,
    lastName: lastName.value,
    curp: curp.value,
    rfc: rfc.value,
    imss: imss.value,
    range: rangeSelect.value,
    department: departmentSelect.value,
    hourlyWage: hourlyWage.value,
    totalHours: 15.25
})
function generarCorreo(nombre, apellido) {
    // Obtener las primeras 3 letras del nombre y convertirlas a minúsculas
    const nombreAbreviado = nombre.substring(0, 3).toLowerCase();
    
    // Obtener el primer apellido y convertir la primera letra a minúscula
    const primerApellido = apellido.split(' ')[0].toLowerCase();
    
    // Generar el correo electrónico combinando el nombre abreviado y el primer apellido
    const correo = nombreAbreviado + '.' + primerApellido + '@mail.com';
    
    return correo;
}
async function submit(){
    let response: any;
    console.log('Form values')
    form.value = {
        name: name.value!,
        lastName: lastName.value,
        curp: curp.value,
        rfc: rfc.value,
        imss: imss.value,
        range: rangeSelect.value,
        department: departmentSelect.value,
        hourlyWage: hourlyWage.value,
        mail: generarCorreo(name.value, lastName.value),
        totalHours: 15.25
    }
    console.log(form.value);
    closeDialog();
    try {
        response = await setEmployeeInfo(form.value);
        console.log(response);
        Swal.fire({
            title: 'Exito!',
            icon: 'success',
            confirmButtonText: 'Cool'
        })
    } catch (error) {
        console.log(error);
    }
    return response;
}
function checkForm(){

}

const closeDialog = () => {
  // Emitir el evento al padre con los datos
    emits('closeDialog', false);
};

</script>
<template>
    <div class="container">
        <div class="form-container">
            <form @submit.prevent="submit">
                <div class="main-title">
                    <h2>
                        Empleados
                    </h2>
                    <div class="btn-exit">
                        <button type="button" @click="closeDialog()">
                            <ion-icon name="close-outline"></ion-icon>
                        </button>
                    </div>
                </div>
                <div class="employee-data">
                    <div class="input-container">
                        <div class="title">
                            Nombre
                        </div>
                        <v-text-field
                            density="compact"
                            v-model="name"
                            item-title="Nombre"
                            label="Nombre"
                            return-object
                            single-line
                            variant="outlined"
                        ></v-text-field>
                    </div>
                    <div class="input-container">
                        <div class="title">
                            Apellidos
                        </div>
                        <v-text-field
                            density="compact"
                            v-model="lastName"
                            item-title="lastname"
                            label="Apellidos"
                            return-object
                            single-line
                            variant="outlined"
                        ></v-text-field>
                    </div>
                </div>
                <div class="input-container">
                    <div class="title">
                        CURP
                    </div>
                    <v-text-field
                        density="compact"
                        v-model="curp"
                        item-title="CURP"
                        label="CURP"
                        return-object
                        single-line
                        variant="outlined"
                    ></v-text-field>
                </div>
                <div class="employee-data">
                    <div class="input-container">
                        <div class="title">
                            RFC
                        </div>
                        <v-text-field
                            density="compact"
                            v-model="rfc"
                            item-title="RFC"
                            label="RFC"
                            return-object
                            single-line
                            variant="outlined"
                        ></v-text-field>
                    </div>
                    <div class="input-container">
                        <div class="title">
                            IMSS
                        </div>
                        <v-text-field
                            density="compact"
                            v-model="imss"
                            item-title="IMSS"
                            label="IMSS"
                            return-object
                            single-line
                            variant="outlined"
                            type="number"
                        ></v-text-field>
                    </div>
                </div>
                <div class="employee-data">
                    <div class="input-container">
                        <div class="title">
                            Puesto
                        </div>
                        <v-select
                            density="compact"
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
                            density="compact"
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
                        Sueldo por Hora
                    </div>
                    <v-text-field
                        prefix="$"
                        suffix="MXN"
                        density="compact"
                        v-model="hourlyWage"
                        item-title="lastname"
                        label="0"
                        return-object
                        single-line
                        variant="outlined"
                        type="number"
                    ></v-text-field>
                </div>
                <div class="btn-wrapper">
                    <button class="submit-pill px-8 py-1 rounded text-white">
                        Enviar Solicitud
                    </button>
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
    height: 100%;
    .input-container{
        font-size: .8rem;
        v-text-field{
            font-size: .8rem;
        }
    }
    .main-title{
        display: flex;
        align-items: center;
        justify-content: space-between;
        h2{
            font-size: 1rem;
            margin-bottom: 1rem;
            font-weight: 500;
            color: #FF735C;
        }
        .btn-exit{
            button{
                display: flex;
                align-items: center;
                justify-content: center;
                padding: .2rem;
                border-radius: 50%;
                border: 2px solid var(--primary-color);
                color: var(--primary-color);
                font-weight: bold;
                &:hover{
                    border: 2px solid #ea2222;
                    color: #fff;
                    background-color: #ea2222;
                }
            }
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
    align-items: flex-end;
    justify-content: flex-end;
    .submit-pill{
        background: var(--primary-color);
        &:hover{
            background: #fff !important;
            color: var(--primary-color) !important;
            border: 1.5px solid var(--primary-color)
        }
    }
}
.mi-text-field {
    max-height: 100px;
    height: 100px; /* Personaliza la altura según tus necesidades */
}
.mi-text-field .v-input__control {
    padding: 20px !important; /* Personaliza el padding según tus necesidades */
}
</style>
