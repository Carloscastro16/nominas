<script lang="ts" setup>
import { ref, type Ref } from 'vue'
import '@vuepic/vue-datepicker/dist/main.css'
import Swal from 'sweetalert2'
import { getEmployeeByRfc, setPayrollInfo } from '@/services/FirestoreFunctions'
//Importacion de datos

/* const dateSelect: Ref<string | undefined> = ref(); */
const employeeRfc: Ref<string | undefined> = ref();
let faltas: Ref<string | undefined> = ref();
const emits = defineEmits(['closeDialog'])
const closeDialog = () => {
  // Emitir el evento al padre con los datos
    emits('closeDialog', false);
};
function calcularNomina(empleado: any) {
    let totalNomina = 0;
    console.log(empleado);
    const salarioBruto = calcularSalarioBruto(empleado);
    const imss = calcularDeduccionesIMSS(empleado)
    const salarioNeto = calcularSalarioNeto(salarioBruto, imss);
    totalNomina += salarioNeto.neto;
    
    console.log('Salario Total: ',totalNomina)
    let nomina = {
        totalNomina: totalNomina,
        salarioNeto: salarioNeto.neto,
        salarioBruto: salarioBruto,
        isr: salarioNeto.isr,
        imss: imss,
        faltas: faltas.value,
        totalHours: empleado.totalHours
    };
    console.log('Total: ',nomina)
    return nomina
}
function calcularSalarioNeto(salarioBruto: number, deduccionesIMSS: number) {
    const salarioGravable = salarioBruto - deduccionesIMSS;
    const isr = calcularISR(salarioGravable);
    const salarioNeto = salarioBruto - isr - deduccionesIMSS;
    console.log('Salario Neto: ',salarioNeto)
    return {
        neto: salarioNeto,
        isr: isr
    };
}
function calcularISR(salarioGravable: number) {
    let isr = 0;
    if (salarioGravable <= 10000) {
        isr = salarioGravable * 0.1;
    } else if (salarioGravable <= 20000) {
        isr = 1000 + (salarioGravable - 10000) * 0.15;
    } else {
        isr = 2500 + (salarioGravable - 20000) * 0.20;
    }
    console.log('ISR: ', isr);
    return isr;
}

function calcularSalarioBruto(empleado: any): number {
    const salarioBruto = empleado.hourlyWage * empleado.totalHours;
    console.log('Bruto', salarioBruto)
    return salarioBruto;
}
function calcularDeduccionesIMSS(empleado: any): number {
    // Porcentaje de cuotas obrero-patronales para 2022
    const porcentajeCuotasObreroPatronales = 0.0735; 
    // Calcular las cuotas obrero-patronales
    const cuotasObreroPatronales = calcularSalarioBruto(empleado) * porcentajeCuotasObreroPatronales
    // Calcular el total de deducciones del IMSS
    const totalDeduccionesIMSS = cuotasObreroPatronales;
    console.log('IMSS: ', totalDeduccionesIMSS);
    return totalDeduccionesIMSS;
}
async function submit(){
    try {
        let nomina: any;
        let response = await getEmployeeByRfc(employeeRfc.value);
        console.log('Usuario obtenido', response);
        if(Object.keys(response).length === 0){
            closeDialog();
            Swal.fire({
                title: 'Error!',
                text: 'No existe el RFC en la base de datos',
                icon: 'error',
                confirmButtonText: 'Cool'
            })
            return
        }
        response.totalHours = response.totalHours - faltas.value;
        let values = await calcularNomina(response);
        Swal.fire({
            title: 'Exito!',
            icon: 'success',
            confirmButtonText: 'Cool'
        })
        nomina = {
            ...values, 
            rfcEmpleado: response.rfc
        }
        console.log(nomina);
        await setPayrollInfo(nomina);
        closeDialog();
        return nomina;
    } catch (error) {
        console.log(error);
        closeDialog();
        Swal.fire({
            title: 'Error!',
            text: 'Do you want to continue',
            icon: 'error',
            confirmButtonText: 'Cool'
        })
    }
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
                        Nominas
                    </h2>
                    <div class="btn-exit">
                        <button type="button" @click="closeDialog()">
                            <ion-icon name="close-outline"></ion-icon>
                        </button>
                    </div>
                </div>
                <div class="employees-data">
                    <div class="input-container">
                        <div class="title">
                            Id de Empleado
                        </div>
                        <v-text-field
                            v-model="employeeRfc"
                            item-title="rfc"
                            label="rfc"
                            return-object
                            single-line
                            variant="outlined"
                        ></v-text-field>
                    </div>
                    <div class="input-container">
                        <div class="title">
                            Cant. Faltas
                        </div>
                        <v-text-field
                            v-model="faltas"
                            item-title="Faltas"
                            label="rfc"
                            return-object
                            single-line
                            variant="outlined"
                            type="number"
                        ></v-text-field>
                    </div>

                </div>
                <div class="btn-wrapper">
                    <v-btn class="me-4 px-8 text-white submit-pill" type="submit" rounded="pill">
                        Generar Nomina
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
</style>
