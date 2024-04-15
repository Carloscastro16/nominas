<script lang="ts" setup>
</script>
<template>
  <div class="container">
    <div class="cards-list">
      <div class="card">
        <div class="card-banner">
          <img src="../assets/images/vacations.webp" alt="">
        </div>
        <div class="card-info">
          <div class="card-title">
            Solicitud de Vaciones
          </div>
          <div class="action">
            <router-link to="/permits/vacations">
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </router-link>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-banner">
          <img src="../assets/images/urgent.webp" alt="">
        </div>
        <div class="card-info">
          <div class="card-title">
            Solicitud de Permiso urgente
          </div>
          <div class="action">
            <router-link to="/permits/urgent-request">
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </router-link>
          </div>
        </div>
      </div>
      <div class="card">
        <div class="card-banner">
          <img src="../assets/images/permits.webp" alt="">
        </div>
        <div class="card-info">
          <div class="card-title">
            Solicitud de Permiso
          </div>
          <div class="action">
            <router-link to="/permits/request">
                <ion-icon name="chevron-forward-outline"></ion-icon>
            </router-link>
          </div>
        </div>
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
