<script setup>
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    password(value) {
      if (value?.length >= 8) return true

      return 'password needs to be at least 8 characters.'
    },
    email(value) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

      return 'Must be a valid e-mail.'
    }
  }
})
const password = useField('password')
const email = useField('email')

const submit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2))
})
</script>
<template>
  <div class="login-container">
    <div class="card">
      <div class="left">
        <img src="../assets/images/login.png" alt="" />
      </div>
      <div class="right">
        <h1>¡Bienvenido!</h1>
        <p>Accede a tu cuenta para desbloquear un mundo de aprendizaje</p>
        <div class="form-container">
          <form @submit.prevent="submit">
            <v-text-field
              v-model="email.value.value"
              :error-messages="email.errorMessage.value"
              label="E-mail"
              class="input-container font-weight-bold"
            ></v-text-field>

            <v-text-field
              v-model="password.value.value"
              :counter="10"
              :error-messages="password.errorMessage.value"
              label="Password"
              class="input-container font-weight-bold"
            ></v-text-field>
            <v-btn class="me-4 px-8 text-white submit-pill" type="submit" rounded="pill">
              submit
            </v-btn>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.submit-pill {
  background-color: #ff735c !important;
}
.input-container {
  width: 100%;
  color: #ff735c;
}
.login-container {
  margin-top: 4rem;
  padding-inline: 4rem;
  width: 100%;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .card {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    gap: 2rem;
    .left {
      width: 60%;
      img {
        width: 100%;
        margin-inline: 2rem;
      }
    }
    .right {
      padding: 4rem;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      flex-direction: column;
      width: 70%;
      background-color: #ececec;
      height: 100%;
      .form-container {
        width: 100%;
        margin-top: 2rem;
        .form {
          width: 100%;
        }
      }
    }
  }
}
</style>
