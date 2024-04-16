<script lang="ts" setup>
import { ref, onMounted } from 'vue';
let search = ref('');
import { useRouter } from 'vue-router'
import PayrollForm from './forms/PayrollForm.vue'
import { getAllPayrolls } from '@/services/FirestoreFunctions'
//Importacion de datos

const router = useRouter()

const headers = [
  { title: 'No. Nómina', key: 'uid' },
  { title: 'No. Empleado', key: 'rfcEmpleado'},
  { title: 'IMSS', key: 'imss' },
  { title: 'Salario Neto', key: 'salarioNeto' },
  { title: 'Faltas', key: 'faltas' },
  { title: 'Acciones', key: 'actions', sortable: false },
]
const payrolls = ref([
  {
    "rfcEmpleado": "12",
    "uid": "5",
    "imss": "01/mar./2024 al 15/mar./2024",
    "salario neto": "15.25",
    "faltas": "0"
  }
])
let dialog = ref(false);

function getColor(range: any) {
  if (range == 'Ingeniero') return 'red'
  else if (range == 'Programador') return 'orange'
  else return 'green'
}
function editItem(item: any) {
  return item
}
function deleteItem(item: any) {
  return item
}
function redirectTo(query: string) {
  router.push(query)
}
function closeDialog(){
    dialog.value = false
}
async function onGetAllPayroll(){
    let response = await getAllPayrolls()
    payrolls.value = response
    console.log('Datos de todos', response);
    console.log('Payrolles de todos', payrolls.value);
}
let isLoading = ref(false);
onMounted(async () => {
    isLoading.value = true;
    await onGetAllPayroll();
    isLoading.value = false;
  })
</script>

<template>
  <div class="main">
    <div class="container">
      <div class="header">
        <div class="search-container">
          <ion-icon name="search-outline"></ion-icon>
          <input type="text" v-model="search" placeholder="Search">
        </div>
        <div class="add-btn">
          <v-dialog
            v-model="dialog"
            max-width="80%"
            max-height="80vh"
            scrollable
          >
            <template v-slot:activator="{ props: activatorProps }">
              <button v-bind="activatorProps">
                <ion-icon name="add-outline"></ion-icon>
              </button>
            </template>
            <PayrollForm @closeDialog="closeDialog()">

            </PayrollForm>
          </v-dialog>
        </div>
      </div>
      <div class="table-container">
        <v-data-table class="table" :headers="headers" :search="search" :items="payrolls">
          <template v-slot:item.actions="{ item }">
            <div class="actions">
              <button class="btn-edit" click="editItem(item)">
                <ion-icon name="create-outline"></ion-icon>
              </button>
              <button class="btn-edit" click="editItem(item)">
                <ion-icon name="document-text-outline"></ion-icon>
              </button>
              <button class="btn-delete" @click="deleteItem(item)">
                <ion-icon name="trash-outline"></ion-icon>
              </button>
            </div>
          </template>
        </v-data-table>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss"></style>