<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { getAllPayrolls } from '@/services/FirestoreFunctions'
import { useRoute } from 'vue-router'
import { getEmployeeByRfc } from '@/services/FirestoreFunctions'

const route = useRoute()
let payroll = ref({})
let payrolls = ref()
let employeeData = ref()
//Importacion de datos
let allData: any = ref({
  data: 'Employee',
  name: 'Random'
});


async function onGetEmployeeData(rfc: any) {
  let response = await getEmployeeByRfc(rfc)
  return response
}
function getRouteId(fullRoute: any) {
  // Verifica si la ruta contiene el patrón "/payroll/" seguido por una cadena
  const patron = /\/payroll\/([^/]+)/
  const coincidencia = fullRoute.match(patron)

  // Si hay una coincidencia y se captura la parte después de "/payroll/", devuélvela
  if (coincidencia && coincidencia[1]) {
    return coincidencia[1]
  } else {
    // Si no hay una coincidencia, devuelve null o realiza alguna otra acción según sea necesario
    return null
  }
}
async function onGetPayroll(path: any) {
  let response = await getAllPayrolls()
  let nomina: any
  response!.forEach((item: any) => {
    if (item.uid == path) {
      nomina = item
    }
  })
  console.log(nomina)
  payroll.value = nomina
  employeeData.value = await onGetEmployeeData(nomina.rfcEmpleado)
  return nomina
}
function getData(){
    console.log('Datos de nomina', payroll.value);
    console.log('Datos de empleado', employeeData.value);
}
async function onGetAllPayroll() {
  let response = await getAllPayrolls()
  payrolls.value = response
}
onMounted(async () => {
  const path = computed(() => route.path)
  let stringPath = path.value.toString()
  let pathValue = ref(getRouteId(stringPath))
  console.log('id:', pathValue.value)
  await onGetPayroll(pathValue.value)
  allData.value = {
    ...employeeData.value, ...payroll.value
  }
  console.log('allData:', allData.value);
})
</script>

<template>
  <div class="main">
    <div class="container">
      <div class="pdf-container">
        <div class="top">
          <div class="left">
            <div class="info-container">
              <span> Nombre </span>
              <p>
                {{ allData.name }}
              </p>
            </div>
            <div class="info-container">
              <span> IMSS </span>
              <p>
                {{ allData.imss }}
              </p>
            </div>
            <div class="info-container">
              <span> RFC </span>
              <p>
                {{ allData.rfcEmpleado }}
              </p>
            </div>
          </div>
          <div class="right">
            <div class="info-container">
              <span> Departamento </span>
              <p>
                {{ allData.department }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.pdf-container {
  border: 1px solid #000;
}
</style>
