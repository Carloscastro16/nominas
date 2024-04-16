
<script lang="ts" setup>
  import NavbarComponent from '@/components/assets/NavbarComponent.vue';
  import { ref,onMounted   } from 'vue';
  import EmployeesForm from './forms/EmployeesForm.vue';
  //Funcion de obtener datos//
  import { getAllEmployees } from '@/services/FirestoreFunctions'
  import { deleteEmployeeById } from '@/services/FirestoreFunctions';

  function deleteEmployee(id: string) {
  const confirmation = confirm('¿Estás seguro de que quieres eliminar este empleado?');
  if (confirmation) {
    deleteEmployeeById(id)
      .then((success) => {
        if (success) {
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

  const employees = ref<any[]>([]);
    onMounted(async () => {
    employees.value = await getAllEmployees();
  });
  let search = ref('')
  const headers = [
  { title: 'CURP', key: 'curp' },
    { title: 'Department', key: 'department' },
    { title: 'Hourly Wage', key: 'hourlyWage' },
    { title: 'IMMS', key: 'imss' },
    { title: 'Last Name', key: 'lastName' },
    { title: 'Actions', key: 'actions', sortable: false },
  ]
  //Aqui termina//


  let dialog = ref(false);
  function getColor(department: any){
    if (department == 'Sistemas') return 'red'
    else if (department == 'Programador') return 'orange'
    else return 'green'
  }
  function editItem(item: any){
    return item
  }
  function deleteItem(item: any){
    return item
  }
  function closeDialog(){
    dialog.value = false
  }

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
              <button>
                <ion-icon name="add-outline" v-bind="activatorProps"></ion-icon>
              </button>
            </template>
            <EmployeesForm @closeDialog="closeDialog()">
            </EmployeesForm>
          </v-dialog>
          
        </div>
      </div>
      <div class="table-container">
        <v-data-table 
          class="table" 
          :headers="headers"
          :search="search" 
          :items="employees">
          <template v-slot:item.department="{ value }">
            <v-chip :color="getColor(value)">
              {{ value }}
            </v-chip>
          </template>
          <template v-slot:item.actions="{ item }">
            <div class="actions">
              <button class="btn-edit" click="editItem(item)">
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

<style scoped lang="scss">

</style>