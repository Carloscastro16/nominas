<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import EmployeesForm from './forms/EmployeesForm.vue'
import { getAllEmployees } from '@/services/FirestoreFunctions'
import { deleteEmployeeById } from '@/services/FirestoreFunctions';
function deleteEmployee(id: string) {
  const confirmation = confirm('¿Estás seguro de que quieres eliminar este empleado?');
  if (confirmation) {
    deleteEmployeeById(id)
      .then((success) => {
        if (success) {
          // Empleados eliminado con éxito, actualiza la lista de empleados
          // Podrías llamar a getAllEmployees() nuevamente para actualizar la lista
          console.log('Empleado eliminado correctamente');
        } else {
          console.error('Error al eliminar empleado');
        }
      })
      .catch((error) => {
        console.error('Error al eliminar empleado:', error);
      });
  }
}


let search = ref('')
let selectedEmployeeId = ref('');

const headers = [
  { title: 'Nombre Completo', key: 'name' },
  { title: 'Puesto', key: 'range' },
  { title: 'Departamento', key: 'department' },
  { title: 'Correo', key: 'mail' },
  { title: 'Actions', key: 'actions', sortable: false }
]
let employees = ref([])
let isLoading = ref(false)


async function onGetAllEmployees() {
  let response = await getAllEmployees()
  employees.value = response
  console.log('Datos de todos', response)
}
onMounted(async () => {
  isLoading.value = true
  await onGetAllEmployees()
  isLoading.value = false
})
let dialog = ref(false)
function getColor(range: any) {
  if (range == 'Ingeniero') return 'red'
  else if (range == 'Programador') return 'orange'
  else return 'green'
}

function editItem(id: string) {
    selectedEmployeeId.value = id;
    dialog.value = true; // Muestra el diálogo del formulario de edición
}


function closeDialog() {
  dialog.value = false
}
</script>

<template>
  <div class="main">
    <div class="container">
      <div class="header">
        <div class="search-container">
          <ion-icon name="search-outline"></ion-icon>
          <input type="text" v-model="search" placeholder="Search" />
        </div>
        <div class="add-btn">
          <v-dialog
            v-model="dialog"
            max-width="80%"
            max-height="80vh"
            scrollable
          >
          
            <template v-slot:activator="{ props: activatorProps }">
              <button>
                <ion-icon name="add-outline" v-bind="activatorProps"></ion-icon>
              </button>
            </template>
            <EmployeesForm @closeDialog="closeDialog()"> </EmployeesForm>
            

          </v-dialog>
        </div>
      </div>
      <div class="table-container">
        <v-data-table
          class="table"
          :headers="headers"
          :search="search"
          :items="employees"
          loading-text="Loading... Please wait"
          :loading="isLoading"
        >
          <template v-slot:item.actions="{ item }">
            <div class="actions">
              <button class="btn-edit" @click="editItem(item.id)">
                <ion-icon name="pencil-outline"></ion-icon>
              </button>
              <button class="btn-delete" @click="deleteEmployee(item.id)">
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
