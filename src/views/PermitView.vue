<script lang="ts" setup>
import { ref } from 'vue';

  
  let search = ref('');

  const headers = [
    { title: 'Nombre Completo', key: 'fullname' },
    { title: 'Puesto', key: 'range' },
    { title: 'Departamento', key: 'department' },
    { title: 'Correo', key: 'email' },
    { title: 'Actions', key: 'actions', sortable: false },
  ]
  const employees = [
  {
    "fullname": "Juan Pérez",
    "range": "Ingeniero",
    "department": "Construcción",
    "email": "juan.perez@example.com",
    "actions": "Acciones"
  },
  {
    "fullname": "María García",
    "range": "Diseñador",
    "department": "Marketing",
    "email": "maria.garcia@example.com",
    "actions": "Acciones"
  },
  {
    "fullname": "Carlos Martínez",
    "range": "Programador",
    "department": "Tecnología",
    "email": "carlos.martinez@example.com",
    "actions": "Acciones"
  }
  ]
  function getColor(range: any){
    if (range == 'Ingeniero') return 'red'
    else if (range == 'Programador') return 'orange'
    else return 'green'
  }
  function editItem(item: any){
    return item
  }
  function deleteItem(item: any){
    return item
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
          <button>
            <ion-icon name="add-outline"></ion-icon>
          </button>
        </div>
      </div>
      <div class="table-container">
        <v-data-table 
          class="table" 
          :headers="headers"
          :search="search" 
          :items="employees">
          <template v-slot:item.range="{ value }">
            <v-chip :color="getColor(value)">
              {{ value }}
            </v-chip>
          </template>
          <template v-slot:item.actions="{ item }">
            <div class="actions">
              <button class="btn-edit" click="editItem(item)">
                <ion-icon name="pencil-outline"></ion-icon>
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

<style scoped lang="scss">
.container{
  .cards-list{
    display: flex;
    width: 100%;
    flex-direction: column;
    gap: 1rem;
    .card{
      background-color: #fff;
      border-radius: 1rem;
      cursor: pointer;
      animation:cubic-bezier(1, 0, 0, 1);
      transition: all 400ms linear infinite;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
      &:hover{
        transform: scale(1.04);
      }
      .card-banner{
        height: 100px;
        img{
          border-radius: 1rem 1rem 0 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .card-info{
        padding: 1rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .action{
          color: #000 !important;
          &:hover{
            color: #FF735C;
          }
        }
      }
    }
  }
}
</style>
